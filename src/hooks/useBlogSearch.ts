import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { usePost } from '@/hooks/usePost'

export function useBlogSearch(postsPerPage = 2) {
  const { posts } = usePost()
  const [searchParams, setSearchParams] = useSearchParams()

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
    setSearchParams({ page: String(currentPage), type: searchType, search })
  }, [search, searchType, currentPage, setSearchParams])

  // Filtragem de posts
  const filteredPosts = posts.filter(post =>
    searchType === 'text'
      ? [post.title, post.description, ...(post.tags || [])]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      : post.tags?.some(
          tag => tag.toLowerCase() === search.toLowerCase().replace('#', '')
        )
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
    allTags: [...new Set(posts.flatMap(post => post.tags || []))].sort()
  }
}
