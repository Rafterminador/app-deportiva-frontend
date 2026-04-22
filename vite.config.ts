import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@css": "/src/css",
      "@pages": "/src/pages",
      "@redux": "/src/redux",
      "@utils": "/src/utils",
      "@views": "/src/views",
      "@constants": "/src/constants",
      "@services": "/src/services",
      "@routes": "/src/routes",
    }
  }
})
