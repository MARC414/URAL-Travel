/** One data contract for the edge function and every browser conversion. */
export const RATES_PROVIDER = "Rates By Exchange Rate API";
export const RATES_PROVIDER_URL = "https://www.exchangerate-api.com";
export const RATES_UPSTREAM = "https://open.er-api.com/v6/latest/BDT";
export const FALLBACK_PROVIDER = "Frankfurter";
export const FALLBACK_PROVIDER_URL = "https://frankfurter.dev";
export const FALLBACK_UPSTREAM = "https://api.frankfurter.dev/v2/rates?base=BDT&quotes=USD,EUR,GBP,SAR,AED,NPR,THB,MYR,SGD,MVR";
export const RATE_DAY_MS = 86_400_000;
export const DISPLAY_CODES = ["BDT", "USD", "EUR", "GBP", "SAR", "AED", "NPR", "THB", "MYR", "SGD", "MVR"];

export interface RatesPayload {
  base: "BDT";
  rates: Record<string, number>;
  /** Exact publication time for primary; oldest daily observation at UTC midnight for fallback. */
  timeLastUpdateUnix: number;
  /** Provider's next update for primary; conservative next-midnight refresh boundary for fallback. */
  timeNextUpdateUnix: number;
  sourceDateIso: string;
  fetchedAt: string;
  provider: typeof RATES_PROVIDER | typeof FALLBACK_PROVIDER;
  /** Fallback dates are daily observations, not exact publication times. */
  dateOnly?: boolean;
  eol: number;
}

export function ratesFreshUntil(payload: RatesPayload): number {
  return Math.min(payload.timeNextUpdateUnix * 1000, Date.parse(payload.fetchedAt) + RATE_DAY_MS);
}

/** Never use more than one extra day after the expected update, or a >48h-old rate. */
export function ratesExpireAt(payload: RatesPayload): number {
  return Math.min(
    ratesFreshUntil(payload) + RATE_DAY_MS,
    payload.timeLastUpdateUnix * 1000 + 2 * RATE_DAY_MS,
    payload.eol > 0 ? payload.eol * 1000 : Infinity,
  );
}

export function ratesFreshness(payload: RatesPayload, now = Date.now()): "fresh" | "stale" | "expired" {
  if (now >= ratesExpireAt(payload)) return "expired";
  return now < ratesFreshUntil(payload) ? "fresh" : "stale";
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reject corrupt caches, wrong bases, missing dates, EOL and non-finite quotes. */
export function validateRatesPayload(data: unknown, now = Date.now()): RatesPayload | null {
  if (!record(data) || data.base !== "BDT" || ![RATES_PROVIDER, FALLBACK_PROVIDER].includes(String(data.provider)) || !record(data.rates)) return null;
  const dateOnly = data.provider === FALLBACK_PROVIDER;
  if (dateOnly && data.dateOnly !== true) return null;
  const last = data.timeLastUpdateUnix;
  const next = data.timeNextUpdateUnix;
  const eol = data.eol;
  if (typeof last !== "number" || !Number.isSafeInteger(last) || last <= 0 || last * 1000 > now + 300_000) return null;
  if (typeof next !== "number" || !Number.isSafeInteger(next) || next <= last || next - last > 172_800) return null;
  if (typeof eol !== "number" || !Number.isSafeInteger(eol) || eol < 0) return null;
  const fetched = typeof data.fetchedAt === "string" ? Date.parse(data.fetchedAt) : NaN;
  if (!Number.isFinite(fetched) || fetched > now + 300_000 || fetched < last * 1000 - 300_000) return null;
  const sourceDateIso = new Date(last * 1000).toISOString().slice(0, 10);
  if (dateOnly && (last * 1000 !== Date.parse(sourceDateIso) || next !== last + 86400 || eol !== 0)) return null;
  if (data.sourceDateIso !== sourceDateIso || data.rates.BDT !== 1) return null;

  const rates: Record<string, number> = {};
  for (const code of DISPLAY_CODES) {
    const value = data.rates[code];
    if (value === undefined) continue; // A missing currency is unavailable, never a 1:1 fallback.
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
    rates[code] = value;
  }
  if (!rates.USD || (dateOnly && !DISPLAY_CODES.every(code => code in rates))) return null;
  const payload: RatesPayload = {
    base: "BDT", rates, timeLastUpdateUnix: last, timeNextUpdateUnix: next,
    sourceDateIso, fetchedAt: new Date(fetched).toISOString(), provider: dateOnly ? FALLBACK_PROVIDER : RATES_PROVIDER, ...(dateOnly ? { dateOnly: true } : {}), eol,
  };
  return ratesFreshness(payload, now) === "expired" ? null : payload;
}

/** Provider timestamps are top-level Unix seconds. A retrieval date is not a rate date. */
export function normalizeUpstreamRates(data: unknown, now = Date.now()): RatesPayload | null {
  if (!record(data) || data.result !== "success" || data.base_code !== "BDT") return null;
  const last = data.time_last_update_unix;
  if (typeof last !== "number" || !Number.isSafeInteger(last) || last <= 0 || last * 1000 > now + 300_000) return null;
  return validateRatesPayload({
    base: "BDT", rates: data.rates,
    timeLastUpdateUnix: last, timeNextUpdateUnix: data.time_next_update_unix,
    sourceDateIso: new Date(last * 1000).toISOString().slice(0, 10),
    fetchedAt: new Date(now).toISOString(), provider: RATES_PROVIDER, eol: data.time_eol_unix,
  }, now);
}

/** Require all supported pairs. Use the oldest pair date conservatively for the
 * entire set; never upgrade an old pair using a newer pair or retrieval date. */
export function normalizeFallbackRates(data: unknown, now = Date.now()): RatesPayload | null {
  if (!Array.isArray(data)) return null;
  const rates: Record<string, number> = { BDT: 1 };
  let oldest = Infinity;
  for (const row of data) {
    if (!record(row) || row.base !== "BDT" || typeof row.quote !== "string" ||
        !DISPLAY_CODES.includes(row.quote) || row.quote === "BDT" || row.quote in rates ||
        typeof row.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.date) ||
        typeof row.rate !== "number" || !Number.isFinite(row.rate) || row.rate <= 0) return null;
    const date = Date.parse(row.date);
    if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== row.date || date > now) return null;
    oldest = Math.min(oldest, date);
    rates[row.quote] = row.rate;
  }
  if (!DISPLAY_CODES.every(code => code in rates)) return null;
  return validateRatesPayload({
    base: "BDT", rates, provider: FALLBACK_PROVIDER, dateOnly: true, eol: 0,
    timeLastUpdateUnix: oldest / 1000, timeNextUpdateUnix: oldest / 1000 + 86400,
    sourceDateIso: new Date(oldest).toISOString().slice(0, 10), fetchedAt: new Date(now).toISOString(),
  }, now);
}

export function ratesProviderUrl(payload: RatesPayload): string {
  return payload.provider === FALLBACK_PROVIDER ? FALLBACK_PROVIDER_URL : RATES_PROVIDER_URL;
}
