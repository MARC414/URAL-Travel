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
const menuSource = appSource.slice(
  appSource.indexOf("Featured Callout Card inside Mega Menu"),
  appSource.indexOf("PRIMARY TOP-LEVEL BLOG LINK")
);

test("the KKday card exists in the menu source at all", () => {
  assert.ok(menuSource.length > 500, "menu card block not found — did the anchor text change?");
});

test("the card CONTAINER is gated, not just its copy", () => {
  // The original defect: `isPromoActive` guarded the text inside the card while
  // the card's own <div> rendered unconditionally, so an expired promotion kept
  // occupying menu space. The gate must wrap the container.
  const gate = menuSource.indexOf("isPromoActive(KKDAY_PROMO.expiresAt) && (");
  const container = menuSource.indexOf('<div className="bg-white/6 border border-white/12 rounded-2xl');
  assert.ok(gate !== -1, "the card container is not wrapped in an isPromoActive gate");
  assert.ok(gate < container, "the gate must appear before the card container");
  // And the closing `)}` must come after the card's final link.
  const closing = menuSource.indexOf(")}", menuSource.indexOf("KKday 30% Sale ↗"));
  assert.ok(closing !== -1, "the gate is never closed after the card");
});

test("no dead 'evergreen fallback' copy is left behind", () => {
  // The card used to swap to "KKday Asia Travel Passes / Check terms" when the
  // promo lapsed. With the container gated that branch is unreachable, and
  // leaving it in implies a fallback that never renders.
  for (const phrase of ["Check terms", "KKday Asia Travel Passes", "KKday Passes ↗"]) {
    assert.ok(!menuSource.includes(phrase), `stale fallback copy remains: "${phrase}"`);
  }
});

test("the promo is expired as of the audit date, so the card is hidden today", () => {
  const now = Date.UTC(2026, 10, 6); // 6 Nov 2026
  assert.equal(withMockedNow(now, () => isPromoActive(KKDAY_PROMO.expiresAt)), false);
  assert.equal(KKDAY_PROMO.expiresAt, "2026-10-31");
});

test("the card returns automatically when a future campaign is live", () => {
  // Proves the gate is a real date gate rather than a permanent delete: setting
  // a future expiresAt must bring the card back without touching App.tsx.
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
