// https://github.com/lint-staged/lint-staged/issues/825#issuecomment-620018284
export default {
  '*.{js,mjs,ts,mts}': files => [
    `eslint --cache ${files.join(' ')}`,
    `vitest related --run ${files.join(' ')}`,
    'pnpm typecheck',
  ],
}
