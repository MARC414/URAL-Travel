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

const slug = "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia";
const retired = /55%|BDT\s*(?:15,000|72,000|74,000|52,000|54,000|62,000)|USD\s*\$?25|6 hours 15 minutes|54 minutes|45 minutes before|daily wide-body|always book an|সবসময়.*টিকিট কাটবেন|৭২–৯২|১৫,০০০\+|৬ ঘণ্টা ১৫ মিনিট|৪৫০ কিলোমিটার/i;
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }
for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const body = (bn ? post.content : BLOG_BODY[slug])!;
  const paragraphs = body.split(/\n{2,}/);
  const notes = paragraphs.map(getTravellerCheck).filter((note) => note !== null);
  test(`${locale}: preserved publication and scoped update with five primary references and valid citations`, () => {
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 27, 2026");
    assert.equal(post.updatedAt, "2026-10-19");
    assert.equal(post.references?.length, 5);
    for (const [index, host] of ["biman-airlines.com", "saudia.com", "saudia.com", "emirates.com", "airarabia.com"].entries()) assert.ok(post.references![index].url.includes(host));
    const normalized = body.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
    const citations = [...normalized.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]));
    assert.ok(citations.length > 0 && citations.every((n) => n >= 1 && n <= 5));
    for (const n of [1, 2, 3, 4, 5]) assert.ok(citations.filter((value) => value === n).length >= 2, `Source ${n} is not used beside its claims`);
  });
  test(`${locale}: no unsourced fare/percentage/time promises and all three route shapes remain`, () => {
    assert.ok(!retired.test([body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n")));
    for (const phrase of bn
      ? ["Jeddah first", "Madinah first", "Same-city roundtrip", "সবসময় সস্তা বা ভালো নয়", "আলাদা surface leg", "কোনো route-ই প্রতিটি শহরে নির্দিষ্ট সংখ্যক দিন", "Live fare", "এই flight comparison দিয়ে"]
      : ["Jeddah first", "Madinah first", "Same-city roundtrip", "not automatically cheaper or better", "separate surface leg", "Neither route dictates a fixed number of days", "No live fare basket", "does not establish permission"]) assert.ok(body.toLowerCase().includes(phrase.toLowerCase()), `Missing ${phrase}`);
  });
  test(`${locale}: unverified schedules, operating-carrier and connection responsibility are explicit`, () => {
    for (const phrase of bn
      ? ["Biman timetable page পাওয়া যায়নি", "flight cancelled প্রমাণ হয় না", "date-specific carrier itinerary", "operating carrier", "booking reference দিয়েই protected connection প্রমাণ হয় না", "Emirates/Dubai-এর উদাহরণ", "প্রতিটি Gulf hub-এর নিয়ম নয়"]
      : ["Biman timetable page could not be retrieved", "not evidence that a flight is cancelled", "date-specific carrier itinerary", "operating carrier", "booking reference alone is not proof of a protected connection", "Emirates/Dubai example", "not a rule for every Gulf hub"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  });
  test(`${locale}: Biman directional exceptions and unknown Madinah/Saudia entitlement remain`, () => {
    for (const phrase of bn
      ? ["৩০ কেজি", "৫০ কেজি", "২০–২৩ কেজি", "S-class-এ checked baggage নেই", "Madinah row দেখা যায়নি", "per-piece wording ভিন্ন", "56 x 36 x 23 cm", "current baggage table-এ নয়", "২০, ৩০ বা ৪০ কেজি", "Bangladesh flight-এ carton box নিষিদ্ধ"]
      : ["30 kg", "50 kg", "20–23 kg", "S-class with no checked baggage", "did not expose a Madinah row", "differing per-piece wording", "56 x 36 x 23 cm", "not a verifiable current baggage table", "20, 30 or 40 kg", "prohibits carton boxes on Bangladesh flights"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  });
  test(`${locale}: Zamzam is carrier-specific, not universal free-extra, and no missing-policy inference`, () => {
    for (const phrase of bn
      ? ["allowable checked baggage-এর অংশ", "extra bottle excess", "চারটি returned chunk", "Biman Zamzam নেয় না", "authorized airport sales outlet", "air transport-এর জন্য তৈরি sealed packaging", "carton-box restriction", "customs exemption প্রতিষ্ঠিত হয় না"]
      : ["part of the allowable checked baggage", "extra bottles are excess", "four returned chunks", "does not mean Biman refuses", "authorized airport sales outlets", "sealed packaging designed for air transport", "carton-box restriction", "establishes a customs exemption"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  });
  test(`${locale}: six visible comparison steps and six FAQs, with full-trip costs and coupon warning`, () => {
    const procedures = getVisibleBlogHowTos(slug, body, locale);
    assert.deepEqual(procedures.map((entry) => entry.idSuffix), ["howto-compare-umrah-flights"]);
    assert.equal(procedures[0].steps.length, 6);
    const steps = procedures[0].steps;
    for (const [index, phrase] of ["visa/season", "one-way quote", "disruption", "quote timestamp", "out-of-sequence", "actual e-ticket"].entries()) assert.ok(steps[index].text.includes(phrase), `${index}: ${phrase}`);
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 6);
    assert.ok(body.includes(bn ? "পরীক্ষিত airline checkout" : "not a tested airline checkout"));
    for (const note of notes) assert.ok(!JSON.stringify(procedures).includes(note.text));
  });
  test(`${locale}: three immediate localized cautions, curated links/inbounds and honest optional CTA`, () => {
    assert.deepEqual(notes.map((note) => note.key), ["flightConnection", "flightBaggage", "flightZamzam"]);
    assert.ok(notes.every((note) => note.locale === locale));
    for (const [key, preceding] of [["flightConnection", "Emirates"], ["flightBaggage", "Air Arabia"], ["flightZamzam", "Air Arabia"]]) {
      const index = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === key);
      assert.ok(index > 0 && paragraphs[index - 1].includes(preceding));
    }
    assert.ok(notes[0].text.includes(bn ? "Saudi visa দিয়ে অন্য দেশে" : "Saudi visa covers another country"));
    assert.ok(notes[1].text.includes(bn ? "adult allowance দিয়ে পুরো family গুণ করবেন না" : "do not multiply an adult allowance"));
    assert.ok(notes[2].text.includes(bn ? "Dhaka পর্যন্ত" : "through to Dhaka"));
    assert.equal(post.internalLinks?.length, 7);
    for (const path of ["/umrah", "/flights", "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh"]) assert.ok(post.internalLinks?.some((link) => link.path === path));
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "aviasales");
    assert.ok(post.affiliateCTA?.body.includes(bn ? "সব multi-city combination" : "not a promise of every multi-city combination"));
  });
  test(`${locale}: actual React route renders complete accessible cautions, FAQ, sources and links, not generic price panel`, () => {
    const html = renderToStaticMarkup(React.createElement(BlogPostRouteView as any, { context: {
      AuthorBioCard: () => null, blogBodies: { [slug]: body },
      getBlogAeoSnippet50Words: (_slug: string, _bn: boolean, fallback: string) => fallback,
      getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
      getLocalizedRouteHref: (path: string) => bn ? `/bn${path}` : path,
      isBn: bn, isLanding: false, lang: locale,
      localizedBlogs: posts.map((entry) => entry.slug === slug ? { ...entry, content: body } : entry),
      localizedHajjFaqs: getLocalizedHajjFaqs(locale), navigateTo: () => {}, parameterId: slug,
      section: "blog", setAffiliateToast: () => {},
    } }));
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.deepEqual([...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]), ["flightConnection", "flightBaggage", "flightZamzam"]);
    for (const note of notes) {
      const escaped = renderToStaticMarkup(React.createElement("span", null, note.text)).slice(6, -7);
      assert.ok(html.includes(escaped));
      assert.ok(html.includes(`aria-label="${note.title}"`));
    }
    for (const reference of post.references!) assert.ok(html.includes(`href="${reference.url}"`));
    for (const link of post.internalLinks!) assert.ok(html.includes(`href="${bn ? "/bn" : ""}${link.path}"`));
  });
}
test("EN/BN App snippets and SEO remove unsupported fares/time; retired-claim fixture still rejected", () => {
  const app = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const snippets = [...app.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))].map((match) => match[1]);
  assert.equal(snippets.length, 2);
  assert.ok(snippets.every((snippet) => !retired.test(snippet) && /No live fare|Live fare/.test(snippet)));
  const seo = fs.readFileSync(new URL("../src/utils/seoCopy.ts", import.meta.url), "utf8").split(`"/blog/${slug}": {`)[1].split("},")[0];
  assert.ok(!retired.test(seo) && seo.includes("not promised savings"));
  for (const fixture of ["Airfare is 55%", "BDT 15,000+ saved", "daily wide-body in 6 hours 15 minutes", "54 minutes transfer", "৭২–৯২ হাজার", "১৫,০০০+ টাকা"]) assert.ok(retired.test(fixture), `Negative control accepted: ${fixture}`);
});
console.log(`\n${count} flight-strategy regression tests passed.`);
