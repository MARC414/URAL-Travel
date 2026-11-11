export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaQuestion {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface FaqPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: SchemaQuestion[];
  url?: string;
  name?: string;
  description?: string;
}

interface RouteFaqEntry {
  id: string;
  faqs: FAQItem[];
  to?: string;
  from?: string;
  city?: string;
  country?: string;
}

/**
 * Curated Landing Page FAQs for each core vertical when a user is browsing
 * the main section overview (/flights, /hotels, /visa, /costs).
 */
export const LANDING_FLIGHT_FAQS: FAQItem[] = [
  {
    question: "What are the cheapest international flight destinations from Dhaka?",
    answer: "The routes usually compared first from Hazrat Shahjalal International Airport (DAC) are Kolkata, Kathmandu (Nepal), Bangkok (Thailand), and Kuala Lumpur (Malaysia). No fixed fare is published here: compare live totals for your own dates and check baggage, transit and change conditions, because a low headline price can exclude costs that apply to your itinerary."
  },
  {
    question: "Which airlines fly direct international routes from Dhaka?",
    answer: "Biman Bangladesh Airlines, US-Bangla Airlines, Himalaya Airlines, Thai Airways, AirAsia, Malaysia Airlines, Emirates, Flydubai, and Air Arabia operate direct scheduled flights from Dhaka to popular outbound destinations across South Asia, Southeast Asia, and the Middle East."
  },
  {
    question: "How early should Bangladeshi travelers book flights to get the best prices?",
    answer: "For short-haul Asian destinations (Nepal, Thailand, Malaysia), the optimal booking window is 4 to 8 weeks before departure. For peak seasons like Eid holidays, Puja vacations, or December winter break, booking 8 to 12 weeks ahead is strongly advised to avoid last-minute fare spikes."
  },
  {
    question: "Can I pay for international flight tickets with a local Bangladeshi debit or credit card?",
    answer: "Yes. Domestic travel agencies and online portals accept local BDT debit cards, bKash, and Nagad. If purchasing directly from international airline websites, your credit card must have foreign currency endorsement (dual currency) enabled by your bank under your passport travel quota."
  },
  {
    question: "What documents must I present at Dhaka airport immigration for international travel?",
    answer: "You must have a Bangladeshi passport valid for at least 6 months, a confirmed roundtrip flight ticket, a valid visa (or proof of Visa on Arrival eligibility), hotel booking vouchers, and foreign currency (either cash or endorsed international credit cards) as required by immigration guidelines."
  }
];

export const LANDING_HOTEL_FAQS: FAQItem[] = [
  {
    question: "Can I book an international hotel without a credit card?",
    answer: "Payment options vary by property and booking platform. Check the current listing for accepted payment methods, any card guarantee or deposit, and when payment is due. Do not assume that a property will accept BDT or allow payment on arrival unless the booking terms confirm it.",
  },
  {
    question: "How should I choose a hotel area in a city?",
    answer: "Compare the exact property location with your itinerary, transport needs, preferred pace and room requirements. Check current maps and recent property details; a neighborhood name alone does not establish travel time, availability or suitability.",
  },
  {
    question: "Are hotel taxes and service charges included in the displayed rate?",
    answer: "It depends on the property and booking channel. Review the current checkout breakdown for taxes, service charges, meals, deposits and any amount payable at the property before confirming.",
  },
  {
    question: "Can I pay for an overseas hotel with a Bangladeshi bank card?",
    answer: "Card acceptance and foreign-currency payment depend on the issuer, card settings, merchant and booking platform. Check endorsement, online and international transaction settings with your bank, and confirm the provider's accepted payment methods before relying on the card.",
  },
];

