// import axios from 'axios'

// import { env } from '@/env'

// // api client -> client de API no front para se conectar com o backend

// export const api = axios.create({
//   baseURL: env.VITE_API_URL,
//   withCredentials: true
// })

// // add delay. Os interceptors interceptam cada requisição
// if (env.VITE_ENABLE_API_DELAY) {
//   api.interceptors.request.use(async config => {
//     await new Promise(resolve =>
//       setTimeout(resolve, Math.round(Math.random() * 3000))
//     )

//     return config
//   })
// }
