import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CustomBreadcrumb, Header, Pagination, SearchBar } from '@/components'
import { useBlogSearch } from '@/hooks/useBlogSearch'
import { usePost } from '@/hooks/usePost'
import { formatBreadcrumb } from '@/utils/formatBreadcrumb'
import { useTranslation } from 'react-i18next'

import { ErrorMessage, Loading, PostContent, PostList } from './components'

export function Blog() {
  const { slug, content, loading, error, tags, posts } = usePost()
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
  } = useBlogSearch(posts, postsPerPage, { disabled: Boolean(slug) })
  const pathnames = formatBreadcrumb(slug)

  const { slug: routeSlug } = useParams()
  const { t, i18n } = useTranslation()

  const currentPostTitle = routeSlug
    ? posts.find(post => post.slug === routeSlug)?.title
    : null

  useEffect(() => {
    const titleToUse = routeSlug
      ? currentPostTitle ?? `blog/${routeSlug}`
      : t('blog.header')

    document.title = titleToUse

    let metaTag = document.querySelector('meta[property="og:title"]')

    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute('property', 'og:title')
      document.head.appendChild(metaTag)
    }

    metaTag.setAttribute('content', titleToUse)

    if (!routeSlug) {
      const savedScroll =
        (typeof window !== 'undefined' &&
          window.history.state &&
          typeof window.history.state.blogScroll === 'number'
          ? window.history.state.blogScroll
          : 0)

      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: 'auto' })
      })
    }
  }, [routeSlug, currentPostTitle, t, i18n.language])

  return (
    <div>
      <Header headerName={t('blog.header')} />
      {slug && <CustomBreadcrumb pathnames={pathnames} />}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {/* ✅ Se tem slug, só mostra o conteúdo do post */}
      {slug ? (
        <PostContent content={content} tags={tags} />
      ) : (
        <>
          <div className="mt-6 w-full max-w-5xl mx-auto">
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
              {t('blog.searchResults', {
                count: currentPosts.length,
                query: search
              })}
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
