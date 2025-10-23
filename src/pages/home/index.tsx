import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Badge, Header, ProjectCard } from '@/components'
import { useGithubProjects, usePost } from '@/hooks'
import { learningNow, technologiesILike } from '@/static'

import { Card } from './components/Card'
import { ReadingSection } from './components/ReadingSection'

export function Home() {
  const { posts } = usePost()
  const {
    projects: featuredProjects,
    loading: projectsLoading,
    error: projectsError
  } = useGithubProjects({
    limit: 3
  })
  const { t } = useTranslation()

  // Get the 3 most recent posts (assuming the hook already sorts them)
  const latestPosts = posts.slice(-3).reverse()

  return (
    <div>
      <Header /* headerName={t('home.header')} */ />

      {/* Articles section */}
      <section className="py-5">
        <h4 className="mb-3 text-lg font-medium md:text-xl">
          {t('home.latestArticles')}
        </h4>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(post => (
              <Card key={post.slug} className="flex h-[190px] flex-col p-4">
                <div className="flex-1">
                  <h5 className="text-sm font-semibold md:text-base">
                    {post.title}
                  </h5>
                  <p
                    className="mt-1 max-h-[60px] overflow-hidden text-xs text-gray-500 md:text-sm"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {post.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs md:text-sm">
                  <p className="text-gray-400">{post.date}</p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-rose-600 hover:underline dark:text-rose-400"
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

      {/* Featured projects */}
      <section className="py-5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-medium md:text-xl">
            {t('home.projects.title')}
          </h4>
          <Link
            to="/projects"
            className="text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            {t('home.projects.viewAll')}
          </Link>
        </div>

        {projectsLoading ? (
          <p className="text-sm text-muted-foreground">
            {t('home.projects.loading')}
          </p>
        ) : projectsError ? (
          <p className="text-sm text-rose-500">{t('home.projects.error')}</p>
        ) : featuredProjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t('home.projects.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map(project => (
              <ProjectCard
                key={project.id}
                name={project.name}
                description={project.description}
                tags={project.tags}
                repository={project.repository}
                homepage={project.homepage}
                stars={project.stars}
                updatedAt={project.updatedAt}
              />
            ))}
          </div>
        )}
      </section>

      {/* What I'm doing & reading section */}
      <section className="py-5">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h4 className="mb-4 text-lg font-medium">
              {t('home.doing.title')}
            </h4>
            <Card>
              <h5>{t('home.doing.workingWith')}</h5>
              <ul className="my-4 flex flex-wrap gap-2">
                {technologiesILike.map((tech, i) => (
                  <li key={`${tech}-${i}`}>
                    <Badge text={tech} color="gray" variant="outline" />
                  </li>
                ))}
              </ul>

              <h5 className="mt-4">{t('home.doing.learningAbout')}</h5>
              <ul className="my-4 flex flex-wrap gap-2">
                {learningNow.map((tech, i) => (
                  <li key={`${tech}-${i}`}>
                    <Badge text={tech} color="gray" variant="outline" />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <ReadingSection embedded />
        </div>
      </section>
    </div>
  )
}
