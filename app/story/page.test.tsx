import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const chapterMocks = vi.hoisted(() => ({
  getChapters: vi.fn(),
  siteHasDraftChapters: vi.fn(),
}))
vi.mock("@/lib/content", () => chapterMocks)

import StoryPage from "./page"

describe("StoryPage", () => {
  it("shows the intro line under the heading", () => {
    chapterMocks.getChapters.mockReturnValue([])
    chapterMocks.siteHasDraftChapters.mockReturnValue(true)

    render(<StoryPage />)
    expect(
      screen.getByText(/I'm trying to create things people use every day/)
    ).toBeInTheDocument()
  })

  it("shows 'More chapters coming' when some chapters are still draft", () => {
    chapterMocks.getChapters.mockReturnValue([])
    chapterMocks.siteHasDraftChapters.mockReturnValue(true)

    render(<StoryPage />)
    expect(screen.getByText("More chapters coming.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Read the writing →" })).toHaveAttribute("href", "/writing")
  })

  it("renders a published chapter with its number, title, and year", () => {
    chapterMocks.getChapters.mockReturnValue([
      { slug: "01-where-it-started", number: 1, title: "Where it started", year: 2014, draft: false, content: "<p>It started here.</p>" },
    ])
    chapterMocks.siteHasDraftChapters.mockReturnValue(false)

    render(<StoryPage />)
    expect(screen.getByText("Where it started")).toBeInTheDocument()
    expect(screen.getByText("2014")).toBeInTheDocument()
    expect(screen.getByText("It started here.")).toBeInTheDocument()
    expect(screen.queryByText("More chapters coming.")).not.toBeInTheDocument()
  })
})
