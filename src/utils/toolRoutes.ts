/**
 * Canonical path ↔ interactive-tab mapping for the /tools workspace.
 *
 * Every tool in InteractiveTools has ONE indexable path URL (for example
 * /tools/flight-delay-claim) that prerender.ts publishes as static HTML with
 * its own title, description and breadcrumbs. The legacy ?tab= query URLs keep
 * working: normalizeRoutePath() upgrades them in-app and functions/_middleware.js
 * 301s them at the edge, so every old link converges on the clean path in one
 * hop. Client navigation, prerendering and the edge redirect all read THIS
 * table — never hardcode a slug somewhere else.
 */

export type ToolTabId =
  | "airports"
  | "calculator"
  | "converter"
  | "packing"
  | "airhelp";

/** Interactive tab → canonical URL slug. */
export const TOOL_TAB_TO_SLUG: Record<ToolTabId, string> = {
  converter: "currency-converter",
  calculator: "budget-calculator",
  packing: "packing-checklist",
  airhelp: "flight-delay-claim",
  airports: "airport-codes",
};

/**
 * Every ?tab= value ever shipped, including the pre-tab-list alias "currency"
 * (used across blog internal links before the converter tab was named
 * "converter"). Unknown values fall back to the /tools hub.
 */
export const LEGACY_TAB_TO_SLUG: Record<string, string> = {
  ...TOOL_TAB_TO_SLUG,
  currency: "currency-converter",
};

/**
 * Removed tools. "/tools/visa-checker" and "?tab=visa-checker" are NOT listed
 * in the tables above, so both already 301 to the /tools hub via the fallback
 * in functions/_middleware.js. Kept here as a record of what was deleted and
 * why, so the matrix is not rebuilt from an old copy of this file.
 *
 * Visa Odds Checker — removed 6 Nov 2026. It asserted visa rules for 12
 * passport/destination pairs with no date and no source, and four of them
 * contradicted the Immigration Department of Malaysia's own eVISA FAQ:
 *   - Malaysia processing "48-72 hours" (and "2-4 working days" elsewhere)
 *     against an official "2 - 7 working days";
 *   - "100% approval rates" against an official "does not guarantee that the
 *     eVISA will be issued … reserves the right to refuse … without reason";
 *   - India -> Malaysia "Visa On Arrival", where Indian nationals are in fact
 *     exempt from the visa for social visits until 31 Dec 2026 and are not on
 *     the 31-nationality eVISA list at all.
 * Visa rules change; a static matrix cannot keep up. Point readers at the
 * official portal instead. See docs/MASTER-PLAN-2026-11-06.md (WP1).
 */
export const REMOVED_TOOL_SLUGS = ["visa-checker"] as const;

/** Canonical URL slug → interactive tab (reverse of TOOL_TAB_TO_SLUG). */
export const SLUG_TO_TOOL_TAB: Record<string, ToolTabId> = Object.fromEntries(
  Object.entries(TOOL_TAB_TO_SLUG).map(([tab, slug]) => [slug, tab])
) as Record<string, ToolTabId>;

/** Every canonical /tools sub-path slug, in tab order. */
export const TOOL_SLUGS: string[] = Object.keys(SLUG_TO_TOOL_TAB);

export function isToolSlug(slug: string | null | undefined): slug is string {
  return Boolean(slug && Object.prototype.hasOwnProperty.call(SLUG_TO_TOOL_TAB, slug));
}

/** Canonical path for a legacy ?tab= value, or null when the value is unknown. */
export function toolPathForTab(tab: string | null | undefined): string | null {
  if (!tab) return null;
  const slug = LEGACY_TAB_TO_SLUG[tab];
  return slug ? `/tools/${slug}` : null;
}

/** Canonical path for a tool slug (e.g. "flight-delay-claim"), or null. */
export function toolPathForSlug(slug: string | null | undefined): string | null {
  return isToolSlug(slug) ? `/tools/${slug}` : null;
}

