import type { NavigationRecord, NavigationMenuId, NavigationMembership } from "../utils/navigation";

const paired = (en: string, bn: string) => ({ en, bn });
const member = (menu: NavigationMenuId, group: string, order: number): NavigationMembership => ({ menu, group, order });
const link = (id: string, path: string, en: string, bn: string, memberships: NavigationMembership[] = [], subtitle?: { en: string; bn: string }): NavigationRecord => ({
  id, path, label: paired(en, bn), memberships, publishedLocales: ["en", "bn"], ...(subtitle ? { subtitle } : {}),
});

/** Small display adapter, not a second content store. Built-path validation is mandatory. */
export const NAVIGATION_RECORDS: readonly NavigationRecord[] = [
  link("home", "/", "Home", "হোম"),
  link("about", "/about", "About Us", "আমাদের সম্পর্কে"),
  link("partners", "/partners", "Our Partners", "আমাদের পার্টনার"),
  link("contact", "/contact", "Contact", "যোগাযোগ"),
  link("destinations", "/destinations", "Destinations", "গন্তব্য"),
  link("activities", "/experiences", "Things to Do", "ঘুরে দেখুন"),
  link("flights", "/flights", "Flights", "ফ্লাইট"),
  link("hotels", "/hotels", "Hotels", "হোটেল"),
  link("visas", "/visa", "Visa Guides", "ভিসা গাইড"),
  link("umrah", "/umrah", "Umrah & Hajj", "উমরাহ ও হজ"),
  link("tools", "/tools", "Guides & Tools", "গাইড ও টুলস"),
  link("saudi-planning", "/umrah", "Saudi Arabia — Umrah & Hajj", "সৌদি আরব — উমরাহ ও হজ", [member("destinations", "middle-east", 0)], paired("Makkah, Madinah, Nusuk & BDT costs", "মক্কা, মদিনা, নুসুক ও টাকায় খরচ")),
  link("saudi-entry", "/visa/saudi-arabia-visa", "Saudi Arabia visa guide", "সৌদি আরব ভিসা গাইড", [member("destinations", "middle-east", 1)], paired("Umrah, visit & stopover routes", "উমরাহ, ভিজিট ও স্টপওভার রুট")),
  link("dubai", "/destinations/dubai-guide", "Dubai & Abu Dhabi", "দুবাই ও আবুধাবি", [member("destinations", "middle-east", 2)], paired("United Arab Emirates", "সংযুক্ত আরব আমিরাত")),
  link("london", "/destinations/london-guide", "London", "লন্ডন", [member("destinations", "europe", 0)], paired("United Kingdom", "যুক্তরাজ্য")),
  link("paris", "/destinations/paris-guide", "Paris", "প্যারিস", [member("destinations", "europe", 1)], paired("France", "ফ্রান্স")),
  link("italy", "/destinations/italy-guide", "Italy", "ইতালি", [member("destinations", "europe", 2)], paired("Rome, Milan & Venice", "রোম, মিলান ও ভেনিস")),
  link("nepal", "/destinations/nepal-guide", "Nepal", "নেপাল", [member("destinations", "asia", 0)], paired("Kathmandu & Pokhara", "কাঠমান্ডু ও পোখরা")),
  link("thailand", "/destinations/thailand-guide", "Thailand", "থাইল্যান্ড", [member("destinations", "asia", 1)], paired("Bangkok & Phuket", "ব্যাংকক ও ফুকেট")),
  link("malaysia", "/destinations/malaysia-guide", "Malaysia", "মালয়েশিয়া", [member("destinations", "asia", 2)], paired("Kuala Lumpur & Genting", "কুয়ালালামপুর ও গেন্টিং")),
  link("singapore", "/destinations/singapore-guide", "Singapore", "সিঙ্গাপুর", [member("destinations", "asia", 3)], paired("City travel & Sentosa", "শহর ভ্রমণ ও সেন্টোসা")),
  link("maldives", "/destinations/maldives-guide", "Maldives", "মালদ্বীপ", [member("destinations", "asia", 4)], paired("Local islands & resorts", "লোকাল আইল্যান্ড ও রিসোর্ট")),
  link("pakistan", "/destinations/kashmir-guide", "Pakistan", "পাকিস্তান", [member("destinations", "asia", 5)], paired("Azad Kashmir & Neelum Valley", "আজাদ কাশ্মীর ও নীলম ভ্যালি")),
  link("new-york", "/destinations/new-york-guide", "New York", "নিউইয়র্ক", [member("destinations", "americas", 0)], paired("United States", "যুক্তরাষ্ট্র")),
  link("activities-asia", "/experiences/asia", "Asia & Middle East", "এশিয়া ও মধ্যপ্রাচ্য", [member("activities", "regions", 0)], paired("Tours, attractions & activity options", "ট্যুর, দর্শনীয় স্থান ও অ্যাক্টিভিটি")),
  link("activities-europe", "/experiences/europe", "Europe, UK & USA", "ইউরোপ, যুক্তরাজ্য ও যুক্তরাষ্ট্র", [member("activities", "regions", 1)], paired("City experiences & sightseeing passes", "শহর ভ্রমণ ও সাইটসিয়িং পাস")),
  link("activities-dubai", "/experiences/asia?city=dubai-klook", "Dubai", "দুবাই", [member("activities", "cities", 0)]),
  link("activities-bangkok", "/experiences/asia?city=bangkok-klook", "Bangkok", "ব্যাংকক", [member("activities", "cities", 1)]),
  link("activities-singapore", "/experiences/asia?city=singapore-kl", "Singapore & Kuala Lumpur", "সিঙ্গাপুর ও কুয়ালালামপুর", [member("activities", "cities", 2)]),
  link("activities-london", "/experiences/europe?city=london", "London", "লন্ডন", [member("activities", "cities", 3)]),
  link("activities-paris", "/experiences/europe?city=paris", "Paris", "প্যারিস", [member("activities", "cities", 4)]),
  link("attractions", "/attractions", "Individual attraction guides", "দর্শনীয় স্থানের বিস্তারিত গাইড", [member("activities", "understand", 0)], paired("Read the guide before choosing tickets", "টিকিট বেছে নেওয়ার আগে গাইড পড়ুন")),
  link("destination-guides", "/destinations", "Destination guides", "গন্তব্যের ভ্রমণ গাইড", [member("activities", "understand", 1)], paired("Connect activities with your itinerary", "ভ্রমণসূচির সঙ্গে অ্যাক্টিভিটি মিলিয়ে নিন")),
  ...[
    ["nepal", "Nepal", "নেপাল"], ["thailand", "Thailand", "থাইল্যান্ড"], ["malaysia", "Malaysia", "মালয়েশিয়া"], ["singapore", "Singapore", "সিঙ্গাপুর"], ["maldives", "Maldives", "মালদ্বীপ"],
  ].map(([slug, en, bn], order) => link(`${slug}-visa`, `/visa/${slug}-visa`, en, bn, [member("visas", "asia", order)])),
  link("dubai-visa", "/visa/dubai-visa", "UAE / Dubai", "সংযুক্ত আরব আমিরাত / দুবাই", [member("visas", "middle-east", 0)]),
  link("saudi-visa", "/visa/saudi-arabia-visa", "Saudi Arabia", "সৌদি আরব", [member("visas", "middle-east", 1)], paired("Check the route that fits your eligibility", "আপনার যোগ্যতা অনুযায়ী আবেদনের পথ দেখুন")),
  link("visa-free", "/visa-free-countries", "Visa-free & arrival guidance", "ভিসামুক্ত ও অন-অ্যারাইভাল গাইড", [member("visas", "prepare", 0)], paired("Requirements depend on your passport", "শর্ত আপনার পাসপোর্টের ওপর নির্ভর করে")),
  link("visa-assistance", "/visa-assistance", "Application Assistance", "আবেদনে সহায়তা", [member("visas", "prepare", 1)], paired("Understand optional paid assistance", "ঐচ্ছিক পেইড সহায়তা সম্পর্কে জানুন")),
  link("pre-departure", "/pre-departure", "Pre-departure checklist", "যাত্রার আগের চেকলিস্ট", [member("visas", "prepare", 2), member("tools", "prepare", 1)], paired("Documents & practical preparation", "ডকুমেন্ট ও প্রয়োজনীয় প্রস্তুতি")),
  link("blog", "/blog", "Travel guides", "ভ্রমণ গাইড", [member("tools", "read", 0)], paired("Practical answers from the guide library", "গাইড লাইব্রেরিতে প্রয়োজনীয় উত্তর")),
  link("costs", "/costs", "Trip cost guides", "ভ্রমণ খরচের গাইড", [member("tools", "read", 1)], paired("Understand the costs to plan for", "পরিকল্পনার জন্য খরচের ধরন বুঝুন")),
  link("currency", "/tools/currency-converter", "Currency Converter", "কারেন্সি কনভার্টার", [member("tools", "tools", 0)]),
  link("budget", "/tools/budget-calculator", "Trip Cost Estimator", "ভ্রমণ খরচের হিসাব", [member("tools", "tools", 1)]),
  link("packing", "/tools/packing-checklist", "Packing Checklist", "প্যাকিং চেকলিস্ট", [member("tools", "tools", 2)]),
  link("airports", "/tools/airport-codes", "Airport Codes", "এয়ারপোর্ট কোড", [member("tools", "tools", 3)]),
  link("banking", "/banking", "Banking & travel payments", "ব্যাংকিং ও ভ্রমণের পেমেন্ট", [member("tools", "prepare", 0)]),
  link("resources", "/resources", "Official sources", "সরকারি তথ্যসূত্র", [member("tools", "prepare", 2)]),
  link("glossary", "/glossary", "Travel glossary", "ভ্রমণের শব্দকোষ", [member("tools", "prepare", 3)]),
  link("disruption", "/tools/flight-delay-claim", "Flight disruption check", "ফ্লাইট সমস্যার অধিকার যাচাই", [member("tools", "prepare", 4)]),
  // Published EN/BN departure doorway. Appended so the approved prepare order is untouched.
  link("bangladesh-hub", "/bangladesh", "Start from Bangladesh", "বাংলাদেশ থেকে শুরু করুন", [member("tools", "prepare", 5)], paired("Dhaka routes, passport guides & BDT planning", "ঢাকা রুট, পাসপোর্ট গাইড ও টাকার হিসাব")),
];

