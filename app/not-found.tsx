import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h1>This page declined to answer.</h1>
      <p>No evidence it exists.</p>
      <Link href="/">Back home</Link>
    </div>
  )
}
