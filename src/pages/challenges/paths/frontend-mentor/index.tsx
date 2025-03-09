import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  CustomBreadcrumb,
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components'

export function FrontendMentor() {
  const { tabValue } = useParams()

  const navigate = useNavigate()
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)

  const tabsInfos = [
    { value: 'newbie', label: 'Newbie' },
    { value: 'junior', label: 'Junior' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const currentTab = tabValue || 'newbie'

  const handleTabChange = (value: string) => {
    if (value !== currentTab) {
      navigate(`/challenges/frontend-mentor/${value}`, { replace: true })
    }
  }

  useEffect(() => {
    if (!tabValue) {
      navigate('/challenges/frontend-mentor/newbie', { replace: true })
    }
  }, [tabValue, navigate])

  return (
    <div>
      <Header headerName="Frontend Mentor">
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main>
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-[400px] mt-7"
        >
          <TabsList>
            {tabsInfos.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            key={currentTab}
            value={currentTab}
            className="mt-5 ml-3"
          >
            <Outlet />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
