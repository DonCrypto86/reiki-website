/**
 * Sehr einfache Passwort-Absicherung für das Erfahrungsberichte-Admin-Tool
 * (/erfahrungen-verwalten). Es gibt nur eine Nutzerin (Petra), daher genügt
 * ein gemeinsames Passwort statt eines vollständigen Nutzerkontensystems.
 *
 * Benötigte Umgebungsvariablen:
 * - ADMIN_PASSWORD: das Passwort, mit dem sich Petra anmeldet.
 * - ADMIN_SESSION_SECRET: beliebige lange Zufallszeichenfolge, mit der die
 *   Sitzung signiert wird (verhindert, dass jemand ein gültiges Cookie
 *   selbst basteln kann, ohne das Passwort zu kennen).
 *
 * Nutzt ausschliesslich die Web Crypto API (crypto.subtle), damit der Code
 * sowohl in der Middleware (Edge-Runtime) als auch in normalen
 * Server-Routen funktioniert.
 */

export const ADMIN_SESSION_COOKIE = "reiki_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return bufferToHex(signatureBuffer);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return candidate === expected;
}

export async function createSessionCookieValue(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET ist nicht gesetzt.");
  }
  const expiry = Date.now() + SESSION_DURATION_MS;
  const payload = `${expiry}`;
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function isValidSessionCookie(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const expiry = Number(payload);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expectedSignature = await sign(payload, secret);
  return expectedSignature === signature;
}
