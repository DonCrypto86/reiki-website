import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { ContactFormValues } from "@/types";

/**
 * Abstraktionsschicht für den Versand von Kontaktanfragen per E-Mail über
 * Resend (https://resend.com). Kontaktanfragen werden nirgends dauerhaft
 * gespeichert, sondern direkt per E-Mail weitergeleitet.
 *
 * Benötigte Umgebungsvariablen (lokal in .env.local, in Produktion in den
 * Vercel-Projekteinstellungen unter "Environment Variables"):
 * - CONTACT_EMAIL_PROVIDER=resend
 * - RESEND_API_KEY=<API-Key aus dem Resend-Dashboard>
 * - CONTACT_FROM_EMAIL (optional) – Absenderadresse, z. B.
 *   "Reiki Studio <kontakt@reiki-mensch-tier.ch>". Setzt eine bei Resend
 *   verifizierte Domain voraus. Ohne verifizierte Domain wird automatisch
 *   die Resend-Test-Absenderadresse "onboarding@resend.dev" verwendet
 *   (funktioniert sofort, wirkt aber weniger professionell im Posteingang).
 *
 * Im Entwicklungsmodus (npm run dev) wird zusätzlich immer eine strukturierte
 * Vorschau der Anfrage in der Server-Konsole ausgegeben.
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
 * Versendet eine Kontaktanfrage per E-Mail über Resend. Wirft bewusst keine
 * Rohdaten in Logs, die über das für die lokale Entwicklung sinnvolle Maß
 * hinausgehen.
 */
export async function sendContactMessage(
  values: ContactFormValues
): Promise<{ success: boolean }> {
  const isDev = process.env.NODE_ENV !== "production";
  const subjectLabel =
    values.subject === "tier" ? "Tier" : values.subject === "gutschein" ? "Gutschein verschenken" : "Mensch";

  if (isDev) {
    // Strukturierte Ausgabe ausschließlich für die lokale Entwicklung.
    console.info("[Kontaktformular] Neue Anfrage (nur Entwicklungsmodus):");
    console.info(buildPlainTextMessage(values));
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (isDev) {
      // Ohne API-Key gilt im Entwicklungsmodus jede Anfrage als
      // "erfolgreich versendet", damit lokal weiterentwickelt werden kann,
      // ohne einen echten Resend-Zugang zu benötigen.
      return { success: true };
    }

    console.error(
      "[Kontaktformular] Kein E-Mail-Anbieter konfiguriert (RESEND_API_KEY fehlt)."
    );
    return { success: false };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress = process.env.CONTACT_FROM_EMAIL || "Reiki Studio Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: siteConfig.contact.email,
      replyTo: values.email,
      subject: `Neue Anfrage über die Website (${subjectLabel})`,
      text: buildPlainTextMessage(values)
    });

    if (error) {
      // Absichtlich mit Details geloggt (nur serverseitig sichtbar, z. B. in
      // den Vercel-Logs) – hilft bei der Fehlersuche, ohne dem Besucher der
      // Website Interna preiszugeben.
      console.error("[Kontaktformular] Resend-Fehler beim Versand:", error.name, error.message);
      return { success: false };
    }

    return { success: true };
  } catch (err) {
    console.error(
      "[Kontaktformular] Unerwarteter Fehler beim Versand über Resend:",
      err instanceof Error ? err.message : err
    );
    return { success: false };
  }
}
