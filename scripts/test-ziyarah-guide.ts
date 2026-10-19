import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide";
const keys = [
  "ziyarahHira",
  "ziyarahCemetery",
  "ziyarahCar",
  "ziyarahMadinah",
  "ziyarahBus",
  "ziyarahTaif",
  "ziyarahBadr",
];
// Claims the review removed. Each pattern targets the forbidden wording, never the topic.
const retired = [
  /SAR\s*150\s*(?:–|-|to)\s*(?:SAR\s*)?200/i,
  /SAR\s*120\s*(?:–|-|to)\s*(?:SAR\s*)?160/i,
  /SAR\s*350\s*(?:–|-|to)\s*(?:SAR\s*)?450/i,
  /SAR\s*280\s*(?:–|-|to)\s*(?:SAR\s*)?350/i,
  /SAR\s*80\b/i,
  /BDT\s*\d/i,
  /6:00\s*AM\s*(?:to|–|-)\s*9:30/i,
  /\b1\.2\s*(?:km|কিমি)/i,
  /6\s*(?:to|–|-)\s*7\s*hours/i,
  /4[- ]hour roundtrip/i,
  /rcmc\.gov\.sa/i,
  /completely\s+flat/i,
  /(?:Sab'a Masajid|Seven Mosques)/i,
  /Sayyid al-Shuhada/i,
  /Sahih Muslim[^.\n]{0,40}(?:Quba|Umrah)|(?:Quba|Umrah)[^.\n]{0,40}Sahih Muslim/i,
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

  test(`${locale}: publication kept, revision dated, fifteen opened references`, () => {
    assert.equal(entry.date, "September 27, 2026");
    assert.equal(entry.updatedAt, "2026-10-19");
    assert.equal(entry.references?.length, 15);
    for (const [index, host] of [
      "hiradistrict.com/en",
      "spa.gov.sa/en/w2609834",
      "visitsaudi.com/en/makkah/attractions/revelation-exhibition",
      "sunnah.com/ibnmajah:1412",
      "visitsaudi.com/en/madinah/attractions/masjid-quba-in-madinah",
      "visitsaudi.com/en/madinah/attractions/masjid-al-qiblatain-in-madinah",
      "visitsaudi.com/en/madinah/attractions/uhud-mountain-in-madinah",
      "visitsaudi.com/en/madinah/attractions/badr-battle-site",
      "csmadinah.com",
      "spa.gov.sa/en/N2636455",
      "visitsaudi.com/en/destinations/taif/attractions/alhada-mountain-in-taif",
      "saudipedia.com/en/qarn-al-manazil",
      "saudipedia.com/en/taif-governorate",
      "wikipedia.org/wiki/Jannat_al-Mu",
      "cdn.mt.gov.sa/files/A360/TouristsRights-EN.pdf",
    ].entries()) {
      assert.ok(
        entry.references![index].url.includes(host),
        `${index}: expecting ${host}, got ${entry.references![index].url}`,
      );
      assert.ok(entry.references![index].nameBn.length > 10, `${index}: missing bn name`);
    }
    const digits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))),
    );
    for (const n of Array.from({ length: 15 }, (_, index) => index + 1)) {
      assert.ok(citations.includes(n), `missing citation ${n}`);
    }
    assert.ok(citations.every((n) => n >= 1 && n <= 15));
  });

  test(`${locale}: every retired figure is gone`, () => {
    for (const pattern of retired) {
      assert.ok(!pattern.test(surfaces), `retired claim still present: ${surfaces.match(pattern)?.[0]}`);
    }
  });

  test(`${locale}: Hira prints all three official timetables and a price floor`, () => {
    needs(
      ["24 hours", "07:30–23:30", "15:30–01:00", "from SAR 25 per person", "mountain path"],
      ["২৪ ঘণ্টা", "০৭:৩০–২৩:৩০", "১৫:৩০–০১:০০", "২৫ রিয়াল থেকে", "পাহাড়ি"],
    );
    needs(["check the district"], ["ডিস্ট্রিক্টের নিজের পাতা"]);
  });

  test(`${locale}: the cemetery is described as unmarked, not as a tomb to visit`, () => {
    needs(
      ["north of Masjid al-Haram", "1925–26", "unmarked"],
      ["মসজিদুল হারামের উত্তরে", "১৯২৫–২৬", "চিহ্নহীন"],
    );
  });

  test(`${locale}: the Quba hadith carries its real book and grade`, () => {
    needs(
      ["Sunan Ibn Majah 1412", "graded Hasan", "reward like that of an Umrah"],
      ["সুনান ইবনে মাজাহ ১৪১২", "হাসান", "ওমরাহর সমান সওয়াব"],
    );
  });

  test(`${locale}: the car section teaches the method and prints no fare`, () => {
    needs(
      ["no published Ziyarah tariff", "the whole car", "in writing"],
      ["প্রকাশিত ভাড়ার তালিকা নেই", "পুরো গাড়ি", "লিখে"],
    );
  });

  test(`${locale}: Madinah keeps only the sourced distances`, () => {
    needs(
      ["3 km", "3.8 km", "7 km", "1,077 m", "about 70"],
      ["৩ কিমি", "৩.৮ কিমি", "৭ কিমি", "১,০৭৭", "প্রায় ৭০"],
    );
  });

  test(`${locale}: the bus section carries the operator's live fare, stops and the closure badge`, () => {
    needs(
      ["SR 90", "15 stops", "16 audio languages", "920014044", "temporarily closed"],
      ["৯০ রিয়াল", "১৫টি স্টপ", "১৬ ভাষায়", "৯২০০১৪০৪৪", "temporarily closed"],
    );
  });

  test(`${locale}: Taif keeps the cable-car facts and the miqat geometry`, () => {
    needs(
      ["4,200 m", "17-minute", "52 cabins", "80 km north-east", "35 km north"],
      ["৪,২০০ মিটার", "১৭ মিনিট", "৫২টি কেবিন", "৮০ কিমি উত্তর-পূর্বে", "৩৫ কিমি উত্তরে"],
    );
    needs(["Abdullah ibn Abbas", "Addas"], ["আবদুল্লাহ ইবনে আব্বাস", "আদাস"]);
  });

  test(`${locale}: Badr is west of Madinah and the name count is not overclaimed`, () => {
    needs(
      ["about 150 km west", "13 names", "14"],
      ["প্রায় ১৫০ কিমি পশ্চিমে", "১৩টি নাম", "১৪"],
    );
    assert.ok(!/south-west/i.test(body), "Badr still described as south-west");
  });

  test(`${locale}: seven accessible cautions, each at its decision`, () => {
    assert.equal(notes.length, 7);
    assert.deepEqual(notes.map((note) => note!.key), keys);
    for (const note of notes) {
      assert.equal(note!.locale, locale);
      assert.ok(note!.title.length > 8, note!.key);
      assert.ok(note!.text.length > 40, note!.key);
    }
  });

  test(`${locale}: no HowTo and a seven-question visible FAQ`, () => {
    assert.equal(getVisibleBlogHowTos(slug, body, locale).length, 0);
    const faq = getVisibleBlogFaqSection(slug, body, locale);
    assert.ok(faq, "visible FAQ missing");
    assert.equal(faq!.questions.length, 7);
    for (const item of faq!.questions) assert.ok(item.answer.length > 30, item.question);
  });

  test(`${locale}: six links include the hub, a sibling pair and resolve`, () => {
    const links = entry.internalLinks ?? [];
    assert.ok(links.length >= 6, `${links.length}`);
    assert.ok(links.some((link) => link.path === "/umrah"), "hub link missing");
    const siblings = links.filter((link) => link.path.startsWith("/blog/"));
    assert.ok(siblings.length >= 5, "fewer than five sibling blogs");
    for (const path of [
      "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",
      "bangladeshi-halal-food-guide-makkah-madinah-budget-meals",
    ]) {
      assert.ok(links.some((link) => link.path.endsWith(path)), `sibling missing: ${path}`);
    }
    for (const link of siblings) {
      const target = link.path.replace("/blog/", "");
      assert.ok(BLOG_DATA.some((item) => item.slug === target), `dead internal link ${link.path}`);
    }
  });

  test(`${locale}: optional CTA promises no fare, hours or licence outcome`, () => {
    const cta = entry.affiliateCTA!;
    const text = `${cta.headline} ${cta.body}`;
    assert.match(text, /optional|ঐচ্ছিক/i);
    assert.ok(!/guarantee|always works|fastest|cheapest|fixed-rate/i.test(text));
  });

  test(`${locale}: rendered page shows seven cautions, the FAQ and the references`, () => {
    const html = renderToStaticMarkup(
      React.createElement(BlogPostRouteView as never, {
        context: {
          AuthorBioCard: () => null,
          blogBodies: { [slug]: body },
          getBlogAeoSnippet50Words: (_slug: string, _bn: boolean, fallback: string) => fallback,
          getBlogCoverImage: () => "/assets/images/quba_mosque_taif_ziyarah_1790485732985-1200.webp",
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
  });
}

console.log(`\n${count} ziyarah-guide checks passed`);
