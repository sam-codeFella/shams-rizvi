import { site } from "@/data/site"
import { DemoWidget } from "@/components/DemoWidget/DemoWidget"
import styles from "./Hero.module.css"

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{site.role}</p>
        <h1 className={styles.headline}>
          I build production AI <mark className={styles.highlight}>systems</mark> your users can
          check.
        </h1>
        <p className={styles.lede}>
          I built KnowYourCompany.ai&apos;s AI stack end to end — a hybrid search pipeline over
          5,500+ listed companies, a fleet of custom agents running in production, and an eval
          harness that catches what breaks before users do. Every answer traces to the exact
          filing and line.
        </p>
        <div className={styles.ctas}>
          <a className={styles.primary} href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            Book a call on LinkedIn
          </a>
          <a className={styles.ghost} href="#demo">
            See the demo ↓
          </a>
        </div>
      </div>
      <div id="demo" className={styles.demo}>
        <DemoWidget />
      </div>
    </section>
  )
}
