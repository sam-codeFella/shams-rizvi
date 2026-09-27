import Link from "next/link"
import { SideColumn, type NavItem } from "@/components/SideColumn"
import { PostList } from "@/components/PostList"
import { Timeline } from "@/components/Timeline"
import { BuiltList } from "@/components/BuiltList"
import { Footer } from "@/components/Footer"
import { getAllPosts } from "@/lib/content"
import { formatMonthYear } from "@/lib/format"
import { plannedPosts } from "@/data/planned-posts"
import styles from "./page.module.css"

const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "writing", label: "Writing", href: "#writing" },
  { id: "timeline", label: "Timeline", href: "#timeline" },
  { id: "built", label: "Built", href: "#built" },
]

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)
  const postItems =
    posts.length > 0
      ? posts.map((post) => ({ title: post.title, slug: post.slug, dateLabel: formatMonthYear(post.date) }))
      : plannedPosts.map((title) => ({ title, soon: true }))

  return (
    <div className={styles.layout}>
      <SideColumn variant="home" navItems={navItems} />

      <main className={styles.main}>
        <section id="about" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>About</h2>
          </div>
          <div className={styles.about}>
            <p>
              I&apos;m Shams. I&apos;ve spent eight years turning messy data into something people can trust,
              first building banking software at Barclays, then at Concentric AI, where I built pipelines
              handling 500M+ events a day and became a co-inventor on a US patent.
            </p>
            <p>
              In 2025 I started KnowYourCompany.ai and built all of it: the search, the agents, the evals,
              and the pitch to 100+ money managers. It taught me more about building and selling than any
              job had.
            </p>
            <p>Outside work: Bangalore, [personal line to be written by Shams].</p>
          </div>
          <Link href="/story" className={styles.more}>
            The long version →
          </Link>
        </section>

        <section id="writing" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Writing</h2>
            <Link href="/writing" className={styles.more}>
              All posts →
            </Link>
          </div>
          <PostList items={postItems} />
        </section>

        <section id="timeline" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Timeline</h2>
          </div>
          <Timeline />
        </section>

        <section id="built" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Built</h2>
          </div>
          <BuiltList />
        </section>

        <Footer />
      </main>
    </div>
  )
}
