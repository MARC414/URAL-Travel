# URAL Travel — Post-Migration Roadmap (v1, 2026-10-23)

Sequencing plan for everything that opens after the `uraltravel.co.uk` canonical move.
It exists because the migration left four half-finished threads (email, GA4 dimensions,
`www`, a CI guard) and because a deliberate **audience restructure** (BD → BD + UK) is
now on the table. Doing those in the wrong order is how a clean migration turns into an
unreadable dataset.

**Companion doc:** `11-DOMAIN-MIGRATION-PLAN.md` (the move itself; §8 has live status).

---

## 0. The rule that orders everything

Two kinds of work, and only one of them is dangerous right now.

| Class | Definition | Timing |
| --- | --- | --- |
| **Console-side** | Cloudflare, GSC, GA4, GTM, Resend — no repo diff, no deploy | **Any time.** Safe during the whole watch |
| **Deploy-side** | Anything that changes `dist/` — copy, templates, schema, mailboxes | **After Day 21** (≈ 2026-11-13), and after the feed-determinism gate |

Non-negotiables that outlive all phases:

1. **Never** touch `SITE_ORIGIN`, canonicals, hreflang, `robots.txt` Sitemap lines, or the
   JSON-LD identity during this roadmap. That work is finished and verified.
2. **Keep the Bulk Redirects 301 for ≥ 180 days, ideally a year.** Google only honours a
   site move for ~180 days.
3. **Leave the GSC DNS TXT verification record in the zone.** Removing it can drop the
   Domain property's verified status.
4. One PR = one concern. Never bundle a template change with a content addition.

---

## 1. Which sector first — mentor's call

Three sectors are competing for the next weeks: **technical** (indexing, Core Web Vitals,
infra), **functional** (does the machine make money and behave correctly), **aesthetical**
(does it look like a £10m brand).

**Selected: FUNCTIONAL — affiliate + email plumbing. Not aesthetics. Not more SEO.**

| Sector | Verdict | Why |
| --- | --- | --- |
| Technical | **Wait — it is already finished, and finished work does not want more work.** | The only correct action on the index is *patience*. Every extra deploy inside the watch window buys noise, not signal. |
| Functional | **Do now.** | A domain move's highest-severity consequence is **silent monetisation failure**, and it is exactly the thing GSC, GA4 and Search Console will *never* report. |
| Aesthetical | **Deferred to P6, deliberately.** | Hero/H1/CSS are template changes = forbidden until Day 21. Also: a redesign bolted onto a surface whose audience definition is about to change gets thrown away twice. |

The asymmetry that decides it: **an SEO failure announces itself** (traffic drops, you chase it
within days). **A monetisation failure is invisible for a full pay cycle** — a widget that stopped
loading emits no error, changes no ranking, and shows up only on a statement weeks later. Same
severity, no alarm. So the plumbing gets checked *first*, while the index is asked for nothing.

---

## P0 — Finish the migration itself (this week, console-side only)

These are not new work. They are the last open bolts on a job already shipped.

- [x] **`www` duplicate host CLOSED — 301 live and verified 2026-10-23.**
      One row added to the existing `ural_redirect` list via **`Add redirect`**:
      Source **`www.uraltravel.co.uk`** (typed bare; Cloudflare re-displays a trailing `/` itself),
      Target `https://uraltravel.co.uk`, **301**, and the four per-row toggles set
      **Preserve query ON · Include subdomains OFF · Subpath matching ON · Preserve path suffix ON**.
      **Both gates passed in a private window:** `www…/bn/umrah?x=1` → apex with path + query, and
      `ural-travel.pages.dev/bn/umrah` → apex **unchanged** (the untouched row proved the October
      redirect survived the list edit). Two corrections recorded the hard way:
      (1) those four toggles are **per-redirect row**, *not* per-list as first assumed — which is why
      they appeared unchecked on a new entry and why editing them could not disturb `pages.dev`;
      (2) `fetch_page` **follows** redirects, so it cannot distinguish "301 firing" from "no redirect"
      — my "still serving the site" reading was inconclusive, not evidence. **Browser private-window
      testing is the only instrument for this class of check.**
      **Standing rule:** keep *both* rows for ≥180 days, ideally a year. Do not "tidy" them later,
      and never replace either with `noindex` (see `public/_headers`, which now truthfully states
      `www.` 301s to apex).

## P0c — Migration-side loose ends, all closed 2026-10-23

