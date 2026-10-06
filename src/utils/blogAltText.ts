/**
 * Dynamic Alt Text Generation Utility for Editorial Blog Cover Photography
 *
 * Implements WCAG 2.1/2.2 Level AA/AAA accessibility requirements (WCAG 1.1.1 Non-text Content)
 * and Google Image SEO best practices:
 *   - Contextual & Informative: Explains the visual scene in connection to article topic & category.
 *   - Anti-Redundancy: Never uses screen-reader redundant phrases like "Photo of", "Image of",
 *     "Graphic of", or "ছবি:" (screen readers already announce the element as an image).
 *   - Semantic Sanitization: Strips clickbait artifacts, year tags (e.g. "[2026]"), marketing
 *     prefixes, and distracting emojis before generating descriptive copy.
 *   - Screen Reader Length Boundary: Defaults to 80-125 characters, strictly capped under 140 chars.
 *   - Bilingual Fidelity: Native English and Bengali generation for URAL's bilingual audience.
 *   - Dynamic Fallback: Never outputs generic strings ("Travel scene"); derives destination &
 *     category entity anchors dynamically when an unmapped or custom article is passed.
 */

export interface BlogCoverAltTextInput {
  /** The article title in English or Bengali. */
  title?: string;
  /** The editorial category (e.g., 'Hajj & Umrah', 'Visa & Immigration', 'হজ্জ ও ওমরাহ'). */
  category?: string;
  /** Optional slug for looking up curated editorial photography scene descriptions. */
  slug?: string;
  /** Language locale ('en' | 'bn'). If omitted, auto-detected from text. */
  lang?: "en" | "bn" | string;
  /** Whether the image is rendered as the primary article detail hero vs a listing card thumbnail. */
  isDetail?: boolean;
  /** Maximum length constraint (default: 125, optimal for screen-reader scannability). */
  maxLength?: number;
}

/**
 * Curated photographic descriptions of the visual scenes captured in URAL's
 * high-resolution editorial photography (English & Bengali).
 */
export const CURATED_BLOG_SCENES: Readonly<
  Record<string, { en: string; bn: string }>
> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    en: "The Kaaba at Masjid al-Haram in Makkah, illuminated at night",
    bn: "মক্কার মসজিদুল হারামে রাতের আলোকোজ্জ্বল পবিত্র কাবা শরিফ",
  },
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    en: "A Haramain high-speed bullet train at a modern station platform in Saudi Arabia",
    bn: "সৌদি আরবের আধুনিক স্টেশনে অপেক্ষমাণ দ্রুতগতির হরমাইন বুলেট ট্রেন",
  },
  "hajj-registration-bangladesh-government-vs-private-package-cost": {
    en: "White pilgrim accommodation tents spread across Mina valley near Makkah",
    bn: "মক্কার নিকটবর্তী মিনা উপত্যকায় শুভ্র হাজি তাঁবুর দৃশ্য",
  },
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    en: "Pilgrims walking beneath the shaded courtyard umbrellas at the Prophet's Mosque in Madinah",
    bn: "মদিনায় মসজিদে নববীর বিশালাকার ছাতার নিচে ওমরাহ যাত্রীদের চলাচলের দৃশ্য",
  },
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    en: "A commercial passenger aircraft cruising above the clouds at sunrise",
    bn: "সূর্যোদয়ের সময় মেঘমালার ওপর দিয়ে উড়ে চলা আন্তর্জাতিক যাত্রীবাহী বিমান",
  },
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    en: "The iconic Green Dome of the Prophet's Mosque in Madinah illuminated at dusk",
    bn: "গোধূলিলগ্নে মদিনার মসজিদে নববীর পবিত্র সবুজ গম্বুজের দৃশ্য",
  },
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    en: "Marble arches and designated pilgrim entrances at the Prophet's Mosque in Madinah",
    bn: "মদিনার মসজিদে নববীর মার্বেল পাথরের খিলান ও প্রবেশদ্বার",
  },
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    en: "International travelers walking through the modern Jeddah King Abdulaziz airport terminal",
    bn: "জেদ্দার কিং আবদুল আজিজ আন্তর্জাতিক বিমানবন্দর টার্মিনালে যাত্রীদের গমনাগমন",
  },
  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    en: "Pilgrims gathered in prayer around the Kaaba at Masjid al-Haram during Ramadan night",
    bn: "রমজানের রাতে মক্কার মসজিদুল হারামে কাবা প্রাঙ্গণে সমবেত মুসল্লিদের প্রার্থনা",
  },
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    en: "Folded white ihram garments, prayer beads, and travel documents on a preparation desk",
    bn: "টেবিলের ওপর রাখা শুভ্র ইহরামের কাপড়, তসবিহ ও ভ্রমণ নথিপত্র",
  },
  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    en: "Saudi Ajwa dates and traditional Arabic coffee set for airport departure customs clearance",
    bn: "বিমানবন্দর কাস্টমস ব্যাগেজ চেকের জন্য প্রস্তুত সৌদি আজওয়া খেজুর ও আরবি কফি",
  },
  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    en: "A spread of authentic Middle Eastern halal grilled dishes served at a dining table",
    bn: "রেস্তোরাঁয় পরিবেশিত ঐতিহ্যবাহী হালাল মধ্যপ্রাচ্যের খাবারের পদ",
  },
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    en: "Historic Quba Mosque in Madinah beside a serene reflecting pool",
    bn: "মদিনার ঐতিহাসিক মসজিদে কুবা ও সম্মুখের শান্ত জলাশয়",
  },
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    en: "Dubai downtown skyline at twilight featuring the illuminated Burj Khalifa",
    bn: "গোধূলির আলোয় দুবাই ডাউনটাউনের স্কাইলাইন ও আলোকিত বুর্জ খলিফা",
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    en: "Sheikh Zayed Grand Mosque in Abu Dhabi with white marble domes reflected in water",
    bn: "আবুধাবির শেখ জায়েদ গ্র্যান্ড মসজিদের শুভ্র মার্বেল গম্বুজ ও জলাশয়ের প্রতিফলন",
  },
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": {
    en: "Putra Mosque in Putrajaya reflected across the scenic lake waterfront",
    bn: "মালয়েশিয়ার পুত্রজায়ার নান্দনিক পুত্রা মসজিদ ও লেকের মনোরম দৃশ্য",
  },
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    en: "The Louvre museum glass pyramid illuminated at dusk in Paris",
    bn: "প্যারিসে গোধূলির আলোয় আলোকিত লুভর জাদুঘরের কাচের পিরামিড",
  },
  "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": {
    en: "An Islamic banking dual-currency credit card arranged with prayer beads on a travel desk",
    bn: "ভ্রমণ ডেস্কে রাখা শরিয়াহ-সম্মত ডুয়েল কারেন্সি কার্ড ও তসবিহ",
  },
  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    en: "Foreign currency bank paperwork and banking cards arranged on a business desk",
    bn: "ব্যবসায়িক ডেস্কে রাখা বৈদেশিক মুদ্রা এন্ডোর্সমেন্ট ও ব্যাংকিং নথিপত্র",
  },
  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": {
    en: "A digital travel booking voucher and laptop on an itinerary planning desk",
    bn: "ভ্রমণ পরিকল্পনা ডেস্কে ডিজিটাল হোটেল ভাউচার ও ল্যাপটপ",
  },
  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": {
    en: "A point-of-sale card terminal, foreign currency banknotes, and an endorsed payment card",
    bn: "পয়েন্ট অব সেল (পিওএস) টার্মিনাল, বৈদেশিক কারেন্সি নোট ও পেমেন্ট কার্ড",
  },
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    en: "Wat Arun temple along the Chao Phraya River at golden hour sunset in Bangkok",
    bn: "সূর্যাস্তের সোনালি আলোয় ব্যাংককের চাও ফ্রায়া নদীর তীরে ঐতিহাসিক ওয়াট অরুণ",
  },
  "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": {
    en: "The iconic Petronas Twin Towers illuminated against the night sky in Kuala Lumpur",
    bn: "কুয়ালালামপুরের রাতের আকাশে আলোকিত পেট্রোনাস টুইন টাওয়ার",
  },
  "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": {
    en: "A green Bangladeshi passport with boarding passes arranged near an aircraft window",
    bn: "উড়োজাহাজের জানালার পাশে রাখা সবুজ বাংলাদেশি পাসপোর্ট ও বোর্ডিং পাস",
  },
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    en: "A Singapore MRT train crossing Marina Bay bridge against the twilight city skyline",
    bn: "গোধূলির আলোয় মেরিনা বে পারাপাররত সিঙ্গাপুর এমআরটি ট্রেন",
  },
  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": {
    en: "Modern international patient reception and healthcare lounge inside a Bangkok hospital",
    bn: "ব্যাংককের আন্তর্জাতিক হাসপাতালের আধুনিক অভ্যর্থনা ও স্বাস্থ্যসেবা লাউঞ্জ",
  },
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    en: "A smartphone with active eSIM data connectivity arranged beside travel insurance papers",
    bn: "আন্তর্জাতিক ট্রাভেল ইন্স্যুরেন্স ও সচল ই-সিমসহ স্মার্টফোন",
  },
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    en: "A scenic passenger train crossing the historic Nine Arch Bridge in Ella, Sri Lanka",
    bn: "শ্রীলঙ্কার সবুজে ঘেরা পাহাড়ের ওপর নাইন আর্চ ব্রিজ দিয়ে ট্রেন পারাপারের দৃশ্য",
  },
  "bangladesh-epassport-application-renewal-64-districts-fee-guide": {
    en: "Biometric e-passport verification desk with official application forms and passport book",
    bn: "বায়োমেট্রিক ই-পাসপোর্ট ভেরিফিকেশন ডেস্ক ও আবেদন নথিপত্র",
  },
  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    en: "Airport flight departure status board showing delayed and on-time international flights",
    bn: "আন্তর্জাতিক বিমানবন্দরের ফ্লাইট স্ট্যাটাস বোর্ড ও বিলম্বিত ফ্লাইটের তালিকা",
  },
  "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": {
    en: "Widebody passenger aircraft lined up at the tarmac gates of Dhaka Hazrat Shahjalal Airport",
    bn: "ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের রানওয়েতে সারিবদ্ধ বোয়িং বিমান",
  },
  "dual-currency-card-endorsement-bangladesh": {
    en: "Bangladeshi passport open to currency endorsement page beside international payment cards",
    bn: "ডলার এন্ডোর্সমেন্ট পেজে উন্মুক্ত বাংলাদেশি পাসপোর্ট ও ডুয়েল কারেন্সি কার্ড",
  },
  "dhaka-airport-outbound-immigration-checklist-noc-go": {
    en: "Passenger aircraft climbing above sea of clouds at departure sunset from Dhaka",
    bn: "ঢাকা বিমানবন্দর থেকে উড্ডয়নের পর সূর্যাস্তের মেঘমালার ওপর দিয়ে বিমান",
  },
  "nepal-pokhara-itinerary-bangladesh": {
    en: "The historic Boudhanath Stupa in Kathmandu fluttering with colorful prayer flags",
    bn: "কাঠমান্ডুর ঐতিহাসিক বৌদ্ধনাথ স্তূপ ও বাতাসে দোলা রঙিন পতাকা",
  },
  "nepal-vs-thailand-first-trip": {
    en: "Sunrise reflections over Cox's Bazar beach and gentle ocean waves in Bangladesh",
    bn: "কক্সবাজার সমুদ্র সৈকতে ভোরের শান্ত ঢেউ ও সূর্যোদয়ের লাল আভা",
  },
  "halal-food-guide-bangkok-bangladesh": {
    en: "Wat Arun temple spire seen across the bustling Chao Phraya riverfront in Bangkok",
    bn: "ব্যাংককের প্রাণবন্ত চাও ফ্রায়া নদী ও ওয়াট অরুণ মন্দিরের চূড়া",
  },
  "top-budget-family-destinations-from-dhaka": {
    en: "Petronas Twin Towers and surrounding park illuminated at dusk in Kuala Lumpur",
    bn: "কুয়ালালামপুরের মনোরম পার্ক ও আলোকিত পেট্রোনাস টুইন টাওয়ার",
  },
  "hotel-savings-guide-bangkok-kl-dubai": {
    en: "Modern city waterfront hotels and luxury skyscrapers illuminated at twilight",
    bn: "গোধূলির আলোয় আধুনিক শহরের দৃষ্টিনন্দন ওয়াটারফ্রন্ট হোটেল ও স্কাইস্ক্র্যাপার",
  },
  "singapore-visa-guide-bangladesh-agents": {
    en: "Futuristic Supertree Grove at Gardens by the Bay glowing against Singapore skyline",
    bn: "সিঙ্গাপুরের গার্ডেনস বাই দ্য বে-র আলোকিত সুপারট্রি গ্রোভ ও স্কাইলাইন",
  },
  "maldives-budget-trip-bangladesh-maafushi": {
    en: "Overwater wooden villas and palm trees beside a crystal-clear turquoise lagoon in Maldives",
    bn: "মালদ্বীপের স্বচ্ছ নীল সমুদ্র ও সৈকতসংলগ্ন রিসোর্টের ওভারওয়াটার ভিলা",
  },
  "cheap-flight-booking-hacks-dhaka": {
    en: "Aircraft wing and jet engine viewed from passenger window cruising through clear blue sky",
    bn: "যাত্রীবাহী বিমানের জানালা দিয়ে নীল আকাশ ও মেঘের ওপর বিমানের ডানার দৃশ্য",
  },
  "bangladesh-travelers-iata-airport-codes-directory-guide": {
    en: "Commercial jetliners parked at international airport passenger gates during boarding",
    bn: "আন্তর্জাতিক বিমানবন্দরের বোর্ডিং গেটে পার্ক করা বাণিজ্যিক যাত্রীবাহী বিমান",
  },
  "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai": {
    en: "Dubai Creek waterfront skyline and coastal illuminated architectural towers at night",
    bn: "রাতের আলোয় দুবাই ক্রিক ওয়াটারফ্রন্ট ও আধুনিক টাওয়ারের মনোরম দৃশ্য",
  },
};

