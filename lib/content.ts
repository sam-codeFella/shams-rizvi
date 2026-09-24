import rawWork from "../.velite/work.json"
import rawWriting from "../.velite/writing.json"

export interface WorkItem {
  slug: string
  title: string
  company: string
  summary: string
  proofLabel: string
  proofContext: string
  order: number
  diagramSteps: string[]
  content: string
}

export function sortWorkItems(items: WorkItem[]): WorkItem[] {
  return [...items].sort((a, b) => a.order - b.order)
}

export function findWorkItem(items: WorkItem[], slug: string): WorkItem | undefined {
  return items.find((i) => i.slug === slug)
}

export async function getWorkItems(): Promise<WorkItem[]> {
  return sortWorkItems(rawWork as WorkItem[])
}

export async function getWorkItem(slug: string): Promise<WorkItem | undefined> {
  return findWorkItem(await getWorkItems(), slug)
}

export interface WritingItem {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

export function sortWritingItems(items: WritingItem[]): WritingItem[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function findWritingItem(items: WritingItem[], slug: string): WritingItem | undefined {
  return items.find((i) => i.slug === slug)
}

export async function getWritingItems(): Promise<WritingItem[]> {
  return sortWritingItems(rawWriting as WritingItem[])
}

export async function getWritingItem(slug: string): Promise<WritingItem | undefined> {
  return findWritingItem(await getWritingItems(), slug)
}
