import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PipelineDiagram } from "./PipelineDiagram"

describe("PipelineDiagram", () => {
  it("renders one labeled node per step, in order", () => {
    render(<PipelineDiagram steps={["Filing", "Chunk", "Embed", "Retrieve", "Cite"]} />)
    const svg = screen.getByRole("img", { name: "Filing → Chunk → Embed → Retrieve → Cite" })
    expect(svg).toBeInTheDocument()
    ;["Filing", "Chunk", "Embed", "Retrieve", "Cite"].forEach((step) =>
      expect(screen.getByText(step)).toBeInTheDocument()
    )
  })
})
