/**
 * Static (no-JavaScript) body for `/resources`, used by the prerender for both
 * locales. It walks the same grouped registry, in the same order, with the same
 * copy as `OfficialResourcesPage.tsx`, so the saved HTML and the running page
 * list identical organisations and links.
 */
import { UK_PILGRIM_JOURNEY, URAL_DOWNLOADS, resolveGuideDownloads, resolveJourney } from "../data/officialJourneys";
import {
  OFFICIAL_HOSTS,
  OFFICIAL_SOURCE_COUNTRIES,
  OFFICIAL_SOURCE_KINDS,
  countOfficialOrganisations,
  getCommunitySources,
  getOfficialSources,
  groupOfficialSources,
  type OfficialSourceEntry,
} from "../data/officialSources";
import { GLOSSARY_META, GLOSSARY_PATH } from "./glossaryMeta";
import { toBengaliPath } from "./localeRoutes";
import {
  OFFICIAL_COMMUNITY_SECTION_ID,
  OFFICIAL_DOWNLOADS_SECTION_ID,
  OFFICIAL_RESOURCES_COPY,
  OFFICIAL_RESOURCES_PATH,
  fillResourceCopy,
  formatResourceCount,
  officialSourceMeta,
  officialSourceSectionId,
  type OfficialResourcesLocale,
} from "./officialResourcesCopy";

export { OFFICIAL_RESOURCES_COPY, OFFICIAL_RESOURCES_PATH, officialSourceSectionId };

/**
 * The ItemList entries for the `/resources` CollectionPage schema.
 *
 * One entry per sector, named after the sector's own heading, so the machine
 * readable index matches the visible jump-to list. Country and organisation
 * granularity is deliberately not reflected here: a CollectionPage ItemList is
 * a flat list, and flattening it would mean inventing a hierarchy that does
 * not exist on the page.
 */
export function officialResourcesItems(
  lang: OfficialResourcesLocale
): Array<{ name: string; url: string; description?: string }> {
  const copy = OFFICIAL_RESOURCES_COPY[lang];
  const groups = groupOfficialSources(getOfficialSources());
  const localPath = (path: string) => (lang === "bn" ? toBengaliPath(path) : path);
  return groups.map((group) => {
    const sector = group.sector;
    const label = fillResourceCopy(copy.linkCount, { count: group.total }, lang);
    return {
      name: sector[lang],
      url: `${localPath(OFFICIAL_RESOURCES_PATH)}#${officialSourceSectionId(sector.id)}`,
      description: label,
    };
  });
}

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

  /** One outbound link with its quiet facts; `withSite` adds the website and the type of site. */
  const linkItem = (link: OfficialSourceEntry, withSite: boolean): string => {
    const title = lang === "bn" ? link.titleBn : link.titleEn;
    const meta = officialSourceMeta(link, lang);
    if (withSite) meta.unshift(link.host, OFFICIAL_SOURCE_KINDS[OFFICIAL_HOSTS[link.host].kind][lang]);
    const note = meta.length > 0 ? ` <small>(${escapeHtml(meta.join(" · "))})</small>` : "";
    const aboutText = lang === "bn" ? link.aboutBn : link.aboutEn;
    const about = aboutText ? ` ${escapeHtml(aboutText)}` : "";
    const guide =
      !withSite && link.pages.length > 0
        ? ` · <a href="${escapeHtml(localPath(link.pages[0]))}">${escapeHtml(copy.guideLink)}</a>`
        : "";
    return `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>${about}${note}${guide}</li>`;
  };

  const journeySteps = resolveJourney(UK_PILGRIM_JOURNEY, sources)
    .map(({ stage, links }) => {
      const guide = stage.guide
        ? `<p><a href="${escapeHtml(localPath(stage.guide))}">${escapeHtml(copy.guideLink)}</a></p>`
        : "";
      return `<li><h3>${escapeHtml(stage[lang])}</h3><ul>${links.map((link) => linkItem(link, true)).join("")}</ul>${guide}</li>`;
    })
    .join("");

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
      .join("")}<li><a href="#${OFFICIAL_DOWNLOADS_SECTION_ID}">${escapeHtml(copy.downloadsTitle)}</a></li></ul></nav>`,
    `<section id="${UK_PILGRIM_JOURNEY.id}" data-journey="${UK_PILGRIM_JOURNEY.id}"><h2>${escapeHtml(UK_PILGRIM_JOURNEY[lang])}</h2><ol>${journeySteps}</ol></section>`,
  ];

  for (const group of groups) {
    const countryBlocks = group.countries
      .map(({ code, organisations }) => {
        const cards = organisations
          .map(({ organisation, sources: links }) => {
            const hosts = [...new Set(links.map((link) => link.host))].join(", ");
            const items = links.map((link) => linkItem(link, false)).join("");
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

  const uralDownloads = URAL_DOWNLOADS.map((download) => {
    const facts = [copy.uralMade, copy.pdf, fillResourceCopy(copy.pageCount, { count: download.pages }, lang)];
    if (lang === "bn" && download.fileLanguage === "en") facts.push(copy.fileInEnglish);
    return `<li><a href="${escapeHtml(download.path)}" download>${escapeHtml(download[lang])}</a> <small>(${escapeHtml(facts.join(" · "))})</small></li>`;
  }).join("");
  const officialDownloads = resolveGuideDownloads(sources)
    .map((link) => linkItem(link, true))
    .join("");
  parts.push(
    `<section id="${OFFICIAL_DOWNLOADS_SECTION_ID}"><h2>${escapeHtml(copy.downloadsTitle)}</h2><ul>${uralDownloads}${officialDownloads}</ul></section>`
  );

  const community = getCommunitySources();
  if (community.length > 0) {
    const organisations = [...new Set(community.map((link) => link.org))]
      .map((id) => {
        const links = community.filter((link) => link.org === id);
        const organisation = OFFICIAL_HOSTS[links[0].host];
        return `<h3>${escapeHtml(organisation[lang])}</h3><p><small>${escapeHtml(OFFICIAL_SOURCE_KINDS[organisation.kind][lang])} · ${escapeHtml(links[0].host)}</small></p><ul>${links.map((link) => linkItem(link, false)).join("")}</ul>`;
      })
      .join("");
    parts.push(
      `<section id="${OFFICIAL_COMMUNITY_SECTION_ID}" data-community-sources><h2>${escapeHtml(copy.communityTitle)}</h2>${organisations}</section>`
    );
  }

  parts.push(
    `<section><h2>${escapeHtml(copy.howTitle)}</h2><ul>${copy.how.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul></section>`,
    `<section><h2>${escapeHtml(copy.reportTitle)}</h2><p>${escapeHtml(copy.reportBody)}</p><p><a href="${escapeHtml(localPath("/contact"))}">${escapeHtml(copy.reportCta)}</a></p></section>`,
    `<p><a href="${escapeHtml(localPath(GLOSSARY_PATH))}">${escapeHtml(GLOSSARY_META[lang].navLabel)}</a></p>`
  );
  return `<article>${parts.join("")}</article>`;
}
