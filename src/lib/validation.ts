import type { ContactFormErrors, ContactFormValues } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validiert die Kontaktformular-Werte. Wird sowohl clientseitig (zur
 * Benutzerführung) als auch serverseitig (verbindlich) aufgerufen, damit
 * beide Seiten exakt dieselben Regeln verwenden.
 */
export function validateContactForm(
  values: ContactFormValues
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen ein.";
  }

  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (values.subject !== "mensch" && values.subject !== "tier" && values.subject !== "gutschein") {
    errors.subject = "Bitte wählen Sie aus, worum es bei Ihrer Anfrage geht.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message =
      "Bitte beschreiben Sie Ihr Anliegen in mindestens wenigen Worten (mind. 10 Zeichen).";
  }

  if (values.message && values.message.trim().length > 2000) {
    errors.message = "Ihre Nachricht ist zu lang (maximal 2000 Zeichen).";
  }

  if (!values.privacyConsent) {
    errors.privacyConsent =
      "Bitte stimmen Sie der Verarbeitung Ihrer Daten gemäß Datenschutzerklärung zu.";
  }

  if (values.phone && values.phone.trim().length > 0) {
    const phoneDigits = values.phone.replace(/[^0-9+]/g, "");
    if (phoneDigits.length < 5) {
      errors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
    }
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
