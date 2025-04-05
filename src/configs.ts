export const config = {
  githubToken: import.meta.env.VITE_GITHUB_TOKEN,
  repoOwner: import.meta.env.VITE_REPO_OWNER,
  repoName: import.meta.env.VITE_REPO_NAME,
  categoryId: import.meta.env.VITE_CATEGORY_ID,
  repositoryId: import.meta.env.VITE_REPOSITORY_ID,
  githubApiUrl: import.meta.env.VITE_GITHUB_API_URL,
  githubApiGraphqlUrl: import.meta.env.VITE_GITHUB_API_GRAPHQL_URL
} as const
