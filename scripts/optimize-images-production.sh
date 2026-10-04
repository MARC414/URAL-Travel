#!/bin/bash
# Production-grade WebP image optimization for URAL Travel
# Generates 640w, 960w, and 1200w responsive variants
# Quality-tuned to balance file size vs visual fidelity

set -e

IMAGE_DIR="public/assets/images"
SOURCE_DIR="${SOURCE_DIR:-$IMAGE_DIR}"  # Override with original JPG/PNG source

echo "🖼️  URAL Travel Image Optimization Pipeline"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANT: This script should run on ORIGINAL source images"
echo "   Re-compressing WebP → WebP causes generational quality loss."
echo ""
echo "   If you have original JPG/PNG files, set SOURCE_DIR:"
echo "   $ SOURCE_DIR=../image-masters bash scripts/optimize-images-production.sh"
echo ""
read -p "Continue with current images? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted. Please provide original source images."
    exit 1
fi

echo "📊 Target Quality Settings:"
echo "   640w:  Quality 76 (thumbnails/mobile)"
echo "   960w:  Quality 78 (tablets)"
echo "   1200w: Quality 80 (desktop/hero)"
echo ""

# Check for cwebp
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp not found"
    echo "   Install: brew install webp (macOS) or apt install webp (Linux)"
    exit 1
fi

# Counter for tracking
count_640=0
count_960=0
count_1200=0

# Process each image type
for source in "$SOURCE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    [ -e "$source" ] || continue

    basename=$(basename "$source")
    name="${basename%.*}"
    timestamp=$(date +%s)

    echo "🔄 Processing: $basename"

    # Generate 640w variant
    if [ ! -f "$IMAGE_DIR/${name}-640.webp" ]; then
        cwebp -q 76 -m 6 -resize 640 0 "$source" -o "$IMAGE_DIR/${name}-640.webp" -quiet
        echo "   ✓ 640w created"
        ((count_640++))
    else
        echo "   ⊘ 640w exists (skipped)"
    fi

    # Generate 960w variant (NEW - critical for tablets)
    if [ ! -f "$IMAGE_DIR/${name}-960.webp" ]; then
        cwebp -q 78 -m 6 -resize 960 0 "$source" -o "$IMAGE_DIR/${name}-960.webp" -quiet
        echo "   ✓ 960w created"
        ((count_960++))
    else
        echo "   ⊘ 960w exists (skipped)"
    fi

    # Generate 1200w variant
    if [ ! -f "$IMAGE_DIR/${name}-1200.webp" ]; then
        cwebp -q 80 -m 6 -resize 1200 0 "$source" -o "$IMAGE_DIR/${name}-1200.webp" -quiet
        echo "   ✓ 1200w created"
        ((count_1200++))
    else
        echo "   ⊘ 1200w exists (skipped)"
    fi

    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Optimization Complete!"
echo ""
echo "📦 Files Created:"
echo "   640w variants:  $count_640"
echo "   960w variants:  $count_960  ← NEW for tablets"
echo "   1200w variants: $count_1200"
echo ""
echo "💾 Total size comparison:"
du -sh "$IMAGE_DIR"/*.webp 2>/dev/null | tail -1
echo ""
echo "🔍 Next Steps:"
echo "   1. Verify image quality visually"
echo "   2. Update srcset in components to include 960w:"
echo "      srcset=\"...-640.webp 640w, ...-960.webp 960w, ...-1200.webp 1200w\""
echo "   3. Update sizes attribute:"
echo "      sizes=\"(max-width: 640px) 100vw, (max-width: 1024px) 960px, 1200px\""
echo "   4. Run npm build and test"
echo ""
