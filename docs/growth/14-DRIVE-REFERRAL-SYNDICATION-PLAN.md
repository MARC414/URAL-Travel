# Drive, Partner Expansion & Syndication Plan (v1, 2026-10-24)

**Scope:** activate Travelpayouts **Drive** on `uraltravel.co.uk`, grow the number of approved brand
programs, run the Travelpayouts **referral** program, and syndicate articles to **Medium, Substack
and Reddit** without losing the SEO the migration just protected.

**Read with:** `13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md` (why the ids matter),
`12-POST-MIGRATION-ROADMAP.md` (the watch-window rules), `07-backlinks-free.md` (link acquisition),
`CONTENT-QUEUE.md` (what to write next).

---

## 0. The one rule that governs all four parts

> **The site is the master copy. Every other surface is a satellite.**
> Affiliate links, canonicals, disclosures and analytics ids live on `uraltravel.co.uk` only.
> Satellites earn attention and referral clicks; they never earn the canonical.

Everything below is an application of that sentence.

---

## Part 1 — Drive: finish the activation (repo half is done)

### 1.1 What changed in the repo (2026-10-24)

| File | Change |
| --- | --- |
| `index.html` | Drive script re-installed from the **new project 589561**: `https://emrld.ltd/NTg5NTYx.js?t=589561`. Sits in `<head>`, ships to all 258 prerendered pages. |
| `index.html` | Load trigger moved from *footer in viewport* → *first idle slot after `DOMContentLoaded`, 2.5 s ceiling*. Drive's job is rewriting links that a visitor may click before reaching the footer. |
| `index.html` | Consent gate **unchanged in substance**: marketing category only, reads `cookie-consent` + `cookie-consent-settings`, reacts to `ural:consent-updated`. |
| `index.html` | `?tpverify=1` one-shot hatch so Travelpayouts' crawler (which never clicks a cookie banner) can see the script. |
| `scripts/verify-build.ts` | Guard updated honestly: "deferred load" property asserted instead of `IntersectionObserver`; loader extraction renamed to `loadDrive` (tolerates the old name); stub DOM gains `setAttribute` + a synchronous `requestIdleCallback`. **345/345 checks pass.** |

Verified in the built output: `dist/index.html` and **258** prerendered HTML files carry the new id;
zero pages still reference `NTQwMjc3.js`.

### 1.2 What only you can do (dashboard, in this order)

1. **Projects → the new project (URL `https://uraltravel.co.uk`)**
   Confirm it is *active*, not archived, and write down its **project id (589561)** and its
   **marker** (expected still `675992` — the account-level id).
2. **Re-attach every brand program to the new project.** Programs are attached **per project**; a
   brand-new project starts with none. At minimum: Aviasales/Hotellook, Booking.com, Tiqets, Klook,
   KKday, Welcome Pickups / Kiwitaxi / GetTransfer, Airalo, AirHelp, insurance (VisitorsCoverage /
   Insubuy / EKTA), Discover Cars, Omio, 12Go.
3. **Drive → *Unlock Drive*** on that project, then **Link switching** on for each program you want
   Drive to rewrite. This is also what lets Drive repair the old `trs` inside links it sees — but do
   not rely on that; do §1.3.
4. **Copy the code tab → "I've pasted the code".** The tag is already live after the next deploy.
   If their checker says *not found*, open `https://uraltravel.co.uk/?tpverify=1` once.
5. **Sub-ID discipline** (see Part 5): add `&sub_id=` to every link you can, so Drive's rewrites
   never make a click unattributable.

### 1.3 The id sweep (needs your confirmation before I ship it)

`src/components/TravelpayoutsCustomWidget.tsx:29`, `TiqetsEmbedWidget.tsx:74` + `:235`,
`WelcomePickupsEmbed.tsx:16,19`, `AffiliatePartners.tsx:47`, `PrivacyPolicyPage.tsx:641` all still
carry `trs=540277` — the **deleted** project. One PR, `540277 → 589561`, then one click per family
in statistics with a distinct `sub_id`.

### 1.4 Do / don't

