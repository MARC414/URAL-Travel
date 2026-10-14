/**
 * Visa-free / Visa-on-Arrival / ETA access for ordinary Bangladeshi passports.
 *
 * SINGLE SOURCE OF TRUTH for /visa-free-countries. The prerendered HTML
 * (scripts/prerender.ts), the React page (src/routes/VisaFreeCountriesRouteView.tsx)
 * and the Bengali copy (src/utils/seoCopy.ts) all read from here, so the page and
 * the structured data can never disagree with each other.
 *
 * ── Editorial rules for this file ────────────────────────────────────────────
 * 1. Never state a visa rule without a basis. Where sources disagree, say so in
 *    the entry (`caveat`) rather than picking one and sounding certain.
 * 2. Fees and stays are stated as "as published by <source> at the time of
 *    verification" — never as permanent fact.
 * 3. `LAST_VERIFIED` is the date this list was last checked against sources. It
 *    is rendered on the page. If you edit an entry, update this date.
 * 4. Prefer omission over a wrong claim. A missing country costs a reader
 *    nothing; a wrong one costs them a denied boarding.
 */

export const LAST_VERIFIED = "2026-10-14";

/**
 * How the entry is obtained. Deliberately distinguishes "visa on arrival"
 * (nothing to arrange before flying) from "ETA" (must be approved online
 * before boarding) — the single most common point of confusion, because
 * several popular listicles treat them as the same thing.
 */
export type EntryType =
  | "Visa on arrival"
  | "Visa-free"
  | "ETA (apply before flying)"
  | "e-Visa (apply before flying)"
  | "Visa required";

/**
 * Bengali rendering of one entry's reader-facing strings.
 *
 * Every field is REQUIRED rather than optional, and that is the point. An
 * optional field would silently fall through to English and print an English
 * sentence on a Bengali page — the exact defect this data exists to prevent.
 * TypeScript now refuses to compile an entry that is only half translated.
 *
 * `entry` here is the badge *label* ("ভিসা অন অ্যারাইভাল"). The badge's colour
 * logic still keys off the English `EntryType` on the parent entry, because
 * colour carries meaning and must not be driven by a translated string.
 */
export interface EntryCopyBn {
  country: string;
  entry: string;
  maxStay: string;
  cost: string;
  reach: string;
  note: string;
  source: string;
  /** Empty string when the English entry has no caveat. */
  caveat: string;
}

export interface VisaFreeEntry {
  country: string;
  flag: string;
  entry: EntryType;
  /** Maximum stay at entry. "As issued" when it is not a fixed number. */
  maxStay: string;
  /** Cost at the time of verification, in the currency the authority charges. */
  cost: string;
  /**
   * Whether a Bangladeshi passport holder can realistically get there from
   * Dhaka. This is the field that separates this page from a generic
   * "35 visa-free countries!" listicle: half the destinations on those lists
   * cannot be reached from Bangladesh without a visa for the country you
   * transit through.
   */
  reach: "Direct from Dhaka" | "Needs a connection" | "Transit visa almost always required";
  note: string;
  source: string;
  caveat?: string;
  /** Bengali rendering. Required — see EntryCopyBn. */
  bn: EntryCopyBn;
}

