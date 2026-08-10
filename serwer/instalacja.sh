#!/usr/bin/env bash
# Pierwsze uruchomienie katalogu na czystym VPS-ie (Ubuntu/Debian).
# Uruchom raz, jako root:  bash serwer/instalacja.sh twojadomena.pl
#
# Skrypt nie robi nic magicznego — każdy krok możesz wykonać ręcznie.
# Jest tu po to, żebyś nie musiał pamiętać kolejności.

set -euo pipefail

DOMENA="${1:-}"
if [[ -z "$DOMENA" ]]; then
  echo "Użycie: bash serwer/instalacja.sh twojadomena.pl"
  exit 1
fi

ZRODLO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "Instaluję katalog dla domeny: $DOMENA"
echo "Źródło: $ZRODLO"
echo

# --- 1. pakiety ---
echo "[1/7] Pakiety systemowe"
apt-get update -qq
apt-get install -y -qq nginx rsync curl ca-certificates

if ! command -v node >/dev/null || [[ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -lt 20 ]]; then
  echo "      Instaluję Node.js 22"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - >/dev/null
  apt-get install -y -qq nodejs
fi
echo "      node $(node -v)"

# --- 2. użytkownik i katalogi ---
echo "[2/7] Użytkownik i katalogi"
id -u katalog &>/dev/null || useradd --system --home /opt/katalog --shell /usr/sbin/nologin katalog
mkdir -p /opt/katalog /var/www/katalog /var/lib/katalog /var/www/certbot

# --- 3. kod ---
echo "[3/7] Kopiuję kod do /opt/katalog"
rsync -a --delete --exclude public/ --exclude .git/ "$ZRODLO"/ /opt/katalog/
chown -R katalog:katalog /opt/katalog /var/lib/katalog
chmod 750 /var/lib/katalog

# --- 4. build ---
echo "[4/7] Buduję serwis"
cd /opt/katalog
sudo -u katalog node build.mjs
rsync -a --delete /opt/katalog/public/ /var/www/katalog/
chown -R www-data:www-data /var/www/katalog

# --- 5. usługa ---
echo "[5/7] Usługa systemd"
cp /opt/katalog/serwer/katalog-zapisy.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now katalog-zapisy
sleep 1
systemctl is-active --quiet katalog-zapisy && echo "      usługa działa" || { echo "      BŁĄD — sprawdź: journalctl -u katalog-zapisy -n 40"; exit 1; }

# --- 6. nginx ---
echo "[6/7] nginx"
sed "s/DOMENA/$DOMENA/g" /opt/katalog/serwer/nginx.conf > /etc/nginx/sites-available/katalog

# Przed wydaniem certyfikatu bloki HTTPS nie mają czego wczytać,
# więc na czas pierwszego uruchomienia zostawiamy sam port 80.
sed -n '1,/^}/p' /etc/nginx/sites-available/katalog | sed "s|location / { return 301.*|location / { root /var/www/katalog; index index.html; try_files \$uri \$uri/ \$uri/index.html =404; }|" > /etc/nginx/sites-available/katalog-tmp
ln -sf /etc/nginx/sites-available/katalog-tmp /etc/nginx/sites-enabled/katalog
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "      nginx odpowiada na porcie 80"

# --- 7. certyfikat ---
echo "[7/7] Certyfikat SSL"
apt-get install -y -qq certbot python3-certbot-nginx
if certbot certonly --webroot -w /var/www/certbot -d "$DOMENA" -d "www.$DOMENA" \
     --non-interactive --agree-tos --register-unsafely-without-email --quiet; then
  ln -sf /etc/nginx/sites-available/katalog /etc/nginx/sites-enabled/katalog
  rm -f /etc/nginx/sites-available/katalog-tmp
  nginx -t && systemctl reload nginx
  echo "      certyfikat wydany, HTTPS włączone"
else
  echo "      Certyfikat się nie wydał — najczęstsza przyczyna to domena"
  echo "      niewskazująca jeszcze na ten serwer. Sprawdź rekord A i powtórz:"
  echo "         certbot --nginx -d $DOMENA -d www.$DOMENA"
  echo "      Serwis działa na razie po HTTP."
fi

echo
echo "Gotowe."
echo "  Strona:      https://$DOMENA"
echo "  Aktualizacja: bash /opt/katalog/serwer/wdroz.sh"
echo "  Logi usługi:  journalctl -u katalog-zapisy -f"
echo "  Lista maili:  node /opt/katalog/narzedzia/eksport.mjs"
echo
echo "PAMIĘTAJ: w /opt/katalog/config.json ustaw domenę i tryb wysyłki maili."
