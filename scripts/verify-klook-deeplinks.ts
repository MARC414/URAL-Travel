/**
 * Live smoke test for the tracked Klook deep links.
 *
 * The build assertions prove the `?u=<target>&sub_id=<placement>` string is
 * assembled correctly. They cannot prove the Travelpayouts short link still
 * forwards that target, still carries our marker (`aff_pid=675992`), and has not
 * been retired by the partner. This script follows every curated pick link and
 * asserts the final destination, which is the only part the partner controls.
 *
 * Klook answers scripted requests with a bot-protection status (commonly 403)
 * even when the redirect is correct, so the status code is reported but only a
 * 404/410 is treated as a broken property. Run it deliberately, not on every
 * build: `npm run verify:klook:live`.
 */
import assert from "node:assert/strict";

import { AFFILIATE_LINKS, TRAVELPAYOUTS_MARKER } from "../src/components/AffiliatePartners";
import {
  KLOOK_CURATED_HOTEL_PICKS,
  buildKlookHotelDetailLink,
} from "../src/components/KlookHotelOffers";

const MARKER = TRAVELPAYOUTS_MARKER;
const TIMEOUT_MS = 25_000;

interface PickUnderTest {
  label: string;
  hotelId: string;
  subId: string;
  url: string;
}

const picks: PickUnderTest[] = Object.entries(KLOOK_CURATED_HOTEL_PICKS).flatMap(
  ([guideId, entries]) =>
    entries.map((pick) => ({
      label: `${guideId}/${pick.hotelId} ${pick.name}`,
      hotelId: pick.hotelId,
      subId: pick.subId,
      url: buildKlookHotelDetailLink(pick.hotelId, pick.subId),
    }))
);

assert(picks.length > 0, "No curated Klook hotel picks are registered, so there is nothing to smoke test");

const failures: string[] = [];
const skipped: string[] = [];

for (const pick of picks) {
  // A paused partner resolves to the fallback URL, which is not a Klook deep
  // link at all. Report that instead of pretending the redirect was tested.
  if (!pick.url.startsWith(AFFILIATE_LINKS.klookHotels)) {
    skipped.push(`${pick.label}: partner paused or fallback active (${pick.url})`);
    continue;
  }

  try {
    const response = await fetch(pick.url, {
      redirect: "follow",
      headers: {
        // Klook's edge rejects obviously scripted clients; a browser-shaped UA
        // keeps the redirect path representative.
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    const finalUrl = new URL(response.url);
    const hostOk = finalUrl.hostname === "www.klook.com" || finalUrl.hostname.endsWith(".klook.com");
    const pathOk = finalUrl.pathname.replace(/\/$/, "") === `/hotels/detail/${pick.hotelId}`;
    const markerOk = finalUrl.searchParams.get("aff_pid") === MARKER;
    const hardFailure = response.status === 404 || response.status === 410;

    if (!hostOk || !pathOk || !markerOk || hardFailure) {
      failures.push(
        `${pick.label}: host=${finalUrl.hostname} path=${finalUrl.pathname} aff_pid=${finalUrl.searchParams.get("aff_pid") ?? "missing"} status=${response.status}`
      );
      continue;
    }

    const note = response.status >= 400 ? ` (Klook answered ${response.status} for a scripted request; redirect itself is correct)` : "";
    console.log(`ok ${pick.label} -> ${finalUrl.pathname} aff_pid=${MARKER}${note}`);
  } catch (error) {
    failures.push(`${pick.label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const line of skipped) console.warn(`skip ${line}`);

if (failures.length > 0) {
  console.error(`\n[verify:klook:live] ${failures.length} of ${picks.length} deep links did not resolve to their Klook property:`);
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `[verify:klook:live] ${picks.length - skipped.length} of ${picks.length} tracked Klook deep links forwarded to the expected property with marker ${MARKER}.`
);
