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

async function getSitemap(file: string, contentType: string): Promise<string> {
  const url = `${origin}/${file}`;
  const response = await fetch(url, {
    headers: { "Cache-Control": "no-cache" },
    redirect: "error",
    signal: AbortSignal.timeout(20_000),
  });
  assert.equal(response.status, 200, `${url} must return HTTP 200 without a redirect`);
  assert.equal(response.headers.get("content-type")?.split(";")[0].trim().toLowerCase(), contentType, `${url} has the wrong Content-Type`);
  // Preserve a possible UTF-8 BOM so the first-byte declaration check sees it.
  const body = Buffer.from(await response.arrayBuffer()).toString("utf8");
  console.log(`${url}: HTTP ${response.status}; Content-Type: ${response.headers.get("content-type")}`);
  return body;
}

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    const [xml, text] = await Promise.all([
      getSitemap("sitemap.xml", "application/xml"),
      getSitemap("sitemap.txt", "text/plain"),
    ]);
    const urls = validateSitemapPair(xml, text);
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
