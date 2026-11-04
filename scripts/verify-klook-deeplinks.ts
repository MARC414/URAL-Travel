/**
 * Live smoke test for the tracked Klook deep links.
 *
 * The build assertions prove the `?u=<target>&sub_id=<placement>` string is
 * assembled correctly. They cannot prove the Travelpayouts short link still
 * forwards that target, still carries our marker (`aff_pid=675992`), and has not
 * been retired by the partner. This script follows every curated pick link and
 * checks the final destination and HTTP status. Automated probes use a
 * `verify_` SubID prefix to keep them distinguishable from visitor placements.
 *
 * HTTP 401/403/429 can establish URL forwarding, not readable inventory. Other
 * error responses fail the check. Neither a URL marker nor an HTTP 200 proves
 * that Travelpayouts recorded the SubID or that a booking earns commission.
 * Run deliberately, not in CI: `npm run verify:klook:live`.
 */
import assert from "node:assert/strict";

import { AFFILIATE_OFFER_REGISTRY, TRAVELPAYOUTS_MARKER } from "../src/components/AffiliatePartners";
import {
  KLOOK_CURATED_HOTEL_PICKS,
  buildKlookHotelDetailLink,
} from "../src/components/KlookHotelOffers";
import { checkKlookHotelRedirect } from "./klookRedirectValidation";

const MARKER = TRAVELPAYOUTS_MARKER;
const TIMEOUT_MS = 25_000;

assert(
  AFFILIATE_OFFER_REGISTRY.klook.status === "active" && AFFILIATE_OFFER_REGISTRY.klookHotels.status === "active",
  "[verify:klook:live] NOT RUN: a Klook programme/link is paused. No redirects were tested."
);

interface PickUnderTest {
  label: string;
  hotelId: string;
  subId: string;
  url: string;
}

const picks: PickUnderTest[] = Object.entries(KLOOK_CURATED_HOTEL_PICKS).flatMap(
  ([guideId, entries]) =>
    entries.map((pick) => {
      const subId = `verify_${pick.subId}`;
      return {
        label: `${guideId}/${pick.hotelId} ${pick.name}`,
        hotelId: pick.hotelId,
        subId,
        url: buildKlookHotelDetailLink(pick.hotelId, subId),
      };
    })
);

assert(picks.length > 0, "No curated Klook hotel picks are registered, so there is nothing to smoke test");

const failures: string[] = [];
let httpOk = 0;
let redirectOnly = 0;

for (const pick of picks) {
  try {
    const outboundUrl = new URL(pick.url);
    assert.equal(outboundUrl.searchParams.get("sub_id"), pick.subId, "Probe SubID is missing");
    assert.equal(
      outboundUrl.searchParams.get("u"),
      `https://www.klook.com/hotels/detail/${pick.hotelId}`,
      "Probe is not a property deep link"
    );
    const response = await fetch(pick.url, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const result = checkKlookHotelRedirect(response.url, response.status, pick.hotelId, MARKER);
    await response.body?.cancel();
    if (result.outcome === "failed") {
      failures.push(`${pick.label}: ${result.reason}`);
      continue;
    }
    if (result.outcome === "http-ok") httpOk++;
    else redirectOnly++;
    console.log(`${result.outcome} ${pick.label}: ${result.reason}; sub_id=${pick.subId}`);
  } catch (error) {
    failures.push(`${pick.label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error(`\n[verify:klook:live] ${failures.length} of ${picks.length} property-link checks failed:`);
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `[verify:klook:live] ${httpOk + redirectOnly}/${picks.length} redirects matched the expected property and marker ${MARKER}; ${httpOk} HTTP 2xx, ${redirectOnly} page-access checks unverified.`
);
console.log("Travelpayouts SubID reporting, bookable inventory and commissions still require separate verification. Filter verify_* probes out of visitor performance reports.");
