import type { Lane } from "@/lib/constants";

export type StoryFrontmatter = {
  title: string;
  dek: string;
  author: string;
  publishedAt: string;
  lane: Lane;
  tags: string[];
  location?: string;
  coverImage?: string;
  summary?: string;
};

export type Story = StoryFrontmatter & {
  slug: string;
  body: string;
  readingMinutes: number;
};

export type EventFrontmatter = {
  title: string;
  startsAt: string;
  endsAt?: string;
  venue?: string;
  address?: string;
  neighborhood?: string;
  description: string;
  url?: string;
  tags: string[];
};

export type Event = EventFrontmatter & {
  slug: string;
  body: string;
  isUpcoming: boolean;
};

export type SearchItem = {
  slug: string;
  title: string;
  dek: string;
  lane: Lane;
  tags: string[];
  publishedAt: string;
  body: string;
};
