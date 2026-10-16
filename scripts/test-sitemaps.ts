import assert from "node:assert/strict";
import { SITEMAP_DECLARATION, SITEMAP_NAMESPACE, validateSitemapPair } from "./sitemapValidation";

const urls = ["https://ural-travel.pages.dev/", "https://ural-travel.pages.dev/umrah?a=1&b=2"];
const text = `${urls.join("\n")}\n`;
const xml = `${SITEMAP_DECLARATION}
<urlset xmlns="${SITEMAP_NAMESPACE}" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${urls[0]}</loc>
    <lastmod>2026-10-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-bd" href="${urls[0]}" />
  </url>
  <url>
    <loc>https://ural-travel.pages.dev/umrah?a=1&amp;b=2</loc>
    <lastmod>2026-10-16T09:00:00+06:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;
assert.deepEqual(validateSitemapPair(xml, text), urls);
assert.deepEqual(validateSitemapPair(xml.replace(/ xmlns:xhtml="[^"]+"/, "").replace(/\s*<xhtml:link[^>]+\/>/, ""), text), urls);

const invalid: [string, string, string][] = [
  ["flattened text", `${urls[0]} 2026-10-16 weekly 1.0`, text],
  ["leading blank line", `\n${xml}`, text],
  ["leading space", ` ${xml}`, text],
  ["UTF-8 BOM", `\uFEFF${xml}`, text],
  ["missing closing tag", xml.replace("</urlset>", ""), text],
  ["wrong nesting", xml.replace("</loc>", "</lastmod>"), text],
  ["HTML instead of XML", "<!doctype html><html><body>Not a sitemap</body></html>", text],
  ["wrong namespace", xml.replace(SITEMAP_NAMESPACE, "https://example.com"), text],
  ["missing lastmod", xml.replace(/    <lastmod>[^<]+<\/lastmod>\n/, ""), text],
  ["missing changefreq", xml.replace(/    <changefreq>[^<]+<\/changefreq>\n/, ""), text],
  ["missing priority", xml.replace(/    <priority>[^<]+<\/priority>\n/, ""), text],
  ["repeated field", xml.replace("<priority>1.0</priority>", "<priority>1.0</priority><priority>0.7</priority>"), text],
  ["invalid priority", xml.replace("<priority>1.0</priority>", "<priority>1.1</priority>"), text],
  ["invalid frequency", xml.replace("weekly", "often"), text],
  ["unescaped ampersand", xml.replace("&amp;", "&"), text],
  ["text between URL blocks", xml.replace("</url>", "</url>oops"), text],
  ["duplicate URL", xml.replace("https://ural-travel.pages.dev/umrah?a=1&amp;b=2", urls[0]), `${urls[0]}\n${urls[0]}\n`],
  ["text includes dates", xml, `${urls[0]} 2026-10-16\n${urls[1]}\n`],
  ["text includes tags", xml, xml],
  ["text includes blank line", xml, `${text}\n`],
  ["text missing a URL", xml, `${urls[0]}\n`],
  ["text URLs reordered", xml, `${[...urls].reverse().join("\n")}\n`],
  ["text incorrectly XML-escaped", xml, text.replace("&", "&amp;")],
];
for (const [name, badXml, badText] of invalid) {
  assert.throws(() => validateSitemapPair(badXml, badText), Error, `Guard must reject ${name}`);
}
console.log(`Sitemap validation: valid XML (with/without hreflang) and ${invalid.length} negative controls passed.`);
