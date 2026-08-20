import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Patienten verwalten",
  robots: {
    index: false,
    follow: false
  },
  // Ermöglicht das Installieren als App auf dem Homescreen (Android/Chrome)
  // bzw. das Verpacken als eigenständige Android-App via TWA/PWABuilder.
  // Siehe README, Abschnitt "Android-App für die Patienten-Verwaltung".
  manifest: "/manifest-patienten.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Patienten"
  }
};

/**
 * Internes Patienten-CRM für Petra. Bewusst nicht öffentlich verlinkt und
 * per robots-Metadaten sowie robots.ts von der Suchmaschinenindexierung
 * ausgeschlossen. Der Zugriffsschutz erfolgt über die Middleware
 * (eigenes Passwort, getrennt von /erfahrungen-verwalten).
 */
export default function PatientsAdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-beige/40">{children}</div>;
}
