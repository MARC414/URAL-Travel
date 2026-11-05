# Hosted URAL flight search

**Lifecycle:** current implementation reference. **Configuration reviewed:** 5 November 2026.

## Hosting and ownership

| Setting | Confirmed value |
|---|---|
| Hosted address | `https://flights.uraltravel.co.uk/` |
| Travelpayouts type / ID | Page (`webpage`) / **24232** |
| Account marker / project | **675992** / **589561** |
| Dashboard domain | `flights.uraltravel.co.uk`, enabled |
| Cloudflare DNS | CNAME → `whitelabel.travelpayouts.com`, DNS only, TTL Auto |
| Main language / currency | English / USD |
| Additional language | Bengali |
| Additional currencies | AED, BDT, CNY, EUR, GBP, SAR |

The main website is on Cloudflare Pages. The flight subdomain is served by Travelpayouts;
its certificate and engine are managed there. There is no replacement widget script to
paste into the main website. Provider page appearance and its default route live in the
Travelpayouts dashboard; repository deployment does not publish those settings.

## Native search links

`src/utils/flightSearch.ts` owns `FLIGHT_WHITE_LABEL`, `buildFlightSearchCode`,
`buildWhiteLabelUrl` and `getLegacyWhiteLabelUrl`. Both flight components use it.

Example: three adults, Dhaka–Bangkok, 15–22 November, Business, GBP, Bengali:

```text
https://flights.uraltravel.co.uk/?flightSearch=DAC1511BKK2211c3&currency=GBP&locale=bn
```

- `flightSearch` is Travelpayouts' native parameter. IATA codes are uppercase;
  dates are `DDMM`; Business is lowercase `c`, Comfort `w`, First `f`, Economy empty.
- Adult count is mandatory. The main form collects adults; children and infants can
  be added on the hosted page. Existing bookmarked child/infant suffixes are preserved.
- The main scanner carries its selected round-trip/one-way state, dates and cabin.
  The compact form explicitly sends one-way, one adult, Economy. A hidden former
  hotel checkout date must not turn that into an unrequested round-trip.
- Native codes omit the year. Verify the inferred year on the provider page,
  particularly around New Year. No made-up date replaces an incomplete input.
- `currency` carries the displayed preference; `locale=en` / `locale=bn` carries
  language. These query preferences were observed in `TPWL_EXTRA` and the browser
  language on Travelpayouts' official Page demo. That demo is supporting evidence,
  not an end-to-end test of URAL's domain.
- The Page's own default currency is **USD** (dashboard main currency). The website
  sends **BDT only when the departure airport is in Bangladesh**
  (`preferredCurrencyForOrigin` in `flightSearch.ts`); every other origin opens in USD,
  including London–New York. A currency the visitor chose explicitly is never
  overridden, and legacy bookmarks without a currency follow the same rule.
- The hosted domain identifies the configured account/project. Website links do not
  append a new marker, project override or unverified SubID.

Aviasales handoffs retain the same route code and account marker. Hotel, activity and
other partner links continue to resolve through their existing registry helpers.

## Legacy URL contract

`functions/_middleware.js` handles `/travelpayouts-wl.html` and the extensionless
`/travelpayouts-wl`; `public/_routes.json` includes both. Top-level visits return a 301
to the hosted Page. The target is fixed to the URAL flight host and retains a valid
`flightSearch`, `currency`, and `locale` (with legacy `lang` accepted). Shell-only
`origin`, `destination` and `standalone` values are removed. A bookmark without a
complete search opens the provider form rather than inventing dates.

Requests from cached iframes receive the static bridge, whose link opens a top-level
tab. The redirect varies by `Sec-Fetch-Dest` and is not cached. In static previews the
bridge itself redirects top-level visits. It remains noindex and outside the sitemap.

The retired engine's cookie/fetch patches and frame messaging are removed. Page 24232
must not be substituted into the deleted widget 22462's embed script.

## Branding change-set (approved 5 November 2026)

The template itself is themed in the Travelpayouts dashboard. **Nothing in this section is
published by a repository deploy**; it records the agreed values so a later change does not
re-derive them. Owner decision: keep the template's layout and images, replace the default
blue with URAL navy, and use the URAL mark and name.

### Header, logo and copy

The logo slot is a 40 px square. Replace the default `.tpwl-logo__logo` block in **Custom HTML
code** for **both** language blocks:

```css
.tpwl-logo__logo {
  width: 40px;
  height: 40px;
  background: no-repeat center url('https://uraltravel.co.uk/assets/brand/svg/ural-ascent-mark-navy-v1.svg');
  background-size: 40px 40px;
}
```

Use the **navy** mark, not the ivory one: the slot sits on the light header band, and the
shipped default is a white glyph that is almost invisible there. The header text changes from
“Flight tickets” to **URAL Travel Intelligence**.

| Element | English | Bengali |
|---|---|---|
| Headline | Worldwide flights, one search. | বিশ্বজুড়ে ফ্লাইট, এক অনুসন্ধানে। |
| Page title | Flight Search \| URAL Travel Intelligence | ফ্লাইট সার্চ \| URAL Travel Intelligence |
| Meta description | Search flights worldwide with URAL. Compare routes, cabins and fares across airlines and booking sites, then plan the trip with URAL travel guides. | URAL-এ বিশ্বজুড়ে ফ্লাইট খুঁজুন। এয়ারলাইন ও বুকিং সাইটের মধ্যে রুট, কেবিন ও ভাড়া তুলনা করুন, তারপর URAL-এর ভ্রমণ গাইডে পরিকল্পনা সাজান। |

