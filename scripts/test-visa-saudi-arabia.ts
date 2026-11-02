import assert from "node:assert/strict";
import { VISA_DATA } from "../src/constants";
import { getLocalizedVisas } from "../src/data/bengaliContent";

/**
 * Acceptance test for `/visa/saudi-arabia-visa`.
 *
 * This page is the one where being wrong costs the reader money, so the test
 * guards the claims rather than the layout:
 *
 *  1. No fee and no processing time is published as a number. A figure copied
 *     from an agency page would be wrong for most readers and would read as an
 *     official quote.
 *  2. The eligibility finding is present in both locales: Bangladesh is not on
 *     the eVisa list. That sentence is the entire reason the page exists — if a
 *     later edit softens it, the page becomes a generic visa filler page.
 *  3. Bengali is written, not fallen back to English. `getLocalizedVisas`
 *     silently returns the English object when an override is missing, which is
 *     how the Dubai combo post shipped an English page on a /bn/ URL.
 *  4. No fabricated document list: the checklist talks about what to verify and
 *     with whom, not about specific bank balances or photo sizes that no
 *     primary source states.
 */

const id = "saudi-arabia-visa";
let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

const en = VISA_DATA.find((v) => v.id === id);
const bn = getLocalizedVisas("bn").find((v) => v.id === id);

test("the page exists in VISA_DATA with a route-neutral requirement type", () => {
  assert.ok(en, "saudi-arabia-visa missing from VISA_DATA");
  assert.equal(en!.country, "Saudi Arabia");
  assert.ok(
    /multiple routes/i.test(en!.requirementType),
    `requirementType should describe several routes, got "${en!.requirementType}"`,
  );
});

test("no fabricated fee or processing figure", () => {
  const money = /(?:BDT|SAR|USD|\$|﷼)\s?\d|\b\d[\d,]*\s?(?:BDT|SAR|USD|riyal|taka)\b/i;
  assert.ok(!money.test(en!.costBdt), `costBdt contains a figure: ${en!.costBdt}`);
  assert.ok(!money.test(en!.processingTime), `processingTime contains a figure`);
  assert.ok(/\bdays?\b/i.test(en!.processingTime) === false || !/\b\d+\s*(?:working\s*)?days\b/i.test(en!.processingTime),
    "processingTime states a fixed day count");
});

test("the eligibility finding is stated, not implied", () => {
  const body = [
    en!.quickAnswer,
    ...en!.stepByStep,
    ...en!.faqs.map((f) => f.answer),
    ...en!.documentChecklist.flatMap((g) => g.items),
  ].join(" ");
  assert.ok(/68/.test(body), "the 68-country list is not mentioned");
  assert.ok(
    /not (?:on|one of|among)/i.test(body) || /Bangladesh is not/i.test(body),
    "the page does not state plainly that Bangladesh is absent from the list",
  );
  assert.ok(
    /consulate/i.test(body),
    "the official consulate fallback is not stated",
  );
  assert.ok(
    /96\s*hours?/i.test(body),
    "the transit eVisa's 96-hour limit is missing",
  );
  assert.ok(
    /excluding hajj|never hajj|but never hajj/i.test(body),
    "the tourist visa's Hajj exclusion is missing",
  );
});

test("primary sources are named in the text", () => {
  const body = [
    en!.quickAnswer,
    ...en!.stepByStep,
    ...en!.documentChecklist.flatMap((g) => g.items),
    ...en!.faqs.map((f) => f.answer),
  ].join(" ");
  for (const host of ["visa.visitsaudi.com"]) {
    assert.ok(body.includes(host), `body never names ${host}`);
  }
  assert.ok(/Ministry of Hajj and Umrah/i.test(body), "the ministry is not named");
  assert.ok(/Ministry of Health/i.test(body), "the health ministry is not named");
});

test("no document list is invented", () => {
  const text = en!.documentChecklist.flatMap((g) => g.items).join(" ");
  // These are the specifics agencies invent that no primary source states.
  const invented = /bank statement|bank balance|police clearance|6 months? valid|photo size|passport size photo/i;
  assert.ok(!invented.test(text), `checklist claims a detail no source supports: ${text.match(invented)?.[0]}`);
});

test("every FAQ answers something the sources support", () => {
  assert.ok(en!.faqs.length >= 6, `only ${en!.faqs.length} FAQs`);
  // Anything a reader could act on must carry a way to check it. On a visa page
  // that is not a footer disclaimer: it is a FAQ that says which portal decides,
  // what date this page was read, and that the portal wins any disagreement.
  assert.ok(
    en!.faqs.some((faq) => /portal is right/i.test(faq.answer) && /2 November 2026/.test(faq.answer)),
    "missing the 'check this page yourself' FAQ — the source-wins rule",
  );
  for (const faq of en!.faqs) {
    assert.ok(faq.question.length > 15, "trivial FAQ question");
    assert.ok(faq.answer.length > 80, `thin answer: ${faq.question}`);
  }
  const questions = en!.faqs.map((f) => f.question);
  assert.equal(new Set(questions).size, questions.length, "duplicate FAQ question");
});

test("the page has an ordered route for the reader, not a list of visa types", () => {
  assert.ok(en!.stepByStep.length >= 6, `only ${en!.stepByStep.length} steps`);
  assert.ok(/visa\.visitsaudi\.com/.test(en!.stepByStep[0]), "step 1 is not 'check the list yourself'");
  assert.ok(
    en!.stepByStep.some((step) => /before you book|non-refundable/i.test(step)),
    "no step warns against booking before approval",
  );
});

test("Bengali override is present and is actually Bengali", () => {
  assert.ok(bn, "no Bengali override resolved");
  for (const field of ["quickAnswer", "costBdt", "processingTime"] as const) {
    const text = bn![field] as string;
    assert.ok(text, `${field} missing in Bengali`);
    const bengali = (text.match(/[\u0980-\u09FF]/g) ?? []).length;
    assert.ok(bengali > 20, `${field} is not Bengali (${bengali} Bengali chars) — looks like a fallback`);
  }
  assert.ok(
    (bn!.faqs ?? []).length === en!.faqs.length,
    "Bengali FAQ count differs from English",
  );
  assert.ok(
    (bn!.stepByStep ?? []).length === en!.stepByStep.length,
    "Bengali step count differs from English",
  );
  assert.ok(
    (bn!.documentChecklist ?? []).length === en!.documentChecklist.length,
    "Bengali checklist group count differs from English",
  );
});

test("Bengali states the same eligibility finding", () => {
  const body = [
    bn!.quickAnswer as string,
    ...(bn!.faqs ?? []).map((f) => f.answer),
    ...(bn!.stepByStep ?? []),
  ].join(" ");
  assert.ok(body.includes("৬৮"), "Bengali page omits the 68-country fact");
  assert.ok(/নেই/.test(body), "Bengali page does not state absence plainly");
  assert.ok(/দূতাবাস/.test(body), "Bengali page omits the embassy route");
  assert.ok(/৯৬/.test(body), "Bengali page omits the 96-hour limit");
});

test("schema describes a government service and carries the FAQs", () => {
  const code = en!.schemaMarkup.code;
  assert.ok(code.includes("GovernmentService"), "schema is not a GovernmentService");
  assert.ok(code.includes("FAQPage"), "schema has no FAQPage");
  const parsed = JSON.parse(code);
  const faq = parsed["@graph"].find((n: { "@type": string }) => n["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, en!.faqs.length, "schema FAQ count differs from the page");
});

console.log(`\n${count} checks passed for ${id}`);
