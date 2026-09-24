import type { Metadata } from "next"
import { credentials } from "@/data/resume"
import { ResumeTimeline } from "@/components/ResumeTimeline"
import styles from "./page.module.css"

export const metadata: Metadata = { title: "Résumé · Shams Rizvi" }

export default function ResumePage() {
  return (
    <div>
      <div className={styles.actions}>
        <a href="/resume.pdf" download className={styles.download}>
          Download PDF
        </a>
      </div>
      <h1>Background</h1>
      <ResumeTimeline />
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
