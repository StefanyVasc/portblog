import { HttpError } from '@/services/http/http'
import { getJsonWithSchema } from '@/shared/api/get-json-with-schema'

import { postListSchema } from '../schemas/post'

type GetPostsArgs = {
  localeSuffix: string
  signal?: AbortSignal
}

export async function getPosts({ localeSuffix, signal }: GetPostsArgs) {
  const primaryPath = `/posts/posts${localeSuffix}.json`
  const fallbackPath = '/posts/posts.json'

  try {
    return await getJsonWithSchema(
      postListSchema,
      primaryPath,
      { signal },
      `Posts (${localeSuffix || 'default'})`
    )
  } catch (error) {
    if (
      error instanceof HttpError &&
      error.status === 404 &&
      primaryPath !== fallbackPath
    ) {
      return getJsonWithSchema(
        postListSchema,
        fallbackPath,
        { signal },
        'Posts (fallback)'
      )
    }

    throw error
  }
}
