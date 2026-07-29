"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

/**
 * Hauptnavigation für Tablet/Desktop. Der aktuelle Menüpunkt wird sowohl
 * farblich als auch über aria-current gekennzeichnet (nicht nur farblich).
 */
export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Hauptnavigation" className="hidden xl:block">
      <ul className="flex items-center gap-5">
        {siteConfig.mainNav.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-200 hover:text-forest ${
                  isActive ? "text-forest underline decoration-terracotta decoration-2 underline-offset-8" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
