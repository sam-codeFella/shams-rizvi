import Link from "next/link"
import type { Metadata } from "next"
import { SideColumn, type NavItem } from "@/components/SideColumn"
import { StoryProgressBar } from "@/components/StoryProgressBar"
import { Footer } from "@/components/Footer"
import { getChapters, siteHasDraftChapters } from "@/lib/content"
import { readingTime } from "@/lib/format"
import styles from "./page.module.css"

export const metadata: Metadata = { title: "The long version" }

const updated = "27 September 2026"

export default function StoryPage() {
  const chapters = getChapters()
  const hasDrafts = siteHasDraftChapters()

  const navItems: NavItem[] = chapters.map((chapter) => ({
    id: `chapter-${chapter.number}`,
    label: chapter.title,
    href: `#chapter-${chapter.number}`,
  }))

  const totalMinutes = chapters.length > 0 ? readingTime(chapters.map((c) => c.content).join(" ")) : 0

  return (
    <>
      <StoryProgressBar />
      <div className={styles.layout}>
        <SideColumn variant="story" navItems={navItems} />

        <main className={styles.main}>
          <h1>The long version</h1>
          {chapters.length > 0 && (
            <p className={styles.meta}>
              About a {totalMinutes}-minute read · updated {updated}
            </p>
          )}

          {chapters.map((chapter) => (
            <article key={chapter.number} id={`chapter-${chapter.number}`} className={styles.chapter}>
              <span className={styles.chapterYear}>{chapter.year ?? ""}</span>
              <div>
                <h2 className={styles.chapterHead}>{chapter.title}</h2>
                <div
                  className={styles.chapterBody}
                  dangerouslySetInnerHTML={{ __html: chapter.content }}
                />
              </div>
            </article>
          ))}

          {hasDrafts && <p className={styles.comingSoon}>More chapters coming.</p>}

          <p className={styles.signoff}>
            <Link href="/writing">Read the writing →</Link>
          </p>

          <Footer />
        </main>
      </div>
    </>
  )
}
