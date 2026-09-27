import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import WorkPage from "./page"

describe("WorkPage", () => {
  it("shows both offers without any price figures", () => {
    render(<WorkPage />)
    expect(screen.getByText("AI Production Readiness Sprint")).toBeInTheDocument()
    expect(screen.getByText("Fractional Head of AI")).toBeInTheDocument()
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })

  it("states the best-fit criteria and contact options", () => {
    render(<WorkPage />)
    expect(screen.getByText(/Seed to Series A teams/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
  })
})
