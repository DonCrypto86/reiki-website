import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import { getPublishedTestimonials } from "@/lib/testimonialsStore";

/**
 * Zeigt alle veröffentlichten Erfahrungsberichte auf der Startseite in einem
 * automatisch wechselnden Karussell (die vollständige Liste steht auch auf
 * /erfahrungen). Petra kann neue Berichte unter /erfahrungen-verwalten
 * selbst hinzufügen und veröffentlichen.
 */
export default async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials();

  return (
    <section className="bg-cream-light py-16 sm:py-20" aria-labelledby="erfahrungen-heading">
      <Container>
        <SectionHeading as="h2" align="center" title="Kundenstimmen" />
        <div className="mt-10">
          <TestimonialsCarousel testimonials={testimonials} autoPlayInterval={7000} />
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
