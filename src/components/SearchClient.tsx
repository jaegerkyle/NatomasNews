"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem } from "@/lib/types";
import { LANE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/date";

export function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return [];
    }

    return items
      .map((item) => {
        const body = `${item.title} ${item.dek} ${item.tags.join(" ")} ${item.body}`.toLowerCase();
        const score = body.includes(value) ? 1 : 0;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .slice(0, 50);
  }, [items, query]);

  return (
    <section>
      <input
        type="search"
        className="w-full rounded-lg border border-line px-4 py-3 text-sm"
        placeholder="Search stories by headline, dek, tags, or body"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="mt-6 space-y-4">
        {!query ? <p className="text-sm text-muted">Start typing to search local coverage.</p> : null}
        {query && results.length === 0 ? <p className="text-sm text-muted">No matches found.</p> : null}
        {results.map(({ item }) => (
          <article key={item.slug} className="border-b border-line pb-4">
            <p className="text-xs uppercase tracking-wide text-muted">{LANE_LABELS[item.lane]} · {formatDate(item.publishedAt)}</p>
            <h2 className="mt-1 font-serif text-2xl">
              <Link href={`/story/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted">{item.dek}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
