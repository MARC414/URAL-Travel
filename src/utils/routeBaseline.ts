import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * R02 route preservation contract. The baseline is captured from a committed
 * revision's build, so a release can prove that old canonicals, titles, H1s and
 * body hashes survived while an explicit manifest names the only permitted
 * additions and changes. No fixture is ever replaced with an empty snapshot to
 * make a comparison pass.
 */
export interface RouteSnapshot {
  path: string;
  canonical: string;
  title: string;
  h1: string;
  bodySha256: string;
}

export interface RouteBaseline {
  sourceRevision: string;
  capturedAt: string;
  routes: RouteSnapshot[];
}

function assertNoDuplicates(routes: readonly RouteSnapshot[], name: string) {
  const seen = new Set<string>();
  for (const route of routes) {
    if (seen.has(route.path)) throw new Error(`${name} has duplicate route path: ${route.path}`);
    seen.add(route.path);
  }
}

/** Throws with the offending path in the message on any unapproved drift. */
export function assertRoutePreservation(
  before: RouteBaseline,
  after: RouteBaseline,
  allowedAddedPaths: readonly string[],
  allowedChangedPaths: readonly string[],
): void {
  assertNoDuplicates(before.routes, "baseline");
  assertNoDuplicates(after.routes, "current build");
  if (before.routes.length === 0) throw new Error("an empty baseline cannot prove preservation");

  const previous = new Map(before.routes.map((route) => [route.path, route]));
  const added = new Set(allowedAddedPaths);
  const changed = new Set(allowedChangedPaths);

  for (const path of previous.keys()) {
    if (!after.routes.some((route) => route.path === path)) {
      throw new Error(`removed route: ${path}`);
    }
  }

  for (const route of after.routes) {
    const old = previous.get(route.path);
    if (!old) {
      if (!added.has(route.path)) throw new Error(`unexpected added path: ${route.path}`);
      continue;
    }
    const fields = ["canonical", "title", "h1", "bodySha256"] as const;
    const drifted = fields.filter((field) => route[field] !== old[field]);
    if (drifted.length > 0 && !changed.has(route.path)) {
      throw new Error(`unapproved change to ${route.path}: ${drifted.join(", ")}`);
    }
  }
}

/** Build a baseline from a saved dist tree. A missing sitemap, HTML file or
 *  metadata field fails loudly; an empty baseline is never produced. */
export function captureBaselineFromDist(distDir: string, revision: string, capturedAt = new Date().toISOString()): RouteBaseline {
  const sitemapPath = path.join(distDir, "sitemap.xml");
  if (!existsSync(sitemapPath)) throw new Error(`missing sitemap: ${sitemapPath}`);
  const sitemap = readFileSync(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (locs.length === 0) throw new Error("the sitemap contains no routes");
  const decode = (value: string) =>
    value
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  const routes: RouteSnapshot[] = locs.map((loc) => {
    const url = new URL(loc);
    const pathname = decodeURIComponent(url.pathname);
    const suffix = pathname.endsWith("/") ? "index.html" : `${pathname.slice(1)}.html`;
    const file = path.join(distDir, suffix);
    if (!existsSync(file)) throw new Error(`saved HTML missing for ${loc}: ${file}`);
    const html = readFileSync(file, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    if (!main) throw new Error(`saved page has no <main> body: ${loc}`);
    const stripped = main
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    const canonical = decode(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "");
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").replace(/\s+/g, " ").trim();
    const h1 = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!canonical || !title || !h1) throw new Error(`incomplete metadata for ${loc}`);
    return {
      path: url.pathname,
      canonical,
      title,
      h1,
      bodySha256: createHash("sha256").update(stripped).digest("hex"),
    };
  });
  return { sourceRevision: revision, capturedAt, routes };
}
