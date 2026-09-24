"use client"

import { useState } from "react"
import { demoQA } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function TraceTab() {
  const entry = demoQA.find((q) => !q.declined && q.citations.length > 0)!
  const [revealed, setRevealed] = useState<string | null>(null)

  return (
    <div>
      <p className={styles.question}>{"> " + entry.question}</p>
      <p>{entry.answer}</p>
      <div className={styles.citations}>
        {entry.citations.map((c) => (
          <button
            key={c.label}
            className={styles.cite}
            aria-expanded={revealed === c.label}
            onClick={() => setRevealed(revealed === c.label ? null : c.label)}
          >
            {c.label}
          </button>
        ))}
      </div>
      {revealed && <blockquote>{entry.citations.find((c) => c.label === revealed)?.excerpt}</blockquote>}
    </div>
  )
}
