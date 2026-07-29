import { HeartHandshake, Leaf, ShieldCheck, PawPrint } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

const icons = [HeartHandshake, Leaf, ShieldCheck, PawPrint];

/**
 * Vertrauensbereich mit kurzen, zurückhaltenden Merkmalen direkt unter dem
 * Hero-Bereich.
 */
export default function TrustSection() {
  return (
    <section className="py-12 sm:py-16" aria-label="Das zeichnet die Zusammenarbeit aus">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.trustFeatures.map((feature, index) => {
            const Icon = icons[index % icons.length];

            return (
              <li key={feature.title} className="text-center sm:text-left">
                <Icon className="mx-auto h-7 w-7 text-sage-600 sm:mx-0" aria-hidden="true" />
                <p className="mt-3 font-serif text-base text-forest">{feature.title}</p>
                <p className="mt-1 text-sm text-ink-light">{feature.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
