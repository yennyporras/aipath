import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'vendor'
          if (id.includes('/content/')) return 'content'
          if (id.includes('ArcadeScreen')) return 'arcade'
          if (id.includes('ExplorarScreen')) return 'explorar'
        }
      }
    }
  }
})