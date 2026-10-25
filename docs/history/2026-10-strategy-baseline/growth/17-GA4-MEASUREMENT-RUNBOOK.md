> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: former measurement/social runbook. The current audit found missing custom-event forwarding, click misclassification and denied-consent GA4 requests. Old event, consent, SubID and pageview instructions are not validated configuration recipes.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# GA4 Measurement Runbook — the 15 minutes before social (2026-10-24)

**Why this document exists.** The site is frozen (`15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md`) except
for one task: making the traffic that social media is about to generate **readable**. Everything
here is console-side — no repo change, no deploy, no risk to the migration.

**The rule that creates the deadline:** GA4 custom dimensions and key events do **not** backfill.
A parameter that arrives before its dimension exists is stored but never becomes a reportable
dimension. So this work has to happen **before** the first social post, not after.

**Known IDs (verified in the repo 2026-10-24):**

| Thing | Value | Where |
| --- | --- | --- |
| GTM container | `GTM-TMPVL82B` | `index.html:292` |
| GA4 property | `G-2EWKHC1KE1` | `src/components/PrivacyPolicyPage.tsx:665` |
| Consent | Consent Mode v2, all `denied` by default (`wait_for_update: 500`) | `index.html:250-262` |

---

## Step 0 — Confirm the events actually reach GA4 (5 min)

Everything below is wasted if no GTM tag forwards these dataLayer events. The repo pushes them;
GTM has to send them.

1. Open the live site in a private window → **Accept all** on the cookie banner (default consent is
   `denied`, so nothing is measured until you do).
2. GTM → **Preview** → enter `https://uraltravel.co.uk` → connect.
3. In the preview pane, click a partner button (any `tpo.li` link) and a WhatsApp link.
4. You must see in **Data Layer**: `affiliate_partner_click`, `whatsapp_click` (and
   `virtual_page_view` when navigating between pages).
5. Switch the preview to the **GA4 tab / DebugView**. Each of those events must appear there too.

| Result | Meaning | Action |
| --- | --- | --- |
| Events in Data Layer **and** DebugView | you are 15 minutes from done | continue to Step 1 |
| Events in Data Layer, **not** in DebugView | GTM has no tag sending them to GA4 | add **one** GA4 Event tag: event name `{{Event}}`, trigger = Custom Event matching `affiliate_partner_click\|whatsapp_click\|whatsapp_inquiry\|travelpayouts_referral_click\|virtual_page_view` |
| Nothing in Data Layer | consent not accepted, or a script error | re-test with Accept all; check the console for errors before touching GTM |

> Do **not** create one GTM tag per event. One catch-all tag is the documented pattern here and
> keeps the container from growing a tag every time a new event is added.

---

## Step 1 — Create the custom dimensions (5 min, must be first)

**GA4 → Admin → Data display → Custom definitions → Custom dimensions → Create dimension**

Scope is **Event** for every row. The *Event parameter* field is case-sensitive and must match the
code exactly — these strings were read out of `src/utils/analytics.ts` on 2026-10-24.

| Dimension name | Event parameter | Events that carry it | What it answers |
| --- | --- | --- | --- |
| `Link label` | `link_label` | affiliate, referral, whatsapp | which button, in words |
| `Partner name` | `partner_name` | affiliate, referral | which brand earned the click |
| `Referral sub ID` | `referral_sub_id` | referral only | which **page** produced a referral (`creator_hub`, `post_bangkok_food`) |
| `Outbound URL` | `outbound_url` | all three | the exact destination, incl. its own `sub_id` |
| `Affiliate destination` | `destination` | affiliate (explicit calls only) | which trip/route the click belonged to |

⚠️ **Correction to what I said in chat:** the parameter is **`link_label`**, not `label`. A
dimension named `label` will collect nothing forever, silently.

Notes that save an hour of confusion:

- New dimensions take **up to 24 hours** to appear in reports/Explorations. Realtime shows the
  parameter immediately, which is the right place to verify.
- Name the dimension in plain language ("Link label"), keep the parameter exact (`link_label`).
- Do **not** create dimensions for `page_path`, `page_location` or `session_source` — GA4 already
  exposes those as built-in *Page path*, *Page URL* and *Session source/medium*.

Optional, 2 minutes, do it if you want the social experiment to be legible: add
`Campaign name` ← `session_campaign` is **not** needed (built-in). Skip it.

---

## Step 2 — Mark the key events (2 min)

**GA4 → Admin → Data display → Key events → New key event.** The name must match the event
exactly, one per row:

