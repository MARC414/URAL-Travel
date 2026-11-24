import assert from "node:assert/strict";
import {
  assertRoutePreservation,
  type RouteBaseline,
  type RouteSnapshot,
} from "../src/utils/routeBaseline";

const route = (path: string, over: Partial<RouteSnapshot> = {}): RouteSnapshot => ({
  path,
  canonical: `https://uraltravel.co.uk${path}`,
  title: `Title ${path}`,
  h1: `Heading ${path}`,
  bodySha256: `sha-${path}`,
  ...over,
});
const baseline = (routes: RouteSnapshot[]): RouteBaseline => ({
  sourceRevision: "16c92ad",
  capturedAt: "2026-11-24T00:00:00Z",
  routes,
});

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

test("a removed old route fails", () => {
  assert.throws(
    () => assertRoutePreservation(baseline([route("/visa"), route("/flights")]), baseline([route("/visa")]), [], []),
    /removed route/i,
  );
});

test("a changed canonical fails", () => {
  assert.throws(
    () =>
      assertRoutePreservation(
        baseline([route("/visa")]),
        baseline([route("/visa", { canonical: "https://uraltravel.co.uk/other" })]),
        [],
        [],
      ),
    /canonical/i,
  );
});

test("duplicate paths fail", () => {
  assert.throws(
    () => assertRoutePreservation(baseline([route("/a")]), baseline([route("/a"), route("/a")]), [], []),
    /duplicate/i,
  );
});

test("an unexpected added path fails", () => {
  assert.throws(
    () => assertRoutePreservation(baseline([route("/a")]), baseline([route("/a"), route("/surprise")]), [], []),
    /unexpected added/i,
  );
});

test("an unapproved title, H1 or body change fails", () => {
  for (const over of [{ title: "Changed" }, { h1: "Changed" }, { bodySha256: "sha-changed" }]) {
    assert.throws(
      () => assertRoutePreservation(baseline([route("/blog/existing")]), baseline([route("/blog/existing", over)]), [], []),
      /unapproved|changed/i,
    );
  }
});

test("an approved homepage change and two allowed new paths pass", () => {
  const before = baseline([route("/"), route("/visa")]);
  const after = baseline([
    route("/", { title: "New international title", h1: "New heading", bodySha256: "sha-new-home" }),
    route("/visa"),
    route("/bangladesh"),
    route("/bn/bangladesh"),
  ]);
  assert.doesNotThrow(() =>
    assertRoutePreservation(before, after, ["/bangladesh", "/bn/bangladesh"], ["/"]),
  );
});

test("bn home canonical is compared as a normalized path, not a redirect", () => {
  const before = baseline([route("/bn/", { canonical: "https://uraltravel.co.uk/bn/" })]);
  const after = baseline([route("/bn/", { canonical: "https://uraltravel.co.uk/bn/" })]);
  assert.doesNotThrow(() => assertRoutePreservation(before, after, [], []));
  assert.throws(
    () =>
      assertRoutePreservation(
        before,
        baseline([route("/bn/", { canonical: "https://uraltravel.co.uk/bn" })]),
        [],
        [],
      ),
    /canonical/i,
  );
});

test("an unapproved change to a known deep article is reported by path", () => {
  assert.throws(
    () =>
      assertRoutePreservation(
        baseline([route("/blog/deep"), route("/")]),
        baseline([route("/blog/deep", { bodySha256: "tampered" }), route("/", { title: "new" })]),
        [],
        ["/"],
      ),
    /\/blog\/deep/,
  );
});

console.log(`\n[test-route-preservation] ${checks} checks passed.`);
