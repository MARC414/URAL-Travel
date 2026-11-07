/**
 * Visa-claim integrity (WP1).
 *
 * Two rules, both taken from the owner's Number rule — "every published money
 * figure carries a date and a source, or it does not render" — and extended to
 * visa claims, where a wrong figure costs a reader a flight.
 *
 * RULE 1 — no fabricated certainty. Nobody outside the deciding mission can
 * promise a visa outcome. The Immigration Department of Malaysia's own eVISA
 * FAQ says an application "does not guarantee that the eVISA will be issued"
 * and the mission "reserves the right to refuse ... without providing any
 * reason". So the words below must never appear as a promise.
 *
 * RULE 2 — no undated processing-time figure. A bare "2-4 working days" ages
 * into a falsehood with nobody noticing. Any processing duration in reader-
 * facing content has to sit next to the official portal's own figure, or carry
 * a verification date.
 *
 * Deliberately source-text based, like test-tool-analytics.ts: these are
 * prose assertions, and rendering them would need a browser.
 */

import { existsSync as fsExists, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

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

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|jsx)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Reader-facing source files: the app, and nothing under scripts/ or docs/. */
const contentFiles = [
  ...walk(path.join(ROOT, "src")),
  ...walk(path.join(ROOT, "functions")),
].filter((file) => !file.endsWith(".test.ts"));

/** Treat en/em dashes as hyphens so a claim reads the same however it was typed. */
function normalise(text: string): string {
  return text.replace(/[\u2013\u2014]/g, "-");
}

/** Blank out comment lines so explanatory prose never trips a content rule. */
function stripComments(source: string): string {
  return source
    .split("\n")
    .map((line) => (/^\s*(\/\/|\*|\/\*)/.test(line) ? "" : line))
    .join("\n");
}

/**
 * The text within `radius` characters of any mention of Malaysia. Visa rules
 * are asserted in prose, so distance from the country name is the only reliable
 * proxy for "is this claim about Malaysia" — a whole-file check would let a
 * Singapore figure condemn a Malaysia page, and a per-line check would miss a
 * question whose answer sits on the next line.
 */
function malaysiaWindows(source: string, radius = 700): string[] {
  const windows: string[] = [];
  const re = /malaysia|মালয়েশিয়া/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source)) !== null) {
    windows.push(source.slice(Math.max(0, match.index - radius), match.index + radius));
  }
  return windows;
}

