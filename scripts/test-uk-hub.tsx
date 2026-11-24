import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { Window } from "happy-dom";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Guards the scoped /uk hub repair. The hub is a live English-only page that
// currently claims a Bengali twin, nests a second <main> landmark, lists two
// Nusuk/Bangladesh articles instead of its own UK pillar posts, and reads SERP
// copy from a table key that does not exist. Each check below fails on that
// state, so a green run proves the repair rather than describing it.
const win = new Window({ url: "https://uraltravel.co.uk/uk" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win;
scope.document = win.document;

const { default: UkHubView } = await import("../src/components/UkHubView");
const { CORE_PRIORITY_SEO_COPY } = await import("../src/utils/coreSeoCopy");
const { hasBengaliCounterpart } = await import("../src/utils/localeRoutes");
const { UK_HUB_UPDATED, CONTENT_UPDATED } = await import("../src/data/contentMeta");

const built = process.argv.includes("--built");
const distDir = "dist";

// The seven UK-reader pillar posts. The Bangladesh outbound "Europe, UK & USA"
// guide is deliberately absent: it serves a reader leaving Bangladesh.
const UK_HUB_SLUGS = [
  "hajj-2027-uk-dates-nusuk-registration-cost",
  "madinah-first-uk-umrah-routings-open-jaw-stopover",
  "ramadan-umrah-2027-uk-dates-fares-last-ten-nights",
  "uk-passport-umrah-visa-eta-evisa-waiver-step-by-step",
  "uk-to-saudi-flights-umrah-direct-or-connecting",
  "uk-umrah-packages-atol-operator-checks",
  "umrah-hajj-guide-united-kingdom-2026",
].sort();

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

const hubHtml = renderToStaticMarkup(React.createElement(UkHubView as React.ComponentType<Record<string, unknown>>, {}));
const linkedSlugs = [...hubHtml.matchAll(/href="\/blog\/([^"?#]+)"/g)].map((match) => match[1]).sort();

test("uk_hub_lists_its_seven_uk_posts_and_no_nusuk_article", () => {
  assert.deepStrictEqual(
    linkedSlugs,
    UK_HUB_SLUGS,
    "the hub must list exactly the UK pillar posts: Nusuk and Bangladesh articles belong elsewhere",
  );
});

test("uk_hub_does_not_nest_a_main_landmark", () => {
  assert.equal(
    /<main\b/i.test(hubHtml),
    false,
    "App already renders <main id=\"main-content\">; a second landmark splits the page for screen readers and crawlers",
  );
});

test("uk_hub_reads_serp_copy_from_the_shared_table", () => {
  const copy = CORE_PRIORITY_SEO_COPY["/uk"];
  assert.ok(copy, "/uk must have an entry in CORE_PRIORITY_SEO_COPY instead of falling back to inline strings");
  assert.ok(
    hubHtml.includes(copy.description),
    "the hub renders the description it declares, so the visible page and the SERP snippet cannot drift",
  );
});

test("uk_has_no_bengali_counterpart", () => {
  assert.equal(
    hasBengaliCounterpart("/uk"),
    false,
    "no /bn/uk page is generated, so the switcher and the SPA hreflang must not advertise one",
  );
});

if (built) {
  const ukPath = `${distDir}/uk.html`;
  assert.ok(existsSync(ukPath), "dist/uk.html must exist after a build");
  const ukHtml = readFileSync(ukPath, "utf8");
  const copy = CORE_PRIORITY_SEO_COPY["/uk"];

  test("built_uk_head_declares_only_an_english_cluster", () => {
    assert.match(ukHtml, /<html lang="en-GB">/, "the page declares en-GB");
    assert.match(ukHtml, /<link rel="alternate" hreflang="en-gb" href="https:\/\/uraltravel\.co\.uk\/uk" \/>/);
    assert.match(ukHtml, /<link rel="alternate" hreflang="x-default" href="https:\/\/uraltravel\.co\.uk\/uk" \/>/);
    assert.equal(
      /hreflang="(?:bn|bn-bd)"[^>]*href="https:\/\/uraltravel\.co\.uk\/uk"/.test(ukHtml),
      false,
      "an English page must not claim a Bengali alternate pointing at itself",
    );
    assert.equal(
      /hreflang="(?:bn|bn-bd)"[^>]*href="https:\/\/uraltravel\.co\.uk\/bn\/uk"/.test(ukHtml),
      false,
      "/bn/uk is not generated, so a Bengali alternate would point at a 404",
    );
  });

  test("built_uk_head_declares_the_uk_open_graph_locale", () => {
    assert.match(ukHtml, /<meta property="og:locale" content="en_GB" \/>/);
    assert.equal(
      /<meta property="og:locale:alternate" content="bn_BD" \/>/.test(ukHtml),
      false,
      "a UK page with no Bengali twin must not advertise a Bengali alternate locale",
    );
  });

  test("built_uk_page_has_one_main_landmark_and_the_uk_posts", () => {
    assert.equal((ukHtml.match(/<main\b/gi) ?? []).length, 1, "exactly one <main> landmark");
    for (const slug of UK_HUB_SLUGS) {
      assert.ok(ukHtml.includes(`/blog/${slug}`), `the saved hub links ${slug}`);
    }
    for (const slug of ["nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit", "umrah-hajj-guide-bangladesh-nusuk-bdt-cost"]) {
      assert.equal(ukHtml.includes(`/blog/${slug}`), false, `the saved hub must not list ${slug}`);
    }
  });

  test("built_uk_metadata_matches_the_shared_table", () => {
    assert.ok(copy, "the shared table entry exists");
    // The saved <title> is HTML-escaped, so compare against the escaped form.
    const escapedTitle = copy.title.replace(/&/g, "&amp;");
    assert.ok(ukHtml.includes(`<title>${escapedTitle}</title>`), "the saved title comes from the shared table");
    assert.ok(
      ukHtml.includes(`<meta name="description" content="${copy.description}" />`),
      "the saved description comes from the shared table",
    );
  });

  const sitemap = readFileSync(`${distDir}/sitemap.xml`, "utf8");
  const ukEntry = sitemap.match(/<url>\s*<loc>https:\/\/uraltravel\.co\.uk\/uk<\/loc>[\s\S]*?<\/url>/)?.[0] ?? "";

  test("sitemap_uk_entry_has_no_self_referential_bengali_alternate", () => {
    assert.ok(ukEntry, "the sitemap contains the /uk URL");
    assert.match(ukEntry, /hreflang="en-gb" href="https:\/\/uraltravel\.co\.uk\/uk"/);
    assert.match(ukEntry, /hreflang="x-default" href="https:\/\/uraltravel\.co\.uk\/uk"/);
    assert.equal(/hreflang="bn"/.test(ukEntry), false, "the sitemap must not pair /uk with a Bengali URL");
  });

  test("sitemap_uk_lastmod_is_the_hub_change_date", () => {
    assert.ok(
      UK_HUB_UPDATED,
      "the hub keeps its own change date instead of CONTENT_UPDATED",
    );
    assert.notEqual(
      UK_HUB_UPDATED,
      CONTENT_UPDATED,
      "a hub date equal to the site-wide fallback would move lastmod for every other page",
    );
    assert.match(
      ukEntry,
      new RegExp(`<lastmod>${UK_HUB_UPDATED}</lastmod>`),
      `the sitemap states the hub change date (${UK_HUB_UPDATED}), not the blog content date`,
    );
  });
}

console.log(`\n[test-uk-hub] ${checks} checks passed.`);
