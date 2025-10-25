import { type QueryKey, type UseQueryOptions } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useAppQuery } from './use-app-query'
import { useLocaleSuffix } from './use-locale-suffix'

type LocaleQueryFnParams = {
  localeSuffix: string
  language: string
  languageCode: string
  signal?: AbortSignal
}

type UseLocaleQueryOptions<TData, TError = Error> = {
  key: QueryKey
  queryFn: (params: LocaleQueryFnParams) => Promise<TData>
  includeLocaleInKey?: boolean
} & Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>

export function useLocaleQuery<TData, TError = Error>(
  options: UseLocaleQueryOptions<TData, TError>
) {
  const { key, queryFn, includeLocaleInKey = true, ...rest } = options
  const { localeSuffix, language, languageCode } = useLocaleSuffix()

  const queryKey = useMemo(() => {
    if (!includeLocaleInKey) return key
    return [...key, localeSuffix] as QueryKey
  }, [key, localeSuffix, includeLocaleInKey])

  // Variante do wrapper que injeta informações de idioma na query.
  // Ideal para chamadas que dependem de locale (URLs diferentes, cache por idioma, etc.).
  return useAppQuery<TData, TError>({
    ...rest,
    key: queryKey,
    queryFn: ({ signal }) =>
      queryFn({ localeSuffix, language, languageCode, signal })
  })
}
