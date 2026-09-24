import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeclineTab } from "./DeclineTab"

describe("DeclineTab", () => {
  it("shows the decline question and the locked decline copy", () => {
    render(<DeclineTab />)
    expect(screen.getByText(/Why did the company change its auditor/)).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent("Not in the filing. I'm not going to guess.")
  })
})
