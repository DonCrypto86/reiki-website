import type { Metadata } from "next";
import { Award, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Über mich – Reiki in Gümmenen im Raum Bern",
  description: `Lernen Sie ${siteConfig.providerName} kennen: Werdegang, Weg zu Reiki, Arbeitsweise und Qualifikationen im Reiki Studio Gümmenen im Raum Bern.`,
  path: "/ueber-mich"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Über mich", path: "/ueber-mich" }
]);

export default function AboutPage() {
  const { aboutPage, certificates } = siteConfig;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ImagePlaceholder
            label="Großes, authentisches Porträt der Reiki-Anbieterin"
            alt={`${siteConfig.providerName} mit ihrem Hund in vertrauter, ruhiger Atmosphäre`}
            src="/images/petra-reiki.jpeg"
            aspectClassName="aspect-[3/4]"
            priority
          />
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-600">
              {aboutPage.heading}
            </p>
            <h1>{siteConfig.providerName}</h1>
            <p className="mt-2 text-forest">{siteConfig.jobTitle}</p>
            <p className="mt-6 text-ink-light">{aboutPage.intro}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2>{aboutPage.path.heading}</h2>
            <div className="mt-4 space-y-4 text-ink-light">
              {aboutPage.path.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h2>{aboutPage.motivation.heading}</h2>
            <div className="mt-4 space-y-4 text-ink-light">
              {aboutPage.motivation.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h2>{aboutPage.approach.heading}</h2>
            <div className="mt-4 space-y-4 text-ink-light">
              {aboutPage.approach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h2>{aboutPage.animals.heading}</h2>
            <div className="mt-4 space-y-4 text-ink-light">
              {aboutPage.animals.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container>
          <SectionHeading as="h2" title={aboutPage.values.heading} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutPage.values.items.map((value) => (
              <li
                key={value}
                className="rounded-xl2 bg-cream-light p-5 text-ink ring-1 ring-beige-dark/60"
              >
                {value}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading as="h2" title="Qualifikationen und Zertifikate" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {certificates.map((certificate) => (
              <div
                key={certificate.title}
                className="flex gap-4 rounded-xl2 bg-cream-light p-6 ring-1 ring-beige-dark/60"
              >
                <Award className="h-6 w-6 shrink-0 text-terracotta" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-forest">{certificate.title}</p>
                  <p className="text-sm text-ink-light">
                    {certificate.issuer} · {certificate.year}
                  </p>
                  {certificate.imageSrc ? (
                    <a
                      href={certificate.imageSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-forest hover:underline"
                    >
                      Zertifikat ansehen <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToActionSection
        heading={siteConfig.closingSection.heading}
        text={siteConfig.closingSection.text}
        ctaLabel={siteConfig.closingSection.ctaLabel}
        href={siteConfig.closingSection.href}
      />
    </>
  );
}
