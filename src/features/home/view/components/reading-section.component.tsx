import { cn } from '@/lib/utils'
import { useI18n } from '@/shared/hooks/use-i18n'
import { casualReadings, technicalReadings } from '@/shared/static'

import { Card } from './card.component'
import { ReadingList } from './reading-list.component'

type ReadingSectionProps = {
  embedded?: boolean
  className?: string
}

export function ReadingSection({
  embedded = false,
  className = ''
}: ReadingSectionProps) {
  const { t } = useI18n()
  const MAX_ITEMS_PER_LIST = 3
  const limitedTechnical = technicalReadings.slice(0, MAX_ITEMS_PER_LIST)
  const limitedCasual = casualReadings.slice(0, MAX_ITEMS_PER_LIST)

  const body = (
    <>
      <h4 className="mb-3 text-lg font-medium md:text-xl">
        {t('home.reading.title')}
      </h4>
      <Card className="flex-1">
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
    return <div className={cn('flex h-full flex-col', className)}>{body}</div>
  }

  return <section className={cn('py-5', className)}>{body}</section>
}
