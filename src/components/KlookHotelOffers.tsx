import React from "react";
import { ExternalLink } from "lucide-react";

import {
  AFFILIATE_LINKS,
  AFFILIATE_OFFER_REGISTRY,
  KLOOK_PROMO,
  isPromoActive,
  resolvePartnerUrl,
} from "./AffiliatePartners";

/**
 * Klook hotel-offer content.
 *
 * These constants and the blog callout live OUTSIDE `AffiliatePartners.tsx`
 * because that module is part of the eager entry chunk. The copy below is only
 * needed on hotel and blog routes, which are lazy chunks, and putting ~150
 * lines of bilingual marketing prose in the entry graph pushed the homepage
 * over its 205 KB gzip budget. The registry itself (`AFFILIATE_LINKS`,
 * `AFFILIATE_OFFER_REGISTRY`, `KLOOK_PROMO`) stays in AffiliatePartners.
 */

/**
 * Evergreen Klook hotel disclosure. This exact wording is what the prerendered
 * HTML carries, because a static file built during the promotion would otherwise
 * keep an expired rate claim in cached HTML after December 31, 2026.
 */
export const KLOOK_HOTEL_COMMISSION_NOTE = {
  en: "Commission note: URAL may earn a commission on qualifying Klook hotel bookings. That is our revenue, not a traveller discount — you pay the price Klook shows.",
  bn: "কমিশন নোট: যোগ্য Klook হোটেল বুকিংয়ে URAL কমিশন পেতে পারে। এটি আমাদের আয়, ভ্রমণকারীর জন্য ছাড় নয়—আপনি Klook-এ যে দাম দেখবেন সেটাই দেবেন।",
} as const;

/**
 * Commission disclosure for the Klook hotel module. The time-limited 8% claim is
 * shown only while `KLOOK_PROMO.expiresAt` is still in the future (BST); after
 * that the evergreen sentence above takes over with no rebuild required.
 */
export function getKlookHotelCommissionNote(lang: "en" | "bn" = "en"): string {
  if (!isPromoActive(KLOOK_PROMO.expiresAt)) return KLOOK_HOTEL_COMMISSION_NOTE[lang];
  return lang === "bn"
    ? `কমিশন নোট: ${KLOOK_PROMO.validUntilBn} পর্যন্ত যোগ্য Klook হোটেল বুকিংয়ে URAL ${KLOOK_PROMO.hotelsRateBn} পাবলিশার কমিশন পায়। এটি আমাদের আয়, ভ্রমণকারীর জন্য ছাড় নয়—আপনি Klook-এ যে দাম দেখবেন সেটাই দেবেন।`
    : `Commission note: URAL earns ${KLOOK_PROMO.hotelsRate} publisher commission on qualifying Klook hotel bookings through ${KLOOK_PROMO.validUntil}. That is our revenue, not a traveller discount — you pay the price Klook shows.`;
}

/**
 * The three comparison rules shown inside the Klook hotel module.
 *
 * They live here, once, because the hydrated component and the prerendered
 * static HTML both render them in both languages. Four hand-maintained copies
 * of the same bilingual list is how English and Bengali drift apart, and how a
 * static page keeps advice the component has already changed.
 */
