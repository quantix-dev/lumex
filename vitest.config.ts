import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'unit',
    setupFiles: ['./test/setup.ts'],
  },
})
