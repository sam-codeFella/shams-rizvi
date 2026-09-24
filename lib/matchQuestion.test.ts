import { describe, it, expect } from "vitest"
import { matchQuestion } from "./matchQuestion"
import { demoQA } from "@/data/demo-qa"

describe("matchQuestion", () => {
  it("returns the exact entry for an exact question", () => {
    const entry = matchQuestion("Did the company change its auditor this year?")
    expect(entry.id).toBe("auditor-change")
  })

  it("still matches on a close, typo'd version of a known question", () => {
    const entry = matchQuestion("did the compnay change its auditer this year")
    expect(entry.id).toBe("auditor-change")
  })

  it("falls back to the first entry for unrelated input", () => {
    const entry = matchQuestion("zzz qqq unrelated nonsense xyz")
    expect(entry.id).toBe(demoQA[0].id)
  })

  it("falls back to the first entry for empty input", () => {
    const entry = matchQuestion("")
    expect(entry.id).toBe(demoQA[0].id)
  })
})
