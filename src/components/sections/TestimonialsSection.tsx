import Link from "next/link";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";

/**
 * Zeigt alle Erfahrungsberichte auf der Startseite in einem automatisch
 * wechselnden Karussell (die vollständige Liste steht auch auf
 * /erfahrungen).
 */
export default function TestimonialsSection() {
  return (
    <section className="bg-cream-light py-16 sm:py-20" aria-labelledby="erfahrungen-heading">
      <Container>
        <SectionHeading as="h2" align="center" title="Kundenstimmen" />
        <div className="mt-10">
          <TestimonialsCarousel testimonials={siteConfig.testimonials} autoPlayInterval={7000} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/erfahrungen" className="font-medium text-forest hover:underline">
            Weitere Erfahrungen ansehen
          </Link>
        </div>
      </Container>
    </section>
  );
}
