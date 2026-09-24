"use client"

import { useState, type FormEvent } from "react"
import { matchQuestion } from "@/lib/matchQuestion"
import { useTypewriter } from "@/lib/useTypewriter"
import type { QAEntry } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function AskTab() {
  const [input, setInput] = useState("")
  const [entry, setEntry] = useState<QAEntry | null>(null)
  const typed = useTypewriter(entry?.declined ? "" : entry?.answer ?? "")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setEntry(matchQuestion(input))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="demo-question">Ask a question</label>
        <input
          id="demo-question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Did the company change its auditor this year?"
        />
        <button type="submit">Ask</button>
      </form>

      {entry && (
        <div className={styles.result}>
          <p className={styles.question}>{"> " + entry.question}</p>

          {entry.declined ? (
            <div className={styles.decline} role="alert">
              <strong>Declined</strong>
              <p>{entry.declineReason}</p>
            </div>
          ) : (
            <>
              <p>{typed}</p>
              <div className={styles.citations}>
                {entry.citations.map((c) => (
                  <span key={c.label} className={styles.cite}>
                    {c.label}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