export const LANDING_VISA_FAQS: FAQItem[] = [
  {
    question: "Which countries offer Visa on Arrival or Free Visa entry for Bangladeshi passport holders?",
    answer: "Bangladeshi citizens can obtain a free 30-day SAARC gratis Visa on Arrival in Nepal for their first visit of each calendar year. Other destinations like the Maldives, Seychelles, and Bolivia provide Visa on Arrival or entry permits, while Kenya and Sri Lanka offer straightforward online eVisa/eTA facilities."
  },
  {
    question: "What is the standard bank balance requirement for tourist visa applications from Bangladesh?",
    answer: "There is no universal balance requirement; it varies by destination, visa category, and mission. The Royal Thai Embassy Dhaka's public Tourist Visa TR checklist, last updated November 30, 2022, lists BDT 60,000 per person or BDT 120,000 per family with six-month statements and a solvency certificate, while the general Thai e-Visa page may show different financial evidence. Check the live, destination-specific portal before applying."
  },
  {
    question: "How long before travel should Bangladeshi citizens apply for a tourist visa?",
    answer: "Apply well ahead of departure and use the current portal and mission instructions for timing. Thai e-Visa decisions and processing times are not guaranteed and may vary by application; use the live portal and mission notices for current guidance."
  },
  {
    question: "Can first-time Bangladeshi international travelers easily get tourist visas for Nepal and Thailand?",
    answer: "Nepal may offer eligible Bangladeshi travelers a first-entry SAARC gratis visa on arrival under current rules. Thailand requires an advance Tourist e-Visa application; follow the live Dhaka mission checklist, submit genuine supporting documents, and remember that approval is never guaranteed."
  }
];

export const LANDING_COST_FAQS: FAQItem[] = [
  {
    question: "How do I calculate the cost of an international trip?",
    answer: "Collect quotes for your exact dates, party and room occupancy. Add return flights, all hotel nights, meals, local transport, activities, visa and insurance charges, other fees and a reserve. The Trip Cost Estimator totals your dated entries and identifies missing costs."
  },
  {
    question: "Which destinations do these budget guides cover?",
    answer: "Nepal, Thailand, Malaysia, Dubai in the UAE, Singapore and the Maldives. Each guide explains which costs to quote and how to count them; use your own departure airport and travel dates."
  },
  {
    question: "How should I plan travel payments from Bangladesh?",
    answer: "Use the banking and endorsement guide, then confirm current limits, international card activation, payment options and fees with your Authorized Dealer bank. Choose cash and card arrangements for the providers and places on your actual itinerary."
  },
  {
    question: "How can I compare two trip budgets fairly?",
    answer: "Use the same dates, party, baggage, room occupancy, taxes and inclusions. Price transfers and child/infant fares explicitly. A lower headline price is not evidence of a cheaper complete trip."
  }
];

export const LANDING_DESTINATION_FAQS: FAQItem[] = [
  {
    question: "What are the best international holiday destinations for first-time Bangladeshi travelers?",
    answer: "Nepal may offer eligible Bangladeshi travelers a first-entry SAARC gratis visa on arrival under current rules. Thailand offers shopping and food destinations, but Bangladeshi citizens need an advance Tourist e-Visa and should verify the live Dhaka mission requirements before travel."
  },
  {
    question: "How long should a standard international vacation be from Dhaka?",
    answer: "A 4-to-6 day itinerary is ideal for short-haul destinations like Nepal (Kathmandu + Pokhara), Thailand (Bangkok + Pattaya), or Malaysia (Kuala Lumpur + Genting Highlands). For Dubai or multi-city travel, 6 to 8 days allows comfortable sightseeing without rushing."
  },
  {
    question: "Do Bangladeshi tourists need a guided group tour or can they travel independently?",
    answer: "Independent travel is completely safe and straightforward in Nepal, Thailand, Malaysia, and Dubai. Public transit (BTS, MRT, Dubai Metro), ride-hailing apps (Grab, Pathao, Careem), and online booking tools make independent itineraries easy to manage at half the cost of group package tours."
  },
  {
    question: "Which months are optimal for budget-friendly international vacations from Bangladesh?",
    answer: "Shoulder months such as September, October (post-monsoon), February, and May typically offer the lowest flight fares from Dhaka and discounted hotel rates abroad, while avoiding peak holiday surcharges."
  }
];

export const SERVICE_TOOLS_FAQS: FAQItem[] = [
  {
    question: "How accurate are the travel currency exchange rates on URAL?",
    answer: "The converter uses ExchangeRate API’s daily reference rates and shows the provider’s update date. These are for planning, not transactions; your bank or payment provider may apply a different rate and fees. A cached rate is labelled, and conversions stop when its allowed age expires."
  },
  {
    question: "Does the Trip Cost Estimator use current supplier prices?",
    answer: "You enter your own supplier quotes and spending allowances, together with their sources and checked date. The estimator handles adults, children, infants, room-nights and daily costs separately. Flight-search links help you collect current quotes."
  },
  {
    question: "What happens if exchange rates are unavailable?",
    answer: "BDT inputs remain usable. The budget tools show BDT with an explanation when USD conversion is unavailable; they never substitute an invented exchange rate."
  },
  {
    question: "Does URAL save my budget quotes?",
    answer: "The worksheets keep amounts and quote notes only in the current page session. They are not saved or submitted, and refreshing the page clears them. Keep your original supplier quotes separately."
  }
];

