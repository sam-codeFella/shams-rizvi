import Link from "next/link"
import type { Metadata } from "next"
import { site } from "@/data/site"
import styles from "./page.module.css"

export const metadata: Metadata = { title: "Now" }

const updated = "27 September 2026"

export default function NowPage() {
  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Shams Rizvi
      </Link>
      <h1>Now</h1>
      <p className={styles.updated}>Updated {updated}</p>
      <div className={styles.body}>
        <p>
          {site.nowLine}. See <Link href="/work">the work page</Link> for what that looks like and how to
          get in touch.
        </p>
        <p>[Add more on what you&apos;re focused on this month.]</p>
      </div>
    </div>
  )
}
