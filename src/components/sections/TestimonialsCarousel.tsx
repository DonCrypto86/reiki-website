"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
  /** Anzahl gleichzeitig sichtbarer Kundenstimmen (Standard: 3, wie im Grid). */
  groupSize?: number;
  /** Millisekunden bis zum automatischen Weiterschalten. */
  autoPlayInterval?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

/**
 * Zeigt Kundenstimmen gruppenweise (Standard: 3 gleichzeitig) und wechselt
 * die Gruppe in einem ruhigen Zeitabstand automatisch, mit sanftem
 * Fade-Übergang. Wie beim Bild-Slider bleibt der Wechsel jederzeit
 * steuerbar (WCAG 2.2.2 "Pause, Stop, Hide"):
 * - Autoplay pausiert bei Hover.
 * - Bei "prefers-reduced-motion" startet Autoplay erst gar nicht.
 * - Punkte-Navigation erlaubt den direkten Sprung zu einer Gruppe.
 */
export default function TestimonialsCarousel({
  testimonials,
  groupSize = 3,
  autoPlayInterval = 7000
}: TestimonialsCarouselProps) {
  const groups = chunk(testimonials, groupSize);
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [allowAutoPlay] = useState(() => !prefersReducedMotion());

  const autoPlayActive = allowAutoPlay && !isHovering && groups.length > 1;

  useEffect(() => {
    if (!autoPlayActive) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % groups.length);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [index, autoPlayActive, autoPlayInterval, groups.length]);

  if (groups.length === 0) {
    return null;
  }

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + groups.length) % groups.length);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative grid min-h-[20rem] gap-6 md:grid-cols-3">
        {groups.map((group, groupIndex) => (
          <div
            key={group.map((t) => t.id).join("-")}
            className={`col-span-full grid gap-6 transition-opacity duration-500 md:grid-cols-3 ${
              groupIndex === index
                ? "relative opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0"
            }`}
            aria-hidden={groupIndex !== index}
          >
            {group.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                context={testimonial.context}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="sr-only" aria-live="polite">
        Kundenstimmen {index + 1} von {groups.length}
      </div>

      {groups.length > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          {groups.map((group, i) => (
            <button
              key={group.map((t) => t.id).join("-")}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Kundenstimmen ${i + 1} von ${groups.length} anzeigen`}
              aria-current={i === index}
              className="group flex h-8 w-8 items-center justify-center"
            >
              <span
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-forest"
                    : "w-2.5 bg-forest/30 group-hover:bg-forest/50"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
