import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLandingPage, getLandingPagesByCategory, landingPagePath } from "@/config/landingPages";
import LandingPageContent from "@/components/sections/LandingPageContent";

type PageProps = {
  params: { thema: string };
};

export function generateStaticParams() {
  return getLandingPagesByCategory("mensch-thema").map((entry) => ({ thema: entry.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getLandingPage("mensch-thema", params.thema);
  if (!entry) return {};

  return buildMetadata({
    title: entry.metaTitle,
    description: entry.metaDescription,
    path: landingPagePath(entry)
  });
}

export default function ReikiFuerMenschenThemaPage({ params }: PageProps) {
  const entry = getLandingPage("mensch-thema", params.thema);
  if (!entry) notFound();

  return (
    <LandingPageContent
      entry={entry}
      breadcrumb={[
        { name: "Startseite", path: "/" },
        { name: "Reiki für Menschen", path: "/reiki-fuer-menschen" },
        { name: entry.h1, path: landingPagePath(entry) }
      ]}
    />
  );
}