| Do | Don't |
| --- | --- |
| Keep Drive consent-gated (UK GDPR + your own privacy policy lists it as a marketing processor) | Load it before consent "just for verification" permanently |
| Run **one** Drive tag (the new project) | Run old + new together — two Drive instances rewrite the same links and inflate page weight |
| Re-check `verify:build` after touching the loader | Delete the `emrld.ltd` line from `docs/growth/README.md` hard rules 2 — the script is a business decision |
| Watch *Reports → Content analytics* after ~7 days | Judge Drive in 24 h: link rewriting needs crawl + recrawl to show up |

---

## Part 2 — Getting approved for more Travelpayouts programs

**The honest constraint:** most brands approve on *traffic + content quality + topical fit*, not on
how many pages exist. You have 254 URLs and 50 articles — enough for the *travel* brands, not yet
enough for the *finance* ones. So sequence by what the corpus already proves.

### 2.1 Priority ladder

| Tier | Programs | What gets you approved | Where on the site it should point |
| --- | --- | --- | --- |
| **Tier 1 — already plausible today** | Tiqets, Klook, KKday, Welcome Pickups, Kiwitaxi, GetTransfer, Airalo, AirHelp, Hotellook/Aviasales | You already run them; the job is re-attaching them to project 589561 + one landing page each | `/umrah`, `/flights`, `/hotels`, `/experiences`, `/pre-departure` |
| **Tier 2 — apply now, expect a review** | Booking.com, Discover Cars, Omio, 12Go, GetYourGuide | A visible **hotel/flight depth** page set + a real About/Contact + affiliate disclosure on-page | `/hotels`, `/hotels/:city`, `/flights/:route` |
| **Tier 3 — first build authority, then apply** | Travel insurance (VisitorsCoverage / Insubuy / EKTA), Compensair, Saily, eSIM/finance-adjacent brands | A UK/BD-facing **money page** and `/how-we-make-money/`; some insurers want 6–12 months of history | a new `/travel-insurance` + `/banking` cluster |

### 2.2 What every application needs (checklist)

- [ ] Live, crawlable site on the canonical domain (✅)
- [ ] Privacy policy naming affiliate cookies (✅), **Terms** page (❌ — add)
- [ ] **Visible** affiliate disclosure near the first affiliate module and in the footer (❌ — add; also a UK legal duty)
- [ ] `/how-we-make-money/` (❌ — highest E-E-A-T value page you can write this quarter)
- [ ] A Contact page with a real, working address (✅ `support@uraltravel.co.uk`)
- [ ] At least one **dedicated** page per brand you apply to (not a widget buried in a 4,000-word guide)
- [ ] Traffic evidence: GSC clicks/impressions screenshot for the last 28 days (after Day 21)

### 2.3 The pages to build *for* the applications (order matters)

1. `/how-we-make-money/` — disclosure, partner list, editorial independence. Protects every other page.
2. `/travel-insurance/` — UK + BD framing, one comparison table, no invented prices.
3. `/esim/` — Airalo/Saily, per-destination, tied to existing `/pre-departure`.
4. `/airport-transfers/` — Welcome Pickups / Kiwitaxi / GetTransfer hub, per-city.
5. `/hotels/:city` depth pass — Booking.com reviewers open these first.

One PR each, none of them inside the canonical freeze.

---

## Part 3 — The Travelpayouts referral program (realistic version)

### 3.1 The terms as they stand

Milestone-based since April 2025 — **not** the old 7 %-for-two-years model:

| Your reward | When |
| --- | --- |
| **$100** | Your referral earns their first **$500** and receives a payout |
| **$200** | They reach **$1,500** and get paid |
| **$300** | They reach **$3,000** and get paid |
| **max $600 per referral**, no cap on how many | paid by Travelpayouts from its own funds |

Your referral gets up to **$100** ($25 for signing up *and installing Drive*, $25 at $100 earned,
$50 at $1,000). **Self-referral is prohibited** and gets you removed without payment.

**The uncomfortable math:** $0 arrives until a referral earns $500. This is not a volume play, it is
a *quality* play aimed at people who already publish travel content.

