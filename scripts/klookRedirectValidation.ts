import { isAllowedKlookTarget } from "../src/components/KlookHotelOffers";

export interface KlookRedirectCheck {
  outcome: "http-ok" | "redirect-only" | "failed";
  reason: string;
}

/** URL/HTTP evidence only: never proof of inventory, report attribution or earnings. */
export function checkKlookHotelRedirect(
  finalUrl: string,
  status: number,
  hotelId: string,
  marker: string
): KlookRedirectCheck {
  let url: URL;
  try {
    url = new URL(finalUrl);
  } catch {
    return { outcome: "failed", reason: "Malformed destination URL" };
  }
  if (!isAllowedKlookTarget(finalUrl) || url.username || url.password || url.port) {
    return { outcome: "failed", reason: "Destination is not an ordinary HTTPS Klook URL" };
  }
  if (url.pathname.replace(/\/$/, "") !== `/hotels/detail/${hotelId}`) {
    return { outcome: "failed", reason: `Wrong property path: ${url.pathname}` };
  }
  if (url.searchParams.get("aff_pid") !== marker) {
    return { outcome: "failed", reason: "Missing or incorrect affiliate marker" };
  }
  if (status >= 200 && status < 300) {
    return { outcome: "http-ok", reason: `Expected URL and marker; HTTP ${status}` };
  }
  if ([401, 403, 429].includes(status)) {
    return { outcome: "redirect-only", reason: `Expected URL and marker; HTTP ${status}, page access unverified` };
  }
  return { outcome: "failed", reason: `Unexpected HTTP ${status} at the property URL` };
}
