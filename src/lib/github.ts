export const GITHUB_USERNAME = 'StefanyVasc'

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  stargazers_count: number
  language: string | null
  pushed_at: string
  fork: boolean
  archived: boolean
}

export type GithubProject = {
  id: string
  name: string
  description: string
  tags: string[]
  repository?: string
  homepage: string | null
  stars?: number
  updatedAt?: string
}

export function mapGitHubRepo(repo: GitHubRepo): GithubProject {
  const tags = repo.topics?.length
    ? repo.topics
    : repo.language
      ? [repo.language]
      : []

  return {
    id: `github-${repo.id}`,
    name: repo.name,
    description: repo.description ?? '',
    tags,
    repository: repo.html_url,
    homepage: repo.homepage?.trim() ? repo.homepage : null,
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at
  }
}
