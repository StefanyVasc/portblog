import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

import { PageFooter, PageHeader } from '@/components'

type PageLayoutProps = {
  children?: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation()

  const isFrontendMentorPage = location.pathname.includes(
    '/challenges/frontend-mentor'
  )

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <PageHeader />

      <main className="flex-grow px-4 md:px-6">
        <AnimatePresence mode="wait">
          {!isFrontendMentorPage ? (
            <motion.div
              key={location.pathname}
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {children}
              <Outlet />
            </motion.div>
          ) : (
            <div className="w-full h-full">
              {children}
              <Outlet />
            </div>
          )}
        </AnimatePresence>
      </main>

      <PageFooter />
    </div>
  )
}
