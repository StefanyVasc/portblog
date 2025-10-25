import { GitHubRepository, Repository } from '../schemas/repository'

export function mapRepositoryToProject(
  repository: GitHubRepository
): Repository {
  const tags = repository.topics?.length
    ? repository.topics
    : repository.language
      ? [repository.language]
      : []

  return {
    id: `github-${repository.id}`,
    name: repository.name,
    description: repository.description ?? '',
    tags,
    repository: repository.html_url,
    homepage: repository.homepage?.trim() ? repository.homepage : null,
    stars: repository.stargazers_count,
    updatedAt: repository.pushed_at
  }
}
