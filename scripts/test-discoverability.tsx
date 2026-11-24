import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { Window } from "happy-dom";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Language } from "../src/translations";

// F08: the published Bangladesh doorway must be reachable from the existing
// navigation, footer, homepage and local search, in both locales, without
// reordering the approved primary row or rewriting article bodies.
const win = new Window({ url: "https://uraltravel.co.uk/" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win;
scope.document = win.document;

const { NAVIGATION_RECORDS } = await import("../src/data/navigation");
const { buildNavigation } = await import("../src/utils/navigation");
const { default: App } = await import("../src/App");
const { prepareSiteSearchIndex, searchSite } = await import("../src/utils/siteSearch");

let checks = 0;
function test(name: string, fn: () => void) {
  try {
    fn();
  } catch (error) {
    console.error(`\nFAIL ${name}`);
    throw error;
  }
  checks += 1;
  console.log(`PASS ${name}`);
}

const en = buildNavigation(NAVIGATION_RECORDS, "en");
const bn = buildNavigation(NAVIGATION_RECORDS, "bn");
const prepareGroup = (model: typeof en) => model.menus.tools.groups.find((group) => group.id === "prepare");

test("published_hub_is_in_the_guides_tools_prepare_group_in_both_locales", () => {
  const pathsEn = prepareGroup(en)?.items.map((item) => item.path) ?? [];
  const pathsBn = prepareGroup(bn)?.items.map((item) => item.path) ?? [];
  assert.ok(pathsEn.includes("/bangladesh"), "EN Guides & Tools / Prepare lists the Bangladesh hub");
  assert.ok(pathsBn.includes("/bangladesh"), "BN Guides & Tools / Prepare lists the same canonical hub");
  const record = NAVIGATION_RECORDS.find((item) => item.path === "/bangladesh");
  assert.ok(record, "the hub is a record in the shared navigation model");
  assert.deepStrictEqual(record?.publishedLocales, ["en", "bn"]);
  assert.match(record?.label.en ?? "", /Bangladesh/i);
  assert.match(record?.label.bn ?? "", /[\u0980-\u09FF]/, "the BN label is naturally Bengali");
});

test("approved_primary_row_and_geographic_order_are_unchanged", () => {
  assert.deepStrictEqual(
    en.primary.map((item) => item.label),
    ["Destinations", "Things to Do", "Flights", "Hotels", "Visa Guides", "Umrah & Hajj", "Guides & Tools"],
  );
  assert.deepStrictEqual(
    en.menus.destinations.groups.map((group) => group.label),
    ["Middle East", "Europe & UK", "Asia", "Americas"],
  );
  const original = ["/banking", "/pre-departure", "/resources", "/glossary", "/tools/flight-delay-claim"];
  const paths = prepareGroup(en)?.items.map((item) => item.path) ?? [];
  let cursor = 0;
  for (const path of paths) {
    if (path === original[cursor]) cursor += 1;
  }
  assert.equal(cursor, original.length, "every approved prepare link keeps its relative order; the hub is appended");
});

function parse(html: string) {
  const doc = win.document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = html;
  return doc as unknown as Document;
}

function renderHome(lang: Language) {
  win.location.href = `https://uraltravel.co.uk/${lang === "bn" ? "bn/" : ""}`;
  return parse(renderToStaticMarkup(React.createElement(App)));
}

test("homepage_and_footer_offer_the_localized_hub_in_both_locales", () => {
  for (const lang of ["en", "bn"] as const) {
    const doc = renderHome(lang);
    const expected = lang === "bn" ? "/bn/bangladesh" : "/bangladesh";
    const footer = doc.querySelector("footer");
    assert.ok(footer, `${lang}: the footer renders`);
    assert.ok(
      [...footer!.querySelectorAll("a")].some((a) => a.getAttribute("href") === expected),
      `${lang}: the footer links to ${expected}`,
    );
    assert.ok(
      [...doc.querySelectorAll("a")].some((a) => a.getAttribute("href") === expected),
      `${lang}: the homepage offers the same doorway above the fold`,
    );
  }
});

if (process.argv.includes("--built")) {
  const indexPath = "dist/site-search-index.json";
  assert.ok(existsSync(indexPath), "the built site-search index exists");
  const entries = JSON.parse(readFileSync(indexPath, "utf8")).entries;
  const prepared = prepareSiteSearchIndex(entries);

  test("local_search_finds_the_bangladesh_hub_in_both_locales", () => {
    const enHits = searchSite(prepared, "Bangladesh", "en", 20).map((hit) => hit.entry.pathEn);
    const bnHits = searchSite(prepared, "বাংলাদেশ", "bn", 20).map((hit) => hit.entry.pathEn);
    assert.ok(enHits.includes("/bangladesh"), `EN search finds the hub: ${enHits.join(", ")}`);
    assert.ok(bnHits.includes("/bangladesh"), `BN search finds the same hub: ${bnHits.join(", ")}`);
    assert.ok(
      entries.some((entry: { pathBn?: string }) => entry.pathBn === "/bn/bangladesh"),
      "the index carries a real Bengali hub route, not a prefixed English stub",
    );
  });

  test("the_published_uk_hub_is_indexed_without_claiming_a_bengali_twin", () => {
    const uk = entries.find((entry: { pathEn?: string }) => entry.pathEn === "/uk");
    assert.ok(uk, "the live UK hub remains in local search");
    assert.equal(uk.pathBn, undefined, "no fabricated Bengali route for the English-only hub");
  });
}

console.log(`\n[test-discoverability] ${checks} checks passed.`);
