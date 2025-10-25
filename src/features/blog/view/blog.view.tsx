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
import { SITE_AUTHOR, SITE_META, SITE_URL } from '@/shared/config/site'
import { blogSearchResults, texts } from '@/shared/content/texts'
import { formatBreadcrumb } from '@/shared/utils/format-breadcrumb'
import { updateSeo } from '@/shared/utils/update-seo'

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
  const blogMeta = SITE_META.blog

  const currentPost = routeSlug
    ? (posts.find(post => post.slug === routeSlug) ?? null)
    : null
  // const currentPostTitle = currentPost?.title ?? null

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
    if (routeSlug && currentPost) {
      const description = currentPost.description || blogMeta.description

      updateSeo({
        title: currentPost.title,
        description,
        canonicalPath: `/blog/${routeSlug}`,
        type: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: currentPost.title,
          description,
          datePublished: currentPost.dateIso ?? currentPost.date,
          dateModified: currentPost.dateIso ?? currentPost.date,
          url: new URL(`/blog/${currentPost.slug}`, SITE_URL).toString(),
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR.name,
            url: SITE_AUTHOR.url
          },
          keywords: currentPost.tags.join(', ')
        }
      })
      return
    }

    updateSeo({
      title: blogMeta.title,
      description: blogMeta.description,
      canonicalPath: '/blog',
      type: 'website'
    })

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
  }, [routeSlug, currentPost, blogMeta.description, blogMeta.title])

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
