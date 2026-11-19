import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Cookie, Settings2, ChevronDown, ChevronUp, Sliders } from "lucide-react";
import { Language } from "../translations";
import {
  CONSENT_CATEGORY_LABELS,
  CONSENT_OPEN_EVENT,
  DEFAULT_CONSENT_SETTINGS,
  applyConsentState,
  readConsentState,
  restoreConsentFocus,
  subscribeConsent,
  writeConsentChoice,
  type ConsentStatus,
  type GranularConsentSettings,
  type StoredConsentStatus,
} from "../utils/consent";

export type { ConsentStatus, GranularConsentSettings };

interface ConsentBannerProps {
  onNavigate?: (path: string) => void;
  lang?: Language;
  initialCustomize?: boolean;
  /** Lets the navigation coordinate with actual visibility, not lazy-mount state. */
  onVisibilityChange?: (visible: boolean) => void;
}

const BTN_FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
const SWITCH_TRACK =
  "relative w-9 h-5 bg-slate-700 rounded-full peer peer-focus-visible:ring-2 peer-focus-visible:ring-[#F6B73C] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F6B73C]";

/** Compatibility wrapper: persists and applies a consent update through the central consent module. */
export function updateGoogleConsentMode(granted: boolean | GranularConsentSettings) {
  if (typeof granted === "boolean") {
    writeConsentChoice(granted ? "accepted" : "declined");
  } else {
    writeConsentChoice(granted);
  }
}

