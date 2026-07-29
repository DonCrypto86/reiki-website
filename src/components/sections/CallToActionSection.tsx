import PrimaryButton from "@/components/ui/PrimaryButton";
import Container from "@/components/ui/Container";

type CallToActionSectionProps = {
  heading: string;
  text: string;
  ctaLabel: string;
  href: string;
};

/**
 * Abschließender Handlungsaufruf, u. a. auf der Startseite sowie den
 * Angebotsseiten für Menschen und Tiere genutzt.
 */
export default function CallToActionSection({
  heading,
  text,
  ctaLabel,
  href
}: CallToActionSectionProps) {
  return (
    <section className="bg-forest py-16 sm:py-20" aria-labelledby="cta-heading">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 id="cta-heading" className="text-cream">
          {heading}
        </h2>
        <p className="max-w-xl text-cream/90">{text}</p>
        <PrimaryButton href={href} className="bg-terracotta hover:bg-terracotta-dark">
          {ctaLabel}
        </PrimaryButton>
      </Container>
    </section>
  );
}
