#!/bin/bash
# Production-grade WebP image optimization for URAL Travel
# Generates 640w, 960w, and 1200w responsive variants
# Quality-tuned to balance file size vs visual fidelity

set -e
# The generated file globs below must expand to *nothing* when a directory is
# empty; without this, an unmatched pattern stays literal and the loop tries
# to encode a file named '*.jpg'. (The previous revision put `2>/dev/null`
# after the glob, which is a bash syntax error — the script could never run.)
shopt -s nullglob

IMAGE_DIR="public/assets/images"
# The committed JPG masters live in src/assets/optimized-social (42 files, all
# 1200px wide). Pointing SOURCE_DIR there by default means the pipeline works
# out of the box and never re-encodes WebP -> WebP. Override only if your
# masters live elsewhere: SOURCE_DIR=../image-masters bash scripts/...
SOURCE_DIR="${SOURCE_DIR:-src/assets/optimized-social}"

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
echo "   WebP  640w:  Quality 76 (thumbnails/mobile)"
echo "   WebP  960w:  Quality 78 (tablets)"
echo "   WebP  1200w: Quality 80 (desktop/hero)"
echo "   AVIF  640w:  Quality 50 (same rules apply, AVIF needs less)"
echo "   AVIF  960w:  Quality 50"
echo "   AVIF  1200w: Quality 55"
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
for source in "$SOURCE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
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
echo "🎞️  AVIF variants (the <picture> sources; WebP stays the fallback)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Same rule as WebP: encode from the JPG masters, never WebP -> AVIF.
# avifenc is preferred (it writes clean colour signalling and exposes the speed
# knob); ImageMagick with a libheif delegate is the fallback. A missing AVIF
# encoder is a warning, not a hard failure: the committed .avif files stay valid
# and the WebP pipeline still works.
AVIF_ENCODER=""
if command -v avifenc &> /dev/null; then
    AVIF_ENCODER="avifenc"
elif convert -list format 2>/dev/null | grep -qiE "^ *AVIF.*rw"; then
    AVIF_ENCODER="imagemagick"
fi

if [ -z "$AVIF_ENCODER" ]; then
    echo "⚠️  No AVIF encoder found (avifenc, or ImageMagick with a libheif delegate)."
    echo "   Skipping AVIF regeneration — the committed .avif files are untouched."
    echo "   Install: apt install libavif-bin   (or use an ImageMagick AVIF build)"
else
    echo "   Encoder: $AVIF_ENCODER"
    avif_640=0; avif_960=0; avif_1200=0

    encode_avif() { # $1=source $2=width $3=quality $4=output
        if [ "$AVIF_ENCODER" = "avifenc" ]; then
            avifenc -s 6 -q "$3" -w "$2" "$1" "$4" > /dev/null
        else
            convert "$1" -resize "${2}x" -quality "$3" "$4"
        fi
    }

    for source in "$SOURCE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
        [ -e "$source" ] || continue
        basename=$(basename "$source")
        name="${basename%.*}"
        echo "🔄 AVIF: $basename"

        if [ ! -f "$IMAGE_DIR/${name}-640.avif" ]; then
            encode_avif "$source" 640 50 "$IMAGE_DIR/${name}-640.avif"
            echo "   ✓ 640w created"; ((avif_640++))
        else
            echo "   ⊘ 640w exists (skipped)"
        fi

        if [ ! -f "$IMAGE_DIR/${name}-960.avif" ]; then
            encode_avif "$source" 960 50 "$IMAGE_DIR/${name}-960.avif"
            echo "   ✓ 960w created"; ((avif_960++))
        else
            echo "   ⊘ 960w exists (skipped)"
        fi

        if [ ! -f "$IMAGE_DIR/${name}-1200.avif" ]; then
            encode_avif "$source" 1200 55 "$IMAGE_DIR/${name}-1200.avif"
            echo "   ✓ 1200w created"; ((avif_1200++))
        else
            echo "   ⊘ 1200w exists (skipped)"
        fi
        echo ""
    done

    echo "   AVIF 640w variants:  $avif_640"
    echo "   AVIF 960w variants:  $avif_960"
    echo "   AVIF 1200w variants: $avif_1200"
    echo ""
    echo "   ⚠️  ImageMagick's libheif writer marks colour primaries/transfer as"
    echo "      'unspecified'. Verified harmless (libavif decodes them with a mean"
    echo "      error <0.25/255 against the masters), but avifenc is preferred."
fi

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
