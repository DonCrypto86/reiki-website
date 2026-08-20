"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import type { Patient } from "@/lib/patientsStore";

const inputStyles =
  "w-full rounded-lg border border-beige-dark bg-white px-4 py-3 text-ink placeholder:text-ink-light/70 focus-visible:outline-none";
const labelStyles = "text-sm font-medium text-ink";

export default function NewPatientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/patienten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthDate, phone, email, address })
      });
      const data = (await response.json()) as { success: boolean; message?: string; patient?: Patient };

      if (!data.success || !data.patient) {
        setError(data.message ?? "Speichern fehlgeschlagen.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/patienten-verwalten/${data.patient.id}`);
    } catch {
      setError("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
      <h1 className="text-2xl">Neue/r Patient/in</h1>
      <p className="mt-1 text-sm text-ink-light">
        Tiere, Notizen und Termine können danach auf der Detailseite ergänzt werden.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className={labelStyles}>
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="birthDate" className={labelStyles}>
            Geburtsdatum
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelStyles}>
            Telefon
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelStyles}>
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="address" className={labelStyles}>
            Adresse
          </label>
          <input
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className={inputStyles}
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm text-terracotta-dark">
            {error}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-3">
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Wird gespeichert…
              </>
            ) : (
              "Speichern"
            )}
          </PrimaryButton>
          <SecondaryButton href="/patienten-verwalten">Abbrechen</SecondaryButton>
        </div>
      </form>
    </div>
  );
}
