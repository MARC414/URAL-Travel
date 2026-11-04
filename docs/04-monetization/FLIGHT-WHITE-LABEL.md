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

## Activation evidence — 5 November 2026

- Authoritative DNS resolved the configured CNAME; its A records matched the provider:
  `3.132.35.111`, `18.219.61.107`, `18.188.220.34`. IPs are observed values, not records to pin.
- No restrictive CAA record was returned for the subdomain or apex.
- The authenticated dashboard/API confirmed the domain, enabled Page type, marker,
  project and languages. BDT, EUR and GBP were added to the existing currency options
  and the saved values were read back.
- HTTPS was rejected with **`ERR_CERT_COMMON_NAME_INVALID`**. This establishes a
  certificate-hostname mismatch; it does not establish the earlier suggested
  “unverified domain” explanation for an HTTP 500.
- The owner said the Page was created **about 30 minutes earlier**. Travelpayouts'
  dashboard and HTTPS guide allow **up to 48 hours** after creation/customization
  for certificate provisioning. No manual Check/Verify control was present.

**Provider activation is pending at this observation.** A successful repository build
does not certify the subdomain's TLS, rendered results, availability or booking attribution.
When HTTPS becomes valid, verify one-way and round-trip handoffs, Business, adult count,
all six website currencies and both languages on the actual URAL Page. Check dates/year
in the resulting form without completing a purchase.

If the mismatch persists beyond the documented window, send Travelpayouts support:

> Please check TLS provisioning for flights.uraltravel.co.uk, White Label Web Page
> 24232, account marker 675992, project 589561. The saved domain is correct and enabled.
> The DNS-only CNAME points to whitelabel.travelpayouts.com; authoritative A records
> match the provider. HTTPS returns ERR_CERT_COMMON_NAME_INVALID. Please verify the
> domain binding and certificate deployment after the provisioning window.

## Verification and measurement boundary

`npm run test:flight-search` checks native encoding, incomplete/invalid dates, currencies,
locales, real middleware redirects, iframe recovery, the static bridge and both React
widgets. `npm run verify:build` checks the rendered partner handoffs and bridge governance.
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
