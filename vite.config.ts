import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Resolve assets relative to the page for both custom domains and Pages paths.
  base: './',
})
