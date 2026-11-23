import type { Language } from "../translations";
import type { DepartureHubRecord } from "../data/departureHubs";
import { collectionPageSchema } from "./schema";
import { siteUrl } from "./localeRoutes";

/** Visible guide links and structured-data items consume the same record. */
export function departureHubCollectionSchema(record: DepartureHubRecord, lang: Language) {
  return collectionPageSchema({
    url: siteUrl(record.path, lang),
    name: record.copy[lang].title,
    description: record.copy[lang].description,
    inLanguage: lang === "bn" ? "bn-BD" : "en-BD",
    items: record.sections.flatMap(section => section.links.map(link => ({
      name: link.label[lang],
      url: siteUrl(link.path, lang),
      description: section.title[lang],
    }))),
  });
}
