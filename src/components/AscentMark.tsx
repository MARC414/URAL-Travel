/**
 * AscentMark — the real URAL brand mark, in place of generic accent icons.
 *
 * Why a component rather than an inline <img> at each call site: the mark needs
 * a background-appropriate colourway, and getting that wrong makes it vanish.
 * The transparent ivory and navy variants are line art with NO background rect
 * (they use an SVG mask for the flight-path cut), so the identical file renders
 * as ivory on navy and as navy on ivory. The variant name therefore describes
 * the surface it is FOR, not the ink inside it.
 *
 * Variants:
 *   "ivory"    → transparent, ivory arch + gold arc. For navy/emerald surfaces.
 *   "navy"     → transparent, navy arch + gold arc. For ivory/gold surfaces.
 *   "emerald"  → solid emerald field, ivory arch. For stand-alone app icons.
 *   "monoNavy" → single navy ink, gold removed. For GOLD surfaces: gold-on-gold
 *                erases the flight path and star, leaving a bare arch.
 *   "monoIvory"→ single ivory ink. Light-ink twin of monoNavy.
 *   "onIvory"  → solid ivory field, navy arch. For light surfaces needing a tile.
 *
 * Sizing is the caller's job and must be honest: the brand kit's smallest PNG
 * export is 18px because below that the arch loses its counter. Keep inline
 * uses at 18px or above where the surrounding layout allows it.
 */
import type { CSSProperties } from "react";

export type AscentMarkVariant = "ivory" | "navy" | "monoNavy" | "monoIvory" | "emerald" | "onIvory";

const SOURCES: Record<AscentMarkVariant, string> = {
  // Transparent line art — same public asset as the established brand mark.
  ivory: "/assets/brand/svg/ural-ascent-mark-v1.svg",
  navy: "/assets/brand/svg/ural-ascent-mark-navy-v1.svg",
  // Single-ink variants: same geometry, one colour. Needed where the surface is
  // the brand gold itself, because gold-on-gold erases the flight path and star.
  monoNavy: "/assets/brand/favicon/ascent-mono-navy.svg",
  monoIvory: "/assets/brand/favicon/ascent-mono-ivory.svg",
  // Solid-field variants published for favicon/app-icon use.
  emerald: "/assets/brand/favicon/ascent-emerald.svg",
  onIvory: "/assets/brand/favicon/ascent-navy-on-ivory.svg",
};

const ALT: Record<AscentMarkVariant, string> = {
  ivory: "URAL Ascent mark",
  navy: "URAL Ascent mark",
  monoNavy: "URAL Ascent mark",
  monoIvory: "URAL Ascent mark",
  emerald: "URAL Ascent mark",
  onIvory: "URAL Ascent mark",
};

interface AscentMarkProps {
  /** Rendered edge length in px. Square by design (viewBox is 0 0 200 200). */
  size: number;
  /** Surface the mark sits on. Determines which colourway is loaded. */
  variant?: AscentMarkVariant;
  className?: string;
  /** Decorative instances sit beside a text label, so they are hidden from AT. */
  decorative?: boolean;
}

export function AscentMark({
  size,
  variant = "ivory",
  className,
  decorative = true,
}: AscentMarkProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    // Never let a flex parent squash the mark out of square.
    flexShrink: 0,
    objectFit: "contain",
  };

  return (
    <img
      src={SOURCES[variant]}
      // The accessible name normally comes from the adjacent heading. Announcing
      // "URAL Ascent mark" next to "URAL Travel Tools" is noise, so decorative
      // instances are hidden and the heading keeps its own label.
      alt={decorative ? "" : ALT[variant]}
      aria-hidden={decorative || undefined}
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      draggable={false}
      style={style}
      className={className}
    />
  );
}
