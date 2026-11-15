# eVisas Affiliate Programme — Final Plan

> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.** This records the initial research and proposal. Placement limits, implementation instructions, the Morocco gate and widget assumptions below were superseded during the same owner task. See the [current eVisas integration reference](../../04-monetization/EVISAS.md).

**Lifecycle:** historical proposal and source snapshot
**Date:** 15 November 2026
**Owner:** MARC, URAL Travel Intelligence
**Method:** `referrals` skill → affiliate operations playbook (economics → activation → executable terms → reconciliation → measurement)

All three campaign links (`sid=dubai`, `sid=morocco`, `sid=thailand`) were re-tested
live on 15 November 2026: each wrote `evisas_aff={"code":"uraltravel","sid":"<id>"}`
and self-routed to its destination page. They are no longer blocked on anything.

All provider facts below were checked live on 15 November 2026 in a browser session against `evisas.com` (homepage, `/affiliate`, `/partnership`, `/nationality/bangladesh`, `/app/destinations`, the Thailand, UAE, Saudi and Malaysia destination pages, the UK ETA page, `/c/uraltravel`, and the widget endpoint `wgt_4c9e559a2739a9d02b62f257`). Anything not verified is listed in §9 and must not be treated as fact.

---

## 1. The decision

Join it, use it narrowly, and do not reshape the site around it.

- **One solid placement now:** the UAE visa page. It is the only page you own that matches a destination a Bangladeshi passport can actually buy.
- **One conditional:** Morocco, only with the residency condition stated.
- **One global surface:** the homepage widget, which resolves by the reader's passport and therefore serves the international build-out.
- **Thailand:** widget or a two-track block, never a bare Thailand link. §5.
- **Refuse it** on Hajj/Umrah, Nepal, London, Malaysia and Singapore. No product exists for a Bangladeshi passport and a paid intermediary there is actively worse than the official route.

The programme is sized for visa-exempt passports. A Bangladesh-first site can use roughly a sixth of it. That is not a reason to decline — it is a reason to spend a day, not a month.

---

## 2. Verified facts

| Fact | Status | Evidence |
|---|---|---|
| Link is account-wide, not Thailand-specific | **True** | `/partnership`: one partner link, 42+ destinations |
| `?ref=` works on deep destination pages | **True** | `…/thailand-visa?ref=uraltravel` set `evisas_aff={"code":"uraltravel"}` |
| Attribution survives moving between destinations | **True** | Entered on UAE with `?ref`, then browsed Sri Lanka and Kenya with no `ref` — same code and timestamp |
| Campaign links carry a `sid` and self-route | **True** | `?ref=uraltravel&sid=thailand` set `{"sid":"thailand","clickId":"0c8e…"}` and redirected to the Thailand page |
| The widget does not carry a `sid` | **True** | Widget URL resolves to the account code only; no campaign parameter in the embed |
| 30% of service fee, 45% for first 180 days | **True** | `/affiliate`, `/partnership` |
| 365-day cookie, 12-month recurring, monthly payout, $50 minimum | **True** | `/affiliate` |
| Commission is on the service fee only | **True** | `/partnership` example: $50 fee → $15; $22.50 in the boost |
| Widgets (wide + sidebar), banners (4 sizes), campaigns | **True** | Portal walkthrough, chapters 2–6 |
| Brand bidding banned; disclosure required | **True** | Walkthrough chapter 7: "Don't run ads using the eVisas name"; don't call it a government site; don't promise approval; disclose affiliate links |
| Bangladesh passport holders can buy **16** destinations | **True** | `/app/destinations` with nationality BD |
| Thailand is **not** one of them | **True** | Thailand page: 87 eligible passports, Bangladesh absent from the fully expanded list |
| UK/US passports get **29** destinations | **True** | `/app/destinations` forced to GB, then US |
| Saudi Arabia is **not** available to BD | **True** | Saudi page: "available to 66 nationalities"; Bangladesh absent |
| Their UK product is a **UK ETA**, not a visitor visa | **True** | `/destinations/uk-eta`: "UK ETA … from USD $79" |
| Nepal is not in their catalogue | **True** | Absent from the 42+ list |
| Malaysia is suspended | **True** | Malaysia page: "currently not accepting or processing Malaysia eVisa applications" |
| Co-branded page `/c/uraltravel` is live | **No** | Renders empty |

---

## 3. The 16 destinations open to a Bangladeshi passport

*eVisas public all-in "from" prices, 15 November 2026.*

