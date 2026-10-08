import React, { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Calendar,
  Compass,
  Clock,
  Check,
  Search,
  Globe,
} from "lucide-react";
import {
  AFFILIATE_LINKS,
  KKDAY_PROMO,
  isPromoActive,
  resolvePartnerUrl,
  RadicalStorageContextualCallout,
  MultiPartnerBlogCallout,
} from "./AffiliatePartners";
import { AirHelpWidget } from "./AirHelpWidget";
import { KKdayPromoBanner } from "./KKdayPromoBanner";
import { TravelIntelligence } from "./AeoInspector";
import { Language } from "../translations";

interface ExperiencesPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

interface AttractionItem {
  id: string;
  slot: string;
  slotBn: string;
  title: string;
  titleBn: string;
  provider: "tiqets" | "klook";
  priceForeign: string;
  priceBdt: number;
  highlight: string;
  highlightBn: string;
  duration: string;
}

interface CityHub {
  id: string;
  city: string;
  cityBn: string;
  country: string;
  countryBn: string;
  region: "west" | "asia";
  provider: "tiqets" | "klook";
  tagline: string;
  taglineBn: string;
  airportExpress: string;
  airportExpressBn: string;
  airportExpressBdt: number;
  items: AttractionItem[];
}

const CITY_HUBS: CityHub[] = [
  {
    id: "paris",
    city: "Paris",
    cityBn: "প্যারিস (Paris)",
    country: "France · Schengen",
    countryBn: "ফ্রান্স · শেনজেন",
    region: "west",
    provider: "tiqets",
    tagline: "Skip-the-line museum entry, Eiffel Tower summit access & Seine River cruises",
    taglineBn: "লাইনে না দাঁড়িয়ে আইফেল টাওয়ার, লুভর মিউজিয়াম ও সেইন নদী ক্রুজ পাস",
    airportExpress: "CDG Airport RoissyBus / RER B Transfer + Navigo Day Pass",
    airportExpressBn: "CDG এয়ারপোর্ট এক্সপ্রেস ট্রান্সফার ও প্যারিস মেট্রো পাস",
    airportExpressBdt: 2400,
    items: [
      {
        id: "paris-louvre",
        slot: "Morning Landmark · 09:30 AM",
        slotBn: "সকালের ল্যান্ডমার্ক · সকাল ৯:৩০",
        title: "Louvre Museum Timed-Entry Ticket (Mona Lisa Fast Track)",
        titleBn: "লুভর মিউজিয়াম ফাস্ট-ট্র্যাক এন্ট্রি টিকিট (মোনালিসা গ্যালারি)",
        provider: "tiqets",
        priceForeign: "€22 EUR",
        priceBdt: 2950,
        highlight: "Mandatory timed-entry slot; saves 90+ mins at the Pyramid queue",
        highlightBn: "পিরামিড গেটে ৯০ মিনিটের লাইন এড়িয়ে সরাসরি নির্ধারিত সময়ে প্রবেশ",
        duration: "3 hours",
      },
      {
        id: "paris-seine",
        slot: "Afternoon Cruise · 02:30 PM",
        slotBn: "দুপুরের রিভার ক্রুজ · দুপুর ২:৩০",
        title: "Bateaux Parisiens Seine River Sightseeing Cruise (From Eiffel Tower)",
        titleBn: "সেইন নদীতে ১ ঘণ্টার সাইটসিইং রিভার ক্রুজ (আইফেল টাওয়ার ঘাট থেকে)",
        provider: "tiqets",
        priceForeign: "€17 EUR",
        priceBdt: 2280,
        highlight: "Instant smartphone QR boarding at Port de la Bourdonnais with audio guide",
        highlightBn: "মোবাইল QR কোড দেখিয়ে সরাসরি বোটে প্রবেশ ও অডিও গাইড",
        duration: "1 hour",
      },
      {
        id: "paris-eiffel",
        slot: "Sunset Viewpoint · 06:00 PM",
        slotBn: "সূর্যাস্তের ভিউপয়েন্ট · সন্ধ্যা ৬:০০",
        title: "Eiffel Tower 2nd Floor or Summit Direct Elevator Access",
        titleBn: "আইফেল টাওয়ার ২য় তলা ও সামিট লিফট অ্যাক্সেস টিকিট",
        provider: "tiqets",
        priceForeign: "€36 EUR",
        priceBdt: 4850,
        highlight: "Guaranteed elevator slot over Paris at golden hour",
        highlightBn: "সূর্যাস্তের সময় প্যারিস শহরের ৩৬০-ডিগ্রি ভিউ ও লিফট অ্যাক্সেস",
        duration: "2 hours",
      },
    ],
  },
  {
    id: "london",
    city: "London",
    cityBn: "লন্ডন (London)",
    country: "United Kingdom",
    countryBn: "যুক্তরাজ্য (UK)",
    region: "west",
    provider: "tiqets",
    tagline: "Royal palaces, Thames cruises, London Eye & Heathrow Express rail tickets",
    taglineBn: "লন্ডন আই, টাওয়ার অব লন্ডন, টেমস ক্রুজ ও হিথ্রো এক্সপ্রেস ট্রেন টিকিট",
    airportExpress: "Heathrow Express (15 Mins Non-Stop to London Paddington)",
    airportExpressBn: "হিথ্রো এক্সপ্রেস ট্রেন (১৫ মিনিটে লন্ডন প্যাডিংটন স্টেশন)",
    airportExpressBdt: 4100,
    items: [
      {
        id: "london-tower",
        slot: "Morning Landmark · 10:00 AM",
        slotBn: "সকালের ল্যান্ডমার্ক · সকাল ১০:০০",
        title: "Tower of London + Crown Jewels Exhibition Direct Entry",
        titleBn: "টাওয়ার অব লন্ডন ও ক্রাউন জুয়েলস প্রদর্শনী সরাসরি প্রবেশ টিকিট",
        provider: "tiqets",
        priceForeign: "£34.80 GBP",
        priceBdt: 5450,
        highlight: "Includes Koh-i-Noor & Royal Crown Jewels vault access + Yeoman Warder tour",
        highlightBn: "রাজকীয় মুকুট ও ঐতিহাসিক সংগ্রহশালা পরিদর্শনের অফিসিয়াল পাস",
        duration: "3 hours",
      },
      {
        id: "london-thames",
        slot: "Afternoon Cruise · 02:00 PM",
        slotBn: "দুপুরের রিভার ক্রুজ · দুপুর ২:০০",
        title: "Uber Boat by Thames Clippers / Westminster to Greenwich Hop-On Cruise",
        titleBn: "ওয়েস্টমিনস্টার থেকে গ্রিনিচ টেমস নদী হপ-অন রিভার ক্রুজ",
        provider: "tiqets",
        priceForeign: "£18.50 GBP",
        priceBdt: 2900,
        highlight: "Sail past Big Ben, London Bridge & Tower Bridge with open-deck views",
        highlightBn: "বিগ বেন ও টাওয়ার ব্রিজের নিচ দিয়ে নদীপথে লন্ডন ভ্রমণ",
        duration: "1.5 hours",
      },
      {
        id: "london-eye",
        slot: "Sunset Viewpoint · 05:30 PM",
        slotBn: "সূর্যাস্তের ভিউপয়েন্ট · বিকেল ৫:৩০",
        title: "The Lastminute.com London Eye Standard or Fast-Track Pod",
        titleBn: "লন্ডন আই (London Eye) ফাস্ট-ট্র্যাক ক্যাপসুল রাইড",
        provider: "tiqets",
        priceForeign: "£31.00 GBP",
        priceBdt: 4850,
        highlight: "Panoramic views across Big Ben, Buckingham Palace & The Shard",
        highlightBn: "বিগ বেন ও বাকিংহাম প্যালেসের প্যানোরামিক স্কাইলাইন ভিউ",
        duration: "45 mins",
      },
    ],
  },
  {
    id: "rome-italy",
    city: "Rome, Milan & Venice",
    cityBn: "রোম, মিলান ও ভেনিস (Italy)",
    country: "Italy · Schengen",
    countryBn: "ইতালি · শেনজেন",
    region: "west",
    provider: "tiqets",
    tagline: "Colosseum Arena floor, Vatican Museums, Milan Duomo & Venice Gondola rides",
    taglineBn: "কলোসিয়াম, ভ্যাটিকান মিউজিয়াম, মিলান দুওমো ও ভেনিস গন্ডোলা রাইড",
    airportExpress: "Leonardo Express Train (Rome Fiumicino Airport to Termini in 32m)",
    airportExpressBn: "লিওনার্দো এক্সপ্রেস ট্রেন (রোম এয়ারপোর্ট থেকে টার্মিনি স্টেশন ৩২ মিনিট)",
    airportExpressBdt: 2350,
    items: [
      {
        id: "rome-colosseum",
        slot: "Morning Landmark · 09:00 AM",
        slotBn: "সকালের ল্যান্ডমার্ক · সকাল ৯:০০",
        title: "Colosseum, Roman Forum & Palatine Hill Priority Access",
        titleBn: "রোমান কলোসিয়াম, ফোরাম ও প্যালাটাইন হিল প্রায়োরিটি টিকিট",
        provider: "tiqets",
        priceForeign: "€24 EUR",
        priceBdt: 3200,
        highlight: "Includes all 3 archaeological zones on a single digital mobile pass",
        highlightBn: "একই ডিজিটাল পাসে কলোসিয়ামসহ ৩টি ঐতিহাসিক জোনে প্রবেশ",
        duration: "3 hours",
      },
      {
        id: "milan-duomo",
        slot: "Afternoon Icon · 02:00 PM",
        slotBn: "দুপুরের আকর্ষণ · দুপুর ২:০০",
        title: "Milan Cathedral (Duomo di Milano) + Rooftop Terraces Lift Ticket",
        titleBn: "মিলান ক্যাথেড্রাল (Duomo) ও রুফটপ টেরেস লিফট টিকিট",
        provider: "tiqets",
        priceForeign: "€22 EUR",
        priceBdt: 2950,
        highlight: "Top choice for Bangladeshi diaspora & Schengen tourists visiting Lombardy",
        highlightBn: "ইতালি প্রবাসী ও পর্যটকদের কাছে মিলানের সবচেয়ে জনপ্রিয় অভিজ্ঞতা",
        duration: "2 hours",
      },
      {
        id: "venice-gondola",
        slot: "Sunset Experience · 05:30 PM",
        slotBn: "বিকেলের অভিজ্ঞতা · বিকেল ৫:৩০",
        title: "Venice Grand Canal Shared Gondola Ride + St. Mark's Basilica Entry",
        titleBn: "ভেনিস গ্র্যান্ড ক্যানাল গন্ডোলা রাইড ও সেন্ট মার্কস ব্যাসিলিকা পাস",
        provider: "tiqets",
        priceForeign: "€35 EUR",
        priceBdt: 4700,
        highlight: "Fixed official rate without haggling €100+ at the Venice canal pier",
        highlightBn: "ঘাটে অতিরিক্ত দরদাম ছাড়াই সাশ্রয়ী ফিক্সড রেটে ভেনিস গন্ডোলা ভ্রমণ",
        duration: "1.5 hours",
      },
    ],
  },
  {
    id: "new-york",
    city: "New York City",
    cityBn: "নিউ ইয়র্ক (New York)",
    country: "United States (USA)",
    countryBn: "যুক্তরাষ্ট্র (USA)",
    region: "west",
    provider: "tiqets",
    tagline: "Statue of Liberty ferry, Empire State Building, SUMMIT One Vanderbilt & Broadway",
    taglineBn: "স্ট্যাচু অব লিবার্টি ফেরি, এম্পায়ার স্টেট বিল্ডিং ও সামিট ওয়ান ভিউপয়েন্ট",
    airportExpress: "JFK AirTrain + LIRR / Manhattan Express Transfer",
    airportExpressBn: "JFK এয়ারপোর্ট থেকে ম্যানহাটন এক্সপ্রেস ট্রান্সফার",
    airportExpressBdt: 3100,
    items: [
      {
        id: "nyc-liberty",
        slot: "Morning Landmark · 09:30 AM",
        slotBn: "সকালের ল্যান্ডমার্ক · সকাল ৯:৩০",
        title: "Statue of Liberty & Ellis Island Ferry + Pedestal Reserve Ticket",
        titleBn: "স্ট্যাচু অব লিবার্টি ও এলিস আইল্যান্ড ফেরি + মিউজিয়াম টিকিট",
        provider: "tiqets",
        priceForeign: "$25.50 USD",
        priceBdt: 3100,
        highlight: "Departs Battery Park with audio tour & Immigration Museum entry",
        highlightBn: "ব্যাটারি পার্ক থেকে ফেরি রাইড ও অডিও গাইডসহ সম্পূর্ণ টিকিট",
        duration: "3.5 hours",
      },
      {
        id: "nyc-harbor",
        slot: "Afternoon Cruise · 02:30 PM",
        slotBn: "দুপুরের হারবার ক্রুজ · দুপুর ২:৩০",
        title: "Circle Line Manhattan Landmarks Harbor Cruise (Pier 83)",
        titleBn: "ম্যানহাটন স্কাইলাইন ও ব্রুকলিন ব্রিজ হারবার ক্রুজ",
        provider: "tiqets",
        priceForeign: "$44.00 USD",
        priceBdt: 5350,
        highlight: "Sail under Brooklyn Bridge with live narration of Midtown & Wall Street",
        highlightBn: "ব্রুকলিন ব্রিজের নিচ দিয়ে ম্যানহাটন স্কাইলাইন ফটোগ্রাফি ক্রুজ",
        duration: "1.5 hours",
      },
      {
        id: "nyc-summit",
        slot: "Sunset Viewpoint · 06:00 PM",
        slotBn: "সূর্যাস্তের ভিউপয়েন্ট · সন্ধ্যা ৬:০০",
        title: "SUMMIT One Vanderbilt or Empire State Building 86th Floor Deck",
        titleBn: "সামিট ওয়ান ভ্যান্ডারবিল্ট অথবা এম্পায়ার স্টেট বিল্ডিং ৮৬ তলা ডেক",
        provider: "tiqets",
        priceForeign: "$44.00 USD",
        priceBdt: 5350,
        highlight: "New York's #1 glass sky-mirror observation deck right above Grand Central",
        highlightBn: "গ্র্যান্ড সেন্ট্রালের উপরে নিউ ইয়র্কের সবচেয়ে জনপ্রিয় গ্লাস স্কাই-ডেক",
        duration: "2 hours",
      },
    ],
  },
  {
    id: "dubai-klook",
    city: "Dubai & Abu Dhabi",
    cityBn: "দুবাই ও আবুধাবি (UAE)",
    country: "United Arab Emirates",
    countryBn: "সংযুক্ত আরব আমিরাত",
    region: "asia",
    provider: "klook",
    tagline: "Burj Khalifa 124/125th floor, Red Dunes Desert Safari, Museum of the Future & Marina Dhow",
    taglineBn: "বুর্জ খলিফা ১২৪ তলা, ডেজার্ট সাফারি, মিউজিয়াম অব দ্য ফিউচার ও মেরিনা ডিনার ক্রুজ",
    airportExpress: "DXB Airport Terminal 1/3 Private Hotel Transfer + Nol Silver Card",
    airportExpressBn: "দুবাই এয়ারপোর্ট প্রাইভেট হোটেল পিকআপ ও মেট্রো Nol কার্ড",
    airportExpressBdt: 2800,
    items: [
      {
        id: "dxb-future",
        slot: "Morning Landmark · 10:00 AM",
        slotBn: "সকালের ল্যান্ডমার্ক · সকাল ১০:০০",
        title: "Museum of the Future Dubai Timed Entry Pass",
        titleBn: "মিউজিয়াম অব দ্য ফিউচার দুবাই অফিসিয়াল এন্ট্রি পাস",
        provider: "klook",
        priceForeign: "AED 149",
        priceBdt: 4950,
        highlight: "Sells out 2–3 weeks ahead; Klook residency top-seller for BD flyers",
        highlightBn: "ভ্রমণের ২-৩ সপ্তাহ আগেই সোল্ড-আউট হয়ে যায়; আগে বুকিং করা জরুরি",
        duration: "2.5 hours",
      },
      {
        id: "dxb-safari",
        slot: "Afternoon Adventure · 03:00 PM",
        slotBn: "বিকেলের অ্যাডভেঞ্চার · দুপুর ৩:০০",
        title: "Premium Red Dunes Desert Safari + 4x4Pickup + Halal BBQ Buffet",
        titleBn: "প্রিমিয়াম ডেজার্ট সাফারি + ৪x৪ হোটেল পিকআপ ও হালাল BBQ ডিনার",
        provider: "klook",
        priceForeign: "AED 115",
        priceBdt: 3800,
        highlight: "Includes hotel pickup from Deira/Downtown, camel ride & Tanoura show",
        highlightBn: "দেইরা বা ডাউনটাউন হোটেল থেকে পিকআপ, ক্যামেল রাইড ও ডিনার অন্তর্ভুক্ত",
        duration: "6 hours",
      },
      {
        id: "dxb-burj",
        slot: "Sunset Viewpoint · 05:30 PM",
        slotBn: "সূর্যাস্তের ভিউপয়েন্ট · বিকেল ৫:৩০",
        title: "Burj Khalifa At The Top (Levels 124 & 125) + Fountain Boardwalk",
        titleBn: "বুর্জ খলিফা অ্যাট দ্য টপ (১২৪ ও ১২৫ তলা) + ফাউন্টেন শো",
        provider: "klook",
        priceForeign: "AED 179",
        priceBdt: 5900,
        highlight: "Instant Klook mobile voucher; combine with Dubai Aquarium for extra 15% off",
        highlightBn: "মোবাইল ভাউচারে সরাসরি প্রবেশ; ফাউন্টেন শোর সেরা ভিউ",
        duration: "2 hours",
      },
    ],
  },
  {
    id: "bangkok-klook",
    city: "Bangkok, Pattaya & Phuket",
    cityBn: "ব্যাংকক, পাতায়া ও ফুকেট (Thailand)",
    country: "Thailand",
    countryBn: "থাইল্যান্ড",
    region: "asia",
    provider: "klook",
    tagline: "Safari World Bangkok, Chao Phraya Halal Dinner Cruise, Mahanakhon SkyWalk & Coral Island",
    taglineBn: "সাফারি ওয়ার্ল্ড ব্যাংকক, চাও ফ্রায়া হালাল ডিনার ক্রুজ ও মাহানাখন স্কাইওয়াক",
    airportExpress: "Suvarnabhumi (BKK) / Don Mueang (DMK) Private MPV to Pratunam",
    airportExpressBn: "সুবর্ণভূমি / ডন মুয়াং এয়ারপোর্ট থেকে প্রাতুনাম হোটেল প্রাইভেট কার",
    airportExpressBdt: 2600,
    items: [
      {
        id: "bkk-safari",
        slot: "Morning Family Favorite · 09:00 AM",
        slotBn: "সকালের ফ্যামিলি ট্যুর · সকাল ৯:০০",
        title: "Safari World Bangkok (Safari Park + Marine Park + International/Halal Buffet)",
        titleBn: "সাফারি ওয়ার্ল্ড ব্যাংকক (সাফারি পার্ক + মেরিন পার্ক + হালাল বুফে লাঞ্চ)",
        provider: "klook",
        priceForeign: "THB 1,150",
        priceBdt: 3850,
        highlight: "#1 Klook product booked by Bangladeshi families visiting Bangkok",
        highlightBn: "বাংলাদেশি পরিবারের কাছে ব্যাংককের #১ জনপ্রিয় ডে-ট্রিপ প্যাকেজ",
        duration: "6 hours",
      },
      {
        id: "bkk-skywalk",
        slot: "Late Afternoon · 04:30 PM",
        slotBn: "বিকেলের ভিউপয়েন্ট · বিকেল ৪:৩০",
        title: "King Power Mahanakhon SkyWalk 78th Floor Glass Tray Ticket",
        titleBn: "কিং পাওয়ার মাহানাখন স্কাইওয়াক ৭৮ তলা গ্লাস-ট্রে টিকিট",
        provider: "klook",
        priceForeign: "THB 880",
        priceBdt: 2950,
        highlight: "Direct BTS Chong Nonsi access; walk on Thailand's highest glass floor",
        highlightBn: "থাইল্যান্ডের সর্বোচ্চ ৩১৪ মিটার উঁচু স্বচ্ছ কাঁচের ফ্লোরে হাঁটার অভিজ্ঞতা",
        duration: "1.5 hours",
      },
      {
        id: "bkk-cruise",
        slot: "Evening Cruise · 07:30 PM",
        slotBn: "রাতের রিভার ক্রুজ · সন্ধ্যা ৭:৩০",
        title: "Chao Phraya Princess Luxury Cruise from ICONSIAM (Halal Buffet Certified)",
        titleBn: "আইকনসিয়াম (ICONSIAM) থেকে চাও ফ্রায়া প্রিন্সেস হালাল বুফে ডিনার ক্রুজ",
        provider: "klook",
        priceForeign: "THB 950",
        priceBdt: 3200,
        highlight: "100% pork-free international & halal seafood buffet past Wat Arun",
        highlightBn: "১০০% হালাল সি-ফুড ও ইন্টারন্যাশনাল বুফে ডিনারসহ লাইভ মিউজিক ক্রুজ",
        duration: "2 hours",
      },
    ],
  },
  {
    id: "singapore-kl",
    city: "Singapore & Kuala Lumpur",
    cityBn: "সিঙ্গাপুর ও কুয়ালালামপুর",
    country: "Singapore & Malaysia",
    countryBn: "সিঙ্গাপুর ও মালয়েশিয়া",
    region: "asia",
    provider: "klook",
    tagline: "Universal Studios Singapore, Gardens by the Bay, Genting SkyWorlds & Petronas Twin Towers",
    taglineBn: "ইউনিভার্সাল স্টুডিওস সিঙ্গাপুর, গার্ডেন্স বাই দ্য বে, গেন্টিং হাইল্যান্ডস ও পেট্রোনাস টাওয়ার",
    airportExpress: "KLIA Ekspres High-Speed Train (28m to KL Sentral) / Changi MRT Pass",
    airportExpressBn: "KLIA Ekspres হাই-স্পিড ট্রেন (২৮ মিনিটে KL Sentral) ও চাঙ্গি পাস",
    airportExpressBdt: 1450,
    items: [
      {
        id: "sin-uss",
        slot: "Full Morning · 10:00 AM",
        slotBn: "সকালের থিম পার্ক · সকাল ১০:০০",
        title: "Universal Studios Singapore (Sentosa Island) 1-Day Direct QR Ticket",
        titleBn: "ইউনিভার্সাল স্টুডিওস সিঙ্গাপুর (Sentosa) ১ দিনের সরাসরি QR টিকিট",
        provider: "klook",
        priceForeign: "SGD $83",
        priceBdt: 7350,
        highlight: "Includes Minion Land, Transformers 3D & Halal eateries inside the park",
        highlightBn: "পার্কে হালাল রেস্টুরেন্ট সুবিধা ও সবগুলো রাইডে সরাসরি প্রবেশ",
        duration: "6 hours",
      },
      {
        id: "sin-gardens",
        slot: "Afternoon Nature · 03:30 PM",
        slotBn: "দুপুরের আকর্ষণ · বিকেল ৩:৩০",
        title: "Gardens by the Bay (Cloud Forest + Flower Dome + Avatar Experience)",
        titleBn: "গার্ডেন্স বাই দ্য বে (ক্লাউড ফরেস্ট ও ফ্লাওয়ার ডোম কম্বো পাস)",
        provider: "klook",
        priceForeign: "SGD $32",
        priceBdt: 2850,
        highlight: "Air-conditioned indoor waterfall conservatory right next to Marina Bay Sands",
        highlightBn: "মেরিনা বে স্যান্ডসের পাশেই বিশ্বের উচ্চতম ইনডোর ঝর্ণা ও গ্লাস ডোম",
        duration: "2.5 hours",
      },
      {
        id: "kl-genting",
        slot: "Malaysia Highlight · 09:30 AM",
        slotBn: "মালয়েশিয়া হাইলাইট · সকাল ৯:৩০",
        title: "Genting Highlands Awana SkyWay Glass-Floor Cable Car + Batu Caves Tour",
        titleBn: "গেন্টিং হাইল্যান্ডস Awana SkyWay কেবল কার ও বাটু কেভস ডে-ট্যুর",
        provider: "klook",
        priceForeign: "RM 85",
        priceBdt: 2300,
        highlight: "Roundtrip highland cable car + Chin Swee Temple stop & Outlet shopping",
        highlightBn: "মেঘের ওপর দিয়ে কেবল কার রাইড ও প্রিমিয়াম আউটলেট শপিং",
        duration: "5 hours",
      },
    ],
  },
];

