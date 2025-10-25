import clsx from 'clsx'

import { useI18n } from '@/shared/hooks/use-i18n'

const AVAILABLE_LANGUAGES = ['en', 'pt'] as const

type LanguageCode = (typeof AVAILABLE_LANGUAGES)[number]

export function LanguageSwitcher() {
  const { i18n, t } = useI18n()
  const activeLanguage =
    i18n.resolvedLanguage?.split('-')[0] ?? i18n.language.split('-')[0]

  const changeLanguage = (code: LanguageCode) => {
    if (code === activeLanguage) return

    void i18n.changeLanguage(code)
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/80 p-0.5 text-xs shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
      {AVAILABLE_LANGUAGES.map(code => (
        <button
          key={code}
          type="button"
          onClick={() => changeLanguage(code)}
          aria-pressed={activeLanguage === code}
          className={clsx(
            'rounded-full px-2 py-1 font-semibold uppercase transition-colors',
            activeLanguage === code
              ? 'bg-rose-500 text-white shadow'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          )}
        >
          {t(`common.language.${code}`)}
        </button>
      ))}
    </div>
  )
}
