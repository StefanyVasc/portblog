import { getAsync } from '@/shared/api/get-async'

type GetPostContentArgs = {
  slug: string
  signal?: AbortSignal
}

export async function getPostContent({ slug, signal }: GetPostContentArgs) {
  const encodedSlug = encodeURIComponent(slug)
  const path = `/posts/${encodedSlug}.md`
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

  const raw = await getAsync<string>(path, requestConfig, requestOptions)
  return stripFrontmatter(raw)
}

function stripFrontmatter(content: string) {
  if (!content.startsWith('---')) {
    return content
  }

  const closingIndex = content.indexOf('\n---', 3)

  if (closingIndex === -1) {
    return content
  }

  return content.slice(closingIndex + 4).trimStart()
}
