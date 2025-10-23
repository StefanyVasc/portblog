import { useEffect, useState } from 'react'

import {
  GITHUB_USERNAME,
  type GithubProject,
  type GitHubRepo,
  mapGitHubRepo
} from '@/lib/github'

type UseGithubProjectsParams = {
  limit?: number
}

export function useGithubProjects({ limit }: UseGithubProjectsParams = {}) {
  const [projects, setProjects] = useState<GithubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)

        const perPage = Math.min(limit ?? 100, 100)
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&sort=updated`,
          {
            headers: {
              Accept: 'application/vnd.github+json'
            },
            signal: controller.signal
          }
        )

        if (!response.ok) {
          throw new Error(`GitHub request failed: ${response.status}`)
        }

        const data = (await response.json()) as GitHubRepo[]
        const cleaned = data
          .filter(repo => !repo.fork && !repo.archived)
          .map(mapGitHubRepo)
          .sort((a, b) => {
            const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
            const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0

            return bDate - aDate
          })

        setProjects(limit ? cleaned.slice(0, limit) : cleaned)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return

        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    return () => controller.abort()
  }, [limit])

  return { projects, loading, error }
}
