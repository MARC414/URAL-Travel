# Revised plan — International first, honest tools, and where the site currently misleads

**6 November 2026 · DRAFT PLAN, nothing built.** This replaces
[the earlier plain-language plan](PLAN-plain-language.md) where they disagree. Everything below is in ordinary
language, and every claim about the current site was checked in the code today.

---

## Part 0 — What you asked for, restated

1. **URAL is international now.** Bangladesh is not removed from anything — it is no longer *named* everywhere
   by default. International readers get a first-class experience; Bangladeshi readers keep every advantage they
   have today.
2. **Every tool in the Tools menu must earn its place** with real, working utility — or be deleted.
3. **KKday must go from the menu** if it adds no value. *(Verdict below: it does not — remove it now.)*
4. **The AI limit message must not say "Bangladesh time" as the only reference.**
5. Think hard about **where the site currently implies something false.**

---

## Part 1 — The honest audit: four places the site currently misleads

This is the part worth reading twice. These are not style opinions; each one is a claim in the product that the
product cannot support.

### 1.1 🔴 The "Visa Odds Checker" states things that are not true — and it is in your menu

`src/components/InteractiveTools.tsx:180-199` contains a hardcoded visa table. Verbatim from the code:

| Claim in the live tool | Why it is a problem |
|---|---|
| Malaysian eVisa available with **"100% approval rates when bank statements show BDT 80,000+ per person"** | No one can promise 100% approval. This is the single most dangerous sentence on the site — it invites readers to spend money on flights and hotels on a false assurance. |
| Nepal VOA: **"First entry of the calendar year is completely GRATIS (Free) for SAARC nationals!"** | Needs verification; presented as certainty. |
| **"Visa On Arrival"** for a Bangladeshi passport to Nepal with **"15/30/90 days"** | Presented as fixed fact with no date, no source, no link to the official portal. |
| The tool tests **three nationalities** (Bangladesh, India, Pakistan) and **four destinations** — but it is called "Visa Odds Checker" and lives in the main menu | It is not a checker. It is a 12-cell static table, undated, unsourced, with zero links. |
| A typo in production: **" Embassy Sticker Required"** with a leading space | Cosmetic, but it signals the rest was not reviewed either. |

`AGENTS.md` §2b requires "≥3 primary references" for an article and the content guide bans unpriced/unverified
claims. This tool meets none of that, and it is the one place a reader is told they can definitely enter a
country. **Your instinct to audit the Tools menu is correct, and this is the reason.**

**Recommendation: remove it from the menu today** (a name change is not enough — the claims are wrong). Then
either delete it or rebuild it as an honest, dated, sourced lookup that says "requirements change; confirm at the
official portal" and links to your existing `/visa/*` pages, which already do this properly.

### 1.2 🟠 KKday: the promo expired six days ago, and it still occupies the menu

- `KKDAY_PROMO.expiresAt` = **2026-10-31**. Today is **6 November 2026** — expired.
- The code's own fallback text says it should "Auto-switch to evergreen KKday Asian Tours & Rail Passes after Oct
  31, 2026."
- But the mega-menu still renders a **"Feature Callout Card"** in the experiences menu (`src/App.tsx:~2820`). The
  promo *code* correctly disappears (behind `isPromoActive`), yet the card itself stays, taking prime menu space
  for a partner whose promotion is over.
