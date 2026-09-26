import { FlightRoute, HotelGuide, VisaGuide, DestinationGuide, TripCostData, BlogPost } from "./types";

export const FLIGHTS_DATA: FlightRoute[] = [
  {
    id: "dhaka-kathmandu",
    from: "Dhaka (DAC)",
    to: "Kathmandu (KTM)",
    country: "Nepal",
    priceRangeBdt: "BDT 28,000 - BDT 40,000 (Roundtrip, Economy)",
    airlines: ["Biman Bangladesh Airlines", "Himalaya Airlines"],
    bestTimeToBook: "4-8 weeks before departure, especially for the October-November peak season",
    duration: "1h 30m (Direct)",
    visaRequirement: "Free 30-day Visa on Arrival for the first entry of each calendar year (SAARC gratis visa)",
    quickAnswer: "Direct flights from Dhaka (DAC) to Kathmandu (KTM) take about 1 hour 30 minutes on Biman Bangladesh Airlines and Himalaya Airlines. Round-trip economy fares typically range from BDT 28,000 to BDT 40,000, depending on season and how early you book. Bangladeshi passport holders get a free 30-day Visa on Arrival for their first trip of each calendar year, making this one of the simplest international routes from Dhaka.",
    keyFacts: [
      { label: "Flight Time", value: "1 hour 30 mins (Direct)" },
      { label: "Direct Airlines", value: "Biman Bangladesh, Himalaya Airlines" },
      { label: "Average Roundtrip Price", value: "BDT 32,000 - 35,000" },
      { label: "Visa on Arrival for Bangladeshis", value: "Free (1st trip per year)" }
    ],
    faqs: [
      {
        question: "Which airlines fly direct from Dhaka to Kathmandu?",
        answer: "Biman Bangladesh Airlines and Himalaya Airlines both operate regular direct flights between Hazrat Shahjalal International Airport (DAC) in Dhaka and Tribhuvan International Airport (KTM) in Kathmandu, with a flight time of about 1 hour 30 minutes."
      },
      {
        question: "How can I find the cheapest Dhaka to Kathmandu flight ticket?",
        answer: "Book 4-8 weeks ahead where possible, avoid the October-November peak season if your dates are flexible, and compare both Biman Bangladesh and Himalaya Airlines directly - prices on this short route can vary significantly between the two."
      },
      {
        question: "Do Bangladeshi passport holders need a visa before flying to Nepal?",
        answer: "No advance visa is needed for most travelers. Bangladeshi citizens receive a free 30-day Visa on Arrival at Tribhuvan International Airport for their first entry of each calendar year, under Nepal's SAARC gratis visa policy."
      },
      {
        question: "How long is the flight from Dhaka to Kathmandu?",
        answer: "The direct flight time between Dhaka and Kathmandu is approximately 1 hour 30 minutes, making it one of the shortest international routes available from Bangladesh."
      },
      {
        question: "Is Tribhuvan International Airport close to Thamel, Kathmandu?",
        answer: "Yes. Tribhuvan International Airport is roughly 15-20 minutes by taxi from Thamel, Kathmandu's main tourist hub, depending on traffic - making it convenient for short trips."
      },
      {
        question: "What documents must I present at Hazrat Shahjalal International Airport in Dhaka before boarding a flight to Nepal?",
        answer: "Before boarding your flight to Nepal in Dhaka, you must present a passport valid for at least six months from your travel date, along with a confirmed return flight ticket which is strictly required for Visa on Arrival. Immigration officials at Hazrat Shahjalal International Airport (DAC) may also ask to see your hotel booking confirmation and proof of sufficient foreign currency, such as a credit card endorsed by an international bank or a reasonable amount of cash in US Dollars. Having printed copies of all these documents ready will ensure a smooth check-in and departure experience."
      },
      {
        question: "Should I choose Biman Bangladesh Airlines or Himalaya Airlines for a trip from Dhaka to Kathmandu?",
        answer: "Both airlines offer regular direct flights on this route, so your choice should depend on price, baggage policies, and schedule preferences. Biman Bangladesh Airlines is a full-service schedule carrier offering complimentary standard meals and generous checked luggage, making it a reliable option for families or those traveling with heavy baggage. Himalaya Airlines is a private carrier based in Nepal that also operates direct flights with basic services, often providing competitive pricing or better timing for quick weekend getaways. It is highly recommended to compare current flight fares and luggage policies for your specific travel dates before making a decision."
      },
      {
        question: "What is the baggage allowance for Biman Bangladesh and Himalaya Airlines on flights from Dhaka to Kathmandu?",
        answer: "Biman Bangladesh Airlines generally provides a generous baggage allowance of 20 kg to 30 kg for checked luggage and 7 kg for carry-on baggage in Economy Class, though you should verify the exact limit printed on your ticket. Himalaya Airlines typically allows up to 20 kg of checked baggage and 7 kg of carry-on baggage for their standard economy fares, although they sometimes offer lower-priced promotional tickets with smaller allowances. If you plan to carry heavy trekking gear or winter clothing, always check current baggage specifications at the time of reserving your ticket, as excess baggage fees at Dhaka airport can be quite costly."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to KTM flight route details for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Biman Bangladesh Airlines"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Tribhuvan International Airport",
    "iataCode": "KTM"
  },
  "estimatedFlightDuration": "PT1H30M"
}`
    }
  },
  {
    id: "dhaka-bangkok",
    from: "Dhaka (DAC)",
    to: "Bangkok (BKK / DMK)",
    country: "Thailand",
    priceRangeBdt: "BDT 31,500 - BDT 45,000 (Roundtrip)",
    airlines: ["Biman Bangladesh Airlines", "Thai Airways", "US-Bangla Airlines", "Thai Lion Air"],
    bestTimeToBook: "30-50 days before departure",
    duration: "2h 30m (Direct)",
    visaRequirement: "Pre-arranged Visa (Sticker Visa via VFS Global Dhaka/Chattogram, or E-Visa)",
    quickAnswer: "Direct flights from Dhaka to Bangkok take exactly 2 hours and 30 minutes, with economy roundtrip fares typically ranging from BDT 31,500 to BDT 45,000. Major carriers like Biman Bangladesh Airlines, Thai Airways, and US-Bangla Airlines fly daily to Suvarnabhumi Airport (BKK), while Thai Lion Air operates low-cost flights to Don Mueang Airport (DMK). Bangladeshi passport holders must secure a pre-arranged sticker visa or online e-visa prior to departure, as they are not eligible for visa-free entry or visa on arrival.",
    keyFacts: [
      { label: "Flight Time", value: "2 hours 30 mins" },
      { label: "Direct Airlines", value: "Thai Airways, Biman, US-Bangla, Thai Lion" },
      { label: "Average Roundtrip Price", value: "BDT 36,000" },
      { label: "Main Airports", value: "Suvarnabhumi (BKK) & Don Mueang (DMK)" }
    ],
    faqs: [
      {
        question: "What is the cheapest airline flying from Dhaka to Bangkok?",
        answer: "Thai Lion Air (flying to Don Mueang DMK) is usually the most budget-friendly carrier, with tickets starting around BDT 31,000-33,000 for a roundtrip."
      },
      {
        question: "Can citizens of Bangladesh get a Visa on Arrival in Thailand?",
        answer: "No, Bangladeshi citizens must obtain an eVisa or a physical sticker visa in advance from Royal Thai Embassy partner centers like VFS Global or Simon Logistics."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to BKK Flight Route Info",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Thai Airways"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Suvarnabhumi Airport",
    "iataCode": "BKK"
  },
  "estimatedFlightDuration": "PT2H30M"
}`
    }
  },
  {
    id: "dhaka-kuala-lumpur",
    from: "Dhaka (DAC)",
    to: "Kuala Lumpur (KUL)",
    country: "Malaysia",
    priceRangeBdt: "BDT 36,000 - BDT 48,000 (Roundtrip)",
    airlines: ["Malaysia Airlines", "Biman Bangladesh Airlines", "AirAsia", "US-Bangla Airlines", "Batik Air"],
    bestTimeToBook: "60 days prior to departure",
    duration: "3h 50m (Direct)",
    visaRequirement: "Malaysia eVisa (Single Entry eVisa is highly reliable for Bangladeshis)",
    quickAnswer: "Bangladeshi outbound tourists can reach Kuala Lumpur (KUL) directly from Dhaka within 3 hours and 50 minutes. Excellent premium services are provided by Malaysia Airlines and Biman, with budget routes run by AirAsia and Batik Air. Fares are usually BDT 36,000 to 48,000 roundtrip. Tourists can smoothly apply for a Malaysian eVisa online, which typically takes 2-5 business days to process.",
    keyFacts: [
      { label: "Flight Time", value: "3 hours 50 mins" },
      { label: "Direct Airlines", value: "Malaysia Airlines, AirAsia, Biman, Batik, US-Bangla" },
      { label: "Average Roundtrip Price", value: "BDT 40,500" },
      { label: "Visa Requirement", value: "eVisa (Applied online prior)" }
    ],
    faqs: [
      {
        question: "How long does the Malaysia eVisa take to process for Bangladeshis?",
        answer: "The official processing window is 48-72 hours, but it is highly recommended to apply at least 7-10 days before flying to account for verification delays."
      },
      {
        question: "Which low-cost carrier connects Dhaka to KL directly?",
        answer: "AirAsia and Batik Air run regular budget flights with competitive luggage-excluded base fares, ideal for backpackers."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to KUL Direct flight guide",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Malaysia Airlines"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Kuala Lumpur International Airport",
    "iataCode": "KUL"
  },
  "estimatedFlightDuration": "PT3H50M"
}`
    }
  },
  {
    id: "dhaka-dubai",
    from: "Dhaka (DAC)",
    to: "Dubai (DXB)",
    country: "UAE",
    priceRangeBdt: "BDT 58,000 - BDT 75,000 (Roundtrip)",
    airlines: ["Emirates", "flydubai", "Biman Bangladesh Airlines", "US-Bangla Airlines"],
    bestTimeToBook: "60-90 days before departure",
    duration: "4h 45m (Direct)",
    visaRequirement: "UAE eVisa (Pre-arranged Tourist visa, usually secured via registered travel agencies or airlines)",
    quickAnswer: "Direct flights from Dhaka to Dubai (DXB) take about 4 hours 45 mins. Direct options range from ultra-premium on Emirates to budget-friendly flydubai, Biman, and US-Bangla Airlines. Fares start around BDT 58,000. Tourist eVisas (30 or 60 days) are processed in 3-5 days via agencies or designated portals, making pre-travel planning vital.",
    keyFacts: [
      { label: "Flight Time", value: "4 hours 45 mins" },
      { label: "Direct Airlines", value: "Emirates, flydubai, Biman, US-Bangla" },
      { label: "Average Roundtrip Price", value: "BDT 66,000" },
      { label: "Best Booking Window", value: "2-3 months prior" }
    ],
    faqs: [
      {
        question: "Can I get a transit visa on arrival in Dubai if flying Emirates?",
        answer: "Transit visas are possible but require pre-clearance or holding specific resident visas from the US/UK/Schengen. General Bangladeshi tourists must book their e-Tourist visas in advance."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to DXB Direct path",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Emirates"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Dubai International Airport",
    "iataCode": "DXB"
  },
  "estimatedFlightDuration": "PT4H45M"
}`
    }
  },
  {
    id: "dhaka-singapore",
    from: "Dhaka (DAC)",
    to: "Singapore (SIN)",
    country: "Singapore",
    priceRangeBdt: "BDT 42,000 - BDT 62,000 (Roundtrip)",
    airlines: ["Biman Bangladesh Airlines", "Singapore Airlines", "US-Bangla Airlines"],
    bestTimeToBook: "45-60 days before departure",
    duration: "4h 15m (Direct)",
    visaRequirement: "Pre-arranged Singapore e-Visa (Applied via Authorized Visa Agents in Dhaka/Chattogram)",
    quickAnswer: "Direct flights from Dhaka (DAC) to Singapore Changi Airport (SIN) take approximately 4 hours and 15 minutes. Biman Bangladesh Airlines, US-Bangla Airlines, and Singapore Airlines operate daily non-stop flights on this route. Roundtrip economy fares typically range from BDT 42,000 to BDT 62,000, while one-stop transit flights via Kuala Lumpur on AirAsia or Batik Air can drop to BDT 36,000. Bangladeshi passport holders must obtain a pre-arranged Singapore e-Visa through an embassy-authorized agent and submit the free SG Arrival Card online within 3 days before flying.",
    keyFacts: [
      { label: "Flight Time", value: "4 hours 15 mins (Direct)" },
      { label: "Direct Airlines", value: "Singapore Airlines, Biman, US-Bangla" },
      { label: "Average Roundtrip Price", value: "BDT 46,500" },
      { label: "Visa Requirement", value: "Authorized Agent e-Visa + SGAC" }
    ],
    faqs: [
      {
        question: "Which airlines fly direct from Dhaka to Singapore?",
        answer: "Singapore Airlines, Biman Bangladesh Airlines, and US-Bangla Airlines operate daily non-stop flights from Hazrat Shahjalal International Airport (DAC) to Singapore Changi Airport (SIN), taking roughly 4 hours and 15 minutes."
      },
      {
        question: "What is the cheapest way to fly from Dhaka to Singapore?",
        answer: "US-Bangla Airlines and Biman Bangladesh Airlines offer the lowest direct roundtrip fares starting around BDT 42,000-46,000. If you only carry 7kg cabin baggage, a one-stop flight via Kuala Lumpur on AirAsia or Batik Air can cost between BDT 35,000 and BDT 39,000 roundtrip."
      },
      {
        question: "Do Bangladeshi travelers need to fill out the SG Arrival Card before boarding?",
        answer: "Yes. Every traveler flying from Dhaka to Singapore must submit the free electronic SG Arrival Card (SGAC) via the official ICA website or MyICA mobile app within 3 days (72 hours) prior to arrival, in addition to holding a printed Singapore e-Visa."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to SIN Direct Flight Route Guide for Bangladeshi Travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Biman Bangladesh Airlines"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Singapore Changi Airport",
    "iataCode": "SIN"
  },
  "estimatedFlightDuration": "PT4H15M"
}`
    }
  },
  {
    id: "dhaka-maldives",
    from: "Dhaka (DAC)",
    to: "Malé (MLE)",
    country: "Maldives",
    priceRangeBdt: "BDT 46,000 - BDT 68,000 (Roundtrip)",
    airlines: ["US-Bangla Airlines", "SriLankan Airlines", "Maldivian", "Malaysia Airlines"],
    bestTimeToBook: "45-75 days before departure (especially ahead of November-March dry season)",
    duration: "4h 10m (Direct) / 6h 30m (via Colombo)",
    visaRequirement: "Free 30-day Tourist Visa on Arrival + Mandatory IMUGA form within 96 hours",
    quickAnswer: "Direct flights from Dhaka (DAC) to Velana International Airport in Malé (MLE) take 4 hours and 10 minutes on US-Bangla Airlines, while SriLankan Airlines offers convenient 1-stop connections via Colombo. Roundtrip economy fares generally range between BDT 46,000 and BDT 68,000. Bangladeshi passport holders receive a free 30-day Tourist Visa on Arrival in the Maldives, provided they carry a confirmed hotel voucher, return ticket, USD endorsement, and complete the free IMUGA Traveller Declaration online within 96 hours of flying.",
    keyFacts: [
      { label: "Flight Time", value: "4 hours 10 mins (Direct)" },
      { label: "Popular Airlines", value: "US-Bangla (Direct), SriLankan (1-Stop)" },
      { label: "Average Roundtrip Price", value: "BDT 52,000" },
      { label: "Visa on Arrival", value: "Free 30 Days (+ IMUGA Form)" }
    ],
    faqs: [
      {
        question: "Is there a direct flight from Dhaka to the Maldives?",
        answer: "Yes, US-Bangla Airlines operates direct scheduled flights from Dhaka (DAC) to Malé Velana International Airport (MLE) with a flight time of around 4 hours and 10 minutes. SriLankan Airlines also operates daily flights with a short transit in Colombo (CMB)."
      },
      {
        question: "Do Bangladeshi citizens need an advance visa before flying to the Maldives?",
        answer: "No advance visa is required for tourism. Bangladeshi tourists are granted a free 30-day Tourist Visa on Arrival at Malé Airport. However, you must complete the free online IMUGA Traveller Declaration within 96 hours before departure and present confirmed hotel and return flight bookings at Dhaka immigration."
      },
      {
        question: "Can I combine Sri Lanka and Maldives on a single flight ticket from Dhaka?",
        answer: "Yes. When flying SriLankan Airlines from Dhaka to Malé via Colombo, you can book a multi-city or stopover ticket to spend 2-3 days in Colombo/Galle before continuing to Malé for almost the same airfare."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to MLE Flight Route Guide for Bangladeshi Travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "US-Bangla Airlines"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Velana International Airport",
    "iataCode": "MLE"
  },
  "estimatedFlightDuration": "PT4H10M"
}`
    }
  }
];

