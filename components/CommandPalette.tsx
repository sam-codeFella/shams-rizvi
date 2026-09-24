"use client"

import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command palette">
      <Command.Input placeholder="Jump to..." />
      <Command.List>
        <Command.Empty>No results.</Command.Empty>
        {navItems.map((item) => (
          <Command.Item key={item.href} onSelect={() => go(item.href)}>
            {item.label}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  )
}
