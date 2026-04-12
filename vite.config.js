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
          // React core + framer-motion → vendor (57 kB gzip, bajo el límite de 100 kB)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'vendor'
          // JSONs de contenido → chunks separados (lazy, solo se cargan cuando se necesitan)
          if (id.includes('m4-completo.json')) return 'content-m4'
          if (id.includes('content/m1')) return 'content-m1'
          if (id.includes('/content/')) return 'content'
          if (id.includes('ArcadeScreen')) return 'arcade'
          if (id.includes('ExplorarScreen')) return 'explorar'
        }
      }
    }
  }
})