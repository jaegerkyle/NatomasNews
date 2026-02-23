"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatDateTime } from "@/lib/date";

type Filter = "upcoming" | "past" | "all";

export function EventsFilters({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const matching = events.filter((eventItem) => {
      const matchFilter = filter === "all" ? true : filter === "upcoming" ? eventItem.isUpcoming : !eventItem.isUpcoming;
      if (!matchFilter) return false;
      if (!normalized) return true;
      const haystack = `${eventItem.title} ${eventItem.description} ${eventItem.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalized);
    });

    return matching.sort((a, b) => {
      const aTime = new Date(a.startsAt).getTime();
      const bTime = new Date(b.startsAt).getTime();
      if (filter === "upcoming") return aTime - bTime;
      if (filter === "past") return bTime - aTime;
      if (a.isUpcoming !== b.isUpcoming) return a.isUpcoming ? -1 : 1;
      return a.isUpcoming ? aTime - bTime : bTime - aTime;
    });
  }, [events, filter, query]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <button className={`rounded-full px-3 py-1 ${filter === "upcoming" ? "bg-ink text-white" : "bg-lane"}`} onClick={() => setFilter("upcoming")}>Upcoming</button>
          <button className={`rounded-full px-3 py-1 ${filter === "past" ? "bg-ink text-white" : "bg-lane"}`} onClick={() => setFilter("past")}>Past</button>
          <button className={`rounded-full px-3 py-1 ${filter === "all" ? "bg-ink text-white" : "bg-lane"}`} onClick={() => setFilter("all")}>All</button>
        </div>
        <input
          className="w-full rounded-md border border-line px-3 py-2 text-sm sm:w-72"
          placeholder="Search events"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search events"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((eventItem) => (
          <article key={eventItem.slug} className="rounded-xl border border-line p-5">
            <h2 className="text-2xl">
              <Link href={`/events/${eventItem.slug}`} className="hover:underline">
                {eventItem.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted">{formatDateTime(eventItem.startsAt)}{eventItem.endsAt ? ` - ${formatDateTime(eventItem.endsAt)}` : ""}</p>
            <p className="mt-2 text-sm text-muted">{eventItem.venue ? `${eventItem.venue} · ` : ""}{eventItem.address ?? ""}</p>
            <p className="mt-3 text-sm">{eventItem.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a className="text-accent underline" href={`/events/${eventItem.slug}/calendar.ics`}>
                Add to calendar
              </a>
              {eventItem.url ? (
                <a className="text-accent underline" href={eventItem.url} target="_blank" rel="noreferrer">
                  Event link
                </a>
              ) : null}
            </div>
          </article>
        ))}
        {filtered.length === 0 ? <p className="text-sm text-muted">No events match your filters.</p> : null}
      </div>
    </section>
  );
}
