import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import os from "node:os";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
for (const file of ["bangladesh.html", "bn/bangladesh.html"]) {
  assert.ok(fs.existsSync(path.join(dist, file)), `F02: missing saved hub page ${file}`);
}

const { checkBangladeshHubBuild } = await import("./bangladeshHubChecks");
const failures: string[] = [];
checkBangladeshHubBuild(dist, (ok, label) => { if (!ok) failures.push(label); });
assert.deepEqual(failures, [], `Bangladesh hub build defects: ${failures.join("; ")}`);

// Negative controls use copies, never corrupt the build under review. A valid
// fixture first establishes that failures are caused only by each mutation.
const { getDepartureHub } = await import("../src/data/departureHubs");
const tempRoot = process.platform === "win32"
  ? path.join(process.env.LOCALAPPDATA ?? os.tmpdir(), "Temp", "opencode")
  : os.tmpdir();
fs.mkdirSync(tempRoot, { recursive: true });
const fixture = fs.mkdtempSync(path.join(tempRoot, "f02-guard-"));
const enHtml = fs.readFileSync(path.join(dist, "bangladesh.html"), "utf8");
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const fixtureFailures = () => {
  const result: string[] = [];
  checkBangladeshHubBuild(fixture, (ok, label) => { if (!ok) result.push(label); });
  return result;
};
try {
  fs.mkdirSync(path.join(fixture, "bn"));
  for (const file of ["bangladesh.html", "bn/bangladesh.html", "sitemap.xml", "sitemap.txt"]) {
    fs.copyFileSync(path.join(dist, file), path.join(fixture, file));
  }
  for (const lang of ["en", "bn"] as const) {
    for (const link of getDepartureHub("bangladesh")!.sections.flatMap(section => section.links)) {
      const file = path.join(fixture, `${lang === "bn" ? "bn/" : ""}${link.path.slice(1)}.html`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, "Guide target exists");
    }
  }
  assert.deepEqual(fixtureFailures(), [], "Unmodified built-hub fixture must be valid");
  fs.writeFileSync(path.join(fixture, "bangladesh.html"), enHtml.replace('"@graph":[', '"@graph":[{"@type":["Offer"]},'));
  assert.ok(fixtureFailures().some(label => label.includes("no URAL Product or Offer")), "Array-valued Offer must fail the hub schema guard");
  fs.writeFileSync(path.join(fixture, "bangladesh.html"), enHtml);
  const extraAlternate = sitemap.replace('<loc>https://uraltravel.co.uk/bangladesh</loc>', '<loc>https://uraltravel.co.uk/bangladesh</loc><xhtml:link rel="alternate" hreflang="en" href="https://uraltravel.co.uk/bangladesh" />');
  fs.writeFileSync(path.join(fixture, "sitemap.xml"), extraAlternate);
  assert.ok(fixtureFailures().some(label => label.includes("/bangladesh: XML/text sitemaps")), "Extra English sitemap alternate must fail the exact-pair guard");
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
console.log("PASS hub guard negative controls: array-valued Offer and extra English sitemap alternate rejected");

// Optional takeover proof: compare to a separately captured, fresh current-main
// build. Never refresh this snapshot during the verification run.
const baselineArgument = process.argv.indexOf("--baseline");
if (baselineArgument !== -1) {
  const baseline = JSON.parse(fs.readFileSync(process.argv[baselineArgument + 1], "utf8")) as {
    revision: string;
    routes: { path: string; bodyHash: string; title: string; canonical: string }[];
  };
  assert.equal(baseline.revision, "eb725ed8a666947dc21699d1756da01b6b17b83c");
  const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  const actual = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  assert.deepEqual(
    [...actual].sort(),
    [...baseline.routes.map(route => route.path), "/bangladesh", "/bn/bangladesh"].sort(),
    "Only the approved Bangladesh pair may be added; no existing canonical disappears"
  );
  for (const route of baseline.routes) {
    const file = route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "").replace(/\/$/, "/index")}.html`;
    const html = fs.readFileSync(path.join(dist, file), "utf8");
    let main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main, `${route.path}: saved main must exist`);
    if (route.path === "/sitemap" || route.path === "/bn/sitemap") {
      // These directories enumerate every built route. Permit only the one
      // required new list item, not an unrestricted body-change exception.
      const hubPath = route.path === "/sitemap" ? "/bangladesh" : "/bn/bangladesh";
      const newItem = new RegExp(`<li><a href="${hubPath}">[^<]+<\\/a><\\/li>\\n`, "g");
      assert.equal([...main.matchAll(newItem)].length, 1, `${route.path}: exactly one new hub directory link`);
      main = main.replace(newItem, "");
    }
    assert.equal(createHash("sha256").update(main).digest("hex"), route.bodyHash, `${route.path}: unchanged body`);
    assert.equal(html.match(/<title>([\s\S]*?)<\/title>/)?.[1], route.title, `${route.path}: unchanged title`);
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], route.canonical, `${route.path}: unchanged canonical`);
  }
  console.log(`PASS preservation: ${baseline.routes.length - 2} bodies byte-identical; two directories gain only one hub link each; all existing titles/canonicals unchanged; exactly two added paths`);
}
console.log("PASS Bangladesh hub: real EN/BN saved pages, localized content, links, schema and sitemap");
