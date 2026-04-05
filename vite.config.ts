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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'react-vendor'
          }

          if (id.includes('/@tanstack/')) {
            return 'query-vendor'
          }

          if (
            id.includes('/react-markdown/') ||
            id.includes('/remark-') ||
            id.includes('/rehype-') ||
            id.includes('/highlight.js/') ||
            id.includes('/micromark/') ||
            id.includes('/mdast-util-') ||
            id.includes('/hast-util-') ||
            id.includes('/unist-util-') ||
            id.includes('/unified/') ||
            id.includes('/vfile/')
          ) {
            return 'markdown-vendor'
          }

          if (id.includes('/framer-motion/')) {
            return 'motion-vendor'
          }

          if (id.includes('/lucide-react/') || id.includes('/@radix-ui/')) {
            return 'ui-vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
