import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // Изменение порта сервера
    open: true,         // Автоматическое открытие браузера
    watch: {            // Автоматическое подхватывание для WSL
      usePolling: true,
    },
  }
})
