import Link from "next/link"
import { site } from "@/data/site"
import { CommandPalette } from "./CommandPalette"
import styles from "./Header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <span className={styles.name}>{site.name}</span>
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {site.status} · {site.location}
        </span>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/work">Work</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/resume">Resume</Link>
      </nav>
      <CommandPalette />
    </header>
  )
}
