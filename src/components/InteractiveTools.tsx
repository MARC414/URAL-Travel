import React, { useState } from "react";
import { Coins, Calculator, CheckSquare, ShieldCheck, Heart, User, Sparkles, Check, RefreshCw, Plane, Search, Copy, Send, ArrowRight } from "lucide-react";
import { AirHelpWidget } from "./AirHelpWidget";
import { trackWhatsAppInquiry } from "../utils/analytics";

interface AirportItem {
  code: string;
  city: string;
  name: string;
  country: string;
  category: "bangladesh" | "middle-east" | "asia" | "global";
  airlines: string;
}

const AIRPORTS_DIRECTORY: AirportItem[] = [
  // Bangladesh Domestic & International
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla, Emirates, Saudia, Qatar, Singapore Airlines" },
  { code: "CGP", city: "Chattogram", name: "Shah Amanat International Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla, Flydubai, Air Arabia, SalamAir" },
  { code: "ZYL", city: "Sylhet", name: "Osmani International Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla" },
  { code: "CXB", city: "Cox's Bazar", name: "Cox's Bazar Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla, Air Astra, Novoair" },
  { code: "JSR", city: "Jashore", name: "Jashore Airport (Khulna Division)", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla, Air Astra" },
  { code: "SPD", city: "Saidpur", name: "Saidpur Airport (Rangpur/Dinajpur)", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla, Air Astra" },
  { code: "RJH", city: "Rajshahi", name: "Shah Makhdum Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla" },
  { code: "BZL", city: "Barishal", name: "Barishal Airport", country: "Bangladesh", category: "bangladesh", airlines: "Biman, US-Bangla" },

  // Middle East Hubs
  { code: "DXB", city: "Dubai", name: "Dubai International Airport", country: "UAE", category: "middle-east", airlines: "Emirates, flydubai, Biman, US-Bangla" },
  { code: "SHJ", city: "Sharjah", name: "Sharjah International Airport", country: "UAE", category: "middle-east", airlines: "Air Arabia (Direct low-cost hub)" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International Airport", country: "UAE", category: "middle-east", airlines: "Etihad, Air Arabia Abu Dhabi, Biman, US-Bangla" },
  { code: "JED", city: "Jeddah", name: "King Abdulaziz International Airport (Haramain/Umrah)", country: "Saudi Arabia", category: "middle-east", airlines: "Saudia, Biman, flynas" },
  { code: "MED", city: "Madinah", name: "Prince Mohammad bin Abdulaziz Airport", country: "Saudi Arabia", category: "middle-east", airlines: "Saudia, Biman, flynas" },
  { code: "RUH", city: "Riyadh", name: "King Khalid International Airport", country: "Saudi Arabia", category: "middle-east", airlines: "Saudia, Biman" },
  { code: "DMM", city: "Dammam", name: "King Fahd International Airport", country: "Saudi Arabia", category: "middle-east", airlines: "Saudia, Biman, US-Bangla" },
  { code: "DOH", city: "Doha", name: "Hamad International Airport", country: "Qatar", category: "middle-east", airlines: "Qatar Airways, Biman, US-Bangla" },
  { code: "MCT", city: "Muscat", name: "Muscat International Airport", country: "Oman", category: "middle-east", airlines: "Oman Air, SalamAir, Biman, US-Bangla" },
  { code: "KWI", city: "Kuwait City", name: "Kuwait International Airport", country: "Kuwait", category: "middle-east", airlines: "Kuwait Airways, Jazeera Airways, Biman" },

  // South & Southeast Asia
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport (Main Hub)", country: "Thailand", category: "asia", airlines: "Thai Airways, Biman, US-Bangla, Drukair" },
  { code: "DMK", city: "Bangkok", name: "Don Mueang International (Low Cost)", country: "Thailand", category: "asia", airlines: "Thai AirAsia, Thai Lion Air" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International (KLIA 1 & 2)", country: "Malaysia", category: "asia", airlines: "Malaysia Airlines, Batik Air, AirAsia, Biman, US-Bangla" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi Airport", country: "Singapore", category: "asia", airlines: "Singapore Airlines, Biman, US-Bangla" },
  { code: "MLE", city: "Maldives", name: "Velana International Airport (Male)", country: "Maldives", category: "asia", airlines: "US-Bangla, Maldivian, SriLankan" },
  { code: "KTM", city: "Kathmandu", name: "Tribhuvan International Airport", country: "Nepal", category: "asia", airlines: "Biman, Himalaya Airlines" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhash Chandra Bose International", country: "India", category: "asia", airlines: "Biman, US-Bangla, IndiGo" },
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International Airport", country: "India", category: "asia", airlines: "Biman, Air India, IndiGo" },
  { code: "MAA", city: "Chennai", name: "Chennai International Airport", country: "India", category: "asia", airlines: "Biman, US-Bangla, IndiGo" },
  { code: "CMB", city: "Colombo", name: "Bandaranaike International Airport", country: "Sri Lanka", category: "asia", airlines: "SriLankan Airlines, FitsAir" },

  // Global Transit Gateways
  { code: "LHR", city: "London", name: "London Heathrow Airport", country: "United Kingdom", category: "global", airlines: "Biman, British Airways, Emirates, Qatar" },
  { code: "JFK", city: "New York", name: "John F. Kennedy International Airport", country: "USA", category: "global", airlines: "Emirates, Qatar, Turkish, Saudia" },
  { code: "YYZ", city: "Toronto", name: "Toronto Pearson International Airport", country: "Canada", category: "global", airlines: "Biman, Emirates, Qatar, Turkish" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Turkey", category: "global", airlines: "Turkish Airlines, Biman" },
];

export function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<"converter" | "calculator" | "packing" | "visa-checker" | "airhelp" | "airports">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "airhelp" || tab === "converter" || tab === "calculator" || tab === "packing" || tab === "visa-checker" || tab === "airports") {
        return tab;
      }
    }
    return "calculator";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "airhelp" || tab === "converter" || tab === "calculator" || tab === "packing" || tab === "visa-checker" || tab === "airports") {
      setActiveTool(tab);
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  // 1. Currency Converter State
  const [bdtAmount, setBdtAmount] = useState<number>(10000);
  const conversionRates: { [key: string]: { rate: number; name: string; icon: string } } = {
    NPR: { rate: 1.13, name: "Nepali Rupee", icon: "🇳🇵" },
    THB: { rate: 0.30, name: "Thai Baht", icon: "🇹🇭" },
    MYR: { rate: 0.037, name: "Malaysian Ringgit", icon: "🇲🇾" },
    AED: { rate: 0.033, name: "UAE Dirham", icon: "🇦🇪" },
    USD: { rate: 0.0084, name: "US Dollar", icon: "🇺🇸" }
  };

  // 2. Travel Budget Calculator State
  const [calcCountry, setCalcCountry] = useState<"nepal" | "thailand" | "malaysia" | "uae">("thailand");
  const [calcDays, setCalcDays] = useState<number>(5);
  const [calcPeeps, setCalcPeeps] = useState<number>(1);
  const [budgetTier, setBudgetTier] = useState<"low" | "mid" | "high">("mid");

  const calcRates = {
    nepal: {
      flightBdt: 33000,
      low: { lodging: 1200, meals: 800, transport: 500, tickets: 600 },
      mid: { lodging: 3500, meals: 1800, transport: 1500, tickets: 1800 },
      high: { lodging: 12000, meals: 3500, transport: 4500, tickets: 4000 }
    },
    thailand: {
      flightBdt: 37000,
      low: { lodging: 1800, meals: 1200, transport: 400, tickets: 800 },
      mid: { lodging: 4500, meals: 2500, transport: 1200, tickets: 2500 },
      high: { lodging: 14000, meals: 6000, transport: 3500, tickets: 6000 }
    },
    malaysia: {
      flightBdt: 42000,
      low: { lodging: 1800, meals: 1000, transport: 300, tickets: 1500 },
      mid: { lodging: 5000, meals: 2200, transport: 1000, tickets: 4000 },
      high: { lodging: 11000, meals: 5000, transport: 3000, tickets: 9000 }
    },
    uae: {
      flightBdt: 62000,
      low: { lodging: 3500, meals: 1800, transport: 800, tickets: 4500 },
      mid: { lodging: 8000, meals: 4500, transport: 2000, tickets: 12000 },
      high: { lodging: 25000, meals: 12000, transport: 6000, tickets: 35000 }
    }
  };

  // Calculate totals
  const activeRateSet = calcRates[calcCountry];
  const activeCosts = activeRateSet[budgetTier];
  const flightCostTotal = activeRateSet.flightBdt * calcPeeps;
  const lodgingCostTotal = activeCosts.lodging * calcDays * Math.ceil(calcPeeps / 2); // Assume double sharing
  const mealsCostTotal = activeCosts.meals * calcDays * calcPeeps;
  const transitCostTotal = activeCosts.transport * calcDays * calcPeeps;
  const entriesCostTotal = activeCosts.tickets * calcDays * calcPeeps;

  const grandBdtTotal = flightCostTotal + lodgingCostTotal + mealsCostTotal + transitCostTotal + entriesCostTotal;

  // 3. Packing Checklist State
  const [checklist, setChecklist] = useState([
    // Category: Documents
    { id: 1, text: "Original Passport (Min 6 months validity)", checked: true, category: "Documents" },
    { id: 2, text: "Visa hardcopy printouts (eVisa / eVAL / pre-approvals)", checked: false, category: "Documents" },
    { id: 3, text: "Confirmed return air ticket hardcopy", checked: false, category: "Documents" },
    { id: 4, text: "Hotel physical booking vouchers", checked: false, category: "Documents" },
    { id: 5, text: "6-months Bank Statement & Solvency letter", checked: false, category: "Documents" },
    // Category: Electronics
    { id: 6, text: "Universal power adapter plug", checked: true, category: "Electronics" },
    { id: 7, text: "High-capacity powerbank (10,000 to 20,000 mAh)", checked: false, category: "Electronics" },
    { id: 8, text: "Local eSIM or Physical tourist SIM voucher", checked: false, category: "Electronics" },
    { id: 9, text: "Phone charger & camera memory cards", checked: false, category: "Electronics" },
    // Category: Toiletries & Clothing
    { id: 10, text: "Prescribed medicines with doctor prescriptions", checked: true, category: "Health" },
    { id: 11, text: "Light cotton clothes (for Bangkok/KL) OR jacket (for Nepal)", checked: false, category: "Clothes" },
    { id: 12, text: "Foldable umbrella / travel poncho", checked: false, category: "Clothes" },
  ]);

  const toggleCheckItem = (id: number) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(i => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 105);

  // 4. Visa Eligibility Tester State
  const [testNational, setTestNational] = useState<"bd" | "in" | "pk">("bd");
  const [testDest, setTestDest] = useState<"np" | "th" | "my" | "ae">("np");

  const visaEligibilityMap = {
    bd: {
      np: { status: "Visa On Arrival", color: "text-emerald-600 bg-emerald-50 border-emerald-200", text: "Bangladeshi passport holders receive an instant 15/30/90 days Visa on Arrival. First entry of the calendar year is completely GRATIS (Free) for SAARC nationals!" },
      th: { status: "Pre-arranged Sticker Visa Required", color: "text-amber-700 bg-amber-50 border-amber-200", text: "Must submit a physical application with Bank Solvency, statement, and NOC via VFS Global Dhaka/Chattogram before departure. Typically takes 5-7 working days." },
      my: { status: "eVisa (Fast Online Approval)", color: "text-blue-700 bg-blue-50 border-blue-200", text: "An eVisa is easily applied for online with 100% approval rates when bank statements show BDT 80,000+ per person. Processing duration: 48-72 hours." },
      ae: { status: "eVisa via Register Agencies", color: "text-pink-700 bg-pink-50 border-pink-200", text: "Tourist visas are applied online via registered travel agencies or flies carriers (Emirates, flydubai) at least 5 days prior to boarding." }
    },
    in: {
      np: { status: "Visa Free / Freedom of Movement", color: "text-emerald-700 bg-emerald-50 border-emerald-200", text: "Indian citizens have full freedom of travel, stay, and work in Nepal. No visa, fee, or pre-approvals required. Simply fly with a valid national ID or passport!" },
      th: { status: "Visa On Arrival / eVisa", color: "text-teal-700 bg-teal-50 border-teal-200", text: "Eligible for easy 15-day Visa on Arrival or high-speed eVisa approvals. Fares: 2,000 THB." },
      my: { status: "Visa On Arrival / eVisa", color: "text-blue-700 bg-blue-50 border-blue-200", text: "Indian passport holders can smoothly travel with digital eVisa or receive Visa on Arrival under specific transit rules at designated borders." },
      ae: { status: "eVisa / Visa on Arrival", color: "text-pink-700 bg-[#FFF5F7] border-pink-200", text: "Eligible for Visa on Arrival if holding specific green cards/visas from US/UK/Schengen. Otherwise, digital eVisa is required." }
    },
    pk: {
      np: { status: "Visa on Arrival", color: "text-emerald-700 bg-emerald-50 border-emerald-200", text: "Eligible for standard Visa on Arrival. First trip registration is gratis as a SAARC citizen." },
      th: { status: " Embassy Sticker Required", color: "text-red-700 bg-red-50 border-red-250", text: "Must apply for a physical sticker visa at Thai consulate before flying. High documentation checks apply." },
      my: { status: "Pre-arranged Visa Required", color: "text-red-700 bg-red-50 border-red-250", text: "Must obtain an approved Single Entry Visa online or through registered consultancies before departing." },
      ae: { status: "Pre-arranged Visa", color: "text-red-700 bg-red-50 border-red-250", text: "Tourist visas are restricted and require pre-clearances and secure agent approvals." }
    }
  };

  const currentEligibility = visaEligibilityMap[testNational][testDest];

  // 5. Airport Code Directory & WhatsApp Ticket Inquiry State
  const [airportQuery, setAirportQuery] = useState("");
  const [airportCategory, setAirportCategory] = useState<"all" | "bangladesh" | "middle-east" | "asia" | "global">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // WhatsApp Inquiry Generator State
  const [inquiryOrigin, setInquiryOrigin] = useState("DAC");
  const [inquiryDestination, setInquiryDestination] = useState("DXB");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryReturnDate, setInquiryReturnDate] = useState("");
  const [inquiryPassengers, setInquiryPassengers] = useState("1 Adult");
  const [inquiryClass, setInquiryClass] = useState("Economy");
  const [inquiryNotes, setInquiryNotes] = useState("");

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const filteredAirports = AIRPORTS_DIRECTORY.filter((item) => {
    const matchesCategory = airportCategory === "all" || item.category === airportCategory;
    const q = airportQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      item.code.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.airlines.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const generateWhatsAppInquiryUrl = () => {
    const originItem = AIRPORTS_DIRECTORY.find((a) => a.code === inquiryOrigin);
    const destItem = AIRPORTS_DIRECTORY.find((a) => a.code === inquiryDestination);
    const originLabel = originItem ? `${originItem.city} (${originItem.code})` : inquiryOrigin;
    const destLabel = destItem ? `${destItem.city} (${destItem.code})` : inquiryDestination;

    const message = [
      `Assalamu Alaikum URAL Travel Desk, I would like to request a flight fare quote:`,
      ``,
      `✈️ Route: ${originLabel} ➔ ${destLabel}`,
      `📅 Departure Date: ${inquiryDate || "Flexible (Please advise earliest/cheapest)"}`,
      inquiryReturnDate ? `🔄 Return Date: ${inquiryReturnDate}` : `Trip Type: One-Way`,
      `👥 Passengers: ${inquiryPassengers}`,
      `💺 Cabin Class: ${inquiryClass}`,
      inquiryNotes ? `📝 Note: ${inquiryNotes}` : ``,
      ``,
      `Please share available airline options, baggage allowances, and best BDT fare via bKash/Bank Transfer.`
    ].filter(Boolean).join("\n");

    return `https://wa.me/8801784385335?text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="interactive-tools-panel" className="bg-brand-ivory border border-slate-200 rounded-xl overflow-hidden shadow-lg my-8">
      {/* Tools Top Header Navigation */}
      <div className="bg-brand-navy px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="text-[#F6B73C]" size={20} />
          URAL Bangladesh Travel Utility Desk
        </h3>
        <div className="flex flex-wrap bg-[#0c2033]/80 p-1 rounded-lg border border-slate-800 text-xs text-white gap-1">
          <button
            id="tool-nav-airports"
            onClick={() => setActiveTool("airports")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              activeTool === "airports" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-300 hover:text-white"
            }`}
          >
            <Plane size={13} />
            Airport Codes (IATA)
          </button>
          <button
            id="tool-nav-calculator"
            onClick={() => setActiveTool("calculator")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "calculator" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-350 hover:text-white"
            }`}
          >
            Trip Cost Estimator
          </button>
          <button
            id="tool-nav-converter"
            onClick={() => setActiveTool("converter")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "converter" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-350 hover:text-white"
            }`}
          >
            Currency Converter
          </button>
          <button
            id="tool-nav-packing"
            onClick={() => setActiveTool("packing")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "packing" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-350 hover:text-white"
            }`}
          >
            Smart Checklist
          </button>
          <button
            id="tool-nav-visa-checker"
            onClick={() => setActiveTool("visa-checker")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "visa-checker" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-350 hover:text-white"
            }`}
          >
            Visa Checker
          </button>
          <button
            id="tool-nav-airhelp"
            onClick={() => setActiveTool("airhelp")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "airhelp" ? "bg-[#F6B73C] text-brand-navy shadow-sm" : "text-slate-350 hover:text-white"
            }`}
          >
            Flight Delay Claim (€600)
          </button>
        </div>
      </div>

      {/* Internal Content Container */}
      <div className="p-6 md:p-8">
        {/* TOOL 1: CALCULATOR */}
        {activeTool === "calculator" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-800 font-serif border-b border-slate-200 pb-3">
              <Calculator className="text-brand-navy" size={20} />
              <h4 className="font-bold text-lg">Interactive Outbound Budget Estimator (BDT)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="space-y-4 bg-slate-100/70 p-5 rounded-xl border border-slate-200/80">
                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">1. Trip Parameters</h5>

                <div>
                  <label htmlFor="calc-dest-select" className="block text-xs font-semibold text-slate-700 mb-1">Target Destination</label>
                  <select
                    id="calc-dest-select"
                    value={calcCountry}
                    onChange={(e) => setCalcCountry(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="nepal">Nepal 🇳🇵</option>
                    <option value="thailand">Thailand 🇹🇭</option>
                    <option value="malaysia">Malaysia 🇲🇾</option>
                    <option value="uae">United Arab Emirates (Dubai) 🇦🇪</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-days-range" className="block text-xs font-semibold text-slate-700 mb-1">Duration of Trip ({calcDays} Days)</label>
                  <input
                    id="calc-days-range"
                    type="range"
                    min="1"
                    max="14"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 Day</span>
                    <span>7 Days</span>
                    <span>14 Days</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="calc-peeps-range" className="block text-xs font-semibold text-slate-700 mb-1">Companions ({calcPeeps} {calcPeeps === 1 ? "Person" : "Persons"})</label>
                  <input
                    id="calc-peeps-range"
                    type="range"
                    min="1"
                    max="5"
                    value={calcPeeps}
                    onChange={(e) => setCalcPeeps(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 Traveler (Solo)</span>
                    <span>3 (Couple + 1)</span>
                    <span>5 (Family)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Style of Travel</label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-lg border border-slate-250 text-[10px] font-bold">
                    <button
                      id="tier-low"
                      type="button"
                      onClick={() => setBudgetTier("low")}
                      className={`py-1.5 rounded ${budgetTier === "low" ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      Backpacker
                    </button>
                    <button
                      id="tier-mid"
                      type="button"
                      onClick={() => setBudgetTier("mid")}
                      className={`py-1.5 rounded ${budgetTier === "mid" ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      Mid-Comfort
                    </button>
                    <button
                      id="tier-high"
                      type="button"
                      onClick={() => setBudgetTier("high")}
                      className={`py-1.5 rounded ${budgetTier === "high" ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      Luxury Heritage
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Recalculated Output Column */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-brand-navy text-slate-100 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Decorative mesh */}
                  <div className="absolute right-0 top-0 opacity-10 text-white font-serif text-9xl">৳</div>
                  <div>
                    <h5 className="text-[10px] font-bold font-mono text-[#F6B73C] uppercase tracking-widest block mb-1">Estimated Outbound Investment</h5>
                    <div className="text-4xl font-serif font-black tracking-tight text-white">
                      ৳ {grandBdtTotal.toLocaleString()} <span className="text-xs font-sans font-normal text-slate-350">BDT</span>
                    </div>
                    <p className="text-xs text-slate-350 mt-1">
                      Estimations customized to current June 2026 inflation and fuel surcharges.
                    </p>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 shrink-0 text-center md:min-w-[120px]">
                    <span className="text-[9px] text-slate-400 uppercase font-mono block">Budget Per Person</span>
                    <span className="text-sm font-bold text-white">৳ {Math.round(grandBdtTotal / calcPeeps).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-350 block mt-0.5">({calcPeeps} Peep)</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                  <h6 className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">Cost Breakdown Overview:</h6>

                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">🛫 Roundtrip Outbound Airfare (Dhaka - {calcCountry.toUpperCase()})</span>
                    <span className="font-mono font-semibold text-slate-800">৳ {flightCostTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">🏨 Local Accommodation ({calcDays} Nights, {Math.ceil(calcPeeps/2)} Rooms)</span>
                    <span className="font-mono font-semibold text-slate-800">৳ {lodgingCostTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">🍲 Daily Halal Meals & Refreshments</span>
                    <span className="font-mono font-semibold text-slate-800">৳ {mealsCostTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">🚗 Innercity Transit & Taxis ({calcDays} Days)</span>
                    <span className="font-mono font-semibold text-slate-800">৳ {transitCostTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-1.5">
                    <span className="text-slate-600">🎟️ Attraction Sightseeing & Historical Monuments Gates Entry</span>
                    <span className="font-mono font-semibold text-slate-800">৳ {entriesCostTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: CONVERTER */}
        {activeTool === "converter" && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="flex items-center gap-2 text-slate-800 font-serif border-b border-slate-200 pb-3">
              <Coins className="text-brand-navy" size={20} />
              <h4 className="font-bold text-lg">Bangladeshi Taka (BDT) Real-time Currency Proxy</h4>
            </div>

            <div className="bg-slate-100/70 p-6 rounded-xl border border-slate-200 space-y-4">
              <div>
                <label htmlFor="input-converter-bdt" className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Base Investment (Bangladeshi Taka BDT)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-semibold text-slate-500 text-sm">৳</span>
                  <input
                    id="input-converter-bdt"
                    type="number"
                    value={bdtAmount}
                    onChange={(e) => setBdtAmount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-350 rounded-lg pl-8 pr-12 py-3 text-sm font-semibold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">BDT</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-650 block mb-2 font-mono uppercase">ESTIMATED VALUATION ACROSS POPULAR SOUTH ASIAN TARGETS:</span>
                <div className="space-y-2">
                  {Object.keys(conversionRates).map((currency) => {
                    const coin = conversionRates[currency];
                    const convertedVal = (bdtAmount * coin.rate).toFixed(2);
                    return (
                      <div key={currency} className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{coin.icon}</span>
                          <div>
                            <span className="font-bold text-slate-800">{currency}</span>
                            <span className="text-slate-400 block text-[10px]">{coin.name}</span>
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="font-bold text-slate-850 text-sm">{convertedVal} {currency}</div>
                          <div className="text-[10px] text-slate-400">1 BDT ≈ {coin.rate} {currency}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: PACKING */}
        {activeTool === "packing" && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-slate-850 font-serif">
                <CheckSquare className="text-brand-navy" size={20} />
                <h4 className="font-bold text-lg">Bangladeshi Outbound Packing Checklist</h4>
              </div>
              <div className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 py-1 px-2.5 rounded-full border border-slate-200">
                {checkedCount} / {checklist.length} Packaged
              </div>
            </div>

            {/* Progress Meter */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Verification Readiness Progress</span>
                <span className="font-semibold text-slate-700">{Math.min(progressPercent, 100)}% Ready</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Checklist items list */}
            <div className="space-y-3 bg-white p-6 rounded-xl border border-slate-200">
              {["Documents", "Electronics", "Health", "Clothes"].map((category) => {
                const categoricalItems = checklist.filter(item => item.category === category);
                return (
                  <div key={category} className="space-y-2">
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-wider block border-l-2 border-brand-navy pl-2 mb-2">{category} Items</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {categoricalItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleCheckItem(item.id)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                            item.checked
                              ? "bg-emerald-50 border-emerald-200 text-slate-700 font-medium"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-4.5 h-4.5 border rounded flex items-center justify-center shrink-0 ${
                            item.checked ? "bg-emerald-500 border-emerald-600 text-white" : "border-slate-300 bg-white"
                          }`}>
                            {item.checked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TOOL 4: VISA ELIGIBILITY */}
        {activeTool === "visa-checker" && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="flex items-center gap-2 text-slate-800 font-serif border-b border-slate-200 pb-3">
              <ShieldCheck className="text-brand-navy" size={20} />
              <h4 className="font-bold text-lg">Passport Visa Eligibility Evaluator</h4>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="select-checker-national" className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">My Nationality Passport:</label>
                  <select
                    id="select-checker-national"
                    value={testNational}
                    onChange={(e) => setTestNational(e.target.value as any)}
                    className="w-full bg-white border border-slate-350 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="bd">Bangladesh 🇧🇩</option>
                    <option value="in">India 🇮🇳</option>
                    <option value="pk">Pakistan 🇵🇰</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="select-checker-dest" className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">Travel Destination:</label>
                  <select
                    id="select-checker-dest"
                    value={testDest}
                    onChange={(e) => setTestDest(e.target.value as any)}
                    className="w-full bg-white border border-slate-350 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  >
                    <option value="np">Nepal 🇳🇵</option>
                    <option value="th">Thailand 🇹🇭</option>
                    <option value="my">Malaysia 🇲🇾</option>
                    <option value="ae">UAE 🇦🇪</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Answer Box */}
              <div className={`p-5 rounded-lg border-2 ${currentEligibility.color} space-y-2 animate-fade-in`}>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="shrink-0" size={18} />
                  <span className="font-serif font-black text-sm uppercase">{currentEligibility.status}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {currentEligibility.text}
                </p>
              </div>

              {/* General rule warning */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[10px] text-amber-900 leading-relaxed font-mono">
                ⚠️ Bangladeshis require a tourist check-in clearance. Always verify that your passport biodata pages do not contain 'restricted clearance' remarks and that your passport has at least 6 months validity.
              </div>
            </div>
          </div>
        )}

        {/* TOOL 5: AIRHELP FLIGHT DELAY & COMPENSATION */}
        {activeTool === "airhelp" && (
          <div className="animate-fade-in">
            <AirHelpWidget />
          </div>
        )}

        {/* TOOL 6: IATA AIRPORT CODES & WHATSAPP FLIGHT INQUIRY GENERATOR */}
        {activeTool === "airports" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-serif">
                  <Plane className="text-brand-navy" size={22} />
                  <h4 className="font-bold text-xl">IATA Airport Codes & Flight Desk Directory</h4>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Official 3-letter airport codes required for global GDS ticket booking, domestic connections, and airline inquiries.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span>32 Verified Air Hubs</span>
              </div>
            </div>

            {/* Part A: 1-Click WhatsApp Flight Quote Generator */}
            <div className="bg-gradient-to-br from-slate-900 via-brand-navy to-[#081322] text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-wider block">
                    Instant Ticketing Assistance
                  </span>
                  <h5 className="font-serif font-bold text-base text-white">
                    1-Click WhatsApp Flight Fare Request
                  </h5>
                </div>
                <span className="text-[11px] text-slate-300">
                  Direct connection with Dhaka Outbound Desk (+8801784385335)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs text-slate-900">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Flying From (Origin)</label>
                  <select
                    value={inquiryOrigin}
                    onChange={(e) => setInquiryOrigin(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F6B73C]"
                  >
                    <optgroup label="Bangladesh Hubs">
                      <option value="DAC">DAC — Dhaka (Hazrat Shahjalal)</option>
                      <option value="CGP">CGP — Chattogram (Shah Amanat)</option>
                      <option value="ZYL">ZYL — Sylhet (Osmani)</option>
                      <option value="CXB">CXB — Cox's Bazar</option>
                      <option value="JSR">JSR — Jashore / Khulna</option>
                      <option value="SPD">SPD — Saidpur / Rangpur</option>
                    </optgroup>
                    <optgroup label="International">
                      <option value="DXB">DXB — Dubai, UAE</option>
                      <option value="KUL">KUL — Kuala Lumpur, Malaysia</option>
                      <option value="BKK">BKK — Bangkok, Thailand</option>
                      <option value="SIN">SIN — Singapore</option>
                      <option value="JED">JED — Jeddah, Saudi Arabia</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Flying To (Destination)</label>
                  <select
                    value={inquiryDestination}
                    onChange={(e) => setInquiryDestination(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F6B73C]"
                  >
                    <optgroup label="Middle East">
                      <option value="DXB">DXB — Dubai International, UAE</option>
                      <option value="SHJ">SHJ — Sharjah (Air Arabia Hub)</option>
                      <option value="AUH">AUH — Abu Dhabi, UAE</option>
                      <option value="JED">JED — Jeddah (Makkah/Umrah)</option>
                      <option value="MED">MED — Madinah, Saudi Arabia</option>
                      <option value="RUH">RUH — Riyadh, Saudi Arabia</option>
                      <option value="DMM">DMM — Dammam, Saudi Arabia</option>
                      <option value="DOH">DOH — Doha, Qatar</option>
                      <option value="MCT">MCT — Muscat, Oman</option>
                      <option value="KWI">KWI — Kuwait City</option>
                    </optgroup>
                    <optgroup label="Southeast & South Asia">
                      <option value="BKK">BKK — Bangkok (Suvarnabhumi)</option>
                      <option value="DMK">DMK — Bangkok (Don Mueang)</option>
                      <option value="KUL">KUL — Kuala Lumpur (KLIA)</option>
                      <option value="SIN">SIN — Singapore Changi</option>
                      <option value="MLE">MLE — Maldives (Male)</option>
                      <option value="KTM">KTM — Kathmandu, Nepal</option>
                      <option value="CCU">CCU — Kolkata, India</option>
                      <option value="DEL">DEL — Delhi, India</option>
                      <option value="MAA">MAA — Chennai, India</option>
                      <option value="CMB">CMB — Colombo, Sri Lanka</option>
                    </optgroup>
                    <optgroup label="Domestic (Bangladesh)">
                      <option value="CGP">CGP — Chattogram</option>
                      <option value="CXB">CXB — Cox's Bazar</option>
                      <option value="ZYL">ZYL — Sylhet</option>
                      <option value="DAC">DAC — Dhaka</option>
                    </optgroup>
                    <optgroup label="Long Haul">
                      <option value="LHR">LHR — London Heathrow, UK</option>
                      <option value="JFK">JFK — New York JFK, USA</option>
                      <option value="YYZ">YYZ — Toronto, Canada</option>
                      <option value="IST">IST — Istanbul, Turkey</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F6B73C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Passengers & Cabin</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={inquiryPassengers}
                      onChange={(e) => setInquiryPassengers(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-900 focus:outline-none"
                    >
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="3 Adults">3 Adults</option>
                      <option value="Family (2A + 1C)">2A + 1 Child</option>
                      <option value="Family (2A + 2C)">2A + 2 Children</option>
                      <option value="Group (4+ Pax)">Group (4+)</option>
                    </select>
                    <select
                      value={inquiryClass}
                      onChange={(e) => setInquiryClass(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-2 py-2 text-xs text-slate-900 focus:outline-none"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Prem Economy</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400">
                  Ready to send via WhatsApp: <strong className="text-white font-mono">{inquiryOrigin} ➔ {inquiryDestination}</strong> ({inquiryDate || "Flexible date"})
                </span>
                <a
                  href={generateWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackWhatsAppInquiry({
                      origin: inquiryOrigin,
                      destination: inquiryDestination,
                      date: inquiryDate,
                      passengers: inquiryPassengers,
                      cabinClass: inquiryClass,
                      inquiryType: "flight_fare_quote",
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Fare Quote Request on WhatsApp →</span>
                </a>
              </div>
            </div>

            {/* Part B: Search & Directory Filter */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={airportQuery}
                    onChange={(e) => setAirportQuery(e.target.value)}
                    placeholder="Search by 3-letter IATA code, city, country, or airport name (e.g. DAC, Chittagong, Dubai, BKK, Jeddah)..."
                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy shadow-xs"
                  />
                  {airportQuery && (
                    <button
                      onClick={() => setAirportQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setAirportCategory("all")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      airportCategory === "all" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All ({AIRPORTS_DIRECTORY.length})
                  </button>
                  <button
                    onClick={() => setAirportCategory("bangladesh")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      airportCategory === "bangladesh" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Bangladesh Domestic (8)
                  </button>
                  <button
                    onClick={() => setAirportCategory("middle-east")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      airportCategory === "middle-east" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Middle East (10)
                  </button>
                  <button
                    onClick={() => setAirportCategory("asia")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      airportCategory === "asia" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    South & SE Asia (10)
                  </button>
                  <button
                    onClick={() => setAirportCategory("global")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      airportCategory === "global" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Global Gateways (4)
                  </button>
                </div>
              </div>

              {copiedCode && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2 rounded-xl flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>IATA code <strong>{copiedCode}</strong> copied to clipboard! Paste it into your flight search or ticket chat.</span>
                </div>
              )}

              {/* Directory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredAirports.map((airport) => (
                  <div
                    key={airport.code}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-brand-navy hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono font-black text-lg text-brand-navy tracking-tight">
                          {airport.code}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <span>{airport.city}</span>
                          <span className="text-slate-300">·</span>
                          <span className="font-medium text-slate-700">{airport.country}</span>
                        </div>
                      </div>
                      <h6 className="text-xs font-semibold text-slate-900 leading-snug line-clamp-1">
                        {airport.name}
                      </h6>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        Airlines: {airport.airlines}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleCopyCode(airport.code)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-brand-navy bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Copy size={11} />
                        <span>Copy Code</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryDestination(airport.code);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy hover:text-brand-emerald cursor-pointer"
                      >
                        <span>Set as Destination →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAirports.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <p className="text-sm font-semibold text-slate-800">No airport found matching "{airportQuery}"</p>
                  <p className="text-xs text-slate-500">
                    Try searching for another city, country, or 3-letter IATA code, or request a custom flight route on WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Travel Agent Tip */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-navy uppercase tracking-wider">
                <Sparkles size={14} className="text-[#D4941A]" />
                <span>Senior Ticketing Consultant Advice for Inbound Callers</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                When calling or messaging a travel desk, always mention the <strong>departure city code (e.g. DAC for Dhaka, CGP for Chattogram)</strong>, the <strong>destination code (e.g. DXB for Dubai, JED for Jeddah)</strong>, and whether your <strong>dates are fixed or flexible by 1–2 days</strong>. Fare differences between consecutive departure days can save up to BDT 12,000 on long-haul and Middle East routes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
