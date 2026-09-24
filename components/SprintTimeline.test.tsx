import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SprintTimeline } from "./SprintTimeline"

describe("SprintTimeline", () => {
  it("renders all four steps in order", () => {
    render(<SprintTimeline />)
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent("Map the system")
    expect(items[3]).toHaveTextContent("Fix and hand over")
  })
})
