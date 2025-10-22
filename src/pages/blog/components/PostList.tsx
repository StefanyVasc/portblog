import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Badge } from '@/components'
import { Post } from '@/reducers/types/posts'

export const PostList = ({
  posts,
  searched
}: {
  posts: Post[]
  searched: string
}) => {
  const { t } = useTranslation()

  return (
    <div className="mx-auto min-h-[60vh] w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-10">
      {!searched && (
        <h4 className="mb-4 text-xl font-semibold">{t('blog.latestPosts')}</h4>
      )}

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map(post => (
            <li
              key={post.slug}
              className="flex min-h-[150px] flex-col justify-between gap-2 border-y py-4"
            >
              <div className="flex flex-wrap items-center gap-2 text-gray-800 dark:text-gray-200">
                <span className="text-gray-500">{post.date} -</span>
                <Link
                  to={`/blog/${post.slug}`}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const currentState = window.history.state ?? {}
                      window.history.replaceState(
                        { ...currentState, blogScroll: window.scrollY },
                        ''
                      )
                    }
                  }}
                  className="font-semibold text-rose-600 hover:underline dark:text-rose-400"
                >
                  {post.title}
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.description}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge
                      color="rose"
                      key={tag}
                      text={tag}
                      variant="outline"
                      size="xxs"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">{t('blog.noPosts')}</p>
      )}
    </div>
  )
}
