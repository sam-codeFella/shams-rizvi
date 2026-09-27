import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CopyEmailButton } from "./CopyEmailButton"

describe("CopyEmailButton", () => {
  afterEach(() => vi.useRealTimers())

  it("shows the email by default", () => {
    render(<CopyEmailButton email="shams@example.com" />)
    expect(screen.getByRole("button", { name: "shams@example.com" })).toBeInTheDocument()
  })

  it("copies the email to the clipboard and shows 'Copied' for 1.5s", async () => {
    const user = userEvent.setup()

    // user-event's setup() installs its own clipboard stub, so ours must be
    // defined after it to take effect.
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })

    render(<CopyEmailButton email="shams@example.com" />)

    await user.click(screen.getByRole("button", { name: "shams@example.com" }))

    expect(writeText).toHaveBeenCalledWith("shams@example.com")
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument())

    await waitFor(
      () => expect(screen.getByRole("button", { name: "shams@example.com" })).toBeInTheDocument(),
      { timeout: 2000 }
    )
  })
})
