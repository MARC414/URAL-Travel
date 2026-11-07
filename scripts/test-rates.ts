import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { normalizeUpstreamRates, validateRatesPayload, ratesFreshness, RATE_DAY_MS } from "../src/utils/rateData";
import { quote, rateLine, ratesCaption, formatConverted, loadRates } from "../src/utils/rates";
import { RatesNotice } from "../src/components/RatesNotice";
import { onRequestGet, onRequestOptions } from "../functions/api/rates.js";

let passed = 0;
async function test(name: string, run: () => void | Promise<void>) { await run(); passed++; console.log(`PASS ${name}`); }
const realNow = Date.now;
const realFetch = globalThis.fetch;
const cacheDescriptor = Object.getOwnPropertyDescriptor(globalThis, "caches");
const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
const start = Date.parse("2026-11-07T12:00:00Z");
let now = start;
// Synthetic FX only for directional/validation tests; never shipped to the application.
const upstream = () => ({ result: "success", base_code: "BDT", rates: { BDT: 1, USD: 0.01, EUR: 0.008, AED: 0.04 }, time_last_update_unix: start / 1000 - 3600, time_next_update_unix: start / 1000 + 23 * 3600, time_eol_unix: 0 });
const good = () => normalizeUpstreamRates(upstream(), now)!;
const request = new Request("https://uraltravel.co.uk/api/rates");
const cache = new Map<string, Response>();
let calls = 0;
function respond(body: unknown, status = 200) {
  globalThis.fetch = (async () => { calls++; return new Response(typeof body === "string" ? body : JSON.stringify(body), { status }); }) as typeof fetch;
}
try {
  Date.now = () => now;
  Object.defineProperty(globalThis, "caches", { configurable: true, value: { default: {
    match: async (key: Request) => cache.get(key.url)?.clone(),
    put: async (key: Request, value: Response) => { cache.set(key.url, value.clone()); },
  } } });
  await test("provider top-level timestamps, not retrieval time, determine the rate date", () => {
    const payload = good();
    assert.equal(payload.sourceDateIso, "2026-11-07");
    assert.equal(payload.timeLastUpdateUnix, upstream().time_last_update_unix);
    assert.equal(payload.timeNextUpdateUnix, upstream().time_next_update_unix);
    assert.equal(payload.fetchedAt, "2026-11-07T12:00:00.000Z");
    assert.equal(normalizeUpstreamRates({ result: "success", base_code: "BDT", rates: upstream().rates }), null);
  });
  await test("wrong base, provider error, corrupt timestamps and non-finite rates are rejected", () => {
    for (const patch of [
      { base_code: "USD" }, { result: "error" }, { time_last_update_unix: NaN }, { time_next_update_unix: 0 },
      { time_last_update_unix: now / 1000 + 86400 }, { time_eol_unix: now / 1000 - 1 },
      { rates: { BDT: 1, USD: Infinity } }, { rates: { BDT: 1, USD: "0.01" } },
      { rates: { BDT: 2, USD: 0.01 } }, { rates: { BDT: 1, USD: -1 } },
    ]) assert.equal(normalizeUpstreamRates({ ...upstream(), ...patch }), null, JSON.stringify(patch));
    assert.equal(validateRatesPayload({ ...good(), sourceDateIso: "2026-11-06" }), null);
  });
  await test("conversion direction and cross-currency ratios are correct", () => {
    assert.equal(rateLine("USD", "BDT", good(), false), "1 USD ≈ 100 BDT");
    assert.equal(rateLine("BDT", "USD", good(), false), "1 BDT ≈ 0.01 USD");
    assert.equal(rateLine("EUR", "USD", good(), false), "1 EUR ≈ 1.25 USD");
    assert.equal(quote("XYZ", good()), null);
    assert.equal(quote("USD", { ...good(), rates: { USD: Infinity } }), null);
    assert.equal(formatConverted(Infinity, "USD", good(), false), null);
    assert.equal(formatConverted(-1, "USD", good(), false), null);
    assert.equal(formatConverted(100, "USD", null, false), null);
  });
  await test("EN/BN attribution works without sessionStorage and links to the provider", () => {
    for (const isBn of [false, true]) {
      const caption = ratesCaption(good(), isBn)!;
      assert.ok(caption.includes("UTC"));
      assert.ok(isBn ? /[০-৯]/.test(caption) : caption.includes("7 November 2026"));
      const html = renderToStaticMarkup(React.createElement(RatesNotice, { rates: good(), isBn, fromCode: "USD" }));
      assert.ok(html.includes('href="https://www.exchangerate-api.com"'));
      assert.ok(html.includes("Rates By Exchange Rate API"));
      assert.ok(html.includes(isBn ? "লেনদেনের রেট নয়" : "not transaction rates"));
    }
  });
  await test("edge fetch is normalized, cached and keeps real Response headers", async () => {
    respond(upstream());
    calls = 0;
    const first = await onRequestGet({ request });
    assert.equal(first.status, 200);
    assert.equal((await first.json()).sourceDateIso, "2026-11-07");
    const second = await onRequestGet({ request: new Request(request, { headers: { Origin: "https://uraltravel.co.uk" } }) });
    assert.equal(calls, 1);
    assert.equal(second.headers.get("Access-Control-Allow-Origin"), "https://uraltravel.co.uk");
    assert.match(second.headers.get("Content-Type")!, /application\/json/);
    assert.equal(second.headers.get("Cache-Control"), "private, no-store");
  });
  await test("failed refresh serves the dated stale copy, backs off, then expires", async () => {
    now = start + 25 * 3600_000;
    respond("upstream unavailable", 503);
    calls = 0;
    const stale = await onRequestGet({ request });
    const payload = await stale.json();
    assert.equal(stale.status, 200);
    assert.equal(payload.sourceDateIso, "2026-11-07");
    assert.equal(ratesFreshness(payload), "stale");
    assert.match(renderToStaticMarkup(React.createElement(RatesNotice, { rates: payload, isBn: false })), /using cached rates/);
    await onRequestGet({ request });
    assert.equal(calls, 1, "a provider failure must not be retried on every request");
    now = start + 49 * 3600_000;
    const expired = await onRequestGet({ request });
    assert.equal(expired.status, 503);
    assert.deepEqual(await expired.json(), { unavailable: true });
    assert.equal(quote("USD", payload), null);
    assert.equal(ratesCaption(payload, false), null);
  });
  await test("malformed JSON, API errors and invalid rates fail closed without a cached copy", async () => {
    now = start;
    for (const body of ["not JSON", { ...upstream(), result: "error" }, { ...upstream(), base_code: "USD" }]) {
      cache.clear(); respond(body);
      const response = await onRequestGet({ request });
      assert.equal(response.status, 503);
      assert.equal(response.headers.get("Retry-After"), "1200");
      assert.deepEqual(await response.json(), { unavailable: true });
    }
  });
  await test("cross-origin reads/preflights are rejected; same-origin preflight is supported", async () => {
    const foreign = new Request(request, { headers: { Origin: "https://example.com" } });
    assert.equal((await onRequestGet({ request: foreign })).status, 403);
    assert.equal(onRequestOptions({ request: foreign }).status, 403);
    assert.equal(onRequestOptions({ request }).status, 204);
    assert.notEqual(onRequestOptions({ request }).headers.get("Access-Control-Allow-Origin"), "*");
  });
  await test("concurrent browser widgets share one request even with blocked storage", async () => {
    now = start; calls = 0;
    Object.defineProperty(globalThis, "window", { configurable: true, value: { get sessionStorage() { throw new Error("Blocked"); } } });
    respond(good());
    const responses = await Promise.all([loadRates(), loadRates(), loadRates()]);
    assert.equal(calls, 1);
    for (const payload of responses) assert.equal(payload?.sourceDateIso, "2026-11-07");
    assert.ok(ratesCaption(responses[0], false)?.includes("7 November 2026"));
  });
  await test("client keeps a bounded stale rate on failure, then returns unavailable", async () => {
    now = start + 25 * 3600_000;
    respond("offline", 503);
    assert.equal((await loadRates())?.sourceDateIso, "2026-11-07");
    now = start + 2 * RATE_DAY_MS + 1;
    assert.equal(await loadRates(), null);
  });
} finally {
  Date.now = realNow;
  globalThis.fetch = realFetch;
  if (cacheDescriptor) Object.defineProperty(globalThis, "caches", cacheDescriptor); else Reflect.deleteProperty(globalThis, "caches");
  if (windowDescriptor) Object.defineProperty(globalThis, "window", windowDescriptor); else Reflect.deleteProperty(globalThis, "window");
}
console.log(`\n${passed} exchange-rate checks passed.`);
