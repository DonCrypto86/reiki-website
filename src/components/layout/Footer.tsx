import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

/**
 * Footer mit Praxisname, Kurzbeschreibung, Kontaktinformationen,
 * Navigationslinks, rechtlichen Links, Social-Media-Platzhaltern und
 * dynamischem Copyright-Jahr.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige-dark bg-beige">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold text-forest">{siteConfig.practiceName}</p>
          <p className="mt-3 text-sm text-ink-light">{siteConfig.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-forest">Kontakt</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-forest">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-forest">
                {siteConfig.contact.phoneReadable}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                {siteConfig.address.city}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-forest">Navigation</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            {siteConfig.mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-forest">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-forest">Weitere Seiten</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            {siteConfig.footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-forest">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-beige-dark">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-light sm:flex-row">
          <p>
            © {year} {siteConfig.practiceName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-forest">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-forest">
              Datenschutz
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
