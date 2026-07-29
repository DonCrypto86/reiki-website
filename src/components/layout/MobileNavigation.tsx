"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import PrimaryButton from "@/components/ui/PrimaryButton";

/**
 * Mobiles Menü inklusive Bedien-Button. Schließt sich automatisch bei
 * Routenwechsel und ist vollständig per Tastatur bedienbar (natives
 * <button>-Element, Fokus bleibt im sichtbaren Bereich).
 */
export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-beige"
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="absolute inset-x-0 top-full z-40 border-t border-beige-dark bg-cream-light px-4 pb-6 pt-2 shadow-soft"
        >
          <nav aria-label="Mobile Hauptnavigation">
            <ul className="flex flex-col divide-y divide-beige-dark">
              {siteConfig.mainNav.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-4 text-base font-medium ${
                        isActive ? "text-forest" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <PrimaryButton href={siteConfig.header.ctaHref} className="mt-4 w-full">
            {siteConfig.header.ctaLabel}
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
