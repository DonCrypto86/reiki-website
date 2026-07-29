import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessSteps from "@/components/ui/ProcessSteps";

/**
 * Zeigt den Ablauf von der ersten Kontaktaufnahme bis zum
 * Abschlussgespräch in vier Schritten.
 */
export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="ablauf-heading">
      <Container>
        <SectionHeading as="h2" align="center" title="So läuft die Zusammenarbeit ab" />
        <div className="mt-10">
          <ProcessSteps steps={[...siteConfig.process]} />
        </div>
      </Container>
    </section>
  );
}
