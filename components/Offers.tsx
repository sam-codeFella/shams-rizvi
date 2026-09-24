import { offers } from "@/data/offers"
import styles from "./Offers.module.css"

export function Offers() {
  return (
    <section aria-labelledby="offers-heading">
      <h2 id="offers-heading">Two ways to work together</h2>
      <p>Most founders start with the sprint. If it goes well, it turns into a retainer.</p>
      <div className={styles.grid}>
        {offers.map((o) => (
          <article key={o.id} className={styles.card}>
            <h3>{o.title}</h3>
            <p className={styles.meta}>{o.meta}</p>
            <ul>
              {o.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className={styles.price}>
              <strong>{o.priceHeadline}</strong> <span>{o.priceSub}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
