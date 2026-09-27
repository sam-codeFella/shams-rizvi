import styles from "./Owl.module.css"

export function Owl() {
  return (
    <svg
      className={styles.owl}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9c-1.5 0-2.5 1.5-2 3l1 3.5C5.5 18 7 19 9 19h6c2 0 3.5-1 4-3.5l1-3.5c.5-1.5-.5-3-2-3" />
      <path d="M8 5.5 6 3M16 5.5l2-2.5" />
      <circle className={styles.eyeL} cx="9" cy="11.5" r="1.6" fill="currentColor" stroke="none" />
      <circle className={styles.eyeR} cx="15" cy="11.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M11 14.5h2" />
    </svg>
  )
}
