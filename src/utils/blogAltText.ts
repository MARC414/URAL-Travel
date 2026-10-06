/**
 * Localized alt text for URAL's editorial blog-cover photos.
 *
 * Alt text should describe the important visual content, not repeat the nearby
 * article heading or add search keywords. Scene descriptions are curated in
 * English and Bengali by slug; a concise destination/category fallback is used
 * for new or unmapped posts.
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
}

/**
 * Curated photographic descriptions of the visual scenes captured in URAL's
 * high-resolution editorial photography (English & Bengali).
 */
export const CURATED_BLOG_SCENES: Readonly<
  Record<string, { en: string; bn: string }>
> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    en: "Pilgrims circle the Kaaba beneath Makkah Clock Tower at dusk",
    bn: "গোধূলিতে মক্কা ক্লক টাওয়ারের নিচে কাবা ঘিরে তাওয়াফ করছেন মুসল্লিরা",
  },
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    en: "A Haramain high-speed train waits at a glass-roofed station in Saudi Arabia",
    bn: "সৌদি আরবের কাচঘেরা স্টেশনে অপেক্ষমাণ হরমাইন হাই-স্পিড ট্রেন",
  },
  "hajj-registration-bangladesh-government-vs-private-package-cost": {
    en: "Rows of white tents fill a broad valley among rocky hills",
    bn: "পাথুরে পাহাড়ের মাঝে বিস্তৃত উপত্যকায় সারি সারি সাদা তাঁবু",
  },
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    en: "Pilgrims walk beneath the giant courtyard umbrellas at the Prophet's Mosque",
    bn: "মসজিদে নববীর বিশাল ছাতার নিচ দিয়ে হেঁটে যাচ্ছেন মুসল্লিরা",
  },
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    en: "A Saudia airliner flies above clouds and coastline at sunset",
    bn: "সূর্যাস্তে মেঘ ও উপকূলের ওপর দিয়ে উড়ে যাচ্ছে সৌদিয়া এয়ারলাইন্সের বিমান",
  },
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    en: "The Green Dome and minarets of the Prophet's Mosque glow at twilight",
    bn: "গোধূলিতে মদিনার মসজিদে নববীর সবুজ গম্বুজ ও মিনারগুলো আলোকিত",
  },
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    en: "Marble arches and courtyard at the Prophet's Mosque in Madinah",
    bn: "মদিনার মসজিদে নববীর মার্বেলের খিলান ও প্রশস্ত প্রাঙ্গণ",
  },
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    en: "Travelers cross a glass-roofed airport terminal beneath a Terminal 1 departures sign",
    bn: "টার্মিনাল ১-এর প্রস্থান নির্দেশিকার নিচে কাচঘেরা বিমানবন্দরে হাঁটছেন যাত্রীরা",
  },
  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    en: "The Kaaba and Makkah Clock Tower glow beneath a crescent moon",
    bn: "চাঁদের নিচে আলোকিত কাবা ও মক্কা ক্লক টাওয়ারের রাতের দৃশ্য",
  },
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    en: "Folded white ihram cloth, prayer beads, and passports on a wooden table",
    bn: "কাঠের টেবিলে রাখা সাদা ইহরামের কাপড়, তসবিহ ও পাসপোর্ট",
  },
  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    en: "Dates, cups, and an ornate Arabic coffee pot arranged on a woven tray",
    bn: "বেতের ট্রেতে সাজানো খেজুর, পেয়ালা ও নকশা করা আরবি কফির পাত্র",
  },
  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    en: "A table crowded with rice, curries, flatbread, dips, and tea",
    bn: "ভাত, নানা তরকারি, রুটি, ডিপ ও চাসহ খাবারে ভরা একটি টেবিল",
  },
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    en: "A white domed mosque with tall minarets stands among palm trees",
    bn: "খেজুরগাছের মাঝে দাঁড়িয়ে থাকা সাদা গম্বুজ ও উঁচু মিনারসমৃদ্ধ মসজিদ",
  },
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    en: "A family walks beside Dubai's waterfront beneath the downtown skyline at dusk",
    bn: "গোধূলিতে দুবাইয়ের ডাউনটাউন স্কাইলাইনের নিচে জলধারের পথ ধরে হাঁটছে একটি পরিবার",
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    en: "White domes of Sheikh Zayed Grand Mosque reflect in the courtyard pool",
    bn: "শেখ জায়েদ গ্র্যান্ড মসজিদের শুভ্র গম্বুজের প্রতিফলন উঠোনের জলাশয়ে",
  },
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": {
    en: "Putra Mosque's pink dome and minaret reflect in Putrajaya Lake at dusk",
    bn: "গোধূলিতে পুত্রজায়া লেকে প্রতিফলিত গোলাপি গম্বুজ ও মিনারসহ পুত্রা মসজিদ",
  },
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    en: "The Louvre's glass pyramid glows in the Paris courtyard at dusk",
    bn: "গোধূলিতে প্যারিসের লুভর প্রাঙ্গণে আলোকিত কাচের পিরামিড",
  },
  "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": {
    en: "A green payment card and passport sit beside prayer beads and Arabic coffee",
    bn: "আরবি কফি ও তসবিহের পাশে রাখা সবুজ পাসপোর্ট ও পেমেন্ট কার্ড",
  },
  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    en: "Foreign banknotes and a wallet beside a laptop showing a spreadsheet",
    bn: "স্প্রেডশিট খোলা ল্যাপটপের পাশে বৈদেশিক মুদ্রার নোট ও মানিব্যাগ",
  },
  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": {
    en: "Passport and boarding passes on a desk beside tea, a camera, and a city view",
    bn: "জানালার বাইরের শহরের দৃশ্যের পাশে টেবিলে পাসপোর্ট, বোর্ডিং পাস, চা ও ক্যামেরা",
  },
  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": {
    en: "A contactless payment terminal beside a wallet, banknotes, and payment cards",
    bn: "মানিব্যাগ, বৈদেশিক মুদ্রার নোট ও কার্ডের পাশে কন্ট্যাক্টলেস পেমেন্ট টার্মিনাল",
  },
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    en: "Wat Arun across the Chao Phraya River as boats pass at sunset",
    bn: "সূর্যাস্তে চাও ফ্রায়া নদীতে নৌকার ওপারে ওয়াট অরুণ",
  },
  "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": {
    en: "The Petronas Twin Towers rise above a park and reflecting pool at night",
    bn: "রাতে পার্ক ও জলাশয়ের ওপরে মাথা তুলে দাঁড়িয়ে পেট্রোনাস টুইন টাওয়ার",
  },
  "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": {
    en: "A green passport and boarding pass on an airplane tray beside snowy Himalayan peaks",
    bn: "বরফঢাকা হিমালয়ের দৃশ্যের পাশে বিমানের ট্রে-টেবিলে রাখা সবুজ পাসপোর্ট ও বোর্ডিং পাস",
  },
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    en: "A green MRT train passes Marina Bay Sands and Supertrees at sunset",
    bn: "সূর্যাস্তে মেরিনা বে স্যান্ডস ও সুপারট্রির পাশ দিয়ে যাচ্ছে সবুজ এমআরটি ট্রেন",
  },
  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": {
    en: "Visitors sit in a bright hospital lobby with a city skyline beyond the windows",
    bn: "জানালার বাইরে নগরদৃশ্যসহ উজ্জ্বল হাসপাতালের লবিতে বসে আছেন রোগী ও দর্শনার্থীরা",
  },
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    en: "A smartphone, passport, boarding pass, and insurance document beside airport windows",
    bn: "বিমানবন্দরের জানালার পাশে টেবিলে স্মার্টফোন, পাসপোর্ট, বোর্ডিং পাস ও ভ্রমণবিমার কাগজপত্র",
  },
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    en: "A blue train crosses Nine Arch Bridge amid the green hills of Ella, Sri Lanka",
    bn: "শ্রীলঙ্কার এলার সবুজ পাহাড়ের মাঝে নাইন আর্চ ব্রিজ পেরিয়ে যাচ্ছে নীল ট্রেন",
  },
  "bangladesh-epassport-application-renewal-64-districts-fee-guide": {
    en: "Passports and application papers beside a fingerprint scanner and eyeglasses",
    bn: "আঙুলের ছাপ নেওয়ার স্ক্যানার ও চশমার পাশে রাখা পাসপোর্ট ও আবেদনপত্র",
  },
  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    en: "A traveler with a suitcase walks beneath an airport departure board, with planes outside",
    bn: "বিমানবন্দরের প্রস্থান বোর্ডের নিচে স্যুটকেস হাতে হাঁটছেন এক যাত্রী, বাইরে দেখা যায় বিমান",
  },
  "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": {
    en: "Passenger jets stand at airport gates on the apron at sunset",
    bn: "সূর্যাস্তে বিমানবন্দরের এপ্রনে গেটের পাশে দাঁড়িয়ে থাকা যাত্রীবাহী বিমান",
  },
  "dual-currency-card-endorsement-bangladesh": {
    en: "A passport, boarding passes, and payment card beside a compass on a stone table",
    bn: "পাথরের টেবিলে কম্পাসের পাশে রাখা পাসপোর্ট, বোর্ডিং পাস ও পেমেন্ট কার্ড",
  },
  "dhaka-airport-outbound-immigration-checklist-noc-go": {
    en: "A passenger jet flies above a sea of clouds in warm golden light",
    bn: "উষ্ণ সোনালি আলোয় মেঘের সমুদ্রের ওপরে উড়ছে একটি যাত্রীবাহী বিমান",
  },
  "nepal-pokhara-itinerary-bangladesh": {
    en: "Boudhanath Stupa with prayer flags stands before snow-covered Himalayan peaks",
    bn: "বরফঢাকা হিমালয়ের সামনে রঙিন প্রার্থনার পতাকায় ঘেরা কাঠমান্ডুর বৌদ্ধনাথ স্তূপ",
  },
  "nepal-vs-thailand-first-trip": {
    en: "Sunrise lights a broad sandy beach as waves roll in and small boats sit offshore",
    bn: "সূর্যোদয়ের আলোয় ঢেউয়ে ভেজা বিস্তৃত বালুকাবেলা, দূরে ছোট ছোট নৌকা",
  },
  "halal-food-guide-bangkok-bangladesh": {
    en: "Wat Arun rises beyond the Chao Phraya River, with boats on the water at sunset",
    bn: "সূর্যাস্তে চাও ফ্রায়া নদীর ওপারে ওয়াট অরুণ, জলে কয়েকটি নৌকা",
  },
  "top-budget-family-destinations-from-dhaka": {
    en: "The Petronas Twin Towers rise over Kuala Lumpur at sunset",
    bn: "সূর্যাস্তে কুয়ালালামপুরের আকাশে মাথা তুলে দাঁড়িয়ে পেট্রোনাস টুইন টাওয়ার",
  },
  "hotel-savings-guide-bangkok-kl-dubai": {
    en: "Dubai's illuminated skyline, including Burj Khalifa, rises beside the waterfront at dusk",
    bn: "গোধূলিতে জলধারের পাশে আলোকিত দুবাইয়ের স্কাইলাইন ও বুর্জ খলিফা",
  },
  "singapore-visa-guide-bangladesh-agents": {
    en: "Marina Bay Sands and Supertrees line Singapore's waterfront at sunset",
    bn: "সূর্যাস্তে সিঙ্গাপুরের জলধারে মেরিনা বে স্যান্ডস ও সুপারট্রি",
  },
  "maldives-budget-trip-bangladesh-maafushi": {
    en: "Overwater villas line a turquoise lagoon beside a palm-covered island",
    bn: "খেজুরগাছে ঘেরা দ্বীপের পাশে ফিরোজা লেগুনে সারি সারি ওভারওয়াটার ভিলা",
  },
  "cheap-flight-booking-hacks-dhaka": {
    en: "Split view of an airport terminal and airplane wing above clouds at sunset",
    bn: "সূর্যাস্তে বিমানবন্দর টার্মিনাল ও মেঘের ওপর দিয়ে যাওয়া বিমানের ডানার পাশাপাশি দৃশ্য",
  },
  "bangladesh-travelers-iata-airport-codes-directory-guide": {
    en: "Passenger jets parked at multiple gates on an international airport apron",
    bn: "আন্তর্জাতিক বিমানবন্দরের টার্মিনালের পাশে বিভিন্ন গেটে দাঁড়িয়ে থাকা যাত্রীবাহী বিমান",
  },
  "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai": {
    en: "A family walks beside Dubai's waterfront beneath the downtown skyline at dusk",
    bn: "গোধূলিতে দুবাইয়ের ডাউনটাউন স্কাইলাইনের নিচে জলধারের পথ ধরে হাঁটছে একটি পরিবার",
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
    bn: "পাসপোর্ট, ভিসা নথিপত্র ও ইমিগ্রেশন কাউন্টার",
  },
  "ভিসা ও ইমিগ্রেশন": {
    en: "Official travel documentation, passports, and immigration counters",
    bn: "পাসপোর্ট, ভিসা নথিপত্র ও ইমিগ্রেশন কাউন্টার",
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
    // Remove complete keycaps first, then emoji bases, flag indicators, skin
    // tones, and tag characters. Strip selectors/joiners too, so no invisible
    // fragments remain after a family emoji or presentation sequence is gone.
    .replace(/[#*0-9]\uFE0F?\u20E3/gu, "")
    .replace(
      /[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}\u{E0020}-\u{E007F}]/gu,
      "",
    )
    .replace(/[\u200D\uFE0E\uFE0F\u20E3]/gu, "")
    // Normalize quotes and dashes
    .replace(/["""'']/g, "")
    // Clean trailing punctuation
    .replace(/[?!:;—–-]+$/, "")
    // Collapse excess spaces
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

/** Normalize a scene description without adding redundant "photo of" wording. */
function normalizeAltText(rawAlt: string, isBn: boolean): string {
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
 * Return a concise scene description without repeating the adjacent article title.
 * Known covers use curated English/Bengali text; metadata is only used to choose
 * a sensible fallback for a new or unmapped post.
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

  if (typeof input === "string") {
    title = input;
  } else if (input && typeof input === "object") {
    title = input.title ?? "";
    cat = input.category ?? cat;
    postSlug = input.slug ?? postSlug;
    locale = input.lang ?? locale;
  }

  const normalizedLocale = typeof locale === "string" ? locale.trim().toLowerCase() : "";
  const usesBengaliScript = /[\u0980-\u09FF]/.test(`${title} ${cat}`);
  const isBn = normalizedLocale.startsWith("bn") ||
    (!normalizedLocale.startsWith("en") && usesBengaliScript);

  const cleanedTitle = cleanBlogTitleForAlt(title).toLowerCase();
  const normalizedCategory = cat.trim().toLowerCase();
  const normalizedSlug = postSlug.trim().toLowerCase();
  const curated = normalizedSlug ? CURATED_BLOG_SCENES[normalizedSlug] : undefined;

  if (curated) {
    return normalizeAltText(isBn ? curated.bn : curated.en, isBn);
  }

  // Infer only a visual subject. Do not append the article title: it is already
  // announced in the nearby heading and was causing long, abruptly truncated alts.
  const searchText = `${cleanedTitle} ${normalizedSlug} ${normalizedCategory}`;
  const destination = DESTINATION_ANCHORS.find(({ keywords }) =>
    keywords.some((keyword) => searchText.includes(keyword.toLowerCase())),
  );
  const categoryTheme = CATEGORY_THEMES[normalizedCategory];
  const fallback = isBn
    ? destination?.bn ?? categoryTheme?.bn ?? "আন্তর্জাতিক ভ্রমণ গন্তব্য ও দর্শনীয় স্থান"
    : destination?.en ?? categoryTheme?.en ?? "International travel destinations and landmarks";

  return normalizeAltText(fallback, isBn);
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
