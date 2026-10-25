> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: superseded queue of record and unfreeze triggers. Its distribution-first reasoning is preserved; thresholds, absolute freezes and old platform instructions do not control current work.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# Site Freeze Decision & Deferred Backlog (2026-10-24)

**Decision (owner, 2026-10-24):** on-site work **stops** at "technically correct + basic
analytics". No more technical-SEO depth, no hero rollout batches, no new clusters — until the
site earns the right to that work by having distribution. Effort moves to social media.

**Status of this document:** the plan of record for *when* each deferred item comes back, and
what "done" means. It does not cancel anything in `12`, `13` or `14`; it **sequences** them.

**Why it is written down:** the failure mode of a freeze is not the freeze. It is that six weeks
later nobody remembers which of the 40 open items were deliberate and which were forgotten, so
someone re-opens the wrong one. Every row below says what would make it worth doing again.

---

## 1. Is the decision right? — the honest answer

**Yes, mostly. With one exception that is not a "site" task.**

| Question | Answer |
| --- | --- |
| Does more technical SEO help a site with ~0 traffic? | **No.** CWV, schema depth, bundle splitting and hero batches are *tie-breakers and converters*. They multiply existing demand; they do not create it. At zero impressions the expected return is ~zero. |
| Was the migration work wasted? | **No.** Its whole job was to avoid an *avoidable* loss — canonicals, 301s, email, IDs. That asset is now banked and keeps working while nobody touches it. |
| Is the domain "not back" a reason to keep working? | **Two different problems on two different clocks — see §2.** One needs patience, one needs a 10-minute dashboard action. |
| Is social the right next move? | **Yes.** It manufactures the demand signal SEO needs (brand queries, click data, links, comments). It is the only channel that can produce traffic *before* ranking any keyword. |

### The rule that should govern the next 60–90 days

> **Distribution before depth.** Nothing new on the site until something outside the site has
> sent ≥ 100 sessions to it in a month. Then the site work resumes from this backlog, in order.

---

## 2. "The new domain did not bring back the old results" — split it

These two sentences are true about two unrelated systems. Treating them as one problem is how
people burn a month.

### 2.1 Google Search Console — *expected, do nothing*

- You are on **day 3 of a 21-day watch**. A **20–40 % impression dip for 1–4 weeks** is the
  documented, normal signature of a site move. Rank re-evaluation commonly takes **8–12 weeks**
  to settle, and the old `pages.dev` rows decay rather than vanish.
- The correct action is **nothing on-site**. Content edits during the dip add noise to a signal
  you are already waiting on.
- Weekly 10-minute check only: GSC → Pages / Queries / Countries. Does `uraltravel.co.uk`
  indexing climb toward 254, and do `pages.dev` impressions decay?
- **Keep forever:** both Bulk Redirect rows (`pages.dev`, `www`) and the GSC DNS TXT record.
  Removing either during or after the window re-breaks what was just fixed.

### 2.2 Travelpayouts — *this is probably not time, it is configuration*

**Do not wait for this one to heal.** A new project does **not** inherit the old project's brand
programs, and Drive is **locked** until you click *Unlock Drive*. Until both are true, links can
render perfectly and earn exactly zero — and no amount of traffic changes that.

10-minute check, in this order:

1. **Travelpayouts → project (URL `uraltravel.co.uk`).** Is it the active project, and is its id
   `589561`? (New project = new id; the repo was updated to match on 2026-10-24.)
2. **Programs tab.** Are Tiqets, Klook, KKday, Hotellook/Aviasales, Welcome Pickups, Kiwitaxi,
   Discover Cars, Airalo, AirHelp, insurance **actually listed**? A fresh project starts empty.
   Re-apply to anything missing.
3. **Drive → Unlock Drive**, then **Link switching** on per program.
4. **Reports → Clicks** for the last 7 days. Clicks with 0 earnings = traffic quality or
   program approval. **Zero clicks** = links never reached the network: re-check §2.1's missing
   programs and the `trs=589561` sweep (status in `13` §F1).

