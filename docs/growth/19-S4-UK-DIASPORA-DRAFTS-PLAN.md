# S4 — UK/Diaspora Audience-Test Cluster: Draft Plan (briefs first, scheduling gated)

**Opened:** 25 October 2026 (follows the owner's decision recorded this day; supersedes nothing —
works alongside the Growing-Cluster facets defined in [`12`](12-POST-MIGRATION-ROADMAP.md) §P6 and
held by [`15`](15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md) §4 as item S4).
**Status framing:** this is a work order for drafted articles. The six briefs below are ready for
researching and drafting at any time, in offline repository terms. **Scheduling any of them is
gated** by the S4 trigger: ≥ 100 sessions/month arriving from non-Google sources, or GSC showing UK
impressions — whichever fires first (S2 disclosure page ships before or together with the first
UK-audience month, per `15` §4).

Why this cluster (from `12` §P6): residents of Bangladesh convert weakly (bKash/Nagad vs card
checkout); UK-based Bangladeshis carry cards, spend in GBP, and search the Dhaka-corridor, Umrah and
visa topics this corpus already owns. The arbitrage is authority-overlap, not a new niche.

---

## Cluster rules (inherited, do not rederive)

1. **6 URLs, existing IA, no template change** — every piece is a `/blog/<slug>` editorial post; the
   six country/city tool pages stay untouched. This keeps S4 inside "test cluster" size and under
   the freeze's "no new routes/template work" boundary until it re-opens properly.
2. **Bengali parity is mandatory for every scheduled post** (`10-CONTENT-UPGRADE-STANDARD.md`).
   Audience reality: diaspora readers read both; BN twins also feed `/bn/*` crawling.
3. **Hreflang stays `en-bd` / `bn-bd`.** No invented `en-gb` variant (`12` §P6 step 4 — a one-way
   hreflang fork is worse than none).
4. **GBP economics:** where an embed supports it, UK-framed pages pass `currency=GBP&locale=en-gb`
   (`TiqetsEmbedWidget` supports USD/EUR/GBP and otherwise falls back to USD). Never touch
   `marker=675992` / `trs=589561` while doing it.
5. **Six gates per post at scheduling time** (`10`): ≥3 primary references, ≥4 internal links
   (≥2 blog→blog + ≥1 hub/money), one relevant affiliate CTA, BN parity, build proof. The briefs
   below pre-map these so drafting can't start in a hole.

---

## Brief 1 — Umrah from London & Manchester (flights, dates, budget)

- **Reader task:** a UK-resident Muslim arranging the whole Umrah trip from LHR/MAN—UMM (Jeddah/
  Madinah): UK exit checks, Saudi eVisa (GBP-issued ticket proof), direct vs one-stop fares in GBP,
  Haram walkable-hotel zones, and what changes vs the classic Dhaka flow (`/umrah`).
- **Internal links (pre-mapped):** → `/umrah` (hub, money), → `/blog/<open-jaw post>` (Biman-Saudia
  open-jaw), → `/blog/dhaka-airport-outbound-immigration-checklist-noc-go`, → the GBP budget post
  (brief 4). Bengali twin links mirror the same set.
- **Affiliate CTA:** Aviasales global (UK↔SAUDI markets) + Kiwitaxi Jeddah pickup; keep WhatsApp
  BDT-Desk framing off this page except a one-line "if your family books from Dhaka" bridging link.
- **References to collect (primary):** UK Foreign Travel Advice (Saudi Arabia), Saudi MoFA/eVisa
  portal, airline schedules for LHR/MAN↔JED/MED, visitsaudi.com Haramain page.
- **Open question for research:** whether the 96-hour stopover eVisa (`/stopover` corpus) applies to
  UK-passport holders equally — verify before writing, never from memory.

## Brief 2 — UK → Dhaka flights & diaspora-return fare sanity (GBP framing)

- **Reader task:** diaspora flying to Bangladesh (and booking for relatives from abroad): fare
  reality by season, multi-city vs roundtrip, baggage-Zamzam policies, and booking-related scam
  avoidance (London agents vs direct).
- **Internal links:** → `/flights` hub-index (money), → the `/blog/cheap-flight-booking-hacks-dhaka`
  post **only after that post's 754-word upgrade lands** (S5/P7 pairing — otherwise skip), → brief 3
  (visa logistics), → brief 5 (GBP budget).
