/**
 * Cloudflare Pages Function: GET /api/confirm?t=<token>
 *
 * The second half of double opt-in. `/api/subscribe` writes the address to the
 * Resend contact list as `unsubscribed: true` and emails a link here; this
 * handler checks the link's signature and, only then, flips that flag to
 * `false` — the single state change that makes an address eligible to receive a
 * broadcast.
 *
 * Why the signature matters: without it, `/api/confirm?email=someone@…` would
 * let anyone subscribe anyone, which is how a "newsletter" becomes a spam
 * cannon and how a domain earns a complaint rate that costs it its sending
 * reputation. `_lib/signing.js` holds the HMAC; a tampered address fails the
 * check and nothing is written.
 *
 * The link is single-purpose and safe to re-open: confirming an already
 * confirmed contact is a no-op, so a second click, a mail client prefetching
 * links, or a forwarded email all end in the same harmless place. That is also
 * why there is no expiry — see the note in `_lib/signing.js`.
 *
 * Failures are answered with a human page, never a JSON blob, because this URL
 * is opened by a person in a mail client, not by the site.
 */

import { readConfirmToken } from "./_lib/signing.js";

const RESEND_CONTACTS_URL = "https://api.resend.com/contacts";
const PUBLIC_SUPPORT_EMAIL = "support@uraltravel.co.uk";
const SITE_ORIGIN = "https://uraltravel.co.uk";

const COPY = {
  confirmed: {
    title: "You’re on the list",
    titleBn: "আপনি তালিকায় আছেন",
    body: "Your subscription is confirmed. Fare drops and travel guides will reach this inbox, and every email carries a one-click unsubscribe.",
    bodyBn: "আপনার সাবস্ক্রিপশন নিশ্চিত হয়েছে। ভাড়া কমার খবর ও ট্রাভেল গাইড এই ইনবক্সে পৌঁছাবে, এবং প্রতিটি ইমেইলে এক ক্লিকে আনসাবস্ক্রাইবের সুযোগ থাকবে।",
  },
  invalid: {
    title: "This link is not valid",
    titleBn: "এই লিংকটি বৈধ নয়",
    body: "The link may have been cut short by your email app. Open the confirmation email again and click the button, or sign up once more on the site.",
    bodyBn: "ইমেইল অ্যাপ লিংকটি কেটে ফেলতে পারে। নিশ্চিতকরণ ইমেইলটি আবার খুলে বোতামে ক্লিক করুন, অথবা সাইটে আবার সাবস্ক্রাইব করুন।",
  },
  gone: {
    title: "That address is no longer on the list",
    titleBn: "এই ইমেইল আর তালিকায় নেই",
    body: "We could not find a subscription for this link, so there is nothing to confirm. Sign up again on the site and we will send a fresh link.",
    bodyBn: "এই লিংকের জন্য কোনো সাবস্ক্রিপশন পাওয়া যায়নি। সাইটে আবার সাবস্ক্রাইব করুন, আমরা নতুন লিংক পাঠাব।",
  },
  unavailable: {
    title: "Something went wrong at our end",
    titleBn: "আমাদের দিকে একটি সমস্যা হয়েছে",
    body: "Please try the link again in a minute. If it still fails, write to us and we will confirm you by hand.",
    bodyBn: "এক মিনিট পর আবার চেষ্টা করুন। এখনও না হলে আমাদের লিখুন, আমরা হাতে নিশ্চিত করে দেব।",
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * One page, both languages, no cleverness: the visitor may have signed up in
 * English and be reading on a Bengali phone (or the reverse), and there is no
 * reliable way to know at this point. `noindex` keeps the confirm URL out of
 * search results and `no-store` keeps a shared browser from caching the result.
 */
function page(status, copy) {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(copy.title)} · URAL Travel</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
    background: #0B192C; color: #e2e8f0;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
  main { width: 100%; max-width: 560px; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(246,183,60,0.25); border-radius: 16px; padding: 32px 28px; text-align: center; }
  .mark { display: block; margin: 0 auto 20px; width: 44px; height: 44px; border-radius: 12px;
    background: #F6B73C; color: #0B192C; font-weight: 800; font-size: 20px; line-height: 44px; }
  h1 { margin: 0 0 12px; font-size: 22px; line-height: 1.3; color: #fff; }
  p { margin: 0 0 14px; font-size: 15px; line-height: 1.6; }
  .bn { font-size: 14px; color: #cbd5e1; }
  a.home { display: inline-block; margin-top: 10px; min-height: 44px; padding: 12px 22px;
    border-radius: 10px; background: #F6B73C; color: #0B192C; font-weight: 700; text-decoration: none; }
  a.plain { color: #F6B73C; }
  footer { margin-top: 18px; font-size: 12px; color: #94a3b8; }
</style>
</head>
<body>
<main role="main">
  <span class="mark" aria-hidden="true">U</span>
  <h1>${escapeHtml(copy.title)}</h1>
  <p>${escapeHtml(copy.body)}</p>
  <p class="bn" lang="bn">${escapeHtml(copy.titleBn)}</p>
  <p class="bn" lang="bn">${escapeHtml(copy.bodyBn)}</p>
  <a class="home" href="${SITE_ORIGIN}/#confirmed">uraltravel.co.uk</a>
  <p class="bn" lang="bn"><a class="plain" href="${SITE_ORIGIN}/bn/#confirmed">বাংলা হোমপেজ</a></p>
  <footer>${escapeHtml(PUBLIC_SUPPORT_EMAIL)}</footer>
</main>
</body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
        "Referrer-Policy": "no-referrer",
      },
    }
  );
}

export async function onRequestGet(context) {
  const requestUrl = new URL(context.request.url);
  const token = requestUrl.searchParams.get("t") || "";
  const env = context.env || {};

  const email = await readConfirmToken(token, env);
  if (!email) return page(400, COPY.invalid);

  const apiKey = env.RESEND_LIST_API_KEY;
  if (!apiKey) return page(503, COPY.unavailable);

  let response;
  try {
    response = await fetch(`${RESEND_CONTACTS_URL}/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unsubscribed: false }),
    });
  } catch {
    return page(503, COPY.unavailable);
  }

  if (response.status === 404) return page(410, COPY.gone);
  if (!response.ok) {
    console.warn("[confirm] contact update failed", response.status);
    return page(502, COPY.unavailable);
  }

  return page(200, COPY.confirmed);
}
