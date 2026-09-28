import { timeline } from "@/data/timeline"
import styles from "./Timeline.module.css"

export function Timeline() {
  return (
    <ul className={styles.list}>
      {timeline.map((entry) => (
        <li key={entry.role} className={styles.row}>
          <img className={styles.mark} src={entry.logo} alt="" width={40} height={40} aria-hidden="true" />
          <span className={styles.years}>{entry.years}</span>
          <span className={styles.details}>
            <p className={styles.role}>{entry.role}</p>
            <p className={styles.line}>{entry.line}</p>
          </span>
        </li>
      ))}
    </ul>
  )
}
