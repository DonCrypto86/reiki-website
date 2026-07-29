type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

/**
 * Einheitliche Abschnittsüberschrift mit optionalem Kicker-Text und
 * Beschreibung. Sorgt für konsistente Überschriftenhierarchie.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2"
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-600">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="text-balance">{title}</Heading>
      {description ? (
        <p className="mt-4 text-base text-ink-light sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
