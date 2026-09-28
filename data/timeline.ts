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
    logo: "/images/logos/kyc.png",
    years: "2025 – now",
    role: "Founder & CEO, KnowYourCompany.ai",
    line: "Building the infrastructure for AI agents in finance: hybrid search with cited answers over 5,500+ companies, agentic monitoring and evals, 50+ demos, and 100+ conversations with fund managers and analysts across AMCs, PMSs and more.",
  },
  {
    mark: "C",
    logo: "/images/logos/concentric.png",
    years: "2020 – 2024",
    role: "Founding Engineer & Lead, Concentric AI",
    line: "Production data systems processing 500M+ events a day; 0-to-1 pipelines serving 32 enterprise customers; US patent co-inventor.",
  },
  {
    mark: "B",
    logo: "/images/logos/barclays.png",
    years: "2018 – 2020",
    role: "Software Developer, Barclays Corporate Banking",
    line: "Financial applications in a regulated bank; cross-site scripting protections across the MCA suite.",
  },
  {
    mark: "P",
    logo: "/images/logos/ibm.jpeg",
    years: "2017 – 2018",
    role: "L2 Support APAC, IBM",
    line: "Provided APAC support for IBM security systems, 2017 – 2018.",
  },
]
