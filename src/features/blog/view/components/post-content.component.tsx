import { Tag } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Badge, MarkdownRenderer } from '@/shared/components'
import { useLocaleSuffix } from '@/shared/hooks/use-locale-suffix'

import { CommentsWidget } from './comments-widget.component'

export const PostContent = ({
  content,
  tags
}: {
  content: string | null
  tags: string[]
}) => {
  const { slug } = useParams()
  const { t, languageCode } = useLocaleSuffix()

  const title = `blog/${slug}`

  return content ? (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-10">
      <MarkdownRenderer content={content} />

      {tags && tags.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
            <Tag size={20} /> {t('blog.tagsHeading')}
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

      <CommentsWidget
        key={`${languageCode}-${title}`}
        title={title ?? 'default-title'}
      />
    </div>
  ) : (
    <p className="mt-10 text-center">{t('postContent.notFound')}</p>
  )
}
