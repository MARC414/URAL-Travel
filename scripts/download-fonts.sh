#!/bin/bash
# Google Fonts Self-Hosting Script for URAL Travel
# Downloads and subsets Inter and Noto Sans Bengali fonts
# Run: bash scripts/download-fonts.sh

set -e

FONTS_DIR="public/fonts"
mkdir -p "$FONTS_DIR"

echo "🔤 Downloading Google Fonts for URAL Travel..."
echo ""

# Font URLs from google-webfonts-helper API
# Inter Regular (400)
echo "📥 Downloading Inter 400 (Latin)..."
curl -L "https://gwfh.mranftl.com/api/fonts/inter?download=zip&subsets=latin,latin-ext&variants=regular" \
  -o "/tmp/inter-400.zip"
unzip -q -o "/tmp/inter-400.zip" -d "/tmp/inter-400"
cp "/tmp/inter-400/inter-v13-latin-regular.woff2" "$FONTS_DIR/inter-400-v1.woff2" 2>/dev/null || \
  cp "/tmp/inter-400/"*-regular.woff2 "$FONTS_DIR/inter-400-v1.woff2"

# Inter Semi-Bold (600)
echo "📥 Downloading Inter 600 (Latin)..."
curl -L "https://gwfh.mranftl.com/api/fonts/inter?download=zip&subsets=latin,latin-ext&variants=600" \
  -o "/tmp/inter-600.zip"
unzip -q -o "/tmp/inter-600.zip" -d "/tmp/inter-600"
cp "/tmp/inter-600/inter-v13-latin-600.woff2" "$FONTS_DIR/inter-600-v1.woff2" 2>/dev/null || \
  cp "/tmp/inter-600/"*-600.woff2 "$FONTS_DIR/inter-600-v1.woff2"

# Inter Bold (700)
echo "📥 Downloading Inter 700 (Latin)..."
curl -L "https://gwfh.mranftl.com/api/fonts/inter?download=zip&subsets=latin,latin-ext&variants=700" \
  -o "/tmp/inter-700.zip"
unzip -q -o "/tmp/inter-700.zip" -d "/tmp/inter-700"
cp "/tmp/inter-700/inter-v13-latin-700.woff2" "$FONTS_DIR/inter-700-v1.woff2" 2>/dev/null || \
  cp "/tmp/inter-700/"*-700.woff2 "$FONTS_DIR/inter-700-v1.woff2"

# Noto Sans Bengali Regular (400)
echo "📥 Downloading Noto Sans Bengali 400..."
curl -L "https://gwfh.mranftl.com/api/fonts/noto-sans-bengali?download=zip&subsets=bengali&variants=regular" \
  -o "/tmp/noto-bengali-400.zip"
unzip -q -o "/tmp/noto-bengali-400.zip" -d "/tmp/noto-bengali-400"
cp "/tmp/noto-bengali-400/"*-regular.woff2 "$FONTS_DIR/noto-sans-bengali-400-v1.woff2"

# Noto Sans Bengali Semi-Bold (600)
echo "📥 Downloading Noto Sans Bengali 600..."
curl -L "https://gwfh.mranftl.com/api/fonts/noto-sans-bengali?download=zip&subsets=bengali&variants=600" \
  -o "/tmp/noto-bengali-600.zip"
unzip -q -o "/tmp/noto-bengali-600.zip" -d "/tmp/noto-bengali-600"
cp "/tmp/noto-bengali-600/"*-600.woff2 "$FONTS_DIR/noto-sans-bengali-600-v1.woff2"

# Cleanup
rm -rf /tmp/inter-* /tmp/noto-bengali-*

echo ""
echo "✅ Fonts downloaded successfully to $FONTS_DIR/"
echo "📦 Files created:"
ls -lh "$FONTS_DIR"/*.woff2
echo ""
echo "💡 Next step: Update index.html with inline font-face declarations"
echo "    See: CORE_WEB_VITALS_OPTIMIZATION_GUIDE.md Phase 1A"
