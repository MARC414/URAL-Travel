import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { calculateTripCostEstimate, emptyEstimatorQuotes, estimatorReturnDate, estimatorToday, ESTIMATOR_COUNTRIES, type EstimatorInput } from "../src/utils/tripCostEstimator";
import { TripCostEstimator } from "../src/components/TripCostEstimator";
import { TRIP_COSTS_DATA, BENGALI_COSTS_OVERRIDES } from "../src/data/tripCosts";
import { CostPlanningGuide } from "../src/components/CostPlanningGuide";
import { buildFlightSearchCode } from "../src/utils/flightSearch";

let passed = 0;
function test(name: string, run: () => void) { run(); passed++; console.log(`PASS ${name}`); }
// Synthetic fixtures test arithmetic, not market prices.
const base: EstimatorInput = {
  country: "thailand", origin: "DAC", days: 5, nights: 4, rooms: 2,
  party: { adults: 2, children: 1, infants: 1 }, airfareMode: "per-adult",
  quotes: { airfare: "100.10", childAirfare: "50.20", infantAirfare: "10.30", lodging: "20.40", meals: "1.10", transport: "2.20", tickets: "3.30", childTickets: "4.40", extras: "5.50" },
  source: "Synthetic airline, hotel and personal allowances", checkedOn: "2026-11-07",
};
const calculate = (input: EstimatorInput) => calculateTripCostEstimate(input, "2026-11-07");

