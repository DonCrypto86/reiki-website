import { randomUUID } from "crypto";
import { siteConfig, type Testimonial } from "@/config/site";

/**
 * Persistenter Speicher für Erfahrungsberichte, damit Petra über das
 * Admin-Tool (/erfahrungen-verwalten) neue Einträge hinzufügen kann, ohne
 * dass dafür Code geändert und neu bereitgestellt werden muss.
 *
 * Nutzt die REST-API von Upstash Redis (wird über die Vercel-Marketplace-
 * Integration "Upstash for Redis" bzw. das ältere "Vercel KV" bereitgestellt
 * – beide setzen dieselben Umgebungsvariablen KV_REST_API_URL /
 * KV_REST_API_TOKEN, alternativ UPSTASH_REDIS_REST_URL / _TOKEN).
 *
 * Solange kein Speicher eingerichtet ist (Umgebungsvariablen fehlen, z. B.
 * lokal in der Entwicklung), wird automatisch auf die feste Liste aus
 * `siteConfig.testimonials` zurückgegriffen, damit die Website weiterhin
 * normal funktioniert.
 */

export type TestimonialRecord = Testimonial & {
  published: boolean;
  createdAt: string;
};

const STORAGE_KEY = "reiki:testimonials";

function getKvConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

/** Wird nur intern verwendet, um zu prüfen, ob überhaupt ein Speicher da ist. */
export function isStoreConfigured(): boolean {
  return getKvConfig() !== null;
}

function seedFromConfig(): TestimonialRecord[] {
  return siteConfig.testimonials.map((testimonial) => ({
    ...testimonial,
    published: true,
    createdAt: "2025-01-01T00:00:00.000Z"
  }));
}

async function readRaw(): Promise<TestimonialRecord[] | null> {
  const config = getKvConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/get/${STORAGE_KEY}`, {
    headers: { Authorization: `Bearer ${config.token}` },
    // Kurze Zwischenspeicherung, damit neue Einträge zügig erscheinen, ohne
    // bei jedem Seitenaufruf den Speicher anzufragen.
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    console.error("[testimonialsStore] Lesen fehlgeschlagen:", response.status);
    return null;
  }

  const data = (await response.json()) as { result: string | null };
  if (!data.result) return null;

  try {
    return JSON.parse(data.result) as TestimonialRecord[];
  } catch {
    console.error("[testimonialsStore] Gespeicherte Daten konnten nicht gelesen werden.");
    return null;
  }
}

async function writeRaw(records: TestimonialRecord[]): Promise<void> {
  const config = getKvConfig();
  if (!config) {
    throw new Error(
      "Kein Datenspeicher eingerichtet (KV_REST_API_URL / KV_REST_API_TOKEN fehlen)."
    );
  }

  const response = await fetch(`${config.url}/set/${STORAGE_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(records),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Speichern im Datenspeicher fehlgeschlagen.");
  }
}

/** Alle Einträge (Entwürfe und veröffentlichte) – nur für das Admin-Tool. */
export async function getAllTestimonials(): Promise<TestimonialRecord[]> {
  const stored = await readRaw();
  if (stored) return stored;
  return seedFromConfig();
}

/** Nur veröffentlichte Einträge – für die öffentliche Website. */
export async function getPublishedTestimonials(): Promise<TestimonialRecord[]> {
  const all = await getAllTestimonials();
  return all.filter((testimonial) => testimonial.published);
}

export async function addTestimonial(input: {
  quote: string;
  author: string;
  context: string;
}): Promise<TestimonialRecord> {
  const current = await getAllTestimonials();
  const newRecord: TestimonialRecord = {
    id: `erfahrung-${randomUUID()}`,
    quote: input.quote.trim(),
    author: input.author.trim(),
    context: input.context.trim(),
    published: false,
    createdAt: new Date().toISOString()
  };
  await writeRaw([newRecord, ...current]);
  return newRecord;
}

export async function setTestimonialPublished(id: string, published: boolean): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.map((testimonial) =>
    testimonial.id === id ? { ...testimonial, published } : testimonial
  );
  await writeRaw(updated);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.filter((testimonial) => testimonial.id !== id);
  await writeRaw(updated);
}
