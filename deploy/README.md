# HR ESS Portal & Admin Desk Production Deployment

Unified production stack providing dual-port access for Employees (React ESS UI) and Administrators (Frappe/ERPNext Desk).

| Service | Port (Host Default) | Container Port | Audience | Routes |
|---|---|---|---|---|
| **Employee Portal** | `127.0.0.1:8082` | `8080` | Employees | `/` portal, `/signin`, `/leave`, `/attendance`, `/salary`, `/tax`, `/team`, `/approvals`, `/profile` |
| **Desk Admin** | `127.0.0.1:8083` | `8081` | HR & Admins | `/app` (Desk, company, HR, payroll), `/login` |
| **Caddy HTTPS** | `80`, `443` | `80`, `443` | Public Web | Automatic Let's Encrypt / ZeroSSL HTTPS reverse proxy |

---

## 1. Quick Start

1. Copy configuration:
   ```bash
   cp .env.example .env
   # Edit .env with your domains, image tag, and passwords
   ```
2. Start the stack:
   ```bash
   docker compose up -d
   ```
   *Note: `configurator` self-heals volume permissions and creates required bench configs automatically on cold starts. No manual `mkdir` or `chmod` is required.*

3. Wait for `create-site` to exit with code 0 (`docker compose logs -f create-site`).

---

## 2. Automated Encrypted Backups (`backup.sh`)

The provided `backup.sh` script automates:
* Database (`.sql.gz`), public files, private files, and site configuration backups.
* Offsite push to any configured `rclone` destination using the pinned `rclone/rclone:1.68.2` container.
* Automatic local and remote 14-day retention pruning.
* Failure notifications via Healthchecks.io or webhooks (Discord/Slack).

### Usage:
```bash
# Configure rclone remote in ~/.config/rclone/rclone.conf
./backup.sh
```

### Add to Host Crontab (e.g., Daily at 2:00 AM):
```cron
0 2 * * * /path/to/deploy/backup.sh >> /var/log/frappe-backup.log 2>&1
```

---

## 3. Disaster Recovery (Restore Procedure)

To restore from an offsite backup onto an existing or brand-new server:

```bash
# 1. Pull the backup archives from the remote vault
rclone copy offsite-encrypted:mysite.localhost /tmp/restore/

# 2. Copy archives into the backend container
docker compose cp /tmp/restore/. backend:/home/frappe/frappe-bench/sites/mysite.localhost/private/backups/

# 3. Execute restore
docker compose exec -T backend bench --site mysite.localhost restore \
  /home/frappe/frappe-bench/sites/mysite.localhost/private/backups/[DATE]-database.sql.gz \
  --with-public-files /home/frappe/frappe-bench/sites/mysite.localhost/private/backups/[DATE]-files.tar \
  --with-private-files /home/frappe/frappe-bench/sites/mysite.localhost/private/backups/[DATE]-private-files.tar \
  --db-root-password "${DB_ROOT_PASSWORD}"

# 4. Reload application worker pool
docker compose restart backend

# 5. Enable scheduler & verify health
docker compose exec -T backend bench --site mysite.localhost enable-scheduler
docker compose exec -T backend bench --site mysite.localhost doctor

# 6. Verify encryption key parity
# Ensure encryption_key in sites/mysite.localhost/site_config.json matches [DATE]-site_config_backup.json
```

---

## 4. Database Architecture, Persistence & Production Tuning

### Volume Storage & Ownership
* **Database Data (`./db-data`)**: Persistent bind mount mapped to `/var/lib/mysql`. Owned by container MariaDB user (`mysql:mysql`, UID `999`).
* **Site Files & Configurations (`./sites`)**: Persistent bind mount mapped to `/home/frappe/frappe-bench/sites`. Owned by container user `frappe:frappe` (`1000:1000`) with directory permissions `755`.
* **Application Logs (`./logs`)**: Mapped to `/home/frappe/frappe-bench/logs` (`1000:1000`, `755`).
* **Cold-Start Self-Healing**: The `configurator` service runs as `0:0` (root) on startup, runs `chown -R 1000:1000` and `chmod -R 755` on host-mounted directories, creates required `common_site_config.json` and `apps.txt` if missing, sets global Redis/DB host configs, and exits cleanly before `create-site` or `backend` start.

### MariaDB Production Tuning Parameters
The MariaDB 10.6 service in `docker-compose.yml` is tuned for production workloads:
* `--innodb-buffer-pool-size=1G`: Allocates dedicated memory for caching InnoDB data and indexes.
* `--max-connections=300`: Supports concurrent web workers, queue workers, and background scheduler tasks.
* `--innodb-file-per-table=1`: Stores each InnoDB table and index in its own `.ibd` file to prevent table-space fragmentation.
* `--log-bin=mysql-bin`: Enables binary logging for Point-in-Time Recovery (PITR) and audit tracking.
* `--binlog-format=ROW`: Records row-level mutations for data consistency.
* `--expire-logs-days=7`: Automatically purges binary logs older than 7 days to conserve disk space.

### Point-in-Time Recovery (PITR)
In the event of an accidental data deletion (e.g. at 2:15 PM) when the latest base backup was taken at 2:00 AM:
1. Restore the base 2:00 AM backup via `bench restore`.
2. Extract incremental changes from binary logs up to the exact timestamp:
   ```bash
   docker compose exec -T db mysqlbinlog --stop-datetime="2026-11-19 14:14:00" \
     /var/lib/mysql/mysql-bin.000001 | docker compose exec -T db mariadb -u root -p"${DB_ROOT_PASSWORD}"
   ```

### State Desynchronization Edge Cases
* **Case 1: `sites/` exists but Database is wiped or dropped**:
  - Web requests return `HTTP 500 Internal Server Error` (`pymysql.err.OperationalError: (1049, "Unknown database")`).
  - Resolution: Run `bench restore [BACKUP-SQL]` to restore the database schema and data into MariaDB.
* **Case 2: Database exists but `sites/` folder is wiped**:
  - `create-site` fails with `Exception: Database _c096fb... already exists` (exits with code 1).
  - Resolution: Either re-create the site folder with existing credentials or wipe the stale database before re-initializing.

### Encryption Key Management
* Frappe natively generates a 32-byte URL-safe base64-encoded `Fernet` encryption key (44 characters, ending with `=`) upon first use via `frappe.utils.password.get_encryption_key()`.
* The key is stored in `sites/${SITE_NAME}/site_config.json` under `"encryption_key"`.
* **Important**: When restoring onto a fresh host, verify that the `encryption_key` in `site_config.json` matches the key in `site_config_backup.json`; otherwise, encrypted fields (e.g., email account passwords, OAuth client secrets, integration tokens) cannot be decrypted.

---

## 5. Health Verification & Stack Monitoring

Verify operational health across all services:
```bash
# 1. Check all container health status (all operational containers should show (healthy))
docker compose ps

# 2. Check Frappe background worker and scheduler status
docker compose exec -T backend bench --site mysite.localhost doctor

# 3. Test Desk API ping
curl -s -f http://127.0.0.1:8083/api/method/ping -H "Host: mysite.localhost"

# 4. Test reverse proxy through Caddy
curl -i http://127.0.0.1:80/api/method/ping -H "Host: ${DESK_DOMAIN}"
```
