import { useCallback, useSyncExternalStore } from "react";

export type ConsentStatus = "accepted" | "declined" | "custom";
export type StoredConsentStatus = ConsentStatus | "unset";
export type ConsentCategory = "necessary" | "analytics" | "marketing" | "functionality";

export interface GranularConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

export interface ConsentState {
  status: StoredConsentStatus;
  settings: GranularConsentSettings;
}

export type ConsentStorage = Pick<Storage, "getItem">;

export const CONSENT_STATUS_KEY = "cookie-consent";
export const CONSENT_SETTINGS_KEY = "cookie-consent-settings";
export const CONSENT_UPDATED_EVENT = "ural:consent-updated";
export const CONSENT_OPEN_EVENT = "ural:open-cookie-banner";

/** Non-essential localStorage keys cleared when functionality consent is off or withdrawn. */
export const OPTIONAL_STORAGE_KEYS = [
  "ural_lang",
  "ural_dac_predeparture_checked_v1",
  "ural_active_alerts",
  "ural_subscribed_email",
  "ural_subscription_id",
  "ural_subscription_interests",
] as const;

export type OptionalStorageKey = (typeof OPTIONAL_STORAGE_KEYS)[number];

/** One canonical label set across the banner, privacy center and gated partner tools. */
export const CONSENT_CATEGORY_LABELS: Record<ConsentCategory, { en: string; bn: string }> = {
  necessary: { en: "Strictly Necessary", bn: "প্রয়োজনীয় কুকি" },
  analytics: { en: "Analytics", bn: "অ্যানালিটিক্স" },
  marketing: { en: "Marketing & Partner Tools", bn: "মার্কেটিং ও পার্টনার টুলস" },
  functionality: { en: "Preferences", bn: "পছন্দ সংরক্ষণ" },
};

/** Fail-closed default: no optional category is ever pre-selected or assumed. */
export const DEFAULT_CONSENT_SETTINGS: Readonly<GranularConsentSettings> = Object.freeze({
  necessary: true,
  analytics: false,
  marketing: false,
  functionality: false,
});

export const ACCEPTED_CONSENT_SETTINGS: Readonly<GranularConsentSettings> = Object.freeze({
  necessary: true,
  analytics: true,
  marketing: true,
  functionality: true,
});

type ConsentWindow = Window & {
  /** Session-only fallback used exclusively when localStorage is unavailable or throws. */
  __uralConsent?: ConsentState;
  /** Last interactive trigger that opened cookie preferences, used to restore keyboard focus. */
  __uralConsentTrigger?: HTMLElement | null;
  /** Closest landmark heading fallback if the trigger unmounts after consent changes. */
  __uralConsentFallbackFocus?: HTMLElement | null;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cloneSettings(
  input?: Partial<Record<keyof GranularConsentSettings, unknown>> | null
): GranularConsentSettings {
  return {
    necessary: true,
    analytics: input?.analytics === true,
    marketing: input?.marketing === true,
    functionality: input?.functionality === true,
  };
}

function parseFromStorage(storage: ConsentStorage): ConsentState {
  const status = storage.getItem(CONSENT_STATUS_KEY);
  if (status === "accepted") {
    return { status: "accepted", settings: { ...ACCEPTED_CONSENT_SETTINGS } };
  }
  if (status === "declined") {
    return { status: "declined", settings: { ...DEFAULT_CONSENT_SETTINGS } };
  }
  if (status === "custom") {
    const raw = storage.getItem(CONSENT_SETTINGS_KEY);
    if (!raw) return { status: "custom", settings: { ...DEFAULT_CONSENT_SETTINGS } };
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) {
      return { status: "custom", settings: { ...DEFAULT_CONSENT_SETTINGS } };
    }
    return {
      status: "custom",
      settings: cloneSettings(parsed as Partial<Record<keyof GranularConsentSettings, unknown>>),
    };
  }
  return { status: "unset", settings: { ...DEFAULT_CONSENT_SETTINGS } };
}

/**
 * Single source of truth for reading consent.
 * Fails closed on missing, declined, malformed, non-boolean or blocked storage.
 */
