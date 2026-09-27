export interface QuickAnswer {
  text: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SchemaMarkup {
  type: string;
  description: string;
  code: string;
}

export interface FlightRoute {
  id: string;
  from: string;
  to: string;
  country: string;
  priceRangeBdt: string;
  airlines: string[];
  bestTimeToBook: string;
  duration: string;
  flightDuration?: string;
  visaRequirement: string;
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQ[];
  schemaMarkup: SchemaMarkup;
}

export interface Neighborhood {
  name: string;
  description: string;
  vibe: string;
}

export interface HotelRecommend {
  name: string;
  stars: number;
  priceBdt: number;
  category: "Budget" | "Mid-Range" | "Luxury";
  neighborhood: string;
  features: string[];
}

export interface HotelGuide {
  id: string;
  city: string;
  country: string;
  description: string;
  neighborhoods: Neighborhood[];
  hotels: HotelRecommend[];
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQ[];
  schemaMarkup: SchemaMarkup;
}

export interface DocumentChecklist {
  category: string;
  items: string[];
}

export interface VisaGuide {
  id: string;
  country: string;
  requirementType: "Visa On Arrival" | "e-Visa" | "Sticker Visa / Sticker Required" | "Visa Free" | string;
  costBdt: string;
  processingTime: string;
  documentChecklist: DocumentChecklist[];
  stepByStep: string[];
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQ[];
  schemaMarkup: SchemaMarkup;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface DestinationGuide {
  id: string;
  country: string;
  title: string;
  description: string;
  bestTimeToVisit: string;
  itinerary: ItineraryDay[];
  localTransport: string[];
  budgetBdt: string;
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQ[];
  schemaMarkup: SchemaMarkup;
}

export interface CostCategory {
  name: string;
  lowBdt: number;
  midBdt: number;
  highBdt: number;
}

export interface TripCostData {
  id: string;
  country: string;
  durationDays: number;
  currencyCode: string;
  exchangeRateText: string;
  categories: CostCategory[];
  seasonalVariation: string;
  moneyHacks: string[];
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQ[];
  schemaMarkup: SchemaMarkup;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
  internalLinks: { text: string; path: string }[];
  affiliateCTA?: { provider: "aviasales" | "klook" | "kkday" | "kiwitaxi" | "welcomePickups" | "airalo" | "qeeq" | "tiqets" | "airhelp"; headline: string; body: string };
}
