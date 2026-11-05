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
    bench get-app eme_admin https://sbpatil:${T}@gitea.local.coddicted.com/sbpatil/frappe_admin.git && \
    git -C apps/eme_admin remote set-url origin https://gitea.local.coddicted.com/sbpatil/frappe_admin.git && git -C apps/eme_admin remote set-url upstream https://gitea.local.coddicted.com/sbpatil/frappe_admin.git

COPY --chown=frappe:frappe apps/hr_ess_api /home/frappe/frappe-bench/apps/hr_ess_api
RUN ./env/bin/pip install --no-cache-dir -e ./apps/hr_ess_api \
    && (grep -qxF 'hr_ess_api' sites/apps.txt || echo 'hr_ess_api' >> sites/apps.txt)

RUN bench build --app hrms --app eme_admin --app hr_ess_api

USER root
COPY --from=ui --chown=frappe:frappe /ui/dist /home/frappe/portal
COPY deploy/portal-blocks.conf /tmp/portal-blocks.conf
RUN awk 'FNR==NR{b=b $0 "\n"; next} /^[ \t]*location \/ \{$/ && !d {printf "%s", b; d=1} {print}' /tmp/portal-blocks.conf /templates/nginx/frappe.conf.template > /tmp/new.template \
    && cat /tmp/new.template > /templates/nginx/frappe.conf.template \
    && grep -q portal-assets /templates/nginx/frappe.conf.template \
    && rm /tmp/new.template /tmp/portal-blocks.conf
USER frappe
