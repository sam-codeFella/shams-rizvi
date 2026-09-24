import { describe, it, expect } from "vitest"
import {
  sortWorkItems,
  findWorkItem,
  sortWritingItems,
  findWritingItem,
  type WorkItem,
  type WritingItem,
} from "./content"

const workFixtures: WorkItem[] = [
  { slug: "b", title: "B", company: "X", summary: "", proofLabel: "", proofContext: "", order: 2, diagramSteps: [], content: "" },
  { slug: "a", title: "A", company: "X", summary: "", proofLabel: "", proofContext: "", order: 1, diagramSteps: [], content: "" },
]

describe("sortWorkItems", () => {
  it("sorts by the order field ascending", () => {
    expect(sortWorkItems(workFixtures).map((i) => i.slug)).toEqual(["a", "b"])
  })
})

describe("findWorkItem", () => {
  it("finds an item by slug", () => {
    expect(findWorkItem(workFixtures, "b")?.title).toBe("B")
  })

  it("returns undefined for an unknown slug", () => {
    expect(findWorkItem(workFixtures, "nope")).toBeUndefined()
  })
})

const writingFixtures: WritingItem[] = [
  { slug: "second-post", title: "Second", date: "2026-02-01", summary: "", content: "" },
  { slug: "first-post", title: "First", date: "2026-01-01", summary: "", content: "" },
]

describe("sortWritingItems", () => {
  it("sorts by date descending (newest first)", () => {
    expect(sortWritingItems(writingFixtures).map((i) => i.slug)).toEqual(["second-post", "first-post"])
  })
})

describe("findWritingItem", () => {
  it("finds a post by slug", () => {
    expect(findWritingItem(writingFixtures, "first-post")?.title).toBe("First")
  })

  it("returns undefined for an unknown slug", () => {
    expect(findWritingItem(writingFixtures, "nope")).toBeUndefined()
  })
})
