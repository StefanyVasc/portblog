import { Outlet } from 'react-router-dom'

import { PageFooter, PageHeader } from '@/components'

type PageLayoutProps = {
  children?: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <PageHeader />

      <main className="flex-grow px-4 md:px-6">
        {children}
        <Outlet />
      </main>

      <PageFooter />
    </div>
  )
}
