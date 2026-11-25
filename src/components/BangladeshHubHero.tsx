import { Info } from "lucide-react";

import type { Language } from "../translations";
import type { DepartureHubRecord } from "../data/departureHubs";
import { ResponsiveImage } from "./ResponsiveImage";

/**
 * Photo hero for the Bangladesh departure hub.
 *
 * WHY A SEPARATE COMPONENT
 * ------------------------
 * `DepartureHub` is shared with /uk. That page keeps its text header, so this
 * file holds the whole redesigned header and is handed to the shared component
 * through its optional `hero` prop. Nothing here can reach another route.
 *
 * WHAT THE BUILD TESTS REQUIRE (scripts/bangladeshHubChecks.ts)
 * ------------------------------------------------------------
 * - exactly one <h1> per page, carrying the record's localized h1;
 * - the record's full `intro` and `qualification` stay visible inside
 *   [data-departure-hub="bangladesh"];
 * - the five guide <section id> blocks stay the only ones, in record order;
 * - the only anchors inside a <section> are the guide links.
 *
 * So the hero is a <header> + <div>, never a <section>, and its two actions are
 * in-page anchors that jump to the guide sections below.
 *
 * PHOTOGRAPH HONESTY
 * ------------------
 * The alt text describes what the frame shows — wide-body airliners on the
 * apron, seen from the terminal — and never claims an airport, an airline or a
 * terminal by name. Two library files whose names say "Dhaka airport" and
 * "Bangladesh e-passport" actually show Heathrow and British passports; the
 * file name is not evidence, so no altitude is put on one here.
 *
 * CHOICE OF FRAME
 * ---------------
 * Every section page already holds its own hero (flights: Heathrow take-off,
 * visa: visa desk, hotels: room). This hub had none. The apron of parked
 * wide-bodies is the one picture in the library that shows the aircraft a reader
 * leaving Dhaka actually boards, and it is not carried as a hero anywhere else.
 */
const HERO_IMAGE =
  "/assets/images/dhaka_airport_widebody_airlines_tarmac_1790520836931-1200.webp";

const HERO_ALT: Record<Language, string> = {
  en: "Wide-body airliners lined up on the apron, seen from the terminal windows before a long-haul departure.",
  bn: "দীর্ঘ দূরত্বের যাত্রার আগে টার্মিনালের জানালা থেকে অ্যাপ্রনে সারিবদ্ধ উড়োজাহাজ।",
};

export function BangladeshHubHero({
  record,
  lang,
}: {
  record: DepartureHubRecord;
  lang: Language;
}) {
  const copy = record.copy[lang];
  const isBn = lang === "bn";
  const hero = copy.hero;
  const firstSectionId = record.sections[0]?.id ?? "flights";
  const secondSectionId = record.sections[1]?.id ?? "entry";

  return (
    <header data-departure-hub-hero={record.market} className="space-y-6 sm:space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-brand-navy text-white shadow-xl">
        <ResponsiveImage
          src={HERO_IMAGE}
          sizes="(min-width: 1280px) 1216px, 100vw"
          alt={HERO_ALT[lang]}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Two overlays: bottom-up for the stacked mobile crop, left-right on desktop. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/60 to-brand-navy/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-brand-navy/95 via-brand-navy/45 to-transparent sm:block"
        />

        <div className="relative z-10 flex min-h-[380px] flex-col justify-end gap-5 p-6 sm:min-h-[420px] sm:p-9 lg:min-h-[460px] lg:p-12">
          <h1
            className={`ural-page-title max-w-[20ch] text-3xl text-white sm:text-4xl ${
              isBn ? "leading-relaxed tracking-normal" : "leading-tight"
            }`}
            style={{ textWrap: "balance" }}
          >
            {copy.h1}
          </h1>

          {hero ? (
            <>
              <p className="max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg">
                {hero.lead}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`#${firstSectionId}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {hero.primaryLabel}
                </a>
                <a
                  href={`#${secondSectionId}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {hero.secondaryLabel}
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* What the index covers, and the passport caveat that must stay visible. */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{copy.intro}</p>
        <p className="flex items-start gap-3 rounded-xl bg-brand-navy/5 p-5 text-sm leading-relaxed text-brand-navy">
          <Info size={18} aria-hidden="true" className="mt-1 shrink-0" />
          <span>{copy.qualification}</span>
        </p>
      </div>
    </header>
  );
}