- **Affiliate CTA:** Aviasales multi-city + Klook Gatwick/Heathrow-arrival services; no BDT-desk CTA.
- **References:** seasonal fare evidence from live affiliate-search result pages (dated screenshots/
  values only, with a "checked <date>" stamp), airline baggage pages.

## Brief 3 — UK visa logistics for Bangladeshi passport holders (+ BRP decisions)

- **Reader task:** the reverse direction nobody has covered: BIC holders' Schengen/UK-side
  paperwork, Bangladesh eVisa from a UK address, BRWC / dual-logistics paperwork, proof-of-funds
  currency conversion questions.
- **Fills the audit's named demand gap:** "no UK/US process guide" (audit `18` §2.4 — visa cluster
  is partial; this is the largest missing high-value intent).
- **Internal links:** → the 6 country visa pages (`/visa/...` hub cluster), → `/blog/...` Dhaka
  airport NOC/GO checklist, → brief 2, → `/visa-free-countries` (money).
- **Affiliate CTA:** AirHelp (flights disruption in EU/UK routes) — verified relevance; nothing
  cosmetic.
- **References (primary; slowest to verify):** UK Home Office guidance where applicable,
  Bangladesh missions in London (visa application terms), IATA/airport cards rule pages. This brief
  has the longest evidence chain and should go LAST in drafting order if the trigger fires early.

## Brief 4 — GBP budget templates: Umrah in GBP & the 2-city trip

- **Reader task:** translate the existing BDT budget framework into GBP planning: direct vs
  transit economics from LHR/MAN, hotel tiers in GBP, Ramadan price shock (booked-out earlier than
  Dhaka buyers realize), and where a UK card is actually cheaper (Islamic-card travel, `updatedAt`
  of the `/banking` mindset applied outbound).
- **Internal links:** → `/umrah` (hub), → `/banking` node on no-card booking (bridge), → brief 1,
  → brief 5; BN twin carries the same anchors localized.
- **Affiliate CTA:** the Umrah-downstream stack only where verifiable (Kiwitaxi Jeddah/Madinah,
  Airalo UK-Saudi data) — one CTA per the six-gate rule, not a wall of links.
- **References:** hotel price counters dated at check-in time, GBP/BDT rate note with its date, the
  same BDT-calculator DOI preserved by mirroring the numbers.

## Brief 5 — Halal city guide: London (diaspora reader visiting from both sides)

- **Reader task:** half diaspora-in-London (eateries, mosque events), half Dhaka-Bangladeshi
  planning a UK visit (tourist-visa reality, GBP money questions, transit flights).
- **Internal links:** → `/visa-free-countries` (money — UK is not visa-free so the framing is
  comparison, not false promise), → brief 4 (GBP budget), → brief 3 (visa logistics), →
  `/attractions` UK pages (Tiqets London ensemble) for passes at GBP.
- **Affiliate CTA:** Tiqets London passes — `currency=GBP&locale=en-gb` explicitly (briefing rule 4).
- **References:** mosque/event official pages, TfL pricing pages, Tiqets product pages (as authority,
  dated), not blogs.

## Brief 6 — Reserve slot (pick by data, not by mood)

Sixth slot open. Candidates from the audit's demand-gap discussion, in preference order pending
GSC/GA4 data at trigger time: **UK-impressions-led Umrah checklist variant**, a
**Manchester-Birmingham specific** split of brief 1 if queries demand it, or the
**"how Bangladeshi bloggers earn"** piece from S6 if the referral programme opens first. Do not
schedule this slot until it has a named reader task.

---

## Operating order once the trigger fires (the mentor sequence)

1. **Before any social post:** run the GA4 runbook (`17` — the open S1 task: dimensions + key
   events). No attribution, no decision data, no point in scheduling.
2. Ship the social cadence per the locked plan (`16`); satellite content is not frozen work.
3. Watch two signals weekly (both per `15` §6): GA4 `affiliate_partner_click` by `sub_id` ≥ first
   non-zero earnings → S6 (conversion depth), and GSC UK impressions/queries → S4 trigger.
4. On the S4 trigger: schedule the six briefs one at a time, in brief-number order, each through
   the six-gate checklist with `npm run build` + `verify:build` proof. `brief 3` goes last unless
   its sources land early (longest primary-evidence chain).
5. After ~4 weeks of live data, decide (per `12` §P6 step 2) whether the section graduates to a
   route/hub — that is a new, separately-triggered decision, not part of these briefs.
6. If no trigger fires by the Day-22 review (`16` §13): these drafts stay staged; extend the social
   window instead of forcing the cluster live. Do not unfreeze on boredom.
