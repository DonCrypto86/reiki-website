"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, Plus, Check, Undo2 } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import type { Appointment, Patient, Pet, SessionNote } from "@/lib/patientsStore";

type PatientDetailManagerProps = {
  initialPatient: Patient;
};

const inputStyles =
  "w-full rounded-lg border border-beige-dark bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-light/70 focus-visible:outline-none";
const labelStyles = "text-sm font-medium text-ink";

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function PatientDetailManager({ initialPatient }: PatientDetailManagerProps) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [contact, setContact] = useState({
    name: initialPatient.name,
    phone: initialPatient.phone,
    email: initialPatient.email,
    address: initialPatient.address
  });

  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("");

  const [noteDate, setNoteDate] = useState(todayIso());
  const [noteText, setNoteText] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  async function persist(patch: Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>) {
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/patienten/${patient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch)
      });
      const data = (await response.json()) as { success: boolean; message?: string; patient?: Patient };

      if (!data.success || !data.patient) {
        setError(data.message ?? "Speichern fehlgeschlagen.");
        return false;
      }

      setPatient(data.patient);
      return true;
    } catch {
      setError("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await persist(contact);
  }

  async function handleAddPet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!petName.trim()) return;
    const newPet: Pet = { id: crypto.randomUUID(), name: petName.trim(), species: petSpecies.trim() };
    const ok = await persist({ pets: [...patient.pets, newPet] });
    if (ok) {
      setPetName("");
      setPetSpecies("");
    }
  }

  async function handleRemovePet(petId: string) {
    await persist({ pets: patient.pets.filter((pet) => pet.id !== petId) });
  }

  async function handleAddNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!noteText.trim()) return;
    const newNote: SessionNote = {
      id: crypto.randomUUID(),
      date: noteDate || todayIso(),
      text: noteText.trim()
    };
    const ok = await persist({ notes: [newNote, ...patient.notes] });
    if (ok) {
      setNoteText("");
      setNoteDate(todayIso());
    }
  }

  async function handleRemoveNote(noteId: string) {
    await persist({ notes: patient.notes.filter((note) => note.id !== noteId) });
  }

  async function handleAddAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!appointmentDate) return;
    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      date: appointmentDate,
      time: appointmentTime || undefined,
      note: appointmentNote.trim() || undefined,
      completed: false
    };
    const ok = await persist({ appointments: [...patient.appointments, newAppointment] });
    if (ok) {
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentNote("");
    }
  }

  async function handleToggleAppointment(appointmentId: string) {
    await persist({
      appointments: patient.appointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, completed: !appointment.completed }
          : appointment
      )
    });
  }

  async function handleRemoveAppointment(appointmentId: string) {
    await persist({
      appointments: patient.appointments.filter((appointment) => appointment.id !== appointmentId)
    });
  }

  async function handleDeletePatient() {
    const confirmed = window.confirm(
      `${patient.name} inklusive aller Notizen und Termine endgültig löschen?`
    );
    if (!confirmed) return;

    await fetch(`/api/patienten/${patient.id}`, { method: "DELETE" });
    router.push("/patienten-verwalten");
  }

  const sortedNotes = [...patient.notes].sort((a, b) => b.date.localeCompare(a.date));
  const sortedAppointments = [...patient.appointments].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SecondaryButton href="/patienten-verwalten" className="mb-4">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Zurück zur Übersicht
        </SecondaryButton>
        <h1 className="text-2xl">{patient.name}</h1>
        {error ? (
          <p role="alert" className="mt-2 text-sm text-terracotta-dark">
            {error}
          </p>
        ) : null}
      </div>

      <section className="rounded-xl2 bg-cream-light p-6 shadow-soft ring-1 ring-beige-dark/60 sm:p-8">
        <h2 className="text-lg">Kontaktdaten</h2>
        <form onSubmit={handleSaveContact} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className={labelStyles}>
              Name
            </label>
            <input
              id="contact-name"
              required
              value={contact.name}
              onChange={(event) => setContact((prev) => ({ ...prev, name: event.target.value }))}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-phone" className={labelStyles}>
              Telefon
            </label>
            <input
              id="contact-phone"
              value={contact.phone}
              onChange={(event) => setContact((prev) => ({ ...prev, phone: event.target.value }))}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className={labelStyles}>
              E-Mail
            </label>
            <input
              id="contact-email"
              type="email"
              value={contact.email}
              onChange={(event) => setContact((prev) => ({ ...prev, email: event.target.value }))}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-address" className={labelStyles}>
              Adresse
            </label>
            <input
              id="contact-address"
              value={contact.address}
              onChange={(event) =>
                setContact((prev) => ({ ...prev, address: event.target.value }))
              }
              className={inputStyles}
            />
          </div>
          <div className="sm:col-span-2">
            <PrimaryButton type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Wird gespeichert…
                </>
              ) : (
                "Kontaktdaten speichern"
              )}
            </PrimaryButton>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg">Tiere ({patient.pets.length})</h2>
        <div className="mt-4 flex flex-col gap-2">
          {patient.pets.map((pet) => (
            <div
              key={pet.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-beige-dark/40"
            >
              <span className="text-ink">
                {pet.name}
                {pet.species ? <span className="text-ink-light"> · {pet.species}</span> : null}
              </span>
              <button
                type="button"
                onClick={() => handleRemovePet(pet.id)}
                className="text-ink-light hover:text-terracotta-dark"
                aria-label={`${pet.name} entfernen`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddPet} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pet-name" className={labelStyles}>
              Name des Tieres
            </label>
            <input
              id="pet-name"
              value={petName}
              onChange={(event) => setPetName(event.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="pet-species" className={labelStyles}>
              Tierart
            </label>
            <input
              id="pet-species"
              value={petSpecies}
              onChange={(event) => setPetSpecies(event.target.value)}
              placeholder="z. B. Hund"
              className={inputStyles}
            />
          </div>
          <SecondaryButton type="submit" disabled={isSaving || !petName.trim()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Tier hinzufügen
          </SecondaryButton>
        </form>
      </section>

      <section>
        <h2 className="text-lg">Behandlungsverlauf ({patient.notes.length})</h2>
        <div className="mt-4 flex flex-col gap-3">
          {sortedNotes.map((note) => (
            <div key={note.id} className="rounded-xl2 bg-white p-4 ring-1 ring-beige-dark/40">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-forest">{formatDate(note.date)}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveNote(note.id)}
                  className="text-ink-light hover:text-terracotta-dark"
                  aria-label="Notiz löschen"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-ink">{note.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddNote} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="note-date" className={labelStyles}>
                Datum
              </label>
              <input
                id="note-date"
                type="date"
                value={noteDate}
                onChange={(event) => setNoteDate(event.target.value)}
                className={inputStyles}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="note-text" className={labelStyles}>
              Notiz
            </label>
            <textarea
              id="note-text"
              rows={3}
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="z. B. Verlauf, Beobachtungen, Wünsche für nächste Sitzung"
              className={inputStyles}
            />
          </div>
          <div>
            <SecondaryButton type="submit" disabled={isSaving || !noteText.trim()}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Notiz hinzufügen
            </SecondaryButton>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg">Termine ({patient.appointments.length})</h2>
        <div className="mt-4 flex flex-col gap-2">
          {sortedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3 ring-1 ${
                appointment.completed
                  ? "bg-beige/60 ring-beige-dark/40"
                  : "bg-white ring-beige-dark/40"
              }`}
            >
              <div className={appointment.completed ? "text-ink-light line-through" : "text-ink"}>
                <span className="font-medium">
                  {formatDate(appointment.date)}
                  {appointment.time ? `, ${appointment.time} Uhr` : ""}
                </span>
                {appointment.note ? <span> – {appointment.note}</span> : null}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleAppointment(appointment.id)}
                  className="text-ink-light hover:text-forest"
                  aria-label={
                    appointment.completed ? "Als offen markieren" : "Als erledigt markieren"
                  }
                  title={appointment.completed ? "Als offen markieren" : "Als erledigt markieren"}
                >
                  {appointment.completed ? (
                    <Undo2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveAppointment(appointment.id)}
                  className="text-ink-light hover:text-terracotta-dark"
                  aria-label="Termin löschen"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddAppointment} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="appointment-date" className={labelStyles}>
              Datum
            </label>
            <input
              id="appointment-date"
              type="date"
              required
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="appointment-time" className={labelStyles}>
              Uhrzeit (optional)
            </label>
            <input
              id="appointment-time"
              type="time"
              value={appointmentTime}
              onChange={(event) => setAppointmentTime(event.target.value)}
              className={inputStyles}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="appointment-note" className={labelStyles}>
              Notiz (optional)
            </label>
            <input
              id="appointment-note"
              value={appointmentNote}
              onChange={(event) => setAppointmentNote(event.target.value)}
              placeholder="z. B. Nachfolgebehandlung"
              className={inputStyles}
            />
          </div>
          <SecondaryButton type="submit" disabled={isSaving || !appointmentDate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Termin hinzufügen
          </SecondaryButton>
        </form>
      </section>

      <section className="rounded-xl2 border border-terracotta-dark/30 p-6">
        <h2 className="text-lg text-terracotta-dark">Patient/in löschen</h2>
        <p className="mt-1 text-sm text-ink-light">
          Entfernt alle Kontaktdaten, Tiere, Notizen und Termine dieser Person unwiderruflich.
        </p>
        <button
          type="button"
          onClick={handleDeletePatient}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-terracotta-dark/40 px-5 py-2.5 text-sm font-medium text-terracotta-dark transition-colors hover:bg-terracotta-dark/10"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Endgültig löschen
        </button>
      </section>
    </div>
  );
}
