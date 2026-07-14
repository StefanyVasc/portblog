import { useQueryClient } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getPostContent } from '@/features/blog/api/get-post-content'
import type { Post } from '@/features/blog/types/post'
import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components'
import { texts } from '@/shared/content/texts'

type PostListProps = {
  posts: Post[]
  highlightNewest?: boolean
  searched?: string
}

export const PostList = ({
  posts,
  highlightNewest = false,
  searched
}: PostListProps) => {
  const queryClient = useQueryClient()
  const blogTexts = texts.blog

  function prefetchPostContent(slug: string) {
    queryClient.prefetchQuery({
      queryKey: ['blog', 'post-content', slug],
      queryFn: ({ signal }) => getPostContent({ slug, signal })
    })
  }

  return (
    <div className="min-h-[60vh] w-full py-6">
      {!searched && (
        <h4 className="mb-4 text-xl font-semibold">{blogTexts.latestPosts}</h4>
      )}

      {posts.length > 0 ? (
        <TooltipProvider delayDuration={150}>
          <ul className="space-y-4">
            {posts.map((post, index) => {
              const isNewest = highlightNewest && index === 0

              return (
                <li
                  key={post.slug}
                  className="relative flex min-h-[150px] flex-col justify-between gap-2 border-y py-4"
                >
                  {isNewest && (
                    <>
                      <span className="sr-only">New post.</span>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger
                          className="absolute right-0 top-3 z-10 inline-flex animate-badge-float items-center justify-center rounded-full text-amber-500 outline-none transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 motion-reduce:animate-none"
                          aria-label="New post"
                        >
                          <Sparkles
                            aria-hidden="true"
                            className="size-5 animate-twinkle fill-current drop-shadow-[0_0_10px_rgba(245,158,11,0.55)] motion-reduce:animate-none"
                          />
                        </TooltipTrigger>
                        <TooltipContent>New post</TooltipContent>
                      </Tooltip>
                    </>
                  )}

                  <div className={isNewest ? 'pr-8' : undefined}>
                    <div className="flex flex-wrap items-center gap-2 text-gray-800">
                      <span className="text-gray-500">{post.date} -</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        onMouseEnter={() => prefetchPostContent(post.slug)}
                        onFocus={() => prefetchPostContent(post.slug)}
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const currentState = window.history.state ?? {}
                            window.history.replaceState(
                              { ...currentState, blogScroll: window.scrollY },
                              ''
                            )
                          }
                        }}
                        className="font-semibold text-rose-600 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500">{post.description}</p>
                  </div>

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
              )
            })}
          </ul>
        </TooltipProvider>
      ) : (
        <p className="text-gray-500">{blogTexts.noPosts}</p>
      )}
    </div>
  )
}
