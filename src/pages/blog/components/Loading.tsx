import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()

  return <p className="mt-10 text-center">{t('common.loading')}</p>
}
