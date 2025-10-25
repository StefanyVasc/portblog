import {
  CounterClockwiseClockIcon,
  HeartFilledIcon,
  LightningBoltIcon
} from '@radix-ui/react-icons'
import type { ComponentType } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { type Reading, type ReadingTag } from '@/shared/static'

type TagConfig = {
  icon: ComponentType<{ className?: string }>
  className: string
}

const tagConfig: Record<ReadingTag, TagConfig> = {
  recommendation: {
    icon: HeartFilledIcon,
    className: 'text-rose-500'
  },
  reading: {
    icon: LightningBoltIcon,
    className: 'text-emerald-500'
  },
  'last read': {
    icon: CounterClockwiseClockIcon,
    className: 'text-muted-foreground'
  }
}

const tagOrder: ReadingTag[] = ['recommendation', 'reading', 'last read']

type ReadingListProps = {
  title: string
  items: Reading[]
}

export function ReadingList({ title, items }: ReadingListProps) {
  const tagLabels = texts.home.reading.tags

  return (
    <TooltipProvider delayDuration={150}>
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground md:text-sm">
          {title}
        </h5>
        <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-muted-foreground">
          {items.map(reading => (
            <li key={reading.title} className="text-sm md:text-base">
              <div className="flex flex-col gap-1">
                <span className="font-medium">{reading.title}</span>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground md:text-xs">
                  {reading.author ? (
                    <span className="text-[11px] md:text-xs">
                      {reading.author}
                    </span>
                  ) : null}

                  <div className="flex items-center gap-2">
                    {tagOrder
                      .filter(tag => reading.tags.includes(tag))
                      .map(tag => {
                        const config = tagConfig[tag]
                        const Icon = config.icon

                        return (
                          <Tooltip
                            key={`${reading.title}-${tag}`}
                            delayDuration={100}
                          >
                            <TooltipTrigger asChild>
                              <span
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-muted"
                                aria-label={tagLabels[tag]}
                              >
                                <Icon
                                  className={`h-3.5 w-3.5 ${config.className}`}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>{tagLabels[tag]}</TooltipContent>
                          </Tooltip>
                        )
                      })}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </TooltipProvider>
  )
}
