import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  partySizeBand,
  durationBand,
  trackToolOpen,
  trackToolResult,
  trackToolLimitShown,
} from "../src/utils/toolAnalytics";

let assertions = 0;
function test(name: string, run: () => void) {
  run();
  assertions++;
  console.log(`PASS ${name}`);
}

/**
 * Minimal browser shim: the analytics layer only needs `window.dataLayer`.
 * Every event the helpers emit lands here so it can be inspected.
 */
type Pushed = Record<string, unknown>;
function withWindow<T>(run: (events: Pushed[]) => T): T {
  const events: Pushed[] = [];
  const g = globalThis as unknown as { window?: unknown };
  const previous = g.window;
  g.window = {
    dataLayer: { push: (e: Pushed) => events.push(e) } as unknown as Pushed[],
    location: { pathname: "/tools/currency-converter" },
  };
  try {
    return run(events);
  } finally {
    if (previous === undefined) delete g.window;
    else g.window = previous;
  }
}

test("party size is coarsened, never an exact count", () => {
  assert.equal(partySizeBand(1), "1");
  assert.equal(partySizeBand(2), "2-3");
  assert.equal(partySizeBand(3), "2-3");
  assert.equal(partySizeBand(4), "4+");
  assert.equal(partySizeBand(12), "4+");
  assert.equal(partySizeBand(NaN), "1");
  assert.equal(partySizeBand(-5), "1");
  // no band may contain a number above 4
  for (const n of [5, 6, 7, 8, 9, 10, 11, 12]) {
    assert.ok(!/\d/.test(partySizeBand(n).replace("4+", "")), `band for ${n} leaked a count`);
  }
});

test("duration is coarsened, never an exact day count", () => {
  assert.equal(durationBand(1), "1-3");
  assert.equal(durationBand(3), "1-3");
  assert.equal(durationBand(4), "4-7");
  assert.equal(durationBand(7), "4-7");
  assert.equal(durationBand(8), "8-14");
  assert.equal(durationBand(14), "8-14");
  assert.equal(durationBand(15), "15+");
  assert.equal(durationBand(30), "15+");
  assert.equal(durationBand(NaN), "1-3");
});

test("tool_open carries a name, a locale and a path — and nothing else", () => {
  withWindow((events) => {
    trackToolOpen("budget-estimator");
    assert.equal(events.length, 1);
    const e = events[0];
    assert.equal(e.event, "tool_open");
    assert.equal(e.tool_name, "budget-estimator");
    assert.equal(e.locale, "en");
    assert.deepEqual(
      Object.keys(e).sort(),
      ["event", "locale", "page_path", "timestamp", "tool_name"]
    );
  });
});

test("Bengali routes are reported as bn", () => {
  const g = globalThis as unknown as { window?: { location: { pathname: string } } };
  const events: Pushed[] = [];
  g.window = {
    dataLayer: { push: (e: Pushed) => events.push(e) } as unknown as Pushed[],
    location: { pathname: "/bn/tools/currency-converter" },
  } as unknown as { location: { pathname: string } };
  trackToolOpen("currency-converter");
  assert.equal(events[0].locale, "bn");
  delete g.window;
});

test("tool_result sends only the allowed coarse fields", () => {
  withWindow((events) => {
    trackToolResult("budget-estimator", {
      tier: "mid",
      partySize: partySizeBand(4),
      duration: durationBand(10),
    });
    const e = events[0];
    assert.equal(e.event, "tool_result");
    assert.equal(e.budget_tier, "mid");
    assert.equal(e.party_size_band, "4+");
    assert.equal(e.duration_band, "8-14");
    assert.deepEqual(
      Object.keys(e).sort(),
      ["budget_tier", "duration_band", "event", "locale", "page_path", "party_size_band", "timestamp", "tool_name"]
    );
  });
});

test("PRIVACY: a money amount can never be transmitted", () => {
  withWindow((events) => {
    // The helpers accept no amount parameter at all. Passing one in the extra
    // object must not reach the event payload — the type forbids it, and this
    // runtime check proves the payload is built field-by-field, not spread.
    trackToolResult("currency-converter", {
      currency: "BDT",
      // Deliberately passing forbidden fields. No @ts-expect-error here: the
      // `extra` parameter is not excess-property-checked through the spread, so
      // a directive would be unused (and lint-failing). The runtime assertions
      // below are what actually prove these never reach the payload.
      amount: 160000,
      bdtAmount: 160000,
    } as never);
    const serialised = JSON.stringify(events[0]);
    assert.ok(!serialised.includes("160000"), "an amount reached the dataLayer");
    assert.ok(!/amount/i.test(serialised), "an amount field reached the dataLayer");
    assert.ok(!Object.prototype.hasOwnProperty.call(events[0], "amount"));
  });
});

