import { SCHEDULED_BLOG_SEO_COPY } from "../data/scheduledBlogSeo.generated";
import {
  CORE_BENGALI_SEO_COPY,
  CORE_PRIORITY_SEO_COPY,
  compactDescription,
  compactTitle,
  stripBrandSuffix,
  stripLocalePrefix,
  type SeoCopy,
} from "./coreSeoCopy";

export { stripBrandSuffix, type SeoCopy };

/**
 * First-pass search copy for all prioritized canonical routes (core routes
 * spread from coreSeoCopy.ts plus every hand-written /blog/<slug> override).
 * Loaded lazily on /blog routes in the browser; imported directly by prerender
 * and verification scripts.
 */
export const PRIORITY_SEO_COPY: Record<string, SeoCopy> = {
  ...CORE_PRIORITY_SEO_COPY,
  "/blog/cheap-flight-booking-hacks-dhaka": {
    title: "Cheap Flights from Dhaka: Booking Tips | URAL",
    description:
      "Learn how to compare flight options from Dhaka, choose flexible dates, review baggage costs and use fare alerts when planning a budget trip.",
  },
  "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    title: "DIY Umrah from Bangladesh: Cost, Visa & Nusuk | URAL",
    description:
      "Plan Umrah from Bangladesh: conditional visa routes, 1448H dates and application-to-Nusuk steps. Budget reference is historical; check current quotes.",
  },
  "/blog/hajj-registration-bangladesh-government-vs-private-package-cost": {
    title: "Hajj Registration in Bangladesh: Process & Packages | URAL",
    description:
      "Hajj 2027 registration from Bangladesh: the supplied MoRA notice lists a 24 September 2026 cutoff. Check hajj.gov.bd for later notices; 2027 package prices were not established in the supplied sources.",
  },
  "/blog/dual-currency-card-endorsement-bangladesh": {
    title: "Dual-Currency Card Endorsement in Bangladesh | URAL",
    description:
      "Learn how foreign-currency endorsement works for Bangladeshi travelers, what to ask your bank and how to prepare a card for overseas payments.",
  },
  "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    title: "Thailand e-Visa from Bangladesh: Documents & Bank Balance Guide | URAL",
    description:
      "Review Thailand visa planning from Bangladesh, including document preparation, financial evidence and application steps. Confirm current rules.",
  },
  "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": {
    title: "Malaysia eVisa & MDAC Guide for Bangladesh Travelers | URAL",
    description:
      "Understand Malaysia eVisa planning and the Malaysia Digital Arrival Card for Bangladeshi travelers, with document and pre-departure notes.",
  },
  "/blog/dhaka-airport-outbound-immigration-checklist-noc-go": {
    title: "Dhaka Airport Immigration Checklist for Travelers | URAL",
    description:
      "Review a practical Dhaka Airport departure checklist, including passport, visa, ticket, accommodation and profession-related documents to check before travel.",
  },
  "/blog/nepal-pokhara-itinerary-bangladesh": {
    title: "Kathmandu–Pokhara Itinerary from Bangladesh | URAL",
    description:
      "Use this 5-day Kathmandu and Pokhara itinerary from Bangladesh to compare route options, transport choices and trip-cost categories.",
  },
  "/blog/singapore-visa-guide-bangladesh-agents": {
    title: "Singapore Visa from Bangladesh: Application Guide | URAL",
    description:
      "Review Singapore tourist-visa application planning for Bangladeshi passport holders, including authorized submission routes and documents to check.",
  },
  "/blog/top-budget-family-destinations-from-dhaka": {
    title: "Family Trips from Dhaka: Destination Ideas & Budgets | URAL",
    description:
      "Compare family-trip ideas from Dhaka by destination, entry requirements and broad budget considerations before choosing where to go.",
  },
  "/blog/bangladesh-epassport-application-renewal-64-districts-fee-guide": {
    title: "Bangladesh e-Passport Fees 2026: 48 vs 64 Pages, Renewal & RPO List | URAL",
    description:
      "Review Bangladesh e-passport application and renewal steps, required documents and official guidance before booking international travel.",
  },
  "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    title: "Flight Delay, Cancellation & Baggage Compensation Guide | URAL",
    description:
      "Understand international passenger rights for flight disruptions and baggage under EC 261, UK 261, Turkey's SHY-YOLCU regulation, Saudi GACA rules and the Montreal Convention.",
  },
  "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": {
    title: "Airlines from Dhaka: Routes & Baggage Guide | URAL",
    description:
      "Compare airlines serving Dhaka by destination, route and baggage-policy considerations. Check the operating airline and your fare rules before booking.",
  },
  "/blog/nepal-vs-thailand-first-trip": {
    title: "Nepal vs Thailand: Best First Trip from Bangladesh | URAL",
    description:
      "Compare Nepal and Thailand for a first international trip from Bangladesh across visa rules, BDT flight and hotel costs, halal food and family comfort.",
  },
  "/blog/hotel-savings-guide-bangkok-kl-dubai": {
    title: "Compare Hotel Areas and Booking Terms in Bangkok, Kuala Lumpur & Dubai | URAL",
    description:
      "Compare hotel areas, then review the same room/date basis and checkout total on partner sites. No fixed rates or savings claims are presented.",
  },
  "/blog/halal-food-guide-bangkok-bangladesh": {
    title: "Halal Food Guide in Bangkok for Bangladeshis | URAL",
    description:
      "Find certified halal restaurants, Bangladeshi and Indian kitchens, mall food courts and prayer spaces across Pratunam, Sukhumvit and Siam in Bangkok.",
  },
  "/blog/maldives-budget-trip-bangladesh-maafushi": {
    title: "Maldives Budget Trip from Bangladesh: Maafushi | URAL",
    description:
      "Plan a Maldives trip from Dhaka under BDT 75,000 by staying on Maafushi local island, using public speedboats and booking affordable excursion packages.",
  },
  "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    title: "Makkah & Madinah Hotel Zones & Haramain Train | URAL",
    description:
      "Compare exact Makkah/Madinah rooms and access routes; check HHR baggage, basic fares, transfers and ticket conditions before booking.",
  },
  "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    title: "Umrah with Elderly Parents: Wheelchair & Mobility Guide | URAL",
    description:
      "Request airline wheelchair help at booking, check device approval, use the Grand Mosque's free wheelchairs or Tanaqol carts, and verify the actual hotel route.",
  },
  "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    title: "96-Hour Saudi Stopover Visa for Bangladeshis | URAL",
    description:
      "Check eligibility for a Saudi stopover of up to 96 hours: Saudia booking steps, flynas evidence limits, actual charges and separate Umrah/Rawdah permits.",
  },
  "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    title: "Nusuk App & Saudi Visa Bio Guide for Bangladesh | URAL",
    description:
      "Bangladesh-focused Nusuk visitor registration, application-specific Visa Bio and Rawdah booking/confirmation checks. Follow current official instructions.",
  },
  "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    title: "Umrah for Women: Visa, Rawdah & Religious Guidance | URAL",
    description:
      "Separate visa eligibility and religious advice; check women’s Rawdah bookings, actual access routes, Ihram, menstrual contingencies and private Taqsir.",
  },
  "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    title: "Dhaka–Jeddah/Madinah Flight Planning & Baggage | URAL",
    description:
      "Compare roundtrip and open-jaw Umrah flights from Dhaka: ticketed baggage, Zamzam conditions, connections and same-basis quotes—not promised savings.",
  },
  "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    title: "Ramadan 1448 Umrah Dates & I'tikaf Eligibility | URAL",
    description:
      "Ramadan 1448 starts 8 Feb 2027; Umrah visas close 9 Mar, entry 23 Mar. What the Ministry calendar says and who has actually been eligible for an I'tikaf permit.",
  },
  "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    title: "Ihram & Miqat Rules: Dhaka to Jeddah Flights | URAL",
    description:
      "Where to enter Ihram flying from Dhaka: the Ministry's air-travel rule, why Jeddah airport is not a Miqat, Gulf transit, and Madinah-first routes.",
  },
  "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    title: "Zamzam, Dates & Gold Limits for Dhaka Arrivals | URAL",
    description:
      "One 5L Zamzam bottle at SAR 12.50, no dates kilogram allowance, and 100 g of gold ornaments or a declared 117 g bar once a year — what the operators and NBR actually publish.",
  },

  "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    title: "Bangladeshi & Pakistani Food in Makkah & Madinah | URAL",
    description:
      "Where the documented South Asian kitchens are, how to check a restaurant at the door, and why this guide prints no per-plate price — verified against SFDA, Balady and the operators.",
  },

  "/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    title: "Makkah, Madinah, Badr & Taif Ziyarah Guide | URAL",
    description:
      "Plan Ziyarah in Makkah, Madinah, Taif and Badr: verified hours, Hira's disputed timetable, and how to fix a car price before it moves.",
  },
  "/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    title: "Umrah + Dubai 10-Day Combo Trip from Dhaka | URAL",
    description:
      "Combine Makkah, Madinah and Dubai on one multi-city itinerary from Dhaka, with Saudi and UAE visa sequencing, flight routing and BDT cost breakdowns.",
  },
  "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    title: "Abu Dhabi Sheikh Zayed Mosque Day Trip from Dubai | URAL",
    description:
      "Plan an Abu Dhabi day trip from Dubai for Bangladeshi families: Sheikh Zayed Grand Mosque dress code, free entry registration, bus vs taxi costs in BDT.",
  },
  "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": {
    title: "Malaysia Islamic Heritage & Putrajaya Family Guide | URAL",
    description:
      "Explore Putrajaya Pink Mosque, the Islamic Arts Museum and halal family attractions in Kuala Lumpur with MRT transit directions and BDT costs.",
  },
  "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    title: "Europe, UK & USA Attraction Passes from Bangladesh | URAL",
    description:
      "Book skip-the-line museum and landmark passes in Paris, London, Rome and New York, and check separate Saudi stopover and visa-eligibility guidance for Umrah.",
  },
  "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": {
    title: "Islamic Dual-Currency Cards in Bangladesh for Umrah | URAL",
    description:
      "Compare Shariah-compliant Islamic dual-currency debit and pre-paid cards in Bangladesh for booking Nusuk, Haramain trains and Makkah hotels without riba.",
  },
  "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    title: "RFCD vs Travel Quota: $300 Online Limit | URAL",
    description:
      "See why Bangladesh's USD 300 online-purchase rule affects travel-quota cards, how documented travel approval works, and when an RFCD account fits.",
  },
  "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": {
    title: "Cash SAR/USD vs Dual-Currency Card Abroad | URAL",
    description:
      "Compare carrying USD or SAR cash versus swiping a Bangladeshi dual-currency card in Makkah, Bangkok and KL, and avoid 5% Dynamic Currency Conversion fees.",
  },
  "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": {
    title: "Fresh Bangladeshi Passport Travel History Guide | URAL",
    description:
      "Build credible international travel history on a blank Bangladeshi e-Passport starting with visa-on-arrival trips to Nepal and Maldives before e-Visa routes.",
  },
  "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    title: "Singapore 4-Day Budget Itinerary Under BDT 85,000 | URAL",
    description:
      "Follow a 4-day Singapore budget itinerary from Bangladesh using SimplyGo MRT contactless cards, Little India and Arab Street halal dining, and Sentosa tips.",
  },
  "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": {
    title: "Bumrungrad & Bangkok Hospital Guide from Bangladesh | URAL",
    description:
      "Plan a Bangkok medical checkup from Bangladesh: booking Bumrungrad or Bangkok Hospital appointments, free Bengali interpreters, visas and BDT package costs.",
  },
  "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    title: "Travel eSIM & Insurance from Bangladesh: Oman & Schengen | URAL",
    description:
      "Compare travel eSIM options with mobile roaming, check Oman data packages, review EUR 30,000 Schengen visa medical insurance rules and family policy exclusions.",
  },
  "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    title: "Sri Lanka + Maldives 7-Day Combo Tour in BDT | URAL",
    description:
      "Combine Colombo, Kandy, Ella and Maafushi Island on one 7-day itinerary from Dhaka, with Sri Lanka ETA, Maldives VOA and a complete BDT budget breakdown.",
  },
};

