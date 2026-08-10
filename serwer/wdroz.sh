#!/usr/bin/env bash
# Aktualizacja serwisu po zmianie treści. Uruchom na serwerze jako root:
#   bash /opt/katalog/serwer/wdroz.sh
#
# Buduje strony od nowa, podmienia je na dysku i przeładowuje usługę zapisów.
# Przy błędzie budowania nic nie jest podmieniane — stara wersja zostaje online.

set -euo pipefail
cd /opt/katalog

echo "Buduję..."
sudo -u katalog node build.mjs

echo "Podmieniam pliki..."
rsync -a --delete /opt/katalog/public/ /var/www/katalog/
chown -R www-data:www-data /var/www/katalog

echo "Przeładowuję usługę zapisów..."
systemctl restart katalog-zapisy
sleep 1
systemctl is-active --quiet katalog-zapisy || { echo "BŁĄD: usługa nie wstała — journalctl -u katalog-zapisy -n 40"; exit 1; }

echo "Gotowe. $(find /var/www/katalog -name index.html | wc -l) podstron online."
