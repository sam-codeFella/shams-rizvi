import { built } from "@/data/built"
import styles from "./BuiltList.module.css"

export function BuiltList() {
  return (
    <ul className={styles.list}>
      {built.map((item) => (
        <li key={item.title} className={styles.row}>
          {item.logo ? (
            <img className={styles.thumb} src={item.logo} alt="" width={64} height={64} aria-hidden="true" />
          ) : (
            // Placeholder thumbnail — swap for a real 64x64 image at any time.
            <span className={styles.thumb} aria-hidden="true">
              —
            </span>
          )}
          <span>
            {item.href ? (
              <a className={styles.title} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            ) : (
              <span className={styles.title}>{item.title}</span>
            )}
            <p className={styles.line}>{item.line}</p>
          </span>
        </li>
      ))}
    </ul>
  )
}
