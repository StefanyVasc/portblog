// import { axiosGetWithFallback } from '@/shared/api/axios-helpers'

import { getAsync } from '@/shared/api/get-async'
import { isNotFoundError } from '@/shared/api/helpers/is-not-found-error'

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
  const candidatePaths = [
    `/posts/${encodedSlug}${localeSuffix}.md`,
    `/posts/${encodedSlug}.pt.md`,
    `/posts/${encodedSlug}.md`
  ].filter((path, index, self) => self.indexOf(path) === index)
  const baseURL =
    typeof window !== 'undefined' ? window.location.origin : undefined

  const requestConfig = {
    baseURL,
    signal,
    headers: {
      Accept: 'text/markdown, text/plain, */*'
    }
  } as const

  const requestOptions = {
    responseType: 'text',
    accept: 'text/markdown, text/plain, */*'
  } as const

  let lastError: unknown

  for (const path of candidatePaths) {
    try {
      return await getAsync<string>(path, requestConfig, requestOptions)
    } catch (error) {
      lastError = error
      if (!isNotFoundError(error)) {
        throw error
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`Post "${slug}" not found`)
}
