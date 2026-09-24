import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { WorkCard } from "./WorkCard"

const baseProps = {
  slug: "cited-answers-over-filings",
  title: "Cited answers over filings",
  company: "KnowYourCompany.ai",
  summary: "RAG over SEBI-regulated disclosures.",
  proofLabel: "5,500+ listed companies covered",
  proofContext: "Refreshed nightly.",
  diagramSteps: ["Filing", "Chunk", "Embed", "Retrieve", "Cite"],
}

describe("WorkCard", () => {
  it("renders the title, company, summary, and proof stat", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByText("Cited answers over filings")).toBeInTheDocument()
    expect(screen.getByText("KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("5,500+ listed companies covered")).toBeInTheDocument()
  })

  it("links to the case study detail page", () => {
    render(<WorkCard {...baseProps} />)
    expect(screen.getByRole("link", { name: "Read the case →" })).toHaveAttribute(
      "href",
      "/work/cited-answers-over-filings"
    )
  })

  it("hides the diagram until the toggle is clicked, then reveals it — works by click, not just hover", async () => {
    const user = userEvent.setup()
    render(<WorkCard {...baseProps} />)

    expect(screen.queryByRole("img", { name: /Filing → Chunk/ })).not.toBeInTheDocument()

    const toggle = screen.getByRole("button", { name: "See how it works ▼" })
    await user.click(toggle)
    expect(screen.getByRole("img", { name: "Filing → Chunk → Embed → Retrieve → Cite" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Hide how it works ▲" })).toHaveAttribute("aria-expanded", "true")

    await user.click(screen.getByRole("button", { name: "Hide how it works ▲" }))
    expect(screen.queryByRole("img", { name: /Filing → Chunk/ })).not.toBeInTheDocument()
  })
})
