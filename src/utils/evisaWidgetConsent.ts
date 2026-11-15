type ConsentStorage = Pick<Storage, "getItem">;

/** Fail closed; analytics or functionality consent alone does not load this ad tool. */
export function hasEvisaWidgetConsent(storage?: ConsentStorage): boolean {
  try {
    const status = storage?.getItem("cookie-consent");
    if (status === "accepted") return true;
    if (status !== "custom") return false;
    const settings = JSON.parse(storage?.getItem("cookie-consent-settings") ?? "{}");
    return settings?.marketing === true;
  } catch {
    return false;
  }
}

/** The consent event also works when private-mode storage is unavailable. */
export function evisaWidgetConsentFromEvent(detail: unknown): boolean {
  if (!detail || typeof detail !== "object") return false;
  const payload = (detail as { payload?: { ad_storage?: unknown } }).payload;
  return payload?.ad_storage === "granted";
}
