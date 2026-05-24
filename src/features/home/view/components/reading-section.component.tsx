import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { texts } from '@/shared/content/texts'
import { BookcaseBooks } from '@/shared/static'
import { getHomepageReadings } from '@/shared/utils/bookcase'

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
  const { technical, casual } = getHomepageReadings(
    BookcaseBooks,
    MAX_ITEMS_PER_LIST
  )

  const body = (
    <>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h4 className="text-lg font-medium md:text-xl">{readingTexts.title}</h4>
        <Link
          to="/bookcase"
          className="text-sm font-semibold text-rose-600 hover:underline"
        >
          {readingTexts.viewBookcase}
        </Link>
      </div>
      <Card className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReadingList title={readingTexts.technical} items={technical} />
          <ReadingList title={readingTexts.casual} items={casual} />
        </div>
      </Card>
    </>
  )

  if (embedded) {
    return <div className={cn('flex h-full flex-col', className)}>{body}</div>
  }

  return <section className={cn('py-5', className)}>{body}</section>
}
