# Official sources page and glossary

Two reference pages, each in English and Bengali:

| Page | Address | Data |
|---|---|---|
| Official sources | `/resources`, `/bn/resources` | `src/data/officialSources.ts`, `src/data/ownerSuppliedSources.ts`, `src/data/officialJourneys.ts` |
| Glossary | `/glossary`, `/bn/glossary` | `src/data/glossary.ts` |

Both pages are saved as full HTML at build time, so a reader without JavaScript and a search crawler see every link and every term.

## Official sources

- The page lists a link only when its website is filed as official in `src/data/officialSources.ts`. A website that is cited anywhere on the site must be filed there, either as an organisation (official) or in `NON_OFFICIAL_HOSTS`. The build fails otherwise.
- Links the owner checked by hand go in `src/data/ownerSuppliedSources.ts`, with the date of the check and one line on what the page covers, in both languages.
- Community bodies (for example the Council of British Hajjis) appear in their own section, labelled as not official, and are outside every count.
- Official PDF files are linked on the publisher's site and marked "PDF". They are never copied to this site. `public/downloads/` holds URAL-made files only; every file name starts with `ural-`.
- The owner's source workbooks and the Ministry handbook file are kept in `docs/02-content/sources/uk-hajj-umrah/`. They are working files, not public downloads.
- "Save as PDF" on a topic uses the browser's print function.

Check: `npm run test:official-sources`.

## Glossary

Rules for an entry in `src/data/glossary.ts`:

- English and Bengali names, and a definition in each language. Bengali is written by hand.
- A definition says what the word means. It states no fee, price or exchange rate, and gives no religious ruling.
- Other spellings go in `aka`.
- `guide` is the English path of a published URAL page. `source` is a link that is already on `/resources`.
- A guide can link to one term with `/glossary#term-<id>`.

Check: `npm run test:glossary`.

Both checks also run inside `npm run verify:build`, which confirms that the saved pages carry every link and term in both languages.
