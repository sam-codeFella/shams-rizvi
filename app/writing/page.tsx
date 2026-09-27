import type { Metadata } from "next"
import Link from "next/link"
import { PostList } from "@/components/PostList"
import { getAllPosts } from "@/lib/content"
import { formatMonthYear, groupByYear } from "@/lib/format"
import { plannedPosts } from "@/data/planned-posts"
import styles from "./page.module.css"

export const metadata: Metadata = { title: "Writing" }

export default function WritingIndexPage() {
  const posts = getAllPosts()
  const groups = groupByYear(posts)

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Shams Rizvi
      </Link>
      <h1>Writing</h1>

      {groups.length === 0 ? (
        <>
          <p className={styles.empty}>Nothing published yet. Here&apos;s what&apos;s planned:</p>
          <PostList items={plannedPosts.map((title) => ({ title, soon: true }))} />
        </>
      ) : (
        groups.map(([year, yearPosts]) => (
          <div key={year} className={styles.yearGroup}>
            <h2>{year}</h2>
            <PostList
              items={yearPosts.map((post) => ({
                title: post.title,
                slug: post.slug,
                dateLabel: formatMonthYear(post.date),
              }))}
            />
          </div>
        ))
      )}
    </div>
  )
}
