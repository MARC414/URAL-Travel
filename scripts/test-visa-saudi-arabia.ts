import assert from "node:assert/strict";
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
