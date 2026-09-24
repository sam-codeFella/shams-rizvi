import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import WritingIndexPage from "./page"

describe("WritingIndexPage", () => {
  it("shows the locked empty-state copy", () => {
    render(<WritingIndexPage />)
    expect(
      screen.getByText("Nothing here yet. I write when I have something worth five minutes of your attention.")
    ).toBeInTheDocument()
  })
})
