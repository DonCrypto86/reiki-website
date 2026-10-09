"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./WeihnachtsPopup.css";

/**
 * Weihnachts-Aktions-Pop-up für die Startseite. Öffnet sich bewusst bei
 * jedem Laden/Neuladen der Startseite (kein localStorage-Merker à la "nicht
 * mehr anzeigen"), wie von Petra/Mike gewünscht. Ursprünglich als
 * statisches HTML/CSS/JS-Snippet geliefert (siehe weihnachts-reiki-popup.zip)
 * und hier 1:1 ins bestehende React/Tailwind-Setup portiert.
 */

const GUTSCHEIN_URL = "/kontakt";

export default function WeihnachtsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("reiki-popup-is-open");
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else {
      document.body.classList.remove("reiki-popup-is-open");
      previouslyFocused.current?.focus?.();
    }

    return () => {
      document.body.classList.remove("reiki-popup-is-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function getFocusableElements(): HTMLElement[] {
      const dialog = dialogRef.current;
      if (!dialog) return [];
      return [
        ...dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ].filter((element) => !element.hidden);
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key === "Tab") {
        const focusable = getFocusableElements();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  return (
    <div className="reiki-popup" hidden={!isOpen}>
      <div className="reiki-popup__backdrop" onClick={() => setIsOpen(false)} />

      <section
        ref={dialogRef}
        className="reiki-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reiki-popup-title"
        aria-describedby="reiki-popup-description"
        tabIndex={-1}
      >
        <h2 className="reiki-popup__visually-hidden" id="reiki-popup-title">
          Weihnachts-Gutschein für eine Reiki-Behandlung
        </h2>
        <p className="reiki-popup__visually-hidden" id="reiki-popup-description">
          Schenke Wohlbefinden, Ruhe und eine besondere Auszeit für Menschen und ihre tierischen
          Begleiter.
        </p>

        <button
          className="reiki-popup__close"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Pop-up schliessen"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="reiki-popup__image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="reiki-popup__image"
            src="/images/weihnachts-reiki-gutschein.png"
            alt="Weihnachtliches Reiki-Gutscheinmotiv für Menschen, Hunde und Katzen"
            width={1254}
            height={1254}
          />

          {/* Transparente klickbare Fläche exakt über dem roten Button im Bild. */}
          <Link
            className="reiki-popup__cta-hotspot"
            href={GUTSCHEIN_URL}
            aria-label="Jetzt Reiki-Gutschein sichern"
          />
        </div>
      </section>
    </div>
  );
}
