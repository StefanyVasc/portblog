import { Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { usePost } from '@/features/blog/hooks/use-post'
import { useRepositories } from '@/features/projects/hooks/use-repositories'
import { ProjectCard } from '@/features/projects/view/components/project-card.component'
import {
  Header,
  ProjectCardSkeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components'
import { SITE_META } from '@/shared/config/site'
import { texts } from '@/shared/content/texts'
import { learningNow, technologiesILike } from '@/shared/static'
import { updateSeo } from '@/shared/utils/update-seo'

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
    updateSeo({
      title: SITE_META.home.title,
      description: SITE_META.home.description,
      canonicalPath: '/',
      type: 'website'
    })
  }, [])

  const latestPosts = posts.slice(0, 3)

  return (
    <div>
      <Header />

      {/* Articles section */}
      <section className="py-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-lg font-medium md:text-xl">
            {homeTexts.latestArticles}
          </h4>
          <Link
            to="/blog"
            className="text-sm font-semibold text-rose-600 hover:underline"
          >
            {homeTexts.viewAllPosts}
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <TooltipProvider delayDuration={150}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <CardHome
                  key={post.slug}
                  className="relative flex h-[190px] flex-col p-4"
                >
                  <div className={index === 0 ? 'flex-1 pr-8' : 'flex-1'}>
                    {index === 0 && (
                      <>
                        <span className="sr-only">New post.</span>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger
                            className="absolute right-1 top-1 z-10 inline-flex animate-badge-float items-center justify-center rounded-full text-amber-500 outline-none transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 motion-reduce:animate-none"
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
                    <h5 className="text-sm font-semibold lowercase md:text-base">
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
                      className="text-rose-600 hover:underline"
                    >
                      {commonTexts.readMore}
                    </Link>
                  </div>
                </CardHome>
              ))}
            </div>
          </TooltipProvider>
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
            className="text-sm font-semibold text-rose-600 hover:underline"
          >
            {homeTexts.projects.viewAll}
          </Link>
        </div>

        {projectsLoading ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
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
          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                className="bg-background"
                buttonClassName="bg-white"
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
