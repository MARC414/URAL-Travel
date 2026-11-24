import type { Language } from "../translations";
import { hasBengaliCounterpart, siteUrl, toEnglishBasePath } from "./localeRoutes";

/**
 * Scoped locale policy for the pages this expansion actually touches.
 *
 * The rest of the site keeps the tags it already ships (`en` / `en_US` and
 * `bn` / `bn_BD`), which is why the table below names only the homepage, the
 * Bangladesh pair and the English-only UK hub: a site-wide en-BD replacement
 * would mislabel hundreds of unrelated guides. Both runtimes read these two
 * helpers so the saved head and the head after client navigation cannot drift.
 */
export interface PageLocaleProfile {
  languageTag: string;
  ogLocale: string;
  englishHreflang: string;
}

export interface PageAlternate {
  hreflang: string;
  href: string;
}

type ProfilePair = { en: PageLocaleProfile; bn?: PageLocaleProfile };

const PROFILES: Readonly<Record<string, ProfilePair>> = {
  "/": {
    en: { languageTag: "en", ogLocale: "en_GB", englishHreflang: "en" },
    bn: { languageTag: "bn", ogLocale: "bn_BD", englishHreflang: "en" },
  },
  "/bangladesh": {
    en: { languageTag: "en-BD", ogLocale: "en_BD", englishHreflang: "en-bd" },
    bn: { languageTag: "bn-BD", ogLocale: "bn_BD", englishHreflang: "en-bd" },
  },
  "/uk": {
    // No /bn/uk page exists. A Bengali request still resolves to the real
    // English-only profile rather than fabricating a twin.
    en: { languageTag: "en-GB", ogLocale: "en_GB", englishHreflang: "en-gb" },
  },
};

const DEFAULT_PROFILES: Readonly<{ en: PageLocaleProfile; bn: PageLocaleProfile }> = {
  en: { languageTag: "en", ogLocale: "en_US", englishHreflang: "en" },
  bn: { languageTag: "bn", ogLocale: "bn_BD", englishHreflang: "en" },
};

/** hreflang for the Bengali member of a pair, or null when no twin exists. */
export function getBengaliAlternateHreflang(path: string): string | null {
  const base = toEnglishBasePath(path);
  if (!hasBengaliCounterpart(base)) return null;
  return base === "/bangladesh" ? "bn-bd" : base === "/uk" ? null : "bn";
}

/** The single source for <html lang>, og:locale and the English hreflang tag. */
export function getPageLocaleProfile(path: string, lang: Language): PageLocaleProfile {
  const base = toEnglishBasePath(path);
  const pair = PROFILES[base];
  if (base === "/uk") return pair.en;
  const key: Language = lang === "bn" && hasBengaliCounterpart(base) ? "bn" : "en";
  return pair?.[key] ?? DEFAULT_PROFILES[key];
}

/**
 * Reciprocal annotations for one page. Always contains the page's own English
 * URL and x-default; a Bengali annotation is added only when a real twin exists.
 * Callers may pass `bnAvailable` from the route table, but the locale gate still
 * wins, so no caller can publish a link that 404s.
 */
export function getPageAlternates(path: string, bnAvailable: boolean): readonly PageAlternate[] {
  const base = toEnglishBasePath(path);
  const englishHref = siteUrl(base, "en");
  const englishHreflang = getPageLocaleProfile(base, "en").englishHreflang;
  const bnHreflang = bnAvailable ? getBengaliAlternateHreflang(base) : null;
  const alternates: PageAlternate[] = [
    { hreflang: englishHreflang, href: englishHref },
  ];
  if (bnHreflang) {
    alternates.push({ hreflang: bnHreflang, href: siteUrl(base, "bn") });
  }
  alternates.push({ hreflang: "x-default", href: englishHref });
  return alternates;
}
