import { Header } from '@/components'
import { useTranslation } from 'react-i18next'

export function Socials() {
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('socials.header')} />
    </div>
  )
}
