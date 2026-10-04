import type { ImgHTMLAttributes } from "react";
import {
  buildResponsiveSrcSet,
  getResponsiveImageDimensions,
} from "../utils/imageAssets";

export interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> {
  /**
   * Any generated URL for the image (`-640.webp`, `-960.webp`, `-1200.webp` or
   * its `.avif` sibling). Normalised to the 1200w canonical form internally.
   */
  src: string;
  /**
   * One `sizes` value for both formats — the layout size is a property of where
   * the image is placed, not of its encoding.
   */
  sizes?: string;
  alt: string;
}

/**
 * Photography wrapper that serves AVIF with a WebP fallback.
 *
 * WHY `<picture>` — and what it must not break
 * --------------------------------------------
 * The 9 call sites all position the `<img>` with classes (`absolute inset-0
 * h-full w-full object-cover`) inside a positioned or aspect-ratio parent.
 * `<picture>` is `display: inline` by default, which would insert a box between
 * the parent and the `<img>` and collapse those percentage heights.
 * `className="contents"` (`display: contents`) makes the wrapper generate no
 * box at all, so the `<img>` stays the parent's direct layout child and the
 * migration is attribute-for-attribute mechanical.
 *
 * `alt`/`aria-hidden`/`loading`/`fetchPriority`/`className` stay on the `<img>`,
 * never on `<picture>` or `<source>` — the wrapper carries no semantics.
 *
 * COUPLING — read before changing the asset set
 * ---------------------------------------------
 * The prerendered HTML contains no photo `<img>` (the hero is client-rendered),
 * so the browser's early fetch is decided entirely by `<link rel="preload"
 * as="image">`. Those preloads are emitted as **AVIF** by index.html (SPA shell)
 * and scripts/prerender.ts (per route), matching the first `<source>` here.
 * If the preload format and this component's format order ever disagree,
 * supporting browsers download the LCP image twice — while `verify:build`
 * stays green. Both producers and this file must move together (Appendix A.5).
 */
export function ResponsiveImage({
  src,
  sizes = "100vw",
  alt,
  ...imgProps
}: ResponsiveImageProps) {
  const { src: canonicalSrc, width, height } = getResponsiveImageDimensions(src);

  return (
    <picture className="contents">
      <source
        type="image/avif"
        srcSet={buildResponsiveSrcSet(canonicalSrc, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildResponsiveSrcSet(canonicalSrc, "webp")}
        sizes={sizes}
      />
      <img
        src={canonicalSrc}
        alt={alt}
        width={width}
        height={height}
        {...imgProps}
      />
    </picture>
  );
}
