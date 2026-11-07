import { ratesFreshness, validateRatesPayload, type RatesPayload } from "./rateData";
export { RATES_PROVIDER, RATES_PROVIDER_URL, ratesFreshness, type RatesPayload } from "./rateData";

export const RATES_ENDPOINT = "/api/rates";
const SESSION_KEY = "ural:rates:v2";
let memory: RatesPayload | null = null;
let pending: Promise<RatesPayload | null> | null = null;
let retryAfter = 0;

export function readCachedRates(): RatesPayload | null {
  if (typeof window === "undefined") return null;
  memory = validateRatesPayload(memory);
  if (memory) return memory;
  try {
    memory = validateRatesPayload(JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || "null"));
  } catch { /* Storage may be blocked. In-memory caching still works. */ }
  return memory;
}

export function writeCachedRates(payload: RatesPayload): void {
  if (typeof window === "undefined") return;
  memory = validateRatesPayload(payload);
  if (!memory) return;
  try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(memory)); } catch { /* Optional cache. */ }
}

/** Coalesce mounted widgets; keep a dated, bounded stale copy only if a refresh fails. */
export async function loadRates(): Promise<RatesPayload | null> {
  if (typeof window === "undefined") return null;
  const cached = readCachedRates();
  if ((cached && ratesFreshness(cached) === "fresh") || Date.now() < retryAfter) return cached;
  if (pending) return pending;
  pending = (async () => {
    try {
      const response = await fetch(RATES_ENDPOINT, { cache: "no-store", signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error("Rates unavailable");
      const payload = validateRatesPayload(await response.json());
      if (!payload) throw new Error("Invalid rate data");
      writeCachedRates(payload);
      retryAfter = ratesFreshness(payload) === "stale" ? Date.now() + 300_000 : 0;
      return payload;
    } catch {
      retryAfter = Date.now() + 60_000;
      return readCachedRates();
    } finally {
      pending = null;
    }
  })();
  return pending;
}

/** Units of code per BDT. Never accept Infinity, an expired rate or a different base. */
export function quote(code: string, rates: RatesPayload | null): number | null {
  if (!rates || rates.base !== "BDT" || ratesFreshness(rates) === "expired") return null;
  const value = rates.rates[code];
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

export function convertFromBdt(amount: number, code: string, rates: RatesPayload | null): number | null {
  const rate = quote(code, rates);
  if (rate === null || !Number.isFinite(amount) || amount < 0) return null;
  const converted = amount * rate;
  return Number.isFinite(converted) ? converted : null;
}

export function rateLine(fromCode: string, toCode: string, rates: RatesPayload | null, isBn: boolean): string | null {
  const from = quote(fromCode, rates);
  const to = quote(toCode, rates);
  if (from === null || to === null) return null;
  const ratio = to / from;
  if (!Number.isFinite(ratio)) return null;
  const format = new Intl.NumberFormat(isBn ? "bn-BD" : "en-GB", { maximumSignificantDigits: 6 });
  return `${format.format(1)} ${fromCode} ≈ ${format.format(ratio)} ${toCode}`;
}

/** Attribution comes from the displayed payload, including when storage is disabled. */
export function ratesCaption(rates: RatesPayload | null, isBn: boolean): string | null {
  if (!rates || ratesFreshness(rates) === "expired") return null;
  const date = new Intl.DateTimeFormat(isBn ? "bn-BD" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  }).format(new Date(rates.timeLastUpdateUnix * 1000));
  return isBn ? `রেফারেন্স রেট · হালনাগাদ ${date} UTC` : `Reference rates · updated ${date} UTC`;
}

export function formatConverted(amount: number, code: string, rates: RatesPayload | null, isBn: boolean): string | null {
  const value = convertFromBdt(amount, code, rates);
  if (value === null) return null;
  return new Intl.NumberFormat(isBn ? "bn-BD" : "en-BD", {
    style: "currency", currency: code, maximumFractionDigits: 2,
  }).format(value);
}