- Meanwhile the real alternative **Klook is already the featured partner** in that same menu column ("Asia &
  Dubai Passes (Klook)"), with a live boosted commission through 31 December 2026.

**So the menu is carrying two overlapping affiliate brands where one does the job.** That is exactly the clutter
you described. And it is not free to remove: `AFFILIATE_OFFER_REGISTRY` uses KKday as the **fallback partner** for
both `klook` (line 182) and `klookHotels` (line 238). Removing the brand blindly would send readers to a dead
link when Klook pauses. The fallback must be re-pointed (to Kiwi/Aviasales for flights; and for hotels, either
keep the KKday hotel link as a hidden fallback with no menu card, or drop the fallback entirely).

**Recommendation:** remove the KKday **menu card** now (it promotes an expired sale). Keep the registry entry as
an invisible fallback until `klook` has a replacement — or remove it fully if you would rather have one partner.
Also decide the fate of the standalone `/kkday-hotels` page: nothing in the menu links to it, so it is orphaned
real estate competing with `/hotels`.

### 1.3 🟠 The menu promises something you do not sell

`src/App.tsx:3044-3045`, the contact entry in the Tools menu:

> **"Contact & BDT Booking Desk"** — *"Pay in BDT via bank / bKash"*

There is no checkout, no payment flow, and no booking engine anywhere in this repository. The contact form
(`functions/api/contact.js`) sends an email. If a reader believes they can *pay* URAL in BDT and arrives at a form,
that is a broken promise at the exact moment money is involved — and `PRODUCT.md` describes URAL as an editorial
travel-intelligence platform whose partner products are not sold by it.

**Recommendation:** rename to what it is — "Contact & Trip Help" / "Ask a person" — and keep "pay in BDT"
language only if you genuinely handle payments off-site by arrangement, in which case say "we can advise on
paying in BDT", not "pay in BDT".

### 1.4 🟡 Your site is *told* it is Bangladesh-only in dozens of labels

Not a lie — a self-limitation. The Tools menu advertises tools by their Bangladeshi frame:

- "**BDT** Currency Converter" / "**BDT** Trip Budget Calculator" / "دেশভিত্তিক বাজেট শিট (**BDT**)"
- "Visa Odds Checker — VOA & eVisa status for **Bangladeshi** passports"
- "Dollar Endorsement & **Dual-Currency Cards**" (a Bangladesh Bank topic — correct, but only for one audience)
- "Pre-Departure — **DAC** baggage, Zamzam & embassy contacts"

Each is genuinely useful to a Bangladeshi. But a reader from Jakarta sees a menu that tells them this site is not
for them. **The fix is not deletion — it is labelling:** name the tool by what it does, and name the audience in
the subtitle. "Currency Converter — live rates, with BDT-first guidance for Bangladesh" is international *and*
Bangladesh-first. That single pattern fixes the whole menu.

---

## Part 2 — The tool-by-tool verdict you asked for

You said each tool must have real-life utility. Here is the honest scoring of what is in the Tools menu today.

| # | Menu item | Does it actually work? | Verdict |
|---|---|---|---|
| 1 | **Trip Cost & Budget Matrices** (`/costs`) | Real: 6 countries × 3 tiers, but uses **hand-typed** rates (one table says USD at 0.0084 = 119 BDT vs today's 124.6) | **Keep + fix rates** (Piece 2) |
| 2 | **BDT Currency Converter** | Real calculation, wrong rates, 5 currencies | **Keep + rebuild live** (Piece 2). Highest potential of any tool. |
| 3 | **Trip Budget Calculator** | Real: preset per-day prices × travellers × days | **Keep**, but relabel as an *indicative* estimator and add the currency choice. Also contains the `* 105` progress-bar bug. |
| 4 | **Smart Packing Checklist** | Real utility, no prices, no claims | **Keep.** Genuinely useful, and honest. |
| 5 | **Visa Odds Checker** | ❌ **Fabricated certainty** (§1.1) | **Remove from menu now.** Rebuild or delete. |
| 6 | **IATA Airport Codes Directory** | Real reference data | **Keep.** Harmless, useful, no claims. |
| 7 | **Dollar Endorsement & Dual-Currency Cards** (`/banking`) | Real, and backed by a claims ledger with primary circulars | **Keep.** Best-sourced content on the site. |
| 8 | **Pre-Departure & Embassy Hub** | Real; DAC-specific by design | **Keep**, relabel so the DAC focus is in the subtitle, not the title. |
| 9 | **Flight Disruption Check (AirHelp)** | Real third-party handoff, registry-managed | **Keep.** It is an affiliate link labelled as one. |
| 10 | **Contact & BDT Booking Desk** | ⚠️ **Name overpromises** (§1.3) | **Keep, rename.** |
| — | **KKday** (Experiences mega-menu card) | ⚠️ Expired promo occupying menu space | **Remove the card** (§1.2). |

**Net: 8 keep (4 need fixing), 1 name change, 1 removal, 1 rebuild-or-delete.** That is a leaner menu that does
more — and no tool is deleted merely for being Bangladesh-focused.

---

## Part 3 — What "international" actually means, concretely

Not a slogan. Five specific changes, none of which removes Bangladeshi help.

**3.1 Currency follows the reader, not the site.**
The flights search already does this (BDT for a Dhaka departure, USD for everyone else). Extend the same rule to
the budget worksheet and converter: **default by origin, always overridable, never forced.**

**3.2 Name things by what they do; name the audience in the subtitle.**

| Before | After |
|---|---|
| "BDT Currency Converter" | "Currency Converter" — *live daily rates; BDT-first guidance for Bangladesh* |
| "Trip Budget Calculator" | "Trip Budget Estimator" — *indicative daily costs by country* |
| "Visa Odds Checker" | *(removed — see §1.1)* |
| "BDT Booking Desk" | "Contact & Trip Help" — *talk to a person* |

**3.3 Bangladesh keeps every advantage, quietly.** BDT stays the default for Dhaka. The Bangladesh-specific
guides (endorsement, NOC, DAC, bKash) stay exactly where they are. Nothing is removed; the *framing* stops
addressing only one passport.

**3.4 The AI helper stops saying "Bangladesh time" as its only anchor.**
Revised limit message — international first, Bangladesh included:

> **Our free assistant has used its allowance for today.**
> It returns at **00:00 UTC** — that is **6:00 AM in Dhaka**, **7:00 AM in Jakarta**, **3:00 AM in Riyadh**,
> **12:00 AM in London**.
> In the meantime: [Saudi visa guide] · [Umrah budget worksheet] · [Nusuk guide] — or message us on WhatsApp
> and a person will reply.

If the site can tell the reader's timezone, it shows **their** time first and the UTC anchor second. UTC is the
only honest universal reference; naming one country's clock as "the" time is the habit we are removing.

**3.5 One thing I would *not* do:** translating the site into Indonesian or Urdu yet. The language union is
`"en" | "bn"` and each locale is a full crawlable duplicate — adding a third doubles the maintenance and the
Bengali parity requirement already has open gaps. International *reach* first (rates, currency, naming, tools);
international *languages* later, as a deliberate project.

⚠️ **One governance note:** `PRODUCT.md` and `docs/05-future-research/README.md` currently say UK/diaspora and
broader international travel are "future research, not current instructions". Making the site international is a
real strategy change, so it should be written into `PRODUCT.md` — otherwise the repo will keep telling future
contributors (and AI agents like me) that international work is out of scope. One paragraph, same as the
currency rule.

---

## Part 4 — The build order, revised

The audit changes the order. Removing false claims now takes priority over adding features.

| Step | What | Why now | Effort |
|---|---|---|---|
| **1** | **Remove the Visa Odds Checker from the menu**; remove the expired KKday menu card; rename the Booking Desk | These are wrong or stale *today*. No code risk, immediate honesty gain. | half a day |
| **2** | **Re-point the KKday fallbacks** so nothing dead-links, and decide `/kkday-hotels` | Must happen with step 1, or the menu removal breaks a fallback | half a day |
| **3** | **Write the two paragraphs** in `PRODUCT.md`: international-first positioning + currency rule | Unblocks everything; stops the repo contradicting itself | hours |
| **4** | **One rate source**, dated, credited; retire the three hand-typed tables | Fixes −3.6% to −9.3% errors across 3 surfaces | 1–2 days |
| **5** | **Rebuild the currency converter** as the flagship tool (live, dated, SAR/IDR/AED/MYR added) | Highest audience value of anything on the list | 2–3 days |
| **6** | **Currency choice** on the worksheet (one control) | The "not BDT-only" ask, done honestly | 2 days |
| **7** | **Relabel the menu** (§3.2) | Cheap, makes the whole site read as international | hours |
| **8** | **AI helper** with the four rules + the UTC-based limit message | Last, because it depends on the corpus from 4–6 | 4–6 days |
| **9** | Fix the `* 105` progress bar | Minutes, while nearby | minutes |

Steps 1–3 are the ones I would do before anything else, because two of them remove claims that are false right
now.

---

## Part 5 — What I need from you before building

1. **Visa Odds Checker: delete or rebuild?** My recommendation is delete from the menu now, rebuild later as a
   properly sourced lookup — but if the Bangladesh/India/Pakistan angle earns traffic, we rebuild it with dated
   sources instead.
2. **KKday: remove the card only, or remove the partner entirely?** Removing entirely means deciding a new
   fallback for Klook.
3. **Is `/kkday-hotels` earning anything?** If it is, keep it as an unlisted page; if not, delete it and keep
   `/hotels` as the single hotel page.
4. **Do you actually take payment in BDT?** That decides whether the contact entry keeps that language.
5. **Approve the two `PRODUCT.md` paragraphs** (international-first framing + currency rule). I can draft them for
   your review next.

---

## Part 6 — Provenance

Checked in code at `c63cd5a` on `arena/56e63301-ural-travel`, 6 November 2026:
`src/components/InteractiveTools.tsx:180-199` (visa table, verbatim quotes above); `:174` (`* 105`);
`:98-104` (hand-typed rates); `src/components/AffiliatePartners.tsx:94-108` (`KKDAY_PROMO`, `expiresAt`
2026-10-31), `:176-196` (Klook entries and their KKday fallbacks), `:232-238`; `src/App.tsx:2960-3050` (Tools
mega-menu), `~2776-2850` (Experiences mega-menu and the KKday callout card), `:3044-3045` (BDT Booking Desk);
`functions/api/contact.js` (email transport only, no payment); `src/translations.ts:1` (`Language = "en" | "bn"`);
`PRODUCT.md` §Positioning and `docs/05-future-research/README.md` (international work currently out of scope).
Live rate comparison: `open.er-api.com` payload dated 6 Nov 2026 (USD 0.008026/BDT = 124.6 BDT/USD) against
`InteractiveTools.tsx` USD 0.0084 and `TravelpayoutsCustomWidget.tsx` 1/120.
