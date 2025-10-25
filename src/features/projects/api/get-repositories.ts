import { getJsonWithSchema } from '@/shared/api/get-json-with-schema'

import { GITHUB_USERNAME, repositoryListSchema } from '../schemas/repository'
import { mapRepositoryToProject } from '../utils/map-repository-to-project'

type getRepositoriesArgs = {
  limit?: number
  signal?: AbortSignal
}

export async function getRepositories({ limit, signal }: getRepositoriesArgs) {
  const perPage = Math.min(limit ?? 100, 100)

  const repositories = await getJsonWithSchema(
    repositoryListSchema,
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&sort=updated`,
    {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      signal
    },
    'GitHub repositories'
  )

  return repositories
    .filter(repo => !repo.fork && !repo.archived)
    .map(mapRepositoryToProject)
    .sort((a, b) => {
      const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0

      return bDate - aDate
    })
}
