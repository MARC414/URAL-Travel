import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, ShieldCheck, RefreshCw, Ticket, CheckCircle2, AlertCircle } from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";
import { Language } from "../translations";
import { openConsentPreferences, useConsent } from "../utils/consent";

export interface TiqetsEmbedWidgetProps {
  lang?: Language;
  currency?: "USD" | "EUR" | "GBP" | "BDT" | "SAR" | "AED";
  layout?: "horizontal" | "vertical";
  product?: string;
  cityName?: string;
  headline?: string;
  headlineBn?: string;
  subheadline?: string;
  subheadlineBn?: string;
  showFallbackBadge?: boolean;
}

/**
 * TiqetsEmbedWidget
 *
 * User-focused, resilient loader for Travelpayouts Tiqets Campaign 89 (Promo 3948).
 * Parameters:
 * - promo_id=3948
 * - campaign_id=89
 * - marker=675992 / trs=589561
 *
 * Features:
 * 1. Safe lifecycle script injection with isolated mount container.
 * 2. Timeout and ad-blocker protection with seamless instant-booking fallback card.
 * 3. Dynamic currency & language synchronization.
 * 4. 100% compliant with URAL affiliate rules (target="_blank" rel="noopener noreferrer sponsored").
 */
export const TiqetsEmbedWidget: React.FC<TiqetsEmbedWidgetProps> = ({
  lang = "en",
  currency = "USD",
  layout = "horizontal",
  product = "",
  cityName = "London, Paris, Rome & New York",
  headline,
  headlineBn,
  subheadline,
  subheadlineBn,
  showFallbackBadge = true,
}) => {
  const isBn = lang === "bn";
  const marketingAllowed = useConsent("marketing");
  const partnerUrl = resolvePartnerUrl(AFFILIATE_LINKS.tiqets);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "fallback">("loading");
  const [reloadCounter, setReloadCounter] = useState(0);

  // Fallback to USD if BDT/SAR/AED aren't native in Tiqets widget feed
  const widgetCurrency = ["USD", "EUR", "GBP"].includes(currency) ? currency : "USD";

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    if (!marketingAllowed) {
      setLoadState("loading");
      return;
    }

    setLoadState("loading");

    // Build the canonical script with user's settings and affiliate tracking (runs only after marketing consent)
    const script = document.createElement("script");
    const scriptUrl = new URL("https://tpemd.com/content");
    scriptUrl.searchParams.set("currency", widgetCurrency);
    scriptUrl.searchParams.set("promo_id", "3948");
    scriptUrl.searchParams.set("campaign_id", "89");
    scriptUrl.searchParams.set("powered_by", "true");
    scriptUrl.searchParams.set("layout", layout);
    scriptUrl.searchParams.set("language", isBn ? "en" : "en"); // Tiqets widget engine supports en/fr/es/it/de
    scriptUrl.searchParams.set("product", product);
    scriptUrl.searchParams.set("shmarker", "675992");
    scriptUrl.searchParams.set("trs", "589561");

    script.src = scriptUrl.toString();
    script.async = true;
    script.charset = "utf-8";
    script.setAttribute("data-ural-consent", "marketing");

    // Detect successful widget insertion
    const observer = new MutationObserver(() => {
      if (container.children.length > 1 || container.querySelector("iframe") || container.querySelector(".tp-widget")) {
        if (isMounted) setLoadState("loaded");
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    let onloadTimer: ReturnType<typeof setTimeout> | undefined;
    script.onload = () => {
      // Check if widget rendered within 1.2s, else keep loaded or transition
      onloadTimer = setTimeout(() => {
        if (isMounted && container.children.length > 1) {
          setLoadState("loaded");
        }
      }, 1200);
    };

    script.onerror = () => {
      if (isMounted) setLoadState("fallback");
    };

    // If script gets blocked by uBlock/ad-blocker or hangs past 3.5s, gracefully show high-converting fallback
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        setLoadState((prev) => (prev === "loading" ? "fallback" : prev));
      }
    }, 3500);

    container.appendChild(script);

    return () => {
      isMounted = false;
      observer.disconnect();
      if (onloadTimer !== undefined) clearTimeout(onloadTimer);
      clearTimeout(fallbackTimer);
      container.innerHTML = "";
    };
  }, [marketingAllowed, widgetCurrency, layout, product, isBn, reloadCounter]);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden my-6 transition-all">
      {/* User-focused Header Bar */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#10243E] to-[#0B192C] p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#F6B73C] text-brand-navy">
              <Ticket size={12} />
              {isBn ? "অফিসিয়াল ফাস্ট-ট্র্যাক পার্টনার" : "Official Fast-Track Partner"}
            </span>
            <span className="text-[11px] font-mono font-semibold text-slate-300">
              Tiqets • Marker 675992
            </span>
          </div>
          <h4 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
            {headline ||
              (isBn
                ? `লাইভ টিকেট ফাইন্ডার: ${cityName}`
                : `Live Fast-Track & Skip-The-Line Finder: ${cityName}`)}
          </h4>
          <p className="text-xs text-slate-300">
            {subheadline ||
              (isBn
                ? "মিউজিয়াম, টাওয়ার ও সাইটসিয়িং ক্রুজের তাৎক্ষণিক মোবাইল ভাউচার ও সরাসরি কিউআর প্রবেশাধিকার।"
                : "Real-time timed entry slots, official mobile barcode passes & verified availability.")}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {marketingAllowed && (
            <button
              type="button"
              onClick={() => setReloadCounter((prev) => prev + 1)}
              aria-label={isBn ? "উইজেট রিফ্রেশ করুন" : "Refresh widget"}
              title={isBn ? "উইজেট রিফ্রেশ করুন" : "Refresh widget"}
              className="min-h-11 min-w-11 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors text-xs font-mono inline-flex items-center justify-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
            >
              <RefreshCw size={13} aria-hidden="true" className={loadState === "loading" ? "animate-spin text-[#F6B73C]" : ""} />
              <span className="hidden sm:inline">{isBn ? "রিফ্রেশ" : "Sync"}</span>
            </button>
          )}

          <a
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F6B73C] hover:bg-[#e0a430] text-brand-navy text-xs font-bold transition-all shadow hover:shadow-md cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>{isBn ? "Tiqets এ দেখুন" : "Open in Tiqets"}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Widget Mount & Live Container */}
      <div className="p-4 sm:p-5 relative min-h-[160px] bg-slate-50/50">
        {!marketingAllowed && (
          <div
            data-consent-gate="marketing"
            className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-brand-navy shrink-0">
                <ShieldCheck size={18} aria-hidden="true" />
              </div>
              <div className="space-y-1 text-xs leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-900 text-sm">
                  {isBn
                    ? "Tiqets লাইভ উইজেট সম্মতির অপেক্ষায়"
                    : "Tiqets live widget requires consent"}
                </p>
                <p>
                  {isBn
                    ? "এই এম্বেডটি Travelpayouts ও Tiqets-এর। এখানে লোড করতে কুকি পছন্দে “মার্কেটিং ও পার্টনার টুলস” চালু করুন (চালু করলে আপনার IP address ও ব্রাউজারের তথ্য পার্টনারের কাছে যাবে), অথবা সরাসরি Tiqets খুলুন।"
                    : "This embed is delivered by Travelpayouts and Tiqets. Turn on “Marketing & Partner Tools” in Cookie preferences to load it here (which shares your IP address and browser details with those providers), or open Tiqets directly."}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={openConsentPreferences}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-navy hover:bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
              >
                {isBn ? "কুকি পছন্দ বদলান" : "Cookie preferences"}
              </button>
              <a
                href={partnerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#F6B73C] hover:bg-[#e0a430] px-4 py-2.5 text-xs font-bold text-brand-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
              >
                <span>{isBn ? "সরাসরি Tiqets খুলুন" : "Open Tiqets directly"}</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Loading state indicator */}
        {marketingAllowed && loadState === "loading" && (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-slate-500">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-[#0B192C] animate-spin" />
            <div className="text-xs font-mono font-medium">
              {isBn
                ? "Tiqets লাইভ ইনভেন্টরি ও ভাউচার লোড হচ্ছে..."
                : "Loading live Tiqets museum & attraction availability..."}
            </div>
          </div>
        )}

        {/* The DOM target container where Travelpayouts script injects its widget */}
        <div
          ref={containerRef}
          className={`tiqets-embed-mount w-full overflow-x-auto ${
            !marketingAllowed || loadState === "fallback" ? "hidden" : "block"
          }`}
        />

        {/* Resilient fallback card if script is blocked or network delayed */}
        {marketingAllowed && loadState === "fallback" && (
          <div className="bg-white border border-amber-200 rounded-xl p-5 space-y-4 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                  {isBn ? "সরাসরি বুকিং নিশ্চয়তা" : "Direct Fast-Track Reservation Active"}
                </div>
                <h5 className="font-serif text-sm sm:text-base font-bold text-slate-900">
                  {isBn
                    ? "অফিসিয়াল Tiqets মোবাইল ভাউচার সরাসরি সংগ্রহ করুন"
                    : "Access Official Tiqets Instant Mobile Tickets Directly"}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn
                    ? "আপনার ব্রাউজারের কোনো অ্যাড-ব্লকার স্ক্রিপ্ট আটকে দিলেও কোনো সমস্যা নেই। নিচের বোতামে ক্লিক করে Tiqets এর ভেরিফাইড পার্টনার পোর্টালে সরাসরি প্রবেশ করে তাৎক্ষণিক কনফার্মেশন ও ফ্রি ক্যান্সেলেশন সুবিধা উপভোগ করুন।"
                    : "Interactive widget script was protected or network-delayed. You can reserve directly on Tiqets with verified instant smartphone vouchers, QR entry, and flexible cancellation."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>{isBn ? "স্মার্টফোন কিউআর প্রবেশ" : "Instant Mobile Barcode Entry"}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>{isBn ? "২৪/৭ কাস্টমার সাপোর্ট" : "24/7 Global Support in 11 Languages"}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>{isBn ? "সহজ ও নিরাপদ পেমেন্ট" : "Zero Booking Fees & Free Cancellation"}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-mono text-slate-500">
                {isBn ? "সার্টিফাইড পার্টনার আইডি: marker=675992" : "Certified Affiliate Link: marker=675992 • trs=589561"}
              </span>
              <a
                href={partnerUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-[#10243E] text-white text-xs font-bold transition-all shadow hover:shadow-md cursor-pointer"
              >
                <span>
                  {isBn ? "Tiqets এ সব টিকেট খুঁজুন" : `Browse All Tickets for ${cityName} on Tiqets`}
                </span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Transparency Footer */}
      {showFallbackBadge && (
        <div className="bg-slate-100/90 px-4 py-2 border-t border-slate-200 text-[11px] font-mono text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isBn
                ? "টিকেট ইস্যুকারী: Tiqets International B.V. (আমস্টারডাম)"
                : "Official Provider: Tiqets International B.V. (Official Reseller)"}
            </span>
          </div>
          <span className="text-slate-500">
            {isBn ? "মুদ্রা: " + widgetCurrency : "Currency: " + widgetCurrency} • Instant PDF/Apple Wallet
          </span>
        </div>
      )}
    </div>
  );
};
