import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Shams Rizvi · Bangalore</span>
      <a href="/rss.xml">RSS</a>
    </footer>
  )
}
