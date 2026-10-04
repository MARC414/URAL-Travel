/**
 * Cloudflare Pages Serverless Function: /api/subscribe
 * Dispatches real-time newsletter & flight fare alert subscription notifications
 * to marcwriter2025@gmail.com via FormSubmit AJAX and optional Resend/Webhook integrations.
 */

const RECIPIENT_EMAIL = "marcwriter2025@gmail.com";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    // Anti-spam honeypot check
    if (body._honey) {
      return new Response(
        JSON.stringify({ ok: true, status: "filtered" }),
        {
          status: 200,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    const cleanEmail = String(body.email || body["Subscriber Email"] || "").trim().toLowerCase();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Please enter a valid email address.",
        }),
        {
          status: 400,
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        }
      );
    }

    const sourceLabel = String(body.source || body["Signup Placement"] || "Website Newsletter");
    const subscriptionId =
      String(body.subscriptionId || body["Subscription ID"] || "") ||
      `URAL-SUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const language = String(body.language || body["Preferred Language"] || "English (EN)");
    const pageUrl = String(body.pageUrl || body["Page URL"] || "https://ural-travel.pages.dev/");
    const dhakaTimestamp =
      body.timestamp ||
      new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        dateStyle: "medium",
        timeStyle: "medium",
      });

    const notificationPayload = {
      email: cleanEmail,
      "Subscriber Email": cleanEmail,
      "Subscription ID": subscriptionId,
      "Signup Placement": sourceLabel,
      "Preferred Language": language,
      "Page URL": pageUrl,
      "Timestamp (Dhaka BST)": dhakaTimestamp,
      "Notification Recipient": RECIPIENT_EMAIL,
      _replyto: cleanEmail,
      _subject: `🔔 New URAL Subscriber: ${cleanEmail} (${sourceLabel})`,
      _template: "table",
      _captcha: "false",
    };

    const originHeader =
      context.request.headers.get("Origin") || "https://ural-travel.pages.dev";
    const refererHeader =
      context.request.headers.get("Referer") || "https://ural-travel.pages.dev/";

    let formSubmitDelivered = false;

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

    // 2. Optional Resend API dispatch if RESEND_API_KEY is configured in Cloudflare environment
    if (context.env && context.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "URAL Travel Intelligence <alerts@ural-travel.pages.dev>",
            to: [RECIPIENT_EMAIL],
            reply_to: cleanEmail,
            subject: `🔔 New URAL Subscriber: ${cleanEmail} (${sourceLabel})`,
            html: `
              <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <div style="background: #0B192C; color: #ffffff; padding: 18px 24px;">
                  <h2 style="margin: 0; font-size: 18px; color: #F6B73C;">URAL Travel Intelligence — New Subscriber Alert</h2>
                </div>
                <div style="padding: 20px 24px; color: #1e293b; font-size: 14px; line-height: 1.6;">
                  <p>A new visitor has subscribed to URAL Flight Fare Alerts &amp; Travel Intelligence:</p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscriber Email</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${cleanEmail}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Subscription ID</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${subscriptionId}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Signup Placement</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${sourceLabel}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Preferred Language</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${language}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Page URL</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${pageUrl}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">Timestamp (Dhaka BST)</td><td style="padding: 8px;">${dhakaTimestamp}</td></tr>
                  </table>
                </div>
              </div>
            `,
          }),
        });
      } catch {
        // Ignore optional secondary transport errors
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        subscriptionId,
        subscriberEmail: cleanEmail,
        deliveredTo: RECIPIENT_EMAIL,
        formSubmitDelivered,
        timestamp: dhakaTimestamp,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Unable to process subscription request.",
        details: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
}
