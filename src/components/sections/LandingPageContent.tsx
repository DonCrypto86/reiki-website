import { CheckCircle2 } from "lucide-react";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import type { LandingPage } from "@/config/landingPages";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

type LandingPageContentProps = {
  entry: LandingPage;
  breadcrumb: { name: string; path: string }[];
};

/**
 * Gemeinsame Vorlage für alle SEO-Landingpages (Orte, Themen bei Menschen,
 * Tierarten). Übernimmt bewusst dasselbe Layout wie die bestehenden Seiten
 * "Reiki für Menschen"/"Reiki für Tiere", damit sich neue Seiten nahtlos
 * ins Design einfügen. Inhalte kommen ausschliesslich aus
 * src/config/landingPages.ts.
 */
export default function LandingPageContent({ entry, breadcrumb }: LandingPageContentProps) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumb);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1>{entry.h1}</h1>
          <p className="mt-4 text-ink-light">{entry.intro}</p>
          {entry.benefits ? (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {entry.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-sage-600"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-8 sm:grid-cols-2">
          {entry.sections.map((block, index) => {
            // Bei einer ungeraden Anzahl Sections würde das letzte Element
            // sonst allein in der linken Spalte hängen. Stattdessen wird es
            // über beide Spalten hinweg zentriert dargestellt.
            const isLastOfOddCount =
              entry.sections.length % 2 !== 0 && index === entry.sections.length - 1;

            return (
              <div
                key={block.heading}
                className={`rounded-xl2 bg-beige p-6 ${
                  isLastOfOddCount ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-1rem)]" : ""
                }`}
              >
                <h2 className="text-xl">{block.heading}</h2>
                <p className="mt-3 text-ink-light">{block.text}</p>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-4 sm:py-6">
        <Container className="max-w-3xl">
          <LegalNotice>{entry.disclaimer}</LegalNotice>
        </Container>
      </section>

      {entry.relatedPaths.length > 0 ? (
        <section className="bg-beige py-14 sm:py-20">
          <Container className="max-w-3xl">
            <h2 className="text-xl">Weitere Themen</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {entry.relatedPaths.map((related) => (
                <li key={related.href}>
                  <SecondaryButton href={related.href} className="px-5 py-2 text-xs">
                    {related.label}
                  </SecondaryButton>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CallToActionSection
        heading={entry.cta.heading}
        text={entry.cta.text}
        ctaLabel={entry.cta.label}
        href={entry.cta.href}
      />
    </>
  );
}
