import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Timeline } from "./Timeline"

describe("Timeline", () => {
  it("renders all four entries with role and years", () => {
    render(<Timeline />)
    expect(screen.getByText("Founder & CEO, KnowYourCompany.ai")).toBeInTheDocument()
    expect(screen.getByText("Founding Engineer & Lead, Concentric AI")).toBeInTheDocument()
    expect(screen.getByText("Software Developer, Barclays Corporate Banking")).toBeInTheDocument()
    expect(screen.getByText("L2 Support APAC, IBM")).toBeInTheDocument()
    expect(screen.getByText(/Provided APAC support for IBM security systems/)).toBeInTheDocument()
    expect(screen.getByText("2025 – now")).toBeInTheDocument()
  })

  it("gives each row's logo empty alt text since it's decorative", () => {
    const { container } = render(<Timeline />)
    const images = container.querySelectorAll('img[alt=""]')
    expect(images.length).toBe(4)
  })
})
