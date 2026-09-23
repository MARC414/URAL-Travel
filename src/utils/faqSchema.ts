import { FLIGHTS_DATA, HOTELS_DATA, VISA_DATA, TRIP_COSTS_DATA } from "../constants";

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

/**
 * Curated Landing Page FAQs for each core vertical when a user is browsing
 * the main section overview (/flights, /hotels, /visa, /costs).
 */
export const LANDING_FLIGHT_FAQS: FAQItem[] = [
  {
    question: "What are the cheapest international flight destinations from Dhaka?",
    answer: "The most affordable international routes from Hazrat Shahjalal International Airport (DAC) are Kolkata, Kathmandu (Nepal), Bangkok (Thailand), and Kuala Lumpur (Malaysia). Roundtrip fares to Kathmandu and Bangkok typically start between BDT 28,000 and BDT 38,000 when booked 4 to 8 weeks in advance."
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
    question: "How can Bangladeshi travelers book international hotels without a credit card?",
    answer: "Many platforms supported on URAL allow 'Pay at Hotel' reservations in local currency upon arrival. Alternatively, Bangladeshi authorized travel agencies can issue confirmed hotel booking vouchers paid locally in Bangladeshi Taka (BDT) via bank transfer, debit card, or mobile banking."
  },
  {
    question: "Which hotel areas are best suited for Bangladeshi tourists in Bangkok and Kathmandu?",
    answer: "In Bangkok, Sukhumvit (around Nana and Asok) and Pratunam are top choices due to proximity to halal food, shopping malls, and BTS Skytrain stations. In Kathmandu, Thamel is the premier tourist neighborhood, offering walkable access to dining, trekking agencies, and money exchange counters."
  },
  {
    question: "Are hotel taxes and service charges included in the displayed rates?",
    answer: "Most international booking sites display rates excluding local city taxes (e.g. 7% VAT in Thailand, tourism dirham fee in Dubai, or service charges in Nepal). URAL's hotel neighborhood guides clearly highlight these hidden fees so you can budget accurately in BDT."
  },
  {
    question: "Do hotels abroad accept dual-currency cards endorsed against a Bangladeshi passport?",
    answer: "Yes, major international hotels worldwide accept Visa, Mastercard, and American Express cards endorsed under the Bangladesh Bank annual travel quota ($12,000 per calendar year). Always notify your bank before flying abroad to activate international POS transactions."
  }
];

export const LANDING_VISA_FAQS: FAQItem[] = [
  {
    question: "Which countries offer Visa on Arrival or Free Visa entry for Bangladeshi passport holders?",
    answer: "Bangladeshi citizens can obtain a free 30-day SAARC gratis Visa on Arrival in Nepal for their first visit of each calendar year. Other destinations like the Maldives, Seychelles, and Bolivia provide Visa on Arrival or entry permits, while Kenya and Sri Lanka offer straightforward online eVisa/eTA facilities."
  },
  {
    question: "What is the standard bank balance requirement for tourist visa applications from Bangladesh?",
    answer: "For popular destinations like Thailand, Malaysia, and Dubai, embassies typically require an active personal bank statement of the last 6 months with a minimum closing balance of BDT 60,000 to BDT 150,000 per applicant (often equivalent to $700-$1,000 USD), accompanied by an official bank solvency certificate."
  },
  {
    question: "How long before travel should Bangladeshi citizens apply for a tourist visa?",
    answer: "It is recommended to apply 3 to 4 weeks prior to your intended departure date. While Malaysia eVisas and Dubai tourist visas are typically processed within 3 to 5 working days, Thailand sticker visas or high-season applications may take 7 to 10 working days at VFS Global Dhaka."
  },
  {
    question: "Can first-time Bangladeshi international travelers easily get tourist visas for Nepal and Thailand?",
    answer: "Yes. Nepal is the easiest first international trip since it requires zero advance visa paperwork for Bangladeshis. Thailand is also welcoming to first-time travelers who provide complete employment/business documents, valid return flight tickets, confirmed hotel bookings, and a healthy bank statement."
  }
];

