#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# Default: sibling checkout ~/dev/prc-platform next to this repo (override with PRC_PLATFORM_PATH).
DEFAULT_PLATFORM="$(cd "$ROOT/.." && pwd)/prc-platform"
PLATFORM_ROOT="${PRC_PLATFORM_PATH:-$DEFAULT_PLATFORM}"
SRC="$PLATFORM_ROOT/themes/prc-design-system/theme.json"
DEST="$ROOT/tests/fixtures/prc-design-system/theme.json"
if [[ ! -f "$SRC" ]]; then
	echo "Source theme.json not found at $SRC" >&2
	echo "Set PRC_PLATFORM_PATH to your prc-platform repo root." >&2
	exit 1
fi
cp "$SRC" "$DEST"
echo "Synced palette from $SRC -> $DEST"
