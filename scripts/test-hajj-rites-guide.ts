import assert from "node:assert/strict";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { getTravellerCheck } from "../src/utils/travellerChecks";

/**
 * Acceptance test for `hajj-rites-mina-arafah-muzdalifah-day-by-day`.
 *
 * The gate it protects is the editorial decision that produced the article. The
 * Ministry of Hajj and Umrah publishes the ORDER of the rites and no timings at
 * all — no hours, no pebble counts, no exit condition. Every time on the page
 * therefore comes from a dated answering source, and the page must say so.
 *
 * So this test fails if the page ever:
 *   - loses a ministry or answering source, or gains an agency domain;
 *   - drops the Arafah window that runs to dawn (the fact that stops a late
 *     coach from looking like a lost Hajj);
 *   - drops the sunset condition that decides the 12th-or-13th exit;
 *   - softens "not permissible before the zenith" into a suggestion;
 *   - invents a fee, or a commercial CTA on a religious-procedure page;
 *   - ships English prose on the Bengali route.
 */

const slug = "hajj-rites-mina-arafah-muzdalifah-day-by-day";
const checks = ["hajjArafahLate", "hajjJamaratTiming", "hajjExitRule"];

let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

test("en: metadata, date and the six sources", () => {
  const entry = BLOG_DATA.find((item) => item.slug === slug);
  assert.ok(entry, "post missing from BLOG_DATA");
  assert.equal(entry!.updatedAt, "2026-11-02");
  assert.equal(entry!.references?.length, 6);

  const urls = entry!.references!.map((ref) => ref.url);
  assert.ok(
    urls.some((url) => url.includes("haj.gov.sa/en/Hajj")),
    "the ministry's journey order must be cited",
  );
  assert.equal(
    urls.filter((url) => url.includes("islamqa.info")).length,
    5,
    "the five answering sources must all be cited",
  );

  for (const [index, ref] of entry!.references!.entries()) {
    assert.ok(ref.url.startsWith("https://"), `${index}: not https`);
    assert.ok(ref.name.length > 20, `${index}: thin English name`);
    assert.ok(ref.nameBn.length > 20, `${index}: missing Bengali name`);
  }
});

test("en: no agency domain ever enters the reference list", () => {
  const entry = BLOG_DATA.find((item) => item.slug === slug)!;
  const banned = [
    "visathing",
    "obokash",
    "umrah.com.bd",
    "ivisa",
    "saudivisaoffice",
    "evisaudi",
    "saudilifeguide",
    "tasheer",
  ];
  for (const ref of entry.references!) {
    for (const host of banned) {
      assert.ok(
        !ref.url.toLowerCase().includes(host),
        `agency source leaked in: ${ref.url}`,
      );
    }
  }
});

test("en: a religious-procedure page carries no commercial CTA and no fee", () => {
  const entry = BLOG_DATA.find((item) => item.slug === slug)!;
  assert.equal(entry.affiliateCTA, undefined, "A2: no partner CTA on this page");
  const body = BLOG_BODY[slug];
  assert.ok(!/BDT|SAR\s?\d|USD\s?\d|\bfee\b/i.test(body), "no money claim on a rite page");
});

test("both locales keep a title the SERP builder will not clamp", () => {
  // `compactTitle` in src/utils/seoCopy.ts trims the topic to 60 - " | URAL" = 53
  // chars at a word boundary and appends an ellipsis. A title over that budget
  // ships a truncated <title> with "… | URAL" in it — invisible in review, very
  // visible in the search result. The tawaf page shipped that way once.
  const pairs: [string, string][] = [
    [slug, "en"],
    [slug, "bn"],
    ["tawaf-sai-seven-circuits-step-by-step-guide", "en"],
    ["tawaf-sai-seven-circuits-step-by-step-guide", "bn"],
  ];
  for (const [target, locale] of pairs) {
    const post = getLocalizedBlogs(locale as "en" | "bn").find((entry) => entry.slug === target)!;
    const topic = post.title.replace(/\s*\|\s*URAL(?:\s+Travel)?(?:\s+Blog)?\s*$/i, "").trim();
    assert.ok(
      topic.length <= 53,
      `${target} (${locale}): title topic is ${topic.length} chars, over the 53-char budget — it will ship clamped`,
    );
    assert.ok(!post.title.includes("\u2026"), `${target} (${locale}): title already contains an ellipsis`);
  }
});

