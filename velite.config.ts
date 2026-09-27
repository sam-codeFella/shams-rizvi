import { defineConfig, defineCollection, s } from "velite"

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      title: s.string(),
      date: s.isodate(),
      summary: s.string(),
      draft: s.boolean().default(false),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

const story = defineCollection({
  name: "Chapter",
  pattern: "story/**/*.md",
  schema: s
    .object({
      slug: s.path(),
      number: s.number(),
      title: s.string(),
      year: s.number().optional(),
      draft: s.boolean().default(false),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, slug: data.slug.split("/").pop() })),
})

export default defineConfig({
  root: "content",
  collections: { posts, story },
  output: {
    data: ".velite",
  },
})
