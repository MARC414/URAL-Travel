/**
 * Cloudflare Pages Serverless Function: /api/contact
 * Dispatches direct travel support & visa/Umrah inquiry notifications from /contact
 * via authenticated Resend API (support@uraltravel.co.uk) and FormSubmit AJAX fallback.
 */

const RECIPIENT_EMAIL = "marcwriter2025@gmail.com";
const PUBLIC_SUPPORT_EMAIL = "support@uraltravel.co.uk";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    if (body._honey) {
      return new Response(JSON.stringify({ ok: true, status: "filtered" }), {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const name = String(body.name || body.Name || "").trim();
    const phone = String(body.phone || body["Phone / WhatsApp"] || "").trim();
    const rawEmail = String(body.email || body.Email || "").trim().toLowerCase();
    const validEmail = rawEmail && EMAIL_REGEX.test(rawEmail) ? rawEmail : "";

    if (!name || !phone) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Please provide both your name and phone/WhatsApp number.",
        }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    const subjectCategory = String(
      body.subject || body["Assistance Category"] || "General Travel Inquiry"
    ).trim();
    const destination = String(
      body.destination || body["Travel Destination"] || "Not specified"
    ).trim();
    const message = String(body.message || body.Message || "").trim();
    const submissionId =
      String(body.submissionId || body["Submission ID"] || "").trim() ||
      `URAL-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const pageUrl = String(body.pageUrl || "https://uraltravel.co.uk/contact").trim();
    const dhakaTimestamp =
      body.timestamp ||
      new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        dateStyle: "medium",
        timeStyle: "medium",
      });

    const notificationPayload = {
      "Submission ID": submissionId,
      Name: name,
      "Phone / WhatsApp": phone,
      ...(validEmail ? { Email: validEmail, _replyto: validEmail } : {}),
      "Assistance Category": subjectCategory,
      "Travel Destination": destination,
      Message: message || "No additional message provided",
      "Support Desk": PUBLIC_SUPPORT_EMAIL,
      "Page URL": pageUrl,
      "Timestamp (Dhaka BST)": dhakaTimestamp,
      _subject: `✈️ New URAL Support Inquiry (${submissionId}) from ${name}`,
      _template: "table",
      _captcha: "false",
    };

    const originHeader =
      context.request.headers.get("Origin") || "https://uraltravel.co.uk";
    const refererHeader =
      context.request.headers.get("Referer") || "https://uraltravel.co.uk/contact";

    let formSubmitDelivered = false;
    let resendDelivered = false;

    // 1. Primary Notification Dispatch via FormSubmit AJAX Service
    try {
      const formSubmitResponse = await fetch(
        `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: originHeader,
            Referer: refererHeader,
          },
          body: JSON.stringify(notificationPayload),
        }
      );
      formSubmitDelivered = formSubmitResponse.ok;
    } catch {
      formSubmitDelivered = false;
    }

    // 2. Authenticated DKIM/SPF dispatch via Resend on verified uraltravel.co.uk domain
    if (context.env && context.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
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
        resendDelivered = resendResponse.ok;
      } catch {
        resendDelivered = false;
      }
    }

    const delivered = formSubmitDelivered || resendDelivered;
    return new Response(
      JSON.stringify({
        ok: delivered,
        submissionId,
        supportEmail: PUBLIC_SUPPORT_EMAIL,
        formSubmitDelivered,
        resendDelivered,
        timestamp: dhakaTimestamp,
      }),
      {
        status: delivered ? 200 : 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Unable to process support inquiry.",
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
}
