import type { Patient } from "@/lib/patientsStore";

/**
 * Reine Berechnungslogik für Erinnerungen (Termine & Geburtstage), getrennt
 * vom E-Mail-Versand (siehe reminderMail.ts) und vom Datenzugriff (siehe
 * patientsStore.ts), damit sie sich unabhängig testen lässt.
 */

export type AppointmentReminder = {
  patientName: string;
  date: string;
  time?: string;
  note?: string;
};

export type BirthdayReminder = {
  patientName: string;
  birthDate: string;
  turningAge: number | null;
};

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Termine, die morgen (bezogen auf `referenceDate`, Standard: heute)
 * stattfinden und noch nicht als erledigt markiert sind.
 */
export function getAppointmentReminders(
  patients: Patient[],
  referenceDate: Date = new Date()
): AppointmentReminder[] {
  const tomorrow = toIsoDate(addDays(referenceDate, 1));
  const reminders: AppointmentReminder[] = [];

  for (const patient of patients) {
    for (const appointment of patient.appointments) {
      if (appointment.completed) continue;
      if (appointment.date !== tomorrow) continue;
      reminders.push({
        patientName: patient.name,
        date: appointment.date,
        time: appointment.time,
        note: appointment.note
      });
    }
  }

  return reminders.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
}

/**
 * Geburtstage, die morgen (bezogen auf `referenceDate`, Standard: heute)
 * stattfinden – unabhängig vom Geburtsjahr, verglichen wird nur Tag/Monat.
 */
export function getBirthdayReminders(
  patients: Patient[],
  referenceDate: Date = new Date()
): BirthdayReminder[] {
  const tomorrow = addDays(referenceDate, 1);
  const tomorrowMonthDay = `${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(
    tomorrow.getDate()
  ).padStart(2, "0")}`;

  const reminders: BirthdayReminder[] = [];

  for (const patient of patients) {
    if (!patient.birthDate || patient.birthDate.length < 10) continue;
    const monthDay = patient.birthDate.slice(5, 10); // "MM-DD" aus "YYYY-MM-DD"
    if (monthDay !== tomorrowMonthDay) continue;

    const birthYear = Number(patient.birthDate.slice(0, 4));
    const turningAge = Number.isFinite(birthYear) ? tomorrow.getFullYear() - birthYear : null;

    reminders.push({ patientName: patient.name, birthDate: patient.birthDate, turningAge });
  }

  return reminders;
}
