import type { MouseEvent } from "react";
import {
  BedDouble,
  Coins,
  FileCheck2,
  Globe2,
  HandCoins,
  Link2,
  MapPin,
  MessageSquare,
  Plane,
  ShieldCheck,
  Stamp,
  Wallet,
} from "lucide-react";
import { ResponsiveImage } from "../components/ResponsiveImage";
import {
  ABOUT_COPY,
  aboutLocalizedPath,
  type AboutCapabilityIcon,
  type AboutCommitmentIcon,
} from "../utils/aboutCopy";

type RouteViewProps = { context: Record<string, any> };

/**
 * Icon keys are strings in the copy table (which is plain data and is also read
 * by the prerenderer, where React components cannot live). The mapping from key
 * to Lucide component is therefore the only place the two halves differ
 * visually — the words themselves come from one table.
 */
const CAPABILITY_ICONS: Record<AboutCapabilityIcon, typeof Plane> = {
  stamp: Stamp,
  plane: Plane,
  bed: BedDouble,
  coins: Coins,
  pin: MapPin,
};

const COMMITMENT_ICONS: Record<AboutCommitmentIcon, typeof Plane> = {
  shield: ShieldCheck,
  file: FileCheck2,
  link: Link2,
  globe: Globe2,
};

export default function AboutRouteView({ context }: RouteViewProps) {
  const { isBn, navigateTo } = context;
  const copy = ABOUT_COPY[isBn ? "bn" : "en"];
  const link = (path: string) => aboutLocalizedPath(path, isBn ? "bn" : "en");

  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo(path);
  };

  return (
    <div className="ural-route-stack animate-fade-in font-sans max-w-4xl mx-auto">
      {/* Page Header */}
      <header className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <span className="inline-flex items-center gap-2 text-[#F6B73C] text-xs font-mono font-bold uppercase tracking-widest">
          {copy.eyebrow}
        </span>
        <h1 className="ural-page-title text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">
          {copy.h1}
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">{copy.intro}</p>
      </header>

      {/* What URAL does */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.whatHeading}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">{copy.whatIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {copy.capabilities.map((item) => {
            const Icon = CAPABILITY_ICONS[item.icon];
            return (
              <div
                key={item.id}
                className="ural-card bg-white border border-border-subtle p-4 flex gap-3"
              >
                <span className="w-9 h-9 rounded-xl bg-brand-navy/5 text-brand-navy flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5" aria-hidden="true" strokeWidth={1.9} />
                </span>
                <div className="space-y-1">
                  <h3 className="ural-card-title font-serif text-sm font-bold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                  <a
                    href={link(item.path)}
                    onClick={go(link(item.path))}
                    className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-[#b8860b] cursor-pointer"
                  >
                    {item.linkLabel} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-page image: the work behind the guides */}
      <figure className="ural-panel overflow-hidden bg-white border border-border-subtle">
        <ResponsiveImage
          src="/assets/images/about_mid_desk_20261117-1200.webp"
          sizes="(min-width: 1024px) 896px, 100vw"
          alt={copy.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
        <figcaption className="px-5 py-3 text-xs text-slate-500 leading-relaxed border-t border-border-subtle">
          {copy.imageCaption}
        </figcaption>
      </figure>

      {/* Visa application assistance through eVisas */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.visasHeading}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">{copy.visasIntro}</p>
        <p className="text-slate-600 text-sm leading-relaxed">{copy.visasBoundaryLead}</p>
        <ul className="space-y-2">
          {copy.roleSplit.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
              <span className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true">
                •
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <a
          href={link("/visa-assistance")}
          onClick={go(link("/visa-assistance"))}
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-[#b8860b] cursor-pointer"
        >
          {copy.visasLinkLabel} →
        </a>
      </section>

      {/* Affiliate disclosure */}
      <section className="ural-panel bg-slate-50 border border-border-subtle p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
          {copy.moneyHeading}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">{copy.moneyBody}</p>
        <a
          href={link("/partners")}
          onClick={go(link("/partners"))}
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-[#b8860b] cursor-pointer"
        >
          {copy.moneyLinkLabel} →
        </a>
      </section>

      {/* Editorial commitments */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.commitmentsHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {copy.commitments.map((item) => {
            const Icon = COMMITMENT_ICONS[item.icon];
            return (
              <div
                key={item.id}
                className="ural-card bg-white border border-border-subtle p-4 flex gap-3"
              >
                <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5" aria-hidden="true" strokeWidth={1.9} />
                </span>
                <div>
                  <h3 className="ural-card-title font-serif text-sm font-bold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Founder */}
      <section className="ural-panel bg-white border border-border-subtle p-6 space-y-3">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
          {copy.founderLabel}
        </span>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-[#F6B73C] font-bold text-lg shrink-0 select-none"
            aria-hidden="true"
          >
            FM
          </div>
          <div className="space-y-1">
            <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
              {copy.founderName}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">{copy.founderBody}</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand-navy rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="ural-section-title text-white font-serif text-lg font-bold">
            {copy.contactHeading}
          </h2>
          <p className="text-slate-400 text-xs mt-1">{copy.contactBody}</p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20found%20you%20via%20the%20About%20page"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            {copy.contactWhatsappLabel}
          </a>
          <a
            href="mailto:support@uraltravel.co.uk"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors inline-flex items-center gap-1.5"
          >
            <HandCoins className="w-3.5 h-3.5" aria-hidden="true" />
            support@uraltravel.co.uk
          </a>
          <button
            type="button"
            onClick={() => navigateTo(link("/contact"))}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors inline-flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
            {copy.contactFormLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
