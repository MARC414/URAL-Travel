> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: prior diagnostic checkpoint. Its validation counts, open/closed labels and recommended phases describe that checkpoint, not the current audit or task authorization.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# Post-Migration Plan — Status Audit (2026-10-24)

**Subject:** `docs/history/2026-10-strategy-baseline/growth/12-POST-MIGRATION-ROADMAP.md` (v1, 2026-10-23)
**Site:** https://uraltravel.co.uk · migration Day **2 of 21** (watch ends ≈ 2026-11-13)
**Method:** re-read the roadmap, then verified every *repo-visible* claim against the working tree,
the built `dist/`, and the guard suite — `npm run lint` ✅ · `npm run build` (129 EN + 129 BN) ✅ ·
`npm run verify:build` **345/345 checks** ✅.
**Not verifiable from here:** anything console-side (Cloudflare, GSC, Bing, GA4/GTM, Resend,
Travelpayouts dashboard). Those are marked *console* and must be confirmed by you, not by me.

> **Superseded for sequencing (2026-10-24):** the owner froze on-site work and moved to social
> distribution. This audit remains the record of *what is done vs open*; **`15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md`
> is now the order those open items come back in.** Nothing below is cancelled.
>
> **Headline:** the migration itself is finished and clean. The *monetisation* half is not — and
> the Travelpayouts project swap you did this week is the one thing in this audit that can
> silently cost money. See **§3, Finding F1**. Everything else is either cosmetic, deferred by the
> plan's own rules, or a two-line fix.

---

## 1. Status at a glance

Legend — ✅ done & verified here · 🟡 done, needs your console confirmation · 🟠 partially done ·
❌ not started · ⏸ deliberately deferred by the plan

| Phase | Item | State | Evidence / where it stands |
| --- | --- | --- | --- |
| P0 | `www` → apex 301 | 🟡 | Console-side; roadmap records it verified 2026-10-23 in a private window. Nothing in the repo changed and nothing needs to. |
| P0 | `pages.dev` → apex 301 | 🟡 | Console-side; keep both rows ≥ 180 days (roadmap standing rule). |
| P0c | Canonicals / hreflang / JSON-LD / sitemap / robots / RSS on apex | ✅ | `SITE_ORIGIN` is `https://uraltravel.co.uk`; `dist/sitemap.xml` + `sitemap.txt` + `rss.xml` regenerate clean in both locales. |
| P0c | GSC Domain + URL-prefix, old `pages.dev` property kept | 🟡 | Console-only. |
| P0b | Affiliate plumbing on the new host | 🟠 | Widget/white-label render path is fine. Project id swept to `589561` today (F1 ✅); **attribution proof is still open** (F3). |
| P0b | `&sub_id=` click appears in Travelpayouts stats | ❌ | Still the untested item from the roadmap, and the only way to prove today's `trs` sweep worked. |
| P1 | GA4 inside GTM fires with the SPA `virtual_page_view` | 🟡 | Repo half is correct (`analytics.ts` → `useSeoMeta.ts`). The Tag-Assistant click test is still open. |
| P1 | GA4 custom definitions (`partner_name`, `affiliate_page_path`, `affiliate_destination`, `page_location`) | ❌ | Console-only, still not created. Without them P6's UK measurement cannot be read. |
| P1 | GA4 default URL, unwanted-referral list, key events | ❌ | Console-only, still not done. |
| P1 | Consent caveat written down before reading the baseline | ❌ | Not recorded anywhere in the repo. This is the single easiest way to misread the next four weeks — see §4. |
| P2 | `support@uraltravel.co.uk` inbound + outbound + unified in code | ✅ **amended 2026-10-25** | Email routing/Resend is console, but the **code side is complete and verifiable**: every `@ural-travel.pages.dev` and personal-Gmail schema reference is gone. The original note said both functions return `502` on *dual transport failure*; that dual transport (FormSubmit + Resend, plus a second browser-side FormSubmit call) was **removed on 2026-10-25** — see `20-FORM-AND-MAIL-HARDENING-2026-10-25.md`. Each endpoint now has one transport and answers `503` when it is not configured. Note the mailbox is still a personal Gmail (`RECIPIENT_EMAIL`), which `17` §4 tracks. |
| P2 | DMARC `p=none` → `p=quarantine` after 2–3 weeks | ❌ | Clock started ≈ 2026-10-23 → due **≈ 2026-11-06 … 11-13**. Nothing to do until then. |
| P3 | 21-day watch (canonical freeze, no template churn) | ▶ running | Day 2. New URLs and body-copy fixes are allowed; canonical/title/identity changes are not. |
| P4 | `Organization` JSON-LD locality review | ❌ | Still parked. |
| P4 | `link_label` vs `link_text` analytics bug | ✅ **fixed 2026-10-24** | One producer, one key: `link_label` for `affiliate_partner_click`, `travelpayouts_referral_click` and `whatsapp_click`. `PartnerLinkButton`'s duplicate `partner_label`/`partner_url` push removed. Four new `verify:build` guards, one of them behavioural. |
| P4 | CORS allowlist + WAF rate limit on `/api/*` | 🟠 **half done 2026-10-25** | The wildcard is gone: both functions now answer CORS from an origin allowlist (`uraltravel.co.uk`, `www`, `*.ural-travel.pages.dev`, localhost) and carry a per-IP rate limit **inside** the function (5/10 min on `/api/contact`, 3/10 min on `/api/subscribe`), guarded by CI. The **WAF rate-limiting rule is still console-side and still open** — the in-isolate limiter is best-effort, not a distributed control. See `17` §3 step 3. |
| P5 | `/bn` vs `/blog/<slug>` trailing slash | ❌ | Untouched. |
| P5 | IndexNow re-submit after P4 | 🟠 | Key file is root-served; the build logged `[IndexNow] submission failed: fetch failed` in this sandbox (no egress to IndexNow from here) — harmless locally, but it means "the build submits IndexNow" is not true in every environment. |
| P5 | `01-indexing-crawling.md` says 171 URLs, artifact has 254 | ❌ | Doc still stale. |
| P6 | BD → BD **+ UK** audience restructure | ❌ | Not started (by design, starts after P4). |
| P6 | Rejected "…or Travelpayouts" H1 + affiliate disclosure line + `/how-we-make-money/` | ❌ | Rejection recorded; replacement copy not written; **no visible disclosure anywhere except the Privacy Policy**. UK ASA/CMA exposure grows the day you start targeting the UK. |
| P6b | Hero rollout, Batch 1 (flights / hotels / banking) | ⏸ | Waits for Day 21. |
| P6b | `/umrah` hero listed as "complete, do not rework" | 🟠 **fixed in part** | F4 defects 1/2/3/8 fixed today (visual only); the boxed-card redesign is still Batch 1 work after Day 21. |
| P7 | White-label defaults are BD-shaped (`DAC/KTM/BDT`), Tiqets silently falls back to USD | ✅ / ❌ | Still true (`public/travelpayouts-wl.html:153`, `TiqetsEmbedWidget.tsx:53`). Per-route GBP overrides still not applied anywhere. |
| P7 | Never regenerate `trs`/`marker` mid-flight | ✅ applied | `marker=675992` untouched (account-level); `trs` moved to `589561` because the old *project* was deleted — see F1. |

