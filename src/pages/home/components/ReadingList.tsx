import { useTranslation } from 'react-i18next'

import { Badge } from '@/components'
import { type Reading, type ReadingTag } from '@/static'

const tagColors: Record<ReadingTag, 'rose' | 'green'> = {
  recommendation: 'rose',
  reading: 'green'
}

type ReadingListProps = {
  title: string
  items: Reading[]
}

export function ReadingList({ title, items }: ReadingListProps) {
  const { t } = useTranslation()

  return (
    <div>
      <h5 className="text-sm font-semibold md:text-base">{title}</h5>
      <ul className="mt-4 space-y-3">
        {items.map(reading => (
          <li key={reading.title} className="text-sm md:text-base">
            <div className="flex flex-wrap items-center gap-2">
              <span>{reading.title}</span>
              {reading.tags.map(tag => (
                <Badge
                  key={`${reading.title}-${tag}`}
                  text={t(`home.reading.tags.${tag}`)}
                  color={tagColors[tag]}
                  variant="outlineSoft"
                  size="xxs"
                />
              ))}
            </div>
            {reading.author && (
              <p className="text-xs text-gray-500 md:text-sm">
                {reading.author}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
