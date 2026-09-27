import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PostList } from "./PostList"

describe("PostList", () => {
  it("renders a published post as a link with its date", () => {
    render(<PostList items={[{ title: "Hello", slug: "hello", dateLabel: "Oct 2026" }]} />)
    expect(screen.getByRole("link", { name: "Hello" })).toHaveAttribute("href", "/writing/hello")
    expect(screen.getByText("Oct 2026")).toBeInTheDocument()
  })

  it("renders a planned post as plain text with a 'soon' label, not a link", () => {
    render(<PostList items={[{ title: "Coming later", soon: true }]} />)
    expect(screen.queryByRole("link", { name: "Coming later" })).not.toBeInTheDocument()
    expect(screen.getByText("Coming later")).toBeInTheDocument()
    expect(screen.getByText("soon")).toBeInTheDocument()
  })
})
