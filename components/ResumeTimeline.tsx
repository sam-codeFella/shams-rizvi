"use client"

import { useState } from "react"
import { resumeRoles } from "@/data/resume"
import styles from "./ResumeTimeline.module.css"

export function ResumeTimeline() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <ul className={styles.timeline}>
      {resumeRoles.map((r) => (
        <li
          key={r.id}
          tabIndex={0}
          onMouseEnter={() => setExpanded(r.id)}
          onMouseLeave={() => setExpanded(null)}
          onFocus={() => setExpanded(r.id)}
          onBlur={() => setExpanded(null)}
        >
          <span className={styles.years}>{r.years}</span>
          <span>
            <strong>{r.title}</strong>
            {expanded === r.id && <p className={styles.detail}>{r.detail}</p>}
          </span>
        </li>
      ))}
    </ul>
  )
}
