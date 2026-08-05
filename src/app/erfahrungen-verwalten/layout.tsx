import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Erfahrungsberichte verwalten",
  robots: {
    index: false,
    follow: false
  }
};

/**
 * Internes Admin-Tool für Petra, um Erfahrungsberichte selbst zu verwalten.
 * Bewusst nicht in der Hauptnavigation verlinkt und per robots-Metadaten
 * sowie robots.ts von der Suchmaschinenindexierung ausgeschlossen. Der
 * eigentliche Zugriffsschutz erfolgt über die Middleware (Passwort-Login).
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-beige/40">{children}</div>;
}
