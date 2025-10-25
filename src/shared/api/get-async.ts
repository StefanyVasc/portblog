import { AxiosRequestConfig, isAxiosError } from 'axios'

import { api } from '@/lib/axios'
import { HttpError } from '@/services/http/http'

import { mergeHeaders } from './helpers/merge-headers'

export type AxiosGetOptions = {
  responseType?: AxiosRequestConfig['responseType']
  accept: string
}

export async function getAsync<T>(
  url: string,
  config: AxiosRequestConfig | undefined,
  options: AxiosGetOptions
): Promise<T> {
  const { responseType, accept } = options

  try {
    const response = await api.get<T>(url, {
      ...config,
      responseType,
      headers: mergeHeaders(accept, config?.headers)
    })

    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new HttpError(
        {
          status: error.response.status,
          statusText: error.response.statusText,
          url: error.config?.url ?? url
        },
        error.message
      )
    }

    throw error
  }
}
