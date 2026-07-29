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
              Bearbeitung Ihrer Anfrage verwendet. Eine dauerhafte Speicherung der
              Formulareingaben in einer Datenbank findet durch diese Website nicht statt. [
              PLATZHALTER: Sobald ein konkreter E-Mail-Versanddienst (z. B. Resend oder ein
              SMTP-Anbieter) eingebunden wird, muss hier die entsprechende Rechtsgrundlage,
              Speicherdauer und ggf. der Serverstandort des Dienstleisters ergänzt werden.]
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">4. Hosting</h2>
            <p className="mt-2">
              [PLATZHALTER: Angaben zum Hosting-Anbieter, Serverstandort und – falls erforderlich
              – Verweis auf einen Auftragsverarbeitungsvertrag (AVV) ergänzen.]
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">5. Analyse- und Marketing-Werkzeuge</h2>
            <p className="mt-2">
              Aktuell werden keine Analyse- oder Marketing-Werkzeuge eingesetzt. [PLATZHALTER:
              Sollten künftig Werkzeuge wie eine datenschutzfreundliche Webanalyse eingebunden
              werden, ist diese Erklärung entsprechend zu ergänzen und ggf. ein Cookie-Banner
              vorzusehen.]
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">6. Externe Kartenlinks</h2>
            <p className="mt-2">
              Auf der Kontaktseite verlinken wir zu einem externen Kartendienst zur
              Routenplanung. Es wird keine Karte automatisch eingebettet oder nachgeladen; erst
              mit einem Klick auf den Link verlassen Sie diese Website. [PLATZHALTER: Genauen
              Kartenanbieter benennen und dessen Datenschutzhinweise verlinken.]
            </p>
          </div>

          <div>
            <h2 className="text-xl text-forest">7. Ihre Rechte</h2>
            <p className="mt-2">
              [PLATZHALTER: Hinweise zu Auskunft, Berichtigung, Löschung und Einschränkung der
              Bearbeitung Ihrer Daten ergänzen. Da {siteConfig.address.city} in der Schweiz liegt,
              richtet sich diese Erklärung in erster Linie nach dem Schweizer
              Datenschutzgesetz (DSG). Werden auch Anfragen aus der EU bearbeitet, können
              zusätzlich Vorgaben der DSGVO relevant sein. Bitte von juristischer Seite prüfen und
              konkretisieren lassen, inkl. Hinweis auf das Beschwerderecht beim Eidgenössischen
              Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) bzw. einer zuständigen
              Aufsichtsbehörde.]
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
