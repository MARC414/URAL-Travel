/**
 * WhatsApp Answer Desk — integrity checks for the manual and the log.
 *
 * These are not code tests. They exist because the manual contains the exact
 * rules the website already had to be repaired for breaching: no approval rates,
 * no un-dated prices, no single processing figure where the authority publishes
 * a range, and no implication that URAL books or takes payment.
 *
 * A manual that drifts from those rules is worse than no manual: it would teach
 * the owner to repeat, in private messages, the claims we removed in public.
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANUAL = "docs/growth/WHATSAPP-ANSWER-DESK.md";
const LOG = "docs/growth/WHATSAPP-QUESTION-LOG.md";

let passed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed += 1;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(`${name}\n    ${(error as Error).message}`);
    console.log(`FAIL ${name}`);
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

// ---------------------------------------------------------------------------

test("the manual and the log both exist", () => {
  assert(existsSync(path.join(ROOT, MANUAL)), `missing ${MANUAL}`);
  assert(existsSync(path.join(ROOT, LOG)), `missing ${LOG}`);
});

test("the drafting prompt still forbids inventing figures", () => {
  const manual = read(MANUAL);
  // THE critical instruction: convert the model's confident number into a
  // visible gap. If this line is ever softened, the whole workflow loses its
  // safety property.
  assert(
    /\[NEEDS OFFICIAL FIGURE\]/.test(manual),
    "the [NEEDS OFFICIAL FIGURE] escape hatch is gone from the drafting prompt"
  );
  assert(
    /Give NO price, processing time, approval rate, or visa-validity figure/i.test(manual),
    "the prompt no longer forbids unsupplied figures"
  );
  assert(
    /Never say an application is guaranteed/i.test(manual),
    "the prompt no longer forbids guaranteed-approval wording"
  );
});

test("the manual carries the standing service line that states URAL takes no payment", () => {
  const manual = read(MANUAL);
  assert(
    /doesn't sell tickets, visas or hotel bookings and takes no payment/i.test(manual),
    "the standing 'we do not book or take payment' line is missing — WhatsApp replies would drift back to implying it"
  );
});

test("the refusal list names every claim the website had to remove", () => {
  const manual = read(MANUAL);
  const required = [
    /approval rate/i,
    /processing-time figure where the authority publishes a range/i,
    /Guaranteed/i,
    /price without a date and a source/i,
    /URAL books, issues tickets, or takes payment/i,
  ];
  const missing = required.filter((pattern) => !pattern.test(manual));
  assert(missing.length === 0, `refusal list has lost ${missing.length} entr(y/ies)`);
});

test("the manual never instructs sending before verifying", () => {
  const manual = read(MANUAL);
  // Ordering is the safety property: draft -> verify -> send. Assert the steps
  // appear in that order rather than trusting prose.
  const draft = manual.indexOf("### 3. Draft");
  const verify = manual.indexOf("### 4. Verify");
  const send = manual.indexOf("### 5. Send");
  assert(draft !== -1 && verify !== -1 && send !== -1, "a step heading is missing");
  assert(draft < verify && verify < send, "the steps are no longer in draft -> verify -> send order");
});

test("the log keeps a refusal record", () => {
  const log = read(LOG);
  assert(
    /Questions you refused to answer/.test(log),
    "the refusal section is gone — refusals are the evidence the desk does not guess"
  );
  assert(
    /Total questions logged/.test(log),
    "the running tallies are gone — they are the trigger for revisiting an on-site helper"
  );
});

test("the manual names official sources, not agencies, for visa rules", () => {
  const manual = read(MANUAL);
  const official = [
    "umrah.nusuk.sa",
    "malaysiavisa.imi.gov.my",
    "ksavisa.sa",
    "thaievisa.go.th",
  ];
  const missing = official.filter((host) => !manual.includes(host));
  assert(missing.length === 0, `official sources missing from the table: ${missing.join(", ")}`);
});

// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`\n${failures.length} answer-desk check(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`\n${passed} WhatsApp answer-desk checks passed.`);
