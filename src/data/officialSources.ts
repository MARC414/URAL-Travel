/**
 * Official sources registry — one categorised list of every official website
 * URAL already cites.
 *
 * Nothing in this file invents a link. The list comes from the three places
 * the site already records its sources, plus the links the owner checked by hand:
 *   - article references        (`references` on each published blog post)
 *   - visa guide official links (`VISA_OFFICIAL_SOURCES`)
 *   - destination guide links   (`DESTINATION_OFFICIAL_SOURCES`)
 *   - owner-supplied links      (`OWNER_SUPPLIED_SOURCES`, each with a checked date)
 *
 * A link is listed only when its host belongs to an organisation named in
 * `OFFICIAL_ORGANISATIONS` below: a government body, an official state portal,
 * an international organisation, or an airline / airport / transport operator's
 * own site. News sites, agencies, booking platforms, blogs and encyclopaedias
 * are never listed. Every other cited host must be named in
 * `NON_OFFICIAL_HOSTS`, so a newly cited website can never slip through
 * unclassified — `npm run test:official-sources` (also run inside
 * `verify:build`) fails until it is placed in one list or the other.
 *
 * One exception is labelled as such: a `community` organisation is a
 * recognised community body, not an official source. Its links appear only when
 * the owner supplies them, and the page shows them apart from the official list.
 *
 * Consumers: the public `/resources` page (React + prerender).
 */
import { getLocalizedBlogs } from "./bengaliContent";
import { DESTINATION_OFFICIAL_SOURCES } from "./destinationOfficialSources";
import { OWNER_SUPPLIED_SOURCES } from "./ownerSuppliedSources";
import { VISA_OFFICIAL_SOURCES } from "./visaOfficialSources";

export type OfficialSourceSector =
  | "visa"
  | "pilgrimage"
  | "aviation"
  | "airlines"
  | "transport"
  | "money"
  | "health"
  | "consumer"
  | "tourism"
  | "government";

export type OfficialSourceCountry =
  | "BD" | "SA" | "AE" | "TH" | "MY" | "SG" | "MV" | "NP" | "IN"
  | "GB" | "EU" | "DE" | "FR" | "IT" | "TR" | "US" | "INTL";

/** Who publishes the website. Shown as the badge on each organisation card. */
export type OfficialSourceKind = "government" | "press" | "international" | "portal" | "operator" | "community";

export const OFFICIAL_SOURCE_KINDS: Readonly<Record<OfficialSourceKind, { en: string; bn: string }>> = {
  government: { en: "Government", bn: "সরকারি" },
  press: { en: "Government news agency", bn: "সরকারি সংবাদ সংস্থা" },
  international: { en: "International body", bn: "আন্তর্জাতিক সংস্থা" },
  portal: { en: "Official portal", bn: "অফিসিয়াল পোর্টাল" },
  operator: { en: "Official operator", bn: "অফিসিয়াল অপারেটর" },
  community: { en: "Community body, not official", bn: "কমিউনিটি সংস্থা, অফিসিয়াল নয়" },
};

/** False only for a community body, which the page lists apart from the official sources. */
export function isOfficialKind(kind: OfficialSourceKind): boolean {
  return kind !== "community";
}

export interface OfficialSourceEntry {
  url: string;
  host: string;
  /** Id of the publishing organisation in `OFFICIAL_ORGANISATIONS`. */
  org: string;
  /** Short page title for the directory (the organisation is shown separately). */
  titleEn: string;
  titleBn: string;
  /** The full citation label exactly as the citing guide words it. */
  nameEn: string;
  nameBn: string;
  /** The citing guide marks this page as a past announcement, kept for the record. */
  historical: boolean;
  sector: OfficialSourceSector;
  country: OfficialSourceCountry;
  /** English paths of the URAL pages that cite this link, in first-seen order. */
  pages: string[];
  /** ISO date the owner last checked the page by hand; absent when never checked by hand. */
  checked?: string;
  /** The link opens a PDF file on the publisher's own site. */
  pdf: boolean;
}

/** Display order and labels. The order is the order of the page sections. */
export const OFFICIAL_SOURCE_SECTORS: readonly {
  id: OfficialSourceSector;
  en: string;
  bn: string;
  /** Lower-case words that signal this sector in a visitor's question. */
  keywords: readonly string[];
}[] = [
  {
    id: "visa",
    en: "Visa, entry and immigration",
    bn: "ভিসা, প্রবেশ ও ইমিগ্রেশন",
    keywords: ["visa", "evisa", "entry", "immigration", "embassy", "passport", "arrival", "ভিসা", "ইমিগ্রেশন", "দূতাবাস", "পাসপোর্ট", "প্রবেশ"],
  },
  {
    id: "pilgrimage",
    en: "Umrah and Hajj authorities",
    bn: "ওমরাহ ও হজ কর্তৃপক্ষ",
    keywords: ["umrah", "omra", "omrah", "umra", "hajj", "haj", "nusuk", "rawdah", "haram", "makkah", "madinah", "ওমরা", "ওমরাহ", "উমরাহ", "উমরা", "হজ", "হজ্জ", "নুসুক", "মক্কা", "মদিনা"],
  },
  {
    id: "aviation",
    en: "Airports and aviation regulators",
    bn: "বিমানবন্দর ও বিমান চলাচল কর্তৃপক্ষ",
    keywords: ["airport", "aviation", "terminal", "baggage", "customs", "বিমানবন্দর", "এয়ারপোর্ট", "টার্মিনাল"],
  },
  {
    id: "airlines",
    en: "Airlines",
    bn: "এয়ারলাইন",
    keywords: ["airline", "airlines", "flight", "flights", "ticket", "baggage", "stopover", "transit", "এয়ারলাইন", "ফ্লাইট", "টিকিট", "ব্যাগেজ", "ট্রানজিট"],
  },
  {
    id: "transport",
    en: "Rail, bus, land ports and city transport",
    bn: "রেল, বাস, স্থলবন্দর ও শহরের পরিবহন",
    keywords: ["train", "rail", "railway", "bus", "metro", "transport", "port", "ট্রেন", "রেল", "বাস", "মেট্রো", "পরিবহন", "স্থলবন্দর"],
  },
  {
    id: "money",
    en: "Banking, foreign exchange and customs",
    bn: "ব্যাংকিং, বৈদেশিক মুদ্রা ও কাস্টমস",
    keywords: ["bank", "banking", "dollar", "endorsement", "forex", "currency", "customs", "duty", "ব্যাংক", "ডলার", "এন্ডোর্সমেন্ট", "মুদ্রা", "কাস্টমস", "শুল্ক"],
  },
  {
    id: "health",
    en: "Health requirements",
    bn: "স্বাস্থ্য-সংক্রান্ত শর্ত",
    keywords: ["health", "vaccine", "vaccination", "medical", "food", "স্বাস্থ্য", "টিকা", "ভ্যাকসিন"],
  },
  {
    id: "consumer",
    en: "Passenger rights and consumer protection",
    bn: "যাত্রী অধিকার ও ভোক্তা সুরক্ষা",
    keywords: ["delay", "cancelled", "compensation", "refund", "rights", "atol", "claim", "বিলম্ব", "ক্ষতিপূরণ", "রিফান্ড", "অধিকার"],
  },
  {
    id: "tourism",
    en: "Official tourism boards",
    bn: "সরকারি পর্যটন বোর্ড",
    keywords: ["tourism", "tourist", "attractions", "visit", "পর্যটন", "ভ্রমণ"],
  },
  {
    id: "government",
    en: "Other government sources",
    bn: "অন্যান্য সরকারি সূত্র",
    keywords: ["government", "notice", "announcement", "weather", "সরকার", "সরকারি", "বিজ্ঞপ্তি", "আবহাওয়া"],
  },
];