| Destination | From | Condition | URAL coverage |
|---|---|---|---|
| **UAE** | $239 | — | ✅ `/visa/dubai-visa` |
| Sri Lanka | $129 | — | combo tour post only; no visa page |
| Morocco | $215 | "Residency" flag | Chefchaouen guide |
| Kenya | $79 | — | none |
| Cambodia | $99 | — | none |
| Botswana | $99 | — | none |
| Ethiopia | $129 | — | none |
| Madagascar | $95 | — | none |
| Nigeria | $271 | — | none |
| Pakistan | $60 | — | none |
| Seychelles | $79 | — | FAQ mention only |
| Tajikistan | $89 | — | none |
| Bahrain | $129 | "Residency" flag | none |
| Japan | $99 | "Residency" flag | none |
| Turkey | $129 | "Residency" flag | none |
| Taiwan | $139 | "Ecode" | none |

Three of sixteen overlap published URAL content. The "Residency" and "Ecode" tags are eVisas labels whose operational meaning is **not verified** — do not promote those four-plus-one as clean CTAs until the meaning is confirmed.

---

## 4. Economics

- Published example only: $50 service fee → **$15**, or **$22.50** in the boost window. Per-destination service fees are not published — that is the blocking question in the email.
- The boost clock runs **180 days from signup**, not from first placement. If signup was around 14 November 2026 (assumed, not confirmed), the boost ends around **13 May 2027** and the 14-day activation window closes around **28 November 2026**.
- Attribution is not incrementality. A 365-day cookie credits eVisas with applications a reader may have made anyway, on a route where the official portal is cheaper. Treat revenue as found money.
- **Stop criteria at 90 days:** fewer than 3 completed applications across all placements → pause the programme, keep the content, remove the CTA. Eleven or more with no support complaints → extend to Morocco and to eligible destinations as new content appears.

---

## 5. Placement map

| Surface | Asset | Position | Why |
|---|---|---|---|
| **Homepage** | Widget | After `TravelEssentials`, before the "Handy Travel Tools" panel (`src/App.tsx`, SECTION 4.25 boundary) | Reader has just seen who needs which permit — that is the check-your-own moment. Also the only universal surface |
| Homepage, lower | `horizontal-640x120.png` | Between the tools panel and `TrustpilotReviews` | Second and last eVisas element on the page |
| `/visa/dubai-visa` | Widget or `horizontal-640x120.png` | After the requirements checklist, official ICP portal link beside it | Only fully eligible, high-value match |
| `/visa/thailand-visa` | Two-track block (see below) | At the "apply" step | Serves global readers without dead-ending Bangladeshis |
| Morocco guide | `square-250x250.png` | Inline, residency condition stated | Conditional destination |
| Blog sidebar / listing | `skyscraper-160x600.png` | Side column | The format the walkthrough assigns to sidebars |
| Mobile, any surface | `vertical-120x240.png` | Where the horizontal would damage layout | Smallest asset |
| Saudi, Nepal, London, Malaysia, Singapore | **Nothing** | — | No product for a Bangladeshi passport |

**Assets (moved 15 November 2026):** `public/assets/partners/evisas/horizontal-640x120.png`, `skyscraper-160x600.png`, `square-250x250.png`, `vertical-120x240.png`. Use as supplied — the walkthrough asks that the design not be altered.

### The Thailand block

| Reader | What they see |
|---|---|
| Bangladeshi passport | Official route: `thaievisa.go.th` (already in `src/data/visaOfficialSources.ts`) — no paid intermediary |
| Any other passport | "Travelling on another passport?" → the `sid=thailand` campaign link, which reports separately |

This satisfies their "link **or widget**" ask without promising a Bangladeshi reader a product they cannot buy.

### No scroll-triggered modal on the homepage

A homepage popup would be the third eVisas asset on one page against their own one-or-two guidance, it interrupts the search job the homepage exists to do, and Google's intrusive-interstitial guidance treats mobile modals harshly. Scroll modals belong on long-form articles. If more presence is needed, put the square banner on the blog index.

---

## 6. Guardrails

1. **Never present eVisas as official** — paid application assistance by TravelRox, Inc., not a government portal.
2. **Official portal link beside every eVisas CTA.** Their own disclaimer concedes a traveller may apply directly "at a lower cost".
3. **State the relationship** near the link: commission earned, government fee included in the all-in price.
4. **No Thailand promise to a Bangladeshi reader.** No approval-likelihood claims, no use of their 98% marketing figure as fact.
5. **No price without a date and source** (Number rule). Cite "eVisas published price, checked 15 November 2026".
6. **All outbound affiliate anchors:** `target="_blank" rel="noopener noreferrer sponsored"`.
7. **No paid search on "evisas"** — their terms, and answered by the walkthrough.
8. **Promo expiry:** anything time-limited passes through `sanitizeExpiredPromoText` in both `src/App.tsx` and `scripts/prerender.ts`.

---

## 7. Implementation — SHIPPED 15 November 2026

