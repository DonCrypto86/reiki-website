import { NextResponse } from "next/server";
import { addTestimonial, getAllTestimonials } from "@/lib/testimonialsStore";

export const runtime = "nodejs";

export async function GET() {
  const testimonials = await getAllTestimonials();
  // Neueste zuerst.
  const sorted = [...testimonials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ testimonials: sorted });
}

export async function POST(request: Request) {
  let body: { quote?: string; author?: string; context?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const quote = typeof body.quote === "string" ? body.quote.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  const context = typeof body.context === "string" ? body.context.trim() : "";

  if (!quote || !author || !context) {
    return NextResponse.json(
      { success: false, message: "Bitte Zitat, Name und Kontext ausfüllen." },
      { status: 422 }
    );
  }

  try {
    const created = await addTestimonial({ quote, author, context });
    return NextResponse.json({ success: true, testimonial: created });
  } catch (error) {
    console.error("[admin/testimonials] Fehler beim Speichern:", error);
    return NextResponse.json(
      { success: false, message: "Speichern ist derzeit nicht möglich." },
      { status: 500 }
    );
  }
}
