/**
 * Cloudflare Pages Function: POST /api/subscribe
 *
 * Delivers newsletter / fare-alert signup notifications to the URAL desk through
 * the authenticated Resend API only.
 *
 * ── Why FormSubmit was removed (2026-10-25) ─────────────────────────────────
 * The signup was dispatched to FormSubmit from the browser AND from this
 * function, with Resend as an optional third copy — the same triple-delivery and
 * unauthenticated-endpoint problem as `/api/contact`. See the header of
 * `functions/api/contact.js` and `docs/growth/20-FORM-AND-MAIL-HARDENING-2026-10-25.md`.
 *
 * Controls here: an origin gate (a browser request from anywhere but this site is
 * refused with 403), a JSON-only rule (415), a measured body-size cap, field
 * caps, the `_honey` honeypot, and a per-IP sliding window (3 signups / 10 min).
 * Turnstile is intentionally not required on this endpoint — it is rate-limited
 * and low-value to abuse — but the check can be added the same way
 * `/api/contact` does it if signup spam appears.
 *
 * CORS is answered per request for the browser's benefit, but it is NOT the
 * gate: `Access-Control-Allow-Origin` hides a response, it does not stop the
 * mail from being sent. The origin check below is what actually refuses. Same
 * repair as `/api/contact` on 17 November 2026.
 *
 * ── Double opt-in: a signup is a request, not a subscription (2026-11-17) ───
 * Before this date a signup produced ONE email — a notification to the desk —
 * and the page then told the visitor "Subscription confirmed", which was not
 * true: nothing was stored and nobody had confirmed anything.
 *
 * Now a signup writes the address into the Resend contact list in a SEGMENT
 * (`RESEND_SEGMENT_ID`) with `unsubscribed: true`, which means "known, but not
 * allowed to receive a broadcast". A confirmation email goes to the visitor; the
 * signed link in it hits `/api/confirm`, which flips that flag to `false`. Only
 * then can a mailout reach them.
 *
 * Three properties this buys, all of which were missing:
 *   1. Consent is recorded at Resend, not inferred from a keystroke.
 *   2. A typo or a stranger's address never receives a mailout — they expire as
 *      unconfirmed contacts instead of becoming a complaint or a spam trap.
 *   3. Unsubscribing is handled by Resend's own one-click link inside every
 *      broadcast, which is what the signup block's "1-Click Unsubscribe"
 *      promise always claimed.
 *
 * The desk notification is kept, but it is now BEST EFFORT and marked
 * "awaiting confirmation": a subscriber must not fail because the copy to
 * marcwriter2025@gmail.com failed.
 *
 * Unconfigured fallback: without `RESEND_LIST_API_KEY` + `RESEND_SEGMENT_ID` +
 * a signing secret the endpoint behaves exactly as it did before (notify the
 * desk, store nothing) and answers `pending: false`, so the browser can say so
 * instead of claiming a confirmation that never happened.
 */

import { canSign, confirmUrl, createConfirmToken } from "./_lib/signing.js";

const RECIPIENT_EMAIL = "marcwriter2025@gmail.com";
const PUBLIC_SUPPORT_EMAIL = "support@uraltravel.co.uk";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SITE_ORIGIN = "https://uraltravel.co.uk";

const RESEND_CONTACTS_URL = "https://api.resend.com/contacts";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

const ALLOWED_SUBSCRIPTION_INTERESTS = new Set([
  "Dhaka flight fare-drop alerts",
  "General URAL travel newsletter",
]);

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

const ALLOWED_ORIGINS = new Set([
  "https://uraltravel.co.uk",
  "https://www.uraltravel.co.uk",
]);
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.ural-travel\.pages\.dev$/,
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
];

/** Per-isolate sliding window; see the rate-limit note in `contact.js`. */
const requestLog = new Map();

