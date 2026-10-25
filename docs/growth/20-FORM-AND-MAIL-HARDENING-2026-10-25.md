# Form & Mail Hardening — 25 October 2026

**Status:** implemented, lint/build/`verify:build` green (**365 checks**), **not deployed**.
**Trigger:** two emails in the owner's inbox on 2026-10-25 — a FormSubmit "activate this form"
request and a cold-outreach spam submission that arrived through `/contact`.

**Read with:** `13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md` §P2/§P4 (the items this closes or
narrows), `15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md` §3 (why this class of change is allowed inside the
freeze), `.env.example` (the secrets this needs).

> **Freeze note.** This PR changes no canonical, URL, title, H1 or structured-identity value. It fixes
> a broken/abusable form and removes a third-party processor, which §3 of `15` lists as allowed inside
> the watch window. It does **not** unfreeze anything else.

---

## 1. What the incident actually was

| Time (Dhaka) | Event | Interpretation |
| --- | --- | --- |
| 12:36 | `URAL-REQ-5057` from "Lucy Jordon" | Cold SEO/AEO spam submitted through the public contact form. |
| 12:36 | FormSubmit "Activate Form" | FormSubmit activates **per destination address × referring domain**. The `pages.dev → uraltravel.co.uk` migration reset that pairing, so the first submission from the new domain re-armed activation. |
| 21:08 | `URAL-REQ-7468` from "Audit Simulation", phone `00000000000` | A form smoke test. Delivered by **Resend** (`from: URAL Travel Support <support@uraltravel.co.uk>`), which proves the Resend key and domain verification work. |

Neither message was a customer. The spam proved the larger point: a single submit produced **up to
three outbound dispatches to two providers**, because the browser called FormSubmit *and* the Pages
Function called FormSubmit *and then* Resend.

---

## 2. What changed

| File | Change |
| --- | --- |
| `functions/api/contact.js` | **Rewritten.** Single transport (Resend). FormSubmit removed. Adds: per-IP sliding-window rate limit (5 / 10 min), body-size cap (16 KB), per-field length caps, origin allowlist for CORS, server-side Turnstile verification when `TURNSTILE_SECRET_KEY` is set, and an honest `503 mail_transport_not_configured` when no key exists. |
| `functions/api/subscribe.js` | **Rewritten.** Single transport (Resend). FormSubmit removed. Rate limit (3 / 10 min), 8 KB body cap, field caps, origin allowlist. |
| `src/components/TurnstileWidget.tsx` | **New.** Lazy-loads Turnstile *on the contact form only*; renders nothing when `VITE_TURNSTILE_SITE_KEY` is absent, so a partially-configured deployment never locks visitors out. |
| `src/routes/ContactRouteView.tsx` | Browser-side FormSubmit call deleted. One `POST /api/contact`, real error handling (`contactError`, `role="alert"`), Turnstile token included, token cleared after each attempt. |
| `src/App.tsx` | Browser-side FormSubmit call deleted from the newsletter flow; success is now conditional on the API answering `ok`, not unconditional. Adds `contactError` state to the route context. |
| `src/components/PrivacyPolicyPage.tsx` | **New §10 "Third-Party Data Processors"** (Cloudflare, Resend, Google mailbox, Travelpayouts) in EN + BN; sections 10–15 renumbered 11–16; retention bullet for inquiries (24 months); version 2.4 → **2.5**, effective 25 October 2026. |
| `.env.example` | Documents `RESEND_API_KEY` as **required**, and `TURNSTILE_SECRET_KEY` / `VITE_TURNSTILE_SITE_KEY` with the deployment-order warning. |
| `scripts/verify-build.ts` | **9 new guards** (352 → 365 checks): no `formsubmit.co` in `src/` or `functions/`; both endpoints use Resend; Turnstile verified server-side; rate limit exists and answers 429; 503 on missing transport; no wildcard CORS; browser posts only to `/api/*`; Turnstile never enters the document shell; privacy policy names its processors in both locales. Three of them carry negative controls. |

### Why "no silent fallback" is the right call

A fallback sounds safer and is worse here: it hides a missing key behind a second provider that sees
every visitor's name, phone and message. The function now answers **503** with the support address, the
UI shows it, and the failure is visible in one place instead of being masked by a duplicate path.

---

## 3. Deployment — order matters

1. **Set `RESEND_API_KEY`** (already set on 2026-10-25 — this is the only required secret) in
   Cloudflare → Pages → `ural-travel` → Settings → Variables and Secrets → type **Secret**.
2. **Optional, recommended — Turnstile, in this order:**
   1. Cloudflare → **Turnstile** → create a widget for `uraltravel.co.uk` (+ `www`).
   2. Add `VITE_TURNSTILE_SITE_KEY` as a **build** variable (Production **and** Preview) and deploy.
   3. Verify the widget renders on `/contact` and a test submission succeeds.
   4. **Only then** add `TURNSTILE_SECRET_KEY` as a **secret**.
   > Reversing 3 and 4 rejects every visitor with `403 turnstile_failed`, because the server enforces
   > verification while the browser has no widget to produce a token.
3. **Optional, recommended — WAF rate limit** (the real control; the in-function limiter is
   per-isolate best-effort): Cloudflare → Security → WAF → Rate limiting rules →
   `URI Path equals /api/contact` → 10 requests / 1 min per IP → *Block*.
4. **Do not** click the FormSubmit activation link. It is no longer used anywhere in the codebase;
   activating it would only create an unauthenticated endpoint that accepts arbitrary content.

### Post-deploy verification (5 minutes)

| Check | Expected |
| --- | --- |
| Submit the real form once | Success screen with a `URAL-REQ-…` id; **one** email arrives (not two or three) |
| Cloudflare → Functions → logs | `200`, `deliveredVia: "resend"`, `turnstileEnforced` true/false as configured |
| Submit 6 times quickly | 6th answers `429` with `Retry-After` |
| Newsletter signup | Success only if `/api/subscribe` returned `ok`; one email |
| `/privacy` in EN and BN | New §10 renders, TOC links 10–16 resolve |

### Rollback

Revert the two files in `functions/api/` and redeploy. Everything else is additive; there is no data
migration and no DNS/secret change to undo. Do **not** roll back to the old dual-transport version —
it re-opens the unauthenticated relay.

---

## 4. Still open (deliberately out of scope)

| Item | Why it is not in this PR |
| --- | --- |
| Notifications still go to a personal Gmail (`RECIPIENT_EMAIL`) | Changing the delivery address is a one-line edit but needs a live delivery test on Cloudflare Email Routing, which cannot be run from here. **Recommended next:** point it at `support@uraltravel.co.uk` once routing is confirmed. |
| `/terms` and `/how-we-make-money` | Content work, not hardening (`15` S2). |
| Central DPA/SCC text for each processor | The policy now names processors and the safeguard class; full contract text lives with the providers. |
| Form-relay cleanup on the *deployed* site | Verify after deploy that no page still posts to a relay; the guard covers the repo, not the running build. |
| `contact.js` / `subscribe.js` still share ~60 lines of helpers | A shared module would have to live outside `functions/` (anything inside becomes a route). Not worth the routing risk for this PR. |
