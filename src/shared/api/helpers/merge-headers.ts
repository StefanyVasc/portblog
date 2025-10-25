import { AxiosRequestConfig } from 'axios'

export function mergeHeaders(
  accept: string,
  headers?: AxiosRequestConfig['headers']
): Record<string, string> {
  if (!headers) return { Accept: accept }

  const normalized =
    headers instanceof Headers
      ? Object.fromEntries(headers.entries())
      : Array.isArray(headers)
        ? Object.fromEntries(headers)
        : headers

  return {
    Accept: accept,
    ...normalized
  }
}
