#!/usr/bin/env bash
# Aktualizacja serwisu na serwerze. Uruchom w katalogu projektu:
#   bash serwer/wdroz.sh
#
# Pobiera zmiany z GitHuba, przebudowuje obrazy i podmienia kontenery.
# Build stron dzieje się w obrazie — gdy się nie powiedzie, stare kontenery
# zostają online i nic się nie podmienia.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "Pobieram zmiany..."
git pull --ff-only

echo "Buduję obrazy i podmieniam kontenery..."
mkdir -p dane
docker compose up -d --build

echo "Sprawdzam..."
sleep 2
docker compose ps
curl -fsS http://127.0.0.1:8790/api/zdrowie && echo
echo "Gotowe."
