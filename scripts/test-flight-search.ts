import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildFlightSearchCode, buildWhiteLabelUrl, getLegacyWhiteLabelUrl, FLIGHT_WHITE_LABEL } from "../src/utils/flightSearch";
import { onRequest } from "../functions/_middleware.js";
import TravelpayoutsWidget from "../src/components/TravelpayoutsWidget.jsx";
import { TravelpayoutsCustomWidget } from "../src/components/TravelpayoutsCustomWidget";

const trip = { origin: "DAC", destination: "BKK", departureDate: "2027-11-15", returnDate: "2027-11-22", adults: 3 };
assert.equal(buildFlightSearchCode(trip), "DAC1511BKK3", "one-way ignores an unused return date");
assert.equal(buildFlightSearchCode({ ...trip, tripType: "roundtrip", cabinClass: "business" }), "DAC1511BKK2211c3");
assert.equal(buildFlightSearchCode({ ...trip, origin: "lhr", destination: "jfk", cabinClass: "comfort" }), "LHR1511JFKw3");
assert.equal(buildFlightSearchCode({ ...trip, cabinClass: "first" }), "DAC1511BKKf3");
assert.equal(buildFlightSearchCode({ ...trip, departureDate: "2028-02-29" }), "DAC2902BKK3");
assert.equal(buildFlightSearchCode({ ...trip, departureDate: "2027-12-30", returnDate: "2028-01-05", tripType: "roundtrip" }), "DAC3012BKK05013");
for (const invalid of [
  { departureDate: "" }, { departureDate: "2027-02-29" }, { departureDate: "2027-04-31" },
  { origin: "Dhaka" }, { destination: "" }, { destination: "DAC" },
  { tripType: "roundtrip" as const, returnDate: "" },
  { tripType: "roundtrip" as const, returnDate: "2027-11-14" },
]) assert.equal(buildFlightSearchCode({ ...trip, ...invalid }), "", JSON.stringify(invalid));
for (const [adults, expected] of [[0, 1], [12, 9], [2.8, 2], [NaN, 1], [Infinity, 1]]) {
  assert.equal(buildFlightSearchCode({ ...trip, adults }), `DAC1511BKK${expected}`);
}
for (const locale of ["en", "bn"]) {
  for (const currency of ["BDT", "USD", "EUR", "GBP", "SAR", "AED"]) {
    const url = new URL(buildWhiteLabelUrl({ flightSearch: "DAC1511BKK2211c3", currency, locale }));
    assert.equal(url.origin, "https://flights.uraltravel.co.uk");
    assert.equal(url.searchParams.get("flightSearch"), "DAC1511BKK2211c3");
    assert.equal(url.searchParams.get("currency"), currency);
    assert.equal(url.searchParams.get("locale"), locale);
    assert.equal(url.searchParams.size, 3, "no invented marker, SubID or shell parameters");
  }
}

const bridge = fs.readFileSync(new URL("../public/travelpayouts-wl.html", import.meta.url), "utf8");
const bridgeScript = bridge.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(bridgeScript);
assert.ok(!/wl_web|22462|document\.cookie|window\.fetch/.test(bridge), "retired engine and patches cannot load");
const bookmarks = [
  "?origin=DAC&destination=BKK&flightSearch=DAC1511BKK2211c3&currency=GBP&standalone=1",
  "?flightSearch=MOW1607IST2007c321&locale=bn&currency=bdt",
  "?flightSearch=MOW1607ROc1&lang=BN&currency=SAR",
  "?flightSearch=DAC1511JEDw101&currency=AED",
  "?flightSearch=DAC1511BKK1&locale=&lang=bn&currency=EUR",
  "?flightSearch=<script>alert(1)</script>&currency=bogus&locale=invalid&url=https://example.org",
  "?origin=DAC&destination=BKK",
  "",
];
for (const suffix of bookmarks) {
  for (const pathname of ["/travelpayouts-wl.html", "/travelpayouts-wl"]) {
    const url = new URL(pathname + suffix, "https://uraltravel.co.uk");
    const expected = getLegacyWhiteLabelUrl(url);
    const response = await onRequest({ request: new Request(url), next: () => new Response("asset") });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("Location"), expected);
    const framed = await onRequest({ request: new Request(url, { headers: { "Sec-Fetch-Dest": "iframe" } }), next: () => new Response("bridge") });
    assert.equal(await framed.text(), "bridge", "old cached iframe must get a top-level continuation link");
    for (const inFrame of [false, true]) {
      const nodes: Record<string, { href?: string; textContent?: string }> = {};
      let redirected: string | undefined;
      const window: Record<string, unknown> = { location: { href: url.href, replace: (href: string) => { redirected = href; } } };
      window.top = inFrame ? {} : window;
      const document = { documentElement: { lang: "en" }, title: "", getElementById: (id: string) => nodes[id] ??= {} };
      vm.runInNewContext(bridgeScript, { URL, window, document });
      assert.equal(nodes["continue-search"].href, expected);
      assert.equal(redirected, inFrame ? undefined : expected);
      assert.equal(document.documentElement.lang, new URL(expected).searchParams.get("locale"));
    }
  }
}
const routes = JSON.parse(fs.readFileSync(new URL("../public/_routes.json", import.meta.url), "utf8"));
assert.ok(routes.include.includes("/travelpayouts-wl.html") && routes.include.includes("/travelpayouts-wl"));
const legacyTool = await onRequest({ request: new Request("https://uraltravel.co.uk/tools?tab=currency&utm_source=test"), next: () => new Response("asset") });
assert.equal(legacyTool.headers.get("Location"), "https://uraltravel.co.uk/tools/currency-converter?utm_source=test");

for (const lang of ["en", "bn"] as const) {
  for (const showInlineResults of [false, true]) {
    for (const element of [
      React.createElement(TravelpayoutsWidget as React.ComponentType<any>, { lang, showInlineResults, showQuickRoutes: false }),
      React.createElement(TravelpayoutsCustomWidget as React.ComponentType<any>, { lang, showInlineResults, initialTo: "Bangkok (BKK)", showFlightProviderHandoffs: true }),
    ]) {
      const html = renderToStaticMarkup(element);
      const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/flights\.uraltravel\.co\.uk[^\"]*)"[^>]*>/g)];
      assert.ok(links.length > 0);
      for (const [tag, href] of links) {
        const url = new URL(href.replace(/&amp;/g, "&"));
        assert.equal(url.origin, FLIGHT_WHITE_LABEL.origin);
        assert.equal(url.searchParams.get("locale"), lang);
        assert.equal(url.searchParams.get("currency"), "BDT");
        assert.match(tag, /target="_blank"/);
        assert.match(tag, /rel="noopener noreferrer sponsored"/);
      }
      assert.ok(!/<iframe|travelpayouts-wl|22462/.test(html), "both rendering modes use hosted handoffs");
    }
  }
}
console.log("Flight search: native date/cabin/adult encoding, EN/BN currencies, legacy redirects, cached iframe recovery and both widgets passed.");
