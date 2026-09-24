import Link from "next/link"
import { notFound } from "next/navigation"
import { getWorkItem, getWorkItems } from "@/lib/content"
import { site } from "@/data/site"

export async function generateStaticParams() {
  const items = await getWorkItems()
  return items.map((item) => ({ slug: item.slug }))
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getWorkItem(slug)
  if (!item) {
    notFound()
    return null
  }

  return (
    <article>
      <Link href="/work">← Back to work</Link>
      <h1>{item.title}</h1>
      <p>{item.company}</p>
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
      <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
        Book a call
      </a>
    </article>
  )
}
