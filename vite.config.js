import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: '.',
  build: {
    outDir: 'docs'
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'color-functions',
          'global-builtin',
          'legacy-js-api',
        ],
      },
    },
  },
  test: {
    globals: true, // Позволяет использовать API Vitest (describe, it, expect) без импорта
    environment: 'jsdom', // Устанавливаем среду эмуляции браузера
    coverage: { reporter: ['text', 'json', 'html'] },
  },
})