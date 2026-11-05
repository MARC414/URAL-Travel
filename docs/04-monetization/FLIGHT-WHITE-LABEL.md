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

### What the Custom HTML block actually is

The **Custom HTML code** tab holds the whole page shell, not an optional extra: the header, the
`#tpwl-search` and `#tpwl-tickets` mounts, the six destination cards, the footer and the consent
banner. There is no second lever. Every edit below is in place, once for the English block and
once for the Bengali block. Never add a second `<html>` document alongside it.

### Tokens that must survive an edit

These expand server-side. Removing one renders the page blank or drops the consent gate, so
keep them and check before saving.

| Token / hook | Consequence if removed |
|---|---|
| `[:embed_script:]` | the search form and results engine never mount |
| `[:cookie_policy_script:]` | the consent banner and its gating stop working — and `uraltravel.co.uk/privacy` states the affiliate script is injected only after marketing consent |
| `[:og_image:]` `[:current_year:]` `[:route_info:]` `[:widget_domain:]` | social preview, copyright year, route-specific title, destination cards |
| `id="tpwl-search"` `id="tpwl-tickets"` `id="tpwl-widget-weedles"` `.tpwl-cookie-banner` `#tpwl-accept-cookie-btn` | render targets; renaming one empties that region |
| `TPWL_EXTRA` and the weedle `<script>` | the destination cards stop loading |

`[:route_info:]` carries its own leading separator — the delivered title is
`Search Flights[:route_info:]` with no space before the token — so never move it away from the
words it follows.

### Copy

| Element | English | Bengali |
|---|---|---|
| Header name | URAL Travel Intelligence | URAL Travel Intelligence |
| Headline | Worldwide flights, one search. | বিশ্বজুড়ে ফ্লাইট, এক অনুসন্ধানে। |
| Page title | `Flight search[:route_info:] \| URAL Travel Intelligence` | `ফ্লাইট সার্চ[:route_info:] \| URAL Travel Intelligence` |
| Meta description | Search flights worldwide with URAL. Compare routes, cabins and fares across airlines and booking sites, then plan the trip with URAL travel guides. | URAL-এ বিশ্বজুড়ে ফ্লাইট খুঁজুন। এয়ারলাইন ও বুকিং সাইটের মধ্যে রুট, কেবিন ও ভাড়া তুলনা করুন, তারপর URAL-এর ভ্রমণ গাইডে পরিকল্পনা সাজান। |
| Destinations heading | Popular destinations | জনপ্রিয় গন্তব্য |
| Footer links | Privacy & Cookie Policy · About URAL | গোপনীয়তা ও কুকি নীতি · URAL সম্পর্কে |

The delivered “cheapest flights” wording appears four times — `description`, `og:description`,
`twitter:title`, `twitter:description` — and is removed from all four: URAL does not publish a
price-superlative claim it cannot verify. `og:type` moves from `product.item` to `website`, because
URAL is a travel-information and referral platform and must not present partner inventory as its
own product listing. `og:locale` stays the provider's `en_US` in English and becomes `bn_BD` in
Bengali, where `en_US` is simply wrong.

### Logo

Replace the single `.tpwl-logo__logo` declaration — the one holding the inline white-plane SVG —
with:

```css
.tpwl-logo__logo {
  width: 40px;
  height: 40px;
  background: no-repeat center url('https://uraltravel.co.uk/assets/brand/svg/ural-ascent-mark-navy-v1.svg');
  background-size: 40px 40px;
}
```

`background-size` is required, not cosmetic. The shipped default points at an inline SVG carrying
only a `viewBox`, which scales into the 40 px box; the URAL asset declares
`width="200" height="200"`. Without an explicit size the browser lays a 200 px image into a 40 px
box and shows the top-left corner of the mark. Declaration order matters for the same reason:
`background` resets `background-size`, so the size must follow the shorthand.

The **navy** variant is the correct one because the slot sits on the light header band. The
shipped default is a white glyph, which is why the current logo looks blank rather than absent.
The hosted page returns no `Content-Security-Policy`, so a cross-origin image is allowed.

The favicon moves to the URAL 32 px PNG, verified live (`/assets/brand/favicon/favicon-32.png`
→ 200 `image/png`) instead of the default `/favicon.ico`, which does not exist on the flight
subdomain.

