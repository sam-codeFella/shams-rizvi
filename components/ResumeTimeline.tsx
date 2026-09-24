"use client"

import { useState } from "react"
import { resumeRoles } from "@/data/resume"
import styles from "./ResumeTimeline.module.css"

export function ResumeTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <ul className={styles.timeline}>
      {resumeRoles.map((r) => {
        const isOpen = expanded === r.id
        return (
          <li key={r.id}>
            <button
              type="button"
              className={styles.row}
              aria-expanded={isOpen}
              onClick={() => setExpanded(isOpen ? null : r.id)}
            >
              <span className={styles.years}>{r.years}</span>
              <span>
                <span className={styles.titleRow}>
                  <strong>{r.title}</strong>
                  <span className={styles.chevron} aria-hidden="true">
                    ▾
                  </span>
                </span>
                {isOpen && <p className={styles.detail}>{r.detail}</p>}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
