import assert from "node:assert/strict";
import { validateSitemapPair } from "./sitemapValidation";

import { SITE_ORIGIN } from "../src/utils/localeRoutes";

// Verified against the canonical host only: the retired pages.dev hostname is
// expected to 301, and this script asserts `redirect: "error"`, so pointing it
// there would fail CI for the right reason. Deriving it from SITE_ORIGIN means
// the check follows the host instead of pinning it.
const origin = SITE_ORIGIN;
const attempts = Number(process.env.SITEMAP_VERIFY_ATTEMPTS ?? "1");
assert(Number.isInteger(attempts) && attempts >= 1 && attempts <= 30, "Attempts must be between 1 and 30");

const RETIRED_ORIGIN = "https://ural-travel.pages.dev";

function assertSitemapResponse(
  response: Response,
  url: string,
  contentType: string,
  statusExpectation: string,
): void {
  assert.equal(response.status, 200, `${url} must return HTTP 200 ${statusExpectation}`);
  assert.equal(
    response.headers.get("content-type")?.split(";")[0].trim().toLowerCase(),
    contentType,
    `${url} has the wrong Content-Type`,
  );
}

/** Canonical host: must answer 200 directly. Any redirect here is a real fault. */
async function getSitemap(file: string, contentType: string): Promise<string> {
  const url = `${origin}/${file}`;
  const response = await fetch(url, {
    headers: { "Cache-Control": "no-cache" },
    redirect: "error",
    signal: AbortSignal.timeout(20_000),
  });
  assertSitemapResponse(response, url, contentType, "without a redirect");
  // Preserve a possible UTF-8 BOM so the first-byte declaration check sees it.
  const body = Buffer.from(await response.arrayBuffer()).toString("utf8");
  console.log(`${url}: HTTP ${response.status}; Content-Type: ${response.headers.get("content-type")}`);
  return body;
}

/**
 * Retired host: must 301 to the canonical host, and the body it eventually
 * serves must match the canonical one byte-for-byte.
 *
 * This check exists because the two states that look identical from a browser
 * are opposite in Search Console: a 301 means the duplicate is closed, a 200
 * means Google is still being handed 254 URLs on the retired host with the new
 * host disowning them. `redirect: "follow"` + the final-URL assertion is how we
 * tell them apart, and it fails if Cloudflare ever stops applying the rule.
 */
async function getRedirectedSitemap(file: string, contentType: string): Promise<string> {
  const url = `${RETIRED_ORIGIN}/${file}`;
  const response = await fetch(url, {
    headers: { "Cache-Control": "no-cache" },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  assert.ok(
    response.url.startsWith(`${origin}/`),
    `${url} must 301 to ${origin}; resolved to ${response.url || "(no redirect)"}`,
  );
  assertSitemapResponse(response, url, contentType, `after a redirect to ${origin}`);
  return Buffer.from(await response.arrayBuffer()).toString("utf8");
}

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    const [xml, text] = await Promise.all([
      getSitemap("sitemap.xml", "application/xml"),
      getSitemap("sitemap.txt", "text/plain"),
    ]);
    const urls = validateSitemapPair(xml, text);
    // The retired host must now be closed, and closed *exactly*: same bytes,
    // reached through a redirect. Same check on both formats, because the
    // Bulk Redirect rule is one hostname-wide list entry — one format failing
    // means the whole rule stopped matching, not that a file is stale.
    const [retiredXml, retiredText] = await Promise.all([
      getRedirectedSitemap("sitemap.xml", "application/xml"),
      getRedirectedSitemap("sitemap.txt", "text/plain"),
    ]);
    assert.equal(retiredXml, xml, "retired-host sitemap.xml differs from the canonical one after redirect");
    assert.equal(retiredText, text, "retired-host sitemap.txt differs from the canonical one after redirect");
    console.log(`Retired host ${RETIRED_ORIGIN} 301s to the canonical origin for both sitemap formats and serves identical bytes.`);
    console.log(`Live XML has a valid declaration, sitemap namespace, and ${urls.length} nested URL records with loc, lastmod, changefreq and priority.`);
    console.log(`Live sitemap.txt contains exactly the same ${urls.length} full URLs, one per line, with no metadata or tags.`);
    console.log(`Raw XML first URL block:\n${xml.slice(0, xml.indexOf("</url>") + "</url>".length)}`);
    break;
  } catch (error) {
    if (attempt === attempts) throw error;
    console.warn(`Attempt ${attempt}/${attempts}: ${error instanceof Error ? error.message : String(error)}; retrying in 15s while Pages deploys.`);
    await new Promise((resolve) => setTimeout(resolve, 15_000));
  }
}
