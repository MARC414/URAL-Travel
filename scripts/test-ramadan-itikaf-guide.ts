import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "ramadan-umrah-itikaf-guide-bangladesh-booking-budget";
const keys = ["ramadanDeadline", "ramadanItikaf", "ramadanAnnouncement", "ramadanBudget", "ramadanRoute"];
const retired =
  /two and a half hours|two-and-a-half hours|booked only through|online-only, free|আড়াই ঘণ্টা|কেবল অফিশিয়াল পোর্টাল|guaranteed place for every pilgrim|every pilgrim is guaranteed an I'tikaf|প্রত্যেক যাত্রীই ইতিকাফের জায়গা পাবেন|Ramadan packages start at BDT/i;
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

  test(`${locale}: publication date kept, revision dated, eight specific references`, () => {
    const entry = BLOG_DATA.find((item) => item.slug === slug)!;
    assert.equal(entry.date, "September 27, 2026");
    assert.equal(entry.updatedAt, "2026-10-19");
    assert.equal(entry.references?.length, 8);
    for (const [index, host] of [
      "ummulqura.org.sa/en/annual-reference",
      "haj.gov.sa/en/Media-Center/Ministry-News/2026/",
      "spa.gov.sa/en/N2518728",
      "spa.gov.sa/en/N2275662",
      "spa.gov.sa/en/N2518742",
      "sunnah.com/bukhari:1782",
      "sar.hhr.sa",
      "eservices.alharamain.gov.sa/login",
    ].entries()) {
      assert.ok(entry.references![index].url.includes(host), `${index}: ${host}`);
      assert.ok(entry.references![index].nameBn.length > 10, `${index}: missing bn reference name`);
    }
    const digits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))),
    );
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) assert.ok(citations.includes(n), `missing citation ${n}`);
    assert.ok(citations.every((n) => n >= 1 && n <= 8));
  });

  test(`${locale}: no retired journey time, sales-channel or price claim survives`, () => {
    assert.ok(!retired.test([body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n")));
  });

  test(`${locale}: the calendar dates and the Ministry's three cut-offs are published`, () => {
    needs(
      ["8 February 2027", "9 March 2027", "23 March 2027", "7 April 2027", "27 February 2027"],
      ["৮ ফেব্রুয়ারি ২০২৭", "৯ মার্চ ২০২৭", "২৩ মার্চ ২০২৭", "৭ এপ্রিল ২০২৭", "২৭ ফেব্রুয়ারি ২০২৭"],
    );
    needs(
      ["visa issuance", "entry", "departure"],
      ["ভিসা ইস্যু", "প্রবেশ", "প্রস্থান"],
    );
  });

  test(`${locale}: I'tikaf eligibility is stated as published, not promised`, () => {
    needs(
      [
        "citizens or residents in the Kingdom holding a valid residency permit",
        "free of charge",
        "18 years old",
        "capacity",
      ],
      ["নাগরিক অথবা বৈধ ইকামাধারী বাসিন্দা", "বিনামূল্যে", "১৮ বছর", "আসনসীমা"],
    );
    needs(
      ["Do not plan on it", "may simply not be open to you"],
      ["পরিকল্পনা করবেন না", "খোলা নাও থাকতে পারে"],
    );
  });

  test(`${locale}: the 1447 precedent is dated and the Nafath restriction kept`, () => {
    needs(
      ["3 Ramadan (20 February 2026)", "2 Ramadan 1447H", "11:00 a.m.", "20 Ramadan", "citizens and residents"],
      ["৩ রমজান (২০ ফেব্রুয়ারি ২০২৬)", "২ রমজান ১৪৪৭", "সকাল ১১টায়", "২০ রমজান", "নাগরিক ও বাসিন্দা"],
    );
  });

  test(`${locale}: 1448 has no announcement, and the short lead time is explained`, () => {
    needs(
      ["19 October 2026", "one day before"],
      ["১৯ অক্টোবর ২০২৬", "এক দিন আগে"],
    );
    assert.ok(/no announcement yet as of 19 October 2026|১৯ অক্টোবর ২০২৬ পর্যন্ত কোনো ঘোষণা নেই/.test(body));
  });

  test(`${locale}: the season opening and the separate Nusuk permit are stated`, () => {
    needs(
      ["31 May 2026", "1 June 2026", "Nusuk Umrah permit"],
      ["৩১ মে ২০২৬", "১ জুন ২০২৬", "নুসুক ওমরাহ পারমিট"],
    );
  });

  test(`${locale}: the Madinah-first route puts Ihram before travel and keeps the visa window`, () => {
    needs(
      ["Dhul Hulayfah", "before the journey"],
      ["যুল হুলাইফা", "যাত্রার আগে"],
    );
    needs(
      ["issued before 9 March 2027", "enter the Kingdom by 23 March 2027"],
      ["৯ মার্চ ২০২৭-এর আগে", "২৩ মার্চ ২০২৭-এর মধ্যে"],
    );
  });

  test(`${locale}: the hadith carries the narrator's hedge`, () => {
    needs(["or words to that effect"], ["অথবা এর কাছাকাছি কথায়"]);
  });

  test(`${locale}: five accessible prompts, each at its decision point`, () => {
    assert.equal(notes.length, 5);
    assert.deepEqual(notes.map((note) => note!.key), keys);
    for (const note of notes) {
      assert.equal(note!.locale, locale);
      assert.ok(note!.title.length > 8, note!.key);
      assert.ok(note!.text.length > 80, note!.key);
    }
  });

  test(`${locale}: no HowTo, and the visible FAQ carries six questions`, () => {
    assert.equal(getVisibleBlogHowTos(slug, body, locale).length, 0);
    const faq = getVisibleBlogFaqSection(slug, body, locale);
    assert.ok(faq, "visible FAQ section missing");
    assert.equal(faq!.questions.length, 6);
    for (const item of faq!.questions) {
      assert.ok(item.question.endsWith("?") || item.question.endsWith("？"), item.question);
      assert.ok(item.answer.length > 30, item.question);
    }
  });

  test(`${locale}: six curated links include the hub and resolve`, () => {
    const entry = BLOG_DATA.find((item) => item.slug === slug)!;
    const links = entry.internalLinks ?? [];
    assert.ok(links.length >= 6, `${links.length}`);
    assert.ok(links.some((link) => link.path === "/umrah"), "hub link missing");
    const siblings = links.filter((link) => link.path.startsWith("/blog/"));
    assert.ok(siblings.length >= 4, "fewer than four sibling blogs");
    for (const link of siblings) {
      const target = link.path.replace("/blog/", "");
      assert.ok(BLOG_DATA.some((item) => item.slug === target), `dead internal link ${link.path}`);
    }
  });

  test(`${locale}: optional eSIM CTA promises no coverage and no safety`, () => {
    const cta = BLOG_DATA.find((item) => item.slug === slug)!.affiliateCTA!;
    const text = `${cta.headline} ${cta.body}`;
    assert.match(text, /optional|Optional|ঐচ্ছিক/i);
    assert.ok(!/guarantee|always works|never lose|fastest/i.test(text));
    assert.ok(!/guarantee|always works|fastest/i.test(cta.body));
  });

  test(`${locale}: rendered page shows six cautions, the FAQ and no price panel`, () => {
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
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.deepEqual(
      [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]),
      keys,
    );
    const decoded = html.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    for (const note of notes) assert.ok(decoded.includes(`aria-label="${note!.title}"`), note!.key);
    for (const reference of BLOG_DATA.find((item) => item.slug === slug)!.references!) {
      assert.ok(html.includes(`href="${reference.url.replace(/&/g, "&amp;")}"`), reference.url);
    }
    assert.ok(!/two and a half hours|আড়াই ঘণ্টা/.test(html));
  });
}

console.log(`\n${count} Ramadan/I'tikaf checks passed`);
