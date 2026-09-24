import { NextResponse } from "next/server";
import { addAppointment } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  let body: { date?: string; time?: string; note?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const date = typeof body.date === "string" ? body.date : "";
  if (!date) {
    return NextResponse.json(
      { success: false, message: "Bitte ein Datum angeben." },
      { status: 422 }
    );
  }

  try {
    const patient = await addAppointment(params.id, {
      date,
      time: typeof body.time === "string" && body.time ? body.time : undefined,
      note: typeof body.note === "string" && body.note.trim() ? body.note.trim() : undefined,
      completed: false
    });
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/appointments] Fehler beim Anlegen:", error);
    return NextResponse.json(
      { success: false, message: "Speichern ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
