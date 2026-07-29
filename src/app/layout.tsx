import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Reiki für Menschen und Tiere im Raum Bern | ${siteConfig.practiceName}`,
    template: `%s | ${siteConfig.practiceName}`
  },
  description: `Achtsame Reiki-Anwendungen für Kinder, Erwachsene und Tiere in ${siteConfig.address.city} im Raum Bern. Persönliche Begleitung, ruhige Atmosphäre und unverbindliche Kontaktaufnahme.`,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: siteConfig.practiceName
  }
};

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#reiki-studio`,
        name: siteConfig.practiceName,
        description: siteConfig.tagline,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        priceRange: "CHF 30–90",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          postalCode: siteConfig.address.postalCode,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          addressCountry: "CH"
        },
        areaServed: [
          { "@type": "City", name: "Gümmenen" },
          { "@type": "City", name: "Bern" },
          { "@type": "City", name: "Laupen" },
          { "@type": "City", name: "Murten" },
          { "@type": "City", name: "Kerzers" },
          { "@type": "City", name: "Mühleberg" }
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday"],
            opens: "09:00",
            closes: "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "12:00"
          }
        ],
        sameAs: [siteConfig.social.facebook].filter(
          (link) => typeof link === "string" && !link.includes("[")
        )
      },
      {
        "@type": "Person",
        name: siteConfig.providerName,
        jobTitle: siteConfig.jobTitle,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.practiceName
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body
        className={`${cinzel.variable} ${montserrat.variable} flex min-h-screen flex-col font-sans`}
      >
        <StructuredData />
        <SkipLink />
        <Header />
        <main id="hauptinhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
