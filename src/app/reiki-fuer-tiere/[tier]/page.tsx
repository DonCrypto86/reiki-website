import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLandingPage, getLandingPagesByCategory, landingPagePath } from "@/config/landingPages";
import LandingPageContent from "@/components/sections/LandingPageContent";

type PageProps = {
  params: { tier: string };
};

export function generateStaticParams() {
  return getLandingPagesByCategory("tier").map((entry) => ({ tier: entry.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getLandingPage("tier", params.tier);
  if (!entry) return {};

  return buildMetadata({
    title: entry.metaTitle,
    description: entry.metaDescription,
    path: landingPagePath(entry)
  });
}

export default function ReikiFuerTierePage({ params }: PageProps) {
  const entry = getLandingPage("tier", params.tier);
  if (!entry) notFound();

  return (
    <LandingPageContent
      entry={entry}
      breadcrumb={[
        { name: "Startseite", path: "/" },
        { name: "Reiki für Tiere", path: "/reiki-fuer-tiere" },
        { name: entry.h1, path: landingPagePath(entry) }
      ]}
    />
  );
}
