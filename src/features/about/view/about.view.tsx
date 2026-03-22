import { motion } from 'framer-motion'
import { ExternalLink, Milestone } from 'lucide-react'
import { useEffect } from 'react'

import {
  Avatar,
  CustomTimeline,
  GlobalScrollAnimation,
  Header,
  Paragraph
} from '@/shared/components'
import { SITE_META } from '@/shared/config/site'
import { texts } from '@/shared/content/texts'
import { aboutILike, careerItems, educationItems } from '@/shared/static'
import { updateSeo } from '@/shared/utils/update-seo'

export function AboutView() {
  const aboutTexts = texts.about

  useEffect(() => {
    updateSeo({
      title: SITE_META.about.title,
      description: SITE_META.about.description,
      canonicalPath: '/about',
      type: 'website'
    })
  }, [])

  return (
    <div>
      <Header headerName={aboutTexts.header} />
      <section className="py-5">
        <GlobalScrollAnimation>
          <div className="my-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Coluna esquerda — mim */}
            <div>
              <h5>{aboutTexts.me.title}</h5>
              <div className="flex items-center">
                <Avatar />
                <Paragraph>
                  {aboutTexts.me.introPart1} <br />
                  {aboutTexts.me.introPart2}{' '}
                  <span className="relative mr-1 inline-block px-2">
                    <motion.span
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-md bg-rose-500"
                    />
                    <motion.span
                      initial={{
                        color: 'black',
                        clipPath: 'inset(0 100% 0 0)'
                      }}
                      animate={{ color: 'white', clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      className="relative"
                    >
                      Stefany Sá
                    </motion.span>
                  </span>
                  {aboutTexts.me.introPart3}
                </Paragraph>
              </div>
              <Paragraph>{aboutTexts.me.description}</Paragraph>
            </div>

            {/* Coluna direita — info card + formação */}
            <div className="flex flex-col justify-between gap-6">
              <motion.div
                className="rounded-lg border p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {aboutILike.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: index * 0.1
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div>{item.icon}</div>
                        <span className="font-400 text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-300 text-gray-500 dark:text-gray-50">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div>
                <h5>{aboutTexts.education.title}</h5>
                <h5 className="flex items-center gap-2">
                  {aboutTexts.education.timelineTitle}
                  <Milestone size={18} />
                </h5>
                <ul className="relative mt-4 flex max-h-52 flex-col overflow-y-auto pr-1">
                  {/* linha vertical contínua */}
                  <div className="absolute bottom-0 left-[104px] top-1.5 w-px bg-gray-300 dark:bg-gray-600" />
                  {educationItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="relative grid grid-cols-[80px_24px_1fr] items-start gap-x-3 pb-8"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {/* data */}
                      <span className="pt-0.5 text-right text-xs text-gray-500 dark:text-gray-400">
                        {item.current ? 'Pres.' : item.yearEnd} –{' '}
                        {item.yearStart}
                      </span>

                      {/* ponto */}
                      <div className="flex justify-center pt-0.5">
                        <div
                          className={`h-3 w-3 shrink-0 rounded-full ${
                            item.current
                              ? 'animate-glow bg-rose-500'
                              : 'bg-gray-900 dark:bg-gray-50'
                          }`}
                        />
                      </div>

                      {/* conteúdo */}
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-500">{item.title}</span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.company}
                          </span>
                          {item.enade && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              · ENADE {item.enade}
                            </span>
                          )}
                          {item.tccUrl && (
                            <a
                              href={item.tccUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-rose-500 hover:underline"
                            >
                              · TCC <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </GlobalScrollAnimation>

        {/* Carreira — full width */}
        <GlobalScrollAnimation>
          <div className="mb-5">
            <h5>{aboutTexts.career.title}</h5>
            <h5 className="flex items-center gap-2">
              {aboutTexts.career.timelineTitle}
              <Milestone size={18} />
            </h5>
            <CustomTimeline items={careerItems} />
          </div>
        </GlobalScrollAnimation>
      </section>
    </div>
  )
}
