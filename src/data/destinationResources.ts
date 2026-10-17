export type DestinationPartner = "klook" | "tiqets" | "kkday" | "kiwitaxi";

/** Existing editorial guides that add useful, destination-specific context. */
export const DESTINATION_RELATED_BLOG_SLUGS: Record<string, string[]> = {
  "nepal-guide": [
    "nepal-pokhara-itinerary-bangladesh",
    "nepal-vs-thailand-first-trip",
  ],
  "thailand-guide": [
    "halal-food-guide-bangkok-bangladesh",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide",
    "hotel-savings-guide-bangkok-kl-dubai",
  ],
  "malaysia-guide": [
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration",
    "hotel-savings-guide-bangkok-kl-dubai",
  ],
  "singapore-guide": [
    "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide",
    "singapore-visa-guide-bangladesh-agents",
  ],
  "maldives-guide": [
    "maldives-budget-trip-bangladesh-maafushi",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost",
  ],
  "dubai-guide": [
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide",
    "hotel-savings-guide-bangkok-kl-dubai",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide",
  ],
  "london-guide": ["europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"],
  "italy-guide": ["europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"],
  "paris-guide": ["europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"],
  "new-york-guide": ["europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"],
};

/** Partner categories are shown only when they fit a guide's actual itinerary. */
export const DESTINATION_AFFILIATE_PARTNERS: Record<string, DestinationPartner[]> = {
  "nepal-guide": ["klook"],
  "thailand-guide": ["klook", "kkday"],
  "malaysia-guide": ["klook", "kkday"],
  "singapore-guide": ["klook", "kkday"],
  "maldives-guide": ["klook"],
  "dubai-guide": ["klook", "kiwitaxi"],
  "london-guide": ["tiqets", "kiwitaxi"],
  "italy-guide": ["tiqets", "kiwitaxi"],
  "paris-guide": ["tiqets", "kiwitaxi"],
  "new-york-guide": ["tiqets", "kiwitaxi"],
};

export const DESTINATION_PARTNER_COPY: Record<
  DestinationPartner,
  { en: string; bn: string; ctaEn: string; ctaBn: string }
> = {
  klook: {
    en: "Tours and attraction listings",
    bn: "ট্যুর ও আকর্ষণের তালিকা",
    ctaEn: "Check Klook listings",
    ctaBn: "Klook-এর তালিকা দেখুন",
  },
  tiqets: {
    en: "Museum and attraction tickets",
    bn: "জাদুঘর ও আকর্ষণের টিকিট",
    ctaEn: "Check Tiqets listings",
    ctaBn: "Tiqets-এর তালিকা দেখুন",
  },
  kkday: {
    en: "Tours, rail and attraction listings",
    bn: "ট্যুর, রেল ও আকর্ষণের তালিকা",
    ctaEn: "Check KKday listings",
    ctaBn: "KKday-এর তালিকা দেখুন",
  },
  kiwitaxi: {
    en: "Airport transfer options",
    bn: "বিমানবন্দর ট্রান্সফারের বিকল্প",
    ctaEn: "Check Kiwitaxi routes",
    ctaBn: "Kiwitaxi-এর রুট দেখুন",
  },
};
