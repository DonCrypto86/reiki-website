import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki in der Nähe finden – Worauf Sie achten sollten",
  description:
    "Reiki in der Nähe gesucht? So erkennen Sie eine seriöse Reiki-Praktikerin: Checkliste zu Qualifikation, Vorgespräch, Ablauf und Erfahrungsberichten.",
  path: "/reiki-in-der-naehe"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki in der Nähe finden", path: "/reiki-in-der-naehe" }
]);

const checklist = [
  {
    heading: "Qualifikation und Ausbildung",
    text: "Fragen Sie nach der Reiki-Ausbildung (Grad, Ausbilder, Jahr) und nach der bisherigen Erfahrung. Eine seriöse Praktikerin gibt darüber offen und transparent Auskunft."
  },
  {
    heading: "Persönliches Vorgespräch",
    text: "Vor der ersten Anwendung sollte immer ein kurzes Gespräch stattfinden, in dem Ablauf, Erwartungen und offene Fragen besprochen werden – ganz ohne Druck oder Verkaufsdruck."
  },
  {
    heading: "Praxis oder Hausbesuch",
    text: "Überlegen Sie, ob Ihnen eine Anwendung in einer ruhigen Praxis oder in vertrauter Umgebung bei Ihnen zu Hause lieber ist. Seriöse Anbieter bieten in der Regel beide Optionen an."
  },
  {
    heading: "Realistische, ehrliche Formulierungen",
    text: "Vorsicht bei Heilversprechen oder Aussagen, Reiki könne Krankheiten heilen. Seriöse Anbieter beschreiben Reiki als ergänzende, entspannungsfördernde Anwendung – nicht als Ersatz für ärztliche Behandlung."
  },
  {
    heading: "Erfahrungsberichte und Empfehlungen",
    text: "Echte Erfahrungsberichte anderer Kundinnen und Kunden geben einen guten Eindruck davon, wie eine Anwendung abläuft und was Sie erwarten können."
  },
  {
    heading: "Erreichbarkeit und Anfahrt",
    text: "Prüfen Sie, wie gut die Praxis für Sie erreichbar ist – mit dem Auto oder öffentlichen Verkehrsmitteln – und ob bei Bedarf auch ein Hausbesuch möglich ist."
  }
];

export default function ReikiInDerNaeheGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1>Reiki in der Nähe finden</h1>
          <p className="mt-4 text-ink-light">
            Bei einer Suche nach &bdquo;Reiki in der Nähe&ldquo; finden sich oft zahlreiche Angebote. Damit
            Sie eine Praktikerin finden, bei der Sie sich gut aufgehoben fühlen, hier eine kurze,
            ehrliche Checkliste, worauf Sie achten können.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-8 sm:grid-cols-2">
          {checklist.map((item, index) => {
            const isLastOfOddCount = checklist.length % 2 !== 0 && index === checklist.length - 1;
            return (
              <div
                key={item.heading}
                className={`rounded-xl2 bg-beige p-6 ${
                  isLastOfOddCount ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-1rem)]" : ""
                }`}
              >
                <h2 className="flex items-start gap-2 text-xl">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                  <span>{item.heading}</span>
                </h2>
                <p className="mt-3 text-ink-light">{item.text}</p>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-4 sm:py-6">
        <Container className="max-w-3xl">
          <LegalNotice>
            Reiki kann zur Entspannung beitragen und wird von vielen Menschen als wohltuend
            empfunden. Es ersetzt jedoch keine ärztliche, psychotherapeutische oder tierärztliche
            Behandlung und ist als ergänzendes Angebot zu verstehen.
          </LegalNotice>
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl">Reiki in Ihrer Nähe im Raum Bern</h2>
          <p className="mt-3 text-ink-light">
            Mein Reiki Studio liegt in Gümmenen im Kanton Bern. Ich begleite Menschen und Tiere
            sowohl im Studio als auch per Hausbesuch in der Region – und biete darüber hinaus
            auch eine Fernbehandlung an. Auf den folgenden Seiten erfahren Sie mehr über mich, den
            Ablauf einer Anwendung und die Orte, in denen Hausbesuche möglich sind.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <SecondaryButton href="/reiki-in" className="px-5 py-2 text-xs">
                Reiki in Ihrer Region
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/ueber-mich" className="px-5 py-2 text-xs">
                Über mich
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/reiki-behandlung" className="px-5 py-2 text-xs">
                Ablauf einer Reiki-Behandlung
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/erfahrungen" className="px-5 py-2 text-xs">
                Erfahrungen
              </SecondaryButton>
            </li>
          </ul>
        </Container>
      </section>

      <CallToActionSection
        heading="Noch unsicher, ob es passt?"
        text="Gerne kläre ich mit Ihnen in einem unverbindlichen Gespräch, ob und wie Reiki für Sie oder Ihr Tier passend sein könnte."
        ctaLabel="Erstgespräch anfragen"
        href="/kontakt"
      />
    </>
  );
}
