import React, { useState } from "react";
import { MessageCircle, X, ExternalLink, ShieldCheck, Clock } from "lucide-react";
import { Language } from "../translations";

interface WhatsAppSupportProps {
  lang: Language;
}

export function WhatsAppSupport({ lang }: WhatsAppSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "8801784385336";
  const displayPhone = "01784385336";

  const quickMessages = lang === "bn" ? [
    { label: "✈️ ঢাকা থেকে কম ভাড়ার টিকিট জানতে চাই", text: "হ্যালো Ural Travel! ঢাকা থেকে সাশ্রয়ী ফ্লাইটের দাম ও তারিখ জানতে চাই।" },
    { label: "🛂 নেপাল/থাইল্যান্ড/দুবাই ভিসা সহায়তা", text: "হ্যালো Ural Travel! বাংলাদেশি পাসপোর্টে ভিসা নিয়ম ও প্রয়োজনীয় কাগজপত্রের তথ্য জানতে চাই।" },
    { label: "🏨 হোটেল বুকিং ও পেমেন্ট পরামর্শ", text: "হ্যালো Ural Travel! ব্যাংকক/কাঠমান্ডুর ভালো হোটেলের তথ্য ও পেমেন্ট নিয়ম জানতে চাই।" }
  ] : [
    { label: "✈️ Inquire about lowest flight fares from Dhaka", text: "Hello Ural Travel! I'd like to check low-cost flight fares and dates departing Dhaka." },
    { label: "🛂 Visa rules assistance (Nepal, Thailand, Dubai)", text: "Hello Ural Travel! I need advice regarding visa requirements for Bangladeshi passport holders." },
    { label: "🏨 Hotel booking & BDT payment guidance", text: "Hello Ural Travel! Can you guide me on hotel recommendations and booking options?" }
  ];

  const getWaLink = (customText?: string) => {
    const text = customText || (lang === "bn" 
      ? "হ্যালো Ural Travel! আমি ফ্লাইট, হোটেল ও ভিসা সম্পর্কে তথ্য জানতে চাই।" 
      : "Hello Ural Travel! I would like assistance with flight search and visa guidance from Dhaka.");
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* Floating Action Button Bottom Right */}
      <aside aria-label="Customer Support" className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {/* Expandable Support Popup */}
        {isOpen && (
          <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6 fill-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#128C7E] rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Ural Travel Support</h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                    <span>{lang === "bn" ? "অনলাইন • দ্রুত রিপ্লাই" : "Online • Fast Response"}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Close support card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-slate-50 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-650 leading-relaxed shadow-xs">
                <p className="font-medium text-slate-850 mb-1">
                  {lang === "bn" ? "আসসালামু আলাইকুম! 👋" : "Hello traveler! 👋"}
                </p>
                <p>
                  {lang === "bn" 
                    ? "ঢাকা থেকে যেকোনো আন্তর্জাতিক ফ্লাইটের টিকিট, ভিসা ডকুমেন্টস বা হোটেল নিয়ে কোনো প্রশ্ন থাকলে সরাসরি মেসেজ দিন।"
                    : "Have questions about flights departing Dhaka, visa eligibility, or hotel bookings? Chat directly with our travel desk."}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Direct: {displayPhone}</span>
                  <span className="text-[#128C7E] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>

              {/* Quick Prompt Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1 block">
                  {lang === "bn" ? "দ্রুত প্রশ্ন বাছাই করুন:" : "Quick questions:"}
                </span>
                {quickMessages.map((item, idx) => (
                  <a
                    key={idx}
                    href={getWaLink(item.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs bg-white hover:bg-emerald-50 text-slate-750 hover:text-emerald-850 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all font-medium text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 ml-2" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Main Green Action Button */}
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{lang === "bn" ? "হোয়াটসঅ্যাপে চ্যাট শুরু করুন" : "Open WhatsApp Chat"}</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-white/20"
          aria-label="Open WhatsApp Chat Support"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
              <span>{lang === "bn" ? "হোয়াটসঅ্যাপ সাপোর্ট" : "WhatsApp Support"}</span>
            </div>
            <div className="text-[10px] text-emerald-100 font-mono leading-none">
              {displayPhone}
            </div>
          </div>
        </button>
      </aside>
    </>
  );
}

export function TopBarWhatsApp({ lang }: WhatsAppSupportProps) {
  const phoneNumber = "8801784385336";
  const displayPhone = "01784385336";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    lang === "bn"
      ? "হ্যালো Ural Travel! ঢাকা থেকে ফ্লাইট ও ভিসা সংক্রান্ত তথ্য জানতে চাচ্ছি।"
      : "Hello Ural Travel! I need information regarding flight tickets and visa rules from Dhaka."
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-300 hover:text-emerald-200 transition-colors font-medium text-[11px] group cursor-pointer"
      title={lang === "bn" ? "সরাসরি হোয়াটসঅ্যাপে মেসেজ পাঠান" : "Direct WhatsApp Support"}
    >
      <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
      <span className="font-bold text-[#25D366] group-hover:text-emerald-200">
        WhatsApp:
      </span>
      <span className="font-mono text-white/90 group-hover:text-white">
        {displayPhone}
      </span>
    </a>
  );
}
