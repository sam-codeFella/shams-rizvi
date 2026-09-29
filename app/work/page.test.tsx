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

  it("has a Book a call CTA for the Fractional Head of AI offer", () => {
    render(<WorkPage />)
    const cta = screen.getByRole("link", { name: "Book a call →" })
    expect(cta).toHaveAttribute("href", "https://calendar.app.google/5bmS5PfEbb2Di3yu9")
    expect(cta).toHaveAttribute("target", "_blank")
  })

  it("offers a downloadable résumé", () => {
    render(<WorkPage />)
    const download = screen.getByRole("link", { name: "Download résumé →" })
    expect(download).toHaveAttribute("href", "/resume-fractional.pdf")
    expect(download).toHaveAttribute("download", "Shams-Rizvi-Fractional-Resume.pdf")
  })
})