/** Destinations a Bangladeshi traveller can actually use without a prior visa. */
export const USABLE_NOW: VisaFreeEntry[] = [
  {
    country: "Nepal",
    flag: "🇳🇵",
    bn: {
      country: "নেপাল",
      entry: "ভিসা অন অ্যারাইভাল",
      maxStay: "৩০ দিন",
      cost: "ফ্রি — SAARC গ্র্যাটিস ভিসা, প্রতি ক্যালেন্ডার বছরের প্রথম ভ্রমণে",
      reach: "ঢাকা থেকে সরাসরি",
      note: "বাংলাদেশ থেকে সবচেয়ে সহজ বিদেশ ভ্রমণ। বিমান ও হিমালয় এয়ারলাইন্স ঢাকা–কাঠমান্ডু উড়ে প্রায় ১ ঘণ্টা ৩০ মিনিটে। আগে থেকে কোনো আবেদন করতে হয় না। ফেরার নিশ্চিত টিকিট সঙ্গে রাখুন — অন-অ্যারাইভাল ভিসার জন্য এটি বাধ্যতামূলক, আর ঢাকার চেক-ইনেই এটি দেখা হয়।",
      source: "নেপাল ইমিগ্রেশন বিভাগ; URAL-এর রুট তথ্য",
      caveat: "",
    },
    entry: "Visa on arrival",
    maxStay: "30 days",
    cost: "Free — SAARC gratis visa, first entry of each calendar year",
    reach: "Direct from Dhaka",
    note: "The easiest international trip from Bangladesh. Biman and Himalaya fly Dhaka–Kathmandu in about 1 hour 30 minutes. No advance application of any kind. Carry a confirmed return ticket — it is required for the on-arrival visa and is checked at Dhaka check-in.",
    source: "Nepal Department of Immigration; URAL route data",
  },
  {
    country: "Maldives",
    flag: "🇲🇻",
    bn: {
      country: "মালদ্বীপ",
      entry: "ভিসা অন অ্যারাইভাল",
      maxStay: "৩০ দিন",
      cost: "ফ্রি",
      reach: "ঢাকা থেকে সরাসরি",
      note: "পর্যটনের জন্য ফ্রি ভিসা অন অ্যারাইভাল, তবে উড়ার আগেই IMUGA ট্রাভেলার ডিক্লারেশন অনলাইনে জমা দিতে হবে — এটি ছাড়া ঢাকায় কোনো এয়ারলাইন্স আপনাকে তুলবে না। সরাসরি ফ্লাইটে সময় লাগে প্রায় ৪ ঘণ্টা।",
      source: "মালদ্বীপ ইমিগ্রেশন (IMUGA); URAL-এর রুট তথ্য",
      caveat: "পৌঁছানোর সময় হোটেলের বুকিং ও ফেরার টিকিট দেখা হয়। প্রয়োজনে টাকার প্রমাণও চাওয়া হতে পারে।",
    },
    entry: "Visa on arrival",
    maxStay: "30 days",
    cost: "Free",
    reach: "Direct from Dhaka",
    note: "Free visa on arrival for tourism, but the IMUGA Traveller Declaration must be submitted online before you fly — airlines at Dhaka will not board you without it. Direct flights take about 4 hours.",
    source: "Maldives Immigration (IMUGA); URAL route data",
    caveat: "Hotel booking and a return ticket are checked on arrival. Proof of funds may be requested.",
  },
  {
    country: "Sri Lanka",
    flag: "🇱🇰",
    bn: {
      country: "শ্রীলংকা",
      entry: "ETA (উড়ার আগেই আবেদন)",
      maxStay: "৩০ দিন, ডাবল এন্ট্রি",
      cost: "USD 20 (SAARC রেট) — অন্য বেশিরভাগ দেশের জন্য USD 50",
      reach: "ঢাকা থেকে সরাসরি",
      note: "বাংলাদেশ কম SAARC রেটে আবেদন করতে পারে। আবেদন করুন কেবল eta.gov.lk-এ — অনেক তৃতীয় পক্ষের সাইট একই আবেদনের জন্য দুই থেকে চার গুণ বেশি টাকা নেয়। অনুমোদন সাধারণত ২৪–৪৮ ঘণ্টার মধ্যে আসে, তাই উড়ার অন্তত তিন দিন আগে আবেদন সেরে ফেলুন।",
      source: "শ্রীলংকার ETA পোর্টাল (eta.gov.lk), SAARC রেট তালিকা",
      caveat: "এটি উড়ার আগে অনুমোদিত একটি অনুমতি, ভিসা অন অ্যারাইভাল নয় — শ্রীলংকা ২০২৫ সালের অক্টোবরে ভিসা অন অ্যারাইভাল বন্ধ করেছে। বাংলাদেশ ছাড়ের তালিকায় নেই, তাই USD 20 দিতেই হয়।",
    },
    entry: "ETA (apply before flying)",
    maxStay: "30 days, double entry",
    cost: "USD 20 (SAARC rate) — USD 50 for most other nationalities",
    reach: "Direct from Dhaka",
    note: "Bangladesh pays the reduced SAARC rate. Apply only at eta.gov.lk — many third-party sites charge two to four times as much for the same application. Approval is usually within 24–48 hours, so allow three days before flying.",
    source: "Sri Lanka ETA portal (eta.gov.lk), SAARC rate schedule",
    caveat:
      "This is an authorisation approved before departure, not a visa on arrival — Sri Lanka discontinued visa on arrival in October 2025. Bangladesh is not on the waiver list, so it still pays USD 20.",
  },
];

/**
 * Destinations that genuinely do not require a visa in advance, but which are
 * unreachable from Dhaka without transiting a country that does. Sorted
 * alphabetically so the list reads as reference, not as ranking.
 */
