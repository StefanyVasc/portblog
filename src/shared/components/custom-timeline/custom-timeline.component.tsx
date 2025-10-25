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
} from '@/shared/components'
import { useI18n } from '@/shared/hooks/use-i18n'

import { CustomTimelineProps } from './types'

export function CustomTimeline({ items }: CustomTimelineProps) {
  const [showArrow, setShowArrow] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useI18n()

  const sortedItems = useMemo(
    () =>
      [...items].sort(
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
      className="relative h-60 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Linha horizontal da timeline */}
      <div className="absolute left-6 right-6 top-10 h-px bg-gray-500/20 dark:bg-gray-400/20" />

      {/* Scroll horizontal da timeline */}
      <motion.div
        ref={scrollRef}
        className="custom-scrollbar relative h-full overflow-x-auto pl-6"
      >
        <motion.div className="flex min-w-max gap-10">
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
                className="relative flex w-64 flex-shrink-0 flex-col items-start text-sm"
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
                  className={`absolute left-0 top-4 h-3 w-3 -translate-y-1/2 rounded-full ${
                    current
                      ? 'animate-glow bg-rose-500'
                      : 'bg-gray-900 dark:bg-gray-50'
                  }`}
                />

                <div className="mt-8 flex flex-col items-start font-rubik">
                  <div className="text-xs font-500 text-gray-500 dark:text-gray-400">
                    {yearStart}
                  </div>

                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="cursor-pointer text-base">{title}</div>
                    </HoverCardTrigger>
                    <HoverCardContent asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="max-h-[500px] max-w-xs overflow-y-auto rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800"
                      >
                        <div className="flex items-start gap-3">
                          <span className="my-2 flex items-center gap-2 whitespace-nowrap">
                            <CalendarIcon />
                            <span>
                              {yearStart} -{' '}
                              {!current ? yearEnd : t('common.present')}
                            </span>
                          </span>

                          {!current && duration && (
                            <span className="my-2 flex min-w-0 items-start gap-2">
                              <LapTimerIcon />
                              <span className="whitespace-normal break-words leading-snug">
                                {duration}
                              </span>
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

                  <div className="mb-2 mt-4 flex w-full items-center gap-1 text-sm">
                    <BackpackIcon />
                    <span> {company}</span>
                  </div>

                  <div className="text-xs font-300 text-gray-500 dark:text-gray-400">
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
            className="absolute bottom-20 left-1/2 flex -translate-x-1/2 transform items-center rounded-md bg-gray-200 px-3 py-1 text-gray-500 shadow-lg dark:bg-gray-700 dark:text-gray-400"
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
