import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/shared/components'
import { SITE_META } from '@/shared/config/site'
import { texts } from '@/shared/content/texts'
import { updateSeo } from '@/shared/utils/update-seo'

export function BoraCodarView() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const title = texts.challenges.boraCodar.title

  useEffect(() => {
    updateSeo({
      title: SITE_META.boraCodar.title,
      description: SITE_META.boraCodar.description,
      canonicalPath: '/challenges/bora-codar',
      type: 'website'
    })
  }, [])

  return (
    <div>
      <Header headerName={title}>
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main />
    </div>
  )
}
