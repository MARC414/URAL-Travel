import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport";
const keys = ["zamzamBox", "zamzamAirline", "datesAllowance", "goldDeclare", "vatRefund"];
const retired =
  /SAR 9\.50|১১ কিলোমিটার|saves 40%|৪০% সাশ্রয়|5 kg to 10 kg|৫ থেকে ১০ কেজি|1 km south|gate B\/C|গেট বি\/সি|most airlines allow/i;
// 48 SAR may appear only in a paragraph that labels it as the Nusuk home-delivery carton.
const cartonIsExplained = (text: string) =>
  text
    .split(/\n+/)
    .filter((line) => /\b(?:48\s*SAR|৪৮\s*রিয়াল)\b/.test(line))
    .every((line) =>
      /different product|home-delivery|24 × 330|Nusuk|অন্য একটি পণ্য|হোম ডেলিভারি|২৪ × ৩৩০|নুসুক/.test(line),
    );

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

  test(`${locale}: publication date kept, revision dated, nine specific references`, () => {
    const entry = BLOG_DATA.find((item) => item.slug === slug)!;
    assert.equal(entry.date, "September 27, 2026");
    assert.equal(entry.updatedAt, "2026-10-19");
    assert.equal(entry.references?.length, 9);
    for (const [index, host] of [
      "tibahairports.com/en-EN/airport-services-facilities/page/zamzam-sales-service-en",
      "saudia.com/information/terms-and-conditions/general-conditions-of-carriage",
      "saudigazette.com.sa/article/650555",
      "hsia.gov.bd/content-details/10/Customs",
      "bssnews.net/others/288568",
      "dhakatribune.com/bangladesh/421147",
      "nbr.gov.bd/uploads/tariff_schedule/Chapter-8.pdf",
      "tibahairports.com/en-EN/airport-services-facilities/page/tax-refunds-en",
      "saudigazette.com.sa/article/653942",
    ].entries()) {
      assert.ok(entry.references![index].url.includes(host), `${index}: ${host}`);
      assert.ok(entry.references![index].nameBn.length > 10, `${index}: missing bn name`);
    }
    const digits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))),
    );
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) assert.ok(citations.includes(n), `missing citation ${n}`);
    assert.ok(citations.every((n) => n >= 1 && n <= 9));
  });

  test(`${locale}: no conflated 48 SAR, no dates kilogram allowance, no legacy folklore`, () => {
    const surfaces = [body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n");
    assert.ok(!retired.test(surfaces), `retired claim still present: ${surfaces.match(retired)?.[0]}`);
    assert.ok(cartonIsExplained(surfaces), "48 SAR appears without being named as the carton");
  });

  test(`${locale}: the pilgrim bottle is priced from the airport operator, not the home-delivery carton`, () => {
    needs(["12.50", "SAR 12.50"], ["১২.৫০"]);
    needs(
      ["different product", "24 × 330 ml carton"],
      ["অন্য একটি পণ্য", "২৪ × ৩৩০ মিলি"],
    );
  });

  test(`${locale}: Zamzam is bought at the airport and never packed in a suitcase`, () => {
    needs(
      ["prohibited from being placed in checked baggage", "designated belt", "one bottle per purchase"],
      ["চেক-ইন লাগেজে রাখা নিষিদ্ধ", "নির্ধারিত বেল্ট", "এক বোতল"],
    );
  });

  test(`${locale}: the airline allowance is stated per carrier, not as "most airlines"`, () => {
    needs(
      ["counted as part of the allowable checked baggage", "will not compensate", "Biman publishes no Zamzam allowance"],
      ["অনুমোদিত চেক-ইন ব্যাগেজের অংশ", "ক্ষতিপূরণ দেয় না", "বিমানের কোনো প্রকাশিত জমজম ছাড়"],
    );
    assert.ok(!/most airlines allow/i.test(body));
  });

  test(`${locale}: dates are governed by personal use, with no invented kilogram figure`, () => {
    needs(
      ["no published per-passenger kilogram allowance", "personal use", "25%"],
      ["কেজিতে কোনো প্রকাশিত ছাড় নেই", "ব্যক্তিগত ব্যবহার", "২৫%"],
    );
    const dateLines = body.split(/\n+/).filter((line) => /dates|খেজুর/i.test(line));
    assert.ok(dateLines.length >= 4, "dates section missing");
    const allowanceClaim =
      /(?:duty[- ]free|tax[- ]free|শুল্কমুক্ত)[^.\n]{0,40}\d+\s*(?:kg|কেজি)|\d+\s*(?:kg|কেজি)[^.\n]{0,25}(?:duty[- ]free|শুল্কমুক্ত)/i;
    for (const line of dateLines) {
      assert.ok(!allowanceClaim.test(line), `dates kilogram allowance still claimed: ${line.slice(0, 90)}`);
    }
  });

  test(`${locale}: the gold allowance carries its year, carat and silver conditions`, () => {
    needs(
      ["100 g of gold ornaments", "200 g of silver", "12 pieces", "once per calendar year", "22 carats or below"],
      ["১০০ গ্রাম স্বর্ণালংকার", "২০০ গ্রাম রুপা", "১২", "ক্যালেন্ডার বছরে একবার", "২২ ক্যারেট"],
    );
  });

  test(`${locale}: the bar cap, duty and consequence are exact`, () => {
    needs(
      ["117 g", "10 tola", "Tk 5,000 per 11.664 g", "confiscated", "criminal case"],
      ["১১৭ গ্রাম", "১০ তোলা", "১১.৬৬৪ গ্রামে ৫,০০০ টাকা", "জব্দ", "ফৌজদারি মামলা"],
    );
  });

  test(`${locale}: the VAT refund is conditional, and worn jewellery is excluded`, () => {
    needs(
      ["SAR 500", "90 days", "unused", "Global Blue"],
      ["৫০০ রিয়াল", "৯০ দিন", "অব্যবহৃত", "গ্লোবাল ব্লু"],
    );
    needs(
      ["A ring you wore", "fails the scheme"],
      ["পরে ঘুরেছেন এমন আংটি", "যোগ্য নয়"],
    );
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
    for (const item of faq!.questions) assert.ok(item.answer.length > 30, item.question);
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

  test(`${locale}: optional vehicle CTA promises no baggage or Zamzam outcome`, () => {
    const cta = BLOG_DATA.find((item) => item.slug === slug)!.affiliateCTA!;
    const text = `${cta.headline} ${cta.body}`;
    assert.match(text, /optional|Optional|ঐচ্ছিক/i);
    assert.ok(!/guarantee|always fits|free extra/i.test(text));
    assert.ok(!/guarantee|always fits|free extra/i.test(cta.body));
  });

  test(`${locale}: rendered page shows five cautions, the FAQ and no price panel`, () => {
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
    assert.ok(!/SAR 9\.50/.test(decoded));
    assert.ok(cartonIsExplained(decoded), "rendered 48 SAR is not attributed to the carton");
  });
}

console.log(`\n${count} Zamzam/customs checks passed`);
