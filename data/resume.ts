export interface ResumeRole {
  id: string
  years: string
  title: string
  org: string
  detail: string
}

export const resumeRoles: ResumeRole[] = [
  {
    id: "kyc",
    years: "2025 – now",
    title: "Founder & CEO, KnowYourCompany.ai",
    org: "KnowYourCompany.ai",
    detail: "AI equity research on Indian listed companies. 50+ demos, 100+ conversations with money managers.",
  },
  {
    id: "concentric",
    years: "2020 – 2024",
    title: "Software Engineer, Concentric AI",
    org: "Concentric AI",
    detail: "Data security posture management. Co-inventor on a US patent.",
  },
  {
    id: "barclays",
    years: "2018 – 2020",
    title: "Software Developer, Barclays",
    org: "Barclays",
    detail: "Corporate banking applications in a regulated environment.",
  },
  {
    id: "ibm",
    years: "2017 – 2018",
    title: "Intern, IBM",
    org: "IBM",
    detail: "Enterprise software and data infrastructure.",
  },
]

export const credentials: string[] = [
  "US patent co-inventor",
  "B.E. Computer Science, PICT",
  "DPIIT-recognised startup",
  "NVIDIA Inception member",
]
