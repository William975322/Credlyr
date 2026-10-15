#!/bin/sh
# Renders scripts/og/og-image.html to artifacts/credlyr/public/og-image.jpg
# with headless Chrome (macOS path; set CHROME to override) and Python Pillow.
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --allow-file-access-from-files --virtual-time-budget=3000 \
  --window-size=1200,630 --screenshot="$TMP/og.png" "file://$PWD/scripts/og/og-image.html"
python3 -c "from PIL import Image; Image.open('$TMP/og.png').convert('RGB').save('artifacts/credlyr/public/og-image.jpg', quality=86, optimize=True, progressive=True)"
rm -rf "$TMP"
echo "Wrote artifacts/credlyr/public/og-image.jpg"