export const REMOTE_VISA_FREE: { name: string; nameBn: string }[] = [
  { name: "Bahamas", nameBn: "বাহামা" },
  { name: "Barbados", nameBn: "বার্বাডোস" },
  { name: "British Virgin Islands", nameBn: "ব্রিটিশ ভার্জিন দ্বীপপুঞ্জ" },
  { name: "Cook Islands", nameBn: "কুক দ্বীপপুঞ্জ" },
  { name: "Dominica", nameBn: "ডোমিনিকা" },
  { name: "Fiji", nameBn: "ফিজি" },
  { name: "Gambia", nameBn: "গাম্বিয়া" },
  { name: "Grenada", nameBn: "গ্রেনাডা" },
  { name: "Haiti", nameBn: "হাইতি" },
  { name: "Jamaica", nameBn: "জ্যামাইকা" },
  { name: "Kiribati", nameBn: "কিরিবাস" },
  { name: "Micronesia", nameBn: "মাইক্রোনেশিয়া" },
  { name: "Montserrat", nameBn: "মন্টসেরাট" },
  { name: "Rwanda", nameBn: "রুয়ান্ডা" },
  { name: "Saint Kitts and Nevis", nameBn: "সেন্ট কিটস ও নেভিস" },
  { name: "Saint Vincent and the Grenadines", nameBn: "সেন্ট ভিনসেন্ট ও গ্রেনাডাইনস" },
  { name: "Trinidad and Tobago", nameBn: "ত্রিনিদাদ ও টোবাগো" },
  { name: "Vanuatu", nameBn: "ভানুয়াতু" },
];;

/** Visa on arrival, but reaching the airport is its own problem. */
export const REMOTE_VOA: { name: string; nameBn: string; detail?: string; detailBn?: string }[] = [
  { name: "Burundi", nameBn: "বুরুন্ডি" },
  { name: "Cambodia", nameBn: "কম্বোডিয়া", detail: "USD 30, 30 days — the most reachable of these", detailBn: "USD 30, ৩০ দিন — এদের মধ্যে সবচেয়ে সহজে পৌঁছানো যায়" },
  { name: "Cape Verde", nameBn: "কেপ ভার্দে" },
  { name: "Comoros", nameBn: "কমোরোস" },
  { name: "Djibouti", nameBn: "জিবুতি" },
  { name: "Guinea-Bissau", nameBn: "গিনি-বিসাউ" },
  { name: "Madagascar", nameBn: "মাদাগাস্কার" },
  { name: "Mozambique", nameBn: "মোজাম্বিক" },
  { name: "Samoa", nameBn: "সামোয়া" },
  { name: "Sierra Leone", nameBn: "সিয়েরা লিওন" },
  { name: "Timor-Leste", nameBn: "তিমুর-লেস্তে", detail: "USD 30, 30 days", detailBn: "USD 30, ৩০ দিন" },
  { name: "Tuvalu", nameBn: "তুভালু" },
];;

/**
 * The section that earns the page its keep. Every one of these is a country a
 * Bangladeshi traveller reasonably assumes is easy, and is not.
 */
