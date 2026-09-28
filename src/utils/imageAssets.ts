/** Shared image metadata for optimized responsive site photography. */
const RESPONSIVE_IMAGE_HEIGHTS: Readonly<Record<string, number>> = {
  "airport_departure_board_delay_claim_1790520824658": 670,
  "bangkok_destination_1781544149435": 655,
  "bangkok_medical_hospital_lobby_1790520775439": 670,
  "bangkok_wat_arun_chao_phraya_1790486821534": 670,
  "bangladesh_epassport_biometric_desk_1790520813052": 670,
  "bdt_travel_concierge_voucher_1790486777146": 670,
  "blog_editorial_hero_banner_1790429994056": 670,
  "clouds_boat_hero_1781438671378": 670,
  "coxs_bazar_sunrise_1781620718331": 670,
  "dhaka_airport_widebody_airlines_tarmac_1790520836931": 670,
  "dubai_destination_1781544180311": 655,
  "dubai_skyline_burj_twilight_1790485747967": 670,
  "haramain_bullet_train_1790484312808": 896,
  "ihram_preparation_set_1790484426740": 896,
  "islamic_banking_card_makkah_1790486749439": 670,
  "jeddah_airport_terminal_1790484400414": 896,
  "kl_destination_1781544164707": 655,
  "kuala_lumpur_petronas_twilight_1790486835902": 670,
  "madinah_courtyard_umbrellas_1790484340720": 896,
  "madinah_green_dome_1790484369923": 896,
  "makkah_halal_cuisine_1790484456326": 896,
  "maldives_destination_1790387286896": 896,
  "masjid_nabawi_arches_1790484388265": 896,
  "mina_hajj_tents_1790484325661": 896,
  "nepal_destination_1781544132297": 655,
  "paris_louvre_london_landmarks_1790485782111": 670,
  "passport_card_travel_desk_1790430035290": 896,
  "passport_stamps_boarding_window_1790486849797": 670,
  "pos_card_terminal_currency_1790486792551": 670,
  "putrajaya_pink_mosque_malaysia_1790485770212": 670,
  "quba_mosque_taif_ziyarah_1790485732985": 670,
  "ramadan_makkah_night_1790484415220": 896,
  "rfcd_foreign_currency_banking_1790486762760": 670,
  "saudi_stopover_aircraft_1790484351784": 896,
  "sheikh_zayed_grand_mosque_1790485758750": 670,
  "singapore_destination_1790387270177": 896,
  "singapore_mrt_gardens_bay_1790520762227": 670,
  "sri_lanka_nine_arch_train_1790520800518": 670,
  "travel_esim_smartphone_insurance_1790520786938": 670,
  "umrah_makkah_haram_guide_1790430007679": 896,
  "ural_hero_bg_1781543111624": 670,
  "zamzam_ajwa_dates_1790484440926": 896,
};

const RESPONSIVE_IMAGE_WIDTH = 1200;

