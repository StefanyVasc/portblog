import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Post } from '@/reducers/types/posts'

export function useBlogSearch(
  posts: Post[],
  postsPerPage = 2,
  options: { disabled?: boolean } = {}
) {
  const [searchParams, setSearchParams] = useSearchParams()
  const disabled = options.disabled ?? false

  // Recuperando valores da URL
  const searchFromUrl = searchParams.get('search') || ''
  const searchTypeFromUrl =
    (searchParams.get('type') as 'text' | 'tag') || 'text'
  const pageFromUrl = Number(searchParams.get('page')) || 1

  // Estados controlados via url
  const [search, setSearch] = useState(searchFromUrl)
  const [searchType, setSearchType] = useState<'text' | 'tag'>(
    searchTypeFromUrl
  )
  const [currentPage, setCurrentPage] = useState(pageFromUrl)

  useEffect(() => {
    if (disabled) return

    setSearchParams({ page: String(currentPage), type: searchType, search })
  }, [search, searchType, currentPage, setSearchParams, disabled])

  const normalizedSearch = search.toLowerCase()
  const filteredPosts = useMemo(
    () =>
      posts.filter(post =>
        searchType === 'text'
          ? [post.title, post.description, ...(post.tags || [])]
              .join(' ')
              .toLowerCase()
              .includes(normalizedSearch)
          : post.tags?.some(
              tag => tag.toLowerCase() === normalizedSearch.replace('#', '')
            )
      ),
    [posts, searchType, normalizedSearch]
  )

  const allTags = useMemo(
    () => [...new Set(posts.flatMap(post => post.tags || []))].sort(),
    [posts]
  )

  // Paginação
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  return {
    search,
    setSearch,
    searchType,
    setSearchType,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredPosts,
    currentPosts,
    allTags
  }
}
