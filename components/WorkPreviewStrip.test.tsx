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

import { WorkPreviewStrip } from "./WorkPreviewStrip"

describe("WorkPreviewStrip", () => {
  it("shows only the first three items and a link to see all work", async () => {
    render(await WorkPreviewStrip())
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()
    expect(screen.queryByText("D")).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "See all work →" })).toHaveAttribute("href", "/work")
  })
})
