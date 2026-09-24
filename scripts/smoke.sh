#!/usr/bin/env bash
set -euo pipefail
task_tmp="$(mktemp -d "${TMPDIR:-/tmp}/ganesha-smoke.XXXXXX")"
trap 'rm -rf "$task_tmp"' EXIT
code="$(curl --silent --show-error --fail --retry 15 --retry-all-errors \
  --retry-delay 10 --retry-max-time 240 --max-time 15 \
  -o "$task_tmp/page.html" -w '%{http_code}' "https://ganesha.victorpersike.dev.br/")"
[[ "$code" == 200 ]]
grep -qi 'Ganesha' "$task_tmp/page.html"
printf 'https://ganesha.victorpersike.dev.br/ -> HTTP %s, TLS válido e conteúdo do DesignLab\n' "$code"
redirect="$(curl --silent --show-error --max-time 15 -o /dev/null \
  -w '%{http_code} %{redirect_url}' "http://ganesha.victorpersike.dev.br/")"
[[ "$redirect" == "301 https://ganesha.victorpersike.dev.br/" || "$redirect" == "308 https://ganesha.victorpersike.dev.br/" ]]
printf 'http://ganesha.victorpersike.dev.br/ -> %s\n' "$redirect"
