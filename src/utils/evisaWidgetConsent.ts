import {
  consentFromEvent,
  hasConsent,
  type ConsentStorage,
} from "./consent";

/** Fail closed; delegates to the single sitewide consent contract. */
export function hasEvisaWidgetConsent(storage?: ConsentStorage): boolean {
  return arguments.length > 0 ? hasConsent("marketing", storage) : hasConsent("marketing");
}

/** Reads marketing consent from a live `ural:consent-updated` event detail. */
export function evisaWidgetConsentFromEvent(detail: unknown): boolean {
  return consentFromEvent("marketing", detail);
}
