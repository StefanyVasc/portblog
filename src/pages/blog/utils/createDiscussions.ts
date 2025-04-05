import { config } from '@/configs'

const onGoingRequests: { [key: string]: Promise<string | null> | undefined } =
  {}

export async function createDiscussionIfNotExists(title: string) {
  if (onGoingRequests[title]) {
    return onGoingRequests[title]
  }

  // Salva a requisição no objeto global para evitar chamadas duplicadas
  onGoingRequests[title] = (async () => {
    try {
      //  Verifica se a Discussion já existe usando a API GraphQL
      const existingDiscussionsResponse = await fetch(
        config.githubApiGraphqlUrl,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.githubToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            query: `
          query {
            repository(owner: "${config.repoOwner}", name: "${config.repoName}") {
              discussions(first: 10) {
                nodes {
                  id
                  title
                  url
                }
              }
            }
          }
        `
          })
        }
      ).then(res => res.json())

      if (existingDiscussionsResponse.errors) {
        console.error(
          '❌ Erro ao buscar Discussions:',
          existingDiscussionsResponse.errors
        )
        return null
      }

      const existingDiscussions =
        existingDiscussionsResponse.data.repository.discussions.nodes

      if (!existingDiscussions || !Array.isArray(existingDiscussions)) {
        console.error('❌ Erro ao processar Discussions:', existingDiscussions)
        return null
      }

      const discussion = existingDiscussions.find(
        (d: { id: string; title: string; url: string }) => d.title === title
      )

      if (discussion) {
        return discussion.url // Se a Discussion já existir, retorna a URL
      }

      //  Criar Discussion via GraphQL

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.githubToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          query: `
          mutation {
            createDiscussion(input: {
              repositoryId: ${config.repositoryId},
              categoryId: ${config.categoryId},
              title: "${title}",
              body: "Discussão automática para o post: ${title}"
            }) {
              discussion {
                url
              }
            }
          }
        `
        })
      }).then(res => res.json())

      if (response.errors) {
        console.error('❌ Erro ao criar Discussion:', response.errors)
        return null
      } else {
        return response.data.createDiscussion.discussion.url
      }
    } catch (error) {
      console.error('❌ Erro inesperado ao criar Discussion:', error)
      return null
    } finally {
      delete onGoingRequests[title] // Remove a requisição da lista ao terminar
    }
  })()

  return onGoingRequests[title]
}
