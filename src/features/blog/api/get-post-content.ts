import { fetchTextWithFallback } from '@/shared/api/get-text-with-fallback'

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

  return fetchTextWithFallback(primaryPath, fallbackPath, { signal })
}
