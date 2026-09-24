export interface TimelineStep {
  id: string
  when: string
  title: string
  description: string
}

export const sprintTimeline: TimelineStep[] = [
  {
    id: "map",
    when: "Days 1–2",
    title: "Map the system",
    description: "Walk through the architecture, data sources and the failures users complain about.",
  },
  {
    id: "evals",
    when: "Days 3–5",
    title: "Build the evals",
    description: "A test set from real queries, scored for accuracy, grounding and when it should decline.",
  },
  {
    id: "breaks",
    when: "Days 6–8",
    title: "Find what breaks",
    description: "Run it, sort the failures by cause, estimate the cost of each fix.",
  },
  {
    id: "handover",
    when: "Days 9–10",
    title: "Fix and hand over",
    description: "Ship the highest-impact fixes and hand over the harness and the plan.",
  },
]
