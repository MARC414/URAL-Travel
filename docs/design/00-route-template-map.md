# Route template map — URAL

Maps every route shape to its component file and its audit unit (Phase 2).

## Route shapes (35 English + BN mirror)

| # | Shape | Route example | Component file(s) | Audit unit |
|---|---|---|---|---|
| 1 | Homepage (hero excluded) | `/` | `src/App.tsx` sections, `TravelpayoutsWidget`, `InteractiveTools` | 2.12 |
| 2 | Bangladesh hub | `/bangladesh` | `BangladeshHubView` → `DepartureHub` ✅ done (PR #162) | 2.9 |
| 3 | UK hub | `/uk` | `UkHubView` ✅ done | 2.9 |
| 4 | Umrah hub | `/umrah` | `UmrahLandingPage` | 2.6 |
| 5 | Banking hub | `/banking` | `BankingHubLandingPage` | 2.9 |
| 6 | Pre-departure | `/pre-departure` | `PreDeparturePage` (in App) | 2.9 |
| 7 | Resources | `/resources` | `OfficialResourcesPage` | 2.9 |
| 8 | Glossary | `/glossary` | `GlossaryPage` | 2.10 |
| 9 | Sitemap | `/sitemap` | `SitemapPage` | 2.10 |
| 10 | Contact | `/contact` | `ContactRouteView` | 2.11 |
| 11 | About | `/about` | `AboutRouteView` | 2.11 |
| 12 | Partners | `/partners` | `PartnersPage` | 2.11 |
| 13 | Privacy | `/privacy` | `PrivacyPolicyPage` | 2.11 |
| 14 | Visa free countries | `/visa-free-countries` | `VisaFreeCountriesRouteView` | 2.3 |
| 15 | Visa assistance | `/visa-assistance` | `VisaAssistancePage` | 2.3 |
| 16 | Visa index | `/visa` | `VisaRouteView`, `VisaDirectoryCards` | 2.3 |
| 17 | Visa detail (×7) | `/visa/thailand-visa` | `VisaRouteView` | 2.3 |
| 18 | Flights index | `/flights` | `FlightsRouteView`, `TravelpayoutsWidget` | 2.1 |
| 19 | Flight route (×10) | `/flights/dhaka-bangkok` | `FlightsRouteView` | 2.1 |
| 20 | Hotels index | `/hotels` | `HotelsRouteView`, `KlookHotelOffers` | 2.2 |
| 21 | Hotel guide (×6) | `/hotels/bangkok-hotels` | `HotelsRouteView` | 2.2 |
| 22 | Costs index | `/costs` | `CostsRouteView` | 2.4 |
| 23 | Cost guide (×6) | `/costs/thailand-costs` | `CostsRouteView` | 2.4 |
| 24 | Tools index | `/tools` | `ToolsRouteView`, `InteractiveTools` | 2.4 |
| 25 | Tool (×5) | `/tools/currency-converter` | `ToolsRouteView` | 2.4 |
| 26 | Destinations index | `/destinations` | `DestinationsRouteView` | 2.5 |
| 27 | Destination guide (×11) | `/destinations/dubai-guide` | `CityDestinationLanding`, `EditorialPageHero` | 2.5 |
| 28 | Attractions index | `/attractions` | `GlobalAttractionsHub` | 2.2 |
| 29 | Attraction detail (×18) | `/attractions/...` | `AttractionDetailPage` | 2.2 |
| 30 | Experiences index | `/experiences` | `ExperiencesPage` | 2.2 |
| 31 | Experiences region (×2) | `/experiences/asia` | `ExperiencesPage` | 2.2 |
| 32 | KKday hotels | `/kkday-hotels` | `KkdayHotelsPage` | 2.2 |
| 33 | Blog index | `/blog` | `BlogIndexRouteView` | 2.7 |
| 34 | Blog post (×67) | `/blog/uk-umrah-...` | `BlogPostRouteView` | 2.8 |
| 35 | 404 | (not found) | `NotFoundRouteView` | — |

## Audit units (Phase 2)

| ID | Unit | Files |
|---|---|---|
| 2.1 | Flight search + handoff | `TravelpayoutsWidget`, `TravelpayoutsCustomWidget`, `FlightsRouteView`, `PriceAlertModal` |
| 2.2 | Hotel + experiences commerce | `HotelsRouteView`, `KlookHotelOffers`, `ExperiencesPage`, `GlobalAttractionsHub`, `AttractionDetailPage`, `KKdayPromoBanner` |
| 2.3 | Visa | `VisaRouteView`, `VisaDirectoryCards`, `VisaAssistancePage`, `VisaFreeCountriesRouteView` |
| 2.4 | Costs and tools | `CostsRouteView`, `ToolsRouteView`, `InteractiveTools`, `TripCostEstimator`, `UmrahBudgetCalculator`, `CurrencyConverter` |
| 2.5 | Destinations | `DestinationsRouteView`, `CityDestinationLanding`, `EditorialPageHero` |
| 2.6 | Hajj & Umrah | `UmrahLandingPage`, `/umrah` |
| 2.7 | Blog index | `BlogIndexRouteView`, `blogCategories` |
| 2.8 | Blog article | `BlogPostRouteView`, `BlogArticleHeader`, `BlogArticleNavigation` |
| 2.9 | Hubs | `/bangladesh` ✅, `/uk` ✅, `BankingHubLandingPage`, `/pre-departure`, `OfficialResourcesPage` |
| 2.10 | Discovery/utility | `SitemapPage`, `/glossary`, `PartnerLogoMarquee`, `TrustpilotReviews` |
| 2.11 | Trust/legal | `PrivacyPolicyPage`, `/about`, `/partners`, `ConsentBanner`, `WhatsAppSupport` |
| 2.12 | Homepage below hero | `App.tsx` sections, `TravelEssentials`, newsletter block (hero excluded) |

## Bengali mirror
All 35 shapes have a `/bn/...` counterpart (155 BN routes total). Every redesign unit must be validated in both locales.
