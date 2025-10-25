import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_GITHUB_API_URL: z.string().url(),
  VITE_GITHUB_GRAPHQL_URL: z.string().url(),
  VITE_GITHUB_TOKEN: z.string().optional(),
  VITE_UTTERANCES_REPO: z.string(),
  VITE_UTTERANCES_LABEL: z.string().default('blog-comments'),
  VITE_UTTERANCES_THEME: z.string().default('github-light')
})

export const env = envSchema.parse(import.meta.env)
