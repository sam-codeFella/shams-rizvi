import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TraceTab } from "./TraceTab"

describe("TraceTab", () => {
  it("hides citation excerpts until a citation is clicked", async () => {
    const user = userEvent.setup()
    render(<TraceTab />)

    expect(screen.queryByText(/Board approved the appointment/)).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" }))
    expect(screen.getByText(/Board approved the appointment/)).toBeInTheDocument()
  })

  it("hides the excerpt again when the same citation is clicked twice", async () => {
    const user = userEvent.setup()
    render(<TraceTab />)

    const button = screen.getByRole("button", { name: "Reg 30 filing · p.2 · L.14" })
    await user.click(button)
    await user.click(button)
    expect(screen.queryByText(/Board approved the appointment/)).not.toBeInTheDocument()
  })
})
