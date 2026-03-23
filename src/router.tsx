import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { NotFoundView } from './features/not-found/not-found.view'
import { ErrorBoundary } from './shared/components'

const HomeView = lazy(async () => {
  const module = await import('./features/home/view/home.view')
  return { default: module.HomeView }
})

const ChallengesView = lazy(async () => {
  const module = await import('./features/challenges/view/challenges.view')
  return { default: module.ChallengesView }
})

const BlogView = lazy(async () => {
  const module = await import('./features/blog/view/blog.view')
  return { default: module.BlogView }
})

const ProjectsView = lazy(async () => {
  const module = await import('./features/projects/view/projects.view')
  return { default: module.ProjectsView }
})

const AboutView = lazy(async () => {
  const module = await import('./features/about/view/about.view')
  return { default: module.AboutView }
})

const FrontendMentorView = lazy(async () => {
  const module = await import(
    './features/challenges/view/paths/frontend-mentor.view'
  )
  return { default: module.FrontendMentorView }
})

const BoraCodarView = lazy(async () => {
  const module = await import('./features/challenges/view/paths/bora-code.view')
  return { default: module.BoraCodarView }
})

const CustomTabContent = lazy(async () => {
  const module = await import(
    './features/challenges/view/components/custom-tab-content.component'
  )
  return { default: module.CustomTabContent }
})

function withSuspense(element: JSX.Element) {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>{element}</Suspense>
    </ErrorBoundary>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundView />,
    children: [
      {
        index: true,
        element: withSuspense(<HomeView />)
      },
      {
        path: 'challenges',
        element: withSuspense(<ChallengesView />)
      },
      {
        path: 'blog/:slug?',
        element: withSuspense(<BlogView />)
      },
      {
        path: 'projects',
        element: withSuspense(<ProjectsView />)
      },
      {
        path: 'challenges/frontend-mentor',
        element: withSuspense(<FrontendMentorView />),
        children: [
          {
            path: ':tabValue',
            element: withSuspense(<CustomTabContent />)
          }
        ]
      },
      {
        path: 'challenges/bora-codar',
        element: withSuspense(<BoraCodarView />)
      },
      {
        path: 'about',
        element: withSuspense(<AboutView />)
      }
    ]
  }
])

export default router
