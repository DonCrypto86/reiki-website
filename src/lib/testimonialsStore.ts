import { randomUUID } from "crypto";
import { siteConfig, type Testimonial } from "@/config/site";
import { kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Persistenter Speicher für Erfahrungsberichte, damit Petra über das
 * Admin-Tool (/erfahrungen-verwalten) neue Einträge hinzufügen kann, ohne
 * dass dafür Code geändert und neu bereitgestellt werden muss.
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

function seedFromConfig(): TestimonialRecord[] {
  return siteConfig.testimonials.map((testimonial) => ({
    ...testimonial,
    published: true,
    createdAt: "2025-01-01T00:00:00.000Z"
  }));
}

/** Alle Einträge (Entwürfe und veröffentlichte) – nur für das Admin-Tool. */
export async function getAllTestimonials(): Promise<TestimonialRecord[]> {
  const stored = await kvGetJson<TestimonialRecord[]>(STORAGE_KEY);
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
  await kvSetJson(STORAGE_KEY, [newRecord, ...current]);
  return newRecord;
}

export async function setTestimonialPublished(id: string, published: boolean): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.map((testimonial) =>
    testimonial.id === id ? { ...testimonial, published } : testimonial
  );
  await kvSetJson(STORAGE_KEY, updated);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const current = await getAllTestimonials();
  const updated = current.filter((testimonial) => testimonial.id !== id);
  await kvSetJson(STORAGE_KEY, updated);
}
