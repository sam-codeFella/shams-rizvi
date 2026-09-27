"use client"

import { useEffect, useState } from "react"
import styles from "./StoryProgressBar.module.css"

export function StoryProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0
      setProgress(pct)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  )
}
