// @ts-check
import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  typescript: {
    tsconfigPath: ['./tsconfig.json', './examples/*/tsconfig.json', './docs/tsconfig.json'],
  },
})
