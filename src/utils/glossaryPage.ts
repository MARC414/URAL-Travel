/**
 * Static (no-JavaScript) body and structured data for `/glossary`, used by the
 * prerender for both locales. Same terms, order and wording as GlossaryPage.tsx.
 */
import { GLOSSARY_GROUPS, GLOSSARY_TERMS, glossaryTermsByGroup, type GlossaryTerm } from "../data/glossary";
import { OFFICIAL_RESOURCES_PATH } from "./officialResourcesMeta";
import {
  GLOSSARY_COPY,
  GLOSSARY_PATH,
  formatGlossaryCount,
  glossaryGroupSectionId,
  glossaryTermAnchor,
  type GlossaryLocale,
} from "./glossaryCopy";
import { toBengaliPath } from "./localeRoutes";

export { GLOSSARY_COPY, GLOSSARY_PATH };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The term's name in the page language first, then in the other language. */
export function glossaryTermNames(term: GlossaryTerm, lang: GlossaryLocale): { primary: string; secondary: string } {
  const [primary, other] = lang === "bn" ? [term.bn, term.en] : [term.en, term.bn];
  // Brand and legal names (UK261, MDAC) are written the same way in both languages.
  return { primary, secondary: other === primary ? "" : other };
}

export function renderGlossaryStaticHtml(lang: GlossaryLocale, h1Override?: string): string {
  const copy = GLOSSARY_COPY[lang];
  const count = (value: number) => formatGlossaryCount(value, lang);
  const localPath = (path: string) => (lang === "bn" ? toBengaliPath(path) : path);
  const otherLang = lang === "bn" ? "en" : "bn";

  const parts: string[] = [
    `<h1>${escapeHtml(h1Override || copy.h1)}</h1>`,
    `<p>${escapeHtml(copy.intro)}</p>`,
    `<p><strong>${count(GLOSSARY_TERMS.length)}</strong> ${escapeHtml(copy.statTerms)} · <strong>${count(GLOSSARY_GROUPS.length)}</strong> ${escapeHtml(copy.statTopics)}</p>`,
    `<nav aria-label="${escapeHtml(copy.topicsLabel)}"><ul>${GLOSSARY_GROUPS.map(
      (group) =>
        `<li><a href="#${glossaryGroupSectionId(group.id)}">${escapeHtml(group[lang])} (${count(glossaryTermsByGroup(group.id).length)})</a></li>`
    ).join("")}</ul></nav>`,
  ];

  for (const group of GLOSSARY_GROUPS) {
    const items = glossaryTermsByGroup(group.id, lang)
      .map((term) => {
        const names = glossaryTermNames(term, lang);
        const also = term.aka?.length
          ? ` <small>${escapeHtml(copy.alsoWritten)}: ${escapeHtml(term.aka.join(", "))}</small>`
          : "";
        const links = [
          term.guide ? `<a href="${escapeHtml(localPath(term.guide))}">${escapeHtml(copy.guideLink)}</a>` : "",
          term.source
            ? `<a href="${escapeHtml(term.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(copy.sourceLink)}</a>`
            : "",
        ]
          .filter(Boolean)
          .join(" · ");
        return `<dt id="${glossaryTermAnchor(term.id)}">${escapeHtml(names.primary)}${names.secondary ? ` <span lang="${otherLang}">(${escapeHtml(names.secondary)})</span>` : ""}</dt><dd>${escapeHtml(lang === "bn" ? term.defBn : term.defEn)}${also}${links ? ` ${links}` : ""}</dd>`;
      })
      .join("");
    parts.push(
      `<section id="${glossaryGroupSectionId(group.id)}"><h2>${escapeHtml(group[lang])}</h2><dl>${items}</dl></section>`
    );
  }

  parts.push(
    `<p><small>${escapeHtml(copy.note)}</small></p>`,
    `<p><a href="${escapeHtml(localPath(OFFICIAL_RESOURCES_PATH))}">${escapeHtml(copy.resourcesCta)}</a></p>`
  );
  return `<article>${parts.join("")}</article>`;
}

/** schema.org DefinedTermSet for the page at `canonicalUrl`. */
export function glossarySchema(lang: GlossaryLocale, canonicalUrl: string): Record<string, unknown> {
  const copy = GLOSSARY_COPY[lang];
  return {
    "@type": "DefinedTermSet",
    "@id": `${canonicalUrl}#glossary`,
    name: copy.h1,
    description: copy.seoDescription,
    inLanguage: lang === "bn" ? "bn-BD" : "en",
    url: canonicalUrl,
    hasDefinedTerm: GLOSSARY_GROUPS.flatMap((group) => glossaryTermsByGroup(group.id, lang)).map((term) => {
      const names = glossaryTermNames(term, lang);
      return {
        "@type": "DefinedTerm",
        "@id": `${canonicalUrl}#${glossaryTermAnchor(term.id)}`,
        name: names.primary,
        alternateName: [names.secondary, ...(term.aka ?? [])].filter(Boolean),
        description: lang === "bn" ? term.defBn : term.defEn,
        url: `${canonicalUrl}#${glossaryTermAnchor(term.id)}`,
        inDefinedTermSet: { "@id": `${canonicalUrl}#glossary` },
      };
    }),
  };
}
