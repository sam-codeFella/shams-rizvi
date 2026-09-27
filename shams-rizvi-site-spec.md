# shams-rizvi.com: Build Spec

A personal website for Shams Rizvi. Hand this whole file to Claude Code.

**In one line:** the simplicity and writing-first format of leerob.com, the look and feel of karpathy.ai (plain, photo, timeline with logos), and the sticky name column of brittanychiang.com.

---

## 1. Goals

1. A visitor understands who Shams is in 10 seconds.
2. Writing is the heart of the site. Adding a post should mean adding one Markdown file, nothing else.
3. There's a personal, long-form story (`/story`), written by hand in chapters.
4. The site loads fast, has almost no motion, and stays maintainable for years.

## 2. Tech stack

- **Framework:** Astro (static output), with Markdown/MDX content collections. Next.js with MDX is an acceptable alternative, but prefer Astro for simplicity.
- **Styling:** plain CSS with custom properties (tokens below). No UI library.
- **Content:** Markdown files in the repo.
- **Hosting:** Cloudflare Pages (or Vercel). Custom domain: `shams-rizvi.com`, plus a redirect from `www`.
- **No CMS, no database, no tracking scripts.** Add privacy-friendly analytics (Plausible or Cloudflare Web Analytics) only if asked.
- **RSS feed** at `/rss.xml` for posts.
- **Sitemap and Open Graph tags** on every page. Generate a default OG image with name and tagline.

## 3. File structure

```
/src
  /content
    /posts/            ← one .md per post
    /story/            ← one .md per chapter (01-where-it-started.md …)
  /pages
    index.astro        ← home
    story.astro        ← long-form story
    writing/index.astro← all posts, grouped by year
    writing/[slug].astro
    now.astro
    work.astro
    rss.xml.js
  /components
    SideColumn.astro   ← sticky left column (reused on home and story)
    PostList.astro
    Timeline.astro
    BuiltList.astro
    Owl.astro          ← small owl mark next to name
  /styles/global.css
/public
  /images/shams.jpg    ← placeholder until the real photo is added
  /images/logos/       ← kyc.svg, concentric.svg, barclays.svg, pict.svg (use simple letter marks if logos are unavailable)
  /images/story/       ← chapter photos
```

### Post frontmatter
```yaml
---
title: "Why our AI declines to answer"
date: 2026-10-12
summary: "One sentence for the list and the OG description."
draft: false
---
```

### Story chapter frontmatter
```yaml
---
number: 3
title: "Scale"
year: 2020
draft: false
---
```
Chapters marked `draft: true` are hidden. If some chapters are not published yet, show "More chapters coming" at the end of the story.

## 4. Design tokens

```css
:root {
  --bg: #FFFFFF;
  --text: #111111;
  --soft: #5F6368;      /* secondary text */
  --faint: #9AA0A6;     /* dates, captions */
  --line: #ECECEC;
  --accent: #E8590C;    /* sun orange: "Shams" means sun. Use ONLY for active nav line, link hover, progress bar */
  --font: "Geist", "Inter", system-ui, -apple-system, sans-serif;
  --mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root { --bg:#0F0F10; --text:#EDEDED; --soft:#A1A1AA; --faint:#6B6B73; --line:#232326; --accent:#FF8A4C; }
}
```

- **Type:** a single sans-serif family. Name 40px bold with tight letter spacing. Body 16px at line-height 1.7. Story and post body 17px.
- **Mono:** dates, reading time and small labels only.
- **Width:** max content width 1100px. Post and story text column about 65 characters (roughly 640px).
- **Motion:** only the growing nav line, link colour fades (150ms) and the owl blink on hover. Respect `prefers-reduced-motion`.
- **No:** cards with shadows, gradients, animated heroes, emoji, terminal or "control room" themes.

## 5. Pages

### 5.1 Home (`/`)

Two columns on desktop (≥ 1024px): left 40%, right 60%.

