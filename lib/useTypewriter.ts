"use client"

import { useEffect, useState } from "react"

export function useTypewriter(text: string, speedMs: number = 15): string {
  const [output, setOutput] = useState("")
  const [prevText, setPrevText] = useState(text)

  // Reset during render (not inside the effect) when `text` changes, per
  // React's documented pattern for adjusting state from props — avoids a
  // synchronous setState call directly in the effect body.
  if (text !== prevText) {
    setPrevText(text)
    setOutput("")
  }

  useEffect(() => {
    if (!text) return

    let i = 0
    const interval = setInterval(() => {
      i += 1
      setOutput(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speedMs)

    return () => clearInterval(interval)
  }, [text, speedMs])

  return output
}
