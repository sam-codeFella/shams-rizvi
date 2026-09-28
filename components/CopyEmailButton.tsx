"use client"

import { useState } from "react"
import styles from "./CopyEmailButton.module.css"

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Clipboard API unavailable — the email is still visible on the button.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={copied ? `${styles.btn} ${styles.copied}` : styles.btn}
      onClick={handleCopy}
    >
      {copied ? "Copied" : email}
    </button>
  )
}
