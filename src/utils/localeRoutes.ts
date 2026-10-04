/**
 * Locale routing policy shared by the client (src/App.tsx, src/hooks/useSeoMeta.ts)
 * and the build (scripts/prerender.ts).
 *
 * The per-route Bengali *data* lives in src/data/bengaliContent.ts, which is a
 * ~390 KB lazy chunk that English visitors must never download. This module is
 * tiny and dependency-free so routing decisions can be made without pulling that
 * chunk into the entry bundle.
 */

/** Leading locale segment used by the Bengali surface ("/bn/umrah" mirrors "/umrah"). */
export const BN_PREFIX = "/bn";

/** Canonical origin for absolute URLs (canonicals, JSON-LD, share links). */
export const SITE_ORIGIN = "https://ural-travel.pages.dev";

/**
 * Route groups whose Bengali counterpart does not exist yet.
 *
 * /destinations/* has no BENGALI_DESTINATIONS_OVERRIDES (and therefore no
 * getLocalizedDestinations), so generating /bn/destinations/... would ship an
 * English-bodied bn-BD page. Until that copy is written, those pages get no
 * Bengali URL, no bn-bd hreflang tag, and no sitemap xhtml:link cluster — a
 * hreflang pointing at a 404 is worse than no hreflang at all.
 *
 * When Bengali destination guides land, remove the group here AND add the copy
 * in bengaliContent.ts; prerender requires both before it emits /bn routes.
 */
export const DEFERRED_BN_GROUPS: readonly string[] = ["/destinations"];

/** Normalises a path (or full URL) to its English base ("/bn/blog/x?y=1" → "/blog/x"). */
export function toEnglishBasePath(path: string): string {
  const withoutOrigin = String(path || "/").replace(/^https?:\/\/[^/]+/i, "") || "/";
  const pathOnly = withoutOrigin.split(/[?#]/, 1)[0] || "/";
  const withoutLocale = pathOnly.replace(/^\/bn(?=\/|$)/, "") || "/";
  const normalized = `/${withoutLocale.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

/** True when a Bengali counterpart page can be generated for this English path. */
export function hasBengaliCounterpart(path: string): boolean {
  const base = toEnglishBasePath(path);
  return !DEFERRED_BN_GROUPS.some(
    (group) => base === group || base.startsWith(`${group}/`)
  );
}

/** Builds the Bengali URL for an English path ("/umrah" → "/bn/umrah"). */
export function toBengaliPath(path: string): string {
  const withoutOrigin = String(path || "/").replace(/^https?:\/\/[^/]+/i, "") || "/";
  const match = withoutOrigin.match(/^([^?#]*)([\s\S]*)$/);
  const base = toEnglishBasePath(match?.[1] || "/");
  const rest = match?.[2] || "";
  return base === "/" ? `${BN_PREFIX}${rest}` : `${BN_PREFIX}${base}${rest}`;
}

/**
 * Absolute URL for a page path in a given locale:
 *   siteUrl("/flights", "bn") -> "https://ural-travel.pages.dev/bn/flights"
 *   siteUrl("/", "bn")        -> "https://ural-travel.pages.dev/bn/"  (matches the
 *                                home canonical the prerenderer writes)
 *
 * Only ever pass PAGE paths. Assets (/img, /assets, /og-image.jpg) are shared by
 * both locales and have no /bn variant — use them as-is.
 */
export function siteUrl(path: string, locale: "en" | "bn" = "en"): string {
  const base = toEnglishBasePath(path);
  if (locale !== "bn" || !hasBengaliCounterpart(base)) {
    return `${SITE_ORIGIN}${base}`;
  }
  return base === "/"
    ? `${SITE_ORIGIN}${BN_PREFIX}/`
    : `${SITE_ORIGIN}${toBengaliPath(base)}`;
}

/** Asset paths and root graph entity IDs are locale-agnostic; never /bn-prefix them. */
function isLocaleAgnosticUrl(pathname: string, hash = ""): boolean {
  if (/^\/(assets|img)\//.test(pathname)) return true;
  if (pathname === "/og-image.jpg") return true;
  if (/^#(organization|logo|website|\/author\/)/.test(hash)) return true;
  return /\.(jpe?g|png|webp|svg|ico|xml|txt|json|js|css|webmanifest)$/i.test(pathname);
}

/**
 * Rewrites an absolute site URL into the target locale, used to keep
 * client-rendered JSON-LD and breadcrumbs consistent with the prerendered HTML:
 *   https://ural-travel.pages.dev/flights  ->  .../bn/flights   (locale "bn")
 *   https://ural-travel.pages.dev/         ->  .../bn/          (locale "bn")
 *
 * Leaves assets and external URLs alone, and — importantly — only prefixes
 * groups that actually have a Bengali page (hasBengaliCounterpart), so a
 * deferred group like /destinations never produces a URL that 404s.
 */
export function localizePublicSiteUrl(url: string, locale: "en" | "bn"): string {
  if (locale !== "bn") return url;
  try {
    const parsed = new URL(url, SITE_ORIGIN);
    if (parsed.origin !== SITE_ORIGIN) return url;
    if (isLocaleAgnosticUrl(parsed.pathname, parsed.hash)) return url;
    const base = toEnglishBasePath(parsed.pathname);
    if (!hasBengaliCounterpart(base)) return url;
    const localizedPath = base === "/" ? `${BN_PREFIX}/` : toBengaliPath(base);
    return `${SITE_ORIGIN}${localizedPath}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

/**
 * Bengali breadcrumb labels for the hub crumbs.
 *
 * Shared by scripts/prerender.ts (build) and src/App.tsx (client) so the
 * BreadcrumbList a crawler reads from the HTML and the one React re-renders
 * after hydration use identical wording.
 */
export const BN_BREADCRUMB_LABELS: Record<string, string> = {
  Home: "হোম",
  "Flight Guides": "ফ্লাইট গাইড",
  "Hotel Guides": "হোটেল গাইড",
  "Hotel Neighborhoods": "হোটেল এলাকা",
  "Visa Guides": "ভিসা গাইড",
  Destinations: "ডেস্টিনেশন",
  "Trip Costs": "ভ্রমণ খরচ",
  "Travel Blog": "ট্রাভেল ব্লগ",
  "Umrah & Hajj Hub": "উমরাহ ও হজ",
  "Travel Tools": "ভ্রমণ টুলস",
  "Pre-Departure & Complete Sitemap": "প্রস্থান-পূর্ব প্রস্তুতি ও সাইটম্যাপ",
  "Contact Us": "যোগাযোগ",
  "Attractions & Passes": "অভিজ্ঞতা ও টিকিট",
  "Privacy & Cookie Policy": "গোপনীয়তা ও কুকি নীতিমালা",
};
