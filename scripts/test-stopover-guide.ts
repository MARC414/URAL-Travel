import assert from "node:assert/strict";
import fs from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah";
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }

for (const locale of ["en", "bn"] as const) {
  const isBn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const body = (isBn ? post.content : BLOG_BODY[slug])!;
  const paragraphs = body.split(/\n{2,}/);
  const notes = paragraphs.map(getTravellerCheck).filter((note) => note !== null);
  test(`${locale}: scoped update, original publication, ten references and valid citations`, () => {
    assert.equal(post.updatedAt, "2026-11-12");
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 27, 2026");
    assert.equal(post.references?.length, 10);
    assert.ok(post.references![2].url.includes("media-center/news-updates/stopover-visa"));
    assert.ok(post.references![3].url.endsWith("Umrah-Permit-Application"));
    assert.ok(post.references![6].url.endsWith("visa-regulations"));
    assert.ok(post.references![8].url.includes("Permit-to-Visit-Al-Rawdah"));
    assert.ok(!post.references!.some((reference) => reference.url.includes("help.visitsaudi")));
    const normalized = body.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
    const numbers = [...normalized.matchAll(/\[([\d\s,–-]+)\]/g)].flatMap((match) => match[1].match(/\d+/g)!.map(Number));
    assert.ok(numbers.length > 35 && numbers.every((n) => n >= 1 && n <= 10));
  });
  test(`${locale}: retired blanket eligibility, invented fees, price CTA and issuance guarantees stay absent`, () => {
    const copy = [body, post.summary, post.affiliateCTA?.headline, post.affiliateCTA?.body].join("\n");
    assert.ok(!/without a separate visa application|does not require a previously used|আগে US\/UK\/Schengen ভিসা ব্যবহার করা লাগে না|no fixed fee is published|কোনো নির্দিষ্ট ফি প্রকাশিত নেই|3GB|Just \$8|SAR 135|SAR 39\.50|SAR 13\b|BDT 4,200|normally issued once the payment|no processing time is published|pray in Masjid an-Nabawi using your pre-booked Rawdah/.test(copy));
    assert.ok(copy.includes(isBn ? "itemized checkout total" : "itemized checkout total"));
    assert.ok(copy.includes(isBn ? "সবার জন্য অন্তর্ভুক্ত" : "not a verified universal inclusion"));
    assert.ok(copy.includes(isBn ? "guaranteed processing deadline নিশ্চিত হয়নি" : "guaranteed processing deadline were not established"));
  });
  test(`${locale}: no unverified airline HowTo, with six visible FAQs`, () => {
    assert.deepEqual(getVisibleBlogHowTos(slug, body, locale), []);
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 6);
    assert.ok(body.includes(isBn ? "যাচাইকৃত airline application sequence নয়" : "not a verified airline application sequence"));
    assert.ok(body.includes(isBn ? "photo specification বা payment sequence এখানে যাচাই হয়নি" : "photo specification or payment sequence"));
  });
  test(`${locale}: two localized cautions sit immediately before booking and itinerary decisions`, () => {
    assert.deepEqual(notes.map((note) => note.key), ["stopoverEligibility", "stopoverPermits"]);
    assert.ok(notes.every((note) => note.locale === locale));
    const eligibility = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === "stopoverEligibility");
    const permits = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === "stopoverPermits");
    assert.ok(paragraphs[eligibility - 1].includes(isBn ? "৩০ জানুয়ারি ২০২৩" : "30 January 2023"));
    assert.ok(paragraphs[eligibility + 1].startsWith(isBn ? "Visa ও hotel" : "What should you budget"));
    assert.ok(paragraphs[permits - 1].includes(isBn ? "Visa permit নয়" : "A visa is not a permit"));
    assert.ok(paragraphs[permits + 1].startsWith(isBn ? "৪." : "4."));
    assert.ok(notes[0].text.includes("non-refundable"));
    assert.ok(notes[0].text.includes(isBn ? "booking test করা হয়নি" : "booking was tested here"));
    assert.ok(notes[1].text.includes(isBn ? "Trial slot নেবেন না" : "Do not consume a trial slot"));
    assert.ok(notes[1].text.includes(isBn ? "ব্যবহারযোগ্য QR" : "usable QR"));
  });
  test(`${locale}: current airline details are not presented as verified`, () => {
    for (const phrase of isBn
      ? ["flynas-এর বর্তমান বিস্তারিত যোগ্যতা যাচাই হয়নি", "৩০ জানুয়ারি ২০২৩", "৯৬ ঘণ্টা", "তিন মাস", "খোলা যায়নি", "নতুন করে যাচাই করেনি"]
      : ["Detailed current flynas eligibility could not be verified", "30 January 2023", "96 hours", "three-month", "could not be reopened", "does not newly verify"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  });
  test(`${locale}: illustrative itinerary avoids fixed rail facts and separates Rawdah from mosque visits`, () => {
    assert.ok(body.includes(isBn ? "উদাহরণভিত্তিক সময় বণ্টন" : "illustrative allocation"));
    assert.ok(body.includes(isBn ? "সময় কম হলে" : "If timing is tight"));
    assert.ok(body.includes(isBn ? "Madinah বাদ দিন" : "omit Madinah"));
    assert.ok(body.includes(isBn ? "সাধারণ visit এক নয়" : "ordinary visit to the Prophet's Mosque"));
    assert.ok(!/SAR 65|SAR 162|2¼|২ ঘণ্টা ১৫/.test(body));
    assert.ok(body.includes(isBn ? "হজের অনুমতি দেয় না" : "does not authorize Hajj"));
  });
  test(`${locale}: curated links, two sibling inbounds and optional data CTA survive`, () => {
    assert.ok((post.internalLinks?.length ?? 0) >= 4);
    assert.ok(post.internalLinks?.some((link) => link.path === "/umrah"));
    assert.ok((post.internalLinks?.filter((link) => link.path.startsWith("/blog/")).length ?? 0) >= 2);
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "airalo");
    assert.ok(post.affiliateCTA?.body.includes(isBn ? "Paid data ঐচ্ছিক" : "Paid data is optional"));
  });
  test(`${locale}: actual React route renders both warnings/sources/FAQ without generic visa-price panel`, () => {
    const html = renderToStaticMarkup(React.createElement(BlogPostRouteView as any, { context: {
      AuthorBioCard: () => null, blogBodies: { [slug]: body },
      getBlogAeoSnippet50Words: (_slug: string, _isBn: boolean, fallback: string) => fallback,
      getBlogCoverImage: () => "/assets/images/saudi_stopover_aircraft_1790484351784-1200.webp",
      getLocalizedRouteHref: (path: string) => isBn ? `/bn${path}` : path,
      isBn, isLanding: false, lang: locale,
      localizedBlogs: posts.map((entry) => entry.slug === slug ? { ...entry, content: body } : entry),
      localizedHajjFaqs: getLocalizedHajjFaqs(locale), navigateTo: () => {}, parameterId: slug,
      section: "blog", setAffiliateToast: () => {},
    } }));
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.deepEqual([...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((m) => m[1]), ["stopoverEligibility", "stopoverPermits"]);
    for (const note of notes) {
      assert.ok(html.includes(`aria-label="${note.title}"`));
      const escapedText = renderToStaticMarkup(React.createElement("span", null, note.text)).slice(6, -7);
      assert.ok(html.includes(escapedText));
    }
    for (const reference of post.references!) assert.ok(html.includes(`href="${reference.url}"`));
    for (const link of post.internalLinks!) assert.ok(html.includes(`href="${isBn ? "/bn" : ""}${link.path}"`));
  });
}

test("EN/BN shared snippets retain carrier uncertainty instead of broad prior-visa exemption", () => {
  const source = fs.readFileSync(new URL("../src/utils/blogSnippets.ts", import.meta.url), "utf8");
  const matches = [...source.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))];
  assert.equal(matches.length, 2);
  assert.ok(matches[0][1].includes("current airline eligibility and booking flows remain unverified"));
  assert.ok(matches[1][1].includes("দুই airline-এর বর্তমান বিস্তারিত eligibility ও booking flow যাচাই হয়নি"));
  assert.ok(!matches.some((match) => /without a previously used|ব্যবহার করা লাগে না/.test(match[1])));
});
console.log(`\n${count} stopover guide regression tests passed.`);