function isAllowedOrigin(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    Vary: "Origin",
  };
  if (isAllowedOrigin(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function jsonResponse(payload, status, origin, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders(origin),
      ...extraHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function truncate(value, limit) {
  const text = String(value ?? "").trim();
  return text.length > limit ? text.slice(0, limit) : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    ""
  );
}

function checkRateLimit(ip, now) {
  if (!ip) return { allowed: true, retryAfter: 0 };
  if (requestLog.size > 2000) {
    for (const [key, stamps] of requestLog) {
      if (stamps.every((stamp) => now - stamp >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }
  const recent = (requestLog.get(ip) || []).filter((stamp) => now - stamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    const retryAfter = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - recent[0])) / 1000));
    return { allowed: false, retryAfter };
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return { allowed: true, retryAfter: 0 };
}

// ── Contact list (double opt-in) ─────────────────────────────────────────────
// Everything below talks to the Resend Contacts API with `RESEND_LIST_API_KEY`,
// which is a separate key from the sending key on purpose: a leak of the
// sending key must not also hand over the list.

function doubleOptInConfigured(env) {
  return Boolean(env?.RESEND_LIST_API_KEY && env?.RESEND_SEGMENT_ID && canSign(env));
}

/**
 * Put the address in the list as PENDING — `unsubscribed: true` means "known,
 * but must never receive a broadcast" — and return what actually happened.
 *
 * `already_confirmed` is not a failure: it is someone re-submitting an address
 * that already clicked the link. They are told so rather than being sent a
 * confirmation they do not need.
 */
async function addPendingContact({ email, env }) {
  const listKey = env.RESEND_LIST_API_KEY;
  const segmentId = env.RESEND_SEGMENT_ID;
  const headers = { Authorization: `Bearer ${listKey}`, "Content-Type": "application/json" };

  const created = await fetch(RESEND_CONTACTS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, unsubscribed: true, segments: [{ id: segmentId }] }),
  }).catch(() => null);

  if (created && created.ok) return { outcome: "pending" };
  if (!created) return { outcome: "error" };
  // 409 = this address is already a contact. Make sure it is in our segment
  // (the create above did not run), then read its real consent state.
  if (created.status !== 409) return { outcome: "error" };

  await fetch(`${RESEND_CONTACTS_URL}/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${listKey}` },
  }).catch(() => null);

  const existing = await fetch(`${RESEND_CONTACTS_URL}/${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${listKey}` },
  }).catch(() => null);
  if (existing && existing.ok) {
    const contact = await existing.json().catch(() => null);
    if (contact && contact.unsubscribed === false) return { outcome: "already_confirmed" };
  }
  return { outcome: "pending" };
}

const INTEREST_LABELS_BN = {
  "Dhaka flight fare-drop alerts": "ঢাকা ফ্লাইট ভাড়া কমার অ্যালার্ট",
  "General URAL travel newsletter": "URAL ট্রাভেল নিউজলেটার",
};

function interestSummaryFor(subscriptionInterests, isBengali) {
  if (!isBengali) return subscriptionInterests.join(" and ");
  const labels = subscriptionInterests.map((interest) => INTEREST_LABELS_BN[interest] || interest);
  return labels.join(" ও ");
}

/**
 * The confirmation email. Deliberately plain: one sentence, one button, one
 * line of plain text for clients that refuse buttons, and a line telling the
 * recipient that ignoring it costs them nothing — which is the honest promise
 * that makes the "not you?" case harmless.
 */
