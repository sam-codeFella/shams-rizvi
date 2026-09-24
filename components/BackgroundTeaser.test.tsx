import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BackgroundTeaser } from "./BackgroundTeaser"

describe("BackgroundTeaser", () => {
  it("renders all four credential chips and a link to /resume", () => {
    render(<BackgroundTeaser />)
    ;["US patent co-inventor", "B.E. Computer Science, PICT", "DPIIT-recognised startup", "NVIDIA Inception member"].forEach(
      (c) => expect(screen.getByText(c)).toBeInTheDocument()
    )
    expect(screen.getByRole("link", { name: "Full background & résumé →" })).toHaveAttribute("href", "/resume")
  })
})
