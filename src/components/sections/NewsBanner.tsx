import Link from "next/link";
import { siteConfig } from "@/config/site";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/**
 * Schmales Ankündigungsband ganz oben auf der Startseite (direkt unter dem
 * Header), das auf den neuesten Eintrag der Aktuelles-Seite hinweist, z. B.
 * ein bevorstehendes Event. Zeigt nichts an, wenn keine Einträge vorhanden
 * sind.
 */
export default function NewsBanner() {
  const { newsPage } = siteConfig;
  const [latestPost] = [...newsPage.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (!latestPost) {
    return null;
  }

  return (
    <div className="bg-forest text-cream">
      <Link
        href="/aktuelles"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-center text-sm hover:underline"
      >
        <span className="font-medium">{latestPost.title}</span>
        <span>
          · <time dateTime={latestPost.date}>{formatDate(latestPost.date)}</time>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
