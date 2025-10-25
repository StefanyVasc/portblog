import { z } from 'zod'

export const GITHUB_USERNAME = 'StefanyVasc'

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  topics: z.array(z.string()).optional(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  pushed_at: z.string(),
  fork: z.boolean(),
  archived: z.boolean()
})

export const repositoryListSchema = z.array(repositorySchema)

export type GitHubRepository = z.infer<typeof repositorySchema>

export type Repository = {
  id: string
  name: string
  description: string
  tags: string[]
  repository?: string
  homepage: string | null
  stars?: number
  updatedAt?: string
}
