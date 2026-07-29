import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";

/**
 * Bodenständige, verständliche Erklärung von Reiki inklusive sichtbarem,
 * aber unaufdringlichem medizinischen Hinweis.
 */
export default function WhatIsReikiSection() {
  const { whatIsReiki } = siteConfig;

  return (
    <section id="was-ist-reiki" className="bg-beige py-16 sm:py-20 scroll-mt-24">
      <Container className="max-w-3xl">
        <h2>{whatIsReiki.heading}</h2>
        <div className="mt-4 space-y-4 text-ink-light">
          {whatIsReiki.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <LegalNotice className="mt-6">{whatIsReiki.disclaimer}</LegalNotice>
      </Container>
    </section>
  );
}