export const COMMONLY_MISREAD: VisaFreeEntry[] = [
  {
    country: "UAE (Dubai)",
    flag: "🇦🇪",
    bn: {
      country: "সংযুক্ত আরব আমিরাত (দুবাই)",
      entry: "ভিসা লাগবে",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৩০ বা ৬০ দিন)",
      cost: "মেয়াদ ও স্পনসরভেদে প্রায় AED 200–690",
      reach: "ঢাকা থেকে সরাসরি",
      note: "আগেই টুরিস্ট ভিসা নেওয়া বাধ্যতামূলক — এয়ারলাইন্স, লাইসেন্সপ্রাপ্ত ট্রাভেল এজেন্সি বা আমিরাতভিত্তিক স্পনসরের মাধ্যমে। সাধারণ বাংলাদেশি পাসপোর্টের জন্য ভিসা অন অ্যারাইভাল নেই, ভিসা-মুক্ত প্রবেশও নেই।",
      source: "UAE সরকারের ভিসা নির্দেশনা; ২০২৬ সালে একাধিক UAE ভিসা কর্তৃপক্ষ",
      caveat: "ব্যতিক্রম একটিই: নির্দিষ্ট কিছু দেশের (কিছু উপসাগরীয় দেশ, আমেরিকা, ব্রিটেন বা শেনজেন) বৈধ রেসিডেন্স পারমিট বা ভিসা থাকলে ভিসা অন অ্যারাইভাল পাওয়া যেতে পারে। সেটি না থাকলে ধরে নিন ভিসা আগেই নিতে হবে।",
    },
    entry: "Visa required",
    maxStay: "As issued (typically 30 or 60 days)",
    cost: "Roughly AED 200–690 depending on duration and sponsor",
    reach: "Direct from Dhaka",
    note: "A pre-arranged tourist visa is mandatory, obtained through an airline, a licensed travel agency, or a UAE-based sponsor. There is no visa-on-arrival and no visa-free entry for ordinary Bangladeshi passports.",
    source: "UAE government visa guidance; multiple UAE visa authorities, 2026",
    caveat:
      "The one exception: holders of a valid residence permit or visa from certain other countries (including some GCC states, the US, the UK or Schengen) may qualify for visa on arrival. If you do not hold one, assume you need the visa in advance.",
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    bn: {
      country: "থাইল্যান্ড",
      entry: "ভিসা লাগবে",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৬০ দিন)",
      cost: "সরকারি e-Visa fee ও payment charge-এর বর্তমান অঙ্ক portal-এ যাচাই করুন; agency fee আলাদা ও provider-ভেদে বদলায়",
      reach: "ঢাকা থেকে সরাসরি",
      note: "বাংলাদেশি পাসপোর্টধারীদের যাত্রার আগে Thailand-এর official portal দিয়ে Tourist e-Visa নিতে হয়। আবেদন ও Dhaka mission-এর বর্তমান checklist যাচাই করুন।",
      source: "Thailand e-Visa portal; Royal Thai Embassy Dhaka",
      caveat: "Dhaka Embassy-র প্রকাশিত TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) ছয় মাসের statement এবং জনপ্রতি BDT 60,000/পরিবারে BDT 120,000 উল্লেখ করে; বর্তমান portal requirement ভিন্ন হতে পারে। সরকারি visa fee, bank/payment charge ও ঐচ্ছিক agency fee আলাদা—payment-এর আগে যাচাই করুন।",
    },
    entry: "Visa required",
    maxStay: "As issued (commonly 60 days)",
    cost: "Check the current government e-Visa fee and payment charges in the portal/Embassy schedule; optional agency fees vary by provider",
    reach: "Direct from Dhaka",
    note: "Bangladeshi passport holders need an approved Tourist e-Visa before departure. Apply through Thailand's official portal and follow the current Dhaka mission checklist; visa on arrival and visa exemption are not available.",
    source: "Royal Thai Embassy, Dhaka; Thai e-Visa portal",
    caveat: "The Embassy's public TR checklist was last updated November 30, 2022 and lists BDT 60,000 per person/BDT 120,000 per family with six-month statements. Confirm the current financial evidence and separate government, bank/payment, and optional agency charges before applying.",
  },
  {
    country: "Malaysia",
    flag: "🇲🇾",
    bn: {
      country: "মালয়েশিয়া",
      entry: "ই-ভিসা (উড়ার আগেই আবেদন)",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৩০ দিন)",
      cost: "ধরনভেদে প্রায় MYR 100–200",
      reach: "ঢাকা থেকে সরাসরি",
      note: "মালয়েশিয়ার ভিসা ছাড়ের তালিকায় বাংলাদেশ নেই। অনলাইনে ই-ভিসার আবেদন করুন, আর পৌঁছানোর তিন দিনের মধ্যে MDAC (মালয়েশিয়া ডিজিটাল অ্যারাইভাল কার্ড) জমা দিন।",
      source: "মালয়েশিয়া ইমিগ্রেশন বিভাগ (ই-ভিসা / MDAC)",
      caveat: "",
    },
    entry: "e-Visa (apply before flying)",
    maxStay: "As issued (commonly 30 days)",
    cost: "Approx. MYR 100–200 depending on type",
    reach: "Direct from Dhaka",
    note: "Bangladesh is not on Malaysia's visa-exemption list. Apply for the eVisa online and submit the MDAC (Malaysia Digital Arrival Card) within three days of arrival.",
    source: "Malaysia Immigration Department (eVisa / MDAC)",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    bn: {
      country: "সিঙ্গাপুর",
      entry: "ভিসা লাগবে",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৩০ দিন)",
      cost: "প্রায় SGD 30 প্লাস এজেন্টের ফি",
      reach: "ঢাকা থেকে সরাসরি",
      note: "বাংলাদেশি পাসপোর্টধারীদের জন্য রওনার আগেই ভিসা লাগবে। আবেদন সাধারণত অনুমোদিত এজেন্ট বা সিঙ্গাপুরে থাকা পরিচিত ব্যক্তির মাধ্যমে জমা দিতে হয়।",
      source: "সিঙ্গাপুর ইমিগ্রেশন অ্যান্ড চেকপয়েন্টস অথরিটি",
      caveat: "",
    },
    entry: "Visa required",
    maxStay: "As issued (commonly 30 days)",
    cost: "Approx. SGD 30 plus agent fees",
    reach: "Direct from Dhaka",
    note: "A visa is required before travel for Bangladeshi passport holders. Applications are usually lodged through an authorised agent or a Singapore-based contact.",
    source: "Immigration & Checkpoints Authority, Singapore",
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    bn: {
      country: "ইন্দোনেশিয়া",
      entry: "ই-ভিসা (উড়ার আগেই আবেদন)",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৩০ দিন)",
      cost: "ই-ভিসা অন অ্যারাইভালের জন্য প্রায় USD 50",
      reach: "কানেক্টিং ফ্লাইট লাগে",
      note: "ইন্দোনেশিয়ায় ই-ভিসা অন অ্যারাইভাল চালু আছে, তবে বাংলাদেশি আবেদনকারীদের জন্য সাধারণত স্থানীয় স্পনসর বা গ্যারান্টর লাগে। বেশিরভাগ ভ্রমণকারী শেষে এজেন্টের মাধ্যমে আবেদন করেন, তাই শুধু নেমে গিয়ে আবেদন করা যাবে — এমন ধরে নেবেন না।",
      source: "ইন্দোনেশিয়া ইমিগ্রেশন অধিদপ্তর (eviza.imigrasi.go.id)",
      caveat: "এই এন্ট্রিটির তথ্য নিয়ে বিভিন্ন সূত্রে সবচেয়ে বেশি মতভেদ আছে। বুকিং করার আগে ইন্দোনেশিয়ার দূতাবাস থেকে সর্বশেষ নিয়ম যাচাই করে নিন।",
    },
    entry: "e-Visa (apply before flying)",
    maxStay: "As issued (commonly 30 days)",
    cost: "Approx. USD 50 for the e-Visa on arrival",
    reach: "Needs a connection",
    note: "Indonesia operates an e-Visa on arrival, but for Bangladeshi applicants it has generally required a local sponsor or guarantor. Most travellers end up applying through an agent, so do not assume you can simply land and apply.",
    source: "Indonesia Directorate General of Immigration (eviza.imigrasi.go.id)",
    caveat:
      "This is the entry most often reported differently by different sources. Confirm the current requirement with the Indonesian embassy before booking.",
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    bn: {
      country: "তুরস্ক",
      entry: "ই-ভিসা (উড়ার আগেই আবেদন)",
      maxStay: "যত দিনের ইস্যু হয় (সাধারণত ৩০ দিন)",
      cost: "ই-ভিসার জন্য প্রায় USD 60",
      reach: "কানেক্টিং ফ্লাইট লাগে",
      note: "তুরস্কের ই-ভিসা বাংলাদেশি পাসপোর্টধারীরা শর্তসাপেক্ষে পান — সাধারণত আমেরিকা, ব্রিটেন, শেনজেন অঞ্চল বা আয়ারল্যান্ডের বৈধ ভিসা বা রেসিডেন্স পারমিট থাকলে। সেটি না থাকলে দূতাবাসে আবেদন করতে হয়।",
      source: "তুরস্ক প্রজাতন্ত্রের ই-ভিসা পোর্টাল",
      caveat: "",
    },
    entry: "e-Visa (apply before flying)",
    maxStay: "As issued (commonly 30 days)",
    cost: "Approx. USD 60 for the e-Visa",
    reach: "Needs a connection",
    note: "Turkey's e-Visa is available to Bangladeshi passport holders only on conditions — typically holding a valid visa or residence permit from the US, UK, Schengen area or Ireland. Without one, apply at the embassy.",
    source: "Republic of Türkiye e-Visa portal",
  },
];

