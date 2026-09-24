import { site } from "@/data/site"
import { socialLinks } from "@/data/socials"
import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        {site.name} · {site.location} · Works with teams in the US, UK, EU and India
      </span>
      <ul className={styles.socials}>
        {socialLinks.map((s) => (
          <li key={s.platform}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
