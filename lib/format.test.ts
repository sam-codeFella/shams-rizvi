import { describe, it, expect } from "vitest"
import { formatMonthYear, formatFullDate, yearOf, readingTime, groupByYear } from "./format"

describe("formatMonthYear", () => {
  it("formats an ISO date as 'Mon YYYY'", () => {
    expect(formatMonthYear("2026-10-12")).toBe("Oct 2026")
  })
})

describe("formatFullDate", () => {
  it("formats an ISO date as 'D Mon YYYY'", () => {
    expect(formatFullDate("2026-10-12")).toBe("12 Oct 2026")
  })
})

describe("yearOf", () => {
  it("extracts the year from an ISO date", () => {
    expect(yearOf("2025-01-01")).toBe(2025)
  })
})

describe("readingTime", () => {
  it("returns at least 1 minute for short content", () => {
    expect(readingTime("<p>hello world</p>")).toBe(1)
  })

  it("strips HTML tags before counting words", () => {
    const words = Array(400).fill("word").join(" ")
    expect(readingTime(`<p>${words}</p>`)).toBe(2)
  })
})

describe("groupByYear", () => {
  it("groups items by year, newest year first", () => {
    const items = [
      { date: "2025-01-01", label: "old" },
      { date: "2026-06-01", label: "new" },
      { date: "2026-01-01", label: "also-new" },
    ]
    const groups = groupByYear(items)
    expect(groups.map(([year]) => year)).toEqual([2026, 2025])
    expect(groups[0][1].map((i) => i.label)).toEqual(["new", "also-new"])
  })
})
