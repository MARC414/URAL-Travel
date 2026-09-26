import React, { useState } from "react";
import { Coins, Calculator, CheckSquare, ShieldCheck, Heart, User, Sparkles, Check, RefreshCw } from "lucide-react";
import { AirHelpWidget } from "./AirHelpWidget";

export function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<"converter" | "calculator" | "packing" | "visa-checker" | "airhelp">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "airhelp" || tab === "converter" || tab === "calculator" || tab === "packing" || tab === "visa-checker") {
        return tab;
      }
    }
    return "calculator";
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "airhelp" || tab === "converter" || tab === "calculator" || tab === "packing" || tab === "visa-checker") {
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

  return (
    <div id="interactive-tools-panel" className="bg-[#F8FAFC] border border-slate-200 rounded-xl overflow-hidden shadow-lg my-8">
      {/* Tools Top Header Navigation */}
      <div className="bg-[#102A43] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="text-[#F6B73C]" size={20} />
          URAL Bangladesh Travel Utility Desk
        </h3>
        <div className="flex bg-[#0c2033]/80 p-1 rounded-lg border border-slate-800 text-xs text-white">
          <button
            id="tool-nav-calculator"
            onClick={() => setActiveTool("calculator")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "calculator" ? "bg-[#F6B73C] text-[#102A43]" : "text-slate-350 hover:text-white"
            }`}
          >
            Trip Cost Estimator
          </button>
          <button
            id="tool-nav-converter"
            onClick={() => setActiveTool("converter")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "converter" ? "bg-[#F6B73C] text-[#102A43]" : "text-slate-350 hover:text-white"
            }`}
          >
            Currency Converter
          </button>
          <button
            id="tool-nav-packing"
            onClick={() => setActiveTool("packing")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "packing" ? "bg-[#F6B73C] text-[#102A43]" : "text-slate-350 hover:text-white"
            }`}
          >
            Smart Checklist
          </button>
          <button
            id="tool-nav-visa-checker"
            onClick={() => setActiveTool("visa-checker")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "visa-checker" ? "bg-[#F6B73C] text-[#102A43]" : "text-slate-350 hover:text-white"
            }`}
          >
            Visa Checker
          </button>
          <button
            id="tool-nav-airhelp"
            onClick={() => setActiveTool("airhelp")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTool === "airhelp" ? "bg-[#F6B73C] text-[#102A43]" : "text-slate-350 hover:text-white"
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
              <Calculator className="text-[#102A43]" size={20} />
              <h4 className="font-bold text-lg">Interactive Outbound Budget Estimator (BDT)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="space-y-4 bg-slate-100/70 p-5 rounded-xl border border-slate-200/80">
                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider font-mono">1. Trip Parameters</h5>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Destination</label>
                  <select
                    id="calc-dest-select"
                    value={calcCountry}
                    onChange={(e) => setCalcCountry(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  >
                    <option value="nepal">Nepal 🇳🇵</option>
                    <option value="thailand">Thailand 🇹🇭</option>
                    <option value="malaysia">Malaysia 🇲🇾</option>
                    <option value="uae">United Arab Emirates (Dubai) 🇦🇪</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration of Trip ({calcDays} Days)</label>
                  <input
                    id="calc-days-range"
                    type="range"
                    min="1"
                    max="14"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#102A43]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 Day</span>
                    <span>7 Days</span>
                    <span>14 Days</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Companions ({calcPeeps} {calcPeeps === 1 ? "Person" : "Persons"})</label>
                  <input
                    id="calc-peeps-range"
                    type="range"
                    min="1"
                    max="5"
                    value={calcPeeps}
                    onChange={(e) => setCalcPeeps(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#102A43]"
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
                <div className="bg-[#102A43] text-slate-100 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <Coins className="text-[#102A43]" size={20} />
              <h4 className="font-bold text-lg">Bangladeshi Taka (BDT) Real-time Currency Proxy</h4>
            </div>

            <div className="bg-slate-100/70 p-6 rounded-xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">Base Investment (Bangladeshi Taka BDT)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-semibold text-slate-500 text-sm">৳</span>
                  <input
                    id="input-converter-bdt"
                    type="number"
                    value={bdtAmount}
                    onChange={(e) => setBdtAmount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-350 rounded-lg pl-8 pr-12 py-3 text-sm font-semibold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
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
                <CheckSquare className="text-[#102A43]" size={20} />
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
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-wider block border-l-2 border-[#102A43] pl-2 mb-2">{category} Items</span>
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
              <ShieldCheck className="text-[#102A43]" size={20} />
              <h4 className="font-bold text-lg">Passport Visa Eligibility Evaluator</h4>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">My Nationality Passport:</label>
                  <select
                    id="select-checker-national"
                    value={testNational}
                    onChange={(e) => setTestNational(e.target.value as any)}
                    className="w-full bg-white border border-slate-350 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  >
                    <option value="bd">Bangladesh 🇧🇩</option>
                    <option value="in">India 🇮🇳</option>
                    <option value="pk">Pakistan 🇵🇰</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-650 uppercase tracking-widest mb-1.5 font-mono">Travel Destination:</label>
                  <select
                    id="select-checker-dest"
                    value={testDest}
                    onChange={(e) => setTestDest(e.target.value as any)}
                    className="w-full bg-white border border-slate-350 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
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
      </div>
    </div>
  );
}
