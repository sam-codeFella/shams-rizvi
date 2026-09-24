import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ResumeTimeline } from "./ResumeTimeline"

describe("ResumeTimeline", () => {
  it("renders every role's title but hides detail until hovered", () => {
    render(<ResumeTimeline />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })

  it("reveals a role's detail on hover and hides it on unhover", async () => {
    const user = userEvent.setup()
    render(<ResumeTimeline />)
    const role = screen.getByText("Founder & CEO, KnowYourCompany.ai")

    await user.hover(role)
    expect(screen.getByText(/50\+ demos/)).toBeInTheDocument()

    await user.unhover(role)
    expect(screen.queryByText(/50\+ demos/)).not.toBeInTheDocument()
  })
})
