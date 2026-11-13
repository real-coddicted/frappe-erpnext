# HR ESS portal deployment

One image, two ports.

| Port (default) | For | Routes |
|---|---|---|
| 8082 (EMPLOYEE_PORT) | Employees | `/` portal, `/signin`, `/leave`, `/attendance`, `/salary`, `/tax`, `/team`, `/approvals`, `/profile` |
| 8083 (ADMIN_PORT) | Admin and HR | `/app` (Frappe Desk: company, HR, payroll), `/login` |

Both ports also serve `/api/*`, `/files`, `/assets` and `/socket.io`.
On the employee port, `/app` redirects to `/`. The portal pages are not served on the admin port.

## Run
1. `cp .env.example .env` and set `IMAGE`, `DB_ROOT_PASSWORD`, `ADMIN_PASSWORD`, `EMPLOYEE_PORT`, `ADMIN_PORT`.
2. Create runtime directories in the working directory:
   ```bash
   mkdir -p sites logs db-data redis-queue-data
   ```
3. `docker compose --env-file .env -f docker-compose.yml up -d`
4. Wait for `create-site` to finish, then open the two ports.

