import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type PluginOption } from 'vite'

const plugins: PluginOption[] = [react()]

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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
