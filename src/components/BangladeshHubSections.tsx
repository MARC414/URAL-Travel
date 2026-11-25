import { EvisaBanner } from "./EvisaPanels";
import { FileCheck, Luggage, Moon, Plane, Wallet } from "lucide-react";

import type { Language } from "../translations";
import type { DepartureHubRecord } from "../data/departureHubs";
import { navigationHref } from "../utils/navigation";

/**
 * Redesigned guide sections for the Bangladesh departure hub (Direction 1:
 * decision cards). Refined against the Hallmark gates — no icon-in-rounded-tile
 * above the heading, varied section rhythm, no arrow glued to link text.
 *
 * Contract preserved for scripts/bangladeshHubChecks.ts:
 * - five <section id> blocks, in record order;
 * - exactly the record's links inside them, in order, with matching text;
 * - the jump bar and the earning strip are <nav>/<div>, not <section>.
 */
const SECTION_ICONS = {
  flights: Plane,
  entry: FileCheck,
  money: Wallet,
  preparation: Luggage,
  pilgrimage: Moon,
} as const;

export function BangladeshHubSections({
  record,
  lang,
}: {
  record: DepartureHubRecord;
  lang: Language;
}) {
  const isBn = lang === "bn";
  const [flightsSection, ...otherSections] = record.sections;

  // Generic hosted flight-search handoff (Travelpayouts Page 24232).
  // BDT default for a Bangladesh departure, locale follows the reader.
  const flightSearchUrl = `https://flights.uraltravel.co.uk/?currency=BDT&locale=${lang === "bn" ? "bn" : "en"}`;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Earning strip — two partner shortcuts, disclosed as advertising. */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm font-medium text-brand-navy">
          {isBn ? "যাত্রার আগে দ্রুত শর্টকাট" : "Quick shortcuts before you go"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={flightSearchUrl}
            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            {isBn ? "ঢাকা থেকে ফ্লাইট খুঁজুন" : "Search flights from Dhaka"}
          </a>
          <EvisaBanner
            size="horizontal"
            campaign="uae"
            lang={lang}
            placement="bangladesh-hub"
          />
        </div>
      </div>

      {/* Jump bar — quiet, text-only, scrolls to a section. */}
      <nav
        aria-label={isBn ? "গাইড বিভাগ" : "Guide sections"}
        className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm"
      >
        {record.sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-brand-emerald underline decoration-slate-300 underline-offset-4 transition-colors hover:decoration-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald"
          >
            {section.title[lang]}
          </a>
        ))}
      </nav>

      {/* Flights: the primary action, given the full width as a horizontal band. */}
      {flightsSection ? (
        <section
          id={flightsSection.id}
          aria-labelledby={`${flightsSection.id}-heading`}
          className="scroll-mt-32 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <Plane
              size={20}
              aria-hidden="true"
              className="shrink-0 text-brand-emerald"
            />
            <h2
              id={`${flightsSection.id}-heading`}
              className="ural-section-title text-xl text-brand-navy sm:text-2xl"
            >
              {flightsSection.title[lang]}
            </h2>
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {flightsSection.links.map((link, i) => (
              <li key={link.path}>
                <a
                  href={navigationHref(link.path, lang)}
                  className="inline-flex min-h-11 items-center py-1 text-base leading-relaxed text-brand-emerald underline decoration-slate-300 underline-offset-4 hover:decoration-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald"
                >
                  <span className={i === 0 ? "font-semibold" : undefined}>
                    {link.label[lang]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Centered home button — no arrow, bilingual. */}
      <div className="flex justify-center">
        <a
          href={navigationHref("/", lang)}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-emerald hover:text-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald"
        >
          {isBn ? "URAL-এর আন্তর্জাতিক হোমপেজে ফিরুন" : "Back to URAL’s international homepage"}
        </a>
      </div>

      {/* Other sections: two per row, compact, icon inline with the title. */}
      <div className="grid gap-5 sm:grid-cols-2">
        {otherSections.map((section) => {
          const Icon =
            SECTION_ICONS[section.id as keyof typeof SECTION_ICONS] ?? Plane;
          return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="min-w-0 scroll-mt-32 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-brand-emerald"
                />
                <h2
                  id={`${section.id}-heading`}
                  className="ural-section-title text-xl text-brand-navy sm:text-2xl"
                >
                  {section.title[lang]}
                </h2>
              </div>
              <ul className="mt-3 space-y-1">
                {section.links.map((link, i) => (
                  <li key={link.path}>
                    <a
                      href={navigationHref(link.path, lang)}
                      className="inline-flex min-h-11 items-center py-1 text-base leading-relaxed text-brand-emerald underline decoration-slate-300 underline-offset-4 hover:decoration-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald"
                    >
                      <span className={i === 0 ? "font-semibold" : undefined}>
                        {link.label[lang]}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