> If clicks are non-zero and earnings are zero, you have a *normal* early affiliate account and
> nothing is broken. If clicks are zero, it is configuration, not a migration hangover.

---

## 3. Freeze scope — what "stopped" actually means

| Frozen | Still allowed (emergency / zero-risk) |
| --- | --- |
| New routes, clusters, hero batches and template work | Fixing a 404, a broken form, or a wrong price/visa fact |
| Canonicals, titles, H1 copy, hreflang, schema restructuring | Regenerating `dist/` if a deploy ever fails |
| CWV / bundle work, dependency upgrades | Rotating a leaked key, revoking a token |
| New affiliate placements | Turning a broken/dead affiliate widget **off** |
| GA4/GTM *expansion* (custom dimensions, new tags) | Nothing else |

**Do not touch, ever, regardless of freeze:** the two Bulk Redirect rows, the GSC DNS TXT
record, the Resend/Email Routing DNS records, `SITE_ORIGIN`, the `emrld.ltd` Drive tag, and the
`marker=675992` / `trs=589561` pair.

---

## 4. Deferred backlog — sequential, trigger-based

Order is deliberate. **Each item names the signal that re-opens it**, so this list is a queue,
not a wish list. Do not start item *n+1* because item *n* was boring.

### S0a — Yandex Webmaster verification — **done 2026-10-24**
File deployed at the site root, `noindex` header, kept out of the sitemap, CI-guarded.
Runbook and expectations: [`01-indexing-crawling.md` §3b](01-indexing-crawling.md#3b-yandex-webmaster--verified-2026-10-24-low-effort-low-expectation).
*Deliberately inside the freeze: it is a static file + a header rule, changes no page, and needs no
content. Everything else in the freeze list still stands.*

### S0 — only if §2.2 found a gap (do now, dashboard-only, ~10 min)
Unlock Drive, attach missing programs, confirm 589561 / 675992.
*Trigger: §2.2 step 4 shows **zero clicks**.* **Blocking everything else.**

### S1 — Measurement that already exists but is unreadable — **the only open item**
Step-by-step: **[`17-GA4-MEASUREMENT-RUNBOOK.md`](17-GA4-MEASUREMENT-RUNBOOK.md)** (click-level
instructions, exact parameter names, verification checklist).
- Confirm GTM forwards the dataLayer events to GA4 (Step 0 — nothing else works if it does not).
- Event-scoped custom dimensions: `link_label`, `partner_name`, `referral_sub_id`, `outbound_url`,
  `destination`. **Note: the parameter is `link_label`, not `label`.**
- Key events: `affiliate_partner_click`, `travelpayouts_referral_click`, `whatsapp_inquiry`.
- Property hygiene: default URL, data retention 14 months, unwanted referrals, internal traffic.
*Trigger: open now — ~15 minutes, no repo change. **Must happen before the first social post**,
because GA4 never backfills a custom dimension, so traffic collected first is permanently
unreadable.*

### S2 — `/how-we-make-money/` + a visible affiliate disclosure line
One page, one sentence in the footer/partner strip. This is a **UK legal** duty (ASA/CMA) and an
E-E-A-T asset, and it is *also* what unblocks Tier-2 program approvals.
*Trigger: the first month you target UK/diaspora readers, or the first Tier-2 application.*

### S3 — P4 technical batch (small, 1 PR)
`/api/*` CORS allowlist + WAF rate limit; `Organization` JSON-LD locality review.
*Trigger: first sponsor/brand enquiry, or the first spam burst through the forms.*

### S4 — Audience test cluster (5–10 UK/diaspora URLs)
Per `12` §P6: Umrah from London/Manchester, UK→DAC visa logistics, GBP budget templates.
*Trigger: ≥ 100 sessions/month arriving from outside Google, **or** GSC shows UK impressions.*

### S5 — P6b hero batches 1–4 (flights → hotels → banking → visa/costs → tools → about)
*Trigger: ≥ 300 organic sessions/month, **or** a paid campaign that needs a landing page to
convert. Not before — the redesign is only worth its risk when conversion is the constraint.*

### S6 — Conversion and depth work
`/travel-insurance/`, `/esim/`, `/airport-transfers/`, `/hotels/:city` depth, Booking.com
applications, referral-hub upgrade + the "how Bangladeshi bloggers earn" article.
*Trigger: S2 shipped **and** one affiliate program approved above Tier 1.*

### S7 — Advanced technical (CWV/INP, bundle, image pipeline, INP instrumentation)
*Trigger: ≥ 1,000 sessions/month **or** a measured conversion problem. This is the item the
current decision is explicitly refusing — and it is the correct thing to refuse today.*

---

## 5. What replaces it: the social phase (90 days)

Sequencing lives in `14` Part 4 (Medium / Substack / Reddit) and Part 3 (referral). The parts
that matter here:

> **Executed plan (24 October 2026):** [`16-21-DAY-SOCIAL-MEDIA-PLAN.md`](16-21-DAY-SOCIAL-MEDIA-PLAN.md)
> is the day-by-day calendar for this phase. Its locked decisions supersede the recommendation in
> point 1 below: **all surfaces are kept** (EN/BN alternating), Reddit proceeds on the 10:1
> groundwork, and Substack is tested with its first 3 issues before continuing.

1. **Pick two surfaces, not five.** Recommended: **Reddit answers** (zero cost, real intent,
   the only surface that can produce a first click this week) + **Medium imports** (canonical-safe,
   search-visible within weeks). Add Substack only if you will actually email monthly.
2. **Every post has one job:** send a reader to the *matching* cluster page (`/umrah`, `/visa`,
   `/flights`, `/banking`) — not the homepage. Homepage landings from social convert worst.
3. **Tag everything** (`utm_source` + `utm_campaign`) so S1 can attribute, and so you can *stop*
   the surface that produces sessions but no clicks rather than optimising it.
4. **10:1 rule on Reddit.** Ten useful answers per one link. A removed domain is permanent.
5. **The referral link belongs in creator communities** (FB travel-blogger groups, `r/blogging`
   where allowed) — not in traveller threads. And expectations: **$0 until a referred publisher
   earns $500**; treat it as a relationship channel, never as the plan's revenue line.
6. **Do not judge the site on social traffic for 30 days** — judge the *pages* (which cluster
   page do social readers actually click through to, and do they bounce in < 15 s?).

---

## 6. Unfreeze triggers (pick the first one that fires)

| Trigger | Unfreezes |
| --- | --- |
| ≥ 100 sessions/month from any non-Google source | S4 |
| GSC shows UK impressions for any query | S2 (disclosure first), then S4 |
| First affiliate click with non-zero earnings | S6 |
| ≥ 300 organic sessions/month | S5 |
| A brand/sponsor asks for a media kit or a rate | S2, S3, S5 immediately |
| A page converts > 3 % on social traffic | S6 on *that* page only |

**Anti-triggers** — none of these justify unfreezing: a Lighthouse score, a competitor's
redesign, a new Tailwind/React version, boredom, or "it has been a month".

---

## 7. The one paragraph to give any future AI or human working on this repo

> The site is **intentionally frozen** (2026-10-24) at "technically correct + basic analytics".
> Its traffic problem is a **distribution** problem, not a technical one, and the owner is
> working on social instead. Do not propose CWV work, hero batches, new clusters, template
> refactors or extra GA4 tagging unless §6's trigger has fired. `docs/growth/15` is the queue;
> `12`, `13` and `14` remain valid but are **not** active; `docs/history/2026-10-strategy-baseline/growth/16-21-DAY-SOCIAL-MEDIA-PLAN.md`
> is the active day-by-day distribution plan. Never touch the 301 rows, the GSC TXT
> record, or the `marker=675992` / `trs=589561` pair. If you think something here is wrong, read
> §2 first: a GSC dip and a Travelpayouts config gap look similar and are treated oppositely.
