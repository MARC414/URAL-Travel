/**
 * Behavioural tests for the newsletter list: double opt-in.
 *
 * WHY THIS SUITE EXISTS
 * ---------------------
 * Until 17 November 2026 the signup form said "Subscription confirmed" and meant
 * "we emailed the desk". Nothing was stored, nobody confirmed anything, and no
 * unsubscribe existed — so the list could not be mailed and the consent it
 * claimed did not exist. `scripts/test-subscribe-endpoint.ts` only covers the
 * transport rules (origin gate, content type, body cap, honeypot, rate limit);
 * not one of those checks can tell whether consent is actually recorded.
 *
 * This suite runs the two real handlers — `POST /api/subscribe` and
 * `GET /api/confirm` — against a stubbed Resend API and asserts the properties
 * that make a list legal and useful:
 *
 *   1. A signup lands as `unsubscribed: true`, i.e. recorded but not mailable.
 *   2. The confirmation link is signed; edit one character and it is refused.
 *   3. Only a valid link sets `unsubscribed: false`.
 *   4. A failure is reported as a failure — never as a confirmed subscription.
 *   5. The page the visitor reads never claims a confirmation that has not
 *      happened (asserted against `src/App.tsx`).
 *
 * No network call is made and no mail is sent: `fetch` is stubbed.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequestPost } from "../functions/api/subscribe.js";
import { onRequestGet } from "../functions/api/confirm.js";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SUBSCRIBE_URL = "https://uraltravel.co.uk/api/subscribe";
const CONFIRM_URL = "https://uraltravel.co.uk/api/confirm";
const CONTACTS_URL = "https://api.resend.com/contacts";
const EMAILS_URL = "https://api.resend.com/emails";
const ALLOWED_ORIGIN = "https://uraltravel.co.uk";
const SEGMENT_ID = "11111111-2222-3333-4444-555555555555";

const CONFIGURED_ENV = {
  RESEND_API_KEY: "re_sending_key",
  RESEND_LIST_API_KEY: "re_list_key_abcdefghijklmnop",
  RESEND_SEGMENT_ID: SEGMENT_ID,
};

type Captured = {
  method: string;
  url: string;
  body: Record<string, unknown> | null;
};

let calls: Captured[] = [];
// Per-test behaviour for the parts of the Resend API the handlers depend on.
let scenario: {
  createStatus: number;
  existingUnsubscribed: boolean | null;
  patchStatus: number;
  emailStatus: number;
} = { createStatus: 201, existingUnsubscribed: null, patchStatus: 200, emailStatus: 200 };

const realFetch = globalThis.fetch;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const method = (init?.method || "GET").toUpperCase();
  const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : null;
  calls.push({ method, url, body });

  const json = (payload: unknown, status: number) =>
    new Response(JSON.stringify(payload), { status, headers: { "Content-Type": "application/json" } });

  if (url === EMAILS_URL) {
    return scenario.emailStatus === 200
      ? json({ id: "test-delivery" }, 200)
      : json({ message: "nope" }, scenario.emailStatus);
  }
  if (url === CONTACTS_URL && method === "POST") {
    return scenario.createStatus === 201
      ? json({ object: "contact", id: "contact-id" }, 201)
      : json({ message: "Contact already exists" }, scenario.createStatus);
  }
  if (/\/contacts\/[^/]+\/segments\/[^/]+$/.test(url) && method === "POST") {
    return json({ id: SEGMENT_ID }, 200);
  }
  if (/\/contacts\/[^/]+$/.test(url) && method === "PATCH") {
    return scenario.patchStatus === 200
      ? json({ object: "contact", id: "contact-id" }, 200)
      : json({ message: "failed" }, scenario.patchStatus);
  }
  if (/\/contacts\/[^/]+$/.test(url) && method === "GET") {
    if (scenario.existingUnsubscribed === null) return json({ message: "Not found" }, 404);
    return json({ object: "contact", unsubscribed: scenario.existingUnsubscribed }, 200);
  }
  throw new Error(`unexpected outbound fetch: ${method} ${url}`);
}) as typeof fetch;

// 3 signups / 10 minutes per address, so each case gets a distinct IP.
let ipCounter = 0;
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter % 250}`;
}

const validSignup = {
  email: "ayesha@example.com",
  source: "Shared Pre-footer Signup",
  subscriptionInterests: ["Dhaka flight fare-drop alerts"],
  subscriptionId: "URAL-SUB-123456",
  language: "English (EN)",
  pageUrl: "https://uraltravel.co.uk/",
  _honey: "",
};

async function subscribe(
  overrides: Record<string, unknown> = {},
  env: Record<string, string> = CONFIGURED_ENV,
  scenarioOverrides: Partial<typeof scenario> = {},
) {
  calls = [];
  scenario = {
    createStatus: 201,
    existingUnsubscribed: null,
    patchStatus: 200,
    emailStatus: 200,
    ...scenarioOverrides,
  };
  const headers = new Headers({ "cf-connecting-ip": nextIp(), "Content-Type": "application/json" });
  headers.set("Origin", ALLOWED_ORIGIN);
  const response = await onRequestPost({
    request: new Request(SUBSCRIBE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...validSignup, ...overrides }),
    }),
    env,
  });
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }
  return { response, json };
}

/** The confirmation email captured from the stubbed Resend API. */
function confirmationMail(): { to: string[]; subject: string; html: string } {
  const mail = calls.filter((call) => call.url === EMAILS_URL && call.method === "POST");
  const captured = mail
    .map((call) => call.body as { to?: string[]; subject?: string; html?: string })
    .find((body) => Array.isArray(body.to) && body.to[0] === validSignup.email);
  assert.ok(captured, "a confirmation email must be sent to the subscriber");
  return {
    to: captured.to as string[],
    subject: String(captured.subject ?? ""),
    html: String(captured.html ?? ""),
  };
}

