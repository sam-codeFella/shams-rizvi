import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

const fixture = {
  slug: "cited-answers-over-filings",
  title: "Cited answers over filings",
  company: "KnowYourCompany.ai",
  summary: "s",
  proofLabel: "p",
  proofContext: "c",
  order: 1,
  diagramSteps: ["Filing", "Chunk", "Embed", "Retrieve", "Cite"],
  content: "<h2>Problem</h2><p>Analysts couldn't check the answers.</p>",
}

const notFound = vi.hoisted(() => vi.fn())
vi.mock("next/navigation", () => ({ notFound }))
vi.mock("@/lib/content", () => ({
  getWorkItem: async (slug: string) => (slug === fixture.slug ? fixture : undefined),
  getWorkItems: async () => [fixture],
}))

import WorkDetailPage from "./page"

describe("WorkDetailPage", () => {
  it("renders the title, company, rendered content, and a back link", async () => {
    render(await WorkDetailPage({ params: Promise.resolve({ slug: "cited-answers-over-filings" }) }))
    expect(screen.getByText("Cited answers over filings")).toBeInTheDocument()
    expect(screen.getByText("KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("Analysts couldn't check the answers.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "← Back to work" })).toHaveAttribute("href", "/work")
  })

  it("has a Book a call CTA to LinkedIn", async () => {
    render(await WorkDetailPage({ params: Promise.resolve({ slug: "cited-answers-over-filings" }) }))
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/shams-rizvi/"
    )
  })

  it("calls notFound() for an unknown slug", async () => {
    notFound.mockClear()
    await WorkDetailPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
    expect(notFound).toHaveBeenCalled()
  })
})
