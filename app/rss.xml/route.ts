import { getAllPosts } from "@/lib/content"
import { site } from "@/data/site"

export const dynamic = "force-static"

const SITE_URL = "https://shams-rizvi.com"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/writing/${post.slug}</link>
      <guid>${SITE_URL}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(site.tagline)}</description>
    <language>en</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
