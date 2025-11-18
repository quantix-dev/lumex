import type { CommandDef } from 'citty'

/**
 * Resolves the command import and returns the definition.
 *
 * @param cmd The imported command.
 * @param cmd.default The default export of the command.
 * @returns The imported command definition.
 */
const cmdDefault = <T extends CommandDef<any>>(cmd: { default: T }) => cmd.default

/**
 * Executable commands.
 */
export const commands = {
  build: () => import('./build').then(cmdDefault),
  dev: () => import('./dev').then(cmdDefault),
  prepare: () => import('./prepare').then(cmdDefault),
} as const
