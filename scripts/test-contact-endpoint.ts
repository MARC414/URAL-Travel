/**
 * Behavioural tests for `POST /api/contact`.
 *
 * WHY THIS SUITE EXISTS
 * ---------------------
 * `scripts/verify-build.ts` used to be the only guard on this endpoint, and it
 * reads the function source as *text* and matches patterns in it. That is why
 * four real defects shipped and passed CI:
 *
 *   1. A foreign page could POST here. CORS only hides the response, so the
 *      email was sent anyway; and because the handler never inspected
 *      `Content-Type`, a `text/plain` POST needed no preflight either.
 *   2. The `_honey` honeypot was never sent by the browser form, so the trap had
 *      nothing to catch.
 *   3. The 16 KB body cap trusted `content-length`; omitting the header read as 0
 *      and every size passed.
 *   4. A network error reaching Turnstile returned 403, so an outage at the
 *      verification service rejected every genuine visitor — the opposite of
 *      what the comment above the `catch` promised.
 *
 * Each assertion below is a behaviour, not a string. The endpoint is imported
 * and executed with a stubbed `fetch`, so no network call is made and no mail
 * is sent.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequestPost } from "../functions/api/contact.js";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENDPOINT = "https://uraltravel.co.uk/api/contact";
const RESEND_URL = "https://api.resend.com/emails";
const SITEVERIFY_HOST = "challenges.cloudflare.com";
const ALLOWED_ORIGIN = "https://uraltravel.co.uk";
const PREVIEW_ORIGIN = "https://abc1234.ural-travel.pages.dev";
const FOREIGN_ORIGIN = "https://evil.example";

type CapturedMail = Record<string, unknown>;

let mailSent: CapturedMail[] = [];
let siteverify: "accept" | "reject" | "throw" = "accept";
const realFetch = globalThis.fetch;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

  if (url.includes(SITEVERIFY_HOST)) {
    if (siteverify === "throw") throw new Error("simulated transport failure");
    return new Response(JSON.stringify({ success: siteverify === "accept" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (url === RESEND_URL) {
    const parsed = init?.body ? JSON.parse(String(init.body)) : {};
    mailSent.push(parsed as CapturedMail);
    return new Response(JSON.stringify({ id: "test-delivery" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  throw new Error(`unexpected outbound fetch: ${url}`);
}) as typeof fetch;

// Every case gets its own IP so the module-level sliding window cannot leak
// between assertions (5 requests / 10 minutes per address).
let ipCounter = 0;
function nextIp(): string {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
}

const validForm = {
  name: "Ayesha Rahman",
  phone: "+8801700000000",
  email: "ayesha@example.com",
  subject: "Umrah package question",
  destination: "Makkah",
  message: "Is the hotel walking distance from the Haram?",
  submissionId: "URAL-REQ-1234",
  pageUrl: "https://uraltravel.co.uk/contact",
};

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
  const init: RequestInit & { duplex?: "half" } = {
    method: "POST",
    headers,
    body: spec.body,
  };
  // A stream body is how a chunked upload looks: no Content-Length at all.
  if (spec.body instanceof ReadableStream) init.duplex = "half";
  return new Request(ENDPOINT, init);
}

type Env = Record<string, string>;

async function post(spec: RequestSpec, env: Env = { RESEND_API_KEY: "re_test" }) {
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

function jsonBody(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({ ...validForm, ...overrides });
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

await test("a submission from the site is delivered", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: jsonBody(),
  });
  assert.equal(response.status, 200, "the site's own form must keep working");
  assert.equal(json?.ok, true);
  assert.equal(json?.deliveredVia, "resend");
  assert.equal(mails().length, 1, "exactly one mail per submission, still");
  assert.equal(response.headers.get("access-control-allow-origin"), ALLOWED_ORIGIN);
});

await test("a preview deployment is still allowed to submit", async () => {
  const { response, mails } = await post({
    origin: PREVIEW_ORIGIN,
    contentType: "application/json",
    body: jsonBody(),
  });
  assert.equal(response.status, 200, "reviewers on a preview URL must be able to test the form");
  assert.equal(mails().length, 1);
});

await test("a request with no Origin (server-to-server) is still delivered", async () => {
  const { response, mails } = await post({
    contentType: "application/json",
    body: jsonBody(),
  });
  assert.equal(response.status, 200, "curl and uptime checks were deliberately kept working");
  assert.equal(mails().length, 1);
  assert.equal(response.headers.get("access-control-allow-origin"), null, "no ACAO for a non-browser caller");
});

// ── The gates ───────────────────────────────────────────────────────────────

await test("a cross-site browser request is refused and sends nothing", async () => {
  const { response, json, mails } = await post({
    origin: FOREIGN_ORIGIN,
    contentType: "application/json",
    body: jsonBody(),
  });
  assert.equal(response.status, 403, "another site must not be able to drive the form");
  assert.equal(json?.code, "origin_not_allowed");
  assert.equal(mails().length, 0, "and crucially, no mail is sent");
  assert.equal(response.headers.get("access-control-allow-origin"), null);
});

await test("a preflight-free text/plain post is refused", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "text/plain",
    body: jsonBody(),
  });
  assert.equal(response.status, 415, "a simple content type bypassed the CORS preflight");
  assert.equal(json?.code, "unsupported_media_type");
  assert.equal(mails().length, 0);
});

await test("a missing Content-Type is refused", async () => {
  const { response, mails } = await post({ origin: ALLOWED_ORIGIN, body: jsonBody() });
  assert.equal(response.status, 415);
  assert.equal(mails().length, 0);
});

await test("an oversized body is refused even when Content-Length is absent", async () => {
  const padding = "B".repeat(64 * 1024);
  const huge = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(jsonBody({ message: padding })));
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

await test("an oversized declared body is refused before it is read", async () => {
  const { response, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: jsonBody({ message: "B".repeat(20 * 1024) }),
  });
  assert.equal(response.status, 413);
  assert.equal(mails().length, 0);
});

await test("the honeypot discards a filled submission but answers like a success", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: jsonBody({ _honey: "http://spam.example" }),
  });
  assert.equal(response.status, 200, "a bot must not be told it was caught");
  assert.equal(json?.status, "filtered");
  assert.equal(mails().length, 0, "and nothing may be delivered");
});

await test("invalid JSON and missing required fields are rejected", async () => {
  const bad = await post({ origin: ALLOWED_ORIGIN, contentType: "application/json", body: "{not json" });
  assert.equal(bad.response.status, 400);
  assert.equal(bad.json?.code, "invalid_json");
  assert.equal(bad.mails().length, 0);

  const incomplete = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: JSON.stringify({ email: "someone@example.com" }),
  });
  assert.equal(incomplete.response.status, 400);
  assert.equal(incomplete.json?.code, "missing_fields");
  assert.equal(incomplete.mails().length, 0);
});

// ── Turnstile: fail closed only on an explicit rejection ────────────────────

await test("an explicit Turnstile rejection fails closed", async () => {
  siteverify = "reject";
  try {
    const { response, json, mails } = await post({
      origin: ALLOWED_ORIGIN,
      contentType: "application/json",
      body: jsonBody({ turnstileToken: "spent-token" }),
    }, { RESEND_API_KEY: "re_test", TURNSTILE_SECRET_KEY: "0xsecret" });
    assert.equal(response.status, 403);
    assert.equal(json?.code, "turnstile_failed");
    assert.equal(mails().length, 0);
    assert.ok(!("reason" in (json || {})), "operator error codes must not be echoed to the caller");
  } finally {
    siteverify = "accept";
  }
});

await test("a Turnstile transport error fails open, so real visitors still get through", async () => {
  siteverify = "throw";
  try {
    const { response, mails } = await post({
      origin: ALLOWED_ORIGIN,
      contentType: "application/json",
      body: jsonBody({ turnstileToken: "token" }),
    }, { RESEND_API_KEY: "re_test", TURNSTILE_SECRET_KEY: "0xsecret" });
    assert.equal(response.status, 200, "an outage at the verifier must not reject every inquiry");
    assert.equal(mails().length, 1);
  } finally {
    siteverify = "accept";
  }
});

await test("a missing Turnstile token is still rejected when a secret is configured", async () => {
  const { response, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: jsonBody(),
  }, { RESEND_API_KEY: "re_test", TURNSTILE_SECRET_KEY: "0xsecret" });
  assert.equal(response.status, 403);
  assert.equal(mails().length, 0);
});

// ── Transport and rate limiting ─────────────────────────────────────────────

await test("a missing mail transport fails loudly instead of pretending to succeed", async () => {
  const { response, json, mails } = await post({
    origin: ALLOWED_ORIGIN,
    contentType: "application/json",
    body: jsonBody(),
  }, {});
  assert.equal(response.status, 503);
  assert.equal(json?.code, "mail_transport_not_configured");
  assert.equal(mails().length, 0);
});

await test("the per-IP limit answers 429 with Retry-After", async () => {
  const ip = "198.51.100.7";
  const spec: RequestSpec = { origin: ALLOWED_ORIGIN, contentType: "application/json", body: jsonBody(), ip };
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { response } = await post(spec);
    assert.equal(response.status, 200, `request ${attempt + 1} of 5 should be allowed`);
  }
  const limited = await post(spec);
  assert.equal(limited.response.status, 429);
  assert.equal(limited.json?.code, "rate_limited");
  assert.ok(Number(limited.response.headers.get("retry-after")) > 0);
  assert.equal(limited.mails().length, 0);
});

// ── The browser half of the contract ────────────────────────────────────────

await test("the contact form actually sends the honeypot field", async () => {
  const source = fs.readFileSync(path.join(ROOT_DIR, "src", "routes", "ContactRouteView.tsx"), "utf8");
  assert.ok(
    /_honey/.test(source),
    "the form must post _honey, or the server-side trap can never fire (the bug fixed on 17 Nov 2026)"
  );
  assert.ok(
    /resetSignal=\{turnstileResetSignal\}/.test(source),
    "a failed submit must request a fresh Turnstile challenge, or 'try again' cannot succeed"
  );
});

globalThis.fetch = realFetch;

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  if (!result.ok) console.error(`  ✗ ${result.name}\n    ${result.detail}`);
}
if (failed.length > 0) {
  console.error(`\n[contact endpoint] ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}
console.log(`[contact endpoint] All ${results.length} behavioural checks passed.`);
