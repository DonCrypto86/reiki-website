import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import Container from "@/components/ui/Container";
import TestimonialCard from "@/components/ui/TestimonialCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import LegalNotice from "@/components/ui/LegalNotice";
import { getPublishedTestimonials } from "@/lib/testimonialsStore";

export const metadata: Metadata = buildMetadata({
  title: "Erfahrungen – Reiki in Gümmenen im Raum Bern",
  description:
    "Echte Erfahrungsberichte zu Reiki-Anwendungen für Menschen und Tiere im Reiki Studio in Gümmenen im Raum Bern.",
  path: "/erfahrungen"
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Startseite", path: "/" },
  { name: "Erfahrungen", path: "/erfahrungen" }
]);

export default async function ReviewsPage() {
  const { reviewsPage } = siteConfig;
  const testimonials = await getPublishedTestimonials();

  return (
    <section className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container className="max-w-3xl text-center">
        <h1>{reviewsPage.heading}</h1>
        <p className="mt-4 text-ink-light">{reviewsPage.intro}</p>
      </Container>

      <Container className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            author={testimonial.author}
            context={testimonial.context}
          />
        ))}
      </Container>

      <Container className="mt-10 max-w-3xl space-y-6">
        <LegalNotice>{reviewsPage.moderationNote}</LegalNotice>
        <div className="text-center">
          <PrimaryButton href={reviewsPage.shareCta.href}>
            {reviewsPage.shareCta.label}
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}
