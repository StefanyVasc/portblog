import { cn } from '@/lib/utils'
import { texts } from '@/shared/content/texts'
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
  const readingTexts = texts.home.reading
  const MAX_ITEMS_PER_LIST = 3
  const limitedTechnical = technicalReadings.slice(0, MAX_ITEMS_PER_LIST)
  const limitedCasual = casualReadings.slice(0, MAX_ITEMS_PER_LIST)

  const body = (
    <>
      <h4 className="mb-3 text-lg font-medium md:text-xl">
        {readingTexts.title}
      </h4>
      <Card className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReadingList
            title={readingTexts.technical}
            items={limitedTechnical}
          />
          <ReadingList title={readingTexts.casual} items={limitedCasual} />
        </div>
      </Card>
    </>
  )

  if (embedded) {
    return <div className={cn('flex h-full flex-col', className)}>{body}</div>
  }

  return <section className={cn('py-5', className)}>{body}</section>
}
