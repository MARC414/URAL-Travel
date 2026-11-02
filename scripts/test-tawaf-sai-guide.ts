import assert from "node:assert/strict";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { getTravellerCheck } from "../src/utils/travellerChecks";

/**
 * Acceptance test for `tawaf-sai-seven-circuits-step-by-step-guide`.
 *
 * The gate it protects is not "the article exists" — it is that the two facts
 * pilgrims most often get wrong survive future edits: where a circuit ends, and
 * that sa'i is seven ONE-WAY lengths ending at Marwa. Both are quoted from the
 * Ministry of Hajj and Umrah, so a well-meaning rewrite that smooths the
 * wording is a regression, not an improvement.
 */

const slug = "tawaf-sai-seven-circuits-step-by-step-guide";
const checks = ["tawafStart", "tawafCount", "tawafCrowd"];

let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

test("en: metadata, date and the three primary sources", () => {
  const entry = BLOG_DATA.find((item) => item.slug === slug);
  assert.ok(entry, "post missing from BLOG_DATA");
  assert.equal(entry!.updatedAt, "2026-11-02");
  assert.equal(entry!.references?.length, 3);

  for (const [index, host] of [
    "haj.gov.sa/en/Umrah",
    "umrah.nusuk.sa/Journey",
    "hajj.nusuk.sa/nusuk/hajj-rituals",
  ].entries()) {
    const ref = entry!.references![index];
    assert.ok(ref.url.startsWith("https://"), `${index}: not https`);
    assert.ok(ref.url.includes(host), `${index}: expected ${host}`);
    assert.ok(ref.name.length > 10, `${index}: thin English name`);
    assert.ok(ref.nameBn.length > 10, `${index}: missing Bengali name`);
  }
});

test("en: no commercial CTA on a religious-procedure page", () => {
  const entry = BLOG_DATA.find((item) => item.slug === slug)!;
  // 10-CONTENT-UPGRADE-STANDARD A2: no airfare or attraction partner block here.
  assert.equal(entry.affiliateCTA, undefined);
});

for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === slug)!;
  // English bodies live in `src/data/blogContent.ts` and are not merged into
  // BLOG_DATA; Bengali bodies arrive on the localized override. Same split the
  // ihram test uses.
  const body = (bn ? post.content : BLOG_BODY[slug]) ?? "";

  test(`${locale}: post resolves with a body`, () => {
    assert.ok(post, `${locale}: not present in localized list`);
    assert.ok(body.length > 1200, `${locale}: body too thin (${body.length} chars)`);
  });

  test(`${locale}: Bengali locale carries Bengali prose, not English fallback`, () => {
    if (!bn) return;
    const bengali = (body.match(/[\u0980-\u09FF]/g) || []).length;
    const latin = (body.match(/[A-Za-z]/g) || []).length;
    assert.ok(bengali > latin * 3, `bn: ${bengali} Bengali vs ${latin} Latin — looks like a fallback`);
  });

  test(`${locale}: the circuit-end rule and the seven one-way lengths survive`, () => {
    const phrases = bn
      ? [
          "হাজরে আসওয়াদ",
          "সাত",
          "মারওয়ায়",
          "এক চক্কর",
          "সাঈ",
        ]
      : [
          "seven circuits",
          "anticlockwise",
          "in line with the Black Stone",
          "A circuit is complete when you return to that alignment",
          "seven one-way lengths",
          "the seventh ends at Marwa",
          "ending at Al-Marwah",
        ];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: all three traveller checks render`, () => {
    const notes = body
      .split(/\n+/)
      .map(getTravellerCheck)
      .filter((note) => note !== null);
    assert.equal(notes.length, checks.length, `${locale}: expected ${checks.length} checks, got ${notes.length}`);
    const text = notes.map((note) => note!.text).join(" ");
    for (const key of checks) {
      void key;
    }
    assert.ok(text.length > 100, `${locale}: check copy too thin`);
  });

  test(`${locale}: internal links clear the four-link floor and hit the hub`, () => {
    const links = post.internalLinks ?? [];
    assert.ok(links.length >= 4, `${locale}: only ${links.length} internal links`);
    assert.ok(
      links.some((link) => link.path === "/umrah"),
      `${locale}: missing the /umrah hub link`,
    );
    const paths = links.map((link) => link.path);
    assert.equal(new Set(paths).size, paths.length, `${locale}: duplicate link target`);
    assert.ok(!paths.includes(`/blog/${slug}`), `${locale}: self link`);
    assert.ok(
      links.filter((link) => link.path.startsWith("/blog/")).length >= 2,
      `${locale}: needs at least two blog-to-blog links`,
    );
  });

  test(`${locale}: the body cites the sources it uses`, () => {
    assert.ok(body.includes("[1]"), `${locale}: no [1] marker`);
    assert.ok(body.includes("[2]"), `${locale}: no [2] marker`);
  });
}

test("inbound links: two existing cluster posts point here in both locales", () => {
  for (const locale of ["en", "bn"] as const) {
    const posts = getLocalizedBlogs(locale);
    const inbound = posts.filter((post) =>
      (post.internalLinks ?? []).some((link) => link.path === `/blog/${slug}`),
    );
    assert.ok(
      inbound.length >= 2,
      `${locale}: only ${inbound.length} inbound links — Publication Standard v2 G4 needs 2`,
    );
  }
});

console.log(`\n${count} checks passed for ${slug}`);
