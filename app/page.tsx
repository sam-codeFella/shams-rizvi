import { Hero } from "@/components/Hero"
import { Offers } from "@/components/Offers"
import { SprintTimeline } from "@/components/SprintTimeline"
import { WorkPreviewStrip } from "@/components/WorkPreviewStrip"
import { BackgroundTeaser } from "@/components/BackgroundTeaser"
import { ContactSection } from "@/components/ContactSection"
import { Reveal } from "@/components/Reveal"

export default async function HomePage() {
  const workSection = await WorkPreviewStrip()

  return (
    <div data-testid="home">
      <Hero />
      <Reveal>
        <Offers />
      </Reveal>
      <Reveal>
        <SprintTimeline />
      </Reveal>
      <Reveal>{workSection}</Reveal>
      <Reveal>
        <BackgroundTeaser />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </div>
  )
}
