// @ts-check
import antfu from '@antfu/eslint-config'

// https://github.com/antfu/eslint-config
export default antfu({
  stylistic: {
    overrides: {
      'style/function-paren-newline': ['error', 'consistent'],
    },
  },

  typescript: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
