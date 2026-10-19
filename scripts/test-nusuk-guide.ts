import assert from "node:assert/strict";
import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

import { getTravellerCheck } from "../src/utils/travellerChecks";
import { TravellerCheckNote } from "../src/components/TravellerCheckNote";

const slug = "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit";
let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

// Match retired assertive wording, not the correction explaining why it is unsupported.
const retired = [
  /every visa holder can book 1 Rawdah permit every 30 days/i,
  /প্রতি ৩০ দিনে ১টি পারমিট বুক করা যায়/,
  /screenshots (?:are rejected|of Nusuk Rawdah permits are not accepted)/i,
  /স্ক্রিনশট গ্রহণ করা হয় না/,
  /Live Nusuk QR Code Requires Active Mobile Data/i,
  /ইন্টারনেট অপরিহার্য/,
  /usually starting with 60 or 61/i,
  /সাধারণত 60 বা 61 দিয়ে শুরু/,
  /4-digit OTP|৪ সংখ্যার OTP/i,
  /tiny drop of lotion|ভ্যাসলিন|plain white A4/i,
];
const clean = (text: string) => text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
const canonical = BLOG_DATA.find((post) => post.slug === slug)!;

for (const locale of ["en", "bn"] as const) {
  const isBn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const content = (isBn ? post.content : BLOG_BODY[slug]) ?? "";
  const allCopy = [content, post.summary, post.title, post.affiliateCTA?.headline, post.affiliateCTA?.body].join(" ");

  test(`${locale}: retired unsupported assertions are absent (body, metadata and CTA)`, () => {
    for (const pattern of retired) assert.ok(!pattern.test(allCopy), `Retired copy: ${pattern}`);
    assert.ok(retired.some((pattern) => pattern.test("Every visa holder can book 1 Rawdah permit every 30 days")));
    assert.ok(retired.some((pattern) => pattern.test("৪ সংখ্যার OTP")));
  });
  test(`${locale}: eleven sources, valid citations, correct update and publication dates`, () => {
    assert.equal(post.references?.length, 11);
    assert.equal(canonical.updatedAt, "2026-10-19");
    assert.equal(canonical.date, "September 27, 2026");
    const normalized = content.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
    const citations = [...normalized.matchAll(/\[([\d\s,–-]+)\]/g)].flatMap((match) => match[1].match(/\d+/g)!.map(Number));
    assert.ok(citations.length > 20);
    assert.ok(citations.every((value) => value >= 1 && value <= post.references!.length));
    for (const reference of post.references!) assert.ok(reference.name && reference.nameBn && reference.url.startsWith("https://"));
  });
  test(`${locale}: eight FAQ answers and all three visible HowTos are extracted`, () => {
    const faq = getVisibleBlogFaqSection(slug, content, locale);
    assert.equal(faq?.questions.length, 8);
    const howTos = getVisibleBlogHowTos(slug, content, locale);
    assert.deepEqual(howTos.map((document) => document.idSuffix), ["howto-saudi-visa-bio", "howto-nusuk-visitor-registration", "howto-rawdah-booking"]);
    assert.deepEqual(howTos.map((document) => document.steps.length), [4, 4, 5]);
    // Do not accidentally absorb the eSIM sales text into the last procedural step.
    assert.ok(!howTos[2].steps[4].text.includes("STC"));
  });
  test(`${locale}: all five checks sit at their point of action, outside procedural schema`, () => {
    const notes = content.split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
    assert.deepEqual(notes.map((note) => note.key), ["services", "biometrics", "registration", "rawdah", "network"]);
    assert.ok(notes.every((note) => note.locale === locale && note.text.length > 100 && !/Step \d|ধাপ [০-৯]/.test(note.text)));
    const prefix = isBn ? "যাত্রীর যাচাই" : "Traveller check";
    const bioAt = content.indexOf(`${prefix} (biometrics):`);
    const registerAt = content.indexOf(`${prefix} (registration):`);
    const rawdahAt = content.indexOf(`${prefix} (rawdah):`);
    assert.ok(bioAt < content.indexOf(isBn ? "ধাপ ১: আবেদনের" : "Step 1: Check the application"));
    assert.ok(registerAt < content.indexOf(isBn ? "ধাপ ১: বৈধ" : "Step 1: Have your valid"));
    assert.ok(rawdahAt > content.indexOf(isBn ? "ধাপ ৪: দেখানো সময়সীমার" : "Step 4: Complete attendance"));
    assert.ok(rawdahAt < content.indexOf(isBn ? "ধাপ ৫:" : "Step 5:"));
    assert.ok(notes.find((note) => note.key === "registration")!.text.includes("OTP"));
    assert.ok(notes.find((note) => note.key === "rawdah")!.text.includes("QR"));
    const howTos = JSON.stringify(getVisibleBlogHowTos(slug, content, locale));
    assert.ok(!howTos.includes(`${prefix} (`));
    assert.ok(!howTos.includes(isBn ? "ব্যবহারযোগ্য QR/barcode শেয়ার" : "reserve a trial slot"));
  });
  test(`${locale}: explicit links, two sibling inbounds and honest commerce survive`, () => {
    const links = post.internalLinks ?? [];
    assert.ok(links.length >= 4);
    assert.ok(links.filter((link) => link.path.startsWith("/blog/")).length >= 2);
    assert.ok(links.some((link) => link.path === "/umrah"));
    assert.equal(new Set(links.map((link) => link.path)).size, links.length);
    assert.ok(!links.some((link) => /25[–-]29/.test(link.text)));
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "airalo");
    assert.ok(post.affiliateCTA?.body.includes(isBn ? "শর্ত নয়" : "not a Nusuk permit requirement"));
  });
  test(`${locale}: material conditions and source-check limits remain visible`, () => {
    for (const phrase of isBn
      ? ["বছরে একবার", "৪৮ ঘণ্টা", "২ ঘণ্টা", "৩০ মিনিট", "দশ আঙুল", "Instant Track", "Nafath", "৬ আগস্ট ২০২৫", "STC", "লগইন করা অ্যাপ অ্যাকাউন্ট পরীক্ষা"]
      : ["once a year", "48 hours", "2 hours", "30 minutes", "all ten fingerprints", "Instant Track", "Nafath", "6 August 2025", "STC", "not a test of an authenticated app account"]) {
      assert.ok(content.includes(phrase), `Missing ${phrase}`);
    }
  });
  test(`${locale}: actual React route does not restore shared FAQs or paid-data guarantees`, () => {
    const markup = renderToStaticMarkup(React.createElement(BlogPostRouteView as any, { context: {
      AuthorBioCard: () => null,
      blogBodies: { [slug]: content },
      getBlogAeoSnippet50Words: (_slug: string, _isBn: boolean, fallback: string) => fallback,
      getBlogCoverImage: () => "/assets/images/madinah_green_dome_1790484369923-1200.webp",
      getLocalizedRouteHref: (path: string) => isBn ? `/bn${path}` : path,
      isBn, isLanding: false, lang: locale,
      localizedBlogs: posts.map((entry) => entry.slug === slug ? { ...entry, content } : entry),
      localizedHajjFaqs: getLocalizedHajjFaqs(locale),
      navigateTo: () => {}, parameterId: slug, section: "blog", setAffiliateToast: () => {},
    } }));
    assert.deepEqual([...markup.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]),
      ["services", "biometrics", "registration", "rawdah", "network"]);
    assert.equal([...markup.matchAll(/<aside role="note"/g)].length, 5);
    assert.ok(!markup.includes(isBn ? "যাত্রীর যাচাই (" : "Traveller check ("));
    assert.ok(markup.includes('id="blog-article-faq-heading"'));
    assert.ok(!markup.includes('id="travel-intelligence-panel"'));
    assert.ok(markup.includes(isBn ? "ডেটা প্ল্যান ঐচ্ছিক" : "A data plan is optional"));
    for (const pattern of retired) assert.ok(!pattern.test(clean(markup)), `Retired React copy: ${pattern}`);
  });
}

test("both App snippet overrides avoid the retired unsupported claims", () => {
  const source = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const matches = [...source.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))];
  assert.equal(matches.length, 2);
  for (const [, snippet] of matches) {
    for (const pattern of retired) assert.ok(!pattern.test(snippet));
    assert.ok(snippet.includes("confirmation"));
  }
});
test("caution parser rejects unknown labels and the shared renderer escapes its text", () => {
  assert.equal(getTravellerCheck("Traveller check (unknown): fake content"), null);
  assert.equal(getTravellerCheck("Ordinary paragraph"), null);
  const html = renderToStaticMarkup(React.createElement(TravellerCheckNote, {
    paragraph: 'Traveller check (network): <script>alert("fake")</script>',
  }));
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});
console.log(`\n${count} Nusuk guide regression tests passed.`);
