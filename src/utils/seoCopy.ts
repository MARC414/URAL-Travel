export interface SeoCopy {
  title: string;
  description: string;
}

/**
 * First-pass search copy for all 83 canonical URLs. These are intent hypotheses
 * based on the site's existing content, not claims about measured search volume or rank.
 */
export const PRIORITY_SEO_COPY: Record<string, SeoCopy> = {
  "/": {
    title: "Bangladesh Travel Guides, Flights & Visas from Dhaka | URAL",
    description:
      "Plan travel from Dhaka with BDT flight guidance, visa checklists for Bangladeshi passport holders, destination itineraries and practical trip-budget guides.",
  },
  "/umrah": {
    title: "Umrah Cost from Bangladesh: DIY Guide & Nusuk | URAL",
    description:
      "Plan Umrah from Dhaka with a BDT cost framework, Saudi visa and Nusuk guidance, Makkah–Madinah travel options, and a practical preparation checklist.",
  },
  "/flights": {
    title: "Flights from Dhaka: Routes, Fares & Airlines | URAL",
    description:
      "Compare popular flights from Dhaka by route, airline, duration and BDT fare guidance. Find practical planning tips for Bangladeshi travelers.",
  },
  "/flights/dhaka-kathmandu": {
    title: "Dhaka to Kathmandu Flights: Price & Route Guide | URAL",
    description:
      "Compare Dhaka–Kathmandu flight options, journey times and BDT fare guidance. See practical booking tips for Bangladeshi travelers planning a Nepal trip.",
  },
  "/flights/dhaka-bangkok": {
    title: "Dhaka to Bangkok Flights: Fares, Airlines & Tips | URAL",
    description:
      "Compare Dhaka to Bangkok flights across BKK and DMK airports, direct airlines, 2h 30m flight time and BDT roundtrip fare guidance for Bangladesh travelers.",
  },
  "/flights/dhaka-kuala-lumpur": {
    title: "Dhaka to Kuala Lumpur Flights: Price & Airlines | URAL",
    description:
      "Compare direct Dhaka to Kuala Lumpur (KUL) flights, 3h 50m duration, budget vs full-service airlines and BDT roundtrip fare ranges from Bangladesh.",
  },
  "/flights/dhaka-dubai": {
    title: "Dhaka to Dubai Flights: BDT Fares & Airlines | URAL",
    description:
      "Compare direct and connecting Dhaka to Dubai (DXB) flights, 4h 45m flight time, operating airlines and BDT roundtrip fare guidance for Bangladeshi travelers.",
  },
  "/flights/dhaka-singapore": {
    title: "Dhaka to Singapore Flights: Airlines & BDT Fares | URAL",
    description:
      "Compare direct Dhaka to Singapore (SIN) flights, 4h 15m journey time, Biman, US-Bangla and Singapore Airlines options, and BDT roundtrip fare guidance.",
  },
  "/flights/dhaka-maldives": {
    title: "Dhaka to Maldives Flights: Direct & Transit Fares | URAL",
    description:
      "Compare Dhaka to Malé (MLE) direct and Colombo-transit flights, journey times, operating airlines and BDT fare guidance for Bangladeshi travelers.",
  },
  "/hotels": {
    title: "Hotel Area Guides for Bangladesh Travelers | URAL",
    description:
      "Explore hotel neighborhoods and stay-planning guides for popular destinations, with practical notes on location, transport and BDT budgets.",
  },
  "/hotels/kathmandu-hotels": {
    title: "Where to Stay in Kathmandu: Thamel & Area Guide | URAL",
    description:
      "Compare Kathmandu hotel areas for Bangladeshi travelers, including Thamel for budget stays, Lazimpat for quieter comfort and Boudha, with BDT rate guidance.",
  },
  "/hotels/bangkok-hotels": {
    title: "Where to Stay in Bangkok: Best Areas & BDT Guide | URAL",
    description:
      "Compare Bangkok hotel neighborhoods for Bangladeshi travelers, including Pratunam for shopping, Sukhumvit near Bumrungrad and Riverside, with BDT rates.",
  },
  "/hotels/kuala-lumpur-hotels": {
    title: "Where to Stay in Kuala Lumpur: KLCC & Bukit Bintang | URAL",
    description:
      "Compare Kuala Lumpur hotel areas for Bangladeshi families, including Bukit Bintang, KLCC serviced suites and KL Sentral transit hubs, with BDT rate ranges.",
  },
  "/hotels/dubai-hotels": {
    title: "Where to Stay in Dubai: Deira, Downtown & Marina | URAL",
    description:
      "Compare Dubai hotel neighborhoods for Bangladeshi travelers: Deira and Bur Dubai for budget metro access and halal dining, or Downtown and Marina for luxury.",
  },
  "/hotels/singapore-hotels": {
    title: "Where to Stay in Singapore: Little India & Bugis | URAL",
    description:
      "Compare Singapore hotel areas for Bangladeshi travelers, including Little India near Mustafa Centre, Bugis and Marina Bay, with MRT and BDT budget notes.",
  },
  "/hotels/maldives-hotels": {
    title: "Where to Stay in Maldives: Maafushi & Hulhumalé | URAL",
    description:
      "Compare affordable Maldives stays on Maafushi and Hulhumalé local islands versus private resorts, with speedboat transfer and BDT nightly rate guidance.",
  },
  "/visa": {
    title: "Visa Guides for Bangladeshi Citizens | URAL",
    description:
      "Browse visa checklists for Bangladeshi passport holders, including entry processes, official links, documents and destination-specific planning notes.",
  },
  "/visa/nepal-visa": {
    title: "Nepal Visa for Bangladeshi Citizens | URAL",
    description:
      "Review Nepal visa-on-arrival guidance for Bangladeshi passport holders, including eligibility, documents, stay limits and repeat-visit checks.",
  },
  "/visa/thailand-visa": {
    title: "Thailand Visa from Bangladesh: Process & Documents | URAL",
    description:
      "Explore Thailand visa planning from Bangladesh: application route, documents and financial evidence. Check current arrival requirements before applying.",
  },
  "/visa/malaysia-visa": {
    title: "Malaysia Visa from Bangladesh: eVisa & MDAC | URAL",
    description:
      "Explore Malaysia visa guidance for Bangladeshi travelers, including eVisa application planning, document checklist and Malaysia Digital Arrival Card basics.",
  },
  "/visa/dubai-visa": {
    title: "Dubai & UAE Visa from Bangladesh: Tourist eVisa | URAL",
    description:
      "Review UAE and Dubai tourist visa planning for Bangladeshi passport holders, including authorized sponsors, required documents, BDT fees and processing times.",
  },
  "/visa/singapore-visa": {
    title: "Singapore Visa from Bangladesh: Documents & Process | URAL",
    description:
      "Review Singapore tourist visa requirements for Bangladeshi citizens, including authorized visa agents in Dhaka, Form V39A LOI rules, SG Arrival Card and fees.",
  },
  "/visa/maldives-visa": {
    title: "Maldives Visa for Bangladeshi Citizens: VOA & IMUGA | URAL",
    description:
      "Review Maldives tourist entry rules for Bangladeshi passport holders, including visa on arrival requirements, hotel voucher checks and the free IMUGA form.",
  },
  "/destinations": {
    title: "Trip Itineraries from Bangladesh | URAL",
    description:
      "Browse trip itineraries for Nepal, Thailand, Malaysia and more, with practical day plans for travelers departing from Bangladesh.",
  },
  "/destinations/nepal-guide": {
    title: "Nepal 5-Day Itinerary from Bangladesh | URAL",
    description:
      "Plan a 5-day Kathmandu and Pokhara itinerary from Bangladesh, with route ideas, local transport notes and a BDT budget framework.",
  },
  "/destinations/thailand-guide": {
    title: "Bangkok Itinerary from Bangladesh: 4-Day Guide | URAL",
    description:
      "Plan a Bangkok trip from Bangladesh with a day-by-day route, temple and market stops, local transport notes and BDT budget context.",
  },
  "/destinations/malaysia-guide": {
    title: "Kuala Lumpur Itinerary from Bangladesh | URAL",
    description:
      "Plan a Kuala Lumpur trip from Bangladesh with a day-by-day route, city sights, transport options and BDT budget context.",
  },
  "/destinations/dubai-guide": {
    title: "Dubai Itinerary from Bangladesh: 4-Day Guide | URAL",
    description:
      "Plan a Dubai trip from Bangladesh with a four-day route, creek and souk visits, metro notes, a desert-safari option and BDT budget context.",
  },
  "/destinations/singapore-guide": {
    title: "Singapore 4-Day Itinerary from Bangladesh | URAL",
    description:
      "Plan four days in Singapore with a day-by-day route, MRT guidance, major attractions, halal-food areas and BDT budget context for Bangladesh travelers.",
  },
  "/destinations/maldives-guide": {
    title: "Maldives 5-Day Itinerary from Bangladesh | URAL",
    description:
      "Plan a five-day Maldives trip with Maafushi and Hulhumalé stops, transfer options, island activities and local-cost context for Bangladesh travelers.",
  },
  "/costs": {
    title: "Trip Costs from Bangladesh: BDT Travel Budgets | URAL",
    description:
      "Explore BDT-based trip-budget guides for popular destinations, with flight, accommodation and local-transport categories to help plan from Bangladesh.",
  },
  "/costs/nepal-costs": {
    title: "Nepal Trip Cost from Bangladesh: BDT Budget | URAL",
    description:
      "Estimate a Nepal trip budget from Bangladesh in BDT. Review flight, lodging, transport and daily-spend categories before building your itinerary.",
  },
  "/costs/thailand-costs": {
    title: "Thailand Trip Cost from Bangladesh: BDT Budget | URAL",
    description:
      "Estimate a 5-day Thailand trip cost from Bangladesh in BDT, covering Dhaka–Bangkok flights, e-Visa fees, hotels, halal meals, transport and sightseeing.",
  },
  "/costs/malaysia-costs": {
    title: "Malaysia Trip Cost from Bangladesh: BDT Budget | URAL",
    description:
      "Estimate a 5-day Malaysia trip budget from Bangladesh in BDT, with low, mid-range and luxury estimates for flights, Kuala Lumpur hotels, food and transit.",
  },
  "/costs/dubai-costs": {
    title: "Dubai Trip Cost from Bangladesh: 5-Day BDT Budget | URAL",
    description:
      "Estimate a 5-day Dubai trip cost from Bangladesh in BDT, including Dhaka–DXB flights, UAE tourist visa fees, Deira or Downtown hotels, metro and activities.",
  },
  "/costs/singapore-costs": {
    title: "Singapore Trip Cost from Bangladesh: BDT Budget | URAL",
    description:
      "Estimate a 4-day Singapore trip budget from Bangladesh in BDT, covering flights from Dhaka, visa fees, Little India or Bugis hotels, MRT and Sentosa tickets.",
  },
  "/costs/maldives-costs": {
    title: "Maldives Trip Cost from Bangladesh: BDT Budget | URAL",
    description:
      "Estimate a 5-day Maldives trip cost from Bangladesh in BDT, comparing budget Maafushi guesthouses and speedboat transfers with private island resort stays.",
  },
  "/experiences": {
    title: "Attraction & Activity Guides for Bangladesh Travelers | URAL",
    description:
      "Plan activities and attraction visits abroad with practical links and guides for travelers departing from Bangladesh.",
  },
  "/tools": {
    title: "Travel Planning Tools for Bangladesh Travelers | URAL",
    description:
      "Use practical travel-planning tools for Bangladeshi travelers, including currency conversion, packing and pre-departure checks.",
  },
  "/sitemap": {
    title: "Dhaka Airport Departure Checklist & Site Directory | URAL",
    description:
      "Review a practical departure checklist for Dhaka Airport, baggage-planning notes, overseas Bangladesh embassy contacts and links to URAL travel guides.",
  },
  "/contact": {
    title: "Contact URAL Travel Support in Dhaka | URAL",
    description:
      "Contact URAL's Dhaka support desk about flight planning, visa checklists, Umrah preparation or travel questions for Bangladeshi travelers.",
  },
  "/blog": {
    title: "Bangladesh Travel Blog: Visa, Umrah & BDT Guides | URAL",
    description:
      "Read practical travel guides for Bangladeshi travelers, covering visas, flights from Dhaka, Umrah planning, BDT budgets and destination itineraries.",
  },
  "/blog/cheap-flight-booking-hacks-dhaka": {
    title: "Cheap Flights from Dhaka: Booking Tips | URAL",
    description:
      "Learn how to compare flight options from Dhaka, choose flexible dates, review baggage costs and use fare alerts when planning a budget trip.",
  },
  "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    title: "DIY Umrah from Bangladesh: Cost, Visa & Nusuk | URAL",
    description:
      "Plan independent Umrah from Dhaka with a BDT budget framework, Saudi visa considerations, Nusuk steps and a practical Makkah–Madinah itinerary.",
  },
  "/blog/hajj-registration-bangladesh-government-vs-private-package-cost": {
    title: "Hajj Registration in Bangladesh: Process & Packages | URAL",
    description:
      "Review Bangladesh Hajj registration steps, the official portal and package-planning considerations. Confirm current-season instructions with the ministry.",
  },
  "/blog/dual-currency-card-endorsement-bangladesh": {
    title: "Dual-Currency Card Endorsement in Bangladesh | URAL",
    description:
      "Learn how foreign-currency endorsement works for Bangladeshi travelers, what to ask your bank and how to prepare a card for overseas payments.",
  },
  "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    title: "Thailand Visa from Bangladesh: Documents & Process | URAL",
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
    title: "Bangladesh e-Passport Renewal: Process & Fees | URAL",
    description:
      "Review Bangladesh e-passport application and renewal steps, required documents and official guidance before booking international travel.",
  },
  "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    title: "Flight Delays & Baggage Claims: Passenger Guide | URAL",
    description:
      "Understand which passenger-rights rules may apply to delays, cancellations or baggage issues, and what records to keep when seeking assistance.",
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
    title: "How to Save on Hotels in Bangkok, KL & Dubai | URAL",
    description:
      "Cut hotel costs by 30–40% in Bangkok, Kuala Lumpur and Dubai with transit-friendly neighborhood picks, serviced apartments and BDT booking tips.",
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
      "Compare flat, wheelchair-accessible Makkah and Madinah hotel streets near the Haram and learn how to book Haramain High-Speed Bullet Train tickets.",
  },
  "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    title: "Umrah with Elderly Parents: Wheelchair & Hotel Guide | URAL",
    description:
      "Plan a smooth Umrah from Bangladesh with elderly parents: airline wheelchair requests, flat-street Makkah and Madinah hotels, electric carts and medical tips.",
  },
  "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    title: "96-Hour Saudi Stopover Visa for Bangladeshis | URAL",
    description:
      "Learn how Bangladeshi travelers flying Saudia or Flynas can book a 96-hour Saudi Stopover Visa to perform Umrah and visit Madinah during transit.",
  },
  "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    title: "Nusuk App & Saudi Visa Bio Guide for Bangladesh | URAL",
    description:
      "Step-by-step guide for Bangladeshi pilgrims to complete Saudi Visa Bio fingerprint enrollment and book Umrah and Rawdah Shareef permits on the Nusuk app.",
  },
  "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    title: "Umrah Rules for Bangladeshi Women: Visa & Gates | URAL",
    description:
      "Review Saudi Umrah visa rules for Bangladeshi women, Madinah Ladies' Prayer Gates 25–29 for Rawdah access, abaya guidelines and travel safety tips.",
  },
  "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    title: "Dhaka to Jeddah & Madinah Open-Jaw Flight Guide | URAL",
    description:
      "Save 5–6 hours of highway travel on Umrah by booking a Multi-City (Open-Jaw) ticket into Jeddah and out of Madinah on Biman, Saudia or Gulf carriers.",
  },
  "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    title: "Ramadan Umrah & I'tikaf Guide from Bangladesh | URAL",
    description:
      "Plan Ramadan Umrah and Last 10 Days I'tikaf from Bangladesh with early booking timelines, shuttle hotel savings, Suhoor/Iftar tips and BDT budgets.",
  },
  "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    title: "Wearing Ihram from Dhaka vs Transit: Miqat Rules | URAL",
    description:
      "Know exactly where to wear Ihram and make Niyyah when flying direct from Dhaka to Jeddah versus connecting via Dubai, Doha, Abu Dhabi, Muscat or Madinah.",
  },
  "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    title: "Zamzam, Dates & Gold Customs Rules: Jeddah & Dhaka | URAL",
    description:
      "Check official airline and customs rules for bringing 5L Zamzam water, Madinah Ajwa dates and gold jewelry from Jeddah or Madinah back to Dhaka Airport.",
  },
  "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    title: "Bangladeshi Food Guide in Makkah & Madinah | URAL",
    description:
      "Find familiar Bangladeshi, Pakistani and Indian halal meals near Masjid al-Haram and Masjid an-Nabawi, with daily food budgets in SAR and BDT.",
  },
  "/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    title: "Makkah, Madinah, Badr & Taif Ziyarah Taxi Guide | URAL",
    description:
      "Plan historical Ziyarah tours in Makkah, Madinah, Badr and Taif with landmark checklists, visiting hours and private family taxi fares in SAR and BDT.",
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
      "Book skip-the-line museum and landmark passes in Paris, London, Rome and New York, plus learn how US, UK and Schengen visa holders can do Stopover Umrah.",
  },
  "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": {
    title: "Islamic Dual-Currency Cards in Bangladesh for Umrah | URAL",
    description:
      "Compare Shariah-compliant Islamic dual-currency debit and pre-paid cards in Bangladesh for booking Nusuk, Haramain trains and Makkah hotels without riba.",
  },
  "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    title: "RFCD Account vs Travel Quota in Bangladesh | URAL",
    description:
      "Understand the difference between Bangladesh Bank's $12,000 annual travel quota and RFCD accounts, and how to clear per-transaction online payment limits.",
  },
  "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": {
    title: "Book Flights & Makkah Hotels in BDT Without a Card | URAL",
    description:
      "Learn how Bangladeshi travelers without a dual-currency card can book international flights, Makkah hotels and transfers in BDT via bKash or bank transfer.",
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
    title: "Travel eSIM & Insurance Guide from Bangladesh | URAL",
    description:
      "Compare Airalo travel eSIMs with Bangladeshi roaming and review travel medical insurance options for Umrah, Southeast Asia and Schengen visa applications.",
  },
  "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    title: "Sri Lanka + Maldives 7-Day Combo Tour in BDT | URAL",
    description:
      "Combine Colombo, Kandy, Ella and Maafushi Island on one 7-day itinerary from Dhaka, with Sri Lanka ETA, Maldives VOA and a complete BDT budget breakdown.",
  },
};

