import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/lib/content", () => ({
  getAllPosts: () => [],
}))

import WritingIndexPage from "./page"

describe("WritingIndexPage", () => {
  it("shows the planned posts when there are no real posts yet", () => {
    render(<WritingIndexPage />)
    expect(screen.getByText("Nothing published yet. Here's what's planned:")).toBeInTheDocument()
    expect(screen.getByText("Moving from Pinecone to hybrid search")).toBeInTheDocument()
  })
})
