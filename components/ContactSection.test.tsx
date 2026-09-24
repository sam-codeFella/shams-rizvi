import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactSection } from "./ContactSection"

describe("ContactSection", () => {
  it("has the contact anchor id", () => {
    const { container } = render(<ContactSection />)
    expect(container.querySelector("#contact")).toBeInTheDocument()
  })

  it("renders the four fit criteria and the LinkedIn CTA", () => {
    render(<ContactSection />)
    expect(screen.getAllByRole("listitem")).toHaveLength(4)
    expect(screen.getByRole("link", { name: "Message me on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
  })
})
