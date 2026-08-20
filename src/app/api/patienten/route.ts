import { NextResponse } from "next/server";
import { createPatient, getAllPatients } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function GET() {
  const patients = await getAllPatients();
  const sorted = [...patients].sort((a, b) => a.name.localeCompare(b.name, "de-CH"));
  return NextResponse.json({ patients: sorted });
}

export async function POST(request: Request) {
  let body: { name?: string; phone?: string; email?: string; address?: string };

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
      phone: typeof body.phone === "string" ? body.phone : "",
      email: typeof body.email === "string" ? body.email : "",
      address: typeof body.address === "string" ? body.address : ""
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
