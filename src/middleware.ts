import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionCookie } from "@/lib/adminAuth";

/**
 * Schützt das Erfahrungsberichte-Admin-Tool: Ohne gültige Sitzung wird auf
 * die Login-Seite umgeleitet (bzw. bei API-Aufrufen ein 401 zurückgegeben).
 * Die Login-Seite und die Login-/Logout-API bleiben bewusst ausgenommen.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/erfahrungen-verwalten/login";
  const isLoginApi = pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await isValidSessionCookie(sessionCookie);

  if (valid) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const loginUrl = new URL("/erfahrungen-verwalten/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/erfahrungen-verwalten/:path*", "/api/admin/:path*"]
};