export function ConsentBanner({
  onNavigate,
  lang = "en",
  initialCustomize = false,
  onVisibilityChange,
}: ConsentBannerProps) {
  const [visible, setVisible] = useState(initialCustomize);
  const [showCustomize, setShowCustomize] = useState(initialCustomize);
  const [storedStatus, setStoredStatus] = useState<StoredConsentStatus>("unset");
  const [settings, setSettings] = useState<GranularConsentSettings>({ ...DEFAULT_CONSENT_SETTINGS });
  const [focusHeadingTick, setFocusHeadingTick] = useState(initialCustomize ? 1 : 0);
  const [restoreFocusTick, setRestoreFocusTick] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const isBn = lang === "bn";
  const locale = isBn ? "bn" : "en";
  const privacyPath = isBn ? "/bn/privacy" : "/privacy";

  useEffect(() => { onVisibilityChange?.(visible); }, [visible, onVisibilityChange]);

  useEffect(() => {
    const initial = readConsentState();
    setStoredStatus(initial.status);
    setSettings(initial.settings);
    if (initialCustomize) {
      setVisible(true);
      setShowCustomize(true);
      setFocusHeadingTick((n) => n + 1);
      return undefined;
    }
    if (initial.status === "unset") {
      setVisible(true);
      return undefined;
    }
    applyConsentState(initial.status, initial.settings, false);
    return undefined;
  }, [initialCustomize]);

  // Run heading focus strictly after React commits the opened banner DOM.
  useEffect(() => {
    if (!visible || focusHeadingTick === 0) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [visible, focusHeadingTick]);

  // Restore focus strictly after React commits the banner dismissal and any
  // sibling consent state transitions (e.g. unmounting a consent button for an iframe).
  useEffect(() => {
    if (visible || restoreFocusTick === 0) return;
    restoreConsentFocus();
  }, [visible, restoreFocusTick]);

  useEffect(() => {
    return subscribeConsent((next) => {
      setStoredStatus(next.status);
      setSettings(next.settings);
      // If consent was recorded/updated elsewhere (e.g. /privacy control center
      // or another tab), dismiss the floating banner so it never stays stuck open.
      if (next.status !== "unset") {
        setVisible(false);
        setShowCustomize(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleReopen = () => {
      const current = readConsentState();
      setStoredStatus(current.status);
      setSettings(current.settings);
      setVisible(true);
      setShowCustomize(true);
      setFocusHeadingTick((n) => n + 1);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, handleReopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleReopen);
  }, []);

  useEffect(() => {
    if (!visible || storedStatus === "unset") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
        setShowCustomize(false);
        setRestoreFocusTick((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, storedStatus]);

  const handleAcceptAll = () => {
    const next = writeConsentChoice("accepted");
    setStoredStatus(next.status);
    setSettings(next.settings);
    setShowCustomize(false);
    setVisible(false);
    setRestoreFocusTick((n) => n + 1);
  };

  const handleRejectAll = () => {
    const next = writeConsentChoice("declined");
    setStoredStatus(next.status);
    setSettings(next.settings);
    setShowCustomize(false);
    setVisible(false);
    setRestoreFocusTick((n) => n + 1);
  };

  const handleSaveCustom = () => {
    const next = writeConsentChoice(settings);
    setStoredStatus(next.status);
    setSettings(next.settings);
    setShowCustomize(false);
    setVisible(false);
    setRestoreFocusTick((n) => n + 1);
  };

  const handleToggleCustomize = () => {
    if (!showCustomize) {
      const current = readConsentState();
      setStoredStatus(current.status);
      setSettings(current.settings);
    }
    setShowCustomize((prev) => !prev);
  };

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowCustomize(false);
    if (storedStatus !== "unset") {
      setVisible(false);
    }
    if (onNavigate) onNavigate(privacyPath);
    else window.location.href = privacyPath;
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-labelledby="ural-consent-heading"
      data-consent-banner
      className="fixed bottom-0 inset-x-0 z-[70] max-h-[85dvh] overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-xl border-t border-[#F6B73C]/30 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] text-slate-200 animate-fade-in font-sans"
    >
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-3xl">
            <div className="p-2.5 bg-[#F6B73C]/10 border border-[#F6B73C]/30 text-[#F6B73C] rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1 text-xs leading-relaxed">
              <h2
                id="ural-consent-heading"
                ref={headingRef}
                tabIndex={-1}
                className="font-bold text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] rounded"
              >
                {isBn ? "কুকি ও গোপনীয়তা পছন্দ" : "Cookie & Privacy Preferences"}
              </h2>
              <p className="text-slate-300">
                {isBn ? (
                  <>
                    আমরা সাইটের নিরাপত্তার জন্য শুধু প্রয়োজনীয় কুকি চালু রাখি। আপনার স্পষ্ট সম্মতি ছাড়া অ্যানালিটিক্স (GA4/GTM), অ্যাফিলিয়েট ট্র্যাকিং বা এম্বেডেড পার্টনার টুলস (যেমন eVisas চেকার) লোড হয় না। যেকোনো সময় পছন্দ বদলাতে বা প্রত্যাহার করতে পারবেন। বিস্তারিত{" "}
                    <a
                      href={privacyPath}
                      onClick={handlePrivacyClick}
                      className={`text-[#F6B73C] font-semibold underline underline-offset-2 hover:text-[#ffd26a] rounded ${BTN_FOCUS}`}
                    >
                      গোপনীয়তা ও কুকি নীতিমালায়
                    </a>
                    ।
                  </>
                ) : (
                  <>
                    We keep only strictly necessary security controls active by default. Optional analytics (GA4/GTM), affiliate tracking and embedded partner tools (such as the eVisas checker) stay off unless you allow them, and you can withdraw consent at any time. Read our{" "}
                    <a
                      href={privacyPath}
                      onClick={handlePrivacyClick}
                      className={`text-[#F6B73C] font-semibold underline underline-offset-2 hover:text-[#ffd26a] rounded ${BTN_FOCUS}`}
                    >
                      Privacy &amp; Cookie Policy
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Equal single-click Reject All and Accept All, plus Customize */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={handleToggleCustomize}
              aria-expanded={showCustomize}
              aria-controls="ural-consent-categories"
              className={`col-span-2 sm:col-span-1 min-h-11 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-500 hover:border-slate-300 text-slate-100 hover:text-white transition-colors cursor-pointer ${BTN_FOCUS}`}
            >
              <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isBn ? "কাস্টমাইজ" : "Customize"}</span>
              {showCustomize ? (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={handleRejectAll}
              data-consent-action="reject-all"
              className={`min-h-11 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-400 text-white transition-colors cursor-pointer ${BTN_FOCUS}`}
            >
              {isBn ? "সব প্রত্যাখ্যান করুন" : "Reject All"}
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              data-consent-action="accept-all"
              className={`min-h-11 inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold rounded-xl bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy transition-colors cursor-pointer ${BTN_FOCUS}`}
            >
              {isBn ? "সব গ্রহণ করুন" : "Accept All"}
            </button>
          </div>
        </div>

        {showCustomize && (
          <div
            id="ural-consent-categories"
            className="pt-4 mt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in text-xs"
          >
            {/* 1. Strictly Necessary */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                  {CONSENT_CATEGORY_LABELS.necessary[locale]}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                  {isBn ? "সর্বদা সক্রিয়" : "Always On"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "সাইটের মূল কার্যকারিতা, Cloudflare স্প্যাম সুরক্ষা এবং আপনার কুকি সিদ্ধান্ত মনে রাখতে আবশ্যক।"
                  : "Required for core page delivery, Cloudflare spam protection on forms, and saving your cookie choice."}
              </p>
            </div>

            {/* 2. Preferences (Functionality) */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span id="consent-label-functionality" className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-300 shrink-0" aria-hidden="true" />
                  {CONSENT_CATEGORY_LABELS.functionality[locale]}
                </span>
                <label className="relative -my-2 inline-flex min-h-11 min-w-11 items-center justify-end cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    aria-labelledby="consent-label-functionality"
                    data-consent-toggle="functionality"
                    checked={settings.functionality}
                    onChange={(e) => setSettings({ ...settings, functionality: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className={SWITCH_TRACK} />
                </label>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "ভাষা, প্রস্থানের চেকলিস্টের অগ্রগতি এবং সংরক্ষিত ভাড়া-সতর্কতার তালিকা আপনার ব্রাউজারে মনে রাখে।"
                  : "Remembers your language choice, saved checklist ticks, and local alert preferences in this browser."}
              </p>
            </div>

            {/* 3. Analytics */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span id="consent-label-analytics" className="font-bold text-white flex items-center gap-1.5">
                  <Cookie className="w-3.5 h-3.5 text-[#F6B73C] shrink-0" aria-hidden="true" />
                  {CONSENT_CATEGORY_LABELS.analytics[locale]}
                </span>
                <label className="relative -my-2 inline-flex min-h-11 min-w-11 items-center justify-end cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    aria-labelledby="consent-label-analytics"
                    data-consent-toggle="analytics"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className={SWITCH_TRACK} />
                </label>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "Google Tag Manager ও GA4 লোড করে পেজ ভিজিট ও টুল ব্যবহারের সমষ্টিগত পরিসংখ্যান মাপে। বন্ধ থাকলে কোনো ডেটা যায় না।"
                  : "Loads Google Tag Manager and GA4 to measure aggregate page views and tool usage. Off means no analytics script or events load."}
              </p>
            </div>

            {/* 4. Marketing & Partner Tools */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span id="consent-label-marketing" className="font-bold text-white flex items-center gap-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
                  {CONSENT_CATEGORY_LABELS.marketing[locale]}
                </span>
                <label className="relative -my-2 inline-flex min-h-11 min-w-11 items-center justify-end cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    aria-labelledby="consent-label-marketing"
                    data-consent-toggle="marketing"
                    checked={settings.marketing}
                    onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className={SWITCH_TRACK} />
                </label>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {isBn
                  ? "Travelpayouts অ্যাফিলিয়েট ট্র্যাকিং এবং ঐচ্ছিক এম্বেডেড পার্টনার টুলস (eVisas ভিসা চেকার, Tiqets, AirHelp, Welcome Pickups) চালু করে। চালু থাকলে ওই সেবাদাতারা আপনার IP address, ব্রাউজারের তথ্য ও টুলের ইনপুট পায়।"
                  : "Enables Travelpayouts affiliate tracking and optional embedded partner tools (eVisas visa checker, Tiqets, AirHelp, Welcome Pickups). When enabled, those providers receive your IP address, browser details, and inputs inside their tools."}
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap justify-end gap-2 pt-2">
              {storedStatus !== "unset" && (
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomize(false);
                    setVisible(false);
                    setRestoreFocusTick((n) => n + 1);
                  }}
                  className={`min-h-11 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-500 text-slate-200 font-semibold text-xs transition-colors cursor-pointer ${BTN_FOCUS}`}
                >
                  {isBn ? "বাতিল" : "Cancel"}
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveCustom}
                data-consent-action="save-custom"
                className={`min-h-11 px-5 py-2 rounded-xl bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy font-bold text-xs transition-colors cursor-pointer ${BTN_FOCUS}`}
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
