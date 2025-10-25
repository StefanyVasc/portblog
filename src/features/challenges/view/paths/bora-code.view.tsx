import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/shared/components'
import { texts } from '@/shared/content/texts'
import { updateDocumentTitle } from '@/shared/utils/update-document-title'

export function BoraCodarView() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const title = texts.challenges.boraCodar.title

  useEffect(() => {
    updateDocumentTitle(title)
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
