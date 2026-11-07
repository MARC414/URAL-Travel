/** Daily reference data for URAL's own display; cache retains a bounded stale copy. */
import {
  RATES_UPSTREAM, normalizeUpstreamRates, validateRatesPayload, ratesFreshness, ratesExpireAt,
} from "../../src/utils/rateData.ts";

const RETRY_MS = 20 * 60 * 1000;
let upstreamPending = null;

function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  return (!origin || origin === new URL(request.url).origin) && request.headers.get("Sec-Fetch-Site") !== "cross-site";
}

function reply(request, payload, status = 200) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Vary": "Origin",
  });
  if (request.headers.get("Origin") === new URL(request.url).origin) {
    headers.set("Access-Control-Allow-Origin", new URL(request.url).origin);
  }
  if (status === 503) headers.set("Retry-After", String(RETRY_MS / 1000));
  return new Response(JSON.stringify(payload), { status, headers });
}

async function fetchUpstream() {
  if (upstreamPending) return upstreamPending;
  upstreamPending = (async () => {
    try {
      const response = await fetch(RATES_UPSTREAM, { signal: AbortSignal.timeout(7000) });
      if (!response.ok) return null;
      const payload = normalizeUpstreamRates(await response.json());
      if (payload?.eol) console.warn("[ural rates] Provider end-of-life announced:", new Date(payload.eol * 1000).toISOString());
      return payload;
    } catch {
      return null;
    } finally {
      upstreamPending = null;
    }
  })();
  return upstreamPending;
}

export async function onRequestGet({ request }) {
  if (!isSameOrigin(request)) return reply(request, { unavailable: true }, 403);
  // Cache API is best-effort and per Cloudflare location, not a global daily cron.
  const cache = globalThis.caches?.default;
  const key = new Request(new URL("/api/rates-cache-v2", request.url), { method: "GET" });
  let saved = null;
  try {
    const response = await cache?.match(key);
    if (response) saved = await response.json();
  } catch { /* Cache failures still allow a direct upstream attempt. */ }

  let payload = validateRatesPayload(saved?.payload);
  if ((payload && ratesFreshness(payload) === "fresh") || (saved?.retryAt > Date.now())) {
    return reply(request, payload || { unavailable: true }, payload ? 200 : 503);
  }

  const current = await fetchUpstream();
  // A failed or older upstream response must not erase the last usable copy.
  if (current && (!payload || current.timeLastUpdateUnix >= payload.timeLastUpdateUnix)) payload = current;
  payload = validateRatesPayload(payload);
  const retryAt = !current || (payload && ratesFreshness(payload) === "stale") ? Date.now() + RETRY_MS : 0;
  const ttl = Math.max(1, Math.ceil(((payload ? ratesExpireAt(payload) : retryAt) - Date.now()) / 1000));
  try {
    await cache?.put(key, new Response(JSON.stringify({ payload, retryAt }), {
      headers: { "Content-Type": "application/json", "Cache-Control": `public, max-age=${ttl}` },
    }));
  } catch { /* The response is usable even when storage is unavailable. */ }
  return reply(request, payload || { unavailable: true }, payload ? 200 : 503);
}

export function onRequestOptions({ request }) {
  if (!isSameOrigin(request)) return reply(request, { unavailable: true }, 403);
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": new URL(request.url).origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Vary": "Origin",
  } });
}
