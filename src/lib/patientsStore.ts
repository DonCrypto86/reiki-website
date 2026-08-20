import { randomUUID } from "crypto";
import { kvGetJson, kvSetJson } from "@/lib/kv";

/**
 * Kleines Patienten-CRM für Petra unter /patienten-verwalten. Enthält
 * Kontaktdaten, zugehörige Tiere (für Reiki für Tiere), einen einfachen
 * Behandlungsverlauf (Notizen) sowie kommende Termine.
 *
 * Achtung: Hier liegen unter Umständen besonders schützenswerte
 * Personendaten (Gesundheitsdaten). Der Zugriff ist passwortgeschützt
 * (eigenes Passwort, getrennt vom Erfahrungsberichte-Tool) und die Seite
 * ist von der Suchmaschinenindexierung ausgeschlossen (siehe robots.ts).
 */

export type Pet = {
  id: string;
  name: string;
  species: string;
};

export type SessionNote = {
  id: string;
  date: string; // ISO-Datum YYYY-MM-DD
  text: string;
};

export type Appointment = {
  id: string;
  date: string; // ISO-Datum YYYY-MM-DD
  time?: string; // HH:MM, optional
  note?: string;
  completed: boolean;
};

export type Patient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pets: Pet[];
  notes: SessionNote[];
  appointments: Appointment[];
  createdAt: string;
  updatedAt: string;
};

export type PatientInput = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

const STORAGE_KEY = "reiki:patients";

async function readAll(): Promise<Patient[]> {
  const stored = await kvGetJson<Patient[]>(STORAGE_KEY);
  return stored ?? [];
}

async function writeAll(patients: Patient[]): Promise<void> {
  await kvSetJson(STORAGE_KEY, patients);
}

export async function getAllPatients(): Promise<Patient[]> {
  return readAll();
}

export async function getPatient(id: string): Promise<Patient | null> {
  const all = await readAll();
  return all.find((patient) => patient.id === id) ?? null;
}

export async function createPatient(input: PatientInput): Promise<Patient> {
  const all = await readAll();
  const now = new Date().toISOString();
  const patient: Patient = {
    id: randomUUID(),
    name: input.name.trim(),
    phone: input.phone?.trim() ?? "",
    email: input.email?.trim() ?? "",
    address: input.address?.trim() ?? "",
    pets: [],
    notes: [],
    appointments: [],
    createdAt: now,
    updatedAt: now
  };
  await writeAll([patient, ...all]);
  return patient;
}

/**
 * Ersetzt die veränderbaren Felder eines Patienten vollständig (inkl. der
 * kompletten Listen für Tiere/Notizen/Termine). Bewusst einfach gehalten,
 * da nur eine Person (Petra) gleichzeitig auf das Tool zugreift.
 */
export async function updatePatient(
  id: string,
  patch: Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>
): Promise<Patient | null> {
  const all = await readAll();
  let updated: Patient | null = null;

  const next = all.map((patient) => {
    if (patient.id !== id) return patient;
    updated = {
      ...patient,
      ...patch,
      updatedAt: new Date().toISOString()
    };
    return updated;
  });

  if (!updated) return null;
  await writeAll(next);
  return updated;
}

export async function deletePatient(id: string): Promise<void> {
  const all = await readAll();
  await writeAll(all.filter((patient) => patient.id !== id));
}

export type UpcomingAppointment = {
  patientId: string;
  patientName: string;
  appointment: Appointment;
};

/** Kommende, noch nicht erledigte Termine über alle Patient:innen hinweg, sortiert nach Datum. */
export async function getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
  const all = await readAll();
  const today = new Date().toISOString().slice(0, 10);

  const upcoming: UpcomingAppointment[] = [];
  for (const patient of all) {
    for (const appointment of patient.appointments) {
      if (appointment.completed) continue;
      if (appointment.date < today) continue;
      upcoming.push({ patientId: patient.id, patientName: patient.name, appointment });
    }
  }

  return upcoming.sort((a, b) => {
    const dateCompare = a.appointment.date.localeCompare(b.appointment.date);
    if (dateCompare !== 0) return dateCompare;
    return (a.appointment.time ?? "").localeCompare(b.appointment.time ?? "");
  });
}
