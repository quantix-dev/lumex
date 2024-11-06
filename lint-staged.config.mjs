export default {
  '*.{js,ts}': files => [`eslint --cache ${files.join(' ')}`, 'pnpm typecheck'],
}
