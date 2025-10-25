import { api } from '@/lib/axios'
import { parseWithSchema } from '@/shared/utils/parse-with-schema'

import { GITHUB_USERNAME, repositoryListSchema } from '../schemas/repository'
import { mapRepositoryToProject } from '../utils/map-repository-to-project'

type getRepositoriesArgs = {
  limit?: number
  signal?: AbortSignal
}

export async function getRepositories({ limit, signal }: getRepositoriesArgs) {
  const perPage = Math.min(limit ?? 100, 100)

  const { data } = await api.get<unknown>(`/users/${GITHUB_USERNAME}/repos`, {
    params: {
      per_page: perPage,
      sort: 'updated'
    },
    signal
  })

  const repositories = parseWithSchema(
    repositoryListSchema,
    data,
    'GitHub repositories'
  )

  const mapped = repositories
    .filter(repo => !repo.fork && !repo.archived)
    .map(mapRepositoryToProject)
    .sort((a, b) => {
      const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0

      return bDate - aDate
    })

  return typeof limit === 'number' ? mapped.slice(0, limit) : mapped
}