export function readConsentState(storage?: ConsentStorage): ConsentState {
  if (arguments.length > 0) {
    if (!storage) return { status: "unset", settings: { ...DEFAULT_CONSENT_SETTINGS } };
    try {
      return parseFromStorage(storage);
    } catch {
      return { status: "unset", settings: { ...DEFAULT_CONSENT_SETTINGS } };
    }
  }

  if (typeof window === "undefined") {
    return { status: "unset", settings: { ...DEFAULT_CONSENT_SETTINGS } };
  }

  const win = window as ConsentWindow;
  try {
    if (win.localStorage && typeof win.localStorage.getItem === "function") {
      const fromStorage = parseFromStorage(win.localStorage);
      if (fromStorage.status !== "unset") return fromStorage;
    }
  } catch {
    // Storage blocked in strict private browsing — fall through to session fallback.
  }

  if (win.__uralConsent) {
    return {
      status: win.__uralConsent.status,
      settings: cloneSettings(win.__uralConsent.settings),
    };
  }

  return { status: "unset", settings: { ...DEFAULT_CONSENT_SETTINGS } };
}

/** Central permission check required before loading any optional service or sending data. */
export function hasConsent(category: ConsentCategory, storage?: ConsentStorage): boolean {
  if (category === "necessary") return true;
  const state = arguments.length > 1 ? readConsentState(storage) : readConsentState();
  return state.settings[category] === true;
}

/** Parses a live `ural:consent-updated` event detail without requiring localStorage access. */
export function consentStateFromEvent(detail: unknown): ConsentState | null {
  if (!isPlainObject(detail)) return null;
  if (detail.status === "accepted" || detail.accepted === true) {
    return { status: "accepted", settings: { ...ACCEPTED_CONSENT_SETTINGS } };
  }
  if (detail.status === "declined" || detail.accepted === false) {
    return { status: "declined", settings: { ...DEFAULT_CONSENT_SETTINGS } };
  }
  const status: StoredConsentStatus = detail.status === "custom" ? "custom" : "custom";

  if (isPlainObject(detail.settings)) {
    return {
      status,
      settings: cloneSettings(
        detail.settings as Partial<Record<keyof GranularConsentSettings, unknown>>
      ),
    };
  }
  if (isPlainObject(detail.payload)) {
    const p = detail.payload;
    return {
      status,
      settings: {
        necessary: true,
        analytics: p.analytics_storage === "granted",
        marketing: p.ad_storage === "granted",
        functionality: p.functionality_storage === "granted",
      },
    };
  }
  return null;
}

export function consentFromEvent(category: ConsentCategory, detail: unknown): boolean {
  if (category === "necessary") return true;
  const state = consentStateFromEvent(detail);
  return state ? state.settings[category] === true : false;
}

export function buildGoogleConsentPayload(settings: GranularConsentSettings) {
  const ad = settings.marketing === true ? "granted" : "denied";
  const analytics = settings.analytics === true ? "granted" : "denied";
  const func = settings.functionality === true ? "granted" : "denied";
  return {
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
    analytics_storage: analytics,
    functionality_storage: func,
    personalization_storage: func,
    security_storage: "granted" as const,
  };
}

/** Purge non-essential localStorage entries when preferences consent is off or withdrawn. */
export function clearOptionalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    for (const key of OPTIONAL_STORAGE_KEYS) {
      window.localStorage?.removeItem?.(key);
    }
  } catch {
    // Ignore when storage is blocked.
  }
}

