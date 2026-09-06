import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { getLandingPagesByCategory, landingPagePath } from "@/config/landingPages";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki in der Nähe – Gümmenen, Bern, Köniz und weitere Orte",
  description:
    "Reiki in der Nähe gesucht? Übersicht der Orte rund um Gümmenen im Raum Bern, in denen Hausbesuche für Menschen und Tiere möglich sind.",
  path: "/reiki-in"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki in Ihrer Region", path: "/reiki-in" }
]);

export default function ReikiInOrtIndexPage() {
  const orte = getLandingPagesByCategory("ort");

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1>Reiki in Ihrer Region – schnell in der Nähe finden</h1>
          <p className="mt-4 text-ink-light">
            Sie suchen Reiki in der Nähe? Mein Reiki Studio befindet sich in{" "}
            {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
            {siteConfig.address.city} – einem ruhigen Standort im Kanton Bern, unweit der
            Kantonsgrenze zu Freiburg. Von dort aus begleite ich Menschen und Tiere nicht nur aus
            Gümmenen selbst, sondern auch aus zahlreichen Orten der weiteren Umgebung, etwa aus
            Bern, Köniz, Fribourg oder dem Seeland.
          </p>
          <p className="mt-4 text-ink-light">
            Je nachdem, was für Sie oder Ihr Tier angenehmer ist, findet eine Anwendung entweder im
            Studio in Gümmenen statt, oder ich komme im Rahmen eines Hausbesuchs gegen Aufpreis und
            Fahrkosten zu Ihnen. Ist auch das nicht möglich, biete ich schweizweit zusätzlich eine
            Fernbehandlung an. Wählen Sie unten Ihren Ort für lokale Details wie Anfahrt und
            Besonderheiten der jeweiligen Region.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orte.map((ort) => (
            <ServiceCard
              key={ort.slug}
              icon={<MapPin className="h-7 w-7" aria-hidden="true" />}
              title={ort.h1}
              text={ort.intro}
              ctaLabel="Mehr erfahren"
              href={landingPagePath(ort)}
            />
          ))}
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl">Mehr über mein Angebot</h2>
          <p className="mt-3 text-ink-light">
            Möchten Sie mehr über mich als Person, meine Arbeitsweise oder die Erfahrungen anderer
            Kundinnen und Kunden erfahren? Oder interessiert Sie der genaue Ablauf einer
            Reiki-Behandlung? Die folgenden Seiten geben Ihnen einen vertieften Einblick.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <SecondaryButton href="/ueber-mich" className="px-5 py-2 text-xs">
                Über mich
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/reiki-behandlung" className="px-5 py-2 text-xs">
                Ablauf einer Reiki-Behandlung
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/erfahrungen" className="px-5 py-2 text-xs">
                Erfahrungen
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/ablauf-preise" className="px-5 py-2 text-xs">
                Ablauf und Preise
              </SecondaryButton>
            </li>
          </ul>
        </Container>
      </section>

      <CallToActionSection
        heading="Ihr Ort ist nicht dabei?"
        text="Auch darüber hinaus sind Hausbesuche oder eine Fernbehandlung möglich – fragen Sie unverbindlich an."
        ctaLabel="Erstgespräch anfragen"
        href="/kontakt"
      />
    </>
  );
}
