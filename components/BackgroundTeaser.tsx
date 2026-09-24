import Link from "next/link"
import { credentials } from "@/data/resume"
import styles from "./BackgroundTeaser.module.css"

export function BackgroundTeaser() {
  return (
    <section aria-labelledby="background-heading">
      <h2 id="background-heading">Background</h2>
      <p>An engineer who went into finance and ran a company: product, sales, fundraising and operations.</p>
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <Link href="/resume">Full background &amp; résumé →</Link>
    </section>
  )
}