The default “cheapest flights” meta wording is not carried over: URAL does not publish a
price-superlative claim it cannot verify. Set the favicon from the Meta block
(`/assets/brand/favicon/favicon-32.png`).

### Palette

Set these in the **Design** tab rather than in Custom HTML: the same values drive the results
page through `--main-accent`, so the results page follows automatically. Do not define the
colours in both places with different values.

| Field | Default | URAL |
|---|---|---|
| Search form background | `#D3DCE8` | `#EFEAE1` |
| Headline text | `#1F1F26` | `#0B1426` |
| Main text | `#1F1F26` | `#1E293B` |
| Button background | `#1F4FD1` | `#0B1426` |
| Button text | `#FFFFFF` | `#F5F1E8` |
| Links (prices, footer) | `#1F4FD1` | `#0B1426` |
| Icons in the search form | `#1F4FD1` | `#0B1426` |
| Page background | `#F6F7F9` | `#F7F5EF` |
| Ticker cards background | unchanged | unchanged |

Contrast: ivory on navy ≈ 15.6:1 and navy on the warm band ≈ 15.4:1; navy prices on white
cards exceed 12:1. A navy hero band was rejected because the full-width “Search flights”
button sits on that band and would disappear into it.

### Images and the results page

- The popular-destination card photos are provider-supplied per city. The editable part is the
  city list (`data-destination="IATA"`), and the heading text. The “Origin: Dhaka / …” price
  rows inside those cards are generated from the account, not from the page code.
- The results page inherits colour, border radius and font from the Design tab. It has no
  custom image slot; airline logos and any photography there are provider-owned.
- The only place URAL photography can be added is the documented
  `header.tpwl-logo-header` background rule, which needs an overlay to keep the headline
  readable. Not applied.

### Footer

The default credit reads “Travelpayouts © 2008−2026”. A text-only change to “URAL Travel
Intelligence © 2026” is possible without touching layout; the Terms, Privacy and Cookie links
are left as delivered.

## Activation evidence — 5 November 2026

- Authoritative DNS resolved the configured CNAME; its A records matched the provider:
  `3.132.35.111`, `18.219.61.107`, `18.188.220.34`. IPs are observed values, not records to pin.
- No restrictive CAA record was returned for the subdomain or apex.
- The authenticated dashboard/API confirmed the domain, enabled Page type, marker,
  project and languages. BDT, EUR and GBP were added to the existing currency options
  and the saved values were read back.
- HTTPS initially failed with **`ERR_CERT_COMMON_NAME_INVALID`** shortly after the Page was
  created. **Resolved later the same day:** `https://flights.uraltravel.co.uk/` returned
  **HTTP 200** and rendered the hosted search page (form, EN/BN switch, USD, the pre-filled
  London–Dubai route and the popular-destinations module). Provisioning landed inside
  Travelpayouts' documented **48-hour** window, so no support escalation was needed.

**TLS is valid; the booking path is not certified.** The page loads and renders, but a live
result set, availability and booking attribution have not been verified end to end. Any
remaining check must avoid completing a purchase.

The page confirmed these dashboard values on load: `wl_id=24232`, marker `675992`, project
`589561`, main currency USD, English with Bengali available, and the default palette
`#D3DCE8` / `#1F4FD1` / `#1F1F26` recorded in the branding section above.

## Verification and measurement boundary

`npm run test:flight-search` checks native encoding, incomplete/invalid dates, currencies,
locales, the USD-first / Bangladesh-BDT currency rule, real middleware redirects, iframe
recovery, the static bridge and both React widgets. `npm run verify:build` checks the
rendered partner handoffs and bridge governance.
Run the normal lint/build/verification sequence and check the interactive EN/BN forms.

**5 November repository verification:** `test:flight-search`, `lint`, `build` and all
**469** `verify:build` checks passed. The middleware also bundled for a browser/worker
runtime. Headless Edge checked **12** EN/BN layouts at 390, 768 and 1280 CSS pixels,
plus native-link/keyboard handoffs, all six currencies, LHR–JFK selection, invalid
dates, cached-iframe continuation and the no-JavaScript bridge link. The final run
reported no failures. Provider navigation was intercepted locally for these checks;
the actual HTTPS probe still reported the certificate mismatch. These were emulated
viewports, not physical-device tests. Public sitemap/RSS files remained reproducible.

The hosted anchors are `rel="noopener noreferrer sponsored"`, so the existing delegated
listener can record a site-side click. Its fallback partner name is currently generic for
this host. Affiliate classification, button-event parity, Travelpayouts SubID reporting and
GTM → GA4 forwarding remain a separate measurement task; no booking or earnings claim
follows from these integration checks.

## Official sources

- [Page setup](https://support.travelpayouts.com/hc/en-us/articles/115003591487-Setting-up-a-White-Label-with-Page-type)
- [Native completed-search links](https://support.travelpayouts.com/hc/en-us/articles/115003710648-Links-to-the-White-Label-with-a-completed-search-form)
- [HTTPS provisioning](https://support.travelpayouts.com/hc/en-us/articles/204764738-How-to-configure-the-White-Label-for-HTTPS)
- [Cloudflare CNAME setup](https://support.travelpayouts.com/hc/en-us/articles/360011739360-CNAME-settings-in-Cloudflare)
- [Official Page demo](https://widget.whitelabeldemo.space/)
