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
            <p>Hi, I&apos;m Shams. I love building products.</p>
            <p>
              For close to a decade I&apos;ve been turning raw data into intelligence that people can act
              on, across finance, data security and business.
            </p>
            <p>
              I started at Barclays, building omnichannel banking applications across customer systems
              and payments. At Concentric AI, I helped lay the groundwork for every data pipeline,
              ingesting terabytes of data a day, and helped grow it into a platform that flagged active
              breaches and data residency issues in under 120 milliseconds.
            </p>
            <p>
              Finance has always pulled at me. So with my closest friends, I set out to build the
              research platform we wished we had for our own investing. That became
              KnowYourCompany.ai, which I&apos;m proud to lead as CEO.
            </p>
            <p>
              The biggest lesson from building it: value alone doesn&apos;t sell. It has to be easy to
              use, easy to verify and easy to understand. Everything else is decoration.
            </p>
            <p>
              These days I spend most of my time thinking about where AI will actually create value, and
              where all of this is heading.
            </p>
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