for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === slug)!;
  const body = (bn ? post.content : BLOG_BODY[slug]) ?? "";

  test(`${locale}: post resolves with a body`, () => {
    assert.ok(post, `${locale}: not present in localized list`);
    assert.ok(body.length > 2000, `${locale}: body too thin (${body.length} chars)`);
  });

  test(`${locale}: Bengali locale carries Bengali prose, not English fallback`, () => {
    if (!bn) return;
    const bengali = (body.match(/[\u0980-\u09FF]/g) || []).length;
    const latin = (body.match(/[A-Za-z]/g) || []).length;
    assert.ok(bengali > latin * 3, `bn: ${bengali} Bengali vs ${latin} Latin — looks like a fallback`);
  });

  test(`${locale}: the Arafah window that runs to dawn survives`, () => {
    // 144830: the standing is valid from the zenith until dawn on the 10th. This
    // is what stops a late coach reading as a lost Hajj.
    const phrases = bn
      ? ["জাওয়াল", "ফজর", "সূর্যাস্তের পরে আরাফাহতে পৌঁছালে আপনার হজ বাতিল হয় না"]
      : [
          "from the moment the sun passes its zenith on the 9th until dawn on the 10th",
          "your Hajj is not lost",
          "before dawn on the Day of Sacrifice",
        ];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: the 12th-or-13th exit rule survives intact`, () => {
    const phrases = bn
      ? ["সূর্যাস্তের আগে মিনা ছাড়লে", "১৩ তারিখ মাফ", "নিজের ইচ্ছায় মিনায় ছিলেন না"]
      : [
          "leave Mina before sunset, and the 13th is waived",
          "If the sun sets while you are still in Mina",
          "you were not in Mina by choice",
        ];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: pebble counts are stated, not implied`, () => {
    const phrases = bn ? ["৪৯", "৭০", "২১"] : ["49 pebbles", "70"];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: the zenith prohibition stays a prohibition`, () => {
    const phrases = bn
      ? ["সূর্য জাওয়াল হওয়ার আগে নিক্ষেপ করা জায়েজ নয়"]
      : ["is not permissible"];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: school differences are named, not flattened`, () => {
    const phrases = bn ? ["ইমাম আহমাদ", "মালিক", "আবু হানিফা"] : ["Ahmad held", "Abu Hanifah", "Malik"];
    for (const phrase of phrases) {
      assert.ok(body.includes(phrase), `${locale}: missing "${phrase}"`);
    }
  });

  test(`${locale}: all three traveller checks render with real copy`, () => {
    const notes = body
      .split(/\n+/)
      .map(getTravellerCheck)
      .filter((note) => note !== null);
    assert.equal(notes.length, checks.length, `${locale}: expected ${checks.length} checks, got ${notes.length}`);
    for (const note of notes) {
      assert.ok((note!.text as string).length > 80, `${locale}: ${note!.key} copy too thin`);
      assert.ok(note!.title.length > 10, `${locale}: ${note!.key} has no title`);
    }
  });

  test(`${locale}: internal links clear the floor and reach the companion page`, () => {
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
      paths.includes("/blog/tawaf-sai-seven-circuits-step-by-step-guide"),
      `${locale}: must link to the tawaf companion page`,
    );
    assert.ok(
      links.filter((link) => link.path.startsWith("/blog/")).length >= 2,
      `${locale}: needs at least two blog-to-blog links`,
    );
  });
}

console.log(`\n[test:hajj-rites] ${count} checks passed.`);
