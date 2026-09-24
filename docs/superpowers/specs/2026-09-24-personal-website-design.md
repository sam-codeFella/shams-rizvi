# Personal website — design spec

Status: approved pending final read-through
Owner: Shams Rizvi
Date: 2026-09-24

## 1. Purpose

A personal website that is primarily a consulting lead-gen page for Shams's
"Fractional Head of AI" practice, with a personal hub (portfolio, résumé,
writing, socials) underneath it. The existing Claude artifact
(`Shams Rizvi, Fractional Head of AI`) is the content and copy baseline;
this spec restructures and extends it rather than replacing it.

Primary job of the site, in order:
1. Convince a technical founder to book a call (sprint or retainer).
2. Let a visitor see the full body of work, not a four-paragraph summary.
3. House an interactive résumé + downloadable PDF.
4. Be ready to carry a blog with zero upfront content debt.
5. Link all socials from one canonical place.

## 2. Design philosophy: PostHog's actual principles, translated

Not a mascot clone. Concretely borrowed, from PostHog's own brand handbook
(`posthog.com/handbook/brand/*`) and homepage:

- **Taste over polish, "we can do this better ourselves"** — nothing
  templated or generated; every section is deliberately composed.
- **Voice: opinionated, human, honest and playful, specific not fluffy** —
  calibrated down from PostHog's "rogue/meme-y" to "quietly witty," since
  the audience here is founders trusting Shams with regulated financial
  data, not developers who reward irreverence. The running device: the
  product's own mechanic (decline when evidence is thin) recurs as a voice
  bit across empty states, error states, and the 404 page — not just in
  the demo widget.
- **Scannability** — paragraphs capped around 5 lines, broken by subheads/
  whitespace/diagrams, and **one clear next action per page**.
- **Color restraint** — the artifact's existing sage/cream/dark palette
  already satisfies this (solid backgrounds, no gradients, narrow palette,
  color guides attention rather than decorating) and is kept as-is.
- **Illustration is hand-crafted, never stock/generated** — since there is
  no mascot and no illustrator on this project, the honest equivalent is a
  small set of genuinely custom, bold/thick-outline SVG diagrams tied to
  Shams's actual systems (citation trace, hybrid search, agent monitoring),
  not arbitrary decoration.
- **Marker-highlight text** on 1–2 key phrases per major headline, reusing
  an existing palette color as a soft highlight block — cheap, literal,
  directly borrowed.
- **The hero is a live product demo, structured as tabs** — mirroring
  PostHog's own hero mechanic (their "Ask PostHog anything / Give agents
  product context / Ship with PostHog" tabs) rather than a single static
  demo box.

## 3. Information architecture

```
/                    Home — hero, offers, sprint timeline, work preview
                       strip (3 cards), background teaser, contact, footer
/work                Full portfolio grid, all case studies
/work/[slug]         One case study: Problem → Approach → Architecture
                       (diagram) → Outcome
/resume              Interactive résumé (hover-deep timeline) + PDF download
/writing             Blog index — empty state at launch
/writing/[slug]      Individual posts (none at launch; adding one is
                       "add one MDX file")
/ (404)              Custom not-found page
```

Nav is a slim persistent header: name + status dot, Work / Writing / Resume,
a socials cluster, and a Cmd+K command palette (`cmdk`) for jumping between
sections. No heavy nav bar — home stays the star.

## 4. Page-by-page content

### 4.1 Home

**Header status bar:** "Shams Rizvi" · "● Taking 2 engagements · Bangalore, IST"
(status text stays editable in one config value).

**Hero:**
- Eyebrow: "FRACTIONAL HEAD OF AI"
- H1 (locked copy): "I build production AI **systems** your users can
  check." — marker-highlight on "systems".
- Lede (locked copy): "I built KnowYourCompany.ai's AI stack end to end —
  a hybrid search pipeline over 5,500+ listed companies, a fleet of custom
  agents running in production, and an eval harness that catches what
  breaks before users do. Every answer traces to the exact filing and line."