---

## 2. What is genuinely done (and should not be touched again)

1. **The domain move.** Canonicals, hreflang, JSON-LD identity, sitemap, robots and RSS all point at
   `uraltravel.co.uk` in the *prerendered* HTML (258 pages carry the identical shell).
2. **The 301s.** Both legacy hosts redirect; the redirect rows and the DNS TXT verification record
   must stay put for a year.
3. **Email.** The whole `@uraltravel.co.uk` stack works and the codebase is unified on
   `support@uraltravel.co.uk`, with honest failure codes on the two API endpoints.
4. **The build contract.** 129 + 129 routes, 345 guard checks, deterministic feeds. Nothing is
   rotting; a lot of this repo's value is that this still passes after months of work.
5. **The consent gate.** Still intact after today's change (the guard re-proves it in six
   behavioural cases, including "no consent recorded yet → must not load").

---

## 3. Findings — newest first

### F1 — The links carried the **deleted** project id (`trs=540277`) — ✅ swept 2026-10-24

Travelpayouts' own documentation defines the two ids as:

| Param | Meaning | Consequence of your project swap |
| --- | --- | --- |
| `trs` | **Project** ID subscribed to the brand program | Your old project was the one Drive used: `base64("540277") = NTQwMjc3`. It is gone. |
| `marker` / `shmarker` | **Partner** (account) marker — `675992` here | Account-scoped, normally survives project changes. **Please confirm in the dashboard.** |
| Drive file id | `base64` of the project id | New tag = `NTg5NTYx` → **589561**, i.e. the new project. |

**What it was (before the sweep):**

