import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()

  return <p className="text-center mt-10">{t('common.loading')}</p>
}