- CTAs: primary "Book a call on LinkedIn" (→ LinkedIn), ghost "See the
  demo ↓" (anchor scroll, not a competing primary action).
- **Demo widget** (see §5) — tabs: "Ask it anything" / "Trace the
  citation" / "Watch it decline".

**Offers ("Two ways to work together"):** unchanged from the artifact —
already meets the scannability and specificity bar. Two cards: AI
Production Readiness Sprint ($12,000 from, 50% to start) and Fractional
Head of AI (retainer, $6,000/month from). No forced interaction — pricing
cards don't get the "cited stat" hover treatment, that's reserved for
proof numbers elsewhere.

**Sprint timeline ("How the sprint runs"):** unchanged 4-step content
(Days 1–2 map the system / 3–5 build the evals / 6–8 find what breaks /
9–10 fix and hand over), each step with a colored top-border accent.

**Work preview strip ("Things I've built"):** 3 cards (Cited answers over
filings, Hybrid search migration, Agentic monitoring — all
KnowYourCompany.ai), each:
- Hover reveals a small custom line-art diagram (e.g. filing → chunk →
  embed → retrieve → cite → [declined?]) fading in over the card body.
- Proof numbers ("5,500+ listed companies covered") are hoverable/tappable
  and pop a tooltip with source/context — the "cited stats" motif, applied
  sitewide to every hard number, not just inside the demo widget.
- "Read the case →" links to `/work/[slug]`.
- Section header includes "See all work →" linking to `/work` (surfaces
  the 4th build, Concentric AI's pipeline work, which doesn't fit the
  3-card strip).

**Background teaser:** condensed to a 2–3 line summary + credential chips
(US patent co-inventor, B.E. CS PICT, DPIIT-recognised startup, NVIDIA
Inception member) + "Full background & résumé →" linking to `/resume`. The
full 4-row CV timeline moves off home entirely.

**Contact ("Is this a fit?"):** unchanged from artifact — fit-criteria
bullet list + single CTA ("Message me on LinkedIn"). One clear action.

**Footer:** name · location · socials cluster · one line of text (as in
artifact). Canonical, sitewide home for social links (see §7).

### 4.2 `/work` and `/work/[slug]`

`/work` is a grid of all case studies (4 at launch, more as Shams ships
things). Each card matches the home preview-strip treatment (hover-deep +
diagram).

`/work/[slug]` template, in order:
1. **Problem** — what was broken/missing.
2. **Approach** — what was tried/decided.
3. **Architecture** — the full-size version of the line-art diagram teased
   on the card.
4. **Outcome** — the proof numbers, cited/hoverable as elsewhere.
5. Breadcrumb back to `/work`.
6. "Book a call" CTA at the bottom — case studies still funnel to the same
   consulting action; this is not a neutral portfolio page.

Launch content: the 4 builds already drafted in the artifact (cited
answers over filings, hybrid search migration, agentic monitoring — all
KnowYourCompany.ai; pipelines at scale — Concentric AI), expanded from a
paragraph each into the 4-part template above.

### 4.3 `/resume`

- Interactive timeline mirroring the home CV grid but complete: each role
  hover-reveals more detail (same hover-deep pattern as work cards).
- Credentials list.
- "Download PDF" button, top-right, primary action for this page.
- Single source of truth: one structured data file feeds both the
  interactive page and the PDF (see §6).

### 4.4 `/writing`

- Empty state at launch: "Nothing here yet. I write when I have something
  worth five minutes of your attention."
- No subscribe/email-capture mechanism at launch — out of scope until
  there's a first post (§8).
- Content structure (MDX files) exists from day one so publishing a post
  later is "add one file," not a project.

### 4.5 404

Copy: "This page declined to answer — no evidence it exists." + link home.
Reuses the site's own decline motif rather than a generic 404.

## 5. Demo widget mechanics

Three tabs, static-first (per decision, "start static, upgrade later"):

