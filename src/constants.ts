import { FlightRoute, HotelGuide, VisaGuide, DestinationGuide, TripCostData, BlogPost } from "./types";
import { SCHEDULED_BLOG_DATA } from "./data/scheduledBlogPosts.generated";

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
    id: "ktm-dhaka",
    from: "Kathmandu (KTM)",
    to: "Dhaka (DAC)",
    country: "Nepal",
    priceRangeBdt: "BDT 28,000 - BDT 40,000 (Roundtrip, Economy)",
    airlines: ["Biman Bangladesh Airlines", "Himalaya Airlines"],
    bestTimeToBook: "4-8 weeks before departure, especially for the October-November peak season",
    duration: "1h 30m (Direct)",
    visaRequirement: "Bangladeshi citizens do not need a visa to enter Bangladesh. Nepali citizens require a Bangladesh visa (eVisa or Visa on Arrival at DAC, subject to current rules).",
    quickAnswer: "Direct flights from Kathmandu (KTM) to Dhaka (DAC) take about 1 hour 30 minutes on Biman Bangladesh Airlines and Himalaya Airlines. Round-trip economy fares typically range from BDT 28,000 to BDT 40,000, depending on season and how early you book. Tribhuvan International Airport (KTM) serves as the departure point, with arrivals at Hazrat Shahjalal International Airport (DAC) in Dhaka.",
    keyFacts: [
      { label: "Flight Time", value: "1 hour 30 mins (Direct)" },
      { label: "Direct Airlines", value: "Biman Bangladesh, Himalaya Airlines" },
      { label: "Average Roundtrip Price", value: "BDT 32,000 - 35,000" },
      { label: "Departure Airport", value: "Tribhuvan International Airport (KTM)" },
      { label: "Arrival Airport", value: "Hazrat Shahjalal International Airport (DAC)" }
    ],
    faqs: [
      {
        question: "Which airlines fly direct from Kathmandu to Dhaka?",
        answer: "Biman Bangladesh Airlines and Himalaya Airlines both operate regular direct flights between Tribhuvan International Airport (KTM) in Kathmandu and Hazrat Shahjalal International Airport (DAC) in Dhaka, with a flight time of about 1 hour 30 minutes."
      },
      {
        question: "How can I find the cheapest Kathmandu to Dhaka flight ticket?",
        answer: "Book 4-8 weeks ahead where possible, avoid the October-November peak season if your dates are flexible, and compare both Biman Bangladesh and Himalaya Airlines directly - prices on this short route can vary significantly between the two."
      },
      {
        question: "Do Nepali citizens need a visa to enter Bangladesh from Kathmandu?",
        answer: "Nepali citizens require a visa to enter Bangladesh. Check current Bangladesh visa rules - options may include eVisa or Visa on Arrival at Hazrat Shahjalal International Airport (DAC), subject to prevailing immigration policy. Bangladeshi citizens do not need a visa to enter their own country."
      },
      {
        question: "How long is the flight from Kathmandu to Dhaka?",
        answer: "The direct flight time between Kathmandu and Dhaka is approximately 1 hour 30 minutes, making it one of the shortest international routes connecting Nepal and Bangladesh."
      },
      {
        question: "Is Hazrat Shahjalal International Airport close to central Dhaka?",
        answer: "Yes. Hazrat Shahjalal International Airport (DAC) is roughly 30-45 minutes by taxi from central Dhaka (Gulshan, Banani, Motijheel), depending on traffic conditions."
      },
      {
        question: "What documents must I present at Tribhuvan International Airport in Kathmandu before boarding a flight to Dhaka?",
        answer: "Before boarding your flight to Dhaka in Kathmandu, you must present a passport valid for at least six months from your travel date, along with a confirmed flight ticket. Bangladeshi citizens should carry their national ID or passport. Nepali citizens should carry their passport with a valid Bangladesh visa if required. Immigration officials at Tribhuvan International Airport (KTM) may also ask to see proof of sufficient funds or accommodation details."
      },
      {
        question: "Should I choose Biman Bangladesh Airlines or Himalaya Airlines for a trip from Kathmandu to Dhaka?",
        answer: "Both airlines offer regular direct flights on this route, so your choice should depend on price, baggage policies, and schedule preferences. Biman Bangladesh Airlines is a full-service carrier offering complimentary standard meals and generous checked luggage, making it a reliable option for families. Himalaya Airlines is a private carrier based in Nepal that also operates direct flights with basic services, often providing competitive pricing or better timing for quick weekend getaways."
      },
      {
        question: "What is the baggage allowance for Biman Bangladesh and Himalaya Airlines on flights from Kathmandu to Dhaka?",
        answer: "Biman Bangladesh Airlines generally provides a generous baggage allowance of 20 kg to 30 kg for checked luggage and 7 kg for carry-on baggage in Economy Class, though you should verify the exact limit printed on your ticket. Himalaya Airlines typically allows up to 20 kg of checked baggage and 7 kg of carry-on baggage for their standard economy fares, although they sometimes offer lower-priced promotional tickets with smaller allowances. Always check current baggage specifications at the time of reserving your ticket."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "KTM to DAC flight route details for Bangladeshi travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Biman Bangladesh Airlines"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Tribhuvan International Airport",
    "iataCode": "KTM"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
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
    visaRequirement: "Advance Tourist e-Visa via Thailand's official portal (thaievisa.go.th)",
    quickAnswer: "Direct flights from Dhaka to Bangkok take about 2 hours and 30 minutes, with economy roundtrip fares typically ranging from BDT 31,500 to BDT 45,000. Major carriers like Biman Bangladesh Airlines, Thai Airways, and US-Bangla Airlines fly to Suvarnabhumi Airport (BKK), while Thai Lion Air operates to Don Mueang Airport (DMK). Bangladeshi passport holders should obtain an approved Tourist e-Visa through Thailand's official portal before departure; check current Dhaka mission instructions.",
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
        answer: "No. Bangladeshi citizens must obtain an advance Tourist e-Visa through Thailand's official portal (thaievisa.go.th). Follow the current Dhaka mission checklist and any instructions shown in your application."
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
  },
  {
    id: "dhaka-los-angeles",
    from: "Dhaka (DAC)",
    to: "Los Angeles (LAX)",
    country: "United States",
    priceRangeBdt: "BDT 150,000 - BDT 240,000 (Roundtrip, Economy)",
    airlines: ["Emirates", "Qatar Airways", "Etihad Airways", "Turkish Airlines", "Biman Bangladesh Airlines", "US-Bangla Airlines"],
    bestTimeToBook: "3-5 months before departure, especially for summer (June-August) and winter holiday (December-January) travel",
    duration: "19h 30m - 24h 0m (1-2 Stops)",
    visaRequirement: "US B1/B2 Tourist Visa (advance application via US Embassy Dhaka, DS-160 form, visa interview required)",
    quickAnswer: "There are no nonstop flights from Dhaka (DAC) to Los Angeles (LAX). All itineraries require 1-2 stops, typically through Middle Eastern hubs (Dubai, Doha, Abu Dhabi), Istanbul, or European gateways. Total journey time ranges from 19 hours 30 minutes to 24 hours depending on connection length. Economy roundtrip fares typically range from BDT 150,000 to BDT 240,000. Bangladeshi passport holders must obtain a US B1/B2 visitor visa in advance through the US Embassy in Dhaka — this is not Visa on Arrival or ESTA-eligible.",
    keyFacts: [
      { label: "Flight Time", value: "19h 30m - 24h 0m (1-2 Stops)" },
      { label: "Direct Flights", value: "None — all routes require connections" },
      { label: "Common Connection Hubs", value: "Dubai (DXB), Doha (DOH), Abu Dhabi (AUH), Istanbul (IST)" },
      { label: "Average Roundtrip Price", value: "BDT 175,000 - 200,000" },
      { label: "Visa for Bangladeshis", value: "US B1/B2 Tourist Visa (advance, via US Embassy Dhaka)" }
    ],
    faqs: [
      {
        question: "Are there direct flights from Dhaka to Los Angeles?",
        answer: "No. There are currently no nonstop flights from Hazrat Shahjalal International Airport (DAC) to Los Angeles International Airport (LAX). All itineraries require at least one connection, most commonly through Dubai (DXB), Doha (DOH), Abu Dhabi (AUH), or Istanbul (IST)."
      },
      {
        question: "Which airlines fly from Dhaka to Los Angeles with the fewest stops?",
        answer: "Emirates (via Dubai), Qatar Airways (via Doha), Etihad Airways (via Abu Dhabi), and Turkish Airlines (via Istanbul) offer 1-stop itineraries with the shortest total journey times, typically 19h 30m to 21h. Biman Bangladesh and US-Bangla can connect you to these carriers at the Middle Eastern hubs."
      },
      {
        question: "Do Bangladeshi citizens need a visa to travel to Los Angeles?",
        answer: "Yes. Bangladeshi passport holders must obtain a US B1/B2 visitor visa before travel. This requires completing the DS-160 form online, paying the visa fee, and attending an in-person interview at the US Embassy in Dhaka. The US is not part of the Visa Waiver Program, so ESTA is not available for Bangladeshi citizens."
      },
      {
        question: "What is the cheapest time to fly from Dhaka to Los Angeles?",
        answer: "Book 3-5 months in advance. Avoid peak periods: US summer (June-August), winter holidays (December-January), and Eid travel seasons. Shoulder periods (late January-March, September-October) typically offer the lowest fares from BDT 150,000 roundtrip."
      },
      {
        question: "How long does a flight from Dhaka to Los Angeles take?",
        answer: "Total journey time ranges from 19 hours 30 minutes to 24 hours, depending on the connection hub and layover duration. A typical Emirates itinerary via Dubai is about 20-21 hours including a 2-4 hour layover."
      },
      {
        question: "What documents do I need at Hazrat Shahjalal International Airport before flying to Los Angeles?",
        answer: "You must present: (1) a passport valid for at least 6 months beyond your US stay, (2) a valid US B1/B2 visa stamped in your passport, (3) a confirmed roundtrip flight ticket, (4) proof of sufficient funds for your US stay, and (5) accommodation details or an invitation letter if applicable. US immigration officers at LAX may ask additional questions on arrival."
      },
      {
        question: "Can I transit through Dubai or Doha without a separate transit visa?",
        answer: "Bangladeshi citizens typically do not need a separate transit visa for short layovers in Dubai (DXB) or Doha (DOH) if you remain airside and have a confirmed onward ticket. However, if you plan to leave the airport or your layover exceeds the airline's permitted transit window, you may need a transit visa. Check with your airline before booking."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to LAX flight route details for Bangladeshi travelers",
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
    "name": "Los Angeles International Airport",
    "iataCode": "LAX"
  },
  "estimatedFlightDuration": "PT20H0M"
}`
    }
  },
  {
    id: "dhaka-madinah",
    from: "Dhaka (DAC)",
    to: "Madinah (MED)",
    country: "Saudi Arabia",
    priceRangeBdt: "BDT 55,000 - BDT 95,000 (Roundtrip, Economy)",
    airlines: ["Saudia", "Biman Bangladesh Airlines", "Flynas", "Flyadeal"],
    bestTimeToBook: "2-3 months before departure, especially before Ramadan and Hajj season; off-peak (post-Hajj, Muharram-Safar) offers lowest fares",
    duration: "6h 30m - 8h 0m (Direct)",
    visaRequirement: "Saudi Umrah visa or tourist visa (advance application via Saudi visa portal or authorized agents; Bangladeshi passport holders are NOT visa-exempt)",
    quickAnswer: "Direct flights operate from Hazrat Shahjalal International Airport (DAC) to Prince Mohammad bin Abdulaziz International Airport (MED) in Madinah, Saudi Arabia. Flight time is approximately 6 hours 30 minutes. Economy roundtrip fares typically range from BDT 55,000 to BDT 95,000. Bangladeshi passport holders need a Saudi Umrah visa or tourist visa before travel — this is not Visa on Arrival. Madinah is the second-holiest city in Islam, home to Al-Masjid an-Nabawi (the Prophet's Mosque).",
    keyFacts: [
      { label: "Flight Time", value: "6h 30m - 8h 0m (Direct)" },
      { label: "Direct Flights", value: "Yes — Saudia and Biman Bangladesh operate direct DAC–MED" },
      { label: "Average Roundtrip Price", value: "BDT 70,000 - 85,000" },
      { label: "Visa for Bangladeshis", value: "Saudi Umrah visa or tourist visa (advance, via Saudi visa portal)" }
    ],
    faqs: [
      {
        question: "Are there direct flights from Dhaka to Madinah?",
        answer: "Yes. Saudia and Biman Bangladesh Airlines operate direct flights from Hazrat Shahjalal International Airport (DAC) to Prince Mohammad bin Abdulaziz International Airport (MED) in Madinah. Flight time is approximately 6 hours 30 minutes."
      },
      {
        question: "Do Bangladeshi citizens need a visa to travel to Madinah for Umrah?",
        answer: "Yes. Bangladeshi passport holders must obtain a Saudi Umrah visa or tourist visa before travel. Applications can be made through the Saudi visa portal or authorized travel agents in Dhaka. This is not Visa on Arrival."
      },
      {
        question: "What is the cheapest time to fly from Dhaka to Madinah?",
        answer: "Book 2-3 months in advance. Avoid peak periods: Ramadan, Hajj season (Dhul-Hijjah), and Eid travel seasons. Off-peak months (Muharram-Safar, post-Hajj) typically offer the lowest fares from BDT 55,000 roundtrip."
      },
      {
        question: "How long does a flight from Dhaka to Madinah take?",
        answer: "Direct flights take approximately 6 hours 30 minutes to 8 hours, depending on the airline and specific routing."
      },
      {
        question: "What documents do I need at Hazrat Shahjalal International Airport before flying to Madinah?",
        answer: "You must present: (1) a passport valid for at least 6 months beyond your stay, (2) a valid Saudi Umrah visa or tourist visa, (3) a confirmed roundtrip flight ticket, (4) proof of accommodation in Saudi Arabia, and (5) proof of sufficient funds for your stay."
      },
      {
        question: "Can I visit Makkah from Madinah on the same trip?",
        answer: "Yes. Makkah is about 450 km from Madinah (approximately 4-5 hours by car or bus via the Haramain High-Speed Railway or SAPTCO bus). Many Umrah pilgrims visit both cities — Madinah first (Al-Masjid an-Nabawi) then Makkah (Masjid al-Haram), or vice versa."
      }
    ],
    schemaMarkup: {
      type: "Flight",
      description: "DAC to MED flight route details for Bangladeshi Umrah travelers",
      code: `{
  "@context": "https://schema.org",
  "@type": "Flight",
  "provider": {
    "@type": "Airline",
    "name": "Saudia"
  },
  "departureAirport": {
    "@type": "Airport",
    "name": "Hazrat Shahjalal International Airport",
    "iataCode": "DAC"
  },
  "arrivalAirport": {
    "@type": "Airport",
    "name": "Prince Mohammad bin Abdulaziz International Airport",
    "iataCode": "MED"
  },
  "estimatedFlightDuration": "PT6H30M"
}`
    }
  }
];

export const HOTELS_DATA: HotelGuide[] = [
  {
    id: "kathmandu-hotels",
    city: "Kathmandu",
    country: "Nepal",
    description: "Compare Kathmandu neighborhoods by the places you plan to visit, preferred pace, transport and dining needs. Room availability and total cost vary by dates and booking terms, so check a live listing before deciding.",
    neighborhoods: [
      { name: "Thamel", description: "A central visitor district with restaurants, shops and trekking services nearby. It can suit an itinerary focused on visitor facilities; check the exact address and likely evening noise.", vibe: "Lively, visitor services, central" },
      { name: "Boudha", description: "An area around Boudhanath Stupa with a different pace from the central visitor district. Compare the route to your planned sights and the transport you will use.", vibe: "Quieter pace, cultural sites" },
      { name: "Lazimpat / Darbar Marg", description: "A more residential-feeling option north of the central visitor areas. Check travel time to your planned activities and whether nearby services fit your stay.", vibe: "Calmer base, dining options" },
    ],
    quickAnswer: "For Kathmandu, compare Thamel, Boudha and Lazimpat against your itinerary, preferred pace and transport needs. Hotel prices and availability change with dates, room type and occupancy; compare live totals and booking terms before choosing.",
    keyFacts: [
      { label: "Visitor-services area to compare", value: "Thamel" },
      { label: "Cultural-area option", value: "Boudha" },
      { label: "Before booking", value: "Check exact address, room terms and total" },
    ],
    faqs: [
      {
        question: "Which Kathmandu areas should I compare for a first visit?",
        answer: "Compare Thamel, Boudha and Lazimpat against your itinerary, pace and transport preferences. Check the property's exact address and recent listing details rather than treating one neighborhood as the best choice for every traveler.",
      },
      {
        question: "How should I compare Kathmandu hotel prices?",
        answer: "Use the same dates, nights, guest count and room type. Compare the final checkout total, included meals and taxes, payment schedule and cancellation terms; rates and availability can change between searches.",
      },
    ],
  },
  {
    id: "bangkok-hotels",
    city: "Bangkok",
    country: "Thailand",
    description: "Compare Bangkok areas by your trip focus, transport plan, preferred pace and the property's exact location. No neighborhood is the right fit for every itinerary, and live hotel totals vary by dates and room terms.",
    neighborhoods: [
      { name: "Pratunam", description: "A busy shopping-focused area. Check the distance from the property to the shops and transit you plan to use, and consider the surrounding activity level.", vibe: "Shopping, busy, central" },
      { name: "Sukhumvit (Asok / Nana)", description: "A large, active district with a mix of dining, nightlife and transit options. Check the exact station access and street noise for the property you are considering.", vibe: "Urban, dining, transit options" },
      { name: "Khao San Road", description: "A visitor area associated with nightlife and budget travel. Review recent noise and room-condition feedback before booking, especially for a family or early start.", vibe: "Social, nightlife, visitor-focused" },
    ],
    quickAnswer: "In Bangkok, compare Pratunam, Sukhumvit and Khao San Road based on shopping, transit, nightlife and noise preferences. Hotel availability and total cost depend on your dates, guests and room terms, so compare live listings on the same basis.",
    keyFacts: [
      { label: "Shopping-focused area to compare", value: "Pratunam" },
      { label: "Transit and dining options to compare", value: "Sukhumvit" },
      { label: "Before booking", value: "Check exact station access and noise" },
    ],
    faqs: [
      {
        question: "Which Bangkok neighborhood should I choose for my stay?",
        answer: "Compare the exact property location in Pratunam, Sukhumvit or Khao San Road against your activities, transit needs and preferred noise level. Check recent listing details and routes rather than relying on a neighborhood label alone.",
      },
      {
        question: "How do I compare Bangkok hotel listings?",
        answer: "Search the same dates, guest count, room type and cancellation conditions. Compare the checkout total after taxes and service charges, and confirm which meals and payment terms are included.",
      },
    ],
  },
  {
    id: "kuala-lumpur-hotels",
    city: "Kuala Lumpur",
    country: "Malaysia",
    description: "Compare Kuala Lumpur neighborhoods by sightseeing, shopping, transit and room needs. Check the individual property's address, current availability and complete booking terms before making a decision.",
    neighborhoods: [
      { name: "KLCC", description: "A central district around the Petronas Towers, with major city landmarks and shopping nearby. Compare the property's actual walking route and room configuration with your plans.", vibe: "Landmarks, shopping, central" },
      { name: "Bukit Bintang", description: "A busy shopping and dining district. Check the exact street, transit access and expected evening activity at the property.", vibe: "Shopping, dining, lively" },
      { name: "Chinatown / Petaling Street", description: "A historic visitor area with markets and cultural sites. Review room conditions, noise and transport routes for the exact stay you are considering.", vibe: "Historic, markets, visitor-focused" },
    ],
    quickAnswer: "For Kuala Lumpur, compare KLCC, Bukit Bintang and Chinatown by your itinerary, transit, dining and room needs. Rates vary with dates, occupancy and inclusions; compare current full totals and cancellation terms rather than relying on a static nightly figure.",
    keyFacts: [
      { label: "Landmarks and central access", value: "KLCC" },
      { label: "Shopping and dining", value: "Bukit Bintang" },
      { label: "Before booking", value: "Check room configuration and total" },
    ],
    faqs: [
      {
        question: "Which Kuala Lumpur area should I compare for a family stay?",
        answer: "Compare KLCC, Bukit Bintang and Chinatown against your planned activities, transport and room requirements. Confirm the exact bed setup, occupancy limits, included facilities and route to transit for each property.",
      },
      {
        question: "What should I compare when checking Kuala Lumpur hotel prices?",
        answer: "Use identical dates, guest counts and room types, then compare the full checkout amount, taxes, service charges, meals, payment timing and cancellation deadline. Verify any local tax or fee in the current booking breakdown.",
      },
    ],
  },
  {
    id: "dubai-hotels",
    city: "Dubai",
    country: "UAE",
    description: "Compare Dubai areas by the places you plan to visit, preferred setting and transport needs. Hotel totals and local charges depend on the property and dates; inspect the current price breakdown and booking conditions.",
    neighborhoods: [
      { name: "Deira / Al Rigga", description: "An older commercial district with traditional markets and city services. Check the property's route to the places on your itinerary and the transport available at your travel times.", vibe: "Markets, urban, practical base" },
      { name: "Downtown / Business Bay", description: "A central area near major landmarks and retail destinations. Compare location, expected travel routes and the total room terms with other areas.", vibe: "Landmarks, retail, central" },
      { name: "Dubai Marina / JBR", description: "A waterfront district with leisure and dining options. Confirm the exact distance to planned activities and whether the setting fits your trip.", vibe: "Waterfront, leisure, dining" },
    ],
    quickAnswer: "For Dubai, compare Deira, Downtown / Business Bay and Dubai Marina / JBR against your itinerary, setting and transport preferences. Check live availability and the complete price breakdown, including any local charges and cancellation terms, before booking.",
    keyFacts: [
      { label: "Traditional markets and city services", value: "Deira / Al Rigga" },
      { label: "Landmarks and retail", value: "Downtown / Business Bay" },
      { label: "Before booking", value: "Review local charges and payment terms" },
    ],
    faqs: [
      {
        question: "How do I choose between Deira, Downtown and Dubai Marina?",
        answer: "Compare each property's exact location with your itinerary, transit plan and preferred setting. Review recent listing information and route options; no single area is the best fit for every trip.",
      },
      {
        question: "Are local charges included in Dubai hotel prices?",
        answer: "The displayed breakdown depends on the property and booking channel. Check the current checkout total and itemized charges, and confirm whether anything is payable at the property before booking.",
      },
    ],
  },
  {
    id: "singapore-hotels",
    city: "Singapore",
    country: "Singapore",
    description: "Compare Singapore neighborhoods by transit access, planned activities, dining preferences and room needs. Rates and availability change by travel dates and property terms, so check a current listing before booking.",
    neighborhoods: [
      { name: "Little India / Serangoon Road", description: "A lively district with shops, dining and transit options. Check the exact station route, room size and surrounding activity for the property.", vibe: "Dining, shopping, transit options" },
      { name: "Bugis / Kampong Glam", description: "A central area with cultural sites, shops and dining. Compare the property's location and evening atmosphere with your itinerary.", vibe: "Cultural sites, dining, central" },
      { name: "Marina Bay / Civic District", description: "A waterfront and civic area near major city attractions. Check whether the location and room terms suit your trip priorities.", vibe: "Landmarks, waterfront, city access" },
    ],
    quickAnswer: "In Singapore, compare Little India / Serangoon Road, Bugis / Kampong Glam and Marina Bay / Civic District by transit, activities and room needs. Check current room availability, total price and cancellation conditions for your exact dates.",
    keyFacts: [
      { label: "Dining and shopping options", value: "Little India / Serangoon Road" },
      { label: "Cultural sites and central access", value: "Bugis / Kampong Glam" },
      { label: "Before booking", value: "Confirm room dimensions and transit route" },
    ],
    faqs: [
      {
        question: "Which Singapore neighborhoods should I compare?",
        answer: "Compare Little India / Serangoon Road, Bugis / Kampong Glam and Marina Bay / Civic District against your activities, transit and dining preferences. Confirm the exact hotel location and room details on the current listing.",
      },
      {
        question: "What should I check before booking a Singapore hotel?",
        answer: "Compare the same dates, guest count and room type, including the final checkout total, taxes and fees, payment timing, room dimensions and cancellation terms.",
      },
    ],
  },
  {
    id: "maldives-hotels",
    city: "Malé & Maafushi",
    country: "Maldives",
    description: "Compare accommodation on inhabited islands with private-island resorts by the type of stay, transfer arrangements, meal plan and activities you want. Confirm current availability and the full trip cost directly in the booking terms.",
    neighborhoods: [
      { name: "Maafushi Island", description: "An inhabited-island option with guesthouses and local services. Confirm transfer schedules, pickup details and any island-specific rules with the property before travel.", vibe: "Local-island stay, activities" },
      { name: "Hulhumalé", description: "An inhabited island near the international airport. Check the property's exact location, arrival transfer and suitability for your flight times.", vibe: "Airport-area base, local services" },
      { name: "Private resort islands", description: "Resort stays on separate islands may require a transfer arranged by the resort. Confirm transfer type, schedule, price and meal inclusions before paying.", vibe: "Resort stay, transfer planning" },
    ],
    quickAnswer: "For the Maldives, compare inhabited-island stays with private-island resorts by room terms, meals, activities and required transfers. Confirm transfer arrangements and all mandatory charges with the property; the room rate alone may not represent the full trip cost.",
    keyFacts: [
      { label: "Inhabited-island options", value: "Maafushi and Hulhumalé" },
      { label: "Resort-island planning", value: "Confirm required transfer with the property" },
      { label: "Before booking", value: "Compare room, meal and transfer inclusions" },
    ],
    faqs: [
      {
        question: "How should I compare local-island stays and private resorts in the Maldives?",
        answer: "Compare the room, meals, activities, transfer arrangements and cancellation terms together. Confirm how you will reach the property and whether transfers or other mandatory charges are included in the current checkout total.",
      },
      {
        question: "What should I confirm about a Maldives hotel transfer?",
        answer: "Ask the property for the current transfer type, schedule, pickup point, price and passenger requirements, and check how it aligns with your flight. Do not assume a transfer is included in the room rate.",
      },
    ],
  },
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
    costBdt: "Government Tourist e-Visa fee: confirm the current amount in the official portal/Embassy schedule. Bank or payment-provider charges are separate. Optional agency service fees are separate and vary by provider; request an itemized quote before paying.",
    processingTime: "Varies by application; check the live portal and Embassy notices. No decision time is guaranteed.",
    documentChecklist: [
      {
        category: "Core Documents (Uploaded Online via thaievisa.go.th)",
        items: [
          "Passport valid for at least 6 months with 2 blank pages (clear colour scan)",
          "Digital photo, 35mm x 45mm, white background, taken within the last 6 months",
          "Confirmed return flight ticket (Dhaka - Bangkok - Dhaka)",
          "Hotel booking confirmation for the full stay",
          "Financial evidence requested by the current Dhaka mission checklist in the e-Visa portal. The general Thai Tourist Visa page lists at least THB 20,000 (for example, recent bank statements or sponsorship); the Dhaka Embassy TR checklist updated November 30, 2022 lists BDT 60,000 per person or BDT 120,000 per family, six-month statements, and a solvency certificate. Confirm which current requirement applies before applying.",
          "Any bank solvency, sponsor, family-relationship, or additional evidence requested by the current portal checklist"
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
      "Upload clear digital scans of the passport bio-page, a recent photo, return flight ticket, accommodation evidence, the financial documents requested by the current Dhaka mission checklist, and the relevant occupational documents for your category.",
      "Follow the payment instructions and amount shown for your Dhaka application in the official e-Visa portal and the Embassy's current fee notice. Keep the government visa fee separate from any bank/payment processing charge; optional agency assistance is a third, provider-set cost. Confirm each amount and any agency quote before paying.",
"Track your application status by email or on the portal. Decision times vary by application and are not guaranteed; monitor messages and follow any additional-document request. Once approved, download the notice and follow live Dhaka mission instructions for presenting it at check-in and to Thai immigration."
    ],
    quickAnswer: "Bangladeshi passport holders should obtain an advance Tourist e-Visa through Thailand's official portal (thaievisa.go.th). The Dhaka Embassy's public TR checklist, last updated November 30, 2022, lists six-month bank statements and BDT 60,000 per person or BDT 120,000 per family; current portal prompts may differ, so confirm the applicable Dhaka requirement. The government visa fee, bank/payment charges, and optional agency fee are separate—check the live amount and an itemized provider quote before paying. Approval and processing time are not guaranteed.",
    keyFacts: [
      { label: "Visa Route", value: "Official e-Visa Portal (thaievisa.go.th)" },
      { label: "Visa on Arrival Eligible?", value: "No - advance visa required" },
      { label: "Visa Validity / Stay", value: "60 days (Tourist Visa - TR)" },
      { label: "Processing Time", value: "Varies by application; no decision time is guaranteed" }
    ],
    faqs: [
      {
        question: "Can Bangladeshi passport holders get a visa on arrival in Thailand?",
        answer: "No. Bangladeshi citizens must obtain an advance Tourist e-Visa through Thailand's official portal (thaievisa.go.th). Follow the current Dhaka mission checklist and any additional instructions shown in your application."
      },
      {
        question: "Is the Thailand e-Visa for Bangladeshi citizens new?",
        answer: "Yes. The Royal Thai Embassy in Dhaka introduced e-Visa access for Bangladeshi applicants starting January 2025, allowing most applicants to apply fully online via thaievisa.go.th instead of submitting a physical passport at a visa centre."
      },
      {
        question: "How much bank balance do I need for a Thailand visa from Bangladesh?",
        answer: "Requirements can differ between the general e-Visa page and the Dhaka mission checklist. The Embassy Dhaka TR checklist, last updated November 30, 2022, lists BDT 60,000 per person or BDT 120,000 per family with six-month bank statements and a solvency certificate; the general Thai Tourist Visa page lists THB 20,000 financial evidence. Confirm the current Dhaka-specific prompt in the live portal before applying; the dated checklist may have changed."
      },
      {
        question: "How long can I stay in Thailand on a Tourist Visa (TR)?",
        answer: "The standard Tourist Visa allows a stay of up to 60 days from your date of entry. It can usually be extended once for an additional 30 days at a local Thai immigration office, subject to current immigration rules."
      },
      {
        question: "Do I need to submit my passport in person for a Thailand visa from Bangladesh?",
        answer: "The current application is submitted through thaievisa.go.th. Follow the live portal if the Dhaka mission requests additional documents or any in-person action; older offline instructions may not apply."
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
      "description": "Bangladeshi passport holders should apply in advance through Thailand's official e-Visa portal (thaievisa.go.th); approval and processing time are not guaranteed. The Tourist Visa (TR) permits a stay according to the approved e-Visa. Government visa fees, bank/payment processing charges, and optional agency service fees are separate; confirm current amounts in the live portal, Embassy schedule, and any provider quote.",
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
          "text": "Upload clear digital scans of the passport bio-page, a recent photo, return flight ticket, accommodation evidence, the financial documents requested by the current Dhaka mission checklist, and the relevant occupational documents for your category."
        },
        {
          "@type": "HowToStep",
          "text": "Follow the payment instructions and amount shown for your Dhaka application in the official e-Visa portal and the Embassy's current fee notice. Keep the government visa fee separate from any bank/payment processing charge; optional agency assistance is a third, provider-set cost. Confirm each amount and any agency quote before paying."
        },
        {
          "@type": "HowToStep",
          "text": "Track your application status by email or on the portal. Decision times vary by application and are not guaranteed; monitor messages and follow any additional-document request. Once approved, download the notice and follow live Dhaka mission instructions for presenting it at check-in and to Thai immigration."
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
      "Once approved, follow the current ICA and authorized-channel instructions for your visa document. Submit the free SG Arrival Card (SGAC) within three days, including the day of arrival, before entering Singapore."
    ],
    quickAnswer: "Bangladeshi passport holders require a pre-arranged e-Visa to enter Singapore. You cannot apply directly at the Singapore Consulate in Dhaka; all applications must be submitted through an embassy-approved Authorized Visa Agent. The visa costs approximately BDT 4,200 to BDT 6,500 (SGD 30 government fee plus agency charge) and takes 5 to 7 working days. A Letter of Introduction (LOI Form V39A) from a Singapore local contact or sponsor is standardly required, along with a 6-month bank statement showing at least BDT 1,50,000 balance.",
    keyFacts: [
      { label: "Submission Channel", value: "Authorized Visa Agents in Dhaka" },
      { label: "Total Visa Cost", value: "BDT 4,200 - 6,500" },
      { label: "Processing Window", value: "5 to 7 Working Days" },
      { label: "Arrival Declaration", value: "Free SG Arrival Card within 3 days before arrival" }
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
        { "@type": "HowToStep", "text": "Follow ICA's current visa instructions and submit the free SG Arrival Card within three days, including the day of arrival, before entering Singapore." }
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
    costBdt: "No advance tourist visa application; confirm current fee and permitted stay with Maldives Immigration",
    processingTime: "Tourist visa is assessed on arrival after immigration admissibility checks",
    documentChecklist: [
      {
        category: "Official tourist-entry checklist (verify before departure)",
        items: [
          "Passport or travel document with a Machine-Readable Zone (MRZ) and at least one month of validity under current Maldives Immigration guidance; check whether an airline, transit country, or onward destination requires more",
          "Confirmed return or onward journey ticket",
          "Prepaid, confirmed booking at a registered facility in the Maldives",
          "Sufficient funds to cover the stay, or sponsorship approved by Maldives Immigration",
          "Free IMUGA Traveller Declaration submitted within 96 hours before arrival; each traveler, including children, submits a separate declaration",
          "Meet the entry requirements of the next destination and carry a valid Yellow Fever certificate if the official rule applies to your itinerary"
        ]
      }
    ],
    stepByStep: [
      "Book a confirmed return or onward ticket and a prepaid stay at a registered Maldivian facility. Prepare evidence of sufficient funds for the trip or an approved sponsorship.",
      "Check that your passport or travel document has an MRZ and meets Maldives Immigration's current validity rule. Review any stricter requirements imposed by your airline, transit country, or onward destination.",
      "Within 96 hours before arrival in the Maldives, submit the free Traveller Declaration through the official IMUGA portal. Each traveler, including a child, needs an individual submission; save the confirmation for the journey.",
      "Keep your passport, return or onward ticket, registered accommodation booking, funds or sponsorship evidence, and IMUGA confirmation accessible for airline check-in and arrival checks. Confirm any separate departure-document requirements with your airline and relevant authorities.",
      "On arrival, present the requested documents to Maldives Immigration. A tourist visa is granted on arrival without pre-approval, but entry remains subject to the officer's admissibility decision and the current official requirements."
    ],
    quickAnswer: "Tourists do not need pre-approval for a Maldives tourist visa; the visa is granted on arrival after immigration checks. Current Maldives Immigration guidance calls for an MRZ passport or travel document with at least one month's validity, a confirmed return or onward ticket, prepaid accommodation at a registered facility, and sufficient funds or approved sponsorship. Submit the free IMUGA Traveller Declaration within 96 hours before arrival. Check current fee and permitted-stay details, plus any stricter airline, transit, or onward-destination rules, before departure.",
    keyFacts: [
      { label: "Tourist Visa", value: "Granted on arrival; no pre-approval" },
      { label: "Passport Rule", value: "MRZ document; at least 1 month validity" },
      { label: "Entry Planning", value: "Return/onward ticket + registered prepaid stay" },
      { label: "Traveller Declaration", value: "Free IMUGA submission within 96h before arrival" }
    ],
    faqs: [
      {
        question: "What documents does Maldives Immigration list for tourist entry?",
        answer: "Maldives Immigration lists an MRZ passport or travel document with at least one month's validity, a confirmed return journey ticket, a prepaid booking at a registered facility, sufficient funds or approved sponsorship, and the Traveller Declaration submitted within 96 hours before arrival. Check the official page for current requirements and any additional airline or onward-destination rules."
      },
      {
        question: "Is the Maldives IMUGA Traveller Declaration free?",
        answer: "Yes. Maldives Immigration says the Traveller Declaration is free and should be submitted directly through the official IMUGA portal within 96 hours before arrival. Each traveler, including children, needs a separate declaration."
      }
    ],
    schemaMarkup: {
      type: "GovernmentService + FAQPage",
      description: "Maldives tourist visa on arrival and IMUGA guide for Bangladeshi citizens",
      code: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentService",
      "name": "Maldives Tourist Visa on Arrival for Bangladeshi Citizens",
      "serviceType": "Visa on Arrival",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "Maldives Immigration"
      },
      "areaServed": "Bangladesh"
    },
    {
      "@type": "HowTo",
      "name": "How to prepare for Maldives tourist visa on arrival",
      "step": [
        { "@type": "HowToStep", "text": "Prepare a confirmed return or onward ticket, prepaid accommodation at a registered facility, and sufficient funds or sponsorship approved by Maldives Immigration." },
        { "@type": "HowToStep", "text": "Check the current passport validity rule and submit an individual, free IMUGA Traveller Declaration within 96 hours before arrival." },
        { "@type": "HowToStep", "text": "Carry the itinerary, booking, funds or sponsorship evidence, passport, and IMUGA confirmation for immigration assessment on arrival." }
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
    title: "Nepal Destination Guide from Bangladesh: Kathmandu & Pokhara",
    description: "A flexible Nepal planning guide for travelers considering Kathmandu, nearby heritage areas and Pokhara. Use the outline to shape a trip, then check current access, transport and entry details for your dates.",
    bestTimeToVisit: "Choose dates around your interests, preferred weather and daylight. Before booking, check current local conditions, attraction calendars and cross-city transport information for the dates you plan to travel.",
    itinerary: [
      { day: 1, title: "Arrive in Kathmandu", activities: ["Keep the first day flexible around arrival time, accommodation and rest.", "Choose a nearby walk or meal, and confirm the current route from the airport with your transport provider."] },
      { day: 2, title: "Kathmandu Valley cultural sites", activities: ["Choose from Boudhanath, Swayambhunath or Pashupatinath based on opening information, access and your interests.", "Check visitor rules and local conditions at religious sites, and leave time for travel between stops."] },
      { day: 3, title: "Patan or Bhaktapur", activities: ["Focus on Patan or Bhaktapur for the day; add a second heritage area only if current travel times and opening hours allow.", "Check local entry conditions and transport before setting a fixed schedule."] },
      { day: 4, title: "Travel to Pokhara", activities: ["Compare currently available road and air connections, including departure points, luggage terms and door-to-door time.", "Keep plans after arrival light and confirm local transport to your accommodation."] },
      { day: 5, title: "Pokhara at a flexible pace", activities: ["Choose a lakeside walk, viewpoint or other activity based on weather and current access information.", "If visiting a viewpoint or natural site, confirm local transport and conditions before departure."] },
      { day: 6, title: "Return or departure connection", activities: ["Check the current return connection and leave a buffer for weather, road conditions or schedule changes.", "If connecting onward from Kathmandu, consider an overnight buffer rather than relying on a same-day transfer without confirmation."] }
    ],
    localTransport: ["For Kathmandu–Pokhara travel, compare current road and air services by schedule, departure location, baggage conditions and total door-to-door time.", "Within cities, check current public transport, taxi and ride-hailing availability with the relevant operator; service coverage can change.", "Confirm intercity tickets, transfer details and cancellation terms directly with the provider before travel.", "Allow time for traffic, walking and service changes, and recheck important journeys on the day."],
    budgetBdt: "No whole-trip total is quoted. Airfare, accommodation, intercity travel, local transport, meals and attraction costs vary by date and travel style; compare current prices and terms before booking.",
    quickAnswer: "This six-day outline connects Kathmandu, a nearby heritage area and Pokhara at a flexible pace. Compare current transport options and allow time for changing road, weather and attraction conditions. Check Nepal's current entry requirements for your circumstances; this page is not a live price quote or visa decision.",
    keyFacts: [
      { label: "Route focus", value: "Kathmandu, one nearby heritage area and Pokhara" },
      { label: "Sample duration", value: "Six flexible days, including intercity transfers" },
      { label: "Costs", value: "No trip total is quoted; check current prices for your dates" },
      { label: "Entry requirements", value: "Check current official Nepal guidance for your circumstances" }
    ],
    faqs: [
      { question: "How many days should I plan for Nepal?", answer: "This outline uses six days across Kathmandu, a nearby heritage area and Pokhara. If your stay is shorter, focus on one region rather than trying to fit every stop into the itinerary." },
      { question: "How should I travel between Kathmandu and Pokhara?", answer: "Compare current road and air connections for your dates. Check the departure location, schedule, baggage terms, cancellation conditions and total door-to-door time." },
      { question: "When should I visit Nepal?", answer: "Choose dates based on your priorities and check current weather, daylight, local conditions and attraction opening information before booking. Conditions can vary by region and change over time." },
      { question: "Does this guide confirm visa eligibility for Bangladeshi travelers?", answer: "No. Entry requirements depend on the traveler and current policy. Check the official Nepal immigration or relevant government guidance before booking." }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Nepal destination planning guide",
      code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Nepal"}`
    }
  },
  {
    id: "thailand-guide",
    country: "Thailand",
    title: "Bangkok Destination Guide from Bangladesh: Four-Day Plan",
    description: "A practical starting point for a first Bangkok visit, with a flexible four-day outline for riverside landmarks, city neighborhoods and an optional market or day trip. Check current opening, transport and entry details for your dates.",
    bestTimeToVisit: "Choose dates around your interests, preferred weather and local events. Check current weather, attraction calendars and transport information for your dates before booking; conditions and operating schedules can vary.",
    itinerary: [
      { day: 1, title: "Arrive and settle in", activities: ["Keep the first day light and plan around your arrival time, accommodation and rest.", "Check the current airport-to-hotel options and choose a nearby meal or walk if time allows."] },
      { day: 2, title: "Riverside and temple area", activities: ["Choose riverside sights such as Wat Arun or Wat Pho after checking current opening, ticket and visitor information.", "Check local dress and visitor guidance at religious sites, and leave time for river crossings and other transfers."] },
      { day: 3, title: "Explore a city neighborhood", activities: ["Pick a market, museum or shopping area that matches your interests and check its operating days and hours.", "Use current transit maps to group nearby stops instead of trying to cross the city repeatedly."] },
      { day: 4, title: "Flexible market or day-trip option", activities: ["Choose one market visit or day trip based on current schedules, travel time and your pace.", "If considering destinations outside central Bangkok, confirm the operator, departure point, return arrangements and cancellation terms before booking."] }
    ],
    localTransport: ["Use current BTS Skytrain and MRT information to check routes, operating hours, fares and payment options for your journey.", "River boats and ferries can be useful on routes they serve; check the operator's current stops and schedule before setting plans.", "Check taxi and ride-hailing availability, pickup rules and fare terms directly with the provider; coverage and conditions can change.", "Allow extra time for road traffic, transfers and walking, especially when connecting to a fixed booking."],
    budgetBdt: "No whole-trip total is quoted. Lodging, meals, local transport, attraction tickets and any day trip vary by date and travel style; compare current prices and terms before booking. International airfare is separate. Visa-related charges are not itemized; verify the current government e-Visa fee, bank/payment charges, and optional agency service fees separately.",
    quickAnswer: "This flexible four-day outline focuses on Bangkok, with one optional market or day trip. Group nearby sights, check current opening and transport information, and leave room for traffic or schedule changes. Verify entry requirements for your circumstances through official sources; this page is not a visa decision or live price quote. Visa-related charges are not itemized; verify the current government e-Visa fee, bank/payment charges, and optional agency service fees separately.",
    keyFacts: [
      { label: "Sample duration", value: "Four flexible days" },
      { label: "Route focus", value: "Bangkok, with one optional market or day trip" },
      { label: "Costs", value: "No trip total is quoted; check current prices for your dates" },
      { label: "Planning checks", value: "Confirm opening days, transit schedules and entry guidance" }
    ],
    faqs: [
      { question: "Are four days enough for Bangkok?", answer: "Four days can provide a flexible first outline for central sights and neighborhoods, with room for one market or day trip. If you add a longer excursion, reduce the number of city stops rather than packing the schedule." },
      { question: "What is a practical way to get around Bangkok?", answer: "Compare current BTS, MRT, river-boat, taxi and ride-hailing options for each journey. Check operating hours, stops, fares and pickup details directly with the relevant operator, and allow extra time for road traffic." },
      { question: "Should I include a day trip from Bangkok?", answer: "It depends on your interests and available time. Choose one excursion, then check current travel time, departure arrangements, operating schedules and return options before booking." },
      { question: "When should I visit Bangkok?", answer: "Choose dates based on your priorities, then check current weather, local events and attraction schedules. Conditions and opening information can change, so verify them close to travel." },
      { question: "Does this guide confirm entry or visa eligibility for Bangladeshi travelers?", answer: "No. Entry requirements depend on the traveler, purpose and current policy. Check the official Thai government visa or immigration guidance and relevant embassy information before booking." }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Bangkok destination planning guide",
      code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Bangkok"}`
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
      { label: "Top Family Daytrip", value: "Genting Highlands (45 mins away)" },
      {
        label: "Visa for Bangladeshis",
        value: "eVisa required - applied for fully online, with no embassy appointment"
      }
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
      },
      {
        question: "Do Bangladeshi citizens need a visa for Malaysia, and how is it applied for?",
        answer: "Yes, an eVisa is required. The application goes entirely online to the Immigration Department of Malaysia - there is no embassy appointment and no physical passport drop-off. You upload high-resolution bio-data page scans, professional passport photos, and a six-month bank statement showing a balance of BDT 80,000 or more. Total cost comes to roughly BDT 3,800 to 4,200, and approval typically arrives in 2 to 4 working days."
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
    title: "Dubai Destination Guide from Bangladesh: A Flexible Four-Day Plan",
    description: "A flexible starting point for Dubai, with ideas for Downtown, the Creek, a waterfront area and an optional desert excursion. Check current attraction access, transport, tour terms and entry requirements for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, outdoor plans and local events. Check current weather conditions, attraction calendars and operator schedules before booking; outdoor conditions can affect plans.",
    itinerary: [
      { day: 1, title: "Arrive and settle into your chosen area", activities: ["Keep the first day light around arrival time and accommodation location.", "Check current airport-to-hotel transport options and choose a nearby meal or walk if time permits."] },
      { day: 2, title: "Downtown sights", activities: ["Choose the Downtown attractions that fit your interests, checking official access, ticket and opening information for your date.", "Leave time for walking, security procedures and transfers between venues."] },
      { day: 3, title: "Dubai Creek and historic neighborhoods", activities: ["Explore a section of the Creek or a historic neighborhood after checking current visitor access and operating hours.", "If using a boat crossing or local market, confirm service and payment details with the operator on the day."] },
      { day: 4, title: "Waterfront or optional desert excursion", activities: ["Choose a waterfront walk or one desert excursion based on weather, current availability and your pace.", "For a tour, verify the operator, pickup location, included items, safety requirements, cancellation terms and return time before booking."] }
    ],
    localTransport: ["Check current RTA information for Metro, Tram and bus routes, service notices, fare rules and Nol-card use.", "For taxi and ride-hailing journeys, confirm pickup, fare and payment terms with the provider; coverage and conditions can change.", "Compare airport transfer options by pickup point, luggage arrangements, cancellation terms and total journey time.", "Allow extra time for road traffic, walking and transfers, especially when connecting to a timed attraction or tour pickup."],
    budgetBdt: "No whole-trip total is quoted. Airfare, accommodation, local transport, attraction tickets, meals and any tour vary by date and travel style; compare current prices and terms before booking. Entry-related charges should be checked separately through official or authorized channels.",
    quickAnswer: "This flexible four-day outline combines a Downtown visit, a Creek-area walk and one optional waterfront or desert activity. Check current access, transport and tour terms, and leave room for traffic and schedule changes. Verify entry requirements for your circumstances through official sources; this page is not a visa decision or live price quote.",
    keyFacts: [
      { label: "Sample duration", value: "Four flexible days" },
      { label: "Route focus", value: "Downtown, the Creek area and one optional excursion" },
      { label: "Costs", value: "No trip total is quoted; check current prices for your dates" },
      { label: "Planning checks", value: "Confirm attraction access, transport, tour terms and entry guidance" }
    ],
    faqs: [
      { question: "Are four days enough for Dubai?", answer: "Four days can provide a flexible first outline for a Downtown visit, a Creek-area walk and one optional excursion. If you add a longer tour, reduce the number of other stops rather than packing the schedule." },
      { question: "What is a practical way to get around Dubai?", answer: "Compare current Metro, Tram, bus, taxi and ride-hailing options for each journey. Check route coverage, service hours, fare rules and payment options with the relevant operator, and allow time for traffic." },
      { question: "Should I book a desert tour in advance?", answer: "Check current availability, pickup arrangements, inclusions, safety requirements and cancellation terms with the operator. Consider weather and your own mobility or health needs before choosing an activity." },
      { question: "When should I visit Dubai?", answer: "Choose dates based on your priorities and check current weather, outdoor conditions, event calendars and attraction schedules. Conditions and opening information can change, so verify them close to travel." },
      { question: "Does this guide confirm UAE visa eligibility for Bangladeshi travelers?", answer: "No. Entry requirements depend on the traveler, purpose and current policy. Check official UAE immigration guidance or an authorized channel before booking." }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Dubai destination planning guide",
      code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Dubai"}`
    }
  },
  {
    id: "singapore-guide",
    country: "Singapore",
    title: "Singapore Destination Guide from Bangladesh: A Flexible Four-Day Plan",
    description: "A flexible first-visit outline for Singapore, with ideas for Marina Bay, Gardens by the Bay, heritage neighborhoods and Sentosa. Check current opening, access, transport and entry details for your dates.",
    bestTimeToVisit: "Choose dates around your interests, preferred weather and local events. Check current weather, attraction calendars and public-holiday schedules before booking; opening times and event schedules can change.",
    itinerary: [
      { day: 1, title: "Arrive and explore at an easy pace", activities: ["Plan around your arrival time and allow time to reach your accommodation.", "If visiting Jewel Changi or another airport attraction, check current access and operating information before building it into the day."] },
      { day: 2, title: "Marina Bay and Gardens by the Bay", activities: ["Choose the Marina Bay sights and Gardens by the Bay areas that interest you, checking current opening hours, access and ticket conditions.", "If you want to see a light or sound show, check the organizer's current schedule for your date and arrive with a flexible plan."] },
      { day: 3, title: "Explore a heritage neighborhood", activities: ["Choose Little India, Kampong Glam, Chinatown or another area based on your interests; check opening days for specific museums, shops and places of worship.", "For dietary needs, confirm ingredients and any certification directly with the venue rather than relying on a neighborhood-wide assumption."] },
      { day: 4, title: "Sentosa or a second city day", activities: ["Choose Sentosa or another city area based on your interests, current attraction access and the time available.", "Check transport and ticket arrangements in advance, and leave a suitable buffer for your onward flight or other departure plans."] }
    ],
    localTransport: ["Use the current MRT and public-bus network information to plan routes, operating hours, fares and transfers.", "Before relying on a contactless bank card, check which cards are accepted, any foreign-card fees and the current fare-payment rules; consider an alternative payment method.", "Compare taxi and ride-hailing options for journeys where public transit is less convenient, and confirm pickup and fare terms with the provider.", "Allow time for walking, station transfers and queues, especially when connecting to a timed attraction or airport departure."],
    budgetBdt: "No whole-trip total is quoted. Accommodation, meals, local transport, attraction tickets and optional activities vary by date and travel style; compare current prices and terms before booking. International airfare and entry-related charges should be checked separately.",
    quickAnswer: "This flexible four-day outline combines Singapore's waterfront, a heritage neighborhood and an optional Sentosa visit. Check current attraction access, transit and event schedules, and leave room for transfers and queues. Verify entry requirements for your circumstances through official sources; this page is not a visa decision or live price quote.",
    keyFacts: [
      { label: "Sample duration", value: "Four flexible days" },
      { label: "Route focus", value: "Marina Bay, a heritage neighborhood and optional Sentosa" },
      { label: "Costs", value: "No trip total is quoted; check current prices for your dates" },
      { label: "Planning checks", value: "Confirm attraction access, transit payment rules and entry guidance" }
    ],
    faqs: [
      { question: "Are four days enough for Singapore?", answer: "Four days can work as a flexible first outline for central sights, one heritage neighborhood and an optional Sentosa visit. If you add more paid attractions or longer visits, reduce the number of stops rather than overloading each day." },
      { question: "What is a practical way to get around Singapore?", answer: "Plan with current MRT and public-bus information, and compare taxi or ride-hailing for journeys where they fit better. Check current fare-payment rules and foreign-card fees before relying on a bank card for transit." },
      { question: "Should I include Sentosa in a short Singapore trip?", answer: "It depends on your interests and the attractions you want to visit. Check current access, opening times, tickets and travel arrangements, then allow enough time for the return journey." },
      { question: "Does this guide confirm Singapore visa eligibility for Bangladeshi travelers?", answer: "No. Entry requirements depend on the traveler, purpose and current policy. Check the Singapore government's official immigration guidance and relevant Bangladesh mission information before booking." }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Singapore destination planning guide",
      code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Singapore"}`
    }
  },
  {
    id: "maldives-guide",
    country: "Maldives",
    title: "Maldives Destination Guide from Bangladesh: Islands & Flexible Planning",
    description: "Plan a Maldives stay around one island base, with room to compare local-island and resort options, transfers and marine activities. Check current access, transfer schedules, local rules and entry details for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, sea conditions and activities. Check current marine conditions, local weather and transfer schedules before booking; conditions can vary by atoll and change quickly.",
    itinerary: [
      { day: 1, title: "Arrive and confirm your onward transfer", activities: ["Plan around your international arrival and keep the first day flexible.", "Confirm where your onward transfer departs, how to check in and what happens if your flight is delayed."] },
      { day: 2, title: "Travel to one island base", activities: ["Choose an inhabited island or resort base after comparing accommodation, access, local rules and available activities.", "Check the current boat or domestic-flight schedule and keep plans light after arrival."] },
      { day: 3, title: "Explore at an island pace", activities: ["Choose a beach, local walk or activity offered by your accommodation or a current local operator.", "Check local visitor guidance and respect any access, clothing or environmental rules that apply at the location."] },
      { day: 4, title: "Optional marine activity or relaxed day", activities: ["If conditions and your interests allow, compare snorkeling or other marine excursions with a local operator.", "Ask about safety equipment, weather cancellation, wildlife practices, inclusions and return arrangements before booking."] },
      { day: 5, title: "Return and departure buffer", activities: ["Confirm the return transfer against your international flight and leave a practical buffer for weather or schedule changes.", "Consider staying near the departure airport the night before an early flight if the transfer plan is uncertain."] }
    ],
    localTransport: ["Inter-island travel may involve scheduled ferries, speedboats or domestic flights; confirm the current operator, departure point, baggage terms and schedule.", "Ask your accommodation or transfer provider how delays, missed connections, weather changes and cancellations are handled.", "Check whether your island base is reachable on your arrival and departure days; do not assume transfers run at every flight time.", "Compare the full transfer route and terms before paying, including any required local connections or overnight stays."],
    budgetBdt: "No whole-trip total is quoted. Accommodation, transfers, meals, activities and any applicable local charges vary by island, date and travel style; compare current prices and what is included before booking. International airfare and entry requirements should be checked separately.",
    quickAnswer: "This five-day outline centers on one island base, with an optional marine activity and a return-transfer buffer. Compare local-island and resort stays, confirm transfers for your dates and check current weather and operator terms. Verify entry requirements for your circumstances through official sources; this page is not a visa decision or live price quote.",
    keyFacts: [
      { label: "Sample duration", value: "Five flexible days, including transfer buffers" },
      { label: "Route focus", value: "One island base with optional marine activities" },
      { label: "Stay style", value: "Compare inhabited-island and resort options" },
      { label: "Costs", value: "No trip total is quoted; check current prices and inclusions" }
    ],
    faqs: [
      { question: "How many days should I plan for the Maldives?", answer: "This outline uses five flexible days around one island base. If your stay is shorter, avoid adding multiple island transfers unless the current schedules and connection buffers fit your dates." },
      { question: "How do I choose between a local island and a resort?", answer: "Compare accommodation, meals, activities, transfer arrangements, local visitor rules and the total current price for your dates. Check directly with the property about what is included and any restrictions." },
      { question: "How should I arrange island transfers?", answer: "Confirm the operator, departure point, schedule, baggage terms and missed-connection policy directly with your accommodation or transfer provider. Leave a buffer for weather and schedule changes." },
      { question: "Does this guide confirm entry or visa eligibility for Bangladeshi travelers?", answer: "No. Entry requirements depend on the traveler and current policy. Check the Maldives Immigration guidance and any required pre-arrival steps for your circumstances before booking." }
    ],
    schemaMarkup: {
      type: "DestinationGuide",
      description: "Maldives island destination planning guide",
      code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Maldives"}`
    }
  },
  {
    id: "london-guide",
    country: "London, United Kingdom",
    title: "London Destination Guide from Bangladesh: Landmarks & Planning",
    description: "Plan a London visit around its landmarks, river experiences and neighborhoods. This guide organizes existing URAL attraction-planning material; schedules, access and prices should be checked for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, daylight and event calendar; check local conditions and attraction opening information before booking.",
    itinerary: [
      { day: 1, title: "Westminster and the Thames", activities: ["Plan a walk around Westminster and the river using current access information.", "Choose a river or city-view activity and confirm its schedule before travel."] },
      { day: 2, title: "Tower of London and central sights", activities: ["Set aside time for the Tower of London and nearby riverfront sights.", "Check official ticket, entry and opening details for your chosen date."] },
      { day: 3, title: "A flexible final day", activities: ["Choose a museum, viewpoint or neighborhood based on your interests and opening hours.", "Use current Transport for London service information to plan local journeys."] }
    ],
    localTransport: ["Use current Transport for London route, fare and service information.", "Allow time for walking, interchange and service changes; check the route on the day.", "Confirm airport-transfer options and terms with the relevant operator."],
    budgetBdt: "No trip total is quoted. Airfare, accommodation, local transport and attraction costs vary by date and traveler; check live prices before booking.",
    quickAnswer: "Plan a London visit around the landmarks and experiences that matter to you, then check current transport, opening hours and ticket terms for your travel dates. This page is a destination overview, not a live price quote or visa decision.",
    keyFacts: [
      { label: "Planning focus", value: "Landmarks, museums, river experiences and local transport" },
      { label: "Ticket prices", value: "Check the provider for your date" },
      { label: "Entry requirements", value: "Check current official UK guidance" }
    ],
    faqs: [
      { question: "How should I plan a first London visit?", answer: "Group nearby sights by area, check each attraction's current opening and ticket conditions, and leave time for local travel between stops." },
      { question: "Can I rely on an attraction price example?", answer: "Treat third-party price examples as indicative unless confirmed for your dates at checkout. The provider's current terms control." },
      { question: "Where should I check transport details?", answer: "Use current Transport for London information for routes, service updates and fares, and confirm airport-transfer terms with the operator." },
      { question: "Does this page confirm UK visa eligibility?", answer: "No. Visa and entry requirements depend on the traveler and can change. Check current official UK guidance before booking." }
    ],
    schemaMarkup: { type: "DestinationGuide", description: "London destination planning guide", code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"London"}` }
  },
  {
    id: "italy-guide",
    country: "Rome, Milan & Venice, Italy",
    title: "Italy Itinerary from Bangladesh: Rome, Milan & Venice",
    description: "A flexible multi-city outline for travelers considering Rome, Milan and Venice. Use it to compare the pace and sequence, then confirm current transport, attraction access and entry requirements for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, daylight and local events. Check opening calendars and current transport schedules before settling the route, especially around holidays and major events.",
    itinerary: [
      { day: 1, title: "Arrive and settle in Rome", activities: ["Keep the first day flexible around your arrival time and accommodation location.", "Choose a nearby walk or meal rather than relying on a tight, timed attraction booking."] },
      { day: 2, title: "Rome's historic center", activities: ["Plan a focused visit around the Colosseum and nearby archaeological sites; check official access, ticket and opening information for your date.", "Leave time for walking between areas and for security or entry procedures."] },
      { day: 3, title: "Transfer to Milan", activities: ["Compare current intercity rail and other available options, including station locations, luggage and total door-to-door time.", "After arrival, keep the afternoon light and check current visitor information for the Duomo area."] },
      { day: 4, title: "Milan at a flexible pace", activities: ["Choose a museum, neighborhood or landmark based on your interests and confirmed opening hours.", "Avoid stacking multiple timed-entry visits before checking distances and booking terms."] },
      { day: 5, title: "Transfer to Venice", activities: ["Check the current route and schedule to Venice and allow time for station access and onward local transport.", "Use the remaining time for an unhurried walk near your accommodation or the historic center."] },
      { day: 6, title: "Venice and departure planning", activities: ["Choose a short list of sights or an optional lagoon-area visit only after checking current services and opening times.", "Allow a practical buffer for your departure connection; confirm airport or station transfer details with the operator."] }
    ],
    localTransport: ["For intercity legs, compare current rail and other available services by door-to-door time, station location, luggage rules and fare conditions.", "In each city, check current public-transport routes, service notices and ticket rules with the local operator.", "Venice has different local travel patterns from road-based cities; verify the current route from your arrival point to your accommodation before booking.", "Build in time for walking, transfers and service changes; recheck the journey on the day."],
    budgetBdt: "No whole-trip total is quoted. Airfare, accommodation, intercity travel, local transport, meals and attraction tickets vary by date and travel style; compare current prices before booking.",
    quickAnswer: "This six-day outline links Rome, Milan and Venice at a deliberately flexible pace. Compare the city order and travel connections for your dates, and check attraction access, transport schedules and entry requirements before booking; this page is not a live price quote or visa decision.",
    keyFacts: [
      { label: "Route focus", value: "Rome, Milan and Venice" },
      { label: "Sample duration", value: "Six days across three city bases; reduce stops or add nights if the pace feels tight" },
      { label: "Tickets and schedules", value: "Check current official or operator information for your travel dates" },
      { label: "Entry requirements", value: "Check current official Italian and Schengen guidance for your circumstances" }
    ],
    faqs: [
      { question: "Is six days enough for Rome, Milan and Venice?", answer: "The outline uses six days across three city bases, but two intercity transfers make the pace active. If you prefer slower travel, remove a city or add nights rather than trying to fit every landmark in." },
      { question: "How should I travel between the cities?", answer: "Compare currently available rail and other options for your dates. Check door-to-door time, station locations, luggage conditions, fare rules and the time needed to reach your accommodation." },
      { question: "Should I book attraction tickets in advance?", answer: "Check each attraction's official opening calendar, timed-entry requirements and ticket terms for your date. Book only after confirming the schedule and cancellation conditions." },
      { question: "Does this itinerary confirm Schengen visa eligibility?", answer: "No. Visa and entry decisions depend on your circumstances and current rules. Check the official Italian or relevant Schengen authority guidance before booking." }
    ],
    schemaMarkup: { type: "DestinationGuide", description: "Italy destination planning guide", code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Italy"}` }
  },
  {
    id: "paris-guide",
    country: "Paris, France",
    title: "Paris Itinerary from Bangladesh: Landmarks & Planning",
    description: "A flexible Paris outline for travelers planning around museums, landmarks and the Seine. Check current attraction access, local transport and entry requirements for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, daylight and local events. Check current opening calendars and transport information before booking, particularly during public holidays and major events.",
    itinerary: [
      { day: 1, title: "Arrival and a gentle first walk", activities: ["Keep plans light around your arrival time and accommodation location.", "Choose a nearby neighborhood walk or river-side area, and confirm any booked activity's operating schedule."] },
      { day: 2, title: "The Louvre area and central Paris", activities: ["Plan a focused visit to the Louvre only after checking its official opening calendar, entry conditions and ticket options for your date.", "Leave time for the surrounding gardens and nearby central sights; check local access information before setting a tight schedule."] },
      { day: 3, title: "Eiffel Tower and Seine", activities: ["Check current access and timed-entry terms before planning an Eiffel Tower visit.", "If choosing a Seine cruise, confirm the departure point, schedule and operating conditions with the provider."] },
      { day: 4, title: "A flexible final day", activities: ["Choose another museum, viewpoint or neighborhood based on your interests and confirmed opening hours.", "Allow time for local travel and keep a buffer before your onward flight or train."] }
    ],
    localTransport: ["Check current public-transport routes, service notices and ticket rules with the local operator before each journey.", "Allow time for walking and transfers; compare the station or airport location with your accommodation rather than relying on a map distance alone.", "Confirm airport-transfer options, schedules, luggage conditions and fare terms with the operator for your travel date.", "For timed-entry attractions and river activities, plan the route to the stated entrance or departure point and recheck it on the day."],
    budgetBdt: "No whole-trip total is quoted. Airfare, accommodation, local transport, meals and attraction tickets vary by date and travel style; compare current prices and terms before booking.",
    quickAnswer: "Plan Paris around a short list of museums, landmarks and river experiences, leaving time to move between them. Check current opening times, ticket conditions, transport schedules and entry requirements for your dates; this guide is not a live price quote or visa decision.",
    keyFacts: [
      { label: "Planning focus", value: "Museums, landmarks, the Seine and neighborhood time" },
      { label: "Sample duration", value: "Four flexible days; add time if you prefer a slower pace or more museums" },
      { label: "Tickets and schedules", value: "Check current official or operator information for your dates" },
      { label: "Entry requirements", value: "Check current official French and Schengen guidance for your circumstances" }
    ],
    faqs: [
      { question: "How many days should I plan for Paris?", answer: "This outline gives four flexible days, but the right length depends on your interests and pace. Pick a few priorities and leave space for travel between them rather than trying to cover every major sight." },
      { question: "Should I reserve Louvre or Eiffel Tower tickets in advance?", answer: "Check each attraction's official opening calendar, entry requirements and ticket terms for your date. If timed entry is offered, confirm the selected time and cancellation conditions before booking." },
      { question: "How should I plan local transport?", answer: "Use current route and service information from the local operator, allow time for station access and transfers, and recheck the route on the day." },
      { question: "Does this guide confirm Schengen visa eligibility?", answer: "No. Visa and entry decisions depend on your circumstances and current rules. Check the official French or relevant Schengen authority guidance before booking." }
    ],
    schemaMarkup: { type: "DestinationGuide", description: "Paris destination planning guide", code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"Paris"}` }
  },
  {
    id: "new-york-guide",
    country: "New York City, USA",
    title: "New York City Itinerary from Bangladesh: Landmarks & Planning",
    description: "A flexible New York City outline for planning around harbor sights, parks, museums and neighborhoods. Check current attraction access, local transport and entry requirements for your dates.",
    bestTimeToVisit: "Choose dates around your preferred weather, daylight and local event calendar. Check attraction opening information and current transport service notices before finalizing the plan.",
    itinerary: [
      { day: 1, title: "Arrival and a nearby first walk", activities: ["Keep the first day light around your arrival time, accommodation and airport transfer.", "Choose a nearby neighborhood or public space, and check current local conditions before setting a timed activity."] },
      { day: 2, title: "Harbor and Statue of Liberty planning", activities: ["If visiting the Statue of Liberty, confirm the official ferry departure point, schedule, ticket terms and security requirements for your date.", "Allow time for the full harbor visit and the return journey; avoid adding several distant attractions to the same day."] },
      { day: 3, title: "Central Park and a museum", activities: ["Choose a section of Central Park and one museum or cultural stop based on current opening hours and your interests.", "Check the museum's official entry and ticket information, and leave time for local travel between stops."] },
      { day: 4, title: "Neighborhoods and departure buffer", activities: ["Pick one or two neighborhoods or viewpoints rather than trying to cover the whole city.", "Leave a practical buffer for airport or station travel and verify the current route before departure."] }
    ],
    localTransport: ["Use current Metropolitan Transportation Authority route, service and fare information for subway and bus journeys.", "Compare airport-transfer options using the actual terminal, accommodation address, luggage and time of travel; confirm fares and terms with the operator.", "Check the official ferry operator's departure location and schedule before planning harbor attractions.", "Allow time for walking, transfers and service changes; recheck important connections on the day."],
    budgetBdt: "No whole-trip total is quoted. Airfare, accommodation, local transport, meals and attraction tickets vary by date and travel style; compare current prices and terms before booking.",
    quickAnswer: "Plan New York City around a few priorities—such as a harbor visit, a park, a museum and selected neighborhoods—and allow time to move between them. Check current attraction access, transport service and entry requirements for your dates; this page is not a live price quote or visa decision.",
    keyFacts: [
      { label: "Planning focus", value: "Harbor sights, parks, museums and selected neighborhoods" },
      { label: "Sample duration", value: "Four flexible days; choose a smaller set of priorities if your stay is shorter" },
      { label: "Tickets and services", value: "Check current official or operator information for your dates" },
      { label: "Entry requirements", value: "Check current official U.S. guidance for your circumstances" }
    ],
    faqs: [
      { question: "How many days should I plan for New York City?", answer: "This outline uses four flexible days, but the right duration depends on your interests and arrival or departure times. Focus on a few areas and leave time for travel between them." },
      { question: "What should I check before visiting the Statue of Liberty?", answer: "Confirm the official ferry departure point, schedule, ticket terms and security instructions for your date. Allow time for the harbor trip and return transfer." },
      { question: "How should I plan public transport?", answer: "Check current subway and bus routes, service notices and fare information with the Metropolitan Transportation Authority, then recheck important connections on the day." },
      { question: "Does this guide confirm U.S. visa eligibility?", answer: "No. Visa and entry decisions depend on your circumstances and current rules. Check current official U.S. guidance before booking." }
    ],
    schemaMarkup: { type: "DestinationGuide", description: "New York City destination planning guide", code: `{"@context":"https://schema.org","@type":"TouristDestination","name":"New York City"}` }
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
    quickAnswer: "Thailand travel budgets from Dhaka rely heavily on your shopping style. A 5-day shopping and leisure itinerary usually costs around BDT 70,000-80,000 (including flights!). Backpackers limiting shopping can experience Bangkok comfortably for BDT 55,000, while premium travelers staying in five-star hotels with fine dining should budget BDT 1,35,000+. Visa-related charges are not itemized in these broad estimates: verify the current government e-Visa fee, separate bank/payment charges, and any optional agency service fee before treating a total as all-in.",
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
      description: "Thailand trip budget estimates for Bangladesh; visa-related charges are not itemized and should be verified separately.",
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
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "4 min read",
    internalLinks: [
      { text: "Dhaka to Kathmandu flights Guide", path: "/flights/dhaka-kathmandu" },
      { text: "Dhaka to Bangkok Flight Costs", path: "/flights/dhaka-bangkok" },
      { text: "Flight Delay & Cancellation Compensation Checker", path: "/tools/flight-delay-claim" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Ready to check today's fares?", body: "Compare live Dhaka departure prices before they change." }
  },
  {
    id: "blog-2",
    slug: "nepal-vs-thailand-first-trip",
    title: "Nepal vs Thailand: Which is the Best First Country to Visit for Bangladeshis?",
    summary: "Choosing your very first international destination on a Bangladeshi passport often comes down to Nepal or Thailand. Compare Nepal's visa-on-arrival route and the Department of Immigration's gratis-visa rule for eligible SAARC visitors with Thailand's advance e-Visa process, plus indicative five-day budgets (about BDT 45,000–65,000 for Nepal and BDT 80,000+ for Thailand), halal-food options, and urban transit. Nepal's published rule grants eligible SAARC visitors up to 30 days gratis on a first visit in a visa year; check current entry rules and live prices before booking.",
    category: "Visa & Immigration",
    date: "May 28, 2026",
    updatedAt: "2026-10-12",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "2 min read",
    references: [
      {
        name: "Nepal Department of Immigration — Tourist Visa & SAARC Gratis Visa",
        nameBn: "নেপাল ইমিগ্রেশন বিভাগ — ট্যুরিস্ট ভিসা ও SAARC Gratis Visa",
        url: "https://pokhara.immigration.gov.np/en/page/tourist-visa-2",
      },
      {
        name: "Thailand e-Visa Portal — Ministry of Foreign Affairs",
        nameBn: "Thailand e-Visa পোর্টাল — পররাষ্ট্র মন্ত্রণালয়",
        url: "https://www.thaievisa.go.th/",
      },
    ],
    internalLinks: [
      { text: "Nepal Visa step-by-step checklist", path: "/visa/nepal-visa" },
      { text: "Thailand trip cost from Dhaka", path: "/costs/thailand-costs" },
      { text: "Thailand e-Visa & Dhaka Embassy Requirements", path: "/visa/thailand-visa" },
      { text: "Dhaka to Bangkok Flight Schedule & Fares", path: "/flights/dhaka-bangkok" },
      { text: "Where to Stay in Bangkok: Hotel Neighborhoods", path: "/hotels/bangkok-hotels" },
      { text: "Dhaka to Kathmandu Flight Schedule & Fares", path: "/flights/dhaka-kathmandu" },
      { text: "Where to Stay in Kathmandu & Pokhara", path: "/hotels/kathmandu-hotels" },
      { text: "Nepal 5-Day Trip Cost Calculator in BDT", path: "/costs/nepal-costs" }
    ],
    affiliateCTA: { provider: "klook", headline: "See what there is to do first", body: "Browse top-rated tours and activities in both Nepal and Thailand before you decide." }
  },
  {
    id: "blog-3",
    slug: "hotel-savings-guide-bangkok-kl-dubai",
    title: "How to Compare Hotel Areas and Booking Terms in Bangkok, Kuala Lumpur & Dubai",
    summary: "Compare hotel neighborhoods in Bangkok, Kuala Lumpur and Dubai by itinerary, transit, room needs and booking terms. This guide avoids fixed nightly rates and savings promises: compare the same dates, guests and room type, then review the full checkout total and cancellation conditions before booking.",
    category: "Hotel Planning",
    date: "June 05, 2026",
    updatedAt: "2026-11-01",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "3 min read",
    internalLinks: [
      { text: "Dubai trip cost from Dhaka", path: "/costs/dubai-costs" },
      { text: "Kuala Lumpur Hotels Guide", path: "/hotels/kuala-lumpur-hotels" },
      { text: "Thailand e-Visa & Dhaka Embassy Requirements", path: "/visa/thailand-visa" },
      { text: "Dhaka to Bangkok Flight Schedule & Fares", path: "/flights/dhaka-bangkok" },
      { text: "Where to Stay in Bangkok: Hotel Neighborhoods", path: "/hotels/bangkok-hotels" },
      { text: "Thailand 5-Day Trip Cost Calculator in BDT", path: "/costs/thailand-costs" },
      { text: "Dubai & UAE Tourist Visa Checklist", path: "/visa/dubai-visa" },
      { text: "Dhaka to Dubai Flight Schedule & Fares", path: "/flights/dhaka-dubai" },
      { text: "Where to Stay in Dubai: Metro & Marina Hotels", path: "/hotels/dubai-hotels" },
      { text: "Dubai Desert Safari & Burj Khalifa Passes", path: "/experiences?region=asia&city=dubai-klook" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Save on transport too", body: "A pre-booked airport transfer is usually cheaper than a metered taxi at arrival." }
  },
  {
    id: "blog-4",
    slug: "halal-food-guide-bangkok-bangladesh",
    title: "Where to Eat Halal Food in Bangkok: A Complete Guide for Bangladeshi Travelers",
    summary: "Finding authentic, 100% certified Halal food is one of the top priorities for Bangladeshi families visiting Thailand for shopping, holidays, or medical check-ups at Bumrungrad and Bangkok Hospital. This practical dining guide walks you through identifying the official green emblem of the Central Islamic Council of Thailand, navigating Bangkok's two largest Muslim culinary hubs—Pratunam's Petchaburi Road alleys and Sukhumvit Soi 3 (Arab Street) near Nana BTS—and budgeting for every meal tier in BDT, from BDT 180 mall food court dishes to beloved restaurants like Maidaun Halal in Pratunam, Al Hussain in Sukhumvit, and Yana Restaurant inside Siam Discovery, plus a bonus halal-friendly Ayutthaya day-trip plan (UNESCO) with transport, temple tickets and BDT cost notes.",
    category: "Food & Culture",
    date: "June 15, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    inlineFigure: {
      imageSrc: "/assets/images/ayutthaya_wat_phra_si_sanphet_chedis_1791427300000-1200.webp",
      altEn: "Three bell-shaped chedis of Wat Phra Si Sanphet at Ayutthaya under a blue cloudy sky",
      altBn: "নীল মেঘলা আকাশের নিচে আয়ুতায়ার ওয়াট ফ্রা সি সানফেটের তিনটি চেদি",
      captionEn: "The three chedis of Wat Phra Si Sanphet in the Ayutthaya Historical Park, the anchor of any day trip from Bangkok.",
      captionBn: "আয়ুতায়া হিস্টোরিক্যাল পার্কে ওয়াট ফ্রা সি সানফেটের তিনটি চেদি — ব্যাংকক থেকে দিনের ট্রিপের প্রধান আকর্ষণ।",
    },
    internalLinks: [
      { text: "Travel Creator Resources: The Tools We Actually Use (2026)", path: "/blog/travel-creator-resources" },
      { text: "Dhaka to Bangkok Flight Guide", path: "/flights/dhaka-bangkok" },
      { text: "Bangkok Hotels Neighborhoods", path: "/hotels/bangkok-hotels" },
      { text: "Thailand e-Visa & Dhaka Embassy Requirements", path: "/visa/thailand-visa" },
      { text: "Thailand 5-Day Trip Cost Calculator in BDT", path: "/costs/thailand-costs" }
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
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "6 min read",
    internalLinks: [
      { text: "Kathmandu Flights from Dhaka", path: "/flights/dhaka-kathmandu" },
      { text: "Nepal Visa on Arrival Guide", path: "/visa/nepal-visa" },
      { text: "Where to Stay in Kathmandu & Pokhara", path: "/hotels/kathmandu-hotels" },
      { text: "Nepal 5-Day Trip Cost Calculator in BDT", path: "/costs/nepal-costs" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Check Dhaka to Kathmandu Flight Fares", body: "Check live availability and book cheap roundtrip flights to Nepal today." }
  },
  {
    id: "blog-6",
    slug: "dual-currency-card-endorsement-bangladesh",
    title: "How to Get Dual-Currency Card Endorsement in Bangladesh (2026 Passport Dollar Endorsement Guide)",
    summary: "Passport dollar endorsement is how a Bangladeshi resident gets foreign exchange for travel recorded against their passport — up to USD 18,000 per calendar year since Bangladesh Bank's FEPD-1 Circular No. 33 (6 September 2026), with at most USD 5,000 as dollar notes. This checked guide explains endorsement at an Authorized Dealer bank, the separate activation step that makes a dual-currency card work online, the USD 300 single-transaction online-payment rule, and how an RFCD account differs.",
    category: "Banking & Payments",
    date: "September 26, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    updatedAt: "2026-10-19",
    references: [
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
      {
        name: "Bangladesh Bank — Guidelines for Foreign Exchange Transactions, Chapter 19: Payment through International Cards",
        nameBn: "বাংলাদেশ ব্যাংক — Guidelines for Foreign Exchange Transactions, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
      {
        name: "Bangladesh Bank — FE Circular Letter No. 05 (9 May 2024): RFCD international cards, online payment at actual",
        nameBn: "বাংলাদেশ ব্যাংক — FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD আন্তর্জাতিক কার্ড, প্রকৃত পরিমাণে online payment",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf",
      },
      {
        name: "Eastern Bank (EBL) — RFCD Account: deposit, FMJ and 30-day rules",
        nameBn: "ইস্টার্ন ব্যাংক (EBL) — RFCD Account: জমা, FMJ ও ৩০ দিনের নিয়ম",
        url: "https://www.ebl.com.bd/retail-deposit/EBL-RFCD-Account",
      },
      {
        name: "Bangladesh Bank — FEPD-2 Circular No. 01 (7 January 2026): passport endorsement fee by money changers capped at BDT 300",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬): মানি চেঞ্জারের passport endorsement fee সর্বোচ্চ BDT 300",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd-2/jan072026fepd-201e.pdf",
      },
    ],
    internalLinks: [
      { text: "Money & Banking Hub: endorsement, cards, USD 300 rule and NOC", path: "/banking" },
      { text: "Shariah-Compliant Islamic Dual-Currency Cards for Umrah", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account vs. Travel Quota (the $300 online-payment rule)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "Cash SAR / USD vs. Card Abroad (choose local currency, avoid DCC)", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
      { text: "Book Flights & Makkah Hotels in BDT via bKash/Bank Transfer", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Dual-Currency Card Fee & Markup Calculator", path: "/tools/currency-converter" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Card Endorsed & Ready?", body: "Compare live international flight fares from Dhaka and book with your endorsed card." }
  },
  {
    id: "blog-7",
    slug: "maldives-budget-trip-bangladesh-maafushi",
    title: "Maldives Under BDT 75,000 from Dhaka: Maafushi Local Island vs. Private Resort Guide",
    summary: "For years, Bangladeshi travelers assumed a Maldives vacation required BDT 2,50,000+ per person because private overwater resorts charge $500+ per night and $250 for private speedboats. Today, local inhabited islands like Maafushi and Hulhumalé let you swim in the exact same crystal-clear Indian Ocean lagoons for under BDT 75,000 total—flights included! Read how Bangladeshi tourists get a free 30-day Visa on Arrival in Malé, submit the free IMUGA declaration, catch the $25 scheduled speedboat to Maafushi beachfront hotels, join $30 half-day snorkeling and sandbank drone excursions, and book 1-day water villa resort passes without paying resort room rates.",
    category: "Family & Budget",
    date: "September 22, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "5 min read",
    internalLinks: [
      { text: "Dhaka to Malé Flight Guide", path: "/flights/dhaka-maldives" },
      { text: "Maldives Free Visa & IMUGA Steps", path: "/visa/maldives-visa" },
      { text: "Maldives Full Cost Breakdown in BDT", path: "/costs/maldives-costs" },
      { text: "Where to Stay in Maldives: Local Island Stays", path: "/hotels/maldives-hotels" }
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
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "5 min read",
    internalLinks: [
      { text: "Singapore Visa Requirements & Checklist", path: "/visa/singapore-visa" },
      { text: "Dhaka to Singapore Direct Flights", path: "/flights/dhaka-singapore" },
      { text: "Best Hotels Near Mustafa Centre Singapore", path: "/hotels/singapore-hotels" },
      { text: "Singapore 4-Day Trip Cost Calculator in BDT", path: "/costs/singapore-costs" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Stay Connected at Changi Airport", body: "Install a Singapore eSIM before leaving Dhaka so your Grab and Google Maps work the second you land." }
  },
  {
    id: "blog-9",
    slug: "top-budget-family-destinations-from-dhaka",
    title: "Top 6 Budget-Friendly Family Destinations from Dhaka in 2026 (Ranked by BDT Cost & Visa Ease)",
    summary: "Planning an international holiday from Dhaka with young children, a spouse, or elderly parents requires balancing flight duration, destination-specific visa requirements, Halal food access, stroller-friendly streets, and total cost in Bangladeshi Taka. In this ranked 2026 family guide, we compare the top six outbound destinations from Bangladesh from lowest to highest 5-day per-person BDT budget: Nepal (from BDT 42,000 with free Visa on Arrival), Malaysia (from BDT 68,000 with online e-Visa and JAKIM Halal dining), Thailand (from BDT 72,000 with Safari World and medical check-up access), Maldives local islands (Maafushi & Hulhumalé from BDT 75,000), Singapore, and Dubai. Visa approval and live prices can change; check current requirements before booking. Thailand visa-related charges are not itemized in these trip ranges; verify the current government e-Visa fee, bank/payment charges, and optional agency service fees separately.",
    category: "Family & Budget",
    date: "September 26, 2026",
    updatedAt: "2026-10-14",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Singapore 4-Day Budget Itinerary (MRT SimplyGo & Halal Hawkers)", path: "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide" },
      { text: "Bumrungrad & Bangkok Hospital Medical Checkup Guide from Dhaka", path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh" },
      { text: "Maldives Under BDT 75,000: Maafushi Local Island vs. Resort Guide", path: "/blog/maldives-budget-trip-bangladesh-maafushi" },
      { text: "Sri Lanka + Maldives 7-Day Combo Tour & BDT Cost Breakdown", path: "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost" },
      { text: "Kathmandu to Pokhara 5-Day Nepal Itinerary in BDT", path: "/blog/nepal-pokhara-itinerary-bangladesh" },
      { text: "Nepal On-Arrival Visa & Online Checklist", path: "/visa/nepal-visa" },
      { text: "Thailand e-Visa & Embassy Requirements", path: "/visa/thailand-visa" },
      { text: "Malaysia eVisa & MDAC Arrival Card Checklist", path: "/visa/malaysia-visa" },
      { text: "Maldives On-Arrival Visa & IMUGA Checklist", path: "/visa/maldives-visa" }
    ],
    affiliateCTA: { provider: "klook", headline: "Compare family attractions and activity options", body: "Browse listings for Safari World Bangkok, Genting SkyWorlds, Gardens by the Bay, and Dubai desert safaris; check the selected dates, inclusions, total, ticket instructions, and cancellation terms." }
  },
  {
    id: "blog-10",
    slug: "dhaka-airport-outbound-immigration-checklist-noc-go",
    title: "Dhaka Airport (DAC) Outbound Immigration Checklist 2026: NOC, GO, Return Ticket & First-Time Flyer Rules",
    summary: "Even after receiving an approved e-Visa or booking a Visa-on-Arrival holiday to Nepal or the Maldives, many first-time Bangladeshi travelers feel anxious about facing the emigration counter at Hazrat Shahjalal International Airport (DAC). In reality, clearing Dhaka outbound immigration takes under two minutes when your document folder is properly organized. This verified checklist details the 5 mandatory documents every passenger must carry (6-month valid passport with old passports attached, printed visa/QR code, return PNR ticket, hotel voucher, and passport dollar endorsement), alongside profession-specific papers including Private Job NOCs, Government Orders (GO), Trade Licenses, and fresh-passport tips.",
    category: "Visa & Immigration",
    date: "September 26, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "6 min read",
    internalLinks: [
      { text: "First International Trip on a Fresh Passport (3-Step History Ladder)", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "Thailand Official e-Visa Guide (thaievisa.go.th Bank & Upload Rules)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide", path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration" },
      { text: "Singapore Tourist Visa Guide (Authorized Agents & Form V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
      { text: "Dhaka Airport Pre-Departure Inspection Checklist", path: "/pre-departure" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Have Internet Ready at the Arrival Immigration Desk", body: "Activate a travel eSIM before takeoff so you can pull up your return ticket, hotel voucher, or IMUGA QR code immediately upon landing." }
  },
  {
    id: "blog-11",
    slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
    title: "DIY Umrah from Bangladesh: Visa Routes, Nusuk Steps & Budget Checks",
    summary: "Choose a conditional Umrah visa route from Bangladesh, check the published 1448H dates and follow the application-to-permit sequence. Includes Package Visa conditions, source limits and a historical ten-day budget—not a live quote. Official instructions reviewed 19 October 2026; personal app flows not tested.",
    category: "Hajj & Umrah",
    date: "September 26, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "12 min read",
    internalLinks: [
      { text: "Nusuk registration, Visa Bio and Rawdah checks", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Saudi stopover: the separate 96-hour trip", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "Hotel access and Haramain rail planning", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dhaka–Jeddah/Madinah flight-planning checklist", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "Separate Bangladesh Hajj registration and package guide", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "Dual-Currency Card Endorsement Guide for Hotel & Train Bookings", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Dubai Stopover & UAE Visa Guide from Dhaka", path: "/destinations/dubai-guide" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" },
      { text: "Ramadan Umrah booking dates & I'tikaf registration", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
    ],
    references: [
      {
        name: "Saudi Ministry of Hajj and Umrah — Nusuk Umrah launch for overseas pilgrims",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — বিদেশি যাত্রীদের জন্য Nusuk Umrah সেবা চালুর ঘোষণা",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-launches-Nusuk-Umrah-service-to-enable-pilgrims-from-outside-the-Kingdom",
      },
      {
        name: "Nusuk Umrah — registration",
        nameBn: "Nusuk Umrah — নিবন্ধন পেজ",
        url: "https://umrah.nusuk.sa/registration/signup",
      },
      {
        name: "Nusuk Umrah — Terms of Use",
        nameBn: "Nusuk Umrah — ব্যবহারের শর্ত",
        url: "https://umrah.nusuk.sa/TermsOfUse",
      },
      {
        name: "Saudi Ministry of Hajj and Umrah — FAQ",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — FAQ",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Saudi Ministry — 1448H Umrah season calendar",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — ১৪৪৮ হিজরি Umrah মৌসুমের calendar",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH",
      },
      {
        name: "Visit Saudi — Saudi Stopover Visa",
        nameBn: "Visit Saudi — Saudi Stopover Visa",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
      {
        name: "Saudia — Transit Visa",
        nameBn: "Saudia — Transit Visa আবেদন",
        url: "https://www.saudia.com/transit-visa",
      },
      {
        name: "Visit Saudi — Package Visa",
        nameBn: "Visit Saudi — Package Visa",
        url: "https://www.visitsaudi.com/en/campaigns/package-visa",
      },
      {
        name: "Official Saudi eVisa portal",
        nameBn: "সৌদি আরবের official eVisa portal",
        url: "https://visa.visitsaudi.com/",
      },
      {
        name: "Visit Saudi — current visa requirements and eligibility checker",
        nameBn: "Visit Saudi — বর্তমান ভিসার শর্ত ও যোগ্যতা যাচাই",
        url: "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations",
      },
      {
        name: "Bangladesh Haj Management Portal",
        nameBn: "বাংলাদেশ Haj Management Portal",
        url: "https://www.hajj.gov.bd/",
      },
      {
        name: "Saudi Press Agency — 1447H Hajj permit-violation notice",
        nameBn: "Saudi Press Agency — ১৪৪৭ হিজরি Hajj permit লঙ্ঘনের বিজ্ঞপ্তি",
        url: "https://www.spa.gov.sa/en/N2559888",
      },
      {
        name: "Saudi Ministry of Health — Pilgrim Health Requirements index",
        nameBn: "Saudi Ministry of Health — Pilgrim Health Requirements সূচি",
        url: "https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx",
      },
      {
        name: "Saudi MOH — 1447H Umrah health regulations (season-specific)",
        nameBn: "Saudi MOH — ১৪৪৭ হিজরি Umrah health rules (মৌসুমভিত্তিক)",
        url: "https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf",
      },
      {
        name: "Saudi Ministry — Umrah Permit Application",
        nameBn: "সৌদি মন্ত্রণালয় — Umrah Permit আবেদন",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "Saudi Ministry — permit to visit Al-Rawdah Al-Sharifiyah",
        nameBn: "সৌদি মন্ত্রণালয় — Rawdah Al-Sharifiyah জিয়ারতের permit",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Haramain High-Speed Railway — official fare table",
        nameBn: "Haramain High-Speed Railway — official fare table",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "Haramain High-Speed Railway — baggage guidelines",
        nameBn: "Haramain High-Speed Railway — baggage নির্দেশনা",
        url: "https://sar.hhr.sa/travel/guidelines/baggage",
      },
      {
        name: "Saudi Ministry of Tourism — Tourist Visa Regulations, Articles 5–6 (revision date unconfirmed)",
        nameBn: "সৌদি পর্যটন মন্ত্রণালয় — Tourist Visa Regulations, Article 5–6 (revision date অনিশ্চিত)",
        url: "https://cdn.mt.gov.sa/mtportal/mt-fe-production/content/policies-regulations/documents/tourism-regulations/Tourist-Visa-Regulations-En-V012.pdf",
      },
      {
        name: "SPA — Ministry foreign-visa and permanent-residence announcement, 12 June 2023",
        nameBn: "SPA — বিদেশি ভিসা ও permanent residence নিয়ে মন্ত্রণালয়ের ঘোষণা, ১২ জুন ২০২৩",
        url: "https://www.spa.gov.sa/w1919582",
      },
      {
        name: "SPA — GCC-resident eVisa without specific professions, 2 May 2023",
        nameBn: "SPA — নির্দিষ্ট পেশার শর্ত ছাড়া GCC-resident eVisa, ২ মে ২০২৩",
        url: "https://www.spa.gov.sa/w1895923",
      },
      {
        name: "Additional portal: Nusuk Saudi platform",
        nameBn: "অতিরিক্ত portal: Nusuk Saudi platform",
        url: "https://www.nusuk.sa",
      },
      {
        name: "Additional portal: Saudi Ministry of Hajj and Umrah",
        nameBn: "অতিরিক্ত portal: Saudi Ministry of Hajj and Umrah",
        url: "https://www.haj.gov.sa",
      },
      {
        name: "Additional portal: Saudi Unified Visa Platform",
        nameBn: "অতিরিক্ত portal: Saudi Unified Visa Platform",
        url: "https://ksavisa.sa",
      },
      {
        name: "Additional portal: Haramain High-Speed Railway booking",
        nameBn: "অতিরিক্ত portal: Haramain High-Speed Railway booking",
        url: "https://sar.hhr.sa",
      },
      {
        name: "Additional regional portal: UAE Government Portal (general reference only)",
        nameBn: "অতিরিক্ত regional portal: UAE Government Portal (সৌদি Umrah নিয়মের উৎস নয়)",
        url: "https://u.ae",
      },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Check Saudi data coverage before your Umrah trip",
      body: "An eSIM is optional for maps and messages, not a Nusuk permit requirement. Check compatibility, provider coverage, activation, validity and final price; neither network access nor appointments are guaranteed.",
    },
  },
  {
    id: "blog-12",
    slug: "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
    title: "Makkah & Madinah Hotels: Access Checks and Haramain Train Guide (2026)",
    summary:
      "Checked 19 October 2026: HHR basic fares, baggage and station services, plus hotel-owned examples. Confirm the exact room, mosque route, shuttle and ticket conditions before booking; no area-wide accessibility ranking, live room quote or guaranteed transfer.",
    category: "Hajj & Umrah",
    date: "September 26, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    references: [
      {
        name: "HHR — station services (operation and availability require confirmation)",
        nameBn: "HHR — station service (operation ও availability নিশ্চিত করতে হবে)",
        url: "https://sar.hhr.sa/services/stations-services",
      },
      {
        name: "HHR — basic fares, boarding and ticket-channel conditions",
        nameBn: "HHR — basic fare, boarding ও ticket-channel condition",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "HHR — baggage allowance and prohibited items",
        nameBn: "HHR — baggage allowance ও prohibited item",
        url: "https://sar.hhr.sa/travel/guidelines/baggage",
      },
      {
        name: "HHR — travel tips and identification/assistance checks",
        nameBn: "HHR — travel tips ও identification/assistance check",
        url: "https://sar.hhr.sa/travel/travel-tips",
      },
      {
        name: "Hilton — named Makkah/Madinah property descriptions (not a room or route inspection)",
        nameBn: "Hilton — নির্দিষ্ট Makkah/Madinah property description (room/route inspection নয়)",
        url: "https://www.hilton.com/en/p/discover-travel/emea/religious-travel/",
      },
      {
        name: "Hilton — accessibility varies by hotel and room",
        nameBn: "Hilton — hotel ও room অনুযায়ী accessibility বদলায়",
        url: "https://www.hilton.com/en-gb/help-center/hotel-information/accessible-features-and-rooms/",
      },
    ],
    internalLinks: [
      { text: "Nusuk visitor and separate Rawdah appointment checks", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Complete Umrah & Hajj Visa, Nusuk & BDT Budget Guide", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" },
      { text: "Dual-Currency Card Endorsement for Booking the Train", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Umrah Rules for Women: Mahram, Visa and Ladies' Gates", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "Wearing Ihram at Dhaka Airport or at the Miqat", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "Zamzam, Dates and Gold: Customs Rules on the Return Flight", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Ramadan Umrah dates & last-10-nights booking plan", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
    ],

    affiliateCTA: {
      provider: "klook",
      headline: "Compare the exact hotel and room terms",
      body: "Search your dates and party, then confirm the total, room/beds, cancellation and access with the actual property. A search result does not verify a wheelchair route or shuttle.",
    },
  },

  {
    id: "blog-13",
    slug: "hajj-registration-bangladesh-government-vs-private-package-cost",
    title: "Hajj Registration from Bangladesh for 2027: Status, Official Portal & Package Costs",
    summary: "The latest supplied MoRA notice lists Hajj 2027 primary registration from 27 July to 24 September 2026, with no extension. The window has passed. Check hajj.gov.bd for later notices. The sources supplied do not establish 2027 package prices; 2026 prices are historical, not current quotes.",
    references: [
      {
        name: "Bangladesh Haj Management Portal — Hajj 2027 notices and e-Hajj services",
        nameBn: "বাংলাদেশ হজ ব্যবস্থাপনা পোর্টাল — ২০২৭ সালের হজ বিজ্ঞপ্তি ও ই-হজ সেবা",
        url: "https://hajj.gov.bd/",
      },
      {
        name: "e-Hajj BD — Hajj 2027 Passport Relaxation Notice",
        nameBn: "ই-হজ বিডি — ২০২৭ সালের হজে পাসপোর্ট-শিথিলতার বিজ্ঞপ্তি",
        url: "https://ehaj.hajj.gov.bd/news/uploads/6aabddbc34a0d0.215566001789648316.pdf",
      },
      {
        name: "e-Hajj BD — Signed Bank Registration Certificate Notice",
        nameBn: "ই-হজ বিডি — স্বাক্ষরিত ব্যাংক নিবন্ধন সনদের বিজ্ঞপ্তি",
        url: "https://ehaj.hajj.gov.bd/news/uploads/6ab4d8a90e95d0.059743001790236841.pdf",
      },
      {
        name: "Saudi Ministry of Health — Hajj Health Requirements (1447H/2026; historical)",
        nameBn: "সৌদি স্বাস্থ্য মন্ত্রণালয় — হজের স্বাস্থ্যবিধি (১৪৪৭ হিজরি/২০২৬; ঐতিহাসিক)",
        url: "https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf",
      },
      {
        name: "Saudi Press Agency — Hajj permit announcement (2026; historical)",
        nameBn: "Saudi Press Agency — Hajj permit বিজ্ঞপ্তি (২০২৬; ঐতিহাসিক)",
        url: "https://www.spa.gov.sa/en/w2579415",
      },
      {
        name: "Saudi Press Agency — Nusuk Smart Card announcement (2026; historical)",
        nameBn: "Saudi Press Agency — Nusuk Smart Card বিজ্ঞপ্তি (২০২৬; ঐতিহাসিক)",
        url: "https://www.spa.gov.sa/en/N2597343",
      },
      {
        name: "Saudi Ministry of Hajj and Umrah — official portal; check current Hajj season",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — সরকারি portal; চলতি হজ-মৌসুমের তথ্য দেখুন",
        url: "https://www.haj.gov.sa/",
      },
      {
        name: "Nusuk Hajj — official services portal; confirm Bangladesh applicability",
        nameBn: "Nusuk Hajj — সরকারি সেবা portal; বাংলাদেশি যাত্রীর ক্ষেত্রে প্রযোজ্যতা যাচাই করুন",
        url: "https://hajj.nusuk.sa/",
      },
      {
        name: "Saudi Ministry of Health — official portal; check current Hajj health requirements",
        nameBn: "সৌদি স্বাস্থ্য মন্ত্রণালয় — সরকারি portal; চলতি হজের স্বাস্থ্যবিধি দেখুন",
        url: "https://www.moh.gov.sa/en/Pages/Default.aspx",
      },
    ],
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "Complete DIY Umrah & Nusuk Guide from Bangladesh", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Umrah & Hajj with Elderly Parents: Wheelchair & Medical Guide", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Plan mobile data for your Hajj trip", body: "Consider mobile data for family messaging and maps in Saudi Arabia. Before choosing an eSIM, check device compatibility, network coverage, data allowance and activation terms." }
  },
  {
    id: "blog-14",
    slug: "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide",
    title: "Umrah with Elderly Parents from Bangladesh: Airline Wheelchair, Haram Mobility & Medical Preparation",
    summary: "Checked 19 October 2026: what a carrier can confirm for an older parent, how a personal wheelchair and powered device are handled, where the Grand Mosque's free wheelchairs and paid electric carts are booked, and which hotel and clinical questions only the property and your doctor can answer. No universal free service, guaranteed gate delivery, step-free hotel route or medical clearance.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    references: [
      {
        name: "Saudia — Special baggage: wheelchairs, mobility aids and portable oxygen concentrators",
        nameBn: "সৌদিয়া — বিশেষ লাগেজ: হুইলচেয়ার, মোবিলিটি এইড ও পোর্টেবল অক্সিজেন কনসেনট্রেটর",
        url: "https://www.saudia.com/manage/baggage/special-baggage",
      },
      {
        name: "Saudia — Special assistance: wheelchair services and WCHR/WCHS/WCHC categories",
        nameBn: "সৌদিয়া — স্পেশাল অ্যাসিস্ট্যান্স: হুইলচেয়ার সেবা ও WCHR/WCHS/WCHC ক্যাটাগরি",
        url: "https://www.saudia.com/before-flying/special-assistance/special-care/travelling-for-people-with-a-disability/wheelchair-services",
      },
      {
        name: "Biman Bangladesh Airlines — Wheelchair assistance and request contacts",
        nameBn: "বিমান বাংলাদেশ এয়ারলাইন্স — হুইলচেয়ার সহায়তা ও আবেদনের যোগাযোগ",
        url: "https://www.biman-airlines.com/special-care/wheelchair-assistance",
      },
      {
        name: "Ministry of Hajj and Umrah — Things to remember: health advice, gates and using wheelchairs",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — মনে রাখার বিষয়: স্বাস্থ্য পরামর্শ, গেট ও হুইলচেয়ার ব্যবহার",
        url: "https://haj.gov.sa/en/Hajj/Things-To-Remember?id=3",
      },
      {
        name: "General Authority for the Care of the Grand Mosque and the Prophet's Mosque — mobility services",
        nameBn: "দুই পবিত্র মসজিদ পরিচর্যা ও ব্যবস্থাপনা কর্তৃপক্ষ — মোবিলিটি সেবা",
        url: "https://alharamain.gov.sa/public/?main_subject=nw&module=subj-ar&subject=subject_708051",
      },
      {
        name: "Saudi Press Agency — Grand Mosque golf cart bookings shift to digital (20 March 2025)",
        nameBn: "সৌদি প্রেস এজেন্সি — গ্র্যান্ড মসজিদের গলফ কার্ট বুকিং ডিজিটাল (২০ মার্চ ২০২৫)",
        url: "https://www.spa.gov.sa/en/N2285176",
      },
      {
        name: "Saudi Press Agency — Smart mobility system at the Two Holy Mosques (4 March 2026)",
        nameBn: "সৌদি প্রেস এজেন্সি — দুই পবিত্র মসজিদে স্মার্ট মোবিলিটি ব্যবস্থা (৪ মার্চ ২০২৬)",
        url: "https://www.spa.gov.sa/en/N2527804",
      },
      {
        name: "Saudi Press Agency — Free 24-hour wheelchair service and golf carts (9 August 2024)",
        nameBn: "সৌদি প্রেস এজেন্সি — ২৪ ঘণ্টার বিনামূল্যে হুইলচেয়ার সেবা ও গলফ কার্ট (৯ আগস্ট ২০২৪)",
        url: "https://www.spa.gov.sa/en/N2151450",
      },
      {
        name: "Saudi Press Agency — Tanaqol electric vehicle booking and service areas (14 May 2024)",
        nameBn: "সৌদি প্রেস এজেন্সি — তানাকুল ইলেকট্রিক ভেহিকল বুকিং ও সেবা এলাকা (১৪ মে ২০২৪)",
        url: "https://www.spa.gov.sa/en/N2102395",
      },
    ],
    internalLinks: [
      { text: "Makkah & Madinah hotel zones, room access and Haramain train", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Complete DIY Umrah and Nusuk guide from Bangladesh", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Nusuk app and Rawdah permit step by step", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Wearing Ihram from Dhaka airport or on a transit flight", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "DIY Umrah planning portal and BDT calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Compare a private airport transfer for a party with a folded wheelchair", body: "If your parent uses a wheelchair, compare a pre-booked vehicle against airport taxis and confirm the vehicle size, folded-wheelchair storage, assistance at pickup and cancellation terms before paying. A transfer booking does not provide airline wheelchair assistance or access to the mosque." }
  },
  {
    id: "blog-15",
    slug: "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
    title: "96-Hour Saudi Stopover from Bangladesh: Eligibility, Booking & Umrah",
    summary:
      "Checked 19 October 2026: Saudia’s published stopover booking sequence, up to 96 hours, onward-document checks and actual checkout costs. Current detailed flynas eligibility remains unverified. Separate Umrah/Rawdah permits and realistic transfer buffers matter; no universal approval, free hotel or instant-issuance promise.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    references: [
      {
        name: "Visit Saudi — stopover campaign, Saudia offer and Nusuk note",
        nameBn: "Visit Saudi — stopover campaign, Saudia offer ও Nusuk নির্দেশনা",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
      {
        name: "Saudia — dedicated transit visa conditions and booking sequence",
        nameBn: "Saudia — নির্দিষ্ট transit visa শর্ত ও booking sequence",
        url: "https://www.saudia.com/transit-visa",
      },
      {
        name: "flynas — stopover launch, 30 January 2023 (historical)",
        nameBn: "flynas — stopover launch, ৩০ জানুয়ারি ২০২৩ (পুরোনো ঘোষণা)",
        url: "https://www.flynas.com/en/media-center/news-updates/stopover-visa",
      },
      {
        name: "Ministry of Hajj and Umrah — Umrah Permit Application",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — Umrah Permit Application",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "KSA Visa — official visa services (navigation)",
        nameBn: "KSA Visa — official visa service (navigation)",
        url: "https://ksavisa.sa",
      },
      {
        name: "Official tourist eVisa nationality list — see separate main-guide review",
        nameBn: "Official tourist eVisa nationality list — পৃথক main-guide review দেখুন",
        url: "https://visa.visitsaudi.com/",
      },
      {
        name: "Visit Saudi — official eligibility checker (personal result untested)",
        nameBn: "Visit Saudi — official eligibility checker (ব্যক্তিগত result পরীক্ষা হয়নি)",
        url: "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations",
      },
      {
        name: "Haramain railway — fare/booking navigation, not repriced in this review",
        nameBn: "Haramain railway — fare/booking navigation, এই review-তে নতুন দাম যাচাই হয়নি",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "Ministry of Hajj and Umrah — separate Rawdah permit service",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — আলাদা Rawdah permit service",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "flynas — public booking site, not personal eligibility evidence",
        nameBn: "flynas — public booking site, ব্যক্তিগত যোগ্যতার প্রমাণ নয়",
        url: "https://www.flynas.com/en",
      },
    ],
    internalLinks: [
      { text: "Complete DIY Umrah & Nusuk Guide from Bangladesh", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Nusuk App, Saudi Visa Bio & Rawdah Permit Guide", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dual-Currency Card Endorsement Guide for Online Flight Booking", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Plan data access for Nusuk and your Jeddah transfer",
      body: "Check eSIM compatibility on the phone holding your permit, then compare coverage and current prices. Paid data is optional; it does not secure a visa, appointment or entry.",
    },
  },

  {
    id: "blog-16",
    slug: "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
    title: "Nusuk & Saudi Visa Bio for Bangladeshis: Registration, Biometrics and Rawdah Permits",
    summary: "For Bangladeshi visitors: application-specific Saudi Visa Bio steps, Nusuk visitor registration and separate Umrah/Rawdah permits. Learn the dated annual-booking rule, confirmation window and entry-code checks, without a fixed OTP length, screenshot ban or paid-data requirement. Official published sources reviewed 19 October 2026; authenticated app screens not tested.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    references: [
      {
        name: "Saudi Ministry FAQ — Umrah biometrics and visitor registration",
        nameBn: "সৌদি মন্ত্রণালয়ের FAQ — ওমরাহ বায়োমেট্রিক ও ভিজিটর নিবন্ধন",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Saudi Visa Bio — MOFA KSA official app listing",
        nameBn: "Saudi Visa Bio — MOFA KSA-এর অফিশিয়াল অ্যাপ listing",
        url: "https://play.google.com/store/apps/details?id=sa.gov.mofa.saudivisabio",
      },
      {
        name: "Saudi Ministry — Umrah Permit Application",
        nameBn: "সৌদি মন্ত্রণালয় — ওমরাহ পারমিট আবেদন",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "Saudi Ministry — Rawdah Permit service",
        nameBn: "সৌদি মন্ত্রণালয় — Rawdah পারমিট সেবা",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Nusuk — Rawdah booking, confirmation and entry code (Arabic)",
        nameBn: "Nusuk — Rawdah বুকিং, confirmation ও entry code (আরবি)",
        url: "https://www.nusuk.sa/rawdah",
      },
      {
        name: "Nusuk services — visitor and Nafath login options",
        nameBn: "Nusuk সেবা — ভিজিটর ও Nafath login অপশন",
        url: "https://services.nusuk.sa/nusuk-svc/auth/login",
      },
      {
        name: "Nusuk Umrah — package-platform registration",
        nameBn: "Nusuk Umrah — প্যাকেজ প্ল্যাটফর্মের নিবন্ধন",
        url: "https://umrah.nusuk.sa/registration/signup",
      },
      {
        name: "Nusuk Umrah — package-platform Terms of Use",
        nameBn: "Nusuk Umrah — প্যাকেজ প্ল্যাটফর্ম ব্যবহারের শর্ত",
        url: "https://umrah.nusuk.sa/TermsOfUse",
      },
      {
        name: "Saudi Ministry — Nusuk access without data consumption (6 August 2025 announcement)",
        nameBn: "সৌদি মন্ত্রণালয় — ডেটা খরচ ছাড়া Nusuk ব্যবহার (৬ আগস্ট ২০২৫-এর ঘোষণা)",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-activates-the-Nusuk-application-without-internet-consumption-to-serve-the",
      },
      {
        name: "Saudi Ministry — current contact and support channels",
        nameBn: "সৌদি মন্ত্রণালয় — বর্তমান যোগাযোগ ও সহায়তা চ্যানেল",
        url: "https://haj.gov.sa/en/Contact-us",
      },
      {
        name: "Bangladesh Haj Management Portal — separate Hajj process",
        nameBn: "বাংলাদেশ হজ ব্যবস্থাপনা পোর্টাল — আলাদা হজ প্রক্রিয়া",
        url: "https://hajj.gov.bd/",
      },
    ],
    internalLinks: [
      { text: "Complete DIY Umrah & 10-Day BDT Budget Guide", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Women’s Umrah travel and Rawdah access guidance", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "Bangladesh Hajj registration and package comparison", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" },
      { text: "Ramadan Umrah & I'tikaf Guide: Booking, Budget & Season Rules from Bangladesh", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Compare optional Saudi data plans for maps and messages", body: "An eSIM purchase is not a Nusuk permit requirement. Check your phone compatibility, provider coverage, activation terms and final price; access on your actual network can vary." }
  },
  {
    id: "blog-17",
    slug: "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates",
    title: "Umrah for Bangladeshi Women: Mahram, Visa, Rawdah & Ihram Checks (2026)",
    summary:
      "Source review, 19 October 2026: distinguish the Ministry’s no-mahram Umrah answer from visa/age eligibility and personal religious advice. Check actual Rawdah bookings, hotel routes, Ihram, menstrual contingencies and private Taqsir—not universal gates or personal rulings.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "11 min read",
    references: [
      {
        name: "Ministry of Hajj and Umrah — specific no-mahram Umrah answer (other FAQ items have separate limits)",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — নির্দিষ্ট no-mahram Umrah উত্তর (অন্য FAQ-এর সীমা আলাদা)",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Official tourist eVisa terms — age, representation, nationality list and discretion",
        nameBn: "Official tourist eVisa terms — age, representation, nationality list ও discretion",
        url: "https://visa.visitsaudi.com/Home/TermsConditions",
      },
      {
        name: "Jordan General Iftaa — fatwa 3785, 30 July 2023 (conditional religious advice, not visa law)",
        nameBn: "Jordan General Iftaa — fatwa 3785, ৩০ জুলাই ২০২৩ (শর্তসাপেক্ষ ধর্মীয় advice, visa law নয়)",
        url: "https://www.aliftaa.jo/research-fatwa-english/3785/Islamic-Ruling-Regarding-a-Womans-Travel-for-Hajj-or-Umrah-without-a-Mahram-or-her-Husband",
      },
      {
        name: "Ministry — Rawdah appointment service for men and women",
        nameBn: "মন্ত্রণালয় — নারী-পুরুষের Rawdah appointment service",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Nusuk — Rawdah visiting, confirmation, children and ordinary mosque access (Arabic)",
        nameBn: "Nusuk — Rawdah visit, confirmation, child ও সাধারণ mosque access (আরবি)",
        url: "https://www.nusuk.sa/rawdah",
      },
      {
        name: "Shaykh Ibn Baz official archive — women’s Ihram clothing, fatwa 5222 (Arabic)",
        nameBn: "Shaykh Ibn Baz official archive — নারীর Ihram clothing, fatwa 5222 (আরবি)",
        url: "https://binbaz.org.sa/fatwas/5222/%D8%B5%D9%81%D8%A9-%D9%84%D8%A8%D8%A7%D8%B3-%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D8%AD%D8%B1%D9%85%D8%A9",
      },
      {
        name: "Sahih al-Bukhari 1838 — niqab and gloves in Ihram",
        nameBn: "Sahih al-Bukhari 1838 — Ihram-এ niqab ও gloves",
        url: "https://sunnah.com/bukhari:1838",
      },
      {
        name: "Sahih al-Bukhari 305 — Aisha’s Hajj report and Tawaf until purity",
        nameBn: "Sahih al-Bukhari 305 — Aisha-র Hajj বর্ণনা ও পবিত্রতা পর্যন্ত Tawaf",
        url: "https://sunnah.com/bukhari:305",
      },
      {
        name: "Nusuk Umrah Journey — sequence and published women’s hair-trimming example",
        nameBn: "Nusuk Umrah Journey — sequence ও নারীর hair-trimming-এর published example",
        url: "https://umrah.nusuk.sa/Journey",
      },
      {
        name: "Sunan Abi Dawud 1985 — women’s clipping rather than shaving",
        nameBn: "Sunan Abi Dawud 1985 — নারীর shaving নয় clipping",
        url: "https://sunnah.com/abudawud:1985",
      },
    ],
    internalLinks: [
      { text: "Nusuk visitor registration and Rawdah confirmation guide", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Hotel room/access, Haramain and separate transfer checks", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Umrah with older parents: airline assistance, Haram carts and medical checks", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Quote-input Umrah planning and budget hub", path: "/umrah" },
      { text: "Ramadan and I’tikaf — separate season-specific review", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
      { text: "Main DIY guide — actual visa route, application and permit sequence", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Ihram journey/intention guidance — separate specialist review", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "Compare airport transfer options for your party",
      body: "Optional transport search: confirm exact pickup/dropoff, passenger/bag capacity, assistance, privacy needs, total and cancellation with the operator. No female-driver, wheelchair-access or mosque-entry guarantee; no ride or live quote was tested.",
    },
  },

  {
    id: "blog-18",
    slug: "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",
    title: "Dhaka–Jeddah/Madinah Flights: Open-Jaw, Baggage & Quote Checks (2026)",
    summary:
      "Source review, 19 October 2026: compare roundtrip and open-jaw on the same dates, passengers, baggage and terms. Check Biman directional baggage, Saudia Zamzam wording and connections; no live fare, guaranteed savings or daily schedule is established.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    references: [
      {
        name: "Biman — route/fare-specific baggage, cabin rules and notices",
        nameBn: "Biman — route/fare অনুযায়ী baggage, cabin rule ও notice",
        url: "https://www.biman-airlines.com/baggageAll",
      },
      {
        name: "Saudia — Conditions of Carriage, ticket sequence, baggage and Zamzam (relevant sections)",
        nameBn: "Saudia — Conditions of Carriage, ticket sequence, baggage ও Zamzam (প্রাসঙ্গিক অংশ)",
        url: "https://www.saudia.com/information/terms-and-conditions/general-conditions-of-carriage",
      },
      {
        name: "Saudia — branded fare comparison (not a priced itinerary)",
        nameBn: "Saudia — branded fare comparison (priced itinerary নয়)",
        url: "https://www.saudia.com/book/travel-information/branded-fares",
      },
      {
        name: "Emirates — Dubai connections and separate-ticket transfer conditions",
        nameBn: "Emirates — Dubai connection ও separate-ticket transfer condition",
        url: "https://www.emirates.com/us/english/before-you-fly/dubai-international-airport/transferring-between-terminals/",
      },
      {
        name: "Air Arabia — checked baggage and conditional Zamzam carriage",
        nameBn: "Air Arabia — checked baggage ও শর্তসাপেক্ষ Zamzam carriage",
        url: "https://www.airarabia.com/en/help/baggage-enquiries/checked-baggage_baggage-enquiries",
      },
    ],
    internalLinks: [
      { text: "Ihram planning for your journey — separate religious guidance", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "Detailed Zamzam and Bangladesh customs guide — separate review lane", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Main DIY Umrah process and entry/permit boundaries", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Hotel access, Haramain baggage and separate transfers", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Saudia/flynas stopover route and permission checks", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "Quote-input Umrah budget planner", path: "/umrah" },
      { text: "Flight search — verify the full itinerary and seller terms", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "Compare flight options for your dates and passengers",
      body: "An optional search starting point, not a promise of every multi-city combination or seller. Verify the full itinerary, baggage, payment total and connection protection with the carrier or authorized seller; a search result is not a ticket or proof of savings.",
    },
  },

  {
    id: "blog-19",
    slug: "ramadan-umrah-itikaf-guide-bangladesh-booking-budget",
    title: "Ramadan 1448 Umrah & I'tikaf Guide from Bangladesh (2027): Dates, Season Deadlines and Who Can Register",
    summary: "Ramadan 1448 is expected to begin on Monday 8 February 2027, and the Ministry of Hajj and Umrah closes Umrah visa issuance on 9 March 2027, entry on 23 March and departure on 7 April. Checked on 19 October 2026 against the Umm al-Qura calendar, the Ministry's 1448 season calendar and the Authority's own I'tikaf announcements, this guide separates the dates you can plan on from the permit nobody should promise you — the published I'tikaf conditions have been aimed at citizens and residents, not visitors on an Umrah visa.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    references: [
      {
        name: "Umm al-Qura Calendar — Annual reference 1448 AH (1 Ramadan 1448 = Monday 8 February 2027)",
        nameBn: "উম্মুল কুরা ক্যালেন্ডার — ১৪৪৮ হিজরি বার্ষিক রেফারেন্স (১ রমজান ১৪৪৮ = সোমবার ৮ ফেব্রুয়ারি ২০২৭)",
        url: "https://www.ummulqura.org.sa/en/annual-reference",
      },
      {
        name: "Ministry of Hajj and Umrah — Umrah Season Calendar for 1448 AH: visa issuance to 1 Shawwal (9 March 2027), entry to 15 Shawwal (23 March), departure by 30 Shawwal (7 April)",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — ১৪৪৮ হিজরি ওমরাহ সিজন ক্যালেন্ডার: ভিসা ১ শাওয়াল (৯ মার্চ ২০২৭), প্রবেশ ১৫ শাওয়াল (২৩ মার্চ), প্রস্থান ৩০ শাওয়াল (৭ এপ্রিল)",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH",
      },
      {
        name: "Saudi Press Agency — I'tikaf registration at the Two Holy Mosques opens 3 Ramadan 1447 (20 February 2026): 20–30 Ramadan, portal or Nafath, capacity review, SMS nomination",
        nameBn: "সৌদি প্রেস এজেন্সি — ৩ রমজান ১৪৪৭ (২০ ফেব্রুয়ারি ২০২৬) থেকে দুই হারাম মসজিদে ইতিকাফ নিবন্ধন: ২০–৩০ রমজান, পোর্টাল বা Nafath, আসন যাচাই, এসএমএস মনোনয়ন",
        url: "https://spa.gov.sa/en/N2518728",
      },
      {
        name: "Saudi Press Agency — I'tikaf permit service described by the Authority (5 March 2025): 18+, citizens or residents with valid residency, free of charge, awareness video, Arabic/English/Urdu",
        nameBn: "সৌদি প্রেস এজেন্সি — কর্তৃপক্ষের বর্ণিত ইতিকাফ পারমিট সেবা (৫ মার্চ ২০২৫): ১৮+, নাগরিক বা বৈধ ইকামাধারী বাসিন্দা, বিনামূল্যে, সচেতনতা ভিডিও, আরবি/ইংরেজি/উর্দু",
        url: "https://spa.gov.sa/en/N2275662",
      },
      {
        name: "Saudi Press Agency — parallel I'tikaf registration announcement for the Prophet's Mosque in Madinah, Ramadan 1447",
        nameBn: "সৌদি প্রেস এজেন্সি — মদিনার মসজিদে নববীর জন্য সমান্তরাল ইতিকাফ নিবন্ধন ঘোষণা, রমজান ১৪৪৭",
        url: "https://spa.gov.sa/en/N2518742",
      },
      {
        name: "Sahih al-Bukhari 1782 — \"Perform Umrah when Ramadan comes, for Umrah in Ramadan is equal to Hajj (in reward)\", or words to that effect",
        nameBn: "সহীহ বুখারি ১৭৮২ — “রমজান এলে ওমরাহ কর, রমজানের ওমরাহ হজের সমান (সওয়াবে)”, অথবা এর কাছাকাছি কথায়",
        url: "https://sunnah.com/bukhari:1782",
      },
      {
        name: "Saudi Railways (SAR) — Haramain High-Speed Railway timetable, booking portal and accessibility terms",
        nameBn: "সৌদি রেলওয়ে (SAR) — হারামাইন হাই-স্পিড রেলওয়ের সময়সূচি, বুকিং পোর্টাল ও অ্যাক্সেসিবিলিটি শর্ত",
        url: "https://sar.hhr.sa/en",
      },
      {
        name: "General Authority for the Care of the Two Holy Mosques — I'tikaf e-service registration portal named in the announcements (login required; not tested)",
        nameBn: "দুই হারাম মসজিদের তত্ত্বাবধায়ন কর্তৃপক্ষ — ঘোষণায় উল্লিখিত ইতিকাফ ই-সেবা নিবন্ধন পোর্টাল (লগইন প্রয়োজন; পরীক্ষা করা হয়নি)",
        url: "https://eservices.alharamain.gov.sa/login",
      },
    ],
    internalLinks: [
      { text: "Ihram & Miqat Rules for Flights from Bangladesh", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "Nusuk App, Visa & Rawdah Permit Guide", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Complete DIY Umrah & 10-Day BDT Budget Guide", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Bangladeshi Halal Food, Suhoor & Iftar Guide", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Ramadan crowds, separated family, no signal?", body: "An optional Saudi data eSIM lets you reach your group after Taraweeh if you keep the same numbers and test the connection before you rely on it. Coverage, speed and device compatibility must be confirmed by the provider — a data plan does not replace an agreed meeting point." }
  },
  {
    id: "blog-20",
    slug: "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",
    title: "Ihram & Miqat Rules for Flights from Bangladesh (2026): Direct to Jeddah, Gulf Transit or Madinah First",
    summary: "Where exactly do you enter Ihram when flying from Dhaka? Checked on 19 October 2026 against the Saudi Ministry of Hajj and Umrah's Miqat page and its official Ihram guide, this explains the published boundary rule, why Jeddah airport is not a place for entering Ihram, how the point parallel to the Miqat works on a connecting route, why a Madinah-first flight needs no Ihram on board, and what the Ministry says happens if the boundary is crossed without Ihram.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    references: [
      {
        name: "Ministry of Hajj and Umrah — Miqat locations, the air-travel rule, distances and the return/Fidyah sequence (page stamp 18 October 2026)",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — মিকাতের স্থান, আকাশপথের বিধান, দূরত্ব এবং ফিরে যাওয়া/ফিদইয়ার ক্রম (পেজ স্ট্যাম্প ১৮ অক্টোবর ২০২৬)",
        url: "https://haj.gov.sa/en/Umrah/Miqaats",
      },
      {
        name: "Ministry of Hajj and Umrah — Ihram Awareness Guide (English PDF, G07_EN_V3): intention and Talbiyah, garments, prohibitions, categories of pilgrims, airline announcement practice",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — ইহরাম সচেতনতা গাইড (ইংরেজি পিডিএফ, G07_EN_V3): নিয়ত ও তালবিয়া, পোশাক, নিষেধাজ্ঞা, যাত্রীর শ্রেণি, বিমানের ঘোষণা",
        url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Ihram-Guide/English/en-ihram-guide.pdf",
      },
      {
        name: "Sahih al-Bukhari 1526 — Ibn Abbas on the Mawaqit appointed by the Prophet, for residents and for those who pass them",
        nameBn: "সহিহ বুখারি ১৫২৬ — ইবনে আব্বাস (রা.): রাসূলুল্লাহ (সা.) নির্ধারিত মাওয়াকিত, বাসিন্দা ও পথ অতিক্রমকারীদের জন্য",
        url: "https://sunnah.com/bukhari:1526",
      },
      {
        name: "Nusuk — Umrah Journey: Ihram as the first step (intention and Talbiyah)",
        nameBn: "নুসুক — ওমরাহ জার্নি: প্রথম ধাপ ইহরাম (নিয়ত ও তালবিয়া)",
        url: "https://umrah.nusuk.sa/Journey",
      },
      {
        name: "Nusuk Hajj — Hajj rituals: intention for Ihram when the aircraft approaches the Miqat, and recommended pre-Ihram acts",
        nameBn: "নুসুক হজ — হজের ইবাদত: বিমান মিকাতের কাছে এলে ইহরামের নিয়ত এবং ইহরামের আগের সুন্নত কাজ",
        url: "https://hajj.nusuk.sa/nusuk/hajj-rituals",
      },
      {
        name: "Jordan General Iftaa Department, Fatwa 2982 (29 September 2014) — wearing Ihram garments before the flight and making the intention at the point parallel to the Miqat",
        nameBn: "জর্ডান জেনারেল ইফতা বিভাগ, ফতোয়া ২৯৮২ (২৯ সেপ্টেম্বর ২০১৪) — উড়ানের আগে ইহরামের কাপড় এবং মিকাতের সমান্তরাল বিন্দুতে নিয়ত",
        url: "https://aliftaa.jo/research-fatwa-english/2982/A-Pilgrim-Traveling-by-Plane-Assumes-Ihram-upon-Reaching-the-Miqat",
      },
    ],
    internalLinks: [
      { text: "Umrah Rules for Bangladeshi Women: Mahram, Visa & Ihram Clothing", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "Complete DIY Umrah & 10-Day BDT Budget Guide", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dhaka to Jeddah & Madinah Open-Jaw Flight Comparison", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Landing at Jeddah in Ihram with family and luggage?", body: "Compare an optional private sedan or family minivan from Jeddah Arrivals to your Makkah hotel. Vehicle size, luggage capacity, meet-and-greet and availability must be confirmed with the provider before you rely on it — a transfer does not change when or where you enter Ihram." }
  },
  {
    id: "blog-21",
    slug: "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",
    title: "Zamzam, Dates & Gold: What You Can Actually Bring Back to Bangladesh (2026)",
    summary: "Checked on 19 October 2026 against the Madinah airport operator, Saudia's conditions of carriage, the Ministry of Hajj and Umrah's Zamzam guidance, Dhaka airport customs and the NBR's 2025 baggage rules: one sealed 5-litre Zamzam bottle at SAR 12.50, no published kilogram allowance for dates (a personal-use test instead), and 100 g of gold ornaments or 200 g of silver once a calendar year, with a 117 g declared bar cap.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    internalLinks: [
      { text: "Dhaka Airport Pre-Departure & Baggage Hub", path: "/pre-departure" },
      { text: "Ihram & Miqat Rules for Flights from Bangladesh", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "Dhaka to Jeddah & Madinah Open-Jaw Flight Comparison", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Complete DIY Umrah & 10-Day BDT Budget Guide", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Returning with 46 kg suitcases and a Zamzam box?", body: "Compare an optional larger vehicle from your Makkah or Madinah hotel to the airport so the boxes and suitcases fit in one trip. Seats, luggage capacity and availability must be confirmed with the provider — a vehicle does not change the airline's Zamzam or baggage rules." },
    references: [
      {
        name: "Tibah Airports (Madinah) — Zamzam Sale Point: SAR 12.50 per 5-litre bottle, passport required, one per purchase, carried separately, not in checked baggage",
        nameBn: "তিবাহ এয়ারপোর্টস (মদিনা) — জমজম বিক্রয়কেন্দ্র: ৫ লিটার বোতল ১২.৫০ রিয়াল, পাসপোর্ট প্রয়োজন, প্রতি ক্রয়ে একটি, আলাদাভাবে বহন, চেক-ইন লাগেজে নয়",
        url: "https://tibahairports.com/en-EN/airport-services-facilities/page/zamzam-sales-service-en",
      },
      {
        name: "Saudia — General Conditions of Carriage: one 5-litre Zamzam bottle from Jeddah or Madinah, counted in the checked allowance, extras as excess, no compensation for loss or delay",
        nameBn: "সৌদিয়া — জেনারেল কন্ডিশনস অব ক্যারেজ: জেদ্দা বা মদিনা থেকে একটি ৫ লিটার জমজম, চেক-ইন ছাড়ের ভেতরে গণ্য, অতিরিক্তে এক্সেস, হারানো বা দেরিতে ক্ষতিপূরণ নেই",
        url: "https://www.saudia.com/information/terms-and-conditions/general-conditions-of-carriage",
      },
      {
        name: "Saudi Gazette — Ministry of Hajj and Umrah guidance on carrying Zamzam: authorised airport sales points, designated belts, not in checked luggage, one bottle, Umrah visa or Nusuk permit",
        nameBn: "সৌদি গেজেট — জমজম বহনে হজ ও ওমরাহ মন্ত্রণালয়ের নির্দেশনা: বিমানবন্দরের অনুমোদিত কেন্দ্র, নির্ধারিত বেল্ট, লাগেজে নয়, একটি বোতল, ওমরাহ ভিসা বা নুসুক পারমিট",
        url: "https://saudigazette.com.sa/article/650555",
      },
      {
        name: "Hazrat Shahjalal International Airport — Customs: duty-free list (100 g gold, 200 g silver, 12 of a type), gold-bar duty, 117 g cap, once per year, confiscation, commercial quantities seized (SRO 261-Act/2025)",
        nameBn: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর — কাস্টমস: শুল্কমুক্ত তালিকা (১০০ গ্রাম স্বর্ণ, ২০০ গ্রাম রুপা, একই ধরনের ১২টি), স্বর্ণবারের শুল্ক, ১১৭ গ্রাম সীমা, বছরে একবার, জব্দ, বাণিজ্যিক পরিমাণ আটক (এসআরও ২৬১-অ্যাক্ট/২০২৫)",
        url: "https://www.hsia.gov.bd/content-details/10/Customs",
      },
      {
        name: "National Board of Revenue via BSS — 2025 baggage rules: 100 g gold or 200 g silver per calendar year, one 10-tola bar at Tk 5,000/tola, declaration mandatory before leaving the customs hall",
        nameBn: "জাতীয় রাজস্ব বোর্ড, বিএসএস সূত্রে — ২০২৫ ব্যাগেজ বিধি: ক্যালেন্ডার বছরে ১০০ গ্রাম স্বর্ণ বা ২০০ গ্রাম রুপা, ১০ তোলার একটি বার প্রতি তোলায় ৫,০০০ টাকা, কাস্টমস হল ছাড়ার আগে ঘোষণা বাধ্যতামূলক",
        url: "https://www.bssnews.net/others/288568",
      },
      {
        name: "Dhaka Tribune — Biman Zamzam delivery delay on a Madinah–Dhaka flight (October 2026) and the airline's response",
        nameBn: "ঢাকা ট্রিবিউন — মদিনা–ঢাকা ফ্লাইটে বিমানের জমজম সরবরাহে দেরি (অক্টোবর ২০২৬) ও এয়ারলাইন্সের প্রতিক্রিয়া",
        url: "https://www.dhakatribune.com/bangladesh/421147/",
      },
      {
        name: "National Board of Revenue — Bangladesh Customs Tariff, Chapter 8: dried dates (HS 0804.10.21/29) at 25% customs duty when assessed as a consignment",
        nameBn: "জাতীয় রাজস্ব বোর্ড — বাংলাদেশ কাস্টমস ট্যারিফ, অধ্যায় ৮: শুকনো খেজুর (এইচএস ০৮০৪.১০.২১/২৯) চালান হিসেবে গণ্য হলে ২৫% শুল্ক",
        url: "https://nbr.gov.bd/uploads/tariff_schedule/Chapter-8.pdf",
      },
      {
        name: "Tibah Airports (Madinah) — Tax Refunds: Global Blue desk in the main terminal",
        nameBn: "তিবাহ এয়ারপোর্টস (মদিনা) — ট্যাক্স রিফান্ড: মেইন টার্মিনালে গ্লোবাল ব্লু ডেস্ক",
        url: "https://tibahairports.com/en-EN/airport-services-facilities/page/tax-refunds-en",
      },
      {
        name: "Saudi Gazette — tourist VAT refund scheme launch: 15% VAT, SAR 500 minimum per retailer, unused goods, 90-day export, verification points at Riyadh, Jeddah and Dammam",
        nameBn: "সৌদি গেজেট — পর্যটক ভ্যাট ফেরত স্কিমের সূচনা: ১৫% ভ্যাট, প্রতি বিক্রেতায় ৫০০ রিয়াল, অব্যবহৃত পণ্য, ৯০ দিনে রপ্তানি, রিয়াদ/জেদ্দা/দাম্মামে যাচাই কেন্দ্র",
        url: "https://saudigazette.com.sa/article/653942",
      },
    ],
  },
  {
    id: "blog-22",
    slug: "bangladeshi-halal-food-guide-makkah-madinah-budget-meals",
    title: "Bangladeshi & Pakistani Food in Makkah & Madinah (2026): Where to Eat and How to Budget Honestly",
    summary: "Checked on 19 October 2026 against the SFDA's halal statements, the Balady municipal health-certificate service, WHO food-safety guidance, the official Al Baik branch and menu pages, BinDawood's store locator and a June 2026 Daily Star report: halal is the national baseline, hygiene is a local question, the documented South Asian food streets in Makkah are Hijra Road and Ibrahim Khaleel Road, and no per-plate price is printed because no kitchen publishes one that can be re-checked.",
    category: "Hajj & Umrah",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Umrah with Elderly Parents: Wheelchair & Medical Guide", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Complete DIY Umrah 10-Day BDT Budget Breakdown", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Zamzam, Dates & Gold: Bangladesh Customs Rules", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Ramadan Suhoor, Iftar and Taraweeh Crowd Tips", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Using maps and delivery apps while you eat your way around the Haram",
      body: "An optional Saudi Arabia eSIM makes it easier to open a branch map pin or a delivery app without hunting for hotel Wi-Fi. Coverage and speed depend on the network on the day, and an app only helps if it shows your hotel address — it changes no restaurant's price or the customs rules for food you carry home.",
    },
    references: [
      {
        name: "Saudi Food and Drug Authority — Halal Center: certification, audits and the halal standards applied in the Kingdom",
        nameBn: "সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ — হালাল সেন্টার: সনদ, অডিট ও রাজ্যে প্রযোজ্য হালাল মান",
        url: "https://www.sfda.gov.sa/en/halal",
      },
      {
        name: "Saudi Gazette — SFDA statement (5 January 2023): all food sold in the Kingdom is halal",
        nameBn: "সৌদি গেজেট — এসএফডিএ বিবৃতি (৫ জানুয়ারি ২০২৩): রাজ্যে বিক্রি হওয়া সব খাবার হালাল",
        url: "https://saudigazette.com.sa/article/628636",
      },
      {
        name: "U.S. International Trade Administration — Saudi Arabia prohibited and restricted imports: alcohol, pork and pork products (page last published 11 May 2026)",
        nameBn: "মার্কিন আন্তর্জাতিক বাণিজ্য প্রশাসন — সৌদি আরবে নিষিদ্ধ আমদানি: মদ, শূকরের মাংস ও তার পণ্য (সর্বশেষ প্রকাশ ১১ মে ২০২৬)",
        url: "https://www.trade.gov/country-commercial-guides/saudi-arabia-prohibited-and-restricted-imports",
      },
      {
        name: "Balady (Ministry of Municipalities and Housing) — health certificates for food and public-health workers, with Makkah and Madinah in the health-education programme",
        nameBn: "বালাদি (পৌর ও আবাসন মন্ত্রণালয়) — খাদ্য ও জনস্বাস্থ্য প্রতিষ্ঠানের কর্মীদের স্বাস্থ্যসনদ, মক্কা ও মদিনা স্বাস্থ্য-শিক্ষা কর্মসূচিতে",
        url: "https://balady.gov.sa/en/services/issuance-health-certificate",
      },
      {
        name: "World Health Organization — Five Keys to Safer Food",
        nameBn: "বিশ্ব স্বাস্থ্য সংস্থা — নিরাপদ খাবারের পাঁচ নিয়ম",
        url: "https://www.who.int/activities/promoting-safe-food-handling",
      },
      {
        name: "The Daily Star — 'Where Chittagong meets Makkah' (3 June 2026): Bangladeshi kitchens on Hijra Road and Ibrahim Khaleel Road, signage, dishes and the Misfalah street economy",
        nameBn: "দ্য ডেইলি স্টার — 'হোয়ার চিটাগং মিটস মক্কা' (৩ জুন ২০২৬): হিজরা রোড ও ইব্রাহিম খলিল রোডের বাংলাদেশি রেস্তোরাঁ, সাইনবোর্ড, খাবার ও মিসফালাহর বাজার",
        url: "https://www.thedailystar.net/slow-reads/big-picture/news/where-chittagong-meets-makkah-4189471",
      },
      {
        name: "ALBAIK — official branch list for Makkah and Madinah, each branch linked to a map pin",
        nameBn: "আল বাইক — মক্কা ও মদিনার অফিশিয়াল শাখা-তালিকা, প্রতিটি শাখা ম্যাপ পিনে সংযুক্ত",
        url: "https://www.albaik.com/branches",
      },
      {
        name: "ALBAIK — official menu (items published, prices not published)",
        nameBn: "আল বাইক — অফিশিয়াল মেনু (আইটেম প্রকাশিত, দাম প্রকাশিত নয়)",
        url: "https://www.albaik.com/menu",
      },
      {
        name: "BinDawood — store locator: Makkah (Abraj Al Bait, Jabal Omar, Al Kakiyyah, Azizia) and Madinah (Taiba, Al Anwar, Al Hijra, Rotana, Al Jammat)",
        nameBn: "বিনদাউদ — স্টোর লোকেটর: মক্কা (আবরাজ আল বাইত, জাবাল ওমর, আল কাকিয়্যাহ, আজিজিয়া) ও মদিনা (তাইবা, আল আনোয়ার, আল হিজরা, রোটানা, আল জাম্মাত)",
        url: "https://bindawood.sa/en/store_locations/",
      },
      {
        name: "BinDawood Holding — 26 locations, 'Pilgrim's Brand', branch directory for Makkah and Madinah",
        nameBn: "বিনদাউদ হোল্ডিং — ২৬টি লোকেশন, 'পিলগ্রিমস ব্র্যান্ড', মক্কা ও মদিনার শাখা-তালিকা",
        url: "https://www.bindawoodholding.com/bindawood-supermarkets/",
      },
    ],
  },
  {
    id: "blog-23",
    slug: "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide",
    title: "Makkah, Madinah, Badr & Taif Ziyarah Guide (2026): Verified Sites, Opening Hours and How to Book a Car Honestly",
    summary: "Checked on 19 October 2026 against the Hira district site, two SPA releases, Visit Saudi, Saudipedia, the Madinah bus operator and the Ministry of Tourism. The Hira museums publish three different schedules and all three are printed; the Quba hadith is Ibn Majah 1412, Hasan; the Madinah bus is SR 90 for 24 hours; Badr is about 150 km west. No car tariff is published anywhere, so the guide prints none and teaches the reader to fix the total, the hours and the stops first.",    category: "Ziyarah & Stopovers",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    references: [
      { name: "Hira Cultural District — hours, ticketed experiences, ticket link", nameBn: "হেরা কালচারাল ডিস্ট্রিক্ট — সময়, টিকিট, লিংক", url: "https://hiradistrict.com/en/" },
      { name: "SPA, 31 Jul 2026 — museums 24 h except Friday 07:00–15:30", nameBn: "সৌদি প্রেস এজেন্সি, ৩১ জুলাই ২০২৬ — শুক্রবার ০৭:০০–১৫:৩০ বাদে ২৪ ঘণ্টা", url: "https://www.spa.gov.sa/en/w2609834" },
      { name: "Visit Saudi — Revelation Exhibition, from SAR 25, daily 07:30–23:30", nameBn: "Visit Saudi — রেভেলেশন এক্সিবিশন, ২৫ রিয়াল থেকে", url: "https://www.visitsaudi.com/en/makkah/attractions/revelation-exhibition" },
      { name: "Sunan Ibn Majah 1412 — Quba hadith, Hasan (Darussalam)", nameBn: "সুনান ইবনে মাজাহ ১৪১২ — কুবার হাদিস, হাসান", url: "https://sunnah.com/ibnmajah:1412" },
      { name: "Visit Saudi — Masjid Quba, 3 km walkway, no booking", nameBn: "Visit Saudi — মসজিদে কুবা, ৩ কিমি পথ", url: "https://www.visitsaudi.com/en/madinah/attractions/masjid-quba-in-madinah" },
      { name: "Visit Saudi — Masjid al-Qiblatain, 3.8 km north-west", nameBn: "Visit Saudi — মসজিদে কিবলাতাইন, ৩.৮ কিমি", url: "https://www.visitsaudi.com/en/madinah/attractions/masjid-al-qiblatain-in-madinah" },
      { name: "Visit Saudi — Uhud Mountain and battle site", nameBn: "Visit Saudi — উহুদ পাহাড় ও যুদ্ধস্থল", url: "https://www.visitsaudi.com/en/madinah/attractions/uhud-mountain-in-madinah" },
      { name: "Visit Saudi — Badr Battle Site, about 150 km west", nameBn: "Visit Saudi — বদর যুদ্ধস্থল, প্রায় ১৫০ কিমি পশ্চিমে", url: "https://www.visitsaudi.com/en/madinah/attractions/badr-battle-site" },
      { name: "City Sightseeing Al-Madinah — fares, routes, stops, 920014044", nameBn: "City Sightseeing Al-Madinah — ভাড়া, রুট, স্টপ, ৯২০০১৪০৪৪", url: "https://csmadinah.com/" },
      { name: "SPA, 18 Jul 2026 — Al-Hada cable car specifications", nameBn: "সৌদি প্রেস এজেন্সি, ১৮ জুলাই ২০২৬ — আল-হাদা কেবল কার", url: "https://www.spa.gov.sa/en/N2636455" },
      { name: "Visit Saudi — Al-Hada and the Al-Kar Tourist Village", nameBn: "Visit Saudi — আল-হাদা ও আল-কার ট্যুরিস্ট ভিলেজ", url: "https://www.visitsaudi.com/en/destinations/taif/attractions/alhada-mountain-in-taif" },
      { name: "Saudipedia — Qarn al-Manazil (as-Sayl al-Kabir)", nameBn: "সৌদিপিডিয়া — কারন আল-মানাজিল", url: "https://saudipedia.com/en/qarn-al-manazil" },
      { name: "Saudipedia — Taif Governorate, Ibn Abbas mosque and Masjid Addas", nameBn: "সৌদিপিডিয়া — তায়েফ গভর্নরেট, ইবনে আব্বাস ও মসজিদে আদাস", url: "https://saudipedia.com/en/taif-governorate" },
      { name: "Jannat al-Mu'alla — north of the Haram, 1925–26 demolition", nameBn: "জান্নাতুল মুআল্লা — হারামের উত্তরে, ১৯২৫–২৬ ভাঙন", url: "https://en.wikipedia.org/wiki/Jannat_al-Mu%27alla" },
      { name: "Ministry of Tourism — tourists' rights and guide licensing", nameBn: "ট্যুরিজম মন্ত্রণালয় — পর্যটকদের অধিকার ও গাইড লাইসেন্স", url: "https://cdn.mt.gov.sa/files/A360/TouristsRights-EN.pdf" },
    ],
    internalLinks: [
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Umrah with Elderly Parents: Wheelchair & Medical Guide", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Complete DIY Umrah 10-Day BDT Budget Breakdown", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Zamzam, Dates & Gold: Bangladesh Customs Rules", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Bangladeshi Halal Food Guide for Makkah & Madinah", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Pre-book a car only when the total, the hours and the stops are written down", body: "An optional pre-booked transfer gives you a fixed price before you land, which is the same discipline this guide asks of any car you hire for Ziyarah. Vehicle class, luggage space, waiting time, cancellation terms and availability must be confirmed with the supplier — a transfer booking does not change any site's opening hours or any rule about ihram." }
  },
  {
    id: "blog-24",
    slug: "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide",
    title: "Umrah + Dubai 10-Day Combo Trip from Dhaka (2026): How to Combine Makkah, Madinah & UAE on One Multi-City Ticket",
    summary: "Why pay for two separate international trips from Bangladesh when you can fulfill your family's Umrah in Makkah and Madinah and enjoy a 3-day halal family holiday in Dubai (Burj Khalifa, Desert Safari, and Abu Dhabi Mosque) on a single Multi-City air ticket? Verified against Saudi Nusuk (nusuk.sa) and UAE ICP/GDRFA (u.ae / gdrfad.gov.ae) visa regulations, this step-by-step combo itinerary shows how flying Dhaka -> Jeddah/Madinah -> Dubai -> Dhaka saves BDT 35,000+ per person on airfare.",
    category: "Ziyarah & Stopovers",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "Abu Dhabi Sheikh Zayed Mosque Day Trip Guide from Dubai", path: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide" },
      { text: "96-Hour Saudi Stopover Visa Guide for Bangladeshis", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "Dubai Destination Itinerary & UAE Visa Guide", path: "/destinations/dubai-guide" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" },
      { text: "Dubai & UAE Tourist Visa Checklist", path: "/visa/dubai-visa" },
      { text: "Dhaka to Dubai Flight Schedule & Fares", path: "/flights/dhaka-dubai" },
      { text: "Where to Stay in Dubai: Metro & Marina Hotels", path: "/hotels/dubai-hotels" },
      { text: "Dubai 5-Day Trip Cost Calculator in BDT", path: "/costs/dubai-costs" },
      { text: "Dubai Desert Safari & Burj Khalifa Passes", path: "/experiences?region=asia&city=dubai-klook" }
    ],
    affiliateCTA: { provider: "klook", headline: "Compare Dubai Desert Safari, Burj Khalifa & Museum of the Future listings", body: "Check the selected date, total price, inclusions, ticket delivery and cancellation terms on Klook; compare with the attraction or operator before booking." }
  },
  {
    id: "blog-25",
    slug: "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide",
    title: "Abu Dhabi Sheikh Zayed Grand Mosque, Qasr Al Watan & Louvre Day Trip Guide from Dubai (2026 BDT Costs)",
    summary: "No Bangladeshi family trip or Umrah stopover in the UAE is complete without beholding the gleaming white Macedonian marble domes of the Sheikh Zayed Grand Mosque in Abu Dhabi. Located just 90 minutes south of Dubai, you can easily visit Abu Dhabi on a budget day trip without changing hotels. Verified against the official Sheikh Zayed Grand Mosque Centre (szgmc.gov.ae) and Dubai Roads & Transport Authority (rta.ae), this guide explains the AED 25 RTA E100/E101 intercity bus, free online mosque QR registration, strict modest dress codes, and Qasr Al Watan Presidential Palace tickets.",
    category: "Ziyarah & Stopovers",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Umrah + Dubai 10-Day Multi-City Combo Guide from Dhaka", path: "/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide" },
      { text: "Dubai Safari, Burj Khalifa & Abu Dhabi Passes Hub", path: "/experiences?region=asia&city=dubai-klook" },
      { text: "Compare Hotel Areas and Booking Terms in Bangkok, Kuala Lumpur & Dubai", path: "/blog/hotel-savings-guide-bangkok-kl-dubai" },
      { text: "Dubai & UAE Tourist Visa Checklist", path: "/visa/dubai-visa" },
      { text: "Dhaka to Dubai Flight Schedule & Fares", path: "/flights/dhaka-dubai" },
      { text: "Where to Stay in Dubai: Metro & Marina Hotels", path: "/hotels/dubai-hotels" },
      { text: "Dubai 5-Day Trip Cost Calculator in BDT", path: "/costs/dubai-costs" }
    ],
    affiliateCTA: { provider: "klook", headline: "Book Abu Dhabi Grand Mosque, Qasr Al Watan & Ferrari World Combo Tours", body: "Skip intercity bus queues with a roundtrip air-conditioned Abu Dhabi day tour from your Dubai hotel or instant Qasr Al Watan & Louvre e-tickets via Klook." }
  },
  {
    id: "blog-26",
    slug: "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide",
    title: "Malaysia Islamic Heritage & Halal Family Trail (2026): Putrajaya Pink Mosque, Islamic Arts Museum & KLCC Guide",
    summary: "Malaysia consistently ranks #1 on the Global Muslim Travel Index (GMTI) because every shopping mall, airport, and theme park features spotless prayer rooms (Surau) with Wudu facilities and 100% government-regulated JAKIM Halal dining. Verified against Tourism Malaysia (malaysia.travel), Department of Islamic Development Malaysia (islam.gov.my), and RapidKL (myrapid.com.my), this 5-day family guide covers the MYR 6 MRT trip to Putrajaya's Putra Mosque (Pink Mosque), the world-renowned Islamic Arts Museum Malaysia (IAMM), Masjid Negara, and Genting Highlands.",
    category: "Ziyarah & Stopovers",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Malaysia 5-Day Family Destination & e-Visa Guide", path: "/destinations/malaysia-guide" },
      { text: "Top 6 Budget-Friendly Family Destinations from Dhaka", path: "/blog/top-budget-family-destinations-from-dhaka" },
      { text: "Compare Hotel Areas and Booking Terms in Kuala Lumpur, Bangkok & Dubai", path: "/blog/hotel-savings-guide-bangkok-kl-dubai" },
      { text: "Malaysia eVisa & MDAC Arrival Card Checklist", path: "/visa/malaysia-visa" },
      { text: "Dhaka to Kuala Lumpur Flight Schedule & Fares", path: "/flights/dhaka-kuala-lumpur" },
      { text: "Where to Stay in KL: Hotel Neighborhoods", path: "/hotels/kuala-lumpur-hotels" },
      { text: "Malaysia 5-Day Trip Cost Calculator in BDT", path: "/costs/malaysia-costs" }
    ],
    affiliateCTA: { provider: "kkday", headline: "Compare KLIA Ekspres and Malaysia attractions on KKday", body: "Check current availability, validity, inclusions, total price, and cancellation terms for your dates before booking." }
  },
  {
    id: "blog-27",
    slug: "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide",
    title: "Europe, UK & USA Sightseeing for Bangladeshi Travelers (2026): Skip-the-Line Passes + Instant Saudi Stopover Umrah",
    summary: "Bangladeshi travelers and NRB families flying to London, Paris, Rome, Milan, Venice, or New York face two major opportunities: first, avoiding 2-to-3 hour ticket counter queues at iconic landmarks like the Louvre, Eiffel Tower, Tower of London, and Colosseum by pre-booking official Tiqets mobile passes; and second, unlocking an instant 1-Year Multiple-Entry Saudi e-Visa or Visa on Arrival using their valid US, UK, or Schengen visa to perform Umrah on the way! Verified against Saudi Unified Visa Platform (ksavisa.sa) and official museum regulations, here is your complete Western travel & Umrah bridge playbook.",
    category: "Ziyarah & Stopovers",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Browse Official Europe, UK & USA Skip-the-Line Passes (Tiqets Hub)", path: "/experiences?region=west" },
      { text: "96-Hour Saudi Stopover Visa & US/UK/Schengen Umrah Rules", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "Dual-Currency Card Endorsement ($18,000 Quota Guide)", path: "/blog/dual-currency-card-endorsement-bangladesh" }
    ],
    affiliateCTA: { provider: "tiqets", headline: "Book Instant Mobile Skip-the-Line Tickets for Paris, London, Rome & NYC (Tiqets)", body: "Secure guaranteed timed-entry QR passes for the Louvre, Eiffel Tower, London Eye, Colosseum, and Statue of Liberty with instant confirmation." }
  },
  {
    id: "blog-28",
    slug: "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah",
    title: "Shariah-Compliant Dual-Currency Cards in Bangladesh: Riba-Free Travel Card Guide (2026)",
    summary: "Many Bangladeshi Muslims preparing for Umrah, Hajj or a Halal family holiday want to book flights, Makkah and Madinah hotels and the Haramain High-Speed Train online without using an interest-bearing card. A Shariah-compliant dual-currency debit or prepaid card lets you spend your own endorsed travel-quota foreign exchange, while an Ujrah charge card substitutes a disclosed fee for a loan. Structures, fees and features differ by bank, so this checked guide explains how the two models work, the questions to ask each bank, the USD 300 single online-purchase rule that applies whoever issued the card, and three practical steps for using the card in Makkah and Madinah.",
    category: "Banking & Payments",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    references: [
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
      {
        name: "Bangladesh Bank — GFET Volume 1, Chapter 19: payment through international cards (USD 300 single online purchase)",
        nameBn: "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট (একবারে USD 300 online purchase)",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
      {
        name: "Bangladesh Bank — FE Circular Letter No. 05 (9 May 2024): RFCD cards may pay online at the actual amount",
        nameBn: "বাংলাদেশ ব্যাংক — FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD কার্ড প্রকৃত পরিমাণে online payment করতে পারে",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf",
      },
    ],
    internalLinks: [
      { text: "Complete $18,000 Passport Dollar Endorsement Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Bullet Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "No Card? Book Flights & Umrah Hotels in BDT via WhatsApp", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Money & Banking Hub: endorsement, cards, USD 300 rule and NOC", path: "/banking" },
      { text: "10-Day DIY Umrah Cost Calculator in BDT", path: "/umrah" },
      { text: "Dual-Currency Card Fee & Markup Calculator", path: "/tools/currency-converter" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Compare Dhaka–Jeddah & Madinah Flights with Your Islamic Card", body: "Check live Biman, Saudia, and Gulf carrier fares and pay directly with your endorsed Shariah-compliant dual-currency card." }
  },
  {
    id: "blog-29",
    slug: "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",
    title: "RFCD Account vs. Travel Quota in Bangladesh (2026): How to Handle the $300 Online-Payment Limit",
    summary: "Bangladesh Bank's general card rule caps a single online purchase on a travel-quota card at USD 300. For a larger documented flight or hotel payment, ask your bank before checkout; approval is the bank's decision. An RFCD card may pay online at the actual amount, but its account can hold only foreign cash brought back from travel—not remittances or foreign income. Checked 16 October 2026 against Bangladesh Bank GFET Chapter 19, FE Circular Letter No. 05, and EBL/SIBL RFCD terms.",
    category: "Banking & Payments",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    references: [
      {
        name: "Bangladesh Bank — GFET Volume 1, Chapter 19: Payment through International Cards",
        nameBn: "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
      {
        name: "Bangladesh Bank — FE Circular Letter No. 05 (9 May 2024): RFCD cards and online payment at actual",
        nameBn: "বাংলাদেশ ব্যাংক — FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD কার্ড ও প্রকৃত পরিমাণে online payment",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf",
      },
      {
        name: "Eastern Bank (EBL) — RFCD Account: deposits, FMJ window and no inward remittance",
        nameBn: "ইস্টার্ন ব্যাংক (EBL) — RFCD Account: জমা, FMJ সময়সীমা ও inward remittance নিষেধ",
        url: "https://www.ebl.com.bd/retail-deposit/EBL-RFCD-Account",
      },
      {
        name: "Social Islami Bank (SIBL) — RFCD Account: transfers and international card facility",
        nameBn: "সোশ্যাল ইসলামী ব্যাংক (SIBL) — RFCD Account: transfer ও আন্তর্জাতিক card facility",
        url: "https://www.siblbd.com/rfcd-account",
      },
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): travel entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
    ],
    internalLinks: [
      { text: "Money & Banking Hub: endorsement, cards, USD 300 rule and NOC", path: "/banking" },
      { text: "Passport Dollar Endorsement and Card Activation Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Cash vs. Card Abroad (choose local currency and avoid DCC)", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
      { text: "Shariah-Compliant Islamic Dual-Currency Cards for Umrah", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "No Card? Pay in BDT via bKash or Bank Transfer", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Dual-Currency Card Fee and Markup Calculator", path: "/tools/currency-converter" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Compare the Fare Before You Ask Your Bank", body: "Check the live flight price and exact checkout amount, then ask your card issuer about documented travel-payment approval before paying." }
  },
  {
    id: "blog-30",
    slug: "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",
    title: "How to Book Flights, Makkah Hotels & Airport Transfers in BDT (bKash / Bank Transfer, No Card Needed)",
    summary: "Not every Bangladeshi traveller has an endorsed dual-currency card ready when a cheap fare or a Haram-view hotel rate appears online. Waiting for a new card — or paying an unverified middleman — is not the only option: you can reserve international air tickets, Makkah/Madinah or Asian hotel vouchers and airport transfers in Bangladeshi Taka (BDT) through a local bank transfer, bKash or Nagad booking desk. This checked guide explains how a transparent BDT-assisted booking workflow works, what to verify before you pay, and what to keep for the Dhaka Airport immigration folder.",
    category: "Banking & Payments",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "6 min read",
    references: [
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
      {
        name: "Bangladesh Bank — GFET Volume 1, Chapter 19: payment through international cards (USD 300 single online purchase)",
        nameBn: "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট (একবারে USD 300 online purchase)",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
      {
        name: "Saudi Ministry of Hajj and Umrah — official FAQ (Umrah visa, permit and biometric answers)",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — অফিশিয়াল FAQ (উমরাহ ভিসা, পারমিট ও বায়োমেট্রিক)",
        url: "https://haj.gov.sa/en/FAQ",
      },
    ],
    internalLinks: [
      { text: "Money & Banking Hub: endorsement, cards, USD 300 rule and NOC", path: "/banking" },
      { text: "10-Day DIY Umrah Cost Calculator & Hotel Zones", path: "/umrah" },
      { text: "Dual-Currency Card Endorsement ($18,000 Quota Guide)", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration 5-Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Makkah & Madinah Hotel Zones & Haramain Train Guide", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dual-Currency Card Fee & Markup Calculator", path: "/tools/currency-converter" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Check Live Flight Prices First, Then Book by Card or BDT WhatsApp", body: "Compare real-time airline fares from Dhaka so you know the exact market price before booking." }
  },
  {
    id: "blog-31",
    slug: "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",
    title: "Cash SAR / USD vs. Dual-Currency Card Abroad: Choosing the Local Currency and Avoiding Money-Changer Traps",
    summary: "Should Bangladeshi pilgrims buy Saudi Riyals (SAR) in Dhaka or carry US Dollars (USD) to exchange in Makkah? And how much do travellers lose through airport money changers and POS Dynamic Currency Conversion (DCC)? Bangladesh Bank publishes no fixed DCC percentage — the prescribed rule is simply to choose the local currency at the terminal, so the markup you actually pay depends on the machine and the network. Checked against Bangladesh Bank FX rules and ground exchange practice in Makkah, Bangkok (SuperRich Pratunam) and Kuala Lumpur (Bukit Bintang), this is a practical Cash vs. Dual-Currency Card strategy from Dhaka.",
    category: "Banking & Payments",
    date: "September 27, 2026",
    updatedAt: "2026-10-19",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    references: [
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
      {
        name: "Bangladesh Bank — FEPD-2 Circular No. 01 (7 January 2026): passport endorsement fee by money changers capped at BDT 300",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬): মানি চেঞ্জারের passport endorsement fee সর্বোচ্চ BDT 300",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd-2/jan072026fepd-201e.pdf",
      },
      {
        name: "Bangladesh Bank — GFET Volume 1, Chapter 19: payment through international cards (choose local currency, USD 300 single online purchase)",
        nameBn: "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট (local currency বেছে নিন, একবারে USD 300 online purchase)",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
    ],
    internalLinks: [
      { text: "Money & Banking Hub: endorsement, cards, USD 300 rule and NOC", path: "/banking" },
      { text: "How to Get Dual-Currency Card Endorsement ($18,000 Quota)", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Shariah-Compliant Islamic Dual-Currency Cards for Umrah", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account vs. Regular Travel Quota ($300 Cap Fix)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "Bangladeshi Halal Food in Makkah & Madinah (SAR Meal Prices)", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "Dual-Currency Card Fee & Markup Calculator", path: "/tools/currency-converter" }
    ],
    affiliateCTA: { provider: "airalo", headline: "Get Instant Bank OTPs & Rate Checks Abroad with an eSIM", body: "Install an Airalo eSIM before departure so your mobile banking app and live currency calculator work the moment you land." }
  },
  {
    id: "blog-32",
    slug: "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide",
    title: "Thailand Official e-Visa from Bangladesh: Dhaka Documents, Bank Evidence & Application Checks (2026)",
    summary: "Bangladeshi applicants use Thailand's official e-Visa portal, but approval and processing time are not guaranteed. The Royal Thai Embassy Dhaka's public Tourist Visa TR checklist, last updated November 30, 2022, lists six-month bank statements and financial evidence of BDT 60,000 per person or BDT 120,000 per family; confirm current requirements on the live portal. Check the current government visa fee in the portal or Embassy schedule; bank/payment charges and optional agency fees are separate.",
    category: "Visa & Immigration",
    date: "September 27, 2026",
    updatedAt: "2026-10-14",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "3 min read",
    references: [
      {
        name: "Thailand e-Visa Portal — Ministry of Foreign Affairs",
        nameBn: "Thailand e-Visa পোর্টাল — পররাষ্ট্র মন্ত্রণালয়",
        url: "https://www.thaievisa.go.th/",
      },
      {
        name: "Thailand e-Visa — Tourist Visa requirements",
        nameBn: "Thailand e-Visa — Tourist Visa-এর প্রয়োজনীয়তা",
        url: "https://www.thaievisa.go.th/visa/tourist-visa",
      },
      {
        name: "Royal Thai Embassy Dhaka — Tourist Visa TR checklist (updated Nov 30, 2022)",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — Tourist Visa TR চেকলিস্ট (হালনাগাদ: ৩০ নভেম্বর ২০২২)",
        url: "https://dhaka.thaiembassy.org/en/publicservice/tourist-visa-tr?page=5d83296315e39c2540006a6c&menu=5d83296315e39c2540006a6d",
      },
      {
        name: "Royal Thai Embassy Dhaka — Consular Service Fee (updated September 2025)",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — কনস্যুলার সার্ভিস ফি (হালনাগাদ: সেপ্টেম্বর ২০২৫)",
        url: "https://dhaka.thaiembassy.org/en/content/consular-service-fee-updated-september-2025?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
      },
      {
        name: "Royal Thai Embassy Dhaka — Facilitation of E-Visa Payment",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — ই-ভিসা পেমেন্টের নির্দেশনা",
        url: "https://dhaka.thaiembassy.org/en/content/facilitation-ofe-visa-payment?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
      },
    ],
    internalLinks: [
      { text: "Thailand Visa Checklist & Fee Calculator", path: "/visa/thailand-visa" },
      { text: "Where to Eat Halal Food in Bangkok (Pratunam & Sukhumvit)", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration 5-Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Thailand 5-Day Trip Budget in BDT", path: "/costs/thailand-costs" },
      { text: "Dhaka to Bangkok Flight Schedule & Fares", path: "/flights/dhaka-bangkok" },
      { text: "Where to Stay in Bangkok: Hotel Neighborhoods", path: "/hotels/bangkok-hotels" }
    ],
    affiliateCTA: { provider: "klook", headline: "Compare Bangkok family activities and ticket options", body: "Browse relevant Bangkok activity listings and check the total, selected date, inclusions, pickup details where offered, and cancellation terms before booking." }
  },
  {
    id: "blog-33",
    slug: "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration",
    title: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide for Bangladeshi Passports (2026 — KLIA Immigration Rules)",
    summary: "Malaysia is one of the fastest and most family-friendly international destinations for Bangladeshi citizens, offering a 100% online 30-day Tourist e-Visa approved in just 2 to 4 business days with zero physical passport drop-off. However, landing at Kuala Lumpur International Airport (KLIA Terminal 1 or Terminal 2) requires two mandatory steps after your e-Visa is approved: submitting the free Malaysia Digital Arrival Card (MDAC) within 3 days before departure, and carrying printed return tickets, hotel vouchers, and sufficient USD/MYR funds for KLIA immigration inspection. Here is your verified 2026 step-by-step Malaysia e-Visa and MDAC playbook.",
    category: "Visa & Immigration",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Malaysia Islamic Heritage, Putrajaya Pink Mosque & Halal Guide", path: "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide" },
      { text: "Malaysia Visa Requirements & Checklist", path: "/visa/malaysia-visa" },
      { text: "Dhaka Airport Outbound Immigration 5-Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Malaysia 5-Day Trip Cost Breakdown in BDT", path: "/costs/malaysia-costs" },
      { text: "Dhaka Airport Pre-Departure Inspection Checklist", path: "/pre-departure" },
      { text: "Dual-Currency Card Fee & Markup Calculator", path: "/tools/currency-converter" },
      { text: "Dhaka to Kuala Lumpur Flight Schedule & Fares", path: "/flights/dhaka-kuala-lumpur" },
      { text: "Where to Stay in KL: Hotel Neighborhoods", path: "/hotels/kuala-lumpur-hotels" }
    ],
    affiliateCTA: { provider: "kkday", headline: "Book Malaysia Attraction Passes & KLIA Ekspres on KKday", body: "Pre-book KLIA Ekspres high-speed airport train, Petronas Twin Towers, and Genting Highlands cable car tickets before flying." }
  },
  {
    id: "blog-34",
    slug: "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia",
    title: "First International Trip on a Fresh Bangladeshi Passport (2026): The 3-Step Travel History Ladder",
    summary: "If you are holding a brand-new, blank Bangladeshi e-Passport with zero visas or stamps, applying directly for a Singapore, Schengen, UK, or US tourist visa without prior travel history often leads to a frustrating refusal under 'insufficient travel compliance.' Seasoned Bangladeshi travelers solve this Catch-22 using a proven 3-Step Travel History Ladder: starting with zero-risk Visa-on-Arrival countries (Nepal or the Maldives), stepping up to fast online Southeast Asian e-Visas (Malaysia and Thailand), and unlocking global destinations (Singapore, Dubai, Saudi Umrah, and Europe). Here is your complete 12-to-18 month passport-building roadmap with BDT budgets.",
    category: "Visa & Immigration",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Dhaka Airport Outbound Immigration 5-Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide", path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration" },
      { text: "Thailand Official e-Visa Guide (thaievisa.go.th)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "Singapore Tourist Visa Guide (Authorized Agents & LOI V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
      { text: "Malaysia eVisa & MDAC Arrival Card Checklist", path: "/visa/malaysia-visa" },
      { text: "Dhaka to Kuala Lumpur Flight Schedule & Fares", path: "/flights/dhaka-kuala-lumpur" },
      { text: "Where to Stay in KL: Hotel Neighborhoods", path: "/hotels/kuala-lumpur-hotels" },
      { text: "Malaysia 5-Day Trip Cost Calculator in BDT", path: "/costs/malaysia-costs" },
      { text: "Nepal On-Arrival Visa & Online Checklist", path: "/visa/nepal-visa" },
      { text: "Dhaka to Kathmandu Flight Schedule & Fares", path: "/flights/dhaka-kathmandu" },
      { text: "Where to Stay in Kathmandu & Pokhara", path: "/hotels/kathmandu-hotels" },
      { text: "Nepal 5-Day Trip Cost Calculator in BDT", path: "/costs/nepal-costs" },
      { text: "Maldives On-Arrival Visa & IMUGA Checklist", path: "/visa/maldives-visa" },
      { text: "Dhaka to Maldives Flight Schedule & Fares", path: "/flights/dhaka-maldives" },
      { text: "Where to Stay in Maldives: Local Island Stays", path: "/hotels/maldives-hotels" },
      { text: "Maldives 5-Day Trip Cost Calculator in BDT", path: "/costs/maldives-costs" },
      { text: "Dhaka Airport Pre-Departure Inspection Checklist", path: "/pre-departure" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Start Step 1: Check Dhaka to Kathmandu, Malé & Kuala Lumpur Fares", body: "Compare live roundtrip airfares from Dhaka and begin building your international travel history." }
  },
  {
    id: "blog-35",
    slug: "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide",
    title: "Singapore 4-Day Family & Budget Itinerary from Bangladesh (2026): MRT SimplyGo, Little India Halal Food & Sentosa Under BDT 85,000",
    summary: "Many Bangladeshi travelers assume Singapore is too expensive for a family holiday because Marina Bay luxury hotels cost BDT 45,000+ per night and metered airport taxis charge SGD 35. In reality, by tapping your endorsed Bangladeshi Dual-Currency Visa/Mastercard directly on Singapore MRT gates via SimplyGo (just SGD 2.10 / ~BDT 190 from Changi Airport to the city), staying near Little India (Mustafa Centre) or Kampong Glam (Sultan Mosque), and dining at MUIS Halal-certified Hawker Centres for SGD 6–8 (~BDT 550–730), you can complete an unforgettable 4-day Singapore trip from Dhaka for BDT 82,000 to BDT 95,000 per person—flights and visa included!",
    category: "Family & Budget",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Singapore Tourist Visa Guide (Authorized Agents & Form V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
      { text: "Singapore 4-Day Cost Calculator in BDT", path: "/costs/singapore-costs" },
      { text: "Dual-Currency Card Endorsement for MRT SimplyGo", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Top 6 Budget Family Destinations from Dhaka", path: "/blog/top-budget-family-destinations-from-dhaka" },
      { text: "Singapore Entry Visa & SG Arrival Card", path: "/visa/singapore-visa" },
      { text: "Dhaka to Singapore Flight Schedule & Fares", path: "/flights/dhaka-singapore" },
      { text: "Where to Stay in Singapore: MRT Hotel Guide", path: "/hotels/singapore-hotels" }
    ],
    affiliateCTA: { provider: "klook", headline: "Compare Gardens by the Bay, Universal Studios & Sentosa tickets", body: "Check the selected date, admission instructions, inclusions, total price, and cancellation terms on Klook and with the attraction before booking." }
  },
  {
    id: "blog-36",
    slug: "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
    title: "Bumrungrad & Bangkok Hospital Medical Checkup Guide from Bangladesh (2026): Appointment Booking, BDT Costs & Halal Stays",
    summary: "Every year, tens of thousands of Bangladeshi patients and families travel from Dhaka to Bangkok for comprehensive annual health checkups, cardiac evaluations, oncology second opinions, and gastrointestinal diagnostics at Bumrungrad International Hospital (Sukhumvit Soi 3) and Bangkok Hospital (New Petchaburi Road). This verified 2026 medical travel playbook explains how to book a direct hospital appointment online with free Bangla interpreter support, whether to apply for a Thai Tourist Visa (TR) or Medical Visa (MT) on thaievisa.go.th, exact health checkup package prices in THB and BDT, and the closest wheelchair-friendly Halal hotels.",
    category: "Family & Budget",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "Thailand Official e-Visa Guide (thaievisa.go.th Upload Rules)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "Where to Eat Halal Food in Bangkok (Pratunam & Sukhumvit Soi 3)", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "Dual-Currency Card Endorsement & Medical Quota Rules", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "No Card? Book Bangkok Flights & Hotels in BDT via WhatsApp", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Thailand e-Visa & Dhaka Embassy Requirements", path: "/visa/thailand-visa" },
      { text: "Dhaka to Bangkok Flight Schedule & Fares", path: "/flights/dhaka-bangkok" },
      { text: "Where to Stay in Bangkok: Hotel Neighborhoods", path: "/hotels/bangkok-hotels" },
      { text: "Thailand 5-Day Trip Cost Calculator in BDT", path: "/costs/thailand-costs" }
    ],
    affiliateCTA: { provider: "kiwitaxi", headline: "Pre-Book a Private Wheelchair-Friendly Minivan from Suvarnabhumi Airport", body: "Arriving in Bangkok with elderly parents for a checkup? Pre-book a private door-to-door minivan from BKK Airport straight to your Sukhumvit Soi 3 hotel." }
  },
  {
    id: "blog-37",
    slug: "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide",
    title: "Travel eSIM & Schengen Travel Insurance Guide for Bangladeshi Travelers (2026 — Umrah, Asia & Europe)",
    summary: "Reliable mobile data and verified travel medical insurance are essential preparations before flying from Dhaka. Review travel eSIM options versus roaming, key Oman plan checks, EUR 30,000 Schengen visa insurance requirements and family medical exclusions.",
    category: "Family & Budget",
    date: "September 27, 2026",
    updatedAt: "2026-10-16",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    references: [
      {
        name: "Airalo — Oman eSIM product specifications (Omantel network)",
        nameBn: "Airalo — ওমান eSIM প্রোডাক্ট বিবরণ (Omantel নেটওয়ার্ক)",
        url: "https://www.airalo.com/oman-esim",
      },
      {
        name: "Airalo Help Center — Installation and validity activation timing",
        nameBn: "Airalo হেল্প সেন্টার — ইনস্টলেশন ও মেয়াদ শুরুর সময় সংক্রান্ত নিয়ম",
        url: "https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/when-can-i-install-my-esim/EQOCBMXDPSB2",
      },
      {
        name: "Airalo Help Center — Device compatibility and carrier unlock requirements",
        nameBn: "Airalo হেল্প সেন্টার — ডিভাইসের সামঞ্জস্য ও ক্যারিয়ার আনলক শর্তাবলী",
        url: "https://www.airalo.com/help/about-airalo/NFHQSUXFCZOM/what-devices-support-esim/D2N6OZSVVM9W",
      },
      {
        name: "Apple Support — Using Dual SIM with an eSIM for separate data and voice lines",
        nameBn: "অ্যাপল সাপোর্ট — ডাটা ও ভয়েস লাইনের জন্য ডুয়াল সিম ও eSIM ব্যবহার",
        url: "https://support.apple.com/en-us/109317",
      },
      {
        name: "Grameenphone — International SMS Roaming terms and incoming SMS",
        nameBn: "গ্রামীণফোন — আন্তর্জাতিক এসএমএস রোমিং শর্ত ও ইনকামিং বার্তা",
        url: "https://roaming.grameenphone.com/personal/services/roaming/sms-roaming",
      },
      {
        name: "Airalo — Middle East and North Africa (MENA) regional eSIM coverage",
        nameBn: "Airalo — মধ্যপ্রাচ্য ও উত্তর আফ্রিকা (MENA) রিজিওনাল eSIM কভারেজ",
        url: "https://www.airalo.com/middle-east-and-north-africa-esim",
      },
      {
        name: "Yesim — Oman data eSIM plan details and activation terms",
        nameBn: "Yesim — ওমান ডাটা eSIM প্ল্যানের বিবরণ ও অ্যাক্টিভেশন শর্ত",
        url: "https://yesim.app/country/oman/",
      },
      {
        name: "EUR-Lex — Regulation (EC) No 810/2009 (EU Visa Code), Article 15",
        nameBn: "EUR-Lex — রেগুলেশন (EC) No 810/2009 (ইইউ ভিসা কোড), আর্টিকেল ১৫",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02009R0810-20240611",
      },
      {
        name: "Embassy of Germany, Dhaka — Schengen visa required documents and insurance checklist",
        nameBn: "জার্মান দূতাবাস ঢাকা — শেনজেন ভিসা প্রয়োজনীয় কাগজপত্র ও ইনস্যুরেন্স চেকলিস্ট",
        url: "https://dhaka.diplo.de/bd-en/service/2689060-2689060",
      },
      {
        name: "Delta Life Insurance — Overseas Mediclaim Policy scope and terms",
        nameBn: "ডেল্টা লাইফ ইনস্যুরেন্স — ওভারসিজ মেডিক্লেইম পলিসির পরিধি ও শর্ত",
        url: "https://www.deltalife.org/overseas-mediclaim-policy",
      },
      {
        name: "Delta Life Insurance — Policy Terms and pre-existing condition exclusions",
        nameBn: "ডেল্টা লাইফ ইনস্যুরেন্স — পলিসি শর্তাবলী ও পূর্ববর্তী অসুস্থতা সংক্রান্ত ছাড়",
        url: "https://www.deltalife.org/assets/userfiles/OMP_Terms_and_Conditions_v9.pdf",
      },
      {
        name: "Green Delta Insurance — Overseas Mediclaim Policy wording and coverage limitations",
        nameBn: "গ্রীন ডেল্টা ইনস্যুরেন্স — ওভারসিজ মেডিক্লেইম পলিসি ও কভারেজ সীমাবদ্ধতা",
        url: "https://green-delta.com/wp-content/uploads/2024/03/BH-Policy-Wording_-Including-19-Covid-Cover-2.pdf",
      },
      {
        name: "Visit Saudi — Official Stopover Transit Visa insurance terms",
        nameBn: "ভিজিট সৌদি — অফিশিয়াল স্টপওভার ট্রানজিট ভিসা স্বাস্থ্যবীমা শর্ত",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
    ],
    internalLinks: [
      { text: "How to Use Nusuk App in Makkah & Madinah (Rawdah Permit Guide)", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Passport Dollar Endorsement and Card Activation Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Europe, UK & USA Sightseeing and City Passes Guide", path: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide" },
      { text: "Travel Tools Hub: Currency & Preparation Tools", path: "/tools" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Browse Airalo Travel eSIM Plans for Your Destination",
      body: "Install your eSIM over Wi-Fi before flying from Dhaka so you can connect to a supported mobile network when you land abroad.",
    },
  },
  {
    id: "blog-38",
    slug: "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost",
    title: "Sri Lanka + Maldives 7-Day Combo Tour from Bangladesh (2026): Colombo ETA Visa, Kandy Scenic Train, Maafushi & BDT Budget",
    summary: "Why visit just one country when Colombo (CMB) and Malé (MLE) are only an 80-minute flight apart—and many Dhaka-to-Maldives flights on SriLankan Airlines already transit through Colombo? By booking a 7-Day Sri Lanka + Maldives Multi-City Combo (4 days across Colombo, Kandy, Nuwara Eliya tea estates, and the iconic Ella Nine Arch Bridge train, followed by 3 days of turquoise snorkeling on Maafushi Island in the Maldives), Bangladeshi couples and families get two countries, two easy visas (SAARC ETA + Free Maldives VOA), and four passport stamps for BDT 92,000 to BDT 1,15,000 per person!",
    category: "Family & Budget",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    internalLinks: [
      { text: "Maldives Under BDT 75,000: Maafushi Local Island Guide", path: "/blog/maldives-budget-trip-bangladesh-maafushi" },
      { text: "First International Trip on a Fresh Passport (3-Step Ladder)", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "How to Book Multi-City Flights in BDT via WhatsApp", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Maldives 5-Day Cost Calculator in BDT", path: "/costs/maldives-costs" },
      { text: "Maldives On-Arrival Visa & IMUGA Checklist", path: "/visa/maldives-visa" },
      { text: "Dhaka to Maldives Flight Schedule & Fares", path: "/flights/dhaka-maldives" },
      { text: "Where to Stay in Maldives: Local Island Stays", path: "/hotels/maldives-hotels" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Search Dhaka → Colombo → Malé Multi-City Flight Fares", body: "Use the Multi-City search tab on Aviasales to lock in Sri Lanka + Maldives combo tickets on a single itinerary." }
  },
  {
    id: "blog-39",
    slug: "bangladesh-epassport-application-renewal-64-districts-fee-guide",
    title: "Bangladesh e-Passport Application & MRP Renewal Guide Across All 64 Districts (2026): 48 vs. 64 Pages, Fees & Police Verification",
    summary: "Every international journey—whether for obligatory Hajj, DIY Umrah, medical treatment in Bangkok, or a family holiday to Malaysia—starts with a valid Bangladeshi e-Passport with at least 6 months remaining validity. Verified against the Department of Immigration & Passports (DIP - epassport.gov.bd), this complete 2026 guide covers online application across all 72 Regional Passport Offices (RPOs) in 64 districts, exact 15% VAT-inclusive BDT fee tables for 48-page vs. 64-page passports (5-year and 10-year validity), how MRP-to-e-Passport renewals bypass new police verification, and fixing NID-to-Passport name/age mismatches.",
    category: "Visa & Immigration",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "First International Trip on a Fresh e-Passport (3-Step Ladder)", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "How to Get $18,000 Dollar Endorsement on Your New e-Passport", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration 5-Document Checklist", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Official Hajj Registration with NID & e-Passport (hajj.gov.bd)", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "Dhaka Airport Pre-Departure Inspection Checklist", path: "/pre-departure" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Got Your New e-Passport? Check First-Trip Flight Fares from Dhaka", body: "Compare live roundtrip fares to Nepal, Maldives, Malaysia, Thailand, and Saudi Arabia." }
  },
  {
    id: "blog-40",
    slug: "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp",
    title: "Flight Delay, Cancellation & Baggage Compensation Guide for Bangladeshi Flyers (2026)",
    summary: "Understand your legal rights when international flights are delayed, cancelled or arrive without luggage. Review EC 261/UK 261 rules, Turkey's SHY-YOLCU passenger regulation, Saudi GACA protections, Montreal Convention limits (1,519 SDR) and how to file directly or via AirHelp.",
    category: "Cheap Flight Tips",
    date: "September 27, 2026",
    updatedAt: "2026-11-02",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "7 min read",
    references: [
      {
        name: "EUR-Lex — Regulation (EC) No 261/2004 (Air passenger rights and compensation)",
        nameBn: "EUR-Lex — রেগুলেশন (EC) No 261/2004 (বিমানযাত্রী অধিকার ও ক্ষতিপূরণ)",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32004R0261",
      },
      {
        name: "European Union (Your Europe) — Air passenger rights and delay assistance rules",
        nameBn: "ইউরোপীয় ইউনিয়ন (Your Europe) — বিমানযাত্রী অধিকার ও ফ্লাইট বিলম্ব সহায়তা নিয়ম",
        url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm",
      },
      {
        name: "UK Civil Aviation Authority (CAA) — UK261 route applicability and scope",
        nameBn: "যুক্তরাজ্য সিভিল এভিয়েশন অথরিটি (CAA) — UK261 রুট ও আইনি পরিধি",
        url: "https://www.caa.co.uk/media/jn3npj1h/uk-261-annex-1.pdf",
      },
      {
        name: "UK Civil Aviation Authority (CAA) — Flight delays: passenger care and compensation rates",
        nameBn: "যুক্তরাজ্য সিভিল এভিয়েশন অথরিটি (CAA) — ফ্লাইট বিলম্ব: যাত্রী সহায়তা ও ক্ষতিপূরণের হার",
        url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/delays/",
      },
      {
        name: "UK Legislation — Regulation (EC) No 261/2004 (as incorporated into UK law), Article 7",
        nameBn: "যুক্তরাজ্য আইন — রেগুলেশন (EC) No 261/2004 (যুক্তরাজ্যের আইনে অন্তর্ভুক্ত), আর্টিকেল ৭",
        url: "https://www.legislation.gov.uk/eur/2004/261/article/7",
      },
      {
        name: "UK Civil Aviation Authority (CAA) — Flight cancellations, notice periods and refunds",
        nameBn: "যুক্তরাজ্য সিভিল এভিয়েশন অথরিটি (CAA) — ফ্লাইট বাতিল, নোটিশের সময়সীমা ও রিফান্ড",
        url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/flight-delays-and-cancellations/cancellations/",
      },
      {
        name: "UK Civil Aviation Authority (CAA) — Claiming compensation directly from airlines",
        nameBn: "যুক্তরাজ্য সিভিল এভিয়েশন অথরিটি (CAA) — সরাসরি এয়ারলাইন্সে ক্ষতিপূরণ দাবি নির্দেশিকা",
        url: "https://www.caa.co.uk/air-passengers/travel-problems-and-rights/travel-complaints/making-a-claim/claiming-for-costs-and-compensation/",
      },
      {
        name: "EUR-Lex — The Montreal Convention (Convention for the Unification of Certain Rules for International Carriage by Air)",
        nameBn: "EUR-Lex — মন্ট্রিল কনভেনশন (আন্তর্জাতিক বিমান পরিবহনের অভিন্ন নীতিমালা চুক্তি)",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:22001A0718(01)",
      },
      {
        name: "International Civil Aviation Organization (ICAO) — Revised 2024 liability limits for baggage and delay",
        nameBn: "আন্তর্জাতিক বেসামরিক বিমান চলাচল সংস্থা (ICAO) — ২০২৪ সংশোধিত লাগেজ ও বিলম্ব দায়সীমা",
        url: "https://www.icao.int/news/international-air-travel-liability-limits-set-increase-enhancing-customer-compensation-0",
      },
      {
        name: "International Civil Aviation Organization (ICAO) — List of Parties to the Montreal Convention 1999",
        nameBn: "আন্তর্জাতিক বেসামরিক বিমান চলাচল সংস্থা (ICAO) — ১৯৯৯ মন্ট্রিল কনভেনশনের সদস্য রাষ্ট্রের তালিকা",
        url: "https://www.icao.int/sites/default/files/secretariat/legal/CurrentListofParties/Mtl99_EN.pdf",
      },
      {
        name: "Directorate General of Civil Aviation, Turkey (SHGM) — SHY-YOLCU Passenger Rights Regulation",
        nameBn: "তুরস্ক বেসামরিক বিমান চলাচল মহাপরিচালক (SHGM) — SHY-YOLCU যাত্রী অধিকার নীতিমালা",
        url: "https://web.shgm.gov.tr/doc4/shy-yolcu.pdf",
      },
      {
        name: "AirHelp — Service Terms and no-win, no-fee claims processing conditions",
        nameBn: "AirHelp — সেবা শর্তাবলী ও নো-উইন নো-ফি ক্লেইম প্রক্রিয়াকরণ নীতিমালা",
        url: "https://www.airhelp.com/en/terms/",
      },
      {
        name: "General Authority of Civil Aviation, Saudi Arabia (GACA) — Passenger Rights Protection Regulations",
        nameBn: "সৌদি জেনারেল অথরিটি অব সিভিল এভিয়েশন (GACA) — যাত্রী অধিকার সুরক্ষা প্রবিধান",
        url: "https://gaca.gov.sa/-/media/Files/PDF/LawsAndRegulation/Consumer-Protection/Passenger-Rights-Protection-Regulations-EN.pdf?as=0&hash=CAA102A31F884894A517602A4264F99C",
      },
      {
        name: "AirHelp — Current service and membership fees",
        nameBn: "AirHelp — বর্তমান দাবি-সেবা ও মেম্বারশিপ ফি",
        url: "https://www.airhelp.com/en/our-fees/",
      },
      {
        name: "Court of Justice of the European Union — Pešková and Peška v Travel Service (Case C-315/15), extraordinary circumstances and reasonable measures",
        nameBn: "ইউরোপীয় ইউনিয়নের বিচার আদালত — Pešková ও Peška বনাম Travel Service (মামলা C-315/15), অসাধারণ পরিস্থিতি ও যুক্তিসঙ্গত ব্যবস্থা",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62015CJ0315",
      },
      {
        name: "General Court of the European Union — D S.A. v P S.A. (Case T-134/25), air-traffic-management decisions and adverse weather",
        nameBn: "ইউরোপীয় ইউনিয়নের জেনারেল কোর্ট — D S.A. বনাম P S.A. (মামলা T-134/25), এয়ার ট্রাফিক ম্যানেজমেন্ট সিদ্ধান্ত ও প্রতিকূল আবহাওয়া",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62025TJ0134",
      },
      {
        name: "Court of Justice of the European Union — McDonagh v Ryanair (Case C-12/11), duty of care during extraordinary circumstances",
        nameBn: "ইউরোপীয় ইউনিয়নের বিচার আদালত — McDonagh বনাম Ryanair (মামলা C-12/11), অসাধারণ পরিস্থিতিতেও যাত্রী-যত্নের দায়িত্ব",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62011CJ0012",
      },
      {
        name: "UK Legislation — Air Passenger Rights and Air Travel Organisers' Licensing (Amendment) (EU Exit) Regulations 2019, regulation 8 (UK261 scope)",
        nameBn: "যুক্তরাজ্যের আইন — Air Passenger Rights and Air Travel Organisers' Licensing (Amendment) (EU Exit) Regulations 2019, regulation 8 (UK261-এর পরিধি)",
        url: "https://www.legislation.gov.uk/uksi/2019/278/regulation/8",
      },
      {
        name: "European Union — Regulation (EU) 2026/2202 amending Regulation (EC) No 261/2004; compensation amounts and application date",
        nameBn: "ইউরোপীয় ইউনিয়ন — Regulation (EU) 2026/2202, Regulation (EC) No 261/2004 সংশোধনী; ক্ষতিপূরণের হার ও প্রযোজ্যতার তারিখ",
        url: "https://eur-lex.europa.eu/eli/reg/2026/2202/oj/eng",
      },
      {
        name: "Official Gazette of the Republic of Türkiye — 10 December 2024 SHY-YOLCU amendment (Official Gazette No. 32748)",
        nameBn: "তুরস্কের সরকারি গেজেট — ১০ ডিসেম্বর ২০২৪-এর SHY-YOLCU সংশোধনী (গেজেট নং ৩২৭৪৮)",
        url: "https://resmigazete.gov.tr/eskiler/2024/12/20241210-10.htm",
      },
      {
        name: "Court of Justice of the European Union — SL v Vueling Airlines (Case C-86/19), the Montreal baggage limit is a maximum and compensation requires proof of actual loss",
        nameBn: "ইউরোপীয় ইউনিয়নের বিচার আদালত — SL বনাম Vueling Airlines (মামলা C-86/19), মন্ট্রিল লাগেজ দায়সীমা সর্বোচ্চ সীমা এবং ক্ষতিপূরণের জন্য প্রকৃত ক্ষতির প্রমাণ প্রয়োজন",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62019CJ0086",
      },
    ],
    internalLinks: [
      { text: "AirHelp Flight Compensation & Promo Code in Travel Tools", path: "/tools/flight-delay-claim" },
      { text: "Best Airlines Flying from Dhaka Compared (Baggage Rules)", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "Dhaka to Jeddah & Madinah Open-Jaw Flight Strategy", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "Best Travel eSIM and Schengen Travel Insurance Guide", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "Global Flight Search and Live Inventory", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "airhelp",
      headline: "Check Whether AirHelp Can Review Your Disruption or Baggage Case",
      body: "AirHelp offers a free eligibility check; its optional claims service has separate terms and fees. AirHelp+ is a separate membership (Use Promo Code AHTPO11 for 11% OFF AirHelp+ Smart & Pro).",
    },
  },
  {
    id: "blog-41",
    slug: "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla",
    title: "Top Airlines Operating from Dhaka (2026 Comparison): Biman, Saudia, Emirates, Qatar Airways, Singapore Airlines & US-Bangla Baggage Rules",
    summary: "Choosing the wrong airline or fare class out of Hazrat Shahjalal International Airport (DAC) can result in a shocking BDT 18,000 excess baggage penalty at the check-in counter or an exhausting 11-hour overnight layover without a transit hotel. This comprehensive 2026 aviation comparison evaluates the top 10 domestic and international airlines flying out of Dhaka—including Biman Bangladesh Airlines, US-Bangla Airlines, Saudia, Emirates, Qatar Airways, Gulf Air, Singapore Airlines, Thai Airways, Malaysia Airlines, and low-cost carriers (AirAsia, SalamAir, Air Arabia)—across checked baggage limits (30kg vs. 2x23kg = 46kg), cabin rules, free Zamzam water policies, and meal quality.",
    category: "Cheap Flight Tips",
    date: "September 27, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "5 Insider Secrets to Booking Cheaper Flights from Dhaka", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "Dhaka to Jeddah & Madinah Open-Jaw Flight Strategy", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "Flight Delay & Lost Baggage Compensation (Claim Up to €600)", path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp" },
      { text: "Official Zamzam Water & Gold Customs Rules at Dhaka Airport", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Flight Delay & Cancellation Compensation Checker", path: "/tools/flight-delay-claim" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Compare All 10 Airlines from Dhaka on One Screen", body: "Check live roundtrip and multi-city fares across Biman, Saudia, US-Bangla, Emirates, Qatar Airways, and low-cost carriers." }
  },
  {
    id: "blog-42",
    slug: "bangladesh-travelers-iata-airport-codes-directory-guide",
    title: "The Ultimate Airport Codes Directory for Bangladeshi Travelers (2026 Guide)",
    summary: "Mastering 3-letter IATA airport codes is the single most important skill for booking international and domestic flights from Bangladesh. From avoiding costly twin-airport mixups like Dubai DXB vs. DWC or Bangkok BKK vs. DMK, to understanding airline ticketing systems for Biman, US-Bangla, and Emirates, this complete directory covers all 8 Bangladesh domestic and international airports, plus 50 major hubs across the Middle East, Southeast Asia, Europe, and North America with baggage rules and live booking advice.",
    category: "Cheap Flight Tips",
    date: "October 03, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "5 min read",
    internalLinks: [
      { text: "Open Interactive Airport Codes & WhatsApp Inquiry Tool", path: "/tools/airport-codes" },
      { text: "Dhaka to Dubai Flight Schedule & Fares", path: "/flights/dhaka-dubai" },
      { text: "Flight Delay & Cancellation Compensation Checker", path: "/tools/flight-delay-claim" },
      { text: "Dhaka Airport Pre-Departure Inspection Checklist", path: "/pre-departure" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Search Flights Using Your 3-Letter Airport Code", body: "Compare live fares from DAC, CGP, and ZYL across 100+ airlines with instant BDT conversion." }
  },
  {
    id: "blog-43",
    slug: "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai",
    title: "Chattogram to Dubai & Middle East Direct Flights (2026): CGP to DXB Schedules, Fares & Shah Amanat Rules",
    summary: "For millions of travelers and expatriates across Chattogram division, flying directly out of Shah Amanat International Airport (CGP) to Dubai (DXB), Sharjah (SHJ), Abu Dhabi (AUH), Muscat (MCT), and Jeddah (JED) saves 6 to 10 hours of grueling highway transit to Dhaka. This commercial guide breaks down direct and one-stop flight schedules on Biman Bangladesh, Flydubai, US-Bangla, and Air Arabia, average roundtrip BDT fare bands from BDT 52,000, Shah Amanat terminal baggage allowances, and customs guidelines.",
    category: "Cheap Flight Tips",
    date: "October 03, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "6 min read",
    internalLinks: [
      { text: "Dubai & UAE Tourist Visa Checklist", path: "/visa/dubai-visa" },
      { text: "Dhaka to Dubai Flight Schedule & Fares", path: "/flights/dhaka-dubai" },
      { text: "Where to Stay in Dubai: Metro & Marina Hotels", path: "/hotels/dubai-hotels" },
      { text: "Dubai 5-Day Trip Cost Calculator in BDT", path: "/costs/dubai-costs" },
      { text: "Airport Codes & WhatsApp Inquiry Tool", path: "/tools/airport-codes" },
      { text: "Flight Delay Compensation Checker (€600)", path: "/tools/flight-delay-claim" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Compare Direct Flights from Chattogram (CGP)", body: "Search direct flights from Shah Amanat International Airport to Dubai, Sharjah, Abu Dhabi, and Muscat." }
  },
  {
    id: "blog-44",
    slug: "havana-cuba-travel-guide-bangladesh",
    title: "Havana, Cuba Travel Guide from Dhaka: Classic Cars, Old Havana & the Gran Teatro (2026)",
    summary: "This five-day Havana guide for Bangladeshi and international travelers covers the Gran Teatro de La Habana Alicia Alonso (home of the Ballet Nacional de Cuba, with performance tickets often at just USD 10-30), the four UNESCO plazas of Old Havana, classic American car tours at honest 2026 prices, the Malecon and Vedado, and the practical realities that make or break a Cuba trip: tourist visa and e-Visa rules for Bangladeshi passports, mandatory health insurance proof, a cash-first economy where US-issued cards fail, casa particular versus hotel stays, halal dining strategies, and a realistic BDT 220,000 to BDT 360,000 per-person budget.",
    category: "Family & Budget",
    date: "October 8, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    internalLinks: [
      { text: "Travel Creator Resources: The Tools We Actually Use (2026)", path: "/blog/travel-creator-resources" },
      { text: "5 Insider Secrets to Booking Cheaper Flights from Dhaka", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "Top Airlines from Dhaka: Baggage Rules Compared", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "Best Travel eSIM & Travel Insurance Guide", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "Dual-Currency Card Endorsement Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "RFCD Account vs. BDT 300 Travel Quota Guide", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" },
      { text: "Flight Delay Compensation Checker (EUR 600)", path: "/tools/flight-delay-claim" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Comparing fares to Havana?", body: "Search multi-city routings from Dhaka via Istanbul or European gateways and watch how fares move before you lock your travel dates." }
  },
  {
    id: "blog-45",
    slug: "chefchaouen-morocco-travel-guide-bangladesh",
    title: "Chefchaouen, Morocco Travel Guide from Dhaka: Exploring Morocco's Blue City (2026)",
    summary: "Morocco's Blue City sits two hours south of Tangier in the Rif Mountains, where entire alleys, fountains and doorways are washed in layers of blue every spring. This complete Chefchaouen guide for Bangladeshi travelers covers the blue medina and its old fountain quarter, Place Outa el-Hammam and the 15th-century Kasbah, the Spanish Mosque sunset hike, Akchour waterfalls in Talassemtane National Park, riad stays from USD 25 a night, and the practical realities: Moroccan visa rules for Bangladeshi passports (no visa on arrival), CTM bus routes from Tangier and Fes, cash-first budgets in BDT 150,000-220,000 for a five-day Morocco loop, and why halal dining is effortless across the country.",
    category: "Family & Budget",
    date: "October 8, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "9 min read",
    internalLinks: [
      { text: "Travel Creator Resources: The Tools We Actually Use (2026)", path: "/blog/travel-creator-resources" },
      { text: "Havana, Cuba Travel Guide: Classic Cars & the Gran Teatro", path: "/blog/havana-cuba-travel-guide-bangladesh" },
      { text: "5 Insider Secrets to Booking Cheaper Flights from Dhaka", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "Top Airlines from Dhaka: Baggage Rules Compared", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "Best Travel eSIM & Travel Insurance Guide", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "Dual-Currency Card Endorsement Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Global Flight Search & Fare Benchmark", path: "/flights" },
      { text: "Flight Delay Compensation Checker (EUR 600)", path: "/tools/flight-delay-claim" }
    ],
    affiliateCTA: { provider: "aviasales", headline: "Comparing fares to Morocco?", body: "Search multi-city routings from Dhaka via Istanbul, Dubai or Doha to Casablanca or Tangier and watch how fares move before you lock your dates." }
  },
  {
    id: "blog-46",
    slug: "travel-creator-resources",
    title: "Travel Creator Resources: The Tools We Actually Use (2026)",
    summary:
      "A no-hype 2026 resource list for travel creators: the free SEO tools, phone-photography workflow, trusted research sources, and one monetization hub we actually use at URAL Travel, chosen for creators building from Bangladesh. Includes honest answers on how travel blogs really earn, where affiliate tools belong in an article, and what a creator in Dhaka should verify before joining any platform.",
    category: "Travel Creator Economy",
    date: "October 8, 2026",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "10 min read",
    internalLinks: [
      { text: "Halal Food Guide to Bangkok for Bangladeshi Travelers", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "Havana, Cuba Travel Guide from Dhaka", path: "/blog/havana-cuba-travel-guide-bangladesh" },
      { text: "Chefchaouen, Morocco Travel Guide from Dhaka", path: "/blog/chefchaouen-morocco-travel-guide-bangladesh" },
      { text: "5 Insider Secrets to Booking Cheaper Flights from Dhaka", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "Flight Delay, Cancellation & Lost Baggage Compensation Guide", path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp" },
      { text: "Best Travel eSIM and Schengen Travel Insurance Guide", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "Turn Your Travel Experience Into Income — Without Building a Website", path: "/blog/turn-travel-experience-into-income-without-a-website" },
    ],
  },
  {
    id: "blog-48",
    slug: "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide",
    title: "Dhaka to Kolkata by Train & Bus: Benapole Border Crossing, Maitree Express Status & Complete BDT Cost Guide (2026)",
    summary: "India is a major overland destination for Bangladeshi travelers, and the Dhaka–Kolkata land corridor via Benapole–Petrapole is the primary road route. Cross-border passenger trains (Maitree, Bandhan, and Mitali Express) have been suspended since July 2024 with no confirmed restart date as of our October 15, 2026 review. This guide covers the suspended rail status and Padma Bridge reroute proposal, active Dhaka–Benapole–Petrapole–Kolkata bus legs, the step-by-step border procedure, IVAC sticker-visa requirements (e-Visa is not available for Bangladeshi passports; verify live appointment availability at ivacbd.com), and an indicative 3-day Kolkata planning budget of BDT 8,000–18,000.",
    category: "Family & Budget",
    date: "October 15, 2026",
    updatedAt: "2026-10-15",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "8 min read",
    internalLinks: [
      { text: "Top 6 Budget-Friendly Family Destinations from Dhaka", path: "/blog/top-budget-family-destinations-from-dhaka" },
      { text: "Dhaka Airport Outbound Immigration Checklist (NOC & GO Rules)", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Dual-Currency Card & Passport Dollar Endorsement Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Global Flight Search & Dhaka Departure Fare Comparison", path: "/flights" },
      { text: "Outbound Trip Cost Benchmarks & BDT Budget Planner", path: "/costs" },
    ],
    references: [
      {
        name: "Bangladesh Railway — Official Portal & Passenger Service Notices",
        nameBn: "বাংলাদেশ রেলওয়ে — অফিশিয়াল পোর্টাল ও যাত্রীসেবা বিজ্ঞপ্তি",
        url: "https://railway.gov.bd/",
      },
      {
        name: "Bangladesh Railway — Official e-Ticketing Service",
        nameBn: "বাংলাদেশ রেলওয়ে — অফিশিয়াল ই-টিকিটিং পোর্টাল",
        url: "https://eticket.railway.gov.bd/",
      },
      {
        name: "Indian Railways — Official Passenger & Cross-Border Rail Portal",
        nameBn: "ভারতীয় রেলওয়ে — অফিশিয়াল যাত্রী ও আন্তঃসীমান্ত রেল পোর্টাল",
        url: "https://indianrailways.gov.in/",
      },
      {
        name: "Indian Visa Application Centre (IVAC) Bangladesh — Notices, Fee & Appointment Portal",
        nameBn: "ইন্ডিয়ান ভিসা অ্যাপ্লিকেশন সেন্টার (IVAC) বাংলাদেশ — বিজ্ঞপ্তি, ফি ও অ্যাপয়েন্টমেন্ট পোর্টাল",
        url: "https://www.ivacbd.com/",
      },
      {
        name: "IVAC Bangladesh — Visa Categories & Required Document Checklists",
        nameBn: "IVAC বাংলাদেশ — ভিসা ক্যাটাগরি ও প্রয়োজনীয় কাগজপত্রের তালিকা",
        url: "https://www.ivacbd.com/kind-of-visas-documents",
      },
      {
        name: "Government of India — Online Visa Application Portal for Bangladesh",
        nameBn: "ভারত সরকার — বাংলাদেশের জন্য অনলাইন ভিসা আবেদন পোর্টাল",
        url: "https://indianvisa-bangladesh.nic.in/",
      },
      {
        name: "High Commission of India, Dhaka — Consular & Visa Information",
        nameBn: "ভারতীয় হাইকমিশন, ঢাকা — কনস্যুলার ও ভিসা বিজ্ঞপ্তি",
        url: "https://www.hcidhaka.gov.in/",
      },
      {
        name: "National Board of Revenue (NBR) Bangladesh — Travel Tax Rules",
        nameBn: "জাতীয় রাজস্ব বোর্ড (NBR) বাংলাদেশ — স্থলসীমান্ত ভ্রমণ কর",
        url: "https://nbr.gov.bd/",
      },
      {
        name: "Bangladesh Land Port Authority (BLPA) — Benapole Land Port",
        nameBn: "বাংলাদেশ স্থলবন্দর কর্তৃপক্ষ (BLPA) — বেনাপোল স্থলবন্দর তথ্য",
        url: "https://blpa.gov.bd/",
      },
      {
        name: "Land Ports Authority of India (LPAI) — ICP Petrapole",
        nameBn: "ল্যান্ড পোর্টস অথরিটি অব ইন্ডিয়া (LPAI) — পেট্রাপোল ইন্টিগ্রেটেড চেক পোস্ট",
        url: "https://lpai.gov.in/",
      },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "Compare Dhaka to Kolkata Direct Flight Fares",
      body: "While cross-border passenger trains remain suspended, direct Dhaka (DAC) to Kolkata (CCU) flights take about 1 hour 10 minutes — compare live fares and baggage terms across airlines before booking.",
    },
  },
  ...SCHEDULED_BLOG_DATA,
];


