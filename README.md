# Reiki-Praxis Website

Vollständige, responsive Website für eine selbstständige Reiki-Anbieterin mit
zwei Zielgruppen: Menschen und Tiere (inkl. deren Halter). Gebaut mit
Next.js (App Router), TypeScript und Tailwind CSS. Ruhige, natürliche
Gestaltung ohne Kitsch, ohne Heilversprechen, mit Fokus auf Vertrauen und
Barrierefreiheit.

## Wichtiger Hinweis zu diesem Projektstand

Dieses Projekt wurde vollständig als Quellcode erstellt, **`npm install`
konnte in der Entwicklungsumgebung, in der dieses Projekt erstellt wurde,
nicht ausgeführt werden** (keine Internet-/Registry-Verbindung in jener
Sandbox). Auf einem normalen Rechner mit Internetzugang funktionieren die
Befehle in diesem README wie gewohnt. Führe nach dem Klonen/Kopieren des
Projekts bitte einmal `npm install`, `npm run lint` und `npm run build`
lokal aus und behebe eventuell auftretende, hier nicht getestete
Fehlermeldungen (siehe Abschnitt "Bekannte Einschränkungen" unten).

## Inhaltsverzeichnis

1. Projektbeschreibung
2. Systemvoraussetzungen
3. Installation
4. Entwicklungsstart
5. Produktions-Build
6. Konfiguration der Stammdaten
7. Austausch der Bilder
8. Anpassung der Preise
9. Einrichtung des E-Mail-Versands
10. Impressum und Datenschutz
11. Deployment (z. B. Vercel)
12. Checkliste vor der Veröffentlichung
13. Bekannte Einschränkungen dieses Projektstands

---

## 1. Projektbeschreibung

Die Website stellt Reiki-Anwendungen für Menschen und Tiere vor, mit
folgenden Seiten: Startseite, Über mich, Reiki für Menschen, Reiki für
Tiere, Ablauf und Preise, Erfahrungen, Häufige Fragen, Kontakt, Impressum,
Datenschutz. Enthalten sind ein barrierearmes FAQ-Accordion, ein
Kontaktformular mit Honeypot-Spamschutz sowie grundlegende
SEO-Maßnahmen (Metadaten, Sitemap, robots.txt, strukturierte Daten).

Bewusst **nicht** enthalten: Heilversprechen, pseudowissenschaftliche
Aussagen, Tracking-Skripte, Marketing-Cookies, automatisch geladene Karten.

## 2. Systemvoraussetzungen

- Node.js 18.18 oder neuer (empfohlen: aktuelle LTS-Version)
- npm (im Lieferumfang von Node.js enthalten)

## 3. Installation

```bash
npm install
```

## 4. Entwicklungsstart

```bash
npm run dev
```

Anschließend ist die Website unter `http://localhost:3000` erreichbar.

## 5. Produktions-Build

```bash
npm run build
npm run start
```

Vor jeder Veröffentlichung zusätzlich ausführen:

```bash
npm run lint
```

## 6. Konfiguration der Stammdaten

**Alle** zentralen Angaben befinden sich in einer einzigen Datei:

```
src/config/site.ts
```

Dort werden u. a. gepflegt: Name der Anbieterin, Praxisname,
Tätigkeitsbezeichnung, Telefonnummer, E-Mail-Adresse, Adresse,
Öffnungszeiten, Social-Media-Links, Preise, Behandlungsdauer, alle
Seitentexte für Menschen und Tiere, FAQ-Inhalte, Testimonial-Beispieltexte
sowie rechtliche Platzhalter-Hinweise.

Platzhalter sind durchgängig in eckigen Klammern erkennbar, z. B.
`[NAME DER ANBIETERIN]`, `[E-MAIL-ADRESSE]`, `[TELEFONNUMMER]`, `[ADRESSE]`,
`[ORT]`, `[PREIS]`. Suche im Projekt gezielt nach `[` in `src/config/site.ts`,
um alle offenen Punkte zu finden.

