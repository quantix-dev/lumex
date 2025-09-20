import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index', 'src/config'],
  external: [
    'discord.js',
    'bufferutil',
    'utf-8-validate',
    'zlib-sync',
  ],
})
