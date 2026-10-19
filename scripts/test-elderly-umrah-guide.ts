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

const slug = "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide";
const keys = ["elderlyAirline", "elderlyEquipment", "elderlyHaram", "elderlyHotel", "elderlyHealth"];
const retired =
  /no additional airline fee across|without an additional airline fee|free of charge across major scheduled carriers|returned to you at the aircraft door|return it to you at the aircraft door|zero-incline|zero incline|400 m|400-meter|20-day supply|20 day supply|5 floors|five floors|mezzanine circuit|single-passenger and double-passenger|serialized, government-issued vests|Nusuk\/Tanaqol|Nusuk or Tanaqol|Markazia North eliminates|air conditioning inside Masjid al-Haram|হুইলচেয়ার ফ্রি|৪০০ মিটার|৫ তলা|জিরো-ইনক্লাইন|২০ দিনের|মেজানাইন|সিরিয়ালযুক্ত ভেস্ট|Nusuk বা Tanaqol|Nusuk\/Tanaqol/;
let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

for (const locale of ["en", "bn"] as const) {
  const bn = locale === "bn";
  const posts = getLocalizedBlogs(locale);
  const post = posts.find((entry) => entry.slug === slug)!;
  const body = (bn ? post.content : BLOG_BODY[slug])!;
  const paragraphs = body.split(/\n{2,}/);
  const notes = paragraphs.map(getTravellerCheck).filter((note) => note !== null);
  const needs = (en: string[], bengali: string[]) => {
    for (const phrase of bn ? bengali : en) assert.ok(body.includes(phrase), `Missing ${phrase}`);
  };

  test(`${locale}: original publication, honest update date and nine claim-specific primary pages`, () => {
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 27, 2026");
    assert.equal(post.updatedAt, "2026-10-19");
    assert.equal(post.references?.length, 9);
    for (const [index, host] of [
      "saudia.com/manage/baggage/special-baggage",
      "saudia.com/before-flying/special-assistance",
      "biman-airlines.com/special-care/wheelchair-assistance",
      "haj.gov.sa/en/Hajj/Things-To-Remember",
      "alharamain.gov.sa",
      "spa.gov.sa/en/N2285176",
      "spa.gov.sa/en/N2527804",
      "spa.gov.sa/en/N2151450",
      "spa.gov.sa/en/N2102395",
    ].entries()) {
      assert.ok(post.references![index].url.includes(host), `${index}: ${host}`);
    }
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(bengaliDigits.indexOf(digit)))),
    );
    assert.ok(citations.length > 0 && citations.every((n) => n >= 1 && n <= 9));
    for (const n of Array.from({ length: 9 }, (_, index) => index + 1)) assert.ok(citations.includes(n), `missing citation ${n}`);
    assert.ok(!retired.test([body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n")));
  });

  test(`${locale}: airline request is per-carrier, at booking, and not a universal free service`, () => {
    needs(
      ["WCHR", "WCHS", "WCHC", "cannot walk at all", "passenger's weight", "mandatory", "48 hours", "subject to availability", "floor, not a guarantee", "ask about any charge", "written confirmation"],
      ["WCHR", "WCHS", "WCHC", "একেবারেই হাঁটতে পারেন না", "যাত্রীর ওজন", "বাধ্যতামূলক", "৪৮ ঘণ্টা", "নিশ্চয়তা থাকে না", "ন্যূনতম", "চার্জ", "লিখিত নিশ্চিতকরণ"],
    );
    assert.ok(notes[0].text.includes(bn ? "বুকিংয়ে কোড" : "A code on a booking"));
    assert.ok(notes[0].text.includes(bn ? "পাসপোর্ট স্ক্যান" : "passport scans"));
    assert.ok(!/free wheelchair assistance on every carrier|সব এয়ারলাইনে বিনামূল্যে/i.test(body));
  });

  test(`${locale}: own wheelchair carriage is attributed and gate delivery is refused`, () => {
    needs(
      ["up to two pieces of mobility equipment", "in addition to the free checked allowance", "according to airport procedures", "gate or on the baggage belt", "approved portable oxygen concentrator models", "two spare batteries", "designated for wheelchairs"],
      ["সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী", "বিনামূল্যে চেকড ভাতার অতিরিক্ত", "এয়ারপোর্টের প্রক্রিয়া অনুযায়ী", "গেটে বা ব্যাগেজ বেল্টে", "অনুমোদিত পোর্টেবল অক্সিজেন কনসেনট্রেটর", "দুইটি স্পেয়ার ব্যাটারি", "নির্ধারিত স্থান"],
    );
    assert.ok(notes[1].text.includes(bn ? "একই অনুমোদন নয়" : "interchangeable approvals"));
  });

  test(`${locale}: Haram services are separated by provider, booking route and payment status`, () => {
    needs(
      ["free manual wheelchair service", "Bab Al-Salam (Gate 19)", "Al-Shubika", "ground Sa'i (Gate 14)", "Tanaqol", "Nusuk, run by the Ministry", "different services", "over 65", "free of charge without an online reservation", "ticket and ID"],
      ["বিনামূল্যে ম্যানুয়াল হুইলচেয়ার", "বাব আল-সালাম (গেট ১৯)", "আল-শুবাইকা", "ভূতল সাঈ (গেট ১৪)", "তানাকুল", "মন্ত্রণালয়ের নুসুক", "আলাদা সেবা", "৬৫ বছরের বেশি", "অনলাইন রিজার্ভেশন ছাড়াই", "টিকিট ও আইডি"],
    );
    needs(
      ["Gate 25", "Gate 16", "Ajyad Gate 5", "Gate 66", "who may ride or drive", "licensed wheelchair-assistant"],
      ["গেট ২৫", "গেট ১৬", "আজইয়াদ গেট ৫", "গেট ৬৬", "কে চালাবে", "লাইসেন্সপ্রাপ্ত হুইলচেয়ার-সহায়ক"],
    );
    assert.ok(notes[2].text.includes(bn ? "স্ক্রিনশট" : "screenshot"));
  });

  test(`${locale}: hotel and route questions replace area promises`, () => {
    needs(
      ["search labels", "step-free door", "working lift", "return route", "not automatically the closest", "no room, route or shuttle was inspected"],
      ["সার্চ লেবেল", "ধাপবিহীন দরজা", "চালু লিফট", "ফেরার পথ", "স্বয়ংক্রিয়ভাবে", "কোনো রুম, রুট বা শাটল পরিদর্শন করা হয়নি"],
    );
    assert.ok(body.includes(bn ? "- লিফট কত চওড়া" : "- How wide is the lift"));
  });

  test(`${locale}: clinical preparation defers dose, storage and 1448 clearance`, () => {
    needs(
      ["consult a physician", "adequate supply of medication", "medical report listing conditions, medicines and dosages", "glucose monitor", "not a fitness certificate", "1448H", "1447H/2026", "does not give doses, day counts"],
      ["চিকিৎসকের সঙ্গে", "পর্যাপ্ত ওষুধ", "মেডিকেল রিপোর্ট", "গ্লুকোজ মনিটর", "ফিটনেস সার্টিফিকেট নয়", "১৪৪৮হি.", "১৪৪৭হি./২০২৬", "ডোজ, দিনের সংখ্যা"],
    );
    assert.ok(notes[4].text.includes(bn ? "ডোজ বদলাতে" : "change a dose"));
  });

  test(`${locale}: one administrative four-step HowTo, seven visible FAQs and five point-of-action cautions`, () => {
    const procedures = getVisibleBlogHowTos(slug, body, locale);
    assert.deepEqual(procedures.map((entry) => entry.idSuffix), ["howto-elderly-airline-assistance"]);
    assert.equal(procedures[0].steps.length, 4);
    for (const [index, phrase] of ["plain words", "when you book", "operating carrier", "Reconfirm"].entries()) {
      const bnPhrase = ["স্পষ্ট কথায়", "বুকিংয়ের সময়", "অপারেটিং এয়ারলাইন", "আবার নিশ্চিত"][index];
      const stepText = `${procedures[0].steps[index].name} ${procedures[0].steps[index].text}`;
      assert.ok(stepText.includes(bn ? bnPhrase : phrase), `${index}`);
    }
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 7);
    assert.deepEqual(notes.map((note) => note.key), keys);
    assert.ok(notes.every((note) => note.locale === locale));
    for (const note of notes) assert.ok(!JSON.stringify(procedures).includes(note.text));
    const precedingByKey: Record<string, [string, string]> = {
      elderlyAirline: ["Step 4", "ধাপ ৪"],
      elderlyEquipment: ["designated", "নির্ধারিত"],
      elderlyHaram: ["licensed", "লাইসেন্সপ্রাপ্ত"],
      elderlyHotel: ["Haramain", "হারামাইন"],
      elderlyHealth: ["public chat", "পাবলিক চ্যাট"],
    };
    for (const [key, pair] of Object.entries(precedingByKey)) {
      const index = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === key);
      assert.ok(index > 0, key);
      const previous = paragraphs[index - 1];
      assert.ok(previous.toLowerCase().includes((bn ? pair[1] : pair[0]).toLowerCase()), key);
    }
  });

  test(`${locale}: five curated links, two-sibling inbound links and a qualified optional transfer CTA`, () => {
    assert.equal(post.internalLinks?.length, 5);
    for (const path of [
      "/umrah",
      "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
      "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
      "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
      "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",
    ]) {
      assert.ok(post.internalLinks?.some((link) => link.path === path), path);
    }
    assert.ok(
      posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2,
    );
    assert.equal(post.affiliateCTA?.provider, "kiwitaxi");
    assert.ok(post.affiliateCTA?.body.includes(bn ? "নিশ্চিত করে না" : "does not provide airline wheelchair assistance"));
  });

  test(`${locale}: actual React route renders every accessible note, FAQ, source and locale link`, () => {
    const html = renderToStaticMarkup(
      React.createElement(BlogPostRouteView as any, {
        context: {
          AuthorBioCard: () => null,
          blogBodies: { [slug]: body },
          getBlogAeoSnippet50Words: (_slug: string, _bn: boolean, fallback: string) => fallback,
          getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
          getLocalizedRouteHref: (path: string) => (bn ? `/bn${path}` : path),
          isBn: bn,
          isLanding: false,
          lang: locale,
          localizedBlogs: posts.map((entry) => (entry.slug === slug ? { ...entry, content: body } : entry)),
          localizedHajjFaqs: getLocalizedHajjFaqs(locale),
          navigateTo: () => {},
          parameterId: slug,
          section: "blog",
          setAffiliateToast: () => {},
        },
      }),
    );
    assert.ok(html.includes('id="blog-article-faq-heading"'));
    assert.ok(!html.includes('id="travel-intelligence-panel"'));
    assert.deepEqual([...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]), keys);
    for (const note of notes) {
      const escaped = renderToStaticMarkup(React.createElement("span", null, note.text)).slice(6, -7);
      assert.ok(html.includes(escaped));
      assert.ok(html.includes(`aria-label="${note.title}"`));
    }
    for (const reference of post.references!) {
      assert.ok(html.includes(`href="${reference.url.replace(/&/g, "&amp;")}"`), reference.url);
    }
    for (const link of post.internalLinks!) assert.ok(html.includes(`href="${bn ? "/bn" : ""}${link.path}"`));
  });
}

