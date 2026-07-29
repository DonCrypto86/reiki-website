import { Quote } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  author: string;
  context: string;
};

/**
 * Stellt eine einzelne Kundenstimme dar. Verwendet bewusst keine
 * Sternebewertungen oder erfundenen Bewertungszahlen.
 */
export default function TestimonialCard({ quote, author, context }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-xl2 bg-beige p-8 shadow-soft">
      <Quote className="mb-4 h-6 w-6 text-terracotta" aria-hidden="true" />
      <blockquote className="flex-1 text-ink">
        <p>&bdquo;{quote}&ldquo;</p>
      </blockquote>
      <figcaption className="mt-6 text-sm font-semibold text-forest">
        {author}
        <span className="block font-normal text-ink-light">{context}</span>
      </figcaption>
    </figure>
  );
}
