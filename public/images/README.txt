Bildordner – Hinweise zum Austausch der Platzhalter
====================================================

Bereits eingebundene Bilder (echte Fotos, kein Platzhalter mehr):

- petra-reiki.jpeg      -> /ueber-mich (Porträt)
- reiki-studio3.png     -> Startseite, IntroSection (Studio-Detail, 4:3)
- reiki-studio5.png     -> Startseite, HeroSection (Studio-Eingang)
- reiki-tier1.png    -> /reiki-fuer-tiere, Bild-Slider (Katze)
- reiki-tier2.png    -> /reiki-fuer-tiere, Bild-Slider (Berner Sennenhund)
- reiki-tier4.png    -> /reiki-fuer-tiere, Bild-Slider (Hund auf dem Rücken)
- reiki-tier5.png    -> /reiki-fuer-tiere, Bild-Slider (Behandlungsraum)
- blume-des-lebens.svg -> Header-Logo neben dem Studionamen (freigestellte
                        Vektorgrafik, transparenter Hintergrund).

Der Bild-Slider (src/components/ui/ImageSlider.tsx) wechselt automatisch
alle 5 Sekunden (autoPlayInterval-Prop), pausiert bei Hover/Mausklick auf
den Pause-Button und startet bei "prefers-reduced-motion" gar nicht erst
automatisch. Bilder lassen sich im "images"-Array in der jeweiligen Page
austauschen.

Hinweis: Eine Chakra-Punkte-Grafik mit Regenbogen-Aura (Katze/Hund mit
farbigen Punkten) wurde zweimal angeliefert (reiki-tier3.jpeg,
tier-reiki3.png) und beide Male bewusst NICHT eingebunden, da sie der
abgestimmten Bildsprache (keine übertriebene Chakra-Symbolik) widerspricht.
Die Dateien liegen weiterhin im Downloads-Ordner, falls sie später doch
benötigt werden.

Noch als neutrale Bildfläche (Komponente ImagePlaceholder) offen, bis
weitere authentische Fotos vorliegen. Sobald ein Bild bereitsteht, hier
ablegen und im jeweiligen Code den "src"-Prop von ImagePlaceholder
ergänzen (Next.js Image-Komponente wird dann automatisch verwendet).

Empfohlene Dateinamen für noch fehlende Motive (können angepasst werden,
dann Pfade im Code entsprechend ändern):

- reiki-fuer-menschen-raum.jpg   -> /reiki-fuer-menschen
- reiki-haende.jpg               -> optional, Hände während einer Anwendung

Beispiel für die Anpassung in einer Komponente:

  <ImagePlaceholder
    label="Porträt der Reiki-Anbieterin"
    alt="Porträt von [NAME DER ANBIETERIN] in ruhiger Umgebung"
    src="/images/portrait-anbieterin.jpg"
  />

Bitte ausschließlich Bilder verwenden, an denen die entsprechenden
Bildrechte vorliegen. Keine Stockfotos mit Lichtstrahlen, Chakra-Symbolik
oder meditierenden Tieren.
