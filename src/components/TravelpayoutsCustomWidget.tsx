import React, { useState, useEffect, useMemo, useId, useRef } from "react";
import {
  Plane,
  Building,
  Search,
  ArrowRightLeft,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Luggage,
  MapPin,
  Sparkles,
  Mic,
  MicOff,
} from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";

interface TravelpayoutsCustomWidgetProps {
  initialTab?: "flights" | "hotels";
  initialFrom?: string;
  initialTo?: string;
  initialHotelCity?: string;
  hotelsOnly?: boolean;
  showInlineResults?: boolean;
  lang?: "en" | "bn";
}

const MARKER_ID = "675992";
const TRS_ID = "540277";

const CURRENCY_OPTIONS = {
  BDT: { code: "BDT", symbol: "৳", label: "৳ BDT", rateFromBdt: 1 },
  USD: { code: "USD", symbol: "$", label: "$ USD", rateFromBdt: 1 / 120 },
  EUR: { code: "EUR", symbol: "€", label: "€ EUR", rateFromBdt: 1 / 130 },
  GBP: { code: "GBP", symbol: "£", label: "£ GBP", rateFromBdt: 1 / 152 },
  SAR: { code: "SAR", symbol: "SAR ", label: "﷼ SAR", rateFromBdt: 1 / 32 },
  AED: { code: "AED", symbol: "AED ", label: "د.إ AED", rateFromBdt: 1 / 32.7 },
} as const;

type CurrencyCode = keyof typeof CURRENCY_OPTIONS;

