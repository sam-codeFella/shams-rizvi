import { notFound } from "next/navigation"
import { getWritingItem, getWritingItems } from "@/lib/content"

export async function generateStaticParams() {
  const items = await getWritingItems()
  return items.map((item) => ({ slug: item.slug }))
}

export default async function WritingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await getWritingItem(slug)
  if (!item) {
    notFound()
    return null
  }

  return (
    <article>
      <h1>{item.title}</h1>
      <p>{item.date}</p>
      <div dangerouslySetInnerHTML={{ __html: item.content }} />
    </article>
  )
}
