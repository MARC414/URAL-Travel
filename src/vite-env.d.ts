/// <reference types="vite/client" />

/**
 * Consent Mode v2 bridge injected by the inline script in index.html and
 * consumed by src/components/ConsentBanner.tsx.
 *
 * `window.dataLayer` and `window.gtag` are deliberately NOT declared here:
 * src/utils/analytics.ts already owns those ambient declarations, and two
 * `interface Window` blocks with differing optionality/types are a TS2687
 * compile error. Keep them there, keep this one here.
 */
interface Window {
  uralConsent?: {
    storageKey: string;
    /** Stored raw choice: "accepted" | "declined" | null when untouched. */
    read: () => string | null;
    /** Push a `consent update` command without persisting the choice. */
    apply: (granted: boolean) => void;
    /** Persist the choice and push the matching `consent update`. */
    choose: (granted: boolean) => void;
    /** Forget the stored choice (used by tests / manual resets). */
    reset: () => void;
    /** Re-open the banner so consent can be withdrawn; set by ConsentBanner. */
    openBanner?: () => void;
  };
}
