import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index'],
  external: [
    'node:process',
  ],
})
