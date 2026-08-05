"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = (await response.json()) as { success: boolean; message?: string };

      if (!data.success) {
        setError(data.message ?? "Anmeldung fehlgeschlagen.");
        setIsSubmitting(false);
        return;
      }

      router.push("/erfahrungen-verwalten");
      router.refresh();
    } catch {
      setError("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-xl2 bg-cream-light p-8 shadow-soft ring-1 ring-beige-dark/60">
        <h1 className="text-xl">Erfahrungsberichte verwalten</h1>
        <p className="mt-2 text-sm text-ink-light">
          Bitte mit dem Passwort anmelden, um Erfahrungsberichte hinzuzufügen oder zu
          veröffentlichen.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-beige-dark bg-white px-4 py-3 text-ink focus-visible:outline-none"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-terracotta-dark">
              {error}
            </p>
          ) : null}

          <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Anmelden…
              </>
            ) : (
              "Anmelden"
            )}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
