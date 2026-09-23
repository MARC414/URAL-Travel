import React, { useState, useEffect } from "react";
import { Bell, X, CheckCircle, ExternalLink, ShieldCheck, Plane, ArrowRight, MessageCircle } from "lucide-react";
import { Language } from "../translations";

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  defaultDestination?: string;
}

export function PriceAlertModal({ isOpen, onClose, lang, defaultDestination = "Bangkok (BKK)" }: PriceAlertModalProps) {
  const [destination, setDestination] = useState(defaultDestination);
  const [isCustomDest, setIsCustomDest] = useState(false);
  const [customDestText, setCustomDestText] = useState("");
  const [travelWindow, setTravelWindow] = useState("Next 1-2 Months");
  const [budgetTarget, setBudgetTarget] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
      setIsCustomDest(false);
    }
  }, [defaultDestination]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularRoutes = [
    { label: "Bangkok (BKK)", code: "BKK" },
    { label: "Kathmandu (KTM)", code: "KTM" },
    { label: "Kuala Lumpur (KUL)", code: "KUL" },
    { label: "Dubai (DXB)", code: "DXB" },
    { label: "Singapore (SIN)", code: "SIN" },
    { label: "Cox's Bazar (CXB)", code: "CXB" },
  ];

  const travelWindows = lang === "bn" ? [
    "পরবর্তী ৩০ দিনের মধ্যে",
    "পরবর্তী ১-২ মাস",
    "পরবর্তী ৩-৬ মাস",
    "আসন্ন ঈদ / ছুটির মৌসুম"
  ] : [
    "Next 30 Days",
    "Next 1-2 Months",
    "Next 3-6 Months",
    "Upcoming Eid / Holiday Season"
  ];

  const targetDest = isCustomDest ? (customDestText.trim() || "International Route") : destination;

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct high-converting WhatsApp message
    const waText = lang === "bn"
      ? `আসসালামু আলাইকুম Ural Travel! আমি ঢাকা থেকে একটি ফ্লাইট ফেয়ার ড্রপ অ্যালার্ট চালু করতে চাই:\n\n✈️ রুট: ঢাকা (DAC) ➔ ${targetDest}\n🗓️ ভ্রমণের সম্ভাব্য সময়: ${travelWindow}\n💰 বাজেট লক্ষ্য: ${budgetTarget.trim() ? budgetTarget + " BDT" : "যেকোনো সাশ্রয়ী অফার"}\n📱 যোগাযোগ: ${userPhone.trim() || "এই হোয়াটসঅ্যাপ নম্বরে"}\n\nদয়া করে এয়ারলাইন্স ডিসকাউন্ট বা প্রোমো টিকিট ছাড়লে আমাকে জানাবেন!`
      : `Hello Ural Travel! I would like to activate a Flight Price Drop Alert from Dhaka:\n\n✈️ Route: Dhaka (DAC) ➔ ${targetDest}\n🗓️ Travel Window: ${travelWindow}\n💰 Budget Target: ${budgetTarget.trim() ? budgetTarget + " BDT" : "Best Available Promo Fare"}\n📱 Contact: ${userPhone.trim() || "Via this WhatsApp"}\n\nPlease notify me as soon as airlines drop fares or release promotional seats on this route!`;

    const waUrl = `https://wa.me/8801784385335?text=${encodeURIComponent(waText)}`;

    // Save to local storage for persistent badge
    try {
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem("ural_active_alerts") || "[]");
        const newAlert = {
          route: `DAC ➔ ${targetDest}`,
          date: new Date().toLocaleDateString(),
          window: travelWindow
        };
        localStorage.setItem("ural_active_alerts", JSON.stringify([newAlert, ...existing.slice(0, 4)]));
      }
    } catch {
      // Graceful fallback
    }

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-850 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-[#0B1628] text-white p-5 flex items-start justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F6B73C] text-[#0F172A] flex items-center justify-center font-bold shadow-md shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F6B73C] font-bold">
                  {lang === "bn" ? "ফ্লাইট ফেয়ার ট্র্যাকার" : "Flight Fare Tracker"}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  WhatsApp Alert
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                {lang === "bn" ? "ভাড়া কমলে সরাসরি মেসেজ পান" : "Track Price Drops on Your Route"}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {isSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-xl font-black text-slate-900">
                {lang === "bn" ? "অ্যালার্ট সফলভাবে তৈরি হয়েছে!" : "Price Alert Registered!"}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {lang === "bn"
                  ? `ঢাকা ➔ ${targetDest} রুটের জন্য আপনার তথ্য Ural Travel ঢাকা ডেস্কে পাঠানো হয়েছে। এয়ারলাইন্স রেট কমালে আপনাকে হোয়াটসঅ্যাপে জানানো হবে।`
                  : `Your request for Dhaka ➔ ${targetDest} has been received by our Ural Travel flight desk. We will message you on WhatsApp the moment promo fares drop.`}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#D4941A]" />
                <span className="font-bold">DAC ➔ {targetDest}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Active
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                {lang === "bn" ? "আরেকটি রুট সেট করুন" : "Set Another Route"}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors"
              >
                {lang === "bn" ? "ঠিক আছে, সম্পন্ন" : "Done"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="p-5 sm:p-6 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === "bn"
                ? "বিমান বাংলাদেশ, ইউএস-বাংলা বা আন্তর্জাতিক এয়ারলাইন্স যখন ঢাকা থেকে প্রমোশনাল ভাড়া ছাড়ে, তখন সরাসরি আপনার হোয়াটসঅ্যাপে অ্যালার্ট পাঠিয়ে দেওয়া হবে।"
                : "Airfares fluctuate constantly. When airlines release low-cost promotional seats from Dhaka, get an instant WhatsApp ping with booking assistance."}
            </p>

            {/* Departure & Destination */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-750 block">
                {lang === "bn" ? "১. আপনার গন্তব্য নির্বাচন করুন:" : "1. Select Destination from Dhaka (DAC):"}
              </label>

              {/* Quick Route Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {popularRoutes.map((r) => {
                  const isSelected = !isCustomDest && destination === r.label;
                  return (
                    <button
                      key={r.code}
                      type="button"
                      onClick={() => {
                        setDestination(r.label);
                        setIsCustomDest(false);
                      }}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-50 border-[#F6B73C] text-slate-900 font-bold shadow-xs ring-1 ring-[#F6B73C]"
                          : "bg-white border-slate-250 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      <div className="truncate">{r.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Destination Option */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsCustomDest(!isCustomDest)}
                  className="text-xs text-[#0B1628] hover:text-[#D4941A] font-semibold underline underline-offset-2 cursor-pointer inline-flex items-center gap-1"
                >
                  {isCustomDest 
                    ? (lang === "bn" ? "← জনপ্রিয় তালিকা থেকে বেছে নিন" : "← Pick from popular list") 
                    : (lang === "bn" ? "+ অন্য যেকোনো দেশের শহর লিখতে চান?" : "+ Specify a different city / country")}
                </button>
                {isCustomDest && (
                  <input
                    type="text"
                    required
                    placeholder={lang === "bn" ? "যেমন: London (LHR), Sydney, Toronto" : "e.g. London (LHR), Sydney, Toronto"}
                    value={customDestText}
                    onChange={(e) => setCustomDestText(e.target.value)}
                    className="mt-2 w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#F6B73C] focus:border-[#F6B73C]"
                  />
                )}
              </div>
            </div>

            {/* Travel Timing Window */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-750 block">
                {lang === "bn" ? "২. আনুমানিক কবে ভ্রমণ করবেন?" : "2. Approximate Travel Window:"}
              </label>
              <select
                value={travelWindow}
                onChange={(e) => setTravelWindow(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#F6B73C]"
              >
                {travelWindows.map((tw, idx) => (
                  <option key={idx} value={tw}>{tw}</option>
                ))}
              </select>
            </div>

            {/* Target Budget (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-750 flex items-center justify-between">
                <span>{lang === "bn" ? "৩. লক্ষ্যমাত্রা বাজেট (ঐচ্ছিক):" : "3. Target Budget in BDT (Optional):"}</span>
                <span className="text-[10px] text-slate-400 font-normal">{lang === "bn" ? "খালি রাখলে যেকোনো অফার" : "Optional"}</span>
              </label>
              <input
                type="text"
                placeholder={lang === "bn" ? "যেমন: ৩৫,০০০ টাকার মধ্যে" : "e.g. Under 35,000 BDT"}
                value={budgetTarget}
                onChange={(e) => setBudgetTarget(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#F6B73C]"
              />
            </div>

            {/* WhatsApp / Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-750 flex items-center justify-between">
                <span>{lang === "bn" ? "৪. আপনার মোবাইল / হোয়াটসঅ্যাপ নম্বর:" : "4. Your WhatsApp / Mobile Number:"}</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Support
                </span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 01784385335"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#F6B73C]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>
                  {lang === "bn" ? "হোয়াটসঅ্যাপে ফেয়ার অ্যালার্ট চালু করুন" : "Activate WhatsApp Price Alert"}
                </span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                <span>🔒 No spam • Agency verified</span>
                <span>DAC Desk: 01784385335</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