test("PRIVACY: the payload key set is an allowlist, not whatever we pass", () => {
  // A substring blocklist is too blunt (it flags "tool_name" for containing
  // "name") and too weak (it cannot know a new field's meaning). An explicit
  // allowlist is the stronger guarantee: any new key must be justified here.
  const ALLOWED = new Set([
    "event",
    "timestamp",
    "tool_name",
    "locale",
    "page_path",
    "budget_tier",
    "display_currency",
    "party_size_band",
    "duration_band",
    "reason",
  ]);
  withWindow((events) => {
    trackToolResult("budget-estimator", { tier: "low", partySize: "2-3", duration: "4-7" });
    trackToolOpen("airport-codes");
    trackToolResult("currency-converter", { currency: "BDT" });
    trackToolLimitShown("budget-estimator", "daily_neuron_cap");
    assert.ok(events.length >= 4, "expected four events");
    for (const e of events) {
      for (const key of Object.keys(e)) {
        assert.ok(ALLOWED.has(key), `unexpected field "${key}" — add it to the allowlist deliberately, or remove it`);
      }
    }
    // No free-text or identifier-bearing value may be present as a VALUE either.
    const serialised = JSON.stringify(events);
    assert.ok(!/@/.test(serialised), "something looks like an email address");
    assert.ok(!/\+?\d{9,}/.test(serialised), "something looks like a phone number");
  });
});

test("tool_limit_shown records the reason, for the AI allowance message", () => {
  withWindow((events) => {
    trackToolLimitShown("budget-estimator", "daily_neuron_cap");
    assert.equal(events[0].event, "tool_limit_shown");
    assert.equal(events[0].reason, "daily_neuron_cap");
  });
});

test("events are no-ops without a window (server render, prerender)", () => {
  // The prerender calls this module's consumers; it must not throw.
  const g = globalThis as unknown as { window?: unknown };
  const previous = g.window;
  delete g.window;
  assert.doesNotThrow(() => {
    trackToolOpen("currency-converter");
    trackToolResult("packing-checklist");
    trackToolLimitShown("currency-converter", "test");
  });
  if (previous !== undefined) g.window = previous;
});

test("the component is actually wired to these helpers", () => {
  // React effects do not run under renderToStaticMarkup, so the wiring itself
  // is asserted from source. Without this, the helpers could be perfectly
  // tested and never called — which is exactly the defect WP4 exists to fix.
  const workspace = readFileSync(new URL("../src/components/InteractiveTools.tsx", import.meta.url), "utf8");
  const estimator = readFileSync(new URL("../src/components/TripCostEstimator.tsx", import.meta.url), "utf8");
  const converter = readFileSync(new URL("../src/components/CurrencyConverter.tsx", import.meta.url), "utf8");
  assert.ok(workspace.includes("<TripCostEstimator") && workspace.includes("<CurrencyConverter"), "measured tools must actually be mounted");
  const source = [workspace, estimator, converter].join("\n");
  for (const call of [
    "trackToolOpen(",
    'trackToolResult("budget-estimator"',
    'trackToolResult("currency-converter"',
    'trackToolResult("packing-checklist"',
  ]) {
    assert.ok(source.includes(call), `the tools workspace never calls ${call}`);
  }
  assert.ok(source.includes("partySizeBand("), "party size is not being banded");
  assert.ok(source.includes("durationBand("), "duration is not being banded");
  // Counts are banded at the call site; quote amounts and source notes stay local.
  const callText = estimator.match(/trackToolResult\("budget-estimator",\s*(\{[^}]+\})\)/)?.[1] ?? "";
  assert.ok(callText);
  for (const [raw, wrapper] of [["result.travellers", "partySizeBand("], ["days", "durationBand("]] as const) {
    let index = callText.indexOf(raw);
    while (index !== -1) {
      const before = callText.slice(Math.max(0, index - wrapper.length), index);
      assert.equal(before, wrapper, `${raw} is passed to the tracker without ${wrapper}`);
      index = callText.indexOf(raw, index + 1);
    }
  }

  // visa-checker is scheduled for removal under WP1; do not instrument it.
  assert.ok(!/trackTool\w*\(\s*["']visa-checker/.test(source), "removed tool is instrumented");
});

console.log(`\n${assertions} tool-analytics tests passed.`);
