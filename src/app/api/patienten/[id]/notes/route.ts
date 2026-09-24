import { NextResponse } from "next/server";
import { addNote } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  let body: { date?: string; text?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json(
      { success: false, message: "Bitte einen Notiztext angeben." },
      { status: 422 }
    );
  }

  const date =
    typeof body.date === "string" && body.date ? body.date : new Date().toISOString().slice(0, 10);

  try {
    const patient = await addNote(params.id, { date, text });
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/notes] Fehler beim Anlegen:", error);
    return NextResponse.json(
      { success: false, message: "Speichern ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