/** Country labels plus the names a visitor is likely to type, in both scripts. */
export const OFFICIAL_SOURCE_COUNTRIES: Readonly<
  Record<OfficialSourceCountry, { en: string; bn: string; aliases: readonly string[] }>
> = {
  BD: { en: "Bangladesh", bn: "বাংলাদেশ", aliases: ["bangladesh", "bangladeshi", "dhaka", "biman", "বাংলাদেশ", "বাংলাদেশি", "ঢাকা"] },
  SA: { en: "Saudi Arabia", bn: "সৌদি আরব", aliases: ["saudi", "ksa", "makkah", "mecca", "madinah", "medina", "jeddah", "riyadh", "umrah", "omra", "hajj", "সৌদি", "মক্কা", "মদিনা", "জেদ্দা", "ওমরা", "ওমরাহ", "উমরাহ", "হজ"] },
  AE: { en: "United Arab Emirates", bn: "সংযুক্ত আরব আমিরাত", aliases: ["uae", "dubai", "emirates", "abu", "dhabi", "sharjah", "দুবাই", "আমিরাত", "আবুধাবি", "শারজাহ"] },
  TH: { en: "Thailand", bn: "থাইল্যান্ড", aliases: ["thailand", "thai", "bangkok", "phuket", "থাইল্যান্ড", "ব্যাংকক", "ফুকেট"] },
  MY: { en: "Malaysia", bn: "মালয়েশিয়া", aliases: ["malaysia", "kuala", "lumpur", "মালয়েশিয়া", "কুয়ালালামপুর"] },
  SG: { en: "Singapore", bn: "সিঙ্গাপুর", aliases: ["singapore", "সিঙ্গাপুর"] },
  MV: { en: "Maldives", bn: "মালদ্বীপ", aliases: ["maldives", "male", "maafushi", "মালদ্বীপ", "মালে"] },
  NP: { en: "Nepal", bn: "নেপাল", aliases: ["nepal", "kathmandu", "pokhara", "নেপাল", "কাঠমান্ডু", "পোখারা"] },
  IN: { en: "India", bn: "ভারত", aliases: ["india", "indian", "kolkata", "delhi", "ভারত", "ইন্ডিয়া", "কলকাতা", "দিল্লি"] },
  GB: { en: "United Kingdom", bn: "যুক্তরাজ্য", aliases: ["uk", "britain", "british", "england", "london", "যুক্তরাজ্য", "লন্ডন", "ইংল্যান্ড"] },
  EU: { en: "European Union and Schengen", bn: "ইউরোপীয় ইউনিয়ন ও শেনজেন", aliases: ["schengen", "europe", "european", "eu", "শেনজেন", "ইউরোপ"] },
  DE: { en: "Germany", bn: "জার্মানি", aliases: ["germany", "german", "জার্মানি"] },
  FR: { en: "France", bn: "ফ্রান্স", aliases: ["france", "paris", "ফ্রান্স", "প্যারিস"] },
  IT: { en: "Italy", bn: "ইতালি", aliases: ["italy", "rome", "milan", "venice", "ইতালি", "রোম"] },
  TR: { en: "Türkiye", bn: "তুরস্ক", aliases: ["turkey", "turkiye", "istanbul", "তুরস্ক", "ইস্তাম্বুল"] },
  US: { en: "United States", bn: "যুক্তরাষ্ট্র", aliases: ["usa", "america", "american", "york", "যুক্তরাষ্ট্র", "আমেরিকা"] },
  INTL: { en: "International organisations", bn: "আন্তর্জাতিক সংস্থা", aliases: ["international", "icao", "who", "আন্তর্জাতিক"] },
};

export interface OfficialOrganisation {
  id: string;
  en: string;
  bn: string;
  kind: OfficialSourceKind;
  country: OfficialSourceCountry;
  /** Default section for this organisation's links. */
  sector: OfficialSourceSector;
  /** Host names (without "www.") that belong to this organisation. */
  hosts: readonly string[];
  /** The site publishes several kinds of page; each link is filed by its name. */
  mixed?: true;
}

function org(
  id: string,
  en: string,
  bn: string,
  kind: OfficialSourceKind,
  country: OfficialSourceCountry,
  sector: OfficialSourceSector,
  hosts: readonly string[],
  mixed?: true
): OfficialOrganisation {
  return mixed ? { id, en, bn, kind, country, sector, hosts, mixed } : { id, en, bn, kind, country, sector, hosts };
}

/**
 * Organisations accepted as official. "Official" means the publisher is the
 * body that decides or operates the thing: a government department, a state
 * portal, an international organisation, or the airline / airport / rail or
 * bus operator itself. It does not mean URAL has verified today's page content.
 *
 * The order here is the display order inside each country block.
 */
