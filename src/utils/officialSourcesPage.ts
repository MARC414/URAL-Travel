/**
 * Static (no-JavaScript) body for `/resources`, used by the prerender for both
 * locales. It walks the same grouped registry, in the same order, with the same
 * copy as `OfficialResourcesPage.tsx`, so the saved HTML and the running page
 * list identical organisations and links.
 */
import {
  OFFICIAL_SOURCE_COUNTRIES,
  OFFICIAL_SOURCE_KINDS,
  countOfficialOrganisations,
  getOfficialSources,
  groupOfficialSources,
} from "../data/officialSources";
import { toBengaliPath } from "./localeRoutes";
import {
  OFFICIAL_RESOURCES_COPY,
  OFFICIAL_RESOURCES_PATH,
  fillResourceCopy,
  formatResourceCount,
  officialSourceSectionId,
  type OfficialResourcesLocale,
} from "./officialResourcesCopy";

export { OFFICIAL_RESOURCES_COPY, OFFICIAL_RESOURCES_PATH, officialSourceSectionId };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderOfficialResourcesStaticHtml(lang: OfficialResourcesLocale, h1Override?: string): string {
  const copy = OFFICIAL_RESOURCES_COPY[lang];
  const sources = getOfficialSources();
  const groups = groupOfficialSources(sources);
  const countries = new Set(sources.map((source) => source.country)).size;
  const count = (value: number) => formatResourceCount(value, lang);
  const localPath = (path: string) => (lang === "bn" ? toBengaliPath(path) : path);

  const parts: string[] = [
    `<h1>${escapeHtml(h1Override || copy.h1)}</h1>`,
    `<p>${escapeHtml(copy.intro)}</p>`,
    `<p><strong>${count(sources.length)}</strong> ${escapeHtml(copy.statLinks)} · <strong>${count(countOfficialOrganisations(sources))}</strong> ${escapeHtml(copy.statOrganisations)} · <strong>${count(countries)}</strong> ${escapeHtml(copy.statCountries)}</p>`,
    `<section><h2>${escapeHtml(copy.quickLabel)}</h2><p>${escapeHtml(copy.quickBody)}</p></section>`,
    `<nav aria-label="${escapeHtml(copy.jumpLabel)}"><ul>${groups
      .map(
        (group) =>
          `<li><a href="#${officialSourceSectionId(group.sector.id)}">${escapeHtml(group.sector[lang])} (${count(group.total)})</a></li>`
      )
      .join("")}</ul></nav>`,
  ];

  for (const group of groups) {
    const countryBlocks = group.countries
      .map(({ code, organisations }) => {
        const cards = organisations
          .map(({ organisation, sources: links }) => {
            const hosts = [...new Set(links.map((link) => link.host))].join(", ");
            const items = links
              .map((link) => {
                const title = lang === "bn" ? link.titleBn : link.titleEn;
                const note = link.historical ? ` <small>(${escapeHtml(copy.historical)})</small>` : "";
                return `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>${note} · <a href="${escapeHtml(localPath(link.pages[0]))}">${escapeHtml(copy.guideLink)}</a></li>`;
              })
              .join("");
            return `<h4>${escapeHtml(organisation[lang])}</h4><p><small>${escapeHtml(OFFICIAL_SOURCE_KINDS[organisation.kind][lang])} · ${escapeHtml(hosts)}</small></p><ul>${items}</ul>`;
          })
          .join("");
        return `<h3>${escapeHtml(OFFICIAL_SOURCE_COUNTRIES[code][lang])}</h3>${cards}`;
      })
      .join("");
    parts.push(
      `<section id="${officialSourceSectionId(group.sector.id)}"><h2>${escapeHtml(group.sector[lang])}</h2><p><small>${escapeHtml(fillResourceCopy(copy.linkCount, { count: group.total }, lang))}</small></p>${countryBlocks}</section>`
    );
  }

  parts.push(
    `<section><h2>${escapeHtml(copy.howTitle)}</h2><ul>${copy.how.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul></section>`,
    `<section><h2>${escapeHtml(copy.reportTitle)}</h2><p>${escapeHtml(copy.reportBody)}</p><p><a href="${escapeHtml(localPath("/contact"))}">${escapeHtml(copy.reportCta)}</a></p></section>`
  );
  return `<article>${parts.join("")}</article>`;
}