Wichtig: `siteConfig.url` (Basis-URL der Website) vor dem Livegang auf die
echte Domain setzen – das beeinflusst Canonical-URLs, Sitemap und
Open-Graph-Metadaten.

## 7. Austausch der Bilder

Aktuell werden ausschließlich neutrale Bildflächen (Komponente
`ImagePlaceholder`, in `src/components/ui/ImagePlaceholder.tsx`) anstelle
echter Fotos angezeigt – bewusst keine Stockfotos mit Lichtstrahlen,
Chakra-Symbolik oder meditierenden Tieren.

So werden echte Bilder eingebunden:

1. Bilddatei nach `public/images/` legen (Namensvorschläge und Zuordnung
   in `public/images/README.txt`).
2. An der jeweiligen Stelle im Code den `src`-Prop von `ImagePlaceholder`
   ergänzen, z. B.:

   ```tsx
   <ImagePlaceholder
     label="Porträt der Reiki-Anbieterin"
     alt="Porträt von [NAME DER ANBIETERIN] in ruhiger Umgebung"
     src="/images/portrait-anbieterin.jpg"
   />
   ```

   Sobald `src` gesetzt ist, wird automatisch `next/image` für eine
   optimierte, responsive Darstellung genutzt.
3. Alt-Texte immer inhaltlich sinnvoll anpassen (nicht die Beispieltexte
   unverändert übernehmen).
4. Bildrechte vor Veröffentlichung prüfen.

## 8. Anpassung der Preise

Alle Preise befinden sich unter `siteConfig.pricing` in
`src/config/site.ts` (Bereiche `humans` und `animals`). Aktuell sind alle
Beträge als `[PREIS] €` bzw. `[ENTFERNUNG]` gekennzeichnet. Diese Platzhalter
durch reale, geprüfte Preise ersetzen. Der Hinweistext
`pricing.disclaimer` kann entfernt werden, sobald alle Preise final sind.

## 9. Einrichtung des E-Mail-Versands

