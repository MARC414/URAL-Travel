import assert from "node:assert/strict";
import { existsSync } from "node:fs";

assert.ok(existsSync(new URL("../src/utils/navigation.ts", import.meta.url)), "Published navigation builder is missing");
const { NAVIGATION_RECORDS } = await import("../src/data/navigation");
const { buildNavigation, navigationHref, activeNavigationMenu, isNavigationPathCurrent } = await import("../src/utils/navigation");
const expected = {
  destinations: [
    ["/umrah", "/visa/saudi-arabia-visa", "/destinations/dubai-guide"],
    ["/destinations/london-guide", "/destinations/paris-guide", "/destinations/italy-guide"],
    ["/destinations/nepal-guide", "/destinations/thailand-guide", "/destinations/malaysia-guide", "/destinations/singapore-guide", "/destinations/maldives-guide", "/destinations/kashmir-guide"],
    ["/destinations/new-york-guide"],
  ],
  activities: [
    ["/experiences/asia", "/experiences/europe"],
    ["/experiences/asia?city=dubai-klook", "/experiences/asia?city=bangkok-klook", "/experiences/asia?city=singapore-kl", "/experiences/europe?city=london", "/experiences/europe?city=paris"],
    ["/attractions", "/destinations"],
  ],
  visas: [
    ["/visa/nepal-visa", "/visa/thailand-visa", "/visa/malaysia-visa", "/visa/singapore-visa", "/visa/maldives-visa"],
    ["/visa/dubai-visa", "/visa/saudi-arabia-visa"],
    ["/visa-free-countries", "/visa-assistance", "/pre-departure"],
  ],
  tools: [
    ["/blog", "/costs"],
    ["/tools/currency-converter", "/tools/budget-calculator", "/tools/packing-checklist", "/tools/airport-codes"],
    ["/banking", "/pre-departure", "/resources", "/glossary", "/tools/flight-delay-claim", "/bangladesh"],
  ],
};
let checks = 0;
function test(name: string, run: () => void) { run(); checks++; console.log(`PASS ${name}`); }
const en = buildNavigation(NAVIGATION_RECORDS, "en");
const bn = buildNavigation(NAVIGATION_RECORDS, "bn");
test("Readers scan the seven approved tasks, not suppliers", () => {
  assert.deepEqual(en.primary.map(item => item.label), ["Destinations", "Things to Do", "Flights", "Hotels", "Visa Guides", "Umrah & Hajj", "Guides & Tools"]);
  assert.deepEqual(en.utility.map(item => item.path), ["/", "/about", "/partners", "/contact"]);
  assert.deepEqual(en.menus.destinations.groups.map(group => group.label), ["Middle East", "Europe & UK", "Asia", "Americas"]);
});
for (const id of ["destinations", "activities", "visas", "tools"] as const) {
  test(`${id}: approved group destinations survive in both locales`, () => {
    assert.deepEqual(en.menus[id].groups.map(group => group.items.map(item => item.path)), expected[id]);
    assert.deepEqual(bn.menus[id].groups.map(group => group.items.map(item => item.path)), expected[id]);
    assert.ok(bn.menus[id].groups.every(group => group.items.every(item => /[\u0980-\u09FF]/.test(item.label))));
  });
}
test("Future visa discovery follows publication, including partial locale availability", () => {
  const fixture = {
    id: "test-visitor-visa", path: "/visa/test-visitor-visa", label: { en: "Test visitor visa", bn: "পরীক্ষার ভিসা" },
    publishedLocales: [] as ("en" | "bn")[], memberships: [{ menu: "visas" as const, group: "asia", order: 99 }],
  };
  const contains = (model: typeof en) => model.menus.visas.groups.some(group => group.items.some(item => item.path === fixture.path));
  assert.equal(contains(buildNavigation([...NAVIGATION_RECORDS, fixture], "en")), false);
  fixture.publishedLocales = ["en"];
  assert.equal(contains(buildNavigation([...NAVIGATION_RECORDS, fixture], "en")), true);
  assert.equal(contains(buildNavigation([...NAVIGATION_RECORDS, fixture], "bn")), false);
  fixture.publishedLocales = ["en", "bn"];
  assert.equal(contains(buildNavigation([...NAVIGATION_RECORDS, fixture], "bn")), true);
  const incomplete = { ...fixture, label: { en: "Test visitor visa", bn: "" } };
  assert.equal(contains(buildNavigation([...NAVIGATION_RECORDS, incomplete], "bn")), false, "Publication flag cannot substitute for translated copy");
});
test("Locale paths preserve city intent, acquisition queries and fragments", () => {
  assert.equal(navigationHref("/experiences/asia?city=dubai-klook&utm_source=test#tickets", "bn"), "/bn/experiences/asia?city=dubai-klook&utm_source=test#tickets");
  assert.equal(navigationHref("/bn/experiences/asia?city=dubai-klook#tickets", "bn"), "/bn/experiences/asia?city=dubai-klook#tickets");
  assert.equal(navigationHref("/bn/experiences/asia?city=dubai-klook#tickets", "en"), "/experiences/asia?city=dubai-klook#tickets");
  assert.equal(navigationHref("/", "bn"), "/bn/");
  assert.equal(navigationHref("/bn/", "en"), "/");
});
test("Route emphasis follows the visitor's actual task", () => {
  assert.equal(activeNavigationMenu("/bn/attractions/london:992434"), "activities");
  assert.equal(activeNavigationMenu("/experiences/europe?city=london"), "activities");
  assert.equal(activeNavigationMenu("/visa-assistance"), "visas");
  assert.equal(activeNavigationMenu("/banking"), "tools");
  assert.equal(activeNavigationMenu("/flights/dhaka-islamabad"), null);
  assert.equal(activeNavigationMenu("/about"), null);
  assert.equal(isNavigationPathCurrent("/", "/visa"), false);
  assert.equal(isNavigationPathCurrent("/bn/", "/"), true);
  assert.equal(isNavigationPathCurrent("/experiences/asia?city=bangkok-klook", "/experiences/asia?city=dubai-klook"), false);
  assert.equal(isNavigationPathCurrent("/experiences/asia?city=dubai-klook", "/bn/experiences/asia?city=dubai-klook&utm_source=test"), true);
});
test("Unpublished UK and Pakistan visa placeholders are absent, Pakistan destination retained", () => {
  const paths = Object.values(en.menus).flatMap(menu => menu.groups.flatMap(group => group.items.map(item => item.path)));
  assert.ok(paths.includes("/destinations/kashmir-guide"));
  assert.equal(paths.some(path => /^\/visa\/(uk|united-kingdom|pakistan)/.test(path)), false);
});
console.log(`[navigation] All ${checks} behavioural checks passed.`);
