import { NextResponse } from "next/server";
import { removeAppointment, updateAppointment } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string; appointmentId: string } }
) {
  let body: { date?: string; time?: string; note?: string; completed?: boolean };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const patch: { date?: string; time?: string; note?: string; completed?: boolean } = {};
  if (typeof body.date === "string" && body.date) patch.date = body.date;
  if (typeof body.time === "string") patch.time = body.time || undefined;
  if (typeof body.note === "string") patch.note = body.note.trim() || undefined;
  if (typeof body.completed === "boolean") patch.completed = body.completed;

  try {
    const patient = await updateAppointment(params.id, params.appointmentId, patch);
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/appointments/:appointmentId] Fehler beim Aktualisieren:", error);
    return NextResponse.json(
      { success: false, message: "Aktualisieren ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; appointmentId: string } }
) {
  try {
    const patient = await removeAppointment(params.id, params.appointmentId);
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/appointments/:appointmentId] Fehler beim Löschen:", error);
    return NextResponse.json(
      { success: false, message: "Löschen ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