export const OFFICIAL_ORGANISATIONS: readonly OfficialOrganisation[] = [
  // Bangladesh
  org("bd-mrv", "Bangladesh Online MRV Portal", "বাংলাদেশ অনলাইন MRV পোর্টাল", "government", "BD", "visa", ["visa.gov.bd"]),
  org("bd-special-branch", "Bangladesh Police Special Branch", "বাংলাদেশ পুলিশ স্পেশাল ব্রাঞ্চ", "government", "BD", "visa", ["voa.specialbranch.gov.bd"]),
  org("bd-embassy-kathmandu", "Embassy of Bangladesh in Kathmandu", "কাঠমান্ডুতে বাংলাদেশ দূতাবাস", "government", "BD", "visa", ["kathmandu.mofa.gov.bd"]),
  org("bd-hajj", "Bangladesh Haj Management Portal", "বাংলাদেশ হজ ব্যবস্থাপনা পোর্টাল", "government", "BD", "pilgrimage", ["hajj.gov.bd", "ehaj.hajj.gov.bd"]),
  org("bd-caab", "Civil Aviation Authority of Bangladesh (CAAB)", "বাংলাদেশ বেসামরিক বিমান চলাচল কর্তৃপক্ষ (CAAB)", "government", "BD", "aviation", ["new.caab.gov.bd"]),
  org("bd-hsia", "Hazrat Shahjalal International Airport", "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর", "government", "BD", "aviation", ["hsia.gov.bd"]),
  org("bd-biman", "Biman Bangladesh Airlines", "বিমান বাংলাদেশ এয়ারলাইন্স", "operator", "BD", "airlines", ["biman-airlines.com", "booking.biman-airlines.com"]),
  org("bd-novoair", "NOVOAIR", "NOVOAIR", "operator", "BD", "airlines", ["secure.flynovoair.com"]),
  org("bd-railway", "Bangladesh Railway", "বাংলাদেশ রেলওয়ে", "government", "BD", "transport", ["railway.gov.bd", "eticket.railway.gov.bd"]),
  org("bd-land-port", "Bangladesh Land Port Authority (BLPA)", "বাংলাদেশ স্থলবন্দর কর্তৃপক্ষ (BLPA)", "government", "BD", "transport", ["blpa.gov.bd"]),
  org("bd-green-line", "Green Line Paribahan", "গ্রিনলাইন পরিবহন", "operator", "BD", "transport", ["greenlinebd.com"]),
  org("bd-bank", "Bangladesh Bank", "বাংলাদেশ ব্যাংক", "government", "BD", "money", ["bb.org.bd"]),
  org("bd-nbr", "National Board of Revenue (NBR)", "জাতীয় রাজস্ব বোর্ড (NBR)", "government", "BD", "money", ["nbr.gov.bd"]),
  org("bd-met", "Bangladesh Meteorological Department", "বাংলাদেশ আবহাওয়া অধিদপ্তর", "government", "BD", "government", ["server6.bmd.gov.bd"]),
  org("bd-consulate-dubai", "Consulate General of Bangladesh, Dubai", "বাংলাদেশের দুবাই কনস্যুলেট জেনারেল", "government", "BD", "government", ["bcgdubai.gov.bd"]),
  // Saudi Arabia
  org("sa-evisa", "Saudi eVisa portal (Visit Saudi)", "সৌদি eVisa পোর্টাল (Visit Saudi)", "portal", "SA", "visa", ["visa.visitsaudi.com"]),
  org("sa-ksa-visa", "Saudi Unified Visa Platform (KSA Visa)", "সৌদি ইউনিফায়েড ভিসা প্ল্যাটফর্ম (KSA Visa)", "portal", "SA", "visa", ["ksavisa.sa"]),
  org("sa-tourism-ministry", "Saudi Ministry of Tourism", "সৌদি পর্যটন মন্ত্রণালয়", "government", "SA", "visa", ["cdn.mt.gov.sa"]),
  org("sa-hajj-ministry", "Saudi Ministry of Hajj and Umrah", "সৌদি হজ ও ওমরাহ মন্ত্রণালয়", "government", "SA", "pilgrimage", ["haj.gov.sa"]),
  org("sa-nusuk", "Nusuk (official Saudi pilgrimage platform)", "Nusuk (সৌদি আরবের অফিসিয়াল হজ-ওমরাহ প্ল্যাটফর্ম)", "portal", "SA", "pilgrimage", ["nusuk.sa", "umrah.nusuk.sa", "hajj.nusuk.sa", "services.nusuk.sa"]),
  org("sa-two-mosques", "General Authority for the Care of the Two Holy Mosques", "দুই পবিত্র মসজিদ পরিচর্যা ও ব্যবস্থাপনা কর্তৃপক্ষ", "government", "SA", "pilgrimage", ["alharamain.gov.sa", "eservices.alharamain.gov.sa"]),
  org("sa-religious-presidency", "Presidency of Religious Affairs of the Grand Mosque and the Prophet's Mosque", "মহান মসজিদ ও নবী মসজিদের ধর্মীয় বিষয়ক প্রেসিডেন্সি", "government", "SA", "pilgrimage", ["prh.gov.sa"]),
  org("sa-gaca", "General Authority of Civil Aviation (GACA)", "সৌদি জেনারেল অথরিটি অব সিভিল এভিয়েশন (GACA)", "government", "SA", "aviation", ["gaca.gov.sa"]),
  org("sa-tibah", "Tibah Airports (Madinah airport)", "তিবাহ এয়ারপোর্টস (মদিনা বিমানবন্দর)", "operator", "SA", "aviation", ["tibahairports.com"]),
  org("sa-saudia", "Saudia", "সৌদিয়া (Saudia)", "operator", "SA", "airlines", ["saudia.com"]),
  org("sa-flynas", "flynas", "flynas", "operator", "SA", "airlines", ["flynas.com"]),
  org("sa-railways", "Saudi Arabia Railways (Haramain High-Speed Railway)", "সৌদি আরব রেলওয়ে (Haramain High-Speed Railway)", "operator", "SA", "transport", ["sar.hhr.sa", "sar.com.sa"]),
  org("sa-saptco", "SAPTCO", "সাপটকো (SAPTCO)", "operator", "SA", "transport", ["saptco.com.sa"]),
  org("sa-sat", "SAT (Saudi Arabia Transport)", "স্যাট (সৌদি আরব ট্রান্সপোর্ট)", "operator", "SA", "transport", ["satrans.com.sa"]),
  org("sa-health-ministry", "Saudi Ministry of Health", "সৌদি স্বাস্থ্য মন্ত্রণালয়", "government", "SA", "health", ["moh.gov.sa"]),
  org("sa-sfda", "Saudi Food and Drug Authority", "সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ", "government", "SA", "health", ["sfda.gov.sa"]),
  org("sa-balady", "Balady (Ministry of Municipalities and Housing)", "বালাদি (পৌর ও আবাসন মন্ত্রণালয়)", "government", "SA", "health", ["balady.gov.sa"]),
  org("sa-visit-saudi", "Visit Saudi (official Saudi tourism site)", "Visit Saudi (সৌদি আরবের অফিসিয়াল পর্যটন সাইট)", "portal", "SA", "tourism", ["visitsaudi.com"], true),
  org("sa-umm-al-qura", "Umm al-Qura Calendar", "উম্মুল কুরা ক্যালেন্ডার", "portal", "SA", "government", ["ummulqura.org.sa"]),
  org("sa-press-agency", "Saudi Press Agency (SPA)", "সৌদি প্রেস এজেন্সি (SPA)", "press", "SA", "government", ["spa.gov.sa"]),
  // United Arab Emirates
  org("ae-government", "UAE Government Portal (u.ae)", "সংযুক্ত আরব আমিরাতের সরকারি পোর্টাল (u.ae)", "government", "AE", "visa", ["u.ae"]),
  org("ae-emirates", "Emirates", "Emirates", "operator", "AE", "airlines", ["emirates.com"]),
  org("ae-air-arabia", "Air Arabia", "Air Arabia", "operator", "AE", "airlines", ["airarabia.com"]),
  org("ae-rta", "Dubai Roads and Transport Authority (RTA)", "দুবাই রোডস অ্যান্ড ট্রান্সপোর্ট অথরিটি (RTA)", "government", "AE", "transport", ["rta.ae"]),
  // Thailand
  org("th-evisa", "Thailand e-Visa (official portal)", "থাইল্যান্ড e-Visa (অফিসিয়াল পোর্টাল)", "government", "TH", "visa", ["thaievisa.go.th"]),
  org("th-embassy-dhaka", "Royal Thai Embassy, Dhaka", "রয়্যাল থাই এমব্যাসি, ঢাকা", "government", "TH", "visa", ["dhaka.thaiembassy.org"]),
  org("th-bts", "BTS Skytrain (Bangkok)", "BTS স্কাইট্রেন (ব্যাংকক)", "operator", "TH", "transport", ["bts.co.th"]),
  // Malaysia
  org("my-immigration", "Immigration Department of Malaysia", "মালয়েশিয়া ইমিগ্রেশন বিভাগ", "government", "MY", "visa", ["malaysiavisa.imi.gov.my", "imi.gov.my"]),
  org("my-rapid-kl", "Rapid KL", "র‍্যাপিড কেএল (Rapid KL)", "operator", "MY", "transport", ["myrapid.com.my"]),
  // Singapore
  org("sg-ica", "Singapore Immigration & Checkpoints Authority (ICA)", "সিঙ্গাপুর ইমিগ্রেশন অ্যান্ড চেকপয়েন্টস অথরিটি (ICA)", "government", "SG", "visa", ["ica.gov.sg", "eservices.ica.gov.sg"]),
  org("sg-lta", "Singapore Land Transport Authority (LTA)", "সিঙ্গাপুর ল্যান্ড ট্রান্সপোর্ট অথরিটি (LTA)", "government", "SG", "transport", ["lta.gov.sg"]),
  // Maldives
  org("mv-immigration", "Maldives Immigration", "মালদ্বীপ ইমিগ্রেশন", "government", "MV", "visa", ["immigration.gov.mv", "imuga.immigration.gov.mv"]),
  org("mv-visit-maldives", "Visit Maldives (official tourism site)", "Visit Maldives (অফিসিয়াল পর্যটন সাইট)", "portal", "MV", "tourism", ["visitmaldives.com"]),
  // Nepal
  org("np-immigration", "Nepal Department of Immigration", "নেপাল ইমিগ্রেশন বিভাগ", "government", "NP", "visa", ["immigration.gov.np", "nepaliport.immigration.gov.np", "pokhara.immigration.gov.np"]),
  org("np-tourism-board", "Nepal Tourism Board", "নেপাল ট্যুরিজম বোর্ড", "government", "NP", "tourism", ["ntb.gov.np"]),
  // India
  org("in-high-commission", "High Commission of India, Dhaka", "ভারতীয় হাইকমিশন, ঢাকা", "government", "IN", "visa", ["hcidhaka.gov.in"]),
  org("in-visa-portal", "Government of India online visa portal", "ভারত সরকারের অনলাইন ভিসা পোর্টাল", "government", "IN", "visa", ["indianvisa-bangladesh.nic.in"]),
  org("in-ivac", "Indian Visa Application Centre (IVAC) Bangladesh", "ইন্ডিয়ান ভিসা অ্যাপ্লিকেশন সেন্টার (IVAC) বাংলাদেশ", "portal", "IN", "visa", ["ivacbd.com"]),
  org("in-railways", "Indian Railways", "ভারতীয় রেলওয়ে", "government", "IN", "transport", ["indianrailways.gov.in"]),
  org("in-land-ports", "Land Ports Authority of India (LPAI)", "ল্যান্ড পোর্টস অথরিটি অব ইন্ডিয়া (LPAI)", "government", "IN", "transport", ["lpai.gov.in"]),
  // United Kingdom
  org("gb-gov-uk", "GOV.UK (UK Government)", "GOV.UK (যুক্তরাজ্য সরকার)", "government", "GB", "government", ["gov.uk", "assets.publishing.service.gov.uk"], true),
  org("gb-caa", "UK Civil Aviation Authority (CAA)", "যুক্তরাজ্য সিভিল এভিয়েশন অথরিটি (CAA)", "government", "GB", "consumer", ["caa.co.uk"]),
  org("gb-atol", "ATOL (UK package-holiday protection scheme)", "এটিওএল (যুক্তরাজ্যের প্যাকেজ-হলিডে সুরক্ষা স্কিম)", "portal", "GB", "consumer", ["atol.org"]),
  org("gb-legislation", "UK Legislation (legislation.gov.uk)", "যুক্তরাজ্যের আইন (legislation.gov.uk)", "government", "GB", "consumer", ["legislation.gov.uk"]),
  org("gb-travelhealthpro", "TravelHealthPro (UK National Travel Health Network and Centre)", "TravelHealthPro (যুক্তরাজ্যের ন্যাশনাল ট্রাভেল হেলথ নেটওয়ার্ক অ্যান্ড সেন্টার)", "government", "GB", "health", ["travelhealthpro.org.uk"]),
  org("gb-city-police", "City of London Police (UK national lead force for fraud)", "সিটি অব লন্ডন পুলিশ (যুক্তরাজ্যে প্রতারণা তদন্তের জাতীয় প্রধান বাহিনী)", "government", "GB", "consumer", ["cityoflondon.police.uk"]),
  org("gb-british-airways", "British Airways", "ব্রিটিশ এয়ারওয়েজ", "operator", "GB", "airlines", ["britishairways.com"]),
  org("gb-tfl", "Transport for London (TfL)", "Transport for London (TfL)", "government", "GB", "transport", ["tfl.gov.uk"]),
  org("gb-cbh", "Council of British Hajjis (CBHUK)", "কাউন্সিল অব ব্রিটিশ হাজিস (CBHUK)", "community", "GB", "pilgrimage", ["cbhuk.org"]),
  // European Union and member states
  org("eu-commission", "European Commission", "ইউরোপীয় কমিশন", "international", "EU", "visa", ["home-affairs.ec.europa.eu"]),
  org("eu-eur-lex", "EUR-Lex (European Union law)", "EUR-Lex (ইউরোপীয় ইউনিয়নের আইন)", "international", "EU", "consumer", ["eur-lex.europa.eu"], true),
  org("eu-your-europe", "Your Europe (European Union)", "Your Europe (ইউরোপীয় ইউনিয়ন)", "international", "EU", "consumer", ["europa.eu"]),
  org("de-embassy-dhaka", "Embassy of Germany, Dhaka", "জার্মান দূতাবাস, ঢাকা", "government", "DE", "visa", ["dhaka.diplo.de"]),
  org("fr-ratp", "RATP (Paris public transport)", "RATP (প্যারিস গণপরিবহন)", "operator", "FR", "transport", ["ratp.fr"]),
  org("it-trenitalia", "Trenitalia", "Trenitalia", "operator", "IT", "transport", ["trenitalia.com"]),
  // Türkiye
  org("tr-gazette", "Official Gazette of the Republic of Türkiye", "তুরস্কের সরকারি গেজেট", "government", "TR", "consumer", ["resmigazete.gov.tr"]),
  org("tr-shgm", "Directorate General of Civil Aviation, Türkiye (SHGM)", "তুরস্ক বেসামরিক বিমান চলাচল মহাপরিচালক (SHGM)", "government", "TR", "consumer", ["web.shgm.gov.tr"]),
  // United States
  org("us-state", "U.S. Department of State", "যুক্তরাষ্ট্রের পররাষ্ট্র দপ্তর", "government", "US", "visa", ["travel.state.gov"]),
  org("us-trade", "U.S. International Trade Administration", "মার্কিন আন্তর্জাতিক বাণিজ্য প্রশাসন", "government", "US", "money", ["trade.gov"]),
  org("us-mta", "MTA (New York)", "MTA (নিউ ইয়র্ক)", "operator", "US", "transport", ["new.mta.info"]),
  // International organisations
  org("intl-icao", "International Civil Aviation Organization (ICAO)", "আন্তর্জাতিক বেসামরিক বিমান চলাচল সংস্থা (ICAO)", "international", "INTL", "aviation", ["icao.int"]),
  org("intl-who", "World Health Organization (WHO)", "বিশ্ব স্বাস্থ্য সংস্থা (WHO)", "international", "INTL", "health", ["who.int"]),
];

