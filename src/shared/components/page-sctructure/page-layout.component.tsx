import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

import { PageFooter, PageHeader } from '@/shared/components'

type PageLayoutProps = {
  children?: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation()

  const isFrontendMentorPage = location.pathname.includes(
    '/challenges/frontend-mentor'
  )

  return (
    <div className="container mx-auto flex min-h-screen flex-col px-4 md:px-6 lg:px-8">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-rose-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
      >
        Ir para o conteúdo
      </a>

      <PageHeader />

      <main id="main-content" className="flex-grow px-4 md:px-6">
        <AnimatePresence mode="wait">
          {!isFrontendMentorPage ? (
            <motion.div
              key={location.pathname}
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {children}
              <Outlet />
            </motion.div>
          ) : (
            <div className="h-full w-full">
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
