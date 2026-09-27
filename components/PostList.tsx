import Link from "next/link"
import styles from "./PostList.module.css"

export interface PostRow {
  title: string
  slug?: string
  dateLabel?: string
  soon?: boolean
}

export function PostList({ items }: { items: PostRow[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.slug ?? item.title} className={styles.row}>
          {item.slug ? (
            <Link className={styles.title} href={`/writing/${item.slug}`}>
              {item.title}
            </Link>
          ) : (
            <span className={styles.title}>{item.title}</span>
          )}
          {item.soon ? (
            <span className={styles.soon}>soon</span>
          ) : (
            <span className={styles.date}>{item.dateLabel}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
