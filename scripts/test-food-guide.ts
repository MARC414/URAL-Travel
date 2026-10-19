import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "bangladeshi-halal-food-guide-makkah-madinah-budget-meals";
const keys = ["foodHalal", "foodMakkah", "foodPrice", "foodMadinah", "foodElderly", "foodGrocery"];
// Claims the review removed. Each is written against the forbidden wording, not the topic.
const retired = [
  /100%\s*Halal\s*by\s*law/i,
  /Bangla Bazar/i,
  /Dhaka Restaurant|Chittagong Hotel|Sonargaon|Al-Madinah Bangla/i,
  /(?:Gates?\s*5\s*(?:to|-|–)\s*9|গেট\s*৫\s*(?:থেকে|-|–)\s*৯)/i,
  /250\s*(?:m|meters|metres|মিটার)/i,
  /400\s*(?:m|meters|metres)\s*to\s*800/i,
  /20\s*(?:to|-|–)\s*35\s*minute/i,
  /(?:SAR|রিয়াল)\s*\d+\s*(?:to|-|–)\s*(?:SAR\s*)?\d+/i,
  /BDT\s*\d+/i,
  /৩৯০|৫৮০|১,১৩০|১,৩০০/,
  /food budget in half|খরচ অর্ধেক/i,
];
let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === slug)!;
  const body = (bn ? post.content : BLOG_BODY[slug])!;
  const notes = body.split(/\n+/).map(getTravellerCheck).filter((note) => note !== null);
  const needs = (en: string[], bengali: string[]) => {
    for (const phrase of bn ? bengali : en) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  };
  const entry = BLOG_DATA.find((item) => item.slug === slug)!;
  const surfaces = [body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n");

  test(`${locale}: publication kept, revision dated, ten opened references`, () => {
    const live = BLOG_DATA.find((item) => item.slug === slug)!;
    assert.equal(live.date, "September 27, 2026");
    assert.equal(live.updatedAt, "2026-10-19");
    assert.equal(live.references?.length, 10);
    for (const [index, host] of [
      "sfda.gov.sa/en/halal",
      "saudigazette.com.sa/article/628636",
      "trade.gov/country-commercial-guides/saudi-arabia-prohibited-and-restricted-imports",
      "balady.gov.sa/en/services/issuance-health-certificate",
      "who.int/activities/promoting-safe-food-handling",
      "thedailystar.net/slow-reads/big-picture/news/where-chittagong-meets-makkah",
      "albaik.com/branches",
      "albaik.com/menu",
      "bindawood.sa/en/store_locations",
      "bindawoodholding.com/bindawood-supermarkets",
    ].entries()) {
      assert.ok(live.references![index].url.includes(host), `${index}: expecting ${host}, got ${live.references![index].url}`);
      assert.ok(live.references![index].nameBn.length > 10, `${index}: missing bn name`);
    }
    const digits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))),
    );
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) assert.ok(citations.includes(n), `missing citation ${n}`);
    assert.ok(citations.every((n) => n >= 1 && n <= 10));
  });

  test(`${locale}: no invented price, distance, gate, queue or named restaurant`, () => {
    for (const pattern of retired) {
      assert.ok(!pattern.test(surfaces), `retired claim still present: ${surfaces.match(pattern)?.[0]}`);
    }
  });

  test(`${locale}: halal is stated as a national baseline, not a cleanliness guarantee`, () => {
    needs(
      ["all food sold in the Kingdom is halal", "a certificate is a floor", "not an inspection result"],
      ["রাজ্যে বিক্রি হওয়া সব খাবার হালাল", "ন্যূনতম শর্ত", "পরিদর্শনের ফলাফল নয়"],
    );
    assert.ok(!/no need to check|check nothing/i.test(body));
  });

  test(`${locale}: the documented Makkah streets are named, without a restaurant list`, () => {
    needs(
      ["Hijra Road and Ibrahim Khaleel Road", "Misfalah", "Bengali and Urdu signage"],
      ["হিজরা রোড ও ইব্রাহিম খলিল রোড", "মিসফালাহ", "বাংলা-উর্দু সাইনবোর্ড"],
    );
  });

  test(`${locale}: the price section explains the method instead of printing numbers`, () => {
    needs(
      ["per plate or per person", "what comes with it", "order one plate first"],
      ["প্রতি প্লেটে না প্রতি জনে", "কী আসছে", "একটি প্লেট নিন"],
    );
  });

  test(`${locale}: Al Baik uses the operator's own branch names`, () => {
    needs(
      ["ALBAIK-MAKKAH JABAL OMAR", "ALBAIK-CLOCK TOWER MAKKAH", "ALBAIK-MADINAH TAIBA", "without prices"],
      ["ALBAIK-MAKKAH JABAL OMAR", "ALBAIK-CLOCK TOWER MAKKAH", "ALBAIK-MADINAH TAIBA", "দাম ছাড়া"],
    );
  });

  test(`${locale}: Madinah is anchored on verified branches, not gates`, () => {
    needs(
      ["TAIBA", "Al Anwar", "Al Hijra"],
      ["TAIBA", "Al Anwar", "Al Hijra"],
    );
    assert.ok(!/Gate\s*330|গেট\s*৩৩০/.test(body));
  });

  test(`${locale}: elderly guidance stays practical and hands clinical calls to a clinician`, () => {
    needs(
      ["kam mirchi, kam tel", "bottled water", "those instructions govern"],
      ["কম মরিচ, কম তেল", "বোতলবন্দি পানি", "সেই নির্দেশই প্রযোজ্য"],
    );
    assert.ok(!/diabetes|ডায়াবেটিস/i.test(body));
  });

  test(`${locale}: six accessible cautions, each at its decision`, () => {
    assert.equal(notes.length, 6);
    assert.deepEqual(notes.map((note) => note!.key), keys);
    for (const note of notes) {
      assert.equal(note!.locale, locale);
      assert.ok(note!.title.length > 8, note!.key);
      assert.ok(note!.text.length > 80, note!.key);
    }
  });

  test(`${locale}: no HowTo and a six-question visible FAQ`, () => {
    assert.equal(getVisibleBlogHowTos(slug, body, locale).length, 0);
    const faq = getVisibleBlogFaqSection(slug, body, locale);
    assert.ok(faq, "visible FAQ missing");
    assert.equal(faq!.questions.length, 6);
    for (const item of faq!.questions) assert.ok(item.answer.length > 30, item.question);
  });

  test(`${locale}: six links include the hub, a sibling customs guide and resolve`, () => {
    const links = entry.internalLinks ?? [];
    assert.ok(links.length >= 6, `${links.length}`);
    assert.ok(links.some((link) => link.path === "/umrah"), "hub link missing");
    assert.ok(
      links.some((link) => link.path.endsWith("official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport")),
      "customs sibling missing",
    );
    const siblings = links.filter((link) => link.path.startsWith("/blog/"));
    assert.ok(siblings.length >= 5, "fewer than five sibling blogs");
    for (const link of siblings) {
      const target = link.path.replace("/blog/", "");
      assert.ok(BLOG_DATA.some((item) => item.slug === target), `dead internal link ${link.path}`);
    }
  });

  test(`${locale}: optional CTA promises no coverage, price or customs outcome`, () => {
    const cta = entry.affiliateCTA!;
    const text = `${cta.headline} ${cta.body}`;
    assert.match(text, /optional|ঐচ্ছিক/i);
    assert.ok(!/guarantee|always works|fastest|cheapest/i.test(text));
  });

  test(`${locale}: rendered page shows six cautions and the FAQ`, () => {
    const html = renderToStaticMarkup(
      React.createElement(BlogPostRouteView as never, {
        context: {
          AuthorBioCard: () => null,
          blogBodies: { [slug]: body },
          getBlogAeoSnippet50Words: (_slug: string, _bn: boolean, fallback: string) => fallback,
          getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
          getLocalizedRouteHref: (path: string) => (bn ? `/bn${path}` : path),
          isBn: bn,
          isLanding: false,
          lang: locale,
          localizedBlogs: getLocalizedBlogs(locale),
          localizedHajjFaqs: getLocalizedHajjFaqs(locale),
          navigateTo: () => {},
          parameterId: slug,
          section: "blog",
          setAffiliateToast: () => {},
        },
      } as never),
    );
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    assert.deepEqual(
      [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]),
      keys,
    );
    const decoded = html.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    for (const note of notes) assert.ok(decoded.includes(`aria-label="${note!.title}"`), note!.key);
    for (const reference of entry.references!) {
      assert.ok(html.includes(`href="${reference.url.replace(/&/g, "&amp;")}"`), reference.url);
    }
    assert.ok(!/SAR 12|১২–১৮/.test(decoded));
  });
}

console.log(`\n${count} food-guide checks passed`);
