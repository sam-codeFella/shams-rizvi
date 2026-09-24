import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const fixture = {
  slug: "first-post",
  title: "First Post",
  date: "2026-01-01",
  summary: "s",
  content: "<p>Hello from the first post.</p>",
}

const notFound = vi.hoisted(() => vi.fn())
vi.mock("next/navigation", () => ({ notFound }))
vi.mock("@/lib/content", () => ({
  getWritingItem: async (slug: string) => (slug === fixture.slug ? fixture : undefined),
  getWritingItems: async () => [fixture],
}))

import WritingDetailPage from "./page"

describe("WritingDetailPage", () => {
  it("renders the title and rendered content", async () => {
    render(await WritingDetailPage({ params: Promise.resolve({ slug: "first-post" }) }))
    expect(screen.getByText("First Post")).toBeInTheDocument()
    expect(screen.getByText("Hello from the first post.")).toBeInTheDocument()
  })

  it("calls notFound() for an unknown slug", async () => {
    notFound.mockClear()
    await WritingDetailPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
    expect(notFound).toHaveBeenCalled()
  })
})