/**
 * Per-tool SERP + hero copy, keyed by canonical slug. One table feeds FOUR
 * surfaces: PRIORITY_SEO_COPY / BENGALI_SEO_COPY (src/utils/seoCopy.ts spreads
 * this into both maps), App.tsx breadcrumbs, the ToolsRouteView hero, and the
 * prerendered <h1>/<title> bodies (scripts/prerender.ts). Edit here only —
 * the English H1 must equal h1En and the Bengali prerendered H1 equals
 * titleBn with the "| URAL" suffix stripped.
 */
export interface ToolPageMeta {
  /** Breadcrumb / menu display name. */
  nameEn: string;
  nameBn: string;
  /** <title> (brand suffix included) and meta description. */
  titleEn: string;
  descriptionEn: string;
  titleBn: string;
  descriptionBn: string;
  /** Hero H1 — byte-identical to the prerendered <h1> in both locales. */
  h1En: string;
  h1Bn: string;
  /** Hero subtitle under the H1. */
  subEn: string;
  subBn: string;
  /** serviceSchema name for the tool's own URL. */
  serviceNameEn: string;
}

export const TOOL_PAGE_SEO: Record<string, ToolPageMeta> = {
  "currency-converter": {
    nameEn: "Currency Converter",
    nameBn: "কারেন্সি কনভার্টার",
    titleEn: "Currency Converter: Dated BDT Reference Rates | URAL",
    descriptionEn:
      "Convert BDT into USD, EUR, GBP, SAR, AED, NPR, THB, MYR, SGD and MVR using the provider’s dated daily reference rates.",
    titleBn: "কারেন্সি কনভার্টার: তারিখসহ BDT রেফারেন্স রেট | URAL",
    descriptionBn:
      "Provider-এর তারিখসহ দৈনিক রেফারেন্স রেটে BDT থেকে USD, EUR, GBP, SAR, AED, NPR, THB, MYR, SGD ও MVR হিসাব করুন।",
    h1En: "Currency Converter",
    h1Bn: "কারেন্সি কনভার্টার",
    subEn:
      "Convert BDT with the latest available daily reference rates. Each conversion shows its provider and rate date.",
    subBn:
      "সর্বশেষ উপলব্ধ দৈনিক রেফারেন্স রেটে BDT রূপান্তর করুন। প্রতিটি হিসাবের সঙ্গে provider ও রেটের তারিখ থাকে।",
    serviceNameEn: "Currency Converter",
  },
  "budget-calculator": {
    nameEn: "Trip Cost Estimator",
    nameBn: "ট্রিপ কস্ট এস্টিমেটর",
    titleEn: "Trip Cost Estimator: Quotes, Travellers & Hotel Nights | URAL",
    descriptionEn:
      "Calculate a sourced, dated trip estimate for Nepal, Thailand, Malaysia, Dubai, Singapore or the Maldives. Separate adult, child, infant and room-night costs.",
    titleBn: "ট্রিপ কস্ট এস্টিমেটর: কোটেশন, যাত্রী ও হোটেলের রাত | URAL",
    descriptionBn:
      "নেপাল, থাইল্যান্ড, মালয়েশিয়া, দুবাই, সিঙ্গাপুর বা মালদ্বীপের ট্রিপ হিসাব করুন উৎস ও তারিখসহ। প্রাপ্তবয়স্ক, শিশু, ইনফ্যান্ট ও রুম-রাত আলাদা রাখুন।",
    h1En: "Trip Cost Estimator",
    h1Bn: "ট্রিপ কস্ট এস্টিমেটর",
    subEn:
      "Plan 1–30 days for up to 12 travellers. Add dated quotes, check every cost, and display your estimate in your chosen currency.",
    subBn:
      "সর্বোচ্চ ১২ জনের জন্য ১–৩০ দিনের পরিকল্পনা করুন। তারিখসহ কোটেশন দিয়ে প্রতিটি খরচ মিলিয়ে আপনার নির্বাচিত কারেন্সিতে ফল দেখুন।",
    serviceNameEn: "Trip Cost Estimator",
  },
  "packing-checklist": {
    nameEn: "Packing Checklist",
    nameBn: "প্যাকিং চেকলিস্ট",
    titleEn: "Smart Packing Checklist for Flights from Dhaka | URAL",
    descriptionEn:
      "Pack for DAC with carry-on weight limits, the 100ml liquid rule, power-bank mAh caps, printed documents and immigration essentials.",
    titleBn: "ঢাকা থেকে ফ্লাইটের প্যাকিং চেকলিস্ট | URAL",
    descriptionBn:
      "কেবিন ওজন সীমা, ১০০ মি.লি. তরল নিয়ম, পাওয়ার ব্যাংক mAh সীমা, প্রিন্টেড ডকুমেন্ট ও ইমিগ্রেশন প্রয়োজনীয়তা নিয়ে প্যাকিং তালিকা।",
    h1En: "Smart Packing Checklist for Flights from Dhaka",
    h1Bn: "ঢাকা থেকে ফ্লাইটের প্যাকিং চেকলিস্ট",
    subEn:
      "Carry-on weight, 100ml liquids, power-bank mAh limits and document packing for DAC immigration.",
    subBn:
      "কেবিন ওজন, ১০০ মি.লি. তরল, পাওয়ার ব্যাংক mAh সীমা ও ইমিগ্রেশনের ডকুমেন্ট প্যাকিং তালিকা।",
    serviceNameEn: "Smart Packing Checklist for Flights from Dhaka (DAC)",
  },
  "flight-delay-claim": {
    nameEn: "Flight Disruption Check",
    nameBn: "ফ্লাইট-সমস্যার দাবি যাচাই",
    titleEn: "Flight Disruption Claim Check & Passenger-Rights Guide | URAL",
    descriptionEn:
      "Review the route and disruption details that may affect a flight claim. AirHelp is an optional service; check its current eligibility rules, terms and fees.",
    titleBn: "ফ্লাইটে সমস্যা হলে দাবি যাচাই ও যাত্রী-অধিকার গাইড | URAL",
    descriptionBn:
      "ফ্লাইটের রুট ও ঘটনার বিবরণ যাচাই করে সম্ভাব্য দাবি সম্পর্কে জানুন। AirHelp ঐচ্ছিক সেবা; তাদের বর্তমান যোগ্যতার নিয়ম, শর্ত ও ফি দেখুন।",
    h1En: "Flight Disruption Claim Check",
    h1Bn: "ফ্লাইট-সমস্যার দাবি যাচাই",
    subEn:
      "Use this as a starting point, not a payout estimate. Eligibility depends on your itinerary, operating carrier and disruption details; review any claims service's terms and fees.",
    subBn:
      "এটিকে প্রাথমিক নির্দেশনা হিসেবে নিন, পেআউটের হিসাব হিসেবে নয়। যোগ্যতা itinerary, operating carrier ও ঘটনার বিবরণের ওপর নির্ভর করে; দাবি-সেবার শর্ত ও ফি যাচাই করুন।",
    serviceNameEn: "Flight Disruption Claim Information and Optional AirHelp Service",
  },
  "airport-codes": {
    nameEn: "Airport Codes Directory",
    nameBn: "এয়ারপোর্ট কোড ডিরেক্টরি",
    titleEn: "IATA Airport Codes Directory for Dhaka Travelers | URAL",
    descriptionEn:
      "Search three-letter IATA codes with airlines, hub notes and WhatsApp fare inquiry for international routes from Dhaka.",
    titleBn: "IATA এয়ারপোর্ট কোড ডিরেক্টরি (ঢাকা ভ্রমণকারীদের জন্য) | URAL",
    descriptionBn:
      "ঢাকা থেকে আন্তর্জাতিক রুটের তিন-অক্ষরের IATA কোড, এয়ারলাইন, হাব নোট ও হোয়াটসঅ্যাপ ভাড়া অনুসন্ধান।",
    h1En: "IATA Airport Codes Directory for Dhaka Travelers",
    h1Bn: "IATA এয়ারপোর্ট কোড ডিরেক্টরি (ঢাকা ভ্রমণকারীদের জন্য)",
    subEn:
      "Search every three-letter IATA code we track — with airlines, hubs and WhatsApp fare inquiry.",
    subBn:
      "সার্চযোগ্য তিন-অক্ষরের IATA কোড, এয়ারলাইন ও হাবসহ — হোয়াটসঅ্যাপে ভাড়া জানার লিংক।",
    serviceNameEn: "IATA Airport Codes Directory & Fare Inquiry for Dhaka Routes",
  },
};
