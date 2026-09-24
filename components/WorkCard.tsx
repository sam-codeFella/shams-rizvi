"use client"

import { useState } from "react"
import Link from "next/link"
import { CitedStat } from "./CitedStat"
import { PipelineDiagram } from "./PipelineDiagram"
import styles from "./WorkCard.module.css"

interface WorkCardProps {
  slug: string
  title: string
  company: string
  summary: string
  proofLabel: string
  proofContext: string
  diagramSteps: string[]
}

export function WorkCard({
  slug,
  title,
  company,
  summary,
  proofLabel,
  proofContext,
  diagramSteps,
}: WorkCardProps) {
  const [showDiagram, setShowDiagram] = useState(false)

  return (
    <article className={styles.card}>
      <header>
        <h3>{title}</h3>
        <span className={styles.company}>{company}</span>
      </header>
      <p>{summary}</p>
      <CitedStat value={proofLabel} context={proofContext} />
      <button
        type="button"
        className={styles.diagramToggle}
        onClick={() => setShowDiagram((v) => !v)}
        aria-expanded={showDiagram}
      >
        {showDiagram ? "Hide how it works ▲" : "See how it works ▼"}
      </button>
      {showDiagram && (
        <div className={styles.diagramSlot}>
          <PipelineDiagram steps={diagramSteps} />
        </div>
      )}
      <Link href={`/work/${slug}`}>Read the case →</Link>
    </article>
  )
}
