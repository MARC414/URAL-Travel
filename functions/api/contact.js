/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Delivers contact-form notifications to the URAL support desk through a
 * SINGLE transport: the authenticated Resend API, sending from the verified
 * `uraltravel.co.uk` domain.
 *
 * ── Why FormSubmit was removed (2026-10-25) ─────────────────────────────────
 * Until this change a submission was dispatched to FormSubmit **twice** — once
 * from the browser (`ContactRouteView.tsx`) and once from this function — with
 * Resend as a third, optional copy. Three consequences, all observed in the
 * owner's inbox on 2026-10-25:
 *
 *   1. FormSubmit activation is per destination-address × referring-domain, so
 *      the pages.dev → uraltravel.co.uk migration silently re-armed an
 *      "activate this form" email.
 *   2. Before activation the FormSubmit leg fails silently; after activation it
 *      would create a public, unauthenticated, no-captcha endpoint that accepts
 *      arbitrary content into a personal inbox.
 *   3. Every message reached two third-party processors instead of one, and was
 *      delivered up to three times. Duplicates look like separate leads.
 *
 * Resend is the only transport that is authenticated (SPF/DKIM on our own
 * domain) and the only one that was ever proven to work in production.
 *
 * ── Abuse controls ─────────────────────────────────────────────────────────
 * `_honey` honeypot (cheap bots), body-size cap, per-field length caps,
 * a per-IP sliding-window rate limit, and — when `TURNSTILE_SECRET_KEY` is set
 * — Cloudflare Turnstile verification. The in-memory limiter is per-isolate
 * best-effort: it stops a single hammering client, not a distributed one. The
 * real control is a Cloudflare WAF rate-limiting rule on `/api/*`; see
 * `docs/growth/20-FORM-AND-MAIL-HARDENING-2026-10-25.md`.
 */

const PUBLIC_SUPPORT_EMAIL = "support@uraltravel.co.uk";
// The desk mailbox that receives notifications. Kept as a constant so the
// address appears in exactly one place; changing it is a one-line edit.
const RECIPIENT_EMAIL = "marcwriter2025@gmail.com";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const MAX_BODY_BYTES = 16 * 1024;
const FIELD_LIMITS = {
  name: 120,
  phone: 40,
  email: 254,
  subject: 120,
  destination: 120,
  message: 4000,
  pageUrl: 300,
  submissionId: 40,
};

// Five inquiries per IP per ten minutes. A genuine traveller never needs more;
// a scripted client does.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ALLOWED_ORIGINS = new Set([
  "https://uraltravel.co.uk",
  "https://www.uraltravel.co.uk",
]);
// Preview deployments and local `vite`/`wrangler` runs must be able to call the
// function while the code is being reviewed.
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.ural-travel\.pages\.dev$/,
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
];

/** Per-isolate sliding window. Cleared whenever Cloudflare recycles the isolate. */
const requestLog = new Map();