| Item | State |
| --- | --- |
| Canonicals / hreflang / JSON-LD / sitemap / robots / RSS on `uraltravel.co.uk` | ✅ live since `bea24a8` |
| `ural-travel.pages.dev` → apex 301 | ✅ verified by user, twice |
| `www.uraltravel.co.uk` → apex 301 | ✅ verified by user, today |
| GSC Domain + URL-prefix properties | ✅ verified; old `pages.dev` property kept open as CoA source |
| Bing | ✅ site moved |
| Affiliate / white-label on new host | ✅ P0b |
| **Remaining** | **Nothing console-side.** Only the Day-21 watch (P3) and the P4 deploy batch |

## P0b — Affiliate plumbing on the new domain (functional, this week)

**Key fact that makes this low-risk:** `trs=540277` is the **publisher account** id and
`marker=675992` is a **sub-ID**; both are account-scoped, not site-scoped. Nothing in the repo
has to be regenerated when the site URL changes — which is why "do not touch the ids" was right,
and why the fix is dashboard-side + verification, not code.

**STATUS 2026-10-23 — verified working on the new domain. Phase closed except the `sub_id` item.**

- [x] Travelpayouts dashboard → project **Site URL** = `https://uraltravel.co.uk` (changed 2026-10-23).
- [x] **White-label shell smoke-test passed:** `https://uraltravel.co.uk/travelpayouts-wl.html?standalone=1`
      opens and loads `tpemd.com/wl_web/main.js?wl_id=22462`.
- [x] **Homepage flight widget renders** — user sees the interactive search form with the yellow
      Search button, i.e. the `data-tp-skeleton="flights"` placeholder (`src/App.tsx:335`) is being
      replaced. The skeleton is lazy by design (viewport / interaction / 2.5 s ceiling), so *no grey
      visible from the top of the page is the expected healthy state*, not a missing widget.
- [x] **`emrld.ltd` risk retired — my over-statement, corrected.** `index.html:331` loads
      `https://emrld.ltd/NTQwMjc3.js?t=540277`; `NTQwMjc3` is just `base64("540277")`. It is
      Travelpayouts' own CDN selecting by **account id**, with no registered-domain pinning, so it
      was never a migration risk. It is *also* consent-gated by `marketingAllowed()` (`:336`):
      declined cookies ⇒ script never loads ⇒ blank-but-correct. **Lesson for this doc: never treat
      a consent-gated third party as an outage.**
- [ ] **Only open item — attribution, not rendering:** click one partner link with `&sub_id=domain-move`
      appended and confirm it appears in Travelpayouts statistics. A widget that *renders* is not a
      widget that *attributes*. Low urgency; check at the next natural click-through.
- [ ] Note for later: widget chrome inherits URAL brand colours (gold Search button), so the Travelpayouts
      white-label theme is stylable — relevant to the P6 aesthetic pass, not to migration.
- **API token: not needed.** It gates the WP plugin / Data API / SDK only; the key appears **0 times in
  the repo**, so nothing in this site depends on it. Rotate whenever, changes nothing here.



## P1 — GA4 / GTM follow-through (console-side, this week)

Done and verified: GA4 inside GTM is correct (`Ural GA4 - Google Tag` fires Page View;
`React SPA Route Changes in GA4` on `Event - Virtual Page View` is correct-by-design for the
`virtual_page_view` pushed at `src/utils/analytics.ts:26` via `useSeoMeta.ts:389`).

- [ ] **Prove the route test:** click a nav link with Tag Assistant attached → GA4 Event tag
      must move to *Fired*. If it never fires on in-page navigation, SPA pageviews are lost.
- [ ] **Custom definitions** (GA4 → Admin → Custom definitions → scope **Event**):
      `partner_name`, `affiliate_page_path` (from `page_path`), `affiliate_destination`
      (from `destination`), `page_location` (from `Page URL` — this one is the filter that
      lets you exclude sandbox/preview hosts inside Explorations; GA4 has no hostname traffic
      filter). GA4's 50-hour auto-capture window has passed, so expect **no retroactive data**.
- [ ] **GA4 default URL** → `https://uraltravel.co.uk`.
- [ ] **Unwanted/self referral:** add `ural-travel.pages.dev` (plus `arena.site`,
      `*.run.app` if they keep hitting the container).
- [ ] **Key events:** mark `affiliate_partner_click` and `whatsapp_inquiry` as key events.
      GA4 auto-creates custom event *names* — do **not** add a GTM tag per event.
