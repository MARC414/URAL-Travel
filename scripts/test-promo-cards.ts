import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AIRHELP_PROMO, YESIM_PROMO, AFFILIATE_LINKS } from "../src/components/AffiliatePartners";
import { PromoCard, isCampaignLive } from "../src/components/PromoCard";

for (const promo of [AIRHELP_PROMO, YESIM_PROMO]) {
  const start = Date.parse(`${promo.startsAt}T00:00:00+06:00`);
  const end = Date.parse(`${promo.expiresAt}T23:59:59.999+06:00`);
  assert.equal(isCampaignLive(promo.startsAt, promo.expiresAt, start - 1), false);
  assert.equal(isCampaignLive(promo.startsAt, promo.expiresAt, start), true);
  assert.equal(isCampaignLive(promo.startsAt, promo.expiresAt, end), true);
  assert.equal(isCampaignLive(promo.startsAt, promo.expiresAt, end + 1), false);
}
assert.equal(isCampaignLive("invalid", "invalid", Date.now()), false);
assert.equal(AIRHELP_PROMO.affiliateUrl, "https://airhelp.tpo.li/kiYHVufj");
assert.equal(YESIM_PROMO.affiliateUrl, "https://yesim.tpo.li/r76SUuQd");
assert.notEqual(AIRHELP_PROMO.affiliateUrl, AFFILIATE_LINKS.airhelp);
assert.notEqual(YESIM_PROMO.affiliateUrl, AFFILIATE_LINKS.yesim);
for (const partner of ["airhelp", "yesim"] as const) {
  for (const lang of ["en", "bn"] as const) {
    // No offer can be frozen into cached/prerendered HTML; the client checks the clock.
    assert.equal(renderToStaticMarkup(React.createElement(PromoCard, { partner, lang })), "");
  }
}
const source = readFileSync(new URL("../src/components/PromoCard.tsx", import.meta.url), "utf8");
assert.ok(source.includes('rel="noopener noreferrer sponsored"'));
assert.ok(source.includes('AFFILIATE_OFFER_REGISTRY[partner].status !== "active"'));
assert.ok(source.includes('scheduleBoundary()'));
assert.ok(!/TPO9|AHTPO11/.test(source));
for (const file of ["../src/components/AirHelpWidget.tsx", "../src/App.tsx", "../src/constants.ts", "../src/data/bengaliContent.ts", "../src/data/blogContent.ts"]) {
  assert.ok(!/AHTPO11|TPO9|AirHelp\+/.test(readFileSync(new URL(file, import.meta.url), "utf8")), `${file} contains an old or private code/name`);
}
console.log("Promo date boundaries, links, SSR, disclosure and retired-code checks passed.");