/** host -> organisation. Built once; a host may belong to one organisation only. */
export const OFFICIAL_HOSTS: Readonly<Record<string, OfficialOrganisation>> = (() => {
  const hosts: Record<string, OfficialOrganisation> = {};
  for (const organisation of OFFICIAL_ORGANISATIONS) {
    for (const host of organisation.hosts) {
      if (hosts[host]) throw new Error(`[officialSources] ${host} is listed under two organisations`);
      hosts[host] = organisation;
    }
  }
  return hosts;
})();

/**
 * Cited hosts that are deliberately NOT listed as official: news reporting,
 * private companies and agencies, booking platforms, encyclopaedias, religious
 * reference sites, and publishers whose pages are unrelated to planning a trip.
 * They remain valid article references; they are simply not "official sources".
 */
export const NON_OFFICIAL_HOSTS: readonly string[] = [
  // news and trade press (a state-owned news agency reporting a rule is still a news report)
  "bangladeshmonitor.com.bd", "bdnews24.com", "bssnews.net", "dhakatribune.com", "tbsnews.net",
  "thedailystar.net", "tob.news", "viewsbangladesh.com", "saudigazette.com.sa",
  // private companies, agencies, platforms and listed commercial providers
  "airalo.com", "airhelp.com", "albaik.com", "bindawood.sa", "bindawoodholding.com",
  "blog.wego.com", "booking.com", "csmadinah.com", "deltalife.org", "ebl.com.bd",
  "green-delta.com", "hilton.com", "hiradistrict.com", "kayak.co.uk", "loveumrah.com",
  "packageumrah.co.uk", "reserval.com", "roaming.grameenphone.com", "siblbd.com",
  "webook.com", "yesim.app", "ziyarago.com", "thefabryk.com", "toptravelsights.com",
  // encyclopaedias and app-store listings
  "en.wikipedia.org", "saudipedia.com", "play.google.com",
  // private prayer-time and calendar sites
  "assabile.com",
  // religious reference and fatwa sites
  "aliftaa.jo", "binbaz.org.sa", "dar-alifta.org", "islamqa.info", "sunnah.com",
  // charities (useful reading, not an official source)
  "islamic-relief.org.uk",
  // official or corporate, but not about planning a trip
  "developers.google.com", "ftc.gov", "support.apple.com", "support.travelpayouts.com",
];