test("EN/BN snippets and SEO copy remove the retired promises; negative controls still catch them", () => {
  const app = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const snippets = [...app.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))].map((match) => match[1]);
  assert.equal(snippets.length, 2);
  assert.ok(snippets.every((snippet) => !retired.test(snippet)));
  assert.ok(snippets[0].includes("Biman") && snippets[0].includes("Tanaqol"));
  assert.ok(snippets[1].includes("বিমান") && snippets[1].includes("তানাকুল"));
  const seo = fs
    .readFileSync(new URL("../src/utils/seoCopy.ts", import.meta.url), "utf8")
    .split(`"/blog/${slug}": {`)[1]
    .split("},")[0];
  assert.ok(!retired.test(seo) && seo.includes("Tanaqol") && !seo.includes("flat-street"));
  for (const fixture of [
    "no additional airline fee across major scheduled carriers departing DAC",
    "returned to you at the aircraft door upon arrival",
    "flat, zero-incline corridors in Jabal Omar",
    "Pack a minimum 20-day supply",
    "nominal 400-meter walk",
    "official electric mobility scooters on the mezzanine circuit",
    "book slots via the official Nusuk/Tanaqol mobile platforms",
    "serialized, government-issued vests",
  ]) {
    assert.ok(retired.test(fixture), `Negative control accepted: ${fixture}`);
  }
});

test("prerendered EN/BN output carries the curated anchors, seven FAQs and five warnings when dist exists", () => {
  const enPath = new URL(`../dist/blog/${slug}.html`, import.meta.url);
  const bnPath = new URL(`../dist/bn/blog/${slug}.html`, import.meta.url);
  if (!fs.existsSync(enPath) || !fs.existsSync(bnPath)) {
    console.log("SKIP dist checks: run npm run build first (CI verifies them in verify:build)");
    return;
  }
  for (const [path, prefix, locale] of [
    [enPath, "", "en"],
    [bnPath, "/bn", "bn"],
  ] as const) {
    const html = fs.readFileSync(path, "utf8");
    for (const link of ["/umrah", "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost", "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh"]) {
      assert.ok(html.includes(`href="${prefix}${link}"`), `${locale} ${link}`);
    }
    assert.ok(html.includes(`"@type":"FAQPage"`) || html.includes("FAQPage"), `${locale} FAQ schema`);
    assert.ok(html.includes(locale === "bn" ? "তানাকুল" : "Tanaqol"), `${locale} Tanaqol`);
    assert.ok(!retired.test(html), `${locale} retired claim`);
  }
});

console.log(`\n${count} older-traveller Umrah regression tests passed.`);
