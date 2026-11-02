# Social cards and clickable sources — 2 November 2026

Two reader-facing defects reported by the owner, and what actually caused them.

## 1. "The hero image does not appear when I share a blog post"

### The diagnosis, in order of likelihood

Everything below was checked, not assumed.

| Suspect | Verdict |
| --- | --- |
| `og:image` missing | **No** — present and absolute on all 133 posts |
| Image not served | **No** — `dist/img/blog/` carries all 53 JPEGs |
| Crawler blocked | **No** — `functions/_middleware.js` never touches response bodies or user agents |
| Relative image URL | **No** — origin-prefixed |
| **`og:image:width` / `height` missing** | **YES — the real cause** |
| **`og:image:alt` a single global sentence** | **YES — secondary** |
| **`og:type` = `website` on every page** | **YES — secondary** |
| Image under 1200x627 | **2 of 53 posts** |

**Why the dimensions decide it.** `og:image:width` and `og:image:height` are
optional in the Open Graph spec and effectively mandatory in practice. LinkedIn
takes the declared size to reserve the card's box before it fetches the image; with
no dimensions it frequently renders no card at all rather than a guessed one. That
is exactly the reported symptom — the link unfurls, the image does not.

**Why the covers are not all one size.** The generator emits 1200x670, 1200x896,
1200x655 and 1376x768 depending on the source photograph. Declaring a hard-coded
1200x630 would have letterboxed or cropped the hero on the platforms that trust the
declared ratio. `scripts/prerender.ts` therefore reads each JPEG's SOF header and
emits its real size, and emits nothing rather than a wrong claim if the file cannot
be parsed.

### What shipped

- `og:image` + `og:image:width` + `og:image:height` + `og:image:type` +
  `og:image:secure_url` + `og:image:alt`, per route.
- `og:image:alt` is now a description of the photograph, taken from the curated
  scene text that already existed in `src/utils/blogAltText.ts`. Bengali cards get
  Bengali alt text.
- `og:type` is `article` on blog posts with `article:published_time`,
  `article:modified_time`, `article:section` and `article:author`; `website`
  everywhere else.
- The stale global `og:image:alt` in `index.html` is consumed by the same replace.
  Leaving it produced **two** alt tags, and scrapers take the first — so the brand
  strapline was beating the per-post description.

### Two covers are still too small, and that is content debt

`chefchaouen-morocco-travel-guide-bangladesh` (411x364) and
`havana-cuba-travel-guide-bangladesh` (412x368) are below LinkedIn's 1200x627
floor. **No larger original exists in the repo.** Upscaling 3x produces a blurry
card that looks worse than a small sharp one, so they are not upscaled. They need
replacement photographs. Until then they are listed explicitly in
`test:sharing-citations` with reasons — a new post with a bad image still fails.

### The limitation nobody can fix from the site

**Pasting the caption text alone will never carry an image.** No platform attaches
an image to pasted text. The image comes from the *URL*: paste the link, let the
platform scrape `og:image`, then edit the caption. The "Copy Post" button already
includes the URL for this reason — paste it first, then paste the caption.

**Platforms cache aggressively.** Facebook, LinkedIn and X keep their own copy of a
scraped card for days. After this deploys, an already-shared URL will keep showing
the old card until it is re-scraped:

- Facebook / Meta: <https://developers.facebook.com/tools/debug/> → enter the URL →
  **Scrape Again**
- LinkedIn: <https://www.linkedin.com/post-inspector/> → enter the URL → **Inspect**
- X / Twitter: the card validator, or posting the link fresh

## 1b. The caption was fighting the card — found by the owner, 2 November 2026

The first fix made the article's own `og:image` correct. It was not enough, and the
owner found the reason by watching it happen:

> Pasting a post and getting the URAL profile logo instead of the hero photograph.

**Cause: the copied caption contained two URLs.**

```
👉 Read Full Guide: https://uraltravel.co.uk/blog/<slug>
🌐 Follow URAL:     https://web.facebook.com/uraltravelbd/     ← the second one
```

A social platform unfurls **one** link from pasted text, and with two candidates it
does not reliably pick the article. Facebook, LinkedIn and WhatsApp all built a card
from the *page* URL — and a page's card is its profile picture, which is the URAL
logo. This was a real defect and the reason "the image doesn't appear" survived the
first fix.

**The fix keeps the follow prompt and removes the link.** `@uraltravelbd` is a bare
handle: no platform turns it into a preview, so the article URL is the only address
in the text and the only thing that can be scraped. Nothing is lost — a reader can
still find the page, and the card now shows the photograph.

Captions are built by `src/utils/shareCaption.ts`, a pure function with one rule
documented at the top of the file: **exactly one URL**. It is a module rather than a
template literal in the component so the rule can be tested, and
`test:sharing-citations` now asserts that no caption contains
`facebook.com`, `instagram.com`, `linkedin.com`, `tiktok.com` or `wa.me`.

**The rule this establishes for any future share text:** if the text will be pasted
where a card is expected, it gets one URL. Any second address — a profile, a
subpage, a marketplace listing — will sometimes win the scrape, and when it does the
hero image silently disappears again.

## 2. "LinkedIn is missing from the sharing options"

The share box carried WhatsApp, Facebook and Copy Post. A LinkedIn button using
`/sharing/share-offsite/?url=` is now alongside them. It only needs the canonical
URL — LinkedIn builds the card from the `og:` tags above, which is why fix 1 had to
come first: adding the button without the dimensions would have produced a working
button that posts a card with no image.

## 3. "The external sources are visible but not clickable"

Two different things were true, and only one was a bug.

- **The sources block** at the foot of an article was already a list of real
  `<a href>` links. Nothing to fix.
- **The inline `[1]` `[2]` markers inside the prose** were plain text. A reader who
  wanted to check a claim had to scroll down, count entries and match by eye.

Those markers are now jump links to the matching entry, which carries
`id="source-1"`. Implemented once in `src/utils/citations.ts` and called by **both**
renderers — `BlogPostRouteView.tsx` builds React nodes from it and
`prerender.ts` builds HTML — because a citation that only works after hydration is
worse than a plain number: at least the number survives with JavaScript off.

**Deliberate behaviour:** a marker pointing at a source that does not exist (`[9]`
on a five-reference article) is left as literal text. Linking it would hide a
content bug behind a jump to nowhere.

### Why this broke two build guards

`verify:build` compares served HTML against the source body to prove no article is
truncated, and compares HowTo schema against visible text. Inserting an anchor
mid-sentence broke both:

- the raw-include check could no longer find a paragraph containing markup;
- the tag-stripping check replaces every tag with a space, so `text[1].` became
  `text [1] .` and stopped matching.

Fixed by adding `unwrapCitationAnchors` to `verify-build.ts`, which restores
`<a href="#source-1">[1]</a>` to `[1]` before either comparison. The guards are
asking "is this sentence on the page", and the sentence is unchanged — only its
markup is. The guard was not weakened; it was taught about new markup.

## Gates

`verify:build` 442/442 · `test:sharing-citations` 16 · `test:hajj-rites` 28 ·
`test:tawaf-sai-guide` 17 · `test:visa-saudi-arabia` 10 · `test:journey-help` 13 ·
`test:sitemaps` · `test:scheduling`.

Checked across all 270 built pages: zero duplicate `og:image:alt`, zero pages with
an `og:image` and no dimensions, zero pages with an `og:image` and no alt, zero blog
pages not typed `article`.
