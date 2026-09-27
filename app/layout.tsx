import type { Metadata } from "next"
import "./globals.css"
import { site } from "@/data/site"

const description = `${site.role}. ${site.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL("https://shams-rizvi.com"),
  title: {
    default: `${site.name}`,
    template: `%s · ${site.name}`,
  },
  description,
  openGraph: {
    title: site.name,
    description,
    url: "https://shams-rizvi.com",
    siteName: site.name,
    images: [{ url: "/images/og-default.svg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
    images: ["/images/og-default.svg"],
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
