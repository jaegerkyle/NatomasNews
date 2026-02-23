import Link from "next/link";
import { LaneBadge } from "@/components/LaneBadge";
import { formatDateTime } from "@/lib/date";
import type { Story } from "@/lib/types";

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={featured ? "border-b border-line pb-8" : "border-b border-line py-6"}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <LaneBadge lane={story.lane} />
        <time className="text-xs text-muted" dateTime={story.publishedAt}>
          {formatDateTime(story.publishedAt)}
        </time>
      </div>
      <h2 className={featured ? "text-4xl leading-tight" : "text-2xl leading-tight"}>
        <Link className="hover:underline" href={`/story/${story.slug}`}>
          {story.title}
        </Link>
      </h2>
      <p className="mt-2 text-base text-muted">{story.dek}</p>
      <p className="mt-3 text-xs uppercase tracking-wider text-muted">By {story.author}</p>
    </article>
  );
}
