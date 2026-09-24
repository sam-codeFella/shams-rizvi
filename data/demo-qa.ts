export interface Citation {
  label: string
  excerpt: string
}

export interface QAEntry {
  id: string
  question: string
  answer: string
  citations: Citation[]
  declined: boolean
  declineReason?: string
}

export const demoQA: QAEntry[] = [
  {
    id: "auditor-change",
    question: "Did the company change its auditor this year?",
    answer:
      "Yes. The board approved a new statutory auditor at its meeting after the previous firm's term ended.",
    citations: [
      {
        label: "Reg 30 filing · p.2 · L.14",
        excerpt:
          "The Board approved the appointment of a new statutory auditor with effect from the current fiscal year, subject to shareholder ratification.",
      },
      {
        label: "Annual report · p.61 · L.8",
        excerpt:
          "The term of the previous statutory auditor concluded at the close of the prior fiscal year in accordance with the applicable rotation requirement.",
      },
    ],
    declined: false,
  },
  {
    id: "revenue-growth",
    question: "How did revenue grow last quarter?",
    answer: "Revenue grew 18% quarter-over-quarter, driven primarily by the export segment.",
    citations: [
      {
        label: "Q2 results · p.4 · L.22",
        excerpt:
          "Total revenue for the quarter stood at ₹412 crore, up 18% sequentially, led by growth in the export business segment.",
      },
    ],
    declined: false,
  },
  {
    id: "auditor-reason",
    question: "Why did the company change its auditor?",
    answer: "",
    citations: [],
    declined: true,
    declineReason: "Not in the filing. I'm not going to guess.",
  },
]
