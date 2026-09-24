export interface Offer {
  id: string
  title: string
  meta: string
  bullets: string[]
  priceHeadline: string
  priceSub: string
}

export const offers: Offer[] = [
  {
    id: "sprint",
    title: "AI Production Readiness Sprint",
    meta: "2 weeks · fixed scope · fixed fee",
    bullets: [
      "Review of your retrieval, prompts, agents and data pipeline",
      "An eval harness on your own data, so you can measure every change",
      "Failure analysis: where it hallucinates, misses, or should decline",
      "A ranked fix list with effort estimates, plus the top fixes shipped",
    ],
    priceHeadline: "From $12,000",
    priceSub: "· 50% to start",
  },
  {
    id: "retainer",
    title: "Fractional Head of AI",
    meta: "5 to 15 hours a week · monthly retainer",
    bullets: [
      "Own the AI roadmap and architecture calls",
      "Hands-on builds on retrieval, agents and evals",
      "Hire and guide your first AI engineers",
      "Walk investors and customers through the AI story",
    ],
    priceHeadline: "From $6,000",
    priceSub: "/ month",
  },
]
