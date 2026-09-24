import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const push = vi.fn()
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}))

import { CommandPalette } from "./CommandPalette"

describe("CommandPalette", () => {
  beforeEach(() => push.mockClear())

  it("opens on Cmd+K and lists nav destinations", async () => {
    render(<CommandPalette />)
    await userEvent.keyboard("{Meta>}k{/Meta}")
    expect(screen.getByPlaceholderText("Jump to...")).toBeInTheDocument()
    expect(screen.getByText("Work")).toBeInTheDocument()
    expect(screen.getByText("Writing")).toBeInTheDocument()
    expect(screen.getByText("Resume")).toBeInTheDocument()
  })

  it("navigates when an item is selected", async () => {
    render(<CommandPalette />)
    await userEvent.keyboard("{Meta>}k{/Meta}")
    await userEvent.click(screen.getByText("Work"))
    expect(push).toHaveBeenCalledWith("/work")
  })
})