export function officialSourceHost(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Same page, same key: protocol, "www.", fragment, trailing slash and letter case are ignored. */
export function officialSourceUrlKey(url: string): string {
  return url
    .trim()
    .replace(/#.*$/, "")
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/\/+$/, "")
    .toLowerCase()
    // "/en" is the same site's English home page, not a different resource.
    .replace(/^([^/?]+)\/en$/, "$1");
}

function refineSector(base: OfficialOrganisation, name: string): OfficialSourceSector {
  if (!base.mixed) return base.sector;
  if (/pilgrim|hajj|umrah/i.test(name)) return "pilgrimage";
  if (/visa|entry requirement|immigration|passport|border/i.test(name)) return "visa";
  if (/passenger rights|261\/2004|uk261|compensation|package travel|atol/i.test(name)) return "consumer";
  if (/health|vaccin/i.test(name)) return "health";
  return base.sector;
}

/** A bracketed note about URAL's own checking, or one carrying a figure, is not part of a page title. */
const NOTE_IN_BRACKETS = /[0-9০-৯]|checked|recheck|historical|relevant|revision|updated|still current|general reference|require|যাচাই|ঐতিহাসিক|প্রাসঙ্গিক|হালনাগাদ|সংশোধন|সাধারণ/i;

/** "check an ATOL" -> "Check an ATOL"; "eVISA information" and Bengali text are left alone. */
function capitalise(value: string): string {
  return /^[a-z]+(?![A-Za-z])/.test(value) ? value[0].toUpperCase() + value.slice(1) : value;
}

/**
 * Turns a citation label into a short directory title.
 *
 * Citation labels are written for a reference list ("Saudia — Special baggage:
 * wheelchairs, mobility aids …"). In the directory the organisation is shown
 * once on its card, so the title keeps only the page name and drops the
 * article-specific detail that follows it — including any figure, which would
 * otherwise be repeated here without its date.
 */
export function officialSourceTitle(label: string, kind: OfficialSourceKind): string {
  const full = label.replace(/\s+/g, " ").trim();
  const separator = full.match(/ [—–] |: /);
  const prefix = separator ? full.slice(0, separator.index) : "";
  let rest = separator ? full.slice((separator.index ?? 0) + separator[0].length) : full;
  if (kind === "press") {
    // A dated announcement keeps its date (that is what tells the reader its age)
    // and drops the article's own summary after the colon.
    const text = /[0-9০-৯]/.test(prefix) ? full : rest;
    const colon = text.indexOf(": ");
    return capitalise((colon > 0 ? text.slice(0, colon) : text).replace(/; (historical|ঐতিহাসিক)\)/, ")")).slice(0, 140);
  }
  // Walk the text once; a comma or colon inside brackets does not end the title.
  let depth = 0;
  let cut = rest.length;
  for (let index = 0; index < rest.length && cut === rest.length; index += 1) {
    const char = rest[index];
    if (char === "(") {
      const close = rest.indexOf(")", index);
      const inside = rest.slice(index + 1, close === -1 ? rest.length : close);
      const isCaseNumber = /^(Case|মামলা) /.test(inside);
      if (depth === 0 && index > 0 && !isCaseNumber && NOTE_IN_BRACKETS.test(inside)) cut = index;
      else depth += 1;
    } else if (char === ")") {
      depth = Math.max(0, depth - 1);
    } else if (depth === 0 && index > 0) {
      const ahead = rest.slice(index, index + 3);
      if (/^( [—–] |: |; |, )/.test(ahead)) cut = index;
    }
  }
  rest = rest.slice(0, cut).replace(/[\s,;:–—-]+$/, "").trim();
  if (rest.length < 3) rest = full;
  if (rest.length > 96) rest = `${rest.slice(0, 96).replace(/\s+\S*$/, "")}…`;
  return capitalise(rest);
}