export const SERVICE_CONTACT_FAQS: FAQItem[] = [
  {
    question: "How does URAL help Bangladeshi travellers with flight and visa questions?",
    answer: "URAL answers travel questions directly on phone and WhatsApp at +8801784385335: how a route works, what an airline's baggage allowance is, which official portal issues a visa, and what documents that portal asks for. URAL does not book tickets and does not submit visa applications."
  },
  {
        question: "Can I ask URAL about my own trip?",
        answer: "Yes. Send your route, dates and question on WhatsApp at +8801784385335 or through the contact form, and you get a reply with the relevant guide, the official source and the current conditions. URAL is an information and consultation channel; the booking or application itself is completed with the official portal or the provider."
  },
  {
    question: "How does the WhatsApp Flight Price Alert service work?",
    answer: "The price-alert form prepares a WhatsApp message with your route, travel window and budget target and sends it to URAL. It does not track fares automatically: you get a reply with current fare guidance and the official search link, and you confirm the live price yourself."
  },
  {
    question: "What is the response time for WhatsApp and telephone support?",
    answer: "Our WhatsApp helpline (+8801784385335) typically responds within 15 to 30 minutes during standard Dhaka business hours (9:00 AM to 9:00 PM BST). Emergency queries for next-day flights receive prioritized callbacks."
  }
];

export const SERVICE_TRAVEL_SERVICES_FAQS: FAQItem[] = [
  {
    question: "How do pre-booked airport transfers work at international airports like BKK, KTM, and DXB?",
    answer: "Through KiwiTaxi and verified partners, your driver tracks your flight arrival time and waits in the airport arrival hall with a personalized name sign. This eliminates taxi negotiation stress, late-night transit scams, and local language barriers."
  },
  {
    question: "How should Bangladeshi travelers compare Klook attraction tickets and tours before booking?",
    answer: "Klook lists activities such as Sarangkot sunrise tours, Chao Phraya dinner cruises, Genting Awana cable cars, and Burj Khalifa visits. Compare the selected date's checkout total, inclusions, entry instructions, cancellation terms, and payment options with the operator or other sellers. Prices and conditions vary by listing; no universal discount or queue-skip promise applies."
  },
  {
    question: "Is an International Driving Permit (IDP) required to rent a car abroad through Qeeq?",
    answer: "Yes, to legally rent and drive a car in Malaysia, Thailand, or the UAE, Bangladeshi citizens must carry a valid International Driving Permit (IDP) issued by the Automobile Association of Bangladesh (AAB) alongside their original BRTA driving license."
  },
  {
    question: "How does an Airalo travel eSIM work for outbound travelers from Dhaka?",
    answer: "An eSIM is installed digitally via QR code on compatible iPhone and Android smartphones before departure. Upon landing in Kathmandu, Bangkok, Kuala Lumpur, or Dubai, your phone connects immediately to high-speed 4G/5G local networks without swapping physical SIM cards or paying high international roaming charges."
  }
];

