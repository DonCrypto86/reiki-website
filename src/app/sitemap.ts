import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { landingPages, landingPagePath } from "@/config/landingPages";

const paths = [
  "/",
  "/ueber-mich",
  "/reiki-fuer-menschen",
  "/reiki-fuer-tiere",
  "/reiki-in",
  "/reiki-behandlung",
  "/aktuelles",
  "/ablauf-preise",
  "/erfahrungen",
  "/faq",
  "/kontakt",
  "/impressum",
  "/datenschutz"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6
  }));

  // Landingpages (Orte, Themen bei Menschen, Tierarten) automatisch aus
  // derselben Datenquelle wie das Routing selbst – siehe
  // src/config/landingPages.ts, damit hier nichts von Hand nachgeführt
  // werden muss.
  const landingEntries: MetadataRoute.Sitemap = landingPages.map((entry) => ({
    url: `${siteConfig.url}${landingPagePath(entry)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5
  }));

  return [...staticEntries, ...landingEntries];
}