/**
 * Hand-written titles for the few labels the rule above cannot shorten well
 * (a label with no organisation prefix, or whose page name contains a comma).
 * Keyed by `officialSourceUrlKey`.
 */
const TITLE_OVERRIDES: Readonly<Record<string, { en: string; bn: string }>> = {
  "spa.gov.sa/en/n2636455": {
    en: "Al-Hada cable car specifications (18 July 2026)",
    bn: "আল-হাদা কেবল কারের বিবরণ (১৮ জুলাই ২০২৬)",
  },
  "spa.gov.sa/en/w2609834": {
    en: "Hira Cultural District museum opening hours (31 July 2026)",
    bn: "হেরা কালচারাল ডিস্ট্রিক্টের জাদুঘরের সময়সূচি (৩১ জুলাই ২০২৬)",
  },
  "haj.gov.sa/en/faq": {
    en: "Frequently asked questions",
    bn: "সাধারণ প্রশ্নোত্তর",
  },
  "saudia.com/information/terms-and-conditions/general-conditions-of-carriage": {
    en: "General Conditions of Carriage",
    bn: "পরিবহনের সাধারণ শর্তাবলি (Conditions of Carriage)",
  },
  "new.caab.gov.bd/aip/sup/aip%20sup%2006-25": {
    en: "AIP Supplement 06/25",
    bn: "AIP সাপ্লিমেন্ট ০৬/২৫",
  },
  "eur-lex.europa.eu/eli/reg/2026/2202/oj/eng": {
    en: "Regulation (EU) 2026/2202 amending Regulation (EC) No 261/2004",
    bn: "রেগুলেশন (EU) 2026/2202: রেগুলেশন (EC) 261/2004-এর সংশোধনী",
  },
  "legislation.gov.uk/uksi/2019/278/regulation/8": {
    en: "Air Passenger Rights (EU Exit) Regulations 2019, regulation 8",
    bn: "Air Passenger Rights (EU Exit) Regulations 2019, রেগুলেশন ৮",
  },
  "gov.uk/foreign-travel-advice/saudi-arabia/pilgrimage": {
    en: "Saudi Arabia travel advice: pilgrimage",
    bn: "সৌদি আরব ভ্রমণ পরামর্শ: হজ ও ওমরাহ",
  },
  "visa.visitsaudi.com": { en: "eVisa portal and nationality list", bn: "eVisa পোর্টাল ও জাতীয়তার তালিকা" },
  "visa.visitsaudi.com/home/termsconditions": { en: "Tourist eVisa terms and conditions", bn: "ট্যুরিস্ট eVisa-র শর্তাবলি" },
  "ksavisa.sa": { en: "Saudi Unified Visa Platform", bn: "সৌদি ইউনিফায়েড ভিসা প্ল্যাটফর্ম" },
  "cdn.mt.gov.sa/mtportal/mt-fe-production/content/policies-regulations/documents/tourism-regulations/tourist-visa-regulations-en-v012.pdf": {
    en: "Tourist Visa Regulations",
    bn: "Tourist Visa Regulations (ট্যুরিস্ট ভিসা প্রবিধান)",
  },
  "u.ae": { en: "UAE Government Portal home page", bn: "সংযুক্ত আরব আমিরাতের সরকারি পোর্টালের হোম পেজ" },
  "ivacbd.com": { en: "Notices, fees and appointment portal", bn: "বিজ্ঞপ্তি, ফি ও অ্যাপয়েন্টমেন্ট পোর্টাল" },
  "hajj.gov.bd": { en: "Hajj notices and e-Hajj services", bn: "হজ বিজ্ঞপ্তি ও ই-হজ সেবা" },
  "haj.gov.sa": { en: "Official portal for Umrah services and pilgrim guidance", bn: "ওমরাহ সেবা ও হাজি-নির্দেশনার অফিসিয়াল পোর্টাল" },
  "haj.gov.sa/en/hajj": { en: "Hajj: the pillars and the day-by-day order", bn: "হজ: রুকনসমূহ ও দিনভিত্তিক ক্রম" },
  "haj.gov.sa/en/umrah": { en: "Umrah: the pillars of Umrah", bn: "ওমরাহ: ওমরাহর রুকন" },
  "nusuk.sa": { en: "Nusuk platform home page", bn: "Nusuk প্ল্যাটফর্মের হোম পেজ" },
  "hajj.nusuk.sa": { en: "Nusuk Hajj services portal", bn: "Nusuk Hajj সেবা পোর্টাল" },
  "umrah.nusuk.sa/journey": { en: "Nusuk Umrah Journey guide", bn: "Nusuk Umrah Journey গাইড" },
  "umrah.nusuk.sa/termsofuse": { en: "Nusuk Umrah terms of use", bn: "Nusuk Umrah ব্যবহারের শর্ত" },
  "umrah.nusuk.sa/registration/signup": { en: "Nusuk Umrah registration", bn: "Nusuk Umrah নিবন্ধন" },
  "services.nusuk.sa/nusuk-svc/auth/login": { en: "Nusuk services login", bn: "Nusuk সেবার লগইন" },
  "eservices.alharamain.gov.sa/login": { en: "I'tikaf e-service registration (login required)", bn: "ইতিকাফ ই-সেবা নিবন্ধন (লগইন প্রয়োজন)" },
  "biman-airlines.com/baggageall": { en: "Baggage, cabin rules and notices", bn: "ব্যাগেজ, কেবিন নিয়ম ও নোটিশ" },
  "flynas.com": { en: "Booking site", bn: "বুকিং সাইট" },
  "flynas.com/en/media-center/news-updates/stopover-visa": { en: "Stopover visa launch announcement", bn: "স্টপওভার ভিসা চালুর ঘোষণা" },
  "saudia.com/book/travel-information/branded-fares": { en: "Branded fare comparison", bn: "Branded fare তুলনা" },
  "sar.hhr.sa": { en: "Timetable and booking portal", bn: "সময়সূচি ও বুকিং পোর্টাল" },
  "sar.com.sa": { en: "Saudi Arabia Railways official site", bn: "সৌদি আরব রেলওয়ের অফিসিয়াল সাইট" },
  "sar.hhr.sa/travel/fares": { en: "Official fare table", bn: "অফিসিয়াল ভাড়ার তালিকা" },
  "sar.hhr.sa/travel/travel-tips": { en: "Travel tips", bn: "ভ্রমণ পরামর্শ" },
  "sar.hhr.sa/services/stations-services": { en: "Station services", bn: "স্টেশন সেবা" },
  "bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf": {
    en: "FE Circular Letter No. 05 (9 May 2024): RFCD international cards",
    bn: "FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD আন্তর্জাতিক কার্ড",
  },
  "bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf": {
    en: "FEPD-1 Circular No. 33 (6 September 2026): travel entitlement",
    bn: "FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement",
  },
  "bb.org.bd/mediaroom/circulars/fepd-2/jan072026fepd-201e.pdf": {
    en: "FEPD-2 Circular No. 01 (7 January 2026): passport endorsement fee",
    bn: "FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬): passport endorsement fee",
  },
  "bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf": {
    en: "Guidelines for Foreign Exchange Transactions, Chapter 19: payment through international cards",
    bn: "Guidelines for Foreign Exchange Transactions, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট",
  },
  "nbr.gov.bd": { en: "Travel tax rules", bn: "ভ্রমণ করের নিয়ম" },
  "nbr.gov.bd/uploads/tariff_schedule/chapter-8.pdf": { en: "Bangladesh Customs Tariff, Chapter 8", bn: "বাংলাদেশ কাস্টমস ট্যারিফ, অধ্যায় ৮" },
  "moh.gov.sa/en/pages/default.aspx": { en: "Official portal", bn: "অফিসিয়াল পোর্টাল" },
  "eur-lex.europa.eu/legal-content/en/txt/html/?uri=celex:22001a0718(01)": { en: "The Montreal Convention", bn: "মন্ট্রিল কনভেনশন" },
  "trenitalia.com/en.html": { en: "Official train schedules and travel information", bn: "অফিসিয়াল ট্রেনের সময়সূচি ও ভ্রমণ-তথ্য" },
  "server6.bmd.gov.bd/en/forecast": { en: "Forecast portal", bn: "ফোরকাস্ট পোর্টাল" },
  "bcgdubai.gov.bd/beautiful-bangladesh/coxs-bazar-beach": { en: "Cox's Bazar Beach", bn: "কক্সবাজার বিচ" },
};

