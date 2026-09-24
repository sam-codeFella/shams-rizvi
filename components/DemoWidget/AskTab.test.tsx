import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AskTab } from "./AskTab"

describe("AskTab", () => {
  it("shows the typed answer and citations for a known question", async () => {
    const user = userEvent.setup()

    render(<AskTab />)
    await user.type(screen.getByLabelText("Ask a question"), "Did the company change its auditor this year?")
    await user.click(screen.getByRole("button", { name: "Ask" }))

    await waitFor(
      () => expect(screen.getByText(/board approved a new statutory auditor/)).toBeInTheDocument(),
      { timeout: 3000 }
    )
    expect(screen.getByText("Reg 30 filing · p.2 · L.14")).toBeInTheDocument()
  })

  it("shows the decline box for the decline question", async () => {
    const user = userEvent.setup()

    render(<AskTab />)
    await user.type(screen.getByLabelText("Ask a question"), "Why did the company change its auditor?")
    await user.click(screen.getByRole("button", { name: "Ask" }))

    expect(screen.getByRole("alert")).toHaveTextContent("Not in the filing. I'm not going to guess.")
  })
})
