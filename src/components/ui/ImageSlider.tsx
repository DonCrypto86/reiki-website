"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type SliderImage = {
  src: string;
  alt: string;
};

type ImageSliderProps = {
  images: SliderImage[];
  aspectClassName?: string;
  className?: string;
  priority?: boolean;
  /** Millisekunden bis zum automatischen Weiterschalten. 0/undefined = kein Autoplay. */
  autoPlayInterval?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ruhiger Bild-Slider. Wechsel erfolgt per Klick/Tastatur; optional zusätzlich
 * automatisch nach `autoPlayInterval` ms. Damit sich nichts unaufgefordert
 * und unkontrollierbar bewegt (WCAG 2.2.2 "Pause, Stop, Hide"):
 * - Autoplay pausiert bei Hover.
 * - Bei "prefers-reduced-motion" startet Autoplay erst gar nicht.
 * Alle Bedienelemente sind native <button>-Elemente und damit ohne
 * Zusatzaufwand per Tastatur erreichbar; ein aria-live-Bereich informiert
 * Screenreader über den aktuellen Stand.
 */
export default function ImageSlider({
  images,
  aspectClassName = "aspect-[4/3] lg:aspect-square",
  className = "",
  priority = false,
  autoPlayInterval = 0
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [allowAutoPlay] = useState(() => autoPlayInterval > 0 && !prefersReducedMotion());

  const autoPlayActive = allowAutoPlay && !isHovering && autoPlayInterval > 0 && images.length > 1;

  useEffect(() => {
    if (!autoPlayActive) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [index, autoPlayActive, autoPlayInterval, images.length]);

  if (images.length === 0) {
    return null;
  }

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl2 ${aspectClassName} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {images.map((image, i) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority && i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="sr-only" aria-live="polite">
        Bild {index + 1} von {images.length}: {images[index].alt}
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-forest shadow-soft transition-colors hover:bg-cream-light"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-forest shadow-soft transition-colors hover:bg-cream-light"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Bild ${i + 1} von ${images.length} anzeigen`}
                aria-current={i === index}
                className="group flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`h-2.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-cream-light"
                      : "w-2.5 bg-cream-light/60 group-hover:bg-cream-light/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
