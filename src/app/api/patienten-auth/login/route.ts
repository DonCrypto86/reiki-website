import { NextResponse } from "next/server";
import {
  createSessionCookieValue,
  getSessionCookieName,
  verifyPassword
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ungültige Anfrage." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyPassword("patients", password)) {
    return NextResponse.json(
      { success: false, message: "Passwort ist nicht korrekt." },
      { status: 401 }
    );
  }

  let sessionValue: string;
  try {
    sessionValue = await createSessionCookieValue("patients");
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
  response.cookies.set(getSessionCookieName("patients"), sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}
