import { SITE_NAME, SITE_TAGLINE, SITE_URL, LANE_LABELS, type Lane } from "@/lib/constants";
import type { Story } from "@/lib/types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssXml(stories: Story[], lane?: Lane): string {
  const title = lane ? `${SITE_NAME} - ${LANE_LABELS[lane]}` : SITE_NAME;
  const description = lane ? `${LANE_LABELS[lane]} coverage from ${SITE_NAME}` : SITE_TAGLINE;
  const feedPath = lane ? `/rss/${lane}.xml` : "/rss.xml";

  const items = stories
    .map(
      (story) => `
      <item>
        <title>${escapeXml(story.title)}</title>
        <link>${SITE_URL}/story/${story.slug}</link>
        <guid>${SITE_URL}/story/${story.slug}</guid>
        <pubDate>${new Date(story.publishedAt).toUTCString()}</pubDate>
        <description>${escapeXml(story.summary ?? story.dek)}</description>
      </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
    ${items}
  </channel>
</rss>`;
}