function normalizePath(path: string): string {
  const pathOnly = path.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${pathOnly.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

/** Strips a leading /bn locale segment so Bengali and English keys stay aligned. */
function stripLocalePrefix(path: string): string {
  return normalizePath(path).replace(/^\/bn(?=\/|$)/, "") || "/";
}

function trimAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, Math.max(1, maxLength - 1));
  const boundary = candidate.lastIndexOf(" ");
  const clipped = boundary > maxLength * 0.6 ? candidate.slice(0, boundary) : candidate;
  return `${clipped.trimEnd()}…`;
}

/**
 * Bengali search copy for the hub / static routes. Detail routes
 * (/flights/:id, /hotels/:id, /visa/:id, /costs/:id, /blog/:slug) get theirs
 * generated from the Bengali data in src/data/bengaliContent.ts instead, because
 * their titles depend on localized route names — see getBengaliRouteSeo().
 *
 * /destinations/* deliberately has no entry yet: there is no Bengali
 * destination content, so no /bn/destinations URL is generated and its
 * hreflang cluster is withheld (see scripts/prerender.ts).
 */
export const BENGALI_SEO_COPY: Record<string, SeoCopy> = {
  "/": {
    title: "ঢাকা থেকে বিদেশ ভ্রমণ: ফ্লাইট, ভিসা ও BDT বাজেট | URAL",
    description:
      "ঢাকা (DAC) থেকে ফ্লাইটের ভাড়া, বাংলাদেশি পাসপোর্টের ভিসা চেকলিস্ট, উমরাহ প্ল্যানার ও দেশভিত্তিক ভ্রমণ বাজেট—সব বাংলায় এক জায়গায়।",
  },
  "/umrah": {
    title: "উমরাহ ও হজ গাইড: খরচ, ভিসা ও Nusuk অ্যাপ (২০২৬) | URAL",
    description:
      "বাংলাদেশ থেকে DIY উমরাহ: Saudi e-Visa, Nusuk অ্যাপ, মক্কা-মদিনা হোটেল, হারামাইন ট্রেন ও ১০ দিনের সম্পূর্ণ BDT বাজেট।",
  },
  "/flights": {
    title: "ঢাকা থেকে ফ্লাইট ভাড়া: রুট, এয়ারলাইন্স ও BDT দাম | URAL",
    description:
      "ঢাকা (DAC) থেকে নেপাল, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, মালদ্বীপ ও দুবাইয়ের ফ্লাইট—সময়, সরাসরি এয়ারলাইন্স ও রাউন্ডট্রিপ BDT ভাড়া।",
  },
  "/hotels": {
    title: "বিদেশে হোটেল গাইড: এলাকা, হালাল খাবার ও দাম | URAL",
    description:
      "কাঠমান্ডু, ব্যাংকক, কুয়ালালামপুর, দুবাই, সিঙ্গাপুর ও মালদ্বীপে বাংলাদেশি পরিবারের জন্য সেরা এলাকা, হোটেল ভাড়া ও হালাল খাবারের গাইড।",
  },
  "/visa": {
    title: "বাংলাদেশি পাসপোর্টের ভিসা গাইড ২০২৬: নিয়ম ও খরচ | URAL",
    description:
      "নেপালের ফ্রি Visa on Arrival থেকে থাইল্যান্ডের e-Visa, মালয়েশিয়া, সিঙ্গাপুর, দুবাই ও মালদ্বীপ—ধাপে ধাপে ডকুমেন্ট চেকলিস্ট ও ফি।",
  },
  "/costs": {
    title: "বিদেশ ভ্রমণের খরচ: ঢাকা থেকে BDT বাজেট গাইড | URAL",
    description:
      "৫ দিনের নেপাল, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, মালদ্বীপ ও দুবাই ভ্রমণে ফ্লাইট, হোটেল ও খাবারসহ জনপ্রতি বাস্তব BDT খরচের হিসাব।",
  },
  "/blog": {
    title: "ট্রাভেল ব্লগ: ৪১টি ব্যবহারিক গাইড (২০২৬) | URAL",
    description:
      "ভিসা, ফ্লাইট টিকিট, উমরাহ, ব্যাংকিং ও ভ্রমণ বাজেট নিয়ে ৪১টি যাচাইকৃত বাংলা গাইড—বাংলাদেশি ভ্রমণকারীদের জন্য ধাপে ধাপে নির্দেশনা।",
  },
  "/experiences": {
    title: "ট্যুর, টিকিট ও অভিজ্ঞতা বুকিং গাইড | URAL",
    description:
      "সিটি ট্যুর, থিম পার্ক, এয়ারপোর্ট ট্রান্সফার ও স্কিপ-দ্য-লাইন টিকিট—কোথা থেকে বুক করবেন এবং কত খরচ হবে তার ব্যবহারিক গাইড।",
  },
  "/tools": {
    title: "ভ্রমণ টুলস ও ক্যালকুলেটর | URAL",
    description:
      "ট্রিপ বাজেট ক্যালকুলেটর, প্যাকিং চেকলিস্ট ও প্রস্তুতির টুলস—বাংলাদেশি ভ্রমণকারীদের জন্য বিনামূল্যে ব্যবহারযোগ্য।",
  },
  "/sitemap": {
    title: "সাইটম্যাপ: সব ভ্রমণ গাইডের তালিকা | URAL",
    description:
      "URAL-এর সব ফ্লাইট, হোটেল, ভিসা, খরচ ও ব্লগ গাইডের পূর্ণ তালিকা—এক পাতায় খুঁজে নিন আপনার প্রয়োজনীয় গাইড।",
  },
  "/contact": {
    title: "যোগাযোগ ও সহায়তা | URAL",
    description:
      "ভ্রমণ পরিকল্পনা, ভিসা বা বুকিং সংক্রান্ত প্রশ্নে URAL টিমের সাথে যোগাযোগ করুন—WhatsApp ও ইমেইলে সহায়তা।",
  },
};

