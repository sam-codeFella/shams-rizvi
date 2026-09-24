import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/components/Hero", () => ({ Hero: () => <div>HERO</div> }))
vi.mock("@/components/Offers", () => ({ Offers: () => <div>OFFERS</div> }))
vi.mock("@/components/SprintTimeline", () => ({ SprintTimeline: () => <div>TIMELINE</div> }))
vi.mock("@/components/WorkPreviewStrip", () => ({ WorkPreviewStrip: async () => <div>WORK</div> }))
vi.mock("@/components/BackgroundTeaser", () => ({ BackgroundTeaser: () => <div>BACKGROUND</div> }))
vi.mock("@/components/ContactSection", () => ({ ContactSection: () => <div>CONTACT</div> }))

import HomePage from "./page"

describe("HomePage", () => {
  it("renders every section in spec order", async () => {
    render(await HomePage())
    const order = ["HERO", "OFFERS", "TIMELINE", "WORK", "BACKGROUND", "CONTACT"]
    const text = screen.getByTestId("home").textContent ?? ""
    const positions = order.map((label) => text.indexOf(label))
    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1])
    }
  })
})