| File | Line(s) | What it does |
| --- | --- | --- |
| `src/components/TravelpayoutsCustomWidget.tsx` | 29 (`TRS_ID = "540277"`) | Custom flight/hotel widget |
| `src/components/TiqetsEmbedWidget.tsx` | 74 (`trs`), 235 (visible text) | Tiqets attraction widget |
| `src/components/WelcomePickupsEmbed.tsx` | 16, 19 | Transfer widget + fallback link |
| `src/components/AffiliatePartners.tsx` | 47 | Partner strip (`tpemd.com/content`) |
| `src/components/PrivacyPolicyPage.tsx` | 641 | Disclosure table (marker only — no `trs`) |

**Why it mattered:** per Travelpayouts' Drive FAQ, installing the code with the *correct* project
id **can** rewrite the project id inside existing links — but only for links Drive actually sees,
only after it loads, and only if link switching is enabled for that program. That is a fallback,
not a plan. Static widget URLs (Tiqets, Welcome Pickups, the custom widget) are constructed
*before* Drive runs, and a wrong `trs` there means a widget that renders beautifully and
attributes to nobody.

**Done (2026-10-24):** `540277` → `589561` in all four component files, plus the id comment in
`TravelpayoutsCustomWidget.tsx` explaining which id is the account marker and which is the
project. Verified in the build: **258/258 prerendered pages carry `589561`, zero carry `540277`**
(the old number now appears nowhere in `dist/`). Still to do, dashboard-side and outside the repo:
click one link per family with a distinct `sub_id` (`umrah_tiqets`, `wl_custom`,
`welcome_pickups`, `partner_strip`) and confirm the row appears in statistics.

### F2 — Drive is installed but not yet activated in the dashboard 🟠

Done in this session (`index.html`, ships to all 258 prerendered pages):

* script swapped to the new project: `https://emrld.ltd/NTg5NTYx.js?t=589561`;
* **consent gate kept** (marketing category only — unchanged decision logic);
* load trigger moved from *footer-in-viewport* to *first idle slot after DOMContentLoaded, 2.5 s
  ceiling* — Drive rewrites links, so a trigger that only fires when someone scrolls to the footer
  meant most sessions never loaded it. It is still off the LCP path;
* `?tpverify=1` one-shot hatch so Travelpayouts' crawler (which never clicks a cookie banner) can
  see the script;
* the guard suite was updated honestly rather than silenced: the consent decision is still proven
  in all six cases, and the new "deferred load" property is now asserted instead of
  "IntersectionObserver/rootMargin".

**Still open, dashboard-side:** Drive is per-project and must be **unlocked** in the new project
before it does anything. Sequence: new project → Drive → *Unlock Drive* → install tab → *"I've
pasted the code"* → link-switching toggles. Also confirm the **new project is not archived** and
that the old project's programs (Tiqets, Klook, KKday, Welcome Pickups, hotellook, Kiwi…) were
re-attached to it. Programs live **per project** — a new project starts with *none* of them.

### F3 — Attribution is still unproven, and the plan says so itself 🟠

Roadmap P0b's last open item: click a partner link with `&sub_id=…` and confirm it lands in
statistics. This has never been done. It is the cheapest possible test and it is the only way to
know whether F1 matters. Do it before anything else in this document.

### F4 — `/umrah` hero is marked "complete" in the plan but is not the approved pattern ⚠️

The roadmap (§P6b) sets the **approved reference standard**: the `/contact` boxed card
(`bg-brand-navy rounded-3xl relative overflow-hidden shadow-xl border border-slate-800`, photo +
left-weighted directional scrim) and then lists `/umrah` as "Already Complete (Do Not Rework)".
What `/umrah` actually renders (`UmrahLandingPage.tsx:48–75`) is a different pattern: a
**full-bleed `w-screen` strip** with a hand-written inline `linear-gradient` overlay and a photo at
`opacity-45`. Your complaint is therefore factually correct, and the plan is what is wrong.

Concrete defects visible in the code (not taste):

| # | Defect | Where | Fixed 2026-10-24? |
| --- | --- | --- | --- |
| 1 | `w-screen` + `left-1/2 -translate-x-1/2` ignores scrollbar width → hero edge clipped and content shifted ~8 px | `:52` | ✅ clipped safely at the app root (`overflow-x-clip`); the residual sub-pixel centring error is invisible on a full-bleed band |
| 2 | Overlay is an inline 3-stop `rgba()` gradient (0.96 → 0.72) | `:62–68` | ✅ replaced with the approved `/contact` scrim (`from-[#071120] via-[#071120]/95 to-[#071120]/45 sm:via-/88 sm:to-/20`) |
| 3 | Hero height on mobile ≈ full viewport before any content | `py-12` | ✅ reduced to `py-10 sm:py-14 lg:py-20` |
| 4 | Same flight CTA appears 3× in the hero | `:118`, `:262`, `:307` | ⏳ content decision, not a bug — left alone |
| 5 | Date inconsistency: "reviewed 18 October 2026" vs "14 Oct 2026" | `:81` vs `:163` | ⏳ needs your call on which date is true |
| 6 | "Unre-Priced" is not a word | `:163` | ⏳ same line as #5 |
| 7 | No affiliate disclosure in the hero or near the partner strip | page-wide | ⏳ P6 copy work (legal, not visual) |
| 8 | Photo at `opacity-45` behind a 7-col text column — the Kaaba is effectively invisible | `:55` | ✅ `opacity-60` + the lighter right-hand scrim; the photo now reads as a photo |

