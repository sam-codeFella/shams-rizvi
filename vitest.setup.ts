import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"
import React from "react"

// next/link's App Router version expects an app-router context that plain
// Vitest + jsdom doesn't provide. Every test in this project only cares
// that the right href is rendered, so replace it globally with a plain
// anchor tag rather than mocking it per test file.
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: Record<string, unknown>) =>
    React.createElement("a", { href, ...rest }, children as React.ReactNode),
}))

// cmdk (via the CommandPalette) uses ResizeObserver internally, which jsdom
// doesn't implement.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverStub

// cmdk also calls scrollIntoView on the highlighted item, which jsdom
// doesn't implement.
Element.prototype.scrollIntoView = () => {}
