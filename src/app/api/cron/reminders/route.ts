import { NextResponse } from "next/server";
import { sendDailyReminders } from "@/lib/reminderMail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Wird täglich automatisch von einem Vercel Cron Job aufgerufen (siehe
 * vercel.json). Der optionale CRON_SECRET-Header (von Vercel automatisch
 * mitgeschickt, sobald die Umgebungsvariable gesetzt ist) verhindert, dass
 * diese Route von aussen missbraucht werden kann.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, message: "Nicht autorisiert." }, { status: 401 });
    }
  }

  try {
    const result = await sendDailyReminders();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[api/cron/reminders] Unerwarteter Fehler:", error);
    return NextResponse.json(
      { success: false, message: "Fehler beim Versand der Erinnerungen." },
      { status: 500 }
    );
  }
}
