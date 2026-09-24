import type { Metadata } from "next"
import { getWorkItems } from "@/lib/content"
import { WorkCard } from "@/components/WorkCard"
import styles from "@/components/WorkPreviewStrip.module.css"

export const metadata: Metadata = { title: "Work · Shams Rizvi" }

export default async function WorkIndexPage() {
  const items = await getWorkItems()

  return (
    <div>
      <h1>Work</h1>
      <p>All in production, all from zero.</p>
      <div className={styles.grid}>
        {items.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </div>
  )
}
