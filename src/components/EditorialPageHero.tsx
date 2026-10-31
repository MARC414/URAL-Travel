import type { ReactNode } from "react";

import { ResponsiveImage } from "./ResponsiveImage";

type EditorialPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes?: string;
  imageFit?: "cover" | "contain";
  credit?: ReactNode;
  children?: ReactNode;
};

/**
 * Photo-led, accessible page header shared by the flights, hotel and visa guides.
 * Keep the image URLs registered in imageAssets.ts and preload the matching
 * AVIF in scripts/prerender.ts so the hero remains the page's LCP image.
 */
export function EditorialPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imageSizes = "(min-width: 1024px) 34vw, 100vw",
  imageFit = "cover",
  credit,
  children,
}: EditorialPageHeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-brand-navy text-white shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="relative z-10 flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F6B73C]/40 bg-[#F6B73C]/10 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD783] sm:text-xs">
            <span className="size-1.5 rounded-full bg-[#F6B73C]" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="ural-page-title max-w-[22ch] font-serif text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="max-w-[64ch] text-sm leading-relaxed text-slate-200 sm:text-[15px]">
            {description}
          </p>
          {children ? <div className="pt-1">{children}</div> : null}
        </div>

        <figure className="relative order-first min-h-[210px] overflow-hidden bg-slate-900 sm:min-h-[250px] lg:order-last lg:min-h-[330px]">
          <ResponsiveImage
            src={imageSrc}
            sizes={imageSizes}
            alt={imageAlt}
            fetchPriority="high"
            decoding="async"
            className={`absolute inset-0 h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"}`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent lg:bg-gradient-to-l lg:from-brand-navy/10 lg:via-transparent lg:to-transparent"
          />
          {credit ? (
            <figcaption className="absolute bottom-2 right-2 max-w-[90%] rounded-md bg-slate-950/75 px-2 py-1 text-[10px] font-medium leading-tight text-white backdrop-blur-sm [&_a]:underline [&_a]:decoration-white/60 [&_a]:underline-offset-2 [&_a:hover]:text-[#FFD783]">
              {credit}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
