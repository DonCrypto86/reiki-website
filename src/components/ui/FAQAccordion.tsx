"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/config/site";

type FAQAccordionProps = {
  items: FaqItem[];
  /** Eindeutiges Präfix für IDs, falls mehrere Accordions auf einer Seite existieren. */
  idPrefix?: string;
  /** Überschriftenebene der Fragen, passend zur umgebenden Seitenhierarchie. */
  headingLevel?: "h2" | "h3";
};

/**
 * Barrierearmes Accordion nach dem "Disclosure"-Muster: Jeder Titel ist ein
 * <button>, dadurch automatisch per Tastatur bedienbar (Tab, Enter, Space).
 * aria-expanded und aria-controls verbinden Button und Panel eindeutig.
 */
export default function FAQAccordion({
  items,
  idPrefix = "faq",
  headingLevel: HeadingTag = "h2"
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-beige-dark rounded-xl2 bg-cream-light ring-1 ring-beige-dark/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={item.question}>
            <HeadingTag>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-forest hover:text-forest-dark sm:text-lg"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-sage-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </HeadingTag>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-5 text-ink-light"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