/**
 * Removes trailing brand suffixes ("| URAL", "| URAL Travel", "| URAL Travel Blog")
 * so H1 headings and compact title builders operate on the clean page topic.
 */
export function stripBrandSuffix(text: string): string {
  return text
    .replace(/\s*\|\s*URAL(?:\s+Travel)?(?:\s+Blog)?\s*$/i, "")
    .trim();
}

function compactTitle(title: string): string {
  const suffix = " | URAL";
  const withoutBrand = stripBrandSuffix(title);
  return `${trimAtWord(withoutBrand, 60 - suffix.length)}${suffix}`;
}

function compactDescription(description: string): string {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;

  const sentenceEnd = normalized.lastIndexOf(". ", 157);
  if (sentenceEnd >= 80) return normalized.slice(0, sentenceEnd + 1);
  return trimAtWord(normalized, 160);
}

/**
 * Keep generated fallback metadata concise while preserving its source wording.
 *
 * `locale` selects the copy table: English uses PRIORITY_SEO_COPY (all 83
 * canonical routes), Bengali uses BENGALI_SEO_COPY for hub/static routes and
 * falls back to the caller-provided (already Bengali) title/description for
 * detail routes. A Bengali call must never return the English priority copy —
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
  if (locale === "bn") {
    return (
      BENGALI_SEO_COPY[key] ?? {
        title: compactTitle(title),
        description: compactDescription(description),
      }
    );
  }
  const priorityCopy = PRIORITY_SEO_COPY[key];
  if (priorityCopy) return priorityCopy;
  return {
    title: compactTitle(title),
    description: compactDescription(description),
  };
}
