import { Hero } from "@/components/Hero"
import { Offers } from "@/components/Offers"
import { SprintTimeline } from "@/components/SprintTimeline"
import { WorkPreviewStrip } from "@/components/WorkPreviewStrip"
import { BackgroundTeaser } from "@/components/BackgroundTeaser"
import { ContactSection } from "@/components/ContactSection"

export default async function HomePage() {
  const workSection = await WorkPreviewStrip()

  return (
    <div data-testid="home">
      <Hero />
      <Offers />
      <SprintTimeline />
      {workSection}
      <BackgroundTeaser />
      <ContactSection />
    </div>
  )
}
