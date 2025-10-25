import { lazy, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useBlogSearch } from '@/features/blog/hooks/use-blog-search'
import { usePost } from '@/features/blog/hooks/use-post'
import {
  CustomBreadcrumb,
  Header,
  Pagination,
  SearchBar
} from '@/shared/components'
import { blogSearchResults, texts } from '@/shared/content/texts'
import { formatBreadcrumb } from '@/shared/utils/format-breadcrumb'
import { updateDocumentTitle } from '@/shared/utils/update-document-title'

import { ErrorMessage } from './components/error-message.component'
import { Loading } from './components/loading.component'
import { PostList } from './components/post-list.component'

const PostContent = lazy(async () => {
  const module = await import('./components/post-content.component')
  return { default: module.PostContent }
})

export function BlogView() {
  const { slug, content, tags, posts, postsQuery, contentQuery } = usePost()
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
    filteredPosts,
    allTags
  } = useBlogSearch(posts, postsPerPage, { disabled: Boolean(slug) })
  const pathnames = formatBreadcrumb(slug)

  const { slug: routeSlug } = useParams()
  const blogTexts = texts.blog

  const currentPostTitle = routeSlug
    ? posts.find(post => post.slug === routeSlug)?.title
    : null

  const showLoading = slug
    ? contentQuery.isLoading && !content
    : postsQuery.isLoading && posts.length === 0

  const postsErrorMessage = postsQuery.error
    ? `Erro ao carregar posts: ${postsQuery.error.message}`
    : null
  const contentErrorMessage = contentQuery.error
    ? `Erro ao carregar post: ${contentQuery.error.message}`
    : null

  const errorMessage = slug
    ? (contentErrorMessage ?? postsErrorMessage)
    : (postsErrorMessage ?? contentErrorMessage)
  const showError = Boolean(errorMessage)

  useEffect(() => {
    const titleToUse = routeSlug
      ? (currentPostTitle ?? `blog/${routeSlug}`)
      : blogTexts.header

    updateDocumentTitle(titleToUse)

    if (!routeSlug) {
      const savedScroll =
        typeof window !== 'undefined' &&
        window.history.state &&
        typeof window.history.state.blogScroll === 'number'
          ? window.history.state.blogScroll
          : 0

      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: 'auto' })
      })
    }
  }, [routeSlug, currentPostTitle, blogTexts.header])

  return (
    <div>
      <Header headerName={blogTexts.header} />
      {slug && <CustomBreadcrumb pathnames={pathnames} />}

      {showLoading && <Loading />}
      {showError && errorMessage && <ErrorMessage message={errorMessage} />}

      {/* ✅ Se tem slug, só mostra o conteúdo do post */}
      {slug ? (
        <PostContent content={content} tags={tags} />
      ) : (
        <>
          <div className="mx-auto mt-6 w-full max-w-5xl">
            <SearchBar
              search={search}
              setSearch={setSearch}
              searchType={searchType}
              setSearchType={setSearchType}
              allTags={allTags}
            />
          </div>

          {search && (
            <p className="mt-2 text-right text-sm text-gray-700 dark:text-gray-300">
              {blogSearchResults(currentPosts.length, search)}
            </p>
          )}

          <PostList posts={currentPosts} searched={search} />

          {totalPages > 1 && (
            <footer className="w-full py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredPosts.length}
                pageSize={postsPerPage}
                onPageChange={setCurrentPage}
              />
            </footer>
          )}
        </>
      )}
    </div>
  )
}
