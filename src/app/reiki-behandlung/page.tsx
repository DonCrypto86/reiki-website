import type { Metadata } from "next";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Reiki-Behandlung – Ablauf, Begriffsklärung und was Sie erwartet",
  description:
    "Was passiert bei einer Reiki-Behandlung bzw. Reiki-Therapie? Ablauf, Dauer und eine ehrliche Einordnung, was Reiki ist – und was nicht.",
  path: "/reiki-behandlung"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Reiki-Behandlung", path: "/reiki-behandlung" }
]);

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
            umgangssprachlich häufig verwendet. Damit Sie wissen, was Sie erwartet, erklären wir
            hier ehrlich, was bei einer Anwendung passiert – und was Reiki bewusst nicht ist.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid max-w-5xl gap-8 sm:grid-cols-2">
          <div className="rounded-xl2 bg-beige p-6">
            <h2 className="text-xl">Ist Reiki eine Therapie?</h2>
            <p className="mt-3 text-ink-light">
              Im engeren, medizinischen Sinn ist Reiki keine Therapie und ersetzt keine ärztliche
              oder tierärztliche Behandlung. Der Begriff &quot;Reiki-Therapie&quot; wird
              umgangssprachlich zwar oft verwendet, gemeint ist damit aber eine komplementäre,
              entspannungsfördernde Anwendung – keine medizinische Heilbehandlung.
            </p>
          </div>
          <div className="rounded-xl2 bg-beige p-6">
            <h2 className="text-xl">Wie läuft eine Reiki-Behandlung ab?</h2>
            <p className="mt-3 text-ink-light">
              Zu Beginn steht ein kurzes Gespräch. Anschliessend liegen oder sitzen Sie bequem und
              bekleidet, während die Hände sanft aufgelegt oder mit etwas Abstand über dem Körper
              gehalten werden. Danach ist Raum für Ruhe und einen kurzen Austausch.
            </p>
          </div>
          <div className="rounded-xl2 bg-beige p-6">
            <h2 className="text-xl">Wie lange dauert eine Anwendung?</h2>
            <p className="mt-3 text-ink-light">
              Für Menschen dauert eine Anwendung in der Regel 40 Minuten (Erstanwendung) bzw. 30
              Minuten (Nachfolgebehandlung), für Tiere in der Regel etwa 30 Minuten. Details finden
              Sie auf der Seite Ablauf und Preise.
            </p>
          </div>
          <div className="rounded-xl2 bg-beige p-6">
            <h2 className="text-xl">Für wen eignet sich das?</h2>
            <p className="mt-3 text-ink-light">
              Für Menschen jeden Alters sowie für Hunde und Katzen, die eine ergänzende,
              entspannungsfördernde Auszeit suchen. Vorerfahrung ist nicht notwendig.
            </p>
          </div>
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
              <SecondaryButton href="/reiki-in" className="px-5 py-2 text-xs">
                Reiki in Ihrer Region
              </SecondaryButton>
            </li>
            <li>
              <SecondaryButton href="/ablauf-preise" className="px-5 py-2 text-xs">
                Ablauf und Preise
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
