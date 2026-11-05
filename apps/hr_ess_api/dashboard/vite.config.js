import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'portal-assets',
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_TARGET || 'http://localhost:8082',
        changeOrigin: true,
        headers: {
          Host: process.env.VITE_DEV_SITE_HOST || 'mysite.localhost',
        }
      }
    }
  }
}));