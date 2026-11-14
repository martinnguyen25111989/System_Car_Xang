import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const dir = path.dirname(fileURLToPath(import.meta.url))
const base = process.env.GITHUB_PAGES === 'true' ? '/System_Car_Xang/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    fs: {
      allow: [path.resolve(dir, '..')],
    },
  },
})
