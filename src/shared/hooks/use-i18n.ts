import { useTranslation } from 'react-i18next'

type TranslationResult = ReturnType<typeof useTranslation>

type UseI18nResult = Pick<TranslationResult, 't' | 'i18n'>

export function useI18n(): UseI18nResult {
  const { t, i18n } = useTranslation()
  return { t, i18n }
}
