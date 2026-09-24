# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build shams-rizvi.com — a Next.js personal site that is primarily a consulting lead-gen page (Fractional Head of AI), with a portfolio, interactive résumé + PDF, and a blog scaffold underneath it.

**Architecture:** Next.js App Router (TypeScript), hand-authored CSS Modules over a shared token file (no Tailwind), MDX content collections for work/writing via Velite, a static-first client-side demo widget (no backend), and a Playwright script that renders a print-styled résumé route to PDF at build time. Vitest + React Testing Library for tests.

**Tech Stack:** Next.js (App Router, TypeScript), Vitest, @testing-library/react, cmdk, fuse.js, Velite, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-24-personal-website-design.md`

## Global Constraints

- No Tailwind. Styling is CSS Modules per component plus one shared `styles/tokens.css` (custom properties carried from the original artifact).
- No backend for the demo widget. It is a static, curated dataset matched client-side with `fuse.js` — no LLM/API calls.
- Hero headline and lede copy are locked exactly as written in the spec (§4.1) — do not paraphrase.
- Locked microcopy, verbatim: decline text `"Not in the filing. I'm not going to guess."`; writing empty state `"Nothing here yet. I write when I have something worth five minutes of your attention."`; 404 copy `"This page declined to answer."` / `"No evidence it exists."`.
- Socials: LinkedIn is live at `https://www.linkedin.com/in/shams-rizvi/`. GitHub, Twitter, Instagram are real footer entries pointing at `href="#"` placeholders — never fabricate a handle.
- No public email address is published anywhere on the site.
- Domain (`shams-rizvi.com`) and DNS/deploy are out of scope for this plan (spec §9) — this plan produces the buildable, testable site only.
- Out of scope entirely (spec §8): a real demo-widget backend, blog subscribe/email capture, a headless CMS, any illustrated mascot, site analytics/instrumentation, multi-language support, a CMS admin UI.
- Path alias `@/*` resolves to the repo root (set up in Task 1) — all imports in this plan use it (e.g. `@/data/site`, `@/lib/matchQuestion`).

---

### Task 1: Project scaffold + test tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `.eslintrc.json`, `app/layout.tsx` (temporary minimal version, replaced in Task 2), `app/page.tsx` (temporary), `app/globals.css` (temporary empty)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Test: `sanity.test.ts` (repo root) — deleted at the end of this task once real tests exist elsewhere; used only to prove the harness works

**Interfaces:**
- Produces: the `@/*` path alias, `npm run dev`, `npm run build`, `npm test` scripts that every later task relies on.

- [ ] **Step 1: Scaffold the Next.js app**

Run:
```bash
npx create-next-app@latest . --typescript --app --eslint --tailwind=false --src-dir=false --import-alias "@/*" --use-npm
```
Accept defaults for anything else prompted. This creates `package.json`, `tsconfig.json`, `next.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.eslintrc.json`.

- [ ] **Step 2: Verify the path alias**

Open `tsconfig.json` and confirm it contains:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
If `create-next-app` didn't add it, add it manually under `compilerOptions`.

- [ ] **Step 3: Install test tooling**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Write the Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
```

Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"
import React from "react"

// next/link's App Router version expects an app-router context that
// plain Vitest + jsdom doesn't provide. Every test in this project only
// cares that the right href is rendered, so replace it globally with a
// plain anchor tag rather than mocking it per test file.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: Record<string, unknown>) =>
    React.createElement("a", { href, ...rest }, children as React.ReactNode),
}))
```

- [ ] **Step 5: Add the test script**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Write a sanity test and confirm the harness works**

Create `sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest"

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2)
  })
})
```

Run: `npm test`
Expected: 1 file, 1 test, PASS.

- [ ] **Step 7: Delete the sanity test and confirm dev/build work**

Delete `sanity.test.ts`.

Run: `npm run build`
Expected: build succeeds (default Next.js starter page).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Vitest test harness"
```

---

### Task 2: Design tokens + minimal root layout

**Files:**
- Create: `styles/tokens.css`
- Create: `styles/tokens.test.ts`
- Modify: `app/globals.css` (import tokens)
- Modify: `app/layout.tsx` (metadata, lang="en", import globals.css, render `{children}` only — no Header/Footer yet)

**Interfaces:**
- Produces: CSS custom properties consumed by every component task from here on: `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-ink`, `--mark`, `--mark-ink`, `--warn`, `--warn-bg`, `--serif`, `--sans`, `--mono`.

- [ ] **Step 1: Write the token file (ported from the artifact, unchanged)**

Create `styles/tokens.css`:
```css
:root {
  --bg: #F4F5F1;
  --surface: #FFFFFF;
  --ink: #141C22;
  --muted: #56616B;
  --line: #D9DDD6;
  --accent: #2C5A4C;
  --accent-ink: #FFFFFF;
  --mark: #E2ECDD;
  --mark-ink: #2C5A4C;
  --warn: #8A5A12;
  --warn-bg: #F6ECD9;
  --serif: "Newsreader", Georgia, "Times New Roman", serif;
  --sans: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0F1519;
    --surface: #161E24;
    --ink: #E4E9E4;
    --muted: #9AA5AD;
    --line: #2A343B;
    --accent: #8CC0A9;
    --accent-ink: #0F1519;
    --mark: #1E3029;
    --mark-ink: #A6D3BE;
    --warn: #E3B96E;
    --warn-bg: #2E2517;
    color-scheme: dark;
  }
}

:root[data-theme="dark"] {
  --bg: #0F1519;
  --surface: #161E24;
  --ink: #E4E9E4;
  --muted: #9AA5AD;
  --line: #2A343B;
  --accent: #8CC0A9;
  --accent-ink: #0F1519;
  --mark: #1E3029;
  --mark-ink: #A6D3BE;
  --warn: #E3B96E;
  --warn-bg: #2E2517;
  color-scheme: dark;
}
```

- [ ] **Step 2: Write a content test guarding the tokens**

Create `styles/tokens.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import path from "node:path"

const css = readFileSync(path.resolve(__dirname, "./tokens.css"), "utf-8")

describe("design tokens", () => {
  it("defines the core light-mode custom properties", () => {
    ;["--bg", "--surface", "--ink", "--muted", "--line", "--accent", "--mark", "--warn"].forEach(
      (token) => expect(css).toContain(`${token}:`)
    )
  })

  it("defines the three typeface stacks", () => {
    ;["--serif", "--sans", "--mono"].forEach((token) => expect(css).toContain(`${token}:`))
  })

  it("supports dark mode via prefers-color-scheme and a data-theme override", () => {
    expect(css).toContain("prefers-color-scheme: dark")
    expect(css).toContain('[data-theme="dark"]')
  })
})
```

Run: `npm test -- tokens.test.ts`
Expected: PASS (file already has the content — this test is the regression guard for later edits, not a red/green cycle here since the file is authored directly from the spec).

- [ ] **Step 3: Wire tokens into globals and layout**

Replace `app/globals.css` with:
```css
@import "../styles/tokens.css";

* {
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  padding-inline: 20px;
}

a {
  color: var(--accent);
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

Replace `app/layout.tsx`:
```tsx
import "./globals.css"

export const metadata = {
  title: "Shams Rizvi, Fractional Head of AI",
  description:
    "AI production systems, built end to end — pipelines, agents, and answers your users can check.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page background is the cream tone (`#F4F5F1`), no console errors.

- [ ] **Step 5: Commit**

```bash
git add styles app/globals.css app/layout.tsx
git commit -m "feat: add design tokens and wire them into the root layout"
```

---

### Task 3: Core content data files

**Files:**
- Create: `data/site.ts`, `data/socials.ts`, `data/offers.ts`, `data/timeline.ts`
- Test: `data/site.test.ts`, `data/socials.test.ts`, `data/offers.test.ts`, `data/timeline.test.ts`

**Interfaces:**
- Produces: `site` (name, role, location, status, linkedinUrl), `SocialLink`/`socialLinks`, `Offer`/`offers`, `TimelineStep`/`sprintTimeline` — consumed by Header, Footer, Hero, Offers, SprintTimeline, ContactSection in later tasks.

- [ ] **Step 1: Write the failing tests**

Create `data/site.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { site } from "./site"

describe("site config", () => {
  it("has the expected identity fields", () => {
    expect(site.name).toBe("Shams Rizvi")
    expect(site.role).toBe("Fractional Head of AI")
    expect(site.location).toBe("Bangalore, IST")
    expect(site.linkedinUrl).toBe("https://www.linkedin.com/in/shams-rizvi/")
  })
})
```

Create `data/socials.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { socialLinks } from "./socials"

describe("social links", () => {
  it("includes all four platforms", () => {
    const platforms = socialLinks.map((s) => s.platform)
    expect(platforms).toEqual(["linkedin", "github", "twitter", "instagram"])
  })

  it("has a live LinkedIn URL and placeholder hrefs for the rest", () => {
    const linkedin = socialLinks.find((s) => s.platform === "linkedin")!
    expect(linkedin.href).toBe("https://www.linkedin.com/in/shams-rizvi/")

    const placeholders = socialLinks.filter((s) => s.platform !== "linkedin")
    placeholders.forEach((s) => expect(s.href).toBe("#"))
  })
})
```

Create `data/offers.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { offers } from "./offers"

describe("offers", () => {
  it("has exactly two offers with four bullets each", () => {
    expect(offers).toHaveLength(2)
    offers.forEach((o) => expect(o.bullets).toHaveLength(4))
  })

  it("has the sprint and retainer priced correctly", () => {
    const sprint = offers.find((o) => o.id === "sprint")!
    const retainer = offers.find((o) => o.id === "retainer")!
    expect(sprint.priceHeadline).toBe("From $12,000")
    expect(retainer.priceHeadline).toBe("From $6,000")
  })
})
```

Create `data/timeline.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { sprintTimeline } from "./timeline"

describe("sprint timeline", () => {
  it("has four steps in day order", () => {
    expect(sprintTimeline.map((s) => s.when)).toEqual([
      "Days 1–2",
      "Days 3–5",
      "Days 6–8",
      "Days 9–10",
    ])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- data`
Expected: FAIL — none of `data/site.ts`, `data/socials.ts`, `data/offers.ts`, `data/timeline.ts` exist yet.

- [ ] **Step 3: Implement the data files**

Create `data/site.ts`:
```ts
export const site = {
  name: "Shams Rizvi",
  role: "Fractional Head of AI",
  location: "Bangalore, IST",
  status: "Taking 2 engagements",
  linkedinUrl: "https://www.linkedin.com/in/shams-rizvi/",
} as const
```

Create `data/socials.ts`:
```ts
export type SocialPlatform = "linkedin" | "github" | "twitter" | "instagram"

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shams-rizvi/" },
  { platform: "github", label: "GitHub", href: "#" },
  { platform: "twitter", label: "Twitter", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
]
```

Create `data/offers.ts`:
```ts
export interface Offer {
  id: string
  title: string
  meta: string
  bullets: string[]
  priceHeadline: string
  priceSub: string
}

export const offers: Offer[] = [
  {
    id: "sprint",
    title: "AI Production Readiness Sprint",
    meta: "2 weeks · fixed scope · fixed fee",
    bullets: [
      "Review of your retrieval, prompts, agents and data pipeline",
      "An eval harness on your own data, so you can measure every change",
      "Failure analysis: where it hallucinates, misses, or should decline",
      "A ranked fix list with effort estimates, plus the top fixes shipped",
    ],
    priceHeadline: "From $12,000",
    priceSub: "· 50% to start",
  },
  {
    id: "retainer",
    title: "Fractional Head of AI",
    meta: "5 to 15 hours a week · monthly retainer",
    bullets: [
      "Own the AI roadmap and architecture calls",
      "Hands-on builds on retrieval, agents and evals",
      "Hire and guide your first AI engineers",
      "Walk investors and customers through the AI story",
    ],
    priceHeadline: "From $6,000",
    priceSub: "/ month",
  },
]
```

Create `data/timeline.ts`:
```ts
export interface TimelineStep {
  id: string
  when: string
  title: string
  description: string
}

export const sprintTimeline: TimelineStep[] = [
  {
    id: "map",
    when: "Days 1–2",
    title: "Map the system",
    description: "Walk through the architecture, data sources and the failures users complain about.",
  },
  {
    id: "evals",
    when: "Days 3–5",
    title: "Build the evals",
    description: "A test set from real queries, scored for accuracy, grounding and when it should decline.",
  },
  {
    id: "breaks",
    when: "Days 6–8",
    title: "Find what breaks",
    description: "Run it, sort the failures by cause, estimate the cost of each fix.",
  },
  {
    id: "handover",
    when: "Days 9–10",
    title: "Fix and hand over",
    description: "Ship the highest-impact fixes and hand over the harness and the plan.",
  },
]
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- data`
Expected: PASS, 4 files.

- [ ] **Step 5: Commit**

```bash
git add data
git commit -m "feat: add site, socials, offers, and timeline data"
```

---

### Task 4: Header + Cmd+K command palette

**Files:**
- Create: `components/Header.tsx`, `components/Header.module.css`
- Create: `components/CommandPalette.tsx`
- Test: `components/Header.test.tsx`, `components/CommandPalette.test.tsx`

**Interfaces:**
- Consumes: `site` from `@/data/site`.
- Produces: `<Header />` — a self-contained component (name/status/nav/palette) that Task 5 renders inside `app/layout.tsx`.

- [ ] **Step 1: Install cmdk**

Run: `npm install cmdk`

- [ ] **Step 2: Write the failing tests**

Create `components/Header.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Header } from "./Header"

// Header renders CommandPalette, which calls useRouter() unconditionally —
// mock it here the same way CommandPalette.test.tsx does, since jsdom has
// no real Next.js app-router context to satisfy that hook.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe("Header", () => {
  it("shows the name and status line", () => {
    render(<Header />)
    expect(screen.getByText("Shams Rizvi")).toBeInTheDocument()
    expect(screen.getByText(/Taking 2 engagements/)).toBeInTheDocument()
  })

  it("links to Work, Writing, and Resume", () => {
    render(<Header />)
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work")
    expect(screen.getByRole("link", { name: "Writing" })).toHaveAttribute("href", "/writing")
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume")
  })
})
```

Create `components/CommandPalette.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const push = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}))

import { CommandPalette } from "./CommandPalette"

describe("CommandPalette", () => {
  beforeEach(() => push.mockClear())

  it("opens on Cmd+K and lists nav destinations", async () => {
    render(<CommandPalette />)
    await userEvent.keyboard("{Meta>}k{/Meta}")
    expect(screen.getByPlaceholderText("Jump to...")).toBeInTheDocument()
    expect(screen.getByText("Work")).toBeInTheDocument()
    expect(screen.getByText("Writing")).toBeInTheDocument()
    expect(screen.getByText("Resume")).toBeInTheDocument()
  })

  it("navigates when an item is selected", async () => {
    render(<CommandPalette />)
    await userEvent.keyboard("{Meta>}k{/Meta}")
    await userEvent.click(screen.getByText("Work"))
    expect(push).toHaveBeenCalledWith("/work")
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- Header CommandPalette`
Expected: FAIL — neither component exists yet.

- [ ] **Step 4: Implement CommandPalette**

Create `components/CommandPalette.tsx`:
```tsx
"use client"

import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command palette">
      <Command.Input placeholder="Jump to..." />
      <Command.List>
        <Command.Empty>No results.</Command.Empty>
        {navItems.map((item) => (
          <Command.Item key={item.href} onSelect={() => go(item.href)}>
            {item.label}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  )
}
```

- [ ] **Step 5: Implement Header**

Create `components/Header.module.css`:
```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-block: 22px;
  border-bottom: 1px solid var(--line);
  flex-wrap: wrap;
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.status {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.nav {
  display: flex;
  gap: 20px;
  font-family: var(--mono);
  font-size: 14px;
}
```

Create `components/Header.tsx`:
```tsx
import Link from "next/link"
import { site } from "@/data/site"
import { CommandPalette } from "./CommandPalette"
import styles from "./Header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <span className={styles.name}>{site.name}</span>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {site.status} · {site.location}
        </span>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/work">Work</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/resume">Resume</Link>
      </nav>
      <CommandPalette />
    </header>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- Header CommandPalette`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components package.json package-lock.json
git commit -m "feat: add header with nav and Cmd+K command palette"
```

---

### Task 5: Footer + wire Header/Footer into the root layout

**Files:**
- Create: `components/Footer.tsx`, `components/Footer.module.css`
- Test: `components/Footer.test.tsx`
- Modify: `app/layout.tsx` (render `<Header />` above and `<Footer />` below `{children}`)

**Interfaces:**
- Consumes: `socialLinks` from `@/data/socials`, `site` from `@/data/site`, `Header`/`Footer` components.

- [ ] **Step 1: Write the failing test**

Create `components/Footer.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"

describe("Footer", () => {
  it("renders all four social links", () => {
    render(<Footer />)
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "#")
    expect(screen.getByRole("link", { name: "Twitter" })).toHaveAttribute("href", "#")
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "#")
  })

  it("shows the name and location", () => {
    render(<Footer />)
    expect(screen.getByText(/Shams Rizvi/)).toBeInTheDocument()
    expect(screen.getByText(/Bangalore/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Footer`
Expected: FAIL — `components/Footer.tsx` doesn't exist yet.

- [ ] **Step 3: Implement Footer**

Create `components/Footer.module.css`:
```css
.footer {
  padding-block: 32px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
  font-family: var(--mono);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.socials {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}
```

Create `components/Footer.tsx`:
```tsx
import { site } from "@/data/site"
import { socialLinks } from "@/data/socials"
import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        {site.name} · {site.location} · Works with teams in the US, UK, EU and India
      </span>
      <ul className={styles.socials}>
        {socialLinks.map((s) => (
          <li key={s.platform}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Footer`
Expected: PASS.

- [ ] **Step 5: Wire Header and Footer into the root layout**

Update `app/layout.tsx`:
```tsx
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata = {
  title: "Shams Rizvi, Fractional Head of AI",
  description:
    "AI production systems, built end to end — pipelines, agents, and answers your users can check.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

Add to `app/globals.css`:
```css
.wrap {
  max-width: 980px;
  margin: 0 auto;
}
```

`app/layout.tsx` itself isn't unit-tested (React Testing Library can't mount `<html>`/`<body>` inside jsdom's existing document) — its correctness is covered by the Header/Footer unit tests above plus the manual check below.

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: header (name, status, nav, no visible palette) at the top, footer (name, location, 4 social links) at the bottom, no console errors. Press Cmd+K (or Ctrl+K) — the palette should open.

- [ ] **Step 7: Commit**

```bash
git add components app/layout.tsx app/globals.css
git commit -m "feat: add footer and wire header/footer into the root layout"
```

---

### Task 6: CitedStat component

**Files:**
- Create: `components/CitedStat.tsx`, `components/CitedStat.module.css`
- Test: `components/CitedStat.test.tsx`

**Interfaces:**
- Produces: `<CitedStat value={string} context={string} />` — the hoverable/tappable "cited stat" motif used by WorkCard (Task 13) and anywhere else a hard number appears.

- [ ] **Step 1: Write the failing test**

Create `components/CitedStat.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CitedStat } from "./CitedStat"

describe("CitedStat", () => {
  it("shows the value and hides the tooltip by default", () => {
    render(<CitedStat value="5,500+ listed companies covered" context="Refreshed nightly." />)
    expect(screen.getByText("5,500+ listed companies covered")).toBeInTheDocument()
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("reveals the tooltip on hover and hides it again on unhover", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="500M+ events a day" context="Peak ingestion, Concentric AI." />)
    const stat = screen.getByText("500M+ events a day")

    await user.hover(stat)
    expect(screen.getByRole("tooltip")).toHaveTextContent("Peak ingestion, Concentric AI.")

    await user.unhover(stat)
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("reveals the tooltip on keyboard focus", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="32 enterprise customers" context="As of the last fiscal year." />)
    await user.tab()
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- CitedStat`
Expected: FAIL — `components/CitedStat.tsx` doesn't exist yet.

- [ ] **Step 3: Implement CitedStat**

Create `components/CitedStat.module.css`:
```css
.stat {
  position: relative;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
  cursor: help;
  border-bottom: 1px dashed var(--accent);
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 8px 10px;
  font-family: var(--sans);
  font-size: 12.5px;
  color: var(--muted);
  white-space: nowrap;
  z-index: 10;
}
```

Create `components/CitedStat.tsx`:
```tsx
"use client"

import { useId, useState } from "react"
import styles from "./CitedStat.module.css"

interface CitedStatProps {
  value: string
  context: string
}

export function CitedStat({ value, context }: CitedStatProps) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()

  return (
    <span
      className={styles.stat}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? tooltipId : undefined}
    >
      {value}
      {open && (
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          {context}
        </span>
      )}
    </span>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- CitedStat`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/CitedStat.tsx components/CitedStat.module.css components/CitedStat.test.tsx
git commit -m "feat: add CitedStat hoverable-proof component"
```

---

### Task 7: Typewriter hook

**Files:**
- Create: `lib/useTypewriter.ts`
- Test: `lib/useTypewriter.test.tsx`

**Interfaces:**
- Produces: `useTypewriter(text: string, speedMs?: number): string` — consumed by the demo widget's Ask tab (Task 9).

- [ ] **Step 1: Write the failing test**

Create `lib/useTypewriter.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { useTypewriter } from "./useTypewriter"

function Demo({ text }: { text: string }) {
  const typed = useTypewriter(text, 10)
  return <p>{typed}</p>
}

describe("useTypewriter", () => {
  afterEach(() => vi.useRealTimers())

  it("reveals the text one character at a time", () => {
    vi.useFakeTimers()
    render(<Demo text="Hi" />)

    expect(screen.getByText((_, el) => el?.textContent === "")).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(10))
    expect(screen.getByText("H")).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(10))
    expect(screen.getByText("Hi")).toBeInTheDocument()
  })

  it("resets and retypes when the text prop changes", () => {
    vi.useFakeTimers()
    const { rerender } = render(<Demo text="Hi" />)
    act(() => vi.advanceTimersByTime(20))
    expect(screen.getByText("Hi")).toBeInTheDocument()

    rerender(<Demo text="Bye" />)
    act(() => vi.advanceTimersByTime(30))
    expect(screen.getByText("Bye")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useTypewriter`
Expected: FAIL — `lib/useTypewriter.ts` doesn't exist yet.

- [ ] **Step 3: Implement the hook**

Create `lib/useTypewriter.ts`:
```ts
"use client"

import { useEffect, useState } from "react"

export function useTypewriter(text: string, speedMs: number = 15): string {
  const [output, setOutput] = useState("")

  useEffect(() => {
    setOutput("")
    if (!text) return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setOutput(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [text, speedMs])

  return output
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useTypewriter`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/useTypewriter.ts lib/useTypewriter.test.tsx
git commit -m "feat: add useTypewriter hook"
```

---

### Task 8: Demo widget dataset + fuzzy match

**Files:**
- Create: `data/demo-qa.ts`
- Create: `lib/matchQuestion.ts`
- Test: `lib/matchQuestion.test.ts`

**Interfaces:**
- Produces: `QAEntry` type, `demoQA: QAEntry[]`, `matchQuestion(input: string): QAEntry` — consumed by the demo widget's three tabs (Tasks 9–10).

- [ ] **Step 1: Write the failing test**

Create `lib/matchQuestion.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { matchQuestion } from "./matchQuestion"
import { demoQA } from "@/data/demo-qa"

describe("matchQuestion", () => {
  it("returns the exact entry for an exact question", () => {
    const entry = matchQuestion("Did the company change its auditor this year?")
    expect(entry.id).toBe("auditor-change")
  })

  it("still matches on a close, typo'd version of a known question", () => {
    const entry = matchQuestion("did the compnay change its auditer this year")
    expect(entry.id).toBe("auditor-change")
  })

  it("falls back to the first entry for unrelated input", () => {
    const entry = matchQuestion("zzz qqq unrelated nonsense xyz")
    expect(entry.id).toBe(demoQA[0].id)
  })

  it("falls back to the first entry for empty input", () => {
    const entry = matchQuestion("")
    expect(entry.id).toBe(demoQA[0].id)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- matchQuestion`
Expected: FAIL — neither `data/demo-qa.ts` nor `lib/matchQuestion.ts` exists yet.

- [ ] **Step 3: Install fuse.js and write the dataset**

Run: `npm install fuse.js`

Create `data/demo-qa.ts`:
```ts
export interface Citation {
  label: string
  excerpt: string
}

export interface QAEntry {
  id: string
  question: string
  answer: string
  citations: Citation[]
  declined: boolean
  declineReason?: string
}

export const demoQA: QAEntry[] = [
  {
    id: "auditor-change",
    question: "Did the company change its auditor this year?",
    answer:
      "Yes. The board approved a new statutory auditor at its meeting after the previous firm's term ended.",
    citations: [
      { label: "Reg 30 filing · p.2 · L.14", excerpt: "The Board approved the appointment of a new statutory auditor with effect from the current fiscal year, subject to shareholder ratification." },
      { label: "Annual report · p.61 · L.8", excerpt: "The term of the previous statutory auditor concluded at the close of the prior fiscal year in accordance with the applicable rotation requirement." },
    ],
    declined: false,
  },
  {
    id: "revenue-growth",
    question: "How did revenue grow last quarter?",
    answer:
      "Revenue grew 18% quarter-over-quarter, driven primarily by the export segment.",
    citations: [
      { label: "Q2 results · p.4 · L.22", excerpt: "Total revenue for the quarter stood at ₹412 crore, up 18% sequentially, led by growth in the export business segment." },
    ],
    declined: false,
  },
  {
    id: "auditor-reason",
    question: "Why did the company change its auditor?",
    answer: "",
    citations: [],
    declined: true,
    declineReason: "Not in the filing. I'm not going to guess.",
  },
]
```

- [ ] **Step 4: Implement matchQuestion**

Create `lib/matchQuestion.ts`:
```ts
import Fuse from "fuse.js"
import { demoQA, type QAEntry } from "@/data/demo-qa"

const fuse = new Fuse(demoQA, {
  keys: ["question"],
  threshold: 0.4,
})

export function matchQuestion(input: string): QAEntry {
  const trimmed = input.trim()
  if (!trimmed) return demoQA[0]

  const results = fuse.search(trimmed)
  return results.length > 0 ? results[0].item : demoQA[0]
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- matchQuestion`
Expected: PASS. If the typo test is flaky, lower `threshold` toward `0.3`–`0.5` until the typo'd query matches `auditor-change` but the nonsense query does not.

- [ ] **Step 6: Commit**

```bash
git add data/demo-qa.ts lib/matchQuestion.ts lib/matchQuestion.test.ts package.json package-lock.json
git commit -m "feat: add demo Q&A dataset and fuzzy question matching"
```

---

### Task 9: Demo widget shell + "Ask it anything" tab

**Files:**
- Create: `components/DemoWidget/DemoWidget.tsx`, `components/DemoWidget/DemoWidget.module.css`
- Create: `components/DemoWidget/AskTab.tsx`
- Test: `components/DemoWidget/DemoWidget.test.tsx`, `components/DemoWidget/AskTab.test.tsx`

**Interfaces:**
- Consumes: `matchQuestion` from `@/lib/matchQuestion`, `useTypewriter` from `@/lib/useTypewriter`, `QAEntry` from `@/data/demo-qa`.
- Produces: `<DemoWidget />` — the full tabbed widget embedded in Hero (Task 11). Exports `TabId = "ask" | "trace" | "decline"` for Task 10 to import.

- [ ] **Step 1: Write the failing test for AskTab**

Create `components/DemoWidget/AskTab.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AskTab } from "./AskTab"

describe("AskTab", () => {
  afterEach(() => vi.useRealTimers())

  it("shows the typed answer and citations for a known question", async () => {
    vi.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<AskTab />)
    await user.type(
      screen.getByLabelText("Ask a question"),
      "Did the company change its auditor this year?"
    )
    await user.click(screen.getByRole("button", { name: "Ask" }))

    act(() => vi.advanceTimersByTime(2000))

    expect(screen.getByText(/board approved a new statutory auditor/)).toBeInTheDocument()
    expect(screen.getByText("Reg 30 filing · p.2 · L.14")).toBeInTheDocument()
  })

  it("shows the decline box for the decline question", async () => {
    vi.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<AskTab />)
    await user.type(
      screen.getByLabelText("Ask a question"),
      "Why did the company change its auditor?"
    )
    await user.click(screen.getByRole("button", { name: "Ask" }))

    expect(screen.getByRole("alert")).toHaveTextContent("Not in the filing. I'm not going to guess.")
  })
})
```

- [ ] **Step 2: Write the failing test for DemoWidget**

Create `components/DemoWidget/DemoWidget.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DemoWidget } from "./DemoWidget"

describe("DemoWidget", () => {
  it("defaults to the Ask it anything tab", () => {
    render(<DemoWidget />)
    expect(screen.getByRole("tab", { name: "Ask it anything" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByLabelText("Ask a question")).toBeInTheDocument()
  })

  it("switches tabs on click", async () => {
    const user = userEvent.setup()
    render(<DemoWidget />)

    await user.click(screen.getByRole("tab", { name: "Watch it decline" }))
    expect(screen.getByRole("tab", { name: "Watch it decline" })).toHaveAttribute("aria-selected", "true")
    expect(screen.queryByLabelText("Ask a question")).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- DemoWidget AskTab`
Expected: FAIL — none of these files exist yet.

- [ ] **Step 4: Implement AskTab**

Create `components/DemoWidget/AskTab.tsx`:
```tsx
"use client"

import { useState, type FormEvent } from "react"
import { matchQuestion } from "@/lib/matchQuestion"
import { useTypewriter } from "@/lib/useTypewriter"
import type { QAEntry } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function AskTab() {
  const [input, setInput] = useState("")
  const [entry, setEntry] = useState<QAEntry | null>(null)
  const typed = useTypewriter(entry?.declined ? "" : entry?.answer ?? "")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEntry(matchQuestion(input))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="demo-question">Ask a question</label>
        <input
          id="demo-question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Did the company change its auditor this year?"
        />
        <button type="submit">Ask</button>
      </form>

      {entry && (
        <div className={styles.result}>
          <p className={styles.question}>{"> " + entry.question}</p>

          {entry.declined ? (
            <div className={styles.decline} role="alert">
              <strong>Declined</strong>
              <p>{entry.declineReason}</p>
            </div>
          ) : (
            <>
              <p>{typed}</p>
              <div className={styles.citations}>
                {entry.citations.map((c) => (
                  <span key={c.label} className={styles.cite}>
                    {c.label}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Implement DemoWidget shell**

Create `components/DemoWidget/DemoWidget.module.css`:
```css
.widget {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
}

.tablist {
  display: flex;
}

.tab {
  flex: 1;
  padding: 12px 14px;
  font-family: var(--mono);
  font-size: 12.5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--line);
  color: var(--muted);
  cursor: pointer;
}

.tab[aria-selected="true"] {
  color: var(--accent-ink);
  background: var(--accent);
  border-bottom-color: var(--accent);
}

.panel {
  padding: 20px;
  font-size: 14.5px;
}

.form {
  display: flex;
  gap: 8px;
}

.form input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  font-family: var(--sans);
  font-size: 14px;
  background: var(--bg);
  color: var(--ink);
}

.form button {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 500;
  cursor: pointer;
}

.result {
  margin-top: 16px;
}

.question {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--muted);
}

.citations {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.cite {
  font-family: var(--mono);
  font-size: 11.5px;
  background: var(--mark);
  color: var(--mark-ink);
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
}

.decline {
  background: var(--warn-bg);
  color: var(--warn);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 13.5px;
  margin-top: 4px;
}

.decline strong {
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 2px;
}
```

Create `components/DemoWidget/DemoWidget.tsx`:
```tsx
"use client"

import { useState } from "react"
import { AskTab } from "./AskTab"
import styles from "./DemoWidget.module.css"

export type TabId = "ask" | "trace" | "decline"

const tabs: { id: TabId; label: string }[] = [
  { id: "ask", label: "Ask it anything" },
  { id: "trace", label: "Trace the citation" },
  { id: "decline", label: "Watch it decline" },
]

export function DemoWidget() {
  const [active, setActive] = useState<TabId>("ask")

  return (
    <div className={styles.widget}>
      <div role="tablist" aria-label="Live demo" className={styles.tablist}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={styles.tab}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className={styles.panel}>
        {active === "ask" && <AskTab />}
      </div>
    </div>
  )
}
```

(`trace` and `decline` panels are wired in Task 10 — this task's tests only require the shell and the `ask` panel to exist, so the second DemoWidget test above passes once `role="tab"` switching works even though the other two panels render nothing yet.)

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- DemoWidget AskTab`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/DemoWidget
git commit -m "feat: add demo widget shell and Ask it anything tab"
```

---

### Task 10: "Trace the citation" and "Watch it decline" tabs

**Files:**
- Create: `components/DemoWidget/TraceTab.tsx`, `components/DemoWidget/DeclineTab.tsx`
- Modify: `components/DemoWidget/DemoWidget.tsx` (render the two new panels)
- Test: `components/DemoWidget/TraceTab.test.tsx`, `components/DemoWidget/DeclineTab.test.tsx`
- Modify: `components/DemoWidget/DemoWidget.test.tsx` (add a switch-to-trace assertion)

**Interfaces:**
- Consumes: `demoQA` from `@/data/demo-qa`.
- Produces: nothing new consumed elsewhere — these are leaf panels.

- [ ] **Step 1: Write the failing tests**

Create `components/DemoWidget/TraceTab.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TraceTab } from "./TraceTab"

describe("TraceTab", () => {
  it("hides citation excerpts until a citation is clicked", async () => {
    const user = userEvent.setup()
    render(<TraceTab />)

    expect(screen.queryByText(/Board approved the appointment/)).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" }))
    expect(screen.getByText(/Board approved the appointment/)).toBeInTheDocument()
  })

  it("hides the excerpt again when the same citation is clicked twice", async () => {
    const user = userEvent.setup()
    render(<TraceTab />)

    const button = screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" })
    await user.click(button)
    await user.click(button)
    expect(screen.queryByText(/Board approved the appointment/)).not.toBeInTheDocument()
  })
})
```

Create `components/DemoWidget/DeclineTab.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeclineTab } from "./DeclineTab"

describe("DeclineTab", () => {
  it("shows the decline question and the locked decline copy", () => {
    render(<DeclineTab />)
    expect(screen.getByText(/Why did the company change its auditor/)).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent("Not in the filing. I'm not going to guess.")
  })
})
```

Add to `components/DemoWidget/DemoWidget.test.tsx`:
```tsx
  it("shows the Trace the citation panel when selected", async () => {
    const user = userEvent.setup()
    render(<DemoWidget />)

    await user.click(screen.getByRole("tab", { name: "Trace the citation" }))
    expect(screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" })).toBeInTheDocument()
  })
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- TraceTab DeclineTab DemoWidget`
Expected: FAIL — `TraceTab.tsx` and `DeclineTab.tsx` don't exist yet, and DemoWidget doesn't render the trace panel yet.

- [ ] **Step 3: Implement TraceTab**

Create `components/DemoWidget/TraceTab.tsx`:
```tsx
"use client"

import { useState } from "react"
import { demoQA } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function TraceTab() {
  const entry = demoQA.find((q) => !q.declined && q.citations.length > 0)!
  const [revealed, setRevealed] = useState<string | null>(null)

  return (
    <div>
      <p className={styles.question}>{"> " + entry.question}</p>
      <p>{entry.answer}</p>
      <div className={styles.citations}>
        {entry.citations.map((c) => (
          <button
            key={c.label}
            className={styles.cite}
            aria-expanded={revealed === c.label}
            onClick={() => setRevealed(revealed === c.label ? null : c.label)}
          >
            {c.label}
          </button>
        ))}
      </div>
      {revealed && (
        <blockquote>{entry.citations.find((c) => c.label === revealed)?.excerpt}</blockquote>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Implement DeclineTab**

Create `components/DemoWidget/DeclineTab.tsx`:
```tsx
import { demoQA } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function DeclineTab() {
  const entry = demoQA.find((q) => q.declined)!

  return (
    <div>
      <p className={styles.question}>{"> " + entry.question}</p>
      <div className={styles.decline} role="alert">
        <strong>Declined</strong>
        <p>{entry.declineReason}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Wire both panels into DemoWidget**

Update `components/DemoWidget/DemoWidget.tsx` — add imports and render branches:
```tsx
import { TraceTab } from "./TraceTab"
import { DeclineTab } from "./DeclineTab"
```
and inside the `tabpanel` div:
```tsx
        {active === "ask" && <AskTab />}
        {active === "trace" && <TraceTab />}
        {active === "decline" && <DeclineTab />}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- TraceTab DeclineTab DemoWidget`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/DemoWidget
git commit -m "feat: add Trace the citation and Watch it decline tabs"
```

---

### Task 11: Hero section

**Files:**
- Create: `components/Hero.tsx`, `components/Hero.module.css`
- Test: `components/Hero.test.tsx`

**Interfaces:**
- Consumes: `site` from `@/data/site`, `<DemoWidget />` from `@/components/DemoWidget/DemoWidget`.
- Produces: `<Hero />` — rendered first in `app/page.tsx` (Task 19).

- [ ] **Step 1: Write the failing test**

Create `components/Hero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./Hero"

describe("Hero", () => {
  it("renders the locked headline with 'systems' highlighted", () => {
    render(<Hero />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("I build production AI systems your users can check.")
    expect(heading.querySelector("mark")).toHaveTextContent("systems")
  })

  it("renders the locked lede", () => {
    render(<Hero />)
    expect(
      screen.getByText(/I built KnowYourCompany\.ai's AI stack end to end/)
    ).toBeInTheDocument()
  })

  it("has a primary CTA to LinkedIn and a ghost CTA to the demo", () => {
    render(<Hero />)
    expect(screen.getByRole("link", { name: "Book a call on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
    expect(screen.getByRole("link", { name: "See the demo ↓" })).toHaveAttribute("href", "#demo")
  })

  it("embeds the demo widget", () => {
    render(<Hero />)
    expect(screen.getByRole("tablist", { name: "Live demo" })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — `components/Hero.tsx` doesn't exist yet.

- [ ] **Step 3: Implement Hero**

Create `components/Hero.module.css`:
```css
.hero {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 48px;
  padding-block: 64px 56px;
  align-items: start;
}

.eyebrow {
  font-family: var(--mono);
  font-size: 12.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 14px;
}

.headline {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.8px;
  margin: 0 0 20px;
}

.highlight {
  background: var(--mark);
  color: var(--mark-ink);
  padding: 0 4px;
  border-radius: 3px;
}

.lede {
  font-size: 18px;
  color: var(--muted);
  max-width: 34em;
  margin: 0 0 28px;
}

.ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary,
.ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 15px;
  padding: 12px 18px;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid var(--accent);
}

.primary {
  background: var(--accent);
  color: var(--accent-ink);
}

.ghost {
  color: var(--accent);
  background: transparent;
  border-color: transparent;
}

@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
    padding-block: 40px;
    gap: 32px;
  }
}
```

Create `components/Hero.tsx`:
```tsx
import { site } from "@/data/site"
import { DemoWidget } from "@/components/DemoWidget/DemoWidget"
import styles from "./Hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero}>
      <div>
        <p className={styles.eyebrow}>{site.role}</p>
        <h1 className={styles.headline}>
          I build production AI <mark className={styles.highlight}>systems</mark> your users can
          check.
        </h1>
        <p className={styles.lede}>
          I built KnowYourCompany.ai&apos;s AI stack end to end — a hybrid search pipeline over
          5,500+ listed companies, a fleet of custom agents running in production, and an eval
          harness that catches what breaks before users do. Every answer traces to the exact
          filing and line.
        </p>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call on LinkedIn
          </a>
          <a className={styles.ghost} href="#demo">
            See the demo ↓
          </a>
        </div>
      </div>
      <div id="demo">
        <DemoWidget />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/Hero.module.css components/Hero.test.tsx
git commit -m "feat: add hero section with locked copy and embedded demo widget"
```

---

### Task 12: Offers, sprint timeline, and contact sections

**Files:**
- Create: `components/Offers.tsx`, `components/Offers.module.css`
- Create: `components/SprintTimeline.tsx`, `components/SprintTimeline.module.css`
- Create: `components/ContactSection.tsx`, `components/ContactSection.module.css`
- Test: `components/Offers.test.tsx`, `components/SprintTimeline.test.tsx`, `components/ContactSection.test.tsx`

**Interfaces:**
- Consumes: `offers` from `@/data/offers`, `sprintTimeline` from `@/data/timeline`, `site` from `@/data/site`.
- Produces: `<Offers />`, `<SprintTimeline />`, `<ContactSection />` — rendered in `app/page.tsx` (Task 19). `ContactSection` renders `id="contact"`, the anchor the command palette's "Contact" entry (`/#contact`) targets.

- [ ] **Step 1: Write the failing tests**

Create `components/Offers.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Offers } from "./Offers"

describe("Offers", () => {
  it("renders both offers with their pricing", () => {
    render(<Offers />)
    expect(screen.getByText("AI Production Readiness Sprint")).toBeInTheDocument()
    expect(screen.getByText("Fractional Head of AI")).toBeInTheDocument()
    expect(screen.getByText("From $12,000")).toBeInTheDocument()
    expect(screen.getByText("From $6,000")).toBeInTheDocument()
  })
})
```

Create `components/SprintTimeline.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SprintTimeline } from "./SprintTimeline"

describe("SprintTimeline", () => {
  it("renders all four steps in order", () => {
    render(<SprintTimeline />)
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent("Map the system")
    expect(items[3]).toHaveTextContent("Fix and hand over")
  })
})
```

Create `components/ContactSection.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactSection } from "./ContactSection"

describe("ContactSection", () => {
  it("has the contact anchor id", () => {
    const { container } = render(<ContactSection />)
    expect(container.querySelector("#contact")).toBeInTheDocument()
  })

  it("renders the four fit criteria and the LinkedIn CTA", () => {
    render(<ContactSection />)
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
    expect(screen.getByRole("link", { name: "Message me on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- Offers SprintTimeline ContactSection`
Expected: FAIL — none of the three components exist yet.

- [ ] **Step 3: Implement Offers**

Create `components/Offers.module.css`:
```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card h3 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 22px;
  margin: 0;
}

.meta {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--muted);
  margin: 0;
}

.card ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
}

.price {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.price strong {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 600;
}

.price span {
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

Create `components/Offers.tsx`:
```tsx
import { offers } from "@/data/offers"
import styles from "./Offers.module.css"

export function Offers() {
  return (
    <section aria-labelledby="offers-heading">
      <h2 id="offers-heading">Two ways to work together</h2>
      <p>Most founders start with the sprint. If it goes well, it turns into a retainer.</p>
      <div className={styles.grid}>
        {offers.map((o) => (
          <article key={o.id} className={styles.card}>
            <h3>{o.title}</h3>
            <p className={styles.meta}>{o.meta}</p>
            <ul>
              {o.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className={styles.price}>
              <strong>{o.priceHeadline}</strong> <span>{o.priceSub}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Implement SprintTimeline**

Create `components/SprintTimeline.module.css`:
```css
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps li {
  border-top: 2px solid var(--accent);
  padding-top: 14px;
}

.when {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.steps h4 {
  margin: 6px 0 6px;
  font-size: 16px;
  font-weight: 600;
}

.steps p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
}

@media (max-width: 820px) {
  .steps {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .steps {
    grid-template-columns: 1fr;
  }
}
```

Create `components/SprintTimeline.tsx`:
```tsx
import { sprintTimeline } from "@/data/timeline"
import styles from "./SprintTimeline.module.css"

export function SprintTimeline() {
  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">How the sprint runs</h2>
      <p>Two weeks, working in your repo and your Slack, with overlap in US or UK hours.</p>
      <ol className={styles.steps}>
        {sprintTimeline.map((s) => (
          <li key={s.id}>
            <span className={styles.when}>{s.when}</span>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 5: Implement ContactSection**

Create `components/ContactSection.module.css`:
```css
.contact {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

.fit {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

@media (max-width: 820px) {
  .contact {
    grid-template-columns: 1fr;
  }
}
```

Create `components/ContactSection.tsx`:
```tsx
import { site } from "@/data/site"
import styles from "./ContactSection.module.css"

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className={styles.contact}>
        <div>
          <h2 id="contact-heading">Is this a fit?</h2>
          <ul className={styles.fit}>
            <li>You are seed to Series A and AI is core to the product.</li>
            <li>You have a working prototype, but answers are not reliable enough to sell.</li>
            <li>You work with documents, financial data, compliance or legal text.</li>
            <li>You do not yet have a senior AI lead, or you need one before you can hire.</li>
          </ul>
        </div>
        <div>
          <p>Send a line about what you are building and what is not working. I reply within a day.</p>
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            Message me on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- Offers SprintTimeline ContactSection`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/Offers.tsx components/Offers.module.css components/Offers.test.tsx \
        components/SprintTimeline.tsx components/SprintTimeline.module.css components/SprintTimeline.test.tsx \
        components/ContactSection.tsx components/ContactSection.module.css components/ContactSection.test.tsx
git commit -m "feat: add offers, sprint timeline, and contact sections"
```

---

### Task 13: Work content collection (Velite) + PipelineDiagram + WorkCard

**Files:**
- Create: `velite.config.ts`
- Create: `content/work/cited-answers-over-filings.mdx`, `content/work/hybrid-search-migration.mdx`, `content/work/agentic-monitoring.mdx`, `content/work/pipelines-at-scale.mdx`
- Create: `lib/content.ts`
- Create: `components/PipelineDiagram.tsx`, `components/PipelineDiagram.module.css`
- Create: `components/WorkCard.tsx`, `components/WorkCard.module.css`
- Test: `lib/content.test.ts`, `components/PipelineDiagram.test.tsx`, `components/WorkCard.test.tsx`
- Modify: `package.json` (add `predev`/`prebuild` scripts, `.gitignore` entry for `.velite`)

**Interfaces:**
- Produces: `WorkItem` type (including `diagramSteps: string[]`), `sortWorkItems(items)`, `findWorkItem(items, slug)` (pure, tested directly), `getWorkItems()`, `getWorkItem(slug)` (async, read real Velite output — verified by the build step, not unit-tested). `<PipelineDiagram steps={string[]} />` — the spec's "custom line-art diagram" motif (§2, §4.1), a real hand-built inline SVG, not stock/generated art. `<WorkCard {...WorkItem} />` (hover reveals the `PipelineDiagram`) — consumed by Task 14 (home preview strip + `/work` index) and Task 15 (`/work/[slug]`).

- [ ] **Step 1: Install Velite and configure it**

Run: `npm install -D velite`

Create `velite.config.ts`:
```ts
import { defineConfig, defineCollection, s } from "velite"

const work = defineCollection({
  name: "Work",
  pattern: "work/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      company: s.string(),
      summary: s.string(),
      proofLabel: s.string(),
      proofContext: s.string(),
      order: s.number(),
      diagramSteps: s.array(s.string()),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

const writing = defineCollection({
  name: "Writing",
  pattern: "writing/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      date: s.isodate(),
      summary: s.string(),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

export default defineConfig({
  root: "content",
  collections: { work, writing },
  output: {
    data: ".velite",
  },
})
```

Add `.velite` to `.gitignore` (Velite output is generated, not committed).

Update `package.json` `"scripts"`:
```json
"predev": "velite",
"dev": "next dev",
"prebuild": "velite",
"build": "next build"
```

- [ ] **Step 2: Write the four case study MDX files**

Create `content/work/cited-answers-over-filings.mdx`:
```mdx
---
title: Cited answers over filings
company: KnowYourCompany.ai
summary: RAG over SEBI-regulated disclosures where every answer points to the exact filing, page and line.
proofLabel: 5,500+ listed companies covered
proofContext: Coverage as of the current filing sync, refreshed nightly.
order: 1
diagramSteps: [Filing, Chunk, Embed, Retrieve, Cite]
---

## Problem

Buy-side analysts didn't distrust the AI's answers because they were wrong — they distrusted them because they couldn't check them. A confident paragraph with no way to verify it against the actual filing is worse than no answer at all in this domain.

## Approach

Every response is built backward from the source: retrieve the specific filing section, extract the claim, and attach the exact page and line it came from before the answer is ever shown. If the retrieved evidence doesn't clearly support a claim, the system says so instead of filling the gap with a plausible-sounding guess.

## Architecture

A filing is chunked at the paragraph level, embedded, and indexed. A query retrieves the top candidate chunks, an extraction step pulls the specific claim and its page/line, and a confidence check runs before anything reaches the user — passing claims get cited, everything else gets declined.

## Outcome

5,500+ listed companies covered, refreshed nightly. Buy-side users named the citations — not the accuracy alone — as the specific reason they trusted the tool enough to use it in their own research.
```

Create `content/work/hybrid-search-migration.mdx`:
```mdx
---
title: Hybrid search migration
company: KnowYourCompany.ai
summary: Moved retrieval from Pinecone to hybrid BM25 + semantic search on Elasticsearch (GKE).
proofLabel: Pinecone → Elasticsearch hybrid on GKE
proofContext: Migrated to cut exact-match search misses to near zero.
order: 2
diagramSteps: [Query, BM25 match, Semantic match, Merge & rerank, Result]
---

## Problem

Pure vector search on Pinecone missed exact-match queries — ticker symbols, ISINs, specific line-item names — that buy-side users typed verbatim and expected to find instantly.

## Approach

Moved retrieval to a hybrid model: BM25 for exact and near-exact term matches, semantic search for conceptual queries, merged and re-ranked per query on Elasticsearch running on GKE.

## Architecture

A canonical company model sits in front of both indexes so a query resolves to the right company even across ISIN changes and corporate actions (mergers, delistings, renames) — the search layer never has to know that history, it just asks the canonical model.

## Outcome

Pinecone → Elasticsearch hybrid, self-hosted on GKE. Exact-match queries that previously returned nothing now resolve correctly, without giving up the semantic search that made conceptual questions work in the first place.
```

Create `content/work/agentic-monitoring.mdx`:
```mdx
---
title: Agentic monitoring
company: KnowYourCompany.ai
summary: Change detection that tells analysts what moved before they ask.
proofLabel: Detect first, then investigate
proofContext: Flips the workflow from manual daily checks to a ranked alert feed.
order: 3
diagramSteps: [New filing, Classify trigger, Score anomaly, Rank on dashboard]
---

## Problem

Analysts were spending their mornings manually checking whether anything material had changed overnight across the companies they cover — a task that doesn't need a human doing the checking, only the judging.

## Approach

Built from watching how analysts actually work: an agent watches for material-event filings, auditor changes, and other flagged triggers, and surfaces them before anyone asks — the workflow flips from "go check" to "here's what changed."

## Architecture

A scheduled agent polls new filings, classifies each one against a set of material-event triggers, and writes anomalies to a dashboard ranked by how unusual the change is relative to that company's own filing history.

## Outcome

Detect first, then investigate — the dashboard is now where analysts start their day instead of the last thing they check.
```

Create `content/work/pipelines-at-scale.mdx`:
```mdx
---
title: Pipelines at scale
company: Concentric AI
summary: Built core data pipelines from zero that turned unstructured enterprise data into security intelligence.
proofLabel: 500M+ events a day · 32 enterprise customers
proofContext: Peak ingestion volume across the full customer base.
order: 4
diagramSteps: [Ingest, Classify, Risk-score, Surface to product]
---

## Problem

Concentric AI needed to turn a firehose of unstructured enterprise data — files, permissions, access logs — into security intelligence customers could act on, with nothing built yet.

## Approach

Built the core data pipelines from zero: ingestion, classification, and risk-scoring, designed to hold up as both data volume and customer count grew well past what the first version was built for.

## Architecture

A streaming ingestion layer feeds a classification pipeline that tags sensitive data by type and exposure, which in turn feeds the risk-scoring engine customers see in the product — each stage independently scalable as load grew.

## Outcome

500M+ events processed a day, across 32 enterprise customers, on infrastructure that became the core of the product rather than a prototype that got replaced.
```

- [ ] **Step 3: Write the failing test for the pure content-list logic**

Create `lib/content.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { sortWorkItems, findWorkItem, type WorkItem } from "./content"

const fixtures: WorkItem[] = [
  { slug: "b", title: "B", company: "X", summary: "", proofLabel: "", proofContext: "", order: 2, diagramSteps: [], content: "" },
  { slug: "a", title: "A", company: "X", summary: "", proofLabel: "", proofContext: "", order: 1, diagramSteps: [], content: "" },
]

describe("sortWorkItems", () => {
  it("sorts by the order field ascending", () => {
    expect(sortWorkItems(fixtures).map((i) => i.slug)).toEqual(["a", "b"])
  })
})

describe("findWorkItem", () => {
  it("finds an item by slug", () => {
    expect(findWorkItem(fixtures, "b")?.title).toBe("B")
  })

  it("returns undefined for an unknown slug", () => {
    expect(findWorkItem(fixtures, "nope")).toBeUndefined()
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- lib/content`
Expected: FAIL — `lib/content.ts` doesn't exist yet.

- [ ] **Step 5: Implement lib/content.ts**

Run `npx velite` once first so `.velite/work.json` exists for the JSON import to resolve.

Create `lib/content.ts`:
```ts
import rawWork from "../.velite/work.json"

export interface WorkItem {
  slug: string
  title: string
  company: string
  summary: string
  proofLabel: string
  proofContext: string
  order: number
  diagramSteps: string[]
  content: string
}

export function sortWorkItems(items: WorkItem[]): WorkItem[] {
  return [...items].sort((a, b) => a.order - b.order)
}

export function findWorkItem(items: WorkItem[], slug: string): WorkItem | undefined {
  return items.find((i) => i.slug === slug)
}

export async function getWorkItems(): Promise<WorkItem[]> {
  return sortWorkItems(rawWork as WorkItem[])
}

export async function getWorkItem(slug: string): Promise<WorkItem | undefined> {
  return findWorkItem(await getWorkItems(), slug)
}
```

If TypeScript complains about importing JSON, add to `tsconfig.json` `compilerOptions`: `"resolveJsonModule": true`.

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- lib/content`
Expected: PASS.

- [ ] **Step 7: Verify the real Velite output end-to-end**

Run: `npx velite && npm run build`
Expected: build succeeds; inspect `.velite/work.json` and confirm it contains 4 entries with slugs `cited-answers-over-filings`, `hybrid-search-migration`, `agentic-monitoring`, `pipelines-at-scale`, each with a non-empty `diagramSteps` array.

- [ ] **Step 8: Write the failing test for PipelineDiagram**

Create `components/PipelineDiagram.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PipelineDiagram } from "./PipelineDiagram"

describe("PipelineDiagram", () => {
  it("renders one labeled node per step, in order", () => {
    render(<PipelineDiagram steps={["Filing", "Chunk", "Embed", "Retrieve", "Cite"]} />)
    const svg = screen.getByRole("img", { name: "Filing → Chunk → Embed → Retrieve → Cite" })
    expect(svg).toBeInTheDocument()
    ;["Filing", "Chunk", "Embed", "Retrieve", "Cite"].forEach((step) =>
      expect(screen.getByText(step)).toBeInTheDocument()
    )
  })
})
```

- [ ] **Step 9: Run test to verify it fails**

Run: `npm test -- PipelineDiagram`
Expected: FAIL — `components/PipelineDiagram.tsx` doesn't exist yet.

- [ ] **Step 10: Implement PipelineDiagram**

This is the spec's "custom line-art diagram" motif: a real, hand-built inline SVG — bold thick-outline boxes connected by arrows, using the site's own color tokens — not stock or AI-generated art, and not a per-case-study bespoke illustration either (that would need an illustrator, explicitly out of scope). One reusable component driven by each case study's `diagramSteps` data.

Create `components/PipelineDiagram.module.css`:
```css
.diagram {
  width: 100%;
  height: auto;
}

.box {
  fill: var(--bg);
  stroke: var(--accent);
  stroke-width: 2;
}

.label {
  font-family: var(--mono);
  font-size: 10px;
  fill: var(--ink);
}

.arrow {
  stroke: var(--accent);
  stroke-width: 2;
  fill: none;
}
```

Create `components/PipelineDiagram.tsx`:
```tsx
import styles from "./PipelineDiagram.module.css"

interface PipelineDiagramProps {
  steps: string[]
}

const BOX_WIDTH = 96
const BOX_HEIGHT = 36
const GAP = 28
const BOX_Y = 10

export function PipelineDiagram({ steps }: PipelineDiagramProps) {
  const width = steps.length * BOX_WIDTH + (steps.length - 1) * GAP
  const height = BOX_HEIGHT + BOX_Y * 2

  return (
    <svg
      className={styles.diagram}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={steps.join(" → ")}
    >
      {steps.map((step, i) => {
        const x = i * (BOX_WIDTH + GAP)
        return (
          <g key={step}>
            <rect
              className={styles.box}
              x={x}
              y={BOX_Y}
              width={BOX_WIDTH}
              height={BOX_HEIGHT}
              rx={6}
            />
            <text
              className={styles.label}
              x={x + BOX_WIDTH / 2}
              y={BOX_Y + BOX_HEIGHT / 2 + 4}
              textAnchor="middle"
            >
              {step}
            </text>
            {i < steps.length - 1 && (
              <line
                className={styles.arrow}
                x1={x + BOX_WIDTH}
                y1={BOX_Y + BOX_HEIGHT / 2}
                x2={x + BOX_WIDTH + GAP}
                y2={BOX_Y + BOX_HEIGHT / 2}
                markerEnd="url(#arrowhead)"
              />
            )}
          </g>
        )
      })}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>
    </svg>
  )
}
```

- [ ] **Step 11: Run test to verify it passes**

Run: `npm test -- PipelineDiagram`
Expected: PASS.

- [ ] **Step 12: Write the failing test for WorkCard**

Create `components/WorkCard.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { WorkCard } from "./WorkCard"

const baseProps = {
  slug: "cited-answers-over-filings",
  title: "Cited answers over filings",
  company: "KnowYourCompany.ai",
  summary: "RAG over SEBI-regulated disclosures.",
  proofLabel: "5,500+ listed companies covered",
  proofContext: "Refreshed nightly.",
  diagramSteps: ["Filing", "Chunk", "Embed", "Retrieve", "Cite"],
}

describe("WorkCard", () => {
  it("renders the title, company, summary, and proof stat", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByText("Cited answers over filings")).toBeInTheDocument()
    expect(screen.getByText("KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("5,500+ listed companies covered")).toBeInTheDocument()
  })

  it("links to the case study detail page", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByRole("link", { name: "Read the case →" })).toHaveAttribute(
      "href",
      "/work/cited-answers-over-filings"
    )
  })

  it("hides the diagram until the card is hovered, then reveals it", async () => {
    const user = userEvent.setup()
    render(<WorkCard {...baseProps} />)

    expect(screen.queryByRole("img", { name: /Filing → Chunk/ })).not.toBeInTheDocument()

    await user.hover(screen.getByText("Cited answers over filings"))
    expect(screen.getByRole("img", { name: "Filing → Chunk → Embed → Retrieve → Cite" })).toBeInTheDocument()

    await user.unhover(screen.getByText("Cited answers over filings"))
    expect(screen.queryByRole("img", { name: /Filing → Chunk/ })).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 13: Run test to verify it fails**

Run: `npm test -- WorkCard`
Expected: FAIL — `components/WorkCard.tsx` doesn't exist yet.

- [ ] **Step 14: Implement WorkCard**

Create `components/WorkCard.module.css`:
```css
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 150ms ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.card header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}

.card h3 {
  font-size: 17px;
  margin: 0;
}

.company {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--muted);
}

.diagramSlot {
  min-height: 56px;
}
```

Create `components/WorkCard.tsx`:
```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { CitedStat } from "./CitedStat"
import { PipelineDiagram } from "./PipelineDiagram"
import styles from "./WorkCard.module.css"

interface WorkCardProps {
  slug: string
  title: string
  company: string
  summary: string
  proofLabel: string
  proofContext: string
  diagramSteps: string[]
}

export function WorkCard({
  slug,
  title,
  company,
  summary,
  proofLabel,
  proofContext,
  diagramSteps,
}: WorkCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <header>
        <h3>{title}</h3>
        <span className={styles.company}>{company}</span>
      </header>
      <p>{summary}</p>
      <CitedStat value={proofLabel} context={proofContext} />
      <div className={styles.diagramSlot}>{hovered && <PipelineDiagram steps={diagramSteps} />}</div>
      <Link href={`/work/${slug}`}>Read the case →</Link>
    </article>
  )
}
```

- [ ] **Step 15: Run test to verify it passes**

Run: `npm test -- WorkCard`
Expected: PASS.

- [ ] **Step 16: Commit**

```bash
git add velite.config.ts content lib/content.ts lib/content.test.ts \
        components/PipelineDiagram.tsx components/PipelineDiagram.module.css components/PipelineDiagram.test.tsx \
        components/WorkCard.tsx components/WorkCard.module.css components/WorkCard.test.tsx \
        package.json package-lock.json .gitignore tsconfig.json
git commit -m "feat: add work content collection, PipelineDiagram, and WorkCard hover reveal"
```

---

### Task 14: Home work-preview strip + `/work` index page

**Files:**
- Create: `components/WorkPreviewStrip.tsx`, `components/WorkPreviewStrip.module.css`
- Create: `app/work/page.tsx`
- Test: `components/WorkPreviewStrip.test.tsx`, `app/work/page.test.tsx`

**Interfaces:**
- Consumes: `getWorkItems` from `@/lib/content`, `WorkCard` from `@/components/WorkCard`.
- Produces: `<WorkPreviewStrip />` — rendered in `app/page.tsx` (Task 19).

- [ ] **Step 1: Write the failing tests**

Create `components/WorkPreviewStrip.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/lib/content", () => ({
  getWorkItems: async () => [
    { slug: "a", title: "A", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 1, diagramSteps: [], content: "" },
    { slug: "b", title: "B", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 2, diagramSteps: [], content: "" },
    { slug: "c", title: "C", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 3, diagramSteps: [], content: "" },
    { slug: "d", title: "D", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 4, diagramSteps: [], content: "" },
  ],
}))

import { WorkPreviewStrip } from "./WorkPreviewStrip"

describe("WorkPreviewStrip", () => {
  it("shows only the first three items and a link to see all work", async () => {
    render(await WorkPreviewStrip())
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
    expect(screen.queryByText("D")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "See all work →" })).toHaveAttribute("href", "/work")
  })
})
```

Create `app/work/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/lib/content", () => ({
  getWorkItems: async () => [
    { slug: "a", title: "A", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 1, diagramSteps: [], content: "" },
    { slug: "b", title: "B", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 2, diagramSteps: [], content: "" },
    { slug: "c", title: "C", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 3, diagramSteps: [], content: "" },
    { slug: "d", title: "D", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 4, diagramSteps: [], content: "" },
  ],
}))

import WorkIndexPage from "./page"

describe("WorkIndexPage", () => {
  it("renders all four work items", async () => {
    render(await WorkIndexPage())
    ;["A", "B", "C", "D"].forEach((title) => expect(screen.getByText(title)).toBeInTheDocument())
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- WorkPreviewStrip app/work`
Expected: FAIL — neither file exists yet.

- [ ] **Step 3: Implement WorkPreviewStrip**

Create `components/WorkPreviewStrip.module.css`:
```css
.headerRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

Create `components/WorkPreviewStrip.tsx`:
```tsx
import Link from "next/link"
import { getWorkItems } from "@/lib/content"
import { WorkCard } from "./WorkCard"
import styles from "./WorkPreviewStrip.module.css"

export async function WorkPreviewStrip() {
  const items = (await getWorkItems()).slice(0, 3)

  return (
    <section aria-labelledby="work-heading">
      <div className={styles.headerRow}>
        <h2 id="work-heading">Things I&apos;ve built</h2>
        <Link href="/work">See all work →</Link>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Implement the `/work` index page**

Create `app/work/page.tsx`:
```tsx
import { getWorkItems } from "@/lib/content"
import { WorkCard } from "@/components/WorkCard"
import styles from "@/components/WorkPreviewStrip.module.css"

export const metadata = { title: "Work · Shams Rizvi" }

export default async function WorkIndexPage() {
  const items = await getWorkItems()

  return (
    <div>
      <h1>Work</h1>
      <p>All in production, all from zero.</p>
      <div className={styles.grid}>
        {items.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- WorkPreviewStrip app/work`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/WorkPreviewStrip.tsx components/WorkPreviewStrip.module.css components/WorkPreviewStrip.test.tsx app/work/page.tsx app/work/page.test.tsx
git commit -m "feat: add home work-preview strip and the /work index page"
```

---

### Task 15: `/work/[slug]` case study detail page

**Files:**
- Create: `app/work/[slug]/page.tsx`
- Test: `app/work/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `getWorkItem`, `getWorkItems` from `@/lib/content`, `site` from `@/data/site`.

- [ ] **Step 1: Write the failing test**

Create `app/work/[slug]/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const fixture = {
  slug: "cited-answers-over-filings",
  title: "Cited answers over filings",
  company: "KnowYourCompany.ai",
  summary: "s",
  proofLabel: "p",
  proofContext: "c",
  order: 1,
  diagramSteps: ["Filing", "Chunk", "Embed", "Retrieve", "Cite"],
  content: "<h2>Problem</h2><p>Analysts couldn't check the answers.</p>",
}

const notFound = vi.fn()
vi.mock("next/navigation", () => ({ notFound }))
vi.mock("@/lib/content", () => ({
  getWorkItem: async (slug: string) => (slug === fixture.slug ? fixture : undefined),
  getWorkItems: async () => [fixture],
}))

import WorkDetailPage from "./page"

describe("WorkDetailPage", () => {
  it("renders the title, company, rendered content, and a back link", async () => {
    render(await WorkDetailPage({ params: { slug: "cited-answers-over-filings" } }))
    expect(screen.getByText("Cited answers over filings")).toBeInTheDocument()
    expect(screen.getByText("KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("Analysts couldn't check the answers.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "← Back to work" })).toHaveAttribute("href", "/work")
  })

  it("has a Book a call CTA to LinkedIn", async () => {
    render(await WorkDetailPage({ params: { slug: "cited-answers-over-filings" } }))
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
  })

  it("calls notFound() for an unknown slug", async () => {
    notFound.mockClear()
    await WorkDetailPage({ params: { slug: "does-not-exist" } })
    expect(notFound).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- "app/work/\[slug\]"`
Expected: FAIL — `app/work/[slug]/page.tsx` doesn't exist yet.

- [ ] **Step 3: Implement the detail page**

Create `app/work/[slug]/page.tsx`:
```tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { getWorkItem, getWorkItems } from "@/lib/content"
import { site } from "@/data/site"

export async function generateStaticParams() {
  const items = await getWorkItems()
  return items.map((item) => ({ slug: item.slug }))
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = await getWorkItem(params.slug)
  if (!item) {
    notFound()
    return null
  }

  return (
    <article>
      <Link href="/work">← Back to work</Link>
      <h1>{item.title}</h1>
      <p>{item.company}</p>
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
      <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
        Book a call
      </a>
    </article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- "app/work/\[slug\]"`
Expected: PASS.

- [ ] **Step 5: Verify all four real case studies render**

Run: `npm run dev`, visit `/work/cited-answers-over-filings`, `/work/hybrid-search-migration`, `/work/agentic-monitoring`, `/work/pipelines-at-scale`.
Expected: each renders its Problem/Approach/Architecture/Outcome headings and a working "Book a call" link; visiting `/work/nonexistent` renders the Next.js 404 boundary (wired properly in Task 18).

- [ ] **Step 6: Commit**

```bash
git add app/work
git commit -m "feat: add /work/[slug] case study detail page"
```

---

### Task 16: Résumé data + BackgroundTeaser + `/resume` interactive page

**Files:**
- Create: `data/resume.ts`
- Create: `components/BackgroundTeaser.tsx`, `components/BackgroundTeaser.module.css`
- Create: `components/ResumeTimeline.tsx`, `components/ResumeTimeline.module.css`
- Create: `app/resume/page.tsx`, `app/resume/page.module.css`
- Test: `components/BackgroundTeaser.test.tsx`, `components/ResumeTimeline.test.tsx`, `app/resume/page.test.tsx`

**Interfaces:**
- Produces: `ResumeRole` type, `resumeRoles`, `credentials` from `@/data/resume` — the single source of truth reused by `/resume/print` in Task 17.

- [ ] **Step 1: Write the failing tests**

Create `components/BackgroundTeaser.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BackgroundTeaser } from "./BackgroundTeaser"

describe("BackgroundTeaser", () => {
  it("renders all four credential chips and a link to /resume", () => {
    render(<BackgroundTeaser />)
    ;["US patent co-inventor", "B.E. Computer Science, PICT", "DPIIT-recognised startup", "NVIDIA Inception member"].forEach(
      (c) => expect(screen.getByText(c)).toBeInTheDocument()
    )
    expect(screen.getByRole("link", { name: "Full background & résumé →" })).toHaveAttribute(
      "href",
      "/resume"
    )
  })
})
```

Create `components/ResumeTimeline.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ResumeTimeline } from "./ResumeTimeline"

describe("ResumeTimeline", () => {
  it("renders every role's title but hides detail until hovered", () => {
    render(<ResumeTimeline />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })

  it("reveals a role's detail on hover and hides it on unhover", async () => {
    const user = userEvent.setup()
    render(<ResumeTimeline />)
    const role = screen.getByText("Founder & CEO, KnowYourCompany.ai")

    await user.hover(role)
    expect(screen.getByText(/50\+ demos/)).toBeInTheDocument()

    await user.unhover(role)
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })
})
```

Create `app/resume/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ResumePage from "./page"

describe("ResumePage", () => {
  it("has a Download PDF link", () => {
    render(<ResumePage />)
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("href", "/resume.pdf")
  })

  it("renders the timeline and credentials", () => {
    render(<ResumePage />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("US patent co-inventor")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- BackgroundTeaser ResumeTimeline app/resume/page`
Expected: FAIL — none of `data/resume.ts`, `BackgroundTeaser.tsx`, `ResumeTimeline.tsx`, `app/resume/page.tsx` exist yet.

- [ ] **Step 3: Implement the résumé data**

Create `data/resume.ts`:
```ts
export interface ResumeRole {
  id: string
  years: string
  title: string
  org: string
  detail: string
}

export const resumeRoles: ResumeRole[] = [
  {
    id: "kyc",
    years: "2025 – now",
    title: "Founder & CEO, KnowYourCompany.ai",
    org: "KnowYourCompany.ai",
    detail: "AI equity research on Indian listed companies. 50+ demos, 100+ conversations with money managers.",
  },
  {
    id: "concentric",
    years: "2020 – 2024",
    title: "Software Engineer, Concentric AI",
    org: "Concentric AI",
    detail: "Data security posture management. Co-inventor on a US patent.",
  },
  {
    id: "barclays",
    years: "2018 – 2020",
    title: "Software Developer, Barclays",
    org: "Barclays",
    detail: "Corporate banking applications in a regulated environment.",
  },
  {
    id: "ibm",
    years: "2017 – 2018",
    title: "Intern, IBM",
    org: "IBM",
    detail: "Enterprise software and data infrastructure.",
  },
]

export const credentials: string[] = [
  "US patent co-inventor",
  "B.E. Computer Science, PICT",
  "DPIIT-recognised startup",
  "NVIDIA Inception member",
]
```

- [ ] **Step 4: Implement BackgroundTeaser**

Create `components/BackgroundTeaser.module.css`:
```css
.creds {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 16px 0 20px;
}

.creds li {
  font-family: var(--mono);
  font-size: 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 4px 9px;
  color: var(--muted);
}
```

Create `components/BackgroundTeaser.tsx`:
```tsx
import Link from "next/link"
import { credentials } from "@/data/resume"
import styles from "./BackgroundTeaser.module.css"

export function BackgroundTeaser() {
  return (
    <section aria-labelledby="background-heading">
      <h2 id="background-heading">Background</h2>
      <p>An engineer who went into finance and ran a company: product, sales, fundraising and operations.</p>
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <Link href="/resume">Full background &amp; résumé →</Link>
    </section>
  )
}
```

- [ ] **Step 5: Implement ResumeTimeline**

Create `components/ResumeTimeline.module.css`:
```css
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline li {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 12px;
  padding-block: 12px;
  border-bottom: 1px solid var(--line);
}

.years {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--muted);
}

.detail {
  color: var(--muted);
  font-size: 14px;
  margin: 4px 0 0;
}
```

Create `components/ResumeTimeline.tsx`:
```tsx
"use client"

import { useState } from "react"
import { resumeRoles } from "@/data/resume"
import styles from "./ResumeTimeline.module.css"

export function ResumeTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <ul className={styles.timeline}>
      {resumeRoles.map((r) => (
        <li
          key={r.id}
          tabIndex={0}
          onMouseEnter={() => setExpanded(r.id)}
          onMouseLeave={() => setExpanded(null)}
          onFocus={() => setExpanded(r.id)}
          onBlur={() => setExpanded(null)}
        >
          <span className={styles.years}>{r.years}</span>
          <span>
            <strong>{r.title}</strong>
            {expanded === r.id && <p className={styles.detail}>{r.detail}</p>}
          </span>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 6: Implement the `/resume` page**

Create `app/resume/page.module.css`:
```css
.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.download {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 6px;
  background: var(--accent);
  color: var(--accent-ink);
  text-decoration: none;
  font-weight: 500;
}

.creds {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
}

.creds li {
  font-family: var(--mono);
  font-size: 12px;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 4px 9px;
  color: var(--muted);
}
```

Create `app/resume/page.tsx`:
```tsx
import { credentials } from "@/data/resume"
import { ResumeTimeline } from "@/components/ResumeTimeline"
import styles from "./page.module.css"

export const metadata = { title: "Résumé · Shams Rizvi" }

export default function ResumePage() {
  return (
    <div>
      <div className={styles.actions}>
        <a href="/resume.pdf" download className={styles.download}>
          Download PDF
        </a>
      </div>
      <h1>Background</h1>
      <ResumeTimeline />
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test -- BackgroundTeaser ResumeTimeline app/resume/page`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add data/resume.ts components/BackgroundTeaser.tsx components/BackgroundTeaser.module.css components/BackgroundTeaser.test.tsx \
        components/ResumeTimeline.tsx components/ResumeTimeline.module.css components/ResumeTimeline.test.tsx \
        app/resume
git commit -m "feat: add resume data, BackgroundTeaser, and the interactive /resume page"
```

---

### Task 17: `/resume/print` route + PDF generation script

**Files:**
- Create: `app/resume/print/page.tsx`, `app/resume/print/page.module.css`
- Create: `scripts/generate-resume-pdf.ts`
- Test: `app/resume/print/page.test.tsx`
- Modify: `package.json` (add `resume:pdf` script and `playwright`/`tsx` dev dependencies)

**Interfaces:**
- Consumes: `resumeRoles`, `credentials` from `@/data/resume`, `site` from `@/data/site` — same source of truth as `/resume`, so the PDF and the web page can never drift apart.

- [ ] **Step 1: Install Playwright and tsx**

Run: `npm install -D playwright tsx` then `npx playwright install chromium`

- [ ] **Step 2: Write the failing test for the print route**

Create `app/resume/print/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ResumePrintPage from "./page"

describe("ResumePrintPage", () => {
  it("renders the name and every role's detail always visible (no hover needed)", () => {
    render(<ResumePrintPage />)
    expect(screen.getByText("Shams Rizvi")).toBeInTheDocument()
    expect(screen.getByText(/50\+ demos/)).toBeInTheDocument()
    expect(screen.getByText(/Co-inventor on a US patent/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- "app/resume/print"`
Expected: FAIL — `app/resume/print/page.tsx` doesn't exist yet.

- [ ] **Step 4: Implement the print route**

Create `app/resume/print/page.module.css`:
```css
.page {
  font-family: var(--sans);
  color: #000;
  background: #fff;
  padding: 32px;
}

.page h1 {
  font-family: var(--serif);
  margin-bottom: 4px;
}

.role {
  margin-bottom: 16px;
}

.years {
  font-family: var(--mono);
  font-size: 12px;
  color: #444;
}

.creds {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.creds li {
  font-family: var(--mono);
  font-size: 11px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 3px 8px;
}

@media print {
  .page {
    padding: 0;
  }
}
```

Create `app/resume/print/page.tsx`:
```tsx
import { resumeRoles, credentials } from "@/data/resume"
import { site } from "@/data/site"
import styles from "./page.module.css"

export default function ResumePrintPage() {
  return (
    <div className={styles.page}>
      <h1>{site.name}</h1>
      <p>
        {site.role} · {site.location}
      </p>
      {resumeRoles.map((r) => (
        <div key={r.id} className={styles.role}>
          <span className={styles.years}>{r.years}</span>
          <p>
            <strong>{r.title}</strong>
          </p>
          <p>{r.detail}</p>
        </div>
      ))}
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
```

Note: this route intentionally does not use the root layout's Header/Footer — a PDF shouldn't include site navigation. Wire this exclusion in Task 19 if the App Router's nested layouts require an explicit override; verify visually in Step 6 below regardless.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- "app/resume/print"`
Expected: PASS.

- [ ] **Step 6: Verify the print route renders standalone**

Run: `npm run dev`, visit `/resume/print`.
Expected: all four roles' details are visible without hovering (unlike `/resume`), no header/footer chrome.

- [ ] **Step 7: Write the PDF generation script**

Create `scripts/generate-resume-pdf.ts`:
```ts
import { chromium } from "playwright"

async function main() {
  const baseUrl = process.env.PDF_BASE_URL ?? "http://localhost:3000"
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${baseUrl}/resume/print`, { waitUntil: "networkidle" })
  await page.pdf({ path: "public/resume.pdf", format: "A4", printBackground: true })
  await browser.close()
  console.log("Wrote public/resume.pdf")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

Add to `package.json` `"scripts"`:
```json
"resume:pdf": "tsx scripts/generate-resume-pdf.ts"
```

- [ ] **Step 8: Verify the script produces a real PDF**

Run in one terminal: `npm run dev`
Run in another: `npm run resume:pdf`
Expected: `public/resume.pdf` is created; confirm with `ls -la public/resume.pdf` that it exists and is non-empty (a few hundred KB is normal for a text-only PDF).

- [ ] **Step 9: Commit**

```bash
git add app/resume/print scripts/generate-resume-pdf.ts package.json package-lock.json
git commit -m "feat: add print-styled resume route and Playwright PDF generation script"
```

Note: `public/resume.pdf` itself is a generated artifact — do not commit it; regenerate with `npm run resume:pdf` whenever `data/resume.ts` changes. Add `public/resume.pdf` to `.gitignore`.

---

### Task 18: `/writing` index + `/writing/[slug]` route + custom 404

**Files:**
- Create: `app/writing/page.tsx`
- Create: `app/writing/[slug]/page.tsx`
- Create: `content/writing/.gitkeep`
- Create: `app/not-found.tsx`
- Modify: `lib/content.ts` (add the `writing` collection's list/find functions, mirroring `work`'s)
- Test: `lib/content.writing.test.ts`, `app/writing/page.test.tsx`, `app/writing/[slug]/page.test.tsx`, `app/not-found.test.tsx`

**Interfaces:**
- Produces: `WritingItem` type, `sortWritingItems`, `findWritingItem` (pure, tested directly), `getWritingItems`, `getWritingItem` — the same pattern Task 13 established for `work`, applied to the `writing` collection already configured in `velite.config.ts`. This task adds zero posts; it proves the empty index and the `[slug]` route both behave correctly with zero and with one entry respectively.

- [ ] **Step 1: Write the failing test for the writing list/find logic**

Create `lib/content.writing.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { sortWritingItems, findWritingItem, type WritingItem } from "./content"

const fixtures: WritingItem[] = [
  { slug: "second-post", title: "Second", date: "2026-02-01", summary: "", content: "" },
  { slug: "first-post", title: "First", date: "2026-01-01", summary: "", content: "" },
]

describe("sortWritingItems", () => {
  it("sorts by date descending (newest first)", () => {
    expect(sortWritingItems(fixtures).map((i) => i.slug)).toEqual(["second-post", "first-post"])
  })
})

describe("findWritingItem", () => {
  it("finds a post by slug", () => {
    expect(findWritingItem(fixtures, "first-post")?.title).toBe("First")
  })

  it("returns undefined for an unknown slug", () => {
    expect(findWritingItem(fixtures, "nope")).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- content.writing`
Expected: FAIL — `sortWritingItems`/`findWritingItem`/`WritingItem` don't exist in `lib/content.ts` yet.

- [ ] **Step 3: Extend lib/content.ts with the writing collection**

Add to `lib/content.ts` (alongside the existing `work` exports from Task 13):
```ts
import rawWriting from "../.velite/writing.json"

export interface WritingItem {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

export function sortWritingItems(items: WritingItem[]): WritingItem[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function findWritingItem(items: WritingItem[], slug: string): WritingItem | undefined {
  return items.find((i) => i.slug === slug)
}

export async function getWritingItems(): Promise<WritingItem[]> {
  return sortWritingItems(rawWriting as WritingItem[])
}

export async function getWritingItem(slug: string): Promise<WritingItem | undefined> {
  return findWritingItem(await getWritingItems(), slug)
}
```

Run `npx velite` first so `.velite/writing.json` exists (it will be `[]` since `content/writing/` is still empty) — the JSON import needs the file to be present, even empty.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- content.writing`
Expected: PASS.

- [ ] **Step 5: Write the failing tests for the writing pages**

Create `app/writing/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import WritingIndexPage from "./page"

describe("WritingIndexPage", () => {
  it("shows the locked empty-state copy", () => {
    render(<WritingIndexPage />)
    expect(
      screen.getByText("Nothing here yet. I write when I have something worth five minutes of your attention.")
    ).toBeInTheDocument()
  })
})
```

Create `app/writing/[slug]/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const fixture = {
  slug: "first-post",
  title: "First Post",
  date: "2026-01-01",
  summary: "s",
  content: "<p>Hello from the first post.</p>",
}

const notFound = vi.fn()
vi.mock("next/navigation", () => ({ notFound }))
vi.mock("@/lib/content", () => ({
  getWritingItem: async (slug: string) => (slug === fixture.slug ? fixture : undefined),
  getWritingItems: async () => [fixture],
}))

import WritingDetailPage from "./page"

describe("WritingDetailPage", () => {
  it("renders the title and rendered content", async () => {
    render(await WritingDetailPage({ params: { slug: "first-post" } }))
    expect(screen.getByText("First Post")).toBeInTheDocument()
    expect(screen.getByText("Hello from the first post.")).toBeInTheDocument()
  })

  it("calls notFound() for an unknown slug", async () => {
    notFound.mockClear()
    await WritingDetailPage({ params: { slug: "does-not-exist" } })
    expect(notFound).toHaveBeenCalled()
  })
})
```

Create `app/not-found.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NotFound from "./not-found"

describe("NotFound", () => {
  it("shows the decline-themed 404 copy and a link home", () => {
    render(<NotFound />)
    expect(screen.getByText("This page declined to answer.")).toBeInTheDocument()
    expect(screen.getByText("No evidence it exists.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/")
  })
})
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `npm test -- app/writing app/not-found`
Expected: FAIL — none of `app/writing/page.tsx`, `app/writing/[slug]/page.tsx`, `app/not-found.tsx` exist yet.

- [ ] **Step 7: Implement the writing index and content scaffold**

Create `content/writing/.gitkeep` (empty file — keeps the directory in git even with zero posts).

Create `app/writing/page.tsx`:
```tsx
export const metadata = { title: "Writing · Shams Rizvi" }

export default function WritingIndexPage() {
  return (
    <div>
      <h1>Writing</h1>
      <p>Nothing here yet. I write when I have something worth five minutes of your attention.</p>
    </div>
  )
}
```

- [ ] **Step 8: Implement the `/writing/[slug]` route**

Create `app/writing/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation"
import { getWritingItem, getWritingItems } from "@/lib/content"

export async function generateStaticParams() {
  const items = await getWritingItems()
  return items.map((item) => ({ slug: item.slug }))
}

export default async function WritingDetailPage({ params }: { params: { slug: string } }) {
  const item = await getWritingItem(params.slug)
  if (!item) {
    notFound()
    return null
  }

  return (
    <article>
      <h1>{item.title}</h1>
      <p>{item.date}</p>
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
    </article>
  )
}
```

With zero files in `content/writing/`, `generateStaticParams` returns `[]` and the route 404s for any slug until a post is added — that's the correct behavior, not a bug to work around.

- [ ] **Step 9: Implement the custom 404**

Create `app/not-found.tsx`:
```tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h1>This page declined to answer.</h1>
      <p>No evidence it exists.</p>
      <Link href="/">Back home</Link>
    </div>
  )
}
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `npm test -- app/writing app/not-found`
Expected: PASS.

- [ ] **Step 11: Verify in the browser**

Run: `npm run dev`, visit `/writing` and an arbitrary bad URL like `/does-not-exist`.
Expected: writing page shows the empty-state line; the bad URL shows the decline-themed 404 with a working "Back home" link. Visiting `/writing/anything` also 404s correctly since there are no posts yet.

- [ ] **Step 12: Commit**

```bash
git add app/writing content/writing/.gitkeep app/not-found.tsx app/not-found.test.tsx lib/content.ts lib/content.writing.test.ts
git commit -m "feat: add writing index, writing/[slug] route, and custom 404"
```

---

### Task 19: Home page assembly

**Files:**
- Modify: `app/page.tsx` (replace the Next.js starter content with the full section order from the spec)
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `Hero`, `Offers`, `SprintTimeline`, `WorkPreviewStrip`, `BackgroundTeaser`, `ContactSection` — every section built in Tasks 11–16.

- [ ] **Step 1: Write the failing test**

Create `app/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/components/Hero", () => ({ Hero: () => <div>HERO</div> }))
vi.mock("@/components/Offers", () => ({ Offers: () => <div>OFFERS</div> }))
vi.mock("@/components/SprintTimeline", () => ({ SprintTimeline: () => <div>TIMELINE</div> }))
vi.mock("@/components/WorkPreviewStrip", () => ({ WorkPreviewStrip: async () => <div>WORK</div> }))
vi.mock("@/components/BackgroundTeaser", () => ({ BackgroundTeaser: () => <div>BACKGROUND</div> }))
vi.mock("@/components/ContactSection", () => ({ ContactSection: () => <div>CONTACT</div> }))

import HomePage from "./page"

describe("HomePage", () => {
  it("renders every section in spec order", async () => {
    render(await HomePage())
    const order = ["HERO", "OFFERS", "TIMELINE", "WORK", "BACKGROUND", "CONTACT"]
    const text = screen.getByTestId("home").textContent ?? ""
    const positions = order.map((label) => text.indexOf(label))
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1])
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/page.test`
Expected: FAIL — `app/page.tsx` still has the Next.js starter content, not a `data-testid="home"` wrapper with these six sections.

- [ ] **Step 3: Implement the assembled home page**

Replace `app/page.tsx`:
```tsx
import { Hero } from "@/components/Hero"
import { Offers } from "@/components/Offers"
import { SprintTimeline } from "@/components/SprintTimeline"
import { WorkPreviewStrip } from "@/components/WorkPreviewStrip"
import { BackgroundTeaser } from "@/components/BackgroundTeaser"
import { ContactSection } from "@/components/ContactSection"

export default async function HomePage() {
  return (
    <div data-testid="home">
      <Hero />
      <Offers />
      <SprintTimeline />
      <WorkPreviewStrip />
      <BackgroundTeaser />
      <ContactSection />
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/page.test`
Expected: PASS.

- [ ] **Step 5: Full visual walkthrough**

Run: `npm run dev`, open `http://localhost:3000` and scroll the whole page.
Expected: header → hero with working tabbed demo → offers → sprint timeline → "Things I've built" (3 cards + "See all work") → background teaser (4 credential chips + résumé link) → "Is this a fit?" → footer. Click through to `/work`, a `/work/[slug]`, `/resume`, and `/writing` from the nav and confirm each loads. Try Cmd+K and confirm it navigates.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: assemble the full home page in spec order"
```

---

### Task 20: Final QA pass

**Files:** none created — this task verifies everything built in Tasks 1–19 together.

- [ ] **Step 1: Full test suite**

Run: `npm test`
Expected: every test file from Tasks 1–19 passes, zero failures.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: no type errors. Fix any that surface from cross-task integration (e.g. a prop typo between `WorkItem` and `WorkCardProps`) before proceeding.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors. Warnings are acceptable but should be reviewed.

- [ ] **Step 4: Production build**

Run: `npx velite && npm run build`
Expected: build completes successfully, including static generation of all 4 `/work/[slug]` routes (via `generateStaticParams` from Task 15).

- [ ] **Step 5: Regenerate the résumé PDF against the production build**

Run: `npm run start` (serves the production build), then in another terminal `PDF_BASE_URL=http://localhost:3000 npm run resume:pdf`.
Expected: `public/resume.pdf` is regenerated from the production build and opens correctly in a PDF viewer, matching `/resume/print`.

- [ ] **Step 6: Accessibility spot-check**

With `npm run dev` running, tab through the home page keyboard-only: header nav → Cmd+K trigger → hero CTAs → demo widget tabs → offers → work cards → contact CTA → footer socials.
Expected: every interactive element is reachable and has a visible focus ring (from the `:focus-visible` rule in `app/globals.css`); the demo widget's tabs, the CitedStat tooltips, and the ResumeTimeline hover-reveal are all also operable via keyboard (Tab + Enter/Space), not mouse-only.

- [ ] **Step 7: Reduced-motion check**

In the browser, enable "prefers reduced motion" (OS-level or via DevTools rendering emulation) and reload the home page.
Expected: the status-dot pulse animation stops (add `@media (prefers-reduced-motion: reduce) { .dot { animation: none; } }` to `components/Header.module.css` if it doesn't already respect this).

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "chore: final QA pass — types, lint, production build, accessibility"
```

---

## What this plan does not cover

Per spec §8/§9: no real backend for the demo widget, no blog subscribe mechanism, no CMS, no illustrated mascot/diagrams beyond the CitedStat/WorkCard treatment already built, no analytics, and no DNS/domain configuration for `shams-rizvi.com` — that's a manual step against the registrar once this build is deployed to Vercel.