/** What to carry regardless of destination. */
export const ALWAYS_CARRY: { item: string; detail: string; itemBn: string; detailBn: string }[] = [
  {
    item: "Passport valid 6+ months",
    itemBn: "পাসপোর্টের মেয়াদ ৬ মাসের বেশি",
    detail:
      "Almost every airline measures validity from your date of return, not departure. A passport with five months left will be refused at the Dhaka check-in desk even if the destination would have admitted you.",
    detailBn:
      "প্রায় সব এয়ারলাইন্স মেয়াদ গণনা করে আপনার ফেরার তারিখ থেকে, যাওয়ার তারিখ থেকে নয়। পাঁচ মাস মেয়াদ থাকা পাসপোর্ট নিয়ে ঢাকার চেক-ইন কাউন্টারেই ফেরত পাঠানো হবে — গন্তব্য দেশ আপনাকে নিলেও।",
  },
  {
    item: "Confirmed return or onward ticket",
    itemBn: "ফেরার বা পরবর্তী গন্তব্যের নিশ্চিত টিকিট",
    detail:
      "Required for visa-on-arrival destinations such as Nepal and the Maldives, and checked at boarding. An unconfirmed hold is not enough.",
    detailBn:
      "নেপাল ও মালদ্বীপের মতো ভিসা অন অ্যারাইভাল গন্তব্যের জন্য এটি বাধ্যতামূলক, আর বোর্ডিংয়ের সময় দেখা হয়। শুধু অনিশ্চিত হোল্ড যথেষ্ট নয়।",
  },
  {
    item: "Hotel booking or host address",
    itemBn: "হোটেলের বুকিং বা হোস্টের ঠিকানা",
    detail:
      "Immigration may ask where you are staying. A screenshot is fine; a verbal answer is not.",
    detailBn:
      "ইমিগ্রেশন জিজ্ঞেস করতে পারে আপনি কোথায় থাকবেন। স্ক্রিনশট দেখানো চলবে, শুধু মুখে বলা চলবে না।",
  },
  {
    item: "Proof of funds",
    itemBn: "টাকার প্রমাণ",
    detail:
      "A bank statement, an internationally enabled card (see the dual-currency endorsement guide), or a modest amount of US dollars in cash.",
    detailBn:
      "ব্যাংক স্টেটমেন্ট, আন্তর্জাতিক ব্যবহারযোগ্য কার্ড (দেখুন dual-currency endorsement গাইড), বা অল্প কিছু ডলার ক্যাশ।",
  },
  {
    item: "Printed copies",
    itemBn: "প্রিন্ট করা কপি",
    detail:
      "Of the visa or approval, the return ticket and the hotel booking. Airport Wi-Fi fails; printed paper does not.",
    detailBn:
      "ভিসা বা অনুমোদনপত্র, ফেরার টিকিট আর হোটেলের বুকিং। এয়ারপোর্টের ওয়াই-ফাই কাজ না-ও করতে পারে, কাগজ করে না।",
  },
  {
    item: "Travel insurance",
    itemBn: "ট্রাভেল ইনস্যুরেন্স",
    detail:
      "Mandatory for the UAE and increasingly expected elsewhere. Buy it before you fly — policies purchased after departure generally exclude the incident.",
    detailBn:
      "UAE-তে বাধ্যতামূলক, আর অন্য দেশেও চাওয়া হচ্ছে। উড়ার আগেই কিনে ফেলুন — রওনার পরে কেনা পলিসিতে সাধারণত ওই ঘটনাটি কভার হয় না।",
  },
];;

