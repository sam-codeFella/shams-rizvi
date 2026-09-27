import Link from "next/link"
import type { Metadata } from "next"
import { site } from "@/data/site"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import styles from "./page.module.css"

export const metadata: Metadata = { title: "Work with me" }

export default function WorkPage() {
  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Shams Rizvi
      </Link>
      <h1>Work with me</h1>

      <div className={styles.offer}>
        <h3>AI Production Readiness Sprint</h3>
        <p>2 weeks, fixed fee. Evals on your data, failure analysis, top fixes shipped.</p>
      </div>

      <div className={styles.offer}>
        <h3>Fractional Head of AI</h3>
        <p>5 to 15 hours a week, monthly retainer.</p>
      </div>

      <h2>Best fit</h2>
      <div className={styles.fit}>
        <p>Seed to Series A teams working with documents, financial data, compliance or legal text.</p>
      </div>

      <h2>Contact</h2>
      <div className={styles.contact}>
        <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <CopyEmailButton email={site.email} />
      </div>
    </div>
  )
}
