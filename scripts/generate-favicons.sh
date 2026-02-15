#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_PNG="$ROOT_DIR/public/favicon_large.png"
OUT_DIR="$ROOT_DIR/public"

if ! command -v magick >/dev/null 2>&1; then
  echo "Error: ImageMagick 'magick' not found in PATH." >&2
  exit 1
fi

if [[ ! -f "$SOURCE_PNG" ]]; then
  echo "Error: source file not found: $SOURCE_PNG" >&2
  exit 1
fi

sizes=(16 32 48 64 96 128 180 192 256 512)

for size in "${sizes[@]}"; do
  magick "$SOURCE_PNG" -resize "${size}x${size}" "$OUT_DIR/favicon-${size}x${size}.png"
  echo "Wrote $OUT_DIR/favicon-${size}x${size}.png"
done

magick "$SOURCE_PNG" -define icon:auto-resize=16,32,48 "$OUT_DIR/favicon.ico"
echo "Wrote $OUT_DIR/favicon.ico"

echo "Done."
