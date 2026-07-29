import { NextResponse } from "next/server";
import type { ContactActionResult, ContactFormValues } from "@/types";
import { validateContactForm, hasErrors } from "@/lib/validation";
import { sendContactMessage } from "@/lib/contact";

export const runtime = "nodejs";

function toStringField(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request): Promise<NextResponse<ContactActionResult>> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      {
        success: false,
        errors: {},
        message: "Die Anfrage konnte nicht gelesen werden. Bitte versuchen Sie es erneut."
      },
      { status: 400 }
    );
  }

  const values: ContactFormValues = {
    name: toStringField(formData.get("name")).trim(),
    email: toStringField(formData.get("email")).trim(),
    phone: toStringField(formData.get("phone")).trim(),
    subject: (toStringField(formData.get("subject")) as ContactFormValues["subject"]) || "",
    service: toStringField(formData.get("service")).trim(),
    contactMethod:
      (toStringField(formData.get("contactMethod")) as ContactFormValues["contactMethod"]) ||
      "egal",
    message: toStringField(formData.get("message")).trim(),
    privacyConsent: toStringField(formData.get("privacyConsent")) === "on",
    animalName: toStringField(formData.get("animalName")).trim(),
    animalSpecies: toStringField(formData.get("animalSpecies")).trim(),
    animalAge: toStringField(formData.get("animalAge")).trim(),
    visitType: (toStringField(formData.get("visitType")) as ContactFormValues["visitType"]) || "",
    hasVoucherCode: toStringField(formData.get("hasVoucherCode")) === "on",
    website: toStringField(formData.get("website"))
  };

  // Honeypot: Wird dieses versteckte Feld befüllt, handelt es sich fast
  // sicher um einen Bot. Wir täuschen einen normalen Erfolg vor, ohne die
  // Nachricht tatsächlich zu versenden, damit Bots keine Rückschlüsse ziehen.
  if (values.website.trim().length > 0) {
    return NextResponse.json({
      success: true,
      message: "Vielen Dank für Ihre Nachricht. Ich melde mich persönlich bei Ihnen zurück."
    });
  }

  const errors = validateContactForm(values);

  if (hasErrors(errors)) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  try {
    const result = await sendContactMessage(values);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: {},
          message:
            "Ihre Nachricht konnte derzeit nicht versendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie mir direkt per E-Mail."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vielen Dank für Ihre Nachricht. Ich melde mich persönlich bei Ihnen zurück."
    });
  } catch {
    // Absichtlich keine Rohdaten aus `values` loggen.
    console.error("[Kontaktformular] Unerwarteter Fehler beim Versand.");
    return NextResponse.json(
      {
        success: false,
        errors: {},
        message: "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut."
      },
      { status: 500 }
    );
  }
}
