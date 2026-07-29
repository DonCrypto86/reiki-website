# SEO-Audit-Bericht: Reiki Studio Petra In-Albon

Stand: 29. Juli 2026
Fokus: Lokale SEO-Leistung für Reiki-Suchanfragen im Raum Bern (Kanton Bern, Schweiz)

## Zusammenfassung

Die Website wurde in dieser Session gezielt für lokale Sichtbarkeit optimiert, ohne das ruhige, hochwertige Erscheinungsbild oder den authentischen Tonfall zu verändern. Es wurden keine Heilversprechen ergänzt und keine Keyword-Stuffing-Formulierungen verwendet – alle lokalen Bezüge ("im Raum Bern", "in Gümmenen") wurden dort platziert, wo sie natürlich wirken: in Title-Tags, Meta-Beschreibungen und strukturierten Daten.

## Stärken

Die Codebasis ist sauber und zentral über eine einzige Konfigurationsdatei (`site.ts`) gesteuert, was Konsistenz und zukünftige Pflege stark vereinfacht. Next.js App Router und die Metadata API werden korrekt genutzt, inklusive Canonical-URLs, Open-Graph- und Twitter-Card-Daten auf jeder Seite.

Strukturierte Daten sind umfassend vorhanden: ein angereichertes `ProfessionalService`-Schema (mit `@id`, `priceRange`, `areaServed` für Gümmenen, Bern, Laupen, Murten, Kerzers und Mühleberg, sowie Öffnungszeiten), ein `Person`-Schema für Petra In-Albon, ein `FAQPage`-Schema und nun ein `BreadcrumbList`-Schema auf allen sieben Kernseiten. `sitemap.xml` und `robots.ts` sind korrekt eingerichtet und verweisen aufeinander.

Inhaltlich überzeugt die Seite durch echte, anonymisierte Erfahrungsberichte statt generischer Platzhaltertexte, transparente und aktuelle Preisangaben sowie durchgängig vorsichtige, rechtssichere Formulierungen ohne unzulässige Heilversprechen – ein wichtiger Faktor für Googles Helpful-Content- und E-E-A-T-Richtlinien, besonders bei gesundheitsnahen Themen. Bilder werden mit `next/image` und Fonts mit `next/font` performant eingebunden (Lazy Loading, `font-display: swap`). Mobile Bedienbarkeit wurde bereits per Code-Audit geprüft und verbessert (Header-Skalierung, Touch-Ziele, umbruchsichere Formulare).

## Schwächen

Vor dieser Session fehlten Breadcrumb-Daten und lokale Keyword-Bezüge in den Meta-Titeln mehrerer Unterseiten vollständig – dies wurde behoben. Weiterhin offen: Es gibt kein `AggregateRating`- oder `Review`-Schema, da dafür echte, verifizierbare Sternebewertungen (z. B. aus Google) nötig wären; ein erfundenes Bewertungsschema würde gegen Googles Richtlinien verstossen und wurde bewusst nicht ergänzt.

Der Facebook-Link ist weiterhin ein Platzhalter (`[PROFILNAME]`) und wird deshalb korrekt aus den strukturierten Daten herausgefiltert – als Trust-Signal fehlt er aber. Ob der WhatsApp-Link im Footer bleiben oder entfernt werden soll, ist noch nicht abschliessend geklärt. Bildgrössen und Core Web Vitals (LCP, CLS, INP) konnten in dieser Umgebung nicht live gemessen werden, da sich kein Produktions-Build in der Sandbox erstellen lässt – das muss nach dem Go-Live mit echten Tools (PageSpeed Insights, Lighthouse) geprüft werden.

## Optimierungsmöglichkeiten

Der grösste zusätzliche Hebel für lokale Sichtbarkeit liegt ausserhalb der Website: ein vollständiges, gepflegtes Google Unternehmensprofil (Google Business Profile) mit exakt übereinstimmenden Kontaktdaten (Name, Adresse, ggf. Telefon), Kategorie "Reiki" bzw. "Alternative Heilpraxis", Öffnungszeiten und regelmässigen Beiträgen ist für das lokale "Map Pack" bei Suchen wie "Reiki Bern" oft entscheidender als reine Website-Optimierung.

Auf der Website selbst empfiehlt sich künftig mehr interne Verlinkung zwischen thematisch verwandten Seiten (z. B. ein Verweis auf "Reiki für Tiere" im Fliesstext von "Ablauf und Preise"), das Nachreichen des echten Facebook-Links, eine finale Entscheidung zum WhatsApp-Link sowie – sobald verfügbar – echte Google-Bewertungen zu sammeln und dann erst ein Review-Schema zu ergänzen. Nach dem Deployment sollte eine Bildgrössen- und Core-Web-Vitals-Prüfung mit echten Tools erfolgen.

Bewusst **nicht** umgesetzt wurden separate Landingpages pro Ort ("Reiki in Bern", "Reiki in Gümmenen" als eigene Seiten): Da es nur einen physischen Standort gibt, bestünde hier ein reales Risiko von sogenannten Doorway-Pages – nahezu identischen Seiten mit austauschbarem Ortsnamen, die Google explizit als Spam-Muster einstuft und abwerten kann. Stattdessen wurden die bestehenden Kernseiten (Startseite, Für Menschen, Für Tiere, Kontakt etc.) direkt mit den relevanten lokalen Bezügen angereichert – das erzielt denselben Sichtbarkeitseffekt ohne das Abwertungsrisiko.

## Prioritäten

An erster Stelle steht die Einrichtung bzw. Pflege eines Google Unternehmensprofils, da dies für lokale Reiki-Suchen im Raum Bern den grössten Hebel darstellt. Danach folgt die technische Prüfung der Core Web Vitals und Bildgrössen nach dem Live-Deployment. Mit mittlerer Priorität sollten der Facebook-Link vervollständigt und die WhatsApp-Frage geklärt werden. Ein Review-Schema sollte erst ergänzt werden, sobald echte Bewertungen vorliegen. Zusätzliche Orts-Landingpages sollten weiterhin nicht angelegt werden.

## Erwartete SEO-Wirkung

Durch die natürliche Einbindung lokaler Suchbegriffe in Title-Tags, Meta-Beschreibungen und strukturierte Daten sollte sich die Sichtbarkeit für Suchanfragen wie "Reiki Bern", "Reiki Gümmenen" oder "Reiki für Tiere Bern" schrittweise verbessern. Breadcrumb- und FAQ-Rich-Snippets können die Darstellung in den Suchergebnissen attraktiver machen und die Klickrate erhöhen. Das Person-Schema, echte Erfahrungsberichte und transparente Preise stärken das Vertrauenssignal (E-E-A-T), das Google insbesondere bei gesundheitsnahen Themen stark gewichtet.

Diese Massnahmen wirken über Wochen bis Monate, nicht sofort – SEO ist ein kontinuierlicher Prozess. Der wirkungsvollste kurzfristige nächste Schritt bleibt ausserhalb der reinen Website-Technik: ein vollständiges, aktives Google Unternehmensprofil.
