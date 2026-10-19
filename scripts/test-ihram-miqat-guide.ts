import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { getTravellerCheck } from "../src/utils/travellerChecks";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const slug = "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules";
const keys = ["ihramPoint", "ihramPersonal", "ihramGarments", "ihramTransit", "ihramMadinah"];
const retired =
  /30 to 45 minutes|30–45 minutes|30-45 minutes|in Bengali, English and Arabic|বাংলা, ইংরেজি ও আরবিতে|১১ কিলোমিটার|11 kilometres|11 kilometers|7 kg|৭ কেজি|Ashkona|আশকোনা|Terminal 1\/2|টার্মিনাল ১\/২|Yalamlam for|Qarn al-Manazil is the|কারনুল মানাজিল.*রিয়াদ|ট্রেনে গেলে ট্রেন ছাড়ার পর|offer a Dam|compensatory sacrifice|জেদ্দার বদশাহ আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দর \(JED\) মিকাত সীমারেখার অভিনিষ্ট|inside the perimeter|সীমারেখার অভ্যন্তরে অবস্থিত; ফলে/;
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

  test(`${locale}: publication date kept, revision dated, six specific primary pages`, () => {
    const entry = BLOG_DATA.find((item) => item.slug === slug)!;
    assert.equal(entry.date, "September 27, 2026");
    assert.equal(entry.updatedAt, "2026-10-19");
    assert.equal(entry.references?.length, 6);
    for (const [index, host] of [
      "haj.gov.sa/en/Umrah/Miqaats",
      "haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Ihram-Guide/English/en-ihram-guide.pdf",
      "sunnah.com/bukhari:1526",
      "umrah.nusuk.sa/Journey",
      "hajj.nusuk.sa/nusuk/hajj-rituals",
      "aliftaa.jo/research-fatwa-english/2982",
    ].entries()) {
      assert.ok(entry.references![index].url.includes(host), `${index}: ${host}`);
      assert.ok(entry.references![index].nameBn.length > 10, `${index}: missing bn reference name`);
    }
    const digits = "০১২৩৪৫৬৭৮৯";
    const citations = [...body.matchAll(/\[([0-9০-৯]+)\]/g)].map((match) =>
      Number(match[1].replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit)))),
    );
    for (const n of [1, 2, 3, 4, 5, 6]) assert.ok(citations.includes(n), `missing citation ${n}`);
    assert.ok(citations.every((n) => n >= 1 && n <= 6));
  });

  test(`${locale}: no unsupported minute count, crew language script, corridor table or folklore`, () => {
    assert.ok(!retired.test([body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n")));
  });

  test(`${locale}: the Ministry's own air rule and Jeddah-airport statement are quoted`, () => {
    needs(
      [
        "must not bypass the Miqat (or the point parallel to it) without entering the state of Ihram",
        "neither a Miqat nor a place for entering Ihram",
      ],
      [
        "মিকাত (বা তার সমান্তরাল বিন্দু) অতিক্রম করার আগে ইহরামে প্রবেশ না করে অতিক্রম করতে পারবেন না",
        "মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয়",
      ],
    );
  });

  test(`${locale}: Ihram is intention plus Talbiyah, not the garment alone`, () => {
    needs(
      ["intends to perform the sacred rites", "Labbayka Allahumma Umrah", "not merely wearing the cloth"],
      ["পবিত্র ইবাদতের নিয়ত করেন", "লাব্বাইকা আল্লাহুম্মা ওমরাহ", "শুধু কাপড় পরা নয়"],
    );
  });

  test(`${locale}: five mawaqit carry the Ministry's distances, and Dhul Hulayfah is 420 km`, () => {
    needs(
      ["420 km", "187 km", "94 km", "115 km", "92 km", "Dhul Hulayfah"],
      ["৪২০ কিমি", "১৮৭ কিমি", "৯৪ কিমি", "১১৫ কিমি", "৯২ কিমি", "যুল হুলাইফা"],
    );
  });

  test(`${locale}: return first, Fidyah only if Ihram was assumed after passing`, () => {
    needs(
      ["must return to it", "assumes Ihram after passing it", "Fidyah"],
      ["ফিরে যাবে", "অতিক্রমের পর ইহরাম ধরে", "ফিদইয়া"],
    );
    assert.ok(!/offer a Dam|compensatory sacrifice|দম দিতে হবে/.test(body));
  });

  test(`${locale}: announcement is described as usual practice, never guaranteed`, () => {
    needs(
      ["usually announce", "Plan as though it may not come"],
      ["সাধারণত ঘোষণা দেয়", "ঘোষণা নাও আসতে পারে"],
    );
  });

  test(`${locale}: three categories and the Madinah-first route are stated`, () => {
    needs(
      ["nearest place outside the Haram", "current location", "enters from where he starts"],
      ["হারামের বাইরের নিকটতম স্থান", "বর্তমান স্থান", "যেখানে আছেন সেখান থেকেই শুরু করেন"],
    );
  });

  test(`${locale}: women's clothing is attributed to the guide, not invented`, () => {
    needs(
      ["loose, covering and not ornamental", "niqab and gloves"],
      ["ঢিলেঢালা, শরীর ঢাকা ও অলংকারমুক্ত", "নিকাব ও গ্লাভস"],
    );
  });

  test(`${locale}: five accessible prompts, each at its decision point`, () => {
    assert.equal(notes.length, 6);
    assert.deepEqual([...new Set(notes.map((note) => note!.key))], keys);
    for (const note of notes) {
      assert.equal(note!.locale, locale);
      assert.ok(note!.title.length > 8, note!.key);
      assert.ok(note!.text.length > 80, note!.key);
      assert.ok(!note!.text.includes("**"));
    }
  });

  test(`${locale}: no HowTo, and the visible FAQ carries six questions`, () => {
    assert.equal(getVisibleBlogHowTos(slug, body, locale).length, 0);
    const faq = getVisibleBlogFaqSection(slug, body, locale);
    assert.ok(faq, "visible FAQ section missing");
    assert.equal(faq!.questions.length, 6);
  });

  test(`${locale}: every curated internal link resolves to a real route`, () => {
    const entry = BLOG_DATA.find((item) => item.slug === slug)!;
    const links = entry.internalLinks ?? [];
    assert.ok(links.length >= 5);
    assert.ok(links.some((link) => link.path === "/umrah"), "hub link missing");
    const siblings = links.filter((link) => link.path.startsWith("/blog/"));
    assert.ok(siblings.length >= 2, "fewer than two sibling blogs");
    for (const link of links) {
      if (!link.path.startsWith("/blog/")) continue;
      const target = link.path.replace("/blog/", "");
      assert.ok(BLOG_DATA.some((item) => item.slug === target), `dead internal link ${link.path}`);
    }
  });

  test(`${locale}: optional transfer CTA is qualified and promises nothing about Ihram`, () => {
    const cta = BLOG_DATA.find((item) => item.slug === slug)!.affiliateCTA!;
    const text = `${cta.headline} ${cta.body}`;
    assert.match(text, /optional|compare|Confirm|confirm/i);
    assert.ok(!/guarantee|fastest|best price|cheapest|fixed price/i.test(text));
    assert.ok(!/change when or where you enter Ihram/i.test(cta.body) === false);
  });

  test(`${locale}: rendered page shows the five cautions and no retired claim`, () => {
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
      notes.map((note) => note!.key),
    );
    for (const note of notes) assert.ok(html.includes(`aria-label="${note!.title}"`), note!.key);
    for (const reference of BLOG_DATA.find((item) => item.slug === slug)!.references!) {
      assert.ok(html.includes(`href="${reference.url.replace(/&/g, "&amp;")}"`), reference.url);
    }
    assert.ok(!/30 to 45 minutes|৩০ থেকে ৪৫ মিনিট/.test(html));
  });
}

console.log(`\n${count} Ihram/Miqat checks passed`);
