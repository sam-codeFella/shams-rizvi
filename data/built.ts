export interface BuiltEntry {
  title: string
  line: string
  href?: string
  logo?: string
}

export const built: BuiltEntry[] = [
  {
    title: "KnowYourCompany.ai",
    line: "AI research over Indian listed-company filings, with every answer cited to the exact filing, page and line.",
    href: "https://www.knowyourcompany.ai/",
    logo: "/images/logos/kyc.svg",
  },
  {
    title: "Pipelines at 500M+ events a day",
    line: "0-to-1 data processing at Concentric AI that became core infrastructure for 32 enterprise customers.",
    logo: "/images/logos/concentric.svg",
  },
  {
    title: "US patent",
    line: "Scoring identity attribute confidence while certifying authorization claims (US Application No. 16/377,168).",
  },
]
