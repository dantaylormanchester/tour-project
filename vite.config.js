import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'stadium-tours': resolve(__dirname, 'stadium-tours.html'),
        checkout: resolve(__dirname, 'checkout.html'),
      },
    },
  },
})
