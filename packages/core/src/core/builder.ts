import type { Lumex } from './lumex.ts'
import { build as rolldownBuild } from 'rolldown'

/**
 * Build the lumex bot.
 *
 * @param lumex The lumex instance.
 */
export async function build(lumex: Lumex) {
  await rolldownBuild({
    input: [`${lumex.runtimeDir}/runtime/entry.mjs`],
    platform: 'node',
    external: [
      // optional in d.js for websocket compression
      // TODO: conditionally apply this if the user does not have zlib-sync installed
      'zlib-sync',
    ],
    checks: {
      // d.js client has eval
      eval: false,
    },
    output: {
      cleanDir: true,
      minify: 'dce-only',
    },
  })
}
