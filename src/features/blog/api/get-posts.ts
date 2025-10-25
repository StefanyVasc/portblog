import { getAsync } from '@/shared/api/get-async'
import { parseWithSchema } from '@/shared/utils/parse-with-schema'

import { postListSchema } from '../schemas/post'

type GetPostsArgs = {
  signal?: AbortSignal
}

export async function getPosts({ signal }: GetPostsArgs = {}) {
  const path = '/posts/posts.json'
  const baseURL =
    typeof window !== 'undefined' ? window.location.origin : undefined
  const config = { baseURL, signal } as const

  const data = await getAsync<unknown>(path, config, {
    responseType: 'json',
    accept: 'application/json, */*'
  })

  const parsed = parseWithSchema(postListSchema, data, 'Posts')

  return Array.isArray(parsed) ? parsed : parsed.posts
}
