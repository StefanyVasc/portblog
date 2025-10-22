import { Tag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Badge } from '@/components'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

import { CommentsWidget } from './CommentsWidget'

export const PostContent = ({
  content,
  tags
}: {
  content: string | null
  tags: string[]
}) => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const languageKey =
    i18n.resolvedLanguage?.split('-')[0] ?? i18n.language.split('-')[0] ?? 'pt'

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
        key={`${languageKey}-${title}`}
        title={title ?? 'default-title'}
      />
    </div>
  ) : (
    <p className="mt-10 text-center">{t('postContent.notFound')}</p>
  )
}
