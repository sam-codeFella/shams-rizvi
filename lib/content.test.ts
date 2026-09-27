import { describe, it, expect } from "vitest"
import { publishedPosts, findPost, publishedChapters, hasDraftChapters, type Post, type Chapter } from "./content"

const posts: Post[] = [
  { slug: "old", title: "Old", date: "2025-01-01", summary: "", draft: false, content: "" },
  { slug: "new", title: "New", date: "2026-06-01", summary: "", draft: false, content: "" },
  { slug: "hidden", title: "Hidden", date: "2026-09-01", summary: "", draft: true, content: "" },
]

describe("publishedPosts", () => {
  it("excludes drafts and sorts newest first", () => {
    expect(publishedPosts(posts).map((p) => p.slug)).toEqual(["new", "old"])
  })
})

describe("findPost", () => {
  it("finds a published post by slug", () => {
    expect(findPost(posts, "old")?.title).toBe("Old")
  })

  it("does not return a draft post even if the slug matches", () => {
    expect(findPost(posts, "hidden")).toBeUndefined()
  })

  it("returns undefined for an unknown slug", () => {
    expect(findPost(posts, "nope")).toBeUndefined()
  })
})

const chapters: Chapter[] = [
  { slug: "b", number: 2, title: "B", draft: false, content: "" },
  { slug: "a", number: 1, title: "A", draft: false, content: "" },
  { slug: "c", number: 3, title: "C", draft: true, content: "" },
]

describe("publishedChapters", () => {
  it("excludes drafts and sorts by chapter number", () => {
    expect(publishedChapters(chapters).map((c) => c.slug)).toEqual(["a", "b"])
  })
})

describe("hasDraftChapters", () => {
  it("is true when at least one chapter is a draft", () => {
    expect(hasDraftChapters(chapters)).toBe(true)
  })

  it("is false when none are drafts", () => {
    expect(hasDraftChapters(chapters.filter((c) => !c.draft))).toBe(false)
  })
})