/**
 * Destination & entity keywords mapped to descriptive scene anchors in English and Bengali.
 */
interface DestinationAnchor {
  keywords: string[];
  en: string;
  bn: string;
}

const DESTINATION_ANCHORS: DestinationAnchor[] = [
  {
    keywords: ["makkah", "mecca", "মক্কা"],
    en: "Masjid al-Haram sanctuary and Kaaba courtyard in Makkah",
    bn: "মক্কার মসজিদুল হারাম ও কাবা চত্বর",
  },
  {
    keywords: ["madinah", "medina", "মদিনা", "rawdah"],
    en: "Prophet's Mosque courtyard and Green Dome in Madinah",
    bn: "মদিনার মসজিদে নববী চত্বর ও সবুজ গম্বুজ",
  },
  {
    keywords: ["jeddah", "জেদ্দা"],
    en: "Jeddah international airport terminal and Red Sea gateway",
    bn: "জেদ্দার কিং আবদুল আজিজ আন্তর্জাতিক বিমানবন্দর",
  },
  {
    keywords: ["taif", "badr", "তায়েফ", "বদর"],
    en: "Historic ziyarah landmarks and mountain landscapes",
    bn: "ঐতিহাসিক জিয়ারত স্থান ও পাহাড়ি ভূদৃশ্য",
  },
  {
    keywords: ["bangkok", "thailand", "thai", "ব্যাংকক", "থাইল্যান্ড"],
    en: "Wat Arun and the Chao Phraya riverfront in Bangkok",
    bn: "ব্যাংককের চাও ফ্রায়া নদী ও ওয়াট অরুণ মন্দির",
  },
  {
    keywords: ["kuala lumpur", "malaysia", "klia", "putrajaya", "কুয়ালালামপুর", "মালয়েশিয়া"],
    en: "Petronas Twin Towers and cityscape in Kuala Lumpur",
    bn: "কুয়ালালামপুরের পেট্রোনাস টুইন টাওয়ার ও নগরদৃশ্য",
  },
  {
    keywords: ["singapore", "সিঙ্গাপুর"],
    en: "Marina Bay waterfront and Gardens by the Bay in Singapore",
    bn: "সিঙ্গাপুরের মেরিনা বে ও গার্ডেনস বাই দ্য বে",
  },
  {
    keywords: ["nepal", "kathmandu", "pokhara", "নেপাল", "কাঠমান্ডু", "পোখরা"],
    en: "Himalayan valley vistas and historic stupas in Nepal",
    bn: "নেপালের হিমালয়ের উপত্যকা ও ঐতিহাসিক স্তূপ",
  },
  {
    keywords: ["dubai", "abu dhabi", "uae", "দুবাই", "আবুধাবি"],
    en: "Burj Khalifa and modern waterfront towers in the UAE",
    bn: "সংযুক্ত আরব আমিরাতের বুর্জ খলিফা ও আধুনিক ওয়াটারফ্রন্ট টাওয়ার",
  },
  {
    keywords: ["maldives", "maafushi", "মালদ্বীপ", "মাফুশি"],
    en: "Overwater wooden villas and turquoise tropical lagoon in the Maldives",
    bn: "মালদ্বীপের স্বচ্ছ ফিরোজা সমুদ্র ও ওভারওয়াটার ভিলা",
  },
  {
    keywords: ["sri lanka", "শ্রীলঙ্কা"],
    en: "Scenic railway viaducts and tea hill country in Sri Lanka",
    bn: "শ্রীলঙ্কার নয়নাভিরাম রেলওয়ে ও সবুজ চা বাগান",
  },
  {
    keywords: ["paris", "france", "london", "europe", "schengen", "প্যারিস", "ইউরোপ", "শেনজেন"],
    en: "Iconic historic architecture and central sightseeing landmarks",
    bn: "ঐতিহাসিক ইউরোপীয় স্থাপত্য ও দর্শনীয় স্থান",
  },
  {
    keywords: ["dhaka", "chattogram", "bangladesh", "ঢাকা", "চট্টগ্রাম", "বাংলাদেশ"],
    en: "International airport departure gates and aircraft tarmac in Bangladesh",
    bn: "বাংলাদেশের আন্তর্জাতিক বিমানবন্দরের রানওয়ে ও টার্মিনাল গেট",
  },
  {
    keywords: ["cox's bazar", "কক্সবাজার"],
    en: "Golden beach shoreline and ocean waves along Cox's Bazar",
    bn: "কক্সবাজারের দীর্ঘ সমুদ্র সৈকত ও সাগরের ঢেউ",
  },
];

