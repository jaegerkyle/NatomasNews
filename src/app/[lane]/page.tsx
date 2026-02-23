import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LaneBadge } from "@/components/LaneBadge";
import { LANES, LANE_LABELS, type Lane } from "@/lib/constants";
import { getStoriesByLane } from "@/lib/content";
import { formatDateTime } from "@/lib/date";

type Props = { params: { lane: string } };

export async function generateStaticParams() {
  return LANES.filter((lane) => lane !== "events").map((lane) => ({ lane }));
}

export async function generateMetadata({ params }: Props): Metadata {
  const lane = params.lane
  if (!LANES.includes(laneParam)) {
    return {};
  }

  return {
    title: LANE_LABELS[laneParam],
    alternates: {
      canonical: laneParam === "events" ? "/events" : `/${laneParam}`
    },
    openGraph: {
      title: `${LANE_LABELS[laneParam]} | Natomas.co`
    }
  };
}

export default async function LanePage({ params }: Props) {
  const laneParam = params.lane as Lane;

  if (!LANES.includes(laneParam)) {
    notFound();
  }

  if (laneParam === "events") {
    redirect("/events");
  }

  const stories = getStoriesByLane(laneParam);

  return (
    <section>
      <h1 className="text-4xl">{LANE_LABELS[laneParam]}</h1>
      <p className="mt-2 text-sm text-muted">Latest reporting in this lane.</p>
      <div className="mt-8 space-y-5">
        {stories.map((story) => (
          <article key={story.slug} className="rounded-xl border border-line p-5">
            <div className="mb-3 flex items-center justify-between">
              <LaneBadge lane={story.lane} />
              <time className="text-xs text-muted" dateTime={story.publishedAt}>
                {formatDateTime(story.publishedAt)}
              </time>
            </div>
            <h2 className="font-serif text-2xl">
              <Link href={`/story/${story.slug}`} className="hover:underline">
                {story.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{story.dek}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