### Paste-ready Custom HTML — English block

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="Search flights worldwide with URAL. Compare routes, cabins and fares across airlines and booking sites, then plan the trip with URAL travel guides." />
    <link rel="icon" href="https://uraltravel.co.uk/assets/brand/favicon/favicon-32.png" type="image/png" sizes="32x32">

    <meta property="og:title" content="Flight search | URAL Travel Intelligence" />
    <meta property="og:description" content="Search flights worldwide with URAL. Compare routes, cabins and fares across airlines and booking sites, then plan the trip with URAL travel guides." />
    <meta content="en_US" property="og:locale">
    <meta content="website" property="og:type">
    <meta content="[:og_image:]" property="og:image">

    <meta content="Flight search | URAL Travel Intelligence" name="twitter:title">
    <meta content="Search flights worldwide with URAL. Compare routes, cabins and fares across airlines and booking sites, then plan the trip with URAL travel guides." name="twitter:description">
    <meta content="summary_large_image" name="twitter:card">
    <title>Flight search[:route_info:] | URAL Travel Intelligence</title>

    <style>
      body {margin: 0;padding: 0;box-sizing: border-box;color: var(--tpwl-main-text);background-color: var(--tpwl-search-result-background);font-family: var(--tpwl-font-family), sans-serif;}
      body a {color: var(--tpwl-links);text-decoration: none;cursor: pointer;transition: 0.1s linear;}
      body a:hover, body a:focus {text-decoration: underline;}
      .tpwl-logo-header {position: relative;color: var(--tpwl-headline-text);font-weight: 600;background-color: var(--tpwl-search-form-background);padding: 32px 100px 16px;margin-bottom: -20px;z-index: 101;background-size: cover;background-repeat: no-repeat;transform: translateZ(0);backface-visibility: hidden;}
      .tpwl-logo-header h1 {font-size: 48px;margin: 0;}
      .tpwl-search-header {padding: 24px 100px;background-color: var(--tpwl-search-form-background);position: sticky;top: 0;z-index: 100;transition: all 0.3s linear;transform: translateZ(0);backface-visibility: hidden;}
      .tpwl-logo__wrapper {margin-bottom: 140px;font-size: 24px;display: flex;align-items: center;gap: 12px;}
      .tpwl-logo__logo {width: 40px;height: 40px;background: no-repeat center url('https://uraltravel.co.uk/assets/brand/svg/ural-ascent-mark-navy-v1.svg');background-size: 40px 40px;}
      .tpwl-search__wrapper {display: flex;align-items: center;justify-content: center;}
      .tpwl__content {flex: 1 0 auto;max-width: 1240px;min-width: 976px;}
      .tpwl-main {background-color: var(--tpwl-search-result-background);}
      .tpwl-tickets__wrapper #tpwl-tickets:not(:empty) {margin-bottom: 32px;}
      .tpwl-tickets__wrapper {display: flex;align-items: center;justify-content: center;padding: 0px 100px;}
      .tpwl-widgets__wrapper {display: flex;align-items: center;justify-content: center;padding: 56px 100px;margin-bottom: 32px;}
      .tpwl-widgets__wrapper h3 {text-align: center;font-size: 36px;margin: 0px;margin-bottom: 32px;}
      .tpwl-widget-weedles {display: grid;grid-template-columns: 1fr 1fr 1fr;gap: 20px;}
      .tpwl-widget-weedle {display: flex;justify-content: center;}
      .tpwl-footer__wrapper {display: flex;align-items: center;justify-content: center;padding: 56px 100px;text-align: center;font-size: 16px;font-weight: 600;background-color: var(--tpwl-search-result-background);}
      .tpwl-footer__copyright {margin-bottom: 12px;}
      .tpwl-footer__links {display: flex;justify-content: center;gap: 20px;}

      @media (max-width: 389px) {
        .tpwl-footer__wrapper {padding: 56px 16px;}
        .tpwl__content {max-width: unset;min-width: unset;}
        .tpwl-footer__copyright {margin-bottom: 20px;}
        .tpwl-footer__links {display: block;}
        .tpwl-footer__links a {display: block;margin-bottom: 16px;}
        .tpwl-footer__links a:last-child {margin-bottom: 0px;}
      }

      @media (max-width: 1175px) {
        .tpwl-logo-header {position: static;padding: 32px 16px 6px;margin-bottom: 0px;}
        .tpwl-logo-header h1 {font-size: 36px;max-width: 512px;}
        .tpwl__content {max-width: unset;min-width: unset;}
        .tpwl-search__wrapper {display: block;}
        .tpwl-search-header {padding: 24px 16px 24px;position: static;}
        .tpwl-logo__wrapper {margin-bottom: 120px;}
        .tpwl-tickets__wrapper {padding: 0px 16px;}
        .tpwl-widgets__wrapper {padding: 56px 16px;}
        .tpwl-widgets__wrapper h3 {font-size: 32px;}
        .tpwl-widgets__wrapper .tpwl__content {flex: 1 0 100%;}
        .tpwl-widget-weedles {grid-template-columns: 1fr;}
        .tpwl-footer__wrapper {padding: 56px 16px;}
        .tpwl-footer__wrapper .tpwl__content {flex: 1 1 auto;}
      }
    </style>

    [:embed_script:]
    [:cookie_policy_script:]
  </head>

  <body>
    <header class="tpwl-logo-header">
      <div class="tpwl-logo__wrapper">
        <div class="tpwl-logo__logo"></div>
        URAL Travel Intelligence
      </div>

      <div class="tpwl-search__wrapper">
        <div class="tpwl__content">
          <h1>Worldwide flights, one search.</h1>
        </div>
      </div>
    </header>

    <header class="tpwl-search-header">
      <div class="tpwl-search__wrapper">
        <div class="tpwl__content">
          <!-- Search form inputs will be rendered here -->
          <div id="tpwl-search"></div>
        </div>
      </div>
    </header>

    <main class="tpwl-main">
      <div class="tpwl-tickets__wrapper">
        <div class="tpwl__content">
          <!-- Search results will be rendered here -->
          <div id="tpwl-tickets"></div>
        </div>
      </div>

      <div class="tpwl-widgets__wrapper">
        <div class="tpwl__content">
          <h3>Popular destinations</h3>
          <!-- Popular destination widgets will be rendered here -->
          <div id="tpwl-widget-weedles" class="tpwl-widget-weedles">
            <!-- Change IATA code in data-destination attribute to show different destinations -->
            <div class="tpwl-widget-weedle" data-destination="IST" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="DXB" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="MOW" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="LAS" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="NYC" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="LON" is="weedle"></div>
          </div>
        </div>
      </div>
    </main>

    <footer class="tpwl-footer__wrapper">
      <div class="tpwl__content">
        <div class="tpwl-footer__copyright">URAL Travel Intelligence © [:current_year:]</div>

        <div class="tpwl-footer__links">
          <a href="https://uraltravel.co.uk/privacy" target="_blank" rel="noopener">Privacy &amp; Cookie Policy</a>
          <a href="https://uraltravel.co.uk/about" target="_blank" rel="noopener">About URAL</a>
        </div>
      </div>
    </footer>

    <!-- Cookie policy banner will be rendered here -->
    <div class="tpwl-cookie-banner" id="tpwl-cookie-banner">
      <div class="tpwl-cookie-banner__logo"></div>
      <div class="tpwl-cookie-banner__text">To provide a better experience we use cookies to store your search history and selected filters. By clicking or navigating the site, you agree to allow our collection of information through cookies.</div>
      <div class="tpwl-cookie-banner__actions">
        <button class="tpwl-cookie-banner__base-button tpwl-cookie-banner__accept" id="tpwl-accept-cookie-btn">Accept</button>
        <a class="tpwl-cookie-banner__base-button tpwl-cookie-banner__link" href="https://uraltravel.co.uk/privacy" target="_blank" rel="noopener">Cookies Policy</a>
      </div>
    </div>
  </body>

  <script>
    // script is required to render popular destinations widgets
    (function () {
      const container = document.getElementById('tpwl-widget-weedles');
      const weedleElements = container.querySelectorAll('div[is="weedle"]');

      weedleElements.forEach(element => {
        if (!TPWL_EXTRA) return;
        const destination = element.getAttribute('data-destination');
        const scriptElement = document.createElement('script');
        scriptElement.async = 1;
        scriptElement.src = `https://[:widget_domain:]/content?currency=${String(TPWL_EXTRA.currency).toLowerCase()}&trs=${TPWL_EXTRA.trs}&shmarker=${TPWL_EXTRA.marker}&destination=${destination}&target_host=${TPWL_EXTRA.domain}&locale=${TPWL_EXTRA.locale}&limit=6&powered_by=false&primary=%23${TPWL_EXTRA.link_color}&promo_id=4044&campaign_id=100`;
        element.appendChild(scriptElement);
      });
    })();
  </script>
