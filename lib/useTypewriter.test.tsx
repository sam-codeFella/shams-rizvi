import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { useTypewriter } from "./useTypewriter"

function Demo({ text }: { text: string }) {
  const typed = useTypewriter(text, 10)
  return <p>{typed}</p>
}

describe("useTypewriter", () => {
  afterEach(() => vi.useRealTimers())

  it("reveals the text one character at a time", () => {
    vi.useFakeTimers()
    render(<Demo text="Hi" />)

    act(() => vi.advanceTimersByTime(10))
    expect(screen.getByText("H")).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(10))
    expect(screen.getByText("Hi")).toBeInTheDocument()
  })

  it("resets and retypes when the text prop changes", () => {
    vi.useFakeTimers()
    const { rerender } = render(<Demo text="Hi" />)
    act(() => vi.advanceTimersByTime(20))
    expect(screen.getByText("Hi")).toBeInTheDocument()

    rerender(<Demo text="Bye" />)
    act(() => vi.advanceTimersByTime(30))
    expect(screen.getByText("Bye")).toBeInTheDocument()
  })
})
