import { useAppQuery } from '@/shared/hooks/use-app-query'

import { getRepositories } from '../api/get-repositories'
import { Repository } from '../schemas/repository'

type UseProjectsOptions = {
  limit?: number
  enabled?: boolean
}

export function useRepositories(options: UseProjectsOptions = {}) {
  const { limit, enabled = true } = options

  const query = useAppQuery<Repository[], Error>({
    key: ['projects', 'github', limit ?? 'all'],
    queryFn: ({ signal }) => getRepositories({ limit, signal }),
    enabled
  })

  return {
    ...query,
    projects: query.data ?? []
  }
}
