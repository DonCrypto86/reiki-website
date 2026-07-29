import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata: Metadata = buildMetadata({
  title: "Häufige Fragen zu Reiki",
  description:
    "Antworten auf häufige Fragen zu Reiki-Anwendungen für Menschen und Tiere im Reiki Studio in Gümmenen im Raum Bern.",
  path: "/faq"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Häufige Fragen", path: "/faq" }
]);

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container className="max-w-3xl text-center">
        <h1>Häufige Fragen</h1>
        <p className="mt-4 text-ink-light">
          Antworten auf Fragen, die uns besonders oft begegnen – auch wenn Sie Reiki noch nicht
          kennen.
        </p>
      </Container>

      <Container className="mt-10 max-w-3xl">
        <FAQAccordion items={[...siteConfig.faq]} />
      </Container>
    </section>
  );
}
