import { timeline } from "@/data/timeline"
import styles from "./Timeline.module.css"

export function Timeline() {
  return (
    <ul className={styles.list}>
      {timeline.map((entry) => (
        <li key={entry.role} className={styles.row}>
          <img className={styles.mark} src={entry.logo} alt="" width={32} height={32} aria-hidden="true" />
          <span className={styles.years}>{entry.years}</span>
          <span>
            <p className={styles.role}>{entry.role}</p>
            <p className={styles.line}>{entry.line}</p>
          </span>
        </li>
      ))}
    </ul>
  )
}
