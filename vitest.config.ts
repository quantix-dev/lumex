import { defineConfig } from 'vitest/config'

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    testTimeout: 30_000,
    name: 'unit',
    setupFiles: ['./test/setup.ts'],
  },
})
