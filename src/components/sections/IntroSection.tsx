import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SecondaryButton from "@/components/ui/SecondaryButton";

/**
 * Kurze, persönliche Vorstellung auf der Startseite (aktuell ohne Bild).
 */
export default function IntroSection() {
  const { introSection } = siteConfig;

  return (
    <section className="py-16 sm:py-20" aria-labelledby="vorstellung-heading">
      <Container className="max-w-2xl text-center">
        <h2 id="vorstellung-heading">{introSection.heading}</h2>
        <p className="mt-4 text-ink-light">{introSection.text}</p>
        <SecondaryButton href={introSection.href} className="mt-6">
          {introSection.ctaLabel}
        </SecondaryButton>
      </Container>
    </section>
  );
}
