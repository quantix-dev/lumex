import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  dependencies: [
    'citty',
    'consola',
  ],
  entries: ['src/index'],
  externals: [
    'node:processs',
  ],
  rollup: {
    emitCJS: true,
    dts: {
      // if this is true, citty causes build failure on index.d.ts.
      respectExternal: false,
    },
    inlineDependencies: true,
  },
})
