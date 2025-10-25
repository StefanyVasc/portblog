import { keepPreviousData, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { getPostContent } from '@/features/blog/api/get-post-content'
import { getPosts } from '@/features/blog/api/get-posts'
import { Post } from '@/features/blog/types/post'
import { useLocaleQuery } from '@/shared/hooks/use-locale-query'

type UsePostResult = {
  slug: string | null
  posts: Post[]
  content: string | null
  tags: string[]
  loading: boolean
  error: string | null
  postsQuery: UseQueryResult<Post[], Error>
  contentQuery: UseQueryResult<string, Error>
}

export function usePost(): UsePostResult {
  const { slug } = useParams<{ slug?: string }>()

  const postsQuery = useLocaleQuery<Post[], Error>({
    key: ['blog', 'posts'],
    queryFn: ({ localeSuffix, signal }) => getPosts({ localeSuffix, signal }),
    placeholderData: keepPreviousData
  })

  const contentQuery = useLocaleQuery<string, Error>({
    key: ['blog', 'post-content', slug ?? ''],
    queryFn: ({ localeSuffix, signal }) =>
      getPostContent({ slug: slug!, localeSuffix, signal }),
    enabled: Boolean(slug),
    placeholderData: keepPreviousData
  })

  const posts = postsQuery.data ?? []
  const content = slug ? (contentQuery.data ?? null) : null

  const tags = useMemo(() => {
    if (!slug) return []

    const currentPost = posts.find(post => post.slug === slug)
    return currentPost?.tags ?? []
  }, [slug, posts])

  const loading = postsQuery.isLoading || contentQuery.isLoading
  const postsErrorMessage = postsQuery.error
    ? `Erro ao carregar posts: ${postsQuery.error.message}`
    : null
  const contentErrorMessage = contentQuery.error
    ? `Erro ao carregar post: ${contentQuery.error.message}`
    : null
  const error = postsErrorMessage ?? contentErrorMessage

  return {
    slug: slug ?? null,
    posts,
    content,
    tags,
    loading,
    error,
    postsQuery,
    contentQuery
  }
}
