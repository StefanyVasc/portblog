import dayjs from 'dayjs'

type CustomTimelineProps = {
  items: Array<{
    date: string
    title: string
    description: string
  }>
}

export function CustomTimeline({ items }: CustomTimelineProps) {
  const sortedItems = items.sort(
    (a, b) => dayjs(a.date).year() - dayjs(b.date).year()
  )

  return (
    <div className="h-60 p-6">
      <div className="relative overflow-x-auto pl-6 h-full">
        {/* Linha horizontal da timeline */}
        <div className="absolute top-4 left-0 w-full h-px bg-gray-500/20 dark:bg-gray-400/20" />

        <div className="flex gap-10 min-w-max">
          {sortedItems.map((item, index) => {
            const { date, description, title } = item

            return (
              <div
                key={`${date}-${index}`}
                className="relative text-sm flex flex-col items-start flex-shrink-0 w-64"
              >
                <div className="w-3 h-3 bg-gray-900 rounded-full dark:bg-gray-50 absolute left-0 top-4 -translate-y-1/2" />

                <div className="flex flex-col items-start mt-6 font-rubik">
                  <div className="font-500 text-gray-500 dark:text-gray-400">
                    {date}
                  </div>
                  <div className="text-lg">{title}</div>
                  <div className="font-300 text-gray-500 dark:text-gray-400">
                    {description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