export const PRE_DEPARTURE_SITEMAP_FAQS: FAQItem[] = [
  {
    question: "What documents are required at Dhaka Airport (DAC) outbound immigration for Bangladeshi travelers?",
    answer: "Outbound passengers departing Hazrat Shahjalal International Airport (DAC) must present an original Bangladeshi passport with at least 6 months validity beyond the return date, a printed two-way return flight ticket, confirmed hotel booking vouchers, a valid visa or e-Visa printout, profession proof (private office NOC + ID card, government GO, Trade License copy, or Student ID), and endorsed foreign currency (an active dual-currency bank card stamped under the $18,000 annual travel quota per FE Circular 33 and/or USD cash)."
  },
  {
    question: "How many hours before an international flight should I arrive at Dhaka Airport (DAC)?",
    answer: "International passengers departing from Hazrat Shahjalal International Airport (DAC Terminal 1, Terminal 2, or Terminal 3) should arrive 3.5 to 4 hours before scheduled departure to allow sufficient time for terminal entry security, airline check-in and document verification, outbound immigration queues, and boarding gate security."
  },
  {
    question: "What are the power bank, battery, and cabin baggage rules at Dhaka Airport?",
    answer: "Standard cabin hand carry is strictly capped at 7 kg across airlines operating from Dhaka, with liquids, aerosols, and gels restricted to containers of 100ml or less. Lithium-ion power banks up to 20,000 mAh (100Wh) and spare batteries must be packed in hand luggage only—never in checked baggage—and must have a clearly legible mAh capacity rating printed on the body."
  },
  {
    question: "How much foreign currency and gold can a Bangladeshi traveler carry through Dhaka Airport customs?",
    answer: "Adult Bangladeshi passport holders can endorse up to USD $18,000 per calendar year under the Bangladesh Bank private travel quota (FEPD-1 Circular No. 33) across a dual-currency Visa/Mastercard and cash USD notes. Returning passengers may bring up to 100 grams of personal gold ornaments and up to 2 mobile phones duty-free through the DAC Green Channel."
  },
  {
    question: "What is the Zamzam water allowance for Bangladeshi Umrah and Hajj pilgrims returning to Dhaka?",
    answer: "Pilgrims returning from Jeddah (JED) or Madinah (MED) on Biman Bangladesh Airlines, Saudia, or scheduled carriers with a valid Umrah or Hajj visa are entitled to carry 1 official airport-sealed 5-liter carton of Zamzam water free of charge in addition to their standard checked baggage allowance."
  },
  {
    question: "Which destinations require a free online Digital Arrival Card within 72 hours before flying from Dhaka?",
    answer: "Before boarding at Dhaka Airport (DAC), travelers must submit official free digital arrival declarations within 72 hours of departure for Malaysia (MDAC), Singapore (SGAC via MyICA), the Maldives (IMUGA Traveller Declaration), and Thailand (TDAC), while Umrah pilgrims must register on the Saudi Visa Bio and Nusuk apps."
  },
  {
    question: "What should a Bangladeshi citizen do if their passport is lost or stolen while traveling abroad?",
    answer: "If your Bangladeshi passport is lost or stolen abroad, immediately file a local Police Report (GD) at the nearest police station and visit the Bangladesh Embassy or High Commission in Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé, Abu Dhabi/Dubai, or Riyadh/Jeddah with a copy of your lost passport and NID to receive an Emergency Travel Permit (Travel Pass) to fly back to Dhaka."
  }
];

/**
 * Cleans plain text for Schema.org JSON-LD (removes HTML tags, trims whitespace).
 */
function cleanSchemaText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/\s+/g, " ")      // Normalize spaces
    .trim();
}

/**
 * Universal helper function to generate Schema.org FAQPage structured data
 * from an array of FAQ items.
 *
 * Conforms strictly to Google Search Central and Schema.org FAQPage specification.
 *
 * @param faqs Array of question-answer pairs
 * @param options Optional metadata (page URL, custom name, description)
 * @returns Schema.org FAQPage JSON-LD object, or null if faqs array is empty
 */
export function generateFaqSchema(
  faqs: FAQItem[] | undefined | null,
  options?: { url?: string; name?: string; description?: string }
): FaqPageSchema | null {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const validQuestions: SchemaQuestion[] = faqs
    .filter((f) => f && typeof f.question === "string" && typeof f.answer === "string")
    .map((f) => ({
      "@type": "Question" as const,
      name: cleanSchemaText(f.question),
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: cleanSchemaText(f.answer),
      },
    }))
    .filter((q) => q.name.length > 0 && q.acceptedAnswer.text.length > 0);

  if (validQuestions.length === 0) {
    return null;
  }

  const schema: FaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validQuestions,
  };

  if (options?.url) schema.url = options.url;
  if (options?.name) schema.name = options.name;
  if (options?.description) schema.description = options.description;

  return schema;
}

