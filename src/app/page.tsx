import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import NewsBanner from "@/components/sections/NewsBanner";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import AudienceSection from "@/components/sections/AudienceSection";
import IntroSection from "@/components/sections/IntroSection";
import WhatIsReikiSection from "@/components/sections/WhatIsReikiSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export const metadata: Metadata = buildMetadata({
  title: `Reiki für Menschen und Tiere im Raum Bern | ${siteConfig.practiceName}`,
  description: `Achtsame Reiki-Anwendungen für Kinder, Erwachsene und Tiere in ${siteConfig.address.city} im Raum Bern. Persönliche Begleitung, ruhige Atmosphäre und unverbindliche Kontaktaufnahme.`,
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <NewsBanner />
      <HeroSection />
      <TrustSection />
      <AudienceSection />
      <IntroSection />
      <WhatIsReikiSection />
      <ProcessSection />
      <TestimonialsSection />
    </>
  );
}
