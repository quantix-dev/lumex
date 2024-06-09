import { runMain as _runMain } from 'citty'
import { main } from './main.ts'

/**
 * Runs the cli.
 */
// eslint-disable-next-line ts/no-unsafe-argument
export const runMain = () => _runMain(main)
