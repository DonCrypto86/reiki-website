import type { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";

type ServiceCardProps = {
  title: string;
  text: string;
  ctaLabel: string;
  href: string;
  icon?: ReactNode;
};

/**
 * Karte für die zwei Zielgruppen (Menschen/Tiere) auf der Startseite,
 * grundsätzlich aber für beliebige Angebots-Kacheln wiederverwendbar.
 */
export default function ServiceCard({ title, text, ctaLabel, href, icon }: ServiceCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl2 bg-cream-light p-8 shadow-soft ring-1 ring-beige-dark/60 transition-transform duration-200 hover:-translate-y-1">
      {icon ? <div className="mb-4 text-sage-600">{icon}</div> : null}
      <h3 className="mb-3">{title}</h3>
      <p className="mb-6 flex-1 text-ink-light">{text}</p>
      <PrimaryButton href={href} className="self-start">
        {ctaLabel}
      </PrimaryButton>
    </div>
  );
}