Steps 1–4 and 6–7 below are in the code; step 5 (Morocco) is held at the gate
described in §5. `npm run lint` and `npm run verify:build` exit 0. The design
decisions and the six corrections they absorbed are recorded in
[the placement spec](EVISAS-PLACEMENT-SPEC-2026-11-15.md#implementation-record--15-november-2026).

1. `src/components/AffiliatePartners.tsx`
   - `AFFILIATE_LINKS.evisas = "https://evisas.com/?ref=uraltravel"`.
   - Campaign URLs as named constants: `evisasUae`, `evisasMorocco`, `evisasThailand` (`…&sid=<placement>`). Campaign names permanent and unique per placement, the same rule the repo already applies to Travelpayouts SubIDs.
   - `AFFILIATE_OFFER_REGISTRY.evisas`: `status: "active"`, `offerType: "commission-boost"`, `expiresAt` = signup + 180 days (Bangladesh time), `fallbackPartner` = an existing active partner so a pause degrades instead of dead-ending.
2. `src/types.ts` — add `"evisas"` to the `affiliateCTA.provider` union or the CTA cannot be authored.
3. `VisaEligibilityBox` — a native React component (passport + destination selects, destination list filtered by a local eligibility table) emitting real campaign `<a>` links. Preferred over their iframe: prerenders as links, Bengali parity, and it cannot produce an ineligible route.
   - If their iframe is used instead, ship a visible `<a>` fallback beside it — the iframe paints nothing in prerendered HTML.
4. Homepage insertion at the `TravelEssentials` / tools boundary in `src/App.tsx`.
5. `scripts/prerender.ts` — CTA present in static HTML for every placement.
6. Bengali parity — same placements, same disclosures, natural Bengali, technical terms in English.
7. `npm run verify:build` must exit 0 before this is reported as shipped.

---

## 8. Pre-flight checks before publishing

1. **Widget eligibility test (30 seconds):** open the widget, choose Bangladesh, confirm Thailand either disappears or is refused. Headless automation could not drive the widget, so its filtering behaviour is unverified. If it does not filter, the two-track block is the only safe Thailand option.
2. **Deep-link test:** `evisas.com/destinations/uae-visa?ref=uraltravel` → confirm `evisas_aff` cookie; already passed on 15 November 2026.
3. **`/c/uraltravel`** — currently blank. Do not publish it.
4. **Landing after click:** confirm the UAE page shows a price for a Bangladesh passport before any CTA goes live.
5. **First click reported:** after the first live click, confirm it appears in the dashboard under the campaign name, not the account default.
6. **Banking:** add payment details under Settings before the $50 threshold is reached.

---

## 9. Not verified — do not state as fact

- Whether eVisas' Thailand flow would accept a Bangladeshi applicant. Their eligible-country list excludes BD, so the question is moot for placement purposes; an independent check reached the same "could not verify" conclusion. It is not a reason to test with your own money.
- The service fee for any specific destination.
- Clawback on refusal or refund.
- What "Residency" and "Ecode" mean operationally.
- Whether the widget filters ineligible destinations, or accepts a nationality parameter.
- Whether a campaign link's `sid` can be attached to a widget from inside the portal.
- Exact signup date, and therefore the exact boost end date and 14-day deadline (assumed around 14 November 2026).

---

## 10. The email to send

> Hi Kayes,
>
> Thanks for the invitation — glad to be working with eVisas. Set up on my side and ready to place.
>
> Four quick things:
>
> 1. What support do I get as an affiliate — a named contact, the widget and banner assets, and help if a reader's application gets stuck?
> 2. Does the service fee differ by destination, or is it flat? I need the per-application fee for each country to plan, and whether it changes by visa type or package (single vs multiple entry, standard vs express).
> 3. If an application is refused or refunded, is the commission clawed back?
> 4. Your email asked for a link or widget on my Thailand guide. Thailand isn't available to a Bangladesh passport on your site, and that guide is read almost entirely by Bangladeshi passport holders. I'll put the widget there, since it resolves by passport — tell me if you'd rather I use the fixed Thailand link so the campaign reports separately.
>
> I'll create campaigns and place the UAE visa page first, either way.
>
> Best,
> MARC
> URAL Travel Intelligence
> https://uraltravel.co.uk/

Do not ask whether affiliate or partner is "better": `/partnership` already answers it publicly — identical 30%/45%, identical 365-day cookie, plus agency features, free, no minimums, no exclusivity.

---

## 11. Review

Revisit on **31 January 2027** or after 10 completed applications, whichever comes first. At that point: compare applications per placement against the stop criteria in §4, confirm whether boost-window revenue justified the work, and decide whether the programme deserves a second placement or should be reduced to the UAE page alone.
