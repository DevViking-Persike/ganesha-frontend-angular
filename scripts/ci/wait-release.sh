#!/usr/bin/env bash
set -euo pipefail
: "${EXPECTED_REVISION:?EXPECTED_REVISION ausente}"
task_tmp="$(mktemp -d)"
trap 'rm -rf "$task_tmp"' EXIT
for attempt in $(seq 1 60); do
  if curl --fail --silent --show-error --max-time 10 \
    "https://ganesha.victorpersike.dev.br/healthz" -o "$task_tmp/health.json" &&
    jq -e --arg revision "$EXPECTED_REVISION" \
      '.status == "ok" and .revision == $revision' "$task_tmp/health.json" >/dev/null; then
    echo "Release confirmada: $EXPECTED_REVISION"
    exit 0
  fi
  echo "Aguardando Argo CD/certificado: tentativa $attempt/60"
  sleep 10
done
echo 'Argo CD não disponibilizou a release esperada dentro do prazo.' >&2
exit 1
