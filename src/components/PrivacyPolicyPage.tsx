import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Cookie,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Mail,
  PhoneCall,
  Globe,
  Sliders,
  Eye,
  Database,
  UserCheck,
  Server,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Language } from "../translations";
import { updateGoogleConsentMode, GranularConsentSettings } from "./ConsentBanner";

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
  lang?: Language;
}

export function PrivacyPolicyPage({ onNavigate, lang = "en" }: PrivacyPolicyPageProps) {
  const isBn = lang === "bn";

  // Current consent status state for interactive control center
  const [currentConsent, setCurrentConsent] = useState<string>("unknown");
  const [currentSettings, setCurrentSettings] = useState<GranularConsentSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookie-consent");
      if (stored) {
        setCurrentConsent(stored);
      } else {
        setCurrentConsent("unspecified");
      }
      const settingsRaw = localStorage.getItem("cookie-consent-settings");
      if (settingsRaw) {
        setCurrentSettings(JSON.parse(settingsRaw));
      }
    } catch {
      setCurrentConsent("unspecified");
    }
  }, []);

  const handleUpdatePreference = (type: "accept_all" | "decline_all" | "custom", customSettings?: GranularConsentSettings) => {
    try {
      if (type === "accept_all") {
        const full: GranularConsentSettings = {
          necessary: true,
          analytics: true,
          marketing: true,
          functionality: true,
        };
        localStorage.setItem("cookie-consent", "accepted");
        localStorage.setItem("cookie-consent-settings", JSON.stringify(full));
        setCurrentConsent("accepted");
        setCurrentSettings(full);
        updateGoogleConsentMode(true);
        setSavedNotification(isBn ? "সব কুকি সম্মতি সক্রিয় করা হয়েছে।" : "All cookies granted successfully.");
      } else if (type === "decline_all") {
        const minimal: GranularConsentSettings = {
          necessary: true,
          analytics: false,
          marketing: false,
          functionality: false,
        };
        localStorage.setItem("cookie-consent", "declined");
        localStorage.setItem("cookie-consent-settings", JSON.stringify(minimal));
        setCurrentConsent("declined");
        setCurrentSettings(minimal);
        updateGoogleConsentMode(false);
        setSavedNotification(isBn ? "শুধু প্রয়োজনীয় কুকি ছাড়া বাকি সব বন্ধ করা হয়েছে।" : "Only strictly necessary cookies are active.");
      } else if (type === "custom" && customSettings) {
        localStorage.setItem("cookie-consent", "custom");
        localStorage.setItem("cookie-consent-settings", JSON.stringify(customSettings));
        setCurrentConsent("custom");
        setCurrentSettings(customSettings);
        updateGoogleConsentMode(customSettings);
        setSavedNotification(isBn ? "আপনার কাস্টম পছন্দ সংরক্ষণ করা হয়েছে।" : "Custom preferences saved.");
      }
    } catch {
      setSavedNotification(isBn ? "পছন্দ সংরক্ষণ করতে ব্রাউজার স্টোরেজ প্রয়োজন।" : "Browser storage required to save preferences.");
    }
    setTimeout(() => setSavedNotification(null), 4000);
  };

  const handleOpenBanner = () => {
    window.dispatchEvent(new CustomEvent("ural:open-cookie-banner"));
  };

  return (
    <div className="space-y-12 animate-fade-in font-sans pb-16 max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <section className="bg-brand-navy text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6B73C]/15 border border-[#F6B73C]/30 text-[#F6B73C] text-xs font-mono font-bold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBn ? "আইনগত স্বচ্ছতা ও ডেটা সুরক্ষা" : "Legal Transparency & Data Protection"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {isBn
              ? "গোপনীয়তা ও কুকি নীতিমালা"
              : "Privacy & Cookie Policy"}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? "URAL Travel Intelligence-এ আপনার ব্যক্তিগত গোপনীয়তা ও ব্রাউজিং নিরাপত্তা রক্ষা করা আমাদের পবিত্র দায়িত্ব। আমরা কীভাবে ডেটা প্রসেস করি, গুগল কনসেন্ট মোড v2 পরিচালনা করি এবং বাণিজ্যিক পার্টনারদের সাথে স্বচ্ছতা বজায় রাখি তা বিস্তারিত জানুন।"
              : "At URAL Travel Intelligence, safeguarding your digital privacy and ensuring operational transparency is fundamental. Learn how we handle visitor data, enforce Google Consent Mode v2, and maintain rigorous affiliate integrity."}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {isBn ? "কার্যকর তারিখ: অক্টোবর ২০২৬" : "Effective Date: October 2026"}
            </span>
            <span>•</span>
            <span>{isBn ? "ভার্সন: ২.৪ (GDPR ও ePR অনুবর্তী)" : "Version: 2.4 (GDPR & ePR Compliant)"}</span>
            <span>•</span>
            <span>{isBn ? "অধিক্ষেত্র: বাংলাদেশ ও বৈশ্বিক" : "Jurisdiction: Bangladesh & Global"}</span>
          </div>
        </div>
      </section>

      {/* QUICK SUMMARY CARD: 60-SECOND PLAIN LANGUAGE SUMMARY */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2.5 text-[#F6B73C]">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">
            {isBn ? "৬০ সেকেন্ডের সংক্ষেপ: আপনার জন্য জরুরি বিষয়গুলো" : "The 60-Second Summary: What You Need to Know"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{isBn ? "কোনো কার্ড ডেটা নেই" : "No Payment Data"}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {isBn
                ? "URAL কোনো পেমেন্ট বা কার্ড তথ্য সংরক্ষণ করে না। সব বুকিং সুরক্ষিত পার্টনার পোর্টালে সম্পন্ন হয়।"
                : "We never store credit card numbers, CVVs, or bank logins. All transactions occur on PCI-DSS certified partner portals."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-[#F6B73C] font-bold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? "Consent Mode v2" : "Consent Mode v2"}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {isBn
                ? "ডিফল্টভাবে অ্যানালিটিক্স বন্ধ থাকে। আপনি সম্মতি দিলেই কেবল সাইট উন্নয়ন ডেটা সক্রিয় হয়।"
                : "Google Tag Manager defaults to 'denied' for analytics and ads until you make an explicit choice."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Globe className="w-4 h-4 shrink-0" />
              <span>{isBn ? "অ্যাফিলিয়েট স্বচ্ছতা" : "Zero-Cost Affiliate"}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {isBn
                ? "পার্টনার লিংকে ক্লিক করে বুক করলে আমরা সামান্য রেফারেল পাই, যাতে আপনার কোনো বাড়তি খরচ হয় না।"
                : "Outbound booking clicks support our free guides via referral commissions at zero added expense to you."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? "ডেটা বিক্রি নিষেধ" : "We Never Sell Data"}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {isBn
                ? "আপনার ইমেইল বা ব্রাউজিং অভ্যাস কোনো বিজ্ঞাপন নেটওয়ার্ক বা ডেটা ব্রোকারের কাছে বিক্রি করা হয় না।"
                : "We never trade, rent, or sell your personal details, email address, or search inquiries to data brokers."}
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COOKIE CONSENT CONTROL CENTER */}
      <section id="manage-consent" className="bg-gradient-to-br from-slate-900 to-brand-navy border-2 border-[#F6B73C]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#F6B73C] text-xs font-mono font-bold uppercase">
              <Sliders className="w-4 h-4" />
              <span>{isBn ? "ইন্টারেক্টিভ কন্ট্রোল হাব" : "Interactive Control Hub"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isBn ? "আপনার বর্তমান কুকি সেটিংস পরিচালনা করুন" : "Manage Your Cookie Preferences"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              {isBn
                ? "GDPR অনুচ্ছেদ ৭(৩) অনুযায়ী আপনি যেকোনো মুহূর্তে এক ক্লিকে আপনার সম্মতি পরিবর্তন বা প্রত্যাহার করতে পারেন।"
                : "Under GDPR Article 7(3), you have the absolute right to withdraw or modify your consent at any time."}
            </p>
          </div>

          {/* Current Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
            <span className="text-xs text-slate-400">{isBn ? "বর্তমান অবস্থা:" : "Current State:"}</span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
              currentConsent === "accepted"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : currentConsent === "declined"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}>
              {currentConsent === "accepted"
                ? isBn ? "সব সক্রিয় (Granted)" : "All Granted"
                : currentConsent === "declined"
                ? isBn ? "প্রয়োজনীয় মাত্র (Denied)" : "Denied / Essential"
                : isBn ? "কাস্টম / অপশন খোলা" : "Custom / Default"}
            </span>
          </div>
        </div>

        {savedNotification && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{savedNotification}</span>
          </div>
        )}

        {/* Live Toggle Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Strictly Necessary */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{isBn ? "প্রয়োজনীয় কুকি" : "Strictly Necessary"}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {isBn ? "লকড" : "Locked"}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isBn
                ? "সাইট লোডিং, ভাষা এবং নিরাপত্তা সেশন নিশ্চিত করতে সবসময় সক্রিয়।"
                : "Essential for site security, CDN edge routing, language and currency retention."}
            </p>
          </div>

          {/* Analytics Storage */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{isBn ? "অ্যানালিটিক্স (GA4)" : "Analytics (GA4)"}</span>
              <input
                type="checkbox"
                checked={currentSettings.analytics}
                onChange={(e) => {
                  const updated = { ...currentSettings, analytics: e.target.checked };
                  handleUpdatePreference("custom", updated);
                }}
                className="w-4 h-4 accent-[#F6B73C] cursor-pointer"
              />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isBn
                ? "ভিজিটের সংখ্যা ও ট্রাভেল গাইডের উপযোগিতা পরিমাপ করে।"
                : "Measures aggregate page views and popular route schedules anonymously."}
            </p>
          </div>

          {/* Marketing / Ad Attribution */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{isBn ? "পার্টনার অ্যাট্রিবিউশন" : "Partner Attribution"}</span>
              <input
                type="checkbox"
                checked={currentSettings.marketing}
                onChange={(e) => {
                  const updated = { ...currentSettings, marketing: e.target.checked };
                  handleUpdatePreference("custom", updated);
                }}
                className="w-4 h-4 accent-[#F6B73C] cursor-pointer"
              />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isBn
                ? "Travelpayouts ও Klook-এর ট্র্যাকিং টোকেন সক্রিয় করে।"
                : "Attribution tokens for Aviasales, Travelpayouts and Klook referrals."}
            </p>
          </div>

          {/* Functionality Storage */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{isBn ? "ফাংশনাল সুবিধা" : "Functionality"}</span>
              <input
                type="checkbox"
                checked={currentSettings.functionality}
                onChange={(e) => {
                  const updated = { ...currentSettings, functionality: e.target.checked };
                  handleUpdatePreference("custom", updated);
                }}
                className="w-4 h-4 accent-[#F6B73C] cursor-pointer"
              />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isBn
                ? "টুলস ও ফিল্টারের ব্যক্তিগত পছন্দ স্মরণ রাখে।"
                : "Preserves tool calculations, filter state, and widget preferences."}
            </p>
          </div>
        </div>

        {/* Quick Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleOpenBanner}
            className="text-xs text-[#F6B73C] hover:underline font-mono inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isBn ? "সম্মতি ব্যানার পুনরায় খুলুন" : "Re-open Floating Consent Banner"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleUpdatePreference("decline_all")}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isBn ? "সব নন-এসেনশিয়াল বন্ধ করুন" : "Decline Non-Essential"}
            </button>
            <button
              type="button"
              onClick={() => handleUpdatePreference("accept_all")}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy shadow-md transition-colors cursor-pointer"
            >
              {isBn ? "সবগুলো সক্রিয় করুন" : "Accept All Cookies"}
            </button>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-sm font-bold font-mono uppercase text-[#F6B73C] tracking-wide">
          {isBn ? "সূচিপত্র (Table of Contents)" : "Table of Contents"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-slate-300">
          {[
            { id: "sec-1", en: "1. Data Controller & Identity", bn: "১. ডেটা নিয়ন্ত্রক ও পরিচিতি" },
            { id: "sec-2", en: "2. Regulatory Scope (GDPR / CCPA)", bn: "২. আইনি পরিধি (GDPR ও CCPA)" },
            { id: "sec-3", en: "3. Legal Bases for Processing", bn: "৩. ডেটা প্রসেসিংয়ের আইনি ভিত্তি" },
            { id: "sec-4", en: "4. Information We Collect", bn: "৪. সংগৃহীত তথ্যের বিবরণ" },
            { id: "sec-5", en: "5. Data We DO NOT Collect", bn: "৫. যা আমরা কখনোই সংগ্রহ করি না" },
            { id: "sec-6", en: "6. Cookie Inventory & Lifespans", bn: "৬. কুকি তালিকা ও স্থায়িত্ব" },
            { id: "sec-7", en: "7. Google Consent Mode v2", bn: "৭. গুগল কনসেন্ট মোড v2" },
            { id: "sec-8", en: "8. Affiliate Disclosure & FTC", bn: "৮. অ্যাফিলিয়েট পার্টনারশিপ ও স্বচ্ছতা" },
            { id: "sec-9", en: "9. Data Retention Schedule", bn: "৯. ডেটা সংরক্ষণের সময়সীমা" },
            { id: "sec-10", en: "10. Security & Edge Encryption", bn: "১০. সাইট সিকিউরিটি ও এনক্রিপশন" },
            { id: "sec-11", en: "11. International Data Transfers", bn: "১১. আন্তর্জাতিক ডেটা স্থানান্তর" },
            { id: "sec-12", en: "12. Your Rights Under GDPR/CCPA", bn: "১২. ব্যবহারকারী হিসেবে আপনার অধিকার" },
            { id: "sec-13", en: "13. Children's Online Privacy", bn: "১৩. অপ্রাপ্তবয়স্কদের সুরক্ষা" },
            { id: "sec-14", en: "14. Policy Updates & Versioning", bn: "১৪. নীতিমালার পরিবর্তন" },
            { id: "sec-15", en: "15. Contact & Privacy Inquiries", bn: "১৫. যোগাযোগ ও সহায়তা ডেস্ক" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#F6B73C] shrink-0" />
              <span>{isBn ? item.bn : item.en}</span>
            </a>
          ))}
        </div>
      </section>

      {/* FULL LEGAL TEXT SECTIONS */}
      <div className="space-y-12 text-slate-300 text-sm leading-relaxed">
        {/* 1. Identity */}
        <section id="sec-1" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <Database className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১. ডেটা নিয়ন্ত্রক ও প্রাতিষ্ঠানিক পরিচয় (Data Controller)" : "1. Data Controller & Editorial Identity"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                <strong>URAL Travel Intelligence</strong> (<a href="https://ural-travel.pages.dev" className="text-[#F6B73C] underline">https://ural-travel.pages.dev</a>) হলো একটি স্বাধীন ট্রাভেল ইন্টেলিজেন্স ও গবেষণা প্ল্যাটফর্ম, যা পরিচালনা করে URAL Travel Bangladesh (হেডকোয়ার্টার: ঢাকা, বাংলাদেশ)। আমরা কোনো প্রথাগত টিকেট-বিক্রয়কারী এজেন্সি নই—আমাদের মূল লক্ষ্য হলো বাংলাদেশি পাসপোর্টধারী এবং বিশ্বব্যাপী ভ্রমণকারীদের জন্য বিমান ভাড়ার তুলনামূলক তথ্য, ভিসা চেকলিস্ট, BDT ভ্রমণ বাজেট এবং DIY উমরাহ গাইড নির্ভুলভাবে উপস্থাপন করা।
              </>
            ) : (
              <>
                <strong>URAL Travel Intelligence</strong> (<a href="https://ural-travel.pages.dev" className="text-[#F6B73C] underline">https://ural-travel.pages.dev</a>) is an independent travel intelligence publisher operated by URAL Travel Bangladesh, headquartered in Dhaka, Bangladesh. We are not a travel agency or airline booking consolidator; our sole mandate is delivering benchmark flight analytics, verified visa checklists, BDT cost frameworks, and DIY Umrah itineraries for Bangladeshi travelers worldwide.
              </>
            )}
          </p>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
            <p><strong>{isBn ? "ডেটা নিয়ন্ত্রক ইমেইল:" : "Designated Privacy Contact:"}</strong> privacy@ural-travel.pages.dev</p>
            <p><strong>{isBn ? "অফিসিয়াল হটলাইন / হোয়াটসঅ্যাপ:" : "Official WhatsApp Support Desk:"}</strong> +880 1784-385335</p>
            <p><strong>{isBn ? "ওয়েবসাইট হোস্ট:" : "Global Infrastructure:"}</strong> Cloudflare Pages Edge Network (300+ Cities Worldwide)</p>
          </div>
        </section>

        {/* 2. Regulatory Scope */}
        <section id="sec-2" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Globe className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "২. আইনি পরিধি ও আন্তর্জাতিক সম্মতি (Regulatory Framework)" : "2. Regulatory Scope & Territorial Applicability"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                আমাদের নীতিমালায় আন্তর্জাতিকভাবে স্বীকৃত ডেটা সুরক্ষা মানদণ্ড অনুসরণ করা হয়েছে:
              </>
            ) : (
              <>
                This Privacy and Cookie Policy is structured to comply with international data privacy laws:
              </>
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>{isBn ? "ইউরোপীয় ইউনিয়ন (EU GDPR):" : "European Economic Area (EU GDPR 2016/679):"}</strong>{" "}
              {isBn
                ? "ইইউ ভুক্ত দেশগুলো থেকে সাইট পরিদর্শনকারী সকল ভ্রমণকারীর ক্ষেত্রে রেগুলেশন (EU) 2016/679 প্রযোজ্য।"
                : "Full compliance with Regulation (EU) 2016/679 governing user consent, cookie management, and data subject rights."}
            </li>
            <li>
              <strong>{isBn ? "যুক্তরাজ্য (UK GDPR ও DPA 2018):" : "United Kingdom (UK GDPR & Data Protection Act 2018):"}</strong>{" "}
              {isBn
                ? "যুক্তরাজ্যের ব্যবহারকারীদের ক্ষেত্রে আইসিও (ICO) নির্ধারিত নির্দেশনা অনুসৃত হয়।"
                : "Adherence to UK privacy standards and Information Commissioner's Office guidelines."}
            </li>
            <li>
              <strong>{isBn ? "ক্যালিফোর্নিয়া (CCPA / CPRA):" : "California (CCPA / CPRA):"}</strong>{" "}
              {isBn
                ? "আমরা ব্যবহারকারীর ডেটা বিক্রি করি না এবং ক্যালিফোর্নিয়া উপভোক্তা অধিকার শতভাগ সুরক্ষিত রাখি।"
                : "URAL does not sell personal information and provides equal service regardless of privacy settings."}
            </li>
            <li>
              <strong>{isBn ? "বাংলাদেশ (তথ্য ও যোগাযোগ প্রযুক্তি আইন):" : "Bangladesh (ICT Act 2006 & Data Protection Framework):"}</strong>{" "}
              {isBn
                ? "বাংলাদেশি সাইবার নিরাপত্তা ও ডিজিটাল সুরক্ষা বিধিমালার সাথে সম্পূর্ণরূপে সামঞ্জস্যপূর্ণ।"
                : "Full alignment with relevant Bangladesh telecommunication, cyber security, and consumer protection regulations."}
            </li>
          </ul>
        </section>

        {/* 3. Legal Bases */}
        <section id="sec-3" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileText className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৩. ডেটা প্রসেসিংয়ের আইনি ভিত্তি (Legal Bases - GDPR Art. 6)" : "3. Legal Bases for Processing Data"}
            </h2>
          </div>
          <p>
            {isBn
              ? "GDPR অনুচ্ছেদ ৬ অনুযায়ী URAL শুধুমাত্র নিম্নলিখিত বৈধ ভিত্তির ওপর নির্ভর করে তথ্য প্রসেস করে:"
              : "Under GDPR Article 6, URAL processes personal information strictly under the following lawful bases:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <strong className="text-white block font-bold">{isBn ? "ক. স্পষ্ট সম্মতি (Consent)" : "A. Explicit Consent"}</strong>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? "গুগল অ্যানালিটিক্স ৪ ট্র্যাকিং, পার্টনার কুকিজ এবং ইমেইল নিউজলেটার সাবস্ক্রিপশনের জন্য ব্যবহারকারীর ইতিবাচক সম্মতি।"
                  : "Art. 6(1)(a): Applies to non-essential cookies, Google Analytics 4 telemetry, and voluntary email fare drop subscriptions."}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <strong className="text-white block font-bold">{isBn ? "খ. বৈধ স্বার্থ (Legitimate Interests)" : "B. Legitimate Interests"}</strong>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? "সাইবার আক্রমণ প্রতিরোধ, ক্লাউডফ্লেয়ার বট ম্যানেজমেন্ট এবং প্ল্যাটফর্মের স্থায়িত্ব রক্ষা করা।"
                  : "Art. 6(1)(f): Site performance optimization, DDoS prevention via Cloudflare, and security anomaly detection."}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
              <strong className="text-white block font-bold">{isBn ? "গ. অনুরোধকৃত সেবা প্রদান" : "C. Contractual Performance"}</strong>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? "ব্যবহারকারী নিজে হোয়াটসঅ্যাপে বা ফর্মে টিকিটের দাম জানতে চাইলে তাৎক্ষণিক রিপ্লাই পাঠানো।"
                  : "Delivering requested fare notifications, WhatsApp itinerary quotes, or email flight drop alerts requested directly by the user."}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Information We Collect */}
        <section id="sec-4" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <Eye className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৪. আমরা কী তথ্য সংগ্রহ ও প্রসেস করি" : "4. Categories of Data We Collect"}
            </h2>
          </div>
          <p>
            {isBn
              ? "URAL শুধুমাত্র সাইটের স্বাভাবিক পরিচালন ও গবেষণা তথ্যের জন্য ন্যূনতম ডেটা প্রসেস করে:"
              : "URAL collects only the minimal data necessary to deliver travel intelligence and preserve site integrity:"}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>{isBn ? "ডিভাইস ও ব্রাউজিং তথ্য (Automated Telemetry):" : "Technical & Device Telemetry:"}</strong>{" "}
              {isBn
                ? "আইপি অ্যাড্রেস (গুগল অ্যানালিটিক্স ৪-এ স্বয়ংক্রিয়ভাবে মাস্কড বা এননিমাস করা হয়), ব্রাউজারের ধরন, অপারেটিং সিস্টেম, রেফারেল ইউআরএল এবং পেজ ভিজিটের সময়সীমা।"
                : "IP address (anonymized at ingestion by Google Analytics 4), browser agent, screen resolution, operating system, referrer URL, and visit timestamp."}
            </li>
            <li>
              <strong>{isBn ? "ব্যবহারকারীর স্বেচ্ছায় প্রদত্ত তথ্য (Voluntary Submissions):" : "User-Provided Correspondence:"}</strong>{" "}
              {isBn
                ? "আমাদের ফুটারে বা ফেয়ার অ্যালার্ট মডালে সাবস্ক্রাইব করা ইমেইল অ্যাড্রেস, অথবা সরাসরি হোয়াটসঅ্যাপ হেল্পলাইনে পাঠানো মেসেজ।"
                : "Your email address (if voluntarily submitted to our Fare Drop Alert newsletter) or travel inquiries sent via our WhatsApp direct desk."}
            </li>
            <li>
              <strong>{isBn ? "আউটবাউন্ড অ্যাফিলিয়েট ক্লিক ইভেন্ট (Affiliate Attribution Events):" : "Outbound Referral Telemetry:"}</strong>{" "}
              {isBn
                ? "কোন রুটের টিকেটে ক্লিক করে ব্যবহারকারী Aviasales, Klook বা Kiwi-তে যাচ্ছেন তা রেকর্ড করা হয় কোনো ব্যক্তিগত নাম ব্যতিরেকে।"
                : "Non-identifiable click events recording partner destination exits (e.g. Travelpayouts, Aviasales, Klook) for commission verification."}
            </li>
          </ul>
        </section>

        {/* 5. What We DO NOT Collect */}
        <section id="sec-5" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-amber-400">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৫. যা আমরা স্পষ্টভাবে কখনোই সংগ্রহ করি না (What We DO NOT Collect)" : "5. Sensitive Data We Explicitly DO NOT Collect"}
            </h2>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs sm:text-sm text-amber-200">
            <p className="font-bold text-amber-300">
              {isBn ? "⚠️ গুরুত্বপূর্ণ ভোক্তা সুরক্ষা নিশ্চয়তা:" : "⚠️ Crucial Consumer Protection Notice:"}
            </p>
            <p>
              {isBn ? (
                <>
                  URAL-এর নিজস্ব সার্ভারে <strong>কোনো ক্রেডিট কার্ড নম্বর, ব্যাংক সিভিসি (CVC), অনলাইন ব্যাংকিং পাসওয়ার্ড, বায়োমেট্রিক ডেটা বা পাসপোর্ট নম্বর</strong> ইনপুট নেওয়া বা সংরক্ষণ করা হয় না। আমাদের সাইটের সব বুকিং সার্চ সরাসরি আন্তর্জাতিক ভেরিফায়েড প্রোভাইডার (Aviasales, Hotellook, Klook, Kiwi.com, Biman, Flydubai) এর অফিসিয়াল সুরক্ষিত গেটওয়েতে রিডাইরেক্ট করে।
                </>
              ) : (
                <>
                  URAL servers <strong>NEVER collect, process, or store credit card numbers, CVVs, bank account credentials, biometric records, or passport scans</strong>. When you book a flight or hotel, you are securely transferred to official airline, OTA, or partner platforms (e.g. Aviasales, Hotellook, Klook, Kiwi.com, Biman) operating under PCI-DSS Level 1 compliance.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 6. Cookie Inventory & Breakdown Table */}
        <section id="sec-6" className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <Cookie className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৬. কুকি পলিসি ও পূর্ণাঙ্গ কুকি ইনভেন্টরি (Cookie Policy & Registry)" : "6. Cookie Policy & Comprehensive Registry"}
            </h2>
          </div>
          <p>
            {isBn
              ? "কুকি হলো ছোট টেক্সট ফাইল যা আপনার ব্রাউজারে সংরক্ষিত হয়। আমরা কুকিগুলোকে চারটি সুনির্দিষ্ট ক্যাটাগরিতে ভাগ করেছি:"
              : "Cookies and local storage keys are small text items retained on your device. We categorize them transparently:"}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">{isBn ? "কুকির নাম" : "Name / Key"}</th>
                  <th className="py-3 px-4">{isBn ? "প্রোভাইডার" : "Host"}</th>
                  <th className="py-3 px-4">{isBn ? "ক্যাটাগরি" : "Category"}</th>
                  <th className="py-3 px-4">{isBn ? "উদ্দেশ্য" : "Purpose"}</th>
                  <th className="py-3 px-4">{isBn ? "স্থায়িত্ব" : "Lifespan"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white">cookie-consent</td>
                  <td className="py-2.5 px-4 text-slate-400">URAL (1st Party)</td>
                  <td className="py-2.5 px-4 text-emerald-400">Strictly Necessary</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Stores user cookie preference status (accepted / declined / custom)</td>
                  <td className="py-2.5 px-4">1 Year</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white">ural-lang</td>
                  <td className="py-2.5 px-4 text-slate-400">URAL (1st Party)</td>
                  <td className="py-2.5 px-4 text-emerald-400">Functionality</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Remembers selected language preference (English 'en' or Bengali 'bn')</td>
                  <td className="py-2.5 px-4">1 Year</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white">ural-currency</td>
                  <td className="py-2.5 px-4 text-slate-400">URAL (1st Party)</td>
                  <td className="py-2.5 px-4 text-emerald-400">Functionality</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Remembers selected currency (BDT, USD, SAR, AED, EUR, GBP)</td>
                  <td className="py-2.5 px-4">1 Year</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-white">__cf_bm / cf_clearance</td>
                  <td className="py-2.5 px-4 text-slate-400">Cloudflare Edge</td>
                  <td className="py-2.5 px-4 text-emerald-400">Security</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Bot mitigation, rate limiting, and DDoS protection</td>
                  <td className="py-2.5 px-4">30m - 1 Year</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-[#F6B73C]">_ga / _ga_2EWKHC1KE1</td>
                  <td className="py-2.5 px-4 text-slate-400">Google Analytics</td>
                  <td className="py-2.5 px-4 text-amber-300">Analytics (Consent Gated)</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Distinguishes anonymous visitors across sessions via Google Consent Mode v2</td>
                  <td className="py-2.5 px-4">14 Months</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold text-blue-400">emrld.ltd / marker=675992</td>
                  <td className="py-2.5 px-4 text-slate-400">Travelpayouts</td>
                  <td className="py-2.5 px-4 text-blue-300">Partner Referral</td>
                  <td className="py-2.5 px-4 font-sans text-xs">Attribution marker on outbound flight/hotel ticket redirects</td>
                  <td className="py-2.5 px-4">30 Days (Partner)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Google Consent Mode v2 Architecture */}
        <section id="sec-7" className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৭. গুগল কনসেন্ট মোড v2 আর্কিটেকচার (Consent Mode v2 Architecture)" : "7. Google Consent Mode v2 Technical Architecture"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                আমাদের সাইট গুগল ট্যাগ ম্যানেজার (<strong>GTM-TMPVL82B</strong>) এবং গুগল অ্যানালিটিক্স ৪ (<strong>G-2EWKHC1KE1</strong>)-এর সাথে Google Consent Mode v2 মানদণ্ডে সংহত। ব্যবহারকারী কোনো বোতাম চাপার আগেই ব্রাউজারের &lt;head&gt; অংশে স্বয়ংক্রিয়ভাবে অ্যানালিটিক্স এবং অ্যাডভার্টাইজিং স্টোরেজ <code>'denied'</code> অবস্থায় থাকে।
              </>
            ) : (
              <>
                Our platform orchestrates Google Tag Manager (<strong>GTM-TMPVL82B</strong>) and GA4 (<strong>G-2EWKHC1KE1</strong>) through Google Consent Mode v2. Before user interaction, default consent signals are declared in the &lt;head&gt; as <code>'denied'</code> across all analytical and ad parameters.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[#F6B73C] font-bold">analytics_storage</span>
              <p className="font-sans text-slate-300 text-[11px]">
                {isBn ? "গুগল অ্যানালিটিক্স দ্বারা সাইট ভিজিট মেজারমেন্ট কুকি।" : "Enables GA4 cookies for measuring page visits and dwell times."}
              </p>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[#F6B73C] font-bold">ad_storage &amp; ad_user_data</span>
              <p className="font-sans text-slate-300 text-[11px]">
                {isBn ? "বিজ্ঞাপন কুকি ও ট্রাভেল ক্যাম্পেইন কনভার্সন যাচাই।" : "Governs advertising cookies and cross-platform conversion attribution."}
              </p>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-[#F6B73C] font-bold">functionality_storage</span>
              <p className="font-sans text-slate-300 text-[11px]">
                {isBn ? "মুদ্রা ও ভাষা প্রেফারেন্স ব্রাউজারে রিটেনশন করা।" : "Remembers interactive tool preferences without tracking across other domains."}
              </p>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-emerald-400 font-bold">security_storage (Granted)</span>
              <p className="font-sans text-slate-300 text-[11px]">
                {isBn ? "স্প্যাম ও সাইবার ডিফেন্সের জন্য আবশ্যক।" : "Required for platform defense, CSRF token handling, and uptime monitoring."}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Affiliate Disclosure & FTC Compliance */}
        <section id="sec-8" className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ExternalLink className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৮. অ্যাফিলিয়েট পার্টনারশিপ ও বাণিজ্যিক স্বচ্ছতা (Affiliate Disclosure)" : "8. Affiliate Partnerships & Commercial Transparency"}
            </h2>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs sm:text-sm">
            <p>
              {isBn ? (
                <>
                  <strong>FTC গাইডলাইন ও আন্তর্জাতিক নিয়মানুযায়ী স্পষ্ট ঘোষণা:</strong> URAL একটি স্বাধীন ট্রাভেল ইন্টেলিজেন্স প্ল্যাটফর্ম। আমাদের সাইটের বেশ কিছু আউটবাউন্ড লিংক ভেরিফায়েড আন্তর্জাতিক পার্টনারদের সাথে যুক্ত (যেমন Travelpayouts, Aviasales, Hotellook, Klook, KKday, Tiqets, Airalo, AirHelp, KiwiTaxi, Welcome Pickups, QEEQ, Yesim ও Kiwi.com)।
                </>
              ) : (
                <>
                  <strong>FTC Compliance &amp; Global Advertising Disclosure:</strong> In full compliance with Federal Trade Commission (FTC) guidelines and international advertising transparency laws, URAL operates an affiliate monetization model. When you click an outbound link to one of our verified partners (including Travelpayouts, Aviasales, Hotellook, Klook, KKday, Tiqets, Airalo, AirHelp, KiwiTaxi, Welcome Pickups, QEEQ, Yesim, and Kiwi.com), we may earn a referral commission.
                </>
              )}
            </p>
            <p className="text-slate-400 text-xs">
              {isBn ? (
                <>
                  <strong>আপনার কোনো অতিরিক্ত খরচ হয় না:</strong> আপনি সরাসরি পার্টনার ওয়েবসাইটে যে দাম পেতেন, URAL-এর লিংকের মাধ্যমেও হুবহু একই দাম পাবেন (কিংবা আমাদের এক্সক্লুসিভ প্রোমোকোডে আরও কম পাবেন)। এই কমিশন আমাদের সার্ভার বিল এবং ৪০টিরও বেশি বিস্তারিত ট্রাভেল গাইড সবার জন্য আজীবন ১০০% ফ্রি রাখতে সাহায্য করে।
                </>
              ) : (
                <>
                  <strong>Zero Additional Cost to You:</strong> Clicking our affiliate links never inflates ticket prices or booking fees; in many instances, URAL's partner agreements provide discounted rates or promotional codes. Editorial rankings, safety scores, and visa checklists remain 100% objective and independent.
                </>
              )}
            </p>
          </div>
        </section>

        {/* 9. Data Retention Schedule */}
        <section id="sec-9" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <Database className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "৯. ডেটা সংরক্ষণের সময়সীমা (Data Retention)" : "9. Data Retention & Erasure Schedule"}
            </h2>
          </div>
          <p>
            {isBn
              ? "আমরা অপ্রয়োজনে কখনোই ডেটা জমিয়ে রাখি না। আমাদের সুনির্দিষ্ট রিটেনশন সূচি:"
              : "We follow strict data minimization principles with automatic lifecycle purge schedules:"}
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>
              <strong>{isBn ? "গুগল অ্যানালিটিক্স ৪:" : "Google Analytics 4 Telemetry:"}</strong>{" "}
              {isBn ? "সর্বোচ্চ ১৪ মাস সংরক্ষিত থাকে, এরপর স্বয়ংক্রিয়ভাবে মুছে যায়।" : "Retained for a maximum of 14 months before automated purge."}
            </li>
            <li>
              <strong>{isBn ? "ইমেইল নিউজলেটার:" : "Email Newsletter Subscribers:"}</strong>{" "}
              {isBn
                ? "যতক্ষণ না ব্যবহারকারী আনসাবস্ক্রাইব করেন বা মুছে ফেলার অনুরোধ করেন।"
                : "Retained until you explicitly click 'Unsubscribe' or submit a deletion request."}
            </li>
            <li>
              <strong>{isBn ? "ক্লাউডফ্লেয়ার এজ লগ:" : "Cloudflare Edge Routing Logs:"}</strong>{" "}
              {isBn ? "সাধারণত ২৪ ঘণ্টা থেকে সর্বোচ্চ ৩০ দিনের মধ্যে রোলিং ডিলিট হয়।" : "Transient IP and request logs purged on a rolling 30-day window."}
            </li>
          </ul>
        </section>

        {/* 10. Security Measures */}
        <section id="sec-10" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Lock className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১০. সাইট সিকিউরিটি ও ক্লাউড এনক্রিপশন (Security Measures)" : "10. Security Architecture & Encryption"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                URAL আর্কিটেকচারটি একটি স্ট্যাটিক-জেনারেটেড প্রি-রেন্ডার ফ্রেমওয়ার্ক হিসেবে ক্লাউডফ্লেয়ার এজ নেটওয়ার্কে হোস্ট করা। ফলে কোনো কেন্দ্রীয় এসকিউএল ডাটাবেজ (SQL injection attack surface) উন্মুক্ত থাকে না। সমস্ত ডেটা আদান-প্রদান <strong>TLS 1.3 ও 256-bit SSL এনক্রিপশন</strong> দ্বারা সুরক্ষিত।
              </>
            ) : (
              <>
                URAL is engineered as a prerendered static architecture deployed globally across Cloudflare Pages. This eliminates traditional server-side SQL injection surfaces. All data in transit is encrypted using <strong>TLS 1.3 and 256-bit SSL protocols</strong>, enforced by strict HTTP Strict Transport Security (HSTS) headers.
              </>
            )}
          </p>
        </section>

        {/* 11. International Transfers */}
        <section id="sec-11" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Server className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১১. আন্তর্জাতিক ডেটা স্থানান্তর (International Data Transfers)" : "11. International Data Transfers"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                যেহেতু ক্লাউডফ্লেয়ার এবং গুগল অ্যানালিটিক্স বিশ্বজুড়ে সার্ভার পরিচালনা করে, আপনার ব্রাউজিং রিকোয়েস্ট নিরাপদ সিডিএন নোডের মাধ্যমে প্রসেস হতে পারে। এই স্থানান্তরগুলো ইইউ স্ট্যান্ডার্ড চুক্তিবদ্ধ ধারা (Standard Contractual Clauses - SCCs) এবং EU-US ডেটা প্রাইভেসি ফ্রেমওয়ার্কের অধীনে আইনত সুরক্ষিত।
              </>
            ) : (
              <>
                Because Cloudflare Pages and Google Analytics operate globally distributed server meshes, non-sensitive request telemetry may be routed through international nodes. Transfers outside the EEA/UK are governed by European Commission Standard Contractual Clauses (SCCs) and the EU-U.S. Data Privacy Framework.
              </>
            )}
          </p>
        </section>

        {/* 12. User Rights Under GDPR & CCPA */}
        <section id="sec-12" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <UserCheck className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১২. ব্যবহারকারী হিসেবে আপনার অধিকার (Your Rights Under GDPR & CCPA)" : "12. Your Legal Rights as a Data Subject"}
            </h2>
          </div>
          <p>
            {isBn
              ? "GDPR অনুচ্ছেদ ১৫-২২ এবং ক্যালিফোর্নিয়া উপভোক্তা অধিকার আইনের আওতায় আপনার নিম্নলিখিত অধিকার রয়েছে:"
              : "Under GDPR Articles 15-22 and consumer privacy statutes, you possess explicit legal entitlements:"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold">{isBn ? "১. তথ্যের অধিকার (Right to Access - Art. 15)" : "1. Right to Access (GDPR Art. 15)"}</strong>
              <p className="text-slate-400">
                {isBn ? "আমরা আপনার কোনো ডেটা রেখেছি কি না তা জানার অধিকার।" : "The right to obtain confirmation and a copy of all data processed about you."}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold">{isBn ? "২. মুছে ফেলার অধিকার (Right to Erasure - Art. 17)" : "2. Right to Erasure / 'Forgotten' (Art. 17)"}</strong>
              <p className="text-slate-400">
                {isBn ? "আমাদের সিস্টেম থেকে আপনার ইমেইল বা রেকর্ড স্থায়ীভাবে মুছে ফেলার দাবি।" : "The right to demand immediate deletion of your email subscription or telemetry."}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold">{isBn ? "৩. সম্মতি প্রত্যাহারের অধিকার (Right to Withdraw - Art. 7)" : "3. Right to Withdraw Consent (Art. 7(3))"}</strong>
              <p className="text-slate-400">
                {isBn ? "যেকোনো মুহূর্তে কুকি বা অ্যানালিটিক্স বন্ধ করার নিঃশর্ত অধিকার।" : "The unconditional right to retract consent at any time without adverse penalty."}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-white block font-bold">{isBn ? "৪. ডেটা পোর্টেবিলিটি (Right to Portability - Art. 20)" : "4. Right to Data Portability (Art. 20)"}</strong>
              <p className="text-slate-400">
                {isBn ? "মেশিন-রিডেবল ফরম্যাটে আপনার জমা দেওয়া তথ্য পাওয়ার সুযোগ।" : "The right to receive your personal data in a structured, machine-readable format."}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 pt-1">
            {isBn
              ? "এই অধিকারগুলো প্রয়োগ করতে privacy@ural-travel.pages.dev ঠিকানায় ইমেইল করুন। আমরা ৩০ দিনের মধ্যে জবাব দেওয়ার অঙ্গীকার করি।"
              : "To exercise any of these entitlements, contact privacy@ural-travel.pages.dev. We guarantee a formal response within 30 days."}
          </p>
        </section>

        {/* 13. Children's Privacy */}
        <section id="sec-13" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১৩. অপ্রাপ্তবয়স্কদের সুরক্ষা (Children's Privacy - COPPA & GDPR-K)" : "13. Children's Online Privacy Protection"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                URAL কোনোভাবেই ১৬ বছরের কম বয়সী শিশুদের লক্ষ্য করে পরিচালিত নয়। আমরা জেনেশুনে অপ্রাপ্তবয়স্কদের কোনো তথ্য সংগ্রহ করি না। কোনো অভিভাবক যদি মনে করেন তাদের সন্তান কোনো তথ্য দিয়েছে, অনুগ্রহ করে আমাদের জানালে তা অবিলম্বে মুছে দেওয়া হবে।
              </>
            ) : (
              <>
                URAL is directed exclusively at adult travel planners and is not intended for children under 16 years of age. We do not knowingly harvest personal information from minors. If you believe a minor has provided contact details, please notify us for immediate purge.
              </>
            )}
          </p>
        </section>

        {/* 14. Changes to Policy */}
        <section id="sec-14" className="space-y-3 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-white">
            <span className="p-1.5 rounded-lg bg-[#F6B73C]/10 text-[#F6B73C]">
              <RefreshCw className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white">
              {isBn ? "১৪. নীতিমালার হালনাগাদ ও পরিবর্তন (Policy Revisions)" : "14. Policy Updates & Versioning"}
            </h2>
          </div>
          <p>
            {isBn ? (
              <>
                নতুন রেগুলেটরি আইন বা নতুন ট্রাভেল পার্টনার যুক্ত হওয়ার সাথে সাথে এই নীতিমালা সংশোধন করা হতে পারে। যেকোনো পরিবর্তনের সাথে সাথে পৃষ্ঠার শীর্ষে ‘কার্যকর তারিখ’ ও ভার্সন নম্বর হালনাগাদ করা হবে।
              </>
            ) : (
              <>
                We periodically revise this documentation to reflect new regulatory requirements or partner integrations. Any modifications will be reflected with an updated 'Effective Date' at the header of this page.
              </>
            )}
          </p>
        </section>

        {/* 15. Contact & Data Protection Officer */}
        <section id="sec-15" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#F6B73C]">
            <Mail className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">
              {isBn ? "১৫. প্রাইভেসি ও ডেটা সুরক্ষা হেল্পডেস্ক (Contact Us)" : "15. Contact Our Privacy & Data Protection Desk"}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isBn
              ? "এই গোপনীয়তা বা কুকি নীতিমালা সম্পর্কে আপনার কোনো জিজ্ঞাসা, অভিযোগ বা ডেটা মুছে ফেলার অনুরোধ থাকলে সরাসরি আমাদের সাথে যোগাযোগ করুন:"
              : "If you have questions, regulatory inquiries, or wish to exercise your data subject rights, connect directly with our compliance lead:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
            <a
              href="mailto:privacy@ural-travel.pages.dev"
              className="p-3 bg-slate-950 border border-slate-800 rounded-2xl hover:border-[#F6B73C] transition-colors flex items-center gap-2.5 text-white"
            >
              <Mail className="w-4 h-4 text-[#F6B73C] shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-sans">{isBn ? "ইমেইল:" : "Email:"}</span>
                <span className="font-bold">privacy@ural-travel.pages.dev</span>
              </div>
            </a>
            <a
              href="https://wa.me/8801784385335"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-950 border border-slate-800 rounded-2xl hover:border-emerald-500 transition-colors flex items-center gap-2.5 text-white"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-sans">{isBn ? "হোয়াটসঅ্যাপ ডেস্ক:" : "WhatsApp Desk:"}</span>
                <span className="font-bold text-emerald-400">+880 1784-385335</span>
              </div>
            </a>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="p-3 bg-slate-950 border border-slate-800 rounded-2xl hover:border-blue-500 transition-colors flex items-center gap-2.5 text-white cursor-pointer text-left"
            >
              <Globe className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-sans">{isBn ? "যোগাযোগ ফর্ম:" : "Contact Form:"}</span>
                <span className="font-bold text-blue-400">{isBn ? "অনলাইন ফর্ম খুলুন →" : "Open Desk Form →"}</span>
              </div>
            </button>
          </div>
        </section>
      </div>

      {/* Return to Top / Navigation CTA */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          {isBn
            ? "© ২০২৬ URAL Travel Intelligence · স্বচ্ছতা ও বিশ্বস্ততার প্রতীক"
            : "© 2026 URAL Travel Intelligence · Dedicated to traveler privacy and editorial trust"}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="text-[#F6B73C] hover:underline font-semibold cursor-pointer"
          >
            {isBn ? "← হোম পেজে ফিরুন" : "← Back to Home"}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-slate-300 hover:text-white hover:underline cursor-pointer"
          >
            {isBn ? "উপরে যান ↑" : "Back to Top ↑"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
