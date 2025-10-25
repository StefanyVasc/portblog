import axios from 'axios'

import { env } from '@/env'
import { requestAuthInterceptors } from '@/shared/api/interceptors/request-auth'

export const api = axios.create({
  baseURL: env.VITE_GITHUB_API_URL
})

requestAuthInterceptors(api)
