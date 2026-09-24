"use client"

import { useInView } from "@/lib/useInView"
import styles from "./Reveal.module.css"

export function Reveal({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`${styles.reveal} ${inView ? styles.visible : ""}`}>
      {children}
    </div>
  )
}
