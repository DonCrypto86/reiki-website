import { NextResponse } from "next/server";
import { addPet } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  let body: { name?: string; species?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json(
      { success: false, message: "Bitte einen Namen angeben." },
      { status: 422 }
    );
  }

  try {
    const patient = await addPet(params.id, {
      name,
      species: typeof body.species === "string" ? body.species.trim() : ""
    });
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/pets] Fehler beim Anlegen:", error);
    return NextResponse.json(
      { success: false, message: "Speichern ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
