import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { StoryCard } from "@/components/StoryCard";
import { formatDate } from "@/lib/date";
import { getAllStories, getUpcomingEvents } from "@/lib/content";

export default function HomePage() {
  const stories = getAllStories();
  const [lead, ...rest] = stories;
  const mostRecent = stories.slice(0, 5);
  const upcoming = getUpcomingEvents(4);

  if (!lead) {
    return <p>No stories yet.</p>;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6">
        <StoryCard story={lead} featured />
        <div>
          {rest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
        <NewsletterSignup />

        <section className="rounded-xl border border-line p-5">
          <h2 className="font-serif text-xl">Most recent</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {mostRecent.map((story) => (
              <li key={story.slug}>
                <Link href={`/story/${story.slug}`} className="font-medium hover:underline">
                  {story.title}
                </Link>
                <p className="text-xs text-muted">{formatDate(story.publishedAt)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-line p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-xl">Upcoming events</h2>
            <Link className="text-sm text-accent underline" href="/events">
              View all
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
            {upcoming.map((eventItem) => (
              <li key={eventItem.slug}>
                <p className="font-medium">{eventItem.title}</p>
                <p className="text-xs text-muted">{formatDate(eventItem.startsAt)}</p>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
