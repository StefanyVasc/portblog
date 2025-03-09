import { createBrowserRouter } from 'react-router-dom'

import { About, Blog, ChallengesPage, Home, Projects, Socials } from '@/pages'
import { BoraCodar, FrontendMentor } from '@/pages/challenges/paths'
import { CustomTabContent } from '@/pages/challenges/paths/components'

import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Page not found!</div>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'challenges',
        element: <ChallengesPage />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'blog/:slug',
        element: <Blog />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'challenges/frontend-mentor',
        element: <FrontendMentor />,
        children: [
          {
            path: ':tabValue',
            element: <CustomTabContent />
          }
        ]
      },
      {
        path: 'challenges/bora-codar',
        element: <BoraCodar />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'socials',
        element: <Socials />
      }
    ]
  }
])

export default router