export interface VisaFreeFaq {
  question: string;
  answer: string;
  questionBn: string;
  answerBn: string;
}

/**
 * Unique to this page. The homepage, /visa and the country pages each carry
 * their own FAQ sets — answer engines pick one URL per answer, so duplicating
 * a question across pages splits the signal instead of doubling it.
 */
export const VISA_FREE_FAQS: VisaFreeFaq[] = [
  {
    question: "How many countries can a Bangladeshi passport visit without a visa?",
    answer:
      "The Henley Passport Index put Bangladesh at 97th in its July 2026 edition, with access to 35 destinations counting visa-free, visa-on-arrival and electronic travel authorisation entry. That number excludes e-Visas, which need an online application before departure. For practical purposes the useful figure is much smaller: only three destinations can be reached directly from Dhaka without arranging anything in advance — Nepal and the Maldives on free visa on arrival, and Sri Lanka with an online ETA approved before you fly.",
    questionBn:
      "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া কতটি দেশে যাওয়া যায়?",
    answerBn:
      "Henley Passport Index-এর ২০২৬ সালের জুলাই সংস্করণে বাংলাদেশ আছে ৯৭তম অবস্থানে, ৩৫টি গন্তব্যে প্রবেশের সুযোগ নিয়ে — যার মধ্যে ভিসা-মুক্ত, ভিসা অন অ্যারাইভাল আর ইলেকট্রনিক ট্রাভেল অথরাইজেশন সবই ধরা। এই সংখ্যায় ই-ভিসা ধরা হয় না, কারণ সেগুলোর জন্য উড়ার আগে অনলাইনে আবেদন করতে হয়। বাস্তবে ব্যবহারযোগ্য সংখ্যাটি অনেক ছোট: ঢাকা থেকে সরাসরি গিয়ে আগে কিছু না করে যাওয়া যায় মাত্র তিনটি গন্তব্যে — নেপাল ও মালদ্বীপে ফ্রি ভিসা অন অ্যারাইভালে, আর শ্রীলংকায় উড়ার আগেই অনুমোদিত অনলাইন ETA-তে।",
  },
  {
    question: "Which countries can Bangladeshi passport holders visit without any prior visa?",
    answer:
      "Nepal grants a free 30-day visa on arrival for the first entry of each calendar year under the SAARC gratis scheme, and the Maldives grants a free 30-day visa on arrival with a mandatory online IMUGA Traveller Declaration. Both have direct flights from Dhaka. Sri Lanka requires an ETA — approved online before departure, not issued on arrival — at the reduced SAARC rate of USD 20. Beyond these, the genuinely visa-free destinations are Caribbean and Pacific island states that cannot be reached from Dhaka without transiting a country for which a Bangladeshi passport holder needs a visa.",
    questionBn:
      "কোন কোন দেশে বাংলাদেশি পাসপোর্টধারীরা আগে থেকে কোনো ভিসা ছাড়াই যেতে পারেন?",
    answerBn:
      "নেপাল প্রতি ক্যালেন্ডার বছরের প্রথম ভ্রমণে SAARC গ্র্যাটিস প্রকল্পে ৩০ দিনের ফ্রি ভিসা অন অ্যারাইভাল দেয়, আর মালদ্বীপ ৩০ দিনের ফ্রি ভিসা অন অ্যারাইভাল দেয় — তবে বাধ্যতামূলক অনলাইন IMUGA ট্রাভেলার ডিক্লারেশন জমা দিতে হবে। দুটোতেই ঢাকা থেকে সরাসরি ফ্লাইট আছে। শ্রীলংকায় ETA লাগে — উড়ার আগে অনলাইনে অনুমোদন, পৌঁছে নয় — আর বাংলাদেশিরা কম SAARC রেটে USD 20 দেন। এর বাইরে সত্যিকারের ভিসা-মুক্ত গন্তব্যগুলো ক্যারিবিয়ান ও প্রশান্ত মহাসাগরের দ্বীপরাষ্ট্র, যেখানে ঢাকা থেকে পৌঁছাতে এমন দেশ দিয়ে ট্রানজিট করতে হয় যার জন্য বাংলাদেশির ভিসা লাগে।",
  },
  {
    question: "Is Sri Lanka visa-free for Bangladeshi citizens?",
    answer:
      "No. Sri Lanka requires an Electronic Travel Authorisation approved before travel, and it ended visa on arrival in October 2025, so you cannot obtain entry at Colombo airport without prior approval. Bangladeshi travellers pay the reduced SAARC rate of USD 20 rather than the standard USD 50, and the ETA is issued for 30 days with double entry. Apply only at eta.gov.lk; third-party sites charge several times the official fee for the same application.",
    questionBn:
      "শ্রীলংকা কি বাংলাদেশিদের জন্য ভিসা-মুক্ত?",
    answerBn:
      "না। শ্রীলংকায় উড়ার আগে অনুমোদিত ইলেকট্রনিক ট্রাভেল অথরাইজেশন (ETA) লাগে, আর ২০২৫ সালের অক্টোবরে তারা ভিসা অন অ্যারাইভাল বন্ধ করে দিয়েছে — তাই আগের অনুমোদন ছাড়া কলম্বো বিমানবন্দরে নেমে প্রবেশ পাওয়া যায় না। বাংলাদেশিরা সাধারণ USD 50-এর বদলে কম SAARC রেটে USD 20 দেন, আর ETA ৩০ দিনের ও ডাবল এন্ট্রির জন্য ইস্যু হয়। আবেদন করুন কেবল eta.gov.lk-এ; তৃতীয় পক্ষের সাইট একই আবেদনের জন্য কয়েক গুণ বেশি টাকা নেয়।",
  },
  {
    question: "Can Bangladeshi passport holders get a UAE visa on arrival?",
    answer:
      "Not on an ordinary Bangladeshi passport. A pre-arranged tourist visa is mandatory, obtained through an airline, a licensed travel agency or a UAE-based sponsor before you fly, and health insurance covering the stay is required. The single exception is for travellers who already hold a valid residence permit or visa from certain other countries, which can qualify them for visa on arrival — so if you hold a GCC, US, UK or Schengen residence permit, check that specific rule.",
    questionBn:
      "বাংলাদেশি পাসপোর্টধারীরা কি UAE-তে ভিসা অন অ্যারাইভাল পাবেন?",
    answerBn:
      "সাধারণ বাংলাদেশি পাসপোর্টে নয়। উড়ার আগেই টুরিস্ট ভিসা নিতে হয় — এয়ারলাইন্স, লাইসেন্সপ্রাপ্ত ট্রাভেল এজেন্সি বা আমিরাতভিত্তিক স্পনসরের মাধ্যমে — আর থাকার পুরো সময় কভার করে স্বাস্থ্যবিমাও লাগে। একমাত্র ব্যতিক্রম যাঁদের নির্দিষ্ট কিছু দেশের বৈধ রেসিডেন্স পারমিট বা ভিসা আছে, তাঁরা ভিসা অন অ্যারাইভালের যোগ্য হতে পারেন — তাই GCC, আমেরিকা, ব্রিটেন বা শেনজেনের রেসিডেন্স পারমিট থাকলে সেই নিয়মটি আলাদা করে দেখে নিন।",
  },
  {
    question: "Do I need a transit visa to reach visa-free countries?",
    answer:
      "Usually, yes — and this is the detail that most visa-free country lists leave out. Almost every Caribbean and Pacific destination on a Bangladeshi passport's visa-free list is reached via the United States, the United Kingdom, the European Union or the Gulf, and a Bangladeshi passport holder needs a visa to enter those transit countries. A visa-free destination is only useful if you can legally reach it, so always plan the transit leg before treating a destination as visa-free.",
    questionBn:
      "ভিসা-মুক্ত দেশে পৌঁছাতে কি ট্রানজিট ভিসা লাগে?",
    answerBn:
      "সাধারণত হ্যাঁ — আর এই জায়গাটিই বেশিরভাগ ভিসা-মুক্ত দেশের তালিকা বাদ দিয়ে যায়। বাংলাদেশি পাসপোর্টের ভিসা-মুক্ত তালিকার ক্যারিবিয়ান ও প্রশান্ত মহাসাগরের প্রায় প্রতিটি গন্তব্যে পৌঁছাতে হয় আমেরিকা, ব্রিটেন, ইউরোপীয় ইউনিয়ন বা উপসাগরীয় দেশ দিয়ে — আর সেই ট্রানজিট দেশে ঢুকতে বাংলাদেশি পাসপোর্টধারীর ভিসা লাগে। গন্তব্য ভিসা-মুক্ত হলেও সেখানে বৈধভাবে পৌঁছানো না গেলে তা কোনো কাজে আসে না, তাই কোনো গন্তব্যকে ভিসা-মুক্ত ভাবার আগে ট্রানজিটের অংশটি ঠিক করে নিন।",
  },
  {
    question: "How often do these visa rules change?",
    answer:
      "Frequently, and without much notice. Bangladesh's index position moved from 95th in January 2026 to 97th by July 2026, and Sri Lanka replaced visa on arrival with a mandatory online ETA in October 2025. Always confirm the current requirement with the destination's own immigration authority or its embassy in Dhaka before booking anything non-refundable.",
    questionBn:
      "এই ভিসা নিয়মগুলো কত ঘন ঘন বদলায়?",
    answerBn:
      "প্রায়ই, আর খুব একটা আগাম জানানো ছাড়াই। বাংলাদেশের সূচক অবস্থান ২০২৬ সালের জানুয়ারিতে ৯৫ থেকে জুলাই নাগাদ ৯৭-এ নেমেছে, আর শ্রীলংকা ২০২৫ সালের অক্টোবরে ভিসা অন অ্যারাইভাল বাদ দিয়ে বাধ্যতামূলক অনলাইন ETA চালু করেছে। কোনো অফেরতযোগ্য কিছু বুক করার আগে গন্তব্য দেশের নিজস্ব ইমিগ্রেশন কর্তৃপক্ষ বা ঢাকার দূতাবাস থেকে সর্বশেষ নিয়ম যাচাই করে নিন।",
  },
];
