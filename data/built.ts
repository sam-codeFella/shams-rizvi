export interface BuiltEntry {
  title: string
  line: string
  href?: string
  logo?: string
}

export const built: BuiltEntry[] = [
  {
    title: "KnowYourCompany.ai",
    line: "The AI platform for equity research.",
    href: "https://www.knowyourcompany.ai/",
    logo: "/images/logos/kyc.png",
  },
  {
    title: "Pipelines at 500M+ events a day",
    line: "0-to-1 data processing at Concentric AI that became core infrastructure for 32 enterprise customers.",
    logo: "/images/logos/concentric.png",
  },
  {
    title: "US patent",
    line: "Scoring identity attribute confidence while certifying authorization claims (US Application No. 16/377,168).",
    href: "https://uspto.report/patent/app/20200322342",
    logo: "/images/logos/patent.svg",
  },
]
