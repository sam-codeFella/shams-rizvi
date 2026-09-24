import { sprintTimeline } from "@/data/timeline"
import styles from "./SprintTimeline.module.css"

export function SprintTimeline() {
  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">How the sprint runs</h2>
      <p>Two weeks, working in your repo and your Slack, with overlap in US or UK hours.</p>
      <ol className={styles.steps}>
        {sprintTimeline.map((s) => (
          <li key={s.id}>
            <span className={styles.when}>{s.when}</span>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
