/**
 * Ermöglicht Tastatur- und Screenreader-Nutzenden, die wiederkehrende
 * Navigation zu überspringen und direkt zum Hauptinhalt zu gelangen.
 * Ist visuell verborgen, bis das Element den Fokus erhält.
 */
export default function SkipLink() {
  return (
    <a href="#hauptinhalt" className="skip-link">
      Zum Hauptinhalt springen
    </a>
  );
}
