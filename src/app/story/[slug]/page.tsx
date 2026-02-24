import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllStories, getStoryBySlug, renderMdx } from "@/lib/content";
import { formatDate } from "@/lib/date";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type Props = { params: { slug: string } };

// Pull the MDX source string off the story object (field name can vary by scaffold)
function getMdxSource(story: any): string {
  if (typeof story?.body === "string") return story.body;
  if (typeof story?.content === "string") return story.content;
  if (typeof story?.mdx === "string") return story.mdx;
  return "";
}

export async function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const story = getStoryBySlug(slug);

  if (!story) return {};

  const title = `${story.title} | ${SITE_NAME}`;
  const description = story.dek ?? `Read ${story.title} on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/story/${story.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/story/${story.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = params;
  const story = getStoryBySlug(slug);

  if (!story) notFound();

  const mdxSource = getMdxSource(story);
  const content = await renderMdx(mdxSource);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wide text-neutral-500">
          {story.lane}
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {story.title}
        </h1>

        {story.dek ? (
          <p className="mt-3 text-base text-neutral-700">{story.dek}</p>
        ) : null}

        <div className="mt-4 text-sm text-neutral-500">
          {story.publishedAt ? formatDate(story.publishedAt) : null}
        </div>
      </header>

      <article className="prose prose-neutral max-w-none">{content}</article>
    </main>
  );
}