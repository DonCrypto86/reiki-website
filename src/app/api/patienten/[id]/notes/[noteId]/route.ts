import { NextResponse } from "next/server";
import { removeNote, updateNote } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  let body: { date?: string; text?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const patch: { date?: string; text?: string } = {};
  if (typeof body.date === "string" && body.date) patch.date = body.date;
  if (typeof body.text === "string" && body.text.trim()) patch.text = body.text.trim();

  try {
    const patient = await updateNote(params.id, params.noteId, patch);
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/notes/:noteId] Fehler beim Aktualisieren:", error);
    return NextResponse.json(
      { success: false, message: "Aktualisieren ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; noteId: string } }
) {
  try {
    const patient = await removeNote(params.id, params.noteId);
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/notes/:noteId] Fehler beim Löschen:", error);
    return NextResponse.json(
      { success: false, message: "Löschen ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