```
┌───────────────────────────────┬──────────────────────────────────────────┐
│   (◯ photo)                   │  ABOUT (3 short paragraphs)              │
│   Shams Rizvi  🦉             │  The long version →                      │
│   Engineer and founder        │                                          │
│   I build AI that people      │  WRITING (latest 5)                      │
│   can check.                  │  Title .......................  Oct 2026 │
│                               │  All posts →                             │
│   ── About                    │                                          │
│   ────── Writing  ← active    │  TIMELINE (logo · years · role · 1 line) │
│   ── Timeline                 │                                          │
│   ── Built                    │  BUILT (thumbnail · title · 1 line)      │
│                               │                                          │
│   Now: helping 2 founders     │                                          │
│   ship AI to production →     │                                          │
│   in   X   GitHub   ✉         │                                          │
└───────────────────────────────┴──────────────────────────────────────────┘
```

**Left column (`SideColumn`)**
- `position: sticky; top: 0; height: 100vh`. It never scrolls.
- Round photo (96px), name, "Engineer and founder", tagline "I build AI that people can check."
- **Nav:** About, Writing, Timeline, Built. Each item has a short line before it. The active item (tracked with IntersectionObserver as the right side scrolls) gets a longer line in `--accent` and text in `--text`. Clicking scrolls smoothly to the section.
- **Now line:** "Now: helping 2 founders ship AI to production →", linking to `/work`.
- **Icon links:** LinkedIn (`https://www.linkedin.com/in/shams-rizvi/`), X and GitHub (placeholders, hidden until filled in), email as a copy-to-clipboard button showing "Copied" for 1.5s.

**Right column, in this order**

1. **About:** the copy is in section 6.1. It ends with the link "The long version →" to `/story`.
2. **Writing:** the latest 5 non-draft posts, one row each: title on the left, date on the right (mono, `--faint`, format "Oct 2026"). Rows separated by `--line`. "All posts →" goes to `/writing`. If there are no posts yet, show the 3 planned titles with a small "soon" label.
3. **Timeline:** Karpathy style. Each row: 32px logo mark, years (mono), role and company (semi-bold), one line of description (`--soft`). Data is in section 6.2.
4. **Built:** 3 rows, each with a 64px thumbnail, title and one line. Data is in section 6.3.

**Footer:** "© 2026 Shams Rizvi · Bangalore" and the RSS link.

### 5.2 Story (`/story`)

- A thin progress bar (2px, `--accent`) fixed at the top of the viewport.
- **Left column:** reuses `SideColumn`, but the nav shows "← Shams Rizvi" (link home), the photo, then the numbered chapter list. The chapter being read is highlighted the same way as the home nav.
- **Right column:** header "The long version", then "About a N-minute read · updated Mon YYYY" (calculated automatically).
- **Chapter layout:** the chapter's year sits in the left margin (mono, `--faint`), with the chapter number and title as the heading.
- **Markdown rendering:** images become full-column photos with captions (use the image `title` or alt text as the caption, small and `--faint`). Blockquotes become pull quotes: larger text with a 3px `--accent` left border.
- **Ending:** a "More chapters coming" note if any chapters are drafts, then "Read the writing →".

### 5.3 Writing index (`/writing`)
All posts grouped by year, newest first, in the same row style as the home page.

### 5.4 Post (`/writing/[slug]`)
- Single centred column, no side column.
- "← Shams Rizvi" at the top, then the title, then "12 Oct 2026 · 6 min read".
- Styled code blocks, images with captions, and footnotes.
- Sign-off: "Thanks for reading. More writing →".

### 5.5 Now (`/now`)
A short Markdown page: what Shams is doing this month. Show "Updated <date>".

### 5.6 Work (`/work`)
Fractional offer, written in the same visual style:
- **Headline:** "Work with me"
- **Two offers:**
  - AI Production Readiness Sprint: 2 weeks, fixed fee. Evals on your data, failure analysis, top fixes shipped.
  - Fractional Head of AI: 5 to 15 hours a week, monthly retainer.
- **Best fit:** seed to Series A teams working with documents, financial data, compliance or legal text.
- **Contact:** LinkedIn plus email copy button.
- **No prices on the page** unless Shams adds them.

### 5.7 Mobile (< 1024px)
- The left column collapses into a slim bar pinned to the top: small photo, name, and a menu button that opens the nav.
- All sections stack in the same order.
- On `/story` the menu lists the chapters.
- No horizontal scrolling. 16px side padding.