const EXPERIENCES_FAQS = [
  {
    question: "Can I book Tiqets (Europe/UK/USA) and Klook (Asia/Dubai) tickets using a Bangladeshi Dual-Currency Card?",
    answer:
      "Yes. Both Tiqets and Klook accept Bangladeshi Visa and Mastercard dual-currency debit/credit cards (such as EBL, City Bank Amex, BRAC Bank, and DBBL) once your passport's annual $18,000 USD travel quota (FE Circular 33) is endorsed and E-Commerce / 3D-Secure is active. If you do not have an endorsed card, you can message URAL's Dhaka WhatsApp Desk (+8801784385335) to issue your attraction vouchers in BDT.",
  },
  {
    question: "Why should I book Europe & UK attractions on Tiqets before flying from Dhaka?",
    answer:
      "Major landmarks like the Eiffel Tower in Paris, the Colosseum in Rome, the Louvre Museum, and the London Eye now enforce mandatory timed-entry slots and often sell out 1 to 3 weeks in advance. Booking via Tiqets locks in your exact date and time slot with instant smartphone QR tickets—no printing required.",
  },
  {
    question: "What is the difference between Tiqets and Klook on URAL?",
    answer:
      "We pair each region with its strongest global inventory partner: Klook offers the lowest prices and deepest bundle discounts across Asia and the Middle East (Bangkok, Kuala Lumpur, Singapore, Dubai, Maldives, and Saudi Arabia Ziyarah tours), while Tiqets specializes in official skip-the-line museum, palace, and observation deck passes across Europe, the UK, and North America.",
  },
  {
    question: "Do I need to print out Tiqets or Klook vouchers?",
    answer:
      "No. Over 98% of attractions on both Tiqets and Klook support instant mobile QR code scanning directly from your phone screen at the turnstile, even offline.",
  },
];

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ lang, onNavigate }) => {
  const isBn = lang === "bn";
  const [regionFilter, setRegionFilter] = useState<"all" | "west" | "asia">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("region");
      if (r === "west" || r === "asia") return r;
    }
    return "all";
  });
  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("city");
      if (c && CITY_HUBS.some((h) => h.id === c)) return c;
    }
    return "all";
  });
  const [ticketCount, setTicketCount] = useState<number>(2);
  const [calcCityId, setCalcCityId] = useState<string>("paris");
  const [travelDate, setTravelDate] = useState<string>("2026-11-15");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("region");
      const c = params.get("city");
      if (r === "west" || r === "asia" || r === "all") {
        setRegionFilter(r);
      } else {
        setRegionFilter("all");
      }
      if (c && CITY_HUBS.some((h) => h.id === c)) {
        setSelectedCityId(c);
        setCalcCityId(c);
      } else {
        setSelectedCityId("all");
      }
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [ typeof window !== "undefined" ? window.location.search : "" ]);

  const visibleCities = CITY_HUBS.filter((hub) => {
    const matchesRegion = regionFilter === "all" || hub.region === regionFilter;
    const matchesCity = selectedCityId === "all" || hub.id === selectedCityId;
    return matchesRegion && matchesCity;
  });

  const activeCalcCity = CITY_HUBS.find((c) => c.id === calcCityId) || CITY_HUBS[0];
  const bundlePerPersonBdt =
    activeCalcCity.items.reduce((sum, item) => sum + item.priceBdt, 0) +
    activeCalcCity.airportExpressBdt;
  const bundleTotalBdt = bundlePerPersonBdt * ticketCount;
  const bundleTotalUsd = Math.round(bundleTotalBdt / 120);

  return (
    <div className="space-y-14 animate-fade-in">
      {/* 1. HERO SECTION — GLOBAL ATTRACTIONS & SKIP-THE-LINE HUB */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-[#F6B73C]">
                {isBn ? "অফিসিয়াল স্কিপ-দ্য-লাইন পার্টনার হাব" : "Official Skip-the-Line Partner Hub"}
              </span>
              <span aria-hidden="true">·</span>
              <span>Tiqets (Europe, UK & USA)</span>
              <span aria-hidden="true">·</span>
              <span>Klook (Asia & Middle East)</span>
            </div>

            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "ইউরোপ, যুক্তরাজ্য, আমেরিকা ও এশিয়ার সেরা দর্শনীয় স্থানের টিকিট ও ডে-ট্যুর (BDT গাইড)"
                : "Europe, UK, USA & Asian Attraction Passes — Skip the Line in BDT"}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {isBn
                ? "লন্ডন, প্যারিস, রোম ও নিউ ইয়র্কের মিউজিয়াম এবং ভিউপয়েন্টে ঘণ্টার পর ঘণ্টা লাইনে না দাঁড়িয়ে Tiqets-এ বুক করুন। আর দুবাই, ব্যাংকক, সিঙ্গাপুর ও কুয়ালালামপুরের থিম পার্ক ও ডেজার্ট সাফারিতে Klook-এর মাধ্যমে পান বিশেষ ডিসকাউন্ট।"
                : "Pre-book timed-entry passes for Paris, London, Rome, Milan, Venice, and New York via Tiqets, or unlock Klook's best-selling theme parks, desert safaris, and halal dinner cruises across Dubai, Bangkok, Singapore, and Kuala Lumpur."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={AFFILIATE_LINKS.tiqets}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {isBn
                    ? "Tiqets-এ Europe, UK ও USA টিকিট খুঁজুন"
                    : "Explore Europe, UK & USA on Tiqets"}
                </span>
                <ExternalLink size={13} />
              </a>

              <a
                href={AFFILIATE_LINKS.klook}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {isBn
                    ? "Klook-এ হোটেল ও ট্যুর ডিল দেখুন"
                    : "Explore Klook Hotels, Tours & Activities"}
                </span>
                <ExternalLink size={13} />
              </a>
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.goCity)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-amber-400/15 hover:bg-amber-400/25 border border-[#F6B73C]/50 text-[#F6B73C] font-bold text-xs px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {isBn
                    ? "Go City All-Inclusive ও Explorer Pass (৫০% ছাড়)"
                    : "Go City All-Inclusive & Explorer Passes"}
                </span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Bundle & Availability Calculator (Widget 3 Equivalent) */}
          <div className="lg:col-span-5 bg-brand-navy border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div>
                <span className="text-[11px] font-mono text-[#F6B73C] font-semibold block">
                  {isBn ? "লাইভ সিটি পাস ও BDT ক্যালকুলেটর" : "City Pass & Availability Planner"}
                </span>
                <h2 className="font-serif text-base sm:text-lg font-bold text-white">
                  {isBn
                    ? "১ দিনের ফুল-ডে বান্ডেল খরচ হিসাব করুন"
                    : "Calculate Full-Day City Bundle in BDT"}
                </h2>
              </div>
              <Calendar size={18} className="text-[#F6B73C] shrink-0" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="exp-calc-city-select" className="block text-slate-300 font-medium mb-1">
                  {isBn ? "১. গন্তব্য শহর নির্বাচন করুন:" : "1. Select Destination City:"}
                </label>
                <select
                  id="exp-calc-city-select"
                  value={calcCityId}
                  onChange={(e) => setCalcCityId(e.target.value)}
                  className="w-full bg-brand-navy border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-[#F6B73C]"
                >
                  <optgroup label="Europe, UK & USA (Tiqets Official)">
                    <option value="paris">Paris, France (Louvre + Seine + Eiffel)</option>
                    <option value="london">London, UK (Tower of London + Thames + Eye)</option>
                    <option value="rome-italy">Rome, Milan & Venice, Italy (Colosseum + Gondola)</option>
                    <option value="new-york">New York, USA (Statue of Liberty + SUMMIT)</option>
                  </optgroup>
                  <optgroup label="Asia & Middle East (Klook Best-Sellers)">
                    <option value="dubai-klook">Dubai, UAE (Museum of Future + Safari + Burj)</option>
                    <option value="bangkok-klook">Bangkok, Thailand (Safari World + SkyWalk + Cruise)</option>
                    <option value="singapore-kl">Singapore & KL (Universal Studios + Gardens + Genting)</option>
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="exp-travel-date-input" className="block text-slate-300 font-medium mb-1">
                    {isBn ? "২. ভ্রমণের তারিখ:" : "2. Preferred Date:"}
                  </label>
                  <input
                    id="exp-travel-date-input"
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-brand-navy border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#F6B73C]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isBn ? `৩. যাত্রী সংখ্যা (${ticketCount} জন):` : `3. Travelers (${ticketCount}):`}
                  </label>
                  <div className="flex items-center bg-brand-navy border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="px-3 py-2 text-white hover:bg-slate-800 font-bold cursor-pointer"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-white tabular-nums">
                      {ticketCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                      className="px-3 py-2 text-white hover:bg-slate-800 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculated Output */}
              <div className="bg-brand-navy border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    {isBn
                      ? "৩টি টপ আকর্ষণ + এয়ারপোর্ট এক্সপ্রেস (মোট):"
                      : "3 Iconic Attractions + Airport Express (Total):"}
                  </span>
                  <span className="font-mono text-emerald-400">~${bundleTotalUsd} USD Quota</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-[#F6B73C] tabular-nums">
                    ৳ {bundleTotalBdt.toLocaleString()} BDT
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                    (৳ {bundlePerPersonBdt.toLocaleString()} / {isBn ? "জন" : "person"})
                  </span>
                </div>
              </div>

              <a
                href={
                  activeCalcCity.provider === "tiqets"
                    ? AFFILIATE_LINKS.tiqets
                    : AFFILIATE_LINKS.klook
                }
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>
                  {activeCalcCity.provider === "tiqets"
                    ? isBn
                      ? `${activeCalcCity.city}-এর Tiqets স্লট চেক করুন`
                      : `Check ${activeCalcCity.city} Slots on Tiqets`
                    : isBn
                    ? `${activeCalcCity.city}-এর Klook ডিসকাউন্ট দেখুন`
                    : `Check ${activeCalcCity.city} Deals on Klook`}
                </span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. REGION & CITY FILTER BAR */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          {/* Region Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/75 rounded-xl overflow-x-auto">
            {[
              {
                id: "all",
                label: isBn ? "সব গ্লোবাল হাব (7 শহর)" : "All Global Hubs (7 Cities)",
              },
              {
                id: "west",
                label: isBn
                  ? "Europe, UK ও USA — Tiqets (4)"
                  : "Europe, UK & USA — Tiqets (4)",
              },
              {
                id: "asia",
                label: isBn
                  ? "Asia ও Middle East — Klook + KKday (3)"
                  : "Asia & Middle East — Klook + KKday (3)",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setRegionFilter(tab.id as any);
                  setSelectedCityId("all");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  regionFilter === tab.id
                    ? "bg-brand-navy text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* City Quick Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCityId("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCityId === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {isBn ? "সব শহর" : "All Cities"}
            </button>
            {CITY_HUBS.filter((c) => regionFilter === "all" || c.region === regionFilter).map(
              (hub) => (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setSelectedCityId(hub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCityId === hub.id
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {hub.city.split(",")[0]}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* 2B. KKDAY SOUTHEAST ASIA 9.9 TRAVEL SALE SPOTLIGHT (30% OFF + B1G1 + US$100 GIVEAWAY) */}
      {regionFilter !== "west" && <KKdayPromoBanner lang={lang} variant="full" />}

      {/* 3. CITY-BY-CITY "MORNING LANDMARK + AFTERNOON CRUISE + SUNSET VIEWPOINT" BUNDLES */}
      <div className="space-y-12">
        {visibleCities.map((hub, idx) => {
          const partnerUrl =
            hub.provider === "tiqets" ? AFFILIATE_LINKS.tiqets : AFFILIATE_LINKS.klook;
          const partnerName = hub.provider === "tiqets" ? "Tiqets" : "Klook";

          return (
            <section
              key={hub.id}
              id={`city-hub-${hub.id}`}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
            >
              {/* City Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-brand-navy">
                      0{idx + 1}. {isBn ? hub.countryBn : hub.country}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {hub.provider === "tiqets"
                        ? isBn
                          ? "অফিসিয়াল Tiqets মোবাইল পাস"
                          : "Official Tiqets Instant QR Pass"
                        : isBn
                        ? "অফিসিয়াল Klook ডিসকাউন্ট ভাউচার"
                        : "Verified Klook Residency Best-Seller"}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                    {isBn ? hub.cityBn : hub.city}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {isBn ? hub.taglineBn : hub.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
                  {(hub.id === "bangkok" || hub.id === "singapore-kl") && (
                    <a
                      href={resolvePartnerUrl(AFFILIATE_LINKS.kkday)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-cyan-50 hover:bg-cyan-100 text-[#0B192C] border border-cyan-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>
                        {isPromoActive(KKDAY_PROMO.expiresAt)
                          ? isBn
                            ? "KKday ৩০% সেল ও B1G1 ডিল দেখুন"
                            : "KKday 9.9 Sale (30% OFF + B1G1)"
                          : isBn
                          ? "KKday সাউথইস্ট এশিয়া ডিল দেখুন"
                          : "Compare Passes on KKday"}
                      </span>
                      <ExternalLink size={13} className="text-cyan-700" />
                    </a>
                  )}
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.goCity)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-amber-50 hover:bg-amber-100 text-brand-navy border border-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {isBn
                        ? `Go City ${hub.city.split(",")[0]} All-Inclusive / Explorer Pass`
                        : `Go City ${hub.city.split(",")[0]} All-Inclusive & Explorer Pass`}
                    </span>
                    <ExternalLink size={13} className="text-amber-700" />
                  </a>
                  <a
                    href={resolvePartnerUrl(partnerUrl)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {isBn
                        ? `${partnerName}-এ ${hub.city.split(",")[0]}-এর সব টিকিট দেখুন`
                        : `Browse All ${hub.city.split(",")[0]} Passes on ${partnerName}`}
                    </span>
                    <ExternalLink size={13} className="text-[#F6B73C]" />
                  </a>
                </div>
              </div>

              {/* 3-Slot Curated Day Bundle Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hub.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50/70 border border-slate-200/90 hover:border-brand-navy rounded-2xl p-5 flex flex-col justify-between space-y-5 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span className="font-semibold text-brand-navy">
                          {isBn ? item.slotBn : item.slot}
                        </span>
                        <span>{item.duration}</span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {isBn ? item.titleBn : item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn ? item.highlightBn : item.highlight}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 block">
                            {isBn ? "আনুমানিক BDT মূল্য" : "Estimated BDT Rate"}
                          </span>
                          <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                            ৳ {item.priceBdt.toLocaleString()} BDT
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          ({item.priceForeign})
                        </span>
                      </div>

                      <a
                        href={partnerUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full bg-white hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-300 hover:border-brand-navy font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isBn
                            ? `${partnerName}-এ স্লট বুক করুন`
                            : `Book Instant Pass on ${partnerName}`}
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Airport Express & City Transit Bar */}
              <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-semibold text-brand-navy">
                    {isBn
                      ? "এয়ারপোর্ট এক্সপ্রেস ট্রেন ও সিটি ট্রান্সফার"
                      : "Airport Express Rail & City Transit Pass"}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {isBn ? hub.airportExpressBn : hub.airportExpress}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                    ~৳ {hub.airportExpressBdt.toLocaleString()} BDT
                  </span>
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>
                      {isBn ? "ট্রান্সফার পাস দেখুন" : `Reserve on ${partnerName}`}
                    </span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. DUAL-CURRENCY CARD VS. WHATSAPP BDT DESK ASSIST BANNER */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-10 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-2">
          <div className="text-xs font-mono text-[#F6B73C]">
            {isBn
              ? "বাংলাদেশি পাসপোর্টধারীদের জন্য পেমেন্ট সমাধান"
              : "Payment Guide for Bangladeshi Passport Holders"}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {isBn
              ? "Dual-Currency Card নেই? আমাদের ঢাকা ডেস্কের মাধ্যমে BDT-তে Tiqets ও Klook ভাউচার ইস্যু করুন"
              : "Don't Have a Dual-Currency Card Yet? Book Any Tiqets or Klook Pass in BDT"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isBn
              ? "আপনার পাসপোর্টে যদি ডলার এন্ডোর্সমেন্ট করা থাকে, তবে সরাসরি উপরের Tiqets বা Klook লিংকে কার্ড দিয়ে পেমেন্ট করে সাথে সাথে QR টিকিট ডাউনলোড করতে পারবেন। আর কার্ড না থাকলে আমাদের WhatsApp ডেস্কে (+8801784385335) মেসেজ দিয়ে bKash/Nagad বা ব্যাংক ট্রান্সফারে বুক করুন।"
              : "If your Bangladeshi passport has USD endorsement enabled, book directly on Tiqets or Klook above for instant QR delivery. Need to pay in Bangladeshi Taka via bank transfer or bKash? Message our Dhaka desk on WhatsApp."}
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <a
            href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20want%20to%20book%20Tiqets%20or%20Klook%20attraction%20passes%20in%20BDT!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-emerald hover:bg-brand-emerald/90 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>
              {isBn
                ? "WhatsApp BDT বুকিং ডেস্ক (+8801784385335)"
                : "WhatsApp BDT Desk (+8801784385335)"}
            </span>
          </a>
          <a
            href="/blog/dual-currency-card-endorsement-bangladesh"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/blog/dual-currency-card-endorsement-bangladesh");
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer text-center"
          >
            {isBn
              ? "কীভাবে পাসপোর্টে ডলার এন্ডোর্স করবেন পড়ুন →"
              : "Read Dual-Currency Card Endorsement Guide →"}
          </a>
        </div>
      </div>

      {/* 4B. CONTEXTUAL MUSEUM BAG-RESTRICTION & LUGGAGE STORAGE CALLOUT (RADICAL STORAGE) */}
      <RadicalStorageContextualCallout
        slug="europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"
        lang={lang}
      />

      {/* 4C. CONTEXTUAL GO CITY ALL-INCLUSIVE PASSES CALLOUT */}
      <MultiPartnerBlogCallout
        slug="europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"
        lang={lang}
      />

      {/* 5. CONTEXTUAL AIRHELP PROTECTION FOR EUROPE / UK / USA & LONG-HAUL FLYERS */}
      <AirHelpWidget
        lang={lang}
        routeLabel={
          isBn
            ? "লন্ডন, প্যারিস, রোম, নিউ ইয়র্ক ও দুবাই ফ্লাইট সুরক্ষা"
            : "Europe, UK, USA & Dubai Flight Protection"
        }
        compact
      />

      {/* 6. AEO & FAQ SCHEMA SECTION */}
      <TravelIntelligence
        pageTitle={
          isBn
            ? "Tiqets ও Klook আকর্ষণ টিকিট বুকিং গাইড (বাংলাদেশ)"
            : "Global Attraction Passes (Tiqets & Klook) for Bangladeshi Travelers"
        }
        quickAnswer={
          isBn
            ? "বাংলাদেশি পর্যটকরা ইউরোপ, যুক্তরাজ্য ও আমেরিকার (প্যারিস, লন্ডন, রোম, মিলান, ভেনিস, নিউ ইয়র্ক) মিউজিয়াম ও ভিউপয়েন্টের স্কিপ-দ্য-লাইন টিকিটের জন্য Tiqets এবং এশিয়া ও মধ্যপ্রাচ্যের (দুবাই, ব্যাংকক, সিঙ্গাপুর, কুয়ালালামপুর) থিম পার্ক ও ডে-ট্যুরের জন্য Klook ব্যবহার করে সর্বোচ্চ সময় ও অর্থ সাশ্রয় করতে পারেন।"
            : "Bangladeshi travelers can pre-book official skip-the-line timed-entry passes for Europe, the UK, and the USA (Paris, London, Rome, Milan, Venice, New York) via Tiqets, and discounted theme parks, desert safaris, and halal dinner cruises across Asia and Dubai via Klook."
        }
        keyFacts={[
          {
            label: isBn ? "Europe/UK/USA পার্টনার" : "Europe, UK & USA Partner",
            value: "Tiqets (Instant Smartphone QR)",
          },
          {
            label: isBn ? "Asia ও Dubai পার্টনার" : "Asia & Middle East Partner",
            value: "Klook (Best Price Guarantee)",
          },
          {
            label: isBn ? "কার্ড পেমেন্ট" : "Card Compatibility",
            value: "BD Dual-Currency Visa/Mastercard/Amex",
          },
          {
            label: isBn ? "BDT সাপোর্ট" : "BDT Assistance",
            value: "WhatsApp Desk (+8801784385335)",
          },
        ]}
        faqs={EXPERIENCES_FAQS}
      />
    </div>
  );
};
