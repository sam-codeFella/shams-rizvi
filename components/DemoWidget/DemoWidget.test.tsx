import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DemoWidget } from "./DemoWidget"

describe("DemoWidget", () => {
  it("defaults to the Ask it anything tab", () => {
    render(<DemoWidget />)
    expect(screen.getByRole("tab", { name: "Ask it anything" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByLabelText("Ask a question")).toBeInTheDocument()
  })

  it("switches tabs on click", async () => {
    const user = userEvent.setup()
    render(<DemoWidget />)

    await user.click(screen.getByRole("tab", { name: "Watch it decline" }))
    expect(screen.getByRole("tab", { name: "Watch it decline" })).toHaveAttribute("aria-selected", "true")
    expect(screen.queryByLabelText("Ask a question")).not.toBeInTheDocument()
  })

  it("shows the Trace the citation panel when selected", async () => {
    const user = userEvent.setup()
    render(<DemoWidget />)

    await user.click(screen.getByRole("tab", { name: "Trace the citation" }))
    expect(screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" })).toBeInTheDocument()
  })
})