/**
 * Page-specific helper function that automatically resolves the appropriate FAQ list
 * for each core page (Flight, Hotel, Visa, Cost, Destinations) whether on an index/landing
 * view or a specific route/city/country detail view, and generates its Schema.org FAQPage markup.
 *
 * @param page The travel vertical: 'flights' | 'hotels' | 'visa' | 'costs' | 'destinations'
 * @param parameterId The specific route/city/country id, e.g. 'dhaka-kathmandu', 'nepal-visa'
 * @param isLanding Whether this is the top-level section landing page
 * @param pageUrl Optional canonical URL of the page
 * @param routeItems Route-specific FAQ entries for detail pages
 */
export function getFaqSchemaForPage(
  page: "flights" | "hotels" | "visa" | "costs" | "destinations" | "tools" | "contact" | "services" | "sitemap" | "pre-departure",
  parameterId?: string,
  isLanding?: boolean,
  pageUrl?: string,
  routeItems?: readonly RouteFaqEntry[]
): FaqPageSchema | null {
  let faqs: FAQItem[] = [];
  let pageName = "";

  switch (page) {
    case "flights": {
      if (isLanding || !parameterId) {
        faqs = LANDING_FLIGHT_FAQS;
        pageName = "Flights from Dhaka - Frequently Asked Questions";
      } else {
        const route = routeItems?.find((r) => r.id === parameterId) || routeItems?.[0];
        if (!route) return null;
        faqs = route.faqs;
        pageName = `${route.from?.split(" (")[0] ?? "Dhaka"} to ${route.to ?? "Destination"} Flight Guide FAQs`;
      }
      break;
    }

    case "hotels": {
      if (isLanding || !parameterId) {
        faqs = LANDING_HOTEL_FAQS;
        pageName = "International Hotel Guides for Bangladeshi Travelers FAQs";
      } else {
        const hotel = routeItems?.find((h) => h.id === parameterId) || routeItems?.[0];
        if (!hotel) return null;
        faqs = hotel.faqs;
        pageName = `${hotel.city ?? "City"} Hotels & Neighborhood Guide FAQs`;
      }
      break;
    }

    case "visa": {
      if (isLanding || !parameterId) {
        faqs = LANDING_VISA_FAQS;
        pageName = "Visa Requirements for Bangladeshi Passport Holders FAQs";
      } else {
        const visa = routeItems?.find((v) => v.id === parameterId) || routeItems?.[0];
        if (!visa) return null;
        faqs = visa.faqs;
        pageName = `${visa.country ?? "Country"} Visa Guide for Bangladeshis FAQs`;
      }
      break;
    }

    case "costs": {
      if (isLanding || !parameterId) {
        faqs = LANDING_COST_FAQS;
        pageName = "Trip Budgeting & Costs in BDT FAQs";
      } else {
        const cost = routeItems?.find((c) => c.id === parameterId) || routeItems?.[0];
        if (!cost) return null;
        faqs = cost.faqs;
        pageName = `${cost.country ?? "Country"} Travel Budget & Expenses in BDT FAQs`;
      }
      break;
    }

    case "destinations": {
      if (isLanding || !parameterId) {
        faqs = LANDING_DESTINATION_FAQS;
        pageName = "Popular Outbound Destinations from Bangladesh FAQs";
      } else {
        const destination = routeItems?.find((d) => d.id === parameterId) || routeItems?.[0];
        if (!destination) return null;
        faqs = destination.faqs;
        pageName = `${destination.country ?? "Country"} Trip Plan & Travel Itinerary FAQs`;
      }
      break;
    }

    case "tools": {
      faqs = SERVICE_TOOLS_FAQS;
      pageName = "Bangladeshi Traveler Utility Tools FAQs";
      break;
    }

    case "contact": {
      faqs = SERVICE_CONTACT_FAQS;
      pageName = "Travel Information Desk & Planning Enquiries FAQs";
      break;
    }

    case "services": {
      faqs = SERVICE_TRAVEL_SERVICES_FAQS;
      pageName = "International Travel Services (eSIM, Transfers, Activities) FAQs";
      break;
    }

    case "sitemap":
    case "pre-departure": {
      faqs = PRE_DEPARTURE_SITEMAP_FAQS;
      pageName = "Dhaka Airport (DAC) Pre-Departure Readiness, Baggage & Embassy Emergency Hub FAQs";
      break;
    }

    default:
      return null;
  }

  return generateFaqSchema(faqs, {
    url: pageUrl,
    name: pageName,
  });
}
