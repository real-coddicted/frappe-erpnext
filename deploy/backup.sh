#!/usr/bin/env bash
# ==============================================================================
# Production Backup Script for Frappe HR / ERPNext
# - Runs bench backup with DB, config, public & private files
# - Syncs encrypted copies offsite via rclone
# - Enforces local and remote retention
# - Alerts via Healthchecks.io / Webhook (Discord, Slack) on failure
# ==============================================================================
set -euo pipefail

COMPOSE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_NAME="${SITE_NAME:-mysite.localhost}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-frappe-test}"

# Alerting & Offsite Config (can be set in .env or environment)
HEALTHCHECKS_URL="${HEALTHCHECKS_URL:-}"
WEBHOOK_URL="${WEBHOOK_URL:-}"
RCLONE_REMOTE="${RCLONE_REMOTE:-}" # e.g. "my-s3:frappe-backups/enc"
RCLONE_CONF_DIR="${HOME}/.config/rclone"
RCLONE_CONF="${RCLONE_CONF_DIR}/rclone.conf"

send_alert() {
    local status="$1"
    local message="$2"
    echo "[ALERT] ${status}: ${message}"

    if [ -n "${HEALTHCHECKS_URL}" ]; then
        if [ "${status}" = "SUCCESS" ]; then
            curl -fsS --retry 3 "${HEALTHCHECKS_URL}" > /dev/null 2>&1 || true
        else
            curl -fsS --retry 3 "${HEALTHCHECKS_URL}/fail" > /dev/null 2>&1 || true
        fi
    fi

    if [ -n "${WEBHOOK_URL}" ] && [ "${status}" = "FAILED" ]; then
        local payload="{\"content\": \"🚨 **Frappe Backup FAILED** on $(hostname): ${message}\"}"
        curl -fsS -H "Content-Type: application/json" -d "${payload}" "${WEBHOOK_URL}" > /dev/null 2>&1 || true
    fi
}

trap 'send_alert "FAILED" "Script aborted unexpectedly on line $LINENO"' ERR

echo "=== [$(date +'%Y-%m-%d %H:%M:%S')] Starting Frappe Backup for ${SITE_NAME} ==="

# Validate offsite remote configuration
if [ -z "${RCLONE_REMOTE}" ]; then
    echo "[ERROR] RCLONE_REMOTE is not set! A remote destination (e.g. s3:bucket) must be configured." >&2
    send_alert "FAILED" "RCLONE_REMOTE is not configured"
    exit 1
fi

REMOTE_BASE="${RCLONE_REMOTE%%:*}"
if [ ! -f "${RCLONE_CONF}" ]; then
    echo "[ERROR] rclone config not found at ${RCLONE_CONF}!" >&2
    send_alert "FAILED" "rclone config not found at ${RCLONE_CONF}"
    exit 1
fi

if ! grep -q "^\[${REMOTE_BASE}\]" "${RCLONE_CONF}"; then
    echo "[ERROR] Remote '${REMOTE_BASE}' is not defined in ${RCLONE_CONF}!" >&2
    send_alert "FAILED" "Remote '${REMOTE_BASE}' not defined in ${RCLONE_CONF}"
    exit 1
fi

cd "${COMPOSE_DIR}"

# 1. Trigger Frappe Backup
echo "Running bench backup --with-files..."
PROJECT_FLAG=""
if [ -n "${COMPOSE_PROJECT_NAME}" ]; then
    PROJECT_FLAG="-p ${COMPOSE_PROJECT_NAME}"
fi
docker compose ${PROJECT_FLAG} exec -T backend bench --site "${SITE_NAME}" backup --with-files

BACKUP_DIR="${COMPOSE_DIR}/sites/${SITE_NAME}/private/backups"

# 2. Sync to Offsite Storage via rclone in Docker
RCLONE_IMAGE="rclone/rclone:1.68.2"
echo "Syncing backups to offsite storage: ${RCLONE_REMOTE}/${SITE_NAME} via Docker (${RCLONE_IMAGE})..."
docker run --rm \
    -v "${BACKUP_DIR}:/data:ro" \
    -v "${RCLONE_CONF_DIR}:/config/rclone:ro" \
    -v "${HOME}:${HOME}" \
    "${RCLONE_IMAGE}" copy /data "${RCLONE_REMOTE}/${SITE_NAME}" \
    --transfers=4 --checkers=8 --stats-one-line

echo "Enforcing offsite retention (${RETENTION_DAYS} days)..."
docker run --rm \
    -v "${RCLONE_CONF_DIR}:/config/rclone:ro" \
    -v "${HOME}:${HOME}" \
    "${RCLONE_IMAGE}" delete --min-age "${RETENTION_DAYS}d" "${RCLONE_REMOTE}/${SITE_NAME}" || true

# 3. Local Retention: prune local backup files older than retention days
echo "Pruning local backup files older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -type f -name "*.*" -mtime +"${RETENTION_DAYS}" -delete

echo "=== [$(date +'%Y-%m-%d %H:%M:%S')] Backup Completed Successfully ==="
send_alert "SUCCESS" "Backup completed successfully for ${SITE_NAME}"