</html>
```

### Paste-ready Custom HTML — Bengali block

Byte-identical to the English block except the head language, the copy, and the two footer
destinations. The stylesheet, the tokens and the weedle script do not change.

```html
<!DOCTYPE html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="URAL-এ বিশ্বজুড়ে ফ্লাইট খুঁজুন। এয়ারলাইন ও বুকিং সাইটের মধ্যে রুট, কেবিন ও ভাড়া তুলনা করুন, তারপর URAL-এর ভ্রমণ গাইডে পরিকল্পনা সাজান।" />
    <link rel="icon" href="https://uraltravel.co.uk/assets/brand/favicon/favicon-32.png" type="image/png" sizes="32x32">

    <meta property="og:title" content="ফ্লাইট সার্চ | URAL Travel Intelligence" />
    <meta property="og:description" content="URAL-এ বিশ্বজুড়ে ফ্লাইট খুঁজুন। এয়ারলাইন ও বুকিং সাইটের মধ্যে রুট, কেবিন ও ভাড়া তুলনা করুন, তারপর URAL-এর ভ্রমণ গাইডে পরিকল্পনা সাজান।" />
    <meta content="bn_BD" property="og:locale">
    <meta content="website" property="og:type">
    <meta content="[:og_image:]" property="og:image">

    <meta content="ফ্লাইট সার্চ | URAL Travel Intelligence" name="twitter:title">
    <meta content="URAL-এ বিশ্বজুড়ে ফ্লাইট খুঁজুন। এয়ারলাইন ও বুকিং সাইটের মধ্যে রুট, কেবিন ও ভাড়া তুলনা করুন, তারপর URAL-এর ভ্রমণ গাইডে পরিকল্পনা সাজান।" name="twitter:description">
    <meta content="summary_large_image" name="twitter:card">
    <title>ফ্লাইট সার্চ[:route_info:] | URAL Travel Intelligence</title>

    <style>
      body {margin: 0;padding: 0;box-sizing: border-box;color: var(--tpwl-main-text);background-color: var(--tpwl-search-result-background);font-family: var(--tpwl-font-family), sans-serif;}
      body a {color: var(--tpwl-links);text-decoration: none;cursor: pointer;transition: 0.1s linear;}
      body a:hover, body a:focus {text-decoration: underline;}
      .tpwl-logo-header {position: relative;color: var(--tpwl-headline-text);font-weight: 600;background-color: var(--tpwl-search-form-background);padding: 32px 100px 16px;margin-bottom: -20px;z-index: 101;background-size: cover;background-repeat: no-repeat;transform: translateZ(0);backface-visibility: hidden;}
      .tpwl-logo-header h1 {font-size: 48px;margin: 0;}
      .tpwl-search-header {padding: 24px 100px;background-color: var(--tpwl-search-form-background);position: sticky;top: 0;z-index: 100;transition: all 0.3s linear;transform: translateZ(0);backface-visibility: hidden;}
      .tpwl-logo__wrapper {margin-bottom: 140px;font-size: 24px;display: flex;align-items: center;gap: 12px;}
      .tpwl-logo__logo {width: 40px;height: 40px;background: no-repeat center url('https://uraltravel.co.uk/assets/brand/svg/ural-ascent-mark-navy-v1.svg');background-size: 40px 40px;}
      .tpwl-search__wrapper {display: flex;align-items: center;justify-content: center;}
      .tpwl__content {flex: 1 0 auto;max-width: 1240px;min-width: 976px;}
      .tpwl-main {background-color: var(--tpwl-search-result-background);}
      .tpwl-tickets__wrapper #tpwl-tickets:not(:empty) {margin-bottom: 32px;}
      .tpwl-tickets__wrapper {display: flex;align-items: center;justify-content: center;padding: 0px 100px;}
      .tpwl-widgets__wrapper {display: flex;align-items: center;justify-content: center;padding: 56px 100px;margin-bottom: 32px;}
      .tpwl-widgets__wrapper h3 {text-align: center;font-size: 36px;margin: 0px;margin-bottom: 32px;}
      .tpwl-widget-weedles {display: grid;grid-template-columns: 1fr 1fr 1fr;gap: 20px;}
      .tpwl-widget-weedle {display: flex;justify-content: center;}
      .tpwl-footer__wrapper {display: flex;align-items: center;justify-content: center;padding: 56px 100px;text-align: center;font-size: 16px;font-weight: 600;background-color: var(--tpwl-search-result-background);}
      .tpwl-footer__copyright {margin-bottom: 12px;}
      .tpwl-footer__links {display: flex;justify-content: center;gap: 20px;}

      @media (max-width: 389px) {
        .tpwl-footer__wrapper {padding: 56px 16px;}
        .tpwl__content {max-width: unset;min-width: unset;}
        .tpwl-footer__copyright {margin-bottom: 20px;}
        .tpwl-footer__links {display: block;}
        .tpwl-footer__links a {display: block;margin-bottom: 16px;}
        .tpwl-footer__links a:last-child {margin-bottom: 0px;}
      }

      @media (max-width: 1175px) {
        .tpwl-logo-header {position: static;padding: 32px 16px 6px;margin-bottom: 0px;}
        .tpwl-logo-header h1 {font-size: 36px;max-width: 512px;}
        .tpwl__content {max-width: unset;min-width: unset;}
        .tpwl-search__wrapper {display: block;}
        .tpwl-search-header {padding: 24px 16px 24px;position: static;}
        .tpwl-logo__wrapper {margin-bottom: 120px;}
        .tpwl-tickets__wrapper {padding: 0px 16px;}
        .tpwl-widgets__wrapper {padding: 56px 16px;}
        .tpwl-widgets__wrapper h3 {font-size: 32px;}
        .tpwl-widgets__wrapper .tpwl__content {flex: 1 0 100%;}
        .tpwl-widget-weedles {grid-template-columns: 1fr;}
        .tpwl-footer__wrapper {padding: 56px 16px;}
        .tpwl-footer__wrapper .tpwl__content {flex: 1 1 auto;}
      }
    </style>

    [:embed_script:]
    [:cookie_policy_script:]
  </head>

  <body>
    <header class="tpwl-logo-header">
      <div class="tpwl-logo__wrapper">
        <div class="tpwl-logo__logo"></div>
        URAL Travel Intelligence
      </div>

      <div class="tpwl-search__wrapper">
        <div class="tpwl__content">
          <h1>বিশ্বজুড়ে ফ্লাইট, এক অনুসন্ধানে।</h1>
        </div>
      </div>
    </header>

    <header class="tpwl-search-header">
      <div class="tpwl-search__wrapper">
        <div class="tpwl__content">
          <!-- Search form inputs will be rendered here -->
          <div id="tpwl-search"></div>
        </div>
      </div>
    </header>

    <main class="tpwl-main">
      <div class="tpwl-tickets__wrapper">
        <div class="tpwl__content">
          <!-- Search results will be rendered here -->
          <div id="tpwl-tickets"></div>
        </div>
      </div>

      <div class="tpwl-widgets__wrapper">
        <div class="tpwl__content">
          <h3>জনপ্রিয় গন্তব্য</h3>
          <!-- Popular destination widgets will be rendered here -->
          <div id="tpwl-widget-weedles" class="tpwl-widget-weedles">
            <!-- Change IATA code in data-destination attribute to show different destinations -->
            <div class="tpwl-widget-weedle" data-destination="IST" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="DXB" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="MOW" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="LAS" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="NYC" is="weedle"></div>
            <div class="tpwl-widget-weedle" data-destination="LON" is="weedle"></div>
          </div>
        </div>
      </div>
    </main>

    <footer class="tpwl-footer__wrapper">
      <div class="tpwl__content">
        <div class="tpwl-footer__copyright">URAL Travel Intelligence © [:current_year:]</div>

        <div class="tpwl-footer__links">
          <a href="https://uraltravel.co.uk/bn/privacy" target="_blank" rel="noopener">গোপনীয়তা ও কুকি নীতি</a>
          <a href="https://uraltravel.co.uk/bn/about" target="_blank" rel="noopener">URAL সম্পর্কে</a>
        </div>
      </div>
    </footer>

    <!-- Cookie policy banner will be rendered here -->
    <div class="tpwl-cookie-banner" id="tpwl-cookie-banner">
      <div class="tpwl-cookie-banner__logo"></div>
      <div class="tpwl-cookie-banner__text">আরও ভালো অভিজ্ঞতার জন্য আমরা কুকি ব্যবহার করে আপনার সার্চের ইতিহাস ও নির্বাচিত ফিল্টার সংরক্ষণ করি। সাইটে ক্লিক বা ব্রাউজ করার মাধ্যমে আপনি কুকির মাধ্যমে তথ্য সংগ্রহের অনুমতি দিচ্ছেন।</div>
      <div class="tpwl-cookie-banner__actions">
        <button class="tpwl-cookie-banner__base-button tpwl-cookie-banner__accept" id="tpwl-accept-cookie-btn">স্বীকার করুন</button>
        <a class="tpwl-cookie-banner__base-button tpwl-cookie-banner__link" href="https://uraltravel.co.uk/bn/privacy" target="_blank" rel="noopener">কুকি নীতি</a>
      </div>
    </div>
  </body>

  <script>
    // script is required to render popular destinations widgets
    (function () {
      const container = document.getElementById('tpwl-widget-weedles');
      const weedleElements = container.querySelectorAll('div[is="weedle"]');

      weedleElements.forEach(element => {
        if (!TPWL_EXTRA) return;
        const destination = element.getAttribute('data-destination');
        const scriptElement = document.createElement('script');
        scriptElement.async = 1;
        scriptElement.src = `https://[:widget_domain:]/content?currency=${String(TPWL_EXTRA.currency).toLowerCase()}&trs=${TPWL_EXTRA.trs}&shmarker=${TPWL_EXTRA.marker}&destination=${destination}&target_host=${TPWL_EXTRA.domain}&locale=${TPWL_EXTRA.locale}&limit=6&powered_by=false&primary=%23${TPWL_EXTRA.link_color}&promo_id=4044&campaign_id=100`;
        element.appendChild(scriptElement);
      });
    })();
  </script>
