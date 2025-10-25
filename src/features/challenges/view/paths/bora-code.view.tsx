import { useLocation } from 'react-router-dom'

import { CustomBreadcrumb, Header } from '@/shared/components'
import { useI18n } from '@/shared/hooks/use-i18n'

export function BoraCodarView() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(path => path)
  const { t } = useI18n()

  return (
    <div>
      <Header headerName={t('challenges.boraCodar.title')}>
        <CustomBreadcrumb pathnames={pathnames} />
      </Header>
      <main />
    </div>
  )
}
