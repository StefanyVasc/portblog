import { createBrowserRouter } from 'react-router-dom'

import { About, BoraCodar, FrontendMentor, Home, Socials } from '@/pages'
import { CustomTabContent } from '@/pages/challenges/components'

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
