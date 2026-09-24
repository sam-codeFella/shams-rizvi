import { chromium } from "playwright"

async function main() {
  const baseUrl = process.env.PDF_BASE_URL ?? "http://localhost:3000"
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${baseUrl}/resume/print`, { waitUntil: "networkidle" })
  await page.pdf({ path: "public/resume.pdf", format: "A4", printBackground: true })
  await browser.close()
  console.log("Wrote public/resume.pdf")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
