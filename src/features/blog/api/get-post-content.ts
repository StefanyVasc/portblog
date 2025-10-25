// import { axiosGetWithFallback } from '@/shared/api/axios-helpers'

import { getAsyncWithFallback } from '@/shared/api/get-async-with-fallback'

type GetPostContentArgs = {
  slug: string
  localeSuffix: string
  signal?: AbortSignal
}

export async function getPostContent({
  slug,
  localeSuffix,
  signal
}: GetPostContentArgs) {
  const encodedSlug = encodeURIComponent(slug)
  const primaryPath = `/posts/${encodedSlug}${localeSuffix}.md`
  const fallbackPath = `/posts/${encodedSlug}.md`
  const baseURL =
    typeof window !== 'undefined' ? window.location.origin : undefined

  return getAsyncWithFallback<string>(
    primaryPath,
    fallbackPath,
    {
      baseURL,
      signal,
      headers: {
        Accept: 'text/markdown, text/plain, */*'
      }
    },
    {
      responseType: 'text',
      accept: 'text/markdown, text/plain, */*'
    }
  )
}