test("empty quotes have neither a total nor priced breakdown", () => {
  const result = calculate({ ...base, quotes: emptyEstimatorQuotes() });
  assert.equal(result.complete, false);
  assert.equal(result.missing.length, 9);
  assert.equal(result.totalBdt, null);
  assert.ok(result.lines.every((line) => line.totalBdt === null));
});
test("family costs use exact minor units, room-nights and explicit child/infant quotes", () => {
  const result = calculate(base);
  assert.equal(result.complete, true);
  assert.equal(result.totalBdt, 489.9);
  assert.equal(result.perPersonBdt, 122.48);
  assert.equal(result.lines.find((line) => line.key === "lodging")?.totalBdt, 163.2);
  assert.equal(result.lines.find((line) => line.key === "meals")?.multiplier, 15);
  assert.equal(result.lines.find((line) => line.key === "childTickets")?.totalBdt, 4.4);
});
for (const key of ["childAirfare", "infantAirfare", "childTickets"] as const) {
  test(`missing ${key} cannot produce a family total`, () => {
    const result = calculate({ ...base, quotes: { ...base.quotes, [key]: "" } });
    assert.deepEqual(result.missing, [key]);
    assert.equal(result.totalBdt, null);
  });
}
test("whole-party airfare counts once and ignores obsolete separate fare fields", () => {
  const result = calculate({ ...base, airfareMode: "whole-party", quotes: { ...base.quotes, airfare: "260.70", childAirfare: "invalid", infantAirfare: "-99" } });
  assert.equal(result.totalBdt, 489.9);
  assert.deepEqual(result.invalid, []);
});
test("child and infant quotes cannot affect an adult-only party", () => {
  const input = { ...base, party: { adults: 2, children: 0, infants: 0 } };
  assert.equal(calculate({ ...input, quotes: { ...base.quotes, childAirfare: "invalid", infantAirfare: "Infinity", childTickets: "1000000001" } }).totalBdt, calculate({ ...input, quotes: { ...base.quotes, childAirfare: "", infantAirfare: "", childTickets: "" } }).totalBdt);
});
test("explicit included/not-applicable zeros are valid", () => {
  const quotes = Object.fromEntries(Object.keys(base.quotes).map((key) => [key, "0"])) as EstimatorInput["quotes"];
  assert.equal(calculate({ ...base, quotes }).totalBdt, 0);
});
test("day trip has no hotel charge and keeps a same-day return search", () => {
  const result = calculate({ ...base, days: 1, nights: 0, quotes: { ...base.quotes, lodging: "invalid" } });
  assert.equal(result.complete, true);
  assert.equal(result.lines.find((line) => line.key === "lodging")?.totalBdt, 0);
  const returnDate = estimatorReturnDate("2026-12-07", 1);
  assert.equal(returnDate, "2026-12-07");
  assert.equal(buildFlightSearchCode({ origin: "DAC", destination: "BKK", departureDate: "2026-12-07", returnDate, tripType: "roundtrip", adults: 2 }), "DAC0712BKK07122");
});
test("return dates handle year boundaries and reject invalid calendar days", () => {
  assert.equal(estimatorReturnDate("2026-12-30", 5), "2027-01-03");
  assert.equal(estimatorReturnDate("2026-02-30", 5), "");
  assert.equal(estimatorReturnDate("2026-11-07", 31), "");
});
test("checked dates use the reader's local day across the UTC midnight boundary", () => {
  const previous = process.env.TZ;
  try {
    process.env.TZ = "Asia/Dhaka";
    const localToday = estimatorToday(new Date("2026-11-07T18:30:00Z"));
    assert.equal(localToday, "2026-11-08");
    assert.equal(calculateTripCostEstimate({ ...base, checkedOn: "2026-11-08" }, localToday).complete, true);
    assert.equal(calculateTripCostEstimate({ ...base, checkedOn: "2026-11-09" }, localToday).complete, false);
    process.env.TZ = "America/New_York";
    assert.equal(estimatorToday(new Date("2026-11-08T02:00:00Z")), "2026-11-07");
  } finally {
    if (previous === undefined) delete process.env.TZ; else process.env.TZ = previous;
  }
});
for (const value of ["-1", "Infinity", "NaN", "1e6", "1,000", "0.001", "1000000000.01", "12abc", "<script>"]) {
  test(`invalid money ${value} suppresses all monetary output`, () => {
    const result = calculate({ ...base, quotes: { ...base.quotes, lodging: value } });
    assert.deepEqual(result.invalid, ["lodging"]);
    assert.equal(result.totalBdt, null);
    assert.ok(result.lines.every((line) => line.totalBdt === null));
  });
}
for (const changed of [
  { days: 0 }, { days: 31 }, { days: NaN }, { nights: 6 }, { nights: -1 }, { rooms: 0 }, { rooms: 1.5 },
  { party: { adults: 0, children: 1, infants: 0 } }, { party: { adults: 12, children: 1, infants: 0 } },
  { party: { adults: 1, children: NaN, infants: 0 } }, { origin: "BKK" }, { origin: "" },
  { source: "" }, { checkedOn: "" }, { checkedOn: "2026-11-08" }, { checkedOn: "2026-02-29" },
] as Partial<EstimatorInput>[]) {
  test(`reject invalid trip/provenance ${JSON.stringify(changed)}`, () => assert.equal(calculate({ ...base, ...changed }).totalBdt, null));
}
test("documented 30-day/12-traveller bounds work with large valid quotes", () => {
  const quotes = Object.fromEntries(Object.keys(base.quotes).map((key) => [key, "1000000000"])) as EstimatorInput["quotes"];
  const result = calculate({ ...base, days: 30, nights: 29, rooms: 12, party: { adults: 10, children: 1, infants: 1 }, quotes });
  assert.equal(result.complete, true);
  assert.ok(Number.isFinite(result.totalBdt));
});
test("estimator and cost guides have exactly the same six destinations", () => {
  assert.deepEqual(ESTIMATOR_COUNTRIES.map((item) => item.costId).sort(), TRIP_COSTS_DATA.map((item) => item.id).sort());
});
for (const isBn of [false, true]) {
  test(`${isBn ? "BN" : "EN"} initial HTML has controls, working handoffs and no invented prices`, () => {
    const html = renderToStaticMarkup(React.createElement(TripCostEstimator, { isBn }));
    for (const id of ["trip-destination", "trip-origin", "trip-adults", "trip-children", "trip-infants", "trip-days", "trip-nights", "trip-rooms", "trip-quote-source", "trip-quote-date", "trip-display-currency"]) assert.ok(html.includes(`id="${id}"`), id);
    for (const country of ESTIMATOR_COUNTRIES) assert.ok(html.includes(`value="${country.key}"`));
    assert.ok(!html.includes("data-trip-estimate-total"));
    assert.ok(html.includes("https://flights.uraltravel.co.uk/"));
    assert.ok(html.includes(`locale=${isBn ? "bn" : "en"}`));
    assert.ok(html.includes('rel="noopener noreferrer sponsored"'));
    assert.ok(html.includes(`href="${isBn ? "/bn" : ""}/costs/thailand-costs"`));
  });
  test(`${isBn ? "BN" : "EN"} every cost guide renders its own estimator and complete editorial data`, () => {
    for (const record of TRIP_COSTS_DATA) {
      const cost = isBn ? BENGALI_COSTS_OVERRIDES[record.id] : record;
      const html = renderToStaticMarkup(React.createElement(CostPlanningGuide, { cost, isBn }));
      for (const category of cost.categories) assert.ok(html.includes(category.name.replaceAll("&", "&amp;")));
      for (const reference of cost.references) assert.ok(html.includes(reference.url));
      const country = ESTIMATOR_COUNTRIES.find((item) => item.costId === cost.id)!;
      assert.match(html, new RegExp(`<option value="${country.key}" selected=""`));
      assert.ok(!/PriceSpecification|lowBdt|midBdt|highBdt/.test(html + JSON.stringify(cost)));
      assert.ok(!/(?:BDT|USD|AED|SGD|NPR|THB|MYR|MVR)\s*[0-9০-৯]/.test(JSON.stringify(cost)), "no dateless supplier totals in syndicated cost data");
    }
  });
}
console.log(`\n${passed} Trip Cost Estimator checks passed.`);
