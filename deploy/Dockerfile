# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS ui
WORKDIR /ui
COPY dashboard/package*.json ./
RUN npm ci
COPY dashboard/ ./
RUN npm run build

FROM frappe/erpnext:version-15
USER frappe
WORKDIR /home/frappe/frappe-bench
RUN bench get-app hrms --branch version-15
RUN --mount=type=secret,id=gitea_token,uid=1000 \
    T=$(cat /run/secrets/gitea_token) && \
    bench get-app eme_admin https://sbpatil:${T}@gitea.local.coddicted.com/sbpatil/frappe_admin.git && \
    bench get-app hr_ess_api https://sbpatil:${T}@gitea.local.coddicted.com/sbpatil/Frappe_Hr.git --branch develop && \
    git -C apps/eme_admin remote set-url upstream https://gitea.local.coddicted.com/sbpatil/frappe_admin.git && \
    git -C apps/hr_ess_api remote set-url upstream https://gitea.local.coddicted.com/sbpatil/Frappe_Hr.git
RUN bench build --app hrms --app eme_admin --app hr_ess_api

USER root
COPY --from=ui --chown=frappe:frappe /ui/dist /home/frappe/portal
COPY deploy/portal-blocks.conf /tmp/portal-blocks.conf
RUN awk 'FNR==NR{b=b $0 "\n"; next} /^[ \t]*location \/ \{$/ && !d {printf "%s", b; d=1} {print}' /tmp/portal-blocks.conf /templates/nginx/frappe.conf.template > /tmp/new.template \
    && cat /tmp/new.template > /templates/nginx/frappe.conf.template \
    && grep -q portal-assets /templates/nginx/frappe.conf.template \
    && rm /tmp/new.template /tmp/portal-blocks.conf
USER frappe