**What actually changed in the repo** (`UmrahLandingPage.tsx` + `App.tsx` + `index.css`):

1. **The photo is visible again.** Raised to `opacity-60` and swapped the hand-written gradient for
   the same left-weighted scrim `/contact` uses, so contrast on the text side stays high while the
   right-hand side (which only carries the conversion card) lets the image through.
2. **The full-bleed overflow is clipped without breaking `position: sticky`.** See **F6** — this is
   the change that most likely explains "it still looks broken".
3. **Mobile hero is ~40 px shorter**, so the calculator's heading starts earlier.

`verify:build` stayed at **345/345** after all three, and the full-bleed gap guard still passes.

### F6 — 🐛 The sticky header was not actually sticking (root `overflow-x-hidden`)

`src/App.tsx:2650` put `overflow-x-hidden` on the app's root box. In CSS, `overflow-x: hidden` with
`overflow-y: visible` computes to `auto`, which makes that box a **scroll container**. A scroll
container that never scrolls becomes the scrollport for every `position: sticky` descendant — so
`#sticky-site-header` had nothing to stick to and scrolled away with the page. The full-bleed
heroes then appeared to "float" with no nav above them, which reads exactly like a hero layout
bug.

Fix: `overflow-x-clip`. It cuts the same horizontal overflow but does **not** create a scrollport,
so the header sticks again. Baseline support (Chrome 90+, Firefox 81+, Safari 16+); older engines
ignore it and behave as before.

### F5 — The watch window is being read as "don't deploy at all" ⏸

Day 2 of 21. The plan's actual rule is narrower: no canonical / URL / title / structured-identity
changes on already-indexed URLs. A `<head>` script, a CSS-only hero fix and body copy are inside
the rules; a metadata rewrite is not. Today's Drive change is therefore legal under the plan.

---

## 4. The two traps in the next four weeks

1. **Consent-shaped vs migration-shaped dips look identical.** GA4 only counts visitors who accept
   analytics storage (`analytics_storage: 'denied'` by default, `wait_for_update: 500`, not
   geo-fenced). A 20–40 % impression dip is the *expected* migration signature for 1–4 weeks. Do
   not "fix" either with content edits — annotate both in GA4 and keep working.
2. **`pages.dev` rows in GSC are decay, not damage.** Keep the property open as a Change-of-Address
   source; do not `noindex` it, ever.

---

## 5. Recommended order (what I would actually do next)

| When | Action | Risk |
| --- | --- | --- |
| ✅ done today | Confirm project id **589561** (Drive unlock + `trs` sweep) — dashboard steps remain | none |
| Now | Travelpayouts → new project → **Unlock Drive** → re-attach the brand programs → "I've pasted the code" (repo half ✅) | none |
| Now | `sub_id` attribution test on one link per family | none |
| ✅ done today | F1 `540277` → `589561` in 4 components, verified in `dist/` | low — ids only |
| This week (console) | GA4 custom definitions + key events + default URL + unwanted referrals | none |
| This week | Write the consent caveat into `docs/history/2026-10-strategy-baseline/growth/01-indexing-crawling.md` | none |
| ✅ done today | `/umrah` hero: photo/scrim/overflow/mobile-height + the sticky-header bug (F4, F6) — no H1 rewrite | low |
| ~2026-11-06 | DMARC `p=none` → `p=quarantine` | none |
| ~2026-11-13+ | P4 batch (CORS, JSON-LD locality — `link_label` already done), then P6 cluster | medium |
| After P4 data | P6b Batches 1–4, H1/metadata rewrite in its own PR | medium |

---

## 6. One-line verdict per phase

`P0 ✅ · P0b 🟠 (F1/F2/F3) · P1 ❌ console · P2 ✅ (DMARC later) · P3 ▶ Day 2 ·
P4 ❌ 3 items · P5 ❌ 3 items · P6 ❌ · P6b ⚠️ (§F4) · P7 🟠`

The migration is not the problem any more. **The affiliate ids are.**
