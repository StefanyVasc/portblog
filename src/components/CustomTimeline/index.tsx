import { BackpackIcon, CalendarIcon, LapTimerIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'

import {
  Badge,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Section
} from '@/components'

import { CustomTimelineProps } from './types'

export function CustomTimeline({ items }: CustomTimelineProps) {
  const sortedItems = items.sort(
    (a, b) => dayjs(b.yearStart).year() - dayjs(a.yearStart).year()
  )
  return (
    <div className="h-60 p-6 relative">
      {/* Linha horizontal da timeline */}
      <div className="absolute top-10 left-6 right-6 h-px bg-gray-500/20 dark:bg-gray-400/20" />

      <div className="relative overflow-x-auto pl-6 h-full">
        <div className="flex gap-10 min-w-max">
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
              <div
                key={`${yearStart}-${index}`}
                className="relative text-sm flex flex-col items-start flex-shrink-0 w-64"
              >
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
                    <HoverCardContent className="max-w-xs max-h-[500px] overflow-y-auto p-3 rounded-lg shadow-lg">
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

                      {/* Frontend */}
                      {competencies?.frontend && (
                        <Section title="Frontend">
                          {competencies.frontend.libs?.map((lib, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={lib}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                          {competencies.frontend.frameworks?.map(
                            (framework, i) => (
                              <Badge
                                key={i}
                                color="gray"
                                text={framework}
                                variant="outline"
                                size="xxs"
                              />
                            )
                          )}
                        </Section>
                      )}

                      {/* Styling */}
                      {competencies?.styling && (
                        <Section title="Styling">
                          {competencies.styling.libraries?.map((lib, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={lib}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Tools */}
                      {competencies?.tools && (
                        <Section title="Tools">
                          {competencies.tools.visualization?.map((tool, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={tool}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Backend */}
                      {competencies?.backend && (
                        <Section title="Backend">
                          {competencies.backend.technologies?.map((tech, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={tech}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Cloud */}
                      {competencies?.cloud && (
                        <Section title="Cloud">
                          {competencies.cloud.providers?.map((provider, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={provider}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Databases */}
                      {competencies?.databases && (
                        <Section title="Databases">
                          {competencies.databases.technologies?.map((db, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={db}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Containers */}
                      {competencies?.containers && (
                        <Section title="Containers">
                          {competencies.containers.tools?.map(
                            (container, i) => (
                              <Badge
                                key={i}
                                color="gray"
                                text={container}
                                variant="outline"
                                size="xxs"
                              />
                            )
                          )}
                        </Section>
                      )}

                      {/* Orchestration */}
                      {competencies?.orchestration && (
                        <Section title="Orchestration">
                          {competencies.orchestration.tools?.map((tool, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={tool}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Deploy (CI/CD) */}
                      {competencies?.deploy && (
                        <>
                          {competencies.deploy.ci?.tools && (
                            <Section title="CI">
                              {competencies.deploy.ci.tools.map((tool, i) => (
                                <Badge
                                  key={i}
                                  color="gray"
                                  text={tool}
                                  variant="outline"
                                  size="xxs"
                                />
                              ))}
                            </Section>
                          )}

                          {competencies.deploy.cd?.tools && (
                            <Section title="CD">
                              {competencies.deploy.cd.tools.map((tool, i) => (
                                <Badge
                                  key={i}
                                  color="gray"
                                  text={tool}
                                  variant="outline"
                                  size="xxs"
                                />
                              ))}
                            </Section>
                          )}
                        </>
                      )}

                      {/* Monitoring */}
                      {competencies?.monitoring && (
                        <Section title="Monitoring">
                          {competencies.monitoring.tools?.map((tool, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={tool}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}

                      {/* Observability */}
                      {competencies?.observability && (
                        <Section title="Observability">
                          {competencies.observability.tools?.map((tool, i) => (
                            <Badge
                              key={i}
                              color="gray"
                              text={tool}
                              variant="outline"
                              size="xxs"
                            />
                          ))}
                        </Section>
                      )}
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
