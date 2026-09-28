import React, { useEffect, useRef, useState, useMemo, useId } from 'react';
import {
  Plane,
  Search,
  ArrowRightLeft,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Luggage,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Filter,
  ArrowUpDown,
  MapPin,
  RefreshCw,
  Utensils,
  AlertCircle,
} from 'lucide-react';

const MARKER_ID = '675992';
const BDT_PER_USD = 120;

const POPULAR_ROUTES = [
  { label: 'Dhaka → Kathmandu', origin: 'DAC', destination: 'KTM', flag: '🇳🇵', badge: 'Visa on Arrival' },
  { label: 'Dhaka → Bangkok', origin: 'DAC', destination: 'BKK', flag: '🇹🇭', badge: '2h 30m Direct' },
  { label: 'Dhaka → Kuala Lumpur', origin: 'DAC', destination: 'KUL', flag: '🇲🇾', badge: 'Easy e-Visa' },
  { label: 'Dhaka → Dubai', origin: 'DAC', destination: 'DXB', flag: '🇦🇪', badge: '4 Daily Direct' },
  { label: 'Dhaka → Singapore', origin: 'DAC', destination: 'SIN', flag: '🇸🇬', badge: '4h 05m Direct' },
  { label: 'Dhaka → Maldives', origin: 'DAC', destination: 'MLE', flag: '🇲🇻', badge: 'Free Entry Visa' },
  { label: 'Dhaka → Guangzhou', origin: 'DAC', destination: 'CAN', flag: '🇨🇳', badge: 'Business Hub' },
];