### 3.2 Who to target (highest hit-rate first)

| Segment | Where they are | Why they convert |
| --- | --- | --- |
| Bangladeshi travel bloggers / Facebook page admins | FB travel groups, existing `/travel-creator-resources` readers | They already write; they have zero monetisation |
| Small Dhaka travel agencies with a website | Google Maps + FB | They have inventory but no affiliate stack |
| Student/expat bloggers (UK diaspora) | Reddit `r/bangladesh`, university groups | They rank for the UK-diaspora queries you want |
| Existing Travelpayouts publishers with a weak site | TP community, Telegram groups | Already convinced of the model |

### 3.3 The content that does the selling (on your own site, not spam)

Ship **one** page and **one** article, then let them work:

1. **`/travel-creator-resources`** *(slug already exists — upgrade it into a proper hub)*:
   what a Bangladeshi travel creator can earn, how to get paid (Payoneer/bKash reality), and a
   clearly-labelled referral CTA.
2. **`/blog/how-bangladeshi-travel-bloggers-earn-affiliate-income`**: honest walkthrough — traffic
   needed, realistic first-12-month numbers, the Drive step, the payout threshold problem.

Rules that keep this clean: label the link as a referral link every time it appears, never claim
guaranteed income, never bulk-DM, never post it in a subreddit that forbids promotion.

### 3.4 Execution kit — turning the plan into 30 days of work

**Day 1–2 — make the link worth clicking.** Before you invite anyone, the person landing on
`uraltravel.co.uk` has to see a site that looks alive: today's hero fix matters here (an invited
publisher will open `/umrah` first, because that is the page you will link them).

**Day 3 — build the referral asset (2 pages, one PR):**

1. Upgrade `/travel-creator-resources` into the hub: what the platform is, what a Bangladeshi
   creator realistically earns, how payouts work, and a clearly-labelled referral link.
2. New article: *How Bangladeshi travel bloggers actually earn affiliate income (2026)* — traffic
   thresholds, the Drive step, the payout minimum, honest numbers. This is the page you send people
   instead of pitching them in DMs.

**Day 4–30 — 10 conversations, not 1,000 impressions.** Work the list in §3.2 in this order and
keep a simple log (name, channel, date, status):

| Step | What you actually send |
| --- | --- |
| Touch 1 | A specific, useful observation about *their* content ("your Sylhet piece ranks for X but has no booking path") — no link. |
| Touch 2 (after a reply) | The creator-hub link, one sentence on the $100 signup bonus and the $600 milestone, and an offer to review their page. |
| Touch 3 (only after signup) | Walk them through Drive installation. **This is the step that pays you $100 later**, because their first milestone requires Drive. |

**Hard rules for the referral channel:**

- Label the link every time it appears: *"this is my referral link — you get the bonus, I get one too."*
- Never promise income. Never quote the $600 as expected — it requires them to earn $3,000.
- No self-referral, no second account, no paid traffic to the referral link (Travelpayouts bans it).
- No bulk DMs, no posting the link in Facebook groups that forbid promotion, no Reddit posts that
  are only a referral link.
- One referral that reaches $500 is worth more than 50 signups that never publish — so **support the
  ones who install Drive**.

**Tracking:** Travelpayouts → *Referral program* tab shows referral progress anonymously. Add your
own log in `docs/growth/referral-log.md` (name-free: channel, date, status) so the channel is
auditable without holding personal data.

**When to stop:** if 10 real conversations produce 0 signups, the offer is wrong, not the volume.
Rewrite the hub page before sending an 11th message.

### 3.5 What was fixed in code on 2026-10-24