export const KLOOK_HOTEL_CHECK_STEPS = {
  en: [
    {
      title: "Keep the area shortlist",
      body: "Pick two or three areas from the neighborhood comparison above before comparing prices.",
    },
    {
      title: "Match dates and guests",
      body: "A two-person room rate is not a family-room rate. Use the same nights and occupancy on both sites.",
    },
    {
      title: "Compare the checkout total",
      body: "Taxes, service charge, breakfast and the cancellation deadline change the real price.",
    },
  ],
  bn: [
    {
      title: "এলাকার শর্টলিস্ট ঠিক রাখুন",
      body: "দাম তুলনার আগে ওপরের এলাকা তুলনা থেকে দুই-তিনটি এলাকা বেছে নিন।",
    },
    {
      title: "তারিখ ও অতিথিসংখ্যা মিলান",
      body: "দুই জনের রুমের দাম পরিবারের রুমের দাম নয়। দুই সাইটেই একই রাত ও একই অতিথিসংখ্যা দিন।",
    },
    {
      title: "চূড়ান্ত মোট দাম মিলান",
      body: "ট্যাক্স, সার্ভিস চার্জ, ব্রেকফাস্ট ও বাতিলের শেষ সময় আসল দাম বদলে দেয়।",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   Klook hotel-collection placement
   -------------------------------------------------------------------------
   The partner provided a Travelpayouts-tracked deep link to Klook's curated
   Asia hotel collection. Hotel placements use that dedicated link; general
   Klook links remain separate for tours, activities and attractions. The copy
   treats Klook as a second quote, never as a discount for the traveller.
   --------------------------------------------------------------------------- */

export interface KlookHotelBlogPlacement {
  badgeEn: string;
  badgeBn: string;
  headlineEn: string;
  headlineBn: string;
  bodyEn: string;
  bodyBn: string;
  buttonEn: string;
  buttonBn: string;
}

export const KLOOK_HOTEL_BLOG_PLACEMENTS: Record<string, KlookHotelBlogPlacement> = {
  "hotel-savings-guide-bangkok-kl-dubai": {
    badgeEn: "🏨 HOTEL PRICE CHECK · KLOOK",
    badgeBn: "🏨 হোটেলের দাম যাচাই · Klook",
    headlineEn: "Comparing Bangkok, Kuala Lumpur or Dubai hotels? Get a second quote on Klook",
    headlineBn: "ব্যাংকক, কুয়ালালামপুর বা দুবাইয়ের হোটেল তুলনা করছেন? Klook-এ দ্বিতীয় দাম দেখুন",
    bodyEn:
      "Open Klook's curated Asia hotel collection and search there for your destination. Match the same nights and guest count, then compare the checkout total — including taxes, service charge, breakfast and the cancellation deadline — against the BDT guide figures in this article. The collection reflects Klook's own booking data, not an independent quality rating.",
    bodyBn:
      "Klook-এর বাছাইকৃত এশিয়া হোটেল তালিকা খুলে সেখানে আপনার গন্তব্য খুঁজুন। একই রাত ও অতিথিসংখ্যা দিয়ে ট্যাক্স, সার্ভিস চার্জ, ব্রেকফাস্ট এবং বাতিলের শেষ সময়সহ চূড়ান্ত মোট দাম এই লেখার BDT হিসাবের সঙ্গে তুলনা করুন। তালিকাটি Klook-এর নিজস্ব বুকিং ডেটার ভিত্তিতে, স্বতন্ত্র মানের রেটিং নয়।",
    buttonEn: "Browse Klook’s curated hotel collection",
    buttonBn: "Klook-এর বাছাইকৃত হোটেল তালিকা দেখুন",
  },
};

export function KlookHotelBlogCallout({
  slug,
  lang = "en"
}: {
  slug: string;
  lang?: "en" | "bn";
}) {
  const placement = KLOOK_HOTEL_BLOG_PLACEMENTS[slug];
  if (!placement) return null;
  // If Klook is ever paused, resolvePartnerUrl would send readers to KKday while
  // this copy kept naming Klook. Hiding the placement is the honest failure mode.
  if (
    AFFILIATE_OFFER_REGISTRY.klook.status === "paused" ||
    AFFILIATE_OFFER_REGISTRY.klookHotels.status === "paused"
  ) return null;

  const isBn = lang === "bn";
  const href = resolvePartnerUrl(AFFILIATE_LINKS.klookHotels);

  return (
    <aside
      aria-label={isBn ? "Klook হোটেলের দাম যাচাই" : "Klook hotel price check"}
      className="relative overflow-hidden rounded-2xl bg-brand-navy p-5 text-white shadow-lg sm:p-6 space-y-3 text-left"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-[#FFD27A] to-brand-gold" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-gold text-brand-navy px-2.5 py-1 rounded-md">
          {isBn ? placement.badgeBn : placement.badgeEn}
        </span>
        <span className="text-[11px] font-mono text-slate-300">
          {isBn ? "নতুন ট্যাবে খুলবে" : "Opens in a new tab"}
        </span>
      </div>

      <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug text-balance">
        {isBn ? placement.headlineBn : placement.headlineEn}
      </h3>

      <p className="text-xs sm:text-[13.5px] text-slate-200 leading-relaxed">
        {isBn ? placement.bodyBn : placement.bodyEn}
      </p>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-gold px-4 py-2.5 text-xs font-bold text-brand-navy transition-colors hover:bg-[#FFC654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          {isBn ? placement.buttonBn : placement.buttonEn}
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>

      <p className="border-t border-white/10 pt-3 text-[11px] leading-5 text-slate-300">
        {getKlookHotelCommissionNote(lang)}
      </p>
    </aside>
  );
}
