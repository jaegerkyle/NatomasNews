import type { Metadata } from "next";
import Link from "next/link";
import { EventsFilters } from "@/components/EventsFilters";
import { StoryCard } from "@/components/StoryCard";
import { getAllEvents, getStoriesByLane } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  alternates: { canonical: "/events" }
};

export default function EventsPage() {
  const events = getAllEvents();
  const eventStories = getStoriesByLane("events").slice(0, 3);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl">Events</h1>
        <p className="mt-2 text-sm text-muted">Community calendar plus event-focused reporting.</p>
        <div className="mt-8">
          <EventsFilters events={events} />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl">Events reporting</h2>
          <Link href="/rss/events.xml" className="text-sm text-accent underline">
            Events RSS
          </Link>
        </div>
        <div className="space-y-4">
          {eventStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
}
