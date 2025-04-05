import { BackpackIcon, CalendarIcon, LapTimerIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Badge,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Section
} from '@/components'

import { CustomTimelineProps } from './types'

export function CustomTimeline({ items }: CustomTimelineProps) {
  const [showArrow, setShowArrow] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const sortedItems = useMemo(
    () =>
      items.sort(
        (a, b) => dayjs(b.yearStart).year() - dayjs(a.yearStart).year()
      ),
    [items]
  )

  const handleScroll = () => {
    setShowArrow(true)

    // Limpa o timeout anterior para evitar esconder prematuramente
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Inicia um novo timeout para esconder a seta após 0.5s sem scroll
    timeoutRef.current = setTimeout(() => {
      setShowArrow(false)
    }, 500)
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <motion.div
      className="h-60 p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Linha horizontal da timeline */}
      <div className="absolute top-10 left-6 right-6 h-px bg-gray-500/20 dark:bg-gray-400/20" />

      {/* Scroll horizontal da timeline */}
      <motion.div
        ref={scrollRef}
        className="relative overflow-x-auto pl-6 h-full custom-scrollbar"
      >
        <motion.div className="flex gap-10 min-w-max">
          {sortedItems.map((item, index) => {
            const {
              yearStart,
              description,
              title,
              company,
              current,
              about,
              competencies,
              duration,
              yearEnd
            } = item

            return (
              <motion.div
                key={`${yearStart}-${index}`}
                className="relative text-sm flex flex-col items-start flex-shrink-0 w-64"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
              >
                {/* Ponto na Timeline */}
                <div
                  className={`w-3 h-3 rounded-full absolute left-0 top-4 -translate-y-1/2 ${
                    current
                      ? 'bg-rose-500 animate-glow'
                      : 'bg-gray-900 dark:bg-gray-50'
                  }`}
                />

                <div className="flex flex-col items-start mt-8 font-rubik">
                  <div className="font-500 text-gray-500 dark:text-gray-400 text-xs">
                    {yearStart}
                  </div>

                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="text-base cursor-pointer">{title}</div>
                    </HoverCardTrigger>
                    <HoverCardContent asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="max-w-xs max-h-[500px] overflow-y-auto p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800"
                      >
                        <div className="flex justify-between">
                          <span className="flex gap-2 my-2">
                            <CalendarIcon />
                            {yearStart} - {!current ? yearEnd : 'Present'}
                          </span>

                          {!current && duration && (
                            <span className="flex gap-2 my-2">
                              <LapTimerIcon />
                              {duration}
                            </span>
                          )}
                        </div>

                        <span className="font-400">{about}</span>

                        {/* Competências */}
                        {competencies &&
                          Object.entries(competencies).map(
                            ([sectionTitle, sectionData], i) => {
                              if (
                                !sectionData ||
                                typeof sectionData !== 'object'
                              )
                                return null

                              // Filtra apenas os arrays dentro de cada seção
                              const allValues = Object.values(sectionData)
                                .filter(Array.isArray)
                                .flat()

                              return (
                                allValues.length > 0 && (
                                  <Section key={i} title={sectionTitle}>
                                    {allValues.map((item, j) => (
                                      <Badge
                                        key={j}
                                        color="gray"
                                        text={item}
                                        variant="outline"
                                        size="xxs"
                                      />
                                    ))}
                                  </Section>
                                )
                              )
                            }
                          )}
                      </motion.div>
                    </HoverCardContent>
                  </HoverCard>

                  <div className="text-sm flex items-center gap-1 mt-4 mb-2 w-full">
                    <BackpackIcon />
                    <span> {company}</span>
                  </div>

                  <div className="font-300 text-gray-500 dark:text-gray-400 text-xs">
                    {description}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Indicador de arraste (some apenas quando o usuário fizer scroll) */}
        {showArrow && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md shadow-lg flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut'
              }}
            >
              <MoveHorizontal size={20} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
