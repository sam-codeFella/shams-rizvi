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

  it("toggles the tooltip on click/tap — works identically on touch and mouse", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="500M+ events a day" context="Peak ingestion, Concentric AI." />)
    const stat = screen.getByRole("button", { name: "500M+ events a day" })

    await user.click(stat)
    expect(screen.getByRole("tooltip")).toHaveTextContent("Peak ingestion, Concentric AI.")
    expect(stat).toHaveAttribute("aria-expanded", "true")

    await user.click(stat)
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    expect(stat).toHaveAttribute("aria-expanded", "false")
  })

  it("toggles on keyboard activation (Enter), since it's a real button", async () => {
    const user = userEvent.setup()
    render(<CitedStat value="32 enterprise customers" context="As of the last fiscal year." />)
    await user.tab()
    expect(screen.getByRole("button", { name: "32 enterprise customers" })).toHaveFocus()

    await user.keyboard("{Enter}")
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
  })
})
