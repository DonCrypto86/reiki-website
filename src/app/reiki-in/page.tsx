import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { getLandingPagesByCategory, landingPagePath } from "@/config/landingPages";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki in Ihrer Region – Bern, Laupen, Murten, Kerzers, Mühleberg",
  description:
    "Reiki für Menschen und Tiere in der Region um Gümmenen: Übersicht der Orte, in denen Hausbesuche möglich sind.",
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
          <h1>Reiki in Ihrer Region</h1>
          <p className="mt-4 text-ink-light">
            Mein Reiki Studio liegt in Gümmenen im Raum Bern. Für Menschen und Tiere in den
            umliegenden Orten sind neben Anwendungen im Studio auch Hausbesuche möglich. Wählen Sie
            Ihren Ort für weitere Details.
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

      <CallToActionSection
        heading="Ihr Ort ist nicht dabei?"
        text="Auch darüber hinaus sind Hausbesuche oder eine Fernbehandlung möglich – fragen Sie unverbindlich an."
        ctaLabel="Erstgespräch anfragen"
        href="/kontakt"
      />
    </>
  );
}