- **Ask it anything** — a small curated set of real/illustrative Q&A pairs
  (with citations + one decline case) lives in a local data file. Visitor
  free-text input fuzzy-matches the nearest entry (lightweight fuzzy
  search, e.g. `fuse.js` — no backend, no LLM call) and types out the
  matched answer character-by-character.
- **Trace the citation** — clicking a citation chip reveals the actual
  source excerpt/snippet inline, demonstrating the "every claim traces to
  a line" claim directly rather than just asserting it.
- **Watch it decline** — a dedicated example where the system explicitly
  declines, with the "Not in the filing. I'm not going to guess." copy,
  showing the color-shifted decline UI.

Built so the widget's interface (a function that takes a question and
returns `{answer, citations[], declined: boolean}`) doesn't care whether
the data comes from the static file or a real API — swapping in a real
backend later (§8) means changing one function, not the widget.

Animation: question appears instantly, answer types in, citation chips pop
with a small stagger, the decline box animates in last with a distinct
color shift. All motion respects `prefers-reduced-motion`.

## 6. Tech stack & content model

- **Framework:** Next.js (App Router).
- **Styling:** hand-authored CSS (CSS Modules per component + a global
  `tokens.css` carrying forward the artifact's existing custom properties
  — colors, type scale, spacing). No Tailwind — the point of the existing
  system is a deliberate, non-templated look, and Tailwind would mean
  re-deriving those already-correct tokens as utility classes.
- **Motion:** Framer Motion for orchestrated/staggered reveals (scroll
  reveals, tab transitions, the demo widget's stagger); plain CSS
  transitions for simple hover/focus states.
- **Content collections** (work case studies, blog posts): MDX files via
  **Velite** (actively maintained, good Next.js App Router support) —
  each work/writing item is one `.mdx` file with frontmatter
  (title, slug, summary, date, proof numbers).
- **Résumé data:** structured, not MDX — a single `data/resume.ts` (roles,
  dates, descriptions, credentials) that feeds both the interactive
  `/resume` page and the PDF (§6.1), so the two never drift apart.
- **Command palette:** `cmdk`.
- **Fuzzy match for the demo widget:** `fuse.js`.

### 6.1 PDF generation

A dedicated print-styled route (`/resume/print`) renders the same
`data/resume.ts` with print CSS. A small script
(`scripts/generate-resume-pdf.ts`) uses Playwright to render that route
headlessly to `public/resume.pdf` at build time. Single source of truth,
no manually-maintained PDF, no duplicated layout code between the web
résumé and the PDF.

## 7. Socials & contact config

`data/socials.ts` — one entry per platform:

```
{ platform: "linkedin", href: "https://www.linkedin.com/in/shams-rizvi/" }
{ platform: "github",    href: "#" }   // TODO: add handle
{ platform: "twitter",   href: "#" }   // TODO: add handle
{ platform: "instagram", href: "#" }   // TODO: add handle
```

LinkedIn is live at launch. GitHub/Twitter/Instagram render as real footer
links pointing at a placeholder until Shams supplies the handles — filling
them in later is a one-line edit per entry, no structural change.

No public email address is published without explicit confirmation of
which address to use (the account's login email is not assumed to be the
intended public contact).

## 8. Explicitly out of scope for v1

- A real backend for the demo widget (LLM/retrieval calls) — static-first
  by design, upgradeable later without a widget rewrite.
- Blog subscribe/email-capture — add when there's a first post.
- A headless CMS — git-based MDX only.
- Any illustrated mascot/character system.
- Analytics/instrumentation on the site itself (e.g. self-hosting
  PostHog analytics) — not requested, not built; can be revisited later.
- Multi-language support, CMS admin UI.

## 9. Deployment

- **Host:** Vercel (native Next.js support, zero-config preview
  deployments).
- **Domain:** `shams-rizvi.com` (already owned) — DNS configuration is a
  manual step against the registrar, done once the site is ready to go
  live; not part of the build itself.
