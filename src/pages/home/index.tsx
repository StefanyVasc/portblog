import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Badge, Header } from '@/components'
import { usePost } from '@/hooks/usePost'
import { learningNow, technologiesILike } from '@/static'

import { Card } from './components/Card'
import { ReadingSection } from './components/ReadingSection'

export function Home() {
  const { posts } = usePost()
  const { t } = useTranslation()

  // Get the 3 most recent posts (assuming the hook already sorts them)
  const latestPosts = posts.slice(-3).reverse()

  return (
    <div>
      <Header /* headerName={t('home.header')} */ />

      {/* Articles section */}
      <section className="py-5">
        <h4 className="text-lg md:text-xl font-medium mb-3">
          {t('home.latestArticles')}
        </h4>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map(post => (
              <Card key={post.slug} className="p-4 h-[190px] flex flex-col">
                <div className="flex-1">
                  <h5 className="text-sm md:text-base font-semibold">
                    {post.title}
                  </h5>
                  <p
                    className="text-xs md:text-sm text-gray-500 mt-1 overflow-hidden max-h-[60px]"
                    style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}
                  >
                    {post.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs md:text-sm">
                  <p className="text-gray-400">{post.date}</p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    {t('common.readMore')}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('home.noArticles')}</p>
        )}
      </section>

      {/* What I'm doing section */}
      <section className="py-5">
        <h4 className="text-lg font-medium mb-4">{t('home.doing.title')}</h4>
        <Card>
          <h5>{t('home.doing.workingWith')}</h5>
          <ul className="flex gap-2 flex-wrap my-4">
            {technologiesILike.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <Badge text={tech} color="gray" variant="outline" />
              </li>
            ))}
          </ul>

          <h5 className="mt-4">{t('home.doing.learningAbout')}</h5>
          <ul className="flex gap-2 flex-wrap my-4">
            {learningNow.map((tech, i) => (
              <li key={`${tech}-${i}`}>
                <Badge text={tech} color="gray" variant="outline" />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <ReadingSection />
    </div>
  )
}
