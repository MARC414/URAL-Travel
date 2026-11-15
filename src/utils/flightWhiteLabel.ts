/**
 * The white-label flight search handoff, in one small module.
 *
 * Split out of `flightSearch.ts` so entry-chunk code (the article CTA and the
 * partner strip) can build a white-label URL without dragging the airport
 * directory, the currency-preference helpers and the legacy-URL repair code
 * into the first paint. `flightSearch.ts` re-exports everything here, so
 * existing imports keep working and there is still exactly one definition.
 */

/**
 * Travelpayouts Page-type flight search, configured in the partner dashboard.
 * The provider owns hosting, TLS and booking handoffs on this subdomain.
 * Native search-code contract:
 * https://support.travelpayouts.com/hc/en-us/articles/115003710648
 */
export const FLIGHT_WHITE_LABEL = {
  origin: "https://flights.uraltravel.co.uk",
  id: 24232,
  marker: "675992",
  project: "589561",
} as const;

const CURRENCIES = new Set(["BDT", "USD", "EUR", "GBP", "SAR", "AED", "CNY"]);

/**
 * The hosted Page is an international page whose dashboard default is USD.
 * BDT is a convenience for searches departing Bangladesh, not the global
 * default; otherwise every London→New York handoff would open priced in taka.
 */
export const DEFAULT_FLIGHT_CURRENCY = "USD";

/** Includes documented child/infant suffixes when preserving an existing link. */
export function isFlightSearchCode(code: string): boolean {
  return /^[A-Z]{3}\d{4}[A-Z]{2,3}(?:\d{4})?[cwf]?[1-9]\d{0,2}$/.test(code);
}

/**
 * Travelpayouts sub_id: short, lowercase, stable, and never reused for another
 * placement. Anything outside `[a-z0-9_]` is folded rather than dropped, so two
 * different placements can never collapse into the same id by accident.
 */
export function sanitizeSubId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

/** Stable per-article sub_id for a flight CTA: `post_<slug>`. */
export function flightSubIdForSlug(slug?: string): string {
  if (!slug) return "";
  const clean = sanitizeSubId(slug);
  return clean ? `post_${clean}` : "";
}

export function buildWhiteLabelUrl({
  flightSearch = "",
  currency = DEFAULT_FLIGHT_CURRENCY,
  locale = "en",
  subId = "",
}: {
  flightSearch?: string;
  currency?: string;
  locale?: string;
  /** Per-placement attribution (Travelpayouts `sub_id`), e.g. `post_uk_pillar`. */
  subId?: string;
} = {}): string {
  const url = new URL("/", FLIGHT_WHITE_LABEL.origin);
  if (isFlightSearchCode(flightSearch)) url.searchParams.set("flightSearch", flightSearch);
  const selectedCurrency = currency.toUpperCase();
  url.searchParams.set(
    "currency",
    CURRENCIES.has(selectedCurrency) ? selectedCurrency : DEFAULT_FLIGHT_CURRENCY,
  );
  url.searchParams.set("locale", locale.toLowerCase() === "bn" ? "bn" : "en");
  // The marker rides on the hosted page itself; sub_id is what separates one
  // placement from another in the Travelpayouts report. Without it every article
  // CTA collapses into one indistinguishable row.
  if (subId) url.searchParams.set("sub_id", sanitizeSubId(subId));
  return url.toString();
}
