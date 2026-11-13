# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS ui
WORKDIR /ui
COPY apps/hr_ess_api/dashboard/package*.json ./
RUN npm ci
COPY apps/hr_ess_api/dashboard/ ./
RUN npm run build

FROM frappe/erpnext:version-15
USER frappe
WORKDIR /home/frappe/frappe-bench
RUN bench get-app hrms --branch version-15
RUN --mount=type=secret,id=gitea_token,uid=1000 \
    T=$(cat /run/secrets/gitea_token) && \
    git config --global url."https://sbpatil:${T}@gitea.local.coddicted.com/".insteadOf "https://gitea.local.coddicted.com/" && \
    bench get-app eme_admin https://gitea.local.coddicted.com/sbpatil/frappe_admin.git && \
    git config --global --unset-all url."https://sbpatil:${T}@gitea.local.coddicted.com/".insteadOf

COPY --chown=frappe:frappe apps/hr_ess_api /home/frappe/frappe-bench/apps/hr_ess_api
RUN ./env/bin/pip install --no-cache-dir -e ./apps/hr_ess_api \
    && python3 -c "p='sites/apps.txt'; a=open(p).read().splitlines(); 'hr_ess_api' in a or open(p,'w').write('\n'.join(a + ['hr_ess_api']) + '\n')"

RUN bench build --apps hrms,eme_admin

RUN cp -R /home/frappe/frappe-bench/sites/assets/. /home/frappe/frappe-bench/assets/ \
    && rm -rf /home/frappe/frappe-bench/sites/assets

USER root
COPY --from=ui --chown=frappe:frappe /ui/dist /home/frappe/portal
COPY deploy/frappe.conf.template /templates/nginx/frappe.conf.template
USER frappe

VOLUME [ \
  "/home/frappe/frappe-bench/sites", \
  "/home/frappe/frappe-bench/logs" \
]

