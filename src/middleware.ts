import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookieName, isValidSessionCookie, type AdminApp } from "@/lib/adminAuth";

/**
 * Schützt die beiden internen Admin-Tools:
 * - /erfahrungen-verwalten (+ /api/admin/*)
 * - /patienten-verwalten (+ /api/patienten/*)
 * Jeweils mit eigenem Passwort/Sitzungs-Cookie. Ohne gültige Sitzung wird
 * auf die passende Login-Seite umgeleitet bzw. bei API-Aufrufen ein 401
 * zurückgegeben. Die Login-/Logout-Routen bleiben ausgenommen.
 */

type ProtectedArea = {
  app: AdminApp;
  pagePrefix: string;
  loginPage: string;
  apiPrefix: string;
  loginApiPrefix: string;
};

const AREAS: ProtectedArea[] = [
  {
    app: "testimonials",
    pagePrefix: "/erfahrungen-verwalten",
    loginPage: "/erfahrungen-verwalten/login",
    apiPrefix: "/api/admin",
    loginApiPrefix: "/api/admin/login"
  },
  {
    app: "patients",
    pagePrefix: "/patienten-verwalten",
    loginPage: "/patienten-verwalten/login",
    apiPrefix: "/api/patienten",
    loginApiPrefix: "/api/patienten-auth/login"
  }
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const area = AREAS.find(
    (candidate) =>
      pathname.startsWith(candidate.pagePrefix) || pathname.startsWith(candidate.apiPrefix)
  );

  if (!area) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === area.loginPage;
  const isLoginApi = pathname.startsWith(area.loginApiPrefix);

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(getSessionCookieName(area.app))?.value;
  const valid = await isValidSessionCookie(area.app, sessionCookie);

  if (valid) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const loginUrl = new URL(area.loginPage, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/erfahrungen-verwalten/:path*",
    "/api/admin/:path*",
    "/patienten-verwalten/:path*",
    "/api/patienten/:path*",
    "/api/patienten-auth/:path*"
  ]
};