export const HOTELS_DATA: HotelGuide[] = [
  {
    id: "kathmandu-hotels",
    city: "Kathmandu",
    country: "Nepal",
    description: "Kathmandu blends centuries-old Newari architecture with a compact, walkable tourist core. Where you stay shapes your whole trip - Thamel for convenience and nightlife, Boudha for a quieter pace near the great stupa, or Lazimpat for upscale comfort.",
    neighborhoods: [
      { name: "Thamel", description: "The main tourist hub - dense with budget guesthouses, restaurants, trekking shops, and currency exchange counters. Almost everything a first-time visitor needs is within walking distance.", vibe: "Energetic, Backpacker-friendly, Convenient" },
      { name: "Boudha", description: "Centered on the massive Boudhanath Stupa. Quieter guesthouses and cafes, popular with travelers who want a calmer base with easy taxi access to the rest of the city.", vibe: "Peaceful, Spiritual, Tibetan culture" },
      { name: "Lazimpat / Darbar Marg", description: "Wide, leafy streets with upscale hotels, embassies, and fine dining. A short ride from Thamel, with a calmer, more residential feel.", vibe: "Upscale, Quiet, Well-connected" }
    ],
    hotels: [
      { name: "Hotel Shanker", stars: 4, priceBdt: 7500, category: "Mid-Range", neighborhood: "Lazimpat", features: ["Restored heritage palace", "Outdoor swimming pool", "Garden courtyard", "Free Wi-Fi"] },
      { name: "Dwarika's Hotel", stars: 5, priceBdt: 29000, category: "Luxury", neighborhood: "Battisputali (near Ring Road)", features: ["Hand-carved Newari architecture", "On-site heritage museum", "Spa & wellness centre", "Award-winning restaurant"] },
      { name: "Thamel Grand Hotel", stars: 3, priceBdt: 2200, category: "Budget", neighborhood: "Thamel", features: ["Rooftop cafe", "Free breakfast included", "5-minute walk to main shopping streets", "Clean, simple rooms"] },
      { name: "Bodhi Guest House", stars: 2, priceBdt: 1500, category: "Budget", neighborhood: "Boudha", features: ["Views of Boudhanath Stupa", "Shared kitchen access", "Hot water available", "Quiet courtyard"] }
    ],
    quickAnswer: "Thamel is the best base for most Bangladeshi travelers in Kathmandu, with budget hotels from BDT 1,500-2,500 per night and everything - restaurants, shops, tour operators - within walking distance. Mid-range comfort hotels like Hotel Shanker run around BDT 7,500 per night, while heritage luxury stays such as Dwarika's Hotel start near BDT 29,000. For a quieter trip, Boudha offers peaceful guesthouses from BDT 1,500 near Boudhanath Stupa.",
    keyFacts: [
      { label: "Best Area for First-Timers", value: "Thamel" },
      { label: "Budget Room Price (BDT)", value: "1,500 - 2,500 / night" },
      { label: "Mid-Range Price (BDT)", value: "5,000 - 8,000 / night" },
      { label: "Luxury / Heritage (BDT)", value: "15,000 - 30,000+ / night" }
    ],
    faqs: [
      {
        question: "What is the best area to stay in Kathmandu for a first visit?",
        answer: "Thamel is the most convenient choice for first-time visitors, including those from Bangladesh - it has the highest concentration of budget and mid-range hotels, restaurants, ATMs, and tour/trekking agencies, almost all within walking distance."
      },
      {
        question: "How much does a hotel in Thamel cost per night?",
        answer: "Basic budget rooms in Thamel start around BDT 1,500-2,500 per night, comfortable 3-star hotels run roughly BDT 2,500-4,000, and mid-range options with pools or rooftop restaurants are typically BDT 5,000-8,000 per night."
      },
      {
        question: "Is tap water safe to drink in Kathmandu hotels?",
        answer: "No - tap water should not be drunk anywhere in Kathmandu, including in hotels. Most reputable hotels provide complimentary bottled or filtered drinking water daily; if a guesthouse doesn't, bottled water is cheap and widely available."
      },
      {
        question: "Do Kathmandu hotels accept Bangladeshi Taka (BDT)?",
        answer: "No, hotels in Kathmandu price and charge in Nepali Rupees (NPR) or sometimes US Dollars for higher-end properties. Bring USD cash to exchange on arrival, or use an international card - most mid-range and luxury hotels accept Visa/Mastercard."
      },
      {
        question: "How far is Thamel from Tribhuvan International Airport?",
        answer: "Thamel is roughly 4-6 km from Tribhuvan International Airport, usually a 15-20 minute taxi ride depending on traffic. Most hotels in Thamel can arrange airport pickup for a small fee."
      }
    ],
    schemaMarkup: {
      type: "ItemList + FAQPage",
      description: "Kathmandu hotel guide for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "name": "Recommended Kathmandu Hotels for Bangladeshi Travelers",
      "numberOfItems": 4,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Dwarika's Hotel" },
        { "@type": "ListItem", "position": 2, "name": "Hotel Shanker" },
        { "@type": "ListItem", "position": 3, "name": "Thamel Grand Hotel" },
        { "@type": "ListItem", "position": 4, "name": "Bodhi Guest House" }
      ]
    }
  ]
}`
    }
  },
  {
    id: "bangkok-hotels",
    city: "Bangkok",
    country: "Thailand",
    description: "Whether you seek glittering sky scrapers or historical neighborhoods along the Chao Phraya River, Bangkok hosts some of the best-value hotels globally.",
    neighborhoods: [
      { name: "Pratunam", description: "Sensational budget shopping hub. Popular with Bangladeshi wholesale traders and families searching for Indian/halal food options.", vibe: "Bustling, Retail-first, Crowded" },
      { name: "Sukhumvit (Asok / Nana)", description: "The ultimate modern arterial road. Complete with luxury hotels, BTS Skytrain stations, and high-end malls.", vibe: "Metropolitan, Nightlife, Transit-dense" },
      { name: "Khao San Road", description: "The legendary global backpacker street, filled with energetic bars, cheap street food stalls, and hostel rooms.", vibe: "Bohemian, Noisy, Youthful" }
    ],
    hotels: [
      { name: "Amari Bangkok", stars: 5, priceBdt: 12500, category: "Luxury", neighborhood: "Pratunam", features: ["Outdoor infinity pool", "Luxury spa", "Opposite Platinum Mall", "Excellent buffet"] },
      { name: "Kloof Hostel", stars: 2, priceBdt: 1800, category: "Budget", neighborhood: "Khao San", features: ["Modern pod beds", "Lively social lounge", "Co-working space", "High speed WiFi"] },
      { name: "S31 Sukhumvit Hotel", stars: 4, priceBdt: 6800, category: "Mid-Range", neighborhood: "Sukhumvit", features: ["Glass-edge pool", "Duplex suites", "Skytrain distance", "Panoramic gym"] },
      { name: "First House Hotel", stars: 3, priceBdt: 3800, category: "Mid-Range", neighborhood: "Pratunam", features: ["Halal breakfast options", "Quiet alley location", "Great value", "Baggage scale"] }
    ],
    quickAnswer: "Bangkok hotel prices generally range from BDT 1,800 to BDT 12,500 per night depending on the neighborhood and hotel star rating. For Bangladeshi travelers focused on shopping, the Pratunam neighborhood is highly recommended with budget-friendly options like First House Hotel starting at BDT 3,800 per night. If you prefer high-end business convenience with quick BTS Skytrain connection, modern Sukhumvit hotels like Amari Bangkok cost between BDT 6,800 and BDT 12,500 per night.",
    keyFacts: [
      { label: "Best Shopping Neighborhood", value: "Pratunam" },
      { label: "Avg Mid-Range Price (BDT)", value: "3,500 - 7,000 / night" },
      { label: "Best Transit Access", value: "BTS Sukhumvit Line" },
      { label: "Halal Food Focus Area", value: "Sukhumvit Soi 3 to 11 / Pratunam" }
    ],
    faqs: [
      {
        question: "Is Halal food easily accessible around Bangkok Hotels?",
        answer: "Yes, particularly in Pratunam (near Indra Square/Pratunam Market) and Sukhumvit Soi 3/Soi 4 (Nana area), which are packed with Arab, Pakistani, and Indian-Halal restaurants."
      }
    ],
    schemaMarkup: {
      type: "HotelGuide",
      description: "Bangkok hotel listing",
      code: `{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Pratunam Accommodations Guide"
}`
    }
  },
  {
    id: "kuala-lumpur-hotels",
    city: "Kuala Lumpur",
    country: "Malaysia",
    description: "Malaysia's capital offers modern luxury architectural wonders alongside green parks and historical monuments. You can find high-rise apartments with infinity pools looking at the Petronas Twin Towers for very cheap.",
    neighborhoods: [
      { name: "KLCC", description: "Direct heart of the city surrounding the Petronas Towers. Perfect for high-end boutique experiences, malls, and premium restaurants.", vibe: "Prestigious, Modern, Scenic" },
      { name: "Bukit Bintang", description: "The premier shopping, lifestyle, and transit core. Hosts major mega-malls, Pavilion, and the famous Alor Street Food Night Market.", vibe: "Trendy, Buzzing, Entertaining" },
      { name: "Chinatown / Petaling Street", description: "Historic quarters with cultural heritage temples, gorgeous architecture, hipster cafes, and historic cheap hostels.", vibe: "Heritage, Hipster, Retro" }
    ],
    hotels: [
      { name: "The Face Suites KLCC", stars: 5, priceBdt: 9500, category: "Luxury", neighborhood: "KLCC", features: ["World-famous rooftop infinity pool", "Petronas tower view", "Large family apartments", "Kitchenette"] },
      { name: "Wolo Bukit Bintang", stars: 4, priceBdt: 6200, category: "Mid-Range", neighborhood: "Bukit Bintang", features: ["Art deco interiors", "Direct BB Crossing location", "Vibrant vibe", "Boutique coffee bar"] },
      { name: "The Explorer Guesthouse", stars: 2, priceBdt: 1700, category: "Budget", neighborhood: "Chinatown", features: ["Eco-friendly layout", "Shared kitchen", "Rooftop terrace", "English breakfast"] }
    ],
    quickAnswer: "Kuala Lumpur is famous for highly affordable luxury. Stays like The Face Suites in KLCC (BDT 9,500/night) offer giant executive suites with rooftop infinity pools framing the Twin Towers. For non-stop shopping and dining, the boutique Wolo Bukit Bintang (BDT 6,200) sits central on the main crossroad, while backpackers will find great social setups in Chinatown under BDT 2,000.",
    keyFacts: [
      { label: "Best Tower-View Stays", value: "KLCC (Face Suites / Eq KL)" },
      { label: "Avg Apartment Rate (BDT)", value: "5,000 - 10,000 / night" },
      { label: "Top Food Street", value: "Jalan Alor (Bukit Bintang)" },
      { label: "Tourist Tax (TTx)", value: "RM 10 per room/night (standard)" }
    ],
    faqs: [
      {
        question: "What is the Malaysia Tourism Tax?",
        answer: "In Malaysia, hotels charge a flat Tourism Tax of RM 10 (approx BDT 270) per room per night for foreign passports, usually collected in cash at check-in."
      }
    ],
    schemaMarkup: {
      type: "HotelGuide",
      description: "Accommodation guidelines in KL",
      code: `{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "The Face Suites"
}`
    }
  },
  {
    id: "dubai-hotels",
    city: "Dubai",
    country: "UAE",
    description: "From budget gold-souk guest houses in Old Deira to iconic cloud-piercing luxury skyscrapers overlooking Dubai Marina, the city offers some of the world's most versatile, clean, and futuristic hotel stays.",
    neighborhoods: [
      { name: "Deira / Al Rigga", description: "Old Dubai charm. Home to traditional souks, cheap local dining street vendors, and extremely affordable BDT 3,000-5,000/night tourist hotels.", vibe: "Traditional, Nostalgic, Budget-centric" },
      { name: "Downtown / Business Bay", description: "Ultra-luxury high rise corridor centering the Burj Khalifa and Dubai Mall. Offers breathtaking views and near-instant access to luxury retail.", vibe: "Cosmopolitan, Futuristic, Premium" },
      { name: "Dubai Marina / JBR", description: "Beaches, luxury yachts, marina skylines, and beautiful outdoor walking paths. Perfect for family resort stays.", vibe: "Coastal, Majestic, Leisure" }
    ],
    hotels: [
      { name: "Rove City Centre Deira", stars: 3, priceBdt: 6500, category: "Mid-Range", neighborhood: "Deira", features: ["Modern stylish room design", "Outdoor heated pool", "Free shuttle to central mall", "Halal buffet cuisine"] },
      { name: "Address Downtown Dubai", stars: 5, priceBdt: 45000, category: "Luxury", neighborhood: "Downtown", features: ["Direct Burj Khalifa view", "Walkable skybridge to Dubai Mall", "State of the art spa", "Premium infinity pool"] },
      { name: "Ibis Styles Dragon Mart", stars: 3, priceBdt: 4800, category: "Budget", neighborhood: "International City", features: ["Colorful family layouts", "Free shuttle to metro", "Very quiet", "English and Arabic breakfast"] }
    ],
    quickAnswer: "For budget-friendly Bangladeshi families, Rove City Centre Deira (BDT 6,500/night) offers premium, ultra-clean mid-range rooms with excellent highway access. Luxury hunters seeking magical fountain views can select the iconic Address Downtown Dubai (BDT 45,000+), while budget-conscious wholesale buyers can stay in Deira or near Dragon Mart for under BDT 5,000.",
    keyFacts: [
      { label: "Top Retail Stay District", value: "Downtown Dubai & Deira" },
      { label: "Avg Family Suite Cost", value: "BDT 8,000 - 15,000 / night" },
      { label: "Primary Metro Access Pass", value: "Nol Card (Silver/Gold Class)" },
      { label: "Tourism Dirham Fee", value: "AED 10 to AED 20 per room/night" }
    ],
    faqs: [
      {
        question: "Is there any tourism tax on Dubai hotel stays?",
        answer: "Yes, Dubai hotels collect a mandatory cash fee called 'Tourism Dirham' ranging from AED 10 (approx BDT 320) per room-night for 3-star hotels, up to AED 20 (approx BDT 640) for luxury 5-star resorts."
      }
    ],
    schemaMarkup: {
      type: "HotelGuide",
      description: "Dubai hotel locations listing",
      code: `{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Featured Dubai Hotels",
  "numberOfItems": 3,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Address Downtown"
    }
  ]
}`
    }
  },
  {
    id: "singapore-hotels",
    city: "Singapore",
    country: "Singapore",
    description: "Singapore hotel rates are higher than Bangkok or Kuala Lumpur, so choosing the right MRT-connected neighborhood is the secret to keeping your trip affordable. Little India/Farrer Park and Bugis offer unbeatable value and halal food access for Bangladeshi travelers.",
    neighborhoods: [
      { name: "Little India / Serangoon Road", description: "Centered around the 24-hour Mustafa Centre and Farrer Park MRT. Packed with Bangladeshi, Indian, and Muslim-owned halal restaurants and the best-value 3-star and 4-star hotels in Singapore.", vibe: "Bangladeshi-Favorite, 24/7 Shopping, Budget-Friendly" },
      { name: "Bugis / Kampong Glam (Arab Street)", description: "Historic Malay-Arab heritage quarter anchored by the golden Sultan Mosque. Walkable to trendy cafes, Haji Lane, Bugis Street Market, and two major MRT lines.", vibe: "Halal Hub, Cultural, Central Transit" },
      { name: "Marina Bay / Civic District", description: "Singapore's postcard waterfront skyline featuring Marina Bay Sands, Gardens by the Bay, and Merlion Park. Ideal for milestone family trips and luxury stays.", vibe: "Iconic Skyline, Ultra-Luxury, Waterfront" }
    ],
    hotels: [
      { name: "One Farrer Hotel", stars: 5, priceBdt: 19500, category: "Luxury", neighborhood: "Little India (Farrer Park MRT)", features: ["Directly above Farrer Park MRT", "3-min walk to Mustafa Centre", "Olympic-size outdoor pool", "Popular with Bangladeshi families & medical visitors"] },
      { name: "Village Hotel Bugis", stars: 4, priceBdt: 13500, category: "Mid-Range", neighborhood: "Bugis / Arab Street", features: ["Halal-certified Landmark restaurant", "Steps from Sultan Mosque", "Spacious family rooms", "5-min walk to Bugis MRT"] },
      { name: "Hotel Boss", stars: 4, priceBdt: 10500, category: "Mid-Range", neighborhood: "Lavender / Kampong Glam", features: ["Sky terrace swimming pool", "Halal food court downstairs", "Near Lavender MRT", "Great value modern rooms"] },
      { name: "ibis budget Singapore Imperial", stars: 3, priceBdt: 7200, category: "Budget", neighborhood: "Lavender / Little India border", features: ["Clean compact rooms", "Rooftop pool", "2-min walk to Lavender MRT", "Walkable to Mustafa Centre"] }
    ],
    quickAnswer: "For Bangladeshi travelers, Little India (near Mustafa Centre and Farrer Park MRT) and Bugis / Arab Street are the best neighborhoods to stay in Singapore. Clean budget hotels like ibis budget Imperial start around BDT 7,200 per night, popular family-friendly 4-star stays like Hotel Boss and Village Hotel Bugis cost BDT 10,500–13,500 per night, and 5-star properties like One Farrer Hotel start around BDT 19,500.",
    keyFacts: [
      { label: "Best Bangladeshi Area", value: "Little India (Near Mustafa Centre)" },
      { label: "Budget Room Price (BDT)", value: "6,800 - 8,500 / night" },
      { label: "Mid-Range Family (BDT)", value: "10,500 - 14,500 / night" },
      { label: "Top Halal Dining Zone", value: "Arab Street (Bugis) & Serangoon Rd" }
    ],
    faqs: [
      {
        question: "Why do most Bangladeshi travelers stay near Mustafa Centre in Singapore?",
        answer: "Mustafa Centre on Serangoon Road (Little India) is open 24 hours for electronics, chocolates, watches, and luggage shopping, and is surrounded by familiar Bangladeshi and Indian halal restaurants, money changers with competitive rates, and Farrer Park MRT station."
      },
      {
        question: "Are hotel rooms in Singapore smaller than in Bangkok or Kuala Lumpur?",
        answer: "Yes, land is scarce in Singapore so standard budget rooms are typically 14–18 sq meters. If traveling with children, look at Village Hotel Bugis or One Farrer Hotel which offer larger family room layouts."
      }
    ],
    schemaMarkup: {
      type: "HotelGuide",
      description: "Singapore hotel guide for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Recommended Singapore Hotels for Bangladeshi Travelers",
  "numberOfItems": 4,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "One Farrer Hotel" },
    { "@type": "ListItem", "position": 2, "name": "Village Hotel Bugis" },
    { "@type": "ListItem", "position": 3, "name": "Hotel Boss" },
    { "@type": "ListItem", "position": 4, "name": "ibis budget Singapore Imperial" }
  ]
}`
    }
  },
  {
    id: "maldives-hotels",
    city: "Malé & Maafushi",
    country: "Maldives",
    description: "The Maldives offers two completely different accommodation styles: inhabited local islands (like Maafushi and Hulhumalé) where Bangladeshi travelers can stay in modern beachfront guesthouses for BDT 5,500–9,500/night, and private resort islands featuring iconic overwater villas.",
    neighborhoods: [
      { name: "Maafushi Island (South Malé Atoll)", description: "The #1 budget-friendly local island in the Maldives, just 35–40 minutes by speedboat ($25) or 90 minutes by public ferry ($2) from Malé Airport. Packed with bikini beaches, water sports centers, and affordable excursion operators.", vibe: "Budget Beach Paradise, Snorkeling Tours, Lively" },
      { name: "Hulhumalé (Airport Connected Island)", description: "A modern reclaimed island connected to Velana International Airport by a 15-minute highway taxi ride. Ideal for first/last night transit stays or short budget beach breaks without paying speedboat fees.", vibe: "Zero Boat Transfer Cost, Convenient, Clean Beach" },
      { name: "Private Resort Islands (North/South Malé Atoll)", description: "One-island-one-resort private sanctuaries reached by resort speedboat. Home to overwater bungalows, infinity pools, and all-inclusive dining.", vibe: "Honeymoon Luxury, Overwater Villas, Exclusive" }
    ],
    hotels: [
      { name: "Kaani Palm Beach", stars: 4, priceBdt: 9800, category: "Mid-Range", neighborhood: "Maafushi Island", features: ["Rooftop infinity pool overlooking ocean", "Directly on Bikini Beach", "In-house shark & sandbank tour desk", "100% Halal buffet"] },
      { name: "Arena Beach Hotel", stars: 4, priceBdt: 8200, category: "Mid-Range", neighborhood: "Maafushi Island", features: ["Sea-view balcony rooms", "Coco Grill beachfront dining", "Discounted snorkeling packages", "Speedboat pickup coordination"] },
      { name: "h78 at Hulhumale Maldives", stars: 3, priceBdt: 6400, category: "Budget", neighborhood: "Hulhumalé Beachfront", features: ["15-min taxi from Malé Airport", "No expensive boat transfer needed", "Direct beach across the street", "Great for late-night Dhaka flights"] },
      { name: "Cinnamon Dhonveli Maldives", stars: 5, priceBdt: 38000, category: "Luxury", neighborhood: "North Malé Atoll (Private Resort)", features: ["Iconic overwater suites", "25-min speedboat from airport", "Full-board & all-inclusive packages", "World-class house reef"] }
    ],
    quickAnswer: "You do not need to spend লাখ টাকা on a private resort to visit the Maldives from Bangladesh. By staying on Maafushi local island (such as Arena Beach Hotel or Kaani Palm Beach for BDT 8,200–9,800/night) or Hulhumalé beachfront (from BDT 6,400/night), you get crystal-clear lagoons and cheap $25–$40 snorkeling excursions. For honeymooners seeking overwater villas, private resorts near Malé start around BDT 35,000–45,000 per night.",
    keyFacts: [
      { label: "Best Budget Island", value: "Maafushi (35m speedboat from MLE)" },
      { label: "Local Island Hotel (BDT)", value: "5,500 - 10,500 / night" },
      { label: "Private Resort Villa (BDT)", value: "32,000 - 85,000+ / night" },
      { label: "Green Tax & GST Rule", value: "Check if 16% T-GST + $6/night Green Tax is included" }
    ],
    faqs: [
      {
        question: "How do I get from Malé Airport to Maafushi or Hulhumalé?",
        answer: "Hulhumalé is connected by bridge to the airport and takes 15 minutes by road taxi (approx $7–$10). Maafushi is reached in 35 minutes via scheduled shared speedboat ($25 USD per person each way, bookable through your hotel) directly from the airport jetty."
      },
      {
        question: "Is all food in the Maldives halal for Bangladeshi travelers?",
        answer: "Yes! The Maldives is a 100% Muslim nation, so all meat and food served on local islands (Malé, Hulhumalé, Maafushi) and resorts is strictly Halal."
      }
    ],
    schemaMarkup: {
      type: "HotelGuide",
      description: "Maldives local island and resort hotel guide for Bangladeshis",
      code: `{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Maldives Hotels & Guesthouses for Bangladeshi Travelers",
  "numberOfItems": 4,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Kaani Palm Beach Maafushi" },
    { "@type": "ListItem", "position": 2, "name": "Arena Beach Hotel Maafushi" },
    { "@type": "ListItem", "position": 3, "name": "h78 at Hulhumale" },
    { "@type": "ListItem", "position": 4, "name": "Cinnamon Dhonveli Maldives" }
  ]
}`
    }
  }
];

