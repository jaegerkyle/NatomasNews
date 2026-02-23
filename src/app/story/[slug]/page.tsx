import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LaneBadge } from "@/components/LaneBadge";
import { getAllStories, getRelatedStories, getStoryBySlug, renderMdx } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { formatDateTime } from "@/lib/date";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {};
  }

  const canonical = `/story/${story.slug}`;

  return {
    title: story.title,
    description: story.summary ?? story.dek,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.summary ?? story.dek,
      publishedTime: story.publishedAt,
      url: `${SITE_URL}${canonical}`,
      images: story.coverImage ? [{ url: story.coverImage }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary ?? story.dek
    }
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const article = await renderMdx(story.body);
  const related = getRelatedStories(story, 3);
  const canonicalUrl = `${SITE_URL}/story/${story.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    datePublished: story.publishedAt,
    author: {
      "@type": "Person",
      name: story.author
    },
    mainEntityOfPage: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME
    },
    url: canonicalUrl,
    description: story.summary ?? story.dek
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-5 flex items-center gap-3">
        <LaneBadge lane={story.lane} />
        <p className="text-sm text-muted">By {story.author}</p>
        <p className="text-sm text-muted">{formatDateTime(story.publishedAt)}</p>
      </div>

      <h1 className="text-4xl leading-tight sm:text-5xl">{story.title}</h1>
      <p className="mt-3 text-lg text-muted">{story.dek}</p>
      <p className="mt-4 text-xs uppercase tracking-wider text-muted">{story.readingMinutes} min read</p>

      {story.coverImage ? (
        <figure className="mt-6">
          <Image
            src={story.coverImage}
            alt={story.title}
            width={1400}
            height={840}
            className="h-auto w-full rounded-xl border border-line object-cover"
            priority
          />
        </figure>
      ) : null}

      <div className="mt-8 prose-news">{article}</div>

      {story.tags.length ? (
        <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted">
          {story.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-lane px-2.5 py-1">#{tag}</span>
          ))}
        </div>
      ) : null}

      {related.length ? (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="text-2xl">Related stories</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/story/${item.slug}`} className="font-medium hover:underline">
                  {item.title}
                </Link>
                <p className="text-sm text-muted">{item.dek}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
