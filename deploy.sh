#!/usr/bin/env bash
# Publica el sitio de Magenta (veronafloreria.online) en el servidor. Respalda la versión anterior.
set -euo pipefail
cd "$(dirname "$0")"
npx vite build
H=root@148.135.91.190
D=/var/www/veronafloreria
ssh $H "B=/var/backups/veronafloreria-\$(date +%F-%H%M) && mkdir -p \$B && cp -a $D/. \$B/ && echo respaldo en \$B"
rsync -a --delete --exclude CNAME dist/ $H:$D/
curl -s -o /dev/null -w "veronafloreria.online %{http_code}\n" https://veronafloreria.online/
