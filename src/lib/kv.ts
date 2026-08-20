/**
 * Gemeinsamer Zugriff auf den kleinen Redis-Datenspeicher (Upstash Redis,
 * bereitgestellt über die Vercel-Marketplace-Integration "Upstash for
 * Redis" bzw. das ältere "Vercel KV" – beide setzen dieselben
 * Umgebungsvariablen). Wird sowohl für die Erfahrungsberichte-Verwaltung
 * als auch für die Patienten-Verwaltung genutzt, jeweils unter einem
 * eigenen Redis-Schlüssel.
 */

function getKvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

export function isKvConfigured(): boolean {
  return getKvConfig() !== null;
}

export async function kvGetJson<T>(key: string, revalidateSeconds = 30): Promise<T | null> {
  const config = getKvConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/get/${key}`, {
    headers: { Authorization: `Bearer ${config.token}` },
    next: { revalidate: revalidateSeconds }
  });

  if (!response.ok) {
    console.error(`[kv] Lesen fehlgeschlagen (${key}):`, response.status);
    return null;
  }

  const data = (await response.json()) as { result: string | null };
  if (!data.result) return null;

  try {
    return JSON.parse(data.result) as T;
  } catch {
    console.error(`[kv] Gespeicherte Daten für "${key}" konnten nicht gelesen werden.`);
    return null;
  }
}

export async function kvSetJson<T>(key: string, value: T): Promise<void> {
  const config = getKvConfig();
  if (!config) {
    throw new Error(
      "Kein Datenspeicher eingerichtet (KV_REST_API_URL / KV_REST_API_TOKEN fehlen)."
    );
  }

  const response = await fetch(`${config.url}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(value),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Speichern im Datenspeicher fehlgeschlagen ("${key}").`);
  }
}
