/**
 * Curated paths through the official sources registry.
 *
 * A journey orders official links by the step of a trip at which a traveller
 * needs them. It adds no link of its own: every URL here must already be in the
 * official list (`getOfficialSources`), and `npm run test:official-sources`
 * fails when one is not. Community bodies are never used in a journey.
 */
import { officialSourceUrlKey, type OfficialSourceEntry } from "./officialSources";

export type OfficialJourneyStageId = "book" | "visa" | "health" | "protection" | "flights" | "in-saudi" | "emergencies";

export interface OfficialJourneyStage {
  id: OfficialJourneyStageId;
  en: string;
  bn: string;
  /** Official links for this step, most useful first. Four at most. */
  links: readonly string[];
  /** English path of the URAL guide for this step, when one is published. */
  guide?: string;
}

export interface OfficialJourney {
  id: string;
  en: string;
  bn: string;
  stages: readonly OfficialJourneyStage[];
}

export const UK_PILGRIM_JOURNEY: OfficialJourney = {
  id: "uk-hajj-umrah",
  en: "UK Hajj and Umrah: start here",
  bn: "যুক্তরাজ্য থেকে হজ ও ওমরাহ: এখান থেকে শুরু",
  stages: [
    {
      id: "book",
      en: "Book",
      bn: "বুকিং",
      links: [
        "https://hajj.nusuk.sa/",
        "https://hajj.nusuk.sa/PackagesCategories",
        "https://umrah.nusuk.sa/Journey",
      ],
      guide: "/blog/hajj-2027-uk-dates-nusuk-registration-cost",
    },
    {
      id: "visa",
      en: "Visa and entry",
      bn: "ভিসা ও প্রবেশ",
      links: [
        "https://www.gov.uk/foreign-travel-advice/saudi-arabia/entry-requirements",
        "https://visa.visitsaudi.com/",
        "https://haj.gov.sa/en/Umrah/Umrah-Requirements",
      ],
      guide: "/blog/uk-passport-umrah-visa-eta-evisa-waiver-step-by-step",
    },
    {
      id: "health",
      en: "Health",
      bn: "স্বাস্থ্য",
      links: [
        "https://travelhealthpro.org.uk/factsheets/hajj-and-umrah",
        "https://www.gov.uk/foreign-travel-advice/saudi-arabia/health",
        "https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx",
      ],
    },
    {
      id: "protection",
      en: "Money protection",
      bn: "অর্থের সুরক্ষা",
      links: [
        "https://www.caa.co.uk/atol-protection/check-an-atol/",
        "https://www.atol.org/about-atol/atol-certificates/",
        "https://www.gov.uk/guidance/foreign-travel-insurance",
        "https://www.cityoflondon.police.uk/news/city-of-london/news/2025/april/city-of-london-police-warn-uk-pilgrims-to-stay-alert-to-hajj-related-fraud-as-150000-lost-to-criminals-last-year/",
      ],
      guide: "/blog/uk-umrah-packages-atol-operator-checks",
    },
    {
      id: "flights",
      en: "Flights",
      bn: "ফ্লাইট",
      links: [
        "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide",
        "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/delays/",
        "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/",
        "https://www.saudia.com/pages/travel-with-saudia/where-we-fly/our-network",
      ],
      guide: "/blog/uk-to-saudi-flights-umrah-direct-or-connecting",
    },
    {
      id: "in-saudi",
      en: "In Saudi Arabia",
      bn: "সৌদি আরবে",
      links: [
        "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Hajj-Guide-Uk",
        "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
        "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
        "https://sar.hhr.sa",
      ],
      guide: "/blog/umrah-hajj-guide-united-kingdom-2026",
    },
    {
      id: "emergencies",
      en: "Emergencies",
      bn: "জরুরি অবস্থা",
      links: [
        "https://www.gov.uk/foreign-travel-advice/saudi-arabia/getting-help",
        "https://www.gov.uk/foreign-travel-advice/saudi-arabia/safety-and-security",
        "https://haj.gov.sa/en/Contact-us",
      ],
    },
  ],
};

export const OFFICIAL_JOURNEYS: readonly OfficialJourney[] = [UK_PILGRIM_JOURNEY];

/** Which countries' links a traveller from each starting point needs. */
export type OfficialAudience = "all" | "bd" | "uk";

export const OFFICIAL_AUDIENCES: Readonly<Record<OfficialAudience, { en: string; bn: string }>> = {
  all: { en: "All", bn: "সব" },
  bd: { en: "Bangladesh", bn: "বাংলাদেশ" },
  uk: { en: "United Kingdom", bn: "যুক্তরাজ্য" },
};

/**
 * From the UK: UK, Saudi and international bodies (the pilgrimage journey).
 * From Bangladesh: everything except the UK-only pages.
 */
export function audienceIncludesCountry(audience: OfficialAudience, country: string): boolean {
  if (audience === "uk") return country === "GB" || country === "SA" || country === "INTL";
  if (audience === "bd") return country !== "GB";
  return true;
}

/**
 * Guides to keep: official PDF handbooks, linked on the publisher's own site.
 * URAL never hosts a copy of an official file.
 */
export const OFFICIAL_GUIDE_DOWNLOADS: readonly string[] = [
  "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Hajj-Guide-Uk",
  "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/General-Hajj-Guide/en-hajj-guid.pdf",
  "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Umrah-Guide/English/EN-Umrah-Guide.pdf",
  "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/UMRAH-VISIT-GUIDE/English/EN-Umrah-Visit-Guide.pdf",
];

/** PDFs URAL wrote itself and hosts under `public/downloads`. */
export interface UralDownload {
  path: string;
  en: string;
  bn: string;
  pages: number;
  /** Language the file is written in. */
  fileLanguage: "en" | "bn";
}

export const URAL_DOWNLOADS: readonly UralDownload[] = [
  {
    path: "/downloads/ural-hajj-preparation-checklist-2027-en.pdf",
    en: "URAL Hajj preparation checklist",
    bn: "URAL হজ প্রস্তুতি চেকলিস্ট",
    pages: 2,
    fileLanguage: "en",
  },
];

/** A journey with each step's addresses replaced by the registry entries. Unknown addresses are dropped. */
export function resolveJourney(
  journey: OfficialJourney,
  sources: readonly OfficialSourceEntry[]
): { stage: OfficialJourneyStage; links: OfficialSourceEntry[] }[] {
  const byKey = new Map(sources.map((source) => [officialSourceUrlKey(source.url), source]));
  return journey.stages.map((stage) => ({
    stage,
    links: stage.links.flatMap((url) => byKey.get(officialSourceUrlKey(url)) ?? []),
  }));
}

/** The official handbooks, as registry entries, in the listed order. */
export function resolveGuideDownloads(sources: readonly OfficialSourceEntry[]): OfficialSourceEntry[] {
  const byKey = new Map(sources.map((source) => [officialSourceUrlKey(source.url), source]));
  return OFFICIAL_GUIDE_DOWNLOADS.flatMap((url) => byKey.get(officialSourceUrlKey(url)) ?? []);
}
