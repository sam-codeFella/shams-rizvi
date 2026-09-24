import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/lib/content", () => ({
  getWorkItems: async () => [
    { slug: "a", title: "A", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 1, diagramSteps: [], content: "" },
    { slug: "b", title: "B", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 2, diagramSteps: [], content: "" },
    { slug: "c", title: "C", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 3, diagramSteps: [], content: "" },
    { slug: "d", title: "D", company: "X", summary: "s", proofLabel: "p", proofContext: "c", order: 4, diagramSteps: [], content: "" },
  ],
}))

import WorkIndexPage from "./page"

describe("WorkIndexPage", () => {
  it("renders all four work items", async () => {
    render(await WorkIndexPage())
    ;["A", "B", "C", "D"].forEach((title) => expect(screen.getByText(title)).toBeInTheDocument())
  })
})
