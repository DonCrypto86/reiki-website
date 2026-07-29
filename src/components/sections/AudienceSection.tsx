import { PersonStanding, PawPrint } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

/**
 * Stellt die zwei Zielgruppen "Menschen" und "Tiere" gleichwertig
 * nebeneinander dar.
 */
export default function AudienceSection() {
  const { audienceHumans, audienceAnimals } = siteConfig;

  return (
    <section className="bg-beige py-16 sm:py-20" aria-labelledby="zielgruppen-heading">
      <Container>
        <SectionHeading
          as="h2"
          align="center"
          eyebrow="Zwei Wege der Begleitung"
          title="Für wen ist Reiki gedacht?"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <ServiceCard
            title={audienceHumans.title}
            text={audienceHumans.text}
            ctaLabel={audienceHumans.ctaLabel}
            href={audienceHumans.href}
            icon={<PersonStanding className="h-8 w-8" aria-hidden="true" />}
          />
          <ServiceCard
            title={audienceAnimals.title}
            text={audienceAnimals.text}
            ctaLabel={audienceAnimals.ctaLabel}
            href={audienceAnimals.href}
            icon={<PawPrint className="h-8 w-8" aria-hidden="true" />}
          />
        </div>
      </Container>
    </section>
  );
}
