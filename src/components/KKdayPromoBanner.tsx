import React, { useState } from "react";
import { ExternalLink, Sparkles, Tag, Check, Copy, ArrowRight, ShieldCheck, Clock, Compass, Train, Ticket } from "lucide-react";
import {
  AFFILIATE_LINKS,
  KKDAY_PROMO,
  isPromoActive,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import { Language } from "../translations";

interface KKdayPromoBannerProps {
  lang?: Language;
  variant?: "full" | "compact";
  cityContext?: string;
  onNavigate?: (path: string) => void;
}

export const KKdayPromoBanner: React.FC<KKdayPromoBannerProps> = ({
  lang = "en",
  variant = "full",
  cityContext,
  onNavigate,
}) => {
  const isBn = lang === "bn";
  const saleActive = isPromoActive(KKDAY_PROMO.expiresAt);
  const partnerHref = resolvePartnerUrl(AFFILIATE_LINKS.kkday);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode((current) => (current === code ? null : current));
    }, 2500);
  };

  const vouchers = [
    {
      code: KKDAY_PROMO.codes.tours,
      titleEn: "Tours & Experiences",
      titleBn: "ট্যুর ও অভিজ্ঞতা",
      descEn: "Hokkaido ski tours, Mt. Fuji, Shirakawa-go & day trips",
      descBn: "হোক্কাইডো স্কি, মাউন্ট ফুজি ও ডে-ট্যুর",
      discount: "30% OFF",
      icon: Compass,
      tagColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    },
    {
      code: KKDAY_PROMO.codes.transportation,
      titleEn: "Transportation & Rail",
      titleBn: "ট্রান্সপোর্ট ও রেল পাস",
      descEn: "Keisei Skyliner, Nankai Rapi:t, Tokyo Metro & private cars",
      descBn: "স্কাইলাইনার, নানকাই রাপিড, মেট্রো ও প্রাইভেট কার",
      discount: "30% OFF",
      icon: Train,
      tagColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    },
    {
      code: KKDAY_PROMO.codes.attractions,
      titleEn: "Attraction Tickets",
      titleBn: "অ্যাটাকশন ও থিম পার্ক",
      descEn: "Universal Studios Japan (USJ), Tokyo Disney & SHIBUYA SKY",
      descBn: "ইউএসজে (USJ), টোকিও ডিজনি ও শিবুয়া স্কাই",
      discount: "30% OFF",
      icon: Ticket,
      tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    },
  ];

  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-[#0B192C] via-brand-navy to-[#133352] text-white rounded-2xl p-5 sm:p-6 border border-cyan-500/30 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="bg-cyan-400 text-[#0B192C] px-2.5 py-0.5 rounded-md font-bold">
                {saleActive
                  ? isBn
                    ? "KKday ১০.১০ উইন্টার সেল (লাইভ)"
                    : "KKday 10.10 Winter Travel Sale"
                  : isBn
                  ? "KKday অফিশিয়াল ট্রাভেল পার্টনার"
                  : "KKday Official Travel Partner"}
              </span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-md font-semibold">
                {saleActive
                  ? isBn
                    ? "৩০% ফ্ল্যাশ ভাউচার (1010TOURS, 1010MOVE, 1010TIX)"
                    : "30% OFF (1010TOURS · 1010MOVE · 1010TIX)"
                  : isBn
                  ? "ইনস্ট্যান্ট মোবাইল QR টিকিট"
                  : "Instant Mobile QR E-Tickets"}
              </span>
              <span className="text-slate-300">
                {saleActive
                  ? isBn
                    ? "মেয়াদ: ৩১ অক্টোবর ২০২৬ পর্যন্ত"
                    : "Valid for bookings through Oct 31, 2026"
                  : isBn
                  ? "জাপান, এশিয়া ও বিশ্বব্যাপী ট্যুর"
                  : "Japan, Asia & Worldwide Tours"}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
              {saleActive
                ? isBn
                  ? `${cityContext ? `${cityContext}-এ ` : "জাপান ও এশিয়ায় "}স্কি ট্যুর, এয়ারপোর্ট ট্রেন ও থিম পার্ক টিকিটে ৩০% ফ্ল্যাশ ছাড়`
                  : `Save 30% on ${cityContext || "Japan & Asia"} Ski Tours, Airport Rail & Theme Park Tickets`
                : isBn
                ? `${cityContext ? `${cityContext}-এ ` : "জাপান, থাইল্যান্ড ও সিঙ্গাপুরে "}ট্যুর, এয়ারপোর্ট ট্রেন ও থিম পার্কের মোবাইল পাস`
                : `Pre-Book Discounted ${cityContext || "Asia & Global"} Tours, Rail & Attraction Passes`}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {saleActive
                ? isBn
                  ? "১০ অক্টোবর সকাল ৮:০০ (UTC+8 / বাংলাদেশ সময় সকাল ৬:০০) থেকে সীমিত কোটায় শুরু হচ্ছে কেকেডে ১০.১০ সেল। ট্যুর (1010TOURS), ট্রান্সপোর্ট (1010MOVE) ও টিকিটে (1010TIX) ৩০% সাশ্রয় করুন।"
                  : "Launching October 10 at 08:00 AM UTC+8 (06:00 AM BST). First-come, first-served 30% discount codes for tours, airport rail (Skyliner, Rapi:t) and attraction passes."
                : isBn
                ? "আপনার এনডোর্স করা বাংলাদেশি ডুয়াল-কারেন্সি কার্ড ব্যবহার করে প্রি-বুক করুন এবং টিকিট কাউন্টারের দীর্ঘ লাইন এড়িয়ে সরাসরি প্রবেশ করুন।"
                : "Use your endorsed Bangladeshi dual-currency card to secure instant mobile vouchers while saving 15–30% over walk-up ticket counters."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href={partnerHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>
                {saleActive
                  ? isBn
                    ? "KKday ১০.১০ সেল পেজ খুলুন"
                    : "Open KKday 10.10 Sale Page"
                  : isBn
                  ? "KKday অ্যাটাকশন ও ট্রেন পাস দেখুন"
                  : "Compare KKday Passes & Deals"}
              </span>
              <ExternalLink size={14} />
            </a>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("/blog/kkday-10-10-winter-sale-japan-tours-passes-guide")}
                className="text-[11px] text-cyan-300 hover:text-white underline underline-offset-2 font-mono text-center cursor-pointer"
              >
                {isBn ? "১০.১০ সেল গাইড ও প্রডাক্ট লিস্ট পড়ুন →" : "Read Full 10.10 Sale Guide & Products →"}
              </button>
            )}
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
              {saleActive
                ? isBn
                  ? "KKday ১০.১০ উইন্টার ট্রাভেল সেল"
                  : KKDAY_PROMO.campaignName
                : isBn
                ? "KKday এশিয়া ট্রাভেল হাব"
                : "KKday Asia Official Passes"}
            </span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-md font-semibold inline-flex items-center gap-1">
              <Tag size={12} />
              {saleActive
                ? isBn
                  ? "৩০% ফ্ল্যাশ ভাউচার কোড"
                  : "30% OFF Flash Codes"
                : isBn
                ? "অনলাইন ডিসকাউন্ট ও ইনস্ট্যান্ট QR"
                : "Online Discounts + Instant QR"}
            </span>
            <span className="text-slate-300 flex items-center gap-1">
              <Clock size={12} className="text-cyan-400" />
              {saleActive
                ? isBn
                  ? "লঞ্চ: ১০ অক্টোবর সকাল ৮:০০ (UTC+8) · FCFS কোটা"
                  : "Launches Oct 10, 08:00 UTC+8 · First-Come FCFS"
                : isBn
                ? "সারা বছর ইনস্ট্যান্ট মোবাইল QR টিকিট"
                : "Year-round instant e-tickets for travelers"}
            </span>
          </div>

          <h3
            id="kkday-sale-heading"
            className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight"
          >
            {saleActive
              ? isBn
                ? "KKday ১০.১০ উইন্টার সেল: জাপান স্কি ট্যুর, এয়ারপোর্ট ট্রেন ও থিম পার্কের টিকিটে ৩০% ফ্ল্যাশ ছাড়"
                : "KKday 10.10 Winter Sale: 30% OFF Japan Ski Tours, Airport Rail & Theme Park Tickets"
              : isBn
              ? "জাপান, থাইল্যান্ড ও সিঙ্গাপুর ভ্রমণে ডিসকাউন্টেড থিম পার্ক, ডে-ট্যুর ও এয়ারপোর্ট ট্রেন পাস"
              : "Asia Attraction Passes, Airport Rail & Ski Tours for International Travelers"}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {saleActive
              ? isBn
                ? "আপনি কি ২০২৬-২০২৭ শীতকালীন ছুটিতে জাপান (টোকিও, ওসাকা, হোক্কাইডো) কিংবা সাউথইস্ট এশিয়া যাওয়ার পরিকল্পনা করছেন? KKday-র ১০.১০ উইন্টার সেল থেকে ট্যুর, এয়ারপোর্ট এক্সপ্রেস (Keisei Skyliner, Nankai Rapi:t) ও থিম পার্ক (USJ, Tokyo Disney) বুক করে ৩০% পর্যন্ত সাশ্রয় করুন।"
                : "Planning a winter getaway to Japan (Tokyo, Osaka, Hokkaido ski resorts) or Southeast Asia? Lock in KKday's 10.10 Winter Travel Sale launching October 10 at 08:00 AM UTC+8. Grab 30% off tours, transportation passes, and attraction tickets before codes run out."
              : isBn
              ? "টোকিও, ওসাকা, হোক্কাইডো বা ব্যাংকক ভ্রমণের আগে KKday থেকে থিম পার্ক টিকিট, ডে-ট্যুর ও এয়ারপোর্ট এক্সপ্রেস অনলাইনে প্রি-বুক করলে কাউন্টারের তুলনায় ১৫–২৫% পর্যন্ত সাশ্রয় হয়।"
              : "Pre-booking your theme park passes, airport rail tickets, and winter ski tours on KKday saves 15–25% compared to walk-up ticket counters while eliminating airport lines."}
          </p>

          {/* Interactive 3-Voucher Code Stack */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>{isBn ? "ক্লিক করে প্রোমো কোড কপি করুন:" : "Click to Copy 30% Promo Vouchers (1 Use Per Customer):"}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {vouchers.map((v) => {
                const IconComponent = v.icon;
                const isCopied = copiedCode === v.code;
                return (
                  <button
                    key={v.code}
                    type="button"
                    onClick={() => copyCode(v.code)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-xl p-3 text-left transition-all cursor-pointer relative group"
                    title={`Click to copy ${v.code}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${v.tagColor}`}>
                        {v.discount}
                      </span>
                      <span className="text-[11px] text-cyan-300 font-mono font-bold flex items-center gap-1 group-hover:text-white">
                        {isCopied ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Check size={12} /> Copied!
                          </span>
                        ) : (
                          <span className="flex items-center gap-0.5">
                            <Copy size={11} /> Copy
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-1.5">
                      <IconComponent size={14} className="text-cyan-400" />
                      <span>{v.code}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 mt-1">
                      {isBn ? v.titleBn : v.titleEn}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                      {isBn ? v.descBn : v.descEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Action & Terms Box */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="text-[11px] font-mono text-cyan-300 uppercase">
                {isBn ? "অফিশিয়াল ক্যাম্পেইন নেটওয়ার্ক" : "Official Travel Network"}
              </div>
              <div className="font-serif text-lg font-bold text-white">
                KKday Global Winter Sale
              </div>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md animate-pulse">
              {saleActive ? (isBn ? "১০.১০ লাইভ" : "10.10 FLASH") : isBn ? "ভেরিফায়েড পার্টনার" : "OFFICIAL PARTNER"}
            </span>
          </div>

          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "হোক্কাইডো স্কি, মাউন্ট ফুজি, ইউএসজে (USJ) ও শিবুয়া স্কাই কভার করে"
                  : "Covers Hokkaido ski, Mt Fuji, USJ, Shibuya Sky & Keisei Skyliner"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "বাংলাদেশি ও আন্তর্জাতিক ডুয়াল-কারেন্সি Visa/Mastercard সাপোর্টেড"
                  : "Accepts Bangladeshi & international Dual-Currency cards"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "আগে আসলে আগে পাবেন ভিত্তিতে সীমিত কোটা (১ বার ব্যবহার্য)"
                  : "First-come, first-served quota · 1 redemption per account"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? "ভ্রমণের মেয়াদ: ৩১ মার্চ ২০২৭ পর্যন্ত সচল"
                  : "Valid for winter travel through March 31, 2027"}
              </span>
            </li>
          </ul>

          <div className="space-y-2">
            <a
              href={partnerHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <span>
                {saleActive
                  ? isBn
                    ? "KKday ১০.১০ সেল পেজে যান"
                    : "Go to KKday 10.10 Sale Page"
                  : isBn
                  ? "KKday এশিয়া ডিলগুলো দেখুন"
                  : "Browse KKday Travel Passes"}
              </span>
              <ExternalLink size={15} />
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("/blog/kkday-10-10-winter-sale-japan-tours-passes-guide")}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors border border-white/15 cursor-pointer"
              >
                <span>{isBn ? "১০.১০ প্রডাক্ট গাইড ও টিপস পড়ুন" : "Read 10.10 Curated Products Guide"}</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-300 text-center">
            {isBn
              ? "টিপস: কোড সক্রিয় হওয়ার সাথে সাথে দ্রুত রিডিম করতে আপনার কার্ড এনডোর্স রাখুন!"
              : "Tip: Codes apply at checkout on eligible items. Ensure card endorsement is active."}
          </div>
        </div>
      </div>
    </section>
  );
};
