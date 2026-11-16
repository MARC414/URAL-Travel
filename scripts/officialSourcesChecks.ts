/**
 * Guards for the official-links registry behind /resources.
 *
 * The page promises "official sites only". These checks keep that promise
 * mechanical: a newly cited website has to be filed as official or as
 * non-official before the build passes, and nothing non-official can be listed.
 * Shared by `npm run test:official-sources` and `npm run verify:build`.
 */
import {
  NON_OFFICIAL_HOSTS,
  OFFICIAL_HOSTS,
  OFFICIAL_ORGANISATIONS,
  findUnclassifiedCitationHosts,
  getOfficialSources,
  officialSourceUrlKey,
} from "../src/data/officialSources";

export interface OfficialSourcesCheck {
  ok: boolean;
  label: string;
}

export function runOfficialSourcesChecks(): OfficialSourcesCheck[] {
  const sources = getOfficialSources();
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
    sources.filter((source) => excluded.has(source.host) || !OFFICIAL_HOSTS[source.host]).map((source) => source.url),
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
    sources.filter((source) => source.pages.length === 0).map((source) => source.url),
    "official sources: every link names the URAL guide that cites it"
  );
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const source of sources) {
    const key = officialSourceUrlKey(source.url);
    if (seen.has(key)) duplicates.push(source.url);
    seen.add(key);
  }
  add(duplicates, "official sources: no link is listed twice");

  return results;
}