function isAllowedOrigin(origin) {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

/**
 * CORS is answered per request instead of with a wildcard. A wildcard on an
 * endpoint that sends email lets any page on the internet drive the form from a
 * visitor's browser; an allowlist cannot. Requests with no Origin (curl,
 * server-to-server, Cloudflare's own tooling) are served but receive no
 * `Access-Control-Allow-Origin` header, which is the correct behaviour.
 */
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

function pruneRequestLog(now) {
  if (requestLog.size < 2000) return;
  for (const [ip, timestamps] of requestLog) {
    const fresh = timestamps.filter((stamp) => now - stamp < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) requestLog.delete(ip);
    else requestLog.set(ip, fresh);
  }
}

function checkRateLimit(ip, now) {
  if (!ip) return { allowed: true, retryAfter: 0 };
  pruneRequestLog(now);
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

/**
 * Server-side Turnstile check. Only enforced when the secret is configured, so
 * a deployment without the widget keeps accepting inquiries instead of
 * silently rejecting every visitor.
 */
async function verifyTurnstile(secret, token, ip) {
  if (!secret) return { enforced: false, ok: true, reason: "not-configured" };
  if (!token) return { enforced: true, ok: false, reason: "missing-token" };
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip) form.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    const result = await response.json().catch(() => ({}));
    return {
      enforced: true,
      ok: result.success === true,
      reason: Array.isArray(result["error-codes"]) ? result["error-codes"].join(",") : "",
    };
  } catch (err) {
    // A network failure must not silently drop a real inquiry: fail closed only
    // when Turnstile explicitly rejects the token.
    return { enforced: true, ok: false, reason: `verification-error:${err instanceof Error ? err.message : "unknown"}` };
  }
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

  const contentLength = Number(context.request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, code: "payload_too_large", error: "That message is too long to send." }, 413, origin);
  }

  const ip = clientIp(context.request);
  const limit = checkRateLimit(ip, now);
  if (!limit.allowed) {
    return jsonResponse(
      {
        ok: false,
        code: "rate_limited",
        error: `Too many inquiries from this connection. Please try again in ${Math.ceil(limit.retryAfter / 60)} minute(s), or email ${PUBLIC_SUPPORT_EMAIL}.`,
      },
      429,
      origin,
      { "Retry-After": String(limit.retryAfter) }
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ ok: false, code: "invalid_json", error: "Unable to read the submitted form." }, 400, origin);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ ok: false, code: "invalid_request", error: "Unable to read the submitted form." }, 400, origin);
  }

  // Honeypot: a hidden field no human can see or fill. Answer 200 so a bot
  // cannot tell that it was discarded.
  if (body._honey) {
    return jsonResponse({ ok: true, status: "filtered" }, 200, origin);
  }

  const name = truncate(body.name || body.Name, FIELD_LIMITS.name);
  const phone = truncate(body.phone || body["Phone / WhatsApp"], FIELD_LIMITS.phone);
  const rawEmail = truncate(body.email || body.Email, FIELD_LIMITS.email).toLowerCase();
  const validEmail = rawEmail && EMAIL_REGEX.test(rawEmail) ? rawEmail : "";
  const subjectCategory =
    truncate(body.subject || body["Assistance Category"], FIELD_LIMITS.subject) || "General Travel Inquiry";
  const destination =
    truncate(body.destination || body["Travel Destination"], FIELD_LIMITS.destination) || "Not specified";
  const message = truncate(body.message || body.Message, FIELD_LIMITS.message);
  const submissionId =
    truncate(body.submissionId || body["Submission ID"], FIELD_LIMITS.submissionId) ||
    `URAL-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const pageUrl = truncate(body.pageUrl, FIELD_LIMITS.pageUrl) || "https://uraltravel.co.uk/contact";
  const dhakaTimestamp = new Date(now).toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  if (!name || !phone) {
    return jsonResponse(
      { ok: false, code: "missing_fields", error: "Please provide both your name and phone/WhatsApp number." },
      400,
      origin
    );
  }

  const turnstile = await verifyTurnstile(
    context.env?.TURNSTILE_SECRET_KEY,
    truncate(body.turnstileToken, 4096),
    ip
  );
  if (!turnstile.ok) {
    return jsonResponse(
      {
        ok: false,
        code: "turnstile_failed",
        error: "We could not verify that this form was submitted by a person. Please reload the page and try again.",
        reason: turnstile.reason,
      },
      403,
      origin
    );
  }

  const apiKey = context.env?.RESEND_API_KEY;
  if (!apiKey) {
    // Honest failure. The previous build returned 502 only when BOTH transports
    // failed, which made a missing key look like a successful submission.
    return jsonResponse(
      {
        ok: false,
        code: "mail_transport_not_configured",
        error: `The support desk is temporarily unavailable. Please email ${PUBLIC_SUPPORT_EMAIL} directly.`,
      },
      503,
      origin
    );
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `URAL Travel Support <${PUBLIC_SUPPORT_EMAIL}>`,
        to: [RECIPIENT_EMAIL],
        ...(validEmail ? { reply_to: validEmail } : {}),
        subject: `✈️ New URAL Support Inquiry (${submissionId}) from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #0B192C; color: #ffffff; padding: 18px 24px;">
              <h2 style="margin: 0; font-size: 18px; color: #F6B73C;">URAL Travel Support — New Inquiry (${escapeHtml(submissionId)})</h2>
            </div>
            <div style="padding: 20px 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Name</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone / WhatsApp</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(phone)}</td></tr>
                ${validEmail ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(validEmail)}</td></tr>` : ""}
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Category</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(subjectCategory)}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Destination</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(destination)}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Message</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(message || "—")}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Page URL</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(pageUrl)}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Timestamp (Dhaka BST)</td><td style="padding: 8px;">${escapeHtml(dhakaTimestamp)}</td></tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      return jsonResponse(
        {
          ok: false,
          code: "delivery_failed",
          error: `We could not deliver your inquiry. Please email ${PUBLIC_SUPPORT_EMAIL} directly.`,
        },
        502,
        origin
      );
    }

    return jsonResponse(
      {
        ok: true,
        submissionId,
        supportEmail: PUBLIC_SUPPORT_EMAIL,
        deliveredVia: "resend",
        turnstileEnforced: turnstile.enforced,
        timestamp: dhakaTimestamp,
      },
      200,
      origin,
      { "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS) }
    );
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "delivery_error",
        error: `We could not deliver your inquiry. Please email ${PUBLIC_SUPPORT_EMAIL} directly.`,
      },
      502,
      origin
    );
  }
}
