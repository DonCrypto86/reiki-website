import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { getAllPatients } from "@/lib/patientsStore";
import {
  getAppointmentReminders,
  getBirthdayReminders,
  type AppointmentReminder,
  type BirthdayReminder
} from "@/lib/reminders";

/**
 * Verschickt (bei Bedarf) eine tägliche Erinnerungs-E-Mail an Petra mit
 * morgigen Terminen und Geburtstagen. Wird von /api/cron/reminders über
 * einen Vercel Cron Job täglich automatisch aufgerufen (siehe vercel.json).
 *
 * Benötigt dieselbe Konfiguration wie das Kontaktformular (RESEND_API_KEY,
 * optional CONTACT_FROM_EMAIL). Der Empfänger lässt sich über
 * PATIENTS_REMINDER_EMAIL überschreiben, sonst wird die allgemeine
 * Kontaktadresse der Praxis verwendet.
 */

function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function buildEmailText(
  appointments: AppointmentReminder[],
  birthdays: BirthdayReminder[]
): string {
  const lines: string[] = [];

  if (appointments.length > 0) {
    lines.push("Termine morgen:");
    for (const appointment of appointments) {
      const time = appointment.time ? `, ${appointment.time} Uhr` : "";
      const note = appointment.note ? ` – ${appointment.note}` : "";
      lines.push(`- ${appointment.patientName}: ${formatDate(appointment.date)}${time}${note}`);
    }
    lines.push("");
  }

  if (birthdays.length > 0) {
    lines.push("Geburtstage morgen:");
    for (const birthday of birthdays) {
      const age = birthday.turningAge !== null ? ` (wird ${birthday.turningAge})` : "";
      lines.push(`- ${birthday.patientName}${age}`);
    }
    lines.push("");
  }

  lines.push("Diese Erinnerung wurde automatisch von der Patienten-Verwaltung verschickt.");

  return lines.join("\n");
}

export type ReminderResult = {
  sent: boolean;
  appointmentCount: number;
  birthdayCount: number;
  reason?: string;
};

export async function sendDailyReminders(): Promise<ReminderResult> {
  const patients = await getAllPatients();
  const appointments = getAppointmentReminders(patients);
  const birthdays = getBirthdayReminders(patients);

  if (appointments.length === 0 && birthdays.length === 0) {
    return { sent: false, appointmentCount: 0, birthdayCount: 0, reason: "Nichts zu erinnern." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Erinnerungen] Kein E-Mail-Anbieter konfiguriert (RESEND_API_KEY fehlt).");
    return {
      sent: false,
      appointmentCount: appointments.length,
      birthdayCount: birthdays.length,
      reason: "RESEND_API_KEY fehlt."
    };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL || "Reiki Studio Website <onboarding@resend.dev>";
    const recipient = process.env.PATIENTS_REMINDER_EMAIL || siteConfig.contact.email;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      subject: "Erinnerung: Termine & Geburtstage morgen",
      text: buildEmailText(appointments, birthdays)
    });

    if (error) {
      console.error("[Erinnerungen] Resend-Fehler beim Versand:", error.name, error.message);
      return {
        sent: false,
        appointmentCount: appointments.length,
        birthdayCount: birthdays.length,
        reason: error.message
      };
    }

    return { sent: true, appointmentCount: appointments.length, birthdayCount: birthdays.length };
  } catch (err) {
    console.error(
      "[Erinnerungen] Unerwarteter Fehler beim Versand über Resend:",
      err instanceof Error ? err.message : err
    );
    return {
      sent: false,
      appointmentCount: appointments.length,
      birthdayCount: birthdays.length,
      reason: "Unerwarteter Fehler."
    };
  }
}
