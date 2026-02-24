import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/content";
import { formatDateTime } from "@/lib/date";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllEvents().map((eventItem) => ({ slug: eventItem.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const eventItem = getEventBySlug(slug);

  if (!eventItem) return {};

  const title = `${eventItem.title} | ${SITE_NAME}`;
  const description =
    eventItem.description ??
    `Event details for ${eventItem.title} on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/events/${eventItem.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/events/${eventItem.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = params;
  const eventItem = getEventBySlug(slug);

  if (!eventItem) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <div className="text-xs uppercase tracking-wide text-neutral-500">
          Event
        </div>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {eventItem.title}
        </h1>

        <div className="mt-3 space-y-1 text-sm text-neutral-700">
          <div>
            <span className="font-medium">When:</span>{" "}
            {formatDateTime(eventItem.startsAt)}
            {eventItem.endsAt ? ` – ${formatDateTime(eventItem.endsAt)}` : ""}
          </div>

          {(eventItem.venue || eventItem.address) && (
            <div>
              <span className="font-medium">Where:</span>{" "}
              {[eventItem.venue, eventItem.address].filter(Boolean).join(", ")}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
            href={`/events/${eventItem.slug}/calendar.ics`}
          >
            Download calendar invite (.ics)
          </a>

          {eventItem.url ? (
            <a
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
              href={eventItem.url}
              target="_blank"
              rel="noreferrer"
            >
              Event link
            </a>
          ) : null}
        </div>
      </header>

      {eventItem.description ? (
        <section className="prose prose-neutral max-w-none">
          <p>{eventItem.description}</p>
        </section>
      ) : (
        <section className="text-sm text-neutral-600">
          No description provided.
        </section>
      )}
    </main>
  );
}