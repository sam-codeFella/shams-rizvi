import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ResumePage from "./page"

describe("ResumePage", () => {
  it("has a Download PDF link", () => {
    render(<ResumePage />)
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("href", "/resume.pdf")
  })

  it("renders the timeline and credentials", () => {
    render(<ResumePage />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("US patent co-inventor")).toBeInTheDocument()
  })
})
