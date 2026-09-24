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
