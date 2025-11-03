import { useQuery } from '@tanstack/react-query'

import { getRepositories } from '../../features/projects/api/get-repositories'
import { Repository } from '../../features/projects/schemas/repository'

type UseProjectsOptions = {
  limit?: number
  enabled?: boolean
}

export function useRepositories(options: UseProjectsOptions = {}) {
  const { limit, enabled = true } = options

  const query = useQuery<Repository[], Error>({
    queryKey: ['projects', 'github', { limit: limit ?? null }] as const,
    queryFn: ({ signal }) => getRepositories({ limit, signal }),
    enabled
  })

  return {
    ...query,
    projects: query.data ?? []
  }
}
