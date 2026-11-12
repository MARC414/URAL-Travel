import type { ReactNode } from "react";
import { ResponsiveImage } from "./ResponsiveImage";

/** Contact-style image-overlay hero, shared by the hotel and visa sections. */
export function HotelHero({ title, description, eyebrow, imageSrc, imageAlt, credit }: {
  title: string; description: string; eyebrow: string; imageSrc: string; imageAlt: string; credit?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-brand-navy text-white shadow-xl">
      <ResponsiveImage src={imageSrc} sizes="(min-width: 1280px) 1200px, 100vw" alt={imageAlt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-right" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/70 sm:via-brand-navy/85 sm:to-brand-navy/35" />
      <div className="relative z-10 max-w-3xl space-y-4 px-6 py-10 sm:px-12 sm:py-14 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-200">{eyebrow}</p>
        <h1 className="ural-page-title font-serif text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-base">{description}</p>
      </div>
      {credit && <div className="absolute bottom-2 right-3 z-10 rounded bg-slate-950/80 px-2 py-1 text-[10px] text-white">{credit}</div>}
    </header>
  );
}
