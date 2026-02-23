export const SITE_NAME = "Natomas.co";
export const SITE_TAGLINE = "Local reporting for Natomas.";
export const SITE_URL = "https://natomas.co";

export const LANES = [
  "crime",
  "arts-culture",
  "politics",
  "events",
  "housing-homelessness",
  "development-infrastructure"
] as const;

export type Lane = (typeof LANES)[number];

export const LANE_LABELS: Record<Lane, string> = {
  crime: "Crime",
  "arts-culture": "Arts & Culture",
  politics: "Politics",
  events: "Events",
  "housing-homelessness": "Housing & Homelessness",
  "development-infrastructure": "Development & Infrastructure"
};

export const STATIC_PAGES = ["/", "/about", "/contact", "/tips", "/search", "/events"];
