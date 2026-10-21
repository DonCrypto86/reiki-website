"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Gutschein-Popup auf der Startseite. Erscheint bei jedem Laden der Startseite.
 * Das Bild (inkl. Button-Grafik) führt zum Kontaktformular. Schliessen per X,
 * Klick auf den Hintergrund oder Escape.
 */
export default function GutscheinPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reiki-Gutscheine verschenken"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative aspect-square"
        style={{ width: "min(92vw, 88dvh, 560px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Schliessen"
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-md hover:bg-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <Link
          href="/kontakt"
          onClick={() => setOpen(false)}
          aria-label="Jetzt Gutschein anfragen – zum Kontaktformular"
          className="block h-full w-full overflow-hidden rounded-2xl shadow-2xl"
        >
          <picture>
            <source srcSet="/images/gutschein-popup.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/gutschein-popup.jpg"
              alt="Wohlbefinden verschenken – Reiki-Gutscheine für Mensch und Tier. Jetzt Gutschein anfragen."
              className="h-full w-full object-cover"
            />
          </picture>
        </Link>
      </div>
    </div>
  );
}
