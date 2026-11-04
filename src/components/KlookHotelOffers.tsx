import React from "react";
import { ExternalLink } from "lucide-react";

import { getBlogHotelAffiliatePlacement } from "../utils/affiliatePlacement";

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
 * Builds a tracked Klook affiliate deep link using the `.tpo.li` short-link
 * forwarding parameter (`?u=<encoded-klook-url>&sub_id=<placementId>`),
 * while preserving `resolvePartnerUrl()` pause/fallback protection.
 */
export function buildKlookDeepLink(
  targetUrl: string,
  subId?: string,
  partnerKey: "klookHotels" | "klook" = "klookHotels"
): string {
  const base = resolvePartnerUrl(AFFILIATE_LINKS[partnerKey]);
  if (
    AFFILIATE_OFFER_REGISTRY.klook.status === "paused" ||
    AFFILIATE_OFFER_REGISTRY[partnerKey].status === "paused"
  ) {
    return base;
  }
  const encodedTarget = encodeURIComponent(targetUrl.trim());
  return subId
    ? `${base}?u=${encodedTarget}&sub_id=${encodeURIComponent(subId.trim())}`
    : `${base}?u=${encodedTarget}`;
}

/**
 * Builds a tracked Klook hotel detail URL (`https://www.klook.com/hotels/detail/<id>`)
 * routed through `AFFILIATE_LINKS.klookHotels` with an optional Travelpayouts `sub_id`.
 */
export function buildKlookHotelDetailLink(
  hotelId: string | number,
  subId?: string
): string {
  return buildKlookDeepLink(
    `https://www.klook.com/hotels/detail/${String(hotelId).trim()}`,
    subId,
    "klookHotels"
  );
}

export type KlookPickSignal = "popular" | "value" | "rising";

/**
 * The partner feed labels a hotel "Hot selling", "Great prices" or "High growth".
 * Those are Klook's booking signals, not an independent quality or price audit,
 * so the reader-facing labels say who said it instead of repeating the claim.
 */
export const KLOOK_PICK_SIGNALS: Record<KlookPickSignal, { en: string; bn: string }> = {
  popular: { en: "Frequently booked on Klook", bn: "Klook-এ বেশি বুকিং" },
  value: { en: "Klook flags it for value", bn: "Klook-এ ভ্যালু হিসেবে চিহ্নিত" },
  rising: { en: "Rising demand on Klook", bn: "Klook-এ চাহিদা বাড়ছে" },
};

/** The date the partner feed was read. Update it when the picks are re-checked. */
export const KLOOK_PICKS_CHECKED_AT = {
  en: "4 November 2026",
  bn: "৪ নভেম্বর ২০২৬",
} as const;

/**
 * Why the picks exist at all, in one sentence a reader can check us against.
 * The feed does not include rates, room types or inspection notes, so the page
 * cannot claim any of them.
 */
export const KLOOK_PICKS_PROVENANCE = {
  en: "Source: the Klook partner hotel feed, checked 4 November 2026. URAL has not inspected these properties or verified their rates. The signals are Klook booking labels, not URAL ratings.",
  bn: "সূত্র: Klook পার্টনার হোটেল ফিড, ৪ নভেম্বর ২০২৬-এ যাচাই করা। URAL এই হোটেলগুলো নিজে পরিদর্শন করেনি বা রেট যাচাই করেনি। সংকেতগুলো Klook-এর বুকিং লেবেল, URAL-এর রেটিং নয়।",
} as const;

export interface KlookCuratedHotelPick {
  hotelId: string;
  name: string;
  areaEn: string;
  areaBn: string;
  /** Area-fit framing, not a property claim. */
  bestForEn: string;
  bestForBn: string;
  signal: KlookPickSignal;
  subId: string;
}

