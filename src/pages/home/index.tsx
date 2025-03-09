import { Link } from 'react-router-dom'

import { Badge, Header } from '@/components'
import { usePost } from '@/hooks/usePost'
import { learningNow, technologiesILike } from '@/static'

import { Card } from './components/Card'

export function Home() {
  const { posts } = usePost()

  // Pega os 3 posts mais recentes (garantindo que o hook já os ordene)
  const latestPosts = posts.slice(-3).reverse()

  return (
    <div>
      <Header headerName="Home" />

      {/* Seção de artigos */}
      <section className="py-5">
        <h4 className="text-lg md:text-xl font-medium mb-3">Latest Articles</h4>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map(post => (
              <Card key={post.slug} className="p-4 max-w-sm">
                <div>
                  <h5 className="text-sm md:text-base font-semibold">
                    {post.title}
                  </h5>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {post.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs md:text-sm text-gray-400">
                    {post.date}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-rose-600 dark:text-rose-400 hover:underline text-xs md:text-sm"
                  >
                    ver mais →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhum artigo encontrado.</p>
        )}
      </section>

      {/* Seção "What I'm doing right now" */}
      <section className="py-5">
        <h4 className="text-lg font-medium mb-4">
          What I&apos;m doing right now:
        </h4>
        <Card>
          <h5>...Working with:</h5>
          <ul className="flex gap-2 flex-wrap my-4">
            {technologiesILike.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <Badge text={tech} color="gray" variant="outline" />
              </li>
            ))}
          </ul>

          <h5 className="mt-4">...Learning about:</h5>
          <ul className="flex gap-2 flex-wrap my-4">
            {learningNow.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <Badge text={tech} color="gray" variant="outline" />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}