| Key event | Why it is the one that matters |
| --- | --- |
| `affiliate_partner_click` | the money-adjacent action: a reader left for a bookable partner |
| `travelpayouts_referral_click` | a publisher is interested in the referral program (not revenue — see the $500 note below) |
| `whatsapp_inquiry` | the BDT desk's only conversion; this is your real lead event |

Leave `whatsapp_click` out of key events — it is a click *towards* WhatsApp, not an inquiry, and
marking both makes the funnel unreadable.

> If GA4 refuses to create one because the event has never been seen, do Step 0 first — the event
> must exist before it can be marked.

---

## Step 3 — Property settings that make the next 90 days honest (5 min)

**GA4 → Admin → Data streams → your web stream:**

1. **Enhanced measurement** — leave ON, but confirm *Page changes based on browser history events*
   is ON. Without it the SPA's `virtual_page_view` is the only page signal and scroll/outbound
   events fire on the first URL only.
2. **Configure tag settings → Define internal traffic** — add your own IP (or a `sandbox` /
   `localhost` value) and set it to *exclude*. Otherwise your own QA clicks pollute the first
   weeks of data, which is exactly when the numbers are smallest and most fragile.

**GA4 → Admin → Data collection → Data retention:** set **14 months**. The default 2 months
destroys the only comparison you will want in January.

**GA4 → Admin → Data streams → Tagging settings → List unwanted referrals**
Add, one per line: `ural-travel.pages.dev`, `*.pages.dev`, `localhost`, and any preview host you
test on (`*.run.app`, the Arena sandbox host). Self-referrals otherwise appear as "referral
traffic" and hide the real acquisition source.

**Property default URL:** Admin → Property settings → **Set to `https://uraltravel.co.uk`.** A
wrong default URL silently splits reports after a domain move.

---

## Step 4 — Verify before you post (10 min, next day)

Do not start social until these four are true:

- [ ] **Realtime** shows `affiliate_partner_click` **with** a *Link label* value when you click a
      partner button.
- [ ] **Realtime** shows `travelpayouts_referral_click` with *Referral sub ID* = `creator_hub`
      when you click the referral link on `/blog/travel-creator-resources`.
- [ ] **Admin → Key events** lists the three events above with recent counts.
- [ ] One test visit with `?utm_source=test&utm_medium=social&utm_campaign=runbook` appears under
      **Acquisition → Traffic acquisition** with that source/medium (give it 24 h; Realtime shows
      session source immediately).

If (1) or (2) show the event but the dimension column is empty, the dimension name/parameter is
wrong — fix it now, because **it will never fill in retroactively**.

---

## Step 5 — The one report you read weekly (build it once)

**Explore → Blank → technique: Free form**

- **Rows:** `Session source / medium` → then `Link label`
- **Values:** Event count; add *Key events* as a second metric
- **Filter:** Event name = `affiliate_partner_click` OR `travelpayouts_referral_click`
- **Tab 2:** same, but Rows = `Page path` → `Partner name` (which cluster page produces clicks)

Save it as **"Outbound clicks by source"** and open it once a week for 30 days. This single report
is what lets you cut a social surface instead of guessing:

> A surface that sends ≥ 30 sessions in 30 days and produces **zero** outbound clicks gets cut,
> not optimised.

---

## Step 6 — The consent caveat (write it down, then stop worrying)

Default consent is `denied` for everything, and `index.html` treats only
`localStorage['cookie-consent'] === 'accepted'` as granted — **"custom" with marketing on alone
does not enable analytics**. So:

- GA4 counts **consenting visitors only**, never all traffic. A "20 % traffic drop" may be a
  consent-rate change, not a demand change.
- This is not geo-fenced: a UK visitor who declines is invisible exactly like a Dhaka visitor who
  declines.
- Never compare an absolute GA4 number against a GSC impression count and conclude anything. GSC
  counts crawler-visible impressions; GA4 counts consented humans. They are different populations
  by construction.

---

## Travelpayouts — the $0 reminder, in writing

`travelpayouts_referral_click` measures **interest**, not income. Under the current terms you
receive **nothing** until a referred publisher earns **$500** and takes a payout; the ceiling is
$600 per referral, paid by Travelpayouts from its own funds. Do not read a rising click count as
revenue, and never promise income in the copy that generates those clicks.

---

## Part B — the social phase, step by step

> **Dated note (24 October 2026):** the surface decision below ("pick two") was superseded later
> the same day by the owner-locked [`16-21-DAY-SOCIAL-MEDIA-PLAN.md`](16-21-DAY-SOCIAL-MEDIA-PLAN.md)
> (all surfaces kept, EN/BN alternating). B2–B6 — the routing, utm tagging, daily cadence and stop
> rules — remain the operating instructions. This is day-by-day redirected by the plan.

