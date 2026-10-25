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
 * Controls here: honeypot, body-size cap, field caps, and a per-IP sliding
 * window (3 signups / 10 min). Turnstile is intentionally not required on this
 * endpoint — it is rate-limited and low-value to abuse — but the check can be
 * added the same way `/api/contact` does it if signup spam appears.
 */

const RECIPIENT_EMAIL = "marcwriter2025@gmail.com";
const PUBLIC_SUPPORT_EMAIL = "support@uraltravel.co.uk";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

  let body;
  try {
    body = await context.request.json();
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
  if (!apiKey) {
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
        reply_to: cleanEmail,
        subject: `🔔 New URAL Subscription: ${cleanEmail} (${interestSummary})`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: #0B192C; color: #ffffff; padding: 18px 24px;">
              <h2 style="margin: 0; font-size: 18px; color: #F6B73C;">URAL Travel Intelligence — New Subscriber Alert</h2>
            </div>
            <div style="padding: 20px 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
              <p>A new visitor has subscribed to URAL travel updates:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscriber Email</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(cleanEmail)}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscription ID</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(subscriptionId)}</td></tr>
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

    if (!resendResponse.ok) {
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

    return jsonResponse(
      {
        ok: true,
        subscriptionId,
        subscriberEmail: cleanEmail,
        subscriptionInterests,
        deliveredVia: "resend",
        timestamp: dhakaTimestamp,
      },
      200,
      origin
    );
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
}
