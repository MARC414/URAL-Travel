import React from "react";
import { Building2, CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

import {
  AFFILIATE_LINKS,
  AFFILIATE_OFFER_REGISTRY,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import {
  KLOOK_HOTEL_CHECK_STEPS,
  getKlookHotelCommissionNote,
} from "./KlookHotelOffers";

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
 */
export function KlookHotelSpotlight({ city, lang = "en" }: KlookHotelSpotlightProps) {
  // A paused partner would make this Klook-specific copy false while
  // resolvePartnerUrl silently redirected readers to KKday. Hide it instead.
  if (
    AFFILIATE_OFFER_REGISTRY.klook.status === "paused" ||
    AFFILIATE_OFFER_REGISTRY.klookHotels.status === "paused"
  ) return null;

  const isBn = lang === "bn";
  const cityLabel = isBn ? CITY_BN[city] ?? city : city;
  const href = resolvePartnerUrl(AFFILIATE_LINKS.klookHotels);

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
          {isBn ? "পার্টনার হোটেল যাচাই · Klook" : "PARTNER HOTEL CHECK · KLOOK"}
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
          ? `${cityLabel}-এ রুম বুক করার আগে Klook-এ দ্বিতীয় দাম দেখুন`
          : `Before you book a ${city} room, get a second quote on Klook`}
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
        {isBn
          ? `Klook-এর বাছাইকৃত হোটেল তালিকা নতুন ট্যাবে খুলবে। ${cityLabel}-এ থাকার বিকল্প দেখতে Klook-এ গন্তব্য, তারিখ ও অতিথিসংখ্যা দিন। তালিকার ক্রম Klook-এর নিজস্ব বুকিং ডেটার ভিত্তিতে, স্বতন্ত্র মানের রেটিং নয়।`
          : `Klook's curated hotel collection opens in a new tab. Enter ${city}, your dates and guest count on Klook to find available stays. Its selection reflects Klook's own booking data, not an independent quality rating.`}
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

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-gold px-4 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-[#FFC654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          {isBn ? "Klook-এর বাছাইকৃত হোটেল দেখুন" : "Browse Klook’s Curated Hotels"}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
        <a
          href="#hotel-curated-stays"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          {isBn ? "বাছাইকৃত তালিকায় ফিরুন" : "Back to the curated list"}
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