const GLOBAL_HOTEL_CITIES = [
  { city: "Kathmandu", country: "Nepal", flag: "🇳🇵", zone: "Thamel, Lazimpat & Durbar Marg", iata: "KTM" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", zone: "Pratunam, Sukhumvit & Siam", iata: "BKK" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾", zone: "Bukit Bintang, KLCC & Chinatown", iata: "KUL" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", zone: "Little India, Bugis & Marina Bay", iata: "SIN" },
  { city: "Maldives (Maafushi & Malé)", country: "Maldives", flag: "🇲🇻", zone: "Maafushi, Hulhumalé & Private Atolls", iata: "MLE" },
  { city: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", zone: "Deira, Bur Dubai & Downtown", iata: "DXB" },
  { city: "Makkah", country: "Saudi Arabia", flag: "🇸🇦", zone: "Abraj Al Bait, Ibrahim Al Khalil & Ajyad", iata: "JED" },
  { city: "Madinah", country: "Saudi Arabia", flag: "🇸🇦", zone: "Central Haram (Markazia North & South)", iata: "MED" },
  { city: "London", country: "United Kingdom", flag: "🇬🇧", zone: "Paddington, Westminster & Kensington", iata: "LHR" },
  { city: "Paris", country: "France", flag: "🇫🇷", zone: "Opera, Marais & Eiffel Tower District", iata: "CDG" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", zone: "Sultanahmet, Sirkeci & Taksim", iata: "IST" },
  { city: "Rome", country: "Italy", flag: "🇮🇹", zone: "Centro Storico, Termini & Prati", iata: "FCO" },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸", zone: "Eixample, Gothic Quarter & Plaça Catalunya", iata: "BCN" },
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱", zone: "Centrum, Museum Quarter & Canal Ring", iata: "AMS" },
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭", zone: "Old Town (Altstadt) & Zurich HB", iata: "ZRH" },
  { city: "New York", country: "United States", flag: "🇺🇸", zone: "Midtown Manhattan, Times Square & Queens", iata: "JFK" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦", zone: "Downtown Core, Yorkville & Harbourfront", iata: "YYZ" },
  { city: "Tokyo", country: "Japan", flag: "🇯🇵", zone: "Shinjuku, Asakusa & Tokyo Station", iata: "NRT" },
  { city: "Colombo", country: "Sri Lanka", flag: "🇱🇰", zone: "Galle Face, Fort & Kollupitiya", iata: "CMB" },
  { city: "Doha", country: "Qatar", flag: "🇶🇦", zone: "Souq Waqif, West Bay & Corniche", iata: "DOH" },
];

const GLOBAL_AIRPORTS = [
  { label: "Dhaka (DAC)", code: "DAC", city: "Dhaka", country: "Bangladesh", flag: "🇧🇩" },
  { label: "Chattogram (CGP)", code: "CGP", city: "Chattogram", country: "Bangladesh", flag: "🇧🇩" },
  { label: "Sylhet (ZYL)", code: "ZYL", city: "Sylhet", country: "Bangladesh", flag: "🇧🇩" },
  { label: "Kathmandu (KTM)", code: "KTM", city: "Kathmandu", country: "Nepal", flag: "🇳🇵" },
  { label: "Bangkok (BKK)", code: "BKK", city: "Bangkok", country: "Thailand", flag: "🇹🇭" },
  { label: "Kuala Lumpur (KUL)", code: "KUL", city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾" },
  { label: "Singapore (SIN)", code: "SIN", city: "Singapore", country: "Singapore", flag: "🇸🇬" },
  { label: "Malé, Maldives (MLE)", code: "MLE", city: "Malé", country: "Maldives", flag: "🇲🇻" },
  { label: "Dubai (DXB)", code: "DXB", city: "Dubai", country: "UAE", flag: "🇦🇪" },
  { label: "Jeddah (JED)", code: "JED", city: "Jeddah", country: "Saudi Arabia", flag: "🇸🇦" },
  { label: "Madinah (MED)", code: "MED", city: "Madinah", country: "Saudi Arabia", flag: "🇸🇦" },
  { label: "Doha (DOH)", code: "DOH", city: "Doha", country: "Qatar", flag: "🇶🇦" },
  { label: "Istanbul (IST)", code: "IST", city: "Istanbul", country: "Turkey", flag: "🇹🇷" },
  { label: "London Heathrow (LHR)", code: "LHR", city: "London", country: "United Kingdom", flag: "🇬🇧" },
  { label: "Paris (CDG)", code: "CDG", city: "Paris", country: "France", flag: "🇫🇷" },
  { label: "Rome (FCO)", code: "FCO", city: "Rome", country: "Italy", flag: "🇮🇹" },
  { label: "Frankfurt (FRA)", code: "FRA", city: "Frankfurt", country: "Germany", flag: "🇩🇪" },
  { label: "Amsterdam (AMS)", code: "AMS", city: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
  { label: "Barcelona (BCN)", code: "BCN", city: "Barcelona", country: "Spain", flag: "🇪🇸" },
  { label: "New York (JFK)", code: "JFK", city: "New York", country: "United States", flag: "🇺🇸" },
  { label: "Toronto (YYZ)", code: "YYZ", city: "Toronto", country: "Canada", flag: "🇨🇦" },
  { label: "Tokyo (NRT)", code: "NRT", city: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { label: "Guangzhou (CAN)", code: "CAN", city: "Guangzhou", country: "China", flag: "🇨🇳" },
  { label: "Sydney (SYD)", code: "SYD", city: "Sydney", country: "Australia", flag: "🇦🇺" },
];

function getDefaultDateIso(daysAhead = 14) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function extractIataCode(placeStr: string, fallback = "KTM"): string {
  const match = placeStr.match(/\(([A-Za-z]{3})\)/);
  if (match) return match[1].toUpperCase();
  const trimmed = placeStr.trim().toUpperCase();
  if (/^[A-Z]{3}$/.test(trimmed)) return trimmed;
  const found = GLOBAL_AIRPORTS.find(
    (a) =>
      a.city.toUpperCase() === trimmed ||
      a.label.toUpperCase().includes(trimmed) ||
      a.country.toUpperCase() === trimmed
  );
  if (found) return found.code;
  return fallback;
}

function buildSearchCode(origCode: string, destCode: string, depIso: string, retIso: string, pax: number) {
  const parseDdMm = (iso: string) => {
    const parts = (iso || "").split("-");
    if (parts.length === 3) return `${parts[2]}${parts[1]}`;
    return "1510";
  };
  return `${origCode}${parseDdMm(depIso)}${destCode}${parseDdMm(retIso)}${Math.max(1, Math.min(9, pax))}`;
}

function getFlightOptions(fromCity: string, toCity: string) {
  const fromLower = fromCity.toLowerCase();
  const isBangladeshOrigin =
    fromLower.includes("dac") ||
    fromLower.includes("dhaka") ||
    fromLower.includes("cgp") ||
    fromLower.includes("chattogram") ||
    fromLower.includes("zyl") ||
    fromLower.includes("sylhet");

  const lower = toCity.toLowerCase();
  if (isBangladeshOrigin) {
    if (lower.includes("ktm") || lower.includes("nepal") || lower.includes("kathmandu")) {
      return [
        { id: "f1", airline: "Biman Bangladesh Airlines", flightNo: "BG 371", departs: "10:35 AM", arrives: "12:05 PM", duration: "1h 30m", stops: "Direct Flight", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 29800, destCode: "KTM", score: "Best Overall Value" },
        { id: "f2", airline: "Himalaya Airlines", flightNo: "H9 556", departs: "01:20 PM", arrives: "02:50 PM", duration: "1h 30m", stops: "Direct Flight", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 31200, destCode: "KTM", score: "Popular Direct" },
        { id: "f3", airline: "IndiGo", flightNo: "6E 1182", departs: "08:10 AM", arrives: "02:25 PM", duration: "6h 15m", stops: "1 Stop (Kolkata CCU)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 27400, destCode: "KTM", score: "Lowest Fare" },
      ];
    }
    if (lower.includes("bkk") || lower.includes("thailand") || lower.includes("bangkok")) {
      return [
        { id: "f4", airline: "Thai Lion Air", flightNo: "SL 225", departs: "02:15 AM", arrives: "05:45 AM", duration: "2h 30m", stops: "Direct (Don Mueang DMK)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 31800, destCode: "BKK", score: "Cheapest Direct" },
        { id: "f5", airline: "Biman Bangladesh Airlines", flightNo: "BG 388", departs: "11:30 AM", arrives: "03:00 PM", duration: "2h 30m", stops: "Direct (Suvarnabhumi BKK)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 35600, destCode: "BKK", score: "Best Value + 30kg Bag" },
        { id: "f6", airline: "Thai Airways", flightNo: "TG 322", departs: "01:35 PM", arrives: "05:05 PM", duration: "2h 30m", stops: "Direct (Suvarnabhumi BKK)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 42800, destCode: "BKK", score: "5-Star Full Service" },
      ];
    }
    if (lower.includes("kul") || lower.includes("malaysia") || lower.includes("kuala")) {
      return [
        { id: "f7", airline: "AirAsia", flightNo: "AK 71", departs: "12:25 AM", arrives: "06:15 AM", duration: "3h 50m", stops: "Direct (KLIA2)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 36200, destCode: "KUL", score: "Lowest Direct" },
        { id: "f8", airline: "Batik Air Malaysia", flightNo: "OD 163", departs: "10:15 PM", arrives: "04:10 AM", duration: "3h 55m", stops: "Direct (KLIA1)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 37900, destCode: "KUL", score: "Best Value Direct" },
        { id: "f9", airline: "Malaysia Airlines", flightNo: "MH 197", departs: "12:15 PM", arrives: "06:05 PM", duration: "3h 50m", stops: "Direct (KLIA1)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 45200, destCode: "KUL", score: "Full-Service Carrier" },
      ];
    }
    if (lower.includes("dxb") || lower.includes("dubai") || lower.includes("uae")) {
      return [
        { id: "f10", airline: "flydubai", flightNo: "FZ 524", departs: "09:40 PM", arrives: "01:05 AM", duration: "4h 45m", stops: "Direct (DXB)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 56900, destCode: "DXB", score: "Cheapest Direct" },
        { id: "f11", airline: "Biman Bangladesh Airlines", flightNo: "BG 347", departs: "06:15 PM", arrives: "09:35 PM", duration: "4h 40m", stops: "Direct Dreamliner", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 59800, destCode: "DXB", score: "Best Value + 30kg Bag" },
        { id: "f12", airline: "Emirates", flightNo: "EK 585", departs: "01:40 AM", arrives: "04:55 AM", duration: "4h 35m", stops: "Direct (Terminal 3)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 73500, destCode: "DXB", score: "5-Star Flag Carrier" },
      ];
    }
    if (lower.includes("sin") || lower.includes("singapore")) {
      return [
        { id: "f13", airline: "US-Bangla Airlines", flightNo: "BS 307", departs: "10:50 PM", arrives: "05:00 AM", duration: "4h 10m", stops: "Direct (Changi)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 41200, destCode: "SIN", score: "Cheapest Direct" },
        { id: "f14", airline: "Biman Bangladesh Airlines", flightNo: "BG 584", departs: "08:30 AM", arrives: "02:40 PM", duration: "4h 10m", stops: "Direct Dreamliner", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 44600, destCode: "SIN", score: "Best Morning Direct" },
        { id: "f15", airline: "Singapore Airlines", flightNo: "SQ 447", departs: "11:55 PM", arrives: "06:05 AM", duration: "4h 10m", stops: "Direct (Changi T3)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 56800, destCode: "SIN", score: "5-Star Flag Carrier" },
      ];
    }
    if (lower.includes("mle") || lower.includes("maldives") || lower.includes("male")) {
      return [
        { id: "f16", airline: "US-Bangla Airlines", flightNo: "BS 337", departs: "09:10 AM", arrives: "12:35 PM", duration: "4h 25m", stops: "Direct (Malé MLE)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 52500, destCode: "MLE", score: "Only Non-Stop Direct" },
        { id: "f17", airline: "SriLankan Airlines", flightNo: "UL 190", departs: "01:05 PM", arrives: "07:40 PM", duration: "7h 35m", stops: "1 Stop (Colombo CMB)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 47900, destCode: "MLE", score: "Lowest Fare + 30kg Bag" },
      ];
    }
    if (lower.includes("jed") || lower.includes("jeddah") || lower.includes("makkah") || lower.includes("med") || lower.includes("madinah")) {
      return [
        { id: "f18", airline: "Saudia", flightNo: "SV 803", departs: "06:55 PM", arrives: "11:15 PM", duration: "7h 20m", stops: "Direct (Jeddah T1)", baggage: "46 kg (2x23kg) + 5L Zamzam", priceBdt: 86500, destCode: "JED", score: "Top Direct Umrah" },
        { id: "f19", airline: "Biman Bangladesh Airlines", flightNo: "BG 335", departs: "05:30 PM", arrives: "09:45 PM", duration: "7h 15m", stops: "Direct Dreamliner", baggage: "40 kg Checked + 5L Zamzam", priceBdt: 83900, destCode: "JED", score: "Best Direct Value" },
      ];
    }
  }
  return [];
}

function getHotelOptions(hotelCity: string) {
  const lower = hotelCity.toLowerCase();
  if (lower.includes("kathmandu") || lower.includes("nepal") || lower.includes("pokhara")) {
    return [
      { id: "h1", name: "Thamel Grand Heritage Hotel", category: "Budget Friendly", rating: "3★", review: "8.7/10 Very Good", priceBdt: 2400, neighborhood: "Thamel Core, Kathmandu", features: ["Free Breakfast", "5-min walk to Durbar Marg", "24h Airport Pickup"] },
      { id: "h2", name: "Hotel Shanker Kathmandu", category: "Mid-Range", rating: "4★", review: "9.1/10 Wonderful", priceBdt: 7400, neighborhood: "Lazimpat, Kathmandu", features: ["Outdoor Swimming Pool", "Heritage Palace Architecture", "Halal-Friendly Dining Nearby"] },
      { id: "h3", name: "Dwarika's Heritage Resort", category: "Luxury", rating: "5★", review: "9.7/10 Exceptional", priceBdt: 28500, neighborhood: "Battisputali, Kathmandu", features: ["Award-Winning Courtyard", "Full Spa & Courtyard Pool", "Hand-Carved Suites"] },
    ];
  }
  if (lower.includes("bangkok") || lower.includes("thailand") || lower.includes("phuket")) {
    return [
      { id: "h4", name: "First House Hotel Pratunam", category: "Value Pick", rating: "3★", review: "8.4/10 Very Good", priceBdt: 3900, neighborhood: "Pratunam Shopping Zone, Bangkok", features: ["Halal Street Food Outside", "2-min walk to Platinum Mall", "Family Triple Rooms"] },
      { id: "h5", name: "S31 Sukhumvit Hotel", category: "Mid-Range", rating: "4★", review: "8.9/10 Excellent", priceBdt: 6800, neighborhood: "Sukhumvit (Near Phrom Phong BTS)", features: ["Saltwater Infinity Pool", "Spacious Family Suites", "Easy BTS Skytrain Access"] },
      { id: "h6", name: "Amari Bangkok Pratunam", category: "Luxury", rating: "5★", review: "9.4/10 Outstanding", priceBdt: 12500, neighborhood: "Pratunam Opposite Platinum Mall", features: ["Resort Pool Deck", "Breeze Spa & Executive Lounge", "Direct Skybridge Walk"] },
    ];
  }
  if (lower.includes("kuala") || lower.includes("malaysia") || lower.includes("kl") || lower.includes("penang")) {
    return [
      { id: "h7", name: "Travelodge Chinatown KL", category: "Budget Friendly", rating: "3★", review: "8.5/10 Very Good", priceBdt: 2900, neighborhood: "Chinatown & Pasar Seni MRT, KL", features: ["2-min walk to MRT/LRT", "Fast Wi-Fi", "Central Sightseeing Base"] },
      { id: "h8", name: "WOLO Kuala Lumpur", category: "Mid-Range", rating: "4★", review: "9.1/10 Superb", priceBdt: 6400, neighborhood: "Bukit Bintang Crossing, KL", features: ["Next to Pavilion Mall", "Walk to Jalan Alor & Arab Street", "Modern Boutique Rooms"] },
      { id: "h9", name: "THE FACE Suites Kuala Lumpur", category: "Luxury", rating: "5★", review: "9.5/10 Exceptional", priceBdt: 9800, neighborhood: "KLCC District, Kuala Lumpur", features: ["51st Floor Rooftop Infinity Pool", "Petronas Twin Towers View", "Full Apartment Suites"] },
    ];
  }
  if (lower.includes("dubai") || lower.includes("uae") || lower.includes("abu dhabi")) {
    return [
      { id: "h10", name: "Rove City Centre Deira", category: "Best Value", rating: "3★", review: "9.1/10 Superb", priceBdt: 7200, neighborhood: "Deira (2 mins to Metro), Dubai", features: ["Outdoor Saltwater Pool", "10 mins from DXB Airport", "South Asian & Halal Dining"] },
      { id: "h11", name: "Swissôtel Al Ghurair Dubai", category: "Mid-Range", rating: "5★", review: "9.0/10 Excellent", priceBdt: 12800, neighborhood: "Deira Creekside, Dubai", features: ["Connected to Al Ghurair Mall", "Free Beach Shuttle", "Large Family Rooms"] },
      { id: "h12", name: "Address Downtown View Hotel", category: "Luxury", rating: "5★", review: "9.6/10 World Class", priceBdt: 29500, neighborhood: "Downtown Dubai (Burj Khalifa View)", features: ["Infinity Pool Facing Burj Khalifa", "Direct Dubai Mall Access", "VIP Concierge"] },
    ];
  }
  if (lower.includes("singapore")) {
    return [
      { id: "h13", name: "Hotel Boss Singapore", category: "Popular Family Value", rating: "4★", review: "8.4/10 Very Good", priceBdt: 11800, neighborhood: "Victoria Street (Near Lavender MRT & Masjid Sultan)", features: ["Halal Food Court Downstairs", "Outdoor Sky Pool", "5 mins to Mustafa Centre"] },
      { id: "h14", name: "V Hotel Lavender", category: "Mid-Range MRT Hub", rating: "4★", review: "8.6/10 Excellent", priceBdt: 13500, neighborhood: "Directly Above Lavender MRT Station", features: ["Direct Changi MRT Line", "Rooftop Pool Terrace", "24h Kopitiam & Convenience"] },
      { id: "h15", name: "PARKROYAL COLLECTION Marina Bay", category: "Luxury", rating: "5★", review: "9.3/10 Superb", priceBdt: 34500, neighborhood: "Marina Bay Sands District, Singapore", features: ["Indoor Garden Atrium", "Halal-Certified Buffet", "Skyline Pool"] },
    ];
  }
  if (lower.includes("maldives") || lower.includes("maafushi") || lower.includes("male") || lower.includes("hulhumale")) {
    return [
      { id: "h16", name: "Kaani Palm Beach Maafushi", category: "Best Island Value", rating: "4★", review: "8.9/10 Excellent", priceBdt: 8900, neighborhood: "Bikini Beachfront, Maafushi Local Island", features: ["Rooftop Infinity Pool", "100% Halal Dining", "$30 Snorkeling & Sandbank Tours"] },
      { id: "h17", name: "Arena Beach Hotel Maafushi", category: "Family Pick", rating: "4★", review: "8.8/10 Very Good", priceBdt: 8200, neighborhood: "Maafushi Coastline, Maldives", features: ["Direct Speedboat from MLE", "Ocean View Balconies", "Free Snorkeling Gear"] },
      { id: "h18", name: "Kurumba Maldives Private Island", category: "5★ Resort", rating: "5★", review: "9.5/10 Exceptional", priceBdt: 42000, neighborhood: "North Malé Atoll (10-min Speedboat from MLE)", features: ["Private Lagoon & House Reef", "7 Halal-Friendly Restaurants", "No Seaplane Needed"] },
    ];
  }
  if (lower.includes("makkah") || lower.includes("mecca") || lower.includes("jeddah")) {
    return [
      { id: "h19", name: "Emaar Grand Hotel Makkah", category: "Walkable Value", rating: "4★", review: "8.3/10 Very Good", priceBdt: 7800, neighborhood: "Ibrahim Al Khalil Street (650m flat walk to Haram)", features: ["No Steep Hills for Seniors", "Bangladeshi & Asian Restaurants Outside", "Quad Family Rooms"] },
      { id: "h20", name: "Swissôtel Makkah (Clock Tower)", category: "Direct Haram Access", rating: "5★", review: "9.1/10 Superb", priceBdt: 24500, neighborhood: "Abraj Al Bait Complex, King Abdulaziz Gate", features: ["Direct Elevator to Haram Courtyard", "Wheelchair Accessible", "Haram Speaker Audio in Rooms"] },
      { id: "h21", name: "Jabal Omar Hyatt Regency Makkah", category: "Luxury Haram View", rating: "5★", review: "9.4/10 Exceptional", priceBdt: 31000, neighborhood: "Jabal Omar (1-min walk to King Fahd Gate)", features: ["Steps from Ladies Prayer Area", "Spacious Family Suites", "24h In-Room Dining"] },
    ];
  }
  if (lower.includes("madinah") || lower.includes("medina")) {
    return [
      { id: "h22", name: "Saja Al Madinah Hotel", category: "Best Value", rating: "4★", review: "8.6/10 Excellent", priceBdt: 9200, neighborhood: "Northern Central Area (4-min walk to Masjid an-Nabawi)", features: ["Near Ladies Gate 25–29", "Family Quad Rooms", "International Buffet"] },
      { id: "h23", name: "Pullman Zamzam Madina", category: "5★ Haram Courtyard", rating: "5★", review: "9.0/10 Superb", priceBdt: 19500, neighborhood: "Southern Markazia (Near Bab Al Salam & Rawdah)", features: ["Free Haram Shuttle & Direct Walk", "Prophet's Mosque Views", "Full Family Suites"] },
      { id: "h24", name: "Dar Al Taqwa Hotel Madinah", category: "Luxury Front Row", rating: "5★", review: "9.5/10 World Class", priceBdt: 34000, neighborhood: "Directly Opposite King Fahd Gate, Madinah", features: ["20 Seconds to Haram Gate", "Zero Walking Strain for Seniors", "VIP Concierge"] },
    ];
  }
  if (lower.includes("london") || lower.includes("uk")) {
    return [
      { id: "h25", name: "Point A Hotel London Paddington", category: "Central Value", rating: "3★", review: "8.4/10 Very Good", priceBdt: 16500, neighborhood: "Paddington & Edgware Road (Halal Dining Hub)", features: ["5-min walk to Paddington Heathrow Express", "Halal Restaurants on Edgware Rd", "Fast Wi-Fi"] },
      { id: "h26", name: "Park Plaza Westminster Bridge", category: "Mid-Range Family", rating: "4★", review: "8.9/10 Excellent", priceBdt: 29500, neighborhood: "South Bank (Opposite Big Ben & London Eye)", features: ["Indoor Pool & Spa", "Walk to London Eye & Waterloo", "Family Studio Rooms"] },
    ];
  }
  if (lower.includes("istanbul") || lower.includes("turkey")) {
    return [
      { id: "h27", name: "Hotel Sultania Boutique Class", category: "Top Heritage Pick", rating: "4★", review: "9.4/10 Exceptional", priceBdt: 14200, neighborhood: "Sultanahmet & Sirkeci, Istanbul", features: ["5-min walk to Hagia Sophia & Blue Mosque", "Indoor Pool & Turkish Hammam", "100% Halal Breakfast"] },
      { id: "h28", name: "CVK Park Bosphorus Hotel", category: "Luxury View", rating: "5★", review: "9.2/10 Superb", priceBdt: 26800, neighborhood: "Taksim Square & Bosphorus Terrace", features: ["Panoramic Bosphorus Strait Views", "2-min walk to Taksim Metro", "Spacious Family Suites"] },
    ];
  }
  if (lower.includes("paris") || lower.includes("france")) {
    return [
      { id: "h29", name: "Hôtel Excelsior Opéra Paris", category: "Central Value", rating: "3★", review: "8.5/10 Very Good", priceBdt: 17800, neighborhood: "Opéra & Grands Boulevards (9th Arr.), Paris", features: ["Walk to Galeries Lafayette & Metro", "Halal Brasseries Nearby", "Direct RoissyBus from CDG"] },
      { id: "h30", name: "Pullman Paris Tour Eiffel", category: "Iconic View", rating: "4★", review: "8.9/10 Excellent", priceBdt: 34500, neighborhood: "15th Arr. (Steps from Eiffel Tower & Seine)", features: ["Direct Eiffel Tower Views", "Family Connecting Rooms", "5-min walk to Bir-Hakeim Metro"] },
      { id: "h31", name: "Hôtel Napoléon Champs-Élysées", category: "5★ Luxury", rating: "5★", review: "9.3/10 Superb", priceBdt: 46000, neighborhood: "Arc de Triomphe & Champs-Élysées, Paris", features: ["Classic Haussmann Suites", "2-min walk to Charles de Gaulle–Étoile", "VIP Concierge"] },
    ];
  }
  if (lower.includes("new york") || lower.includes("nyc") || lower.includes("manhattan")) {
    return [
      { id: "h32", name: "Pod Times Square Manhattan", category: "Midtown Value", rating: "3★", review: "8.5/10 Very Good", priceBdt: 19500, neighborhood: "Times Square & Hell's Kitchen, New York", features: ["Walk to Broadway & Subway Lines", "Halal Carts & Dining Nearby", "Modern Smart Pods"] },
      { id: "h33", name: "New York Hilton Midtown", category: "Family Hub", rating: "4★", review: "8.7/10 Excellent", priceBdt: 32800, neighborhood: "Sixth Avenue (Near Central Park & Rockefeller)", features: ["Halal-Famous 53rd St Platter Outside", "Spacious Family Two-Double Rooms", "Central Manhattan Base"] },
    ];
  }
  return [];
}

const EXPLORE_POPULAR_CITIES = [
  {
    city: "Makkah",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    tag: "Haram Walkable",
    flightDest: "Jeddah (JED)",
    fromBdt: 7800,
  },
  {
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    tag: "Eiffel & Opéra",
    flightDest: "Paris (CDG)",
    fromBdt: 17800,
  },
  {
    city: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    tag: "Deira & Downtown",
    flightDest: "Dubai (DXB)",
    fromBdt: 7200,
  },
  {
    city: "Madinah",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    tag: "Markazia Haram",
    flightDest: "Madinah (MED)",
    fromBdt: 9200,
  },
  {
    city: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    tag: "Pratunam & BTS",
    flightDest: "Bangkok (BKK)",
    fromBdt: 3900,
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    flag: "🇲🇾",
    tag: "Bukit Bintang & KLCC",
    flightDest: "Kuala Lumpur (KUL)",
    fromBdt: 2900,
  },
  {
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    tag: "Paddington & Central",
    flightDest: "London Heathrow (LHR)",
    fromBdt: 16500,
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    tag: "MRT & Marina Bay",
    flightDest: "Singapore (SIN)",
    fromBdt: 11800,
  },
  {
    city: "Maldives (Maafushi & Malé)",
    shortLabel: "Maldives",
    country: "Maldives",
    flag: "🇲🇻",
    tag: "Maafushi & Atolls",
    flightDest: "Malé, Maldives (MLE)",
    fromBdt: 8200,
  },
  {
    city: "Istanbul",
    country: "Turkey",
    flag: "🇹🇷",
    tag: "Sultanahmet & Taksim",
    flightDest: "Istanbul (IST)",
    fromBdt: 14200,
  },
  {
    city: "Kathmandu",
    country: "Nepal",
    flag: "🇳🇵",
    tag: "Thamel & Lazimpat",
    flightDest: "Kathmandu (KTM)",
    fromBdt: 2400,
  },
  {
    city: "New York",
    country: "United States",
    flag: "🇺🇸",
    tag: "Midtown Manhattan",
    flightDest: "New York (JFK)",
    fromBdt: 19500,
  },
];

export function TravelpayoutsCustomWidget({
  initialTab = "flights",
  initialFrom = "Dhaka (DAC)",
  initialTo = "Kathmandu (KTM)",
  initialHotelCity = "Kathmandu",
  hotelsOnly = false,
  showInlineResults = false,
  lang = "en",
}: TravelpayoutsCustomWidgetProps = {}) {
  const isBn = lang === "bn" || (typeof window !== "undefined" && window.location.pathname.startsWith("/bn"));
  const instanceId = useId();
  const fromAirportId = `${instanceId}-select-from-airport`;
  const toAirportId = `${instanceId}-select-to-airport`;
  const flightDateId = `${instanceId}-input-flight-date`;
  const hotelCityId = "ural-global-hotel-input";
  const checkinDateId = `${instanceId}-input-checkin-date`;
  const checkoutDateId = `${instanceId}-input-checkout-date`;
  const hotelRoomsId = `${instanceId}-select-hotel-rooms`;

  const [searchTab, setSearchTab] = useState<"flights" | "hotels">(
    hotelsOnly ? "hotels" : initialTab
  );
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [hotelCity, setHotelCity] = useState(initialHotelCity);
  const [date, setDate] = useState(() => getDefaultDateIso(14));
  const [checkOutDate, setCheckOutDate] = useState(() => getDefaultDateIso(18));
  const [travelers, setTravelers] = useState(2);
  const [currency, setCurrency] = useState<CurrencyCode>("BDT");
  const [isSearching, setIsSearching] = useState(false);
  const [searchUpdatedCount, setSearchUpdatedCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Autocomplete dropdown states
  const [activeDropdown, setActiveDropdown] = useState<"from" | "to" | "hotel" | null>(null);
  const [listeningField, setListeningField] = useState<"from" | "to" | "hotel" | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const [remotePlaces, setRemotePlaces] = useState<Array<{ label: string; code: string; city: string; country: string; flag: string }>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTab(hotelsOnly ? "hotels" : initialTab);
  }, [initialTab, hotelsOnly]);

  useEffect(() => {
    setFromCity(initialFrom);
  }, [initialFrom]);

  useEffect(() => {
    setToCity(initialTo);
  }, [initialTo]);

  useEffect(() => {
    setHotelCity(initialHotelCity);
  }, [initialHotelCity]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleVoiceInput = (field: "from" | "to" | "hotel", e: React.MouseEvent) => {
    e.stopPropagation();
    if (listeningField === field && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setListeningField(null);
      setVoiceStatus(null);
      return;
    }

    const SpeechRecognitionApi =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognitionApi) {
      setVoiceStatus("Voice dictation is not supported on this browser. Please type your city.");
      setTimeout(() => setVoiceStatus(null), 3500);
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }

    const recognition = new SpeechRecognitionApi();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListeningField(field);
    setActiveDropdown(null);
    setVoiceStatus(
      field === "hotel"
        ? "Listening... Say a city for your hotel stay (e.g. Makkah, Bangkok, Dubai)"
        : "Listening... Say a city or route (e.g. Dhaka to Bangkok)"
    );

    recognition.onresult = (event: any) => {
      const transcript = (event?.results?.[0]?.[0]?.transcript || "").replace(/[.,!?]/g, "").trim();
      setListeningField(null);
      if (!transcript) {
        setVoiceStatus(null);
        return;
      }

      if (field === "hotel") {
        setHotelCity(transcript);
        setVoiceStatus(`Hotel destination set to "${transcript}"`);
      } else {
        const parts = transcript
          .replace(/^from\s+/i, "")
          .split(/\s+(?:to|towards)\s+/i)
          .map((s: string) => s.trim())
          .filter(Boolean);
        if (parts.length >= 2) {
          setFromCity(parts[0]);
          setToCity(parts[1]);
          setVoiceStatus(`Route set: ${parts[0]} → ${parts[1]}`);
        } else if (field === "from") {
          setFromCity(transcript);
          setVoiceStatus(`Departure set to "${transcript}"`);
        } else {
          setToCity(transcript);
          setVoiceStatus(`Destination set to "${transcript}"`);
        }
      }
      setTimeout(() => setVoiceStatus(null), 4000);
    };

    recognition.onerror = () => {
      setListeningField(null);
      setVoiceStatus("Could not capture voice. Check microphone permission or type.");
      setTimeout(() => setVoiceStatus(null), 3500);
    };

    recognition.onend = () => {
      setListeningField(null);
    };

    try {
      recognition.start();
    } catch {
      setListeningField(null);
    }
  };

  // Fetch live global suggestions from Travelpayouts Places2 API
  useEffect(() => {
    const term =
      activeDropdown === "from"
        ? fromCity.trim()
        : activeDropdown === "to"
        ? toCity.trim()
        : activeDropdown === "hotel"
        ? hotelCity.trim()
        : "";

    if (!term || term.length < 2) {
      setRemotePlaces([]);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(term)}&locale=en&types[]=city&types[]=airport`
        );
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled || !Array.isArray(data)) return;
        const mapped = data.slice(0, 7).map((item: any) => {
          const code = (item.code || "KTM").toUpperCase();
          const city = item.name || item.city_name || code;
          const country = item.country_name || "International";
          return {
            label: `${city} (${code})`,
            code,
            city,
            country,
            flag: "🌍",
          };
        });
        setRemotePlaces(mapped);
      } catch {
        // Fallback silently to built-in global list
      }
    }, 130);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fromCity, toCity, hotelCity, activeDropdown]);

  const filteredFromAirports = useMemo(() => {
    const q = fromCity.trim().toLowerCase();
    const base = q
      ? GLOBAL_AIRPORTS.filter(
          (a) =>
            a.label.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q) ||
            a.country.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q)
        )
      : GLOBAL_AIRPORTS.slice(0, 10);
    const seen = new Set(base.map((b) => b.code));
    const merged = [...base];
    for (const r of remotePlaces) {
      if (!seen.has(r.code)) {
        seen.add(r.code);
        merged.push(r);
      }
    }
    return merged.slice(0, 8);
  }, [fromCity, remotePlaces]);

  const filteredToAirports = useMemo(() => {
    const q = toCity.trim().toLowerCase();
    const base = q
      ? GLOBAL_AIRPORTS.filter(
          (a) =>
            a.label.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q) ||
            a.country.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q)
        )
      : GLOBAL_AIRPORTS.slice(0, 12);
    const seen = new Set(base.map((b) => b.code));
    const merged = [...base];
    for (const r of remotePlaces) {
      if (!seen.has(r.code)) {
        seen.add(r.code);
        merged.push(r);
      }
    }
    return merged.slice(0, 8);
  }, [toCity, remotePlaces]);

  const filteredHotelCities = useMemo(() => {
    const q = hotelCity.trim().toLowerCase();
    const base = q
      ? GLOBAL_HOTEL_CITIES.filter(
          (h) =>
            h.city.toLowerCase().includes(q) ||
            h.country.toLowerCase().includes(q) ||
            h.zone.toLowerCase().includes(q)
        )
      : GLOBAL_HOTEL_CITIES;
    const seen = new Set(base.map((b) => b.city.toLowerCase()));
    const merged = [...base];
    for (const r of remotePlaces) {
      if (!seen.has(r.city.toLowerCase())) {
        seen.add(r.city.toLowerCase());
        merged.push({
          city: r.city,
          country: r.country,
          flag: r.flag,
          zone: `City Center & Top Rated Stays (${r.code})`,
          iata: r.code,
        });
      }
    }
    return merged.slice(0, 8);
  }, [hotelCity, remotePlaces]);

  const results = useMemo(() => {
    if (searchTab === "flights") {
      return getFlightOptions(fromCity, toCity);
    }
    return getHotelOptions(hotelCity);
  }, [searchTab, fromCity, toCity, hotelCity]);

  const origCode = useMemo(() => extractIataCode(fromCity, "DAC"), [fromCity]);
  const destCode = useMemo(() => extractIataCode(toCity, "KTM"), [toCity]);
  const searchCode = useMemo(
    () => buildSearchCode(origCode, destCode, date, checkOutDate, travelers),
    [origCode, destCode, date, checkOutDate, travelers]
  );

  const hotelMatchedHub = useMemo(() => {
    const q = hotelCity.trim().toLowerCase();
    return (
      GLOBAL_HOTEL_CITIES.find((h) => q.includes(h.city.toLowerCase())) ||
      GLOBAL_HOTEL_CITIES[0]
    );
  }, [hotelCity]);

  const hotelIataCode = hotelMatchedHub?.iata || destCode || "KTM";
  const aviasalesDeepUrl = `https://www.aviasales.com/search/${searchCode}?marker=${MARKER_ID}&currency=${currency}`;
  const uralWlDeepUrl = `/travelpayouts-wl.html?origin=${origCode}&destination=${
    searchTab === "hotels" ? hotelIataCode : destCode
  }&flightSearch=${searchCode}&currency=${currency}&standalone=1`;
  const klookHotelsPartnerUrl = resolvePartnerUrl(AFFILIATE_LINKS.klook);
  const kkdayStayPartnerUrl = resolvePartnerUrl(AFFILIATE_LINKS.kkday);
  const goCityPassUrl = resolvePartnerUrl(AFFILIATE_LINKS.goCity);
  const [swapRotated, setSwapRotated] = useState(false);

  const formatPrice = (bdtAmount: number) => {
    const cfg = CURRENCY_OPTIONS[currency] || CURRENCY_OPTIONS.BDT;
    const val = Math.round(bdtAmount * cfg.rateFromBdt);
    return `${cfg.symbol}${val.toLocaleString()} ${cfg.code}`;
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setSwapRotated((prev) => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (showInlineResults) {
      setIsSearching(true);
      setSelectedItem(null);

      setTimeout(() => {
        setIsSearching(false);
        setSearchUpdatedCount((c) => c + 1);
      }, 280);
    }
  };

  return (
    <div
      ref={wrapperRef}
      id="travelpayouts-affiliate-block"
      className="bg-white rounded-2xl shadow-[0_14px_34px_-10px_rgba(11,25,44,0.18)] border border-slate-200/90 overflow-visible my-2 text-slate-900"
    >
      {/* Widget Header / Segmented Control & Global Currency Switcher */}
      <div className="bg-brand-navy px-4 py-3 sm:px-6 text-white flex flex-wrap items-center justify-between gap-3 rounded-t-2xl border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2.5">
          {hotelsOnly ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F6B73C]/15 border border-[#F6B73C]/35 text-[#F6B73C] text-xs sm:text-sm font-bold">
              <Building size={15} />
              <span>URAL Global Hotel &amp; Resort Finder</span>
              <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider bg-[#F6B73C] text-brand-navy px-2 py-0.5 rounded-md font-extrabold ml-1">
                Verified Klook Stays
              </span>
            </div>
          ) : (
            <div
              role="group"
              aria-label="Search mode"
              className="inline-flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700"
            >
              <button
                id="tab-search-flights"
                type="button"
                onClick={() => {
                  setSearchTab("flights");
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  searchTab === "flights"
                    ? "bg-[#F6B73C] text-brand-navy shadow-2xs"
                    : "hover:text-white text-slate-300"
                }`}
              >
                <Plane size={14} />
                Search Flights
              </button>
              <button
                id="tab-search-hotels"
                type="button"
                onClick={() => {
                  setSearchTab("hotels");
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  searchTab === "hotels"
                    ? "bg-[#F6B73C] text-brand-navy shadow-2xs"
                    : "hover:text-white text-slate-300"
                }`}
              >
                <Building size={14} />
                Search Hotels
              </button>
            </div>
          )}

          {/* Voice Dictation Quick Pill */}
          <button
            type="button"
            onClick={(e) =>
              handleVoiceInput(searchTab === "hotels" ? "hotel" : "to", e)
            }
            aria-label={
              listeningField
                ? "Stop voice dictation"
                : "Dictate destination city by voice"
            }
            aria-pressed={Boolean(listeningField)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              listeningField
                ? "bg-rose-500 text-white border-rose-400 animate-pulse"
                : "bg-slate-800/90 hover:bg-slate-800 text-[#F6B73C] border-slate-700"
            }`}
          >
            {listeningField ? <MicOff size={13} /> : <Mic size={13} />}
            <span>{listeningField ? "Listening..." : "Voice Search"}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-300 font-medium mr-1 hidden sm:inline">
            Currency:
          </span>
          <div className="inline-flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-[11px] font-semibold">
            {(Object.keys(CURRENCY_OPTIONS) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  currency === code
                    ? "bg-[#F6B73C] text-brand-navy font-bold shadow-2xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Popular Cities — Horizontal Scrollable One-Click Hub Bar */}
      <div className="bg-slate-50/90 px-4 sm:px-6 py-3 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-navy shrink-0 mr-1">
          <MapPin size={12} className="text-[#F6B73C]" />
          Popular Hubs:
        </span>
        {EXPLORE_POPULAR_CITIES.map((hub) => {
          const firstWord = hub.city.toLowerCase().split(" ")[0];
          const isActive =
            searchTab === "hotels" &&
            hotelCity.toLowerCase().includes(firstWord);
          const displayLabel = hub.shortLabel || hub.city;

          return (
            <button
              key={hub.city}
              type="button"
              title={`${hub.city} (${hub.tag}) — from ${formatPrice(hub.fromBdt)}`}
              onClick={() => {
                setSearchTab("hotels");
                setHotelCity(hub.city);
                setToCity(hub.flightDest);
                setActiveDropdown(null);
                setSelectedItem(null);
              }}
              className={`min-h-[34px] shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-brand-navy text-white border-brand-navy shadow-2xs"
                  : "bg-white hover:bg-amber-50/60 text-slate-800 border-slate-200/90 hover:border-[#F6B73C]"
              }`}
            >
              <span className="font-bold">
                {hub.flag} {displayLabel}
              </span>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isActive ? "text-[#F6B73C]" : "text-emerald-700"
                }`}
              >
                {formatPrice(hub.fromBdt)}+
              </span>
            </button>
          );
        })}
      </div>

      {/* Unified Search Strip Form */}
      <div
        className={`p-4 sm:p-6 bg-white ${
          showInlineResults ? "border-b border-slate-200" : "rounded-b-2xl"
        }`}
      >
        <form onSubmit={handleSearch}>
          {searchTab === "flights" ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-stretch bg-slate-50/80 p-2 rounded-2xl border border-slate-200/90 shadow-inner">
              {/* Departure Airport Global Autocomplete */}
              <div className="md:col-span-4 relative">
                <div className="h-[68px] bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.01] focus-within:shadow-md">
                  <label
                    htmlFor={fromAirportId}
                    className="text-[11px] font-semibold text-slate-500"
                  >
                    From
                  </label>
                  <input
                    id={fromAirportId}
                    type="text"
                    value={fromCity}
                    placeholder="City or airport (e.g. Dhaka, London)"
                    onFocus={() => setActiveDropdown("from")}
                    onChange={(e) => {
                      setFromCity(e.target.value);
                      setActiveDropdown("from");
                    }}
                    className="w-full bg-transparent text-sm font-extrabold text-slate-900 focus:outline-none truncate"
                  />
                  <span className="text-[11px] text-slate-500 truncate font-mono">
                    Origin ({origCode})
                  </span>
                </div>
                {activeDropdown === "from" && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto py-1">
                    {filteredFromAirports.map((a) => (
                      <button
                        key={`from-${a.code}-${a.city}`}
                        type="button"
                        onClick={() => {
                          setFromCity(`${a.city} (${a.code})`);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer"
                      >
                        <span className="font-semibold text-slate-800">
                          {a.flag} {a.city} ·{" "}
                          <span className="text-slate-500 font-normal">
                            {a.country}
                          </span>
                        </span>
                        <span className="font-mono font-bold text-brand-navy bg-slate-100 px-1.5 py-0.5 rounded">
                          {a.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Destination Airport Global Autocomplete */}
              <div className="md:col-span-4 relative">
                <div className="h-[68px] bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.01] focus-within:shadow-md">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={toAirportId}
                      className="text-[11px] font-semibold text-slate-500"
                    >
                      To
                    </label>
                    <button
                      type="button"
                      onClick={swapCities}
                      title="Swap Departure and Destination"
                      aria-label="Swap departure and destination cities"
                      className="text-[11px] font-bold text-brand-navy hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowRightLeft
                        size={12}
                        style={{
                          transform: swapRotated ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                      Swap
                    </button>
                  </div>
                  <input
                    id={toAirportId}
                    type="text"
                    value={toCity}
                    placeholder="Destination (e.g. Bangkok, Rome, JFK)"
                    onFocus={() => setActiveDropdown("to")}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      setActiveDropdown("to");
                    }}
                    className="w-full bg-transparent text-sm font-extrabold text-slate-900 focus:outline-none truncate"
                  />
                  <span className="text-[11px] text-slate-500 truncate font-mono">
                    Destination ({destCode})
                  </span>
                </div>
                {activeDropdown === "to" && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto py-1">
                    {filteredToAirports.map((a) => (
                      <button
                        key={`to-${a.code}-${a.city}`}
                        type="button"
                        onClick={() => {
                          setToCity(`${a.city} (${a.code})`);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer"
                      >
                        <span className="font-semibold text-slate-800">
                          {a.flag} {a.city} ·{" "}
                          <span className="text-slate-500 font-normal">
                            {a.country}
                          </span>
                        </span>
                        <span className="font-mono font-bold text-brand-navy bg-slate-100 px-1.5 py-0.5 rounded">
                          {a.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 h-[68px] bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.01] focus-within:shadow-md">
                <label
                  htmlFor={flightDateId}
                  className="text-[11px] font-semibold text-slate-500"
                >
                  Departure
                </label>
                <input
                  id={flightDateId}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                />
                <span className="text-[11px] text-slate-500 truncate">
                  Live Fares
                </span>
              </div>

              <div className="md:col-span-2 flex">
                <a
                  id="btn-search-flights-submit"
                  href={uralWlDeepUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveDropdown(null)}
                  className="w-full h-[68px] bg-[#F6B73C] hover:bg-[#f5ad24] active:scale-[0.98] text-brand-navy rounded-xl text-sm font-black transition-transform flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-md border border-amber-400/80"
                >
                  <div className="flex items-center gap-1.5">
                    <Search size={16} />
                    <span>Search Flights</span>
                    <ExternalLink size={13} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-navy/80">
                    {origCode} → {destCode} · {currency}
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch bg-slate-50/80 p-2 rounded-2xl border border-slate-200/90 shadow-inner">
              {/* Global Hotel City / Property Autocomplete */}
              <div className="lg:col-span-4 relative">
                <div
                  onClick={() => setActiveDropdown("hotel")}
                  className={`h-[68px] bg-white border rounded-xl px-3.5 py-2 flex flex-col justify-between cursor-text transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.008] focus-within:shadow-md ${
                    activeDropdown === "hotel"
                      ? "border-[#F6B73C] ring-3 ring-[#F6B73C]/20 shadow-md"
                      : "border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={hotelCityId}
                      className="text-[11px] font-semibold text-slate-600 cursor-pointer"
                    >
                      Destination City or Hotel
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleVoiceInput("hotel", e)}
                        aria-label={
                          listeningField === "hotel"
                            ? "Stop voice input for hotel destination"
                            : "Dictate hotel destination city by voice"
                        }
                        aria-pressed={listeningField === "hotel"}
                        title="Dictate hotel destination city by voice"
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          listeningField === "hotel"
                            ? "bg-rose-500 text-white ring-4 ring-rose-500/25 animate-pulse"
                            : "bg-slate-100 hover:bg-brand-navy text-slate-600 hover:text-[#F6B73C]"
                        }`}
                      >
                        {listeningField === "hotel" ? (
                          <MicOff size={12} />
                        ) : (
                          <Mic size={12} />
                        )}
                      </button>
                      <span className="text-[10px] font-mono font-bold bg-[#F6B73C]/25 text-brand-navy px-1.5 py-0.5 rounded">
                        VERIFIED STAYS
                      </span>
                    </div>
                  </div>
                  <input
                    id={hotelCityId}
                    type="text"
                    value={hotelCity}
                    placeholder="e.g. Makkah, Bangkok, Dubai, Paris, London..."
                    onFocus={() => setActiveDropdown("hotel")}
                    onChange={(e) => {
                      setHotelCity(e.target.value);
                      setActiveDropdown("hotel");
                    }}
                    className="w-full bg-transparent text-sm sm:text-[15px] font-extrabold text-slate-900 placeholder:text-slate-400 placeholder:font-medium focus:outline-none truncate"
                  />
                  <span className="text-[11px] text-slate-500 truncate">
                    {filteredHotelCities[0]?.zone ||
                      "Hotels, Resorts & Family Suites"}
                  </span>
                </div>
                {activeDropdown === "hotel" && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto py-1">
                    <div className="px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/60">
                      Select Popular City or Type Any Destination Worldwide
                    </div>
                    {filteredHotelCities.map((h) => (
                      <button
                        key={`hotel-city-${h.city}-${h.country}`}
                        type="button"
                        onClick={() => {
                          setHotelCity(h.city);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-2 text-xs cursor-pointer border-b border-slate-50 last:border-0"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900">
                            {h.flag} {h.city}{" "}
                            <span className="font-normal text-slate-500">
                              · {h.country}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {h.zone}
                          </div>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-brand-navy bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                          {h.iata}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in Date */}
              <div className="lg:col-span-2">
                <div className="h-[68px] bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.008] focus-within:shadow-md">
                  <label
                    htmlFor={checkinDateId}
                    className="text-[11px] font-semibold text-slate-600 cursor-pointer"
                  >
                    Check-In
                  </label>
                  <input
                    id={checkinDateId}
                    type="date"
                    value={date}
                    onChange={(e) => {
                      const nextIn = e.target.value;
                      setDate(nextIn);
                      if (checkOutDate && nextIn >= checkOutDate) {
                        setCheckOutDate(nextIn);
                      }
                    }}
                    className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 truncate">
                    Flexible check-in
                  </span>
                </div>
              </div>

              {/* Check-out Date */}
              <div className="lg:col-span-2">
                <div className="h-[68px] bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.008] focus-within:shadow-md">
                  <label
                    htmlFor={checkoutDateId}
                    className="text-[11px] font-semibold text-slate-600 cursor-pointer"
                  >
                    Check-Out
                  </label>
                  <input
                    id={checkoutDateId}
                    type="date"
                    value={checkOutDate}
                    min={date}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 truncate">
                    Instant voucher
                  </span>
                </div>
              </div>

              {/* Guests / Rooms */}
              <div className="lg:col-span-2">
                <div className="h-[68px] bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl px-3.5 py-2 flex flex-col justify-between transition-all duration-200 focus-within:border-[#F6B73C] focus-within:ring-3 focus-within:ring-[#F6B73C]/20 focus-within:scale-[1.008] focus-within:shadow-md">
                  <label
                    htmlFor={hotelRoomsId}
                    className="text-[11px] font-semibold text-slate-600 cursor-pointer"
                  >
                    Guests &amp; Rooms
                  </label>
                  <select
                    id={hotelRoomsId}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="1">1 Guest · 1 Room</option>
                    <option value="2">2 Guests · 1 Room</option>
                    <option value="3">3 Guests · 1 Room</option>
                    <option value="4">4 Guests · 2 Rooms</option>
                  </select>
                  <span className="text-[11px] text-slate-500 truncate">
                    Dual-Currency Card OK
                  </span>
                </div>
              </div>

              {/* Primary Submit CTA — Routes directly to Approved Klook Hotel Partner (8% Commission) */}
              <div className="lg:col-span-2 flex">
                <a
                  id="btn-search-hotels-submit"
                  href={klookHotelsPartnerUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => {
                    setActiveDropdown(null);
                  }}
                  className="w-full h-[68px] bg-[#F6B73C] text-brand-navy hover:bg-[#f5ad24] active:scale-[0.98] rounded-xl border border-amber-400/90 shadow-[0_10px_22px_-5px_rgba(246,183,60,0.5)] transition-transform flex flex-col items-center justify-center gap-0.5 cursor-pointer px-3 text-center group"
                >
                  <div className="flex items-center gap-1.5 font-black text-sm sm:text-[15px] tracking-tight">
                    <Search size={16} className="shrink-0 stroke-[2.5]" />
                    <span>Search Hotels</span>
                    <ExternalLink
                      size={13}
                      className="shrink-0 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-navy/80 truncate max-w-full">
                    {hotelCity || "Global"} · {currency}
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* Voice Dictation Status Banner */}
          {voiceStatus && (
            <div
              role="status"
              aria-live="polite"
              className="mt-3 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-50 border border-[#F6B73C] text-brand-navy flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <Mic
                  size={13}
                  className="text-rose-500 animate-pulse shrink-0"
                />
                <span>{voiceStatus}</span>
              </span>
              <button
                type="button"
                onClick={() => setVoiceStatus(null)}
                className="text-[11px] font-mono underline opacity-75 hover:opacity-100 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Quiet Footer Row: Trust Microcopy + Demoted Revenue Partner Links */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] text-slate-500">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                Free · No account needed · Instant Hotel &amp; Pass Vouchers (
                {hotelCity || "Worldwide"})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={klookHotelsPartnerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:text-amber-700 bg-amber-50/90 hover:bg-amber-100/80 border border-amber-200/80 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>Klook Hotels &amp; Resorts</span>
                <ExternalLink size={11} />
              </a>
              <a
                href={goCityPassUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>Go City All-Inclusive &amp; Explorer Pass</span>
                <ExternalLink size={11} />
              </a>
              <a
                href={kkdayStayPartnerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>KKday Stay Packages</span>
                <ExternalLink size={11} />
              </a>
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:text-emerald-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>Luggage Storage (Radical)</span>
                <ExternalLink size={11} />
              </a>
              <a
                href={uralWlDeepUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-brand-navy px-2 py-1 rounded-lg transition-colors"
              >
                <span>URAL White-Label Portal</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </form>
      </div>

      {/* Results List & Live Partner Dispatch (Only rendered if showInlineResults is explicitly enabled) */}
      {showInlineResults && (
        <div className="p-4 sm:p-6 bg-white space-y-4 rounded-b-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#07C369]" />
              <span className="text-xs font-bold text-slate-800">
                {searchTab === "flights"
                  ? `Flights: ${fromCity} → ${toCity} (${date})`
                  : `Stays in ${
                      hotelCity || "Global Destination"
                    } · Check-in ${date} – Check-out ${checkOutDate}`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {searchUpdatedCount > 0 && (
                <span className="text-xs font-medium text-emerald-700">
                  ✓ Updated for your query
                </span>
              )}
              {searchTab === "hotels" ? (
                <>
                  <a
                    href={klookHotelsPartnerUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>
                      Search {hotelCity} Hotels on Klook ({currency})
                    </span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={goCityPassUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-[#07C369] hover:bg-[#06ad5d] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Go City All-Inclusive Pass</span>
                    <ExternalLink size={12} />
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={uralWlDeepUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#07C369] hover:bg-[#06ad5d] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>{isBn ? 'লাইভ টিকিট সার্চ' : 'Search Live Fares'}</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={aviasalesDeepUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Aviasales Global ({currency})</span>
                    <ExternalLink size={12} />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Curated Results OR Global Live Dispatch Card */}
          {results.length > 0 ? (
            <div className="space-y-3">
              {searchTab === "flights"
                ? results.map((flight: any) => (
                    <div
                      key={flight.id}
                      className="border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-brand-navy text-[#F6B73C] rounded-xl shrink-0 mt-0.5">
                          <Plane size={18} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">
                              {flight.airline}
                            </h4>
                            <span className="text-xs font-mono text-slate-500">
                              {flight.flightNo}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs font-semibold text-emerald-700">
                              {flight.score}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 mt-1">
                            <strong>{flight.departs}</strong> →{" "}
                            <strong>{flight.arrives}</strong> ({flight.duration}{" "}
                            · {flight.stops})
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <Luggage size={12} /> {flight.baggage}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-brand-navy tabular-nums">
                            {formatPrice(flight.priceBdt)}
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            Round-trip incl. taxes
                          </span>
                        </div>
                        <button
                          id={`btn-book-flight-${flight.id}`}
                          type="button"
                          onClick={() =>
                            setSelectedItem({ type: "flight", ...flight })
                          }
                          className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Select Flight
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                : results.map((hotel: any) => (
                    <div
                      key={hotel.id}
                      className="border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-slate-100 text-brand-navy rounded-xl shrink-0 mt-0.5">
                          <Building size={18} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">
                              {hotel.name}
                            </h4>
                            <span className="text-xs text-amber-600 font-bold">
                              {hotel.rating}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-emerald-700 font-medium">
                              {hotel.review}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />{" "}
                            {hotel.neighborhood}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                            {hotel.features.map(
                              (feature: string, idx: number) => (
                                <React.Fragment key={idx}>
                                  {idx > 0 && <span aria-hidden="true">·</span>}
                                  <span>{feature}</span>
                                </React.Fragment>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-slate-900 tabular-nums">
                            {formatPrice(hotel.priceBdt)}
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            Per Room / Night
                          </span>
                        </div>
                        <a
                          id={`btn-book-hotel-${hotel.id}`}
                          href={klookHotelsPartnerUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Check Rates on Klook
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          ) : (
            /* Global City / Route Live Partner Dispatch Card when user searches any other city on Earth */
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-brand-navy text-[#F6B73C] px-2.5 py-1 rounded-md">
                <Sparkles size={12} />
                <span>
                  {searchTab === "hotels"
                    ? `Global Hotel Search Ready · ${hotelCity}`
                    : `Global Flight Search Ready · ${origCode} → ${destCode}`}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {searchTab === "hotels"
                  ? `Compare Live Hotel Rates & Family Stays in ${hotelCity} (${currency})`
                  : `Compare Live Airlines for ${fromCity} → ${toCity} (${currency})`}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {searchTab === "hotels"
                  ? `Open verified hotel deals and family resort packages for ${hotelCity} (${date} to ${checkOutDate}, ${travelers} ${
                      travelers === 1 ? "Guest" : "Guests"
                    }) on Klook or KKday.`
                  : `Open live global flight search results for ${fromCity} to ${toCity} on ${date} in ${currency} via URAL Branded White-Label (#22462) or Aviasales Global (#${MARKER_ID}).`}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {searchTab === "hotels" ? (
                  <>
                    <a
                      href={klookHotelsPartnerUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Search Hotels on Klook ({currency})</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={kkdayStayPartnerUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Compare KKday Stay Deals</span>
                      <ExternalLink size={13} />
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href={uralWlDeepUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isBn ? 'লাইভ ফ্লাইট সার্চ' : 'Search Live Flights'}</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={aviasalesDeepUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Compare on Aviasales Global</span>
                      <ExternalLink size={13} />
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Selected Booking Confirmation Banner */}
          {selectedItem && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#07C369]" />
                  <span>
                    {selectedItem.type === "flight"
                      ? `${selectedItem.airline} (${
                          selectedItem.flightNo
                        }) — ${formatPrice(selectedItem.priceBdt)}`
                      : `${selectedItem.name} (${
                          selectedItem.neighborhood
                        }) — ${formatPrice(selectedItem.priceBdt)}/night`}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Continue to official partner booking portal to lock in this
                  rate for {date} ({currency}).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {selectedItem.type === "flight" ? (
                  <>
                    <a
                      href={uralWlDeepUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isBn ? 'বুকিং সম্পন্ন করুন' : 'Book Flight Online'}</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={aviasalesDeepUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Aviasales Global Checkout</span>
                      <ExternalLink size={13} />
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href={klookHotelsPartnerUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Book Hotel on Klook</span>
                      <ExternalLink size={13} />
                    </a>
                    <a
                      href={kkdayStayPartnerUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Compare on KKday</span>
                      <ExternalLink size={13} />
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
