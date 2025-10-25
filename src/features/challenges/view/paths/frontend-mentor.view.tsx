import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  CustomBreadcrumb,
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { updateSeo } from '@/shared/utils/update-seo'

export function FrontendMentorView() {
  const { tabValue } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const title = texts.challenges.frontendMentor.title

  const tabsInfos = [
    { value: 'newbie', label: 'Newbie' },
    { value: 'junior', label: 'Junior' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const currentTab = tabValue || 'newbie'

  useEffect(() => {
    updateSeo({
      title,
      description:
        'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
      canonicalPath: `/challenges/frontend-mentor/${currentTab}`,
      type: 'website'
    })
  }, [title, currentTab])

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
      <Header headerName={title}>
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main>
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="mt-7 w-[400px]"
        >
          <TabsList>
            {tabsInfos.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <motion.div
            key={currentTab}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <TabsContent
              key={currentTab}
              value={currentTab}
              className="ml-3 mt-5"
            >
              <Outlet />
            </TabsContent>
          </motion.div>
        </Tabs>
      </main>
    </div>
  )
}
