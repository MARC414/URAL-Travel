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

const slug = "umrah-hajj-guide-bangladesh-nusuk-bdt-cost";
const taskSlugs = [
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",
  "hajj-registration-bangladesh-government-vs-private-package-cost",
];
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }

for (const locale of ["en", "bn"] as const) {
  const isBn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const body = (isBn ? post.content : BLOG_BODY[slug])!;
  test(`${locale}: update is scoped, original publication and references survive`, () => {
    assert.equal(post.updatedAt, "2026-10-19");
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 26, 2026");
    assert.equal(post.references?.length, 26);
    assert.equal(post.references![9].url, "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations");
    const normalized = body.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
    const citations = [...normalized.matchAll(/\[([\d\s,–-]+)\]/g)].flatMap((match) => match[1].match(/\d+/g)!.map(Number));
    assert.ok(citations.length > 30 && citations.every((id) => id >= 1 && id <= 21));
  });
  test(`${locale}: three conditional routes, no duplicate Hajj cutoff or fixed stopover bill`, () => {
    assert.equal([...body.matchAll(isBn ? /পথ [১২৩]:/g : /Pathway [123]:/g)].length, 3);
    assert.ok(!/26 September 2026|24 September 2026|২৬ সেপ্টেম্বর ২০২৬|২৪ সেপ্টেম্বর ২০২৬|SAR 39\.50|SAR 13\b/.test(body));
    assert.ok(body.includes(isBn ? "সময়সীমায় অমিল" : "deadline conflict"));
    assert.ok(body.includes(isBn ? "সর্বশেষ revision date নিশ্চিত হয়নি" : "does not establish its latest revision date"));
  });
  test(`${locale}: foreign-document criteria distinguish visa type, prior use, PR and GCC uncertainty`, () => {
    const section = body.slice(body.indexOf(isBn ? "প্রকাশিত বিদেশি ভিসা" : "What do the published foreign-visa"),
      body.indexOf(isBn ? "৩. আপনার সফরে" : "3. Which season"));
    for (const phrase of isBn
      ? ["Article 6(2)(b)", "tourist বা business", "অন্তত একবার", "student বা work", "permanent residence", "temporary residence", "first-degree relatives", "সঙ্গে আসা", "তিন মাস", "নির্দিষ্ট পেশার শর্ত ছাড়া", "বর্তমান নিষেধাজ্ঞা", "শুধু GCC residence দিয়েই visa on arrival মিলবে ধরবেন না"]
      : ["Article 6(2)(b)", "tourist or business", "used at least once", "student or work", "permanent residence", "temporary residence", "first-degree relatives", "coming with", "three months", "without specific professions", "verified current restriction", "assume GCC residence alone grants visa on arrival"]) {
      assert.ok(section.includes(phrase), `Missing foreign-document qualifier: ${phrase}`);
    }
    assert.ok(section.includes(isBn ? "১২ জুন ২০২৩" : "12 June 2023"));
    assert.ok(post.references![18].url.endsWith("Tourist-Visa-Regulations-En-V012.pdf"));
    assert.equal(post.references![19].url, "https://www.spa.gov.sa/w1919582");
    assert.equal(post.references![20].url, "https://www.spa.gov.sa/w1895923");
  });
  test(`${locale}: one localized visa caution follows criteria before the next section and stays out of HowTo`, () => {
    const paragraphs = body.split(/\n{2,}/);
    const notes = paragraphs.map(getTravellerCheck).filter((note) => note !== null);
    assert.deepEqual(notes.map((note) => note.key), ["visaEligibility"]);
    const note = notes[0];
    assert.equal(note.locale, locale);
    assert.ok(note.text.includes(isBn ? "কোনো আবেদন বা boarding test করা হয়নি" : "no application or boarding test was performed"));
    assert.ok(note.text.includes(isBn ? "digital entry evidence" : "digital-only entry evidence"));
    assert.ok(note.text.includes(isBn ? "non-refundable" : "non-refundable"));
    assert.ok(note.text.includes(isBn ? "passport scan" : "passport scans"));
    const position = paragraphs.findIndex((paragraph) => getTravellerCheck(paragraph)?.key === "visaEligibility");
    assert.ok(paragraphs[position - 1].includes(isBn ? "GCC residence" : "GCC residence"));
    assert.ok(paragraphs[position + 1].startsWith(isBn ? "Tourist route" : "Any tourist route"));
    assert.ok(!JSON.stringify(getVisibleBlogHowTos(slug, body, locale)).includes("visaEligibility"));
    assert.ok(!JSON.stringify(getVisibleBlogHowTos(slug, body, locale)).includes(note.text));
  });
  test(`${locale}: the actual six-step procedure puts application biometrics before visa/account/permits`, () => {
    const documents = getVisibleBlogHowTos(slug, body, locale);
    assert.deepEqual(documents.map((doc) => doc.idSuffix), ["howto-diy-umrah-sequence"]);
    const steps = documents[0].steps;
    assert.equal(steps.length, 6);
    assert.ok(steps[0].text.includes(isBn ? "বর্তমান মৌসুমের MOH" : "current-season MOH"));
    assert.ok(steps[1].text.includes(isBn ? "বাতিলের শর্ত" : "cancellation terms"));
    assert.ok(steps[2].text.includes(isBn ? "সেই আবেদনে চাইলে" : "when that application requires it"));
    assert.ok(steps[3].text.includes(isBn ? "বৈধ ভিসা" : "valid visa"));
    assert.ok(steps[4].text.includes(isBn ? "ওমরাহ পারমিট Rawdah অ্যাপয়েন্টমেন্ট নয়" : "not a Rawdah appointment"));
    assert.ok(steps[5].text.includes(isBn ? "ব্যবহারযোগ্য" : "usable"));
    assert.ok(!steps[5].text.includes("SAR 162"));
  });
  test(`${locale}: season, package minimum, old health evidence and budget caveats remain explicit`, () => {
    for (const phrase of isBn
      ? ["৯ মার্চ ২০২৭", "২৩ মার্চ ২০২৭", "৭ এপ্রিল ২০২৭", "চার তারকার", "SAR 4,000", "SAR 1,000", "১৪৪৭ হিজরি (২০২৬)", "নতুন নথি যাচাই না হওয়া মানে কোনো স্বাস্থ্যশর্ত নেই", "নতুন দাম যাচাই করা হয়নি", "Worksheet বাজারের দাম"]
      : ["9 March 2027", "23 March 2027", "7 April 2027", "four stars", "SAR 4,000", "SAR 1,000", "1447H (2026)", "not evidence that no health requirements apply", "not re-priced on 19 October 2026", "worksheet does not fetch market prices"]) {
      assert.ok(body.toLowerCase().includes(phrase.toLowerCase()), `Missing ${phrase}`);
    }
    assert.equal(body.split("[[UMRAH_BUDGET_TABLE]]").length - 1, 1);
    assert.ok(body.includes("BDT 1,16,000–1,32,000"));
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 5);
  });
  test(`${locale}: task links, sibling inbounds and optional commerce are present`, () => {
    for (const target of taskSlugs) assert.ok(post.internalLinks?.some((link) => link.path === `/blog/${target}`));
    assert.ok(post.internalLinks?.some((link) => link.path === "/umrah"));
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "airalo");
    assert.ok(post.affiliateCTA?.body.includes(isBn ? "পারমিটের শর্ত নয়" : "not a Nusuk permit requirement"));
  });
  test(`${locale}: real React article renders the table, FAQs, 26 sources and task links without shared price FAQ`, () => {
    const html = renderToStaticMarkup(React.createElement(BlogPostRouteView as any, { context: {
      AuthorBioCard: () => null, blogBodies: { [slug]: body },
      getBlogAeoSnippet50Words: (_slug: string, _isBn: boolean, fallback: string) => fallback,
      getBlogCoverImage: () => "/assets/images/madinah_green_dome_1790484369923-1200.webp",
      getLocalizedRouteHref: (path: string) => isBn ? `/bn${path}` : path,
      isBn, isLanding: false, lang: locale,
      localizedBlogs: posts.map((entry) => entry.slug === slug ? { ...entry, content: body } : entry),
      localizedHajjFaqs: getLocalizedHajjFaqs(locale), navigateTo: () => {}, parameterId: slug,
      section: "blog", setAffiliateToast: () => {},
    } }));
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    const note = body.split(/\n{2,}/).map(getTravellerCheck).find((entry) => entry?.key === "visaEligibility")!;
    assert.equal([...html.matchAll(/data-traveller-check="visaEligibility"/g)].length, 1);
    assert.ok(html.includes(`aria-label="${note.title}"`));
    assert.ok(html.includes(note.text));
    assert.ok(!html.includes("Traveller check (visaEligibility):"));
    assert.ok(!html.includes("যাত্রীর যাচাই (visaEligibility):"));
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.equal([...html.matchAll(/<table\b/g)].length, 1);
    assert.ok(!html.includes("[[UMRAH_BUDGET_TABLE]]"));
    for (const target of taskSlugs) assert.ok(html.includes(`href="${isBn ? "/bn" : ""}/blog/${target}"`));
    for (const reference of post.references!) assert.ok(html.includes(`href="${reference.url}"`));
  });
}

test("both App snippet overrides retain the historical cost and application order", () => {
  const source = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const matches = [...source.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))];
  assert.equal(matches.length, 2);
  assert.ok(matches[0][1].includes("when the application requests"));
  assert.ok(matches[0][1].includes("historical"));
  assert.ok(matches[1][1].includes("আবেদনে চাইলে"));
  assert.ok(matches[1][1].includes("পুরোনো"));
});
console.log(`\n${count} DIY Umrah guide regression tests passed.`);
