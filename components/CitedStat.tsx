"use client"

import { useId, useState } from "react"
import styles from "./CitedStat.module.css"

interface CitedStatProps {
  value: string
  context: string
}

export function CitedStat({ value, context }: CitedStatProps) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()

  return (
    <button
      type="button"
      className={styles.stat}
      onClick={() => setOpen((o) => !o)}
      aria-describedby={open ? tooltipId : undefined}
      aria-expanded={open}
    >
      {value}
      {open && (
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          {context}
        </span>
      )}
    </button>
  )
}
