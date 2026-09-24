import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Shams Rizvi, Fractional Head of AI",
  description:
    "AI production systems, built end to end — pipelines, agents, and answers your users can check.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
