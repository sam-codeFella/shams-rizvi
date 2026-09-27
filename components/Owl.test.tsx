import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Owl } from "./Owl"

describe("Owl", () => {
  it("renders as a decorative, hidden-from-screen-readers mark", () => {
    const { container } = render(<Owl />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })
})
