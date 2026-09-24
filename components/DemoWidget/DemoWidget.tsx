"use client"

import { useState } from "react"
import { AskTab } from "./AskTab"
import { TraceTab } from "./TraceTab"
import { DeclineTab } from "./DeclineTab"
import styles from "./DemoWidget.module.css"

export type TabId = "ask" | "trace" | "decline"

const tabs: { id: TabId; label: string }[] = [
  { id: "ask", label: "Ask it anything" },
  { id: "trace", label: "Trace the citation" },
  { id: "decline", label: "Watch it decline" },
]

export function DemoWidget() {
  const [active, setActive] = useState<TabId>("ask")

  return (
    <div className={styles.widget}>
      <div role="tablist" aria-label="Live demo" className={styles.tablist}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={styles.tab}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className={styles.panel}>
        <div key={active} className={styles.panelContent}>
          {active === "ask" && <AskTab />}
          {active === "trace" && <TraceTab />}
          {active === "decline" && <DeclineTab />}
        </div>
      </div>
    </div>
  )
}
