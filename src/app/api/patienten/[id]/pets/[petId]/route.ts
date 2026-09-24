import { NextResponse } from "next/server";
import { removePet } from "@/lib/patientsStore";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; petId: string } }
) {
  try {
    const patient = await removePet(params.id, params.petId);
    if (!patient) {
      return NextResponse.json({ success: false, message: "Nicht gefunden." }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  } catch (error) {
    console.error("[api/patienten/:id/pets/:petId] Fehler beim Löschen:", error);
    return NextResponse.json(
      { success: false, message: "Löschen ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
