import { useCallback, useEffect, useState } from "react";

/**
 * GDPR / ePrivacy cookie-consent banner, the UI half of Google Consent Mode v2.
 *
 * The other half lives in index.html: an inline script that sets every storage
 * type to `denied` BEFORE GTM loads and re-applies any stored choice
 * synchronously. This component therefore only ever renders for visitors with
 * no stored choice — it is invisible (zero DOM nodes) for everyone else, which
 * keeps it out of the CLS and LCP budget entirely.
 *
 * Design constraints that shaped this file:
 *  - Never import or wait for `window.gtag` directly. GTM is deferred until
 *    first interaction or 3s, so `gtag` may not exist when the user clicks.
 *    All consent writes go through `window.uralConsent`, which the inline head
 *    script guarantees exists and which pushes straight into `dataLayer`
 *    (GTM replays the queue when it boots).
 *  - localStorage is wrapped in try/catch (Safari private mode throws), and a
 *    throw must never block the consent update itself.
 *  - The bar is `position: fixed`, so appearing/disappearing cannot shift
 *    layout — fixed overlays do not move other elements.
 *  - No dark patterns: Decline is equally prominent, nothing is pre-selected,
 *    and the choice can be withdrawn later via the footer "Cookie settings"
 *    button, which calls window.uralConsent.openBanner().
 *
 * See GTM_CONSENT_MODE_INTEGRATION.md for the compliance checklist.
 */

type ConsentLang = "en" | "bn";

interface ConsentBannerProps {
  /** UI language of the surrounding page, mirroring App's locale state. */
  lang?: ConsentLang;
}

const COPY = {
  en: {
    title: "We value your privacy",
    body:
      "We use cookies to remember your preferences and, only if you allow it, to measure how our travel guides are used. Declining changes nothing about your experience on URAL.",
    accept: "Accept all",
    decline: "Decline",
    ariaLabel: "Cookie consent",
  },
  bn: {
    title: "আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ",
    body:
      "আপনার পছন্দ মনে রাখতে আমরা কুকি ব্যবহার করি এবং আপনি অনুমতি দিলেই কেবল আমাদের ট্রাভেল গাইডগুলো কীভাবে ব্যবহৃত হয় তা পরিমাপ করি। প্রত্যাখ্যান করলে URAL-এ আপনার অভিজ্ঞতায় কোনো পরিবর্তন হবে না।",
    accept: "সব গ্রহণ করুন",
    decline: "প্রত্যাখ্যান",
    ariaLabel: "কুকি সম্মতি",
  },
} as const;

export function ConsentBanner({ lang = "en" }: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  // Show the bar only when no choice exists yet. The head script has already
  // applied a stored choice, so there is nothing to do on repeat visits.
  useEffect(() => {
    const api = window.uralConsent;
    if (!api) return;
    if (api.read() === null) setVisible(true);
  }, []);

  // Let the footer's "Cookie settings" control re-open the banner so consent
  // can be withdrawn (GDPR Art. 7(3)). Registered here, next to the state it
  // manipulates, instead of scattered across App.tsx.
  useEffect(() => {
    const api = window.uralConsent;
    if (!api) return;
    api.openBanner = () => setVisible(true);
    return () => {
      if (window.uralConsent) window.uralConsent.openBanner = undefined;
    };
  }, []);

  const decide = useCallback((granted: boolean) => {
    window.uralConsent?.choose(granted);
    setVisible(false);
  }, []);

  if (!visible) return null;

  const t = COPY[lang];

  return (
    <div
      role="dialog"
      aria-label={t.ariaLabel}
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4"
    >
      <div className="mx-auto max-w-[1200px] rounded-2xl border border-white/10 bg-brand-navy/95 text-white shadow-2xl backdrop-blur-md">
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-gold">{t.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">{t.body}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-stretch lg:flex-row lg:items-center">
            <button
              type="button"
              onClick={() => decide(false)}
              className="min-h-[42px] flex-1 rounded-xl border border-white/20 px-4 text-xs font-bold text-slate-200 transition-colors hover:bg-white/10 cursor-pointer md:flex-none"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => decide(true)}
              className="min-h-[42px] flex-1 rounded-xl bg-brand-gold px-4 text-xs font-bold text-brand-navy transition-colors hover:bg-brand-gold-dark cursor-pointer md:flex-none"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
