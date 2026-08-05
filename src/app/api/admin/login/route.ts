import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionCookieValue, verifyPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyPassword(password)) {
    return NextResponse.json(
      { success: false, message: "Passwort ist nicht korrekt." },
      { status: 401 }
    );
  }

  let sessionValue: string;
  try {
    sessionValue = await createSessionCookieValue();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Anmeldung ist derzeit nicht möglich (Serverkonfiguration fehlt)."
      },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}
