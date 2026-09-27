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

  it("links the entry that has a URL, and does not link the one that doesn't", () => {
    render(<BuiltList />)
    expect(screen.getByRole("link", { name: "KnowYourCompany.ai" })).toHaveAttribute(
      "href",
      "https://www.knowyourcompany.ai/"
    )
    expect(screen.queryByRole("link", { name: "US patent" })).not.toBeInTheDocument()
    expect(screen.getByText("US patent")).toBeInTheDocument()
  })
})
