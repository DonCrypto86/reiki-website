import { NextResponse } from "next/server";
import { createPatient, getAllPatients } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function GET() {
  const patients = await getAllPatients();
  const sorted = [...patients].sort((a, b) => a.name.localeCompare(b.name, "de-CH"));
  return NextResponse.json({ patients: sorted });
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    birthDate?: string;
    phone?: string;
    email?: string;
    street?: string;
    postalCode?: string;
    city?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json(
      { success: false, message: "Bitte mindestens einen Namen angeben." },
      { status: 422 }
    );
  }

  try {
    const patient = await createPatient({
      name,
      birthDate: typeof body.birthDate === "string" ? body.birthDate : "",
      phone: typeof body.phone === "string" ? body.phone : "",
      email: typeof body.email === "string" ? body.email : "",
      street: typeof body.street === "string" ? body.street : "",
      postalCode: typeof body.postalCode === "string" ? body.postalCode : "",
      city: typeof body.city === "string" ? body.city : ""
    });
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten] Fehler beim Anlegen:", error);
    return NextResponse.json(
      { success: false, message: "Speichern ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
