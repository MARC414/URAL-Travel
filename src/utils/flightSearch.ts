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
const CABIN_CODES: Record<string, string> = { economy: "", business: "c", comfort: "w", first: "f" };

interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType?: "oneway" | "roundtrip";
  cabinClass?: string;
  adults?: number;
}

function dateCode(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== iso) return "";
  return `${iso.slice(8, 10)}${iso.slice(5, 7)}`;
}

/** Empty means the form is incomplete; never invent an airport or travel date. */
export function buildFlightSearchCode({
  origin, destination, departureDate, returnDate = "", tripType = "oneway", cabinClass = "economy", adults = 1,
}: FlightSearch): string {
  const from = origin.trim().toUpperCase();
  const to = destination.trim().toUpperCase();
  const departure = dateCode(departureDate);
  const returning = tripType === "roundtrip" ? dateCode(returnDate) : "";
  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || from === to || !departure) return "";
  if (tripType === "roundtrip" && (!returning || returnDate < departureDate)) return "";
  const count = Number.isFinite(adults) ? Math.max(1, Math.min(9, Math.trunc(adults))) : 1;
  return `${from}${departure}${to}${returning}${CABIN_CODES[cabinClass] ?? ""}${count}`;
}

/** Includes documented child/infant suffixes when preserving an existing link. */
export function isFlightSearchCode(code: string): boolean {
  return /^[A-Z]{3}\d{4}[A-Z]{2,3}(?:\d{4})?[cwf]?[1-9]\d{0,2}$/.test(code);
}

export function buildWhiteLabelUrl({
  flightSearch = "", currency = "BDT", locale = "en",
}: { flightSearch?: string; currency?: string; locale?: string } = {}): string {
  const url = new URL("/", FLIGHT_WHITE_LABEL.origin);
  if (isFlightSearchCode(flightSearch)) url.searchParams.set("flightSearch", flightSearch);
  const selectedCurrency = currency.toUpperCase();
  url.searchParams.set("currency", CURRENCIES.has(selectedCurrency) ? selectedCurrency : "BDT");
  url.searchParams.set("locale", locale.toLowerCase() === "bn" ? "bn" : "en");
  return url.toString();
}

/** Old bookmarks carry shell-only origin/destination/standalone parameters. */
export function getLegacyWhiteLabelUrl(url: URL): string {
  return buildWhiteLabelUrl({
    flightSearch: url.searchParams.get("flightSearch") ?? "",
    currency: url.searchParams.get("currency") ?? "BDT",
    locale: url.searchParams.get("locale") || url.searchParams.get("lang") || "en",
  });
}
