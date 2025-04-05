import { Tag } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Badge } from '@/components'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

import { GiscusComments } from './GiscusComments'

export const PostContent = ({
  content,
  tags
}: {
  content: string | null
  tags: string[]
}) => {
  const { slug } = useParams()

  const title = `blog/${slug}`

  return content ? (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Renderiza o Markdown normalmente */}
      <MarkdownRenderer content={content} />

      {/*  Seção de Tags abaixo do post */}
      {tags && tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Tag size={20} /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                color="rose"
                text={`#${tag}`}
                key={index}
                variant="outline"
              />
            ))}
          </div>
        </div>
      )}

      <GiscusComments title={title ?? 'default-title'} />
    </div>
  ) : (
    <p className="text-center mt-10">Post não encontrado.</p>
  )
}

localStorage.getItem('giscus-session')
