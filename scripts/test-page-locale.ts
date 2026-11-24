import assert from "node:assert/strict";
import {
  getBengaliAlternateHreflang,
  getPageAlternates,
  getPageLocaleProfile,
} from "../src/utils/pageLocale";

// F07: one scoped locale policy for the paths URAL actually changes, shared by
// the saved head, the mounted head and the language switcher. Untouched deep
// pages must keep the labels they already ship: a site-wide en-BD replacement
// is explicitly forbidden by the plan's global constraints.
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

test("home_en_profile_is_native_english_with_a_gb_open_graph_locale", () => {
  assert.deepStrictEqual(getPageLocaleProfile("/", "en"), {
    languageTag: "en",
    ogLocale: "en_GB",
    englishHreflang: "en",
  });
});

test("home_bn_profile_is_native_bengali_with_an_english_alternate", () => {
  assert.deepStrictEqual(getPageLocaleProfile("/bn/", "bn"), {
    languageTag: "bn",
    ogLocale: "bn_BD",
    englishHreflang: "en",
  });
});

test("bangladesh_hub_pair_has_its_own_country_tags", () => {
  assert.deepStrictEqual(getPageLocaleProfile("/bangladesh", "en"), {
    languageTag: "en-BD",
    ogLocale: "en_BD",
    englishHreflang: "en-bd",
  });
  const bn = getPageLocaleProfile("/bn/bangladesh", "bn");
  assert.deepStrictEqual(bn, { languageTag: "bn-BD", ogLocale: "bn_BD", englishHreflang: "en-bd" });
});

test("untouched_deep_pages_keep_their_shipped_en_and_bn_profiles", () => {
  assert.deepStrictEqual(getPageLocaleProfile("/visa/nepal-visa", "en"), {
    languageTag: "en",
    ogLocale: "en_US",
    englishHreflang: "en",
  });
  assert.deepStrictEqual(getPageLocaleProfile("/bn/visa/nepal-visa", "bn"), {
    languageTag: "bn",
    ogLocale: "bn_BD",
    englishHreflang: "en",
  });
});

test("uk_hub_profile_has_no_bengali_counterpart", () => {
  assert.deepStrictEqual(getPageLocaleProfile("/uk", "en"), {
    languageTag: "en-GB",
    ogLocale: "en_GB",
    englishHreflang: "en-gb",
  });
  assert.deepStrictEqual(
    getPageLocaleProfile("/uk", "bn"),
    getPageLocaleProfile("/uk", "en"),
    "a Bengali reader on /uk still gets the English-only hub's real profile",
  );
  assert.equal(getBengaliAlternateHreflang("/uk"), null, "no invented bn tag for /uk");
});

test("absolute_urls_queries_and_fragments_normalize_to_the_same_profile", () => {
  const expected = getPageLocaleProfile("/bangladesh", "en");
  for (const path of [
    "https://uraltravel.co.uk/bangladesh",
    "http://uraltravel.co.uk/bangladesh?ref=home#plan",
    "/bangladesh/",
    "/bn/bangladesh?x=1#top",
  ]) {
    assert.deepStrictEqual(getPageLocaleProfile(path, "en"), expected, `${path} normalizes to /bangladesh`);
  }
});

test("homepage_alternates_are_only_the_home_pair_and_x_default", () => {
  assert.deepStrictEqual(getPageAlternates("/", true), [
    { hreflang: "en", href: "https://uraltravel.co.uk/" },
    { hreflang: "bn", href: "https://uraltravel.co.uk/bn/" },
    { hreflang: "x-default", href: "https://uraltravel.co.uk/" },
  ]);
  assert.deepStrictEqual(
    getPageAlternates("https://uraltravel.co.uk/bn/?x=1#top", true),
    getPageAlternates("/", true),
    "the Bengali home publishes an identical, reciprocal cluster",
  );
});

test("bangladesh_alternates_are_only_the_hub_pair_and_x_default", () => {
  const alternates = getPageAlternates("/bangladesh", true);
  assert.deepStrictEqual(alternates, [
    { hreflang: "en-bd", href: "https://uraltravel.co.uk/bangladesh" },
    { hreflang: "bn-bd", href: "https://uraltravel.co.uk/bn/bangladesh" },
    { hreflang: "x-default", href: "https://uraltravel.co.uk/bangladesh" },
  ]);
  assert.equal(alternates.some((a) => a.href.endsWith("/")), false, "no cross-hub or home alternate");
});

test("uk_alternates_never_include_a_bengali_link_even_if_called_with_true", () => {
  assert.deepStrictEqual(getPageAlternates("/uk", true), [
    { hreflang: "en-gb", href: "https://uraltravel.co.uk/uk" },
    { hreflang: "x-default", href: "https://uraltravel.co.uk/uk" },
  ]);
});

test("deep_page_alternates_point_to_that_page_only", () => {
  assert.deepStrictEqual(getPageAlternates("/visa/nepal-visa", true), [
    { hreflang: "en", href: "https://uraltravel.co.uk/visa/nepal-visa" },
    { hreflang: "bn", href: "https://uraltravel.co.uk/bn/visa/nepal-visa" },
    { hreflang: "x-default", href: "https://uraltravel.co.uk/visa/nepal-visa" },
  ]);
  assert.deepStrictEqual(getPageAlternates("/visa/nepal-visa", false), [
    { hreflang: "en", href: "https://uraltravel.co.uk/visa/nepal-visa" },
    { hreflang: "x-default", href: "https://uraltravel.co.uk/visa/nepal-visa" },
  ]);
});

test("every_alternate_set_has_unique_tags_and_a_self_canonical_english_url", () => {
  for (const path of ["/", "/bangladesh", "/uk", "/visa/nepal-visa"]) {
    const alternates = getPageAlternates(path, true);
    const tags = alternates.map((a) => a.hreflang);
    assert.equal(new Set(tags).size, tags.length, `${path} has no duplicate hreflang`);
    const xDefault = alternates.find((a) => a.hreflang === "x-default");
    const english = alternates.find((a) => a.hreflang !== "x-default");
    assert.ok(xDefault && english, `${path} has x-default and an English self-alternate`);
    assert.equal(xDefault.href, english.href, `${path} x-default matches its English URL`);
  }
});

console.log(`\n[test-page-locale] ${checks} checks passed.`);
