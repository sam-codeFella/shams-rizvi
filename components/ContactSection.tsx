import { site } from "@/data/site"
import styles from "./ContactSection.module.css"

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className={styles.contact}>
        <div>
          <h2 id="contact-heading">Is this a fit?</h2>
          <ul className={styles.fit}>
            <li>You are seed to Series A and AI is core to the product.</li>
            <li>You have a working prototype, but answers are not reliable enough to sell.</li>
            <li>You work with documents, financial data, compliance or legal text.</li>
            <li>You do not yet have a senior AI lead, or you need one before you can hire.</li>
          </ul>
        </div>
        <div>
          <p>Send a line about what you are building and what is not working. I reply within a day.</p>
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
            Message me on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
