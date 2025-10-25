import { motion } from 'framer-motion'
import { Milestone } from 'lucide-react'
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
import { aboutILike, careerItems } from '@/shared/static'
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
          <div className="my-10">
            <h5>{aboutTexts.me.title}</h5>
            <div className="flex items-center justify-center">
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
                    initial={{ color: 'black', clipPath: 'inset(0 100% 0 0)' }}
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
            {/* Características em Grid */}

            <GlobalScrollAnimation>
              <motion.div
                className="mt-6 rounded-lg border p-6 shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
                      <div className="flex items-center gap-2">
                        <div className="">{item.icon}</div>
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
            </GlobalScrollAnimation>
          </div>
        </GlobalScrollAnimation>

        <GlobalScrollAnimation>
          <div className="mb-5">
            <h5>{aboutTexts.career.title}</h5>
            <Paragraph>{aboutTexts.career.description}</Paragraph>

            <div className="py-10">
              <h5 className="flex items-center gap-2">
                {aboutTexts.career.timelineTitle}
                <Milestone size={18} />
              </h5>
              <CustomTimeline items={careerItems} />
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
