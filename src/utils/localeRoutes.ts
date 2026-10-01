/**
 * Locale routing policy shared by the client (src/App.tsx, src/hooks/useSeoMeta.ts)
 * and the build (scripts/prerender.ts).
 *
 * The per-route Bengali *data* lives in src/data/bengaliContent.ts, which is a
 * ~390 KB lazy chunk that English visitors must never download. This module is
 * tiny and dependency-free so routing decisions can be made without pulling that
 * chunk into the entry bundle.
 */

/** Leading locale segment used by the Bengali surface ("/bn/umrah" mirrors "/umrah"). */
export const BN_PREFIX = "/bn";

/**
 * Route groups whose Bengali counterpart does not exist yet.
 *
 * /destinations/* has no BENGALI_DESTINATIONS_OVERRIDES (and therefore no
 * getLocalizedDestinations), so generating /bn/destinations/... would ship an
 * English-bodied bn-BD page. Until that copy is written, those pages get no
 * Bengali URL, no bn-bd hreflang tag, and no sitemap xhtml:link cluster — a
 * hreflang pointing at a 404 is worse than no hreflang at all.
 *
 * When Bengali destination guides land, remove the group here AND add the copy
 * in bengaliContent.ts; prerender requires both before it emits /bn routes.
 */
export const DEFERRED_BN_GROUPS: readonly string[] = ["/destinations"];

/** Normalises a path to its English base ("/bn/blog/x?y=1" → "/blog/x"). */
export function toEnglishBasePath(path: string): string {
  const pathOnly = String(path || "/").split(/[?#]/, 1)[0] || "/";
  const withoutLocale = pathOnly.replace(/^\/bn(?=\/|$)/, "") || "/";
  const normalized = `/${withoutLocale.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

/** True when a Bengali counterpart page can be generated for this English path. */
export function hasBengaliCounterpart(path: string): boolean {
  const base = toEnglishBasePath(path);
  return !DEFERRED_BN_GROUPS.some(
    (group) => base === group || base.startsWith(`${group}/`)
  );
}

/** Builds the Bengali URL for an English path ("/umrah" → "/bn/umrah"). */
export function toBengaliPath(path: string): string {
  const match = String(path || "/").match(/^([^?#]*)([\s\S]*)$/);
  const base = toEnglishBasePath(match?.[1] || "/");
  const rest = match?.[2] || "";
  return base === "/" ? `${BN_PREFIX}${rest}` : `${BN_PREFIX}${base}${rest}`;
}
