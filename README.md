# shams-rizvi.com

Personal site for Shams Rizvi. Next.js (App Router), plain CSS with custom
properties, Markdown content collections via Velite. Built to the spec in
`shams-rizvi-site-spec.md`.

## Develop

```bash
npm install
npm run dev
```

`npm run dev` and `npm run build` both run `velite` first to compile the
Markdown in `content/` into `.velite/*.json`, which `lib/content.ts` reads.

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

## Add or publish a story chapter

Nine chapter files already exist in `content/story/`, each with
`draft: true` and the chapter's prompt as an HTML comment
(`<!-- prompt: ... -->`). To publish one:

1. Open the file, e.g. `content/story/01-where-it-started.md`.
2. Replace the comment with the real chapter text (Markdown).
3. Set `draft: false` in the frontmatter.

It then appears on `/story` and in the story's chapter nav. Chapter photos
go in `public/images/story/`; reference them as normal Markdown images —
the `alt` or `title` text becomes the caption.

## Update `/now`

Edit `app/now/page.tsx` directly — it's a short static page, not a content
file. Update the `updated` constant at the top when you change it.

## Swap the photo

Replace `public/images/shams.svg` with a real photo. Two options:

- Keep the filename `shams.svg` if you export as SVG.
- Otherwise, add e.g. `public/images/shams.jpg` and update the two
  `src="/images/shams.svg"` references in `components/SideColumn.tsx`.

The four timeline/built logos (`public/images/logos/*.svg`) are simple
letter-mark placeholders — swap them for real logos the same way whenever
you have them.

## Fill in remaining placeholders

A few things were intentionally left as placeholders per the spec (never
invent facts that aren't given):

- `data/site.ts` — `email` is `"[add email]"`.
- `components/SideColumn.tsx` — X and GitHub links are commented out until
  real URLs exist.
- `app/page.tsx` — the About section's last line has
  `[personal line to be written by Shams]`.
- `app/now/page.tsx` — has a `[Add more on what you're focused on this
  month.]` line.

Search the repo for `[` to find any you've missed.

## Notes

- The `<img>` tags for the photo and logos are plain `<img>`, not
  `next/image` (ESLint warns about this) — reasonable for small SVG
  placeholders, but worth switching to `next/image` once real JPG/PNG
  photos are in place, for the LCP/optimization benefit.
- Deploy to Vercel (native Next.js support) or Cloudflare Pages via
  `@cloudflare/next-on-pages`. Point `shams-rizvi.com` at it, plus a
  redirect from `www`.
