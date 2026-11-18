/**
 * Shared helpers for the double opt-in confirmation link.
 *
 * A confirmation link has to prove that the address in it is the address that
 * was signed up — otherwise anyone could confirm somebody else's subscription.
 * The link therefore carries `base64url(email).<HMAC-SHA256(email)>`, and the
 * check on the way back in re-computes the HMAC. Change one character of the
 * address and the signature no longer matches, so the link is refused.
 *
 * Files under `_lib/` are not routed by Cloudflare Pages — an underscore
 * prefix makes them plain modules, reachable only by import. Both
 * `functions/api/subscribe.js` and `functions/api/confirm.js` import from here.
 *
 * SECRET
 * ------
 * `SUBSCRIBE_SIGNING_SECRET` if it is set, otherwise `RESEND_LIST_API_KEY`.
 * Falling back to the API key means no extra variable is needed to make
 * double opt-in work; setting the dedicated secret is better practice, because
 * rotating it only invalidates pending confirmation links, whereas rotating the
 * API key invalidates every link still sitting in an inbox.
 *
 * There is deliberately no expiry. A confirmation link only ever turns on the
 * address it names, so a stale one is harmless — and expiring links would mean
 * someone who confirms a week later is silently dropped.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text) {
  const normalised = String(text).replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalised + "=".repeat((4 - (normalised.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

/** Constant-time-ish comparison; a length mismatch is already decisive. */
function sameSignature(left, right) {
  if (typeof left !== "string" || typeof right !== "string" || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function sign(email, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(email));
  return toBase64Url(new Uint8Array(signature));
}

export function signingSecret(env) {
  const secret = env?.SUBSCRIBE_SIGNING_SECRET || env?.RESEND_LIST_API_KEY || "";
  return typeof secret === "string" ? secret.trim() : "";
}

/** `true` when the deployment is able to mint and check confirmation links. */
export function canSign(env) {
  return signingSecret(env).length >= 8;
}

/**
 * Build the opaque token for an address: `base64url(email).<signature>`.
 * Returns "" when no signing secret is configured, which callers must treat as
 * "double opt-in unavailable" rather than sending an unverifiable link.
 */
export async function createConfirmToken(email, env) {
  const secret = signingSecret(env);
  if (!secret) return "";
  const address = String(email ?? "").trim().toLowerCase();
  if (!address) return "";
  return `${toBase64Url(encoder.encode(address))}.${await sign(address, secret)}`;
}

/**
 * Verify a token and return the address it vouches for, or `null`.
 * `null` covers every failure mode on purpose: a request that carries a
 * tampered, truncated or foreign token must not be able to tell the difference
 * between "wrong signature" and "malformed", and none of them may confirm anyone.
 */
export async function readConfirmToken(token, env) {
  const secret = signingSecret(env);
  if (!secret) return null;
  if (typeof token !== "string" || token.length > 400) return null;
  const separator = token.indexOf(".");
  if (separator < 1) return null;
  const encoded = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!encoded || !signature) return null;

  let address;
  try {
    address = decoder.decode(fromBase64Url(encoded)).trim().toLowerCase();
  } catch {
    return null;
  }
  if (!address || address.length > 254) return null;

  const expected = await sign(address, secret);
  return sameSignature(signature, expected) ? address : null;
}

/** The URL a confirmation email points at. */
export function confirmUrl(requestUrl, token) {
  const base = new URL(requestUrl).origin;
  return `${base}/api/confirm?t=${encodeURIComponent(token)}`;
}
