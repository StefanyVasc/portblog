import { Link } from 'react-router-dom'

import { Badge } from '@/components'
import { Post } from '@/reducers/types/posts'

export const PostList = ({
  posts,
  searched
}: {
  posts: Post[]
  searched: string
}) => (
  <div className="flex-grow py-6 max-w-3xl mx-auto min-h-[60vh]">
    {!searched && <h4 className="text-xl font-semibold mb-4">Últimos posts</h4>}

    {posts.length > 0 ? (
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className=" border-y py-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <span className="text-gray-500">{post.date} -</span>
              <Link
                to={`/blog/${post.slug}`}
                className="text-rose-600 dark:text-rose-400 hover:underline font-semibold"
              >
                {post.title}
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {post.description}
            </p>

            {/*  Exibir tags, se existirem */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
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
      <p className="text-gray-500">Nenhum post encontrado.</p>
    )}
  </div>
)
