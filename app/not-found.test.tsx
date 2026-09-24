import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NotFound from "./not-found"

describe("NotFound", () => {
  it("shows the decline-themed 404 copy and a link home", () => {
    render(<NotFound />)
    expect(screen.getByText("This page declined to answer.")).toBeInTheDocument()
    expect(screen.getByText("No evidence it exists.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/")
  })
})
