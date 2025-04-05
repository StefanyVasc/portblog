import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CustomBreadcrumb, Header, Pagination, SearchBar } from '@/components'
import { useBlogSearch } from '@/hooks/useBlogSearch'
import { usePost } from '@/hooks/usePost'
import { formatBreadcrumb } from '@/utils/formatBreadcrumb'

import { ErrorMessage, Loading, PostContent, PostList } from './components'

export function Blog() {
  const { slug, content, loading, error, tags } = usePost()
  const postsPerPage = 5
  const {
    search,
    setSearch,
    searchType,
    setSearchType,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPosts,
    allTags
  } = useBlogSearch(postsPerPage)
  const pathnames = formatBreadcrumb(slug)

  const { slug: routeSlug } = useParams()

  useEffect(() => {
    if (routeSlug) {
      document.title = `blog/${routeSlug}`

      // Atualiza ou cria a meta tag og:title
      let metaTag = document.querySelector('meta[property="og:title"]')

      if (metaTag) {
        metaTag.setAttribute('content', `${routeSlug}`)
      } else {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', 'og:title')
        metaTag.setAttribute('content', `blog/${routeSlug}`)
        document.head.appendChild(metaTag)
      }
    } else {
      document.title = 'Meu Blog'
    }
  }, [routeSlug])

  return (
    <div>
      <Header headerName="Blog" />
      {slug && <CustomBreadcrumb pathnames={pathnames} />}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {/* ✅ Se tem slug, só mostra o conteúdo do post */}
      {slug ? (
        <PostContent content={content} tags={tags} />
      ) : (
        <>
          <div className="mt-6">
            <SearchBar
              search={search}
              setSearch={setSearch}
              searchType={searchType}
              setSearchType={setSearchType}
              allTags={allTags}
            />
          </div>
          {search && (
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 text-right">
              Há {currentPosts.length}{' '}
              {currentPosts.length === 1 ? 'post' : 'posts'} sobre &quot;
              {search}&quot;
            </p>
          )}
          <PostList posts={currentPosts} searched={search} />

          {totalPages > 1 && (
            <footer className="w-full py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </footer>
          )}
        </>
      )}
    </div>
  )
}
