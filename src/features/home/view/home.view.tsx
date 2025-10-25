import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { usePost } from '@/features/blog/hooks/use-post'
import { useRepositories } from '@/features/projects/hooks/use-repositories'
import { ProjectCard } from '@/features/projects/view/components/project-card.component'
import { Header } from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { learningNow, technologiesILike } from '@/shared/static'
import { updateDocumentTitle } from '@/shared/utils/update-document-title'

import { Card as CardHome } from './components/card.component'
import { ReadingSection } from './components/reading-section.component'
import { TechBadgeList } from './components/tech-badge-list.component'

export function HomeView() {
  const { posts } = usePost()
  const {
    projects: featuredProjects,
    isLoading: projectsLoading,
    isError: projectsHasError,
    error: projectsError
  } = useRepositories({
    limit: 3
  })
  const homeTexts = texts.home
  const commonTexts = texts.common

  useEffect(() => {
    updateDocumentTitle()
  }, [])

  // Get the 3 most recent posts (assuming the hook already sorts them)
  const latestPosts = posts.slice(-3).reverse()

  return (
    <div>
      <Header />

      {/* Articles section */}
      <section className="py-5">
        <h4 className="mb-3 text-lg font-medium md:text-xl">
          {homeTexts.latestArticles}
        </h4>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(post => (
              <CardHome key={post.slug} className="flex h-[190px] flex-col p-4">
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
                    {commonTexts.readMore}
                  </Link>
                </div>
              </CardHome>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{homeTexts.noArticles}</p>
        )}
      </section>

      {/* Featured projects */}
      <section className="py-5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-medium md:text-xl">
            {homeTexts.projects.title}
          </h4>
          <Link
            to="/projects"
            className="text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
          >
            {homeTexts.projects.viewAll}
          </Link>
        </div>

        {projectsLoading ? (
          <p className="text-sm text-muted-foreground">
            {homeTexts.projects.loading}
          </p>
        ) : projectsHasError ? (
          <p className="text-sm text-rose-500">
            {homeTexts.projects.error}
            {projectsError ? ` (${projectsError.message})` : ''}
          </p>
        ) : featuredProjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {homeTexts.projects.empty}
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
          <div className="flex h-full flex-col">
            <h4 className="mb-4 text-lg font-medium">
              {homeTexts.doing.title}
            </h4>
            <CardHome className="flex-1">
              <div className="grid gap-6 md:grid-cols-2">
                <TechBadgeList
                  title={homeTexts.doing.workingWith}
                  items={technologiesILike}
                />
                <TechBadgeList
                  title={homeTexts.doing.learningAbout}
                  items={learningNow}
                />
              </div>
            </CardHome>
          </div>

          <ReadingSection embedded className="flex h-full flex-col" />
        </div>
      </section>
    </div>
  )
}
