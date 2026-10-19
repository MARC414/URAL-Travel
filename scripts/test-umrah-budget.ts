import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { calculateUmrahBudget, emptyUmrahBudget, UMRAH_BUDGET_ITEMS, type UmrahBudgetInputs } from "../src/utils/umrahBudget";
import { UmrahBudgetCalculator } from "../src/components/UmrahBudgetCalculator";
import { TopicalAuthorityBlueprint, TOPICAL_BLOG_NODES } from "../src/components/TopicalAuthorityBlueprint";

let assertions = 0;
function test(name: string, run: () => void) {
  run();
  assertions++;
  console.log(`PASS ${name}`);
}
const filled = (value: string): UmrahBudgetInputs => Object.fromEntries(
  UMRAH_BUDGET_ITEMS.map(({ key }) => [key, value]),
) as UmrahBudgetInputs;

test("unknown amounts never become a zero-cost trip", () => {
  const result = calculateUmrahBudget(emptyUmrahBudget(), 2);
  assert.equal(result.complete, false);
  assert.equal(result.missing.length, UMRAH_BUDGET_ITEMS.length);
  assert.equal(result.totalBdt, null);
  assert.equal(result.perPersonBdt, null);
});
test("explicit zeros are valid included/not-applicable entries", () => {
  const result = calculateUmrahBudget(filled("0"), 2);
  assert.equal(result.complete, true);
  assert.equal(result.totalBdt, 0);
});
test("whole-party quotes are summed once, not multiplied by travellers", () => {
  const result = calculateUmrahBudget({ flights: "200000", visa: "40000", makkah: "30000", madinah: "20000", transport: "18000", meals: "10000", extras: "5000", contingency: "7000" }, 4);
  assert.equal(result.totalBdt, 330000);
  assert.equal(result.perPersonBdt, 82500);
});
test("money uses integer poisha and rounds only the equal-share result", () => {
  assert.equal(calculateUmrahBudget({ ...filled("0"), flights: "0.10", visa: "0.20" }, 1).totalBdt, 0.3);
  assert.equal(calculateUmrahBudget({ ...filled("0"), flights: "100" }, 3).perPersonBdt, 33.33);
});
test("one missing category still prevents a complete budget", () => {
  const result = calculateUmrahBudget({ ...filled("0"), meals: "  " }, 1);
  assert.deepEqual(result.missing, ["meals"]);
  assert.equal(result.totalBdt, null);
});
for (const value of ["-1", "Infinity", "NaN", "1e6", "12abc", "1,000", "0.001", "1000000001", "<script>"]) {
  test(`reject invalid money: ${value}`, () => {
    const result = calculateUmrahBudget({ ...filled("0"), flights: value }, 2);
    assert.deepEqual(result.invalid, ["flights"]);
    assert.equal(result.totalBdt, null);
  });
}
for (const party of [0, -1, 1.5, 101, NaN, Infinity]) {
  test(`reject invalid traveller count: ${party}`, () => {
    const result = calculateUmrahBudget(filled("1"), party);
    assert.equal(result.validParty, false);
    assert.equal(result.perPersonBdt, null);
  });
}
test("supported bounds stay finite and within safe money arithmetic", () => {
  assert.equal(calculateUmrahBudget(filled("1000000000"), 100).totalBdt, 8000000000);
  assert.equal(calculateUmrahBudget({ ...filled("0"), flights: " 1.25 " }, 1).totalBdt, 1.25);
});
for (const isBn of [false, true]) {
  test(`initial ${isBn ? "BN" : "EN"} markup has every input, caveats and no invented total`, () => {
    const html = renderToStaticMarkup(React.createElement(UmrahBudgetCalculator, { isBn }));
    for (const { key } of UMRAH_BUDGET_ITEMS) assert.ok(html.includes(`id="umrah-cost-${key}"`));
    assert.ok(html.includes('id="umrah-budget-pilgrims"'));
    assert.ok(html.includes('aria-live="polite"'));
    assert.ok(html.includes(isBn ? "হিসাব অসম্পূর্ণ" : "Incomplete"));
    assert.ok(html.includes(isBn ? "পুনরায় দাম যাচাই করা হয়নি" : "not re-priced"));
    assert.ok(html.includes(isBn ? "পুরো দলের" : "whole party"));
    assert.ok(!html.includes('data-umrah-budget-total="true"'));
    assert.ok(!/66000|84000|17500|9500|USD @|SAR ≈/.test(html));
  });
}
for (const lang of ["en", "bn"] as const) {
  test(`${lang} Hajj/Umrah topic cards do not republish unreviewed research as advice`, () => {
    const html = renderToStaticMarkup(React.createElement(TopicalAuthorityBlueprint, { lang, onNavigate: () => {} }));
    for (const node of TOPICAL_BLOG_NODES.filter((node) => node.clusterId === "hajj-umrah" || node.clusterId === "islamic-stopover")) {
      assert.ok(node.monthlyIntentSignal.startsWith("Not measured"));
      const card = html.split(`data-topic-id="${node.id}"`)[1]?.split("</article>")[0] ?? "";
      assert.ok(card.includes(lang === "bn" ? "পরিমাপ করা হয়নি" : "not measured"));
      assert.ok(card.includes(lang === "bn" ? "বিষয় ও প্রশ্নের পরিকল্পনা" : "topic and question map"));
      assert.ok(!card.includes("EAV:"));
      assert.ok(!card.includes("AEO Direct Answer"));
      assert.ok(!card.includes("Customer Psychology"));
    }
  });
}
console.log(`\n${assertions} Umrah budget and topic-map tests passed.`);
