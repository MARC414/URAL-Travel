import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, Settings2, Check, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Language } from "../translations";

interface ConsentBannerProps {
  onNavigate?: (path: string) => void;
  lang?: Language;
}

export type ConsentStatus = "accepted" | "declined" | "custom";

export interface GranularConsentSettings {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

const DEFAULT_GRANULAR: GranularConsentSettings = {
  necessary: true,
  analytics: true,
  marketing: false,
  functionality: true,
};

export function updateGoogleConsentMode(granted: boolean | GranularConsentSettings) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args as unknown as Record<string, unknown>);
    };
  }

  let analyticsGranted = false;
  let marketingGranted = false;
  let funcGranted = true;

  if (typeof granted === "boolean") {
    analyticsGranted = granted;
    marketingGranted = granted;
    funcGranted = granted;
  } else {
    analyticsGranted = Boolean(granted.analytics);
    marketingGranted = Boolean(granted.marketing);
    funcGranted = Boolean(granted.functionality);
  }

  const consentPayload = {
    ad_storage: marketingGranted ? "granted" : "denied",
    ad_user_data: marketingGranted ? "granted" : "denied",
    ad_personalization: marketingGranted ? "granted" : "denied",
    analytics_storage: analyticsGranted ? "granted" : "denied",
    functionality_storage: funcGranted ? "granted" : "denied",
    personalization_storage: funcGranted ? "granted" : "denied",
    security_storage: "granted", // Always granted for site security & spam prevention
  };

  window.gtag("consent", "update", consentPayload);

  window.dataLayer.push({
    event: "consent_update",
    consent_status: typeof granted === "boolean" ? (granted ? "accepted" : "declined") : "custom",
    consent_details: consentPayload,
  });

  window.dispatchEvent(
    new CustomEvent("ural:consent-updated", {
      detail: {
        status: typeof granted === "boolean" ? (granted ? "accepted" : "declined") : "custom",
        payload: consentPayload,
      },
    })
  );
}

