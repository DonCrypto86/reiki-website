import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import LegalNotice from "@/components/ui/LegalNotice";

export const metadata: Metadata = buildMetadata({
  title: "Datenschutz",
  description: "Datenschutzerklärung.",
  path: "/datenschutz"
});

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1>Datenschutzerklärung</h1>

        <LegalNotice className="mt-6">{siteConfig.legalPagesNotice}</LegalNotice>

        <div className="mt-8 space-y-8 text-ink-light">
          <div>
            <h2 className="text-xl text-forest">1. Verantwortliche Stelle</h2>
            <p className="mt-2">
              {siteConfig.providerName}
              <br />
              {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
              {siteConfig.address.city}
              <br />
              E-Mail: {siteConfig.contact.email}
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">2. Datensparsamkeit dieser Website</h2>
            <p className="mt-2">
              Diese Website verzichtet standardmäßig auf externe Tracking-Skripte,
              Marketing-Cookies, eingebettete Social-Media-Feeds, automatisch geladene Karten und
              externe Video-Einbettungen. Es werden keine nicht notwendigen Cookies gesetzt.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">3. Kontaktformular</h2>
            <p className="mt-2">
              Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten (Name,
              E-Mail-Adresse, ggf. Telefonnummer sowie Ihre Nachricht) ausschließlich zur
              Bearbeitung Ihrer Anfrage verwendet. Der Versand erfolgt über den E-Mail-Dienst
              Resend (Resend, Inc., USA), der Ihre Anfrage direkt an unser Postfach weiterleitet.
              Eine dauerhafte Speicherung der Formulareingaben in einer eigenen Datenbank findet
              durch diese Website nicht statt; Resend kann die Übermittlung jedoch gemäss eigener
              Aufbewahrungsfristen protokollieren. Die Verarbeitung erfolgt auf Grundlage Ihrer
              Einwilligung durch das Absenden des Formulars bzw. zur Bearbeitung Ihrer Anfrage.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">4. Hosting</h2>
            <p className="mt-2">
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden
              technisch notwendige Verbindungsdaten (z. B. IP-Adresse, Datum und Uhrzeit der
              Anfrage) automatisch durch den Hosting-Anbieter verarbeitet, um die Website
              zuverlässig und sicher auszuliefern. Dies erfolgt auf Grundlage unseres berechtigten
              Interesses an einem stabilen und sicheren Betrieb der Website.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">5. Analyse- und Marketing-Werkzeuge</h2>
            <p className="mt-2">
              Wir nutzen Vercel Web Analytics zur anonymisierten, datenschutzfreundlichen
              Auswertung der Seitenaufrufe. Dabei werden keine Cookies gesetzt und keine
              personenbezogenen Profile erstellt; die Daten lassen sich nicht einzelnen Personen
              zuordnen. Darüber hinaus werden keine weiteren Analyse- oder Marketing-Werkzeuge
              (z. B. Google Analytics, Werbe-Cookies, Social-Media-Tracking) eingesetzt.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">6. Externe Kartenlinks</h2>
            <p className="mt-2">
              Auf der Kontaktseite verlinken wir zu Google Maps zur Routenplanung. Es wird keine
              Karte automatisch eingebettet oder nachgeladen; erst mit einem Klick auf den Link
              verlassen Sie diese Website und es gelten die Datenschutzhinweise von Google
              (Google Ireland Limited bzw. Google LLC).
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">7. Patienten- und Kundenverwaltung (internes Tool)</h2>
            <p className="mt-2">
              Für die Terminverwaltung sowie die Dokumentation von Anwendungen führen wir intern
              ein passwortgeschütztes Verwaltungstool, das ausschliesslich von uns selbst genutzt
              wird und nicht öffentlich zugänglich ist. Darin gespeicherte Daten (z. B. Kontakt-
              und Adressdaten, Termine, Behandlungsverlauf) werden bei Vercel Inc. sowie über die
              Datenbank-Integration Upstash gehostet und ausschliesslich zur Organisation der
              Behandlungen sowie zu Dokumentationszwecken verwendet. Diese Daten werden nicht an
              Dritte weitergegeben. Betroffene Personen können jederzeit Auskunft, Berichtigung
              oder Löschung ihrer dort gespeicherten Daten verlangen, indem sie uns direkt
              kontaktieren.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">8. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben jederzeit das Recht, Auskunft über die von uns zu Ihrer Person
              gespeicherten Daten zu verlangen sowie deren Berichtigung, Löschung oder
              Einschränkung der Bearbeitung zu verlangen. Wenden Sie sich hierfür einfach per
              E-Mail an {siteConfig.contact.email}.
            </p>
            <p className="mt-2">
              Da {siteConfig.providerName} in der Schweiz ansässig ist, richtet sich diese
              Erklärung in erster Linie nach dem Schweizer Datenschutzgesetz (DSG). Soweit auch
              Anfragen aus der EU bearbeitet werden, können zusätzlich Vorgaben der DSGVO relevant
              sein. Sollten Sie der Ansicht sein, dass die Bearbeitung Ihrer Daten gegen
              Datenschutzrecht verstösst, haben Sie das Recht, eine Beschwerde bei der
              zuständigen Aufsichtsbehörde einzureichen – in der Schweiz beim Eidgenössischen
              Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, www.edoeb.admin.ch).
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