## 6. Content (use exactly; do not invent facts)

### 6.1 About (placeholder copy; Shams will rewrite by hand)
> I'm Shams. I've spent eight years turning messy data into something people can trust, first building banking software at Barclays, then at Concentric AI, where I built pipelines handling 500M+ events a day and became a co-inventor on a US patent.
>
> In 2025 I started KnowYourCompany.ai and built all of it: the search, the agents, the evals, and the pitch to 100+ money managers. It taught me more about building and selling than any job had.
>
> Outside work: Bangalore, [personal line to be written by Shams].

### 6.2 Timeline
| Mark | Years | Role | One line |
|---|---|---|---|
| K | 2025 – now | Founder & CEO, KnowYourCompany.ai | Built an AI research platform on Indian listed-company filings end to end: hybrid search over 5,500+ companies, cited answers, agentic monitoring, evals. 50+ demos, 100+ conversations with money managers. |
| C | 2020 – 2024 | Software Engineer, Concentric AI | Production data systems processing 500M+ events a day; 0-to-1 pipelines serving 32 enterprise customers; US patent co-inventor. |
| B | 2018 – 2020 | Software Developer, Barclays Corporate Banking | Financial applications in a regulated bank; cross-site scripting protections across the MCA suite. |
| P | 2014 – 2018 | B.E. Computer Science, PICT | Plus an internship at IBM, 2017 – 2018. |

### 6.3 Built
1. **KnowYourCompany.ai:** "AI research over Indian listed-company filings, with every answer cited to the exact filing, page and line." Link: https://www.knowyourcompany.ai/
2. **Pipelines at 500M+ events a day:** "0-to-1 data processing at Concentric AI that became core infrastructure for 32 enterprise customers."
3. **US patent:** "Scoring identity attribute confidence while certifying authorization claims (US Application No. 16/377,168)."

### 6.4 Planned posts (show as "soon" until written)
- Why our AI declines to answer
- What 100 conversations with money managers taught me
- Moving from Pinecone to hybrid search

### 6.5 Story chapters (create as draft files with the prompt as a comment; Shams writes the text)
1. Where it started (2014): how I got into computers; the PICT years; one specific memory.
2. Barclays (2018): what I saw sitting with traders and relationship managers.
3. Scale (2020): Concentric AI, 500M events a day, the patent, an on-call story.
4. The jump (2025): why I left a salary to start KnowYourCompany.ai.
5. Building it (2025): the stack, Pinecone to Elasticsearch, the night citations finally worked.
6. Selling it (2025): 100+ conversations with money managers; the meeting I still think about.
7. What went wrong (2026): honest lessons.
8. Life alongside: Bangalore, the people around me.
9. What's next.

## 7. The owl

A tiny inline SVG owl (16px, line-drawn, `--soft` colour) placed after the name. On hover or focus its eyes close for 200ms (a blink). It's a nod to Shams's handle "lazyowl". Decorative only, with `aria-hidden="true"`.

## 8. Accessibility and quality
- Semantic HTML (`nav`, `main`, `article`, `header`, `footer`).
- Visible focus states. Colour contrast AA in both themes.
- All images have alt text. The photo alt is "Shams Rizvi".
- Lighthouse 95+ on performance, accessibility, best practices and SEO.
- Works with JavaScript disabled, except scroll-spy and copy email, which degrade gracefully.

## 9. Copy rules
- British/Indian English spelling.
- No em dashes in any copy.
- Never add facts, metrics, clients or credentials that are not in section 6.
- Placeholders in square brackets stay visible so Shams can find and replace them.

## 10. Done when
- [ ] Home, story, writing index, post, now and work pages render on desktop and mobile.
- [ ] Left column stays fixed on desktop; scroll-spy highlights the right nav item.
- [ ] Adding a `.md` file to `/src/content/posts` makes it appear on the home page, on `/writing` and in RSS with no other change.
- [ ] Adding or undrafting a chapter makes it appear on `/story` and in its chapter menu.
- [ ] Dark mode follows the system setting.
- [ ] Deployed to Cloudflare Pages with `shams-rizvi.com` connected and HTTPS working.
- [ ] A short README explains how to add a post, add a chapter, update `/now`, and swap the photo.
