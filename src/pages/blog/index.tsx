import { CustomBreadcrumb, Header } from '@/components'
import { usePost } from '@/hooks/usePost'

import { ErrorMessage, Loading, PostContent, PostList } from './components'

export function Blog() {
  const { slug, posts, content, loading, error } = usePost()

  // Formatar a URL no breadcrumb para mostrar "DD/MM/YYYY - Nome do post"
  const pathnames = location.pathname
    .split('/')
    .filter(path => path)
    .map((segment, index, array) => {
      if (index === array.length - 1 && slug) {
        // Extrai a data e o título corretamente
        const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/)
        if (dateMatch) {
          const [, year, month, day, rawTitle] = dateMatch
          const formattedDate = `${day}/${month}/${year}` // Converte para DD/MM/YYYY
          const formattedTitle = rawTitle.replace(/_/g, ' ') // Remove underscores
          return `${formattedDate} - ${formattedTitle}`
        }
      }
      return segment
    })

  const shouldHasPost = !loading && !error

  return (
    <div>
      <Header headerName="Blog" />
      {pathnames.length > 1 && <CustomBreadcrumb pathnames={pathnames} />}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {shouldHasPost &&
        (slug ? <PostContent content={content} /> : <PostList posts={posts} />)}
    </div>
  )
}
