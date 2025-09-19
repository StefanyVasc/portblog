import { motion } from 'framer-motion'
import { Milestone } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Avatar,
  CustomTimeline,
  GlobalScrollAnimation,
  Header,
  Paragraph
} from '@/components'
import { aboutILike, careerItems } from '@/static'

export function About() {
  const items = useMemo(() => careerItems.items, [])
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('about.header')} />
      <section className="py-5">
        <GlobalScrollAnimation>
          <div className="my-10 ">
            <h5>{t('about.me.title')}</h5>
            <div className="flex items-center justify-center">
              <Avatar />
              <Paragraph>
                {t('about.me.introPart1')} <br />
                {t('about.me.introPart2')}{' '}
                <span className="relative inline-block px-2 mr-1">
                  <motion.span
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-rose-500 rounded-md"
                  />
                  <motion.span
                    initial={{ color: 'black', clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ color: 'white', clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    className="relative"
                  >
                    Stefany Sá
                  </motion.span>
                </span>
                {t('about.me.introPart3')}
              </Paragraph>
            </div>
            {/* Características em Grid */}

            <GlobalScrollAnimation>
              <motion.div
                className="p-6 border rounded-lg shadow-md mt-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {aboutILike.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col justify-between"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: index * 0.1
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="">{item.icon}</div>
                        <span className="text-gray-700 dark:text-gray-300 font-400">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-gray-500 dark:text-gray-50 font-300">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </GlobalScrollAnimation>
          </div>
        </GlobalScrollAnimation>

        <GlobalScrollAnimation>
          <div className="mb-5">
            <h5>{t('about.career.title')}</h5>
            <Paragraph>
              {t('about.career.description')}
            </Paragraph>

            <div className="py-10">
              <h5 className="flex gap-2 items-center">
                {t('about.career.timelineTitle')}
                <Milestone size={18} />
              </h5>
              <CustomTimeline items={items} />
            </div>
          </div>
        </GlobalScrollAnimation>

        {/* <div className="mb-5">
          <h5>...Socials</h5>
        </div> */}
      </section>
    </div>
  )
}
