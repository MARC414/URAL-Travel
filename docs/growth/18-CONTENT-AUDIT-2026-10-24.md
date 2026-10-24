# Content & Cluster Audit — 24 October 2026

**Subject:** what actually exists on `uraltravel.co.uk`, which clusters are finished, what is drafted
or scheduled, what has rotted, and which direction social should take next.
**Method:** full repository + built-artifact inspection on 2026-10-24 — `npm ci` → `npm run lint` →
`npm run build` → `npm run verify:build` (**352/352 checks pass**), then measurement of `dist/`
(260 HTML routes, 51 blog posts × 2 locales) rather than trusting the planning docs.
**Not verifiable here:** the live site (no egress from this sandbox), GSC, GA4/GTM, Cloudflare,
Resend, Travelpayouts dashboard. Anything console-side is marked *console* and is your call, not mine.

> **Read this with** `15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md` (the queue of record) and
> `10-CONTENT-UPGRADE-STANDARD.md` (what "done" means per page). This document does not unfreeze
> anything; it tells you what the freeze is sitting on top of.

---

## 0. Headline

| Question | Answer |
| --- | --- |
| Is the site technically healthy? | **Yes.** Clean type-check, clean prerender, 352 guards, 260 routes, deterministic feeds. |
| Which cluster is genuinely complete? | **Hajj & Umrah** (12/12 core pairs revised + hub + adjacent Hajj + 2 bridges) and **Banking & Forex** (hub + 5 nodes, build-enforced). |
| Which clusters are partial? | Visa (7 posts, 6 country pages, no Schengen/India process guide), Flights (9 routes but the weakest prose), Destinations (broad, uneven, 4 new city guides with no supporting surfaces). |
| Which cluster is rotting? | **Deals** — one post built on a KKday sale that launched 10 October and whose promo codes are quota-limited/expired, plus an expired-code CTA embedded in a second post. |
| What is drafted? | **Zero drafts.** Three `scheduled` files in `content/blog/`, two of them **8 days overdue**. |
| What is scheduled into the future? | **Nothing.** The forward calendar is empty from 25 October onward. |
| Biggest single operational risk? | The daily publish workflow only fires when `publishDate === today` in Dhaka, so a missed date never self-heals — the two 16 October articles are the proof. |
| Best social direction? | **One wedge: document-first Umrah from Bangladesh.** Two surfaces: **Facebook (groups + Reels)** and **YouTube Shorts** — not Medium/Reddit first. Detail in §6. |

---

## 1. What is actually on the site

**260 canonical URLs = 130 English + 130 Bengali.** Every English route has a Bengali twin.

| Surface | EN routes | Notes |
| --- | ---: | --- |
| Blog posts | **51** | 48 long-standing + 3 newly publishable (see §3) |
| Destination guides | 10 | Nepal, Thailand, Malaysia, Dubai, Singapore, Maldives + **London, Italy, Paris, New York** (added 18 Oct) |
| Attraction pages (Tiqets) | 18 | London ×4, Paris ×3, New York ×3, Rome ×2, Milan ×2, Amsterdam, Florence, Lisbon, Venice |
| Flight routes | 9 | DAC–BKK/KUL/DXB/KTM/SIN/MLE/MED/LAX + KTM–DAC |
| Hotel pages | 6 | BKK, DXB, KTM, KUL, MLE, SIN |
| Visa pages | 6 | Nepal, Thailand, Malaysia, Dubai, Singapore, Maldives |
| Cost pages | 6 | same six pillars |
| Tools | 6 | budget calculator, currency converter, visa checker, packing, airport codes, flight-delay claim |
| Hubs | 5 | `/umrah`, `/banking`, `/experiences`, `/pre-departure`, `/kkday-hotels`, plus `/visa-free-countries` |
| Static | 4 | about, contact, privacy, sitemap |

The six original pillars each have **four structured surfaces** (guide + visa + flight route + cost);
the four new Western city guides have **one** (guide) plus attractions. That asymmetry is intentional
for now, but it means London/Paris/Italy/New York are thin satellites, not pillars.

---

## 2. Cluster-by-cluster verdict

Legend: **✅ complete** · **🟢 complete, unapproved** · **🟠 partial** · **🔴 rotting** · **🆕 new**

### 2.1 Hajj & Umrah — ✅ the real asset

| Item | State |
| --- | --- |
| Core article pairs | **12/12** independently source-revised and regression-tested (19 Oct) |
| Supporting | `/umrah` hub with quote-based calculator, adjacent Hajj registration article, 2027 checklist PDF in `public/downloads/` |
| Volume/quality | 12k–16k characters per post, **5–26 primary references**, date-stamped claims, FAQ/HowTo schema, visible BN twins |
| Open | Owner publication approval; qualified religious review on fiqh claims (women's mahram, ihram/miqat); 1448 travel-health requirements; the Hajj 2027 deadline conflict; no visual sign-off |

This is the only cluster in the corpus where **every** page meets the upgrade standard. It is also the
only cluster whose content a competitor cannot copy without doing the same primary-source work.

### 2.2 Banking & Forex — ✅ the moat

`/banking` hub + 5 nodes (dual-currency endorsement, RFCD vs travel quota, Islamic cards, no-card
booking, cash vs card/DCC). All five carry `updatedAt 2026-10-19`, 3–5 primary sources each, and the
build **fails** if the hub loses a node, a node loses the hub, or the malformed citation `FE/PD-1`
reappears. Nobody in Bangladesh covers FEPD circulars at this depth. Smaller audience than Umrah, but
higher intent and zero real competition.

### 2.3 Ziyarah & Stopovers — 🟢 complete, half-reviewed

5 posts (Ziyarah/Badr/Taif, Umrah+Dubai combo, Abu Dhabi mosque, Malaysia heritage, Europe/US passes).
Only the Ziyarah guide went through the October revision (15 sources). The other four are older-standard:
no references, 3.8k–4.4k characters, and the Europe/US passes post is the weakest-linked page on the
site (3 internal links). Fine as bridges; **do not promote them as cluster pages.**

### 2.4 Visa & Immigration — 🟠 partial

7 blog posts + 6 country visa pages covering Nepal, Thailand, Malaysia, UAE, Singapore, Maldives.
Genuinely useful and search-aligned (Thailand e-visa, Malaysia MDAC, e-passport, NOC/GO checklist).
But: **no Schengen process guide, no UK/US process guide, no India visa guide** — three of the
highest-value intents for a Bangladeshi passport holder are absent, and 2 of the 7 posts have no
sources at all. This is the largest *demand* gap in the corpus.

### 2.5 Flights / airlines — 🟠 partial and the thinnest prose

9 route pages + 6 posts. The route pages are structured and fine. The editorial is weak:
`cheap-flight-booking-hacks-dhaka` is **754 visible words** (the shortest page on the site) and still
carries 2026-era specifics ("BDT 33,000 roundtrip", "up to 30% cheaper") with **no source**. Two other
posts in this cluster have no references. This is the cluster most exposed to a "helpful content"
judgement.

### 2.6 Destinations & family budget — 🟠 broad, uneven

10 guides + 6 cost pages + 10 posts. Good: Singapore 4-day, Sri Lanka+Maldives combo, Bumrungrad
medical, eSIM/insurance. Weak: **Havana and Chefchaouen** — flagged in the strategy doc as
off-strategy aspirational content for the BD outbound mass market, and still live, still unsourced.
The four new UK/EU/US city guides (18 Oct) are guide-only and attractions-only; the audience they
target (British-Bangladeshi diaspora) has **no visa, flight or cost surface** to land on.

### 2.7 Deals — 🔴 rotting

One post: *KKday 10.10 Winter Sale* with promo codes `1010TOURS` / `1010MOVE` / `1010TIX`. It was
published **9 October — the day before the sale it describes even opened** — and it states no end
date, only "before quotas run out". A second post (Malaysia heritage) carries a CTA for the same
codes. This is the only category on the site whose **core value decays by design and by an unstated
date**. Either convert it to an evergreen "how to work KKday sales" page or retire it.

### 2.8 Bangladesh domestic (Cox's Bazar) — 🆕 just started

Two new bilingual articles (see §3): a **25.6k-character Cox's Bazar pillar with 16 references** and a
13.7k-character Kathmandu–CXB route/visa piece with 9. This is the highest-quality *new* content since
the Umrah wave — and it is timed for the November–March Cox's Bazar season. It has no hub, no siblings,
and is not yet in the committed sitemap.

---

## 3. The publishing pipeline — the finding that matters most this week

`content/blog/` holds exactly three files, all `status: scheduled`, all **already due**:

| File | publishDate | Status at 24 Oct | Bengali body | Refs |
| --- | --- | --- | ---: | ---: |
| `coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh.md` | **2026-10-16** | **8 days overdue** | 17.4k chars | 16 |
| `kathmandu-to-coxs-bazar-flights-route-status-booking.md` | **2026-10-16** | **8 days overdue** | 7.5k chars | 9 |
| `can-you-make-money-travel-affiliate-marketing-ural-experiment.md` | **2026-10-24** | due 09:00 Dhaka today | 9.5k chars | 8 |

- **Drafts: zero.** There is no `status: draft` article anywhere in the publication queue.
- **Future scheduled: zero.** After today the calendar is empty — no article is queued for 25 October
  or beyond.
- **The build is correct; the trigger is not.** A build today produces **260 routes / 51 posts / 51 RSS
  items** and the new URLs appear in `dist/sitemap.xml`. But
  `.github/workflows/scheduled-publish.yml` only calls the deploy hook when a post's date **equals**
  today in Dhaka. A post whose date passes before its file reaches `main` is silently stranded until
  someone runs *Run workflow → include_overdue* or pushes any other change.
- **Consequence:** the two 16 October articles were never deployed by schedule. Whether they are live
  right now is a *console* question — check the two URLs in GSC/incognito before doing anything else.
- **Artifact drift:** the committed `public/sitemap.xml` still says 254 URLs / 48 posts; the built
  `dist/sitemap.xml` says 260 / 51. The deployed file is the fresh one, but any human or tool reading
  the repo file sees stale numbers (same failure family as `01-indexing-crawling.md` still claiming 171).

**Fix (small, testable):** make the daily job publish **everything dated ≤ today that is not yet in the
deployed sitemap** — i.e. default the check to overdue-inclusive rather than date-equal — and have
`test:scheduling` cover the "missed date" case. Until that lands, the queue has no self-healing.

---

## 4. What needs upgrading — prioritised

### P0 — this week (hours, not days)

| # | Item | Why now | Effort |
| --- | --- | --- | --- |
| 1 | **Verify the two 16 Oct URLs are live**; if not, deploy with `include_overdue` | 8 days of a seasonal pillar sitting invisible | 10 min |
| 2 | **Fix the scheduled-publish trigger** to include overdue | Every future miss repeats today's problem | 1 PR |
| 3 | **Schedule at least 2 posts for November** | The pipeline is empty; a blog that stops publishing reads as abandoned to both readers and crawlers | decision |
| 4 | **Kill or re-date the KKday 10.10 promo** (post + the Malaysia CTA) | Expired codes are a trust leak on the one cluster that is otherwise accurate | 30 min |
| 5 | **Affiliate attribution test** (`sub_id` per family) + GA4 key events | Console only. Social spend is unmeasurable until this exists | 15 min |

### P1 — next two weeks

| # | Item | Measured scale |
| --- | --- | --- |
| 6 | **Source the money-path posts.** 25 of 48 published posts have zero references; average among sourced posts is 8.5 | Triage first: visa (Thailand, Malaysia, Singapore), airport NOC/GO, e-passport, airline baggage, cash/DCC |
| 7 | **Rewrite the 5 thinnest pages** (754–966 words): cheap flights, hotel savings, Maldives, Singapore visa, Nepal vs Thailand | These are the five most likely to be classed as thin |
| 8 | **Retire or merge Havana + Chefchaouen** (off-strategy, unsourced) | Redirect to `/destinations` rather than delete |
| 9 | **Give the 4 new city guides a reason to exist** — visa + flight + cost surfaces, or a diaspora-specific angle | Otherwise they are 8 orphan pages |
| 10 | **`/how-we-make-money` + `/terms`** | The footer disclosure exists; the dedicated page does not, and Tier-2 programs and UK ASA/CMA both want it |
| 11 | **Forms still deliver to a personal Gmail** (`functions/api/contact.js:7`, `subscribe.js:7`) with `Access-Control-Allow-Origin: *` | Real inbox SPOF + wildcard CORS on a public endpoint |

### P2 — only when a §6 trigger in `15` fires

CORS/WAF hardening, `Organization` JSON-LD locality, trailing-slash normalisation, hero batches, CWV,
UK/diaspora test cluster, `/travel-insurance`, `/esim`, `/airport-transfers`, `/hotels/:city` depth.

### Document drift worth correcting (it will mislead the next worker)

- `13` §Phase P2 says the personal-Gmail references are gone — the **schema** is clean, but both API
  functions still *send* to `marcwriter2025@gmail.com`.
- `13`/`15` say there is "no visible affiliate disclosure anywhere except the Privacy Policy" — there is
  a footer disclosure in `src/App.tsx` (~line 5349) in both locales. What is missing is the dedicated page.
- `01-indexing-crawling.md` says 171 URLs; `CONTENT-STRATEGY-2026.md` says 47 posts. Actual: **260 URLs,
  51 posts.**
- `CONTENT-QUEUE.md` records 203 → 334 → 345 build checks at various points; today it is **352**.

---

## 5. Quality signals, measured

| Metric | Value |
| --- | --- |
| Posts with ≥1 primary reference | **23 / 48** (8.5 refs average among them) |
| Posts with zero references | **25 / 48** |
| Median visible page text | **~8,700 characters** |
| Pages under 1,000 words | **6** (worst: 754 words) |
| Posts over 12,000 characters | **12 of the 48** — all revised on/after 14 October |
| Bengali twins | **51 / 51** routes exist |
| Bengali body parity | Verified on the 12 Umrah pairs + 5 banking nodes; the older 25 posts' BN text is a translation of the same thin content |
| Duplicate `<title>` across 264 HTML files | **0** |
| Missing meta description / canonical | Only the 404 and the two verification files (correct) |
| Over-length titles (>70 chars) | 2 destination guides (Nepal 71, London 73) — cosmetic |

The dividing line is sharp and dateable: **everything revised on or after 14 October 2026 meets the
standard; almost nothing before it does.** That is a good sign — the process works — but it means the
archive is carrying ~25 pages that would not pass today's gate.

---

## 6. Where social should go — the senior read

> **Dated note (24 October 2026, registered on merge):** the surface ordering below was written at
> 10:31 UTC, before the owner locked [`16-21-DAY-SOCIAL-MEDIA-PLAN.md`](16-21-DAY-SOCIAL-MEDIA-PLAN.md)
> at a later hour the same day, which keeps **all** surfaces with an EN/BN schedule and weekly
> arc. The FB-groups/Shorts wedge below and `17-GA4-MEASUREMENT-RUNBOOK.md` Part B's Reddit/Medium
> pick are both **analysis for the Day-22 review**, not the locked decision. §1–§5 and §7 (the
> measured inventory and verdicts) remain the current record.

### 6.1 The strategic frame

`15-SITE-FREEZE` already says the right thing: **distribution before depth.** I agree with the freeze.
What I would change is the *surface order*.

The published plan (`14`) sequences **Reddit answers → Medium imports → Substack**. That is the correct
order for a site chasing **UK/diaspora** readers, and it is the wrong order for the **Bangladeshi**
audience this corpus is actually written for. In my read of this market (judgement, not measured
data), Bangladeshi travel intent lives overwhelmingly in **Facebook groups and YouTube search**, not
Reddit or Medium. Starting on Medium in week 2 buys you
6–10 views per import in a market you do not yet serve.

So: keep the canonical rules from `14` (the site is the master, satellites never earn the canonical),
but change the first two surfaces.

### 6.2 The wedge — one cluster, not "travel"

You cannot win social with "travel from Bangladesh" — every OTA and every agency page already owns
that. You can win with the thing nobody else has sourced:

> **"Document-first Umrah from Bangladesh."**
> Not spirituality, not packages — *the paperwork, the order, the exact cost lines, what changed this
> month.* Nusuk steps, Saudi Visa Bio, Rawdah permits, ihram/miqat rules, the 1448 dates, Zamzam and
> gold customs, RFCD/dual-currency so the payment actually goes through.

That wedge has three properties social needs: a **named reader** (a 30–55-year-old Bangladeshi
household decision-maker planning Umrah), an **urgent moment** (booking windows, Ramadan 1448 lead
time), and **screenshot value** (checklists and cost lines get forwarded inside groups).

Second wedge, once the first is running: **"how the money actually moves"** — RFCD, the USD 300 limit,
dual-currency endorsement, cash vs card abroad. Smaller audience, but it is a genuine moat and it is
the one topic where a comment from you is worth more than a competitor's whole article.

### 6.3 Two surfaces, chosen for this audience

| Priority | Surface | Why | What to post |
| --- | --- | --- | --- |
| **1** | **Facebook — groups first, page second** | This is where the audience already asks these questions. Umrah/Hajj groups, Bangladeshi travel groups, diaspora groups. Value-first answering builds the same trust Reddit does, in the market you actually serve. | Native text answers (no link in the first reply), 5–7 slide checklists uploaded natively, one link only where it genuinely answers the thread |
| **2** | **YouTube Shorts** | Bangladeshi travellers search YouTube for "উমরাহ কীভাবে করব", "নুসুক অ্যাপ", "ভিসা ডকুমেন্ট". Shorts are the cheapest discovery on the platform and can reuse the same vertical script. | 30–60 s, one claim per video, on-screen Bengali checklist, description links the matching cluster page |
| 3 (later) | Reddit + Medium | Correct for the UK/diaspora pivot in `14`, wrong as a first surface | Import-to-canonical on Medium; answer-only on Reddit |
| — | Substack | Newsletter, excerpt-only. Keep it only if you will send monthly | Monthly "what changed" dispatch |

**The rule that applies to all of them:** every post sends the reader to the *matching cluster page*
(`/umrah`, `/banking`, `/visa`, `/flights`), never the homepage, and every link carries
`utm_source` + `utm_campaign` **and** a Travelpayouts `sub_id` from the table in `14 §4.4`.

### 6.4 The format system — one pillar becomes five assets

You already have 51 posts and 6+ months of sourcing. That is a year of social content that requires no
new research:

| Asset | Derived from | Cadence |
| --- | --- | --- |
| 5–7 slide checklist (carousel) | Any Umrah/visa post's numbered steps | 1/week |
| 30–60 s Reel/Short: "one thing that changed" | The `updatedAt` + source dates in each post | 2/week |
| Group answer (native text, no link) | The FAQ block of any post | 3/week |
| "What changed this month" thread/post | The dated claims ledger (you are the only BD travel site that dates its claims) | 1/month |
| Newsletter excerpt | The month's single best update | 1/month |

**Hook rule:** lead with the consequence, not the topic — "টাকা দিয়ে দিলেও এই কাগজটা ছাড়া ফাইল আটকে যাবে"
beats "Umrah guide". Never invent experience; the corpus's voice (dated, sourced, no superlatives) is
the differentiator — keep it in social too.

### 6.5 The next 60 days, in order

| When | Do |
| --- | --- |
| **Days 1–3** | Verify the two overdue posts are live · fix the publish trigger · run the `sub_id` attribution test · add GA4 key events (console) |
| **Week 1** | Publish 2 posts for November. Join 5–8 FB groups; answer 10 threads, zero links. Record which questions repeat — that is your content calendar |
| **Week 2** | First 3 Reels/Shorts from the Umrah checklist material. First native carousel. Link only where a thread explicitly asks for the guide |
| **Weeks 3–4** | Ride the **Cox's Bazar season**: the new pillar is seasonal content published exactly on time — FB carousels ("Dhaka → CXB, all four options, real fares") and one Short |
| **Weeks 5–6** | **Ramadan 1448 Umrah planning window opens.** This is the money window: push `/umrah` + the DIY guide, with the calculator as the hook |
| **Week 8** | First measurement gate: ≥100 sessions/month from non-Google sources → unfreeze `S4` per `15 §6`. Cut the surface that sends sessions but no affiliate clicks |

### 6.6 What I would *not* do

- **Do not start five surfaces.** Two is already more than a solo operator sustains.
- **Do not syndicate the Umrah cluster to Substack or republish it in full anywhere without a canonical.**
  It is the only defensible asset; give it away and you have given away the moat.
- **Do not put affiliate links in Facebook group comments or Reddit.** Send people to the page and let
  Drive/Travelpayouts attribute there. Domain bans are permanent.
- **Do not judge this on traffic for 30 days.** Judge it on *which page* social readers reach and
  whether they stay past 15 seconds.
- **Do not unfreeze on-site work because a competitor redesigned something.** `15 §6` already lists the
  anti-triggers; they are right.

---

## 7. One-paragraph handoff

> As of 24 October 2026 URAL has **260 routes and 51 bilingual articles**, and **two clusters are
> genuinely finished**: Hajj/Umrah (12/12 revised with primary sources) and Banking/Forex (hub + 5
> guarded nodes). The archive's weak half is everything published before 14 October: **25 posts with no
> references**, five of them under 1,000 words, plus one promo page that has already expired. The
> publishing pipeline is **empty after today** and its daily trigger cannot recover a missed date — two
> 16 October articles are 8 days overdue and may not be live. The next move is not more site work: it is
> **one wedge (document-first Umrah) on two surfaces (Facebook groups + YouTube Shorts)**, measured with
> `utm` + `sub_id`, reviewed at 100 non-Google sessions per month. When that number appears, `15 §6`
> reopens the site queue — starting with the visa cluster, which is the largest genuine demand gap left.