- [ ] **Write down the consent caveat** before reading any migration baseline: consent default
      is `analytics_storage: 'denied'` unless `localStorage['cookie-consent'] === 'accepted'`
      with `wait_for_update: 500`, and it is **not geo-fenced** — GA4 counts consented users,
      not all users. A consent-shaped dip and a migration-shaped dip look identical otherwise.

**Known repo bug, parked (not P1):** `src/utils/analytics.ts:83` sends `link_label`, the global
listener at `:160` sends `link_text` for the same event → one is always empty. Fix in P4.

## P2 — Email: the actual plan for `@uraltravel.co.uk`

**Answer: yes, a real `support@uraltravel.co.uk` costs £0.** Cloudflare Email Routing is free
with unlimited inbound — 200 routing rules/domain, 200 verified destination addresses/account,
25 MiB messages, plus-addressing since Jul 2025. It forwards to Gmail; you never buy a mailbox.
The folklore "100/day" cap is gone.

### The only thing that can make this cost money or break something

MX is **one set per hostname**. Whoever owns the MX owns the mail. If the zone already carries
**LCN** (or any host) mail/forwarding records, enabling Email Routing **replaces** them and
breaks the old path. So decide the owner before touching anything.

**Step 1 — the one check that settles everything (30 seconds, zero risk):**
Cloudflare → `uraltravel.co.uk` → **DNS → Records** → filter **MX**.

| What you see | Meaning | Action |
| --- | --- | --- |
| No MX rows | Nothing receives mail today | **Option B** below. No conflict, nothing to break |
| MX → `*.lcn.com` / hostinger / other | A provider already owns mail | **Option A** first — cheaper, zero DNS churn |
| MX → `route*.mx.cloudflare.net` | Email Routing already enabled | Skip to configuring rules + catch-all |

### Options

**A — Use the registrar's existing forwarding (default choice).**
If LCN (or whoever) already offers *free incoming-only forwarding* for the domain, create
`support@`, `privacy@`, `hello@` there → forward to Gmail. **No Cloudflare DNS change at all.**
Cloudflare Email Routing then never needs to exist. This is the answer to "without paying".

**B — Cloudflare Email Routing (only if A is unavailable).**
Enable → accept the auto-created MX (priorities 8/19/29 → `route{1,2,3}.mx.cloudflare.net`)
→ verify `marcwriter2025@gmail.com` as a destination → **catch-all ON → that destination**
instead of two named rules. A catch-all also delivers every *typo'd* GDPR request, which named
rules silently drop.
Two gotchas: since **2025-06-30** inbound mail failing SPF **and** DKIM is silently dropped —
always test from Gmail. And there may be **only one SPF TXT at `@`**; two = `permerror`. If a
sending service (Resend) is later added, confirm its SPF/DKIM land on a subdomain/selector,
not `@`.

**C — Pay for hosted mail.** Not warranted. Only if you later need real multi-seat mailboxes.

### Send path is a separate question — do not conflate it

`alerts@uraltravel.co.uk` in `functions/api/subscribe.js:137` is a **`from:`, not a mailbox**.
Sending from an address needs no inbox, only a verified sending domain. And it can **never** work
as written: `@…pages.dev` is un-verifiable in any provider, so that line is dead by construction,
hidden inside a swallowed `catch`. First check **whether the path runs at all**: Pages →
`uraltravel` → Settings → Functions → env vars → is `RESEND_API_KEY` set? If not, Resend is
optional and silently skipped.

### Sequencing (do not skip)

1. Now: **Option A or the DNS check.** No code.
2. Prove inbound: mail `support@`, `privacy@`, `hello@`, and a deliberate typo (`typo@`) from
   Gmail. All four must arrive.
3. **Only then**, in P4's PR, swap `privacy@` ×5 (`PrivacyPolicyPage.tsx:414, 860, 861, 926, 932`)
   and `subscribe.js:137` `from:`.
4. **Never ship a new address before step 2 passes.** The policy promises a formal reply within
   30 days in EN *and* BN; pointing that promise at an unproven mailbox converts an honestly
   broken contact into a false one.
5. Leave `index.html:180` (`"email": "farhan.momen@gmail.com"` in the `Organization` JSON-LD)
   to the P4 schema cleanup — publicly indexed PII with no rich-result benefit since Google dropped
   those `LocalBusiness` requirements.

### Why `subscribe.js` fails silently (fix in P4, not now)

