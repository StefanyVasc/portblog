import { Header, UnderConstruction } from '@/components'
import { useTranslation } from 'react-i18next'

export function Projects() {
  const { t } = useTranslation()

  return (
    <div>
      <Header headerName={t('projects.header')} />
      <section className="py-5 font-300">
        <UnderConstruction />
      </section>
    </div>
  )
}
