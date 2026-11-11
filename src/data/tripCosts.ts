import type { CostCategory, TripCostData } from "../types";

type Pair = { en: string; bn: string };
type GuideConfig = {
  id: string; country: string; countryBn: string; days: number; currency: string; currencyName: string;
  answer: Pair; hotel: Pair; transport: Pair; tickets: Pair; season: Pair; tips: Pair[];
  faq1QuestionBn?: string;
  references: TripCostData["references"];
};
const text = (en: string, bn: string): Pair => ({ en, bn });
const source = (name: string, nameBn: string, url: string) => ({ name, nameBn, url });

/** Planning guidance, not a price database. No retained preset has supplier-price provenance. */
const guides: GuideConfig[] = [
  {
    id: "nepal-costs", country: "Nepal", countryBn: "নেপাল", days: 5, currency: "NPR", currencyName: "Nepali rupee",
    answer: text("Build your Nepal budget from return-flight quotes, each hotel stay, Kathmandu–Pokhara transport and the places you plan to visit. Keep room-nights separate from daily spending. Use quotes for your dates and passport category, then total them in the Trip Cost Estimator.", "নেপাল ভ্রমণ খরচ: ৫ দিনের জনপ্রতি ৪০,০০০–৫৪,০০০ টাকা (জুন ২০২৬ হিসাবে): রাউন্ডট্রিপ ফ্লাইট, হোটেল, কাঠমান্ডু–পোখারা যাতায়াত ও দৈনিক খরচ। নিজের তারিখ ও পাসপোর্টের জন্য কোটেশন নিয়ে ট্রিপ কস্ট এস্টিমেটরে যোগ করুন।"),
    faq1QuestionBn: "নেপাল ভ্রমণ খরচ কীভাবে হিসাব করব?",
    hotel: text("Quote Kathmandu and Pokhara separately, with all rooms, occupied nights, breakfast and taxes.", "কাঠমান্ডু ও পোখারার হোটেল আলাদা করে কোট নিন; সব রুম, রাত, breakfast ও কর মিলিয়ে দেখুন।"),
    transport: text("Compare the operator’s bus, car or flight quote for your route. Include station/airport transfers and luggage.", "নিজের রুটে operator-এর bus, car বা flight quote তুলনা করুন। স্টেশন/বিমানবন্দর ট্রান্সফার ও ব্যাগেজ রাখুন।"),
    tickets: text("Ask each heritage site or permit office which passport and age category applies. Keep guides and trekking permits separate.", "প্রতিটি heritage site বা permit office-এ পাসপোর্ট ও বয়সভিত্তিক category জেনে নিন। Guide ও trekking permit আলাদা রাখুন।"),
    season: text("Compare your exact dates with nearby alternatives. Check road and weather conditions before fixing a Kathmandu–Pokhara transfer; a cheaper room cannot establish a cheaper complete trip.", "নিজের তারিখের সঙ্গে কাছাকাছি অন্য তারিখ তুলনা করুন। কাঠমান্ডু–পোখারা যাত্রা ঠিক করার আগে রাস্তা ও আবহাওয়া দেখুন; শুধু কম রুমভাড়া দিয়ে পুরো ট্রিপের সাশ্রয় বোঝা যায় না।"),
    tips: [text("Confirm any SAARC concession with the responsible visa or ticket authority and carry the required proof.", "ভিসা বা টিকিট কর্তৃপক্ষের কাছে SAARC সুবিধার শর্ত জেনে প্রয়োজনীয় প্রমাণ সঙ্গে রাখুন।"), text("Compare complete return journeys, including the cost of reaching the departure point.", "যাত্রার শুরুর জায়গায় পৌঁছানোর খরচসহ যাওয়া-আসার পুরো হিসাব তুলনা করুন।"), text("Keep a separate allowance for activities or extra nights added after arrival.", "পৌঁছানোর পরে যোগ হওয়া activities বা অতিরিক্ত রাতের জন্য আলাদা বরাদ্দ রাখুন।")],
    references: [source("Nepal Tourism Board", "Nepal Tourism Board — ভ্রমণ পরিকল্পনা", "https://ntb.gov.np/"), source("Nepal Immigration — tourist visa", "নেপাল ইমিগ্রেশন — tourist visa", "https://pokhara.immigration.gov.np/en/page/tourist-visa-2"), source("Nepal Airlines — flight search", "Nepal Airlines — ফ্লাইট সার্চ", "https://www.nepalairlines.com.np/")],
  },
  {
    id: "thailand-costs", country: "Thailand", countryBn: "থাইল্যান্ড", days: 5, currency: "THB", currencyName: "Thai baht",
    answer: text("Build your Thailand budget from dated flight and hotel quotes, meals, transport, attractions and a separate shopping allowance. Visa-related charges are not itemized here: verify the current government e-Visa fee, separate bank/payment charges and optional agency service fees before treating your budget as all-in.", "থাইল্যান্ডের বাজেটে তারিখসহ flight ও hotel quote, খাবার, যাতায়াত, attraction এবং আলাদা shopping বরাদ্দ রাখুন। Visa-related charge এখানে itemized নয়; all-in বাজেট ধরার আগে current government e-Visa fee, bank/payment charge ও optional agency service fee আলাদা করে যাচাই করুন।"),
    hotel: text("Compare the same room type, guests, breakfast, taxes and cancellation terms near the stops in your itinerary.", "আইটিনারারির কাছাকাছি হোটেলে একই room type, যাত্রী, breakfast, কর ও cancellation terms তুলনা করুন।"),
    transport: text("Check BTS/MRT journeys and airport transfers for your route, then compare any taxi or day-trip quote on the same basis.", "নিজের রুটে BTS/MRT ও airport transfer দেখুন; একই ভিত্তিতে taxi বা day-trip quote তুলনা করুন।"),
    tickets: text("Quote attractions by visit date and child age/height. Shopping is a separate allowance, not an attraction-ticket price.", "ভ্রমণের তারিখ ও শিশুর বয়স/উচ্চতা দিয়ে attraction quote নিন। Shopping আলাদা বরাদ্দ; এটি attraction ticket-এর দাম নয়।"),
    season: text("Reprice flights and hotels together when changing dates. Check public holidays, planned events and cancellation terms instead of assuming a season guarantees a discount.", "তারিখ বদলালে flight ও hotel একসঙ্গে আবার কোট করুন। মৌসুম মানেই discount না ধরে public holiday, অনুষ্ঠান ও cancellation terms দেখুন।"),
    tips: [text("Compare the operator’s point-to-point fares with a pass using the journeys you will actually take.", "যে যাত্রাগুলো সত্যিই করবেন, সেগুলোর operator fare যোগ করে pass-এর সঙ্গে তুলনা করুন।"), text("Keep shopping and any possible tax refund outside your essential-trip total until eligibility is confirmed.", "Shopping ও সম্ভাব্য tax refund-এর যোগ্যতা নিশ্চিত না হওয়া পর্যন্ত জরুরি ট্রিপ খরচ থেকে আলাদা রাখুন।"), text("Use the official e-Visa portal for current application requirements and charges.", "বর্তমান আবেদন শর্ত ও charge জানতে official e-Visa portal ব্যবহার করুন।")],
    references: [source("Thailand official e-Visa portal", "থাইল্যান্ডের official e-Visa portal", "https://www.thaievisa.go.th/"), source("BTS Skytrain — tickets and journeys", "BTS Skytrain — টিকিট ও যাত্রা", "https://www.bts.co.th/eng/"), source("Tourism Authority of Thailand", "থাইল্যান্ডের পর্যটন কর্তৃপক্ষ", "https://www.tourismthailand.org/")],
  },
  {
    id: "malaysia-costs", country: "Malaysia", countryBn: "মালয়েশিয়া", days: 5, currency: "MYR", currencyName: "Malaysian ringgit",
    answer: text("For Malaysia, compare your return flights, Kuala Lumpur accommodation, meals and airport/city transport before adding Genting or other day trips. Check each quote’s taxes, occupancy and passenger categories. Add visa, insurance and payment charges separately, then calculate your own total.", "মালয়েশিয়ার জন্য রাউন্ডট্রিপ flight, কুয়ালালামপুরের আবাসন, খাবার ও airport/city transport তুলনা করে Genting বা অন্য day trip যোগ করুন। প্রতিটি quote-এর কর, occupancy ও passenger category দেখুন। Visa, insurance ও payment charge আলাদা যোগ করে নিজের মোট হিসাব করুন।"),
    hotel: text("Compare an apartment’s permitted occupancy and cleaning/deposit terms with hotel rooms for the same party and nights.", "একই দল ও রাতের জন্য apartment-এর অনুমোদিত occupancy, cleaning/deposit terms ও hotel room তুলনা করুন।"),
    transport: text("Check Rapid KL route and fare information. Include airport connections and price any Genting transfer separately.", "Rapid KL-এর route ও fare information দেখুন। Airport connection রাখুন এবং Genting transfer আলাদা কোট করুন।"),
    tickets: text("Separate admission, cable-car and transport inclusions in a day-trip bundle; confirm child eligibility.", "Day-trip bundle-এ admission, cable-car ও transport কোনটি আছে আলাদা করুন; শিশুর শর্ত নিশ্চিত করুন।"),
    season: text("Use the actual holiday and event calendar for your stay. Recheck room availability and day-trip operating schedules before comparing dates.", "নিজের থাকার সময়ের holiday ও event calendar দেখুন। তারিখ তুলনার আগে room availability ও day-trip operating schedule আবার যাচাই করুন।"),
    tips: [text("Check whether a tourist can use a concession before including it in your budget.", "কোনো concession পর্যটকের জন্য প্রযোজ্য কি না জেনে বাজেটে ধরুন।"), text("Ask your bank which card settings and fees apply; keep a suitable payment option for small purchases.", "কার্ডের setting ও fee ব্যাংকে জেনে নিন; ছোট কেনাকাটার জন্য উপযুক্ত payment option রাখুন।"), text("Include the return journey from each day trip, not just the outbound ticket.", "প্রতিটি day trip-এ শুধু যাওয়ার টিকিট নয়, ফেরার খরচও রাখুন।")],
    references: [source("Malaysia official visa portal", "মালয়েশিয়ার official visa portal", "https://malaysiavisa.imi.gov.my/"), source("Rapid KL — transport operator", "Rapid KL — পরিবহন operator", "https://myrapid.com.my/"), source("Tourism Malaysia", "Tourism Malaysia — ভ্রমণ পরিকল্পনা", "https://www.malaysia.travel/")],
  },
  {
    id: "dubai-costs", country: "UAE", countryBn: "দুবাই, সংযুক্ত আরব আমিরাত", days: 5, currency: "AED", currencyName: "UAE dirham",
    answer: text("Build a Dubai budget around your arrival airport, hotel area, metro/taxi journeys and selected attractions. Compare full checkout totals for the same dates and party. Keep visa or service charges, insurance, shopping and a reserve visible as separate costs in your calculation.", "দুবাইয়ের বাজেট সাজান arrival airport, hotel area, metro/taxi যাত্রা ও নির্বাচিত attraction অনুযায়ী। একই তারিখ ও দলের জন্য সম্পূর্ণ checkout total তুলনা করুন। Visa/service charge, insurance, shopping ও reserve হিসাবের আলাদা খরচ হিসেবে রাখুন।"),
    hotel: text("Ask for the final accommodation total including any taxes, local charges and extra beds.", "কর, local charge ও extra bed-সহ আবাসনের চূড়ান্ত মোট নিন।"),
    transport: text("Check RTA journeys and ticket/card terms for your itinerary. Quote airport transfers for the actual airport and hotel.", "নিজের itinerary-র জন্য RTA journey ও ticket/card terms দেখুন। সঠিক airport ও hotel দিয়ে transfer quote নিন।"),
    tickets: text("Compare Burj Khalifa time slots and safari inclusions separately; check child rules and pickup location.", "Burj Khalifa-র time slot ও safari inclusions আলাদা তুলনা করুন; শিশুর শর্ত ও pickup location দেখুন।"),
    season: text("Match travel dates to the activities you want to do. Compare indoor/outdoor plans, event dates and hotel quotes together rather than relying on a fixed seasonal saving.", "যে activities করতে চান তার সঙ্গে travel date মিলিয়ে নিন। স্থির seasonal saving না ধরে indoor/outdoor plan, event date ও hotel quote একসঙ্গে তুলনা করুন।"),
    tips: [text("A cheaper hotel can require more taxi journeys; compare the combined stay-and-transport total.", "কম দামের হোটেলে বেশি taxi journey লাগতে পারে; থাকা ও যাতায়াত একসঙ্গে তুলনা করুন।"), text("Check every inclusion before treating an attraction pass as a saving.", "Attraction pass-এ সাশ্রয় ধরার আগে প্রতিটি inclusion দেখুন।"), text("Ask the issuer about international card activation and the currency charged at checkout.", "International card activation ও checkout-এ কোন currency charge হবে issuer-কে জিজ্ঞেস করুন।")],
    references: [source("Dubai official tourism planning", "দুবাইয়ের official tourism planning", "https://www.visitdubai.com/en/"), source("Dubai RTA — public transport", "Dubai RTA — গণপরিবহন", "https://www.rta.ae/"), source("UAE ICP — entry services", "UAE ICP — entry services", "https://icp.gov.ae/en/")],
  },
  {
    id: "singapore-costs", country: "Singapore", countryBn: "সিঙ্গাপুর", days: 4, currency: "SGD", currencyName: "Singapore dollar",
    answer: text("For Singapore, price the occupied hotel nights, return flights, meals, MRT/airport journeys and each attraction. Keep visa costs separate from admission tickets. Ask for child-specific quotes and full hotel checkout totals before using the Trip Cost Estimator.", "সিঙ্গাপুরের জন্য হোটেলে থাকার রাত, রাউন্ডট্রিপ flight, খাবার, MRT/airport journey ও প্রতিটি attraction-এর খরচ নিন। Visa cost ও admission ticket আলাদা রাখুন। ট্রিপ কস্ট এস্টিমেটর ব্যবহারের আগে শিশুর আলাদা quote ও hotel checkout-এর পুরো অঙ্ক নিন।"),
    hotel: text("A four-day itinerary may have three hotel nights; use the actual check-in/out dates and allowed room occupancy.", "চার দিনের itinerary-তে তিন রাত হোটেল থাকতে পারে; সঠিক check-in/out date ও অনুমোদিত room occupancy ব্যবহার করুন।"),
    transport: text("Check SimplyGo’s current payment and fare terms, including any foreign-card charges, for your journeys.", "নিজের যাত্রার জন্য SimplyGo-এর বর্তমান payment/fare terms ও foreign-card charge দেখুন।"),
    tickets: text("Quote Sentosa and Gardens by the Bay by attraction, date and age. Visa charges belong in other costs.", "Sentosa ও Gardens by the Bay-তে attraction, date ও age দিয়ে quote নিন। Visa charge অন্যান্য খরচে রাখুন।"),
    season: text("Check event dates and school/public holidays against your hotel quotes. Compare the same cancellation terms when trying alternative dates.", "Hotel quote-এর সঙ্গে event date ও school/public holiday মিলিয়ে নিন। অন্য তারিখ তুলনার সময় একই cancellation terms রাখুন।"),
    tips: [text("Confirm which attraction areas are included in each ticket rather than comparing headline prices.", "Headline price-এর বদলে প্রতিটি ticket-এ কোন attraction area আছে নিশ্চিত করুন।"), text("Plan meals near your actual stops and check current menus and dietary requirements.", "আসল route-এর কাছাকাছি খাবার পরিকল্পনা করুন; বর্তমান menu ও dietary requirement দেখুন।"), text("Use ICA guidance for entry and visa requirements; a trip budget is not proof of eligibility.", "Entry ও visa requirement-এর জন্য ICA guidance ব্যবহার করুন; ট্রিপ বাজেট যোগ্যতার প্রমাণ নয়।")],
    references: [source("Singapore ICA — visa guidelines", "Singapore ICA — visa guidelines", "https://www.ica.gov.sg/information-and-e-services/entry-and-departure/entering-singapore/visa-guidelines"), source("SimplyGo — payment and transport", "SimplyGo — payment ও transport", "https://www.simplygo.com.sg/"), source("Singapore Tourism Board", "সিঙ্গাপুর পর্যটন বোর্ড", "https://www.visitsingapore.com/")],
  },
  {
    id: "maldives-costs", country: "Maldives", countryBn: "মালদ্বীপ", days: 5, currency: "MVR", currencyName: "Maldivian rufiyaa; some quotes use USD",
    answer: text("For the Maldives, compare local-island stays and resorts using the complete stay plus return-transfer quote. Include all occupied nights, taxes, meal-plan terms and activities. Confirm the currency of every quote and how the transfer fits your flight before calculating a total.", "মালদ্বীপে local island ও resort তুলনা করুন সম্পূর্ণ থাকা এবং return transfer-এর quote দিয়ে। সব রাত, কর, meal-plan terms ও activities রাখুন। মোট হিসাবের আগে প্রতিটি quote-এর currency ও flight-এর সঙ্গে transfer-এর সময় মিলিয়ে নিন।"),
    hotel: text("Request an itemized guesthouse or resort quote with taxes, meal plan, room occupancy and all nights.", "Guesthouse বা resort থেকে কর, meal plan, room occupancy ও সব রাতসহ itemized quote নিন।"),
    transport: text("Confirm the exact island and both transfer directions with your accommodation. Check schedules, luggage and missed-connection terms.", "আবাসনের সঙ্গে সঠিক island ও দুই দিকের transfer নিশ্চিত করুন। Schedule, luggage ও missed-connection terms দেখুন।"),
    tickets: text("Confirm what a snorkeling, sandbank or resort-day package includes, its age rules and weather/cancellation terms.", "Snorkeling, sandbank বা resort-day package-এ কী আছে, age rule এবং weather/cancellation terms নিশ্চিত করুন।"),
    season: text("Compare the same island, room and transfer arrangement across dates. Weather-dependent activities and transfer changes can alter the final budget.", "ভিন্ন তারিখে একই island, room ও transfer arrangement তুলনা করুন। আবহাওয়ানির্ভর activity ও transfer বদলালে চূড়ান্ত বাজেট বদলাতে পারে।"),
    tips: [text("Keep mandatory transfers in the comparison even if they are billed separately from the room.", "Room থেকে আলাদা bill হলেও বাধ্যতামূলক transfer তুলনায় রাখুন।"), text("Ask what the meal plan excludes before allocating extra food spending.", "অতিরিক্ত খাবারের বরাদ্দের আগে meal plan-এ কী নেই জেনে নিন।"), text("Confirm current entry rules with Maldives Immigration and tax treatment with the property.", "বর্তমান entry rule Maldives Immigration-এ এবং tax treatment property-র সঙ্গে নিশ্চিত করুন।")],
    references: [source("Maldives Immigration", "মালদ্বীপ ইমিগ্রেশন", "https://www.immigration.gov.mv/"), source("Visit Maldives — official tourism", "Visit Maldives — official tourism", "https://visitmaldives.com/en"), source("Maldives Inland Revenue Authority", "মালদ্বীপের রাজস্ব কর্তৃপক্ষ", "https://www.mira.gov.mv/")],
  },
];

