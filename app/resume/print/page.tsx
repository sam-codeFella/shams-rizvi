import { resumeRoles, credentials } from "@/data/resume"
import { site } from "@/data/site"
import styles from "./page.module.css"

export default function ResumePrintPage() {
  return (
    <div className={styles.page}>
      <h1>{site.name}</h1>
      <p>
        {site.role} · {site.location}
      </p>
      {resumeRoles.map((r) => (
        <div key={r.id} className={styles.role}>
          <span className={styles.years}>{r.years}</span>
          <p>
            <strong>{r.title}</strong>
          </p>
          <p>{r.detail}</p>
        </div>
      ))}
      <ul className={styles.creds}>
        {credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