`:124` computes `formSubmitDelivered` truthfully, then `:180-189` returns `ok: true / 200`
regardless; the Resend branch swallows its own `catch`; the client (`src/App.tsx:1244-1266`) uses
`Promise.allSettled`, which cannot throw, so visitors always see success. Zero-deploy diagnostic
today: submit once with DevTools open and read the JSON — and note **two** notifications may arrive,
because `App.tsx:1264` also POSTs to FormSubmit directly from the browser.
FormSubmit activation is **per address, not per domain**, so the domain change did not reset it;
but held-until-activated submissions expire after **30 days**.

## P3 — Migration watch: Day 1 → 21 (2026-10-23 → 2026-11-13)

**Deploy-side: frozen. Console-side and new-URL content: allowed.**

The earlier "don't edit the site for 21 days" was over-broad. It means: **do not change signals
on already-indexed URLs.** New pages are unaffected — they have no old canonical to disturb.

| Allowed now | Deferred to P4+ |
| --- | --- |
| New URLs (UK/diaspora cluster, ≤10) | Any **template** change: H1, title, nav, footer, above-fold |
| Body-copy edits on existing pages | `privacy@`/`alerts@` swaps, schema cleanup |
| Console/config (P0, P1, P2 step 1) | Trailing-slash normalisation |

Weekly 10-minute check (GSC → Pages, Queries, Countries):
- indexing of `uraltravel.co.uk` climbing toward **254**;
- `pages.dev` impressions/clicks decaying toward 0 — **lingering rows are decay, not damage**;
- expect a **20–40 % impression dip for 1–4 weeks**. Normal. Do not "fix" it with content edits;
  that is exactly the mistake this phase exists to prevent.

## P4 — First deploy PR after the watch (one small batch)

Everything already parked plus the CI guard edits currently **uncommitted in the worktree**
(`public/_headers` rewrite, `scripts/verify-live-sitemaps.ts` redirect assertion — `git status`
shows them as `M`; there is no commit for them yet).

Scope, in this order:
1. `privacy@uraltravel.co.uk` ×5 + `subscribe.js` `from:` (only if P2 step 2 passed).
2. Schema PR: drop `address`/`geo`/`priceRange`/`currenciesAccepted`/`paymentAccepted` and the
   `email` PII from `Organization` (or → `Organization` only, no `TravelAgency` locality claims);
   fix the `_headers` comment that currently asserts `www.` 301s (untrue until P0 lands).
3. Make `subscribe.js` fail loudly: return a non-200 (or at least surface the error) when
   `formSubmitDelivered === false`; reconcile `link_label` vs `link_text`.
4. Harden the endpoint: it is `Access-Control-Allow-Origin: *` with no rate limit and it proxies
   attacker-controlled `source`/`pageUrl` into your inbox. Needs an allowlist + throttle.

Gate before pushing: `lint` → `build` (129 EN + 129 BN) → `verify:build` (expect **340/340**) →
`test:sitemaps` (23 controls) → **feeds byte-identical across a rebuild**.

## P5 — Small pre-existing debts (separate PRs)

- `/bn` vs `/blog/<slug>` trailing-slash inconsistency (predates the migration).
- IndexNow: key file must stay root-served on the canonical host; re-submit after P4.
- `docs/growth/01-indexing-crawling.md` says 171 sitemap URLs; the artifact has 254. Fix the doc.

## P6 — Audience restructure: BD → BD **+ UK** (starts after P4)

**Strategic correction.** A "BD → UK" *replacement* is the wrong frame and wastes the asset you
just spent a migration protecting. Model it as three audiences on one domain:

| Audience | Card-ready? | Payout frame | Where the money is |
| --- | --- | --- | --- |
| Residents of Bangladesh | Rarely (bKash/Nagad vs card-only checkout) | USD fallback today | Informational volume, weak monetisation |
| **UK-based Bangladeshis / diaspora** | **Yes** | **GBP** | **Highest fit: UK spend + your existing BD-topic authority** |
| Mainstream UK travellers | Yes | GBP | New competitive corpus; slowest to rank |

The middle row is the arbitrage: the site already owns Dhaka-corridor, Umrah, visa and halal-travel
expertise, and the diaspora searches exactly those topics from a UK card. Mainstream UK travel is a
multi-quarter climb against funded publishers — enter it later, deliberately, not as a pivot.

Sequencing:
1. **Test cluster: 5–10 new URLs**, existing IA, no template change. E.g. *Umrah from London /
   Manchester*, *Bangladeshi → Bangladesh flights from UK airports*, *Halal city guides for UK
   travellers*, *UK → Dhaka visa/eVisa logistics for BRWC holders*, *GBP budget templates*.
2. **Measure ≥ 4 weeks** in GSC (Queries + Countries) and GA4 (`affiliate_destination`,
   `partner_name`). Only commit to a section if data supports it.
