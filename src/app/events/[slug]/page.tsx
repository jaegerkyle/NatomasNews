import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/content";
import { formatDateTime } from "@/lib/date";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllEvents().map((eventItem) => ({ slug: eventItem.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const eventItem = getEventBySlug(slug);

  if (!eventItem) {
    return {};
  }

  return {
    title: eventItem.title,
    description: eventItem.description,
    alternates: {
      canonical: `/events/${eventItem.slug}`
    },
    openGraph: {
      title: `${eventItem.title} | Natomas.co`,
      description: eventItem.description
    }
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const eventItem = getEventBySlug(slug);

  if (!eventItem) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <p className="text-xs uppercase tracking-wider text-muted">Event listing (sample/demo)</p>
      <h1 className="text-4xl">{eventItem.title}</h1>
      <p className="text-sm text-muted">
        {formatDateTime(eventItem.startsAt)}
        {eventItem.endsAt ? ` - ${formatDateTime(eventItem.endsAt)}` : ""}
      </p>
      <p className="text-sm text-muted">
        {eventItem.venue ? `${eventItem.venue} · ` : ""}
        {eventItem.address ?? ""}
      </p>
      <p>{eventItem.description}</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="text-accent underline" href={`/events/${eventItem.slug}/calendar.ics`}>
          Add to calendar (.ics)
        </Link>
        {eventItem.url ? (
          <a className="text-accent underline" href={eventItem.url} target="_blank" rel="noreferrer">
            Event website
          </a>
        ) : null}
      </div>
      <Link className="text-sm text-accent underline" href="/events">
        Back to events
      </Link>
    </article>
  );
}
