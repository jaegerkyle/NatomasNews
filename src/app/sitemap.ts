import type { MetadataRoute } from "next";
import { LANES, SITE_URL, STATIC_PAGES } from "@/lib/constants";
import { getAllEvents, getAllStories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticUrls = [...STATIC_PAGES, "/subscribe", ...LANES.filter((lane) => lane !== "events").map((lane) => `/${lane}`)].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: path === "/" ? 1 : 0.7
    })
  );

  const storyUrls = getAllStories().map((story) => ({
    url: `${SITE_URL}/story/${story.slug}`,
    lastModified: new Date(story.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const eventUrls = getAllEvents().map((eventItem) => ({
    url: `${SITE_URL}/events/${eventItem.slug}`,
    lastModified: new Date(eventItem.startsAt),
    changeFrequency: "weekly" as const,
    priority: 0.6
  }));

  return [...staticUrls, ...storyUrls, ...eventUrls];
}
