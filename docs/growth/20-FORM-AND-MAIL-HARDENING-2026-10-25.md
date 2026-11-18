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
| `functions/api/contact.js` | **Rewritten.** Single transport (Resend). FormSubmit removed. Adds: per-IP sliding-window rate limit (5 / 10 min), body-size cap (16 KB), per-field length caps, an origin allowlist for CORS, server-side Turnstile verification when `TURNSTILE_SECRET_KEY` is set, and an honest `503 mail_transport_not_configured` when no key exists. **Superseded in part on 17 November 2026 — see §5: the allowlist only shaped CORS headers and did not refuse a request.** |
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

---

## 5. Update — 17 November 2026: the contact endpoint's own gates

Four defects in `POST /api/contact` were found by executing the handler rather than
reading it. All four are fixed, and `npm run test:contact-endpoint` now asserts the
behaviour, so they cannot return.

| Defect | What actually happened | Now |
| --- | --- | --- |
| **The origin allowlist was not a gate** | `Access-Control-Allow-Origin` was emitted per request, but a request from any other site was still *processed*. CORS hides a response; it does not stop the mail. A `text/plain` body needed no preflight, so a foreign page could make the endpoint send mail, and the response was simply unreadable to it. | A browser request whose `Origin` is not this site is refused with `403 origin_not_allowed` before any work. A body that does not declare `application/json` is refused with `415`. Requests with no `Origin` (curl, server-to-server, uptime checks) remain allowed, on purpose. |
| **The honeypot never armed** | The handler checked `_honey`, but no form ever sent the field, so the trap had nothing to catch. | The contact form posts a hidden, unfocusable `_honey` input. A filled value returns an ordinary-looking `200 {status:"filtered"}` and sends nothing. |
| **The body cap trusted a header** | The 16 KB check read `content-length`; a chunked request omits it, which read as `0`, so a 2 MB body was accepted. | The declared length is a fast path; the bytes actually received are measured before the body is parsed or mailed. |
| **Turnstile failed closed on a transport error** | The comment promised to fail closed only on an explicit rejection, but the `catch` returned `ok: false`. During any outage at the verifier, every genuine visitor was told "we could not verify that you are a person". | A transport error logs and fails **open** — the inquiry is delivered. Only an explicit `success: false` fails closed. Operator error codes stay in the log instead of being echoed to the caller. |

Related repair in the browser: Turnstile tokens are single-use, and the form cleared
its token after a failed attempt without resetting the widget. The widget still
*looked* solved while React held an empty string, so "try again" posted no token and
the server answered `403`. `TurnstileWidget` now accepts a `resetSignal` and re-runs
the challenge after a failure.

**Why this was missed:** `scripts/verify-build.ts` validates both mail endpoints by
reading their source as text and matching patterns in it. A regex cannot see that a
header is emitted but not enforced. `/api/contact` is now covered by a suite that
imports the handler and stubs `fetch` — the same approach `test-rates.ts` already
used for `/api/rates`.

**Signup endpoint, same repair (17 November 2026):** `functions/api/subscribe.js`
carried the same three defects and now has the same treatment — origin gate, JSON-only
rule, measured body cap, and a honeypot the form actually sends. It is covered by
`npm run test:subscribe-endpoint` (12 behaviours).

**Still open — and it is the substantive half:** `/api/subscribe` is *not* a
subscriber list. A signup produces one notification to the desk; nothing is stored,
no confirmation is required, and no unsubscribe link is sent, so there is no list to
mail and no record of consent. The traffic rules above stop the endpoint being abused;
they do not make the page's "you're subscribed" claim true. Closing that needs a
storage decision (hosted list vs Cloudflare storage), a double opt-in confirmation
email, and an unsubscribe path — plus new EN/BN copy for the two-step signup.

## 6. Update — 17 November 2026: the list half, closed

§5 ended on the honest admission that `/api/subscribe` was not a subscriber list.
It is one now, and the "Subscription confirmed" line is gone.

**What a signup does today**

1. `POST /api/subscribe` writes the address to the Resend contact list with
   `unsubscribed: true` — known, but not allowed to receive a broadcast — and adds
   it to the segment in `RESEND_SEGMENT_ID`.
2. The same request sends a confirmation email to the subscriber, and a
   "awaiting confirmation" copy to the desk.
3. Clicking the signed link in that email hits `GET /api/confirm`, which flips
   `unsubscribed` to `false`. That single flag is the consent record.
4. Broadcasts sent from the Resend dashboard carry Resend's own one-click
   unsubscribe, so the signup block's "Spam-free · 1-Click Unsubscribe" promise is
   finally true rather than aspirational.

**Why the link is signed.** `functions/api/_lib/signing.js` HMACs the address into
the link. Without that, a stranger could confirm an address they do not own, which
turns a newsletter into a spam relay and damages the sending domain. A tampered
link is refused and nothing is written; there is a test for exactly that.

**Two keys, on purpose.** `RESEND_API_KEY` (the existing "URAL Gmail & Site" key,
Sending access) cannot touch contacts, so list writes use `RESEND_LIST_API_KEY`
(Full access). A leak of the sending key therefore cannot read or edit the list.

**What failure looks like.** If the list write or the confirmation email fails, the
visitor is told to retry — never told they are subscribed. The desk copy is best
effort: it runs after the subscriber is safely pending, because a broken copy to
Gmail must not undo a real signup.

**Unconfigured deployments** (no list key, no segment, or no signing secret) fall
back to the old behaviour and answer `pending: false`, so the browser says "we have
your request" rather than claiming a confirmation. Nothing silently pretends.

**Tests:** `npm run test:subscribe-double-opt-in` (15 behaviours) runs both handlers
against a stubbed Resend API — pending creation, segment membership, signed-link
acceptance and refusal, the 404/410 paths, re-submission of a confirmed and of a
pending address, both failure modes, the unconfigured fallback, and a source
assertion that the untrue string cannot come back.

**Still open, deliberately:** there is no expiry on confirmation links (a stale link
only ever turns on the address it names); the confirm page is a standalone branded
page rather than the site shell; and the "pending" badge in the browser clears on
returning with `#confirmed`, so a visitor who confirms in another browser keeps
seeing "check your inbox" in the first one until they revisit from the email.