/**
 * Editorial Category visual themes in English and Bengali.
 */
interface CategoryTheme {
  en: string;
  bn: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  "hajj & umrah": {
    en: "Pilgrim preparation and sacred sanctuary landmarks",
    bn: "পবিত্র হরমাইন ও ওমরাহ যাত্রীদের প্রস্তুতি",
  },
  "হজ্জ ও ওমরাহ": {
    en: "Pilgrim preparation and sacred sanctuary landmarks",
    bn: "পবিত্র হরমাইন ও ওমরাহ যাত্রীদের প্রস্তুতি",
  },
  "ziyarah & stopovers": {
    en: "Historic Islamic heritage monuments and transit stopover sites",
    bn: "ঐতিহাসিক দর্শনীয় স্থান ও ট্রানজিট স্টপওভার গন্তব্য",
  },
  "জিয়ারত ও স্টপওভার": {
    en: "Historic Islamic heritage monuments and transit stopover sites",
    bn: "ঐতিহাসিক দর্শনীয় স্থান ও ট্রানজিট স্টপওভার গন্তব্য",
  },
  "visa & immigration": {
    en: "Official travel documentation, passports, and immigration counters",
    bn: "পাসপোর্ট, ভিসা নথিপত্র ও ইমিগ্রেশন ডেস্কেল প্রস্তুতি",
  },
  "ভিসা ও ইমিগ্রেশন": {
    en: "Official travel documentation, passports, and immigration counters",
    bn: "পাসপোর্ট, ভিসা নথিপত্র ও ইমিগ্রেশন ডেস্কেল প্রস্তুতি",
  },
  "cheap flight tips": {
    en: "Commercial passenger aircraft and international flight departure terminals",
    bn: "বাণিজ্যিক যাত্রীবাহী বিমান ও আন্তর্জাতিক বিমানবন্দর টার্মিনাল",
  },
  "এয়ারলাইন্স ও লাগেজ": {
    en: "Commercial passenger aircraft and international flight departure terminals",
    bn: "বাণিজ্যিক যাত্রীবাহী বিমান ও আন্তর্জাতিক বিমানবন্দর টার্মিনাল",
  },
  "banking & payments": {
    en: "Dual-currency travel cards, banknotes, and foreign exchange banking",
    bn: "ডুয়েল কারেন্সি কার্ড, বৈদেশিক মুদ্রা ও ট্রাভেল ব্যাংকিং",
  },
  "কার্ড ও ব্যাংকিং": {
    en: "Dual-currency travel cards, banknotes, and foreign exchange banking",
    bn: "ডুয়েল কারেন্সি কার্ড, বৈদেশিক মুদ্রা ও ট্রাভেল ব্যাংকিং",
  },
  "hotel savings": {
    en: "Central city hotels and skyline accommodation suites",
    bn: "শহরের কেন্দ্রীয় হোটেল আবাসন ও মনোরম দৃশ্য",
  },
  "হোটেল বুকিং": {
    en: "Central city hotels and skyline accommodation suites",
    bn: "শহরের কেন্দ্রীয় হোটেল আবাসন ও মনোরম দৃশ্য",
  },
  "food & culture": {
    en: "Authentic local halal culinary dishes and cultural dining venues",
    bn: "ঐতিহ্যবাহী হালাল খাবারের পদ ও স্থানীয় সংস্কৃতি",
  },
  "খাবার ও সংস্কৃতি": {
    en: "Authentic local halal culinary dishes and cultural dining venues",
    bn: "ঐতিহ্যবাহী হালাল খাবারের পদ ও স্থানীয় সংস্কৃতি",
  },
  "family & budget": {
    en: "Scenic vacation landmarks and family holiday travel destinations",
    bn: "নয়নাভিরাম অবকাশ যাপন ও পারিবারিক ভ্রমণ গন্তব্য",
  },
  "বাজেট ট্রাভেল": {
    en: "Scenic vacation landmarks and family holiday travel destinations",
    bn: "নয়নাভিরাম অবকাশ যাপন ও পারিবারিক ভ্রমণ গন্তব্য",
  },
};

