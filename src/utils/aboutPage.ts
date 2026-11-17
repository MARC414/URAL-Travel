/**
 * Static (prerendered) HTML for `/about`.
 *
 * The React half is src/routes/AboutRouteView.tsx. Both halves read
 * `ABOUT_COPY` in src/utils/aboutCopy.ts, so the crawlable page and the
 * rendered page cannot say different things — which is exactly what had
 * happened before: the English body lived as an inline template literal in
 * scripts/prerender.ts while the Bengali page fell through to the generic
 * article builder and lost most of the page.
 *
 * Keep markup here plain HTML. Anything interactive belongs in the React view.
 */

import { ABOUT_COPY, aboutLocalizedPath, type AboutLocale } from "./aboutCopy";

export const ABOUT_MID_IMAGE_WIDTH = 1200;
export const ABOUT_MID_IMAGE_HEIGHT = 896;

const IMAGE_SRC = "/assets/images/about_mid_desk_20261117-1200.webp";
const HERO_IMAGE_SRC = "/assets/images/about_hero_concourse_20261117-1200.webp";
const HERO_IMAGE_WIDTH = 1200;
const HERO_IMAGE_HEIGHT = 670;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface AboutStaticHtmlOptions {
  /** Bengali twin pages pass the localised `<h1>` from the SEO copy table. */
  h1Override?: string;
}

/**
 * Render the full `/about` body. Section ids are stable because the sitemap,
 * deep links and the React view mirror them.
 */
export function renderAboutStaticHtml(
  locale: AboutLocale,
  h1Override?: string,
): string {
  const copy = ABOUT_COPY[locale];
  const h1 = escapeHtml(h1Override ?? copy.h1);
  const link = (path: string) => aboutLocalizedPath(path, locale);

  const capabilities = copy.capabilities
    .map(
      (item) => `        <li>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          <p><a href="${link(item.path)}">${escapeHtml(item.linkLabel)}</a></p>
        </li>`,
    )
    .join("\n");

  const roleSplit = copy.roleSplit
    .map((line) => `          <li>${escapeHtml(line)}</li>`)
    .join("\n");

  const commitments = copy.commitments
    .map(
      (item) => `        <li>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
        </li>`,
    )
    .join("\n");

  return `      <article>
        <figure>
          <img src="${HERO_IMAGE_SRC}" width="${HERO_IMAGE_WIDTH}" height="${HERO_IMAGE_HEIGHT}" loading="eager" decoding="async" fetchpriority="high" alt="${escapeHtml(
            locale === "bn"
              ? "সকালের আলোয় বিমানবন্দরের কনকোর্স, ভ্রমণকারীরা দূরে"
              : "An airport concourse in morning light, travellers in the distance",
          )}" />
        </figure>
        <header>
          <p>${escapeHtml(copy.eyebrow)}</p>
          <h1>${h1}</h1>
          <p>${escapeHtml(copy.intro)}</p>
        </header>

        <section id="about-what-ural-does">
          <h2>${escapeHtml(copy.whatHeading)}</h2>
          <p>${escapeHtml(copy.whatIntro)}</p>
          <ul>
${capabilities}
          </ul>
        </section>

        <figure>
          <img src="${IMAGE_SRC}" width="${ABOUT_MID_IMAGE_WIDTH}" height="${ABOUT_MID_IMAGE_HEIGHT}" loading="lazy" decoding="async" alt="${escapeHtml(copy.imageAlt)}" />
          <figcaption>${escapeHtml(copy.imageCaption)}</figcaption>
        </figure>

        <section id="about-visa-assistance">
          <h2>${escapeHtml(copy.visasHeading)}</h2>
          <p>${escapeHtml(copy.visasIntro)}</p>
          <p>${escapeHtml(copy.visasBoundaryLead)}</p>
          <ul>
${roleSplit}
          </ul>
          <p><a href="${link("/visa-assistance")}">${escapeHtml(copy.visasLinkLabel)}</a></p>
        </section>

        <section id="about-how-ural-makes-money">
          <h2>${escapeHtml(copy.moneyHeading)}</h2>
          <p>${escapeHtml(copy.moneyBody)}</p>
          <p><a href="${link("/partners")}">${escapeHtml(copy.moneyLinkLabel)}</a></p>
        </section>

        <section id="about-editorial-commitments">
          <h2>${escapeHtml(copy.commitmentsHeading)}</h2>
          <ul>
${commitments}
          </ul>
        </section>

        <section id="about-founder">
          <h2>${escapeHtml(copy.founderLabel)}</h2>
          <p><strong>${escapeHtml(copy.founderName)}</strong></p>
          <p>${escapeHtml(copy.founderBody)}</p>
        </section>

        <section id="about-contact">
          <h2>${escapeHtml(copy.contactHeading)}</h2>
          <p>${escapeHtml(copy.contactBody)}</p>
          <p>
            <a href="https://wa.me/8801784385335" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.contactWhatsappLabel)}</a>
            ·
            <a href="${link("/contact")}">${escapeHtml(copy.contactFormLabel)}</a>
          </p>
          <p><small>URAL Travel Intelligence, Dhaka, Bangladesh.</small></p>
        </section>
      </article>`;
}