Das Kontaktformular versendet E-Mails über [Resend](https://resend.com). Die
gesamte Versandlogik ist in `src/lib/contact.ts` gekapselt (Funktion
`sendContactMessage`). Im Entwicklungsmodus wird jede Anfrage zusätzlich
strukturiert in der Server-Konsole ausgegeben; es findet **keine dauerhafte
Speicherung** von Kontaktanfragen statt (keine Datenbank).

Einrichtung:

1. Kostenlosen Account auf [resend.com](https://resend.com) erstellen.
2. Im Resend-Dashboard unter "API Keys" einen neuen Key erstellen.
3. `.env.local.example` nach `.env.local` kopieren (wird von Git ignoriert)
   und `RESEND_API_KEY` mit dem erstellten Key befüllen.
4. Dieselbe Variable (`RESEND_API_KEY`) zusätzlich in den
   Vercel-Projekteinstellungen unter "Settings" → "Environment Variables"
   setzen, damit der Versand auch auf der Live-Website funktioniert.
5. Optional, für eine eigene Absenderadresse statt der Resend-Testadresse
   `onboarding@resend.dev`: die Domain im Resend-Dashboard unter "Domains"
   hinzufügen und verifizieren (dafür weitere DNS-Einträge beim
   Domain-Anbieter ergänzen), danach `CONTACT_FROM_EMAIL` setzen, z. B.
   `Reiki Studio <kontakt@reiki-mensch-tier.ch>`.

Ohne gesetzten `RESEND_API_KEY` meldet das Formular in Produktion bewusst
einen Fehler, um keinen falschen Erfolg vorzutäuschen.

Die API-Route liegt unter `src/app/api/kontakt/route.ts`, die Validierung
(client- und serverseitig identisch) unter `src/lib/validation.ts`.

## 10. Impressum und Datenschutz

`src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx` enthalten
ausdrücklich gekennzeichnete Platzhaltertexte (Hinweisbox oben auf jeder
Seite). **Diese Texte stellen keine Rechtsberatung dar** und müssen vor der
Veröffentlichung von qualifizierter juristischer Seite geprüft und an
Rechtsform, Land, Hosting-Anbieter, eingesetzte Analysewerkzeuge,
Formular-/E-Mail-Dienstleister und weitere Drittanbieter angepasst werden.

## 11. Deployment (Beispiel Vercel)

1. Projekt in ein Git-Repository pushen (z. B. GitHub).
2. Auf [vercel.com](https://vercel.com) ein neues Projekt aus diesem
   Repository anlegen – Next.js wird automatisch erkannt.
3. Benötigte Umgebungsvariablen (siehe `.env.local.example`) in den
   Vercel-Projekteinstellungen unter "Environment Variables" hinterlegen.
4. Domain verbinden und `siteConfig.url` in `src/config/site.ts` auf die
   endgültige Domain setzen (Redeploy erforderlich).

## 12. Checkliste vor der Veröffentlichung

- [ ] Echte Kontaktdaten in `src/config/site.ts` eintragen (Name, Praxisname,
      Telefon, E-Mail, Adresse, Öffnungszeiten)
- [ ] Alle Preise in `siteConfig.pricing` prüfen und Platzhalter ersetzen
- [ ] Bilder ersetzen (siehe Abschnitt 7) und Bildrechte prüfen
- [ ] Echte Kundenbewertungen einholen, Zustimmung zur Veröffentlichung
      einholen und in `siteConfig.testimonials` eintragen
- [ ] Beispielbewertungen (aktueller Inhalt von `siteConfig.testimonials`)
      vollständig entfernen bzw. ersetzen
- [ ] Impressum von juristischer Seite prüfen lassen
- [ ] Datenschutzerklärung von juristischer Seite prüfen lassen
- [ ] Formularversand mit echtem E-Mail-Anbieter testen (siehe Abschnitt 9)
- [ ] Medizinische Hinweise/Formulierungen fachlich und rechtlich prüfen
- [ ] Mobile Darstellung auf echten Geräten testen (360px, 768px, 1024px)
- [ ] Domain und Metadaten eintragen (`siteConfig.url`, Open-Graph-Bild
      optional ergänzen)
- [ ] Projekt nach verbleibenden Platzhaltern durchsuchen (Suche nach `[`
      in `src/config/site.ts` sowie in den rechtlichen Seiten)
- [ ] `npm run lint` und `npm run build` fehlerfrei durchlaufen lassen

## 13. Bekannte Einschränkungen dieses Projektstands

- In der Umgebung, in der dieses Projekt erzeugt wurde, war der Zugriff auf
  die npm-Registry technisch blockiert. Es konnte daher **kein** `npm
  install`, `npm run lint` oder `npm run build` ausgeführt werden, um das
  Ergebnis automatisiert zu verifizieren. Der gesamte Code wurde stattdessen
  sorgfältig von Hand nach etablierten Next.js-/TypeScript-/Tailwind-Mustern
  geschrieben. Bitte führe die drei Befehle nach dem Einrichten lokal aus
  und melde/behebe eventuell auftretende Fehler.
- Es sind ausschließlich Bildplatzhalter enthalten, keine echten Fotos.
- Testimonials, Preise, Zertifikate, Kontaktdaten und rechtliche Texte sind
  Platzhalter bzw. Beispieltexte (siehe Checkliste oben).
- Der E-Mail-Versand ist bewusst nur als Abstraktion vorbereitet, aber noch
  nicht an einen konkreten Anbieter angebunden.

## 14. Erfahrungsberichte-Verwaltung für Petra

Unter `/erfahrungen-verwalten` gibt es ein passwortgeschütztes, nicht
öffentlich verlinktes Admin-Tool, mit dem Petra selbst neue
Erfahrungsberichte hinzufügen kann, ohne dass dafür Code geändert und neu
bereitgestellt werden muss. Neue Berichte werden zunächst als Entwurf
gespeichert und sind erst nach Klick auf "Veröffentlichen" auf der Website
sichtbar (Startseite und `/erfahrungen`).

Technischer Aufbau:

- Die Daten liegen in einem kleinen Redis-Datenspeicher (Upstash for Redis,
  über die Vercel-Marketplace-Integration), nicht mehr in
  `siteConfig.testimonials`. Diese feste Liste dient nur noch als
  Ausgangsbestand, solange kein Datenspeicher eingerichtet ist.
- Der Zugriffsschutz erfolgt über `src/middleware.ts` und ein gemeinsames
  Passwort (kein individuelles Nutzerkonto, da nur Petra Zugriff braucht).

Einrichtung (einmalig):

1. Im Vercel-Projekt unter "Storage" eine neue Datenbank vom Typ
   **"Upstash for Redis"** (bzw. "KV") anlegen und mit diesem Projekt
   verbinden. Vercel setzt dabei automatisch die Umgebungsvariablen
   `KV_REST_API_URL` und `KV_REST_API_TOKEN`.
2. Zusätzlich in den Vercel-Projekteinstellungen unter "Environment
   Variables" ergänzen:
   - `ADMIN_PASSWORD` – das Passwort, mit dem sich Petra anmeldet (frei
     wählbar, am besten nicht das gleiche wie bei E-Mail-Konten).
   - `ADMIN_SESSION_SECRET` – eine beliebige lange Zufallszeichenfolge, z. B.
     mit `openssl rand -hex 32` erzeugt. Einmal setzen und danach nicht mehr
     ändern (sonst werden alle angemeldeten Sitzungen ungültig).
3. Redeploy auslösen, damit die neuen Umgebungsvariablen aktiv werden.
4. Petra die Adresse `https://reiki-mensch-tier.ch/erfahrungen-verwalten`
   sowie das gewählte Passwort mitteilen. Die Seite ist bewusst nirgends
   verlinkt (auch nicht für Suchmaschinen, siehe `robots.ts`) – am besten als
   Lesezeichen speichern.

Die zugehörigen Dateien: `src/lib/testimonialsStore.ts` (Datenzugriff),
`src/lib/adminAuth.ts` (Login-Logik), `src/app/api/admin/*` (API-Routen),
`src/app/erfahrungen-verwalten/*` (Login- und Verwaltungsseite).

## 15. Patienten-Verwaltung (CRM) für Petra

Unter `/patienten-verwalten` gibt es ein zweites, unabhängiges
passwortgeschütztes Tool für Petra: eine einfache Patientenkartei mit
Kontaktdaten, zugehörigen Tieren (für Reiki für Tiere), einem
Behandlungsverlauf (Notizen mit Datum) und Terminen. Kommende Termine
werden auf der Übersichtsseite gesammelt angezeigt.

**Wichtig:** Hier können unter Umständen besonders schützenswerte
Personendaten (Gesundheitsdaten) hinterlegt werden. Das Tool ist technisch
sauber abgesichert (eigenes Passwort, nicht öffentlich verlinkt, von
Suchmaschinen ausgeschlossen), ersetzt aber keine rechtliche Prüfung, was
Petra dokumentieren darf bzw. muss – dazu im Zweifel kurz rechtlich
beraten lassen.

Nutzt denselben Datenspeicher wie die Erfahrungsberichte-Verwaltung
(Upstash for Redis, siehe Abschnitt 14), aber ein eigenes Passwort und
einen eigenen Sitzungs-Cookie, damit ein kompromittiertes Passwort nicht
automatisch Zugriff auf das jeweils andere Tool gewährt.

Einrichtung (einmalig, sofern Abschnitt 14 bereits eingerichtet ist):

1. In den Vercel-Projekteinstellungen unter "Environment Variables"
   ergänzen: `PATIENTS_ADMIN_PASSWORD` – ein eigenes, möglichst starkes
   Passwort, verschieden von `ADMIN_PASSWORD`.
2. Redeploy auslösen.
3. Petra die Adresse `https://reiki-mensch-tier.ch/patienten-verwalten`
   sowie das Passwort mitteilen. Auch diese Seite ist nirgends verlinkt –
   am besten als eigenes Lesezeichen speichern.

Die zugehörigen Dateien: `src/lib/patientsStore.ts` (Datenzugriff),
`src/lib/kv.ts` (gemeinsamer Datenspeicher-Zugriff), `src/app/api/patienten*`
(API-Routen), `src/app/patienten-verwalten/*` (Login- und
Verwaltungsseiten).

## 16. Automatische Erinnerungsmails (Termine & Geburtstage)

Einmal täglich prüft die Website automatisch, ob am nächsten Tag Termine
anstehen oder jemand Geburtstag hat, und verschickt bei Bedarf eine
E-Mail an Petra mit einer Übersicht. Gibt es weder Termine noch Geburtstage
am Folgetag, wird keine E-Mail verschickt.

Technisch läuft das über einen "Vercel Cron Job": Vercel ruft dazu einmal
täglich automatisch die Adresse `/api/cron/reminders` auf (Uhrzeit in
`vercel.json` hinterlegt, standardmässig um 5 Uhr UTC, also je nach
Sommer-/Winterzeit ca. 6–7 Uhr Schweizer Zeit). Es ist keine externe
App oder ein Handy-Kalender nötig, alles läuft direkt auf Vercel.

Einrichtung (einmalig):

1. In den Vercel-Projekteinstellungen unter "Environment Variables"
   ergänzen: `CRON_SECRET` – eine beliebige lange Zufallszeichenfolge
   (z. B. mit `openssl rand -hex 32` erzeugen). Damit kann die Erinnerungs-
   Route nicht von aussen missbraucht werden.
2. Optional: `PATIENTS_REMINDER_EMAIL` setzen, falls die Erinnerungen an
   eine andere Adresse als die allgemeine Kontaktadresse der Praxis gehen
   sollen.
3. Redeploy auslösen, damit Vercel den Cron Job aus `vercel.json`
   registriert (in den Projekteinstellungen unter "Cron Jobs" sichtbar).

Setzt denselben E-Mail-Versand wie das Kontaktformular voraus
(`RESEND_API_KEY`, siehe Abschnitt 9) – ist der bereits eingerichtet, ist
hier nichts weiter nötig.

Möchte Petra stattdessen z. B. 2 Tage im Voraus erinnert werden, lässt
sich das in `src/lib/reminders.ts` anpassen (dort steht `addDays(..., 1)`
für "morgen").

Die zugehörigen Dateien: `src/lib/reminders.ts` (Berechnung, welche
Termine/Geburtstage morgen anstehen), `src/lib/reminderMail.ts`
(E-Mail-Inhalt und Versand über Resend), `src/app/api/cron/reminders/route.ts`
(vom Cron Job aufgerufene Route), `vercel.json` (Zeitplan).

## 17. Android-App für die Patienten-Verwaltung (Play Store)

Die Patienten-Verwaltung lässt sich als echte, installierbare Android-App
anbieten – ohne den Web-Code neu zu schreiben. Technisch wird dazu die
bereits laufende Seite `/patienten-verwalten` in eine "Trusted Web
Activity" (TWA) verpackt: eine dünne Android-App-Hülle, die die Live-Website
ohne Adressleiste im Vollbild anzeigt und sich normal über den Play Store
installieren lässt.

Vorbereitet ist bereits:

- Eine App-Beschreibung mit Icon: `public/manifest-patienten.json`
  (Name, Farben, Icons unter `public/patienten-app-icons/`).
- Verlinkung dieses Manifests in `src/app/patienten-verwalten/layout.tsx`,
  wodurch sich das Tool zusätzlich schon jetzt direkt über Chrome auf dem
  Android-Homescreen installieren lässt ("Zum Startbildschirm hinzufügen"),
  auch ganz ohne Play Store.
- Eine Platzhalterdatei `public/.well-known/assetlinks.json`, die für die
  "adressleisten-freie" Vollbildansicht mit echten Werten befüllt werden
  muss (nächster Schritt).

So geht es weiter, ganz ohne Programmierkenntnisse (dauert ca. 20–30
Minuten):

1. **Google-Play-Konto anlegen** (falls noch nicht vorhanden): unter
   https://play.google.com/console registrieren. Einmalige Gebühr von
   25 USD, ein bestehendes Google-Konto reicht.
2. **App-Paket (.aab) erzeugen** – zwei gleichwertige Wege, das Ergebnis
   ist dasselbe:

   **Weg A – mit dem vorhandenen Android Studio auf dem Mac (mehr
   Kontrolle, empfohlen, wenn Android Studio schon installiert ist):**
   ```
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest=https://reiki-mensch-tier.ch/manifest-patienten.json
   ```
   Bubblewrap fragt dabei nach dem Package Name (z. B.
   `ch.reikimenschtier.patienten.twa`, frei wählbar) und findet JDK sowie
   Android SDK von Android Studio meist automatisch (Android SDK i. d. R.
   unter `~/Library/Android/sdk`, JDK im Android-Studio-Programmordner).
   Danach:
   ```
   bubblewrap build
   ```
   Das erzeugt eine signierte `.aab`-Datei sowie – wichtig – gibt am Ende
   direkt den "SHA-256 Fingerprint" und Package Name für den nächsten
   Schritt aus (auch später jederzeit erneut abrufbar mit
   `bubblewrap fingerprint`).

   **Weg B – ganz ohne Installation über https://www.pwabuilder.com:**
   URL `https://reiki-mensch-tier.ch/patienten-verwalten/login` eingeben,
   "Package for stores" → "Android" auswählen; erzeugt ebenfalls eine
   fertige, signierte `.aab`-Datei sowie Package Name und SHA-256-
   Fingerprint zum Herunterladen.
3. Mir (im Chat) den Package Name und den SHA-256-Fingerprint schicken
   (oder die generierte `assetlinks.json` schicken) – ich trage die Werte
   dann in `public/.well-known/assetlinks.json` ein und du pushst das
   Update. Erst danach öffnet sich die App ohne Adressleiste, also wirklich
   wie eine "echte" App.
4. In der Play Console einen neuen App-Eintrag anlegen, die `.aab`-Datei
   hochladen und den Store-Eintrag ausfüllen (Name, kurze Beschreibung,
   mindestens 2 Screenshots – z. B. eigene Bildschirmfotos der
   Patienten-Verwaltung –, Link zur Datenschutzerklärung:
   `https://reiki-mensch-tier.ch/datenschutz`, Inhalts-Einstufung und
   Zielgruppe ausfüllen).
5. **Empfehlung:** Da es sich um ein internes Werkzeug nur für Petra
   handelt, die App nicht öffentlich bewerben, sondern als "nicht
   gelistet" veröffentlichen oder auf den Track "Interner Test"
   beschränken. Petra dann direkt per Einladungslink (den die Play
   Console erzeugt) zur Installation einladen, statt die App über die
   Play-Store-Suche auffindbar zu machen.

Wichtig zu wissen: Die App zeigt weiterhin live die Website an – es gibt
keinen eigenständigen "Offline-Modus", eine Internetverbindung ist wie im
Browser nötig. Das Login-Passwort bleibt der einzige Zugriffsschutz, auch
innerhalb der App.
