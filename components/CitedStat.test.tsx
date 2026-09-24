import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CitedStat } from "./CitedStat"

describe("CitedStat", () => {
  it("shows the value and hides the tooltip by default", () => {
    render(<CitedStat value="5,500+ listed companies covered" context="Refreshed nightly." />)
    expect(screen.getByText("5,500+ listed companies covered")).toBeInTheDocument()
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("reveals the tooltip on hover and hides it again on unhover", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="500M+ events a day" context="Peak ingestion, Concentric AI." />)
    const stat = screen.getByText("500M+ events a day")

    await user.hover(stat)
    expect(screen.getByRole("tooltip")).toHaveTextContent("Peak ingestion, Concentric AI.")

    await user.unhover(stat)
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("reveals the tooltip on keyboard focus", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="32 enterprise customers" context="As of the last fiscal year." />)
    await user.tab()
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
  })
})
