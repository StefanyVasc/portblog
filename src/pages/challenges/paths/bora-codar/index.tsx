import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/components'

export function BoraCodar() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('challenges.boraCodar.title')}>
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main />
    </div>
  )
}
