import { defineConfig, defineCollection, s } from "velite"

const work = defineCollection({
  name: "Work",
  pattern: "work/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      company: s.string(),
      summary: s.string(),
      proofLabel: s.string(),
      proofContext: s.string(),
      order: s.number(),
      diagramSteps: s.array(s.string()),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

const writing = defineCollection({
  name: "Writing",
  pattern: "writing/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      date: s.isodate(),
      summary: s.string(),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

export default defineConfig({
  root: "content",
  collections: { work, writing },
  output: {
    data: ".velite",
  },
})
