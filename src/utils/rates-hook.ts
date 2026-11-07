import { useEffect, useState } from "react";
import { loadRates, ratesFreshness, type RatesPayload } from "./rates";
import { ratesExpireAt, ratesFreshUntil } from "./rateData";

export function useRates(enabled = true) {
  const [state, setState] = useState<{
    rates: RatesPayload | null;
    status: "idle" | "loading" | "ready" | "unavailable";
  }>({ rates: null, status: "idle" });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const update = async () => {
      const rates = await loadRates();
      if (cancelled) return;
      setState({ rates, status: rates ? "ready" : "unavailable" });
      const next = rates
        ? Math.min(ratesExpireAt(rates), ratesFreshness(rates) === "fresh" ? ratesFreshUntil(rates) : Date.now() + 300_000)
        : Date.now() + 60_000;
      timer = setTimeout(update, Math.max(1000, next - Date.now()));
    };
    setState({ rates: null, status: "loading" });
    void update();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [enabled]);

  return state;
}
