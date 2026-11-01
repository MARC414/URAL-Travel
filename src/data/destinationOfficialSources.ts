export interface DestinationFlightSearchConfig {
  /** Human-readable airport value understood by the shared flight widget. */
  initialTo: string;
  noteEn?: string;
  noteBn?: string;
}

export interface DestinationOfficialSource {
  category: "entry" | "transport" | "tourism";
  labelEn: string;
  labelBn: string;
  url: string;
}

/** Main airport defaults for route-prefilled DAC flight searches. */
export const DESTINATION_FLIGHT_SEARCHES: Readonly<Record<string, DestinationFlightSearchConfig>> = {
  "nepal-guide": { initialTo: "Kathmandu (KTM)" },
  "thailand-guide": { initialTo: "Bangkok (BKK)" },
  "malaysia-guide": { initialTo: "Kuala Lumpur (KUL)" },
  "dubai-guide": { initialTo: "Dubai (DXB)" },
  "singapore-guide": { initialTo: "Singapore (SIN)" },
  "maldives-guide": { initialTo: "Malé (MLE)" },
  "london-guide": { initialTo: "London Heathrow (LHR)" },
  "italy-guide": {
    initialTo: "Rome (FCO)",
    noteEn: "Italy is a multi-city guide covering Rome, Milan and Venice. Change the arrival airport to match your route.",
    noteBn: "ইতালির গাইডে রোম, মিলান ও ভেনিস—একাধিক শহর রয়েছে। আপনার রুট অনুযায়ী আগমনের বিমানবন্দর বদলে নিন।",
  },
  "paris-guide": { initialTo: "Paris (CDG)" },
  "new-york-guide": { initialTo: "New York (JFK)" },
};

/**
 * Primary government, immigration and transit sources for checks already
 * recommended in each guide. These links are editorial references, not partners.
 */
export const DESTINATION_OFFICIAL_SOURCES: Readonly<Record<string, readonly DestinationOfficialSource[]>> = {
  "nepal-guide": [
    {
      category: "entry",
      labelEn: "Nepal Department of Immigration: ETA and visa information",
      labelBn: "নেপাল ইমিগ্রেশন বিভাগ: ETA ও ভিসার তথ্য",
      url: "https://immigration.gov.np/eta-visa-nepal",
    },
    {
      category: "tourism",
      labelEn: "Nepal Tourism Board: official visitor information",
      labelBn: "নেপাল ট্যুরিজম বোর্ড: সরকারি ভ্রমণ-তথ্য",
      url: "https://ntb.gov.np/",
    },
  ],
  "thailand-guide": [
    {
      category: "entry",
      labelEn: "Thailand official e-Visa portal",
      labelBn: "থাইল্যান্ডের সরকারি ই-ভিসা পোর্টাল",
      url: "https://www.thaievisa.go.th/",
    },
    {
      category: "transport",
      labelEn: "Bangkok BTS Skytrain: routes and service information",
      labelBn: "ব্যাংকক BTS স্কাইট্রেন: রুট ও পরিষেবার তথ্য",
      url: "https://www.bts.co.th/eng/",
    },
  ],
  "malaysia-guide": [
    {
      category: "entry",
      labelEn: "Malaysia Immigration: official e-Visa portal",
      labelBn: "মালয়েশিয়া ইমিগ্রেশন: সরকারি ই-ভিসা পোর্টাল",
      url: "https://malaysiavisa.imi.gov.my/",
    },
    {
      category: "transport",
      labelEn: "Rapid KL: current public-transport routes and services",
      labelBn: "র‍্যাপিড কেএল: বর্তমান গণপরিবহন রুট ও পরিষেবা",
      url: "https://myrapid.com.my/",
    },
  ],
  "dubai-guide": [
    {
      category: "entry",
      labelEn: "UAE Government portal: visa and entry information",
      labelBn: "সংযুক্ত আরব আমিরাতের সরকারি পোর্টাল: ভিসা ও প্রবেশের তথ্য",
      url: "https://u.ae/en/information-and-services/visa-and-emirates-id/Visa-information/do-you-need-an-entry-permit-or-a-visa-to-enter-the-uae",
    },
    {
      category: "transport",
      labelEn: "Dubai RTA: public-transport routes and service updates",
      labelBn: "দুবাই RTA: গণপরিবহন রুট ও পরিষেবা আপডেট",
      url: "https://www.rta.ae/wps/portal/rta/ae/home?lang=en",
    },
  ],
  "singapore-guide": [
    {
      category: "entry",
      labelEn: "Singapore ICA: entry requirements and arrival information",
      labelBn: "সিঙ্গাপুর ICA: প্রবেশের শর্ত ও আগমনের তথ্য",
      url: "https://www.ica.gov.sg/",
    },
    {
      category: "transport",
      labelEn: "Singapore LTA: official transport information",
      labelBn: "সিঙ্গাপুর LTA: সরকারি পরিবহন-তথ্য",
      url: "https://www.lta.gov.sg/",
    },
  ],
  "maldives-guide": [
    {
      category: "entry",
      labelEn: "Maldives Immigration: IMUGA traveller declaration portal",
      labelBn: "মালদ্বীপ ইমিগ্রেশন: IMUGA ভ্রমণকারী ঘোষণা পোর্টাল",
      url: "https://imuga.immigration.gov.mv/",
    },
    {
      category: "tourism",
      labelEn: "Visit Maldives: official destination information",
      labelBn: "Visit Maldives: সরকারি গন্তব্য-তথ্য",
      url: "https://visitmaldives.com/",
    },
  ],
  "london-guide": [
    {
      category: "entry",
      labelEn: "GOV.UK: check whether you need a UK visa",
      labelBn: "GOV.UK: যুক্তরাজ্যের ভিসা লাগবে কি না যাচাই করুন",
      url: "https://www.gov.uk/check-uk-visa",
    },
    {
      category: "transport",
      labelEn: "Transport for London: journey planning and service status",
      labelBn: "Transport for London: যাত্রাপথ পরিকল্পনা ও পরিষেবার অবস্থা",
      url: "https://tfl.gov.uk/",
    },
  ],
  "italy-guide": [
    {
      category: "entry",
      labelEn: "European Commission: Schengen visa policy",
      labelBn: "ইউরোপীয় কমিশন: শেনজেন ভিসা নীতি",
      url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
    },
    {
      category: "transport",
      labelEn: "Trenitalia: official train schedules and travel information",
      labelBn: "Trenitalia: সরকারি ট্রেনের সময়সূচি ও ভ্রমণ-তথ্য",
      url: "https://www.trenitalia.com/en.html",
    },
  ],
  "paris-guide": [
    {
      category: "entry",
      labelEn: "European Commission: Schengen visa policy",
      labelBn: "ইউরোপীয় কমিশন: শেনজেন ভিসা নীতি",
      url: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en",
    },
    {
      category: "transport",
      labelEn: "RATP: Paris public-transport routes and service information",
      labelBn: "RATP: প্যারিস গণপরিবহন রুট ও পরিষেবার তথ্য",
      url: "https://www.ratp.fr/en",
    },
  ],
  "new-york-guide": [
    {
      category: "entry",
      labelEn: "U.S. Department of State: visitor visa information",
      labelBn: "যুক্তরাষ্ট্রের পররাষ্ট্র দপ্তর: ভিজিটর ভিসার তথ্য",
      url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html",
    },
    {
      category: "transport",
      labelEn: "MTA: New York transit maps and service updates",
      labelBn: "MTA: নিউ ইয়র্কের ট্রানজিট ম্যাপ ও পরিষেবা আপডেট",
      url: "https://new.mta.info/",
    },
  ],
};
