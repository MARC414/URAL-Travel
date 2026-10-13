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
}

/** Destinations a Bangladeshi traveller can actually use without a prior visa. */
export const USABLE_NOW: VisaFreeEntry[] = [
  {
    country: "Nepal",
    flag: "🇳🇵",
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
export const REMOTE_VISA_FREE: string[] = [
  "Bahamas",
  "Barbados",
  "British Virgin Islands",
  "Cook Islands",
  "Dominica",
  "Fiji",
  "Gambia",
  "Grenada",
  "Haiti",
  "Jamaica",
  "Kiribati",
  "Micronesia",
  "Montserrat",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Vincent and the Grenadines",
  "Trinidad and Tobago",
  "Vanuatu",
];

/** Visa on arrival, but reaching the airport is its own problem. */
export const REMOTE_VOA: string[] = [
  "Burundi",
  "Cambodia (USD 30, 30 days — the most reachable of these)",
  "Cape Verde",
  "Comoros",
  "Djibouti",
  "Guinea-Bissau",
  "Madagascar",
  "Mozambique",
  "Samoa",
  "Sierra Leone",
  "Timor-Leste (USD 30, 30 days)",
  "Tuvalu",
];

/**
 * The section that earns the page its keep. Every one of these is a country a
 * Bangladeshi traveller reasonably assumes is easy, and is not.
 */
export const COMMONLY_MISREAD: VisaFreeEntry[] = [
  {
    country: "UAE (Dubai)",
    flag: "🇦🇪",
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
    entry: "Visa required",
    maxStay: "As issued (commonly 60 days)",
    cost: "Approx. USD 35–40 for a single-entry tourist visa",
    reach: "Direct from Dhaka",
    note: "Bangladeshi passport holders are not eligible for visa on arrival or visa exemption. A sticker visa or an approved e-Visa must be in hand before departure — check-in staff at Dhaka will ask for it.",
    source: "Royal Thai Embassy, Dhaka; Thai e-Visa portal",
  },
  {
    country: "Malaysia",
    flag: "🇲🇾",
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
    entry: "e-Visa (apply before flying)",
    maxStay: "As issued (commonly 30 days)",
    cost: "Approx. USD 60 for the e-Visa",
    reach: "Needs a connection",
    note: "Turkey's e-Visa is available to Bangladeshi passport holders only on conditions — typically holding a valid visa or residence permit from the US, UK, Schengen area or Ireland. Without one, apply at the embassy.",
    source: "Republic of Türkiye e-Visa portal",
  },
];

/** What to carry regardless of destination. */
export const ALWAYS_CARRY: { item: string; detail: string }[] = [
  {
    item: "Passport valid 6+ months",
    detail:
      "Almost every airline measures validity from your date of return, not departure. A passport with five months left will be refused at the Dhaka check-in desk even if the destination would have admitted you.",
  },
  {
    item: "Confirmed return or onward ticket",
    detail:
      "Required for visa-on-arrival destinations such as Nepal and the Maldives, and checked at boarding. An unconfirmed hold is not enough.",
  },
  {
    item: "Hotel booking or host address",
    detail: "Immigration may ask where you are staying. A screenshot is fine; a verbal answer is not.",
  },
  {
    item: "Proof of funds",
    detail:
      "A bank statement, an internationally enabled card (see the dual-currency endorsement guide), or a modest amount of US dollars in cash.",
  },
  {
    item: "Printed copies",
    detail:
      "Of the visa or approval, the return ticket and the hotel booking. Airport Wi-Fi fails; printed paper does not.",
  },
  {
    item: "Travel insurance",
    detail:
      "Mandatory for the UAE and increasingly expected elsewhere. Buy it before you fly — policies purchased after departure generally exclude the incident.",
  },
];

export interface VisaFreeFaq {
  question: string;
  answer: string;
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
  },
  {
    question: "Which countries can Bangladeshi passport holders visit without any prior visa?",
    answer:
      "Nepal grants a free 30-day visa on arrival for the first entry of each calendar year under the SAARC gratis scheme, and the Maldives grants a free 30-day visa on arrival with a mandatory online IMUGA Traveller Declaration. Both have direct flights from Dhaka. Sri Lanka requires an ETA — approved online before departure, not issued on arrival — at the reduced SAARC rate of USD 20. Beyond these, the genuinely visa-free destinations are Caribbean and Pacific island states that cannot be reached from Dhaka without transiting a country for which a Bangladeshi passport holder needs a visa.",
  },
  {
    question: "Is Sri Lanka visa-free for Bangladeshi citizens?",
    answer:
      "No. Sri Lanka requires an Electronic Travel Authorisation approved before travel, and it ended visa on arrival in October 2025, so you cannot obtain entry at Colombo airport without prior approval. Bangladeshi travellers pay the reduced SAARC rate of USD 20 rather than the standard USD 50, and the ETA is issued for 30 days with double entry. Apply only at eta.gov.lk; third-party sites charge several times the official fee for the same application.",
  },
  {
    question: "Can Bangladeshi passport holders get a UAE visa on arrival?",
    answer:
      "Not on an ordinary Bangladeshi passport. A pre-arranged tourist visa is mandatory, obtained through an airline, a licensed travel agency or a UAE-based sponsor before you fly, and health insurance covering the stay is required. The single exception is for travellers who already hold a valid residence permit or visa from certain other countries, which can qualify them for visa on arrival — so if you hold a GCC, US, UK or Schengen residence permit, check that specific rule.",
  },
  {
    question: "Do I need a transit visa to reach visa-free countries?",
    answer:
      "Usually, yes — and this is the detail that most visa-free country lists leave out. Almost every Caribbean and Pacific destination on a Bangladeshi passport's visa-free list is reached via the United States, the United Kingdom, the European Union or the Gulf, and a Bangladeshi passport holder needs a visa to enter those transit countries. A visa-free destination is only useful if you can legally reach it, so always plan the transit leg before treating a destination as visa-free.",
  },
  {
    question: "How often do these visa rules change?",
    answer:
      "Frequently, and without much notice. Bangladesh's index position moved from 95th in January 2026 to 97th by July 2026, and Sri Lanka replaced visa on arrival with a mandatory online ETA in October 2025. Always confirm the current requirement with the destination's own immigration authority or its embassy in Dhaka before booking anything non-refundable.",
  },
];
