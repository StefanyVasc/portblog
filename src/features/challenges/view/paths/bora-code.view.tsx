import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { updateSeo } from '@/shared/utils/update-seo'

export function BoraCodarView() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const title = texts.challenges.boraCodar.title

  useEffect(() => {
    updateSeo({
      title,
      description:
        'Coleção dos desafios Bora Codar que estou resolvendo e documentando.',
      canonicalPath: '/challenges/bora-codar',
      type: 'website'
    })
  }, [title])

  return (
    <div>
      <Header headerName={title}>
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main />
    </div>
  )
}