export function ConsentBanner({ onNavigate, lang = "en" }: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [settings, setSettings] = useState<GranularConsentSettings>(DEFAULT_GRANULAR);

  const isBn = lang === "bn";
  const privacyPath = isBn ? "/bn/privacy" : "/privacy";

  useEffect(() => {
    // Check if user has already stored consent
    try {
      const stored = localStorage.getItem("cookie-consent");
      if (!stored) {
        // Small delay so page renders first without layout jank
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      } else {
        // Apply existing choice to GTM on mount
        if (stored === "accepted") {
          updateGoogleConsentMode(true);
        } else if (stored === "declined") {
          updateGoogleConsentMode(false);
        } else {
          try {
            const parsed = JSON.parse(localStorage.getItem("cookie-consent-settings") || "{}");
            updateGoogleConsentMode(parsed);
          } catch {
            updateGoogleConsentMode(false);
          }
        }
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // Listen for global reopen requests (e.g. from Privacy Policy page "Change Preferences" button)
  useEffect(() => {
    const handleReopen = () => {
      setVisible(true);
      setShowCustomize(true);
    };
    window.addEventListener("ural:open-cookie-banner", handleReopen);
    return () => {
      window.removeEventListener("ural:open-cookie-banner", handleReopen);
    };
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
      localStorage.setItem(
        "cookie-consent-settings",
        JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: true,
          functionality: true,
        })
      );
    } catch {
      // storage unavailable in strict private mode
    }
    updateGoogleConsentMode(true);
    setVisible(false);
  };

  const handleDeclineNonEssential = () => {
    try {
      localStorage.setItem("cookie-consent", "declined");
      localStorage.setItem(
        "cookie-consent-settings",
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          functionality: false,
        })
      );
    } catch {
      // storage unavailable
    }
    updateGoogleConsentMode(false);
    setVisible(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem("cookie-consent", "custom");
      localStorage.setItem("cookie-consent-settings", JSON.stringify(settings));
    } catch {
      // storage unavailable
    }
    updateGoogleConsentMode(settings);
    setVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(privacyPath);
    } else {
      window.location.href = privacyPath;
    }
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label={isBn ? "কুকি ও গোপনীয়তা সম্মতি ব্যানার" : "Cookie and Privacy Consent Banner"}
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-xl border-t border-[#F6B73C]/30 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] text-slate-200 animate-fade-in font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Main Banner Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Icon & Message */}
          <div className="flex items-start gap-3.5 max-w-4xl">
            <div className="p-2.5 bg-[#F6B73C]/10 border border-[#F6B73C]/30 text-[#F6B73C] rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-sm">
                  {isBn ? "আপনার গোপনীয়তা ও নিরাপদ ভ্রমণ" : "Your Privacy & Travel Safety"}
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Google Consent Mode v2
                </span>
              </div>
              <p className="text-slate-300">
                {isBn ? (
                  <>
                    URAL Travel Intelligence প্ল্যাটফর্মের নিরাপত্তা বজায় রাখতে এবং আপনার পছন্দের মুদ্রা ও ভাষা মনে রাখতে প্রয়োজনীয় কুকি ব্যবহার করে। আপনার সম্মতি অনুযায়ী আমরা অ্যানালিটিক্স (GA4 ও GTM) ব্যবহার করি যাতে বিমান ভাড়া ও ভিসা গাইডের নির্ভুলতা উন্নত করা যায়। আমরা কখনই কোনো ব্যক্তিগত ডেটা বা ক্রেডিট কার্ড তথ্য বিক্রি বা শেয়ার করি না। বিস্তারিত জানতে আমাদের{" "}
                    <a
                      href={privacyPath}
                      onClick={handlePrivacyClick}
                      className="text-[#F6B73C] font-semibold underline underline-offset-2 hover:text-[#ffd26a] inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                    >
                      গোপনীয়তা ও কুকি নীতিমালা
                      <ExternalLink className="w-3 h-3 inline ml-0.5" />
                    </a>{" "}
                    পড়ুন।
                  </>
                ) : (
                  <>
                    URAL Travel Intelligence uses essential cookies to ensure secure platform operation and remember your currency &amp; language preferences. With your consent, we use privacy-conscious analytics (Google Analytics 4 &amp; GTM Consent Mode v2) to refine our flight benchmark schedules and visa guides. We never sell your personal data or store payment credentials. For full details, review our{" "}
                    <a
                      href={privacyPath}
                      onClick={handlePrivacyClick}
                      className="text-[#F6B73C] font-semibold underline underline-offset-2 hover:text-[#ffd26a] inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                    >
                      Privacy &amp; Cookie Policy
                      <ExternalLink className="w-3 h-3 inline ml-0.5" />
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 flex-wrap sm:flex-nowrap justify-end">
            <button
              type="button"
              onClick={() => setShowCustomize(!showCustomize)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{isBn ? "পছন্দ কাস্টমাইজ" : "Customize"}</span>
              {showCustomize ? (
                <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleDeclineNonEssential}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {isBn ? "প্রয়োজনীয় ছাড়া প্রত্যাখ্যান" : "Essential Only"}
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isBn ? "সব গ্রহণ করুন" : "Accept All"}</span>
            </button>
          </div>
        </div>

        {/* Expandable Granular Consent Customization Panel */}
        {showCustomize && (
          <div className="pt-4 mt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in text-xs">
            {/* 1. Necessary (Always Active) */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {isBn ? "প্রয়োজনীয় কুকি (আবশ্যক)" : "Strictly Necessary"}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {isBn ? "সর্বদা সক্রিয়" : "Always Active"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "প্ল্যাটফর্ম নিরাপত্তা, ক্লাউডফ্লেয়ার ডিফেন্স, ভাষা ও মুদ্রা সিলেকশন বজায় রাখার জন্য আবশ্যক।"
                  : "Required for core security, Cloudflare edge shielding, CSRF token handling, and language/currency settings."}
              </p>
            </div>

            {/* 2. Analytics & Performance */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Cookie className="w-3.5 h-3.5 text-[#F6B73C]" />
                  {isBn ? "অ্যানালিটিক্স ও পারফরম্যান্স" : "Analytics & Performance"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) =>
                      setSettings({ ...settings, analytics: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F6B73C]"></div>
                </label>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "গুগল অ্যানালিটিক্স ৪ ও ট্যাগ ম্যানেজার দ্বারা ভিজিট সংখ্যা ও জনপ্রিয় ট্রাভেল গাইডের পারফরম্যান্স পরিমাপ করা হয়।"
                  : "Google Analytics 4 & GTM anonymous telemetry to measure route popularity and optimize flight schedules."}
              </p>
            </div>

            {/* 3. Marketing & Partner Personalization */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-blue-400" />
                  {isBn ? "পার্টনার রেফারেল ও অফার" : "Partner Referral & Offers"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.marketing}
                    onChange={(e) =>
                      setSettings({ ...settings, marketing: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F6B73C]"></div>
                </label>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "Travelpayouts, Aviasales, Klook ও Airalo-তে ডিসকাউন্ট ও ট্র্যাকিং সক্ষম করে। কোনো ব্যক্তিগত তথ্য থাকে না।"
                  : "Enables secure partner attribution with Travelpayouts, Aviasales & Klook for booking referrals."}
              </p>
            </div>

            {/* Save Preferences Button */}
            <div className="md:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-1.5 rounded-xl bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy font-bold text-xs shadow transition-all cursor-pointer"
              >
                {isBn ? "পছন্দ সংরক্ষণ করুন" : "Save Preferences"}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
export default ConsentBanner;
