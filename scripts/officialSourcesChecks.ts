/**
 * Guards for the official-links registry behind /resources.
 *
 * The page promises "official sites only". These checks keep that promise
 * mechanical: a newly cited website has to be filed as official or as
 * non-official before the build passes, and nothing non-official can be listed.
 * Shared by `npm run test:official-sources` and `npm run verify:build`.
 */
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { OFFICIAL_GUIDE_DOWNLOADS, OFFICIAL_JOURNEYS, URAL_DOWNLOADS } from "../src/data/officialJourneys";
import {
  NON_OFFICIAL_HOSTS,
  OFFICIAL_HOSTS,
  OFFICIAL_ORGANISATIONS,
  findOwnerSuppliedProblems,
  findUnclassifiedCitationHosts,
  getCommunitySources,
  getOfficialSources,
  isOfficialKind,
  officialSourceUrlKey,
} from "../src/data/officialSources";

export interface OfficialSourcesCheck {
  ok: boolean;
  label: string;
}

export function runOfficialSourcesChecks(): OfficialSourcesCheck[] {
  const official = getOfficialSources();
  const community = getCommunitySources();
  const sources = [...official, ...community];
  const excluded = new Set(NON_OFFICIAL_HOSTS);
  const results: OfficialSourcesCheck[] = [];
  const add = (problems: string[], label: string) =>
    results.push({
      ok: problems.length === 0,
      label: problems.length === 0 ? label : `${label} — ${problems.slice(0, 5).join(", ")}`,
    });

  add(sources.length > 0 ? [] : ["registry is empty"], "official sources: registry has links");
  add(findUnclassifiedCitationHosts(), "official sources: every cited website is filed as official or non-official");
  add(
    Object.keys(OFFICIAL_HOSTS).filter((host) => excluded.has(host)),
    "official sources: no website is in both the official and the non-official list"
  );
  add(
    official
      .filter((source) => excluded.has(source.host) || !OFFICIAL_HOSTS[source.host] || !isOfficialKind(OFFICIAL_HOSTS[source.host].kind))
      .map((source) => source.url),
    "official sources: every listed link belongs to a named official organisation"
  );
  add(
    sources.filter((source) => !source.url.startsWith("https://")).map((source) => source.url),
    "official sources: every listed link uses https"
  );
  add(
    sources
      .filter((source) => !source.titleEn.trim() || !source.titleBn.trim())
      .map((source) => source.url),
    "official sources: every link has an English and a Bengali title"
  );
  add(
    OFFICIAL_ORGANISATIONS.filter((organisation) => !organisation.en.trim() || !organisation.bn.trim()).map(
      (organisation) => organisation.id
    ),
    "official sources: every organisation has a name in both languages"
  );
  add(
    sources.filter((source) => source.pages.length === 0 && !source.checked).map((source) => source.url),
    "official sources: every link names the URAL guide that cites it, or carries the date the owner checked it"
  );
  add(findOwnerSuppliedProblems(), "official sources: every owner-supplied link is filed, dated and titled");
  add(
    community
      .filter((source) => !source.checked || isOfficialKind(OFFICIAL_HOSTS[source.host]?.kind ?? "government"))
      .map((source) => source.url),
    "official sources: a community body is listed apart, and only through an owner-checked link"
  );
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const source of sources) {
    const key = officialSourceUrlKey(source.url);
    if (seen.has(key)) duplicates.push(source.url);
    seen.add(key);
  }
  add(duplicates, "official sources: no link is listed twice");

  // Journeys and downloads only arrange links that are already official.
  const officialByKey = new Map(official.map((source) => [officialSourceUrlKey(source.url), source]));
  const publishedGuides = new Set(getLocalizedBlogs("en").map((post) => `/blog/${post.slug}`));
  const bengaliGuides = new Set(getLocalizedBlogs("bn").map((post) => `/blog/${post.slug}`));
  const journeyProblems: string[] = [];
  for (const journey of OFFICIAL_JOURNEYS) {
    for (const stage of journey.stages) {
      if (stage.links.length === 0 || stage.links.length > 4) journeyProblems.push(`${journey.id}/${stage.id} (1 to 4 links)`);
      if (!stage.en.trim() || !stage.bn.trim()) journeyProblems.push(`${journey.id}/${stage.id} (name)`);
      for (const url of stage.links) {
        if (!officialByKey.has(officialSourceUrlKey(url))) journeyProblems.push(`${journey.id}/${stage.id}: ${url}`);
      }
      if (stage.guide && (!publishedGuides.has(stage.guide) || !bengaliGuides.has(stage.guide))) {
        journeyProblems.push(`${journey.id}/${stage.id}: guide ${stage.guide}`);
      }
    }
  }
  add(journeyProblems, "official sources: every journey step uses official links and published guides");
  add(
    OFFICIAL_GUIDE_DOWNLOADS.filter((url) => !officialByKey.get(officialSourceUrlKey(url))?.pdf),
    "official sources: every listed handbook is an official link marked PDF"
  );
  add(
    URAL_DOWNLOADS.filter(
      (download) =>
        !download.path.startsWith("/downloads/ural-") || !existsSync(path.join(process.cwd(), "public", download.path))
    ).map((download) => download.path),
    "official sources: every hosted download is a URAL-made file that exists"
  );
  const downloadsDir = path.join(process.cwd(), "public", "downloads");
  add(
    existsSync(downloadsDir) ? readdirSync(downloadsDir).filter((name) => !name.startsWith("ural-")) : [],
    "official sources: public/downloads holds URAL-made files only, never a copy of an official file"
  );

  return results;
}