</html>
```

### Verifying the paste

1. Save the current block to a text editor first; that is the rollback.
2. Paste one language block, save, hard-reload `https://flights.uraltravel.co.uk/`.
3. The mark shows **whole** (a cropped arc means `background-size` was lost).
4. No `#1F4FD1` blue remains on button, links, prices or the results page.
5. The EN/BN switch changes the headline, not just the search labels.
6. One search opens a result set; the flight form still prefills London–Dubai.
7. Then repeat for the second language block.

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
  city list (`data-destination="IATA"`) and the heading text. The “Origin: Dhaka / …” price rows
  inside those cards are generated from the account, not from the page code.
- The delivered list is `IST, DXB, MOW, LAS, NYC, LON` and is **left unchanged**: which cities
  appear is a content decision, not part of the colour change. Replacing `MOW` and `LAS` with
  `BKK` and `SIN` is the only option discussed and needs a separate owner decision.
- The results page inherits colour, border radius and font from the Design tab. It has no custom
  image slot; airline logos and any photography there are provider-owned.
- The colour inheritance is visible in the delivered code, not an assumption: the destination
  card script passes `primary=%23${TPWL_EXTRA.link_color}` and the search widget reads
  `--main-accent`. One Links value therefore recolours the card prices **and** the results-page
  accent.
- The only place URAL photography can be added is the documented
  `header.tpwl-logo-header` background rule, which needs an overlay to keep the headline
  readable. Not applied.

### Footer

The credit changes from “Travelpayouts © 2008−2026” to “URAL Travel Intelligence ©
`[:current_year:]`” — text only, no layout change. The `2008` is Travelpayouts' founding year,
not URAL's, so it does not survive.

The delivered policy links all pointed at `#`. Checked against the live site on 5 November 2026:

| Link | Target | Result |
|---|---|---|
| Privacy & Cookie Policy | `https://uraltravel.co.uk/privacy` | 200 — the page's own title is “Privacy & Cookie Policy”, so it covers both delivered links |
| Bengali equivalent | `https://uraltravel.co.uk/bn/privacy` | 200 |
| About URAL | `https://uraltravel.co.uk/about` / `/bn/about` | 200 |
| Terms of Service | — | **no URAL page exists**; `/terms` and `/cookie-policy` both return 404 |

The dead “Terms of Service” placeholder is therefore replaced with a live “About URAL” link
rather than pointed at a 404. Add a Terms link back only once such a page is published.

`target="_blank"` is kept with `rel="noopener"` on both: a visitor reading the policy should not
lose an in-progress search.

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