| Problem | Fix |
| --- | --- |
| Referral clicks were counted as `affiliate_partner_click` | New `travelpayouts_referral_click` event with `referral_sub_id`; detected by host (`travelpayouts.com` + `?marker=`), checked *before* the affiliate branch because referral links are also `rel="sponsored"` |
| One click produced two events with three different label keys (`link_label`, `link_text`, `partner_label`) | `PartnerLinkButton`'s duplicate push removed; `link_label` is the single key for every outbound event |
| All four placements shared one untagged URL | `buildTravelpayoutsReferralUrl(slug)` appends `&sub_id=` (`creator_hub`, `post_bangkok_food`), used by both the React callout and `scripts/prerender.ts` |
| A creator pitch sat inside two city guides | Removed from `havana-cuba-travel-guide-bangladesh` and `chefchaouen-morocco-travel-guide-bangladesh`; their SubIDs stay reserved so history is never reused |

Where it stands: **2 live placements** (`/blog/travel-creator-resources` and
`/blog/halal-food-guide-bangkok-bangladesh`, EN + BN each). Coverage is deliberately narrow — a
"start your own travel blog" block only belongs on pages a publisher would plausibly read. Grow it
by writing creator-facing content, not by pasting the block into trip guides.

Reading the numbers afterwards: Travelpayouts → *Reports → Referrals* shows the SubID a signup
arrived with. In GA4, `travelpayouts_referral_click` is the **intent** signal and the Referrals
report is the **outcome** — a high click count with no signups means the copy oversells the bonus.

### 3.6 Cadence and expectations

10 personal conversations/month beats 1,000 impressions. Realistic first-year outcome with this
audience: **3–6 active referrals**, of which maybe one or two ever reach $500 → **$100–$400**.
Treat referrals as a *relationship* channel, not a revenue line.

---

## Part 4 — Syndication to Medium, Substack and Reddit

### 4.1 The canonical reality (checked 2026-10)

| Platform | Can you set a canonical to your site? | Verdict |
| --- | --- | --- |
| **Medium** | **Yes** — `Import story` sets a canonical to the original automatically; pasting text manually into the editor **loses it**; you can also set it by hand under *More settings → Advanced → "This story was originally published elsewhere"*. | Safe to republish **after** the original is indexed. Always use *Import story*. |
| **Substack** | **No** — publisher-set canonicals are not supported; Substack posts self-canonicalise. | **Do not republish full articles.** Use it as a newsletter/excerpt surface that links home. |
| **Reddit** | N/A — a self-post is not your page. | Never republish. Answer the question in the thread; link only where it genuinely helps (and the sub allows it). |

### 4.2 The one-article → four-surface workflow

1. **Day 0 — site.** Publish on `uraltravel.co.uk` (EN, plus the `/bn/` twin where the cluster has one).
2. **Day 0** — submit URL in GSC *URL Inspection → Request indexing*; confirm it appears in `sitemap.xml`.
3. **Day 2–5 — wait for indexing.** Check `site:` / URL Inspection. *Then*:
4. **Medium** → `Import story` with the site URL → confirm the canonical resolves to your page, not
   to a redirect or the homepage → add a 2-line "who we are" footer with a `/umrah` or `/flights` link.
