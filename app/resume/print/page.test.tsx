import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ResumePrintPage from "./page"

describe("ResumePrintPage", () => {
  it("renders the name and every role's detail always visible (no hover needed)", () => {
    render(<ResumePrintPage />)
    expect(screen.getByText("Shams Rizvi")).toBeInTheDocument()
    expect(screen.getByText(/50\+ demos/)).toBeInTheDocument()
    expect(screen.getByText(/Co-inventor on a US patent/)).toBeInTheDocument()
  })
})
