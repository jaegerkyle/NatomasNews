import { NextResponse } from "next/server";
import { getAllStories } from "@/lib/content";
import { buildRssXml } from "@/lib/rss";

export function GET() {
  const stories = getAllStories();
  const xml = buildRssXml(stories);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