/**
 * Bengali search copy, hand-written for SERP intent (title + meta description).
 *
 * Covers localized hubs, static pages, and selected flight, hotel, visa and
 * trip-cost routes. Other detail-route copy is generated from the localized
 * data in src/data/bengaliContent.ts; scheduled-post overrides are generated
 * separately from content/blog frontmatter and remain absent until publication.
 * This table wins over mechanical fallback copy when a specific Bengali query
 * phrase or a complete, non-volatile description needs to lead the snippet.
 * The generated H1 remains the on-page heading.
 *
 * /destinations/* has no entry and no Bengali content, so no /bn route is
 * generated for it — see DEFERRED_BN_GROUPS in src/utils/localeRoutes.ts.
 */
export const BENGALI_SEO_COPY: Record<string, SeoCopy> = {
  ...CORE_BENGALI_SEO_COPY,
};

/**
 * Hand-written Bengali copy for a path (English base path or /bn path),
 * or null when the route has none. Consumers use this BEFORE any generated
 * fallback so the prerendered HTML and the client-rendered <title> agree.
 */
export function getBengaliSeoCopy(path: string): SeoCopy | null {
  const key = stripLocalePrefix(path);
  const scheduled = SCHEDULED_BLOG_SEO_COPY[key]?.bn;
  if (scheduled?.title && scheduled.description) {
    return { title: scheduled.title, description: scheduled.description };
  }
  return BENGALI_SEO_COPY[key] ?? null;
}

/**
 * Keep generated fallback metadata concise while preserving its source wording.
 *
 * `locale` selects the copy table: English uses PRIORITY_SEO_COPY, while Bengali
 * uses BENGALI_SEO_COPY and falls back to caller-provided Bengali metadata where
 * no hand-written override exists. A Bengali call must never return English copy —
 * a bn-BD page advertising English metadata is exactly the mismatch the
 * /bn rollout exists to remove.
 */
export function getSeoCopy(
  path: string,
  title: string,
  description: string,
  locale: "en" | "bn" = "en"
): SeoCopy {
  const key = stripLocalePrefix(path);
  const scheduledCopy = SCHEDULED_BLOG_SEO_COPY[key]?.[locale];
  const generatedCopy = {
    title: scheduledCopy?.title ?? compactTitle(title),
    description: scheduledCopy?.description ?? compactDescription(description),
  };
  if (locale === "bn") {
    return BENGALI_SEO_COPY[key] ?? generatedCopy;
  }
  const priorityCopy = PRIORITY_SEO_COPY[key];
  if (priorityCopy) return priorityCopy;
  return generatedCopy;
}
