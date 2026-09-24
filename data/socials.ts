export type SocialPlatform = "linkedin" | "github" | "twitter" | "instagram"

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/shams-rizvi/" },
  { platform: "github", label: "GitHub", href: "#" },
  { platform: "twitter", label: "Twitter", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
]
