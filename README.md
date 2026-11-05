# Frappe ERPNext & HR ESS Portal

Production-ready Frappe/ERPNext deployment featuring standard ERPNext, Frappe HRMS, custom administration (`eme_admin`), and a customized Employee Self-Service (ESS) Portal (`hr_ess_api`) with an embedded React frontend dashboard.

---

## 1. Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │             Incoming HTTP              │
                      │               (Port 8082)              │
                      └───────────────────┬────────────────────┘
                                          │
                      ┌───────────────────▼────────────────────┐
                      │            Nginx (Frontend)            │
                      │  - Serves React Portal (/home/frappe)  │
                      │  - Reverse-proxies /api and /socketio  │
                      └─────────────┬──────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌───────────────────────┐┌──────────────────────┐┌───────────────────────┐
│        Backend        ││       Scheduler      ││    Queue Workers      │
│     (Gunicorn/WSGI)   ││   (bench schedule)   ││   (short, long, def)  │
└──────────┬────────────┘└──────────┬───────────┘└───────────┬───────────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────┐                         ┌──────────────────────┐
│     MariaDB 10.6      │                         │   Redis (Cache/Queue)│
│  (Database storage)   │                         │   (redis:6.2-alpine) │
└───────────────────────┘                         └──────────────────────┘
```

### Components

- **Base Framework:** Frappe & ERPNext `version-15`
- **Core Apps:**
  - `hrms`: Official Frappe HRMS app (`version-15`)
  - `eme_admin`: Custom administrative Frappe app
  - `hr_ess_api`: HR Employee Self-Service API & backend hooks
- **Frontend Dashboard:** React 19 + Vite + Tailwind CSS (`apps/hr_ess_api/dashboard`), compiled and embedded into `/home/frappe/portal` inside the Nginx container layer.
- **Data Stores:** MariaDB 10.6 (database) & Redis 6.2 (cache, queue, and Socket.IO).

---

## 2. Repository Structure

```
├── .gitea/
│   └── workflows/
│       └── ci.yml                    # Automated lint, build, and Docker publish
├── apps/
│   └── hr_ess_api/
│       ├── dashboard/                # React Vite ESS portal frontend
│       └── hr_ess_api/               # Frappe application backend & API
├── deploy/
│   ├── .env.example                  # Environment template
│   ├── Dockerfile                    # Multi-stage custom Frappe/ERPNext build
│   ├── docker-compose.yml            # Multi-service container orchestration
│   └── portal-blocks.conf            # Nginx template injection for portal assets
├── docs/                             # Project documentation and specifications
├── .dockerignore                     # Docker build exclusion rules
└── README.md                         # Documentation
```

---

## 3. CI/CD Pipeline (Gitea Actions)

The repository uses automated Gitea Actions workflows modeled on enterprise build standards:

### Workflows

1. **`ci.yml` (Build, Test & Publish):**
   - **Trigger:** Pushes to all branches and semver tags (`v*.*.*`) touching `apps/hr_ess_api/**` or `deploy/**`.
   - **Quality Gate:** Runs `npx oxlint` and `npm run build` in the dashboard before Docker build.
   - **BuildKit Secret:** Securely passes `gitea_token` to clone private apps (`frappe_admin`) during `bench get-app` without persisting credentials in image layers.
   - **Caching:** Utilizes Gitea Actions native cache (`type=gha`) for both Node dependencies and Docker build layers.
   - **Registry:** Publishes images to `gitea.local.coddicted.com/coddicted/frappe-custom-hrms`.

2. **Metadata Tagging Conventions:**
   - Push to `main` → `:latest`
   - Push to `develop` → `:develop`
   - Feature branches → `:<branch>-beta-<short-sha>`
   - Release tags (`vX.Y.Z`) → `:X.Y.Z`

---

## 4. Deployment Instructions

### Prerequisites
- Docker Engine 24+ and Docker Compose v2.
- Access to the internal container registry (`gitea.local.coddicted.com`).

### 1. Environment Setup
Copy the template and configure your local settings:

```bash
cd deploy
cp .env.example .env
```

Edit `.env` and configure passwords:
```ini
IMAGE=gitea.local.coddicted.com/coddicted/frappe-custom-hrms:latest
SITE_NAME=mysite.localhost
PORT=8082
DB_ROOT_PASSWORD=your_secure_mariadb_root_password
ADMIN_PASSWORD=your_secure_frappe_admin_password
```

### 2. Initializing & Starting the Stack

```bash
# Pull the latest image
docker compose pull

# Start database and redis
docker compose up -d db redis-cache redis-queue

# Wait for db healthcheck, then initialize site (first time only)
docker compose up create-site

# Launch all application services
docker compose up -d
```

### 3. Running Database Migrations
When deploying a new image version, apply pending Frappe schema migrations:

```bash
docker compose exec backend bench --site mysite.localhost migrate
```

---

## 5. Required Gitea Repository Secrets

To enable the automated CI/CD pipeline, ensure the following secrets are configured under **Settings → Actions → Secrets**:

| Secret Name | Description |
| :--- | :--- |
| `DOCKER_USERNAME` | Gitea username with push permissions to the package registry (`sbpatil`) |
| `DOCKER_PASSWORD` | Gitea Personal Access Token with `write:package` and `read:repository` |
