import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Erstellt konsistente Metadaten (Titel, Beschreibung, Open Graph, Canonical)
 * für eine einzelne Seite. `path` ist die sprechende URL ohne Domain, z. B. "/ueber-mich".
 */
export function buildMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.practiceName,
      locale: "de_CH",
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

/**
 * Erstellt ein BreadcrumbList-JSON-LD-Objekt für eine Unterseite. `items`
 * beginnt idealerweise mit der Startseite und endet mit der aktuellen Seite.
 * Wird als <script type="application/ld+json"> in die jeweilige Seite
 * eingebunden (rein strukturierte Daten, keine sichtbare Breadcrumb-Leiste).
 */
export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`
    }))
  };
}
