import type { ContactFormValues } from "@/types";

/**
 * Abstraktionsschicht für den Versand von Kontaktanfragen.
 *
 * Es ist bewusst noch KEIN konkreter E-Mail-Anbieter angebunden. Im
 * Entwicklungsmodus wird die Anfrage strukturiert in der Server-Konsole
 * ausgegeben. Kontaktanfragen werden nirgends dauerhaft gespeichert.
 *
 * So bindest du später z. B. Resend oder Nodemailer an:
 *
 * --- Beispiel mit Resend ---
 * import { Resend } from "resend";
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * await resend.emails.send({
 *   from: "Website <kontakt@ihre-domain.de>",
 *   to: siteConfig.contact.email,
 *   replyTo: values.email,
 *   subject: `Neue Anfrage über die Website (${values.subject})`,
 *   text: buildPlainTextMessage(values),
 * });
 *
 * --- Beispiel mit Nodemailer (z. B. via SMTP) ---
 * import nodemailer from "nodemailer";
 * const transporter = nodemailer.createTransport({
 *   host: process.env.SMTP_HOST,
 *   port: Number(process.env.SMTP_PORT),
 *   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
 * });
 * await transporter.sendMail({
 *   from: process.env.SMTP_FROM,
 *   to: siteConfig.contact.email,
 *   replyTo: values.email,
 *   subject: `Neue Anfrage über die Website (${values.subject})`,
 *   text: buildPlainTextMessage(values),
 * });
 *
 * In beiden Fällen: API-Keys/Zugangsdaten ausschließlich über Umgebungsvariablen
 * (.env.local, niemals einchecken) einlesen und in README dokumentieren.
 */

function buildPlainTextMessage(values: ContactFormValues): string {
  const subjectLabel =
    values.subject === "tier" ? "Tier" : values.subject === "gutschein" ? "Gutschein verschenken" : "Mensch";

  const lines = [
    `Anfrage für: ${subjectLabel}`,
    `Name: ${values.name}`,
    `E-Mail: ${values.email}`,
    values.phone ? `Telefon (für Rückruf): ${values.phone}` : null,
    values.service ? `Gewünschte Leistung: ${values.service}` : null,
    `Bevorzugte Kontaktart: ${values.contactMethod}`,
    values.subject === "tier" && values.animalName
      ? `Name des Tieres: ${values.animalName}`
      : null,
    values.subject === "tier" && values.animalSpecies
      ? `Tierart: ${values.animalSpecies}`
      : null,
    values.subject === "tier" && values.animalAge
      ? `Alter des Tieres: ${values.animalAge}`
      : null,
    values.visitType
      ? `Praxisbesuch oder Hausbesuch: ${
          values.visitType === "hausbesuch" ? "Hausbesuch" : "Praxisbesuch"
        }`
      : null,
    values.hasVoucherCode ? "Hat einen Gutschein: Ja (wird bei der Terminbestätigung geprüft)" : null,
    "",
    "Nachricht:",
    values.message
  ];

  return lines.filter((line) => line !== null).join("\n");
}

/**
 * Versendet eine Kontaktanfrage. Wirft bewusst keine Rohdaten in Logs, die
 * über das für die lokale Entwicklung sinnvolle Maß hinausgehen.
 */
export async function sendContactMessage(
  values: ContactFormValues
): Promise<{ success: boolean }> {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // Strukturierte Ausgabe ausschließlich für die lokale Entwicklung.
    // In Produktion sollte hier stattdessen ein echter E-Mail-Versand erfolgen.
    console.info("[Kontaktformular] Neue Anfrage (nur Entwicklungsmodus):");
    console.info(buildPlainTextMessage(values));
  }

  // TODO: Hier echten E-Mail-Versand einbinden (siehe Beispiele oben),
  // sobald ein E-Mail-Anbieter ausgewählt wurde. Bis dahin gilt jede Anfrage
  // im Entwicklungsmodus als "erfolgreich versendet".

  if (!isDev) {
    // Verhindert, dass in einer produktiven Umgebung ohne konfigurierten
    // E-Mail-Versand fälschlich eine Erfolgsmeldung angezeigt wird.
    const emailServiceConfigured = Boolean(process.env.CONTACT_EMAIL_PROVIDER);
    if (!emailServiceConfigured) {
      console.error(
        "[Kontaktformular] Kein E-Mail-Anbieter konfiguriert (CONTACT_EMAIL_PROVIDER fehlt)."
      );
      return { success: false };
    }
  }

  return { success: true };
}
