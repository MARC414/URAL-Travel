import fs from "node:fs";
import path from "node:path";
import { Window } from "happy-dom";
import { XMLParser } from "fast-xml-parser";
import { getDepartureHub } from "../src/data/departureHubs";
import { SITE_ORIGIN } from "../src/utils/localeRoutes";

type Check = (ok: boolean, label: string) => void;
const text = (value: string | null | undefined) => (value ?? "").replace(/\s+/g, " ").trim();

function hasCommercialSchema(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasCommercialSchema);
  if (!value || typeof value !== "object") return false;
  const node = value as Record<string, unknown>;
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  return types.some(type => typeof type === "string" && /^(?:https?:\/\/schema\.org\/|schema:)?(?:Product|Offer)$/.test(type)) ||
    Object.values(node).some(hasCommercialSchema);
}

/** Tests built bytes, not route-policy promises or source-string registration. */
export function checkBangladeshHubBuild(dist: string, check: Check): void {
  const hub = getDepartureHub("bangladesh");
  check(!!hub, "Bangladesh hub: shared bilingual record exists");
  if (!hub) return;
  const xmlFile = path.join(dist, "sitemap.xml");
  const xml = fs.existsSync(xmlFile) ? fs.readFileSync(xmlFile, "utf8") : "";
  let sitemapEntries: Record<string, any>[] = [];
  try {
    const parsed = new XMLParser({ ignoreAttributes: false, parseTagValue: false, isArray: name => name === "url" || name === "xhtml:link" }).parse(xml);
    sitemapEntries = parsed.urlset?.url ?? [];
  } catch { check(false, "Bangladesh hub: sitemap XML parses"); }
  const sitemapTextFile = path.join(dist, "sitemap.txt");
  const sitemapText = fs.existsSync(sitemapTextFile) ? fs.readFileSync(sitemapTextFile, "utf8").split(/\r?\n/) : [];
  const alternates = [
    ["en-bd", `${SITE_ORIGIN}/bangladesh`],
    ["bn-bd", `${SITE_ORIGIN}/bn/bangladesh`],
    ["x-default", `${SITE_ORIGIN}/bangladesh`],
  ];

  for (const lang of ["en", "bn"] as const) {
    const prefix = lang === "bn" ? "/bn" : "";
    const pagePath = `${prefix}/bangladesh`;
    const url = `${SITE_ORIGIN}${pagePath}`;
    const file = path.join(dist, `${pagePath.slice(1)}.html`);
    check(fs.existsSync(file), `${pagePath}: saved HTML exists`);
    if (!fs.existsSync(file)) continue;
    const window = new Window({ settings: { disableJavaScriptEvaluation: true, disableJavaScriptFileLoading: true, disableCSSFileLoading: true } });
    window.document.write(fs.readFileSync(file, "utf8"));
    const document = window.document;
    const copy = hub.copy[lang];
    const content = document.querySelector(`[data-departure-hub="bangladesh"]`);
    const meta = (selector: string) => document.querySelector(selector)?.getAttribute("content");
    check(document.title === copy.title && meta('meta[name="description"]') === copy.description, `${pagePath}: localized title and description match shared copy`);
    check(document.querySelectorAll("h1").length === 1 && text(document.querySelector("h1")?.textContent) === copy.h1 && document.querySelectorAll("main").length === 1, `${pagePath}: one localized H1 and one main landmark`);
    check(!!content && text(content.textContent).includes(text(copy.intro)) && text(content.textContent).includes(text(copy.qualification)), `${pagePath}: full introduction and passport/residence qualification are visible`);
    check(document.documentElement.lang === (lang === "bn" ? "bn-BD" : "en-BD") && meta('meta[property="og:locale"]') === (lang === "bn" ? "bn_BD" : "en_BD") && meta('meta[property="og:locale:alternate"]') === (lang === "bn" ? "en_BD" : "bn_BD"), `${pagePath}: scoped HTML and complementary OG languages match client`);
    check(document.querySelector('link[rel="canonical"]')?.getAttribute("href") === url && meta('meta[property="og:url"]') === url, `${pagePath}: canonical and og:url are self-referential`);
    const headAlternates = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(link => [link.getAttribute("hreflang")!.toLowerCase(), link.getAttribute("href")]);
    check(JSON.stringify(headAlternates.sort()) === JSON.stringify([...alternates].sort()), `${pagePath}: exactly the reciprocal hub hreflang pair and x-default`);
    const sections = [...(content?.querySelectorAll("section[id]") ?? [])];
    check(JSON.stringify(sections.map(section => section.id)) === JSON.stringify(hub.sections.map(section => section.id)), `${pagePath}: same five planning sections as React`);
    const links = [...(content?.querySelectorAll("section a[href]") ?? [])];
    const expectedLinks = hub.sections.flatMap(section => section.links.map(link => ({ href: `${prefix}${link.path}`, name: link.label[lang] })));
    check(JSON.stringify(links.map(link => ({ href: link.getAttribute("href"), name: text(link.textContent) }))) === JSON.stringify(expectedLinks), `${pagePath}: visible localized guide links exactly match shared record`);
    check(expectedLinks.every(link => fs.existsSync(path.join(dist, `${link.href.slice(1)}.html`))) && (lang !== "bn" || links.every(link => /[\u0980-\u09ff]/.test(link.textContent))), `${pagePath}: every guide target is really built and Bengali anchors are translated`);
    check(content?.querySelector("a[data-hub-home]")?.getAttribute("href") === (lang === "bn" ? "/bn/" : "/"), `${pagePath}: localized international Home link`);

    const graph: Record<string, any>[] = [];
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const json = JSON.parse(script.textContent);
        graph.push(...(Array.isArray(json["@graph"]) ? json["@graph"] : [json]));
      } catch { check(false, `${pagePath}: JSON-LD parses`); }
    }
    const collection = graph.find(node => node["@type"] === "CollectionPage");
    check(collection?.["@id"] === `${url}#webpage` && collection.url === url && collection.name === copy.title && collection.description === copy.description && collection.inLanguage === (lang === "bn" ? "bn-BD" : "en-BD"), `${pagePath}: localized CollectionPage owns its WebPage ID`);
    const items = collection?.mainEntity?.itemListElement;
    check(collection?.mainEntity?.["@type"] === "ItemList" && Array.isArray(items) && JSON.stringify(items.map((item: any) => ({ href: item.url, name: item.name, position: item.position }))) === JSON.stringify(expectedLinks.map((link, index) => ({ href: `${SITE_ORIGIN}${link.href}`, name: link.name, position: index + 1 }))), `${pagePath}: ItemList positions, names and destinations match visible links`);
    const breadcrumb = graph.find(node => node["@type"] === "BreadcrumbList");
    const crumbs = breadcrumb?.itemListElement;
    // The shared breadcrumb builder correctly omits item on the final crumb.
    check(breadcrumb?.["@id"] === `${url}#breadcrumb` && Array.isArray(crumbs) && crumbs.length === 2 && crumbs[0].position === 1 && crumbs[0].item === `${SITE_ORIGIN}${lang === "bn" ? "/bn/" : "/"}` && crumbs[1].position === 2 && crumbs[1].item === undefined && crumbs[1].name === copy.h1, `${pagePath}: localized Home and hub breadcrumbs`);
    check(!hasCommercialSchema(graph), `${pagePath}: no URAL Product or Offer markup`);
    const entry = sitemapEntries.find(item => item.loc === url);
    const sitemapAlternates = (entry?.["xhtml:link"] ?? []).map((link: Record<string, string>) => [link["@_hreflang"]?.toLowerCase(), link["@_href"]]);
    check(!!entry && sitemapText.includes(url) && entry.lastmod === hub.updatedAt && entry["xhtml:link"]?.every((link: Record<string, string>) => link["@_rel"] === "alternate") && JSON.stringify(sitemapAlternates.sort()) === JSON.stringify([...alternates].sort()), `${pagePath}: XML/text sitemaps include dated reciprocal hub pair`);
    check(!fs.existsSync(path.join(dist, `${pagePath.slice(1)}/not-a-guide.html`)) && !xml.includes(`${url}/not-a-guide`), `${pagePath}: unknown child is not prerendered or listed`);
    window.close();
  }
}
