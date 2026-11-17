import type { MouseEvent } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Info,
  MessageSquare,
  Plane,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import {
  PARTNERS_COPY,
  partnerHref,
  partnersLocalizedPath,
  type PartnersLocale,
} from "../utils/partnersCopy";

/**
 * `/partners` — the crawlable half is renderPartnersStaticHtml (partnersPage.ts);
 * both halves read PARTNERS_COPY, so wording cannot drift. Keep tables real
 * <table>s: the static half emits the same structure, and verify:build compares
 * link sets across the two.
 */

interface PartnersPageProps {
  lang: "en" | "bn";
  onNavigate: (path: string) => void;
}

export default function PartnersPage({ lang, onNavigate }: PartnersPageProps) {
  const locale: PartnersLocale = lang === "bn" ? "bn" : "en";
  const isBn = locale === "bn";
  const copy = PARTNERS_COPY[locale];
  const local = (path: string) => partnersLocalizedPath(path, locale);
  const disclosureHeading = isBn ? "অ্যাফিলিয়েট প্রকাশোক্তি" : "Affiliate disclosure";

  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(local(path));
  };

  return (
    <div className="ural-route-stack animate-fade-in font-sans max-w-4xl mx-auto px-6 sm:px-0">
      {/* Page Header */}
      <header className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <span className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-widest">
          <Plane className="w-3.5 h-3.5" aria-hidden="true" strokeWidth={2.2} />
          {copy.eyebrow}
        </span>
        <h1 className="ural-page-title text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">
          {copy.h1}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{copy.intro}</p>
      </header>

      {/* Quick answer */}
      <div className="ural-panel bg-white border border-border-subtle p-5 sm:p-6 flex gap-3">
        <Info className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" aria-hidden="true" strokeWidth={1.9} />
        <div className="space-y-1">
          <h2 className="ural-section-title font-serif text-base font-bold text-brand-navy">
            {copy.quickAnswerHeading}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{copy.quickAnswer}</p>
        </div>
      </div>

      {/* How the model works */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.modelHeading}
        </h2>
        <ol className="space-y-2">
          {copy.modelPoints.map((point, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span
                className="w-6 h-6 rounded-full bg-brand-navy text-brand-gold text-[11px] font-bold tabular-nums flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* About Travelpayouts */}
      <section className="ural-panel bg-slate-50 border border-border-subtle p-5 sm:p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
          {copy.travelpayoutsHeading}
        </h2>
        {copy.travelpayoutsParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
        <p className="text-xs text-slate-500 pt-1">{copy.travelpayoutsChecked}</p>
        <div className="pt-1">
          <p className="text-xs font-semibold text-slate-500">{copy.travelpayoutsSourcesHeading}</p>
          <ul className="mt-1 space-y-1">
            {copy.travelpayoutsSources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partner directory by job */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
            {copy.directoryHeading}
          </h2>
          <p className="text-xs text-slate-600">{copy.directoryIntro}</p>
        </div>
        {copy.groups.map((group) => (
          <div key={group.id} className="space-y-1.5">
            <h3 className="ural-card-title font-serif text-sm font-bold text-slate-800">
              {group.heading}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border-subtle">
              <table className="min-w-[36rem] w-full border-collapse text-left text-xs">
                <thead className="bg-slate-100 text-brand-navy">
                  <tr>
                    <th
                      scope="col"
                      className="border-b border-slate-200 px-3 py-2.5 align-top font-semibold"
                    >
                      {copy.columns.partner}
                    </th>
                    <th
                      scope="col"
                      className="border-b border-slate-200 px-3 py-2.5 align-top font-semibold"
                    >
                      {copy.columns.what}
                    </th>
                    <th
                      scope="col"
                      className="border-b border-slate-200 px-3 py-2.5 align-top font-semibold"
                    >
                      {copy.columns.whatYouGet}
                    </th>
                    <th
                      scope="col"
                      className="border-b border-slate-200 px-3 py-2.5 align-top font-semibold"
                    >
                      {copy.columns.where}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.id} className="odd:bg-white even:bg-slate-50 align-top">
                      <td className="px-3 py-2.5 border-t border-slate-200">
                        <a
                          href={partnerHref(row.key)}
                          target="_blank"
                          rel={
                            row.affiliate
                              ? "noopener noreferrer sponsored"
                              : "noopener noreferrer"
                          }
                          className="inline-flex items-center gap-1 font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink"
                        >
                          {row.partner}
                          <ArrowUpRight className="w-3 h-3" aria-hidden="true" strokeWidth={2.4} />
                        </a>
                      </td>
                      <td className="px-3 py-2.5 border-t border-slate-200 text-slate-600">
                        {row.what}
                      </td>
                      <td className="px-3 py-2.5 border-t border-slate-200 text-slate-600">
                        {row.whatYouGet}
                      </td>
                      <td className="px-3 py-2.5 border-t border-slate-200">
                        <a
                          href={local(row.wherePath)}
                          onClick={go(row.wherePath)}
                          className="text-brand-navy font-semibold underline underline-offset-2 hover:text-brand-gold-ink cursor-pointer"
                        >
                          {row.whereLabel}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* What this means for you */}
      <section className="space-y-2">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.meaningHeading}
        </h2>
        <ul className="space-y-2">
          {copy.meaningPoints.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
              <ShieldCheck
                className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                aria-hidden="true"
                strokeWidth={1.9}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Visa leg */}
      <section className="ural-panel bg-white border border-border-subtle p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy flex items-center gap-2">
          <Stamp className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {copy.visasHeading}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{copy.visasBody}</p>
        <a
          href={local("/visa-assistance")}
          onClick={go("/visa-assistance")}
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink cursor-pointer"
        >
          {copy.visasLinkLabel} →
        </a>
      </section>

      {/* Disclosure */}
      <section className="ural-panel bg-slate-50 border border-border-subtle p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {disclosureHeading}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{copy.disclosure}</p>
      </section>

      {/* Contact */}
      <section className="bg-brand-navy rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="ural-section-title text-white font-serif text-lg font-bold">
            {copy.contactHeading}
          </h2>
          <p className="text-slate-400 text-xs mt-1">{copy.contactBody}</p>
        </div>
        <a
          href="https://wa.me/8801784385335"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          WhatsApp +8801784385335
        </a>
      </section>

      <p className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {copy.footerNote}
      </p>
    </div>
  );
}
