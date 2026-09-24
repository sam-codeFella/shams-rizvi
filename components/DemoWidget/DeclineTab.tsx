import { demoQA } from "@/data/demo-qa"
import styles from "./DemoWidget.module.css"

export function DeclineTab() {
  const entry = demoQA.find((q) => q.declined)!

  return (
    <div>
      <p className={styles.question}>{"> " + entry.question}</p>
      <div className={styles.decline} role="alert">
        <strong>Declined</strong>
        <p>{entry.declineReason}</p>
      </div>
    </div>
  )
}
