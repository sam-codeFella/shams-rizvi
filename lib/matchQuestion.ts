import Fuse from "fuse.js"
import { demoQA, type QAEntry } from "@/data/demo-qa"

const fuse = new Fuse(demoQA, {
  keys: ["question"],
  threshold: 0.4,
})

export function matchQuestion(input: string): QAEntry {
  const trimmed = input.trim()
  if (!trimmed) return demoQA[0]

  const results = fuse.search(trimmed)
  return results.length > 0 ? results[0].item : demoQA[0]
}