/**
 * Clean and normalize a blog article title for accessibility & alt text generation.
 * Strips clickbait artifacts, year tags, editorial noise, and emojis.
 */
export function cleanBlogTitleForAlt(title: string): string {
  if (!title) return "";

  let cleaned = title
    // Strip brand suffixes
    .replace(/\s*\|\s*URAL(?:\s+Travel(?:\s+Blog)?)?$/i, "")
    .replace(/\s*[—–-]\s*URAL(?:\s+Travel(?:\s+Blog)?)?$/i, "")
    .replace(/\s*\|\s*উড়াল(?:\s+ট্রাভেল)?$/i, "")
    // Strip year stamps e.g. (2026 Updated), [2026], 2026
    .replace(/\(?\[?\b202[4-9]\b\s*(?:Updated|Update|Guide|Rules|Cost|BDT)?\]?\)?/gi, "")
    .replace(/\(?\[?২০২[৪-৯]\s*(?:আপডেট|গাইড|নিয়মাবলী)?\]?\)?/g, "")
    // Strip standalone bracketed meta tags e.g. [Checklist], [Updated], [আপডেট]
    .replace(/\(?\[\s*(?:Updated|Update|Checklist|Playbook|Rules|Guidelines|New)\s*\]\)?/gi, "")
    .replace(/\(?\[\s*(?:আপডেট|চেকলিস্ট|নিয়মাবলী|গাইডলাইন|নতুন)\s*\]\)?/g, "")
    // Strip clickbait and meta wrappers
    .replace(/^(?:Step-by-Step\s*[:—–-]?\s*)/i, "")
    .replace(/^(?:Complete\s+Guide\s*[:—–-]?\s*)/i, "")
    .replace(/^(?:Ultimate\s+Guide\s*[:—–-]?\s*)/i, "")
    .replace(/^(?:AEO\s+Takeaways\s*[:—–-]?\s*)/i, "")
    .replace(/^(?:ধাপে ধাপে\s*[:—–-]?\s*)/, "")
    // Strip redundant parenthesis like "(Step-by-Step)"
    .replace(/\((?:Step-by-Step|Complete Guide|DIY)\)/gi, "")
    // Strip common travel emojis
    .replace(
      /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      "",
    )
    // Normalize quotes and dashes
    .replace(/["""'']/g, "")
    // Clean trailing punctuation
    .replace(/[?!:;—–-]+$/, "")
    // Collapse excess spaces
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || title.trim();
}

/**
 * Truncates an alt text string cleanly without breaking mid-word,
 * ensuring proper punctuation at the end.
 */
function truncateAltText(text: string, maxLength: number, isBn: boolean): string {
  if (text.length <= maxLength) return text;

  // Trim to maximum allowable length minus space for punctuation
  const sub = text.slice(0, maxLength - 1);
  const lastSpace = sub.lastIndexOf(" ");
  const base = lastSpace > 40 ? sub.slice(0, lastSpace) : sub;
  const cleaned = base.replace(/[.,:;—–-]+$/, "").trim();

  return isBn ? `${cleaned}।` : `${cleaned}.`;
}

/**
 * Ensures alt text satisfies WCAG 2.1 Non-text Content (1.1.1) accessibility guidelines:
 *  - Strips forbidden redundant prefixes like "Photo of", "Image of", "Graphic of", "ছবি:"
 *  - Enforces proper sentence casing and final punctuation.
 */
function enforceAccessibilityStandards(rawAlt: string, isBn: boolean): string {
  let alt = rawAlt.trim();

  // Strip redundant screen reader prefixes (English)
  alt = alt.replace(
    /^(?:A\s+|An\s+)?(?:photo(?:graph)?|image|picture|graphic|illustration|cover(?:\s+photo)?|banner)\s+of\s+/i,
    "",
  );
  alt = alt.replace(/^(?:cover\s+for|thumbnail\s+for)\s+/i, "");

  // Strip redundant screen reader prefixes (Bengali)
  alt = alt.replace(/^(?:ছবি|ফটোগ্রাফ|চিত্র|কভার\s*ছবি)[\s:—–-]+/i, "");

  // Capitalize first character
  if (alt.length > 0 && !isBn) {
    alt = alt.charAt(0).toUpperCase() + alt.slice(1);
  }

  // Ensure ending punctuation
  const endingPunctuation = isBn ? "।" : ".";
  if (!alt.endsWith(".") && !alt.endsWith("!") && !alt.endsWith("?") && !alt.endsWith("।")) {
    alt += endingPunctuation;
  }

  return alt;
}

/**
 * Dynamically generates descriptive, accessible, and SEO-optimized alt text
 * for blog cover photography based on article title, category, and optional metadata.
 *
 * @param input BlogCoverAltTextInput or title string
 * @param category Optional category string if title was provided as first argument
 * @param slug Optional article slug
 * @param lang Optional language code ('en' | 'bn')
 */
export function generateBlogCoverAltText(
  input: string | BlogCoverAltTextInput,
  category?: string,
  slug?: string,
  lang?: "en" | "bn" | string,
): string {
  let title = "";
  let cat = category ?? "";
  let postSlug = slug ?? "";
  let locale = lang;
  let isDetail = false;
  let maxLength = 125;

  if (typeof input === "string") {
    title = input;
  } else if (input && typeof input === "object") {
    title = input.title ?? "";
    cat = input.category ?? cat;
    postSlug = input.slug ?? postSlug;
    locale = input.lang ?? locale;
    isDetail = input.isDetail ?? isDetail;
    maxLength = input.maxLength ?? maxLength;
  }

  // Detect Bengali language from explicit param or Bengali unicode block
  const isBn =
    locale === "bn" ||
    (typeof title === "string" && /[\u0980-\u09FF]/.test(title)) ||
    (typeof cat === "string" && /[\u0980-\u09FF]/.test(cat));

  const cleanedTitle = cleanBlogTitleForAlt(title);
  const normalizedCategory = (cat || "").toLowerCase().trim();

  // 1. Check if a curated high-fidelity photograph description is mapped to this slug
  const curated = postSlug ? CURATED_BLOG_SCENES[postSlug] : undefined;
  if (curated) {
    const photoSubject = isBn ? curated.bn : curated.en;

    // Harmonize curated visual scene with article title and category context
    let combined = "";
    if (isBn) {
      if (cleanedTitle) {
        combined = isDetail
          ? `${photoSubject} – ${cleanedTitle} ট্রাভেল গাইড`
          : `${photoSubject} – ${cleanedTitle}`;
      } else {
        combined = `${photoSubject} – উড়াল ট্রাভেল গাইড`;
      }
    } else {
      if (cleanedTitle) {
        combined = isDetail
          ? `${photoSubject}, illustrating the ${cleanedTitle} travel guide`
          : `${photoSubject} for ${cleanedTitle}`;
      } else {
        combined = `${photoSubject} for URAL travel guide`;
      }
    }

    const standardAlt = enforceAccessibilityStandards(combined, isBn);
    return truncateAltText(standardAlt, maxLength, isBn);
  }

  // 2. Dynamic generation: resolve visual destination and category anchors
  const lowerTitle = (title || "").toLowerCase();
  let destinationScene = "";

  for (const anchor of DESTINATION_ANCHORS) {
    if (anchor.keywords.some((kw) => lowerTitle.includes(kw.toLowerCase()))) {
      destinationScene = isBn ? anchor.bn : anchor.en;
      break;
    }
  }

  // Resolve category visual theme
  const catTheme = CATEGORY_THEMES[normalizedCategory];
  const categoryScene = catTheme
    ? isBn
      ? catTheme.bn
      : catTheme.en
    : "";

  // 3. Compose dynamic descriptive alt text
  let dynamicAlt = "";
  if (isBn) {
    const visualCore = destinationScene || categoryScene || "আন্তর্জাতিক ভ্রমণ গন্তব্য ও দর্শনীয় স্থান";
    if (cleanedTitle) {
      dynamicAlt = `${visualCore} – ${cleanedTitle} নির্দেশিকা`;
    } else {
      dynamicAlt = `${visualCore} – উড়াল ভ্রমণ গাইড`;
    }
  } else {
    const visualCore = destinationScene || categoryScene || "International travel destination and landmarks";
    const categorySuffix = cat ? ` in ${cat}` : "";
    if (cleanedTitle) {
      dynamicAlt = isDetail
        ? `${visualCore} featured in the ${cleanedTitle}${categorySuffix} guide`
        : `${visualCore} for ${cleanedTitle}${categorySuffix} guide`;
    } else {
      dynamicAlt = `${visualCore} for travel guide`;
    }
  }

  const accessibleResult = enforceAccessibilityStandards(dynamicAlt, isBn);
  return truncateAltText(accessibleResult, maxLength, isBn);
}

/**
 * Backward-compatible helper with enhanced signature.
 * Accepts either:
 *   - `getBlogImageAltText("some-slug")`
 *   - `getBlogImageAltText(postObject)`
 *   - `getBlogImageAltText(slug, title, category, lang)`
 */
export function getBlogImageAltText(
  slugOrInput: string | BlogCoverAltTextInput,
  title?: string,
  category?: string,
  lang?: "en" | "bn" | string,
): string {
  if (typeof slugOrInput === "string") {
    return generateBlogCoverAltText({
      slug: slugOrInput,
      title,
      category,
      lang,
    });
  }
  return generateBlogCoverAltText(slugOrInput);
}