function deskMail(): { to: string[]; html: string } {
  const found = calls
    .filter((call) => call.url === EMAILS_URL && call.method === "POST")
    .map((call) => call.body as { to?: string[]; html?: string })
    .find((body) => Array.isArray(body.to) && body.to[0] === "marcwriter2025@gmail.com");
  assert.ok(found, "the desk copy must still be sent");
  return { to: found.to as string[], html: String(found.html ?? "") };
}

function tokenFrom(html: string): string {
  const match = /api\/confirm\?t=([^"&\s<]+)/.exec(html);
  assert.ok(match, "the confirmation email must carry a /api/confirm link");
  return decodeURIComponent(match[1]);
}

async function confirm(token: string, env: Record<string, string> = CONFIGURED_ENV) {
  calls = [];
  const url = token ? `${CONFIRM_URL}?t=${encodeURIComponent(token)}` : CONFIRM_URL;
  const response = await onRequestGet({ request: new Request(url), env });
  const html = await response.text();
  return { response, html };
}

const results: { name: string; ok: boolean; detail?: string }[] = [];
async function test(name: string, fn: () => Promise<void> | void): Promise<void> {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

// ── Recorded, but not mailable ──────────────────────────────────────────────

await test("a signup is stored as a pending contact, not a subscriber", async () => {
  const { response, json } = await subscribe();
  assert.equal(response.status, 200);
  assert.equal(json?.ok, true);
  assert.equal(json?.pending, true, "the browser must be told the address is awaiting confirmation");

  const created = calls.find((call) => call.url === CONTACTS_URL && call.method === "POST");
  assert.ok(created, "the address must be written to the contact list");
  assert.equal(
    (created.body as Record<string, unknown>).unsubscribed,
    true,
    "a fresh signup must be created unsubscribed — that flag is the consent gate",
  );
  assert.deepEqual(
    (created.body as Record<string, unknown>).segments,
    [{ id: SEGMENT_ID }],
    "the contact must join the configured segment, or no mailout can reach them later",
  );
});

await test("the visitor is asked to confirm, and the desk is told they have not yet", async () => {
  await subscribe();
  const mail = confirmationMail();
  assert.match(mail.subject, /confirm/i);
  assert.ok(mail.html.includes("/api/confirm?t="), "the email must carry the confirmation link");
  assert.match(deskMail().html, /Awaiting confirmation/);
});

await test("the confirmation email says ignoring it costs them nothing", async () => {
  await subscribe();
  assert.match(confirmationMail().html, /ignore this email/i);
});

// ── The link is the only thing that grants consent ───────────────────────────

await test("a valid link activates the contact and only then", async () => {
  await subscribe();
  const token = tokenFrom(confirmationMail().html);
  const { response, html } = await confirm(token);
  assert.equal(response.status, 200);
  assert.match(html, /on the list/i);

  const patch = calls.find((call) => call.method === "PATCH");
  assert.ok(patch, "confirming must update the contact");
  assert.equal((patch.body as Record<string, unknown>).unsubscribed, false, "consent is this single flag");
});

await test("tampering with the address in a link is refused", async () => {
  await subscribe();
  const token = tokenFrom(confirmationMail().html);
  const [encoded, signature] = token.split(".");
  const forged = `${Buffer.from("someone.else@example.com").toString("base64url")}.${signature}`;
  assert.notEqual(encoded, forged.split(".")[0]);

  const { response } = await confirm(forged);
  assert.equal(response.status, 400);
  assert.equal(calls.filter((call) => call.method === "PATCH").length, 0, "nothing may be written");
});

await test("a truncated or invented token is refused", async () => {
  for (const token of ["", "abc", "abc.def", "....", "a".repeat(500)]) {
    const { response } = await confirm(token);
    assert.equal(response.status, 400, `token ${JSON.stringify(token.slice(0, 12))} must be refused`);
    assert.equal(calls.filter((call) => call.method === "PATCH").length, 0);
  }
});

await test("a contact deleted from the list gets a clear page, not a silent 500", async () => {
  await subscribe();
  const token = tokenFrom(confirmationMail().html);
  scenario.patchStatus = 404;
  calls = [];
  const { response, html } = await confirm(token);
  assert.equal(response.status, 410);
  assert.match(html, /no longer on the list/i);
});

await test("the confirmation page is never indexed or cached", async () => {
  await subscribe();
  const { response } = await confirm(tokenFrom(confirmationMail().html));
  assert.match(String(response.headers.get("x-robots-tag")), /noindex/);
  assert.match(String(response.headers.get("cache-control")), /no-store/);
});

// ── Re-submitting the same address ──────────────────────────────────────────

await test("someone who already confirmed is told so instead of being re-confirmed", async () => {
  const { response, json } = await subscribe({}, CONFIGURED_ENV, {
    createStatus: 409,
    existingUnsubscribed: false,
  });
  assert.equal(response.status, 200);
  assert.equal(json?.alreadyConfirmed, true);
  assert.equal(json?.pending, false);
  assert.equal(
    calls.filter((call) => call.url === EMAILS_URL).length,
    0,
    "a confirmed subscriber must not be sent another confirmation email",
  );
});

await test("someone still pending can ask for the link again", async () => {
  const { response, json } = await subscribe({}, CONFIGURED_ENV, {
    createStatus: 409,
    existingUnsubscribed: true,
  });
  assert.equal(response.status, 200);
  assert.equal(json?.pending, true);
  confirmationMail();
  assert.equal(
    calls.filter((call) => /\/segments\//.test(call.url)).length,
    1,
    "an existing contact is still added to the segment, or the list misses them",
  );
});

// ── Failure must look like failure ──────────────────────────────────────────

await test("when the list write fails the visitor is told, not congratulated", async () => {
  const { response, json } = await subscribe({}, CONFIGURED_ENV, { createStatus: 500 });
  assert.equal(response.status, 502);
  assert.equal(json?.ok, false);
  assert.equal(json?.pending, undefined);
});

await test("when the confirmation email fails the visitor is told to retry", async () => {
  const { response, json } = await subscribe({}, CONFIGURED_ENV, { emailStatus: 500 });
  assert.equal(response.status, 502);
  assert.equal(json?.code, "confirmation_email_failed");
});

await test("a desk-copy failure cannot reject a subscriber who is on the list", async () => {
  // First email call is the confirmation (to the subscriber); make only the
  // second one fail. `subscribe()` resets the scenario, so drive it by hand.
  calls = [];
  scenario = { createStatus: 201, existingUnsubscribed: null, patchStatus: 200, emailStatus: 200 };
  let emailCount = 0;
  const previous = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    if (url === EMAILS_URL) {
      emailCount += 1;
      if (emailCount > 1) return new Response(JSON.stringify({ message: "desk down" }), { status: 500 });
    }
    return previous(input as RequestInfo, init);
  }) as typeof fetch;

  try {
    const headers = new Headers({ "cf-connecting-ip": nextIp(), "Content-Type": "application/json" });
    headers.set("Origin", ALLOWED_ORIGIN);
    const response = await onRequestPost({
      request: new Request(SUBSCRIBE_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(validSignup),
      }),
      env: CONFIGURED_ENV,
    });
    const json = (await response.json()) as Record<string, unknown>;
    assert.equal(response.status, 200);
    assert.equal(json.pending, true);
  } finally {
    globalThis.fetch = previous;
  }
});

await test("an unconfigured deployment keeps the old behaviour and does not claim a pending signup", async () => {
  const { response, json } = await subscribe({}, { RESEND_API_KEY: "re_sending_key" });
  assert.equal(response.status, 200);
  assert.equal(json?.pending, false);
  assert.equal(
    calls.filter((call) => call.url === CONTACTS_URL).length,
    0,
    "without a list key nothing may be written to the contacts API",
  );
});

// ── What the visitor is actually shown ──────────────────────────────────────

await test("the page no longer claims a confirmation that never happened", async () => {
  const source = fs.readFileSync(path.join(ROOT_DIR, "src", "App.tsx"), "utf8");
  assert.ok(
    !/Subscription confirmed \(\$\{generatedSubId\}\)/.test(source),
    "\"Subscription confirmed\" was untrue until double opt-in existed — it must not come back",
  );
  assert.match(source, /Almost there — we've sent a confirm link/, "the toast must ask for a click");
  assert.match(source, /প্রায় শেষ/, "the Bengali toast must say the same thing");
  assert.match(source, /subscriptionPending/, "the success panel must know the address is pending");
});

globalThis.fetch = realFetch;

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  if (!result.ok) console.error(`  ✗ ${result.name}\n    ${result.detail}`);
}
if (failed.length > 0) {
  console.error(`\n[subscribe double opt-in] ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}
console.log(`[subscribe double opt-in] All ${results.length} behavioural checks passed.`);
