import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Header, Pagination, ProjectCard } from '@/components'
import { useGithubProjects } from '@/hooks'

export function Projects() {
  const { t } = useTranslation()
  const { projects, loading, error } = useGithubProjects()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const availableTags = useMemo(() => {
    const tags = new Set<string>()

    projects.forEach(project => {
      project.tags.forEach(tag => {
        if (tag) tags.add(tag)
      })
    })

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
      <Header headerName={t('projects.header')} />

      <section className="py-5 font-300">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <label className="flex w-full flex-col gap-2 md:w-1/2">
            <span className="text-sm font-medium text-muted-foreground">
              {t('projects.filters.search')}
            </span>
            <input
              type="text"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:bg-background"
              placeholder={t('projects.filters.searchPlaceholder')}
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 md:w-1/4">
            <span className="text-sm font-medium text-muted-foreground">
              {t('projects.filters.tag')}
            </span>
            <select
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500 dark:bg-background"
              value={selectedTag}
              onChange={event => setSelectedTag(event.target.value)}
            >
              <option value="all">{t('projects.filters.tagAll')}</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading ? (
          <p className="text-muted-foreground">
            {t('projects.states.loading')}
          </p>
        ) : (
          <>
            {error ? (
              <p className="mb-4 text-sm text-rose-500">
                {t('projects.states.error')}
              </p>
            ) : null}

            {paginatedProjects.length === 0 ? (
              <p className="text-muted-foreground">
                {t('projects.states.empty')}
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
              label={t('projects.pagination.total')}
              onPageChange={setCurrentPage}
              onPageSizeChange={size => setPageSize(size)}
            />
          </>
        )}
      </section>
    </div>
  )
}
