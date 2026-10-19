/** Quote worksheet only: no market-price defaults, FX assumptions or agency multipliers. */
export const UMRAH_BUDGET_ITEMS = [
  { key: "flights", en: "Flights, baggage and taxes", bn: "ফ্লাইট, ব্যাগেজ ও কর" },
  { key: "visa", en: "Visa, insurance and service fees", bn: "ভিসা, ইনস্যুরেন্স ও সার্ভিস ফি" },
  { key: "makkah", en: "Makkah accommodation — all rooms and nights", bn: "মক্কার আবাসন — সব রুম ও রাত" },
  { key: "madinah", en: "Madinah accommodation — all rooms and nights", bn: "মদিনার আবাসন — সব রুম ও রাত" },
  { key: "transport", en: "Rail, airport and local transfers", bn: "ট্রেন, বিমানবন্দর ও লোকাল ট্রান্সফার" },
  { key: "meals", en: "Meals and drinking water", bn: "খাবার ও পানীয় জল" },
  { key: "extras", en: "Other costs — connectivity, assistance, visits, payment/FX fees", bn: "অন্যান্য — যোগাযোগ, সহায়তা, জিয়ারত, পেমেন্ট/বিনিময় ফি" },
  { key: "contingency", en: "Contingency reserve", bn: "জরুরি খরচের সংরক্ষণ" },
] as const;

export type UmrahBudgetKey = (typeof UMRAH_BUDGET_ITEMS)[number]["key"];
export type UmrahBudgetInputs = Record<UmrahBudgetKey, string>;
export const emptyUmrahBudget = (): UmrahBudgetInputs =>
  Object.fromEntries(UMRAH_BUDGET_ITEMS.map(({ key }) => [key, ""])) as UmrahBudgetInputs;

export function calculateUmrahBudget(inputs: UmrahBudgetInputs, pilgrims: number) {
  const missing: UmrahBudgetKey[] = [];
  const invalid: UmrahBudgetKey[] = [];
  let totalPoisha = 0;
  for (const { key } of UMRAH_BUDGET_ITEMS) {
    const raw = inputs[key].trim();
    if (!raw) {
      missing.push(key);
      continue;
    }
    // BDT, max two decimal places; reject coercions such as 1e6, Infinity and negative values.
    if (!/^\d+(?:\.\d{1,2})?$/.test(raw) || Number(raw) > 1_000_000_000) {
      invalid.push(key);
      continue;
    }
    totalPoisha += Math.round(Number(raw) * 100);
  }
  const validParty = Number.isInteger(pilgrims) && pilgrims >= 1 && pilgrims <= 100;
  const complete = validParty && missing.length === 0 && invalid.length === 0;
  return {
    complete,
    missing,
    invalid,
    validParty,
    // Incomplete entries must never appear as a zero-price trip or full budget.
    totalBdt: complete ? totalPoisha / 100 : null,
    perPersonBdt: complete ? Math.round(totalPoisha / pilgrims) / 100 : null,
  };
}
