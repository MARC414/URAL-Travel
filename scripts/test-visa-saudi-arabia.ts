import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { VISA_DATA } from "../src/constants";
import { getLocalizedVisas, getLocalizedVisaFaqs } from "../src/data/bengaliContent";
import { VISA_OFFICIAL_SOURCES } from "../src/data/visaOfficialSources";

const id = "saudi-arabia-visa";
const en = VISA_DATA.find((v) => v.id === id)!;
const bn = getLocalizedVisas("bn").find((v) => v.id === id)!;
assert.ok(en && bn);
assert.match(en.quickAnswer, /Bangladesh was not.*standard nationality-only/i);
assert.match(en.quickAnswer, /separately lists Bangladesh.*Package Visa/i);
assert.match(bn.quickAnswer, /তালিকায় বাংলাদেশ ছিল না/);
assert.match(bn.quickAnswer, /Package Visa/);
for (const guide of [en, bn]) {
  const body = [guide.quickAnswer, ...guide.stepByStep, ...guide.faqs.map(f => f.answer)].join(" ");
  assert.match(body, /stopover/i);
  assert.match(body, /Package Visa/i);
  assert.ok(!/68.country|৬৮টি দেশের|no legitimate way around/i.test(body));
  assert.equal(guide.stepByStep.length, 7);
  assert.equal(guide.faqs.length, 7);
}
const stopoverEn = en.faqs.find(f => f.question.includes("stopover visa require"))!;
assert.match(stopoverEn.answer, /does not state that every applicant/i);
assert.match(en.faqs.find(f => f.question.includes("What should I check"))!.answer, /bookings during the application/i);
assert.match(bn.faqs.find(f => f.question.includes("Stopover visa"))!.answer, /প্রত্যেক আবেদনকারীর.*শর্ত সেখানে বলা নেই/);
assert.deepEqual(getLocalizedVisaFaqs(id), bn.faqs);
const schema = JSON.parse(en.schemaMarkup.code);
assert.equal(schema["@type"], "GovernmentService");
assert.ok(!JSON.stringify(schema).includes("FAQPage"), "FAQ schema is generated separately, never duplicate it");
const sources = VISA_OFFICIAL_SOURCES[id].map(s => s.url);
assert.ok(sources.includes("https://www.visitsaudi.com/en/campaigns/package-visa"));
assert.ok(sources.includes("https://www.visitsaudi.com/en/campaigns/saudi-stopover"));
assert.ok(sources.some(url => url.endsWith("Tourist-Visa-Regulations-En-V012.pdf")));
assert.ok(sources.includes("https://webook.com/en/e-visa"));
assert.ok(sources.includes("https://www.reserval.com/packagevisa"));
for (const guide of [en, bn]) {
  const foreign = guide.faqs.find(f => /Schengen.*(residence|বাস)/i.test(f.question));
  const packageFaq = guide.faqs.find(f => /Package Visa/.test(f.question));
  assert.ok(foreign && packageFaq);
  assert.match(foreign.answer, /Article 6\(2\)/);
  assert.match(foreign.answer, /revision/);
  assert.match(packageFaq.answer, /webook/);
  assert.match(packageFaq.answer, /Reserval/);
  assert.match(packageFaq.answer, /Makkah/);
  assert.match(packageFaq.answer, /Madinah/);
}
for (const locale of ["en", "bn"] as const) {
  const post = getLocalizedBlogs(locale).find(p => p.slug === "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide")!;
  const body = locale === "en" ? BLOG_BODY[post.slug] : post.content!;
  const article = [post.title, post.summary, body].join(" ");
  assert.doesNotMatch(article, /instant 1.year Saudi|১ বছরের সৌদি ই-ভিসা|student visa.*do NOT need/i);
  assert.ok(post.internalLinks?.some(link => link.path === "/visa/saudi-arabia-visa"));
  const html = readFileSync(`dist/${locale === "bn" ? "bn/" : ""}visa/${id}.html`, "utf8");
  assert.ok(html.includes("webook.com/en/e-visa") && html.includes("reserval.com/packagevisa"));
  assert.ok(html.includes("Tourist-Visa-Regulations-En-V012.pdf"));
}


for (const localized of getLocalizedVisas("bn")) {
  const original = VISA_DATA.find(v => v.id === localized.id)!;
  assert.equal(localized.stepByStep.length, original.stepByStep.length, `${localized.id} steps`);
  assert.equal(localized.faqs.length, original.faqs.length, `${localized.id} FAQs`);
  for (const text of [...localized.stepByStep, ...localized.documentChecklist.flatMap(g => g.items), ...localized.faqs.flatMap(f => [f.question, f.answer])]) {
    assert.match(text, /[\u0980-\u09ff]/, `${localized.id} contains an English-only step, document or FAQ: ${text}`);
  }
  assert.deepEqual(getLocalizedVisaFaqs(localized.id), localized.faqs);
}
console.log("Saudi route distinctions and Bengali visa-guide localization passed.");
