import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Offers } from "./Offers"

describe("Offers", () => {
  it("renders both offers with their pricing", () => {
    render(<Offers />)
    expect(screen.getByText("AI Production Readiness Sprint")).toBeInTheDocument()
    expect(screen.getByText("Fractional Head of AI")).toBeInTheDocument()
    expect(screen.getByText("From $12,000")).toBeInTheDocument()
    expect(screen.getByText("From $6,000")).toBeInTheDocument()
  })
})