async function sendConfirmationEmail({ email, token, env, language, subscriptionInterests, origin }) {
  const isBengali = /bengali|bn/i.test(language);
  const url = confirmUrl(origin, token);
  const interests = interestSummaryFor(subscriptionInterests, isBengali);

  const subject = isBengali
    ? "আপনার URAL ট্রাভেল সাবস্ক্রিপশন নিশ্চিত করুন"
    : "Confirm your URAL Travel subscription";
  const heading = isBengali ? "একটি ক্লিক, তারপর শুরু" : "One click and you’re in";
  const intro = isBengali
    ? `${email} থেকে ${interests} পেতে চাইলে নিচের বোতামে ক্লিক করে নিশ্চিত করুন।`
    : `Confirm ${email} to start receiving ${interests} from URAL Travel.`;
  const button = isBengali ? "আমার সাবস্ক্রিপশন নিশ্চিত করুন" : "Confirm my subscription";
  const fallback = isBengali
    ? "বোতামটি কাজ না করলে এই লিংকটি ব্রাউজারে পেস্ট করুন:"
    : "If the button does not work, paste this link into your browser:";
  const ignore = isBengali
    ? "আপনি যদি এটি না চেয়ে থাকেন, এই ইমেইলটি উপেক্ষা করুন। লিংকে ক্লিক করার আগে আপনাকে তালিকায় যোগ করা হয় না।"
    : "If you did not ask for this, ignore this email. Nobody is added to the list until the link is clicked.";
  const support = isBengali
    ? `প্রশ্ন থাকলে এই ইমেইলে উত্তর দিন, অথবা লিখুন ${PUBLIC_SUPPORT_EMAIL}-এ।`
    : `Questions? Reply to this email, or write to ${PUBLIC_SUPPORT_EMAIL}.`;
  const footer = isBengali ? "URAL ট্রাভেল · ঢাকা, বাংলাদেশ" : "URAL Travel · Dhaka, Bangladesh";

  return fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY || env.RESEND_LIST_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `URAL Travel Support <${PUBLIC_SUPPORT_EMAIL}>`,
      to: [email],
      reply_to: PUBLIC_SUPPORT_EMAIL,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0B192C; color: #ffffff; padding: 18px 24px;">
            <h2 style="margin: 0; font-size: 18px; color: #F6B73C;">${escapeHtml(heading)}</h2>
          </div>
          <div style="padding: 22px 24px; color: #1e293b; font-size: 15px; line-height: 1.65;">
            <p style="margin: 0 0 18px;">${escapeHtml(intro)}</p>
            <p style="margin: 0 0 22px; text-align: center;">
              <a href="${escapeHtml(url)}" style="display: inline-block; background: #F6B73C; color: #0B192C; font-weight: bold; text-decoration: none; padding: 13px 26px; border-radius: 10px;">${escapeHtml(button)}</a>
            </p>
            <p style="margin: 0 0 6px; font-size: 12px; color: #475569;">${escapeHtml(fallback)}</p>
            <p style="margin: 0 0 18px; font-size: 12px; word-break: break-all;"><a href="${escapeHtml(url)}" style="color: #0B192C;">${escapeHtml(url)}</a></p>
            <p style="margin: 0 0 14px; font-size: 12px; color: #475569;">${escapeHtml(ignore)}</p>
            <p style="margin: 0 0 14px; font-size: 12px; color: #475569;">${escapeHtml(support)}</p>
            <p style="margin: 0; font-size: 11px; color: #64748b;">${escapeHtml(footer)}</p>
          </div>
        </div>
      `,
    }),
  });
}

/** The copy to the desk. Same fields as before, plus the real status. */
function sendDeskNotification({
  apiKey,
  email,
  subscriptionId,
  sourceLabel,
  interestSummary,
  language,
  pageUrl,
  dhakaTimestamp,
  statusLabel,
}) {
  return fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `URAL Travel Support <${PUBLIC_SUPPORT_EMAIL}>`,
      to: [RECIPIENT_EMAIL],
      reply_to: email,
      subject: `🔔 New URAL Subscription: ${email} (${interestSummary})`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0B192C; color: #ffffff; padding: 18px 24px;">
            <h2 style="margin: 0; font-size: 18px; color: #F6B73C;">URAL Travel Intelligence — New Subscriber Alert</h2>
          </div>
          <div style="padding: 20px 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
            <p>A new visitor has subscribed to URAL travel updates:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscriber Email</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscription ID</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(subscriptionId)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Status</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(statusLabel)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Signup Placement</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(sourceLabel)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscription Interests</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(interestSummary)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Preferred Language</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(language)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Page URL</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(pageUrl)}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Timestamp (Dhaka BST)</td><td style="padding: 8px;">${escapeHtml(dhakaTimestamp)}</td></tr>
            </table>
          </div>
        </div>
      `,
    }),
  });
}
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request.headers.get("Origin")),
  });
}

