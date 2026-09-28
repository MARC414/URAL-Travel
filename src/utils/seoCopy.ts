export interface SeoCopy {
  title: string;
  description: string;
}

/**
 * First-pass search copy for priority URLs. These are intent hypotheses based on
 * the site's existing content, not claims about measured search volume or rank.
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
  "/hotels": {
    title: "Hotel Area Guides for Bangladesh Travelers | URAL",
    description:
      "Explore hotel neighborhoods and stay-planning guides for popular destinations, with practical notes on location, transport and BDT budgets.",
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
};

function normalizePath(path: string): string {
  const pathOnly = path.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${pathOnly.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

function trimAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, Math.max(1, maxLength - 1));
  const boundary = candidate.lastIndexOf(" ");
  const clipped = boundary > maxLength * 0.6 ? candidate.slice(0, boundary) : candidate;
  return `${clipped.trimEnd()}…`;
}

function compactTitle(title: string): string {
  const suffix = " | URAL";
  const withoutBrand = title
    .replace(/\s*\|\s*URAL(?:\s+Travel)?(?:\s+Blog)?\s*$/i, "")
    .trim();
  return `${trimAtWord(withoutBrand, 60 - suffix.length)}${suffix}`;
}

function compactDescription(description: string): string {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;

  const sentenceEnd = normalized.lastIndexOf(". ", 157);
  if (sentenceEnd >= 80) return normalized.slice(0, sentenceEnd + 1);
  return trimAtWord(normalized, 160);
}

/** Keep generated fallback metadata concise while preserving its source wording. */
export function getSeoCopy(path: string, title: string, description: string): SeoCopy {
  const priorityCopy = PRIORITY_SEO_COPY[normalizePath(path)];
  if (priorityCopy) return priorityCopy;
  return {
    title: compactTitle(title),
    description: compactDescription(description),
  };
}
