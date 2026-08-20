import { NextResponse } from "next/server";
import { deletePatient, getPatient, updatePatient, type Patient } from "@/lib/patientsStore";

export const runtime = "nodejs";

type UpdateBody = Partial<Omit<Patient, "id" | "createdAt" | "updatedAt">>;

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const patient = await getPatient(params.id);
  if (!patient) {
    return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
  }
  return NextResponse.json({ patient });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  let body: UpdateBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  try {
    const updated = await updatePatient(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient: updated });
  } catch (error) {
    console.error("[api/patienten/:id] Fehler beim Aktualisieren:", error);
    return NextResponse.json(
      { success: false, message: "Aktualisieren ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await deletePatient(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/patienten/:id] Fehler beim Löschen:", error);
    return NextResponse.json(
      { success: false, message: "Löschen ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
