import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: ['src/index'],
  externals: [
    'discord.js',
    'bufferutil',
    'utf-8-validate',
    'zlib-sync',
  ],
  rollup: {
    emitCJS: true,
  },
})