5. **Substack** → a **different object**: 250–400 word edit of the piece ("what changed for travellers
   this month"), ending in *Read the full guide →* link. Never the same body text.
6. **Reddit** → native text post only where the topic is on-topic and self-promo is allowed; answer
   three other threads before you post your own; keep the link in a comment, not the title.

### 4.3 Per-platform playbook

**Medium**

- Import, don't paste. Tags: `Travel`, `Bangladesh`, `Umrah`, `Budget Travel`, `Visas`.
- One CTA per article, to the *matching* cluster page (Umrah article → `/umrah`, visa article → `/visa`).
- Medium's audience pays attention to personal narrative; the Dhaka-corridor story is the hook.
- Never put Travelpayouts links in the Medium body — let Drive/marker live on your own pages.

**Substack**

- Position it as a monthly dispatch: "3 fare/visa changes for Bangladeshi travellers this month".
- Free tier only until ~100 subscribers; the value is the *email list*, not the archive.
- Every issue links the canonical article. This is the one surface where being a satellite is the point.

**Reddit** (highest risk, highest short-term value)

| Sub | Use it for | Watch out |
| --- | --- | --- |
| `r/bangladesh` | passport, visa, RFCD/dual-currency, Umrah cost questions | strict on self-promo; build karma first |
| `r/Umrah`, `r/Hajj`, `r/islam` | Nusuk, miqat, hotel zones, cost breakdowns | answer-only; links rarely welcome |
| `r/travel`, `r/solotravel` | destination itineraries | bans links; text answers only |
| `r/visas`, `r/immigration` | document checklists | jurisdiction accuracy matters more than traffic |
| `r/SEO`, `r/juststart`, `r/blogging` | the referral story, later | read each sub's promo rules — some ban it outright |

**Non-negotiable:** Reddit removes domains site-wide for repeated low-value self-promotion, and a
removed domain is invisible to a huge slice of your future readers. Rule of thumb — **10 genuinely
helpful comments per 1 post that links**, and never the same URL twice in a week.

### 4.4 Tagging so the plan is measurable

Never post an untagged link. Use GA4 `utm_source` + Travelpayouts `sub_id` together:

| Surface | `utm_source` / `utm_medium` | `sub_id` |
| --- | --- | --- |
| Medium | `medium` / `referral` | `med_<cluster>` (e.g. `med_umrah`) |
| Substack | `substack` / `newsletter` | `sub_<cluster>` |
| Reddit | `reddit` / `social` | `red_<subreddit>` |
| Referral link itself | `referral` / `affiliate` | `ref_<initials>` |

Then, after ~4 weeks, read GA4 `affiliate_partner_click` by `sub_id` and cut the surface that
produces traffic but no affiliate clicks.

### 4.5 The guardrails (what not to do)

- ❌ Republish the same body text on Substack — no canonical exists, and you are the one who loses.
- ❌ Put affiliate links in Reddit posts or comments — instant ban risk for the domain.
- ❌ Import to Medium *before* the original is indexed — you are asking Google to choose the wrong copy.
- ❌ Syphon the strongest article to a satellite. The `/visa-free-countries` link magnet and the Umrah
  cluster stay exclusive to the site.
- ❌ Cross-post inside the watch window if the source page's **title/canonical** is being changed —
  the satellites will point at a stale URL.

---

## Part 5 — 90-day calendar (starts after the Day-21 watch unless marked *now*)

| Week | Site | Monetisation | Syndication |
| --- | --- | --- | --- |
| **0 (now)** | `/umrah` hero CSS + disclosure (see audit F4) | **Drive unlock + programs re-attached + `trs` sweep** | set up Medium/Substack accounts, write bios, no posts yet |
| 1 | GA4 custom definitions, key events | `sub_id` test on 1 link per family | Reddit: answer-only, 3 threads/sub |
| 2 | `/how-we-make-money/` | Tier-1 applications re-submitted | first Medium import (Umrah cost piece) |
| 3 | `/travel-insurance/` | referral page upgrade (`/travel-creator-resources`) | first Substack issue |
| 4 | DMARC tighten; P4 batch | Tier-2 applications (Booking.com, Discover Cars) | Medium #2 + first Reddit post *if* karma allows |
| 5–8 | P6 UK test cluster (5–10 URLs) | Drive content-analytics read-out; kill dead widgets | 1 Medium import + 1 Substack issue per week |
| 9–12 | P6b hero batches 1–2 | Tier-3 applications; referral conversations (10/month) | measure by `sub_id`; cut the worst surface |

---

## Part 6 — What "working" looks like (and when to stop)

| Metric | Baseline | 30 days | 90 days |
| --- | --- | --- | --- |
| Drive loaded on consenting sessions | untracked | visible in network log (QA) | content-analytics report has data |
| Affiliate clicks with a `sub_id` | 0 | 4 families tested | every new link tagged |
| Approved TP programs | pre-migration set | all re-attached to 589561 | +3 Tier-2 |
| Medium/Substack → site sessions | 0 | first sessions | 50–150/mo combined |
| Referral signups | 0 | 3 conversations logged | 1–2 activated publishers |

**Stop rules.** Any surface that sends ≥30 sessions/30 days and produces **zero**
`affiliate_partner_click` after two months gets cut, not optimised. Any Reddit post that draws a
moderator warning means that subreddit is closed permanently — do not re-test it.
