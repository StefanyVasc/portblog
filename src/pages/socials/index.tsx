import { useTranslation } from 'react-i18next'

import { Header } from '@/components'

export function Socials() {
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('socials.header')} />
    </div>
  )
}
