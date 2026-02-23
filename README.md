# Natomas.co (MVP)

Simple, modern, minimalist local-news site built with Next.js App Router, TypeScript, Tailwind CSS, and in-repo MDX content.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX content in `content/stories` and `content/events`

## Local development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```
4. Run lint:
   ```bash
   npm run lint
   ```

## Content model

### Stories (`content/stories/*.mdx`)
Frontmatter fields:
- `title: string`
- `dek: string`
- `author: string`
- `publishedAt: ISO string`
- `lane: crime | arts-culture | politics | events | housing-homelessness | development-infrastructure`
- `tags: string[]`
- `location?: string`
- `coverImage?: string` (local `/public/...` path)
- `summary?: string`

Example:
```mdx
---
title: "Sample story"
dek: "One-line summary"
author: "Reporter Name"
publishedAt: "2026-02-23T09:00:00-08:00"
lane: "politics"
tags: ["city hall", "budget"]
---
Story body in MDX.
```

### Events (`content/events/*.mdx`)
Frontmatter fields:
- `title: string`
- `startsAt: ISO string`
- `endsAt?: ISO string`
- `venue?: string`
- `address?: string`
- `neighborhood?: string`
- `description: string`
- `url?: string`
- `tags: string[]`

Example:
```mdx
---
title: "Sample event"
startsAt: "2026-03-10T18:00:00-08:00"
description: "Event summary"
tags: ["community"]
---
Optional MDX body.
```

## How lanes and tags work
- Lanes are primary sections and drive navigation + lane pages.
- Tags are freeform and are used for related stories + search relevance.
- Related stories are computed from shared lane and shared tags.

## Search index
- Build-time script: `scripts/generate-search-index.mjs`
- Output: `public/search-index.json`
- Triggered automatically by `predev` and `prebuild`.

## Newsletter setup
Set:
```bash
NEXT_PUBLIC_NEWSLETTER_ACTION_URL=https://your-newsletter-provider/subscribe
```
If unset, the subscribe module shows a graceful fallback message.

## SEO + feeds included
- Canonical URLs based on `https://natomas.co`
- Open Graph + Twitter card metadata
- `robots.txt` via `src/app/robots.ts`
- `sitemap.xml` via `src/app/sitemap.ts`
- RSS:
  - all stories: `/rss.xml`
  - lane feed: `/rss/[lane].xml` (example: `/rss/politics.xml`)
- NewsArticle JSON-LD on story pages

## Deploy to Vercel
1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Set environment variables (at minimum `NEXT_PUBLIC_NEWSLETTER_ACTION_URL` if used).
4. Deploy; Vercel will run `npm install` and `npm run build`.

## Connect `natomas.co` via DNS (high-level)
1. Add `natomas.co` and `www.natomas.co` in Vercel project domains.
2. At your DNS provider, set records per Vercel instructions:
   - Apex/root `A` or `ALIAS/ANAME` (provider-specific)
   - `www` `CNAME` to Vercel target
3. Wait for DNS propagation and verify SSL issuance in Vercel.
4. Set preferred redirect (usually `www` -> apex or apex -> `www`).
