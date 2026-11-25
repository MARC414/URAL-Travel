import React from "react";
import { ArrowRight, Info } from "lucide-react";
import type { Language } from "../translations";
import type { DepartureHubRecord } from "../data/departureHubs";
import { navigationHref } from "../utils/navigation";

/** Shared by the route adapter and prerenderer; no browser globals or widgets. */
export function DepartureHub({
  record,
  lang,
  hero,
  sections,
}: {
  record: DepartureHubRecord;
  lang: Language;
  /**
   * Optional page-specific header. A market with a designed hero passes it and
   * the plain text header below is not rendered; a market without one is
   * unchanged. /uk does not pass it.
   */
  hero?: React.ReactNode;
  /**
   * Optional page-specific section list. A market with a redesigned layout
   * passes it and the plain two-column grid below is not rendered; a market
   * without one is unchanged. /uk does not pass it.
   */
  sections?: React.ReactNode;
}) {
  const copy = record.copy[lang];
  const isBn = lang === "bn";
  return (
    <article data-departure-hub={record.market} className="space-y-10 sm:space-y-12">
      {hero ?? (
        <header className="max-w-3xl space-y-5">
          <h1 className={`ural-page-title text-3xl sm:text-4xl text-brand-navy ${isBn ? "leading-relaxed tracking-normal" : "leading-tight"}`} style={{ textWrap: "balance" }}>{copy.h1}</h1>
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">{copy.intro}</p>
          <p className="flex items-start gap-3 rounded-xl bg-brand-navy/5 p-5 text-sm leading-relaxed text-brand-navy">
            <Info size={18} aria-hidden="true" className="mt-1 shrink-0" />
            <span>{copy.qualification}</span>
          </p>
        </header>
      )}
      {sections ?? (
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {record.sections.map(section => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="min-w-0 scroll-mt-32 border-t border-slate-200 pt-5">
              <h2 id={`${section.id}-heading`} className="ural-section-title text-xl sm:text-2xl text-brand-navy">{section.title[lang]}</h2>
              <ul className="mt-3">
                {section.links.map(link => (
                  <li key={link.path}>
                    <a href={navigationHref(link.path, lang)} className="flex min-h-11 items-start gap-2 py-2.5 text-base font-medium leading-relaxed text-brand-emerald underline decoration-slate-300 underline-offset-4 hover:decoration-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald active:text-brand-navy">
                      <ArrowRight size={16} aria-hidden="true" className="mt-1 shrink-0" />
                      <span>{link.label[lang]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <footer className="space-y-4 border-t border-slate-200 pt-6">
        <p className="text-sm leading-relaxed text-slate-600">
          {isBn ? "এই গাইড সূচির লেখা সর্বশেষ হালনাগাদ: " : "This guide index was last updated: "}
          <time dateTime={record.updatedAt} className="font-medium text-brand-navy">
            {record.updatedAt}
          </time>
          {isBn ? "। প্রতিটি গাইডে তার তথ্যের তারিখ ও সূত্র দেখে নিন।" : ". Check the dates and sources in each guide."}
        </p>
        <a
          data-hub-home
          href={navigationHref("/", lang)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-gold px-6 py-3 text-sm font-black text-brand-navy transition-colors hover:bg-brand-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        >
          {isBn ? "URAL-এর আন্তর্জাতিক হোমপেজে ফিরুন" : "Back to URAL’s international homepage"}
        </a>
      </footer>
    </article>
  );
}
