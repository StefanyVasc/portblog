import { getAsyncWithFallback } from '@/shared/api/get-async-with-fallback'
import { parseWithSchema } from '@/shared/utils/parse-with-schema'

import { postListSchema } from '../schemas/post'

type GetPostsArgs = {
  localeSuffix: string
  signal?: AbortSignal
}

export async function getPosts({ localeSuffix, signal }: GetPostsArgs) {
  const normalizedSuffix =
    localeSuffix === '.pt' || localeSuffix === '' ? '' : localeSuffix
  const primaryPath = `/posts/posts${normalizedSuffix}.json`
  const fallbackPath = '/posts/posts.json'
  const baseURL =
    typeof window !== 'undefined' ? window.location.origin : undefined
  const config = { baseURL, signal }

  const data = await getAsyncWithFallback<unknown>(
    primaryPath,
    fallbackPath,
    config,
    {
      responseType: 'json',
      accept: 'application/json, */*'
    }
  )

  const parsed = parseWithSchema(
    postListSchema,
    data,
    `Posts (${localeSuffix || 'default'})`
  )

  return Array.isArray(parsed) ? parsed : parsed.posts
}
