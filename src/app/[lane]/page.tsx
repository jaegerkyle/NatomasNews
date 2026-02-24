import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LANES, type Lane } from "@/lib/constants";
import { getStoriesByLane } from "@/lib/content";

type Props = { params: { lane: string } };

function laneLabel(lane: Lane) {
  return lane
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return LANES.map((lane) => ({ lane }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const laneParam = params.lane as Lane;

  if (!LANES.includes(laneParam)) return {};

  const label = laneLabel(laneParam);

  return {
    title: `${label} | Natomas.co`,
    description: `Latest ${label.toLowerCase()} coverage from Natomas.co.`,
    alternates: { canonical: `/${laneParam}` },
  };
}

export default async function LanePage({ params }: Props) {
  const laneParam = params.lane as Lane;

  if (!LANES.includes(laneParam)) notFound();

  const stories = getStoriesByLane(laneParam);
  const label = laneLabel(laneParam);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{label}</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Latest stories in {label.toLowerCase()}.
        </p>
      </header>

      <section className="space-y-4">
        {stories.map((story) => (
          <article
            key={story.slug}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <Link href={`/story/${story.slug}`} className="block">
              <h2 className="text-xl font-semibold leading-snug">
                {story.title}
              </h2>

              {story.dek ? (
                <p className="mt-2 text-sm text-neutral-700">{story.dek}</p>
              ) : null}

              {story.publishedAt ? (
                <div className="mt-3 text-xs text-neutral-500">
                  {story.publishedAt}
                </div>
              ) : null}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}