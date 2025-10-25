import { AxiosRequestConfig } from 'axios'

import { AxiosGetOptions, getAsync } from './get-async'
import { isNotFoundError } from './helpers/is-not-found-error'

export async function getAsyncWithFallback<T>(
  primaryUrl: string,
  fallbackUrl: string,
  config: AxiosRequestConfig | undefined,
  options: AxiosGetOptions
): Promise<T> {
  try {
    return await getAsync<T>(primaryUrl, config, options)
  } catch (error) {
    if (isNotFoundError(error) && primaryUrl !== fallbackUrl) {
      return getAsync<T>(fallbackUrl, config, options)
    }

    throw error
  }
}
