/// <reference types="vite/client" />

/**
 * Ambient window globals for analytics / consent tooling.
 *
 * `window.dataLayer` and `window.gtag` are declared in src/utils/analytics.ts
 * and MUST stay there: two `interface Window` blocks with differing
 * optionality/types are a TS2687 compile error (this file carried a duplicate
 * copy once and broke `tsc`).
 *
 * The Consent Mode v2 head script in index.html and the granular consent UI
 * in src/components/ConsentBanner.tsx use only those two globals plus
 * localStorage and CustomEvent, so nothing else needs declaring here.
 */
