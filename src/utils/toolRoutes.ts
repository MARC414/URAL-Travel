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
  | "visa-checker"
  | "airhelp";

/** Interactive tab → canonical URL slug. */
export const TOOL_TAB_TO_SLUG: Record<ToolTabId, string> = {
  converter: "currency-converter",
  calculator: "budget-calculator",
  packing: "packing-checklist",
  "visa-checker": "visa-checker",
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
    nameEn: "BDT Currency Converter",
    nameBn: "BDT কারেন্সি কনভার্টার",
    titleEn: "BDT Currency Converter for Bangladeshi Travelers | URAL",
    descriptionEn:
      "Convert Taka into USD, AED, SAR, NPR, THB and MYR with indicative rates, card-markup notes and the $18,000 endorsement quota reminder.",
    titleBn: "বাংলাদেশি ভ্রমণকারীদের জন্য BDT কারেন্সি কনভার্টার | URAL",
    descriptionBn:
      "ডলার, দিরহম, রিয়াল, নেপালি রুপি, বাট ও রিংগিটে টাকার রূপান্তর — কার্ড মার্কআপ নোট ও বার্ষিক $১৮,০০০ কোটা রিমাইন্ডারসহ।",
    h1En: "BDT Currency Converter for Bangladeshi Travelers",
    h1Bn: "বাংলাদেশি ভ্রমণকারীদের জন্য BDT কারেন্সি কনভার্টার",
    subEn:
      "Convert Taka to USD, AED, SAR, NPR, THB and MYR with card-markup notes for Dhaka travellers.",
    subBn:
      "ডলার, দিরহম, রিয়াল, নেপালি রুপি, বাট ও রিংগিটে টাকার হিসাব — কার্ড মার্কআপ নোটসহ।",
    serviceNameEn: "BDT Currency Converter for Bangladesh Outbound Travel",
  },
  "budget-calculator": {
    nameEn: "Trip Cost Estimator",
    nameBn: "ট্রিপ কস্ট এস্টিমেটর",
    titleEn: "Trip Cost Estimator in BDT from Bangladesh | URAL",
    descriptionEn:
      "Estimate flights, hotels, meals, transport and attraction tickets for Nepal, Thailand, Malaysia or Dubai — all in Bangladeshi Taka.",
    titleBn: "টাকায় ট্রিপ খরচের হিসাব: বাংলাদেশ থেকে ভ্রমণ বাজেট | URAL",
    descriptionBn:
      "নেপাল, থাইল্যান্ড, মালেশিয়া বা দুবাইয়ের ফ্লাইট, হোটেল, খাবার ও টিকিটের খরচ বাংলাদেশি টাকায় হিসাব করুন।",
    h1En: "Trip Cost Estimator in BDT from Bangladesh",
    h1Bn: "টাকায় ট্রিপ খরচের হিসাব: বাংলাদেশ থেকে ভ্রমণ বাজেট",
    subEn:
      "Estimate flights, hotels, meals, transport and tickets for Nepal, Thailand, Malaysia or Dubai — all in BDT.",
    subBn:
      "নেপাল, থাইল্যান্ড, মালেশিয়া বা দুবাইয়ের ফ্লাইট, হোটেল, খাবার ও টিকিটের খরচ টাকায় হিসাব করুন।",
    serviceNameEn: "BDT Trip Budget Estimator for Outbound Bangladesh Travel",
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
  "visa-checker": {
    nameEn: "Visa Odds Checker",
    nameBn: "ভিসা অডস চেকার",
    titleEn: "Visa Odds Checker for Bangladeshi Passports | URAL",
    descriptionEn:
      "See visa-on-arrival and eVisa status for popular destinations from Dhaka before you apply with a Bangladeshi passport.",
    titleBn: "বাংলাদেশি পাসপোর্টের ভিসা অডস চেকার | URAL",
    descriptionBn:
      "বাংলাদেশি পাসপোর্টে আবেদনের আগে ঢাকা থেকে জনপ্রিয় গন্তব্যের ভিসা-অন-অ্যারাইভাল ও eVisa স্ট্যাটাস দেখে নিন।",
    h1En: "Visa Odds Checker for Bangladeshi Passports",
    h1Bn: "বাংলাদেশি পাসপোর্টের ভিসা অডস চেকার",
    subEn:
      "See visa-on-arrival and eVisa status for top destinations from Dhaka before you apply.",
    subBn:
      "আবেদনের আগে ঢাকা থেকে জনপ্রিয় গন্তব্যের ভিসা-অন-অ্যারাইভাল ও eVisa স্ট্যাটাস দেখে নিন।",
    serviceNameEn: "Visa Eligibility Checker for Bangladeshi Passport Holders",
  },
  "flight-delay-claim": {
    nameEn: "Flight Delay Claim",
    nameBn: "ফ্লাইট ডিলে ক্ষতিপূরণ",
    titleEn: "Flight Delay Compensation: Claim Up to €600 with AirHelp | URAL",
    descriptionEn:
      "Check whether a delayed or cancelled flight qualifies for €250–€600 EU compensation and start an AirHelp claim — No Win, No Fee.",
    titleBn: "ফ্লাইট ডিলে ক্ষতিপূরণ: €600 পর্যন্ত দাবি (AirHelp) | URAL",
    descriptionBn:
      "বিলম্বিত বা বাতিল ফ্লাইট €২৫০–€৬০০ ইউরোপীয় ক্ষতিপূরণের যোগ্য কি না দেখুন এবং AirHelp-তে দাবি শুরু করুন — No Win, No Fee।",
    h1En: "Flight Delay Compensation: Claim Up to €600 (AirHelp)",
    h1Bn: "ফ্লাইট ডিলে ক্ষতিপূরণ: €600 পর্যন্ত দাবি (AirHelp)",
    subEn:
      "Check eligibility for €250–€600 compensation on delayed or cancelled flights — No Win, No Fee.",
    subBn:
      "বিলম্বিত বা বাতিল ফ্লাইটে €২৫০–€৬০০ ক্ষতিপূরণের যোগ্যতা দেখুন — No Win, No Fee।",
    serviceNameEn: "Flight Delay & Cancellation Compensation Claims (EU 261/2004)",
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