/** Best-effort expiry of first-party analytics/ad cookies on consent withdrawal. */
function clearDisallowedCookies(settings: GranularConsentSettings): void {
  if (typeof document === "undefined" || typeof document.cookie !== "string") return;
  if (settings.analytics && settings.marketing) return;
  try {
    const raw = document.cookie;
    if (!raw) return;
    const host =
      typeof window !== "undefined" && window.location?.hostname
        ? window.location.hostname
        : "";
    const parts = host.split(".").filter(Boolean);
    const domains = new Set<string>([""]);
    if (host && host !== "localhost" && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      domains.add(host);
      domains.add(`.${host}`);
      if (parts.length >= 3) {
        const twoLabel = parts.slice(-2).join(".");
        // Skip two-label public suffixes such as co.uk; include apex like uraltravel.co.uk.
        if (twoLabel.length > 6) domains.add(`.${twoLabel}`);
        domains.add(`.${parts.slice(-3).join(".")}`);
      } else if (parts.length === 2) {
        domains.add(`.${host}`);
      }
    }
    for (const entry of raw.split(";")) {
      const name = entry.split("=")[0]?.trim();
      if (!name) continue;
      const isAnalyticsCookie = /^(_ga($|_)|_gid$|_gat($|_))/i.test(name);
      const isMarketingCookie = /^(_gcl_|_gac_|_fbp$|_fbc$|tp_|emrld)/i.test(name);
      if ((!settings.analytics && isAnalyticsCookie) || (!settings.marketing && isMarketingCookie)) {
        for (const domain of domains) {
          const domainAttr = domain ? `; domain=${domain}` : "";
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}; SameSite=Lax`;
        }
      }
    }
  } catch {
    // Ignore in restricted environments.
  }
}

/** Remove dynamically injected optional scripts on consent withdrawal (best-effort cleanup). */
function detachDisallowedScripts(settings: GranularConsentSettings): void {
  if (typeof document === "undefined" || typeof document.querySelectorAll !== "function") return;
  if (!settings.marketing) {
    document
      .querySelectorAll(
        'script[data-ural-consent="marketing"], script[src*="emrld.ltd"], script[src*="tpemd.com"]'
      )
      .forEach((node) => node.parentNode?.removeChild(node));
  }
  if (!settings.analytics) {
    document
      .querySelectorAll(
        'script[data-ural-consent="analytics"], script[src*="googletagmanager.com/gtm.js"]'
      )
      .forEach((node) => node.parentNode?.removeChild(node));
  }
}

function pushGoogleConsentUpdate(win: ConsentWindow, settings: GranularConsentSettings) {
  const payload = buildGoogleConsentPayload(settings);
  if (typeof win.gtag === "function") {
    try {
      win.gtag("consent", "update", payload);
    } catch {
      // Ignore if gtag shim rejects in restricted environments.
    }
  } else if (settings.analytics || settings.marketing) {
    win.dataLayer = win.dataLayer || [];
    // Push standard Arguments object as required by Google Consent Mode v2.
    win.gtag = function gtagShim() {
      win.dataLayer = win.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer.push(arguments);
    };
    win.gtag("consent", "update", payload);
  }
  return payload;
}

/** Syncs the current consent state to Consent Mode, cleans disallowed resources and notifies listeners. */
export function applyConsentState(
  status: ConsentStatus,
  rawSettings: Partial<GranularConsentSettings>,
  emitEvent = true,
  useMemoryFallback = false
): ConsentState {
  const settings =
    status === "accepted"
      ? { ...ACCEPTED_CONSENT_SETTINGS }
      : status === "declined"
        ? { ...DEFAULT_CONSENT_SETTINGS }
        : cloneSettings(rawSettings);
  const state: ConsentState = { status, settings };

  if (typeof window === "undefined") return state;
  const win = window as ConsentWindow;
  win.__uralConsent = useMemoryFallback ? state : undefined;

  const payload = pushGoogleConsentUpdate(win, settings);

  if (!settings.functionality) {
    clearOptionalStorage();
  }
  clearDisallowedCookies(settings);
  detachDisallowedScripts(settings);

  if (emitEvent && typeof win.dispatchEvent === "function") {
    win.dispatchEvent(
      new CustomEvent(CONSENT_UPDATED_EVENT, {
        detail: { status, settings, payload },
      })
    );
  }

  if (emitEvent && settings.analytics && Array.isArray(win.dataLayer)) {
    win.dataLayer.push({
      event: "consent_update",
      consent_status: status,
      consent_details: payload,
    });
  }

  return state;
}

/** Persist a visitor's explicit choice (Accept All, Reject All or Custom) and broadcast it. */
export function writeConsentChoice(
  choice: "accepted" | "declined" | Partial<GranularConsentSettings>
): ConsentState {
  const status: ConsentStatus =
    choice === "accepted" ? "accepted" : choice === "declined" ? "declined" : "custom";
  const settings: GranularConsentSettings =
    status === "accepted"
      ? { ...ACCEPTED_CONSENT_SETTINGS }
      : status === "declined"
        ? { ...DEFAULT_CONSENT_SETTINGS }
        : cloneSettings(choice as Partial<GranularConsentSettings>);

  let persistedToStorage = false;
  if (typeof window !== "undefined") {
    try {
      if (window.localStorage && typeof window.localStorage.setItem === "function") {
        window.localStorage.setItem(CONSENT_STATUS_KEY, status);
        window.localStorage.setItem(CONSENT_SETTINGS_KEY, JSON.stringify(settings));
        persistedToStorage =
          typeof window.localStorage.getItem !== "function" ||
          window.localStorage.getItem(CONSENT_STATUS_KEY) === status;
      }
    } catch {
      persistedToStorage = false;
    }
  }

  return applyConsentState(status, settings, true, !persistedToStorage);
}

/** Opens the sitewide cookie-preferences dialog from any page or gated widget. */
export function openConsentPreferences(): void {
  if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
  const win = window as ConsentWindow;
  try {
    const active = typeof document !== "undefined" ? document.activeElement : null;
    if (
      active &&
      typeof (active as HTMLElement).focus === "function" &&
      active !== document.body &&
      !(active as HTMLElement).closest?.("[data-consent-banner]")
    ) {
      const el = active as HTMLElement;
      win.__uralConsentTrigger = el;
      const section = el.closest?.("section");
      win.__uralConsentFallbackFocus =
        (section?.querySelector("h2, h3, h4") as HTMLElement | null) ?? null;
    }
  } catch {
    // Ignore in restricted DOM environments.
  }
  win.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

/** Restores keyboard focus to the control that opened cookie preferences (if any). */
export function restoreConsentFocus(): void {
  if (typeof window === "undefined") return;
  const win = window as ConsentWindow;
  const trigger = win.__uralConsentTrigger;
  const fallback = win.__uralConsentFallbackFocus;
  win.__uralConsentTrigger = null;
  win.__uralConsentFallbackFocus = null;
  if (!trigger && !fallback) return;
  const run = () => {
    try {
      if (trigger?.isConnected) {
        trigger.focus({ preventScroll: true });
        return;
      }
      if (fallback?.isConnected) {
        if (!fallback.hasAttribute("tabindex")) fallback.setAttribute("tabindex", "-1");
        fallback.focus({ preventScroll: true });
      }
    } catch {
      // Ignore focus failures in restricted environments.
    }
  };
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(run);
  } else {
    run();
  }
}

/** Subscribes to same-tab and cross-tab consent updates. */
export function subscribeConsent(listener: (state: ConsentState) => void): () => void {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
    return () => {};
  }
  const onConsentEvent = (event: Event) => {
    const parsed = consentStateFromEvent((event as CustomEvent).detail);
    listener(parsed ?? readConsentState());
  };
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === CONSENT_STATUS_KEY ||
      event.key === CONSENT_SETTINGS_KEY
    ) {
      const win = window as ConsentWindow;
      win.__uralConsent = undefined;
      const next = readConsentState();
      pushGoogleConsentUpdate(win, next.settings);
      if (!next.settings.functionality) clearOptionalStorage();
      clearDisallowedCookies(next.settings);
      detachDisallowedScripts(next.settings);
      listener(next);
    }
  };
  window.addEventListener(CONSENT_UPDATED_EVENT, onConsentEvent);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentEvent);
    window.removeEventListener("storage", onStorage);
  };
}

/** Reads an optional convenience value from localStorage only when preferences consent is granted. */
export function readOptionalStorage(key: OptionalStorageKey): string | null {
  if (typeof window === "undefined" || !hasConsent("functionality")) return null;
  try {
    return window.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/** Writes an optional convenience value to localStorage only when preferences consent is granted. */
export function writeOptionalStorage(key: OptionalStorageKey, value: string): void {
  if (typeof window === "undefined" || !hasConsent("functionality")) return;
  try {
    window.localStorage?.setItem(key, value);
  } catch {
    // Ignore when storage is unavailable.
  }
}

const NOOP_UNSUBSCRIBE = () => {};

/**
 * React hook for consent-gated components.
 * Uses `getServerSnapshot` -> `false` for optional categories so prerendered HTML
 * never ships a third-party embed, while client mounts read live consent without a
 * single-frame flash or height bounce.
 */
export function useConsent(category: ConsentCategory): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      category === "necessary" ? NOOP_UNSUBSCRIBE : subscribeConsent(onStoreChange),
    [category],
  );
  const getSnapshot = useCallback(
    () => (category === "necessary" ? true : hasConsent(category)),
    [category],
  );
  const getServerSnapshot = useCallback(() => category === "necessary", [category]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
