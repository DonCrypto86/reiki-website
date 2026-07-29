import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

/**
 * Hero-Bereich der Startseite: Hauptüberschrift, Unterzeile, ergänzender
 * Text, zwei Handlungsaufforderungen sowie eine große, ruhige Bildfläche.
 */
export default function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section className="bg-cream-light py-12 sm:py-16 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fadeIn text-center lg:text-left">
          <h1>{hero.heading}</h1>
          <p className="mt-4 text-lg font-medium text-forest sm:text-xl">{hero.subheading}</p>
          <p className="mt-4 text-ink-light">{hero.text}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <PrimaryButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PrimaryButton>
            <SecondaryButton href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </SecondaryButton>
          </div>
        </div>

        <ImagePlaceholder
          label="Ruhiges Porträt der Reiki-Anbieterin oder Detailaufnahme des Behandlungsraums"
          alt={`Eingang zum ${siteConfig.practiceName} in ${siteConfig.address.city} mit Pflanzen und Holzelementen`}
          src="/images/reiki-studio3.png"
          aspectClassName="aspect-[4/3]"
          className="w-full max-w-md mx-auto lg:mx-0"
          priority
        />
      </Container>
    </section>
  );
}
