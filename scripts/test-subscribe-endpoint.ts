/**
 * Behavioural tests for `POST /api/subscribe`.
 *
 * WHY THIS SUITE EXISTS
 * ---------------------
 * Same reasoning as `test-contact-endpoint.ts`: `scripts/verify-build.ts` only
 * reads these functions as text and matches patterns in them, which cannot see
 * whether a rule is actually enforced. `/api/subscribe` shipped with the same
 * three defects the contact form had:
 *
 *   1. The origin allowlist shaped CORS headers but never refused a request, so
 *      any page on the internet could make this endpoint mail the desk.
 *   2. `_honey` was checked but never sent by the form, so the trap never armed.
 *   3. The body cap trusted `content-length`, which a chunked request omits.
 *
 * The handler is imported and executed with a stubbed `fetch`, so no network
 * call is made and no mail is sent.
 *
 * NOTE: this endpoint is not yet a subscriber list. Nothing is stored, no
 * confirmation is required and no unsubscribe link is sent; a signup is only a
 * notification to the desk. These tests assert the transport rules, not consent.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequestPost } from "../functions/api/subscribe.js";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENDPOINT = "https://uraltravel.co.uk/api/subscribe";
const RESEND_URL = "https://api.resend.com/emails";
const ALLOWED_ORIGIN = "https://uraltravel.co.uk";
const PREVIEW_ORIGIN = "https://abc1234.ural-travel.pages.dev";
const FOREIGN_ORIGIN = "https://evil.example";
const MAX_BODY_BYTES = 8 * 1024;

let mailSent: Record<string, unknown>[] = [];
const realFetch = globalThis.fetch;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  if (url === RESEND_URL) {
    mailSent.push(init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : {});
    return new Response(JSON.stringify({ id: "test-delivery" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  throw new Error(`unexpected outbound fetch: ${url}`);
}) as typeof fetch;

// 3 signups / 10 minutes per address, so each case gets a distinct IP.
let ipCounter = 0;
function nextIp(): string {
  ipCounter += 1;
  return `198.18.${Math.floor(ipCounter / 250)}.${ipCounter % 250}`;
}

type RequestSpec = {
  origin?: string | null;
  contentType?: string | null;
  body: string | ReadableStream<Uint8Array>;
  ip?: string;
};

function buildRequest(spec: RequestSpec): Request {
  const headers = new Headers({ "cf-connecting-ip": spec.ip || nextIp() });
  if (spec.origin) headers.set("Origin", spec.origin);
  if (spec.contentType) headers.set("Content-Type", spec.contentType);
  const init: RequestInit & { duplex?: "half" } = { method: "POST", headers, body: spec.body };
  if (spec.body instanceof ReadableStream) init.duplex = "half";
  return new Request(ENDPOINT, init);
}

async function post(spec: RequestSpec, env: Record<string, string> = { RESEND_API_KEY: "re_test" }) {
  mailSent = [];
  const response = await onRequestPost({ request: buildRequest(spec), env });
  const text = await response.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = text ? (JSON.parse(text) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }
  return { response, json, mails: () => mailSent };
}

const validSignup = {
  email: "ayesha@example.com",
  source: "Shared Pre-Footer Signup",
  subscriptionInterests: ["Dhaka flight fare-drop alerts"],
  subscriptionId: "URAL-SUB-123456",
  language: "English (EN)",
  pageUrl: "https://uraltravel.co.uk/",
  timestamp: "17 Nov 2026, 21:00:00",
  // Empty in the real form: the field is display:none, so only a bot fills it.
  _honey: "",
};

function signupBody(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({ ...validSignup, ...overrides });
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

// ── The happy paths ─────────────────────────────────────────────────────────

await test("a signup from the site is delivered", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: signupBody(),
  });
  assert.equal(response.status, 200, "the site's own form must keep working");
  assert.equal(json?.ok, true);
  assert.equal(json?.deliveredVia, "resend");
  assert.equal(mails().length, 1);
  assert.equal(mails()[0].reply_to, "ayesha@example.com");
});

await test("a preview deployment is still allowed to sign up", async () => {
  const { response, mails } = await post({
    origin: PREVIEW_ORIGIN,
    contentType: "application/json",
    body: signupBody(),
  });
  assert.equal(response.status, 200);
  assert.equal(mails().length, 1);
});

await test("a request with no Origin is still delivered", async () => {
  const { response, mails } = await post({ contentType: "application/json", body: signupBody() });
  assert.equal(response.status, 200);
  assert.equal(mails().length, 1);
});

// ── The gates ───────────────────────────────────────────────────────────────

await test("a cross-site browser request is refused and sends nothing", async () => {
  const { response, json, mails } = await post({
    origin: FOREIGN_ORIGIN,
    contentType: "application/json",
    body: signupBody(),
  });
  assert.equal(response.status, 403, "another site must not be able to drive the signup");
  assert.equal(json?.code, "origin_not_allowed");
  assert.equal(mails().length, 0, "and crucially, no mail is sent");
});

await test("a preflight-free text/plain post is refused", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "text/plain",
    body: signupBody(),
  });
  assert.equal(response.status, 415);
  assert.equal(json?.code, "unsupported_media_type");
  assert.equal(mails().length, 0);
});

await test("an oversized body is refused even when Content-Length is absent", async () => {
  const huge = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(signupBody({ source: "B".repeat(MAX_BODY_BYTES * 4) })));
      controller.close();
    },
  });
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: huge,
  });
  assert.equal(response.status, 413, "the cap must be measured, not trusted from a header");
  assert.equal(json?.code, "payload_too_large");
  assert.equal(mails().length, 0);
});

await test("the honeypot discards a filled signup but answers like a success", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: signupBody({ _honey: "http://spam.example" }),
  });
  assert.equal(response.status, 200, "a bot must not be told it was caught");
  assert.equal(json?.status, "filtered");
  assert.equal(mails().length, 0, "and nothing may be delivered");
});

// ── Validation ──────────────────────────────────────────────────────────────

await test("an invalid email and invalid JSON are rejected", async () => {
  const badEmail = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: signupBody({ email: "not-an-email" }),
  });
  assert.equal(badEmail.response.status, 400);
  assert.equal(badEmail.json?.code, "invalid_email");
  assert.equal(badEmail.mails().length, 0);

  const badJson = await post({ origin: ALLOWED_ORIGIN, contentType: "application/json", body: "{nope" });
  assert.equal(badJson.response.status, 400);
  assert.equal(badJson.json?.code, "invalid_json");
  assert.equal(badJson.mails().length, 0);
});

await test("only the two known interest labels are accepted", async () => {
  const { json } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: signupBody({
      subscriptionInterests: ["Dhaka flight fare-drop alerts", "make me rich", "General URAL travel newsletter"],
    }),
  });
  assert.deepEqual(json?.subscriptionInterests, [
    "Dhaka flight fare-drop alerts",
    "General URAL travel newsletter",
  ]);
});

// ── Transport and rate limiting ─────────────────────────────────────────────

await test("a missing mail transport fails loudly instead of pretending to succeed", async () => {
  const { response, json, mails } = await post(
    { origin: ALLOWED_ORIGIN, contentType: "application/json", body: signupBody() },
    {}
  );
  assert.equal(response.status, 503);
  assert.equal(json?.code, "mail_transport_not_configured");
  assert.equal(mails().length, 0);
});

await test("the per-IP limit answers 429 with Retry-After", async () => {
  const ip = "192.0.2.44";
  const spec: RequestSpec = { origin: ALLOWED_ORIGIN, contentType: "application/json", body: signupBody(), ip };
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { response } = await post(spec);
    assert.equal(response.status, 200, `signup ${attempt + 1} of 3 should be allowed`);
  }
  const limited = await post(spec);
  assert.equal(limited.response.status, 429);
  assert.equal(limited.json?.code, "rate_limited");
  assert.ok(Number(limited.response.headers.get("retry-after")) > 0);
  assert.equal(limited.mails().length, 0);
});

// ── The browser half of the contract ────────────────────────────────────────

await test("the signup form actually sends the honeypot field", async () => {
  const source = fs.readFileSync(path.join(ROOT_DIR, "src", "App.tsx"), "utf8");
  assert.ok(
    /_honey: newsletterHoneypotRef\.current\?\.value/.test(source),
    "the form must post _honey, or the server-side trap can never fire (the bug fixed on 17 Nov 2026)"
  );
});

globalThis.fetch = realFetch;

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  if (!result.ok) console.error(`  ✗ ${result.name}\n    ${result.detail}`);
}
if (failed.length > 0) {
  console.error(`\n[subscribe endpoint] ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}
console.log(`[subscribe endpoint] All ${results.length} behavioural checks passed.`);
