import { useI18n } from '@/shared/hooks/use-i18n'

export const Loading = () => {
  const { t } = useI18n()

  return <p className="mt-10 text-center">{t('common.loading')}</p>
}
