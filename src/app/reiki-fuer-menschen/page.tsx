import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import ImageSlider from "@/components/ui/ImageSlider";
import LegalNotice from "@/components/ui/LegalNotice";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki für Menschen im Raum Bern",
  description:
    "Reiki-Anwendungen für Menschen – Kinder wie Erwachsene – in Gümmenen im Raum Bern. Eine bewusste Auszeit für mehr Ruhe, Entspannung und Wohlbefinden.",
  path: "/reiki-fuer-menschen"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki für Menschen", path: "/reiki-fuer-menschen" }
]);

const humanGalleryImages = [
  {
    src: "/images/studio1.png",
    alt: "Ruhiger Behandlungsraum mit natürlichen Materialien im Reiki Studio in Gümmenen bei Bern"
  },
  {
    src: "/images/kind1.png",
    alt: "Kind entspannt während einer sanften Reiki-Anwendung"
  }
];

export default function ReikiForHumansPage() {
  const { humansPage } = siteConfig;

  const infoBlocks = [
    humansPage.procedure,
    humansPage.atmosphere,
    humansPage.clothing,
    humansPage.duration,
    humansPage.homeVisit,
    humansPage.beforeAfter
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
            <h1>{humansPage.heading}</h1>
            <p className="mt-4 text-ink-light">{humansPage.intro}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {humansPage.benefits.map((benefit) => (
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
            images={humanGalleryImages}
            priority
            autoPlayInterval={5000}
            aspectClassName="aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0"
          />
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2>{humansPage.audience.heading}</h2>
          <p className="mt-4 text-ink-light">{humansPage.audience.text}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {humansPage.audience.occasions.map((occasion) => (
              <li key={occasion} className="flex items-start gap-2 text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                <span>{occasion}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          {infoBlocks.map((block) => (
            <div key={block.heading} className="rounded-xl2 bg-cream-light p-6 ring-1 ring-beige-dark/60">
              <h2 className="text-xl">{block.heading}</h2>
              <p className="mt-3 text-ink-light">{block.text}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2>{humansPage.kundaliniReiki.heading}</h2>
          <div className="mt-4 space-y-4 text-ink-light">
            {humansPage.kundaliniReiki.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <LegalNotice className="mt-6">{humansPage.kundaliniReiki.safetyNote}</LegalNotice>
          <LegalNotice className="mt-4">{humansPage.disclaimer}</LegalNotice>
        </Container>
      </section>

      <CallToActionSection
        heading={humansPage.cta.heading}
        text={humansPage.cta.text}
        ctaLabel={humansPage.cta.label}
        href={humansPage.cta.href}
      />
    </>
  );
}
