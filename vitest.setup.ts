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

// jsdom doesn't implement IntersectionObserver (used by SideColumn's
// scroll-spy). Fires "intersecting" immediately so the first nav item
// resolves as active in tests instead of staying unobserved forever.
class IntersectionObserverStub {
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
globalThis.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver
