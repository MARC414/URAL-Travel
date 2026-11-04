import React from "react";
import { Building2, CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

import {
  AFFILIATE_LINKS,
  AFFILIATE_OFFER_REGISTRY,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import {
  KLOOK_CURATED_HOTEL_PICKS,
  KLOOK_HOTEL_CHECK_STEPS,
  KLOOK_PICKS_CHECKED_AT,
  KLOOK_PICKS_PROVENANCE,
  KLOOK_PICK_SIGNALS,
  buildKlookHotelDetailLink,
  getKlookHotelCommissionNote,
  groupKlookPicksByArea,
} from "./KlookHotelOffers";
import { getHotelGuideAffiliatePlacement } from "../utils/affiliatePlacement";

const CITY_BN: Record<string, string> = {
  Kathmandu: "কাঠমান্ডু",
  Bangkok: "ব্যাংকক",
  "Kuala Lumpur": "কুয়ালালামপুর",
  Dubai: "দুবাই",
  Singapore: "সিঙ্গাপুর",
  "Malé & Maafushi": "মালে ও মাফুশি",
};

const DUAL_CURRENCY_GUIDE = {
  en: "/blog/dual-currency-card-endorsement-bangladesh",
  bn: "/bn/blog/dual-currency-card-endorsement-bangladesh",
} as const;

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

interface KlookHotelSpotlightProps {
  /** English city label from the hotel guide, used to key the Bengali label. */
  city: string;
  guideId: string;
  lang?: "en" | "bn";
}

/**
 * Second-quote module for the hotel guides.
 *
 * It sits beside accommodation content instead of running site-wide, and it
 * treats Klook as another quote for the areas already shortlisted above — not
 * as a traveller discount. The 8% figure is URAL's publisher commission and is
 * dropped automatically after KLOOK_PROMO.expiresAt (BST); the evergreen
 * sentence keeps the link useful afterwards.
 *
 * The hotel button uses the partner-provided tracked deep link to open the
 * curated hotel collection. Selected city/date/guest details are not forwarded,
 * so the copy tells travellers to enter those on Klook.
 *
 * Bangkok and Kuala Lumpur also get a shortlist pulled from the partner feed.
 * Each row carries the area, an area-fit note and Klook's own booking signal,
 * never a URAL verdict: the feed has no rates, room types or inspection notes,
 * so the checked date and the provenance line state exactly what was read.
 */
export function KlookHotelSpotlight({ city, guideId, lang = "en" }: KlookHotelSpotlightProps) {
  // A paused partner would make this Klook-specific copy false while
  // resolvePartnerUrl silently redirected readers to KKday. Hide it instead.
  if (
    AFFILIATE_OFFER_REGISTRY.klook.status === "paused" ||
    AFFILIATE_OFFER_REGISTRY.klookHotels.status === "paused"
  ) return null;

  const isBn = lang === "bn";
  const cityLabel = isBn ? CITY_BN[city] ?? city : city;
  const href = resolvePartnerUrl(AFFILIATE_LINKS.klookHotels);
  const curatedPicks = KLOOK_CURATED_HOTEL_PICKS[guideId] ?? [];
  const pickGroups = groupKlookPicksByArea(curatedPicks);

  const steps = KLOOK_HOTEL_CHECK_STEPS[lang];

  return (
    <section
      id="hotel-klook-check"
      aria-labelledby="klook-hotel-check-title"
      className="ural-guide-jump-target relative overflow-hidden rounded-2xl bg-brand-navy p-5 text-white shadow-lg sm:p-7"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-[#FFD27A] to-brand-gold"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">
          <Building2 size={14} aria-hidden="true" />
          {isBn ? "পার্টনার হোটেল সার্চ · Klook" : "PARTNER HOTEL SEARCH · KLOOK"}
        </span>
        <span className="rounded-md border border-white/15 px-2 py-0.5 font-mono text-[10px] text-slate-300">
          {isBn ? "নতুন ট্যাবে খুলবে" : "OPENS IN A NEW TAB"}
        </span>
      </div>

      <h2
        id="klook-hotel-check-title"
        className="mt-3 max-w-2xl font-serif text-xl font-black leading-tight text-white text-balance sm:text-2xl"
      >
        {isBn
          ? `${cityLabel}-এর থাকার বিকল্প খুঁজতে Klook-এর হোটেল তালিকা সার্চ করুন`
          : `Search Klook’s hotel collection for ${city}`}
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
        {isBn
          ? `এই লিংকটি Klook-এর সাধারণ হোটেল তালিকা খুলবে—নির্বাচিত হোটেল বা আপনার তারিখের লাইভ কোট নয়। ${cityLabel}-এর বিকল্প খুঁজতে Klook-এ গন্তব্য, তারিখ ও অতিথিসংখ্যা আবার দিন। তালিকার ক্রম Klook-এর নিজস্ব বুকিং ডেটার ভিত্তিতে, স্বতন্ত্র মানের রেটিং নয়।`
          : `This link opens Klook’s general hotel collection, not a live quote for a selected property or your dates. Re-enter ${city}, your dates and guest count on Klook to search current options. Its selection reflects Klook’s own booking data, not an independent quality rating.`}
      </p>

      <ol className="mt-4 grid gap-2 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="font-mono text-[10px] font-bold text-brand-gold">
              {isBn ? `০${BENGALI_DIGITS[index + 1]}` : `0${index + 1}`}
            </span>
            <span className="mt-1 block text-xs font-semibold text-white">{step.title}</span>
            <span className="mt-1 block text-[11px] leading-5 text-slate-300">{step.body}</span>
          </li>
        ))}
      </ol>

      {curatedPicks.length > 0 && (
        <div className="mt-5 rounded-xl border border-white/15 bg-white/[0.03] p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
            <h3 className="min-w-0 font-serif text-sm font-bold text-white sm:text-base">
              {isBn
                ? `${cityLabel}-এর এলাকা অনুযায়ী Klook হোটেল শর্টলিস্ট`
                : `Klook hotel picks in ${city} by area`}
            </h3>
            <span className="shrink-0 rounded-md border border-white/15 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              {isBn
                ? `যাচাই: ${KLOOK_PICKS_CHECKED_AT.bn}`
                : `Checked ${KLOOK_PICKS_CHECKED_AT.en}`}
            </span>
          </div>

          <div className="mt-3.5 space-y-3.5">
            {pickGroups.map((group) => (
              <div key={group.areaEn}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                  {isBn ? group.areaBn : group.areaEn}
                </p>
                <ul className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {group.picks.map((pick) => (
                    <li key={pick.hotelId}>
                      <a
                        href={buildKlookHotelDetailLink(pick.hotelId, pick.subId)}
                        data-affiliate-placement={pick.subId}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        aria-label={
                          isBn
                            ? `${pick.name} — Klook-এ নতুন ট্যাবে দেখুন`
                            : `${pick.name} — open on Klook in a new tab`
                        }
                        className="group flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-brand-gold/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-bold text-white group-hover:text-brand-gold">
                            {pick.name}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-4 text-slate-300">
                            {isBn ? pick.bestForBn : pick.bestForEn}
                          </span>
                          <span className="mt-1 block text-[10px] leading-4 text-slate-400">
                            {isBn ? KLOOK_PICK_SIGNALS[pick.signal].bn : KLOOK_PICK_SIGNALS[pick.signal].en}
                          </span>
                        </span>
                        <ExternalLink
                          size={13}
                          className="shrink-0 text-slate-400 group-hover:text-brand-gold"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-3.5 border-t border-white/10 pt-2.5 text-[10px] leading-4 text-slate-400">
            {isBn ? KLOOK_PICKS_PROVENANCE.bn : KLOOK_PICKS_PROVENANCE.en}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={href}
          data-affiliate-placement={getHotelGuideAffiliatePlacement(guideId)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-gold px-4 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-[#FFC654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          {isBn ? "Klook-এ হোটেল সার্চ করুন" : "Search Klook hotel collection"}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
        <a
          href="#hotel-curated-stays"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          {isBn ? "তুলনার চেকলিস্টে ফিরুন" : "Back to the comparison checklist"}
        </a>
      </div>

      <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-[11px] leading-5 text-slate-300 sm:grid-cols-2">
        <p className="flex gap-2">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
          <span>{getKlookHotelCommissionNote(lang)}</span>
        </p>
        <p className="flex gap-2">
          <CreditCard size={14} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
          <span>
            {isBn
              ? "Klook হোটেলের নিজস্ব মুদ্রায় চার্জ করে। BDT-তে বদলে তুলনার আগে কার্ডের বিদেশি লেনদেন ফি জেনে নিন। "
              : "Klook charges in the hotel's own currency. Check your card's foreign-transaction fee before comparing a converted BDT amount. "}
            <a
              href={DUAL_CURRENCY_GUIDE[lang]}
              className="font-semibold text-white underline decoration-brand-gold decoration-2 underline-offset-2 hover:text-brand-gold"
            >
              {isBn ? "ডুয়াল-কারেন্সি কার্ড গাইড" : "Dual-currency card guide"}
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
