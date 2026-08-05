import { NextResponse } from "next/server";
import { deleteTestimonial, setTestimonialPublished } from "@/lib/testimonialsStore";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  let body: { published?: boolean };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof body.published !== "boolean") {
    return NextResponse.json(
      { success: false, message: "Feld 'published' fehlt." },
      { status: 422 }
    );
  }

  try {
    await setTestimonialPublished(params.id, body.published);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/testimonials] Fehler beim Aktualisieren:", error);
    return NextResponse.json(
      { success: false, message: "Aktualisieren ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteTestimonial(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/testimonials] Fehler beim Löschen:", error);
    return NextResponse.json(
      { success: false, message: "Löschen ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
