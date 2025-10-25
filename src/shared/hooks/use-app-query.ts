import {
  keepPreviousData,
  type QueryKey,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult
} from '@tanstack/react-query'

type UseAppQueryOptions<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  key: TQueryKey
} & Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>

export function useAppQuery<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseAppQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const { key, placeholderData = keepPreviousData, ...rest } = options

  // Wrapper central para `useQuery`, aplicando convenções globais (ex.: `keepPreviousData`).
  // Use sempre que a query não depende do idioma atual.
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    ...rest,
    queryKey: key,
    placeholderData
  })
}
