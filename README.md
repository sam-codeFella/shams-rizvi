# shams-rizvi.com

Personal site for Shams Rizvi — about, writing, career timeline, and a
booking flow for fractional Head of AI engagements. Next.js (App Router),
plain CSS Modules (no Tailwind), Markdown content via Velite, Vitest for
tests.

## Stack

- **Next.js 16** (App Router) + React 19, TypeScript
- **CSS Modules** with a small custom-property design system (`app/globals.css`)
- **Velite** — compiles Markdown in `content/` into typed JSON at
  `.velite/*.json`, read by `lib/content.ts`
- **Vitest** + Testing Library for component/page tests

## Develop

```bash
npm install
npm run dev
```

`npm run dev` and `npm run build` both run `velite` first (see `predev`/
`prebuild` in `package.json`) to compile `content/` before Next.js starts.

## Project structure

- `app/` — routes: `/` (home), `/story` (long-form bio), `/work` (services +
  booking), `/writing` + `/writing/[slug]`, `/now`, `/rss.xml`
- `components/` — shared UI, one `.module.css` per component
- `content/posts/`, `content/story/` — Markdown source, typed by
  `velite.config.ts`
- `data/` — small static config (`site.ts`, `timeline.ts`, `built.ts`, etc.)
- `public/images/` — photos and logos referenced by both content and components

## Add a post

Create a new file in `content/posts/`, e.g. `content/posts/my-post.md`:

```yaml
---
title: "Why our AI declines to answer"
date: 2026-10-12
summary: "One sentence for the list and the OG description."
draft: false
---

Post body in Markdown here.
```

That's it — it appears on the home page, on `/writing`, and in `/rss.xml`
automatically. Set `draft: true` to hide it until it's ready.

## Publish a story chapter

`content/story/` has four chapters; chapter 1 is published, 2–4 are still
`draft: true`. To publish the next one:

1. Open the file, e.g. `content/story/02-what-went-wrong.md`.
2. Write the chapter text in Markdown.
3. Set `draft: false` in the frontmatter.

It then appears on `/story` and in the chapter nav there. Reference chapter
photos as normal Markdown images (`![alt](/images/story/photo.jpg)`); they
live in `public/images/story/`.

## Update `/now` and `/work`

Both are short static pages, not content files — edit `app/now/page.tsx` and
`app/work/page.tsx` directly. The booking link on `/work` and the homepage
comes from `site.bookingUrl` in `data/site.ts`.

## Test

```bash
npm run test   # vitest run
npm run lint   # eslint
```

## Deploy

Built for Vercel (zero-config Next.js support) — connect the repo and it
just works; no environment variables are required. Point
`shams-rizvi.com` at the Vercel deployment, plus a redirect from `www`.