function guide(config: GuideConfig, lang: "en" | "bn"): TripCostData {
  const bn = lang === "bn";
  const category = (name: Pair, basis: Pair, check: Pair): CostCategory => ({ name: name[lang], basis: basis[lang], check: check[lang] });
  const categories = [
    category(text("Return flights, baggage & taxes", "রাউন্ডট্রিপ flight, baggage ও কর"), text("Per adult or whole-party quote", "প্রাপ্তবয়স্ক প্রতি বা পুরো দলের quote"), text("Use the same route, dates and baggage. Obtain separate child/infant prices, or an explicit whole-party total.", "একই route, date ও baggage রাখুন। শিশু/ইনফ্যান্টের আলাদা দাম অথবা পুরো দলের স্পষ্ট মোট নিন।")),
    category(text("Accommodation", "আবাসন"), text("Rooms × occupied nights × tax-inclusive rate", "রুম × থাকার রাত × করসহ রেট"), config.hotel),
    category(text("Meals & drinking water", "খাবার ও পানীয় জল"), text("Daily allowance × days × adults/children", "দৈনিক বরাদ্দ × দিন × প্রাপ্তবয়স্ক/শিশু"), text("Subtract included meals. Add infant or special-diet needs separately if needed.", "অন্তর্ভুক্ত খাবার বাদ দিন। প্রয়োজন হলে infant বা special-diet খরচ আলাদা রাখুন।")),
    category(text("Transport & transfers", "যাতায়াত ও ট্রান্সফার"), text("All journeys; convert to a daily allowance if using the estimator", "সব journey; estimator-এ দিলে দৈনিক গড় বরাদ্দ করুন"), config.transport),
    category(text("Attractions & activities", "Attraction ও activities"), text("Per adult for the trip; children separately", "পুরো ট্রিপে প্রাপ্তবয়স্ক প্রতি; শিশু আলাদা"), config.tickets),
    category(text("Visa, insurance & other costs", "Visa, insurance ও অন্যান্য খরচ"), text("Whole-party total", "পুরো দলের মোট"), text("Itemize official fees, optional services, payment/FX fees, shopping, infant extras and a reserve. Count each cost once.", "Official fee, optional service, payment/FX fee, shopping, infant extras ও reserve আলাদা করুন। প্রতিটি খরচ একবার গুনুন।")),
  ];
  const questionCountry = bn ? config.countryBn : config.country;
  return {
    id: config.id, country: config.country, countryBn: config.countryBn, durationDays: config.days,
    currencyCode: `${config.currency} (${config.currencyName})`, currencyIso: config.currency, categories,
    updatedAt: "2026-11-07", seasonalVariation: config.season[lang], moneyHacks: config.tips.map((tip) => tip[lang]),
    quickAnswer: config.answer[lang], references: config.references,
    keyFacts: [
      { label: bn ? "পরিকল্পনার ভিত্তি" : "Planning basis", value: bn ? "নিজের তারিখ, দল ও supplier quote" : "Your dates, party and supplier quotes" },
      { label: bn ? "স্থানীয় মুদ্রা" : "Local currency", value: config.currency },
      { label: bn ? "আবাসনের একক" : "Accommodation unit", value: bn ? "রুম × প্রকৃত থাকার রাত" : "Rooms × actual occupied nights" },
      { label: bn ? "শিশু ও ইনফ্যান্ট" : "Children and infants", value: bn ? "আলাদা quote ও eligibility check" : "Separate quotes and eligibility checks" },
    ],
    faqs: [
      { question: bn && config.faq1QuestionBn ? config.faq1QuestionBn : bn ? `${questionCountry} ভ্রমণের বাজেট কীভাবে হিসাব করব?` : `How do I calculate a ${questionCountry} trip budget?`, answer: config.answer[lang] },
      { question: bn ? "প্রতিটি কোটেশনের সঙ্গে কী রাখব?" : "What should I keep with each quote?", answer: bn ? "Supplier-এর নাম, quote date/expiry, travel date, যাত্রীর বয়স, room/night, currency, কর, baggage ও cancellation terms রাখুন। নিজের বরাদ্দকে supplier quote থেকে আলাদা চিহ্নিত করুন।" : "Keep the supplier name, quote date/expiry, travel dates, ages, rooms/nights, currency, taxes, baggage and cancellation terms. Identify personal allowances separately from supplier quotes." },
      { question: bn ? "শিশুদের কি প্রাপ্তবয়স্কের সমান খরচ ধরব?" : "Should children be priced as adults?", answer: bn ? "Airline, hotel ও attraction-এর age/occupancy rule অনুযায়ী quote নিন। Estimator-এ শিশুর airfare ও attraction ticket আলাদা; পুরো দলের airfare quote থাকলে সবাই অন্তর্ভুক্ত আছে নিশ্চিত করুন।" : "Use the airline, hotel and attraction’s age/occupancy rules. The estimator separates child airfare and admission quotes; if using a whole-party flight total, confirm that everyone is included." },
    ],
    schemaMarkup: { type: "WebPage", description: config.answer[lang], code: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: bn ? `${questionCountry} ভ্রমণের বাজেট পরিকল্পনা` : `${questionCountry} trip budget planning` }) },
  };
}

export const TRIP_COSTS_DATA: TripCostData[] = guides.map((config) => guide(config, "en"));
export const BENGALI_COSTS_OVERRIDES: Record<string, TripCostData> = Object.fromEntries(guides.map((config) => [config.id, guide(config, "bn")]));
