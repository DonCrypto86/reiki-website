/**
 * Einfache Passwort-Absicherung für die internen Admin-Tools
 * (/erfahrungen-verwalten und /patienten-verwalten). Es gibt jeweils nur
 * eine Nutzerin (Petra), daher genügt ein gemeinsames Passwort pro Tool
 * statt eines vollständigen Nutzerkontensystems. Beide Tools haben bewusst
 * getrennte Passwörter und getrennte Sitzungs-Cookies, damit ein
 * kompromittiertes Passwort nicht automatisch Zugriff auf das jeweils
 * andere Tool gewährt.
 *
 * Benötigte Umgebungsvariablen:
 * - ADMIN_PASSWORD: Passwort für /erfahrungen-verwalten.
 * - PATIENTS_ADMIN_PASSWORD: Passwort für /patienten-verwalten.
 * - ADMIN_SESSION_SECRET: beliebige lange Zufallszeichenfolge, mit der
 *   beide Sitzungsarten signiert werden (kein Login-Passwort, nur
 *   kryptografisches Material – darf für beide Tools gleich sein).
 *
 * Nutzt ausschliesslich die Web Crypto API (crypto.subtle), damit der Code
 * sowohl in der Middleware (Edge-Runtime) als auch in normalen
 * Server-Routen funktioniert.
 */

export type AdminApp = "testimonials" | "patients";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

const COOKIE_NAMES: Record<AdminApp, string> = {
  testimonials: "reiki_admin_session",
  patients: "reiki_patients_session"
};

const PASSWORD_ENV_VARS: Record<AdminApp, string> = {
  testimonials: "ADMIN_PASSWORD",
  patients: "PATIENTS_ADMIN_PASSWORD"
};

export function getSessionCookieName(app: AdminApp): string {
  return COOKIE_NAMES[app];
}

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

export function verifyPassword(app: AdminApp, candidate: string): boolean {
  const expected = process.env[PASSWORD_ENV_VARS[app]];
  if (!expected) return false;
  return candidate === expected;
}

export async function createSessionCookieValue(app: AdminApp): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET ist nicht gesetzt.");
  }
  const expiry = Date.now() + SESSION_DURATION_MS;
  const payload = `${app}:${expiry}`;
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

export async function isValidSessionCookie(
  app: AdminApp,
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const lastDot = cookieValue.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = cookieValue.slice(0, lastDot);
  const signature = cookieValue.slice(lastDot + 1);
  if (!payload || !signature) return false;

  const [payloadApp, expiryText] = payload.split(":");
  if (payloadApp !== app) return false;

  const expiry = Number(expiryText);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expectedSignature = await sign(payload, secret);
  return expectedSignature === signature;
}
