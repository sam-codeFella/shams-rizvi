import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/lib/content", () => ({
  getAllPosts: () => [],
}))
vi.mock("@/data/planned-posts", () => ({
  plannedPosts: ["A planned post"],
}))

import HomePage from "./page"

describe("HomePage", () => {
  it("renders the About copy, ending with a link to /story", () => {
    render(<HomePage />)
    expect(screen.getByText(/I'm Shams\. I've spent eight years/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "The long version →" })).toHaveAttribute("href", "/story")
  })

  it("shows the planned posts as 'soon' when there are no real posts yet", () => {
    render(<HomePage />)
    expect(screen.getByText("A planned post")).toBeInTheDocument()
    expect(screen.getAllByText("soon").length).toBeGreaterThan(0)
  })

  it("renders the Timeline and Built sections", () => {
    render(<HomePage />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("KnowYourCompany.ai", { selector: "a" })).toBeInTheDocument()
  })

  it("renders the footer with the RSS link", () => {
    render(<HomePage />)
    expect(screen.getByRole("link", { name: "RSS" })).toHaveAttribute("href", "/rss.xml")
  })
})
