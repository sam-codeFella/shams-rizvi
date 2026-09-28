"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { site } from "@/data/site"
import { Owl } from "./Owl"
import { CopyEmailButton } from "./CopyEmailButton"
import { LinkedInIcon, XIcon, InstagramIcon, GitHubIcon } from "./SocialIcons"
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
            src="/images/shams-bw.jpg"
            alt="Shams Rizvi"
            width={36}
            height={36}
          />
          <span className={styles.mobileName}>{site.name}</span>
          <label htmlFor="mobile-nav-toggle" className={styles.menuButton}>
            Menu
            <svg
              className={styles.menuChevron}
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </label>
        </div>

        <div className={styles.inner}>
          {variant === "home" ? (
            <>
              <div className={styles.coverFrame}>
                <Image
                  className={styles.cover}
                  src="/images/shams-bw.jpg"
                  alt="Shams Rizvi"
                  width={720}
                  height={1280}
                  priority
                  sizes="(max-width: 1023px) 100vw, 320px"
                />
              </div>
              <p className={styles.name}>
                {site.name} <Owl />
              </p>
              <p className={styles.role}>{site.role}</p>
            </>
          ) : (
            <>
              <Link href="/" className={styles.backLink}>
                ← {site.name}
              </Link>
              <div className={styles.coverFrame}>
                <Image
                  className={styles.cover}
                  src="/images/quote-snow.png"
                  alt="Shams Rizvi standing in falling snow, with the quote: Let everything happen to you. Beauty and terror. Just keep going. No feeling is final."
                  width={720}
                  height={1280}
                  sizes="(max-width: 1023px) 100vw, 320px"
                />
              </div>
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

          <div className={styles.socials}>
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={site.xUrl} target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
              <XIcon />
            </a>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <InstagramIcon />
            </a>
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
              <GitHubIcon />
            </a>
            <CopyEmailButton email={site.email} />
          </div>
        </div>
      </aside>
    </>
  )
}
