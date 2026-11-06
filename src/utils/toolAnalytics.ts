import { pushDataLayerEvent } from "./analytics";

/**
 * Tool-usage events (WP4).
 *
 * WHY THIS EXISTS
 * ---------------
 * `analytics.ts` already fires `virtual_page_view`, `affiliate_partner_click`,
 * `travelpayouts_referral_click`, `whatsapp_click` and `whatsapp_inquiry`, but
 * **no tool on the site emitted a single event**. That made "does this tool earn
 * its menu slot?" unanswerable except by opinion, which is the question the
 * current work is trying to settle with evidence.
 *
 * PRIVACY CONTRACT — enforced by `scripts/test-tool-analytics.ts`
 * --------------------------------------------------------------
 * These events must never carry a reader's data. Specifically, they must NOT
 * transmit: any money amount a reader typed, free text, a destination they
 * searched, dates they entered, or anything that identifies a person.
 *
 * Only coarse, non-identifying bands are allowed:
 *   - tool id (a fixed enum)
 *   - locale ("en" | "bn")
 *   - party size as a band ("1", "2-3", "4+") — never an exact traveller count
 *   - currency codes (public, fixed set)
 *   - tier ("low" | "mid" | "high")
 *   - duration as a band ("1-3", "4-7", "8-14", "15+") — never an exact day count
 *
 * CONSENT
 * -------
 * Events are pushed to `window.dataLayer` exactly like the existing affiliate
 * events. They are gated at GA4 by Consent Mode v2, whose default-denied block
 * lives in `index.html`. That is deliberate: a code-level consent check here
 * would silently *drop* events for readers who later accept, whereas Consent
 * Mode holds them and discards them at the destination until consent is
 * granted. Do not add a second, divergent gate in this file.
 */

export type ToolId =
  | "currency-converter"
  | "budget-estimator"
  | "packing-checklist"
  | "airport-codes"
  | "flight-delay-claim";

/** Party size, coarsened so an exact traveller count never leaves the browser. */
export function partySizeBand(people: number): string {
  if (!Number.isFinite(people) || people <= 1) return "1";
  if (people <= 3) return "2-3";
  return "4+";
}

/** Trip length, coarsened so an exact duration never leaves the browser. */
export function durationBand(days: number): string {
  if (!Number.isFinite(days) || days <= 3) return "1-3";
  if (days <= 7) return "4-7";
  if (days <= 14) return "8-14";
  return "15+";
}

function locale(): "en" | "bn" {
  if (typeof window === "undefined") return "en";
  try {
    return window.location.pathname.startsWith("/bn/") ? "bn" : "en";
  } catch {
    return "en";
  }
}

function pagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.location.pathname;
  } catch {
    return undefined;
  }
}

/** A tool tab or tool page was opened. */
export function trackToolOpen(tool: ToolId): void {
  pushDataLayerEvent("tool_open", {
    tool_name: tool,
    locale: locale(),
    page_path: pagePath(),
  });
}

/**
 * A tool produced a result the reader can act on.
 * `extra` is restricted to the coarse bands above; see the privacy contract.
 */
export function trackToolResult(
  tool: ToolId,
  extra: { tier?: "low" | "mid" | "high"; currency?: string; partySize?: string; duration?: string } = {}
): void {
  const payload: Record<string, unknown> = {
    tool_name: tool,
    locale: locale(),
    page_path: pagePath(),
  };
  if (extra.tier) payload.budget_tier = extra.tier;
  if (extra.currency) payload.display_currency = extra.currency;
  if (extra.partySize) payload.party_size_band = extra.partySize;
  if (extra.duration) payload.duration_band = extra.duration;
  pushDataLayerEvent("tool_result", payload);
}

/** A tool refused to produce a number (e.g. the AI allowance ran out). */
export function trackToolLimitShown(tool: ToolId, reason: string): void {
  pushDataLayerEvent("tool_limit_shown", {
    tool_name: tool,
    reason,
    locale: locale(),
    page_path: pagePath(),
  });
}
