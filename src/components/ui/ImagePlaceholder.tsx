import Image from "next/image";
import { ImageOff } from "lucide-react";

type ImagePlaceholderProps = {
  /** Beschreibt, welches Motiv später an dieser Stelle stehen soll. */
  label: string;
  /** Sinnvoller Alt-Text, sobald ein echtes Bild eingesetzt wird. */
  alt: string;
  /** Optionaler echter Bildpfad, z. B. "/images/portrait-anbieterin.jpg". */
  src?: string;
  className?: string;
  aspectClassName?: string;
  priority?: boolean;
};

/**
 * Neutrale Bildfläche als Platzhalter für noch fehlende, authentische
 * Fotos. Sobald ein echtes Bild vorliegt, `src` setzen – die Komponente
 * nutzt dann automatisch next/image für eine optimierte Darstellung.
 *
 * Bewusst keine Stockfotos mit Lichtstrahlen, Chakren-Symbolik o. Ä.
 */
export default function ImagePlaceholder({
  label,
  alt,
  src,
  className = "",
  aspectClassName = "aspect-[4/3]",
  priority = false
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl2 ${aspectClassName} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex ${aspectClassName} flex-col items-center justify-center gap-3 rounded-xl2 border border-dashed border-sage-300 bg-beige px-6 text-center ${className}`}
    >
      <ImageOff className="h-8 w-8 text-sage-600" aria-hidden="true" />
      <p className="text-sm text-ink-light">
        Bildplatzhalter: <span className="font-medium text-ink">{label}</span>
      </p>
    </div>
  );
}
