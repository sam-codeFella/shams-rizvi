import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SideColumn } from "./SideColumn"

const homeNav = [
  { id: "about", label: "About", href: "#about" },
  { id: "writing", label: "Writing", href: "#writing" },
]

describe("SideColumn", () => {
  it("home variant shows the name, role, and nav items", () => {
    render(<SideColumn variant="home" navItems={homeNav} />)
    // Rendered twice: once for the desktop column, once for the collapsed mobile bar.
    expect(screen.getAllByText("Shams Rizvi").length).toBeGreaterThan(0)
    expect(screen.getByText("Founder, Investor & Engineer")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about")
    expect(screen.getByRole("link", { name: "Writing" })).toHaveAttribute("href", "#writing")
  })

  it("home variant links the now-line to /work and each social to the real profile", () => {
    render(<SideColumn variant="home" navItems={homeNav} />)
    expect(screen.getByRole("link", { name: /helping 2 founders/ })).toHaveAttribute("href", "/work")
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute("href", "https://x.com/ShamsHasanRizv")
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/shams.lebowski/"
    )
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/sam-codeFella"
    )
  })

  it("story variant shows a back link instead of the name block", () => {
    const chapterNav = [{ id: "chapter-1", label: "1. Where it started", href: "#chapter-1" }]
    render(<SideColumn variant="story" navItems={chapterNav} />)
    expect(screen.getByRole("link", { name: "← Shams Rizvi" })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: "1. Where it started" })).toHaveAttribute("href", "#chapter-1")
  })

  it("marks the first nav item active by default (before any scroll)", () => {
    render(<SideColumn variant="home" navItems={homeNav} />)
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("data-active", "true")
  })
})
