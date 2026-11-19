import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isPromoActive, KKDAY_PROMO, AFFILIATE_LINKS, resolvePartnerUrl } from "../src/components/AffiliatePartners";

let assertions = 0;
function test(name: string, run: () => void) {
  run();
  assertions++;
  console.log(`PASS ${name}`);
}

/** Freeze the clock, exactly as verify-build does, so expiry logic is testable. */
function withMockedNow<T>(timestamp: number, run: () => T): T {
  const realNow = Date.now;
  Date.now = () => timestamp;
  try {
    return run();
  } finally {
    Date.now = realNow;
  }
}

const appSource = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
test("the supplier menu card is retired, without retiring the partner", () => {
  // The approved navigation has no supplier callout. Mounted shared-header tests
  // cover its EN/BN output; lifecycle and routing tests below remain in force.
  assert.equal(appSource.includes("Featured Callout Card inside Mega Menu"), false);
});

test("the registry promo remains expired at the recorded date", () => {
  const now = Date.UTC(2026, 10, 6); // 6 Nov 2026
  assert.equal(withMockedNow(now, () => isPromoActive(KKDAY_PROMO.expiresAt)), false);
  assert.equal(KKDAY_PROMO.expiresAt, "2026-10-31");
});

test("registry date gating can still recognize an active campaign without a menu card", () => {
  const duringSale = Date.UTC(2026, 9, 30); // 30 Oct 2026
  assert.equal(withMockedNow(duringSale, () => isPromoActive(KKDAY_PROMO.expiresAt)), true);
});

test("KKday FUNCTIONALITY is untouched by hiding the card", () => {
  // The owner's instruction: remove the expired offer, keep the functionality.
  assert.ok(AFFILIATE_LINKS.kkday.length > 0, "KKday affiliate link was removed");
  assert.ok(AFFILIATE_LINKS.kkdayHotels.length > 0, "KKday hotels link was removed");
  const url = withMockedNow(Date.UTC(2026, 10, 6), () => resolvePartnerUrl("kkday"));
  assert.ok(url.length > 0, "resolvePartnerUrl('kkday') no longer resolves");
  // The registry still knows both KKday entries.
  const registry = readFileSync(
    new URL("../src/components/AffiliatePartners.tsx", import.meta.url),
    "utf8"
  );
  for (const key of ['id: "kkday"', 'id: "kkdayHotels"', "kkday:", "kkdayHotels:"]) {
    assert.ok(registry.includes(key), `registry entry lost: ${key}`);
  }
});

test("the /kkday-hotels page still routes and is not orphaned by this change", () => {
  assert.ok(appSource.includes('"kkday-hotels"'), "the /kkday-hotels route was dropped");
  assert.ok(
    appSource.includes('section === "kkdayHotels"'),
    "the kkdayHotels section handler was dropped"
  );
});

console.log(`\n${assertions} KKday card-expiry tests passed.`);
