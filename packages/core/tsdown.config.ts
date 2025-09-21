import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/config.ts'],
  external: [
    'discord.js',
    'bufferutil',
    'utf-8-validate',
    'zlib-sync',
  ],
})
