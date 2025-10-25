import {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig
} from 'axios'

import { env } from '@/env'

export function requestAuthInterceptors(api: AxiosInstance) {
  return api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (env.VITE_GITHUB_TOKEN) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${env.VITE_GITHUB_TOKEN}`
      } as AxiosRequestHeaders
    }

    return config
  })
}
