/**
 * Static (prerendered) HTML for `/partners`.
 *
 * The React half is src/components/PartnersPage.tsx. Both halves read
 * `PARTNERS_COPY` in src/utils/partnersCopy.ts, so the crawlable page and the
 * rendered page cannot say different things.
 */

import {
  PARTNERS_COPY,
  partnerHref,
  partnersLocalizedPath,
  type PartnersLocale,
} from "./partnersCopy";

export interface PartnersStaticHtmlOptions {
  /** Bengali twin pages pass the localised `<h1>` from the SEO copy table. */
  h1Override?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render the full `/partners` body. */
export function renderPartnersStaticHtml(
  locale: PartnersLocale,
  h1Override?: string,
): string {
  const copy = PARTNERS_COPY[locale];
  const h1 = escapeHtml(h1Override ?? copy.h1);
  const local = (path: string) => partnersLocalizedPath(path, locale);
  const disclosureHeading = locale === "bn" ? "অ্যাফিলিয়েট প্রকাশোক্তি" : "Affiliate disclosure";

  const modelPoints = copy.modelPoints.map((p) => `          <li>${escapeHtml(p)}</li>`).join("\n");
  const meaningPoints = copy.meaningPoints.map((p) => `          <li>${escapeHtml(p)}</li>`).join("\n");

  const travelpayoutsParagraphs = copy.travelpayoutsParagraphs
    .map((p) => `          <p>${escapeHtml(p)}</p>`)
    .join("\n");

  const groups = copy.groups
    .map(
      (group) => `          <section>
            <h3 id="partners-directory-${group.id}">${escapeHtml(group.heading)}</h3>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th scope="col">${escapeHtml(copy.columns.partner)}</th>
                    <th scope="col">${escapeHtml(copy.columns.what)}</th>
                    <th scope="col">${escapeHtml(copy.columns.whatYouGet)}</th>
                    <th scope="col">${escapeHtml(copy.columns.where)}</th>
                  </tr>
                </thead>
                <tbody>
${group.rows
  .map(
    (row) => `                  <tr>
                    <td><a href="${escapeHtml(partnerHref(row.key))}" target="_blank" rel="noopener noreferrer${
                      row.affiliate ? " sponsored" : ""
                    }">${escapeHtml(row.partner)}</a></td>
                    <td>${escapeHtml(row.what)}</td>
                    <td>${escapeHtml(row.whatYouGet)}</td>
                    <td><a href="${local(row.wherePath)}">${escapeHtml(row.whereLabel)}</a></td>
                  </tr>`,
  )
  .join("\n")}
                </tbody>
              </table>
            </div>
          </section>`,
    )
    .join("\n");

  return `      <article>
        <header>
          <p>${escapeHtml(copy.eyebrow)}</p>
          <h1>${h1}</h1>
          <p>${escapeHtml(copy.intro)}</p>
        </header>

        <section id="partners-quick-answer">
          <h2>${escapeHtml(copy.quickAnswerHeading)}</h2>
          <p>${escapeHtml(copy.quickAnswer)}</p>
        </section>

        <section id="partners-how-the-model-works">
          <h2>${escapeHtml(copy.modelHeading)}</h2>
          <ul>
${modelPoints}
          </ul>
        </section>

        <section id="partners-about-travelpayouts">
          <h2>${escapeHtml(copy.travelpayoutsHeading)}</h2>
${travelpayoutsParagraphs}
          <p><small>${escapeHtml(copy.travelpayoutsChecked)}</small></p>
          <p>${escapeHtml(copy.travelpayoutsSourcesHeading)}</p>
          <ul>
${copy.travelpayoutsSources
  .map(
    (source) =>
      `            <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`,
  )
  .join("\n")}
          </ul>
        </section>

        <section id="partners-directory">
          <h2>${escapeHtml(copy.directoryHeading)}</h2>
          <p>${escapeHtml(copy.directoryIntro)}</p>
${groups}
        </section>

        <section id="partners-what-this-means">
          <h2>${escapeHtml(copy.meaningHeading)}</h2>
          <ul>
${meaningPoints}
          </ul>
        </section>

        <section id="partners-visa-assistance">
          <h2>${escapeHtml(copy.visasHeading)}</h2>
          <p>${escapeHtml(copy.visasBody)}</p>
          <p><a href="${local("/visa-assistance")}">${escapeHtml(copy.visasLinkLabel)}</a></p>
        </section>

        <section id="partners-disclosure">
          <h2>${escapeHtml(disclosureHeading)}</h2>
          <p>${escapeHtml(copy.disclosure)}</p>
        </section>

        <section id="partners-contact">
          <h2>${escapeHtml(copy.contactHeading)}</h2>
          <p>${escapeHtml(copy.contactBody)}</p>
          <p><a href="https://wa.me/8801784385335" target="_blank" rel="noopener noreferrer">WhatsApp +8801784385335</a></p>
          <p><small>${escapeHtml(copy.footerNote)}</small></p>
        </section>
      </article>`;
}
