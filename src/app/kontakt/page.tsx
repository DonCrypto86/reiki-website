import type { Metadata } from "next";
import { Mail, MapPin, Clock, ExternalLink, TrainFront, Car } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Kontakt – Reiki in Gümmenen im Raum Bern",
  description:
    "Unverbindlich Kontakt aufnehmen für eine Reiki-Anwendung für Menschen oder Tiere im Reiki Studio in Gümmenen im Raum Bern.",
  path: "/kontakt"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Kontakt", path: "/kontakt" }
]);

export default function ContactPage() {
  const { contactPage } = siteConfig;

  return (
    <section className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        <div className="max-w-2xl">
          <h1>{contactPage.heading}</h1>
          <p className="mt-4 text-ink-light">{contactPage.intro}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-xl2 bg-beige p-6">
              <h2 className="text-xl">Kontaktdaten</h2>
              <ul className="mt-4 space-y-3 text-ink-light">
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-forest">
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </span>
                </li>
              </ul>
              <a
                href={siteConfig.mapsLink}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline"
              >
                Route planen <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-xl2 bg-beige p-6">
              <h2 className="text-xl">{siteConfig.directions.heading}</h2>
              <ul className="mt-4 space-y-3 text-ink-light">
                <li className="flex items-start gap-2">
                  <TrainFront className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  <span>{siteConfig.directions.trainText}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Car className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  <span>{siteConfig.directions.parkingText}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl2 bg-beige p-6">
              <h2 className="text-xl">Öffnungszeiten</h2>
              <ul className="mt-4 space-y-2 text-ink-light">
                {siteConfig.openingHours.map((entry) => (
                  <li key={entry.day} className="flex items-start justify-between gap-4">
                    <span className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" aria-hidden="true" />
                      {entry.day}
                    </span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-light">{siteConfig.bookingNote}</p>
            </div>
          </div>

          <div className="rounded-xl2 bg-cream-light p-6 shadow-soft ring-1 ring-beige-dark/60 sm:p-8">
            <ContactForm />
            <p className="mt-6 text-xs text-ink-light">{contactPage.privacyNote}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
