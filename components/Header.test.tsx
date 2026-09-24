import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Header } from "./Header"

// Header renders CommandPalette, which calls useRouter() unconditionally —
// jsdom has no real Next.js app-router context to satisfy that hook.
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
