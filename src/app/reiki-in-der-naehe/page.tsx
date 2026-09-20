import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

const inlineLinkStyles = "underline underline-offset-4 hover:text-forest";

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

const faq = [
  {
    question: "Wie finde ich einen seriösen Reiki-Anbieter in meiner Nähe?",
    answer:
      "Achten Sie auf transparente Informationen zu Ausbildung, Ablauf und Preisen, ein persönliches Vorgespräch sowie realistische, unaufgeregte Formulierungen ohne Heilversprechen."
  },
  {
    question: "Wie weit sollte ein Reiki Studio entfernt sein?",
    answer:
      "Das hängt von Ihrer persönlichen Situation ab. Wer regelmässig Termine plant, schätzt meist eine kürzere Anfahrt; für eine einzelne Anwendung nehmen viele Menschen auch eine längere Strecke in Kauf."
  },
  {
    question: "Muss Reiki immer vor Ort stattfinden?",
    answer:
      "Nein. Viele Anbieter, auch ich, bieten neben Terminen im Studio zusätzlich Hausbesuche sowie eine ortsunabhängige Fernbehandlung an."
  },
  {
    question: "Worauf sollte ich beim ersten Reiki-Termin achten?",
    answer:
      "Nehmen Sie sich Zeit für das Vorgespräch, stellen Sie Fragen zu Ablauf und Kosten, und achten Sie darauf, dass nichts ohne Ihre Zustimmung geschieht."
  }
];

const faqJsonLd = buildFaqJsonLd(faq);

export default function ReikiInDerNaeheGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl">Praxis oder Hausbesuch?</h2>
            <p className="mt-3 text-ink-light">
              Ein fester Praxisort bringt Ruhe und eine bewusste Abgrenzung vom eigenen Zuhause –
              ein Hausbesuch dagegen die vertraute Umgebung, was besonders bei Tieren oder bei
              eingeschränkter Mobilität hilfreich sein kann. Beide Formen haben ihre Berechtigung;
              was besser passt, hängt von Ihren persönlichen Vorlieben ab.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Wie weit sollte eine Reiki-Praxis entfernt sein?</h2>
            <p className="mt-3 text-ink-light">
              Das lässt sich nicht pauschal beantworten. Wer nur einen einzelnen Termin plant,
              nimmt oft auch eine längere Anfahrt in Kauf. Wer sich regelmässige Anwendungen
              vorstellen kann, profitiert eher von einer kürzeren, gut in den Alltag integrierbaren
              Strecke – ob mit dem Auto oder öffentlichen Verkehrsmitteln.
            </p>
          </div>
          <div>
            <h2 className="text-xl">Was, wenn kein passendes Angebot direkt in Ihrer Nähe ist?</h2>
            <p className="mt-3 text-ink-light">
              In diesem Fall kann eine{" "}
              <Link href="/reiki-fuer-menschen/fernbehandlung-schweiz" className={inlineLinkStyles}>
                Fernbehandlung für Menschen
              </Link>{" "}
              oder eine{" "}
              <Link href="/reiki-fuer-tiere/fernbehandlung-schweiz" className={inlineLinkStyles}>
                Fernbehandlung für Tiere
              </Link>{" "}
              eine Option sein: ortsunabhängig und ohne Anfahrt.
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

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl">Häufige Fragen</h2>
          <div className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 text-ink-light">{item.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl">Reiki in der Region Bern, Freiburg und Murten</h2>
          <p className="mt-3 text-ink-light">
            Mein Reiki Studio befindet sich in Gümmenen im Kanton Bern. Von dort aus ist eine
            Anwendung unter anderem aus{" "}
            <Link href="/reiki-in/bern" className={inlineLinkStyles}>
              Bern
            </Link>
            ,{" "}
            <Link href="/reiki-in/murten" className={inlineLinkStyles}>
              Murten
            </Link>{" "}
            oder{" "}
            <Link href="/reiki-in/fribourg" className={inlineLinkStyles}>
              Fribourg
            </Link>{" "}
            gut erreichbar, ebenso aus kleineren Nachbarorten wie{" "}
            <Link href="/reiki-in/laupen" className={inlineLinkStyles}>
              Laupen
            </Link>
            ,{" "}
            <Link href="/reiki-in/kerzers" className={inlineLinkStyles}>
              Kerzers
            </Link>{" "}
            oder{" "}
            <Link href="/reiki-in/muehleberg" className={inlineLinkStyles}>
              Mühleberg
            </Link>
            . Eine vollständige Übersicht aller Orte finden Sie auf der Seite Reiki in Ihrer
            Region.
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
