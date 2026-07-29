"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { validateContactForm, hasErrors } from "@/lib/validation";
import type { ContactFormErrors, ContactFormValues } from "@/types";
import PrimaryButton from "@/components/ui/PrimaryButton";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  service: "",
  contactMethod: "egal",
  message: "",
  privacyConsent: false,
  animalName: "",
  animalSpecies: "",
  animalAge: "",
  visitType: "",
  hasVoucherCode: false,
  website: ""
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldWrapper = "flex flex-col gap-1.5";
const inputStyles =
  "w-full rounded-lg border border-beige-dark bg-cream-light px-4 py-3 text-ink placeholder:text-ink-light/70 focus-visible:outline-none";
const labelStyles = "text-sm font-medium text-ink";
const errorStyles = "text-sm text-terracotta-dark";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className={errorStyles}>
      {message}
    </p>
  );
}

/**
 * Kontaktformular mit client- und serverseitiger Validierung, Honeypot-Feld
 * gegen einfache Spam-Anfragen, Lade- und Erfolgszustand. Die tatsächliche
 * Zustellung übernimmt die API-Route /api/kontakt (siehe src/lib/contact.ts).
 */
export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const isAnimalRequest = values.subject === "tier";

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientErrors = validateContactForm(values);
    setErrors(clientErrors);

    if (hasErrors(clientErrors)) {
      setState("error");
      setServerMessage(null);
      return;
    }

    setState("submitting");
    setServerMessage(null);

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.set(key, typeof value === "boolean" ? (value ? "on" : "") : String(value));
      });

      const response = await fetch("/api/kontakt", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setState("success");
        setValues(initialValues);
        setErrors({});
      } else {
        setState("error");
        if (result.errors) {
          setErrors(result.errors);
        }
        setServerMessage(
          result.message ?? "Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut."
        );
      }
    } catch {
      setState("error");
      setServerMessage(
        "Die Nachricht konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung oder schreiben Sie mir direkt per E-Mail."
      );
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl2 bg-sage-50 p-6 text-ink ring-1 ring-sage-200"
      >
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-sage-600" aria-hidden="true" />
        <p>{siteConfig.contactPage.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot-Feld: für Menschen unsichtbar, für einfache Bots eine
          verlockende Falle. Muss immer leer bleiben. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Bitte freilassen</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {serverMessage ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl2 bg-terracotta-light/20 p-4 text-sm text-ink ring-1 ring-terracotta/40"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta-dark" aria-hidden="true" />
          <p>{serverMessage}</p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldWrapper}>
          <label htmlFor="name" className={labelStyles}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputStyles}
          />
          <ErrorText id="name-error" message={errors.name} />
        </div>

        <div className={fieldWrapper}>
          <label htmlFor="email" className={labelStyles}>
            E-Mail-Adresse <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputStyles}
          />
          <ErrorText id="email-error" message={errors.email} />
        </div>

        <div className={fieldWrapper}>
          <label htmlFor="phone" className={labelStyles}>
            Telefonnummer <span className="font-normal text-ink-light">(optional, für Rückruf)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputStyles}
          />
          <ErrorText id="phone-error" message={errors.phone} />
        </div>

        <div className={fieldWrapper}>
          <label htmlFor="service" className={labelStyles}>
            Gewünschte Leistung <span className="font-normal text-ink-light">(optional)</span>
          </label>
          <input
            id="service"
            name="service"
            type="text"
            placeholder="z. B. Reiki-Anwendung, ca. 60 Minuten"
            value={values.service}
            onChange={(event) => updateField("service", event.target.value)}
            className={inputStyles}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelStyles}>
          Anfrage betrifft <span aria-hidden="true">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {(
            [
              { value: "mensch", label: "Mensch" },
              { value: "tier", label: "Tier" },
              { value: "gutschein", label: "Gutschein verschenken" }
            ] as const
          ).map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-ink">
              <input
                type="radio"
                name="subject"
                value={option.value}
                checked={values.subject === option.value}
                onChange={() => updateField("subject", option.value)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="h-5 w-5"
              />
              {option.label}
            </label>
          ))}
        </div>
        <ErrorText id="subject-error" message={errors.subject} />
      </fieldset>

      {isAnimalRequest ? (
        <div className="grid gap-6 rounded-xl2 bg-beige p-5 sm:grid-cols-2">
          <div className={fieldWrapper}>
            <label htmlFor="animalName" className={labelStyles}>
              Name des Tieres <span className="font-normal text-ink-light">(optional)</span>
            </label>
            <input
              id="animalName"
              name="animalName"
              type="text"
              value={values.animalName}
              onChange={(event) => updateField("animalName", event.target.value)}
              className={inputStyles}
            />
          </div>

          <div className={fieldWrapper}>
            <label htmlFor="animalSpecies" className={labelStyles}>
              Tierart <span className="font-normal text-ink-light">(optional)</span>
            </label>
            <input
              id="animalSpecies"
              name="animalSpecies"
              type="text"
              placeholder="z. B. Hund, Katze, Pferd"
              value={values.animalSpecies}
              onChange={(event) => updateField("animalSpecies", event.target.value)}
              className={inputStyles}
            />
          </div>

          <div className={fieldWrapper}>
            <label htmlFor="animalAge" className={labelStyles}>
              Alter des Tieres <span className="font-normal text-ink-light">(optional)</span>
            </label>
            <input
              id="animalAge"
              name="animalAge"
              type="text"
              value={values.animalAge}
              onChange={(event) => updateField("animalAge", event.target.value)}
              className={inputStyles}
            />
          </div>
        </div>
      ) : null}

      {values.subject === "mensch" || values.subject === "tier" ? (
        <fieldset>
          <legend className={labelStyles}>Praxisbesuch oder Hausbesuch</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {(["praxis", "hausbesuch"] as const).map((option) => (
              <label key={option} className="flex items-center gap-2 text-ink">
                <input
                  type="radio"
                  name="visitType"
                  value={option}
                  checked={values.visitType === option}
                  onChange={() => updateField("visitType", option)}
                  className="h-5 w-5"
                />
                {option === "praxis" ? "Praxisbesuch" : "Hausbesuch"}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className={fieldWrapper}>
        <label className="flex items-center gap-3 text-ink">
          <input
            type="checkbox"
            name="hasVoucherCode"
            checked={values.hasVoucherCode}
            onChange={(event) => updateField("hasVoucherCode", event.target.checked)}
            className="h-5 w-5 shrink-0"
          />
          <span>Hast du einen Gutschein?</span>
        </label>
      </div>

      <fieldset>
        <legend className={labelStyles}>Bevorzugte Kontaktart</legend>
        <div className="mt-2 flex flex-wrap gap-6">
          {(
            [
              { value: "email", label: "E-Mail" },
              { value: "telefon", label: "Telefon" },
              { value: "egal", label: "Egal" }
            ] as const
          ).map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-ink">
              <input
                type="radio"
                name="contactMethod"
                value={option.value}
                checked={values.contactMethod === option.value}
                onChange={() => updateField("contactMethod", option.value)}
                className="h-5 w-5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={fieldWrapper}>
        <label htmlFor="message" className={labelStyles}>
          Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputStyles}
        />
        <ErrorText id="message-error" message={errors.message} />
      </div>

      <div className={fieldWrapper}>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={values.privacyConsent}
            onChange={(event) => updateField("privacyConsent", event.target.checked)}
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={errors.privacyConsent ? "privacy-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0"
          />
          <span>
            Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.
            Weitere Informationen in der{" "}
            <a href="/datenschutz" className="underline hover:text-forest">
              Datenschutzerklärung
            </a>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        <ErrorText id="privacy-error" message={errors.privacyConsent} />
      </div>

      <PrimaryButton type="submit" disabled={state === "submitting"} className="sm:self-start">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Wird gesendet …
          </>
        ) : (
          siteConfig.contactPage.submitLabel
        )}
      </PrimaryButton>
    </form>
  );
}
