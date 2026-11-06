import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { checklistProgress } from "../src/utils/checklistProgress";
import { InteractiveTools } from "../src/components/InteractiveTools";

let assertions = 0;
function test(name: string, run: () => void) {
  run();
  assertions++;
  console.log(`PASS ${name}`);
}

/** The defect this suite exists to prevent: the shipped `* 105` formula. */
const buggy = (checked: number, total: number) => Math.round((checked / total) * 105);

test("0 checked is 0% and all checked is exactly 100%", () => {
  assert.equal(checklistProgress(0, 12), 0);
  assert.equal(checklistProgress(12, 12), 100);
  assert.equal(checklistProgress(7, 7), 100);
});

test("progress is exact for the shipped 12-item checklist", () => {
  // 3 of 12 was displayed as 26% by the old formula.
  assert.equal(checklistProgress(3, 12), 25);
  assert.equal(checklistProgress(6, 12), 50);
  assert.equal(checklistProgress(9, 12), 75);
  assert.equal(checklistProgress(11, 12), 92); // was 96%
});

test("progress never leaves 0-100", () => {
  for (const total of [1, 3, 7, 12, 20, 40]) {
    for (let checked = 0; checked <= total; checked++) {
      const value = checklistProgress(checked, total);
      assert.ok(value >= 0 && value <= 100, `${checked}/${total} -> ${value}`);
    }
  }
});

test("progress is monotonic: ticking an item never lowers the bar", () => {
  for (const total of [1, 3, 7, 12, 20, 40]) {
    let previous = -1;
    for (let checked = 0; checked <= total; checked++) {
      const value = checklistProgress(checked, total);
      assert.ok(value >= previous, `${checked}/${total} went backwards`);
      previous = value;
    }
  }
});

test("100% is reachable only when every item is ticked", () => {
  for (const total of [1, 5, 12, 20, 40]) {
    for (let checked = 0; checked < total; checked++) {
      assert.ok(checklistProgress(checked, total) < 100, `${checked}/${total} claimed 100%`);
    }
    assert.equal(checklistProgress(total, total), 100);
  }
});

test("a long checklist cannot report 100% early (the old bug's worst case)", () => {
  assert.equal(checklistProgress(19, 20), 95);
  assert.ok(buggy(19, 20) >= 100, "the old formula would have claimed 100%");
});

test("degenerate inputs are safe, never NaN", () => {
  assert.equal(checklistProgress(0, 0), 0);
  assert.equal(checklistProgress(5, 0), 0);
  assert.equal(checklistProgress(-3, 12), 0);
  assert.equal(checklistProgress(99, 12), 100);
  assert.equal(checklistProgress(NaN, 12), 0);
  assert.equal(checklistProgress(5, NaN), 0);
  assert.equal(checklistProgress(Infinity, 12), 0);
});

test("negative control: the shipped formula really was wrong", () => {
  // If this control ever stops failing, the suite has stopped testing anything.
  assert.notEqual(buggy(3, 12), checklistProgress(3, 12));
  assert.equal(buggy(3, 12), 26);
  assert.ok(buggy(12, 12) > 100, "old formula exceeded 100 and relied on a clamp");
});

test("the rendered checklist reports a truthful percentage", () => {
  // Cast keeps the prop contract without widening the component's own types.
  const html = renderToStaticMarkup(
    React.createElement(InteractiveTools as React.FC<{ initialTool?: "packing" }>, {
      initialTool: "packing",
    })
  );
  const match = html.match(/(\d+)% Ready/);
  assert.ok(match, "progress readout not found in rendered markup");
  const shown = Number(match[1]);

  // Checklist items are <button aria-pressed> (the budget-tier toggle uses
  // aria-pressed too), so scope the count to the block that follows the progress
  // readout. Derive the expectation from the markup so adding or removing a
  // default-ticked item cannot silently invalidate this test.
  const block = html.slice(html.indexOf("Verification Readiness Progress"));
  assert.ok(block.length > 0, "progress block not found");
  const total = block.match(/aria-pressed="(?:true|false)"/g)?.length ?? 0;
  const checked = block.match(/aria-pressed="true"/g)?.length ?? 0;
  assert.equal(total, 12, `expected 12 checklist items, found ${total}`);
  assert.equal(checked, 3, `expected 3 pre-ticked items, found ${checked}`);
  assert.equal(shown, checklistProgress(checked, total));
  assert.equal(shown, 25, `rendered ${shown}% for 3/12`);
  assert.ok(
    !new RegExp(`${buggy(checked, total)}% Ready`).test(html),
    "the old inflated value is still rendered"
  );
});

console.log(`\n${assertions} checklist-progress tests passed.`);
