"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { site } from "@/data/site"
import { Owl } from "./Owl"
import { CopyEmailButton } from "./CopyEmailButton"
import styles from "./SideColumn.module.css"

export interface NavItem {
  id: string
  label: string
  href: string
}

interface SideColumnProps {
  variant: "home" | "story"
  navItems: NavItem[]
}

export function SideColumn({ variant, navItems }: SideColumnProps) {
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "")

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navItems])

  return (
    <>
      <input type="checkbox" id="mobile-nav-toggle" className={styles.toggleInput} />

      <aside className={styles.column}>
        <div className={styles.mobileBar}>
          <Image
            className={styles.mobilePhoto}
            src="/images/shams.jpg"
            alt="Shams Rizvi"
            width={36}
            height={36}
          />
          <span className={styles.mobileName}>{site.name}</span>
          <label htmlFor="mobile-nav-toggle" className={styles.menuButton}>
            Menu
          </label>
        </div>

        <div className={styles.inner}>
          {variant === "home" ? (
            <>
              <Image
                className={styles.photo}
                src="/images/shams.jpg"
                alt="Shams Rizvi"
                width={96}
                height={96}
                priority
              />
              <p className={styles.name}>
                {site.name} <Owl />
              </p>
              <p className={styles.role}>{site.role}</p>
              <p className={styles.tagline}>{site.tagline}</p>
            </>
          ) : (
            <>
              <Link href="/" className={styles.backLink}>
                ← {site.name}
              </Link>
              <Image className={styles.photo} src="/images/shams.jpg" alt="Shams Rizvi" width={96} height={96} />
            </>
          )}

          <nav aria-label={variant === "home" ? "Sections" : "Chapters"} className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.navItem}
                data-active={item.id === activeId || undefined}
              >
                <span className={styles.tick} aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </nav>

          <a className={styles.nowLine} href="/work">
            {site.nowLine} →
          </a>

          {/* X and GitHub are placeholders — add them here once the URLs exist. */}
          <div className={styles.socials}>
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
      </aside>
    </>
  )
}