3. **Then** the H1/title/metadata rewrite, in its own PR (P7's copy work lives here too).
4. Keep `hreflang` as-is (`en-bd` / `bn-bd`). Do **not** invent `en-gb` variants or half-clusters —
   a one-way hreflang is worse than none. Revisit only if a true `en-gb` vs `en-bd` fork ships.
5. GBP decision: `TiqetsEmbedWidget.tsx:53` accepts only USD/EUR/GBP and **falls back to USD** —
   UK-framed pages should pass `currency=GBP&locale=en-gb`. Do not regenerate `trs=540277` /
   `marker=675992` mid-flight.

### The hero H1 — proposed copy rejected, problem accepted

Proposed: *"Plan your trip with URAL or Travelpayouts"*. **Do not ship this.**

1. `TiqetsEmbedWidget.tsx:55` already calls the network "a third-party partner". Your H1 would say
   "we are the affiliate middleman" in the loudest position on the site.
2. It is not a choice between two brands — you do not operate a Travelpayouts storefront.
3. It surrenders the brand you are actually building to a network that does not know you exist.
4. Trademark exposure: using a partner's mark in your H1 implies endorsement.
5. SEO: it dilutes your primary keyword set by spending the H1 on a third party's name.

**But the instinct underneath is correct and should be honoured:** affiliate transparency is a
*legal* duty for a UK audience (UK asa.org/CMA and ICO/PECR apply from the day you target the UK,
and unlike GDPR it is **not** geo-fenced) and it is currently only in the Privacy Policy. Fix it in
P6 step 3 with real copy, not a network name:

- Keep audience-facing value: *"Plan your trip from Dhaka or London — fares, visas, stays."*
- Or the UK-first option: *"UK money, Dhaka routes. Fares, visas, stays — in GBP and BDT."*
- Add a visible disclosure line where the partner strip already renders
  (`index.html:148-160` "Travelpayouts partner network", `:306-312`):
  *"Some links pay us a commission. It never changes your price and never shapes our rankings."*
- Consider a `/how-we-make-money/` page — for UK E-E-A-T that single page may outperform every
  other P6 idea here.

## P7 — Monetisation deepening (after P0b is green, code lands in P4/P6)

Registered-domain flip is **done** (2026-10-23) — see P0b. What remains is the part that makes
the UK thesis real rather than rhetorical:

- **The white-label defaults are Bangladesh-shaped at the source.** `travelpayouts-wl.html` hard-codes
  `initOrigin = "DAC"`, `initDest = "KTM"`, `initCurrency = "BDT"`;
  `TiqetsEmbedWidget.tsx:53` accepts only `USD|EUR|GBP` and **silently falls back to `USD`**, so a
  Bangladeshi visitor sees USD prices on a BDT page. For UK-framed pages: pass `currency=GBP`,
  `locale=en-gb` and a UK origin (LHR/MAN) *per link* — never change the global default, because
  the BD audience is still the corpus.
- **Never regenerate `trs=540277` / `marker=675992`** — account- and sub-ID-scoped, unaffected by the
  move (P0b). Adding `sub_id` values is the cheap way to prove attribution per surface.
- Re-check `areaServed: GB` as a *schema-only* change **after** a UK corpus exists — not before,
  or it is a claim with no pages behind it.

---

## Dependency graph

```
P0 (console: www, gateway, GSC, Bing ✅)  ─┐
P0b (affiliate plumbing — FUNCTIONAL)      ├─→ P3 watch ends ~Nov 13 ─→ P4 (deploy PR) ─→ P5 ─
P1 (GA4/GTM)                               │                                          ├→ P6 → measure → P6.3 H1
P2 step 1 DNS check + Option A now ────────┘                                          │
   P2 step 3 code swap rides in P4                                                     └→ P7
```

**Critical path:** P2's inbound test must pass *before* P4, or P4 ships a broken legal contact.

## Do not do (each has already cost someone time somewhere)

- No `noindex` on `pages.dev`. A 301 moves signals; noindex deletes them.
- No `%%SITE_ORIGIN%%` build token — prerender rewrites the head by regex; a token leaks into 254 files.
- No per-event GTM tags. GA4 auto-creates custom event names.
- No gateway adoption without the `index.html` + `verify-build.ts` change that makes it real.
- No "fixing" the `/bn` trailing slash inside the redirect config.
- No bulk restructure of the existing 254-URL corpus before P6 step 2 has data.
- No `git push` or `git commit` without an explicit instruction.
