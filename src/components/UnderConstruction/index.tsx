import { useTranslation } from 'react-i18next'

export function UnderConstruction() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center h-60 text-gray-600 dark:text-gray-400">
      <span className="text-5xl">🚧</span>
      <h3 className="text-xl font-semibold mt-3">{t('underConstruction.title')}</h3>
      <p className="text-sm mt-1">{t('underConstruction.description')}</p>
    </div>
  )
}
