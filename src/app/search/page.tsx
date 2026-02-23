import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { SearchClient } from "@/components/SearchClient";
import type { SearchItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search",
  alternates: { canonical: "/search" }
};

export default function SearchPage() {
  const indexPath = path.join(process.cwd(), "public", "search-index.json");
  const raw = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf-8") : "[]";
  const items = JSON.parse(raw) as SearchItem[];

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-4xl">Search</h1>
      <p className="mt-2 text-sm text-muted">Client-side search across story title, dek, tags, and body.</p>
      <div className="mt-6">
        <SearchClient items={items} />
      </div>
    </section>
  );
}
