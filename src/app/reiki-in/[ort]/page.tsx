import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLandingPage, getLandingPagesByCategory, landingPagePath } from "@/config/landingPages";
import LandingPageContent from "@/components/sections/LandingPageContent";

type PageProps = {
  params: { ort: string };
};

export function generateStaticParams() {
  return getLandingPagesByCategory("ort").map((entry) => ({ ort: entry.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getLandingPage("ort", params.ort);
  if (!entry) return {};

  return buildMetadata({
    title: entry.metaTitle,
    description: entry.metaDescription,
    path: landingPagePath(entry)
  });
}

export default function ReikiInOrtPage({ params }: PageProps) {
  const entry = getLandingPage("ort", params.ort);
  if (!entry) notFound();

  return (
    <LandingPageContent
      entry={entry}
      breadcrumb={[
        { name: "Startseite", path: "/" },
        { name: "Reiki in Ihrer Region", path: "/reiki-in" },
        { name: entry.h1, path: landingPagePath(entry) }
      ]}
    />
  );
}
