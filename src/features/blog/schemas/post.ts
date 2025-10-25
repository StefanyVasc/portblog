import { z } from 'zod'

import type { Post } from '@/features/blog/types/post'

export const postSchema: z.ZodType<Post> = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  dateIso: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string())
})

const postArraySchema = z.array(postSchema)

export const postListSchema = z.union([
  postArraySchema,
  z.object({ posts: postArraySchema })
])