export interface ResponsiveImageProps {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

/**
 * Return matching 640px/1200px WebP sources and the 1200px file's intrinsic
 * dimensions. Keeping width and height in markup reserves the correct space
 * before the image loads; callers choose loading/fetch-priority per context.
 */
export function getResponsiveImageProps(
  source: string,
  sizes = "100vw",
): ResponsiveImageProps {
  const src = source.replace(/-640\.webp$/, "-1200.webp");
  const baseName = src.split("/").pop()?.replace(/-1200\.webp$/, "") ?? "";
  const height = RESPONSIVE_IMAGE_HEIGHTS[baseName];
  if (!height) {
    throw new Error(`Missing intrinsic dimensions for optimized image: ${baseName}`);
  }

  return {
    src,
    srcSet: `${src.replace(/-1200\.webp$/, "-640.webp")} 640w, ${src} 1200w`,
    sizes,
    width: RESPONSIVE_IMAGE_WIDTH,
    height,
  };
}

/** Descriptive, visual alt text for the 41 editorial blog-cover photographs. */
export const BLOG_IMAGE_ALT_TEXT: Readonly<Record<string, string>> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": "The Kaaba at Masjid al-Haram in Makkah, illuminated at night.",
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": "A Haramain high-speed train at a station in Saudi Arabia.",
  "hajj-registration-bangladesh-government-vs-private-package-cost": "White Hajj tents spread across Mina near Makkah.",
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": "Pilgrims walking beneath the courtyard umbrellas at the Prophet’s Mosque in Madinah.",
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": "A passenger aircraft flying above the clouds at sunrise.",
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": "The Green Dome at the Prophet’s Mosque in Madinah, illuminated at night.",
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": "Arched entrances and corridors at the Prophet’s Mosque in Madinah.",
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": "Passengers walking through the Jeddah airport terminal.",
  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": "Pilgrims gathered at Masjid al-Haram in Makkah at night.",
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": "Folded ihram garments, prayer beads, and a passport arranged on a desk.",
  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": "Dates and Arabic coffee arranged on a table.",
  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": "A spread of Middle Eastern dishes served at a restaurant.",
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": "Quba Mosque in Madinah beside a reflecting pool.",
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": "Dubai’s skyline at twilight, including the Burj Khalifa.",
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": "Sheikh Zayed Grand Mosque reflected in its courtyard pool in Abu Dhabi.",
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": "Putra Mosque in Putrajaya reflected across the waterfront.",
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": "The Louvre pyramid in Paris at dusk.",
  "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": "A green payment card and prayer beads arranged on a desk.",
  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": "An open laptop beside banking paperwork and foreign currency.",
  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": "A laptop, travel notebook, and coffee arranged on a desk.",
  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": "A passport, payment card, and foreign banknotes arranged on a table.",
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": "Wat Arun on Bangkok’s Chao Phraya River at sunset.",
  "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": "The Petronas Twin Towers illuminated at night in Kuala Lumpur.",
  "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": "A Bangladeshi passport and boarding pass beside an airplane window.",
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": "An MRT train crossing Marina Bay in Singapore at dusk.",
  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": "The reception and seating area inside a modern Bangkok hospital.",
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": "A smartphone and travel documents arranged beside a passport.",
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": "A train crossing the Nine Arch Bridge in Sri Lanka’s green hill country.",
  "bangladesh-epassport-application-renewal-64-districts-fee-guide": "Passports and application paperwork arranged on a desk.",
  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": "Departure information boards above passengers in an airport terminal.",
  "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": "Passenger aircraft parked at an airport during sunset.",
  "dual-currency-card-endorsement-bangladesh": "Bangladeshi passports, foreign currency, and coffee on a travel desk.",
  "dhaka-airport-outbound-immigration-checklist-noc-go": "A passenger aircraft cruising above a blanket of clouds at sunset.",
  "nepal-pokhara-itinerary-bangladesh": "Boudhanath Stupa in Kathmandu at sunset.",
  "nepal-vs-thailand-first-trip": "Sunrise over Cox’s Bazar beach in Bangladesh.",
  "halal-food-guide-bangkok-bangladesh": "Wat Arun and Bangkok’s riverfront at sunset.",
  "top-budget-family-destinations-from-dhaka": "The Kuala Lumpur skyline with the Petronas Twin Towers at twilight.",
  "hotel-savings-guide-bangkok-kl-dubai": "Dubai’s skyline and Burj Khalifa beside the waterfront at sunset.",
  "singapore-visa-guide-bangladesh-agents": "The Gardens by the Bay Supertrees and Singapore skyline at twilight.",
  "maldives-budget-trip-bangladesh-maafushi": "Overwater villas above a turquoise lagoon in the Maldives.",
  "cheap-flight-booking-hacks-dhaka": "An airplane wing above the clouds, viewed from a passenger cabin.",
};

export function getBlogImageAltText(slug: string): string {
  return BLOG_IMAGE_ALT_TEXT[slug] ?? "Travel scene related to this guide.";
}
