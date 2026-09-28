import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BuiltList } from "./BuiltList"

describe("BuiltList", () => {
  it("renders all three entries", () => {
    render(<BuiltList />)
    expect(screen.getByText("KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("Pipelines at 500M+ events a day")).toBeInTheDocument()
    expect(screen.getByText("US patent")).toBeInTheDocument()
  })

  it("links entries that have a URL, and does not link the one that doesn't", () => {
    render(<BuiltList />)
    expect(screen.getByRole("link", { name: "KnowYourCompany.ai" })).toHaveAttribute(
      "href",
      "https://www.knowyourcompany.ai/"
    )
    expect(screen.getByRole("link", { name: "US patent" })).toHaveAttribute(
      "href",
      "https://uspto.report/patent/app/20200322342"
    )
    expect(screen.queryByRole("link", { name: "Pipelines at 500M+ events a day" })).not.toBeInTheDocument()
    expect(screen.getByText("Pipelines at 500M+ events a day")).toBeInTheDocument()
  })
})
