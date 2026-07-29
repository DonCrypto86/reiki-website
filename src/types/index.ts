export type ContactSubject = "mensch" | "tier" | "gutschein";

export type ContactMethod = "email" | "telefon" | "egal";

export type AnimalVisitType = "praxis" | "hausbesuch";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject | "";
  service: string;
  contactMethod: ContactMethod;
  message: string;
  privacyConsent: boolean;
  animalName: string;
  animalSpecies: string;
  animalAge: string;
  visitType: AnimalVisitType | "";
  /** Gibt an, ob die anfragende Person einen Gutschein hat (wird bei der Terminbestätigung geprüft). */
  hasVoucherCode: boolean;
  /** Honeypot-Feld gegen einfache Spam-Bots. Muss immer leer bleiben. */
  website: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactActionResult =
  | { success: true; message: string }
  | { success: false; errors: ContactFormErrors; message?: string };
