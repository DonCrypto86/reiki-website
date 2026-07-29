import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import ImageSlider from "@/components/ui/ImageSlider";
import LegalNotice from "@/components/ui/LegalNotice";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki für Tiere im Raum Bern",
  description:
    "Achtsame Reiki-Anwendungen für Tiere in Gümmenen im Raum Bern – ruhig, respektvoll und ganz im Tempo Ihres Tieres.",
  path: "/reiki-fuer-tiere"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki für Tiere", path: "/reiki-fuer-tiere" }
]);

const animalGalleryImages = [
  { src: "/images/reiki-tier1.png", alt: "Katze mit langem Fell, entspannt in Nahaufnahme" },
  {
    src: "/images/reiki-tier2.png",
    alt: "Hand ruht sanft auf einem liegenden Berner Sennenhund"
  },
  {
    src: "/images/reiki-tier4.png",
    alt: "Hand streichelt einen entspannten Hund, der auf dem Rücken liegt"
  },
  {
    src: "/images/tierstudio.png",
    alt: "Ruhiger Behandlungsraum mit Tierbetten und natürlichen Materialien im Reiki Studio in Gümmenen bei Bern"
  }
];

export default function ReikiForAnimalsPage() {
  const { animalsPage } = siteConfig;

  const infoBlocks = [
    animalsPage.species,
    animalsPage.consent,
    animalsPage.distance,
    animalsPage.homeVisits,
    animalsPage.ownerPresence,
    animalsPage.duration,
    animalsPage.firstMeeting
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1>{animalsPage.heading}</h1>
            <p className="mt-4 text-ink-light">{animalsPage.intro}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {animalsPage.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-sage-600"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <ImageSlider
            images={animalGalleryImages}
            priority
            autoPlayInterval={5000}
            aspectClassName="aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0"
          />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2>{animalsPage.occasions.heading}</h2>
          <p className="mt-4 text-ink-light">{animalsPage.occasions.text}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {animalsPage.occasions.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          {infoBlocks.map((block) => (
            <div key={block.heading} className="rounded-xl2 bg-beige p-6">
              <h2 className="text-xl">{block.heading}</h2>
              <p className="mt-3 text-ink-light">{block.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container className="max-w-3xl">
          <LegalNotice>{animalsPage.disclaimer}</LegalNotice>
        </Container>
      </section>

      <CallToActionSection
        heading={animalsPage.cta.heading}
        text={animalsPage.cta.text}
        ctaLabel={animalsPage.cta.label}
        href={animalsPage.cta.href}
      />
    </>
  );
}
