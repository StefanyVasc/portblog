import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { resolveSuffix } from '../utils/resolve-suffix'

type TranslationValues = ReturnType<typeof useTranslation>

type UseLocaleSuffixResult = Pick<TranslationValues, 't' | 'i18n'> & {
  localeSuffix: string
  language: string
  languageCode: string
}

export function useLocaleSuffix(): UseLocaleSuffixResult {
  const translation = useTranslation()
  const { i18n, t } = translation
  const language = i18n.resolvedLanguage || i18n.language || 'pt'

  const localeSuffix = useMemo(() => resolveSuffix(language), [language])
  const languageCode = useMemo(
    () => language.split('-')[0]?.toLowerCase() ?? 'pt',
    [language]
  )

  return {
    localeSuffix,
    language,
    languageCode,
    t,
    i18n
  }
}