export const NAVIGATION_LAYOUT = {
  utility: ["home", "about", "partners", "contact"],
  primary: ["destinations", "activities", "flights", "hotels", "visas", "umrah", "tools"],
  menus: {
    destinations: { title: paired("Destination guides", "গন্তব্যের ভ্রমণ গাইড"), description: paired("Choose a place. Find the guide for your trip.", "গন্তব্য বেছে নিয়ে ভ্রমণের গাইড দেখুন।"), all: paired("All destinations", "সব গন্তব্য"), groups: [["middle-east", paired("Middle East", "মধ্যপ্রাচ্য")], ["europe", paired("Europe & UK", "ইউরোপ ও যুক্তরাজ্য")], ["asia", paired("Asia", "এশিয়া")], ["americas", paired("Americas", "আমেরিকা")]] },
    activities: { title: paired("Things to do on your trip", "ভ্রমণে কী কী করবেন"), description: paired("Activities, city experiences and individual attraction guides.", "অ্যাক্টিভিটি, শহর ভ্রমণ ও দর্শনীয় স্থানের গাইড।"), all: paired("All activities & passes", "সব অ্যাক্টিভিটি ও পাস"), groups: [["regions", paired("Browse by region", "অঞ্চল ধরে দেখুন")], ["cities", paired("City shortcuts", "শহর ধরে দেখুন")], ["understand", paired("Understand before booking", "বুকিংয়ের আগে জেনে নিন")]] },
    visas: { title: paired("Visa rules & application guides", "ভিসার নিয়ম ও আবেদনের গাইড"), description: paired("Check entry requirements before you book.", "বুকিংয়ের আগে প্রবেশের শর্ত যাচাই করুন।"), all: paired("All visa guides", "সব ভিসা গাইড"), groups: [["asia", paired("Asia", "এশিয়া")], ["middle-east", paired("Middle East", "মধ্যপ্রাচ্য")], ["prepare", paired("Prepare & get help", "প্রস্তুতি ও সহায়তা")]] },
    tools: { title: paired("Plan with the right guide or tool", "গাইড ও টুলস দিয়ে পরিকল্পনা করুন"), description: paired("Read, calculate and prepare for your journey.", "পড়ুন, হিসাব করুন ও যাত্রার প্রস্তুতি নিন।"), all: paired("All planning tools", "সব প্ল্যানিং টুলস"), groups: [["read", paired("Read & plan", "পড়ুন ও পরিকল্পনা করুন")], ["tools", paired("Tools", "টুলস")], ["prepare", paired("Prepare & resolve", "প্রস্তুতি ও সমস্যার সমাধান")]] },
  },
} as const;