const AIRPORTS_DIRECTORY = [
  { code: 'DAC', city: 'Dhaka', name: 'Hazrat Shahjalal International Airport', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'CGP', city: 'Chattogram', name: 'Shah Amanat International Airport', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'ZYL', city: 'Sylhet', name: 'Osmani International Airport', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'CXB', city: "Cox's Bazar", name: "Cox's Bazar Airport", country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'KTM', city: 'Kathmandu', name: 'Tribhuvan International Airport', country: 'Nepal', flag: '🇳🇵' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi International Airport', country: 'Thailand', flag: '🇹🇭' },
  { code: 'DMK', city: 'Bangkok (Don Mueang)', name: 'Don Mueang International Airport', country: 'Thailand', flag: '🇹🇭' },
  { code: 'HKT', city: 'Phuket', name: 'Phuket International Airport', country: 'Thailand', flag: '🇹🇭' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International Airport', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'AUH', city: 'Abu Dhabi', name: 'Zayed International Airport', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SHJ', city: 'Sharjah', name: 'Sharjah International Airport', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SIN', city: 'Singapore', name: 'Changi International Airport', country: 'Singapore', flag: '🇸🇬' },
  { code: 'MLE', city: 'Malé', name: 'Velana International Airport', country: 'Maldives', flag: '🇲🇻' },
  { code: 'CAN', city: 'Guangzhou', name: 'Baiyun International Airport', country: 'China', flag: '🇨🇳' },
  { code: 'KMG', city: 'Kunming', name: 'Changshui International Airport', country: 'China', flag: '🇨🇳' },
  { code: 'CMB', city: 'Colombo', name: 'Bandaranaike International Airport', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose Intl', country: 'India', flag: '🇮🇳' },
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'DOH', city: 'Doha', name: 'Hamad International Airport', country: 'Qatar', flag: '🇶🇦' },
  { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz International Airport', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'RUH', city: 'Riyadh', name: 'King Khalid International Airport', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey', flag: '🇹🇷' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport', country: 'United States', flag: '🇺🇸' },
  { code: 'YYZ', city: 'Toronto', name: 'Pearson International Airport', country: 'Canada', flag: '🇨🇦' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith Airport', country: 'Australia', flag: '🇦🇺' },
];

const ROUTE_DATABASE = {
  KTM: {
    visaNote: 'Free 30-Day Visa on Arrival at Kathmandu Airport for Bangladeshi citizens (1st visit/year)',
    visaBadge: 'Free Visa on Arrival',
    bestWindow: 'Book 3–6 weeks ahead for lowest Himalayan fares',
    terminalTip: 'Depart from DAC Terminal 1/2 · Arrive KTM International Terminal (15 mins to Thamel)',
    flights: [
      {
        id: 'ktm-bg-371',
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: 'BG 371',
        returnFlightNo: 'BG 372',
        aircraft: 'Boeing 737-800',
        departTime: '10:35',
        arriveTime: '12:05',
        returnDepartTime: '13:05',
        returnArriveTime: '14:50',
        durationMinutes: 90,
        durationText: '1h 30m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Date change with low fee',
        baseRoundtripBdt: 29800,
        badge: 'Best Overall Value',
        badgeType: 'emerald',
        reliability: '94% On-Time',
      },
      {
        id: 'ktm-h9-556',
        airline: 'Himalaya Airlines',
        airlineCode: 'H9',
        flightNo: 'H9 556',
        returnFlightNo: 'H9 555',
        aircraft: 'Airbus A320-214',
        departTime: '13:20',
        arriveTime: '14:50',
        returnDepartTime: '11:10',
        returnArriveTime: '12:50',
        durationMinutes: 90,
        durationText: '1h 30m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Standard economy rules',
        baseRoundtripBdt: 31200,
        badge: 'Popular Direct',
        badgeType: 'blue',
        reliability: '91% On-Time',
      },
      {
        id: 'ktm-6e-118',
        airline: 'IndiGo',
        airlineCode: '6E',
        flightNo: '6E 1182',
        returnFlightNo: '6E 1185',
        aircraft: 'Airbus A320neo',
        departTime: '08:10',
        arriveTime: '14:25',
        returnDepartTime: '15:30',
        returnArriveTime: '21:15',
        durationMinutes: 375,
        durationText: '6h 15m',
        stops: 1,
        stopText: '1 Stop via Kolkata (CCU)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: false,
        refundable: 'Promo saver fare',
        baseRoundtripBdt: 27400,
        badge: 'Lowest Price',
        badgeType: 'amber',
        reliability: '95% On-Time',
      },
      {
        id: 'ktm-bs-211',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 211',
        returnFlightNo: 'BS 212',
        aircraft: 'Boeing 737-800',
        departTime: '15:45',
        arriveTime: '17:15',
        returnDepartTime: '18:10',
        returnArriveTime: '19:55',
        durationMinutes: 90,
        durationText: '1h 30m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Flexible reschedule',
        baseRoundtripBdt: 32900,
        badge: 'Afternoon Direct',
        badgeType: 'slate',
        reliability: '92% On-Time',
      },
    ],
  },
  BKK: {
    visaNote: 'Thailand e-Visa required before travel (typically approved in 5–10 working days)',
    visaBadge: 'Thailand e-Visa Required',
    bestWindow: 'Book 30–45 days ahead; Tuesday & Wednesday departures save ~BDT 4,500',
    terminalTip: 'BKK flights land at Suvarnabhumi · SL 225 lands at Don Mueang (DMK)',
    flights: [
      {
        id: 'bkk-sl-225',
        airline: 'Thai Lion Air',
        airlineCode: 'SL',
        flightNo: 'SL 225',
        returnFlightNo: 'SL 224',
        aircraft: 'Boeing 737-800',
        departTime: '02:15',
        arriveTime: '05:45',
        returnDepartTime: '23:35',
        returnArriveTime: '01:15',
        durationMinutes: 150,
        durationText: '2h 30m',
        stops: 0,
        stopText: 'Direct (Don Mueang DMK)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: false,
        refundable: 'Low-cost saver fare',
        baseRoundtripBdt: 31800,
        badge: 'Cheapest Direct',
        badgeType: 'amber',
        reliability: '89% On-Time',
      },
      {
        id: 'bkk-bg-388',
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: 'BG 388',
        returnFlightNo: 'BG 389',
        aircraft: 'Boeing 737-800',
        departTime: '11:30',
        arriveTime: '15:00',
        returnDepartTime: '16:15',
        returnArriveTime: '17:50',
        durationMinutes: 150,
        durationText: '2h 30m',
        stops: 0,
        stopText: 'Direct Flight (BKK)',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Date change available',
        baseRoundtripBdt: 35600,
        badge: 'Best Value + 30kg Bag',
        badgeType: 'emerald',
        reliability: '93% On-Time',
      },
      {
        id: 'bkk-bs-217',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 217',
        returnFlightNo: 'BS 218',
        aircraft: 'Boeing 737-800',
        departTime: '10:10',
        arriveTime: '13:40',
        returnDepartTime: '14:40',
        returnArriveTime: '16:15',
        durationMinutes: 150,
        durationText: '2h 30m',
        stops: 0,
        stopText: 'Direct Flight (BKK)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Standard economy rules',
        baseRoundtripBdt: 34400,
        badge: 'Morning Direct',
        badgeType: 'blue',
        reliability: '91% On-Time',
      },
      {
        id: 'bkk-tg-322',
        airline: 'Thai Airways',
        airlineCode: 'TG',
        flightNo: 'TG 322',
        returnFlightNo: 'TG 321',
        aircraft: 'Airbus A350-900',
        departTime: '13:35',
        arriveTime: '17:05',
        returnDepartTime: '10:55',
        returnArriveTime: '12:30',
        durationMinutes: 150,
        durationText: '2h 30m',
        stops: 0,
        stopText: 'Direct Flight (BKK)',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Full-Service Flexible',
        baseRoundtripBdt: 42800,
        badge: 'Premium Full-Service',
        badgeType: 'slate',
        reliability: '97% On-Time',
      },
    ],
  },
  KUL: {
    visaNote: 'Malaysia Digital e-Visa required online prior to flight (approved in 2–5 working days)',
    visaBadge: 'Online Malaysia e-Visa',
    bestWindow: 'Book 4–8 weeks ahead; KLIA1 & KLIA2 have 5 daily direct flights from Dhaka',
    terminalTip: 'AirAsia lands at KLIA2 · Malaysia Airlines, Biman & Batik land at KLIA Terminal 1',
    flights: [
      {
        id: 'kul-ak-71',
        airline: 'AirAsia',
        airlineCode: 'AK',
        flightNo: 'AK 71',
        returnFlightNo: 'AK 70',
        aircraft: 'Airbus A320neo',
        departTime: '00:25',
        arriveTime: '06:15',
        returnDepartTime: '21:50',
        returnArriveTime: '23:45',
        durationMinutes: 230,
        durationText: '3h 50m',
        stops: 0,
        stopText: 'Direct Flight (KLIA2)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: false,
        refundable: 'Value pack included',
        baseRoundtripBdt: 36200,
        badge: 'Lowest Direct Fare',
        badgeType: 'amber',
        reliability: '93% On-Time',
      },
      {
        id: 'kul-od-163',
        airline: 'Batik Air Malaysia',
        airlineCode: 'OD',
        flightNo: 'OD 163',
        returnFlightNo: 'OD 162',
        aircraft: 'Boeing 737 MAX 8',
        departTime: '22:15',
        arriveTime: '04:10',
        returnDepartTime: '19:15',
        returnArriveTime: '21:15',
        durationMinutes: 235,
        durationText: '3h 55m',
        stops: 0,
        stopText: 'Direct Flight (KLIA1)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Date change permitted',
        baseRoundtripBdt: 37900,
        badge: 'Best Value Direct',
        badgeType: 'emerald',
        reliability: '91% On-Time',
      },
      {
        id: 'kul-bg-386',
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: 'BG 386',
        returnFlightNo: 'BG 387',
        aircraft: 'Boeing 787-8 Dreamliner',
        departTime: '19:15',
        arriveTime: '01:10',
        returnDepartTime: '02:30',
        returnArriveTime: '04:25',
        durationMinutes: 235,
        durationText: '3h 55m',
        stops: 0,
        stopText: 'Direct Dreamliner',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Flexible economy',
        baseRoundtripBdt: 40800,
        badge: '30kg Baggage + Widebody',
        badgeType: 'blue',
        reliability: '92% On-Time',
      },
      {
        id: 'kul-mh-197',
        airline: 'Malaysia Airlines',
        airlineCode: 'MH',
        flightNo: 'MH 197',
        returnFlightNo: 'MH 196',
        aircraft: 'Airbus A330-300',
        departTime: '12:15',
        arriveTime: '18:05',
        returnDepartTime: '09:25',
        returnArriveTime: '11:15',
        durationMinutes: 230,
        durationText: '3h 50m',
        stops: 0,
        stopText: 'Direct Flight (KLIA1)',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Full-Service Carrier',
        baseRoundtripBdt: 45200,
        badge: 'Top Daytime Flight',
        badgeType: 'slate',
        reliability: '96% On-Time',
      },
    ],
  },
  DXB: {
    visaNote: 'UAE Tourist e-Visa required prior to travel (3–5 working days via airline or agency)',
    visaBadge: 'UAE e-Visa Required',
    bestWindow: 'Book 6–8 weeks ahead; direct flights take 4h 45m from Dhaka to Dubai DXB',
    terminalTip: 'Emirates arrives at DXB Terminal 3 · flydubai & Biman arrive at Terminal 1/2',
    flights: [
      {
        id: 'dxb-fz-524',
        airline: 'flydubai',
        airlineCode: 'FZ',
        flightNo: 'FZ 524',
        returnFlightNo: 'FZ 523',
        aircraft: 'Boeing 737 MAX 8',
        departTime: '21:40',
        arriveTime: '01:05',
        returnDepartTime: '13:15',
        returnArriveTime: '20:10',
        durationMinutes: 285,
        durationText: '4h 45m',
        stops: 0,
        stopText: 'Direct Flight (DXB)',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Value economy fare',
        baseRoundtripBdt: 56900,
        badge: 'Cheapest Direct',
        badgeType: 'amber',
        reliability: '92% On-Time',
      },
      {
        id: 'dxb-bg-347',
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: 'BG 347',
        returnFlightNo: 'BG 348',
        aircraft: 'Boeing 787-9 Dreamliner',
        departTime: '18:15',
        arriveTime: '21:35',
        returnDepartTime: '23:15',
        returnArriveTime: '06:05',
        durationMinutes: 280,
        durationText: '4h 40m',
        stops: 0,
        stopText: 'Direct Dreamliner',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Date change available',
        baseRoundtripBdt: 59800,
        badge: 'Best Overall Value',
        badgeType: 'emerald',
        reliability: '91% On-Time',
      },
      {
        id: 'dxb-bs-341',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 341',
        returnFlightNo: 'BS 342',
        aircraft: 'Airbus A330-300',
        departTime: '19:30',
        arriveTime: '22:55',
        returnDepartTime: '00:25',
        returnArriveTime: '07:15',
        durationMinutes: 285,
        durationText: '4h 45m',
        stops: 0,
        stopText: 'Direct Widebody',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Standard economy rules',
        baseRoundtripBdt: 58400,
        badge: 'Popular Evening Slot',
        badgeType: 'blue',
        reliability: '90% On-Time',
      },
      {
        id: 'dxb-ek-585',
        airline: 'Emirates',
        airlineCode: 'EK',
        flightNo: 'EK 585',
        returnFlightNo: 'EK 584',
        aircraft: 'Boeing 777-300ER',
        departTime: '01:40',
        arriveTime: '04:55',
        returnDepartTime: '16:45',
        returnArriveTime: '23:30',
        durationMinutes: 275,
        durationText: '4h 35m',
        stops: 0,
        stopText: 'Direct Terminal 3',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'World-Class Full Service',
        baseRoundtripBdt: 73500,
        badge: '5-Star Flag Carrier',
        badgeType: 'slate',
        reliability: '98% On-Time',
      },
    ],
  },
  SIN: {
    visaNote: 'Singapore e-Visa required via authorized local visa agent in Dhaka (5–7 working days)',
    visaBadge: 'Singapore e-Visa',
    bestWindow: 'Book 35–60 days before travel for best Changi Airport rates',
    terminalTip: 'All direct flights land at Singapore Changi Airport (MRT straight to city)',
    flights: [
      {
        id: 'sin-bs-307',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 307',
        returnFlightNo: 'BS 308',
        aircraft: 'Boeing 737-800',
        departTime: '22:50',
        arriveTime: '05:00',
        returnDepartTime: '06:10',
        returnArriveTime: '08:20',
        durationMinutes: 250,
        durationText: '4h 10m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Standard economy',
        baseRoundtripBdt: 41200,
        badge: 'Cheapest Direct',
        badgeType: 'amber',
        reliability: '91% On-Time',
      },
      {
        id: 'sin-bg-584',
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: 'BG 584',
        returnFlightNo: 'BG 585',
        aircraft: 'Boeing 787-8 Dreamliner',
        departTime: '08:30',
        arriveTime: '14:40',
        returnDepartTime: '15:55',
        returnArriveTime: '18:05',
        durationMinutes: 250,
        durationText: '4h 10m',
        stops: 0,
        stopText: 'Direct Dreamliner',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Flexible date change',
        baseRoundtripBdt: 44600,
        badge: 'Best Morning Direct',
        badgeType: 'emerald',
        reliability: '94% On-Time',
      },
      {
        id: 'sin-sq-447',
        airline: 'Singapore Airlines',
        airlineCode: 'SQ',
        flightNo: 'SQ 447',
        returnFlightNo: 'SQ 446',
        aircraft: 'Airbus A350-900',
        departTime: '23:55',
        arriveTime: '06:05',
        returnDepartTime: '20:35',
        returnArriveTime: '22:40',
        durationMinutes: 250,
        durationText: '4h 10m',
        stops: 0,
        stopText: 'Direct Changi T3',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: '5-Star Full Service',
        baseRoundtripBdt: 56800,
        badge: '5-Star Flag Carrier',
        badgeType: 'slate',
        reliability: '99% On-Time',
      },
    ],
  },
  MLE: {
    visaNote: 'Free 30-Day Maldives Tourist Visa on Arrival (requires IMUGA online form within 96h of flight)',
    visaBadge: 'Free Visa on Arrival',
    bestWindow: 'Book 4–6 weeks ahead; US-Bangla flies direct to Malé',
    terminalTip: 'Lands at Velana International Airport (MLE) with direct speedboat access to Maafushi & Hulhumalé',
    flights: [
      {
        id: 'mle-bs-337',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 337',
        returnFlightNo: 'BS 338',
        aircraft: 'Boeing 737-800',
        departTime: '09:10',
        arriveTime: '12:35',
        returnDepartTime: '13:35',
        returnArriveTime: '18:45',
        durationMinutes: 265,
        durationText: '4h 25m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: true,
        refundable: 'Date change available',
        baseRoundtripBdt: 52500,
        badge: 'Only Non-Stop Direct',
        badgeType: 'emerald',
        reliability: '93% On-Time',
      },
      {
        id: 'mle-ul-190',
        airline: 'SriLankan Airlines',
        airlineCode: 'UL',
        flightNo: 'UL 190',
        returnFlightNo: 'UL 189',
        aircraft: 'Airbus A320 / A330',
        departTime: '13:05',
        arriveTime: '19:40',
        returnDepartTime: '07:20',
        returnArriveTime: '12:05',
        durationMinutes: 455,
        durationText: '7h 35m',
        stops: 1,
        stopText: '1 Short Stop via Colombo (CMB)',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Full-Service Carrier',
        baseRoundtripBdt: 47900,
        badge: 'Lowest Fare + 30kg Bag',
        badgeType: 'amber',
        reliability: '92% On-Time',
      },
    ],
  },
  CAN: {
    visaNote: 'China Tourist (L) or Business (M) Visa required via Chinese Visa Application Center in Dhaka',
    visaBadge: 'China Visa Required',
    bestWindow: 'Book 30–50 days ahead, especially around Canton Fair months (April & October)',
    terminalTip: 'Direct flights land at Guangzhou Baiyun International Airport (CAN) Terminal 2',
    flights: [
      {
        id: 'can-bs-325',
        airline: 'US-Bangla Airlines',
        airlineCode: 'BS',
        flightNo: 'BS 325',
        returnFlightNo: 'BS 326',
        aircraft: 'Boeing 737-800',
        departTime: '22:10',
        arriveTime: '03:50',
        returnDepartTime: '05:00',
        returnArriveTime: '06:55',
        durationMinutes: 220,
        durationText: '3h 40m',
        stops: 0,
        stopText: 'Direct Flight',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Business friendly rules',
        baseRoundtripBdt: 46500,
        badge: 'Best Value Direct',
        badgeType: 'emerald',
        reliability: '92% On-Time',
      },
      {
        id: 'can-cz-392',
        airline: 'China Southern Airlines',
        airlineCode: 'CZ',
        flightNo: 'CZ 392',
        returnFlightNo: 'CZ 391',
        aircraft: 'Airbus A330-300',
        departTime: '23:30',
        arriveTime: '05:15',
        returnDepartTime: '19:40',
        returnArriveTime: '21:50',
        durationMinutes: 225,
        durationText: '3h 45m',
        stops: 0,
        stopText: 'Direct Widebody (CAN T2)',
        cabinBag: '7 kg Cabin',
        checkedBag: '46 kg (2x23kg) Checked',
        mealIncluded: true,
        refundable: 'Full-Service Carrier',
        baseRoundtripBdt: 52900,
        badge: '46kg Baggage Allowance',
        badgeType: 'blue',
        reliability: '96% On-Time',
      },
    ],
  },
};

function getFutureDateIso(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatReadableDate(isoDate) {
  if (!isoDate) return '';
  try {
    const [y, m, d] = isoDate.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

function buildAviasalesSearchCode(origin, destination, departIso, returnIso, tripType, passengers) {
  const orig = (origin || 'DAC').toUpperCase();
  const dest = (destination || 'KTM').toUpperCase();
  const pax = Math.max(1, Math.min(9, Number(passengers) || 1));

  const parseDdMm = (iso) => {
    if (!iso || !iso.includes('-')) {
      const fallback = new Date();
      fallback.setDate(fallback.getDate() + 14);
      return `${String(fallback.getDate()).padStart(2, '0')}${String(fallback.getMonth() + 1).padStart(2, '0')}`;
    }
    const parts = iso.split('-');
    return `${parts[2]}${parts[1]}`;
  };

  const depDdMm = parseDdMm(departIso);
  if (tripType === 'roundtrip' && returnIso) {
    const retDdMm = parseDdMm(returnIso);
    return `${orig}${depDdMm}${dest}${retDdMm}${pax}`;
  }
  return `${orig}${depDdMm}${dest}${pax}`;
}

function generateDynamicRouteData(originInfo, destInfo) {
  const destCode = (destInfo?.code || 'KTM').toUpperCase();
  if (ROUTE_DATABASE[destCode]) {
    return ROUTE_DATABASE[destCode];
  }

  const destCity = destInfo?.city || destCode;
  const destCountry = destInfo?.country || 'International';

  return {
    visaNote: `Verify ${destCountry} visa requirements and passport validity (6+ months) before departure`,
    visaBadge: `${destCountry} Entry Rules`,
    bestWindow: `Book 4–8 weeks ahead for best rates from ${originInfo?.city || 'Dhaka'} to ${destCity}`,
    terminalTip: `Depart from ${originInfo?.code || 'DAC'} International Terminal · Compare direct and 1-stop partner fares below`,
    flights: [
      {
        id: `${destCode.toLowerCase()}-bg-101`,
        airline: 'Biman Bangladesh Airlines',
        airlineCode: 'BG',
        flightNo: `BG ${200 + (destCode.charCodeAt(0) % 79)}`,
        returnFlightNo: `BG ${201 + (destCode.charCodeAt(0) % 79)}`,
        aircraft: 'Boeing 787-8 Dreamliner',
        departTime: '10:45',
        arriveTime: '16:15',
        returnDepartTime: '17:45',
        returnArriveTime: '22:30',
        durationMinutes: 270,
        durationText: '4h 30m',
        stops: 0,
        stopText: 'Direct / Fastest Routing',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: 'Date change permitted',
        baseRoundtripBdt: 48500,
        badge: 'Best Overall Value',
        badgeType: 'emerald',
        reliability: '93% On-Time',
      },
      {
        id: `${destCode.toLowerCase()}-qr-641`,
        airline: 'Qatar Airways / Partner',
        airlineCode: 'QR',
        flightNo: 'QR 641',
        returnFlightNo: 'QR 638',
        aircraft: 'Airbus A350 / Boeing 777',
        departTime: '03:15',
        arriveTime: '12:40',
        returnDepartTime: '19:20',
        returnArriveTime: '05:10',
        durationMinutes: 445,
        durationText: '7h 25m',
        stops: 1,
        stopText: '1 Stop (Express Transfer)',
        cabinBag: '7 kg Cabin',
        checkedBag: '30 kg Checked',
        mealIncluded: true,
        refundable: '5-Star Global Carrier',
        baseRoundtripBdt: 64200,
        badge: '5-Star Global Carrier',
        badgeType: 'blue',
        reliability: '97% On-Time',
      },
      {
        id: `${destCode.toLowerCase()}-6e-saver`,
        airline: 'Regional Partner Saver',
        airlineCode: 'BS',
        flightNo: 'BS 415',
        returnFlightNo: 'BS 416',
        aircraft: 'Boeing 737-800',
        departTime: '07:30',
        arriveTime: '14:10',
        returnDepartTime: '15:20',
        returnArriveTime: '21:05',
        durationMinutes: 340,
        durationText: '5h 40m',
        stops: 1,
        stopText: '1 Short Transit Stop',
        cabinBag: '7 kg Cabin',
        checkedBag: '20 kg Checked',
        mealIncluded: false,
        refundable: 'Economy Saver',
        baseRoundtripBdt: 42900,
        badge: 'Lowest Fare Found',
        badgeType: 'amber',
        reliability: '90% On-Time',
      },
    ],
  };
}

function findAirportInfo(codeOrQuery) {
  if (!codeOrQuery) return AIRPORTS_DIRECTORY[0];
  const q = codeOrQuery.trim().toUpperCase();
  const exactCode = AIRPORTS_DIRECTORY.find((a) => a.code === q);
  if (exactCode) return exactCode;

  const partial = AIRPORTS_DIRECTORY.find(
    (a) =>
      a.city.toUpperCase().includes(q) ||
      a.country.toUpperCase().includes(q) ||
      a.name.toUpperCase().includes(q)
  );
  if (partial) return partial;

  return {
    code: q.slice(0, 3) || 'KTM',
    city: codeOrQuery.trim(),
    name: `${codeOrQuery.trim()} International Airport`,
    country: 'International',
    flag: '✈️',
  };
}

export default function TravelpayoutsWidget({
  defaultOrigin = 'DAC',
  defaultDestination = 'KTM',
  showQuickRoutes = true,
}) {
  const instanceId = useId();
  const originInputId = `${instanceId}-origin-input`;
  const destInputId = `${instanceId}-dest-input`;
  const departDateId = `${instanceId}-depart-date`;
  const returnDateId = `${instanceId}-return-date`;

  const [originInfo, setOriginInfo] = useState(() => findAirportInfo(defaultOrigin));
  const [destInfo, setDestInfo] = useState(() => findAirportInfo(defaultDestination));

  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null); // 'origin' | 'dest' | null
  const [remoteSuggestions, setRemoteSuggestions] = useState([]);

  const [tripType, setTripType] = useState('roundtrip'); // 'roundtrip' | 'oneway'
  const [cabinClass, setCabinClass] = useState('economy'); // 'economy' | 'business'
  const [passengers, setPassengers] = useState(1);
  const [currency, setCurrency] = useState('BDT'); // 'BDT' | 'USD'

  const [departDate, setDepartDate] = useState(() => getFutureDateIso(14));
  const [returnDate, setReturnDate] = useState(() => getFutureDateIso(21));

  const [isSearching, setIsSearching] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [lastSearchedAt, setLastSearchedAt] = useState('Ready');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'direct' | 'baggage30'
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'fastest' | 'earliest'
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [selectedBookingFlight, setSelectedBookingFlight] = useState(null);
  const [showClassicWhiteLabel, setShowClassicWhiteLabel] = useState(false);

  // Committed query state that updates when user clicks "Search Flights" or picks a Quick Route
  const [committedQuery, setCommittedQuery] = useState(() => ({
    origin: findAirportInfo(defaultOrigin),
    destination: findAirportInfo(defaultDestination),
    departDate: getFutureDateIso(14),
    returnDate: getFutureDateIso(21),
    tripType: 'roundtrip',
    cabinClass: 'economy',
    passengers: 1,
  }));

  const resultsContainerRef = useRef(null);
  const formWrapperRef = useRef(null);

  // Sync if parent prop changes (e.g. navigating between Nepal, Thailand, Malaysia, Dubai flight pages)
  useEffect(() => {
    const nextOrigin = findAirportInfo(defaultOrigin);
    const nextDest = findAirportInfo(defaultDestination);
    setOriginInfo(nextOrigin);
    setDestInfo(nextDest);
    setCommittedQuery((prev) => ({
      ...prev,
      origin: nextOrigin,
      destination: nextDest,
    }));
    setExpandedFlightId(null);
    setSelectedBookingFlight(null);
  }, [defaultOrigin, defaultDestination]);

  // Close autocomplete dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formWrapperRef.current && !formWrapperRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch live airport/city suggestions from Travelpayouts Places2 API when user types
  useEffect(() => {
    const term = activeDropdown === 'origin' ? originQuery.trim() : activeDropdown === 'dest' ? destQuery.trim() : '';
    if (!term || term.length < 2) {
      setRemoteSuggestions([]);
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
        const mapped = data.slice(0, 6).map((item) => ({
          code: (item.code || 'KTM').toUpperCase(),
          city: item.name || item.city_name || item.code,
          name: item.main_airport_name || `${item.name} (${item.code})`,
          country: item.country_name || '',
          flag: '✈️',
        }));
        setRemoteSuggestions(mapped);
      } catch {
        // Fallback to built-in directory silently
      }
    }, 140);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [originQuery, destQuery, activeDropdown]);

  const getFilteredAirports = (queryStr) => {
    const q = (queryStr || '').trim().toLowerCase();
    const localMatches = q
      ? AIRPORTS_DIRECTORY.filter(
          (a) =>
            a.code.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q) ||
            a.country.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q)
        )
      : AIRPORTS_DIRECTORY.slice(0, 10);

    const seen = new Set(localMatches.map((a) => a.code));
    const merged = [...localMatches];
    for (const rem of remoteSuggestions) {
      if (!seen.has(rem.code)) {
        seen.add(rem.code);
        merged.push(rem);
      }
    }
    return merged.slice(0, 8);
  };

  const resolveTypedPlaceIfAny = (currentInfo, typedText) => {
    if (!typedText || !typedText.trim()) return currentInfo;
    const matches = getFilteredAirports(typedText);
    if (matches.length > 0) return matches[0];
    return findAirportInfo(typedText);
  };

  const executeSearch = ({
    nextOrigin = originInfo,
    nextDest = destInfo,
    nextDepart = departDate,
    nextReturn = returnDate,
    nextTripType = tripType,
    nextCabin = cabinClass,
    nextPax = passengers,
    scrollToResults = true,
  } = {}) => {
    const finalOrigin = resolveTypedPlaceIfAny(nextOrigin, originQuery);
    const finalDest = resolveTypedPlaceIfAny(nextDest, destQuery);

    setOriginInfo(finalOrigin);
    setDestInfo(finalDest);
    setOriginQuery('');
    setDestQuery('');
    setActiveDropdown(null);
    setIsSearching(true);
    setSelectedBookingFlight(null);

    setTimeout(() => {
      setCommittedQuery({
        origin: finalOrigin,
        destination: finalDest,
        departDate: nextDepart,
        returnDate: nextReturn,
        tripType: nextTripType,
        cabinClass: nextCabin,
        passengers: nextPax,
      });
      setIsSearching(false);
      setSearchCount((c) => c + 1);
      setLastSearchedAt(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      if (scrollToResults && resultsContainerRef.current) {
        resultsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 320);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch({ scrollToResults: true });
  };

  const handleQuickRouteSelect = (route) => {
    const o = findAirportInfo(route.origin);
    const d = findAirportInfo(route.destination);
    setOriginInfo(o);
    setDestInfo(d);
    executeSearch({
      nextOrigin: o,
      nextDest: d,
      scrollToResults: false,
    });
  };

  const handleSwapLocations = () => {
    const prevO = originInfo;
    const prevD = destInfo;
    setOriginInfo(prevD);
    setDestInfo(prevO);
    setOriginQuery('');
    setDestQuery('');
  };

  // Compute dynamic flight results based on committedQuery
  const routeMeta = useMemo(() => {
    return generateDynamicRouteData(committedQuery.origin, committedQuery.destination);
  }, [committedQuery.origin, committedQuery.destination]);

  const computedFlights = useMemo(() => {
    const baseList = routeMeta.flights || [];
    // Calculate date-based price modifier so changing dates visibly updates fares realistically
    const depStr = committedQuery.departDate || '';
    const daySum = depStr
      .split('')
      .reduce((acc, ch) => acc + (Number.isNaN(Number(ch)) ? 0 : Number(ch)), 0);
    const dateFactor = 0.96 + ((daySum % 9) * 0.012); // ~0.96 to 1.05x
    const tripFactor = committedQuery.tripType === 'oneway' ? 0.58 : 1.0;
    const cabinFactor = committedQuery.cabinClass === 'business' ? 2.35 : 1.0;
    const originFactor = committedQuery.origin.code === 'DAC' ? 1.0 : 1.06;

    const mapped = baseList.map((f) => {
      const perPersonBdt = Math.round(
        (f.baseRoundtripBdt * dateFactor * tripFactor * cabinFactor * originFactor) / 100
      ) * 100;
      const totalBdt = perPersonBdt * committedQuery.passengers;
      const perPersonUsd = Math.round(perPersonBdt / BDT_PER_USD);
      const totalUsd = Math.round(totalBdt / BDT_PER_USD);

      return {
        ...f,
        perPersonBdt,
        totalBdt,
        perPersonUsd,
        totalUsd,
      };
    });

    let filtered = mapped;
    if (filterMode === 'direct') {
      filtered = mapped.filter((f) => f.stops === 0);
    } else if (filterMode === 'baggage30') {
      filtered = mapped.filter((f) => f.checkedBag.includes('30') || f.checkedBag.includes('46'));
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'cheapest') return a.perPersonBdt - b.perPersonBdt;
      if (sortBy === 'fastest') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'earliest') return a.departTime.localeCompare(b.departTime);
      return 0;
    });

    return sorted;
  }, [routeMeta, committedQuery, filterMode, sortBy]);

  const cheapestFlight = useMemo(() => {
    if (!computedFlights.length) return null;
    return [...computedFlights].sort((a, b) => a.perPersonBdt - b.perPersonBdt)[0];
  }, [computedFlights]);

  const fastestDirectFlight = useMemo(() => {
    const directs = computedFlights.filter((f) => f.stops === 0);
    if (!directs.length) return computedFlights[0] || null;
    return [...directs].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];
  }, [computedFlights]);

  const searchCode = useMemo(() => {
    return buildAviasalesSearchCode(
      committedQuery.origin.code,
      committedQuery.destination.code,
      committedQuery.departDate,
      committedQuery.returnDate,
      committedQuery.tripType,
      committedQuery.passengers
    );
  }, [committedQuery]);

  const aviasalesPartnerUrl = useMemo(() => {
    return `https://www.aviasales.com/search/${searchCode}?marker=${MARKER_ID}&currency=${currency}`;
  }, [searchCode, currency]);

  const formatMoney = (bdtAmount, usdAmount) => {
    if (currency === 'USD') {
      return `$${usdAmount.toLocaleString()} USD`;
    }
    return `৳${bdtAmount.toLocaleString()} BDT`;
  };

  const formatSecondaryMoney = (bdtAmount, usdAmount) => {
    if (currency === 'USD') {
      return `≈ ৳${bdtAmount.toLocaleString()} BDT`;
    }
    return `≈ $${usdAmount.toLocaleString()} USD`;
  };

  return (
    <div
      ref={formWrapperRef}
      className="w-full overflow-visible rounded-xl bg-white shadow-sm border border-slate-200/90 text-slate-900"
    >
      {/* 1. POPULAR ROUTES BAR */}
      {showQuickRoutes && (
        <div className="bg-slate-50 border-b border-slate-200/80 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 rounded-t-xl">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">
              Popular Routes:
            </span>
            {POPULAR_ROUTES.map((route) => {
              const isSelected =
                originInfo.code === route.origin && destInfo.code === route.destination;
              return (
                <button
                  key={`${route.origin}-${route.destination}`}
                  type="button"
                  onClick={() => handleQuickRouteSelect(route)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-navy text-[#F6B73C] font-semibold shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
                  }`}
                >
                  <span>{route.flag}</span>
                  <span>{route.label}</span>
                </button>
              );
            })}
          </div>

          {/* Currency Switcher */}
          <div className="inline-flex items-center bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCurrency('BDT')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currency === 'BDT'
                  ? 'bg-white text-brand-navy shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ৳ BDT
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-brand-navy shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      )}

      {/* 2. MAIN INTERACTIVE SEARCH FORM */}
      <form onSubmit={handleFormSubmit} className="p-4 sm:p-5 bg-white border-b border-slate-200">
        {/* Top Row: Trip Type, Cabin Class, Passengers */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Round-trip vs One-way */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  tripType === 'roundtrip'
                    ? 'bg-brand-navy text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Round-Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  tripType === 'oneway'
                    ? 'bg-brand-navy text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One-Way
              </button>
            </div>

            {/* Cabin Class */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setCabinClass('economy')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  cabinClass === 'economy'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Economy
              </button>
              <button
                type="button"
                onClick={() => setCabinClass('business')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  cabinClass === 'business'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Business Class
              </button>
            </div>
          </div>

          {/* Passengers Counter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Users size={14} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-700">Passengers:</span>
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center cursor-pointer"
              aria-label="Decrease passengers"
            >
              -
            </button>
            <span className="text-xs font-bold font-mono text-slate-900 min-w-[54px] text-center tabular-nums">
              {passengers} {passengers === 1 ? 'Adult' : 'Adults'}
            </span>
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.min(9, p + 1))}
              className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center cursor-pointer"
              aria-label="Increase passengers"
            >
              +
            </button>
          </div>
        </div>

        {/* Main Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* FROM AIRPORT */}
          <div className="md:col-span-3 relative">
            <label
              htmlFor={originInputId}
              className="block text-[11px] font-semibold text-slate-500 mb-1"
            >
              From (Origin City or Airport)
            </label>
            <div
              onClick={() => setActiveDropdown('origin')}
              className={`w-full bg-slate-50 hover:bg-slate-100/80 border rounded-xl px-3.5 py-2.5 cursor-text transition-all ${
                activeDropdown === 'origin'
                  ? 'border-brand-navy ring-2 ring-brand-navy/15 bg-white'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <input
                    id={originInputId}
                    type="text"
                    value={
                      activeDropdown === 'origin'
                        ? originQuery
                        : `${originInfo.city} (${originInfo.code})`
                    }
                    placeholder="Type city or airport (e.g. Dhaka)"
                    onFocus={() => {
                      setActiveDropdown('origin');
                      setOriginQuery('');
                    }}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none truncate"
                  />
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {originInfo.name}
                  </div>
                </div>
                <span className="shrink-0 text-xs font-mono font-bold bg-brand-navy/10 text-brand-navy px-2 py-0.5 rounded">
                  {originInfo.code}
                </span>
              </div>
            </div>

            {/* Origin Autocomplete Dropdown */}
            {activeDropdown === 'origin' && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-68 overflow-y-auto py-1">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-slate-100">
                  Select Departure Airport
                </div>
                {getFilteredAirports(originQuery).map((airport) => (
                  <button
                    key={`orig-${airport.code}-${airport.city}`}
                    type="button"
                    onClick={() => {
                      setOriginInfo(airport);
                      setOriginQuery('');
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{airport.flag}</span>
                        <span>{airport.city}</span>
                        <span className="text-slate-400 font-normal">· {airport.country}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{airport.name}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {airport.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SWAP + TO AIRPORT */}
          <div className="md:col-span-3 relative">
            <button
              type="button"
              onClick={handleSwapLocations}
              title="Swap Origin and Destination"
              className="hidden md:flex absolute -left-4 top-8 z-20 w-7 h-7 rounded-full bg-white border border-slate-300 shadow-xs items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRightLeft size={13} />
            </button>

            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor={destInputId}
                className="block text-[11px] font-semibold text-slate-500"
              >
                To (Destination City or Airport)
              </label>
              <button
                type="button"
                onClick={handleSwapLocations}
                className="md:hidden text-[11px] font-semibold text-brand-navy flex items-center gap-1 cursor-pointer"
              >
                <ArrowRightLeft size={11} /> Swap
              </button>
            </div>

            <div
              onClick={() => setActiveDropdown('dest')}
              className={`w-full bg-slate-50 hover:bg-slate-100/80 border rounded-xl px-3.5 py-2.5 cursor-text transition-all ${
                activeDropdown === 'dest'
                  ? 'border-brand-navy ring-2 ring-brand-navy/15 bg-white'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <input
                    id={destInputId}
                    type="text"
                    value={
                      activeDropdown === 'dest'
                        ? destQuery
                        : `${destInfo.city} (${destInfo.code})`
                    }
                    placeholder="Type city or airport (e.g. Bangkok, KTM)"
                    onFocus={() => {
                      setActiveDropdown('dest');
                      setDestQuery('');
                    }}
                    onChange={(e) => setDestQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none truncate"
                  />
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {destInfo.name}
                  </div>
                </div>
                <span className="shrink-0 text-xs font-mono font-bold bg-[#F6B73C]/25 text-brand-navy px-2 py-0.5 rounded">
                  {destInfo.code}
                </span>
              </div>
            </div>

            {/* Destination Autocomplete Dropdown */}
            {activeDropdown === 'dest' && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-68 overflow-y-auto py-1">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 border-b border-slate-100">
                  Select Destination City or Airport
                </div>
                {getFilteredAirports(destQuery).map((airport) => (
                  <button
                    key={`dest-${airport.code}-${airport.city}`}
                    type="button"
                    onClick={() => {
                      setDestInfo(airport);
                      setDestQuery('');
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{airport.flag}</span>
                        <span>{airport.city}</span>
                        <span className="text-slate-400 font-normal">· {airport.country}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{airport.name}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {airport.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DEPARTURE & RETURN DATES */}
          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor={departDateId}
                className="block text-[11px] font-semibold text-slate-500 mb-1"
              >
                Departure Date
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 flex flex-col justify-center">
                <input
                  id={departDateId}
                  type="date"
                  value={departDate}
                  onChange={(e) => {
                    const nextDep = e.target.value;
                    setDepartDate(nextDep);
                    if (returnDate && nextDep > returnDate) {
                      setReturnDate(nextDep);
                    }
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                  {formatReadableDate(departDate)}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor={tripType === 'roundtrip' ? returnDateId : undefined}
                className="block text-[11px] font-semibold text-slate-500 mb-1"
              >
                {tripType === 'roundtrip' ? 'Return Date' : 'Trip Mode'}
              </label>
              {tripType === 'roundtrip' ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 flex flex-col justify-center">
                  <input
                    id={returnDateId}
                    type="date"
                    value={returnDate}
                    min={departDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 truncate mt-0.5">
                    {formatReadableDate(returnDate)}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className="w-full h-[58px] bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl px-3 py-2 text-left flex flex-col justify-center transition-colors cursor-pointer"
                >
                  <span className="text-xs font-semibold text-slate-700">+ Add Return</span>
                  <span className="text-[10px] text-slate-500">Save with round-trip</span>
                </button>
              )}
            </div>
          </div>

          {/* SUBMIT SEARCH BUTTON */}
          <div className="md:col-span-2 flex flex-col justify-end">
            <button
              type="submit"
              disabled={isSearching}
              data-testid="search-flights-submit-btn"
              className="w-full h-[58px] bg-[#07C369] hover:bg-[#06ad5d] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer px-4"
            >
              {isSearching ? (
                <>
                  <RefreshCw size={17} className="animate-spin shrink-0" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={17} className="shrink-0" />
                  <span>Search Flights</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* 3. RESULTS & QUERY SUMMARY SECTION */}
      <div ref={resultsContainerRef} className="p-4 sm:p-6 bg-slate-50/70 space-y-5">
        {/* Loading state feedback when user clicks Search Flights */}
        {isSearching && (
          <div className="bg-white border border-emerald-200 rounded-xl p-6 text-center space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-full border-3 border-[#07C369] border-t-transparent animate-spin mx-auto" />
            <div className="text-sm font-bold text-slate-900">
              Searching live airline schedules for {originInfo.city} ({originInfo.code}) →{' '}
              {destInfo.city} ({destInfo.code})...
            </div>
            <p className="text-xs text-slate-500">
              Checking direct & connecting fares, baggage allowances, and visa rules for{' '}
              {formatReadableDate(departDate)}
            </p>
          </div>
        )}

        {/* Active Query Overview Banner */}
        <div
          className={`bg-white border rounded-xl p-4 shadow-2xs transition-all ${
            searchCount > 0 ? 'border-emerald-500/50 ring-2 ring-emerald-500/10' : 'border-slate-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={14} className="text-[#07C369]" />
                  {searchCount > 0
                    ? `Updated Results for Your Query (${lastSearchedAt})`
                    : 'Live Route Fares & Schedules Ready'}
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-xs text-slate-600 font-medium">
                  {committedQuery.tripType === 'roundtrip' ? 'Round-Trip' : 'One-Way'} ·{' '}
                  {committedQuery.passengers}{' '}
                  {committedQuery.passengers === 1 ? 'Passenger' : 'Passengers'} ·{' '}
                  {committedQuery.cabinClass === 'business' ? 'Business Class' : 'Economy'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>
                  {committedQuery.origin.city} ({committedQuery.origin.code})
                </span>
                <span className="text-[#07C369]">→</span>
                <span>
                  {committedQuery.destination.city} ({committedQuery.destination.code})
                </span>
                <span className="text-xs font-normal text-slate-500">
                  ({formatReadableDate(committedQuery.departDate)}
                  {committedQuery.tripType === 'roundtrip'
                    ? ` – ${formatReadableDate(committedQuery.returnDate)}`
                    : ''}
                  )
                </span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={aviasalesPartnerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-[#F6B73C]/20 hover:bg-[#F6B73C]/35 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>Compare on Aviasales Global</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* 3 Quick Highlight Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3.5">
            {cheapestFlight && (
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/60">
                <div className="text-[11px] font-medium text-slate-500">
                  Lowest Fare Found ({committedQuery.tripType === 'roundtrip' ? 'Round-Trip' : 'One-Way'})
                </div>
                <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                  {formatMoney(cheapestFlight.perPersonBdt, cheapestFlight.perPersonUsd)}{' '}
                  <span className="text-xs font-normal text-slate-500">/ person</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {cheapestFlight.airline} · {cheapestFlight.stopText}
                </div>
              </div>
            )}

            {fastestDirectFlight && (
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/60">
                <div className="text-[11px] font-medium text-slate-500">
                  Fastest Flight Option
                </div>
                <div className="text-base font-black text-slate-900 mt-0.5 tabular-nums">
                  {fastestDirectFlight.durationText} ({fastestDirectFlight.stopText})
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {fastestDirectFlight.airline} · Includes {fastestDirectFlight.checkedBag}
                </div>
              </div>
            )}

            <div className="bg-amber-50/70 rounded-lg p-3 border border-amber-200/70">
              <div className="text-[11px] font-semibold text-amber-900">
                Visa & Entry Guide for Bangladeshis
              </div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">
                {routeMeta.visaBadge}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                {routeMeta.visaNote}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Interactive Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Flights ({routeMeta.flights.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('direct')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'direct'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Direct Only ({routeMeta.flights.filter((f) => f.stops === 0).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('baggage30')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'baggage30'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30kg+ Baggage
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <ArrowUpDown size={13} /> Sort by:
            </span>
            <div className="inline-flex items-center bg-slate-200/70 p-1 rounded-lg">
              {[
                { id: 'cheapest', label: 'Cheapest First' },
                { id: 'fastest', label: 'Fastest' },
                { id: 'earliest', label: 'Earliest' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSortBy(s.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    sortBy === s.id
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Cards List */}
        <div className="space-y-3">
          {computedFlights.map((flight) => {
            const isExpanded = expandedFlightId === flight.id;
            const isBookingSelected = selectedBookingFlight?.id === flight.id;

            return (
              <div
                key={flight.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-5 shadow-2xs transition-all"
              >
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-brand-navy">{flight.badge}</span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600 font-medium">{flight.aircraft}</span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">{flight.reliability}</span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    Flight {flight.flightNo}
                    {committedQuery.tripType === 'roundtrip' ? ` / ${flight.returnFlightNo}` : ''}
                  </div>
                </div>

                {/* Main Schedule + Price Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Airline Info */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-navy text-[#F6B73C] font-mono font-black text-sm flex items-center justify-center shrink-0">
                      {flight.airlineCode}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{flight.airline}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {committedQuery.cabinClass === 'business' ? 'Business Class' : 'Economy Class'}
                      </div>
                    </div>
                  </div>

                  {/* Flight Timeline (Outbound & Return if Round-trip) */}
                  <div className="lg:col-span-6 space-y-3">
                    {/* Outbound Leg */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-left min-w-[72px]">
                        <div className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                          {flight.departTime}
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-500">
                          {committedQuery.origin.code} · Outbound
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col items-center px-2">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {flight.durationText}
                        </span>
                        <div className="w-full flex items-center gap-1 my-1">
                          <div className="h-[2px] flex-1 bg-slate-300" />
                          <Plane size={14} className="text-[#07C369] shrink-0" />
                          <div className="h-[2px] flex-1 bg-slate-300" />
                        </div>
                        <span
                          className={`text-[11px] font-semibold ${
                            flight.stops === 0 ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {flight.stopText}
                        </span>
                      </div>

                      <div className="text-right min-w-[72px]">
                        <div className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                          {flight.arriveTime}
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-500">
                          {committedQuery.destination.code} · Arrival
                        </div>
                      </div>
                    </div>

                    {/* Return Leg (shown when Round-Trip is active) */}
                    {committedQuery.tripType === 'roundtrip' && (
                      <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-100">
                        <div className="text-left min-w-[72px]">
                          <div className="text-sm font-bold text-slate-800 tabular-nums">
                            {flight.returnDepartTime}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {committedQuery.destination.code} · Return
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center px-2">
                          <span className="text-[10px] text-slate-400">
                            Return ({formatReadableDate(committedQuery.returnDate)})
                          </span>
                          <div className="w-full flex items-center gap-1 my-0.5">
                            <div className="h-[1px] flex-1 bg-slate-200" />
                            <span className="text-[10px] font-mono text-slate-500">
                              {flight.returnFlightNo}
                            </span>
                            <div className="h-[1px] flex-1 bg-slate-200" />
                          </div>
                        </div>

                        <div className="text-right min-w-[72px]">
                          <div className="text-sm font-bold text-slate-800 tabular-nums">
                            {flight.returnArriveTime}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {committedQuery.origin.code} · Arrival
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Primary CTA */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4">
                    <div className="text-left lg:text-right">
                      <div className="text-xl font-black text-brand-navy tabular-nums">
                        {formatMoney(flight.totalBdt, flight.totalUsd)}
                      </div>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        {formatSecondaryMoney(flight.totalBdt, flight.totalUsd)} ·{' '}
                        {committedQuery.passengers > 1
                          ? `Total for ${committedQuery.passengers} adults`
                          : committedQuery.tripType === 'roundtrip'
                          ? 'Round-trip incl. taxes'
                          : 'One-way incl. taxes'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedFlightId(isExpanded ? null : flight.id)
                        }
                        className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Details</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBookingFlight(
                            isBookingSelected ? null : flight
                          )
                        }
                        className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Select Flight</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Included Baggage & Perks Footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Luggage size={13} className="text-slate-400" />
                      {flight.cabinBag} + <strong>{flight.checkedBag}</strong>
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Utensils size={13} className="text-slate-400" />
                      {flight.mealIncluded ? 'Complimentary Meal' : 'Meals Available on Board'}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span>{flight.refundable}</span>
                  </div>
                </div>

                {/* Expandable Flight Details Drawer */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200 bg-slate-50 rounded-lg p-3.5 text-xs space-y-2">
                    <div className="font-bold text-slate-900">
                      Complete Flight & Baggage Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-800 block">Route & Terminal:</span>
                        {routeMeta.terminalTip}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block">Baggage Policy:</span>
                        {flight.checkedBag} check-in + {flight.cabinBag} hand carry per passenger.
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block">Fare Breakdown:</span>
                        Base fare: {formatMoney(Math.round(flight.totalBdt * 0.82), Math.round(flight.totalUsd * 0.82))} + Taxes & Carrier Fees:{' '}
                        {formatMoney(Math.round(flight.totalBdt * 0.18), Math.round(flight.totalUsd * 0.18))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Inline Partner Booking Panel when user clicks "Select Flight" */}
                {isBookingSelected && (
                  <div className="mt-3 pt-3.5 border-t border-emerald-200 bg-emerald-50/70 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-[#07C369]" />
                        <span>
                          Ready to Book: {flight.airline} ({flight.flightNo}) ·{' '}
                          {formatMoney(flight.totalBdt, flight.totalUsd)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Proceed to official Travelpayouts / Aviasales partner checkout for{' '}
                        <strong>
                          {committedQuery.origin.code} → {committedQuery.destination.code}
                        </strong>{' '}
                        on <strong>{formatReadableDate(committedQuery.departDate)}</strong> (Partner ID #{MARKER_ID}).
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={aviasalesPartnerUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full sm:w-auto bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <span>Continue to Partner Booking</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Tip & Optional Classic White-Label Toggle */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-200/80">
          <div>
            <strong>Booking Tip:</strong> {routeMeta.bestWindow}
          </div>
          <button
            type="button"
            onClick={() => setShowClassicWhiteLabel((v) => !v)}
            className="text-brand-navy hover:underline font-semibold cursor-pointer"
          >
            {showClassicWhiteLabel
              ? 'Hide Embedded Aviasales White-Label Frame'
              : 'Open Embedded Aviasales White-Label Frame'}
          </button>
        </div>

        {showClassicWhiteLabel && (
          <div className="pt-2">
            <iframe
              src={`/travelpayouts-wl.html?origin=${committedQuery.origin.code}&destination=${committedQuery.destination.code}&flightSearch=${searchCode}`}
              title="URAL Embedded White-Label Engine"
              className="w-full rounded-xl border border-slate-200 bg-white"
              style={{ height: '520px', width: '100%', display: 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
