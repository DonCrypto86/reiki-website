import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";

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

        <div className="prose-content mt-8 space-y-6 text-ink-light">
          <div>
            <h2 className="text-xl text-forest">Angaben gemäss Art. 3 UWG</h2>
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
            <p className="mt-2">
              E-Mail: {siteConfig.contact.email}
              <br />
              Telefon: {siteConfig.contact.phoneReadable}
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Verantwortlich für den Inhalt dieser Website</h2>
            <p className="mt-2">{siteConfig.legal.contentResponsible}</p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Technische Umsetzung</h2>
            <p className="mt-2">
              Michael Iseli
              <br />
              <a
                href="https://michael-iseli.online"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                michael-iseli.online
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Haftung für Inhalte</h2>
            <p className="mt-2">
              Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
              übernommen werden. Insbesondere ersetzen die Inhalte dieser Website keine
              medizinische, tierärztliche oder psychotherapeutische Beratung.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Haftung für Links</h2>
            <p className="mt-2">
              Diese Website enthält Links zu externen Websites Dritter (z. B. Google Maps), auf
              deren Inhalte kein Einfluss besteht. Für diese fremden Inhalte kann daher keine
              Gewähr übernommen werden; hierfür ist stets der jeweilige Anbieter der verlinkten
              Seite verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">Urheberrecht</h2>
            <p className="mt-2">
              Die auf dieser Website veröffentlichten Inhalte, Texte und Bilder unterliegen dem
              Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verwendung ausserhalb der
              Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
