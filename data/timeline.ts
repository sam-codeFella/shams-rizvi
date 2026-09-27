export interface TimelineEntry {
  mark: string
  logo: string
  years: string
  role: string
  line: string
}

export const timeline: TimelineEntry[] = [
  {
    mark: "K",
    logo: "/images/logos/kyc.svg",
    years: "2025 – now",
    role: "Founder & CEO, KnowYourCompany.ai",
    line: "Built an AI research platform on Indian listed-company filings end to end: hybrid search over 5,500+ companies, cited answers, agentic monitoring, evals. 50+ demos, 100+ conversations with money managers.",
  },
  {
    mark: "C",
    logo: "/images/logos/concentric.svg",
    years: "2020 – 2024",
    role: "Software Engineer, Concentric AI",
    line: "Production data systems processing 500M+ events a day; 0-to-1 pipelines serving 32 enterprise customers; US patent co-inventor.",
  },
  {
    mark: "B",
    logo: "/images/logos/barclays.svg",
    years: "2018 – 2020",
    role: "Software Developer, Barclays Corporate Banking",
    line: "Financial applications in a regulated bank; cross-site scripting protections across the MCA suite.",
  },
  {
    mark: "P",
    logo: "/images/logos/pict.svg",
    years: "2014 – 2018",
    role: "B.E. Computer Science, PICT",
    line: "Plus an internship at IBM, 2017 – 2018.",
  },
]
