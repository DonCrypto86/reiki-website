import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung.",
  path: "/impressum"
});

export default function ImprintPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1>Impressum</h1>

        <LegalNotice className="mt-6">{siteConfig.legalPagesNotice}</LegalNotice>

        <div className="prose-content mt-8 space-y-6 text-ink-light">
          <div>
            <h2 className="text-xl text-forest">Anbieterkennzeichnung (Platzhalter)</h2>
            <p className="mt-2">
              {siteConfig.providerName}
              <br />
              {siteConfig.legal.legalForm}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              {siteConfig.address.country}
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Kontakt</h2>
            <p className="mt-2">E-Mail: {siteConfig.contact.email}</p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Handelsregister / Mehrwertsteuer</h2>
            <p className="mt-2">{siteConfig.legal.vatInfo}</p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Zuständige Behörde / Aufsicht</h2>
            <p className="mt-2">{siteConfig.legal.supervisoryAuthority}</p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Verantwortlich für den Inhalt dieser Website</h2>
            <p className="mt-2">{siteConfig.legal.contentResponsible}</p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Haftungshinweis</h2>
            <p className="mt-2">
              [PLATZHALTER: Übliche Haftungsausschlüsse für Inhalte und Links müssen von
              qualifizierter juristischer Seite geprüft und formuliert werden. Dieser Platzhalter
              stellt keine Rechtsberatung dar.]
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