export const LANDING_COST_FAQS: FAQItem[] = [
  {
    question: "What is the average cost of a 5-day international trip from Bangladesh?",
    answer: "For a 5-day trip from Dhaka, budget travelers spend approximately BDT 45,000 to BDT 60,000 in Nepal, BDT 65,000 to BDT 85,000 in Thailand or Malaysia, and BDT 95,000 to BDT 130,000 in Dubai, inclusive of economy flights, 3-star hotels, local meals, transport, and sightseeing."
  },
  {
    question: "How much foreign currency can a Bangladeshi citizen endorse per calendar year?",
    answer: "Under Bangladesh Bank regulations, an adult citizen with a valid passport can endorse up to $12,000 USD per calendar year for private travel ($5,000 for SAARC countries and Myanmar, and $7,000 for other destinations, or up to the full $12,000 combined limit)."
  },
  {
    question: "What is the most effective way to carry money when traveling abroad from Dhaka?",
    answer: "The safest and most cost-effective method is carrying 60-70% on an endorsed dual-currency debit/credit card for flights, hotels, and shopping, with 30-40% in cash USD banknotes to exchange at authorized money changers upon landing for street food and local transport."
  },
  {
    question: "How can Bangladeshi budget travelers minimize travel expenses abroad?",
    answer: "Travel during shoulder season (avoiding peak holidays), choose budget boutique hotels or guesthouses in tourist hubs like Thamel or Pratunam, use public mass transit (BTS/MRT/Metro) instead of metered taxis, and purchase a local eSIM online for affordable data roaming."
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
 */
export function getFaqSchemaForPage(
  page: "flights" | "hotels" | "visa" | "costs" | "destinations",
  parameterId?: string,
  isLanding?: boolean,
  pageUrl?: string
): FaqPageSchema | null {
  let faqs: FAQItem[] = [];
  let pageName = "";

  switch (page) {
    case "flights": {
      if (isLanding || !parameterId) {
        faqs = LANDING_FLIGHT_FAQS;
        pageName = "Flights from Dhaka - Frequently Asked Questions";
      } else {
        const route = FLIGHTS_DATA.find((r) => r.id === parameterId) || FLIGHTS_DATA[0];
        faqs = route.faqs;
        pageName = `Dhaka to ${route.to} Flight Guide FAQs`;
      }
      break;
    }

    case "hotels": {
      if (isLanding || !parameterId) {
        faqs = LANDING_HOTEL_FAQS;
        pageName = "International Hotel Guides for Bangladeshi Travelers FAQs";
      } else {
        const hotel = HOTELS_DATA.find((h) => h.id === parameterId) || HOTELS_DATA[0];
        faqs = hotel.faqs;
        pageName = `${hotel.city} Hotels & Neighborhood Guide FAQs`;
      }
      break;
    }

    case "visa": {
      if (isLanding || !parameterId) {
        faqs = LANDING_VISA_FAQS;
        pageName = "Visa Requirements for Bangladeshi Passport Holders FAQs";
      } else {
        const visa = VISA_DATA.find((v) => v.id === parameterId) || VISA_DATA[0];
        faqs = visa.faqs;
        pageName = `${visa.country} Visa Guide for Bangladeshis FAQs`;
      }
      break;
    }

    case "costs": {
      if (isLanding || !parameterId) {
        faqs = LANDING_COST_FAQS;
        pageName = "Trip Budgeting & Costs in BDT FAQs";
      } else {
        const cost = TRIP_COSTS_DATA.find((c) => c.id === parameterId) || TRIP_COSTS_DATA[0];
        faqs = cost.faqs;
        pageName = `${cost.country} Travel Budget & Expenses in BDT FAQs`;
      }
      break;
    }

    case "destinations": {
      if (isLanding || !parameterId) {
        faqs = LANDING_FLIGHT_FAQS.slice(0, 3).concat(LANDING_COST_FAQS.slice(0, 3));
        pageName = "Popular Outbound Destinations from Bangladesh FAQs";
      } else {
        const route = FLIGHTS_DATA.find((r) => r.id === parameterId);
        if (route) {
          faqs = route.faqs;
          pageName = `${route.country} Travel Guide FAQs`;
        }
      }
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
