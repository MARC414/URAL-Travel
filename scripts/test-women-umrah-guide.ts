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

const slug = "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates";
const keys = ["womenVisa", "womenAccess", "womenRawdah", "womenIhram", "womenHealth", "womenTaqsir"];
const retired = /women of any age (?:may|can|apply)|Gates? (?:21 through 26|25[–-]29)|গেট ২১ থেকে ২৬|যেকোনো বয়সের নারী.*(?:ভিসা|Visa)|direct, flat, step-free access|quick, step-free access|গরমে স্বস্তি দেয়|soft visor cap|নরম ক্যাপ \(Visor Cap\)|about one inch or 2\.5 cm|২\.৫ সেন্টিমিটার|after Isha prayer until midnight|এশার পর থেকে মধ্যরাত|safe private family|vetted door-to-door/i;
let count = 0;
function test(name: string, run: () => void) { run(); console.log(`PASS ${name}`); count++; }
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
  test(`${locale}: original publication, honest update and ten claim-specific administrative/religious references`, () => {
    assert.equal(BLOG_DATA.find((entry) => entry.slug === slug)!.date, "September 27, 2026");
    assert.equal(post.updatedAt, "2026-10-19");
    assert.equal(post.references?.length, 10);
    for (const [index, host] of ["haj.gov.sa", "visa.visitsaudi.com", "aliftaa.jo", "haj.gov.sa", "nusuk.sa", "binbaz.org.sa", "sunnah.com", "sunnah.com", "umrah.nusuk.sa", "sunnah.com"].entries()) assert.ok(post.references![index].url.includes(host));
    const citations = [...body.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]));
    assert.ok(citations.length > 0 && citations.every((n) => n >= 1 && n <= 10));
    for (const n of Array.from({ length: 10 }, (_, index) => index + 1)) assert.ok(citations.includes(n));
    assert.ok(!retired.test([body, post.title, post.summary, JSON.stringify(post.affiliateCTA)].join("\n")));
  });
  test(`${locale}: civil no-mahram answer does not override nationality, minors, religious or document conditions`, () => {
    needs(["Yes, it is allowed", "aged at least 18", "authorized representation for a minor", "Bangladesh is not in", "not a finding that every Bangladeshi is ineligible", "payment does not guarantee approval", "visa does not guarantee entry", "obligatory versus non-obligatory", "1448 travel calendar"],
      ["Yes, it is allowed", "অন্তত ১৮ বছর", "authorized representation", "list-এ Bangladesh নেই", "প্রত্যেক বাংলাদেশি সবভাবে ineligible প্রমাণ হয় না", "payment approval নিশ্চিত করে না", "visa entry নিশ্চিত করে না", "obligatory বনাম non-obligatory", "১৪৪৮-এর travel calendar নয়"]);
    assert.ok(notes[0].text.includes(bn ? "আসল document checklist" : "actual document checklist"));
    assert.ok(notes[0].text.includes(bn ? "Public chat-এ passport scan" : "passport scans"));
  });
  test(`${locale}: actual prayer/reporting access and room routes replace fixed gates and blanket northern accessibility`, () => {
    needs(["ordinary mosque entry", "not automatically the reporting point", "Markazia North", "search label", "steps, gradients, working lifts", "No outdoor route", "internal doors, courtyard gates", "return/meeting plan"],
      ["সাধারণ mosque entry", "আপনা থেকেই Rawdah booking-এর reporting point নয়", "Markazia North", "search label", "step, gradient, সচল lift", "outdoor route", "Internal door, courtyard gate", "return/meeting plan"]);
    assert.ok(notes[1].text.includes(bn ? "Transfer booking mosque access প্রতিষ্ঠা করে না" : "transfer booking does not establish mosque access"));
  });
  test(`${locale}: four appointment-only steps, seven visible FAQs and booking/childcare limits`, () => {
    const procedures = getVisibleBlogHowTos(slug, body, locale);
    assert.deepEqual(procedures.map((entry) => entry.idSuffix), ["howto-women-rawdah-preparation"]);
    assert.equal(procedures[0].steps.length, 4);
    for (const [index, phrase] of ["visitor registration", "Rawdah service", "confirmation", "entry code"].entries()) assert.ok(procedures[0].steps[index].text.includes(phrase), `${index}: ${phrase}`);
    assert.equal(getVisibleBlogFaqSection(slug, body, locale)?.questions.length, 7);
    for (const note of notes) assert.ok(!JSON.stringify(procedures).includes(note.text));
    needs(["annual regular booking", "Instant Track", "older Ministry FAQ still says 30 days", "children are not allowed into the Rawdah", "No childcare place", "48 hours", "2 hours", "30 minutes", "not a tested account session"],
      ["annual regular booking", "Instant Track", "পুরোনো Ministry FAQ-এ এখনো ৩০ দিন", "children-এর Rawdah entry নিষিদ্ধ", "Childcare place", "৪৮ ঘণ্টা", "২ ঘণ্টা", "৩০ মিনিট", "tested account session নয়"]);
  });
  test(`${locale}: attributed Ihram/menstrual sources do not become personal fatwa or treatment instructions`, () => {
    needs(["Shaykh Ibn Baz", "no special Ihram uniform", "Sahih al-Bukhari 1838", "not a mosque administrative dress notice or a medical-mask ruling", "loophole about whether fabric touches the skin", "Sahih al-Bukhari 305", "Aisha's report of Hajj", "not to perform Tawaf until she is pure", "irregular bleeding"],
      ["Shaykh Ibn Baz", "বিশেষ Ihram uniform নেই", "Sahih al-Bukhari 1838", "administrative dress notice বা medical-mask ruling নয়", "কাপড় ত্বকে লাগছে কি না", "Sahih al-Bukhari 305", "Aisha-র Hajj-এর বর্ণনা", "পবিত্র হওয়া পর্যন্ত Tawaf না করার নির্দেশ", "irregular bleeding"]);
    assert.ok(notes[4].text.includes(bn ? "Blog দেখে period-delay medication শুরু বা পরিবর্তন করবেন না" : "Do not start or change period-delay medication from a blog"));
    assert.ok(notes[4].text.includes(bn ? "current 1448 travel-health clearance প্রতিষ্ঠিত নয়" : "current 1448 travel-health clearance is established here"));
    assert.ok(notes[3].text.includes(bn ? "penalty ঠিক করে না" : "decide a penalty"));
  });
  test(`${locale}: Taqsir source amount is attributed, not universal, with privacy and continuing restrictions`, () => {
    needs(["1–2 cm", "Sunan Abi Dawud 1985", "after Tawaf and Sa'i", "postponed until returning to the residence", "Ihram restrictions continue", "not this site's determination", "layered/short hair"],
      ["১–২ সেমি", "Sunan Abi Dawud 1985", "Tawaf ও Sa'i-এর পরে", "residence-এ ফেরা পর্যন্ত", "Ihram restriction চলবে", "এই site ঠিক করছে না", "layered/short hair"]);
    assert.ok(notes[5].text.includes(bn ? "approved haircutting facility ভাববেন না" : "approved haircutting facilities"));
    assert.ok(notes[5].text.includes(bn ? "automatic release from Ihram ধরবেন না" : "automatic release from Ihram"));
  });
  test(`${locale}: six point-of-action cautions, explicit links/inbounds and non-guaranteed optional commerce`, () => {
    assert.deepEqual(notes.map((note) => note.key), keys);
    assert.ok(notes.every((note) => note.locale === locale));
    for (const [key, preceding] of [["womenVisa", "3785"], ["womenAccess", "Shuttle"], ["womenRawdah", "Instant Track"], ["womenIhram", "1838"], ["womenHealth", "305"], ["womenTaqsir", "1985"]]) {
      const index = paragraphs.findIndex((p) => getTravellerCheck(p)?.key === key);
      assert.ok(index > 0 && paragraphs[index - 1].toLowerCase().includes(preceding.toLowerCase()), key);
    }
    assert.equal(post.internalLinks?.length, 7);
    for (const path of ["/umrah", "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost", "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules"]) assert.ok(post.internalLinks?.some((link) => link.path === path));
    assert.ok(posts.filter((entry) => entry.slug !== slug && entry.internalLinks?.some((link) => link.path === `/blog/${slug}`)).length >= 2);
    assert.equal(post.affiliateCTA?.provider, "kiwitaxi");
    assert.ok(post.affiliateCTA?.body.includes(bn ? "কোনো ride বা live quote পরীক্ষা হয়নি" : "no ride or live quote was tested"));
  });
  test(`${locale}: actual React route renders full accessible notes, FAQ, references and locale links, not generic price panel`, () => {
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
    assert.deepEqual([...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]), keys);
    for (const note of notes) {
      const escaped = renderToStaticMarkup(React.createElement("span", null, note.text)).slice(6, -7);
      assert.ok(html.includes(escaped));
      assert.ok(html.includes(`aria-label="${note.title}"`));
    }
    for (const reference of post.references!) assert.ok(html.includes(`href="${reference.url}"`));
    for (const link of post.internalLinks!) assert.ok(html.includes(`href="${bn ? "/bn" : ""}${link.path}"`));
  });
}
test("EN/BN snippets/SEO remove area guarantees; retired-claim controls still reject the old assertions", () => {
  const app = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const snippets = [...app.matchAll(new RegExp(`"${slug}":\\s*\\n\\s*"([^"\\n]+)"`, "g"))].map((match) => match[1]);
  assert.equal(snippets.length, 2);
  assert.ok(snippets.every((snippet) => !retired.test(snippet) && snippet.includes("age") && snippet.includes("nationality")));
  assert.ok(!snippets.some((snippet) => /Markazia North|flat access|সবচেয়ে সুবিধাজনক/.test(snippet)));
  const seo = fs.readFileSync(new URL("../src/utils/seoCopy.ts", import.meta.url), "utf8").split(`"/blog/${slug}": {`)[1].split("},")[0];
  assert.ok(!retired.test(seo) && seo.includes("Separate visa eligibility and religious advice"));
  for (const fixture of ["women of any age may apply", "Gates 25–29", "Gates 21 through 26", "direct, flat, step-free access", "soft visor cap", "about one inch or 2.5 cm", "এশার পর থেকে মধ্যরাত", "vetted door-to-door"]) assert.ok(retired.test(fixture), `Negative control accepted: ${fixture}`);
});
console.log(`\n${count} women-specific Umrah regression tests passed.`);
