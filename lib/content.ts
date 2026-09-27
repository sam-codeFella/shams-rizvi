import rawPosts from "../.velite/posts.json"
import rawStory from "../.velite/story.json"

export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  draft: boolean
  content: string
}

export interface Chapter {
  slug: string
  number: number
  title: string
  year?: number
  draft: boolean
  content: string
}

export function publishedPosts(posts: Post[]): Post[] {
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function findPost(posts: Post[], slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug && !post.draft)
}

export function publishedChapters(chapters: Chapter[]): Chapter[] {
  return chapters.filter((chapter) => !chapter.draft).sort((a, b) => a.number - b.number)
}

export function hasDraftChapters(chapters: Chapter[]): boolean {
  return chapters.some((chapter) => chapter.draft)
}

export function getAllPosts(): Post[] {
  return publishedPosts(rawPosts as Post[])
}

export function getPost(slug: string): Post | undefined {
  return findPost(rawPosts as Post[], slug)
}

export function getChapters(): Chapter[] {
  return publishedChapters(rawStory as Chapter[])
}

export function siteHasDraftChapters(): boolean {
  return hasDraftChapters(rawStory as Chapter[])
}
