import { runMain as _runMain } from 'citty'
import { main } from './main.ts'

/**
 * Runs the cli.
 */
export const runMain = () => _runMain(main)

export { main }
