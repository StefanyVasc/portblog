import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { getPostContent } from '@/features/blog/api/get-post-content'
import { getPosts } from '@/features/blog/api/get-posts'
import { Post } from '@/features/blog/types/post'

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

  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['blog', 'posts'],
    queryFn: ({ signal }) => getPosts({ signal })
  })

  const contentQuery = useQuery<string, Error>({
    queryKey: ['blog', 'post-content', slug ?? ''],
    queryFn: ({ signal }) => getPostContent({ slug: slug!, signal }),
    enabled: Boolean(slug)
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
