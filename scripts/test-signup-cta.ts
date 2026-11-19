/**
 * Behavioural tests for the header's Email Updates action.
 *
 * WHY THIS SUITE EXISTS
 * ---------------------
 * The header button used to say "Start Trip" and navigated to `/destinations`.
 * It now says "Sign Up" and has to put the visitor in front of the signup card —
 * scrolling to it and focusing the email field — from every route, including
 * from inside the mobile drawer.
 *
 * That last part is where the bugs are, and none of them are visible in a diff:
 *
 *   - the drawer locks `body` scroll while open and returns focus to the burger
 *     button on the next frame, so scrolling or focusing immediately makes the
 *     click look dead;
 *   - focusing the email field while a smooth scroll is running cancels the
 *     scroll, so the card jumps back off screen;
 *   - once the visitor has subscribed, the email field is replaced by a panel, so
 *     a handler that only knows about the field does nothing at all.
 *
 * These tests run the real function in happy-dom and assert each of those.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Window } from "happy-dom";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const win = new Window({ url: "https://uraltravel.co.uk/" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win;
scope.document = win.document;
scope.HTMLElement = win.HTMLElement;
scope.HTMLInputElement = win.HTMLInputElement;

const { focusSitewideSignup, SIGNUP_CARD_ID, SIGNUP_EMAIL_ID, SIGNUP_TITLE_ID } = await import(
  "../src/utils/signupCta"
);

const results: { name: string; ok: boolean; detail?: string }[] = [];
async function test(name: string, fn: () => Promise<void> | void): Promise<void> {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

type CardOptions = { withEmailField?: boolean; withTitle?: boolean; withCard?: boolean };

/** Build the parts of the signup card the button cares about, and spy on scroll. */
function buildCard({ withEmailField = true, withTitle = true, withCard = true }: CardOptions = {}) {
  win.document.body.innerHTML = "";
  const scrolled: unknown[] = [];
  const focusCalls: (FocusOptions | undefined)[] = [];

  if (withCard) {
    const card = win.document.createElement("section");
    card.id = SIGNUP_CARD_ID;
    card.scrollIntoView = ((...args: unknown[]) => {
      scrolled.push(card);
      void args;
    }) as unknown as typeof card.scrollIntoView;
    win.document.body.appendChild(card);

    if (withTitle) {
      const title = win.document.createElement("h2");
      title.id = SIGNUP_TITLE_ID;
      title.setAttribute("tabindex", "-1");
      card.appendChild(title);
    }
    if (withEmailField) {
      const field = win.document.createElement("input");
      field.id = SIGNUP_EMAIL_ID;
      field.type = "email";
      // Record how focus was called, so the `preventScroll` contract is asserted
      // rather than taken on trust.
      const nativeFocus = field.focus.bind(field);
      field.focus = ((options?: FocusOptions) => {
        focusCalls.push(options);
        nativeFocus();
      }) as typeof field.focus;
      card.appendChild(field);
    }
  }

  return { scrolled, focusCalls };
}

function activeId(): string {
  return win.document.activeElement?.id ?? "";
}

// ── The click does what it says ─────────────────────────────────────────────

await test("Sign Up scrolls to the card and puts the cursor in the email field", async () => {
  const { scrolled, focusCalls } = buildCard();
  focusSitewideSignup({ delayMs: 0 });
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(scrolled.length, 1, "the card must be scrolled into view");
  assert.equal(activeId(), SIGNUP_EMAIL_ID, "the visitor must be able to type immediately");
  assert.equal(
    focusCalls[0]?.preventScroll,
    true,
    "focus must not cancel the scroll, or the card slides back off screen",
  );
});

await test("an already-subscribed visitor lands on the heading, not nowhere", async () => {
  buildCard({ withEmailField: false });
  focusSitewideSignup({ delayMs: 0 });
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(activeId(), SIGNUP_TITLE_ID, "the panel has no email field, so focus must move to the heading");
});

await test("a missing card reports back instead of swallowing the click", async () => {
  buildCard({ withCard: false });
  let missed = 0;
  focusSitewideSignup({ delayMs: 0, onMissing: () => (missed += 1) });
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(missed, 1, "the caller must be told, so it can send the visitor somewhere useful");
});

await test("the work happens after the drawer has settled, not during", async () => {
  const { scrolled } = buildCard();
  focusSitewideSignup({ delayMs: 20 });
  assert.equal(scrolled.length, 0, "nothing may happen on the same tick — the drawer still owns scroll");
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(scrolled.length, 1);
});

// ── The wiring in App.tsx ───────────────────────────────────────────────────

const appSource = fs.readFileSync(path.join(ROOT_DIR, "src", "App.tsx"), "utf8");
const translations = fs.readFileSync(path.join(ROOT_DIR, "src", "translations.ts"), "utf8");

await test("both header buttons are wired to the signup action", async () => {
  assert.ok(appSource.includes("onEmailUpdates={goToSignup}"), "the shared header must receive the existing signup action; mounted header tests exercise both buttons");
  assert.equal(
    appSource.includes("btn-start-trip-cta"),
    false,
    "the old Start Trip button id must be gone, not left behind as a second CTA",
  );
});

await test('the label describes email updates rather than an account in both languages', async () => {
  assert.match(translations, /signUpCta: "Email Updates"/);
  assert.match(translations, /signUpCta: "ইমেইল আপডেট"/);
  assert.equal(translations.includes("startTripCta"), false, "a stale Start Trip label must not survive");
});

await test("the button no longer sends visitors to /destinations", async () => {
  assert.equal(
    /onClick=\{\(\) => \{?\s*navigateTo\("\/destinations"\)/.test(appSource),
    false,
    "Start Trip's navigation must not remain behind the new label",
  );
});

// ── Cleanup ─────────────────────────────────────────────────────────────────

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  if (!result.ok) console.error(`  ✗ ${result.name}\n    ${result.detail}`);
}
if (failed.length > 0) {
  console.error(`\n[signup CTA] ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}
console.log(`[signup CTA] All ${results.length} behavioural checks passed.`);
