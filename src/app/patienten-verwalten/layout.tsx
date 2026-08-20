import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Patienten verwalten",
  robots: {
    index: false,
    follow: false
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
