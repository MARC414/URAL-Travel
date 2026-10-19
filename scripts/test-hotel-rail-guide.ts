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

const slug = "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh";
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }
for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const body = (bn ? post.content : BLOG_BODY[slug])!;
  const paragraphs = body.split(/\n{2,}/);
  const notes = paragraphs.map(getTravellerCheck).filter((note) => note !== null);
  test(`${locale}: original publication, scoped update, six primary references and valid citations`, () => {
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 26, 2026");
    assert.equal(post.updatedAt, "2026-10-19");
    assert.equal(post.references?.length, 6);
    assert.equal(post.references![2].url, "https://sar.hhr.sa/travel/guidelines/baggage");
    assert.ok(post.references![4].url.includes("hilton.com"));
    assert.ok(post.references![5].url.includes("accessible-features-and-rooms"));
    const normalized = body.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
    const citations = [...normalized.matchAll(/\[([\d\s,–-]+)\]/g)].flatMap((match) => match[1].match(/\d+/g)!.map(Number));
    assert.ok(citations.length > 40 && citations.every((n) => n >= 1 && n <= 6));
  });
  test(`${locale}: hotel examples stay named, attributed and uninspected rather than area-wide guarantees`, () => {
    for (const phrase of bn
      ? ["Jabal Omar", "Ajyad", "Kudai", "recommendation নয়", "একটি property-র দাবি", "DoubleTree by Hilton Madinah Gate", "room-level confirmation", "hotel ও room অনুযায়ী বদলায়", "নিরাপদ fallback ভাববেন না", "nightly BDT band বা room availability যাচাই হয়নি"]
      : ["Jabal Omar", "Ajyad", "Kudai", "not an endorsement", "one property, not every", "DoubleTree by Hilton Madinah Gate", "room-level confirmation", "vary by hotel and room", "walking as a safe fallback", "No nightly BDT band or room availability was verified"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
    assert.ok(!/north-west side|flat paved courtyard|Gates 25 to 29|King Abdulaziz Gate side|সব.*সমতল/.test(body));
  });
  test(`${locale}: correct per-passenger size/weight/count, with no four-bag fallacy`, () => {
    assert.ok(body.includes("65 x 55 x 35 cm"));
    assert.ok(body.includes(bn ? "২৫ কেজি" : "25 kg"));
    assert.ok(body.includes(bn ? "একটি extra hand item" : "one extra hand item"));
    assert.ok(body.includes(bn ? "চার passenger-এর চারটি compliant bag" : "Four passengers with four bags that each comply"));
    assert.ok(body.includes(bn ? "Airline allowance দিয়ে rail allowance বদলায় না" : "An airline allowance does not override"));
    assert.ok(body.includes(bn ? "paid excess-baggage option আছে ধরে নেবেন না" : "paid excess-baggage option exists"));
  });
  test(`${locale}: six booking steps and six matching visible FAQ answers`, () => {
    const procedures = getVisibleBlogHowTos(slug, body, locale);
    assert.deepEqual(procedures.map((entry) => entry.idSuffix), ["howto-hotel-rail-plan"]);
    assert.equal(procedures[0].steps.length, 6);
    const steps = procedures[0].steps;
    assert.ok(steps[0].text.includes("visa/season"));
    assert.ok(steps[1].text.includes(bn ? "Room/bed/occupancy" : "room/bed/occupancy"));
    assert.ok(steps[2].text.includes("noncompliant"));
    assert.ok(steps[3].text.includes("change/refund"));
    assert.ok(steps[4].text.includes(bn ? "special-access request confirmed হয় না" : "not confirmation of a special-access request"));
    assert.ok(steps[5].text.includes(bn ? "আবার" : "Recheck"));
    for (const note of notes) assert.ok(!JSON.stringify(procedures).includes(note.text));
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 6);
  });
  test(`${locale}: three localized cautions sit at hotel, baggage and ticket decisions`, () => {
    assert.deepEqual(notes.map((note) => note.key), ["hotelAccess", "railBaggage", "railTicket"]);
    assert.ok(notes.every((note) => note.locale === locale));
    for (const [key, preceding] of [["hotelAccess", bn ? "Accessible room" : "Accessible rooms"], ["railBaggage", bn ? "চার passenger" : "Four passengers"], ["railTicket", bn ? "Child, infant" : "Child, infant"]]) {
      const position = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === key);
      assert.ok(position > 0 && paragraphs[position - 1].includes(preceding));
    }
    assert.ok(notes[0].text.includes(bn ? "Non-refundable" : "non-refundable"));
    assert.ok(notes[1].text.includes(bn ? "Mobility equipment" : "mobility equipment"));
    assert.ok(notes[2].text.includes(bn ? "no-show" : "no-show"));
    assert.ok(notes[2].text.includes(bn ? "ব্যবহারযোগ্য ticket barcode" : "usable ticket barcodes"));
  });
  test(`${locale}: dynamic base fares, transfer limits and unresolved refund wording remain explicit`, () => {
    for (const phrase of bn
      ? ["SAR 65", "SAR 162", "VAT ও fee বাদে", "কোনো BDT অঙ্ক নেই", "৬০ মিনিট থেকে ১০ মিনিট", "class label extraction-এ যথেষ্ট পরিষ্কার ছিল না", "refund entitlement", "station-office", "vending-machine", "disability document গ্রহণযোগ্যতা যাচাই হয়নি"]
      : ["SAR 65", "SAR 162", "excluding VAT and fees", "No BDT figure is published", "60 minutes to 10 minutes", "class labels that were not sufficiently clear", "refund entitlement", "station-office", "vending-machine", "acceptance of a Bangladeshi disability document"]) assert.ok(body.includes(phrase), `Missing ${phrase}`);
    assert.ok(!/SAR 455|SAR 101\.40|two and a quarter hours|পৌনে তিন ঘণ্টা|free up to 24 hours|changes.*35%/.test(body));
  });
  test(`${locale}: links, sibling inbounds and hotel-relevant commerce survive`, () => {
    assert.ok((post.internalLinks?.length ?? 0) >= 4);
    assert.ok(post.internalLinks?.some((link) => link.path === "/umrah"));
    assert.ok(post.internalLinks?.some((link) => link.path.includes("nusuk-app-saudi-visa-bio")));
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "klook");
    assert.ok(post.affiliateCTA?.body.includes(bn ? "wheelchair route বা shuttle নিশ্চিত হয় না" : "does not verify a wheelchair route or shuttle"));
  });
  test(`${locale}: actual React route renders full warnings and sources without generic visa-price panel`, () => {
    const html = renderToStaticMarkup(React.createElement(BlogPostRouteView as any, { context: {
      AuthorBioCard: () => null, blogBodies: { [slug]: body },
      getBlogAeoSnippet50Words: (_slug: string, _bn: boolean, fallback: string) => fallback,
      getBlogCoverImage: () => "/assets/images/madinah_green_dome_1790484369923-1200.webp",
      getLocalizedRouteHref: (path: string) => bn ? `/bn${path}` : path,
      isBn: bn, isLanding: false, lang: locale,
      localizedBlogs: posts.map((entry) => entry.slug === slug ? { ...entry, content: body } : entry),
      localizedHajjFaqs: getLocalizedHajjFaqs(locale), navigateTo: () => {}, parameterId: slug,
      section: "blog", setAffiliateToast: () => {},
    } }));
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.deepEqual([...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((m) => m[1]), ["hotelAccess", "railBaggage", "railTicket"]);
    for (const note of notes) {
      const escaped = renderToStaticMarkup(React.createElement("span", null, note.text)).slice(6, -7);
      assert.ok(html.includes(escaped));
      assert.ok(html.includes(`aria-label="${note.title}"`));
    }
    for (const reference of post.references!) assert.ok(html.includes(`href="${reference.url}"`));
    for (const link of post.internalLinks!) assert.ok(html.includes(`href="${bn ? "/bn" : ""}${link.path}"`));
  });
}
test("App snippets do not universalize distance endpoints or omit the hand item", () => {
  const source = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const matches = [...source.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))];
  assert.equal(matches.length, 2);
  assert.ok(matches.every((match) => match[1].includes("hand item")));
  assert.ok(!matches.some((match) => /are measured to the Haram wall|দূরত্ব মাপা হয় হারামের দেয়াল/.test(match[1])));
});
console.log(`\n${count} hotel/rail guide regression tests passed.`);