interface RawCitation {
  url: string;
  nameEn: string;
  nameBn: string;
  page: string;
}

/** Every structured outbound citation on the site, official or not. */
export function collectSiteCitations(): RawCitation[] {
  const citations: RawCitation[] = [];
  for (const [visaId, sources] of Object.entries(VISA_OFFICIAL_SOURCES)) {
    for (const source of sources) {
      citations.push({ url: source.url, nameEn: source.label, nameBn: source.labelBn, page: `/visa/${visaId}` });
    }
  }
  for (const [destinationId, sources] of Object.entries(DESTINATION_OFFICIAL_SOURCES)) {
    for (const source of sources) {
      citations.push({
        url: source.url,
        nameEn: source.labelEn,
        nameBn: source.labelBn || source.labelEn,
        page: `/destinations/${destinationId}`,
      });
    }
  }
  for (const post of getLocalizedBlogs("en")) {
    for (const reference of post.references ?? []) {
      citations.push({
        url: reference.url,
        nameEn: reference.name,
        nameBn: reference.nameBn || reference.name,
        page: `/blog/${post.slug}`,
      });
    }
  }
  return citations;
}

/** A link that opens a PDF file rather than a web page. */
function isPdfUrl(url: string): boolean {
  return /\.pdf(?:$|[?#])/i.test(url.trim());
}

/** Owner-supplied links that cannot be listed: unknown website, bad date, or no title for an uncited link. */
export function findOwnerSuppliedProblems(): string[] {
  const cited = new Set(collectSiteCitations().map((citation) => officialSourceUrlKey(citation.url)));
  const problems: string[] = [];
  for (const supplied of OWNER_SUPPLIED_SOURCES) {
    const organisation = OFFICIAL_HOSTS[officialSourceHost(supplied.url)];
    if (!organisation) problems.push(`${supplied.url} (website not filed)`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(supplied.checked)) problems.push(`${supplied.url} (checked date)`);
    else if (!cited.has(officialSourceUrlKey(supplied.url)) && (!supplied.en || !supplied.bn || !supplied.sector)) {
      problems.push(`${supplied.url} (title or section missing)`);
    }
  }
  return problems;
}

function pathDepth(url: string): number {
  return officialSourceUrlKey(url).length;
}

let cachedSources: OfficialSourceEntry[] | null = null;
let cachedOfficial: OfficialSourceEntry[] | null = null;
let cachedCommunity: OfficialSourceEntry[] | null = null;

/** The official list only: by section, country, organisation, then homepage-first. */
export function getOfficialSources(): OfficialSourceEntry[] {
  cachedOfficial ??= buildSources().filter((source) => isOfficialKind(OFFICIAL_HOSTS[source.host].kind));
  return cachedOfficial;
}

/** Owner-checked links from community bodies. Never counted or shown as official. */
export function getCommunitySources(): OfficialSourceEntry[] {
  cachedCommunity ??= buildSources().filter((source) => !isOfficialKind(OFFICIAL_HOSTS[source.host].kind));
  return cachedCommunity;
}

function buildSources(): OfficialSourceEntry[] {
  if (cachedSources) return cachedSources;
  const byUrl = new Map<string, OfficialSourceEntry>();
  for (const citation of collectSiteCitations()) {
    const host = officialSourceHost(citation.url);
    const organisation = OFFICIAL_HOSTS[host];
    // A community body is listed only through an owner-supplied link (below).
    if (!organisation || !isOfficialKind(organisation.kind)) continue;
    const key = officialSourceUrlKey(citation.url);
    const existing = byUrl.get(key);
    if (existing) {
      if (!existing.pages.includes(citation.page)) existing.pages.push(citation.page);
      continue;
    }
    const nameEn = citation.nameEn.trim();
    const nameBn = citation.nameBn.trim();
    const override = TITLE_OVERRIDES[key];
    byUrl.set(key, {
      url: citation.url.trim(),
      host,
      org: organisation.id,
      titleEn: override?.en ?? officialSourceTitle(nameEn, organisation.kind),
      titleBn: override?.bn ?? officialSourceTitle(nameBn, organisation.kind),
      nameEn,
      nameBn,
      historical: /historical/i.test(nameEn),
      sector: refineSector(organisation, nameEn),
      country: organisation.country,
      pages: [citation.page],
      pdf: isPdfUrl(citation.url),
    });
  }
  for (const supplied of OWNER_SUPPLIED_SOURCES) {
    const host = officialSourceHost(supplied.url);
    const organisation = OFFICIAL_HOSTS[host];
    if (!organisation) continue;
    const key = officialSourceUrlKey(supplied.url);
    const existing = byUrl.get(key);
    if (existing) {
      existing.checked = supplied.checked;
      continue;
    }
    // Without a title and a section the link cannot be shown; the build guard reports it.
    if (!supplied.en || !supplied.bn || !supplied.sector) continue;
    byUrl.set(key, {
      url: supplied.url.trim(),
      host,
      org: organisation.id,
      titleEn: supplied.en,
      titleBn: supplied.bn,
      nameEn: `${organisation.en} — ${supplied.en}`,
      nameBn: `${organisation.bn} — ${supplied.bn}`,
      historical: false,
      sector: supplied.sector,
      country: organisation.country,
      pages: [],
      checked: supplied.checked,
      pdf: isPdfUrl(supplied.url),
    });
  }
  const sectorOrder = new Map(OFFICIAL_SOURCE_SECTORS.map((sector, index) => [sector.id, index]));
  const countryOrder = new Map(Object.keys(OFFICIAL_SOURCE_COUNTRIES).map((code, index) => [code, index]));
  const orgOrder = new Map(OFFICIAL_ORGANISATIONS.map((organisation, index) => [organisation.id, index]));
  cachedSources = [...byUrl.values()].sort(
    (a, b) =>
      (sectorOrder.get(a.sector) ?? 99) - (sectorOrder.get(b.sector) ?? 99) ||
      (countryOrder.get(a.country) ?? 99) - (countryOrder.get(b.country) ?? 99) ||
      (orgOrder.get(a.org) ?? 999) - (orgOrder.get(b.org) ?? 999) ||
      Number(a.historical) - Number(b.historical) ||
      pathDepth(a.url) - pathDepth(b.url) ||
      a.url.localeCompare(b.url, "en")
  );
  return cachedSources;
}

export interface OfficialSourceGroup {
  sector: (typeof OFFICIAL_SOURCE_SECTORS)[number];
  countries: {
    code: OfficialSourceCountry;
    organisations: { organisation: OfficialOrganisation; sources: OfficialSourceEntry[] }[];
  }[];
  /** Links in this section. */
  total: number;
}

const ORGANISATION_BY_ID = new Map(OFFICIAL_ORGANISATIONS.map((organisation) => [organisation.id, organisation]));

/** Section → country → organisation → links, in display order; empty groups are omitted. */
export function groupOfficialSources(sources: readonly OfficialSourceEntry[] = getOfficialSources()): OfficialSourceGroup[] {
  const groups: OfficialSourceGroup[] = [];
  for (const sector of OFFICIAL_SOURCE_SECTORS) {
    const inSector = sources.filter((source) => source.sector === sector.id);
    if (inSector.length === 0) continue;
    const countries: OfficialSourceGroup["countries"] = [];
    for (const code of Object.keys(OFFICIAL_SOURCE_COUNTRIES) as OfficialSourceCountry[]) {
      const inCountry = inSector.filter((source) => source.country === code);
      if (inCountry.length === 0) continue;
      const organisations: OfficialSourceGroup["countries"][number]["organisations"] = [];
      for (const source of inCountry) {
        const last = organisations[organisations.length - 1];
        if (last && last.organisation.id === source.org) last.sources.push(source);
        else {
          const organisation = ORGANISATION_BY_ID.get(source.org);
          if (organisation) organisations.push({ organisation, sources: [source] });
        }
      }
      countries.push({ code, organisations });
    }
    groups.push({ sector, countries, total: inSector.length });
  }
  return groups;
}

/** Distinct organisations behind a list of links. */
export function countOfficialOrganisations(sources: readonly OfficialSourceEntry[] = getOfficialSources()): number {
  return new Set(sources.map((source) => source.org)).size;
}

/** Cited hosts that are in neither list. Must be empty; guarded by test:official-sources. */
export function findUnclassifiedCitationHosts(): string[] {
  const excluded = new Set(NON_OFFICIAL_HOSTS);
  const unknown = new Set<string>();
  for (const citation of collectSiteCitations()) {
    const host = officialSourceHost(citation.url);
    if (!host || (!OFFICIAL_HOSTS[host] && !excluded.has(host))) unknown.add(host || citation.url);
  }
  return [...unknown].sort();
}
