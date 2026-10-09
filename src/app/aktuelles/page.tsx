import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SecondaryButton from "@/components/ui/SecondaryButton";

export const metadata: Metadata = buildMetadata({
  title: "Aktuelles",
  description: "Neuigkeiten rund um das Reiki Studio, etwa Öffnungszeiten, Pausen oder saisonale Hinweise.",
  path: "/aktuelles"
});

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function NewsPage() {
  const { newsPage } = siteConfig;

  const sortedPosts = [...newsPage.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1>{newsPage.heading}</h1>
        <p className="mt-4 text-ink-light">{newsPage.intro}</p>
      </Container>

      <Container className="mt-10 max-w-3xl space-y-6">
        {sortedPosts.length === 0 ? (
          <p className="text-ink-light">Derzeit liegen keine Einträge vor.</p>
        ) : (
          sortedPosts.map((post) => (
            <article
              key={`${post.date}-${post.title}`}
              className="overflow-hidden rounded-xl2 bg-beige ring-1 ring-beige-dark/60"
            >
              {post.imageSrc ? (
                <div className="mx-auto max-w-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageSrc}
                    alt={post.imageAlt ?? ""}
                    className="block h-auto w-full"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <p className="text-sm text-ink-light">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h2 className="mt-1 text-xl">{post.title}</h2>
                <p className="mt-3 text-ink-light">{post.text}</p>
                {post.ctaHref && post.ctaLabel ? (
                  <SecondaryButton href={post.ctaHref} className="mt-4 px-5 py-2 text-xs">
                    {post.ctaLabel}
                  </SecondaryButton>
                ) : null}
              </div>
            </article>
          ))
        )}
      </Container>
    </section>
  );
}
