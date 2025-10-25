import { useEffect, useMemo, useState } from 'react'

import { Header, Pagination } from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { updateDocumentTitle } from '@/shared/utils/update-document-title'

import { useRepositories } from '../hooks/use-repositories'
import { ProjectCard } from './components/project-card.component'

export function ProjectsView() {
  const projectTexts = texts.projects
  useEffect(() => {
    updateDocumentTitle('Projetos')
  }, [])
  const {
    projects = [],
    isLoading: projectsLoading,
    isError: projectsHasError,
    error: projectsError
  } = useRepositories()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const availableTags = useMemo(() => {
    const tags = new Set<string>()

    if (Array.isArray(projects)) {
      projects.forEach(project => {
        project?.tags?.forEach(tag => {
          if (tag) tags.add(tag)
        })
      })
    }

    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [projects])

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return projects.filter(project => {
      const matchesTag =
        selectedTag === 'all' || project.tags.includes(selectedTag)

      if (!matchesTag) return false

      if (!normalizedSearch) return true

      const searchable = `${project.name} ${project.description} ${project.tags.join(' ')}`

      return searchable.toLowerCase().includes(normalizedSearch)
    })
  }, [projects, search, selectedTag])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedTag, pageSize, projects])

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize

    return filteredProjects.slice(startIndex, startIndex + pageSize)
  }, [filteredProjects, currentPage, pageSize])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage)
    }
  }, [currentPage, safeCurrentPage])

  return (
    <div>
      <Header headerName={projectTexts.header} />

      <section className="py-5 font-300">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <label className="flex w-full flex-col gap-2 md:w-1/2">
            <span className="text-sm font-medium text-muted-foreground">
              {projectTexts.filters.search}
            </span>
            <input
              type="text"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:bg-background"
              placeholder={projectTexts.filters.searchPlaceholder}
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:w-1/4">
            <span className="text-sm font-medium text-muted-foreground">
              {projectTexts.filters.tag}
            </span>
            <select
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:bg-background"
              value={selectedTag}
              onChange={event => setSelectedTag(event.target.value)}
            >
              <option value="all">{projectTexts.filters.tagAll}</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>

        {projectsLoading ? (
          <p className="text-muted-foreground">{projectTexts.states.loading}</p>
        ) : (
          <>
            {projectsHasError ? (
              <p className="mb-4 text-sm text-rose-500">
                {projectTexts.states.error}
                {projectsError ? ` (${projectsError.message})` : ''}
              </p>
            ) : null}

            {paginatedProjects.length === 0 ? (
              <p className="text-muted-foreground">
                {projectTexts.states.empty}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paginatedProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    description={project.description}
                    homepage={project.homepage}
                    name={project.name}
                    repository={project.repository}
                    stars={project.stars}
                    tags={project.tags}
                    updatedAt={project.updatedAt}
                  />
                ))}
              </div>
            )}

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredProjects.length}
              pageSize={pageSize}
              label={projectTexts.pagination.total}
              onPageChange={setCurrentPage}
              onPageSizeChange={size => setPageSize(size)}
            />
          </>
        )}
      </section>
    </div>
  )
}
