import { useI18n } from '@/shared/hooks/use-i18n'

export function UnderConstruction() {
  const { t } = useI18n()

  return (
    <div className="flex h-60 flex-col items-center justify-center text-gray-600 dark:text-gray-400">
      <span className="text-5xl">🚧</span>
      <h3 className="mt-3 text-xl font-semibold">
        {t('underConstruction.title')}
      </h3>
      <p className="mt-1 text-sm">{t('underConstruction.description')}</p>
    </div>
  )
}
