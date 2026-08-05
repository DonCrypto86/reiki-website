"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Eye, EyeOff, LogOut } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import type { TestimonialRecord } from "@/lib/testimonialsStore";

type TestimonialsAdminManagerProps = {
  initialTestimonials: TestimonialRecord[];
};

const inputStyles =
  "w-full rounded-lg border border-beige-dark bg-white px-4 py-3 text-ink placeholder:text-ink-light/70 focus-visible:outline-none";
const labelStyles = "text-sm font-medium text-ink";

export default function TestimonialsAdminManager({
  initialTestimonials
}: TestimonialsAdminManagerProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(initialTestimonials);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [context, setContext] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function refresh() {
    const response = await fetch("/api/admin/testimonials", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { testimonials: TestimonialRecord[] };
    setTestimonials(data.testimonials);
  }

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, author, context })
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (!data.success) {
        setFormError(data.message ?? "Speichern fehlgeschlagen.");
        setIsSubmitting(false);
        return;
      }

      setQuote("");
      setAuthor("");
      setContext("");
      await refresh();
    } catch {
      setFormError("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function togglePublished(testimonial: TestimonialRecord) {
    setPendingId(testimonial.id);
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !testimonial.published })
      });
      await refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(testimonial: TestimonialRecord) {
    const confirmed = window.confirm(
      `Diesen Erfahrungsbericht von „${testimonial.author}" wirklich endgültig löschen?`
    );
    if (!confirmed) return;

    setPendingId(testimonial.id);
    try {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, { method: "DELETE" });
      await refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/erfahrungen-verwalten/login");
    router.refresh();
  }

  const drafts = testimonials.filter((testimonial) => !testimonial.published);
  const published = testimonials.filter((testimonial) => testimonial.published);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl">Erfahrungsberichte verwalten</h1>
          <p className="mt-1 text-sm text-ink-light">
            Neue Berichte hinzufügen und entscheiden, welche auf der Website sichtbar sind.
          </p>
        </div>
        <SecondaryButton type="button" onClick={handleLogout} className="shrink-0">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Abmelden
        </SecondaryButton>
      </div>

      <section className="rounded-xl2 bg-cream-light p-6 shadow-soft ring-1 ring-beige-dark/60 sm:p-8">
        <h2 className="text-lg">Neuen Erfahrungsbericht hinzufügen</h2>
        <form onSubmit={handleAdd} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="quote" className={labelStyles}>
              Zitat
            </label>
            <textarea
              id="quote"
              required
              rows={3}
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              className={inputStyles}
              placeholder="z. B. „Nach den Anwendungen fühle ich mich insgesamt entspannter.“"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="author" className={labelStyles}>
                Name / Kürzel
              </label>
              <input
                id="author"
                required
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className={inputStyles}
                placeholder="z. B. M.H., Laupen"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="context" className={labelStyles}>
                Kontext
              </label>
              <input
                id="context"
                required
                value={context}
                onChange={(event) => setContext(event.target.value)}
                className={inputStyles}
                placeholder="z. B. Reiki für Menschen"
              />
            </div>
          </div>

          {formError ? (
            <p role="alert" className="text-sm text-terracotta-dark">
              {formError}
            </p>
          ) : null}

          <div>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Wird gespeichert…
                </>
              ) : (
                "Als Entwurf speichern"
              )}
            </PrimaryButton>
          </div>
          <p className="text-xs text-ink-light">
            Neue Berichte erscheinen zunächst als Entwurf unten und sind noch nicht auf der
            Website sichtbar. Erst durch Klick auf &bdquo;Veröffentlichen&rdquo; gehen sie live.
          </p>
        </form>
      </section>

      <section>
        <h2 className="text-lg">Entwürfe ({drafts.length})</h2>
        <p className="mt-1 text-sm text-ink-light">Noch nicht auf der Website sichtbar.</p>
        <div className="mt-4 flex flex-col gap-4">
          {drafts.length === 0 ? (
            <p className="text-sm text-ink-light">Keine Entwürfe vorhanden.</p>
          ) : (
            drafts.map((testimonial) => (
              <TestimonialRow
                key={testimonial.id}
                testimonial={testimonial}
                isPending={pendingId === testimonial.id}
                onTogglePublished={() => togglePublished(testimonial)}
                onDelete={() => handleDelete(testimonial)}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg">Veröffentlicht ({published.length})</h2>
        <p className="mt-1 text-sm text-ink-light">Live auf der Website sichtbar.</p>
        <div className="mt-4 flex flex-col gap-4">
          {published.length === 0 ? (
            <p className="text-sm text-ink-light">Noch keine veröffentlichten Berichte.</p>
          ) : (
            published.map((testimonial) => (
              <TestimonialRow
                key={testimonial.id}
                testimonial={testimonial}
                isPending={pendingId === testimonial.id}
                onTogglePublished={() => togglePublished(testimonial)}
                onDelete={() => handleDelete(testimonial)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function TestimonialRow({
  testimonial,
  isPending,
  onTogglePublished,
  onDelete
}: {
  testimonial: TestimonialRecord;
  isPending: boolean;
  onTogglePublished: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-xl2 bg-white p-5 ring-1 ring-beige-dark/60">
      <p className="text-ink">&bdquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-2 text-sm font-medium text-forest">{testimonial.author}</p>
      <p className="text-sm text-ink-light">{testimonial.context}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <SecondaryButton type="button" onClick={onTogglePublished} disabled={isPending}>
          {testimonial.published ? (
            <>
              <EyeOff className="h-4 w-4" aria-hidden="true" />
              Zurückziehen
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" aria-hidden="true" />
              Veröffentlichen
            </>
          )}
        </SecondaryButton>
        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-terracotta-dark/40 px-5 py-2.5 text-sm font-medium text-terracotta-dark transition-colors hover:bg-terracotta-dark/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Löschen
        </button>
      </div>
    </div>
  );
}