export const VISA_DATA: VisaGuide[] = [
  {
    id: "nepal-visa",
    country: "Nepal",
    requirementType: "Visa On Arrival",
    costBdt: "Free for the first entry of each calendar year (SAARC gratis visa)",
    processingTime: "Instant, on arrival at Tribhuvan International Airport or major land borders",
    documentChecklist: [
      {
        category: "Required at the Airport / Border",
        items: [
          "Passport valid for at least 6 months from your travel date",
          "One recent passport-size photo (white background)",
          "Printed or digital copy of the online Nepal Tourist Visa arrival form (recommended, but can also be filled at the kiosk on arrival)",
          "Confirmed return flight ticket",
          "Hotel booking confirmation for your stay in Nepal"
        ]
      }
    ],
    stepByStep: [
      "Optionally fill out the online Nepal Tourist Visa arrival form a few days before your flight to save time - it's not mandatory, as kiosks at the airport let you complete it on arrival.",
      "On landing at Tribhuvan International Airport (KTM), use the self-service kiosks to scan your passport and print your arrival form receipt if you haven't already.",
      "Go to the visa counter and join the line for SAARC nationals. Hand over your passport, photo, and printed form.",
      "If this is your first entry to Nepal in the current calendar year (1 January - 31 December), the 30-day tourist visa is issued free of charge. If it's a repeat visit this year, pay the standard fee in cash (USD preferred): USD 30 for 15 days, USD 50 for 30 days, or USD 125 for 90 days.",
      "Proceed to immigration for passport stamping, then collect your luggage and exit to the arrivals hall."
    ],
    quickAnswer: "Bangladeshi citizens get a free 30-day Visa on Arrival at Tribhuvan International Airport for their first entry of each calendar year, under Nepal's SAARC gratis visa policy. A second visit in the same calendar year, or a longer stay, requires the standard fee: USD 30 for 15 days, USD 50 for 30 days, or USD 125 for 90 days, payable in cash on arrival. The 'visa year' resets every 1 January regardless of when your first trip happened.",
    keyFacts: [
      { label: "Visa Type", value: "Visa on Arrival (Tourist)" },
      { label: "Cost for 1st Entry/Year", value: "Free (SAARC Gratis)" },
      { label: "Repeat Visit Fee (Same Year)", value: "USD 30 (15d) / USD 50 (30d)" },
      { label: "Visa Year Cycle", value: "Resets every 1 January" }
    ],
    faqs: [
      {
        question: "Is the Nepal visa really free for Bangladeshi citizens?",
        answer: "Yes, but with one condition: it's free only for your first entry into Nepal within a calendar year (1 January - 31 December), under the SAARC gratis visa policy. The free visa is for up to 30 days. A second trip in the same year, or a longer stay, requires the standard visa fee."
      },
      {
        question: "What happens if it's my second trip to Nepal in the same year?",
        answer: "You'll pay the standard Visa on Arrival fee in cash at the payment counter: USD 30 for 15 days, USD 50 for 30 days, or USD 125 for 90 days. Nepali Rupees and Bangladeshi Taka are not accepted at the visa counter - bring US Dollars."
      },
      {
        question: "Can Bangladeshi travelers enter Nepal by land border instead of flying?",
        answer: "Yes. The same Visa on Arrival policy, including the free first-entry-of-the-year benefit for SAARC nationals, applies at major land border crossings such as Kakarbhitta and Birgunj, not only at Tribhuvan International Airport."
      },
      {
        question: "Do children traveling from Bangladesh need their own Nepal visa?",
        answer: "Yes, every traveler needs their own passport and visa entry, but children under 10 years old receive a free visa regardless of nationality or how many times they've visited that year."
      },
      {
        question: "Do I need to apply for a Nepal e-Visa before flying from Dhaka?",
        answer: "No. Nepal does not require Bangladeshi tourists to obtain an e-Visa or any approval before travel - the Visa on Arrival process at the airport or border is the standard route. Filling the online arrival form in advance is optional and only saves a few minutes on arrival."
      },
      {
        question: "How long can I stay in Nepal on the free visa?",
        answer: "The free first-entry-of-the-year visa is valid for up to 30 days. If you want to stay longer, you can extend your visa at the Department of Immigration offices in Kathmandu or Pokhara before it expires, for an additional fee."
      },
      {
        question: "Can a Bangladeshi citizen apply for a Nepal tourist visa extension while inside Nepal?",
        answer: "Yes, Bangladeshi citizens can easily extend their tourist visa while inside the country by visiting the Department of Immigration office in Kathmandu or Pokhara. The visa can be extended for a minimum of 15 days, with a standard fee of USD 45 for that period, plus an additional USD 3 per day for any extra days beyond that. You must submit your passport, a digital photograph, and complete the extension form online before visiting the immigration office. It is highly recommended to start this process at least a week before your initial 30-day visa expires."
      },
      {
        question: "What are the penalties if a Bangladeshi passport holder overstays their visa in Nepal?",
        answer: "Overstaying your visa in Nepal is a serious offense that can lead to heavy fines, travel delays, or detention. Under current immigration regulations, you will be charged a standard overstay fee of USD 5 per day plus a visa extension fee of USD 3 per day at the Department of Immigration during exit clearance. For longer overstays or failures to reconcile fees, you might be barred from departing until your case is resolved or faced with a multi-year ban from entering the country. Always ensure your visa is legally extended or leave Nepal before your permitted duration expires to avoid these strict penalties."
      }
    ],
    schemaMarkup: {
      type: "GovernmentService + FAQPage",
      description: "Nepal Visa on Arrival for Bangladeshi citizens (SAARC gratis policy)",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentService",
      "name": "Nepal Visa on Arrival for Bangladeshi Citizens",
      "serviceType": "Tourist Visa",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "Department of Immigration, Nepal"
      },
      "areaServed": "Bangladesh",
      "audience": {
        "@type": "Audience",
        "audienceType": "Bangladeshi passport holders"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to get a Nepal visa as a Bangladeshi citizen",
      "description": "Bangladeshi citizens get a free 30-day Visa on Arrival at Tribhuvan International Airport for their first entry of each calendar year, under Nepal's SAARC gratis visa policy. A second visit in the same calendar year, or a longer stay, requires the standard fee: USD 30 for 15 days, USD 50 for 30 days, or USD 125 for 90 days, payable in cash on arrival. The 'visa year' resets every 1 January regardless of when your first trip happened.",
      "totalTime": "PT1H",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "text": "Optionally fill out the online Nepal Tourist Visa arrival form a few days before your flight to save time - it's not mandatory, as kiosks at the airport let you complete it on arrival."
        },
        {
          "@type": "HowToStep",
          "text": "On landing at Tribhuvan International Airport (KTM), use the self-service kiosks to scan your passport and print your arrival form receipt if you haven't already."
        },
        {
          "@type": "HowToStep",
          "text": "Go to the visa counter and join the line for SAARC nationals. Hand over your passport, photo, and printed form."
        },
        {
          "@type": "HowToStep",
          "text": "If this is your first entry to Nepal in the current calendar year (1 January - 31 December), the 30-day tourist visa is issued free of charge. If it's a repeat visit this year, pay the standard fee in cash (USD preferred): USD 30 for 15 days, USD 50 for 30 days, or USD 125 for 90 days."
        },
        {
          "@type": "HowToStep",
          "text": "Proceed to immigration for passport stamping, then collect your luggage and exit to the arrivals hall."
        }
      ]
    }
  ]
}`
    }
  },
  {
    id: "thailand-visa",
    country: "Thailand",
    requirementType: "e-Visa",
    costBdt: "approx BDT 6,500 - 8,500 (Tourist Visa government fee ~THB 2,000, plus service charges if applying via an agency)",
    processingTime: "5 - 10 Business Days (allow up to 15 in peak season - Oct to Feb)",
    documentChecklist: [
      {
        category: "Core Documents (Uploaded Online via thaievisa.go.th)",
        items: [
          "Passport valid for at least 6 months with 2 blank pages (clear colour scan)",
          "Digital photo, 35mm x 45mm, white background, taken within the last 6 months",
          "Confirmed return flight ticket (Dhaka - Bangkok - Dhaka)",
          "Hotel booking confirmation for the full stay",
          "6-month personal bank statement showing a minimum balance of THB 20,000 (approx BDT 65,000) per person, or THB 40,000 (approx BDT 1,30,000) per family",
          "Bank Solvency Certificate confirming the above balance"
        ]
      },
      {
        category: "Occupational Proof (Dhaka Jurisdiction Requirements)",
        items: [
          "For Employees: No Objection Certificate (NOC) from employer and office ID/visiting card",
          "For Business Owners: Trade License (notarized, with English translation) and company pad letter",
          "For Students: Valid student ID and a bonafide certificate from the institution",
          "For Spouses travelling together: Marriage certificate (notarized if names differ across passports)"
        ]
      }
    ],
    stepByStep: [
      "Create an account on Thailand's official e-Visa portal (thaievisa.go.th) and select the Dhaka jurisdiction for your application.",
      "Choose 'Tourist Visa (TR)', then enter your travel dates, passport details, and accommodation information exactly as they appear on your booking confirmations.",
      "Upload clear digital scans: passport bio-page, recent 35x45mm photo, return flight ticket, hotel booking, 6-month bank statement, and the relevant occupational document for your category.",
      "Pay the visa fee (approx THB 2,000) through the portal. Note: some applicants in Bangladesh may still be directed to pay via the Royal Thai Embassy or an authorised visa centre (VFS) due to local payment processing limits - the portal will indicate this if it applies to you.",
      "Track your application status by email or on the portal. Processing typically takes 5-10 working days. Once approved, download and print the e-Visa approval notice in colour and present it at Dhaka airport check-in and to Thai immigration on arrival."
    ],
    quickAnswer: "Bangladeshi passport holders cannot get a visa on arrival in Thailand and must apply for an advance e-visa or sticker visa. The tourist visa allows a maximum stay of 60 days, costs approximately BDT 6,500 to BDT 8,500 (THB 2,000 government fee), and takes 5 to 10 working days to process. All applications from Bangladesh are processed online through the official Thai e-Visa portal (thaievisa.go.th). You must upload a six-month bank statement showing a minimum balance of BDT 65,000 (THB 20,000) per person to qualify.",
    keyFacts: [
      { label: "Visa Route", value: "Official e-Visa Portal (thaievisa.go.th)" },
      { label: "Visa on Arrival Eligible?", value: "No - advance visa required" },
      { label: "Visa Validity / Stay", value: "60 days (Tourist Visa - TR)" },
      { label: "Typical Processing Time", value: "5 - 10 working days" }
    ],
    faqs: [
      {
        question: "Can Bangladeshi passport holders get a visa on arrival in Thailand?",
        answer: "No. Bangladeshi citizens are not on Thailand's visa-on-arrival eligibility list and must obtain a Tourist Visa (TR) before departure - either through the official e-Visa portal or, in some cases, through the Royal Thai Embassy or an authorised visa centre in Dhaka."
      },
      {
        question: "Is the Thailand e-Visa for Bangladeshi citizens new?",
        answer: "Yes. The Royal Thai Embassy in Dhaka introduced e-Visa access for Bangladeshi applicants starting January 2025, allowing most applicants to apply fully online via thaievisa.go.th instead of submitting a physical passport at a visa centre."
      },
      {
        question: "How much bank balance do I need for a Thailand visa from Bangladesh?",
        answer: "Plan for at least THB 20,000 (about BDT 65,000) per person, or THB 40,000 (about BDT 1,30,000) for a family travelling together, shown via a 6-month bank statement plus a bank solvency certificate."
      },
      {
        question: "How long can I stay in Thailand on a Tourist Visa (TR)?",
        answer: "The standard Tourist Visa allows a stay of up to 60 days from your date of entry. It can usually be extended once for an additional 30 days at a local Thai immigration office, subject to current immigration rules."
      },
      {
        question: "Do I need to submit my passport in person for a Thailand visa from Bangladesh?",
        answer: "Most applicants can now complete the process fully online through thaievisa.go.th. Some categories may still be asked to submit documents in person at the Royal Thai Embassy in Dhaka or an authorised visa centre - the portal will tell you if this applies to your application."
      },
      {
        question: "Is one Thailand visa valid for Bangkok, Phuket, and Chiang Mai?",
        answer: "Yes. A single Thailand Tourist Visa (TR) or e-Visa is valid for entry and travel anywhere within Thailand, including Bangkok, Phuket, Chiang Mai, and Pattaya - no separate visas are needed for different cities."
      }
    ],
    schemaMarkup: {
      type: "GovernmentService + FAQPage",
      description: "Thailand e-Visa process for Bangladeshi citizens (updated post-Jan 2025)",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentService",
      "name": "Thailand Tourist Visa (TR) e-Visa for Bangladeshi Citizens",
      "serviceType": "Tourist Visa",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "Royal Thai Embassy, Dhaka"
      },
      "areaServed": "Bangladesh",
      "audience": {
        "@type": "Audience",
        "audienceType": "Bangladeshi passport holders"
      }
    },
    {
      "@type": "HowTo",
      "name": "How to get a Thailand visa as a Bangladeshi citizen",
      "description": "Bangladeshi passport holders are not eligible for visa-free entry or visa on arrival in Thailand and must apply in advance. Since January 2025, this is done through Thailand's official e-Visa portal (thaievisa.go.th), which replaced the old embassy-only sticker process for most applicants. The Tourist Visa (TR) allows a 60-day stay, costs around THB 2,000 (about BDT 6,500-8,500), and typically takes 5-10 working days to process.",
      "totalTime": "P10D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "6500"
      },
      "step": [
        {
          "@type": "HowToStep",
          "text": "Create an account on Thailand's official e-Visa portal (thaievisa.go.th) and select the Dhaka jurisdiction for your application."
        },
        {
          "@type": "HowToStep",
          "text": "Choose 'Tourist Visa (TR)', then enter your travel dates, passport details, and accommodation information exactly as they appear on your booking confirmations."
        },
        {
          "@type": "HowToStep",
          "text": "Upload clear digital scans: passport bio-page, recent 35x45mm photo, return flight ticket, hotel booking, 6-month bank statement, and the relevant occupational document for your category."
        },
        {
          "@type": "HowToStep",
          "text": "Pay the visa fee (approx THB 2,000) through the portal. Note: some applicants in Bangladesh may still be directed to pay via the Royal Thai Embassy or an authorised visa centre (VFS) due to local payment processing limits - the portal will indicate this if it applies to you."
        },
        {
          "@type": "HowToStep",
          "text": "Track your application status by email or on the portal. Processing typically takes 5-10 working days. Once approved, download and print the e-Visa approval notice in colour and present it at Dhaka airport check-in and to Thai immigration on arrival."
        }
      ]
    }
  ]
}`
    }
  },
  {
    id: "malaysia-visa",
    country: "Malaysia",
    requirementType: "e-Visa",
    costBdt: "BDT 3,800 - BDT 4,200",
    processingTime: "2 - 4 Business Days",
    documentChecklist: [
      {
        category: "Digital Materials",
        items: [
          "High resolution scan of passport bio-data and signature pages",
          "Studio passport photograph (3.5cm x 5.0cm, white background, matte finish)",
          "6-month Bank Statement with a minimum current balance of BDT 80,000 per person",
          "Bank Solvency Certificate from bank manager",
          "Confirmed return airline ticket and hotel reservation vouchers in Malaysia"
        ]
      }
    ],
    stepByStep: [
      "Access the official Malaysia eVisa portal (malaysiavisa.imi.gov.my) or use an accredited agency.",
      "Upload clean scans of your photo, passport bio-page, return itinerary, and bank documents. Accuracy is highly critical.",
      "Pay the processing fee using credit card, international debit card, or mobile banking if using partner portals.",
      "Check your email inbox or portal status daily. If any 'Additional Documents Resubmission' is requested, resolve it immediately.",
      "Upon approval, download and print the A4 physical paper eVisa. Keep this paper securely folded inside your passport when departing Dhaka."
    ],
    quickAnswer: "Malaysia offers a reliable, fully online eVisa system for Bangladeshi citizens. You do not need to drop off physical passports at an embassy. Submit professional passport photos, high-resolution bio-data scans, and a 6-month bank statement (showing BDT 80,000+ balance) directly to the Immigration Department of Malaysia's online portal. Total costs are around BDT 3,800 to 4,200, and approval typically arrives in 2-4 working days.",
    keyFacts: [
      { label: "Application Portal", value: "Online eVisa Portal" },
      { label: "Required Bank Balance", value: "Min BDT 80,000 (Per person)" },
      { label: "Processing Duration", value: "48-96 Standard business hours" },
      { label: "Maximum Visa Stay", value: "30 days per entry" }
    ],
    faqs: [
      {
        question: "Does Malaysia require a printed eVisa at immigration?",
        answer: "Yes, you must print the eVAL (Electronic Visa Approval Letter) in color or clear black-and-white on standard white paper. Present this to Malaysian immigration officers at KLIA on arrival."
      }
    ],
    schemaMarkup: {
      type: "VisaGuide",
      description: "Malaysia digital tourist visa system",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentPermit",
      "name": "Malaysia Tourist eVisa"
    },
    {
      "@type": "HowTo",
      "name": "How to get a Malaysia visa as a Bangladeshi citizen",
      "description": "Malaysia offers a reliable, fully online eVisa system for Bangladeshi citizens. You do not need to drop off physical passports at an embassy. Submit professional passport photos, high-resolution bio-data scans, and a 6-month bank statement (showing BDT 80,000+ balance) directly to the Immigration Department of Malaysia's online portal. Total costs are around BDT 3,800 to 4,200, and approval typically arrives in 2-4 working days.",
      "totalTime": "P4D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "3800"
      },
      "step": [
        {
          "@type": "HowToStep",
          "text": "Access the official Malaysia eVisa portal (malaysiavisa.imi.gov.my) or use an accredited agency."
        },
        {
          "@type": "HowToStep",
          "text": "Upload clean scans of your photo, passport bio-page, return itinerary, and bank documents. Accuracy is highly critical."
        },
        {
          "@type": "HowToStep",
          "text": "Pay the processing fee using credit card, international debit card, or mobile banking if using partner portals."
        },
        {
          "@type": "HowToStep",
          "text": "Check your email inbox or portal status daily. If any 'Additional Documents Resubmission' is requested, resolve it immediately."
        },
        {
          "@type": "HowToStep",
          "text": "Upon approval, download and print the A4 physical paper eVisa. Keep this paper securely folded inside your passport when departing Dhaka."
        }
      ]
    }
  ]
}`
    }
  },
  {
    id: "dubai-visa",
    country: "UAE",
    requirementType: "e-Visa",
    costBdt: "BDT 11,500 - BDT 14,500 (30 Days Single Entry)",
    processingTime: "3 - 5 Business Days",
    documentChecklist: [
      {
        category: "Electronic Scan Requirements",
        items: [
          "Coloured high-resolution scan of passport biographical details page (Min 6 months validity)",
          "Studio passport size photo (4.3cm x 5.5cm, white background, no glasses)",
          "Scan of National ID Card (NID) or Birth Certificate",
          "6-month Bank Statement with a minimum current balance of BDT 1,50,000 per person",
          "Confirmed return airline booking and active hotel voucher in Dubai"
        ]
      }
    ],
    stepByStep: [
      "Select a registered travel partner of DNRD/GDRFA, flydubai/Emirates or an accredited outbound agency inside Bangladesh.",
      "Submit high-resolution scans of your passport bio-page, photograph, hotel reservations, and return bookings.",
      "The agency uploads your application to the official UAE GDRFA or ICP digital portal for security checks.",
      "Wait for security clearances. UAE authorities verify applicant profiles. Processing duration is typically 72 to 120 working hours.",
      "Receive your approved high-security eVisa PDF. Print a color copy to present during exit check-in at Dhaka (DAC) and entry borders in Dubai (DXB)."
    ],
    quickAnswer: "Bangladeshi citizens can easily secure tourist visas to the United Arab Emirates using the fully electronic sponsor-based eVisa system. Visas are processed in 3-5 days without needing passport submission. Applications are handled through airlines (Emirates, flydubai, Air Arabia) or approved local agents in Dhaka. A 6-month bank statement with BDT 150,000+ is recommended for flawless security approval. Note: UAE visa applications are not submitted directly to an embassy — you apply through Emirates, flydubai, Air Arabia, or an approved Dhaka-based travel agent.",
    keyFacts: [
      { label: "Visa Mechanism", value: "Electronic Sponsor-based eVisa" },
      { label: "Standard Processing", value: "3 to 5 business days" },
      { label: "Visa Cost (BDT)", value: "approx BDT 12,000" },
      { label: "Approval Security Check", value: "Standard profile reviews apply" }
    ],
    faqs: [
      {
        question: "Is there an age restriction for single tourist visas to Dubai?",
        answer: "Yes, single male travelers under the age of 25-30 may face tighter criteria are required to apply with families or provide proof of active local employment / business ownership in Bangladesh."
      }
    ],
    schemaMarkup: {
      type: "VisaGuide",
      description: "Dubai tourist eVisa procedures",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentPermit",
      "name": "UAE Outbound Tourist eVisa"
    },
    {
      "@type": "HowTo",
      "name": "How to get a UAE visa as a Bangladeshi citizen",
      "description": "Bangladeshi citizens can easily secure tourist visas to the United Arab Emirates using the fully electronic sponsor-based eVisa system. Visas are processed in 3-5 days without needing passport submission. Applications are handled through airlines (Emirates, flydubai, Air Arabia) or approved local agents in Dhaka. A 6-month bank statement with BDT 150,000+ is recommended for flawless security approval. Note: UAE visa applications are not submitted directly to an embassy — you apply through Emirates, flydubai, Air Arabia, or an approved Dhaka-based travel agent.",
      "totalTime": "P5D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "11500"
      },
      "step": [
        {
          "@type": "HowToStep",
          "text": "Select a registered travel partner of DNRD/GDRFA, flydubai/Emirates or an accredited outbound agency inside Bangladesh."
        },
        {
          "@type": "HowToStep",
          "text": "Submit high-resolution scans of your passport bio-page, photograph, hotel reservations, and return bookings."
        },
        {
          "@type": "HowToStep",
          "text": "The agency uploads your application to the official UAE GDRFA or ICP digital portal for security checks."
        },
        {
          "@type": "HowToStep",
          "text": "Wait for security clearances. UAE authorities verify applicant profiles. Processing duration is typically 72 to 120 working hours."
        },
        {
          "@type": "HowToStep",
          "text": "Receive your approved high-security eVisa PDF. Print a color copy to present during exit check-in at Dhaka (DAC) and entry borders in Dubai (DXB)."
        }
      ]
    }
  ]
}`
    }
  },
  {
    id: "singapore-visa",
    country: "Singapore",
    requirementType: "e-Visa",
    costBdt: "BDT 4,200 - BDT 6,500 (SGD 30 Embassy Fee + Authorized Agent Service Charge; higher if agency arranges LOI)",
    processingTime: "5 - 7 Business Days (excluding submission day and weekends)",
    documentChecklist: [
      {
        category: "Mandatory Core Documents (Submitted via Authorized Visa Agent)",
        items: [
          "Original Passport valid for at least 6 months from arrival date in Singapore + old passports (if any)",
          "Completed & signed Singapore Visa Application Form 14A",
          "2 recent passport-size photographs (35mm x 45mm, matte finish, plain white background, 80% face coverage, taken within 3 months)",
          "Letter of Introduction (LOI - Form V39A) issued by a Singapore Citizen or Permanent Resident aged 21+ (if you do not have a local contact, select an authorized Dhaka agent that provides LOI support)",
          "6-month Personal Bank Statement with a minimum closing balance of BDT 1,50,000+ per person and Bank Solvency Certificate",
          "Confirmed roundtrip flight itinerary (Dhaka - Singapore - Dhaka) and hotel booking confirmation"
        ]
      },
      {
        category: "Profession-Specific Supporting Papers",
        items: [
          "For Job Holders: Original No Objection Certificate (NOC) on company letterhead, Pay Slips (last 3 months), and Office ID card copy",
          "For Business Owners: Renewed Trade License (notarized English translation), Company Pad cover letter, and Visiting Card",
          "For Medical Travelers: Appointment confirmation letter from the Singapore hospital (e.g., Mount Elizabeth, Raffles, or NUH)",
          "For Families: Marriage Certificate (Nikahnama) and Birth Certificates for accompanying children"
        ]
      }
    ],
    stepByStep: [
      "Prepare your 6-month bank statement, occupational documents (NOC or Trade License), and two 35x45mm matte white-background photos.",
      "Obtain a Letter of Introduction (Form V39A) from a Singapore Citizen/PR contact, OR choose an accredited Singapore High Commission Authorized Visa Agent in Dhaka (such as Simon Overseas, Silkways, or Lexing Global) that assists with tourist profiles.",
      "Submit your physical passport, signed Form 14A, and supporting documents at the authorized visa agent's office in Dhaka or Chattogram (direct walk-in applications at the Consulate are not accepted).",
      "Wait 5 to 7 working days for the Consulate of the Republic of Singapore in Dhaka to process the application.",
      "Once approved, collect your passport and print the official Singapore e-Visa PDF. Within 72 hours before your flight, submit the free online SG Arrival Card (SGAC) at eservices.ica.gov.sg."
    ],
    quickAnswer: "Bangladeshi passport holders require a pre-arranged e-Visa to enter Singapore. You cannot apply directly at the Singapore Consulate in Dhaka; all applications must be submitted through an embassy-approved Authorized Visa Agent. The visa costs approximately BDT 4,200 to BDT 6,500 (SGD 30 government fee plus agency charge) and takes 5 to 7 working days. A Letter of Introduction (LOI Form V39A) from a Singapore local contact or sponsor is standardly required, along with a 6-month bank statement showing at least BDT 1,50,000 balance.",
    keyFacts: [
      { label: "Submission Channel", value: "Authorized Visa Agents in Dhaka" },
      { label: "Total Visa Cost", value: "BDT 4,200 - 6,500" },
      { label: "Processing Window", value: "5 to 7 Working Days" },
      { label: "Pre-Flight Requirement", value: "Free SG Arrival Card (72h prior)" }
    ],
    faqs: [
      {
        question: "What if I do not know anyone in Singapore to give me a Letter of Introduction (LOI)?",
        answer: "If you do not have a friend, relative, or business contact in Singapore to sign Form V39A (LOI), well-traveled applicants (with prior Schengen/US/UK or multiple Asian visas) or families booking through accredited Authorized Visa Agents in Dhaka can apply with a strong cover letter or agency-facilitated local tour sponsorship."
      },
      {
        question: "Is the SG Arrival Card (SGAC) the same as a Singapore Visa?",
        answer: "No. The SG Arrival Card is a mandatory free health and electronic arrival declaration that ALL travelers must submit online within 3 days before landing at Changi Airport. Bangladeshi citizens must carry BOTH their approved e-Visa printout and the SG Arrival Card confirmation."
      }
    ],
    schemaMarkup: {
      type: "GovernmentService + FAQPage",
      description: "Singapore tourist e-Visa guide for Bangladeshi passport holders",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentService",
      "name": "Singapore Tourist e-Visa for Bangladeshi Citizens",
      "serviceType": "Tourist Visa",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "Consulate of the Republic of Singapore, Dhaka"
      },
      "areaServed": "Bangladesh"
    },
    {
      "@type": "HowTo",
      "name": "How to apply for a Singapore visa from Bangladesh",
      "totalTime": "P7D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "4500"
      },
      "step": [
        { "@type": "HowToStep", "text": "Gather 6-month bank statement (BDT 150,000+), NOC/Trade License, and 35x45mm matte photos." },
        { "@type": "HowToStep", "text": "Submit Form 14A and LOI (Form V39A) through an Authorized Visa Agent in Dhaka." },
        { "@type": "HowToStep", "text": "Print the approved e-Visa and complete the free SG Arrival Card within 72 hours of departure." }
      ]
    }
  ]
}`
    }
  },
  {
    id: "maldives-visa",
    country: "Maldives",
    requirementType: "Visa On Arrival",
    costBdt: "Free (30-Day Tourist Visa on Arrival is 100% gratis for Bangladeshi citizens)",
    processingTime: "Instant on arrival at Velana International Airport (MLE)",
    documentChecklist: [
      {
        category: "Mandatory Documents for Dhaka Departure & Malé Arrival",
        items: [
          "Machine-Readable Passport (MRP or e-Passport) with at least 6 months validity",
          "IMUGA Traveller Declaration QR Code (completed free online within 96 hours prior to flight)",
          "Confirmed roundtrip air ticket (Dhaka – Malé – Dhaka)",
          "Pre-booked, confirmed hotel or guesthouse voucher at a registered Maldivian tourist facility (e.g., Maafushi, Hulhumalé, or resort)",
          "Proof of sufficient funds: USD cash ($100+ per day recommended) OR an international dual-currency card endorsed on your passport, plus a recent Bank Statement for Dhaka immigration clearance"
        ]
      }
    ],
    stepByStep: [
      "Book your roundtrip flight from Dhaka to Malé (MLE) and reserve a registered hotel/guesthouse on Booking.com, Agoda, or directly with the property.",
      "Endorse US Dollars on your passport (cash USD and/or dual-currency credit/debit card) at any authorized bank in Bangladesh.",
      "Within 96 hours (4 days) before your departure flight from Dhaka, go to the official Maldives Immigration portal (imuga.immigration.gov.mv) and fill out the free Traveller Declaration form to receive your QR code.",
      "Present your passport, return ticket, hotel voucher, USD endorsement, and IMUGA QR code screenshot at Hazrat Shahjalal International Airport (DAC) check-in and immigration.",
      "Upon landing at Velana International Airport (MLE), walk directly to the immigration desk with your passport, hotel voucher, and return ticket to receive your free 30-day Tourist Visa stamp."
    ],
    quickAnswer: "Bangladeshi citizens get a completely free 30-day Tourist Visa on Arrival in the Maldives—no advance embassy application or visa fee is required. To clear Dhaka airport immigration and Malé arrival smoothly, you must carry a passport with 6+ months validity, a confirmed return flight ticket, a paid or confirmed hotel booking at a registered tourist property, USD endorsement on your passport, and the free IMUGA Traveller Declaration QR code completed online within 96 hours before flying.",
    keyFacts: [
      { label: "Visa Type", value: "Free 30-Day Visa on Arrival" },
      { label: "Visa Fee", value: "BDT 0 (100% Free)" },
      { label: "Mandatory Online Form", value: "IMUGA Declaration (within 96h)" },
      { label: "Required Funds Proof", value: "Confirmed Hotel + USD Endorsement" }
    ],
    faqs: [
      {
        question: "Why do some Bangladeshi travelers get stopped at Dhaka airport when flying to the Maldives?",
        answer: "Dhaka emigration officers verify that you are a genuine tourist and not traveling on a tourist entry to seek unauthorized work. Always carry a printed hotel voucher, return ticket, USD cash/card endorsement, your 6-month bank statement, and your job NOC or trade license to breeze through Dhaka immigration in 2 minutes."
      },
      {
        question: "Does the IMUGA form cost any money?",
        answer: "No! The official Maldives Immigration IMUGA Traveller Declaration (imuga.immigration.gov.mv) is 100% free. Never pay third-party scam websites for completing the IMUGA form."
      }
    ],
    schemaMarkup: {
      type: "GovernmentService + FAQPage",
      description: "Maldives free Visa on Arrival and IMUGA guide for Bangladeshi citizens",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentService",
      "name": "Maldives Free Tourist Visa on Arrival for Bangladeshi Citizens",
      "serviceType": "Visa on Arrival",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "Maldives Immigration"
      },
      "areaServed": "Bangladesh"
    },
    {
      "@type": "HowTo",
      "name": "How to get a Maldives Visa on Arrival from Bangladesh",
      "totalTime": "PT30M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "BDT",
        "value": "0"
      },
      "step": [
        { "@type": "HowToStep", "text": "Book a confirmed return flight and registered Maldives hotel or Maafushi guesthouse." },
        { "@type": "HowToStep", "text": "Complete the free IMUGA Traveller Declaration online within 96 hours before departure." },
        { "@type": "HowToStep", "text": "Present your passport, hotel voucher, and return ticket at Malé Airport for a free 30-day stamp." }
      ]
    }
  ]
}`
    }
  }
];

