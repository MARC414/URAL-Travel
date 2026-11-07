/** Quote inputs only until supplier prices have an auditable date, unit and source. */
export const ESTIMATOR_COUNTRIES = [
  { key: "nepal", costId: "nepal-costs", labelEn: "Nepal", labelBn: "নেপাল", airportCode: "KTM" },
  { key: "thailand", costId: "thailand-costs", labelEn: "Thailand", labelBn: "থাইল্যান্ড", airportCode: "BKK" },
  { key: "malaysia", costId: "malaysia-costs", labelEn: "Malaysia", labelBn: "মালয়েশিয়া", airportCode: "KUL" },
  { key: "uae", costId: "dubai-costs", labelEn: "United Arab Emirates (Dubai)", labelBn: "সংযুক্ত আরব আমিরাত (দুবাই)", airportCode: "DXB" },
  { key: "singapore", costId: "singapore-costs", labelEn: "Singapore", labelBn: "সিঙ্গাপুর", airportCode: "SIN" },
  { key: "maldives", costId: "maldives-costs", labelEn: "Maldives", labelBn: "মালদ্বীপ", airportCode: "MLE" },
] as const;
export type EstimatorCountry = typeof ESTIMATOR_COUNTRIES[number]["key"];
export type EstimatorLine = "airfare" | "childAirfare" | "infantAirfare" | "lodging" | "meals" | "transport" | "tickets" | "childTickets" | "extras";
export type EstimatorQuotes = Record<EstimatorLine, string>;
export type AirfareMode = "per-adult" | "whole-party";
export const ESTIMATOR_CAPS = { days: 30, nights: 30, travellers: 12, rooms: 12 } as const;
export const ESTIMATOR_LINES: EstimatorLine[] = ["airfare", "childAirfare", "infantAirfare", "lodging", "meals", "transport", "tickets", "childTickets", "extras"];
export const emptyEstimatorQuotes = (): EstimatorQuotes => Object.fromEntries(ESTIMATOR_LINES.map((key) => [key, ""])) as EstimatorQuotes;

export interface EstimatorInput {
  country: EstimatorCountry;
  origin: string;
  days: number;
  nights: number;
  rooms: number;
  party: { adults: number; children: number; infants: number };
  airfareMode: AirfareMode;
  quotes: EstimatorQuotes;
  source: string;
  checkedOn: string;
}

export function validCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function estimatorReturnDate(departure: string, days: number): string {
  if (!validCalendarDate(departure) || !Number.isInteger(days) || days < 1 || days > ESTIMATOR_CAPS.days) return "";
  const date = new Date(`${departure}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days - 1);
  return date.toISOString().slice(0, 10);
}

/** A reader's checked date is a local calendar day, unlike the provider's UTC FX timestamp. */
export function estimatorToday(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Exact minor-unit parsing: decimal arithmetic never accumulates binary rounding errors. */
export function parseEstimatorAmount(raw: string): number | null {
  if (!/^\d+(?:\.\d{1,2})?$/.test(raw.trim())) return null;
  const [whole, fraction = ""] = raw.trim().split(".");
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(minor) && minor <= 100_000_000_000 ? minor : null;
}

export function calculateTripCostEstimate(input: EstimatorInput, today = estimatorToday()) {
  const { party, days, nights, rooms, quotes } = input;
  const inRange = (value: number, min: number, max: number) => Number.isInteger(value) && value >= min && value <= max;
  const travellers = party.adults + party.children + party.infants;
  const peopleWithMeals = party.adults + party.children;
  const country = ESTIMATOR_COUNTRIES.find((item) => item.key === input.country);
  const validRoute = Boolean(country && /^[A-Z]{3}$/.test(input.origin) && input.origin !== country.airportCode);
  const validDays = inRange(days, 1, ESTIMATOR_CAPS.days);
  const validStay = inRange(nights, 0, ESTIMATOR_CAPS.nights) && nights <= days && inRange(rooms, 1, ESTIMATOR_CAPS.rooms);
  const validParty = inRange(party.adults, 1, 12) && inRange(party.children, 0, 11) && inRange(party.infants, 0, 11) && travellers <= 12;
  const validSource = input.source.trim().length >= 3 && input.source.trim().length <= 240;
  const validDate = validCalendarDate(input.checkedOn) && input.checkedOn <= today;
  const validAirfareMode = input.airfareMode === "whole-party" || input.airfareMode === "per-adult";
  const multipliers: Record<EstimatorLine, number> = {
    airfare: input.airfareMode === "whole-party" ? 1 : party.adults,
    childAirfare: input.airfareMode === "per-adult" && party.children > 0 ? 1 : 0,
    infantAirfare: input.airfareMode === "per-adult" && party.infants > 0 ? 1 : 0,
    lodging: nights * rooms,
    meals: days * peopleWithMeals,
    transport: days * peopleWithMeals,
    tickets: party.adults,
    childTickets: party.children > 0 ? 1 : 0,
    extras: 1,
  };
  const missing: EstimatorLine[] = [];
  const invalid: EstimatorLine[] = [];
  const subtotals = {} as Record<EstimatorLine, number>;
  let totalMinor = 0;
  for (const key of ESTIMATOR_LINES) {
    subtotals[key] = 0;
    if (multipliers[key] === 0) continue; // Hidden child/infant/overnight quotes cannot affect this trip.
    const raw = quotes[key]?.trim() ?? "";
    if (!raw) { missing.push(key); continue; }
    const amount = parseEstimatorAmount(raw);
    if (amount === null) { invalid.push(key); continue; }
    subtotals[key] = amount * multipliers[key];
    totalMinor += subtotals[key];
  }
  const complete = validRoute && validDays && validStay && validParty && validSource && validDate && validAirfareMode &&
    missing.length === 0 && invalid.length === 0 && Number.isSafeInteger(totalMinor);
  return {
    complete, validRoute, validDays, validStay, validParty, validSource, validDate,
    travellers, missing, invalid,
    lines: ESTIMATOR_LINES.map((key) => ({ key, multiplier: multipliers[key], totalBdt: complete ? subtotals[key] / 100 : null })),
    totalBdt: complete ? totalMinor / 100 : null,
    perPersonBdt: complete ? Math.round(totalMinor / travellers) / 100 : null,
  };
}
