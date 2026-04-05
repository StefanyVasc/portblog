import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type PluginOption } from 'vite'

const plugins: PluginOption[] = [react()]
const siteUrl =
  process.env.SITE_URL ??
  process.env.DEPLOY_PRIME_URL ??
  process.env.URL ??
  'https://stefany-sa.com.br'

if (process.env.ANALYZE === 'true') {
  plugins.push(
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    }),
    visualizer({
      filename: 'dist/stats.json',
      template: 'raw-data'
    })
  )
}

export default defineConfig({
  plugins,
  define: {
    __SITE_URL__: JSON.stringify(siteUrl)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
