import { getAllTestimonials } from "@/lib/testimonialsStore";
import TestimonialsAdminManager from "@/components/admin/TestimonialsAdminManager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();
  const sorted = [...testimonials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <TestimonialsAdminManager initialTestimonials={sorted} />
    </div>
  );
}
