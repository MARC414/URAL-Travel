import React from "react";
import { ExternalLink, Sparkles, Tag, Trophy, Calendar, Check } from "lucide-react";
import { AFFILIATE_LINKS, KKDAY_PROMO } from "./AffiliatePartners";
import { Language } from "../translations";

interface KKdayPromoBannerProps {
  lang?: Language;
  variant?: "full" | "compact";
  cityContext?: string;
}

export const KKdayPromoBanner: React.FC<KKdayPromoBannerProps> = ({
  lang = "en",
  variant = "full",
  cityContext,
}) => {
  const isBn = lang === "bn";

  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-[#0B192C] via-brand-navy to-[#173A5E] text-white rounded-2xl p-5 sm:p-6 border border-cyan-500/30 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="bg-cyan-400 text-[#0B192C] px-2.5 py-0.5 rounded-md font-bold">
                {isBn ? "KKday 9.9 সাউথইস্ট এশিয়া সেল" : "KKday 9.9 SEA Travel Sale"}
              </span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-md font-semibold">
                {isBn ? "৩০% ছাড় + Buy 1 Get 1" : "30% OFF + Buy 1 Get 1"}
              </span>
              <span className="text-slate-300">
                {isBn
                  ? "ভ্রমণের মেয়াদ: ৩১ ডিসেম্বর ২০২৬ পর্যন্ত"
                  : "Valid for travel through Dec 31, 2026"}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
              {isBn
                ? `${cityContext ? `${cityContext}-এ ` : "থাইল্যান্ড, মালয়েশিয়া ও সিঙ্গাপুরে "}ট্যুর, এয়ারপোর্ট ট্রান্সফার ও থিম পার্ক টিকিটে ৩০% ছাড় + US$100 গিভঅ্যাওয়ে`
                : `Save 30% + Buy 1 Get 1 on ${cityContext || "Southeast Asia"} Tours, Airport Transfers & Theme Parks`}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? "৩০ সেপ্টেম্বর ২০২৬-এর মধ্যে বুকিং করলে পাচ্ছেন ৩০% প্রোমো কোড (ভ্রমণ করা যাবে ৩১ ডিসেম্বর ২০২৬ পর্যন্ত) এবং সর্বোচ্চ ৫ জন বুকিংকারী পাবেন US$100 (~BDT ১২,২০০) KKday কুপন উপহার!"
                : "Book by Sept 30, 2026 for travel anytime through Dec 31, 2026 (covers the entire Bangladesh winter holiday season). Plus, the top 5 spenders win a US$100 (~BDT 12,200) KKday travel coupon."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href={AFFILIATE_LINKS.kkday}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>
                {isBn
                  ? "KKday ৩০% সেল ও B1G1 ডিল দেখুন"
                  : "Claim KKday 30% Sale & B1G1 Deals"}
              </span>
              <ExternalLink size={14} />
            </a>
            <div className="text-[10px] text-slate-400 font-mono text-center">
              {isBn ? "আগে আসলে আগে পাবেন ভিত্তিতে সীমিত কোটা" : "First-come, first-served · Ends Sept 30"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="kkday-sale-heading"
      className="bg-gradient-to-br from-[#0B192C] via-brand-navy to-[#0F2942] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-cyan-500/30 shadow-md relative overflow-hidden"
    >
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 8 Cols: Editorial Offer Breakdown */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-cyan-400 text-[#0B192C] px-3 py-1 rounded-md font-bold inline-flex items-center gap-1.5">
              <Sparkles size={13} />
              {isBn ? "KKday সাউথইস্ট এশিয়া ৯.৯ ট্রাভেল সেল" : KKDAY_PROMO.campaignName}
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-md font-semibold">
              {isBn ? "৩০% প্রোমো কোড + Buy 1 Get 1" : "30% Promo Codes + Buy 1 Get 1"}
            </span>
            <span className="text-slate-300">
              {isBn ? "বুকিং ডেডলাইন: ৩০ সেপ্টেম্বর ২০২৬" : "Book by Sept 30 · Travel until Dec 31, 2026"}
            </span>
          </div>

          <h3
            id="kkday-sale-heading"
            className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight"
          >
            {isBn
              ? "থাইল্যান্ড, মালয়েশিয়া ও সিঙ্গাপুর ভ্রমণে ৩০% ছাড়, Buy 1 Get 1 অফার এবং US$100 গিভঅ্যাওয়ে"
              : "Southeast Asia 9.9 Sale: 30% OFF Tours, Transfers & Attractions + US$100 Spender Giveaway"}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {isBn
              ? "আপনি কি অক্টোবর–ডিসেম্বর ২০২৬-এর শীতকালীন ছুটিতে ব্যাংকক, ফুকেট, কুয়ালালামপুর বা সিঙ্গাপুর যাওয়ার পরিকল্পনা করছেন? ৩০ সেপ্টেম্বরের মধ্যে KKday-র ৯.৯ ট্রাভেল সেল থেকে থিম পার্ক টিকিট, ডে-ট্যুর ও এয়ারপোর্ট ট্রান্সফার বুক করলে পাচ্ছেন ৩০% ইনস্ট্যান্ট প্রোমো ডিসকাউন্ট ও Buy 1 Get 1 ডিল—যা আপনার পাসপোর্টের USD কোটা সাশ্রয় করবে।"
              : "Planning a trip from Dhaka to Bangkok, Phuket, Kuala Lumpur, or Singapore between now and December 31, 2026? Lock in KKday's 9.9 Southeast Asia Travel Sale before September 30 to get 30% promo codes and Buy 1 Get 1 (B1G1) attraction tickets—stretching your passport's USD endorsement further."}
          </p>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
                <Tag size={14} />
                <span>{isBn ? "৩০% ছাড় + B1G1 ডিল" : "30% OFF + Buy 1 Get 1"}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isBn
                  ? "ট্যুর, এয়ারপোর্ট ট্রান্সফার ও অ্যাটাকশন টিকিটে প্রতি গ্রাহক ১ বার ৩০% কোড ব্যবহার করতে পারবেন।"
                  : "Applies to eligible SEA tours, airport rail/transfers & theme park tickets (1 use per customer)."}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#F6B73C] text-xs font-bold">
                <Trophy size={14} />
                <span>{isBn ? "US$100 কুপন গিভঅ্যাওয়ে" : "US$100 Coupon Giveaway"}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isBn
                  ? "১–৩০ সেপ্টেম্বরের মধ্যে সর্বোচ্চ বুকিংকারী শীর্ষ ৫ জন প্রত্যেকে পাবেন US$100 (~BDT ১২,২০০) KKday ভাউচার।"
                  : "The top 5 highest spenders between Sept 1–30 each win a US$100 (~BDT 12,200) KKday travel coupon."}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                <Calendar size={14} />
                <span>{isBn ? "ভ্রমণ: ৩১ ডিসেম্বর ২০২৬ পর্যন্ত" : "Travel Until Dec 31, 2026"}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isBn
                  ? "এখন ৩০% ছাড়ে বুক করে সেপ্টেম্বর থেকে ৩১ ডিসেম্বর ২০২৬-এর মধ্যে যেকোনো দিন ভ্রমণ করুন।"
                  : "Book by Sept 30 and travel anytime between Sept 9 and Dec 31, 2026 (ideal for winter holidays)."}
              </p>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Action & Terms Box */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="text-[11px] font-mono text-cyan-300 uppercase">
                {isBn ? "অফিশিয়াল ক্যাম্পেইন পার্টনার" : "Official Campaign Access"}
              </div>
              <div className="font-serif text-lg font-bold text-white">
                KKday Southeast Asia
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md">
              {isBn ? "সক্রিয় ডিল" : "LIVE SALE"}
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "ব্যাংকক, ফুকেট, কুয়ালালামপুর, সিঙ্গাপুর ও বালি কভার করে"
                  : "Covers Bangkok, Phuket, Kuala Lumpur, Singapore & Bali"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "বাংলাদেশি ডুয়াল-কারেন্সি Visa / Mastercard ও Amex সাপোর্টেড"
                  : "Accepts Bangladeshi Dual-Currency Visa, Mastercard & Amex"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "আগে আসলে আগে পাবেন ভিত্তিতে সীমিত প্রোমো কোড"
                  : "First-come, first-served limited promo code inventory"}
              </span>
            </li>
          </ul>

          <a
            href={AFFILIATE_LINKS.kkday}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>
              {isBn
                ? "KKday ৯.৯ সেল ও ৩০% কোড ক্লেইম করুন"
                : "Explore KKday 9.9 Sale & 30% Codes"}
            </span>
            <ExternalLink size={15} />
          </a>

          <div className="text-[11px] text-slate-300 text-center">
            {isBn
              ? "টিপস: বুকিংয়ের আগে Klook ও KKday দুই জায়গায় ভাড়া তুলনা করে নিন!"
              : "Pro Tip: Compare Klook vs. KKday 9.9 Sale to lock in the lowest BDT rate."}
          </div>
        </div>
      </div>
    </section>
  );
};
