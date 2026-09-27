const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function formatMonthYear(isoDate: string): string {
  const d = new Date(isoDate)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function formatFullDate(isoDate: string): string {
  const d = new Date(isoDate)
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export function yearOf(isoDate: string): number {
  return new Date(isoDate).getUTCFullYear()
}

export function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function groupByYear<T extends { date: string }>(items: T[]): [number, T[]][] {
  const groups = new Map<number, T[]>()
  for (const item of items) {
    const year = yearOf(item.date)
    const list = groups.get(year) ?? []
    list.push(item)
    groups.set(year, list)
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0])
}
