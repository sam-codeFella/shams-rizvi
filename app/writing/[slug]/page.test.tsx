import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const fixture = {
  slug: "first-post",
  title: "First Post",
  date: "2026-01-15",
  summary: "s",
  draft: false,
  content: "<p>Hello from the first post.</p>",
}

const notFound = vi.hoisted(() => vi.fn())
vi.mock("next/navigation", () => ({ notFound }))
vi.mock("@/lib/content", () => ({
  getPost: (slug: string) => (slug === fixture.slug ? fixture : undefined),
  getAllPosts: () => [fixture],
}))

import PostPage from "./page"

describe("PostPage", () => {
  it("renders the title, date, reading time, and rendered content", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "first-post" }) }))
    expect(screen.getByText("First Post")).toBeInTheDocument()
    expect(screen.getByText(/15 Jan 2026/)).toBeInTheDocument()
    expect(screen.getByText("Hello from the first post.")).toBeInTheDocument()
  })

  it("has a sign-off linking back to /writing", async () => {
    render(await PostPage({ params: Promise.resolve({ slug: "first-post" }) }))
    expect(screen.getByRole("link", { name: "More writing →" })).toHaveAttribute("href", "/writing")
  })

  it("calls notFound() for an unknown slug", async () => {
    notFound.mockClear()
    await PostPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
    expect(notFound).toHaveBeenCalled()
  })
})