/** Preserves the editorial order of the picks while grouping them by area. */
export function groupKlookPicksByArea(picks: readonly KlookCuratedHotelPick[]) {
  const groups: { areaEn: string; areaBn: string; picks: KlookCuratedHotelPick[] }[] = [];
  for (const pick of picks) {
    const group = groups.find((entry) => entry.areaEn === pick.areaEn);
    if (group) group.picks.push(pick);
    else groups.push({ areaEn: pick.areaEn, areaBn: pick.areaBn, picks: [pick] });
  }
  return groups;
}

/**
 * Curated Klook hotel picks from the Travelpayouts/Klook partner feed for
 * URAL's Bangkok and Kuala Lumpur hotel guides. Each card links to the property
 * page on Klook (`?u=https://www.klook.com/hotels/detail/<id>&sub_id=...`) so
 * readers can inspect live dates, room terms and final checkout totals directly.
 */
export const KLOOK_CURATED_HOTEL_PICKS: Record<string, readonly KlookCuratedHotelPick[]> = {
  "bangkok-hotels": [
    {
      hotelId: "279724",
      name: "Vince Hotel Pratunam",
      areaEn: "Pratunam",
      areaBn: "প্রাতুনাম",
      bestForEn: "Market and mall days on foot in Pratunam",
      bestForBn: "প্রাতুনামে হেঁটেই মার্কেট ও মল",
      signal: "value",
      subId: "hotel_bkk_pratunam_vince",
    },
    {
      hotelId: "427421",
      name: "Grand Diamond Suites Hotel",
      areaEn: "Pratunam",
      areaBn: "প্রাতুনাম",
      bestForEn: "A Pratunam base that keeps the shopping cluster close",
      bestForBn: "শপিং এলাকার কাছে থেকে প্রাতুনামে ওঠা",
      signal: "popular",
      subId: "hotel_bkk_pratunam_diamond",
    },
    {
      hotelId: "278632",
      name: "Grande Centre Point Terminal 21",
      areaEn: "Sukhumvit (Asok)",
      areaBn: "সুখুম্ভিত (আসোক)",
      bestForEn: "Asok transport and the Terminal 21 mall next door",
      bestForBn: "আসোকের যাতায়াত ও পাশের টার্মিনাল ২১ মল",
      signal: "popular",
      subId: "hotel_bkk_sukhumvit_terminal21",
    },
    {
      hotelId: "285240",
      name: "Carlton Hotel Bangkok Sukhumvit",
      areaEn: "Sukhumvit",
      areaBn: "সুখুম্ভিত",
      bestForEn: "Sukhumvit nights without the Pratunam crowds",
      bestForBn: "প্রাতুনামের ভিড় এড়িয়ে সুখুম্ভিতে থাকা",
      signal: "value",
      subId: "hotel_bkk_sukhumvit_carlton",
    },
    {
      hotelId: "1085275",
      name: "Chatrium Grand Bangkok",
      areaEn: "Siam",
      areaBn: "সিয়াম",
      bestForEn: "Siam shopping and BTS connections",
      bestForBn: "সিয়ামের শপিং ও বিটিএস সংযোগ",
      signal: "popular",
      subId: "hotel_bkk_siam_chatrium",
    },
    {
      hotelId: "442026",
      name: "Chatrium Hotel Riverside Bangkok",
      areaEn: "Riverside",
      areaBn: "রিভারসাইড",
      bestForEn: "A riverside base instead of a mall-side one",
      bestForBn: "মলের পাশে নয়, নদীর ধারে ওঠা",
      signal: "popular",
      subId: "hotel_bkk_riverside_chatrium",
    },
  ],
  "kuala-lumpur-hotels": [
    {
      hotelId: "1233964",
      name: "Sleeping Lion Suites",
      areaEn: "Bukit Bintang",
      areaBn: "বুকিত বিনতাং",
      bestForEn: "Bukit Bintang food and shopping on foot",
      bestForBn: "বুকিত বিনতাংয়ে হেঁটেই খাবার ও শপিং",
      signal: "value",
      subId: "hotel_kl_bb_sleeping_lion",
    },
    {
      hotelId: "1284910",
      name: "Hotel Royal Signature",
      areaEn: "Bukit Bintang",
      areaBn: "বুকিত বিনতাং",
      bestForEn: "A central Bukit Bintang base for a short trip",
      bestForBn: "ছোট ভ্রমণে বুকিত বিনতাংয়ের কেন্দ্রে ওঠা",
      signal: "popular",
      subId: "hotel_kl_bb_royal_signature",
    },
    {
      hotelId: "1422152",
      name: "Imperial Lexis Kuala Lumpur",
      areaEn: "KLCC",
      areaBn: "কেএলসিসি (KLCC)",
      bestForEn: "KLCC skyline stays close to the park",
      bestForBn: "পার্কের কাছে কেএলসিসি এলাকায় ওঠা",
      signal: "rising",
      subId: "hotel_kl_klcc_imperial_lexis",
    },
    {
      hotelId: "7961",
      name: "THE FACE Style Hotel",
      areaEn: "KLCC / City Centre",
      areaBn: "কেএলসিসি / সিটি সেন্টার",
      bestForEn: "Between KLCC and the city centre, walkable to both",
      bestForBn: "কেএলসিসি ও সিটি সেন্টারের মাঝখানে, দুটোই হাঁটার দূরত্বে",
      signal: "rising",
      subId: "hotel_kl_klcc_face_style",
    },
    {
      hotelId: "449088",
      name: "Cititel Mid Valley",
      areaEn: "Mid Valley / KL Sentral link",
      areaBn: "মিড ভ্যালি / কেএল সেন্ট্রাল সংযোগ",
      bestForEn: "Mid Valley shopping with the KL Sentral rail link",
      bestForBn: "মিড ভ্যালি শপিং ও কেএল সেন্ট্রাল রেল সংযোগ",
      signal: "value",
      subId: "hotel_kl_midvalley_cititel",
    },
    {
      hotelId: "427403",
      name: "Sunway Pyramid Hotel",
      areaEn: "Sunway City (Family Resort)",
      areaBn: "সানওয়ে সিটি (ফ্যামিলি রিসোর্ট)",
      bestForEn: "Families basing the trip at Sunway City",
      bestForBn: "পরিবার নিয়ে সানওয়ে সিটিকে ঘিরে ভ্রমণ",
      signal: "popular",
      subId: "hotel_kl_sunway_pyramid",
    },
  ],
};

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
    badgeEn: "🏨 PARTNER HOTEL SEARCH · KLOOK",
    badgeBn: "🏨 পার্টনার হোটেল সার্চ · Klook",
    headlineEn: "Need current hotel options? Search Klook’s collection",
    headlineBn: "বর্তমান হোটেল বিকল্প খুঁজছেন? Klook-এর তালিকা সার্চ করুন",
    bodyEn:
      "This tracked link opens Klook’s general Asia hotel collection, not a live quote for a selected property or your dates. Re-enter your destination, dates and guest count on Klook, then compare the same room basis and checkout total — including taxes, service charges, meals and cancellation terms. The collection reflects Klook’s own booking data, not an independent quality rating.",
    bodyBn:
      "এই ট্র্যাক করা লিংকটি Klook-এর সাধারণ এশিয়া হোটেল তালিকা খুলবে—নির্বাচিত হোটেল বা আপনার তারিখের লাইভ কোট নয়। Klook-এ গন্তব্য, তারিখ ও অতিথিসংখ্যা আবার দিয়ে একই রুমের শর্তে ট্যাক্স, সার্ভিস চার্জ, খাবার ও বাতিলের নিয়মসহ চূড়ান্ত মোট দাম তুলনা করুন। তালিকাটি Klook-এর নিজস্ব বুকিং ডেটার ভিত্তিতে, স্বতন্ত্র মানের রেটিং নয়।",
    buttonEn: "Search Klook hotel collection",
    buttonBn: "Klook-এ হোটেল সার্চ করুন",
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
      aria-label={isBn ? "Klook হোটেল পার্টনার সার্চ" : "Klook hotel partner search"}
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
          data-affiliate-placement={getBlogHotelAffiliatePlacement(slug)}
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
