import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/content"

const SITE_URL = "https://shams-rizvi.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/story", "/writing", "/now", "/work"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...postRoutes]
}