Do this only after Step 4 passes. It is not "marketing" in the vague sense; it is a 30-day
experiment with a stop rule.

### B1. Pick two surfaces (10 minutes, one decision)

| Surface | Pick it because | Never do |
| --- | --- | --- |
| **Reddit answers** | the only surface that can produce a click *this week* — people are already asking the exact questions your pages answer | post a link as the post; exceed 10 useful answers per 1 link; argue with a mod |
| **Medium (Import story)** | canonical-safe: Medium's importer points the canonical back at your page, so Google keeps your version | paste body text manually — that silently drops the canonical |

Only add **Substack** if you will genuinely send a monthly email; it has **no publisher canonical**
support, so it must be an *edited dispatch* linking home, never a republish. Everything else
(Instagram, TikTok, X, Pinterest) waits until one of these two produces a click.

### B2. Route every post to the matching cluster page — never the homepage

A homepage landing from social is the worst-converting entry point on this site: it asks a stranger
to choose, instead of answering the thing the post promised.

| If the post is about… | Send it to | Not |
| --- | --- | --- |
| Umrah cost, Nusuk, hotels near the Haram, miqat | `/umrah` | `/` |
| Visas, e-visa checklists, passport, RFCD / dual-currency | `/visa` · `/banking` | `/` |
| Fares, routing, open-jaw, DAC departures | `/flights` | `/` |
| Destination plans, 5-day itineraries | `/destinations` · `/blog/<slug>` | `/` |
| A specific article | that `/blog/<slug>` page | `/blog` |

One post = one page. If you cannot name the page, the post is not ready.

### B3. Tag every link (so Step 5's report works)

GA4 reads `utm_*` automatically — no code change needed:

```
https://uraltravel.co.uk/umrah?utm_source=reddit&utm_medium=social&utm_campaign=umrah-c1
https://uraltravel.co.uk/visa?utm_source=medium&utm_medium=referral&utm_campaign=visa-c1
```

Rules: `utm_source` = the platform, `utm_medium` = `social` or `referral`, `utm_campaign` =
`<topic>-<wave>`. Lowercase, hyphens. **Never** put `utm_*` on an affiliate or referral link — it
can break the partner's own attribution; tag the URL that points at your site, not the outbound
click.

### B4. The 30-day cadence (≈ 30 min/day, no more)

| When | Do | Time |
| --- | --- | --- |
| Daily | Answer 2–3 real questions in your target subs. No links at all. | 20 min |
| 2×/week | One Medium *Import story* of an already-indexed article, canonical checked | 10 min |
| 1×/week | Open **"Outbound clicks by source"** (Step 5). Log sessions + clicks per source. | 10 min |
| 1×/month | Cut any surface with ≥ 30 sessions and **zero** outbound clicks. | 10 min |

### B5. Where the referral link is allowed to live

`/blog/travel-creator-resources` and creator communities (FB travel-blogger groups, `r/blogging`
where the rules allow, Travelpayouts' own community). **Not** in traveller threads — a "start your
own blog" pitch inside an Umrah question reads as spam and burns the domain.

Expect **$0** from it until a referred publisher earns **$500** and takes a payout. The correct
goal for 90 days is 3–6 conversations with people who already publish, not signups.

### B6. What "working" looks like (and when to stop)

| Measure | Day 30 | Day 90 |
| --- | --- | --- |
| Sessions from social/medium/referral | ≥ 50 | ≥ 300 |
| Outbound clicks (`affiliate_partner_click`) | ≥ 3 | ≥ 25 |
| Cluster pages receiving ≥ 10 sessions | 1 | 3 |
| Referral conversations logged | 3 | 10 |

If by **day 30** you have < 20 sessions from both surfaces, the problem is the *post*, not the
site: stop posting new threads and reply to existing high-traffic ones instead.

---

## Appendix — GSC: one check, then leave it alone

- **GSC → Sitemaps:** `https://uraltravel.co.uk/sitemap.xml` submitted and *Success*. (Rebuilt
  automatically by every deploy; no action unless it reads *Couldn't fetch*.)
- **GSC → Indexing → Pages:** watch the indexed count climb toward **254** over the 21-day watch
  (ends ≈ 2026-11-13). A dip is expected; do not "fix" it with content edits.
- Do not remove the DNS TXT verification record, and do not `noindex` the `pages.dev` property.
