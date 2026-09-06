import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki-Behandlung – Ablauf, Dauer, Preise & Begriffsklärung",
  description:
    "Was genau ist eine Reiki-Behandlung bzw. Reiki-Therapie? Ablauf Schritt für Schritt, Dauer, Preise und eine ehrliche Einordnung, was Reiki kann – und was nicht.",
  path: "/reiki-behandlung"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki-Behandlung", path: "/reiki-behandlung" }
]);

const sections = [
  {
    heading: "Ist Reiki eine Therapie?",
    text: "Im engeren, medizinischen Sinn ist Reiki keine Therapie und ersetzt keine ärztliche oder tierärztliche Behandlung. Der Begriff „Reiki-Therapie“ wird umgangssprachlich zwar oft verwendet, gemeint ist damit aber eine komplementäre, entspannungsfördernde Anwendung – keine medizinische Heilbehandlung. Ich verwende deshalb bewusst auch den Begriff „Reiki-Anwendung“ oder „Reiki-Sitzung“."
  },
  {
    heading: "Woher kommt Reiki?",
    text: "Reiki wurde Anfang des 20. Jahrhunderts in Japan von Mikao Usui begründet und hat sich seither in vielen Ländern verbreitet. Der Name setzt sich aus den japanischen Begriffen für „universell“ (Rei) und „Lebensenergie“ (Ki) zusammen. In der Praxis bedeutet das für Sie: eine ruhige, achtsame Methode, bei der die Hände sanft aufgelegt oder mit etwas Abstand über dem Körper gehalten werden."
  },
  {
    heading: "Wie läuft eine Reiki-Behandlung Schritt für Schritt ab?",
    text: "Zu Beginn steht ein kurzes Vorgespräch, in dem ich auf Ihr Anliegen und Ihre aktuelle Situation eingehe. Während der Anwendung liegen oder sitzen Sie bequem und bleiben vollständig bekleidet, während die Hände in verschiedenen Positionen sanft aufgelegt oder mit Abstand gehalten werden. Zum Abschluss ist Raum für einen kurzen Austausch darüber, wie Sie die Anwendung erlebt haben."
  },
  {
    heading: "Was können Sie während einer Anwendung erleben?",
    text: "Viele Menschen berichten von Wärme, Ruhe oder einem Gefühl tiefer Entspannung – manche schlafen während der Anwendung sogar kurz ein. Das Erleben ist jedoch von Person zu Person und von Sitzung zu Sitzung unterschiedlich. Es gibt bewusst keine feste Erwartung daran, was Sie spüren sollten."
  },
  {
    heading: "Wie lange dauert eine Anwendung und was kostet sie?",
    text: "Eine Erstanwendung dauert 40 Minuten (CHF 80.-), eine Folgeanwendung 30 Minuten (CHF 60.-). Für einen Hausbesuch kommen CHF 10.- sowie Fahrkosten dazu, eine Fernbehandlung kostet CHF 30.-. Die vollständige Preisübersicht finden Sie auf der Seite Ablauf und Preise."
  },
  {
    heading: "Für wen geeignet – und wichtige Grenzen",
    text: "Reiki eignet sich grundsätzlich für Menschen jeden Alters sowie für Hunde und Katzen. Bei akuten Beschwerden, während einer laufenden medizinischen Behandlung oder in Notfällen ersetzt Reiki jedoch keine ärztliche oder tierärztliche Abklärung – bitte halten Sie in solchen Fällen zuerst Rücksprache mit der behandelnden Fachperson."
  }
];

export default function ReikiBehandlungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1>Reiki-Behandlung: Ablauf und Begriffsklärung</h1>
          <p className="mt-4 text-ink-light">
            Die Begriffe &quot;Reiki-Behandlung&quot; und &quot;Reiki-Therapie&quot; werden
            umgangssprachlich häufig verwendet. Damit Sie genau wissen, was Sie erwartet, erkläre
            ich hier ehrlich und ausführlich, was bei einer Anwendung in meinem Studio in Gümmenen
            bei Bern passiert, wie eine Sitzung im Detail abläuft – und was Reiki bewusst nicht
            ist.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {[
              "kein Heilversprechen, sondern eine entspannungsfördernde Anwendung",
              "vollständig bekleidet, ganz ohne Berührungsdruck",
              "individuell auf Sie oder Ihr Tier abgestimmt",
              "ergänzend zur ärztlichen oder tierärztlichen Behandlung"
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-ink">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-8 sm:grid-cols-2">
          {sections.map((block) => (
            <div key={block.heading} className="rounded-xl2 bg-beige p-6">
              <h2 className="text-xl">{block.heading}</h2>
              <p className="mt-3 text-ink-light">{block.text}</p>
            </div>
          ))}
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
          <h2 className="text-xl">Weiterlesen</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <SecondaryButton href="/reiki-fuer-menschen" className="px-5 py-2 text-xs">
                Reiki für Menschen
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/reiki-fuer-tiere" className="px-5 py-2 text-xs">
                Reiki für Tiere
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/reiki-in/guemmenen" className="px-5 py-2 text-xs">
                Mein Studio in Gümmenen
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/ablauf-preise" className="px-5 py-2 text-xs">
                Ablauf und Preise
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/faq" className="px-5 py-2 text-xs">
                Häufige Fragen
              </SecondaryButton>
            </li>
          </ul>
        </Container>
      </section>

      <CallToActionSection
        heading="Fragen zu Ihrer Anwendung?"
        text="Gerne kläre ich mit Ihnen in einem unverbindlichen Gespräch, ob und wie Reiki für Sie oder Ihr Tier passend sein könnte."
        ctaLabel="Erstgespräch anfragen"
        href="/kontakt"
      />
    </>
  );
}
