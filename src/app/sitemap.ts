import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const paths = [
  "/",
  "/ueber-mich",
  "/reiki-fuer-menschen",
  "/reiki-fuer-tiere",
  "/aktuelles",
  "/ablauf-preise",
  "/erfahrungen",
  "/faq",
  "/kontakt",
  "/impressum",
  "/datenschutz"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6
  }));
}
