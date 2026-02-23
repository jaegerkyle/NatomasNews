import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { LANES, type Lane } from "@/lib/constants";
import type { Event, EventFrontmatter, Story, StoryFrontmatter } from "@/lib/types";

const contentRoot = path.join(process.cwd(), "content");
const storiesDir = path.join(contentRoot, "stories");
const eventsDir = path.join(contentRoot, "events");

function toSlug(fileName: string): string {
  return fileName.replace(/\.mdx?$/, "");
}

function stripMdx(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readingTimeMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function readStoryFromFile(file: string): Story {
  const slug = toSlug(file);
  const fullPath = path.join(storiesDir, file);
  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);

  const frontmatter = data as StoryFrontmatter;
  if (!LANES.includes(frontmatter.lane)) {
    throw new Error(`Invalid lane in story ${file}: ${frontmatter.lane}`);
  }

  return {
    ...frontmatter,
    slug,
    body: content,
    readingMinutes: readingTimeMinutes(content)
  };
}

function readEventFromFile(file: string): Event {
  const slug = toSlug(file);
  const fullPath = path.join(eventsDir, file);
  const source = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(source);
  const frontmatter = data as EventFrontmatter;
  const starts = new Date(frontmatter.startsAt).getTime();
  const now = Date.now();

  return {
    ...frontmatter,
    slug,
    body: content,
    isUpcoming: starts >= now
  };
}

export function getAllStories(): Story[] {
  return readMdxFiles(storiesDir)
    .map(readStoryFromFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getStoryBySlug(slug: string): Story | undefined {
  return getAllStories().find((story) => story.slug === slug);
}

export function getStoriesByLane(lane: Lane): Story[] {
  return getAllStories().filter((story) => story.lane === lane);
}

export function getRelatedStories(story: Story, max = 3): Story[] {
  const storyTagSet = new Set(story.tags.map((tag) => tag.toLowerCase()));
  return getAllStories()
    .filter((item) => item.slug !== story.slug)
    .map((item) => {
      const sharedTagCount = item.tags.filter((tag) => storyTagSet.has(tag.toLowerCase())).length;
      const laneMatch = item.lane === story.lane ? 1 : 0;
      return { item, score: sharedTagCount * 2 + laneMatch };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((entry) => entry.item);
}

export function getAllEvents(): Event[] {
  return readMdxFiles(eventsDir)
    .map(readEventFromFile)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((eventItem) => eventItem.slug === slug);
}

export function getUpcomingEvents(limit = 5): Event[] {
  return getAllEvents()
    .filter((eventItem) => eventItem.isUpcoming)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit);
}

export async function renderMdx(source: string) {
  const result = await compileMDX({
    source,
    options: {
      parseFrontmatter: false
    }
  });

  return result.content;
}

export function getSearchableStoryText(story: Story): string {
  return stripMdx(story.body);
}
