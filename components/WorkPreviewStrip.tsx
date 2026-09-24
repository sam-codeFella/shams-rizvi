import Link from "next/link"
import { getWorkItems } from "@/lib/content"
import { WorkCard } from "./WorkCard"
import styles from "./WorkPreviewStrip.module.css"

export async function WorkPreviewStrip() {
  const items = (await getWorkItems()).slice(0, 3)

  return (
    <section aria-labelledby="work-heading">
      <div className={styles.headerRow}>
        <h2 id="work-heading">Things I&apos;ve built</h2>
        <Link href="/work">See all work →</Link>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  )
}
