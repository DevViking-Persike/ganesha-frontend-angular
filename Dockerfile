# syntax=docker/dockerfile:1.7
# Ganesha DesignLab — Angular SPA, multi-stage: build pnpm + runtime nginx unprivileged.

FROM node:22-alpine AS builder
RUN apk add --no-cache curl && corepack enable
WORKDIR /app
RUN chown -R node:node /app
USER node

COPY --chown=node:node angular/package.json angular/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY --chown=node:node angular/ ./
ARG APP_REVISION=local
ENV APP_REVISION=${APP_REVISION}
RUN node -e "const f='src/index.html',fs=require('fs');fs.writeFileSync(f,fs.readFileSync(f,'utf8').replace('</title>','</title>\n  <meta name=\"app-revision\" content=\"'+process.env.APP_REVISION+'\">'))"
RUN sed "s/__APP_REVISION__/${APP_REVISION}/g" docker/default.conf.template > default.conf
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner

COPY --from=builder --chown=101:0 /app/dist/ganesha-designlab/browser ./usr/share/nginx/html
COPY --from=builder --chown=101:0 /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=15s --retries=10 \
  CMD curl -fsS http://localhost:8080/healthz >/dev/null 2>&1 || exit 1
