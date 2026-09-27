import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getAllPosts, getPost } from "@/lib/content"
import { formatFullDate, readingTime } from "@/lib/format"
import styles from "./page.module.css"

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.title, description: post.summary }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) {
    notFound()
    return null
  }

  return (
    <div className={styles.wrap}>
      <Link href="/" className={styles.back}>
        ← Shams Rizvi
      </Link>
      <h1>{post.title}</h1>
      <p className={styles.meta}>
        {formatFullDate(post.date)} · {readingTime(post.content)} min read
      </p>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.content }} />
      <p className={styles.signoff}>
        Thanks for reading.{" "}
        <Link href="/writing">More writing →</Link>
      </p>
    </div>
  )
}
