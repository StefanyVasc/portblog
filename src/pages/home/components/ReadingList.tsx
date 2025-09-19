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
      <h5 className="text-sm md:text-base font-semibold">{title}</h5>
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
              <p className="text-xs md:text-sm text-gray-500">{reading.author}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
