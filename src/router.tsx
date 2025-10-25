import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import { AboutView } from './features/about/view/about.view'
import { BlogView } from './features/blog/view/blog.view'
import { ChallengesView } from './features/challenges/view/challenges.view'
import { CustomTabContent } from './features/challenges/view/components/custom-tab-content.component'
import { BoraCodarView } from './features/challenges/view/paths/bora-code.view'
import { FrontendMentorView } from './features/challenges/view/paths/frontend-mentor.view'
import { HomeView } from './features/home/view/home.view'
import { ProjectsView } from './features/projects/view/projects.view'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Page not found!</div>,
    children: [
      {
        path: '/',
        element: <HomeView />
      },
      {
        path: 'challenges',
        element: <ChallengesView />
      },
      {
        path: 'blog',
        element: <BlogView />
      },
      {
        path: 'blog/:slug',
        element: <BlogView />
      },
      {
        path: 'projects',
        element: <ProjectsView />
      },
      {
        path: 'challenges/frontend-mentor',
        element: <FrontendMentorView />,
        children: [
          {
            path: ':tabValue',
            element: <CustomTabContent />
          }
        ]
      },
      {
        path: 'challenges/bora-codar',
        element: <BoraCodarView />
      },
      {
        path: 'about',
        element: <AboutView />
      }
    ]
  }
])

export default router
