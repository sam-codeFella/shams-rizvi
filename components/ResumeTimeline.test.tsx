import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ResumeTimeline } from "./ResumeTimeline"

describe("ResumeTimeline", () => {
  it("renders every role's title but hides detail until expanded", () => {
    render(<ResumeTimeline />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })

  it("reveals a role's detail on click/tap and hides it again on a second click", async () => {
    const user = userEvent.setup()
    render(<ResumeTimeline />)
    const row = screen.getByRole("button", { name: /Founder & CEO, KnowYourCompany\.ai/ })

    await user.click(row)
    expect(screen.getByText(/50\+ demos/)).toBeInTheDocument()
    expect(row).toHaveAttribute("aria-expanded", "true")

    await user.click(row)
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })
})
