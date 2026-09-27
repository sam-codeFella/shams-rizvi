import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NowPage from "./page"

describe("NowPage", () => {
  it("shows the now-line and an updated date", () => {
    render(<NowPage />)
    expect(screen.getByText(/helping 2 founders ship AI to production/)).toBeInTheDocument()
    expect(screen.getByText(/Updated/)).toBeInTheDocument()
  })

  it("links to the work page", () => {
    render(<NowPage />)
    expect(screen.getByRole("link", { name: "the work page" })).toHaveAttribute("href", "/work")
  })
})