export async function onRequestPost(context) {
  const origin = context.request.headers.get("Origin");
  const now = Date.now();

  // See the same guard in `contact.js` for the full reasoning. Short version:
  // CORS hides a response, it does not stop the email. A foreign page can post
  // here without a preflight by using a simple content type, so both the origin
  // and the declared content type are checked before any work happens. Requests
  // with NO Origin (curl, server-to-server, uptime checks) stay allowed.
  if (origin && !isAllowedOrigin(origin)) {
    return jsonResponse(
      { ok: false, code: "origin_not_allowed", error: "This form can only be submitted from the URAL website." },
      403,
      origin
    );
  }
  const contentType = (context.request.headers.get("content-type") || "").toLowerCase();
  if (!contentType.startsWith("application/json")) {
    return jsonResponse(
      { ok: false, code: "unsupported_media_type", error: "This form must be submitted as JSON." },
      415,
      origin
    );
  }

  // Declared length is a fast path; the bytes received are measured below, so a
  // request that omits `content-length` cannot slip past the cap by reading 0.
  const declaredLength = Number(context.request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, code: "payload_too_large", error: "Please send a shorter request." }, 413, origin);
  }

  const ip = clientIp(context.request);
  const limit = checkRateLimit(ip, now);
  if (!limit.allowed) {
    return jsonResponse(
      { ok: false, code: "rate_limited", error: "Too many signups from this connection. Please try again later." },
      429,
      origin,
      { "Retry-After": String(limit.retryAfter) }
    );
  }

  let rawBody;
  try {
    rawBody = await context.request.text();
  } catch {
    return jsonResponse({ ok: false, code: "invalid_request", error: "Unable to read the signup request." }, 400, origin);
  }
  // Measured, not declared — rejects an oversized body even without a
  // `content-length` header, before it is parsed or mailed.
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, code: "payload_too_large", error: "Please send a shorter request." }, 413, origin);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, code: "invalid_json", error: "Unable to read the signup request." }, 400, origin);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ ok: false, code: "invalid_request", error: "Unable to read the signup request." }, 400, origin);
  }

  // Anti-spam honeypot.
  if (body._honey) {
    return jsonResponse({ ok: true, status: "filtered" }, 200, origin);
  }

  const cleanEmail = truncate(body.email || body["Subscriber Email"], 254).toLowerCase();
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return jsonResponse({ ok: false, code: "invalid_email", error: "Please enter a valid email address." }, 400, origin);
  }

  const sourceLabel = truncate(body.source || body["Signup Placement"], 120) || "Website Newsletter";
  const requestedInterests = Array.isArray(body.subscriptionInterests)
    ? body.subscriptionInterests.map((interest) => truncate(interest, 120))
    : [];
  const validInterests = [...new Set(requestedInterests)].filter((interest) =>
    ALLOWED_SUBSCRIPTION_INTERESTS.has(interest),
  );
  const subscriptionInterests = validInterests.length > 0
    ? validInterests
    : [
        sourceLabel.toLowerCase().includes("homepage")
          ? "Dhaka flight fare-drop alerts"
          : "General URAL travel newsletter",
      ];
  const interestSummary = subscriptionInterests.join(", ");
  const subscriptionId =
    truncate(body.subscriptionId || body["Subscription ID"], 40) ||
    `URAL-SUB-${Math.floor(100000 + Math.random() * 900000)}`;
  const language = truncate(body.language || body["Preferred Language"], 40) || "English (EN)";
  const pageUrl = truncate(body.pageUrl || body["Page URL"], 300) || "https://uraltravel.co.uk/";
  const dhakaTimestamp = new Date(now).toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const apiKey = context.env?.RESEND_API_KEY;
  const sendingKey = apiKey || context.env?.RESEND_LIST_API_KEY;
  const doubleOptIn = doubleOptInConfigured(context.env);

  if (!sendingKey) {
    return jsonResponse(
      {
        ok: false,
        code: "mail_transport_not_configured",
        error: `Signups are temporarily unavailable. Please email ${PUBLIC_SUPPORT_EMAIL} to be added manually.`,
      },
      503,
      origin
    );
  }

  const deskNotification = () =>
    sendDeskNotification({
      apiKey: sendingKey,
      email: cleanEmail,
      subscriptionId,
      sourceLabel,
      interestSummary,
      language,
      pageUrl,
      dhakaTimestamp,
      statusLabel: doubleOptIn
        ? "Awaiting confirmation (double opt-in)"
        : "Not stored — no list configured, desk copy only",
    });

  if (!doubleOptIn) {
    // Unconfigured or partially configured deployment. Behave exactly as before
    // (notify the desk, store nothing) and answer `pending: false`, so the
    // browser says "we have your address, email us if you hear nothing" instead
    // of claiming a confirmation that never happened.
    try {
      const deskResponse = await deskNotification();
      if (!deskResponse.ok) {
        return jsonResponse(
          {
            ok: false,
            code: "delivery_failed",
            error: `We could not record your signup. Please email ${PUBLIC_SUPPORT_EMAIL} and we will add you manually.`,
          },
          502,
          origin
        );
      }
    } catch {
      return jsonResponse(
        {
          ok: false,
          code: "delivery_error",
          error: `We could not record your signup. Please email ${PUBLIC_SUPPORT_EMAIL} and we will add you manually.`,
        },
        502,
        origin
      );
    }

    return jsonResponse(
      {
        ok: true,
        pending: false,
        subscriptionId,
        subscriberEmail: cleanEmail,
        subscriptionInterests,
        deliveredVia: "resend",
        timestamp: dhakaTimestamp,
      },
      200,
      origin
    );
  }

  const contact = await addPendingContact({ email: cleanEmail, env: context.env });
  if (contact.outcome === "error") {
    return jsonResponse(
      {
        ok: false,
        code: "list_write_failed",
        error: `We could not record your signup. Please email ${PUBLIC_SUPPORT_EMAIL} and we will add you manually.`,
      },
      502,
      origin
    );
  }

  // Someone re-submitting an address that already clicked the link. Telling them
  // so is kinder than sending a second "confirm please" they do not need.
  if (contact.outcome === "already_confirmed") {
    return jsonResponse(
      {
        ok: true,
        pending: false,
        alreadyConfirmed: true,
        subscriptionId,
        subscriberEmail: cleanEmail,
        subscriptionInterests,
        deliveredVia: "resend",
        timestamp: dhakaTimestamp,
      },
      200,
      origin
    );
  }

  const token = await createConfirmToken(cleanEmail, context.env);
  if (!token) {
    return jsonResponse(
      {
        ok: false,
        code: "mail_transport_not_configured",
        error: `Signups are temporarily unavailable. Please email ${PUBLIC_SUPPORT_EMAIL} to be added manually.`,
      },
      503,
      origin
    );
  }

  let confirmationResponse;
  try {
    confirmationResponse = await sendConfirmationEmail({
      email: cleanEmail,
      token,
      env: context.env,
      language,
      subscriptionInterests,
      origin: SITE_ORIGIN,
    });
  } catch {
    confirmationResponse = null;
  }

  // The contact exists but is pending, so a retry is safe: it lands on the 409
  // branch above and sends the confirmation again.
  if (!confirmationResponse || !confirmationResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        code: "confirmation_email_failed",
        error: `We could not send your confirmation email. Please try again, or email ${PUBLIC_SUPPORT_EMAIL}.`,
      },
      502,
      origin
    );
  }

  // Best effort from here on: the subscriber is on the list and has been asked
  // to confirm, so a broken copy to the desk must not undo any of that.
  try {
    const deskResponse = await deskNotification();
    if (!deskResponse.ok) console.warn("[subscribe] desk notification failed", deskResponse.status);
  } catch (err) {
    console.warn("[subscribe] desk notification failed", err);
  }

  return jsonResponse(
    {
      ok: true,
      pending: true,
      subscriptionId,
      subscriberEmail: cleanEmail,
      subscriptionInterests,
      deliveredVia: "resend",
      timestamp: dhakaTimestamp,
    },
    200,
    origin
  );
}
