import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./Hero"

describe("Hero", () => {
  it("renders the locked headline with 'systems' highlighted", () => {
    render(<Hero />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toHaveTextContent("I build production AI systems your users can check.")
    expect(heading.querySelector("mark")).toHaveTextContent("systems")
  })

  it("renders the locked lede", () => {
    render(<Hero />)
    expect(screen.getByText(/I built KnowYourCompany\.ai's AI stack end to end/)).toBeInTheDocument()
  })

  it("has a primary CTA to LinkedIn and a ghost CTA to the demo", () => {
    render(<Hero />)
    expect(screen.getByRole("link", { name: "Book a call on LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
    expect(screen.getByRole("link", { name: "See the demo ↓" })).toHaveAttribute("href", "#demo")
  })

  it("embeds the demo widget", () => {
    render(<Hero />)
    expect(screen.getByRole("tablist", { name: "Live demo" })).toBeInTheDocument()
  })
})
