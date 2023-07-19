import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: 'localhost',
      port: +env.VITE_PORT,
      open: true,
    },
  }
})