export const DESTINATIONS_DATA: DestinationGuide[] = [
  {
    id: "nepal-guide",
    country: "Nepal",
    title: "Nepal Trip Plan from Bangladesh: 5-Day Itinerary, Costs & Visa Guide",
    description: "Nestled in the mighty Himalayas, Nepal is a backpacker's wonderland complete with beautiful stupas, massive mountain vistas, rich culture, and extremely budget-friendly organic tea houses.",
    bestTimeToVisit: "October to November (crystal clear autumn skies perfect for mountain viewing) and March to April (spring blooms and pleasant temperatures)",
    itinerary: [
      { day: 1, title: "Kathmandu Valley Arrival", activities: ["Land at Tribhuvan Airport KTM & claim your Gratis Visa", "Check into your Thamel hostel or boutique hotel", "Wander through Thamel streets, try Momo at Western Tandoori, buy local outdoor supplies"] },
      { day: 2, title: "Cultural Landmarks of Kathmandu", activities: ["Early morning visit to Boudhanath Stupa to watch monks circumambulate", "Explore Soyambhunath (The Monkey Temple) at sunset looking over the valley skyline", "Experience the sacred evening aarti on the banks of Bagmati river at Pashupatinath Temple"] },
      { day: 3, title: "Ancient Durbar Squares", activities: ["Take a taxi to Patan Durbar Square to admire historic Newari brick palaces", "Visit the golden temple and historic craft guilds", "Travel to Bhaktapur, known for pottery workshops, hand-curd Juju Dhau, and historical pagoda arches"] },
      { day: 4, title: "Scenic Pokhara Escape", activities: ["Take an early tourist bus from Kathmandu to Pokhara (6-8 hours scenic highway drive)", "Check in lakeside, row a wooden boat across Phewa Lake under the reflection of Fishtail Mountain", "Enjoy a warm woodfired pizza directly beside the lake"] },
      { day: 5, title: "Sarangkot Sunrise & Departure", activities: ["Wake up early at 4:30 AM to catch the glorious Annapurna range sunrise from Sarangkot peak", "Rent a motorbike to explore Devi's falls and Gupteshwor cave", "Catch your evening flight or bus back to Kathmandu/Dhaka"] }
    ],
    localTransport: ["Tourist buses for cross-city travel (Kathmandu to Pokhara: BDT 1,200 - 1,800)", "Local ride-sharing apps (Pathao now operates actively in Kathmandu for super cheap rides!)", "Metered prepaid yellow taxis (negotiating a flat rate in advance is standard practice)"],
    budgetBdt: "BDT 20,000 - BDT 35,000 per person (Excluding airfare, based on budget backpacking / mid hotels)",
    quickAnswer: "A complete 5-day Nepal tour itinerary from Bangladesh costs between BDT 20,000 and BDT 35,000 per person in local expenses, excluding international airfare. This budget covers standard sightseeing in Kathmandu, Bhaktapur, and Pokhara alongside local meals and tourist bus transport. Bangladeshi passport holders qualify for a free 30-day Visa on Arrival for their first trip of each calendar year, saving an extra USD 30 in entry fees. The optimal months to visit for clear Himalayan views are October through November and March through April.",
    keyFacts: [
      { label: "Recommended Trip Length", value: "5 to 8 Days" },
      { label: "Daily Local Budget (BDT)", value: "3,000 - 4,500 / day" },
      { label: "Main Cities to Visit", value: "Kathmandu, Pokhara, Bhaktapur" },
      { label: "Visa for Bangladeshis", value: "Free on Arrival (1st trip/year)" }
    ],
    faqs: [
      {
        question: "How many days do I need for a Nepal trip from Bangladesh?",
        answer: "5 days is enough for a solid first trip - typically 3 days in Kathmandu (including a side trip to Bhaktapur) and 2 days in Pokhara. If you want time to relax by Phewa Lake or do a short hike, 7-8 days gives a more comfortable pace."
      },
      {
        question: "What is the best time to visit Nepal from Bangladesh?",
        answer: "October to November offers the clearest skies and best mountain views, ideal right after the monsoon. March to April brings pleasant spring temperatures and blooming rhododendrons. Both are considered Nepal's best travel seasons."
      },
      {
        question: "Can I travel around Nepal without booking a tour package?",
        answer: "Yes, independent travel is straightforward in Nepal's main tourist areas. Tourist buses connect Kathmandu and Pokhara affordably, ride-hailing apps like Pathao operate within Kathmandu Valley, and most hotels and guesthouses can arrange local sightseeing."
      },
      {
        question: "Is Nepal a good first international trip for Bangladeshi travelers?",
        answer: "Yes - Nepal is widely considered one of the easiest first international trips for Bangladeshis: there's no advance visa to arrange (free Visa on Arrival for the first trip each year), the flight is just 1.5 hours, and daily costs are among the lowest in the region."
      },
      {
        question: "What food should I try in Nepal as a Bangladeshi traveler?",
        answer: "Momo (steamed or fried dumplings) and Dal Bhat (lentils, rice, and vegetable curry) are Nepal's everyday staples and widely available. Many dishes share familiar South Asian flavors, and vegetarian options are easy to find throughout Kathmandu and Pokhara."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Nepal itineraries",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Nepal"
}`
    }
  },
  {
    id: "thailand-guide",
    country: "Thailand",
    title: "Bangkok & Beyond: Street Food, Markets, and Golden Temples",
    description: "Thailand is an absolute powerhouse of modern retail, culinary brilliance, and historic Buddhist artwork. This guide explores the vibrant capital Bangkok, perfectly optimized for first-time visitors.",
    bestTimeToVisit: "November to February (dry, coolest winter weather, perfect for walking the markets and boat rides)",
    itinerary: [
      { day: 1, title: "Bangkok Arrival & Pratunam Shopping", activities: ["Arrive at BKK, take the fast Airport Rail Link straight to Phaya Thai", "Check into your hotel near Pratunam Mall", "Wander around night food stalls, and shop at Platinum Fashion Mall"] },
      { day: 2, title: "Historical River Tour", activities: ["Take the BTS Skytrain to Sathorn Pier, board the Chao Phraya Tourist Boat", "Visit Wat Arun (The Temple of Dawn) with its dazzling porcelain mosaics", "Cross the river to see Wat Pho's grand Reclining Buddha"] },
      { day: 3, title: "Shopping Extravaganza", activities: ["Spend the morning bargaining at Chatuchak Weekend Market (over 15,000 stalls!)", "Explore high-end Siam Paragon, CentralWorld, and MBK Center", "Taste high-quality premium mango sticky rice at Siam Bazaar"] },
      { day: 4, title: "Floating Market Tour", activities: ["Book an early morning local minibus tour to Damnoen Saduak Floating Market", "Ride a longtail boat through local orchard channels, watching vendors cook directly on canoes", "Visit the nearby Maeklong Railway Market, where market awnings collapse as trains roll through"] }
    ],
    localTransport: ["BTS Skytrain & MRT Subway (extremely fast, air-conditioned, BDT 50-150 per ticket)", "Grab / Bolt Ride-sharing (highly transparent pricing, great for families to avoid taxi negotiations)", "Khlong Canal Boats (fast, off-the-grid transportation, BDT 30 per cruise)"],
    budgetBdt: "BDT 35,000 - BDT 60,000 per person (Excluding airfare, based on comfortable shopping & dining)",
    quickAnswer: "Bangkok represents the ultimate mix of retail and culinary travel. For a basic 4-day trip, budget BDT 35,000 for shopping, hotels, transport, and amazing food. Utilize the BTS Skytrain to skip Bangkok's infamous gridlock, and focus your food itinerary around Pratunam halal zones or Sukhumvit.",
    keyFacts: [
      { label: "Optimal Duration", value: "4 to 6 Days" },
      { label: "Daily Local Budget", value: "BDT 6,000 - 9,000 / day" },
      { label: "Top Shopping Epicenter", value: "Pratunam & Siam Square" },
      { label: "Bargain Rule", value: "Polite negotiation is highly accepted at open markets" }
    ],
    faqs: [
      {
        question: "How do I avoid heavy traffic jams in Bangkok?",
        answer: "Always stay near a BTS Skytrain or MRT Subway station. Avoid taking traditional taxis or Tuk-Tuks on main streets like Sukhumvit or Pratunam during peak rush hours (8am-10am, 5pm-8pm)."
      },
      {
        question: "Where can Bangladeshi travelers find halal food in Bangkok?",
        answer: "Halal food is abundant around Sukhumvit Soi 3 to 11 (Nana Arab Street), the Pratunam wholesale market area, and around the Phaya Thai / Ramkhamhaeng neighborhoods. Major shopping malls like MBK Center and Platinum Fashion Mall have certified halal food court counters."
      },
      {
        question: "Can I pay for street shopping in Bangkok using international cards?",
        answer: "Street markets like Chatuchak, Pratunam, and night markets operate predominantly on cash Thai Baht (THB). Carry cash exchanged at SuperRich counters in Bangkok for the best rates, and use your endorsed dual-currency debit/credit card for malls and hotel payments."
      },
      {
        question: "Is Bangkok safe for Bangladeshi families and solo tourists?",
        answer: "Yes, Bangkok is widely considered very safe for families and solo travelers with low violent crime rates. Use ride-hailing apps like Grab or Bolt for transparent fares, and take standard precautions with personal belongings in crowded night markets."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Bangkok itineraries",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Bangkok"
}`
    }
  },
  {
    id: "malaysia-guide",
    country: "Malaysia",
    title: "Kuala Lumpur Decoded: Skyscrapers, Green Parks, and Street Feasts",
    description: "Kuala Lumpur represents the best of Southeast Asia - an incredibly smooth, highly developed city where lush jungle tree lines merge seamlessly with steel-and-glass skyscrapers.",
    bestTimeToVisit: "May to July (dry season on the west coast, boasting minimal rain and stunning golden sunsets)",
    itinerary: [
      { day: 1, title: "Arrival & Twin Towers Walk", activities: ["Arrive at KLIA, board the high speed KLIA Ekspres (reaches city in 28 mins!)", "Check into your KLCC skyscraper apartment with tower views", "Stroll through KLCC Park and witness the colorful evening Lake Symphony water fountain show"] },
      { day: 2, title: "Batu Caves & Cultural Sights", activities: ["Take a ride-share to Batu Caves, climbing the 272 vibrant color steps into the limestone cavern guarded by Murugan's tall gold statue", "Stroll through the heritage Sultan Abdul Samad Building and historic Merdeka Square", "Delve into Chinatown for hipster iced coffee inside converted historical warehouses"] },
      { day: 3, title: "Bukit Bintang Mall Crawl & Food Alleys", activities: ["Marvel at the design inside Pavilion Mall", "Walk along the air-conditioned sky bridge from Pavilion to KLCC", "Spend the evening devouring world-class satay, noodles, and durian at the Jalan Alor Night Market"] },
      { day: 4, title: "Genting Highlands Day Trip", activities: ["Take an express bus from KL Sentral to Genting Highlands cable car station", "Ride the Awana Skyway cable car up into the clouds and cooler mountain breezes", "Spend the afternoon touring the theme parks or shopping at premium outlets"] }
    ],
    localTransport: ["GOKL Free City Bus (completely free inner-city shuttle running on major tourism routes!)", "LRT & MRT Train network (extremely safe, fully automated, direct access to all sights)", "Grab ride-share (massively popular, affordable for 2-4 travelers sharing)"],
    budgetBdt: "BDT 30,000 - BDT 50,000 per person (Excluding airfare, based on city discovery & Genting trips)",
    quickAnswer: "Kuala Lumpur stands out for modern, stress-free South Asian family travel. Local transport costs are minimal thanks to free GOKL buses and affordable MRT trains. A 4-day budget of BDT 30,000 per person covers high-rise penthouse apartments, outstanding culinary experiences at Jalan Alor, and high-altitude Genting Highland day tours",
    keyFacts: [
      { label: "Optimal Duration", value: "4 to 5 Days" },
      { label: "Daily Local Budget", value: "BDT 5,500 - 8,000 / day" },
      { label: "Free Transport Hack", value: "GOKL City Bus (Pink lines are completely free!)" },
      { label: "Top Family Daytrip", value: "Genting Highlands (45 mins away)" }
    ],
    faqs: [
      {
        question: "Is English widely spoken in Kuala Lumpur?",
        answer: "Yes, English is extremely common in Malaysia. Signs, menus, and transit announcements are heavily bilingual, making independent navigation a absolute breeze."
      },
      {
        question: "Are food outlets in Kuala Lumpur halal-friendly for Bangladeshi Muslims?",
        answer: "Yes, Malaysia is a Muslim-majority country with strict JAKIM halal certification standards. Virtually all Malaysian, Mamak (Indian Muslim), and international fast-food restaurants across Kuala Lumpur are certified halal."
      },
      {
        question: "What is the best way to travel from KLIA airport to central Kuala Lumpur?",
        answer: "The fastest option is the high-speed KLIA Ekspres train, reaching KL Sentral station in 28 minutes for RM 55. For families or groups with heavy luggage, a pre-arranged airport transfer or Grab ride (RM 65-85) directly to your hotel is economical and convenient."
      },
      {
        question: "How many days are ideal for a vacation in Kuala Lumpur from Dhaka?",
        answer: "4 to 5 days is recommended for a balanced first trip. This gives you 2 days for city sights (KLCC Twin Towers, Bukit Bintang, Merdeka Square), 1 day for Batu Caves and Chinatown, and 1 full day for the mountain attractions and theme parks of Genting Highlands."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Malaysia itineraries",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Kuala Lumpur"
}`
    }
  },
  {
    id: "dubai-guide",
    country: "UAE",
    title: "Dubai & Beyond: Skyscrapers, Deserts, and Spice Markets",
    description: "A futuristic skyline rising from golden desert dunes, Dubai is a city of superlatives. Perfect for shopping expeditions, architectural marvels, and modern entertainment parks.",
    bestTimeToVisit: "November to March (glorious cool temperatures, perfect for outdoor canal strolls and desert safaris)",
    itinerary: [
      { day: 1, title: "Futuristic Core & Burj Khalifa", activities: ["Land at DXB terminal 1/3, board the driverless Dubai Metro", "Check into your central hotel", "Take in the beautiful Burj Khalifa lake fountain light displays, then explore the massive Dubai Mall"] },
      { day: 2, title: "Historical Deira & Creekside Souks", activities: ["Stroll through historical Al Fahidi historic district, discovering ancient architectural windtowers", "Ride a traditional wooden Abra boat across Dubai Creek for just AED 1", "Bargain for aromatic incense, saffron, and gold bullion at Deira's markets and souks"] },
      { day: 3, title: "Desert Safari Sunset Expedition", activities: ["Board a 4x4 Land Cruiser at your hotel lobby around 2:30 PM", "Experience thrilling dune bashing across the red Arabian desert", "Enjoy a starlit barbecue dinner with traditional Tanoura dance performances in a Bedouin style camp"] },
      { day: 4, title: "Marina Skyline & Beachside Walks", activities: ["Ride the Dubai Tram to Marina Walk, taking photos of the beautiful twisted Cayan Tower", "Relax at the Beach at JBR, or catch the sunset over the palm island", "Enjoy your farewell gourmet dinner overlooks the marina canal lights"] }
    ],
    localTransport: ["Dubai Metro and Tram networks (flawless, ultra-modern, zones based Nol card fares BDT 100-300)", "RTA Public Taxis (safe, fair, metered starting from BDT 355 base fare)", "Careem / Uber App ride-shares (excellent premium services and instant street bookings)"],
    budgetBdt: "BDT 65,000 - BDT 95,000 per person (Excluding airfare, based on desert tours, dining, and metro rides)",
    quickAnswer: "Dubai represents a spectacular modern playground of science-fiction proportions. A basic 4-day trip from Dhaka requires BDT 65,000 local spending covering premium Dubai Metro travel, delicious Deira foods, Burj Khalifa entries, and magical desert safaris. Travel during the cooler winter months (November-March) for the best outdoor experience.",
    keyFacts: [
      { label: "Optimal Duration", value: "4 to 5 Days" },
      { label: "Daily Local Budget", value: "BDT 12,000 - 18,000 / day" },
      { label: "Nol transit card", value: "Nol Card is required for Metro, Tram, & Buses" },
      { label: "Top Free Attraction", value: "The Dubai Mall Fountain shows" }
    ],
    faqs: [
      {
        question: "Is Dubai Metro easy for visitors to navigate?",
        answer: "Extremely easy. The metro has two active lines (Red and Green), is strictly bilingual (English and Arabic), and is directly linked to major shopping terminals including Dubai Mall, Mall of the Emirates, and Deira City Centre."
      },
      {
        question: "What dress code should Bangladeshi tourists observe in Dubai?",
        answer: "Dubai is cosmopolitan and modern. Casual tourist clothes (t-shirts, jeans, modest shorts, summer dresses) are standard in shopping malls, hotels, and beaches. Conservative clothing covering shoulders and knees is only required when visiting mosques or government buildings."
      },
      {
        question: "How does the Dubai Nol card work for tourists?",
        answer: "The Silver Nol Card can be bought at any metro station for AED 25 (includes AED 19 e-purse credit) and gives discounted contactless taps across the Dubai Metro, Tram, RTA public buses, and water buses. It is rechargeable at station ticket machines."
      },
      {
        question: "Is Dubai too expensive for budget travelers from Bangladesh?",
        answer: "Budget trips from Dhaka to Dubai are very manageable. By staying in central Deira or Bur Dubai, eating at local cafeterias (AED 15-25 per meal), and utilizing the Dubai Metro, travelers can keep daily local spending around BDT 8,000 to BDT 12,000."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Dubai itineraries details",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Dubai"
}`
    }
  },
  {
    id: "singapore-guide",
    country: "Singapore",
    title: "Singapore Trip Plan from Bangladesh: 4-Day Itinerary, MRT Hacks & Halal Guide",
    description: "Clean, safe, and effortlessly connected by MRT trains, Singapore packs futuristic indoor rainforests, world-class theme parks on Sentosa Island, and 24-hour shopping in Little India into one compact island nation.",
    bestTimeToVisit: "February to April and July to October (warm, pleasant weather with lower rainfall and great shopping festivals)",
    itinerary: [
      { day: 1, title: "Changi Jewel, Little India & Marina Bay Light Show", activities: ["Land at Changi Airport and visit the HSBC Rain Vortex indoor waterfall inside Jewel Changi (free entry!)", "Take the MRT or Grab to your hotel in Little India / Bugis", "Catch the free 8:00 PM Spectra Light & Water Show outside Marina Bay Sands and walk across the Helix Bridge"] },
      { day: 2, title: "Gardens by the Bay & Historic Arab Street", activities: ["Spend the morning inside the cooled Cloud Forest and Flower Dome conservatories at Gardens by the Bay", "Afternoon heritage walk around Sultan Mosque, Arab Street, and colorful Haji Lane for Turkish/Malay halal lunch", "Return to Supertree Grove at 7:45 PM for the free Garden Rhapsody musical light show"] },
      { day: 3, title: "Sentosa Island & Universal Studios", activities: ["Take the MRT to HarbourFront (VivoCity) and ride the Sentosa Express monorail onto Sentosa Island", "Spend the day at Universal Studios Singapore, S.E.A. Aquarium, or relaxing at Siloso and Palawan Beaches", "Dinner at Malaysian Food Street (Halal options) or VivoCity waterfront"] },
      { day: 4, title: "24-Hour Mustafa Shopping & Departure", activities: ["Morning souvenir, chocolate, watch, and electronics shopping at Mustafa Centre on Serangoon Road", "Claim your 9% Tourist GST Refund at Changi Airport eTRS kiosks before check-in", "Fly direct back to Dhaka (DAC)"] }
    ],
    localTransport: ["SimplyGo Contactless Card: Tap your Bangladeshi dual-currency Visa/Mastercard directly at MRT train and public bus gates (no need to buy paper tickets; fares are BDT 90–200 per ride)", "Grab / Gojek / Zig Apps: Reliable point-to-point car rides when traveling with elderly parents or heavy luggage", "Sentosa Express Monorail: SGD 4 entry from VivoCity Level 3 into Sentosa Island"],
    budgetBdt: "BDT 48,000 - BDT 75,000 per person (Excluding airfare, covering 3 nights hotel, MRT, meals & attractions)",
    quickAnswer: "A 4-day Singapore itinerary from Bangladesh costs approximately BDT 48,000 to BDT 75,000 per person in local expenses (excluding airfare). By staying near Farrer Park or Lavender MRT, tapping your dual-currency Visa/Mastercard directly on MRT trains via SimplyGo, and combining paid icons (Universal Studios, Cloud Forest) with world-class free shows (Jewel Vortex, Supertree Grove light show, Spectra at Marina Bay), Bangladeshi families can enjoy Singapore comfortably without overspending.",
    keyFacts: [
      { label: "Ideal Trip Duration", value: "4 Days / 3 Nights" },
      { label: "Daily Local Budget", value: "BDT 10,000 - 15,000 / day" },
      { label: "Transit Payment Hack", value: "Tap Dual-Currency Card on MRT (SimplyGo)" },
      { label: "Airport Must-See", value: "Jewel Changi Rain Vortex (Free)" }
    ],
    faqs: [
      {
        question: "Can I use my Bangladeshi dual-currency credit or debit card directly on Singapore MRT trains and buses?",
        answer: "Yes! Singapore's SimplyGo system allows foreign contactless Visa and Mastercard cards to be tapped directly at MRT gates and bus readers—saving you the non-refundable SGD 5 card fee of buying a physical EZ-Link card."
      },
      {
        question: "How can I combine Singapore and Malaysia on a single trip from Dhaka?",
        answer: "Many Bangladeshi travelers fly Dhaka → Singapore (spend 3 days), take a luxury 5-hour coach bus across the Johor causeway to Kuala Lumpur for BDT 2,500, spend 3 days in Malaysia, and fly Kuala Lumpur → Dhaka on an open-jaw ticket."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Singapore 4-day travel itinerary for Bangladeshi tourists",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Singapore"
}`
    }
  },
  {
    id: "maldives-guide",
    country: "Maldives",
    title: "Maldives Trip Plan from Bangladesh: 5-Day Maafushi & Resort Island Itinerary",
    description: "Crystal-clear turquoise lagoons, coral reefs teeming with nurse sharks and sea turtles, and powdery white sandbanks—the Maldives is just a 4-hour flight from Dhaka with free Visa on Arrival for Bangladeshis.",
    bestTimeToVisit: "November to April (sunny skies, calmest turquoise water, and highest underwater visibility for snorkeling)",
    itinerary: [
      { day: 1, title: "Arrival at Malé & Speedboat to Maafushi Island", activities: ["Land at Velana International Airport (MLE) and clear free Visa on Arrival immigration", "Board the 35-minute shared speedboat ($25) directly from the airport jetty across turquoise atolls to Maafushi Island", "Watch the Indian Ocean sunset from Bikini Beach and enjoy a beachfront grilled seafood dinner"] },
      { day: 2, title: "Half-Day Snorkeling, Dolphin Cruise & Sandbank Picnic", activities: ["Join a $30–$35 full-day boat excursion to snorkel at Turtle Reef and Coral Garden", "Have a picnic lunch on a secluded white-sandbank in the middle of the ocean (free drone photos often included by local operators!)", "Spot spinner dolphins jumping alongside the boat on the sunset ride back"] },
      { day: 3, title: "Luxury Private Resort Day-Pass OR Shipwreck & Shark Bay", activities: ["Option A: Book a $110–$140 All-Inclusive Resort Day Pass (includes return boat, pool, beach & buffet at a 4/5-star private resort)", "Option B: Take the Vaavu Atoll Shipwreck & friendly Nurse Shark snorkeling tour ($55)", "Evening stroll through Maafushi's sandy streets and souvenir shops"] },
      { day: 4, title: "Transfer to Hulhumalé & Malé Capital Tour", activities: ["Take the morning speedboat back to Malé / Hulhumalé", "Explore Malé City: Friday Mosque, Sultan Park, and the bustling Local Fish Market", "Check into a beachfront hotel in Hulhumalé and relax at Central Park & Hulhumalé Beach"] },
      { day: 5, title: "Morning Ocean Swim & Flight Back to Dhaka", activities: ["Enjoy a sunrise walk along Hulhumalé beachfront with coffee", "Take a 15-minute road taxi ($8) across the Sinamalé Bridge to Velana Airport for your flight back to Dhaka"] }
    ],
    localTransport: ["Airport-to-Maafushi Shared Speedboat: Runs every 1–2 hours directly from Malé Airport jetty ($25 USD / approx BDT 3,000 one-way, 35 mins)", "MTCC Public Ferry: Ultra-cheap government ferry from Malé to Maafushi ($2 USD / BDT 240, 90 mins, does not run on Fridays)", "Hulhumalé Highway Bus & Taxis: Direct road connection from Malé Airport to Hulhumalé for $1–$8 USD"],
    budgetBdt: "BDT 35,000 - BDT 55,000 per person on Local Islands (Excluding airfare; Private Water Villa Resorts start at BDT 1,40,000+)",
    quickAnswer: "A 5-day Maldives trip from Bangladesh does not require a millionaire budget. By basing yourself on Maafushi local island for 3 nights and Hulhumalé for 1 night, your local expenses (beachfront hotel, airport speedboats, meals, and coral/sandbank excursions) come to just BDT 35,000 to BDT 55,000 per person excluding flights. You can even visit a luxury private water-villa resort for a day using a $120 All-Inclusive Resort Day Pass.",
    keyFacts: [
      { label: "Recommended Length", value: "4 to 5 Days" },
      { label: "Local Island Budget", value: "BDT 7,000 - 10,500 / day" },
      { label: "Top Money-Saving Hack", value: "Stay in Maafushi + Take a 1-Day Resort Pass" },
      { label: "Visa for Bangladeshis", value: "Free 30-Day Visa on Arrival" }
    ],
    faqs: [
      {
        question: "How can I get overwater villa photos in the Maldives without paying BDT 50,000/night?",
        answer: "Stay at a comfortable hotel on Maafushi Island (around BDT 8,000/night) and book a 1-Day Private Resort Tour (around $110–$140 USD per person). This includes speedboat transfers, access to the resort's overwater walkways, infinity pool, beaches, and buffet lunch."
      },
      {
        question: "Should I carry US Dollars or Maldivian Rufiyaa from Dhaka?",
        answer: "Carry crisp US Dollar ($50 and $100 bills printed after 2013 with no tears or ink stamps). In the Maldives, almost all guesthouses, speedboats, and excursion operators quote and accept USD directly."
      }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Maldives 5-day itinerary for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Maldives"
}`
    }
  }
];

