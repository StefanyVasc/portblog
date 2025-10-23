import { useTranslation } from 'react-i18next'

import { casualReadings, technicalReadings } from '@/static'

import { Card } from './Card'
import { ReadingList } from './ReadingList'

type ReadingSectionProps = {
  embedded?: boolean
  className?: string
}

export function ReadingSection({
  embedded = false,
  className = ''
}: ReadingSectionProps) {
  const { t } = useTranslation()
  const MAX_ITEMS_PER_LIST = 3
  const limitedTechnical = technicalReadings.slice(0, MAX_ITEMS_PER_LIST)
  const limitedCasual = casualReadings.slice(0, MAX_ITEMS_PER_LIST)

  const content = (
    <>
      <h4 className="mb-3 text-lg font-medium md:text-xl">
        {t('home.reading.title')}
      </h4>
      <Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReadingList
            title={t('home.reading.technical')}
            items={limitedTechnical}
          />
          <ReadingList title={t('home.reading.casual')} items={limitedCasual} />
        </div>
      </Card>
    </>
  )

  if (embedded) {
    return <div className={className}>{content}</div>
  }

  const wrapperClass = className ? `py-5 ${className}` : 'py-5'

  return <section className={wrapperClass}>{content}</section>
}
