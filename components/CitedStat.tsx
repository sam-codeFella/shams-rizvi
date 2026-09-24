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
    <span
      className={styles.stat}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? tooltipId : undefined}
    >
      {value}
      {open && (
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          {context}
        </span>
      )}
    </span>
  )
}
