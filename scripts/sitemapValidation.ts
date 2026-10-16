import assert from "node:assert/strict";
import { XMLParser, XMLValidator } from "fast-xml-parser";

export const SITEMAP_DECLARATION = '<?xml version="1.0" encoding="UTF-8"?>';
export const SITEMAP_NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9";

/** Parse the actual emitted bytes, not a regex approximation of an XML tree. */
export function validateSitemapPair(xml: string, text: string): string[] {
  assert(xml.startsWith(`${SITEMAP_DECLARATION}\n`), "XML declaration must be the very first line (no BOM or whitespace)");
  const validation = XMLValidator.validate(xml);
  assert.equal(validation, true, `Malformed sitemap XML: ${JSON.stringify(validation)}`);
  const document = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: false,
    trimValues: true,
    isArray: (name) => name === "url" || name === "xhtml:link",
  }).parse(xml);
  assert.deepEqual(Object.keys(document).sort(), ["?xml", "urlset"], "Sitemap must have a single urlset root");
  const root = document.urlset;
  assert.equal(root["@_xmlns"], SITEMAP_NAMESPACE, "Incorrect sitemap namespace");
  assert(Object.keys(root).every((key) => ["@_xmlns", "@_xmlns:xhtml", "url"].includes(key)), "Unexpected content outside URL blocks");
  assert(Array.isArray(root.url) && root.url.length > 0, "Sitemap must contain URL blocks");
  assert(root.url.length <= 50_000, "Sitemap exceeds the protocol URL limit");
  assert(Buffer.byteLength(xml, "utf8") <= 52_428_800, "Sitemap exceeds the protocol size limit");

  const urls: string[] = root.url.map((entry: Record<string, unknown>) => {
    assert(Object.keys(entry).every((key) => ["loc", "lastmod", "changefreq", "priority", "xhtml:link"].includes(key)), "Unexpected content inside URL block");
    for (const field of ["loc", "lastmod", "changefreq", "priority"]) {
      assert.equal(typeof entry[field], "string", `Each URL needs exactly one nested ${field} element`);
    }
    const loc = entry.loc as string;
    assert(/^https?:\/\/\S+$/.test(loc) && loc.length < 2048, "loc must be a full HTTP(S) URL");
    const url = new URL(loc);
    assert(!url.hash, "Sitemap URLs must not contain fragments");
    assert(/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(entry.lastmod as string) && Number.isFinite(Date.parse(entry.lastmod as string)), "lastmod must be a W3C date or datetime");
    assert(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].includes(entry.changefreq as string), "Invalid changefreq");
    assert(/^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(entry.priority as string), "priority must be between 0 and 1");
    if (entry["xhtml:link"]) {
      assert.equal(root["@_xmlns:xhtml"], "http://www.w3.org/1999/xhtml", "hreflang extension must declare its namespace");
    }
    return loc;
  });
  assert.equal(new Set(urls).size, urls.length, "Sitemap contains duplicate URLs");
  // Comparing the complete document also catches dates, XML markup, blank lines,
  // reordering, missing entries and accidentally XML-escaped URLs in sitemap.txt.
  assert.equal(text, `${urls.join("\n")}\n`, "sitemap.txt must contain exactly the same URLs, one per line");
  return urls;
}
