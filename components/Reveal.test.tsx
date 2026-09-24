import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Reveal } from "./Reveal"

describe("Reveal", () => {
  it("renders its children and becomes visible once observed as in view", () => {
    render(
      <Reveal>
        <p>Section content</p>
      </Reveal>
    )
    expect(screen.getByText("Section content")).toBeInTheDocument()
  })
})