export const TRIP_COSTS_DATA: TripCostData[] = [
  {
    id: "nepal-costs",
    country: "Nepal",
    durationDays: 5,
    currencyCode: "NPR (Nepali Rupee)",
    exchangeRateText: "1 NPR ≈ 0.88 BDT | 1 BDT ≈ 1.13 NPR",
    categories: [
      { name: "Flights from Dhaka", lowBdt: 28500, midBdt: 33000, highBdt: 38000 },
      { name: "Accommodations (per night)", lowBdt: 1200, midBdt: 3500, highBdt: 12000 },
      { name: "Daily Meals & Street Food", lowBdt: 800, midBdt: 1800, highBdt: 3500 },
      { name: "Intercity Transit / Taxis", lowBdt: 500, midBdt: 1500, highBdt: 4500 },
      { name: "Attraction Tickets & Guides", lowBdt: 600, midBdt: 2500, highBdt: 8000 }
    ],
    seasonalVariation: "September-November is peak season carrying dry clear skies and highest ticket/hotel costs. December-February has chilly nights but great hotel discounts. Monsoon (June-August) has landslide risks but maximum hotel bargains.",
    moneyHacks: [
      "No visa fee! The first visa of any calendar year is fully free for Bangladeshi SAARC nationals, saving you over BDT 3,500 right at immigration.",
      "Book tourist buses like Sofa Template instead of private taxis for Kathmandu to Pokhara travels - it saves up to 80% of transit expenses.",
      "Ask for student discounts if holding a valid university ID at heritage ticket gates."
    ],
    quickAnswer: "A 5-day Nepal trip from Bangladesh costs roughly BDT 45,000 per person for a budget backpacker (including flights), about BDT 65,000 for a comfortable mid-range trip with better hotels and tourist buses, and BDT 1,20,000+ for a luxury heritage-hotel stay. The free Visa on Arrival for Bangladeshi citizens saves an extra USD 30-50 compared to most other nationalities.",
    keyFacts: [
      { label: "Budget Trip (5 days, incl. flight)", value: "approx BDT 45,000" },
      { label: "Mid-Range Trip (5 days, incl. flight)", value: "approx BDT 65,000" },
      { label: "Visa Savings vs Other Nationalities", value: "USD 30 - 50" },
      { label: "Average Daily Meal Cost", value: "BDT 1,000 - 2,000" }
    ],
    faqs: [
      {
        question: "How much does a 5-day Nepal trip cost from Bangladesh in total?",
        answer: "Including round-trip flights from Dhaka, a 5-day Nepal trip costs around BDT 45,000 per person on a budget itinerary, roughly BDT 65,000 for a comfortable mid-range trip, and BDT 1,20,000 or more for luxury heritage hotels and private transport."
      },
      {
        question: "Should I carry US Dollars or Nepali Rupees to Nepal?",
        answer: "Carry US Dollars in cash - this is required for the Visa on Arrival fee (if applicable) and is widely accepted for exchange. You can exchange USD for Nepali Rupees (NPR) at the airport or in Thamel; Bangladeshi Taka is not commonly accepted."
      },
      {
        question: "What is the cheapest way to travel from Kathmandu to Pokhara?",
        answer: "Tourist buses cost roughly BDT 1,200-1,800 one way and take 6-8 hours on a scenic mountain highway - this is significantly cheaper than a private taxi or domestic flight and is the most popular option for budget travelers."
      },
      {
        question: "Are there hidden costs for Bangladeshi tourists in Nepal?",
        answer: "Aside from the visa fee on repeat visits within the same year, most hotels add a 10% service charge plus 13% VAT to room rates - check whether quoted prices already include these before booking. Heritage site entry tickets are an additional cost worth budgeting for separately."
      },
      {
        question: "How can I travel between Kathmandu and Pokhara on the absolute tightest budget when arriving from Dhaka?",
        answer: "The absolute cheapest transport option is to take a local public bus or microbus from Kathmandu's Gongabu Bus Park, which costs around BDT 600 to 800 (about NPR 700 to 900) but can be crowded and less comfortable. For a balance of safety and cost, tourist buses departing from Shorakhutte (near Thamel) are recommended at BDT 1,200 to 1,500, offering comfortable seating, air conditioning, and designated rest stops. While domestic flights only take 25 minutes, they cost over BDT 10,000 one-way for foreign nationals, which will quickly exhaust a typical budget."
      },
      {
        question: "Is Bangladeshi Taka (BDT) accepted for currency exchange or daily purchases in Nepal?",
        answer: "Bangladeshi Taka is not accepted for standard day-to-day purchases in Nepal, and very few exchange booths near Thamel will convert them into Nepali Rupees, usually at very poor rates. It is highly recommended to carry US Dollars (USD) in cash from Dhaka, which can be exchanged quickly at standard rates anywhere in Kathmandu or Pokhara. Alternatively, you can use an internationally enabled dual-currency card endorsed with USD to withdraw Nepali Rupees directly from local ATMs. Restricting your itinerary to only carrying BDT cash will leave you unable to pay for transport or food in most tourist areas."
      },
      {
        question: "What is the average daily cost of food and meals for a Bangladeshi traveler in Kathmandu?",
        answer: "A Bangladeshi traveler can expect to spend between BDT 800 and 1,500 per day on food, depending strictly on where and what they eat. Tasting local Dal Bhat (lentil soup with rice and vegetable curries) or plates of steam/fried Momos at local eateries is incredibly cheap, costing around BDT 150 to 300 per meal. Dining in regular tourist-oriented cafes and restaurants in Thamel will increase your costs to BDT 500 to 900 per meal. Because Nepali cuisine shares many similarities with Bangladeshi food, such as rice and spicy curries, finding delicious and familiar meals is extremely simple and highly budget-friendly."
      },
      {
        question: "How much money should a tourist from Dhaka budget for heritage site ticket costs in Nepal?",
        answer: "As a SAARC national, you are eligible for heavily discounted ticket prices at major heritage attractions like Kathmandu Durbar Square, Patan, Bhaktapur, and the Boudhanath Stupa, usually paying BDT 100 to 500 per site compared to the BDT 1,000+ paid by non-SAARC tourists. However, popular trekking regions, national parks, and Mount Everest viewpoint fees do not have significant SAARC discounts and can cost between BDT 2,000 and 5,500 per permit. It is wise to set aside around BDT 3,500 to 5,000 in your total budget specifically for these admission tickets. Always carry your Bangladeshi passport to these ticket booths to prove SAARC citizenship and claim your discount."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "Cost estimations for Nepal based on BDT",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "45000",
  "maxPrice": "120000"
}`
    }
  },
  {
    id: "thailand-costs",
    country: "Thailand",
    durationDays: 5,
    currencyCode: "THB (Thai Baht)",
    exchangeRateText: "1 THB ≈ 3.28 BDT | 1 BDT ≈ 0.30 THB",
    categories: [
      { name: "Flights from Dhaka", lowBdt: 31500, midBdt: 37000, highBdt: 48000 },
      { name: "Accommodations (per night)", lowBdt: 1800, midBdt: 4500, highBdt: 14000 },
      { name: "Daily Meals & Street Food", lowBdt: 1200, midBdt: 2500, highBdt: 6000 },
      { name: "BTS/MRT Trains & Grab Rides", lowBdt: 400, midBdt: 1200, highBdt: 3500 },
      { name: "Shopping & Market Purchases", lowBdt: 5000, midBdt: 15000, highBdt: 50000 }
    ],
    seasonalVariation: "High season occurs from November to January. Hot season (March-May) sees shopping festival sales. May to October is the green monsoon season, with great hotel rates and some flight discount vouchers.",
    moneyHacks: [
      "Shop at wholesale plazas like Platinum Mall or Chatuchak, and buy bundles of 3+ pieces to trigger discount pricing.",
      "Get a tourist VAT refund form (P.P.10) for purchases over 2,000 THB at major stores to claim 7% VAT cash back at Bangkok airport before exiting.",
      "Buy a 1-Day Pass for the BTS Skytrain for BDT 450, granting endless air-conditioned train travel and cutting transit cost."
    ],
    quickAnswer: "Thailand travel budgets from Dhaka rely heavily on your shopping style. A 5-day shopping and leisure itinerary usually costs around BDT 70,000-80,000 (including flights!). Backpackers limiting shopping can experience Bangkok comfortably for BDT 55,000, while premium travelers staying in five-star hotels with fine dining should budget BDT 1,35,000+.",
    keyFacts: [
      { label: "Bargain Backpacker (5d)", value: "approx BDT 55,000" },
      { label: "Comfort Shopping (5d)", value: "approx BDT 80,000" },
      { label: "Average Meal Cost", value: "approx BDT 400 - 800" },
      { label: "VAT Refund Offer", value: "7% Cash refund at airport" }
    ],
    faqs: [
      {
        question: "How much cash should I carry to pass Thai Immigration?",
        answer: "By Thai law, tourists should carry equivalent to 10,000 THB (approx BDT 33,000) per person or 20,000 THB per family to show self-sufficiency if checked by immigration officers."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "Thailand trip price matrix for Bangladesh",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "55000",
  "maxPrice": "135000"
}`
    }
  },
  {
    id: "malaysia-costs",
    country: "Malaysia",
    durationDays: 5,
    currencyCode: "MYR (Malaysian Ringgit)",
    exchangeRateText: "1 MYR ≈ 27.20 BDT | 1 BDT ≈ 0.037 MYR",
    categories: [
      { name: "Flights from Dhaka", lowBdt: 36000, midBdt: 42000, highBdt: 50000 },
      { name: "Accommodations (per night)", lowBdt: 1800, midBdt: 5000, highBdt: 11000 },
      { name: "Daily Meals & Satay Feasts", lowBdt: 1000, midBdt: 2200, highBdt: 5000 },
      { name: "LRT/MRT Trains & Grab Taxis", lowBdt: 300, midBdt: 1000, highBdt: 3000 },
      { name: "Genting / Attractions Tickets", lowBdt: 1500, midBdt: 4000, highBdt: 9000 }
    ],
    seasonalVariation: "Kuala Lumpur is a year-round destination. Low rainfall in May to July attracts tourists, but prices are stable. Major shopping campaigns (like Mega Sale) yield fantastic item deals.",
    moneyHacks: [
      "Take the free GOKL pink city buses! They loop critical tourist sites like Bukit Bintang, KLCC, and Chinatown for BDT 0.",
      "Get a travel multicarrier card or carry cash for street food joints like Jalan Alor which might not accept non-Malaysian QR wallets.",
      "Book family suites if traveling in a group - spacious executive apartments in KL offer incredible cost-efficiency per person."
    ],
    quickAnswer: "Malaysia represents a highly cost-efficient metropolis. A comfortable 5-day itinerary (flights, modern high-rise hotels in Bukit Bintang, great meals, and day outings to Genting Highlands) averages BDT 75,000 per person. Backpackers utilizing free buses and budget suites can cut local costs to BDT 58,000 total.",
    keyFacts: [
      { label: "Backpacker Total (5d)", value: "approx BDT 58,000" },
      { label: "Comfort Executive (5d)", value: "approx BDT 75,000" },
      { label: "Free Transport Savings", value: "approx BDT 2,500" },
      { label: "Tower View Condo (BDT)", value: "5,000 - 8,000 / night" }
    ],
    faqs: [
      {
        question: "Is raw street food expensive in Kuala Lumpur?",
        answer: "No. Excellent local food courts (Kopitiams) and Mamak stalls serve Nasi Lemak, Roti Canai, or Fried Kuay Teow for just RM 6 - RM 12 (approx BDT 160 - BDT 320) per plate."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "Malaysia price points",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "58000",
  "maxPrice": "110000"
}`
    }
  },
  {
    id: "dubai-costs",
    country: "UAE",
    durationDays: 5,
    currencyCode: "AED (UAE Dirham)",
    exchangeRateText: "1 AED ≈ 32.20 BDT | 1 BDT ≈ 0.031 AED",
    categories: [
      { name: "Flights from Dhaka", lowBdt: 58000, midBdt: 68000, highBdt: 85000 },
      { name: "Accommodations (per night)", lowBdt: 3500, midBdt: 8000, highBdt: 25000 },
      { name: "Daily Meals & Creek Shawarma", lowBdt: 1800, midBdt: 4500, highBdt: 12000 },
      { name: "Metro Nol card & RTA Taxis", lowBdt: 800, midBdt: 2000, highBdt: 6000 },
      { name: "Desert Safaris & Khalifa tickets", lowBdt: 4500, midBdt: 12000, highBdt: 35000 }
    ],
    seasonalVariation: "Extreme price spikes from November to February due to perfect warm winter outdoor weather. Hotel rents plummet up to 50% from June to September due to high summer desert heats (above 40°C), making mall shopping highly economic.",
    moneyHacks: [
      "Buy a Silver Nol Card in the metro terminal. It costs BDT 800, provides AED 19 pre-loaded values, and offers much cheaper fares than paper day tickets.",
      "Eat like a local in Deira or Bur Dubai! Excellent South Asian curries, Arabic mandi rice, or fresh wraps cost just AED 10 to AED 20 per meal.",
      "Book desert safari packages on local UAE multi-agent platforms or pre-purchase tourist passes to save up to 40% on Burj Khalifa entry fees."
    ],
    quickAnswer: "A 5-day Dubai trip from Bangladesh costs approximately BDT 1,20,000 to BDT 1,40,000 per person for a comfortable mid-range itinerary including direct roundtrip flights. Extreme budget backpackers departing from Dhaka can reduce local expenses to around BDT 95,000 by staying in Deira hostels and using the Dubai Metro with a Nol card. High-end luxury stays covering 5-star hotels like Burj Al Arab and top-tier dining will elevate the budget to BDT 2,50,000 or more.",
    keyFacts: [
      { label: "Old Dubai Budget (5d)", value: "approx BDT 95,000" },
      { label: "Comfort Shopping (5d)", value: "approx BDT 1,30,000" },
      { label: "Ferry Abra Crossing rate", value: "AED 1 (Direct cash)" },
      { label: "VAT Cash Refund", value: "85% on purchases over AED 250" }
    ],
    faqs: [
      {
        question: "Can I use standard Bangladeshi credit cards in Dubai?",
        answer: "Yes. Most banks in Bangladesh offer easy global dual-currency validation. You should call your bank support before departure to activate your card profile, ensuring transparent AED transactions."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "UAE Dubai price matrices for Bangladesh",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "95090",
  "maxPrice": "250000"
}`
    }
  },
  {
    id: "singapore-costs",
    country: "Singapore",
    durationDays: 4,
    currencyCode: "SGD (Singapore Dollar)",
    exchangeRateText: "1 SGD ≈ 91.50 BDT | 1 BDT ≈ 0.011 SGD",
    categories: [
      { name: "Flights from Dhaka (Roundtrip)", lowBdt: 41500, midBdt: 47500, highBdt: 64000 },
      { name: "Accommodations (3 Nights Total)", lowBdt: 21000, midBdt: 34000, highBdt: 68000 },
      { name: "Halal Hawker Centres & Meals", lowBdt: 6500, midBdt: 12000, highBdt: 28000 },
      { name: "MRT SimplyGo & Airport Transit", lowBdt: 2200, midBdt: 4500, highBdt: 12000 },
      { name: "Sentosa, Gardens & Visa Fee", lowBdt: 9500, midBdt: 18500, highBdt: 35000 }
    ],
    seasonalVariation: "Prices spike during Formula 1 Singapore Grand Prix weekend (September), Chinese New Year, and December school holidays. Travelling in February–May or July–August offers the best hotel rates.",
    moneyHacks: [
      "Eat at Halal-certified stalls in famous Hawker Centres (Lau Pa Sat, Tekka Centre in Little India, or Albert Centre in Bugis) where delicious chicken biryani, murtabak, or nasi padang costs just SGD 5–8 (BDT 450–730).",
      "Tap your Bangladeshi dual-currency Visa/Mastercard directly on MRT gates (SimplyGo) instead of using Grab taxis—Changi Airport to Little India by MRT costs under SGD 2.20 (BDT 200) vs SGD 30 by taxi!",
      "Singapore tap water is 100% safe and WHO-certified to drink. Carry a refillable water bottle to save SGD 3 (BDT 275) per bottle at attractions."
    ],
    quickAnswer: "A 4-day Singapore trip from Bangladesh costs roughly BDT 80,000 to BDT 85,000 per person for a smart budget traveler (including direct flights and visa), around BDT 1,15,000 for a comfortable family stay in Bugis or Little India with Sentosa theme park tickets, and BDT 2,00,000+ for luxury Marina Bay hotels.",
    keyFacts: [
      { label: "Smart Budget Total (4d)", value: "approx BDT 82,000" },
      { label: "Family Mid-Range (4d)", value: "approx BDT 1,16,500" },
      { label: "Hawker Meal Cost", value: "SGD 6 - 9 (BDT 550 - 820)" },
      { label: "Tourist GST Refund", value: "Up to 9% back at Changi" }
    ],
    faqs: [
      {
        question: "How much bank balance do I need to show for a Singapore trip from Bangladesh?",
        answer: "Authorized visa agents in Dhaka recommend showing a minimum closing balance of BDT 1,50,000 to BDT 2,00,000 per applicant on a 6-month bank statement."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "Singapore 4-day trip cost breakdown in BDT",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "80700",
  "maxPrice": "207000"
}`
    }
  },
  {
    id: "maldives-costs",
    country: "Maldives",
    durationDays: 5,
    currencyCode: "MVR (Maldivian Rufiyaa) & USD",
    exchangeRateText: "1 USD ≈ 122 BDT | 1 MVR ≈ 7.90 BDT",
    categories: [
      { name: "Flights from Dhaka (Roundtrip)", lowBdt: 46000, midBdt: 52500, highBdt: 68000 },
      { name: "Hotels / Guesthouses (4 Nights)", lowBdt: 16000, midBdt: 34000, highBdt: 155000 },
      { name: "Speedboat / Ferry Transfers", lowBdt: 1500, midBdt: 6200, highBdt: 24000 },
      { name: "Meals & Beachfront Dining", lowBdt: 6500, midBdt: 13500, highBdt: 42000 },
      { name: "Snorkeling, Sandbank & Resort Tours", lowBdt: 4500, midBdt: 14000, highBdt: 48000 }
    ],
    seasonalVariation: "December to March is peak dry season with the highest hotel rates. Travelling in the shoulder months of April, May, October, or November cuts Maafushi guesthouse and private resort rates by 30% to 45% while still offering plenty of sunshine.",
    moneyHacks: [
      "Stay on Maafushi or Hulhumalé instead of a private resort island—you save 70% on rooms and speedboats while enjoying the exact same turquoise Indian Ocean water.",
      "Book a Half-Day Snorkeling + Dolphin + Sandbank Lunch package in Maafushi for just $30 USD (approx BDT 3,650), which includes underwater GoPro and drone photos!",
      "Travel with a friend or spouse so you split the $60–$80/night ocean-view guesthouse room and save 50% on accommodation."
    ],
    quickAnswer: "A 5-day Maldives trip from Bangladesh costs only BDT 74,500 per person (flights included!) when you stay at a clean guesthouse on Hulhumalé or Maafushi local island. A comfortable mid-range beach holiday with sea-view rooms at Arena/Kaani Beach and multiple snorkeling/resort day trips costs around BDT 1,20,000 per person, while private overwater villa resorts start at BDT 2,50,000+.",
    keyFacts: [
      { label: "Local Island Budget (5d)", value: "approx BDT 74,500" },
      { label: "Mid-Range Maafushi (5d)", value: "approx BDT 1,20,000" },
      { label: "Visa Cost for Bangladeshis", value: "BDT 0 (Free VOA)" },
      { label: "Snorkeling + Sandbank Tour", value: "$30 USD (approx BDT 3,650)" }
    ],
    faqs: [
      {
        question: "Why are private resort transfers so expensive in the Maldives?",
        answer: "Private resorts require dedicated resort speedboats ($100–$250 return) or seaplanes ($400+ return). By contrast, Maafushi local island uses shared scheduled speedboats for $25 USD each way, and Hulhumalé is connected by a $8 road taxi from Malé Airport."
      }
    ],
    schemaMarkup: {
      type: "TripCostData",
      description: "Maldives 5-day trip cost breakdown in BDT for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "priceCurrency": "BDT",
  "minPrice": "74500",
  "maxPrice": "337000"
}`
    }
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "blog-1",
    slug: "cheap-flight-booking-hacks-dhaka",
    title: "5 Insider Secrets to Booking Cheaper Flights from Dhaka in 2026",
    summary: "Outbound airfare from Hazrat Shahjalal International Airport (DAC) can fluctuate by BDT 12,000 to BDT 25,000 overnight depending on corporate migration waves, weekend labor departures, and airline inventory resets. In this comprehensive guide for Bangladeshi travelers, we break down five proven booking strategies: checking fares during the Tuesday night global GDS refresh window, shifting departures from Thursday/Friday peak exit days to Monday or Tuesday mornings, pairing low-cost regional carriers like Thai Lion Air, AirAsia, and SalamAir with smart cabin-baggage discipline, and stacking 10% to 15% domestic bank card discounts from EBL, City Bank Amex, and BRAC Bank to lock in the lowest possible roundtrip BDT ticket prices.",
    category: "Cheap Flight Tips",
    date: "June 12, 2026",
    author: "Zayan Rahman (Senior Travel Researcher)",
    readTime: "4 min read",
    content: `Booking outbound flights from Dhaka often feels frustrating with prices suddenly spiking overnight. Here is how expert Bangladeshi travelers secure tickets for up to 30% cheaper.

1. THE 'TUESDAY NIGHT' COGNITIVE CHECK
Airlines frequently refresh their global reservation systems and drop unsold ticket inventories on late Tuesday and Wednesday. Search for flights around 11:30 PM Dhaka Time on mid-week days.

2. AVOID THE FRIDAY & SATURDAY EXIT JAMS
Hazrat Shahjalal Airport sees massive corporate and labor migration flows on Thursday nights and Fridays. Departing on a Monday afternoon or Tuesday morning immediately saves around BDT 4,000 - 6,000.

3. COUPLING LOW-COST RE-ROUTINGS
Instead of booking premium direct airlines to Kuala Lumpur or Bangkok, pair local budget flights. For instance, booking Thai Lion Air to Don Mueang instead of Thai Airways frequently drops tickets below BDT 33,000 roundtrip.

4. BAGGAGE LIMIT CONSCIOUSNESS
Budget airlines like AirAsia or Batik Air offer incredibly cheap base tickets, but charge heavily for check-in baggage. If you are backpacker-style with a single 7kg cabin bag, skip the premium add-ons to save money.

5. ACCUMULATE LOCAL BANK DEBIT/CREDIT OFFERS
Many local banks in Bangladesh (like EBL, SCB, City Bank, Mutual Trust Bank) run persistent 10% to 15% discount campaigns with domestic travel OTA agents (like GoZayaan or ShareTrip) that outperform global search engines. Always double check terms on your credit cards.`,
    internalLinks: [
      { text: "Dhaka to Kathmandu flights Guide", path: "/flights?route=dhaka-kathmandu" },
      { text: "Dhaka to Bangkok Flight Costs", path: "/flights?route=dhaka-bangkok" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Ready to check today's fares?", body: "Compare live Dhaka departure prices before they change." }
  },
  {
    id: "blog-2",
    slug: "nepal-vs-thailand-first-trip",
    title: "Nepal vs Thailand: Which is the Best First Country to Visit for Bangladeshis?",
    summary: "Choosing your very first international destination on a Bangladeshi passport often comes down to two iconic neighbors: the Himalayan valleys of Nepal or the vibrant street markets and islands of Thailand. This head-to-head comparison evaluates both countries across four critical factors for first-time Bangladeshi flyers: visa simplicity (Nepal's free instant SAARC Visa on Arrival at Tribhuvan Airport versus Thailand's pre-departure e-Visa and 6-month bank statement requirements), realistic 5-day BDT budgets (BDT 45,000 for Kathmandu and Pokhara vs. BDT 80,000+ for Bangkok and Pattaya), Halal food availability, and urban transit convenience so you can pick the right first stamp in your passport.",
    category: "Visa & Immigration",
    date: "May 28, 2026",
    author: "Nabila Tabassum (Programmatic Curator)",
    readTime: "5 min read",
    content: `Choosing your very first international travel destination can feel daunting to Bangladeshi passport holders. Should you pick the high-altitude peaks of Nepal or the modern beaches and shopping plazas of Thailand? Here is our comparison to help you choose:

1. THE VISA CHALLENGE: ADVANTAGE NEPAL
For first-time travelers lacking extensive travel histories, the physical visa application process at Thailand consulates causes immense anxiety. Thailand requires pre-arranged sticker applications, 6-month bank statements, and professional NOCs. Rejections can occur for incomplete paperwork.
Nepal, conversely, offer an instant Visa on Arrival for Bangladeshi citizens. Better still, your first tourist entry in a calendar year is fully free (gratis). If you want a quick, spontaneous getaway, Nepal is the absolute winner.

2. TOTAL FINANCIAL COST: ADVANTAGE NEPAL
Nepal is extremely friendly to budget backpackers. Local meals, heritage tickets, and inner-city ride-hailing (via Pathao) represent about half the price of Thailand services. A comfortable 5-day stay in Kathmandu/Pokhara runs around BDT 45k-65k (flights included). A Thailand trip with moderate shopping easily hits BDT 80k+.

3. SHOPPING & ULTRA-MODERN COMFORT: ADVANTAGE THAILAND
If your primary travel motivation involves purchasing high-quality apparel, kids' toys, electronics, and cosmetics, Bangkok is unparalleled. From Platinum Fashion Mall to high-street Siam centers, Thailand is a retail paradise. Nepal has amazing trekking gear and handmade crafts, but cannot match Thailand's retail hubs.

4. TRANSIT & INFRASTRUCTURE: DRAW
Bangkok boasts superior, air-conditioned BTS Skytrains and underground MRT subways that leap over traffic congestion. Kathmandu's roads are often dusty and under-construction, making road travel slower. However, Kathmandu's smaller size means tourist points are closely clustered, and Pokhara lakeside is walkable.

SUMMARY ADVICE
- Pick Nepal if: You are traveling with friends, seek mountain vistas, desire effortless entry, or are on a strict budget.
- Pick Thailand if: You are traveling with family, desire great retail shopping, crave street food culture, and can manage visa paperwork in advance.`,
    internalLinks: [
      { text: "Nepal Visa step-by-step checklist", path: "/visa?country=nepal-visa" },
      { text: "Thailand trip cost from Dhaka", path: "/costs?country=thailand-costs" }
    ],
    affiliateCTA: { provider: "klook", headline: "See what there is to do first", body: "Browse top-rated tours and activities in both Nepal and Thailand before you decide." }
  },
  {
    id: "blog-3",
    slug: "hotel-savings-guide-bangkok-kl-dubai",
    title: "How to Keep Hotel Costs Low in Bangkok, KL, and Dubai",
    summary: "Accommodation typically consumes 30% to 40% of an outbound trip budget from Bangladesh, yet most travelers overpay simply by booking inside the most crowded tourist blocks. In this neighborhood-by-neighborhood hotel savings guide, you will learn how shifting just two or three metro stops down the line—such as staying near On Nut or Phra Khanong BTS instead of Siam in Bangkok, choosing Al Rigga or Union Metro in Deira over Downtown Dubai, or booking serviced family apartments near Bukit Bintang and KLCC in Kuala Lumpur—can save BDT 8,000 to BDT 15,000 per trip while keeping you surrounded by affordable Halal restaurants and fast transit.",
    category: "Hotel Savings",
    date: "June 05, 2026",
    author: "Faisal Ahmed (Accommodations Analyst)",
    readTime: "4 min read",
    content: `Finding affordable accommodation in major tourist destinations does not mean sacrificing safety or hygiene. Here are the smartest tactics utilized by seasoned Bangladeshi outbound travelers to lock down high-value hotel stays.

1. SEGREGATE BY METRO PROXIMITY
In Bangkok, staying directly on Sukhumvit Road near Siam BTS is hyper-expensive. Simply sliding two to three BTS stations down towards On Nut or Phra Khanong cuts hotel rates by 40% while keeping travel times under 15 minutes. In Dubai, opt for hotels near Al Rigga or Union Station in Deira rather than Downtown Dubai lines.

2. CHOOSE CONCIERGE HUBS WITH HALAL BUFFET OPTIONS
For South Asian travelers, breakfast is key. When booking, filters often overprice halal buffets. Look for hotels in areas like Pratunam (Bangkok), Bukit Bintang (Kuala Lumpur), or Deira (Dubai) where affordable Bengali, Indian, or Middle Eastern dinings are flanking the street corners.

3. OPTIMIZE BOOKING WINDOWS
Hotel rates on major portals tend to fluctuate mid-week. Always search for rooms in private incognito browsers and try booking non-refundable rates only after your visa sticker or eVisa approval is fully secured in-hand.`,
    internalLinks: [
      { text: "Dubai trip cost from Dhaka", path: "/costs?country=dubai-costs" },
      { text: "Kuala Lumpur Hotels Guide", path: "/hotels?city=kuala-lumpur-hotels" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Save on transport too", body: "A pre-booked airport transfer is usually cheaper than a metered taxi at arrival." }
  },
  {
    id: "blog-4",
    slug: "halal-food-guide-bangkok-bangladesh",
    title: "Where to Eat Halal Food in Bangkok: A Complete Guide for Bangladeshi Travelers",
    summary: "Finding authentic, 100% certified Halal food is one of the top priorities for Bangladeshi families visiting Thailand for shopping, holidays, or medical check-ups at Bumrungrad and Bangkok Hospital. This practical dining guide walks you through identifying the official green emblem of the Central Islamic Council of Thailand, navigating Bangkok's two largest Muslim culinary hubs—Pratunam's Petchaburi Road alleys and Sukhumvit Soi 3 (Arab Street) near Nana BTS—and budgeting for every meal tier in BDT, from BDT 180 mall food court dishes to beloved restaurants like Maidaun Halal in Pratunam, Al Hussain in Sukhumvit, and Yana Restaurant inside Siam Discovery.",
    category: "Food & Culture",
    date: "June 15, 2026",
    author: "Fahmida Tasnim (Dhaka Food Blogger & Explorer)",
    readTime: "5 min read",
    content: `When traveling to Thailand, finding delicious, certified Halal food is often a major concern for Bangladeshi tourists. Fortunately, Bangkok is highly welcoming, with vibrant Muslim neighborhoods and countless certified or Muslim-owned eateries. Here is our essential guide to navigating Halal dining in Bangkok without any stress.

1. HOW TO IDENTIFY HALAL SIGNAGE
Always look for the official green Halal emblem from the Central Islamic Council of Thailand displayed on the storefront or menu. Many Muslim-owned venues also display Arabic calligraphy (such as "Bismillah") or simple "Halal" signs in English or Thai script. In major shopping malls, check lists of certified vendors or ask the counter for separate Halal menu options before ordering.

2. THE TWO MAIN HALAL RESTAURANT ZONES
- Pratunam (The Shopper's Paradise): Perfect for Bangladeshi tourists, this area is dense with Halal street food stalls, especially around the alleys of Petchaburi Road. You can find Halal kebabs, biryanis, and even local Thai curries adapted to Halal guidelines within minutes of major shopping blocks.
- Sukhumvit (Soi 3 / Arab Street): Located near Nana BTS station, this bustling street is packed with Arab, Persian, Egyptian, Indian, and Bangladeshi restaurants. It is an amazing spot for high-quality BBQ, fresh flatbreads, and Middle Eastern delicacies, though prices can be slightly higher than in Pratunam.

3. APPROXIMATE MEAL COSTS IN BDT
Meal pricing is incredibly flexible in Bangkok:
- Cheap street stalls or shopping mall food court stalls: BDT 150 - BDT 300 (THB 45 - THB 90) per serving.
- Mid-range air-conditioned sit-down dining: BDT 600 - BDT 1,200 (THB 180 - THB 360) per person.
- Fine-dining Lebanese or Indian restaurants in Sukhumvit: BDT 1,800+ (THB 550+) per item.

4. 3 RECOMMENDED RESTAURANTS TO VISIT
- Maidaun Halal Restaurant (Pratunam Market): Located directly across from Platinum Fashion Mall, this highly accessible eatery offers a mix of local Thai favorites (like red curry and pad thai) and familiar South Asian dishes (like chicken biryani and beef curry) on a strictly Halal menu.
- Al Hussain Restaurant (Sukhumvit Soi 3): Famous among South Asians for its delicious naan, succulent tandoori kebabs, and aromatic curries, this vibrant spot is great for a heavy dinner after a long day of touring.
- Yana Restaurant (Siam Discovery, 5th Floor): An air-conditioned, fully certified Halal restaurant located inside a major shopping mall. It is the perfect place to safely try spicy Tom Yum soup, green curry, or mango sticky rice in a clean, upscale setting.`,
    internalLinks: [
      { text: "Dhaka to Bangkok Flight Guide", path: "/flights?route=dhaka-bangkok" },
      { text: "Bangkok Hotels Neighborhoods", path: "/hotels?city=bangkok-hotels" }
    ],
    affiliateCTA: { provider: "klook", headline: "Book a Bangkok Guided Food Tour", body: "Explore secret Halal street food alleys with an english-speaking local guide." }
  },
  {
    id: "blog-5",
    slug: "nepal-pokhara-itinerary-bangladesh",
    title: "Kathmandu to Pokhara: A 5-Day Nepal Itinerary for Bangladeshis (With Costs in BDT)",
    summary: "At just 90 minutes flying time from Dhaka and zero visa fee on your first visit of the year, Nepal is the ultimate pocket-friendly Himalayan escape for Bangladeshi travelers. This day-by-day 5-day itinerary connects the ancient heritage squares of Kathmandu Valley (Boudhanath Stupa, Swayambhunath, and Patan Durbar Square) with the tranquil lakeside charm of Pokhara and the breathtaking Annapurna sunrise from Sarangkot peak. Inside, you will find verified BDT pricing for tourist buses versus domestic flights, Thamel and Phewa Lakeside hotel rates, SAARC heritage ticket discounts, and a complete BDT 40,000 to BDT 54,000 per-person budget sheet.",
    category: "Family & Budget",
    date: "June 17, 2026",
    author: "Abrar Sazzad (Backpacking Veteran)",
    readTime: "6 min read",
    content: `Are you a Bangladeshi traveler planning a scenic mountain escape that is incredibly pocket-friendly? A 5-day trip covering Kathmandu's historic valleys and Pokhara's peaceful lakes is the absolute sweet spot. Below is our complete, day-by-day itinerary optimized specifically for budget and timing from Dhaka.

DAY 1: KATHMANDU ARRIVAL
Fly from Hazrat Shahjalal International Airport (DAC) to Kathmandu's Tribhuvan Airport (KTM). Get your free SAARC Gratis Visa on Arrival in under 20 minutes (no visa fee for your first annual entry!). Rent a prepaid taxi to Thamel for roughly BDT 600 - 800, check into your hostel or guesthouse, and spend the evening wandering through the bustling streets of Thamel to buy cheap trekking supplies or sample local hot Momos.

DAY 2: KATHMANDU VALLEY EXPLORATION
Dedicate today to Kathmandu's historic landmarks. Start early with the massive, peaceful Boudhanath Stupa (SAARC ticket: BDT 100), followed by the monkey temple at Soyambhunath to catch the sunrise over the city. In the afternoon, take a taxi or a cheap Pathao ride to Patan Durbar Square to admire centuries-old Newari wooden and brick palaces.

DAY 3: SCENIC DRIVE TO POKHARA
Wake up early at 6:00 AM to board a comfortable tourist bus from Shorakhutte towards Pokhara. The 6 to 8-hour drive takes you through scenic valleys, mountain rivers, and small villages, costing about BDT 1,200 to BDT 1,500 per seat. Upon arriving in Pokhara, check into your lakeside hotel, and take peaceful evening strolls beside Phewa Lake under the reflection of Mount Fishtail.

DAY 4: SARANGKOT SUNRISE AND LAKESIDE
Start early at 4:30 AM with a private car (approx BDT 1,500 roundtrip) up to the Sarangkot peak viewpoint to witness the sunrise over the majestic Annapurna range. Head back down for a hearty breakfast, then rent a colorful wooden boat to row across Phewa Lake (approx BDT 400 - 600 per hour). Spend the rest of the day visiting Devi's Fall and Gupteshwor Cave before dining at a cozy lakeside restaurant.

DAY 5: RETURN TO KATHMANDU AND DEPARTURE
Catch a quick morning flight (approx 25 mins) or take an early morning tourist bus back to Kathmandu. Head directly to Tribhuvan International Airport for your afternoon/evening flight back to Dhaka, ending your wonderful Himalayan adventure!

HOTEL RECOMMENDATIONS (PRICED IN BDT)
- Kathmandu (Thamel Area) Budget Stays: BDT 1,500 - BDT 2,500 per night for simple, clean guest houses with hot water. Mid-range boutique hotels are BDT 4,000 - BDT 7,500 per night.
- Pokhara (Lakeside Area) Clean Stays: BDT 1,800 - BDT 3,000 per night for a cozy room facing the gardens, with hot showers and free breakfast.

TOTAL BUDGET SUMMARY PER PERSON (IN BDT)
- Flights (DAC - KTM Roundtrip): BDT 28,000 - BDT 35,000
- Hotels (4 Nights, sharing base): BDT 4,000 - BDT 6,000
- Intercity & Local Transport: BDT 3,000 - BDT 5,000
- Food & Snacks: BDT 4,000 - BDT 6,000
- Heritage/Attraction Permits: BDT 1,000 - BDT 2,000
- TOTAL ESTIMATED BUDGET: BDT 40,000 - BDT 54,000 per person for an unforgettable independent holiday!`,
    internalLinks: [
      { text: "Kathmandu Flights from Dhaka", path: "/flights?route=dhaka-kathmandu" },
      { text: "Nepal Visa on Arrival Guide", path: "/visa?country=nepal-visa" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Check Dhaka to Kathmandu Flight Fares", body: "Check live availability and book cheap roundtrip flights to Nepal today." }
  },
  {
    id: "blog-6",
    slug: "dual-currency-card-endorsement-bangladesh",
    title: "How to Get Dual-Currency Card Endorsement in Bangladesh (2026 Passport Dollar Endorsement Guide)",
    summary: "Before you can book international flights, Agoda or Booking.com hotels, Haramain bullet train tickets, or Klook attraction passes from Bangladesh, your bank card must be endorsed against your passport under Bangladesh Bank's USD $12,000 annual personal travel quota. This step-by-step banking guide explains which Bangladeshi banks issue fast dual-currency debit and prepaid cards without credit history (EBL Aqua, City Bank Amex/Visa, BRAC Multi-Currency, MTB, and Islami Bank), what documents to bring for the physical passport stamp, how to unlock the USD e-commerce and 3D-Secure part via your bank app, RFCD vs. Travel Quota accounts, and how to avoid 5% DCC currency conversion traps abroad.",
    category: "Banking & Payments",
    date: "September 26, 2026",
    author: "Farhan Momen (Lead Travel Strategist)",
    readTime: "7 min read",
    content: `One of the biggest hurdles for Bangladeshi travelers planning an independent trip abroad isn't the visa—it is getting a Dual-Currency Debit, Prepaid, or Credit Card endorsed and unlocked for international flights, hotels, and attraction tickets. Here is the complete, up-to-date 2026 playbook for getting your passport dollar endorsement and paying abroad smoothly.

1. WHAT IS PASSPORT DOLLAR ENDORSEMENT & THE $12,000 ANNUAL TRAVEL QUOTA?
Under Bangladesh Bank foreign exchange regulations, every adult Bangladeshi citizen holding a valid Machine-Readable Passport (MRP) or e-Passport is entitled to endorse up to USD $12,000 per calendar year (January 1 to December 31) for personal international travel (and USD $5,000 per year for children under 12).
- "Endorsement" means an authorized dealer (AD) bank branch in Bangladesh stamps the back pages of your physical passport, records the USD limit allocated to your card or cash, and unlocks the Foreign Currency (USD) wallet on your card.
- Without this physical stamp and system activation, Bangladeshi bank cards are automatically blocked from paying on international websites like Booking.com, Agoda, Klook, Airalo, or foreign airlines.

2. STEP-BY-STEP: HOW TO GET YOUR DUAL-CURRENCY CARD ENDORSED AT ANY BANK
Step 1: Choose a Card (No Credit History Needed!)
You do not need a high-salary credit card. Almost every major bank in Bangladesh now issues instant or 48-hour Dual-Currency Debit or Prepaid Cards if you have a valid passport and NID:
- Eastern Bank (EBL): Aqua MasterCard Prepaid Card or Lifestyle Dual-Currency Debit Card
- The City Bank: American Express or Visa Dual-Currency Debit Card
- BRAC Bank: Multi-Currency Visa Debit Card & Tara Card
- Standard Chartered, Mutual Trust Bank (MTB), Prime Bank & Islami Bank (Khidmah / Dual-Currency Debit)

Step 2: Visit Your Bank's Foreign Exchange / Card Desk with 3 Documents
Carry:
- Your original valid Passport (minimum 6 months validity recommended)
- Your National ID (NID) card and 1 passport-size photo (for new prepaid cards)
- Your bank account or prepaid card number
Ask the officer to endorse your annual travel quota (for example, $1,500 to $5,000 USD depending on your needs—you don't have to deposit the full $12,000 at once; you simply deposit BDT as you spend!).

Step 3: Open the Foreign Currency & E-Commerce Part Before Booking Online
Having the physical ink stamp in your passport is only half the process! Before you book a flight on Aviasales, a hotel in Bangkok or Kuala Lumpur, or an airport pickup on Welcome Pickups:
- Log into your bank mobile app (EBL Skybanking, Citytouch, BRAC Astha) OR call your bank's 24/7 hotline (e.g., 16230 for EBL, 16234 for City Bank, 16221 for BRAC).
- Tell the agent: "Please open my USD Foreign Currency part AND enable E-Commerce / 3D-Secure Online Transactions and Overseas POS/ATM for [Number] days."
- Note on Single-Transaction Caps: Some banks cap single online transactions at $300–$500 USD by default. If you are buying family flight tickets costing $800+, inform the call center 15 minutes before clicking 'Pay'.

3. RFCD ACCOUNT VS. REGULAR TRAVEL QUOTA: WHICH ONE IS BETTER?
When you return to Dhaka with leftover cash USD from a trip (up to $10,000 without declaration, or more with an FMJ form), you can deposit that foreign cash into a Resident Foreign Currency Deposit (RFCD) account at your bank.
- Regular Travel Quota Card: You deposit BDT, and the bank converts it to USD at the daily BC selling rate + passport endorsement limit.
- RFCD International Card: Your money stays in USD, earns interest, never expires with the calendar year, and has no $300 single-transaction e-commerce hassle!

4. HOW TO AVOID HIDDEN 5% DYNAMIC CURRENCY CONVERSION (DCC) FEES ABROAD
When tapping your Bangladeshi card at hotels or malls in Bangkok (Sukhumvit/Pratunam), Kuala Lumpur (Bukit Bintang), Singapore (Mustafa Centre), or Dubai (Deira), the POS machine will often ask: "Pay in USD or Local Currency (THB/MYR/SGD/AED)?"
- Always select the LOCAL currency of the country you are visiting (or USD if your bank bills directly in USD without markup). Never select BDT on an overseas card terminal, or you will lose 4%–6% on poor conversion rates.

5. WHAT IF YOU DON'T HAVE A DUAL-CURRENCY CARD YET?
Don't let card delays cause you to miss a cheap flight fare or hotel room! You can message the URAL Support Desk directly on WhatsApp (+8801784385335) and pay in BDT via local bank transfer, bKash, or Nagad while we complete your verified flight, hotel, or Welcome Pickups airport transfer reservation.`,
    internalLinks: [
      { text: "Top Budget Family Destinations from Dhaka", path: "/blog?slug=top-budget-family-destinations-from-dhaka" },
      { text: "Compare Trip Budgets in BDT", path: "/costs?country=thailand-costs" },
      { text: "Singapore MRT SimplyGo Card Guide", path: "/destinations?country=singapore-guide" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Card Endorsed & Ready?", body: "Compare live international flight fares from Dhaka and book directly with zero agency markup." }
  },
  {
    id: "blog-7",
    slug: "maldives-budget-trip-bangladesh-maafushi",
    title: "Maldives Under BDT 75,000 from Dhaka: Maafushi Local Island vs. Private Resort Guide",
    summary: "For years, Bangladeshi travelers assumed a Maldives vacation required BDT 2,50,000+ per person because private overwater resorts charge $500+ per night and $250 for private speedboats. Today, local inhabited islands like Maafushi and Hulhumalé let you swim in the exact same crystal-clear Indian Ocean lagoons for under BDT 75,000 total—flights included! Read how Bangladeshi tourists get a free 30-day Visa on Arrival in Malé, submit the free IMUGA declaration, catch the $25 scheduled speedboat to Maafushi beachfront hotels, join $30 half-day snorkeling and sandbank drone excursions, and book 1-day water villa resort passes without paying resort room rates.",
    category: "Family & Budget",
    date: "September 22, 2026",
    author: "Zayan Rahman (Senior Travel Researcher)",
    readTime: "5 min read",
    content: `For years, Bangladeshi travelers assumed a trip to the Maldives required BDT 2,50,000+ per person because private overwater villas charge $500+ a night and $300 for resort speedboats. Today, thanks to local island tourism on Maafushi and Hulhumalé, you can experience the exact same turquoise Indian Ocean lagoons for a fraction of the price.

1. LOCAL ISLAND (MAAFUSHI) VS. PRIVATE RESORT ISLAND
The Maldives has two types of islands:
- Private Resort Islands: One hotel owns the entire island. Rooms start at BDT 35,000–80,000/night, and you must pay the resort's private boat fee ($120–$250/person) and eat all meals at resort prices.
- Local Inhabited Islands (Maafushi & Hulhumalé): Welcoming Maldivian towns with modern 3-star and 4-star beachfront hotels (like Kaani Palm Beach and Arena Beach Hotel) costing BDT 6,500–9,800 per night. Everything is 100% Halal, and shared speedboats from Malé Airport cost just $25 USD!

2. THE $30 SNORKELING & SANDBANK SECRET
On Maafushi Island, local tour operators run daily group speedboats for just $30–$35 USD (approx BDT 3,650) per person. A single half-day tour includes:
- Snorkeling at 2 vibrant coral reefs with sea turtles and tropical fish
- Dolphin watching on the open ocean
- Visiting a pure-white sandbank in the middle of the sea with complimentary lunch and underwater GoPro/drone photos!

3. HOW TO VISIT A WATER VILLA RESORT FOR ONE DAY
Want those iconic overwater bungalow photos for Instagram without paying BDT 60,000 a night? Book a "1-Day Resort Excursion Pass" from Maafushi ($110–$140 USD). It includes roundtrip boat transfers to a 4-star or 5-star private resort, full access to the overwater walkways, infinity pool, beach loungers, and an all-inclusive buffet lunch.

4. DHAKA IMMIGRATION CHECKLIST FOR MALDIVES FREE VOA
Bangladeshi passport holders get a FREE 30-day Visa on Arrival in Malé. To ensure a smooth 2-minute check at Dhaka Airport:
- Complete the free IMUGA Traveller Declaration (imuga.immigration.gov.mv) within 96 hours before flying.
- Carry printed copies of your return flight ticket and confirmed hotel booking.
- Have USD endorsed on your passport alongside your job NOC or trade license.`,
    internalLinks: [
      { text: "Dhaka to Malé Flight Guide", path: "/flights?route=dhaka-maldives" },
      { text: "Maldives Free Visa & IMUGA Steps", path: "/visa?country=maldives-visa" },
      { text: "Maldives Full Cost Breakdown in BDT", path: "/costs?country=maldives-costs" }
    ],
    affiliateCTA: { provider: "klook", headline: "Explore Maldives Tours & Transfers", body: "Check day tours, snorkeling excursions, and eSIM data packages before you fly to Malé." }
  },
  {
    id: "blog-8",
    slug: "singapore-visa-guide-bangladesh-agents",
    title: "Singapore Tourist Visa from Bangladesh (2026): Authorized Agents, LOI V39A & Checklist",
    summary: "Singapore is a premier destination for Bangladeshi families seeking world-class theme parks on Sentosa Island, medical check-ups at Mount Elizabeth Hospital, or shopping around Mustafa Centre in Little India. However, because the Consulate of the Republic of Singapore in Dhaka does not accept walk-in tourist applications, every Bangladeshi traveler must apply through an Embassy-Authorized Visa Agent (AVA). This guide demystifies the entire 2026 Singapore e-Visa process: how to handle the Letter of Introduction (Form V39A) if you do not have a local Singaporean contact, strict 35mm x 45mm matte photo rules, recommended BDT 1,50,000+ bank balance statements, and completing the mandatory free SG Arrival Card (SGAC) 72 hours before departure.",
    category: "Visa & Immigration",
    date: "September 24, 2026",
    author: "Nabila Tabassum (Programmatic Curator)",
    readTime: "5 min read",
    content: `Singapore is one of the most popular family vacation, shopping, and medical check-up hubs for Bangladeshi citizens. However, unlike Malaysia's self-service eVisa portal, Singapore requires applications from Bangladesh to go through Embassy-Authorized Visa Agents. Here is how to get your Singapore e-Visa approved smoothly on the first try.

1. WHY YOU MUST USE AN AUTHORIZED VISA AGENT
The Consulate of the Republic of Singapore in Dhaka (Gulshan) does not accept walk-in tourist visa applications from individuals. Instead, the Consulate designates official Authorized Visa Agents (AVAs) in Dhaka and Chattogram to verify your physical passport, Form 14A, and supporting documents before submitting them electronically into the ICA SAVE system.

2. DECODING THE LETTER OF INTRODUCTION (LOI - FORM V39A)
The #1 question from first-time Bangladeshi applicants is: "What is Form V39A (LOI)?"
- A Letter of Introduction (Form V39A) is a sponsorship form signed by a Singapore Citizen or Singapore Permanent Resident (PR) aged 21 or older who knows you or invites you.
- What if you don't know anyone in Singapore? Do not panic. If you have a solid travel history (previous visits to Thailand, Malaysia, UAE, Europe, or US) and strong financials, or if you book through a top-tier Authorized Visa Agent in Dhaka, the agency can guide you on submitting a corporate/hotel-backed profile or arranged local tour sponsorship.

3. FINANCIAL & PHOTO SPECIFICATIONS THAT CAUSE DELAYS
- Photo Rule: Singapore is strict about photo quality. Your 35mm x 45mm photo must be taken within the last 3 months on a pure white background with a matte finish—do not reuse an old photo that already appears on an old visa in your passport!
- Bank Statement: Provide a 6-month personal bank statement with regular transaction flow and a closing balance of at least BDT 1,50,000 per person (BDT 3,00,000+ for a family), paired with an original Bank Solvency Certificate.

4. DON'T FORGET THE SG ARRIVAL CARD (72 HOURS BEFORE FLIGHT)
Once your Singapore e-Visa PDF arrives (usually within 5–7 working days), print it on clean A4 paper. Then, within 3 days (72 hours) prior to your flight from Dhaka, go to the official ICA website (eservices.ica.gov.sg) to submit your free SG Arrival Card (SGAC). With both in hand, you can even use Changi Airport's automated immigration lanes!`,
    internalLinks: [
      { text: "Singapore Visa Requirements & Checklist", path: "/visa?country=singapore-visa" },
      { text: "Dhaka to Singapore Direct Flights", path: "/flights?route=dhaka-singapore" },
      { text: "Best Hotels Near Mustafa Centre Singapore", path: "/hotels?city=singapore-hotels" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Stay Connected at Changi Airport", body: "Install a Singapore eSIM before leaving Dhaka so your Grab and Google Maps work the second you land." }
  },
  {
    id: "blog-9",
    slug: "top-budget-family-destinations-from-dhaka",
    title: "Top 6 Budget-Friendly Family Destinations from Dhaka in 2026 (Ranked by BDT Cost & Visa Ease)",
    summary: "Planning an international holiday from Dhaka with young children, a spouse, or elderly parents requires balancing flight duration, predictable visa approval, Halal food access, stroller-friendly streets, and total cost in Bangladeshi Taka. In this ranked 2026 family guide, we compare the top six outbound destinations from Bangladesh from lowest to highest 5-day per-person BDT budget: Nepal (from BDT 42,000 with free Visa on Arrival), Malaysia (from BDT 68,000 with 4-day online e-Visa and universal JAKIM Halal dining), Thailand (from BDT 72,000 with Safari World and medical check-up access), Maldives local islands (Maafushi & Hulhumalé from BDT 75,000), Singapore, and Dubai.",
    category: "Family & Budget",
    date: "September 26, 2026",
    author: "Farhan Momen (Lead Travel Strategist)",
    readTime: "7 min read",
    content: `When traveling abroad from Dhaka with a spouse, children, or elderly parents, your priorities shift completely. You need short flight times, predictable visa approvals, easily accessible Halal meals, family-sized hotel rooms, and reliable airport-to-hotel transfers. Here are the Top 6 Budget-Friendly Family Destinations from Dhaka in 2026, ranked from lowest to highest total BDT cost.

1. NEPAL (KATHMANDU, NAGARKOT & POKHARA) — BEST UNDER ৳50,000 PER PERSON
- Flight Time from Dhaka: 1 hr 30 mins direct (Biman Bangladesh, Himalaya Airlines)
- Visa for Bangladeshis: 100% Free Visa on Arrival (Gratis for 1st visit/year)
- 5-Day Per-Person Budget (Family Sharing): BDT 42,000 – BDT 55,000 (Flights + 4-Star Hotel + Private Car)
- Why Families Love It: Zero visa anxiety! If you decide on Monday to take your family abroad on Thursday, Nepal is ready. Instead of taking long tourist buses with children or seniors, families can hire a private Toyota Hiace or Scorpio SUV with an English-speaking driver for Kathmandu and Nagarkot sunrise views at very affordable rates.

2. MALAYSIA (KUALA LUMPUR & GENTING HIGHLANDS) — BEST ALL-AROUND MUSLIM FAMILY HUB
- Flight Time from Dhaka: 4 hrs direct (Biman, Malaysia Airlines, AirAsia, Batik Air)
- Visa for Bangladeshis: 100% Online e-Visa (BDT 3,800 – 4,200; 2–4 working days)
- 5-Day Per-Person Budget (Family Sharing): BDT 68,000 – BDT 85,000
- Why Families Love It: Malaysia is arguably the most stress-free country in Asia for Bangladeshi families. Virtually 100% of restaurants in Bukit Bintang and KLCC are JAKIM Halal-certified, English is spoken everywhere, sidewalks are stroller- and wheelchair-friendly, and a 2-bedroom serviced apartment with a kitchen and swimming pool near KLCC costs less than a cramped hotel room elsewhere. Kids adore the Awana Skyway cable car up to Genting Highlands and Aquaria KLCC.

3. THAILAND (BANGKOK, PATTAYA & PHUKET) — BEST FOR SHOPPING, SAFARI WORLD & MEDICAL CHECKUPS
- Flight Time from Dhaka: 2 hrs 35 mins direct (Biman, Thai Airways, US-Bangla, Thai Lion Air)
- Visa for Bangladeshis: Official Thailand e-Visa via thaievisa.go.th (BDT 6,500 – 8,500; 5–10 days)
- 5-Day Per-Person Budget (Family Sharing): BDT 72,000 – BDT 92,000
- Why Families Love It: Now that Thailand has launched the online e-Visa portal for Dhaka applicants, families no longer have to leave physical passports at VFS for weeks. Stay in Pratunam or Sukhumvit for effortless Halal dining, take the kids to Safari World Bangkok or Chao Phraya dinner cruises via Klook, and pre-book a Welcome Pickups family minivan so your driver greets you right at Suvarnabhumi Arrival Gate 3.

4. MALDIVES (MAAFUSHI & HULHUMALÉ LOCAL ISLANDS) — BEST BEACH ESCAPE WITH ZERO VISA FEE
- Flight Time from Dhaka: 4 hrs 15 mins direct (US-Bangla Airlines) or 1-stop via Colombo
- Visa for Bangladeshis: 100% Free 30-Day Visa on Arrival (+ Free IMUGA online form)
- 5-Day Per-Person Budget (Family Sharing): BDT 75,000 – BDT 98,000
- Why Families Love It: A 100% Muslim nation with crystal-clear, shallow turquoise lagoons. Families with young kids often split their stay between Hulhumalé (connected by road bridge to Malé Airport—no boat needed!) and Maafushi Island (a 35-minute $25 speedboat ride) for dolphin cruises and sandbank picnics.

5. SINGAPORE (LITTLE INDIA, MARINA BAY & SENTOSA) — SAFEST & MOST ACCESSIBLE FOR SENIORS & KIDS
- Flight Time from Dhaka: 4 hrs 10 mins direct (Singapore Airlines, Biman, US-Bangla)
- Visa for Bangladeshis: e-Visa via Authorized Dhaka Visa Agents (BDT 4,200 – 6,500)
- 5-Day Per-Person Budget (Family Sharing): BDT 98,000 – BDT 1,35,000
- Why Families Love It: While hotel rooms in Singapore are pricier, the city is unmatched for safety, cleanliness, and wheelchair/stroller accessibility. Staying near Little India (Mustafa Centre) or Bugis gives you 24-hour Bengali and Indian Halal food, and attractions like Gardens by the Bay, Singapore Zoo, and Universal Studios Sentosa are world-class.

6. DUBAI, UAE (DEIRA, DOWNTOWN & DESERT SAFARI) — BEST WINTER FAMILY EXTRAVAGANZA (NOV–MAR)
- Flight Time from Dhaka: 5 hrs 30 mins direct (Emirates, flydubai, Biman, US-Bangla)
- Visa for Bangladeshis: Sponsor-based e-Visa (BDT 11,500 – 14,500; 3–5 days)
- 5-Day Per-Person Budget (Family Sharing): BDT 1,10,000 – BDT 1,45,000
- Why Families Love It: Between November and March, Dubai's weather is pleasant and cool. Families can watch the free Dubai Mall Fountain Show below Burj Khalifa, visit Miracle Garden and Global Village, and book a family 4x4 Desert Safari with BBQ dinner.

PRO FAMILY SAVING HACK: PRE-BOOK A FAMILY MINIVAN AT THE AIRPORT
When traveling as a family of 4 to 6 people with 4+ suitcases, ordinary airport taxis cannot fit your luggage and will force you to split into two cars. Always pre-book a 6-seater Family Minivan via Welcome Pickups or Kiwitaxi in our Travel Essentials Hub—it costs almost the same as two regular taxis and your driver waits at the gate with your family name sign!`,
    internalLinks: [
      { text: "Compare All 6 Country Budgets in BDT", path: "/costs?country=malaysia-costs" },
      { text: "Check Family Hotel Guides by Neighborhood", path: "/hotels?city=kuala-lumpur-hotels" },
      { text: "Dual-Currency Card Endorsement Guide", path: "/blog?slug=dual-currency-card-endorsement-bangladesh" }
    ],
    affiliateCTA: { provider: "klook", headline: "Book Family Theme Parks & Safari World Passes", body: "Save 15–25% on Safari World Bangkok, Genting SkyWorlds, Gardens by the Bay, and Dubai Desert Safaris with mobile QR tickets." }
  },
  {
    id: "blog-10",
    slug: "dhaka-airport-outbound-immigration-checklist-noc-go",
    title: "Dhaka Airport (DAC) Outbound Immigration Checklist 2026: NOC, GO, Return Ticket & First-Time Flyer Rules",
    summary: "Even after receiving an approved e-Visa or booking a Visa-on-Arrival holiday to Nepal or the Maldives, many first-time Bangladeshi travelers feel anxious about facing the emigration counter at Hazrat Shahjalal International Airport (DAC). In reality, clearing Dhaka outbound immigration takes under two minutes when your document folder is properly organized. This verified checklist details the 5 mandatory documents every passenger must carry (6-month valid passport with old passports attached, printed visa/QR code, return PNR ticket, hotel voucher, and passport dollar endorsement), alongside profession-specific papers including Private Job NOCs, Government Orders (GO), Trade Licenses, and fresh-passport tips.",
    category: "Visa & Immigration",
    date: "September 26, 2026",
    author: "Nabila Tabassum (Programmatic Curator)",
    readTime: "6 min read",
    content: `Even after getting an approved e-Visa or preparing for a Visa-on-Arrival destination like Nepal or the Maldives, many first-time Bangladeshi travelers feel nervous about the emigration desk at Hazrat Shahjalal International Airport (DAC). In reality, Dhaka immigration officers simply verify that you are a genuine tourist with confirmed return plans and legitimate financial backing.

Carry a neat plastic document folder in your cabin backpack with these exact printed papers, and you will clear emigration in under 2 minutes:

1. THE 5 MANDATORY PAPERS FOR EVERY TOURIST
- Valid Passport (minimum 6 months validity from your return date) + Old Passports (if your travel history is in an expired passport, always carry it bound together!).
- Printed Visa Copy (e-Visa printout in clear color/B&W for Thailand, Malaysia, Singapore, or UAE) OR Mandatory Arrival QR Code (IMUGA QR for Maldives; SGAC for Singapore; MDAC for Malaysia).
- Confirmed Return Air Ticket (showing a valid PNR for both Dhaka departure and Dhaka return—never fly on a one-way ticket with a tourist visa).
- Confirmed Hotel Booking Voucher (printed from Booking.com, Agoda, or direct hotel confirmation covering your stay).
- Foreign Currency Endorsement Proof: Physical bank endorsement stamp on your passport showing Cash USD ($500+ recommended for VOA countries) and/or an active Dual-Currency Debit/Credit Card in your name + recent 6-month Bank Statement copy.

2. PROFESSION-SPECIFIC DOCUMENTS (DO NOT FORGET THESE!)
Dhaka immigration officers routinely ask: "What do you do in Bangladesh?" and ask to see your occupational proof:
- Private Sector Job Holders: Original printed No Objection Certificate (NOC) / Leave Approval Letter on company letterhead + your physical Office ID Card + 1 or 2 Visiting Cards.
- Government / Semi-Govt / Autonomous Body Employees: Official Government Order (GO) / Ex-Bangladesh Leave Order issued by your ministry or department (mandatory by law for government staff).
- Business Owners / Entrepreneurs: Copy of your renewed Trade License (with English translation) + Company Letterhead Pad self-declaration + Business Visiting Card.
- Doctors, Engineers & Lawyers: BMDC / IEB / Bar Council ID card + Chamber/Hospital NOC.
- Students & Homemakers: Student ID + Institution No-Objection Letter (for students), or Spouse's NOC/Trade License + Marriage Certificate copy (when traveling as a family or sponsored by spouse/parents).

3. SPECIAL TIPS FOR FIRST-TIME "FRESH PASSPORT" FLYERS TO NEPAL & MALDIVES
Because Nepal and the Maldives offer free Visa on Arrival to Bangladeshi citizens, emigration officers check first-time flyers slightly more carefully:
- Dress neatly and confidently.
- Know your hotel name and your basic 4–5 day sightseeing plan (e.g., "We are staying 3 nights in Thamel, Kathmandu and 2 nights in Pokhara Lakeside").
- Carry at least $300–$500 Cash USD in hand OR an endorsed Dual-Currency Card with your bank statement so you can immediately demonstrate sufficient funds.`,
    internalLinks: [
      { text: "Nepal Free Visa on Arrival Checklist", path: "/visa?country=nepal-visa" },
      { text: "Maldives Free VOA & IMUGA Guide", path: "/visa?country=maldives-visa" },
      { text: "Interactive Outbound Packing & Document Tool", path: "/tools" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Have Internet Ready at the Arrival Immigration Desk", body: "Activate a travel eSIM before takeoff so you can pull up your return ticket, hotel voucher, or IMUGA QR code immediately upon landing." }
  },
  {
    id: "blog-11",
    slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
    title: "Umrah & Hajj Preparation Guide from Bangladesh (2026): Official Visa Rules, Nusuk App, Flights & BDT Cost Breakdown",
    summary: "Every year, hundreds of thousands of Bangladeshi Muslims travel to Makkah and Madinah for Umrah and Hajj, yet confusing social media rumors often cause pilgrims to overpay or misunderstand current Saudi e-Visa rules. This verified 2026 guide clarifies the strict legal separation between obligatory Hajj registration via the Bangladesh Ministry of Religious Affairs portal (hajj.gov.bd) and year-round DIY Umrah planning. Explore the 3 legitimate Umrah visa pathways for Bangladeshi passport holders, mandatory Saudi Visa Bio and Nusuk Rawdah permit apps, open-jaw Dhaka–Jeddah/Madinah flight routing, and a complete 10-day BDT 1,16,000 to BDT 1,32,000 budget breakdown.",
    category: "Hajj & Umrah",
    date: "September 26, 2026",
    author: "Farhan Momen (Lead Travel Strategist)",
    readTime: "8 min read",
    content: `Every year, hundreds of thousands of Bangladeshi Muslims travel to Makkah and Madinah for Umrah and Hajj. Because rules from the Saudi Ministry of Hajj & Umrah and the Bangladesh Ministry of Religious Affairs have modernized rapidly, having accurate, verified information is essential so your family is never overcharged or misled.

1. CRUCIAL DISTINCTION: OFFICIAL HAJJ VS. INDEPENDENT (DIY) UMRAH FOR BANGLADESHIS
Before planning, every Bangladeshi pilgrim must understand the strict legal separation between Hajj and Umrah:
- HAJJ (Strictly Regulated Quota System): You CANNOT perform obligatory Hajj independently on an Umrah visa, Transit visa, or Tourist visa. Saudi authorities strictly enforce a SAR 10,000+ fine, deportation, and a 10-year entry ban for anyone attempting Hajj without an official Hajj Permit/Nusuk Hajj Card. To perform Hajj from Bangladesh, you must complete official Pre-Registration (Prak-Nibondhon) and Final Registration (Nibondhon) through the Bangladesh Ministry of Religious Affairs portal (hajj.gov.bd) using your NID and e-Passport, under either the Government Hajj Package or a Ministry-Approved Licensed Hajj Agency.
- UMRAH (Flexible Year-Round Outside the Hajj Season): Unlike Hajj, you DO NOT have to buy an overpriced all-inclusive group package to perform Umrah! Once you obtain a valid Saudi Umrah e-Visa (or Stopover Visa), you are legally free to book your own Dhaka–Jeddah/Madinah flights, choose your own Makkah and Madinah hotels near the Haram, and travel at your family's own pace.

2. THE 3 VERIFIED UMRAH VISA PATHWAYS FOR BANGLADESHI PASSPORT HOLDERS
Be careful of social media rumors claiming any Bangladeshi passport can apply for an instant Saudi Tourist e-Visa online—that rule only applies to specific visa holders. Here are the 3 authentic ways Bangladeshi citizens get an Umrah visa in 2026:

Pathway A: 90-Day Umrah e-Visa via an Authorized Bangladesh Umrah Agency (Open to All Valid Passports)
- Who qualifies: Any Bangladeshi citizen with an e-Passport or MRP valid for at least 6 months.
- How it works: Submit your passport scan and passport photo to a Ministry/Nusuk-authorized Umrah agency in Dhaka for "Visa + Mandatory Saudi Health Insurance Only" (without buying their hotel or flight bundle).
- Processing time & cost: Issued in 2 to 5 working days as a PDF e-Visa; typically costs BDT 15,500 – BDT 19,500 per person.

Pathway B: 96-Hour Saudi Stopover / Transit Visa (When Flying Saudia or Flynas)
- Who qualifies: Bangladeshi travelers booking an international transit flight on Saudia (Saudi Arabian Airlines) or Flynas (for example, flying Dhaka → Jeddah → Dubai/Istanbul/London or vice versa).
- How it works: During flight checkout on the official Saudia or Flynas website, select the "Stopover Visa" option (up to 96 hours / 4 days stay in Saudi Arabia). The visa is issued electronically within minutes for ~SAR 39.50 + mandatory medical insurance (~BDT 3,500 – BDT 4,500 total), and eligible Saudia stopover tickets include 1 complimentary hotel night!

Pathway C: Instant 1-Year Saudi Tourist e-Visa or Visa on Arrival (ONLY for US/UK/Schengen Visa Holders)
- Who qualifies: Bangladeshi passport holders who hold a valid, physical US, UK, or Schengen tourist/business visa that has been stamped/used at least once to enter the issuing country (or permanent residents of the US, UK, or EU).
- How it works: Eligible travelers can apply directly on visa.visitsaudi.com or obtain a Visa on Arrival at Jeddah (JED) or Madinah (MED) airport for ~SAR 480 (~BDT 15,500).

3. MANDATORY APPS & HEALTH REQUIREMENTS BEFORE FLYING FROM DHAKA
- Saudi Visa Bio App (Biometrics): Download the official "Saudi Visa Bio" app on your smartphone to scan your passport, face, and 10 fingerprints before flying (mandatory for Hajj pilgrims and required for visa biometrics).
- Official Nusuk App (nusuk.sa): Once your Umrah or Stopover visa is issued, create an account on the official Nusuk app using your Visa Number and Passport Number. You will use Nusuk to book your Umrah appointment slot and your mandatory Rawdah Shareef (Riyazul Jannah) permit in Masjid an-Nabawi, Madinah. Tip: Rawdah permits for men and women open on separate schedules—check Nusuk early!
- Vaccination Certificate: Carry your Meningococcal Meningitis (ACWY-135) vaccination card (taken at least 10 days prior to travel) along with your printed e-Visa, confirmed return air ticket, hotel vouchers, and endorsed Dual-Currency Card / Cash USD or SAR.

4. FLIGHTS & HARAMAIN HIGH-SPEED TRAIN: SMART ROUTING FROM DHAKA
- Best Flight Strategy ("Open-Jaw / Multi-City Ticket"): Instead of flying Dhaka → Jeddah → Dhaka and backtracking by road, book a Multi-City ticket: Fly Dhaka (DAC) → Jeddah (JED), wear your Ihram before crossing the Miqat (Yalamlam / Qarn al-Manazil—announced by the pilot 45 minutes before landing on Biman and Saudia flights), perform Umrah in Makkah, take the bullet train to Madinah, and fly home directly from Madinah (MED) → Dhaka (DAC).
- Direct Airlines from Dhaka: Biman Bangladesh Airlines and Saudia operate direct flights (~6 to 6.5 hours; roundtrip BDT 74,000 – BDT 92,000). Budget 1-stop options include Gulf Air, SalamAir, Jazeera Airways, Air Arabia, and Kuwait Airways (BDT 56,000 – BDT 68,000).
- Haramain High-Speed Railway (sar.hhr.sa): Connects Jeddah Airport (KAIA Station inside Terminal 1) directly to Makkah Station in 55 minutes (Economy fare: SAR 60–75 / ~BDT 2,100), and connects Makkah to Madinah in just 2 hours 20 minutes at 300 km/h (Economy fare: SAR 150–220 / ~BDT 5,200–7,200).

5. WHERE TO STAY IN MAKKAH & MADINAH (HOTEL ZONES EXPLAINED)
- Makkah Walking-Distance Zones: Jabal Omar, Abraj Al Bait (Clock Tower), and northern Ajyad / Ibrahim Al Khalil Street (0 to 500 meters from Masjid al-Haram courtyard; ideal for elderly parents and children, from BDT 14,000 – BDT 32,000/night).
- Makkah Budget Shuttle Zones: Mahbas Al Jin, Kudai, and Aziziyah / Naseem (3-to-4 star clean hotels with dedicated 24/7 free shuttle buses dropping you at the Haram tunnel in 8–10 minutes; from BDT 4,200 – BDT 7,500/night).
- Madinah Best Zone for Families: Markazia North & West (Central Area) stays 100–300 meters from Masjid an-Nabawi gates. If traveling with female family members, book a hotel on the Northern side near Ladies' Gates 25 to 29 for effortless prayer access.

6. REALISTIC 10-DAY DIY UMRAH BUDGET FROM BANGLADESH (PER PERSON IN BDT, FAMILY OF 4 SHARING)
- Roundtrip Flights (DAC–JED / MED–DAC): BDT 58,000 (1-Stop) to BDT 78,000 (Direct Biman/Saudia)
- Umrah e-Visa + Mandatory Saudi Medical Insurance: BDT 16,500
- 5 Nights Makkah + 4 Nights Madinah Hotels (Per Person Share): BDT 22,000 (Shuttle/Budget 3-Star) to BDT 55,000 (Walking-Distance 4/5-Star)
- Haramain Bullet Train / Private Family GMC or Hyundai H1 Van: BDT 7,500 – BDT 11,000
- Daily Halal Meals & Ziyarah Tours (Taif, Badr, Quba Mosque, Mount Uhud): BDT 12,000 – BDT 18,000
- Total Estimated 10-Day Umrah Cost per Person: BDT 1,16,000 – BDT 1,32,000 (Budget Family Share) | BDT 1,65,000 – BDT 2,15,000 (Comfort Walking-Distance)`,
    internalLinks: [
      { text: "Dual-Currency Card Endorsement Guide for Hotel & Train Bookings", path: "/blog?slug=dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration Document Checklist", path: "/blog?slug=dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Dubai Stopover & UAE Visa Guide from Dhaka", path: "/destinations?country=dubai-guide" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Stay Connected on Nusuk & WhatsApp in Makkah and Madinah", body: "Install a Saudi Arabia 4G/5G eSIM before flying from Dhaka so your Nusuk Rawdah permit QR code, Haramain train ticket, and Uber/Careem work the moment you land at Jeddah Airport." }
  },
  {
    id: "blog-12",
    slug: "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
    title: "Makkah & Madinah Hotel Zones, Haramain Bullet Train & Ziyarah Guide for Bangladeshi Pilgrims (2026)",
    summary: "Picking the wrong hotel street in Makkah or Madinah can mean pushing elderly parents up steep hills in 40°C heat or waiting 45 minutes for crowded elevators after every prayer. This practical ground-logistics guide for Bangladeshi Umrah and Hajj pilgrims compares Makkah's flattest walking-distance zones (Jabal Omar, Clock Tower, and Northern Ajyad) against high-value 24/7 shuttle districts (Mahbas Al Jin and Kudai), shows how to book hotels near Masjid an-Nabawi Ladies' Gates 25–29 in Madinah Markazia North, and walks through Haramain High-Speed Railway baggage rules, Zamzam water allowance at Jeddah/Madinah airports, and private Ziyarah taxi rates in SAR and BDT.",
    category: "Hajj & Umrah",
    date: "September 26, 2026",
    author: "Farhan Momen (Lead Travel Strategist)",
    readTime: "7 min read",
    content: `When Bangladeshi families plan an Umrah trip—especially with elderly parents or young children—the difference between an exhausting journey and a peaceful spiritual experience comes down to three ground logistics: choosing the right hotel zone near the Haramain, mastering the Haramain High-Speed Bullet Train, and knowing the official Zamzam and Ziyarah rules.

1. MAKKAH HOTEL ZONES: FLAT WALKING ACCESS VS. STEEP HILLS
Many hotels advertise "600 meters from Masjid al-Haram" on online booking sites without mentioning that the last 200 meters is a steep uphill climb! Here is the real street-level breakdown for Bangladeshi pilgrims:
- Jabal Omar & Ibrahim Al Khalil Street (North-West): Zero steep slopes, modern wide elevators, and direct flat access into the King Fahd Gate and Umrah courtyard in 3 to 6 minutes. Best for wheelchair users and senior parents (BDT 18,000 – BDT 35,000/night).
- Lower Ajyad Street (First 400m): Very convenient for King Abdulaziz Gate access, surrounded by affordable Bengali/Pakistani restaurants. Avoid Upper Ajyad (Bir Balila) if traveling with elderly family members unless the hotel operates a 24/7 golf-cart or microbus shuttle to the flat courtyard.
- Mahbas Al Jin & Kudai (Smart Budget Shuttle Hubs): Clean 3-star and 4-star towers costing just BDT 4,200 – BDT 7,500/night. Dedicated free shuttle buses run every 5 minutes through the tunnel directly to the Marwah / Bab Ali bus terminal.

2. MADINAH HOTEL ZONES: WHY MARKAZIA NORTH IS BEST FOR FAMILIES
Masjid an-Nabawi is surrounded by a flat paved courtyard on all four sides (Markazia North, South, East, and West).
- Why Bangladeshi Families Prefer Markazia North (Al Haram Road): The main Ladies' Prayer Sections and Rawdah entry points for women are located near Gates 25 to 29 on the Northern side, while men can enter directly through King Fahd Gate (Gate 21). Staying in Markazia North means mothers, wives, and sisters walk only 150 meters to their gate instead of walking 1 kilometer around the perimeter in the midday sun!

3. HARAMAIN HIGH-SPEED TRAIN (300 KM/H): JEDDAH → MAKKAH → MADINAH
Operated on the official portal (sar.hhr.sa) and the HHR Train mobile app:
- Jeddah Airport (KAIA Terminal 1) to Makkah: Takes just 54 minutes (SAR 60–75 Economy / ~BDT 2,100). If you land at Jeddah Terminal 1 in Ihram on Saudia or Biman, you walk straight into the indoor air-conditioned train station without stepping outside into the heat.
- Makkah (Rusayfah Station) to Madinah Station: Takes 2 hours 20 minutes (SAR 150–220 Economy / ~BDT 5,200–7,200) vs. 5 to 6 hours by highway bus.
- Strict Baggage Rule to Remember: Haramain Train allows 1 large suitcase (up to 25 kg, max dimensions 65 x 45 x 30 cm) + 1 cabin hand-bag per passenger. If your family has extra oversized cartons, either use the station's SPL luggage delivery service or hire a private 7-seater Hyundai H1 / GMC Savana van (SAR 450–600 / ~BDT 15,000–19,500 total for the whole family door-to-door).

4. HISTORIC ZIYARAH IN MAKKAH, MADINAH & TAIF (REALISTIC FARES)
Instead of paying per-person tour bus markups, a family of 3 to 6 can book a private air-conditioned sedan or 7-seater van for a 3-hour morning Ziyarah right after Fajr prayer:
- Makkah Ziyarah (Jabal al-Noor / Cave Hira base, Jabal Thawr, Mina, Muzdalifah, Arafat / Jabal al-Rahmah, Masjid Jin): SAR 150 – 220 (~BDT 4,900 – 7,200 total per car).
- Madinah Ziyarah (Masjid Quba—where praying 2 Rakah equals the reward of an Umrah—Mount Uhud & Martyrs' Cemetery, Masjid Qiblatain, Seven Mosques / Khandaq): SAR 120 – 180 (~BDT 3,900 – 5,900 total per car).
- Full-Day Taif Excursion from Makkah (Miqat Qarn al-Manazil, Abdullah Ibn Abbas Mosque, Rose Factories): SAR 350 – 450 (~BDT 11,500 – 14,800 roundtrip per car).

5. OFFICIAL ZAMZAM WATER RULE FOR RETURN FLIGHTS TO DHAKA
- Every pilgrim holding an Umrah e-Visa (or Nusuk Umrah permit) is permitted to purchase one official 5-liter boxed bottle of Zamzam water from the automated kiosks outside Jeddah (JED) or Madinah (MED) Airport for SAR 9.50–12.50 (~BDT 350–400).
- Full-service carriers flying to Dhaka (Biman Bangladesh Airlines, Saudia, Gulf Air, Kuwait Airways) carry this 5-liter sealed Zamzam box FREE of charge in addition to your regular 30kg–46kg baggage allowance.`,
    internalLinks: [
      { text: "Complete Umrah & Hajj Visa, Nusuk & BDT Budget Guide", path: "/blog?slug=umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Dual-Currency Card Endorsement for Booking Haramain Train", path: "/blog?slug=dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration Checklist", path: "/blog?slug=dhaka-airport-outbound-immigration-checklist-noc-go" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Need Data for Haramain Train & Nusuk Permits?", body: "Get an instant Saudi Arabia eSIM before flying from Dhaka so your Nusuk QR codes and Careem rides work seamlessly across Makkah and Madinah." }
  }
];

