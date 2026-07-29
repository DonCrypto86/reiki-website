import type { ProcessStep } from "@/config/site";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

/**
 * Nummerierte Ablaufdarstellung (z. B. Kontakt → Vorgespräch → Anwendung →
 * Abschluss). Als geordnete Liste umgesetzt, damit die Reihenfolge auch
 * semantisch klar ist.
 */
export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative rounded-xl2 bg-cream-light p-6 ring-1 ring-beige-dark/60"
        >
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-forest font-serif text-lg text-cream"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <h3 className="mb-2 text-lg">{step.title}</h3>
          <p className="text-sm text-ink-light">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
