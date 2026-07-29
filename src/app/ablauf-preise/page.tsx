import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import LegalNotice from "@/components/ui/LegalNotice";
import PrimaryButton from "@/components/ui/PrimaryButton";
import CallToActionSection from "@/components/sections/CallToActionSection";

export const metadata: Metadata = buildMetadata({
  title: "Ablauf und Preise",
  description:
    "Dauer, Preise und Ablauf der Reiki-Anwendungen für Menschen und Tiere im Reiki Studio Gümmenen im Raum Bern.",
  path: "/ablauf-preise"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Ablauf und Preise", path: "/ablauf-preise" }
]);

function PriceList({
  heading,
  items
}: {
  heading: string;
  items: { label: string; duration?: string; price: string; note?: string }[];
}) {
  return (
    <div className="rounded-xl2 bg-cream-light p-6 ring-1 ring-beige-dark/60 sm:p-8">
      <h2 className="text-xl">{heading}</h2>
      <dl className="mt-6 divide-y divide-beige-dark">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4 py-4">
            <div>
              <dt className="font-medium text-ink">{item.label}</dt>
              {item.duration ? <dd className="text-sm text-ink-light">{item.duration}</dd> : null}
              {item.note ? <dd className="text-sm text-ink-light">{item.note}</dd> : null}
            </div>
            <dd className="whitespace-nowrap font-semibold text-forest">{item.price}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function PricingPage() {
  const { pricing } = siteConfig;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-cream-light py-14 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h1>Ablauf und Preise</h1>
          <p className="mt-4 text-ink-light">
            Eine transparente Übersicht über Dauer und Kosten der Reiki-Anwendungen.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <PriceList heading={pricing.humans.heading} items={[...pricing.humans.items]} />
          <PriceList heading={pricing.animals.heading} items={[...pricing.animals.items]} />
        </Container>
        <Container className="mt-6 max-w-3xl">
          <LegalNotice>{pricing.disclaimer}</LegalNotice>
        </Container>
      </section>

      <section className="bg-terracotta/10 py-14 sm:py-20">
        <Container className="max-w-2xl text-center">
          <SectionHeading as="h2" title={pricing.voucher.heading} align="center" />
          <p className="mt-4 text-ink-light">{pricing.voucher.text}</p>
          <p className="mt-3 text-sm text-ink-light">{pricing.voucher.note}</p>
          <p className="mt-1 text-sm font-medium text-forest">{pricing.voucher.priceNote}</p>
          <div className="mt-6">
            <PrimaryButton href={pricing.voucher.cta.href}>
              {pricing.voucher.cta.label}
            </PrimaryButton>
          </div>
        </Container>
      </section>

      <section className="bg-beige py-14 sm:py-20">
        <Container>
          <SectionHeading as="h2" title={pricing.details.heading} align="center" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.details.items.map((detail) => (
              <div key={detail.title} className="rounded-xl2 bg-cream-light p-6 ring-1 ring-beige-dark/60">
                <h3 className="text-lg">{detail.title}</h3>
                <p className="mt-2 text-sm text-ink-light">{detail.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CallToActionSection
        heading={siteConfig.closingSection.heading}
        text={siteConfig.closingSection.text}
        ctaLabel={siteConfig.closingSection.ctaLabel}
        href={siteConfig.closingSection.href}
      />
    </>
  );
}