function read(rel: string): string {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

/**
 * NAMED DEBT — deliberately EMPTY.
 *
 * While WP1 was being delivered this list held the five live claims that step 1
 * did not yet correct, so the suite could ship green without pretending the site
 * was clean. Step 2 corrected all five, and the "named debt is still real" test
 * below failed until each entry was deleted. That is the point of the design: the
 * list can only shrink, never quietly absorb a new violation.
 *
 * If this rule ever fails, FIX THE COPY. Do not add an entry here.
 */
const KNOWN_DEBT: { file: string; claim: string; note: string }[] = [];

// ---------------------------------------------------------------------------
// RULE 1: no guaranteed visa outcomes.
// ---------------------------------------------------------------------------

/** Phrases that promise an approval outcome. Matched case-insensitively. */
const GUARANTEE_PATTERNS: { label: string; re: RegExp }[] = [
  { label: '"100% approval"', re: /100\s*%\s*approval/i },
  { label: '"guaranteed visa"', re: /guarantee[ds]?\s+(a\s+|the\s+|your\s+)?visa/i },
  { label: '"visa guaranteed"', re: /visa\s+guaranteed/i },
  { label: '"100% visa"', re: /100\s*%\s*visa/i },
  { label: '"assured approval"', re: /assured\s+approval/i },
  { label: '"certain approval"', re: /certain\s+approval/i },
];

/** Negations that turn a guarantee phrase into a disclaimer — the opposite. */
const NEGATION = /(do not|does not|don't|doesn't|never|cannot|can not|no|not|without)\s+(\w+\s+){0,3}$/i;

test("no file promises a visa approval outcome", () => {
  const offenders: string[] = [];
  for (const file of contentFiles) {
    const source = stripComments(readFileSync(file, "utf8"));
    for (const { label, re } of GUARANTEE_PATTERNS) {
      source.split("\n").forEach((line, i) => {
        const global = new RegExp(re.source, "gi");
        let match: RegExpExecArray | null;
        while ((match = global.exec(line)) !== null) {
          // "these links do not guarantee visa approval" is a disclaimer, which
          // is the wording we WANT. Only an unnegated promise is a defect.
          const before = line.slice(0, match.index);
          if (NEGATION.test(before)) continue;
          offenders.push(`${path.relative(ROOT, file)}:${i + 1} ${label}`);
        }
      });
    }
  }
  assert(offenders.length === 0, `guaranteed-approval wording found:\n    ${offenders.join("\n    ")}`);
});

test("the pattern list would actually catch the copy that was removed", () => {
  // The line below is the exact sentence deleted from InteractiveTools.tsx.
  // If this stops matching, RULE 1 has gone quietly toothless.
  const removed =
    'text: "An eVisa is easily applied for online with 100% approval rates when bank statements show BDT 80,000+ per person. Processing duration: 48-72 hours."';
  const caught = GUARANTEE_PATTERNS.some(({ re }) => re.test(removed));
  assert(caught, "the removed '100% approval rates' sentence is no longer detected");
});

// ---------------------------------------------------------------------------
// RULE 2: no undated processing-time figures.
// ---------------------------------------------------------------------------

/**
 * Malaysia is the corridor this rule was written for, so it is the one that is
 * policed hardest. The official figure is "2 - 7 working days" — a range, not
 * a single number — so any narrower claim is treated as unverified.
 */
/**
 * The official figure's upper bound. A range that ends before this is telling
 * the reader to expect a decision sooner than the department promises.
 */
const OFFICIAL_MALAYSIA_UPPER_WORKING_DAYS = 7;

/**
 * Finds any quoted processing duration in a passage and returns a label if its
 * upper bound is narrower than the official range.
 *
 * Deliberately a parser, not a blocklist. A blocklist of the exact strings that
 * happened to be live on 6 Nov 2026 would pass a build that introduced "1-2
 * working days" the next day. (That is not hypothetical: the first version of
 * this test was a blocklist and the negative control walked straight past it.)
 */
function narrowProcessingClaim(passage: string): string | null {
  // The separator matters: copy says "2-4", "2–4" and "2 to 4" interchangeably.
  // Matching only hyphens let a restored "2 to 4 working days" walk straight
  // past this test — caught by a negative control, not by review.
  const workingDays = /(\d+)\s*(?:[-–—]|to)\s*(\d+)\s*working\s*days/gi;
  let match: RegExpExecArray | null;
  while ((match = workingDays.exec(passage)) !== null) {
    if (Number(match[2]) < OFFICIAL_MALAYSIA_UPPER_WORKING_DAYS) return match[0];
  }
  // Hour-denominated claims are narrower than any working-day range by design.
  const hours = /(\d+)\s*(?:[-–—]|to)\s*(\d+)\s*(hours|hrs|ঘণ্টা)/gi;
  while ((match = hours.exec(passage)) !== null) {
    return match[0];
  }
  // A bare "within 3 days" is deliberately NOT matched: the MDAC arrival card
  // is genuinely due within 3 days of landing, and that is a different clock
  // from visa processing. Only quoted ranges are policed.
  return null;
}

test("no Malaysia processing time is narrower than the official 2-7 working days", () => {
  const offenders: string[] = [];
  for (const file of contentFiles) {
    const source = stripComments(readFileSync(file, "utf8"));
    const rel = path.relative(ROOT, file);
    const declared = KNOWN_DEBT.filter((entry) => entry.file === rel);
    for (const window of malaysiaWindows(source)) {
      const claim = narrowProcessingClaim(window);
      if (!claim) continue;
      const wound = normalise(claim);
      if (declared.some((entry) => normalise(entry.claim) === wound)) continue;
      offenders.push(`${rel} "${claim}"`);
    }
  }
  assert(
    offenders.length === 0,
    `narrow Malaysia processing claims found:\n    ${[...new Set(offenders)].join("\n    ")}\n    official figure: "2 - 7 working days" (malaysiavisa.imi.gov.my/faq, updated 6 Oct 2026)`
  );
});

test("every file that states a Malaysia processing time names the official portal", () => {
  const offenders: string[] = [];
  const statesADuration = /\d+\s*[-–]\s*\d+\s*working\s*days/i;
  for (const file of contentFiles) {
    const source = stripComments(readFileSync(file, "utf8"));
    const quotes = malaysiaWindows(source).some((window) => statesADuration.test(window));
    if (!quotes) continue;
    const rel = path.relative(ROOT, file);
    if (source.includes("malaysiavisa.imi.gov.my")) continue;
    if (KNOWN_DEBT.some((entry) => entry.file === rel)) continue;
  }
  assert(
    offenders.length === 0,
    `files quote a Malaysia processing time without naming the official portal:\n    ${offenders.join("\n    ")}`
  );
});

test("no unverified visa claim is quietly exempted", () => {
  // A stale entry would silently exempt a file forever. When a figure is
  // corrected, this fails until the entry is deleted, so the list can only
  // shrink — and it is empty today.
  assert(KNOWN_DEBT.length === 0, `KNOWN_DEBT must stay empty; ${KNOWN_DEBT.length} entr(y/ies) declared`);
  const stale: string[] = [];
  for (const entry of KNOWN_DEBT) {
    const source = stripComments(readFileSync(path.join(ROOT, entry.file), "utf8"));
    if (!normalise(source).includes(normalise(entry.claim))) {
      stale.push(`${entry.file} — "${entry.claim}" (${entry.note})`);
    }
  }
  assert(
    stale.length === 0,
    `these declarations no longer match the source; delete them from KNOWN_DEBT:\n    ${stale.join("\n    ")}`
  );
});

// ---------------------------------------------------------------------------
// The removal itself: no dangling link to the deleted tool.
// ---------------------------------------------------------------------------

test("nothing links to the removed /tools/visa-checker page", () => {
  const offenders: string[] = [];
  for (const file of [...contentFiles, ...walk(path.join(ROOT, "scripts"))]) {
    if (file.endsWith("test-visa-claim-integrity.ts")) continue;
    const source = readFileSync(file, "utf8");
    source.split("\n").forEach((line, i) => {
      if (!line.includes("/tools/visa-checker")) return;
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // explanatory comments are fine
      offenders.push(`${path.relative(ROOT, file)}:${i + 1}`);
    });
  }
  assert(offenders.length === 0, `dangling links to the removed tool:\n    ${offenders.join("\n    ")}`);
});

test("the removed tool is recorded, and permanently redirected in both languages", () => {
  const registry = read("src/utils/toolRoutes.ts");
  assert(registry.includes("REMOVED_TOOL_SLUGS"), "the removal record is missing from toolRoutes.ts");
  assert(
    registry.includes('REMOVED_TOOL_SLUGS = ["visa-checker"]'),
    "REMOVED_TOOL_SLUGS does not list visa-checker"
  );

  const redirects = read("public/_redirects");
  for (const rule of ["/tools/visa-checker   /tools   301", "/bn/tools/visa-checker   /bn/tools   301"]) {
    assert(redirects.includes(rule), `missing 301: ${rule}`);
  }

  const middleware = read("functions/_middleware.js");
  assert(
    !/["']?visa-checker["']?\s*:\s*["']visa-checker["']/.test(middleware),
    "middleware still maps ?tab=visa-checker to the deleted page"
  );
});

test("no tool tab can ship unmeasured", () => {
  // WP4 shipped `Partial<Record<...>>`, which silently allowed an uninstrumented
  // tab. Narrowing it to a full Record means the next added tab fails tsc.
  const tools = read("src/components/InteractiveTools.tsx");
  assert(
    tools.includes("const TOOL_ID_BY_TAB: Record<ActiveTool, ToolId>"),
    "TOOL_ID_BY_TAB is Partial again — a new tool could ship without measurement"
  );
});

// ---------------------------------------------------------------------------
// Payments: the site must never imply URAL takes the money.
// ---------------------------------------------------------------------------

/**
 * Q4 (owner, 7 Nov 2026): URAL takes no payment for travel services. The risk
 * is not a direct claim — those are gone — but a *silent subject*: an article
 * that says "message the desk ... pay by bKash" on URAL's own domain, leaving
 * the reader to assume URAL is the desk. A disclaimer at the end of the page is
 * not enough when the instruction itself implies it.
 */
test("no article instructs the reader to pay or send documents without naming the recipient", () => {
  const offenders: string[] = [];
  const paymentInstruction =
    /(pay|send|message)\s+(the\s+)?desk\b|message our desk|pay in BDT|pay by bank transfer, \*\*bKash\*\*/i;
  for (const file of contentFiles) {
    const source = stripComments(readFileSync(file, "utf8"));
    source.split("\n").forEach((line, i) => {
      if (!paymentInstruction.test(line)) return;
      // A nearby explicit disclaimer satisfies the rule.
      const context = source.slice(Math.max(0, i - 2000), i + 2000);
      const namesAudience = /(agency|agent|airline|platform|hotel|desk|office)/i.test(line);
      const disclaims = /URAL is not that desk|not to URAL|does not take your payment|agency you (have )?chosen/i.test(context);
      if (namesAudience && disclaims) return;
      if (!/desk/i.test(line)) return; // unambiguous subjects are fine
      offenders.push(`${path.relative(ROOT, file)}:${i + 1} "${line.trim().slice(0, 90)}"`);
    });
  }
  assert(
    offenders.length === 0,
    `payment instructions with an unnamed 'desk':\n    ${offenders.join("\n    ")}`
  );
});

// ---------------------------------------------------------------------------
// Deleted articles: redirect the URL, don't keep linking to it.
// ---------------------------------------------------------------------------

/**
 * A 301 is for outside traffic. If the site itself still links to a deleted
 * page, that visitor takes an avoidable extra hop, and the link is a promise the
 * page still exists. Every slug redirected in `public/_redirects` must therefore
 * be absent from src/, scripts/ and index.html — except the redirect file itself.
 */
test("no internal link points at a URL that only exists to be redirected", () => {
  const redirects = read("public/_redirects");
  const redirectedBlogSlugs = [...redirects.matchAll(/^\/blog\/([a-z0-9-]+)\s+\S+\s+301$/gm)].map(
    (match) => match[1]
  );
  assert(redirectedBlogSlugs.length > 0, "expected at least one redirected blog slug");

  const offenders: string[] = [];
  const files = [
    ...contentFiles,
    ...walk(path.join(ROOT, "scripts")).filter((file) => file !== import.meta.filename),
    path.join(ROOT, "index.html"),
  ];
  for (const file of files) {
    const source = stripComments(readFileSync(file, "utf8"));
    for (const slug of redirectedBlogSlugs) {
      // An in-app upgrade (a legacy-URL normaliser) is the same decision as the
      // edge 301, written twice on purpose so client and edge agree. It maps the
      // URL away rather than linking to it, so it is not a dangling link.
      const upgrades = new RegExp(
        `(if\\(?\\s*|===?\\s*)[\"\`](/(bn/)?blog/${slug})[\"\`][\\s\\S]{0,120}?return\\s+[\"\`]`
      ).test(source);
      if (upgrades) continue;
      if (source.includes(`/blog/${slug}`)) offenders.push(`${path.relative(ROOT, file)} -> /blog/${slug}`);
    }
  }
  assert(offenders.length === 0, `internal links to redirected URLs:\n    ${offenders.join("\n    ")}`);
});

test("every redirected blog URL really is gone from the build", () => {
  const redirects = read("public/_redirects");
  const slugs = [...redirects.matchAll(/^\/blog\/([a-z0-9-]+)\s+\S+\s+301$/gm)].map((m) => m[1]);
  const distDir = path.join(ROOT, "dist");
  if (!fsExists(distDir)) return; // build not run: nothing to assert
  const stillBuilt = slugs.filter((slug) => fsExists(path.join(distDir, "blog", `${slug}.html`)));
  assert(stillBuilt.length === 0, `redirected but still prerendered: ${stillBuilt.join(", ")}`);
});

// ---------------------------------------------------------------------------
// Affiliate honesty: a commission link must say so.
// ---------------------------------------------------------------------------

/**
 * RULE: any component that sends the reader to an affiliate partner must
 * disclose that URAL may earn a commission. This is not about taste — an
 * undisclosed paid link is a regulatory problem in the UK (CAP/CMA) and the EU,
 * and it is indefensible on a site whose whole pitch is that it does not
 * pretend. JourneyHelpPanel already did this correctly; AirHelpWidget opened
 * partner links with no statement at all until 7 Nov 2026.
 */
test("the site carries a conspicuous site-wide affiliate disclosure", () => {
  // Most partner surfaces rely on this footer disclosure, which is why a
  // per-component rule would be wrong: it asserts a fact that is already true
  // once, globally. What must not happen is losing it.
  const app = read("src/App.tsx");
  const hasDisclosure =
    /Affiliate disclosure:/i.test(app) && /may earn a commission at no extra cost to you/i.test(app);
  assert(
    hasDisclosure,
    "the footer affiliate disclosure (\"Some outbound links are affiliate links; we may earn a commission at no extra cost to you\") is missing from src/App.tsx"
  );
  const bnDisclosure = /অ্যাফিলিয়েট ডিসক্লোজার/.test(app) && /কমিশন/.test(app);
  assert(bnDisclosure, "the Bengali affiliate disclosure is missing");
});

test("a tab that is wholly an affiliate placement discloses locally, not just in the footer", () => {
  // An 11px footer line does not carry a whole tab whose only content is a
  // commissioned CTA. AirHelp is presented in the Tools tab bar next to tools
  // URAL actually built, so the local statement is what stops the implication.
  const airhelp = read("src/components/AirHelpWidget.tsx");
  const discloses =
    /affiliate partner, AirHelp/i.test(airhelp) && /may earn a commission if you claim/i.test(airhelp);
  assert(discloses, "AirHelpWidget no longer discloses the AirHelp affiliate relationship locally");
});

test("the affiliate guard would catch a component that dropped its disclosure", () => {
  // Negative control on the checker itself: the disclosure regex must match the
  // shipped wording, or the rule above is vacuous.
  const shipped =
    "URAL may earn a commission if you claim through them, at no extra cost to you.";
  assert(
    /may earn a commission|commission if you (buy|claim)/i.test(shipped),
    "the disclosure regex no longer matches the wording actually used on the site"
  );
});

// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`\n${failures.length} visa-claim integrity test(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`\n${passed} visa-claim integrity tests passed.`);
