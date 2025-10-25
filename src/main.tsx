import './shared/styles/index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from '@/services/react-query/client'

import router from './router'

const ReactQueryDevtoolsLazy = import.meta.env.DEV
  ? lazy(async () => {
      const module = await import('@tanstack/react-query-devtools')
      return { default: module.ReactQueryDevtools }
    })
  : null

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {ReactQueryDevtoolsLazy && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsLazy initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  </StrictMode>
)
