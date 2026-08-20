"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Plus, CalendarClock } from "lucide-react";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import type { Patient, UpcomingAppointment } from "@/lib/patientsStore";

type PatientsOverviewProps = {
  initialPatients: Patient[];
  upcomingAppointments: UpcomingAppointment[];
};

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function PatientsOverview({
  initialPatients,
  upcomingAppointments
}: PatientsOverviewProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialPatients;
    return initialPatients.filter((patient) => {
      const haystack = [
        patient.name,
        patient.phone,
        patient.email,
        ...patient.pets.map((pet) => pet.name)
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [initialPatients, search]);

  async function handleLogout() {
    await fetch("/api/patienten-auth/logout", { method: "POST" });
    router.push("/patienten-verwalten/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl">Patienten verwalten</h1>
          <p className="mt-1 text-sm text-ink-light">
            Kontakte, Tiere, Behandlungsnotizen und Termine an einem Ort.
          </p>
        </div>
        <SecondaryButton type="button" onClick={handleLogout} className="shrink-0">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Abmelden
        </SecondaryButton>
      </div>

      <section className="rounded-xl2 bg-cream-light p-6 shadow-soft ring-1 ring-beige-dark/60 sm:p-8">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-forest" aria-hidden="true" />
          <h2 className="text-lg">Kommende Termine ({upcomingAppointments.length})</h2>
        </div>
        {upcomingAppointments.length === 0 ? (
          <p className="mt-3 text-sm text-ink-light">Keine kommenden Termine erfasst.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {upcomingAppointments.map((entry) => (
              <li
                key={entry.appointment.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-3 ring-1 ring-beige-dark/40"
              >
                <div>
                  <span className="font-medium text-forest">
                    {formatDate(entry.appointment.date)}
                    {entry.appointment.time ? `, ${entry.appointment.time} Uhr` : ""}
                  </span>{" "}
                  <span className="text-ink">– {entry.patientName}</span>
                  {entry.appointment.note ? (
                    <span className="text-ink-light"> ({entry.appointment.note})</span>
                  ) : null}
                </div>
                <Link
                  href={`/patienten-verwalten/${entry.patientId}`}
                  className="text-sm font-medium text-forest hover:underline"
                >
                  Öffnen
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg">Alle Patient:innen ({initialPatients.length})</h2>
          <PrimaryButton href="/patienten-verwalten/neu">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Neue/r Patient/in
          </PrimaryButton>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Suche nach Name, Telefon, E-Mail oder Tier…"
          className="mt-4 w-full rounded-lg border border-beige-dark bg-white px-4 py-3 text-ink placeholder:text-ink-light/70 focus-visible:outline-none"
        />

        <div className="mt-4 flex flex-col gap-3">
          {filteredPatients.length === 0 ? (
            <p className="text-sm text-ink-light">Keine Patient:innen gefunden.</p>
          ) : (
            filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                href={`/patienten-verwalten/${patient.id}`}
                className="rounded-xl2 bg-white p-5 ring-1 ring-beige-dark/60 transition-colors hover:bg-cream-light"
              >
                <p className="font-medium text-forest">{patient.name}</p>
                <p className="mt-1 text-sm text-ink-light">
                  {[patient.phone, patient.email].filter(Boolean).join(" · ") || "Keine Kontaktdaten"}
                </p>
                {patient.pets.length > 0 ? (
                  <p className="mt-1 text-sm text-ink-light">
                    Tiere: {patient.pets.map((pet) => pet.name).join(", ")}
                  </p>
                ) : null}
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
